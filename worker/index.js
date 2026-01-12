// --- 1. 設定與工具函式 ---
const SUPABASE_CONFIG = {
  URL: "https://your-project-id.supabase.co", 
  ANON_KEY: "your-anon-key",
};

// 速率限制存儲 (Worker 單一 Isolate 內共享)
const RATE_LIMIT_STORE = new Map();

// 驗證 Token
async function verifyUserWithSupabase(token, url, anonKey) {
  try {
    const res = await fetch(`${url}/auth/v1/user`, {
      headers: { "Authorization": `Bearer ${token}`, "apikey": anonKey }
    });
    return res.ok ? await res.json() : null;
  } catch (e) { return null; }
}

// 紀錄日誌 (抓取 IP, 國家, 裝置)
async function logLogin(user, request, actionType, SB_URL, SB_SERVICE) {
  const ip = request.headers.get("cf-connecting-ip") || "unknown";
  const country = request.headers.get("cf-ipcountry") || "unknown";
  const ua = request.headers.get("user-agent") || "unknown";
  
  if (!SB_SERVICE) {
    console.error("[Log Error] Missing SERVICE_ROLE_KEY");
    return;
  }

  try {
    const res = await fetch(`${SB_URL}/rest/v1/login_logs`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        "apikey": SB_SERVICE,
        "Authorization": `Bearer ${SB_SERVICE}`, 
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({ 
          email: user.email, 
          user_id: user.id, 
          ip_address: ip, 
          country: country, 
          user_agent: ua, 
          action: actionType,
          meta_data: { method: actionType === "manual" ? "OTP 驗證" : "自動快取" }
      })
    });
    
    if (!res.ok) {
        const errText = await res.text();
        console.error(`[Log Error] Supabase returned ${res.status}: ${errText}`);
    } else {
        console.log(`[Log Success] User logged: ${user.email}`);
    }
  } catch (e) {
    console.error(`[Log Error] Fetch failed: ${e.message}`);
  }
}

// --- 2. Worker 主邏輯 ---
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const cookie = request.headers.get("Cookie") || "";
    const ip = request.headers.get("cf-connecting-ip") || "unknown";
    const ua = request.headers.get("user-agent") || "";

    // 1. 速率限制 (Rate Limiting) - 所有請求每分鐘限制 100 次 (放寬以避免誤傷人類)
    const now = Date.now();
    const rateData = RATE_LIMIT_STORE.get(ip) || { count: 0, reset: now + 60000 };
    if (now > rateData.reset) {
        rateData.count = 1;
        rateData.reset = now + 60000;
    } else {
        rateData.count++;
    }
    RATE_LIMIT_STORE.set(ip, rateData);

    // 嚴格限制：攔截機器人級別的超高速抓取 (每分鐘超過 100 次請求)
    if (rateData.count > 100) {
        return new Response("系統偵測到異常存取頻率，請稍等一分鐘後再繼續閱讀。", { 
            status: 429,
            headers: { "Content-Type": "text/plain; charset=utf-8" }
        });
    }
    
    // 0. 極速健康檢查
    if (url.pathname === "/auth/health") {
        return new Response(JSON.stringify({ status: "online" }), {
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        });
    }

    const SB_URL = (env.SUPABASE_URL || SUPABASE_CONFIG.URL)?.replace(/\/$/, "");
    const SB_ANON = env.SUPABASE_ANON_KEY || SUPABASE_CONFIG.ANON_KEY;
    const SB_SERVICE = env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SB_URL || SB_URL.includes("your-project")) {
        return new Response(JSON.stringify({ error: "Config Missing" }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    // API: 發送 OTP
    if (url.pathname === "/auth/otp" && request.method === "POST") {
      const { email } = await request.json();
      if (!email.match(/@.*\.edu\.tw$/) && !email.endsWith("@superinfo.com.tw")) {
        return new Response(JSON.stringify({ error: "僅限教育網域登入" }), { status: 403 });
      }
      return await fetch(`${SB_URL}/auth/v1/otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "apikey": SB_ANON },
        body: JSON.stringify({ email, create_user: true, data: { redirect_to: `${url.origin}/login` } })
      });
    }

    // API: 驗證與紀錄
    if ((url.pathname === "/auth/verify" || url.pathname === "/auth/session") && request.method === "POST") {
      const body = await request.json();
      let access_token, user;

      if (url.pathname === "/auth/session") {
        access_token = body.access_token;
        user = await verifyUserWithSupabase(access_token, SB_URL, SB_ANON);
      } else {
        const res = await fetch(`${SB_URL}/auth/v1/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "apikey": SB_ANON },
          body: JSON.stringify({ email: body.email, token: body.token, type: "email" })
        });
        const data = await res.json();
        access_token = data.access_token;
        user = data.user;
      }

      if (access_token && user) {
        ctx.waitUntil(logLogin(user, request, url.pathname === "/auth/session" ? "auto" : "manual", SB_URL, SB_SERVICE));
        
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { 
            "Set-Cookie": `sb-access-token=${access_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=31536000`,
            "Content-Type": "application/json"
          }
        });
      }
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // API: 取得使用者
    if (url.pathname === "/auth/me") {
        const tokenMatch = cookie.match(/sb-access-token=([^;]+)/);
        const user = tokenMatch ? await verifyUserWithSupabase(tokenMatch[1], SB_URL, SB_ANON) : null;
        return new Response(JSON.stringify({ email: user?.email || null }), { headers: { "Content-Type": "application/json" } });
    }

    // 登出
    if (url.pathname === "/auth/logout") {
        return new Response(null, {
            status: 302,
            headers: {
                "Location": "/login",
                "Set-Cookie": "sb-access-token=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0"
            }
        });
    }

    // 靜態資源管理 & 安全過濾
    const tokenMatch = cookie.match(/sb-access-token=([^;]+)/);
    const isAuth = tokenMatch ? !!(await verifyUserWithSupabase(tokenMatch[1], SB_URL, SB_ANON)) : false;

    if (isAuth && url.pathname === "/login") return Response.redirect(`${url.origin}/`, 302);
    const isPublic = url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg|woff2?|json)$/) || url.pathname === "/login.html";
    if (!isAuth && !isPublic && url.pathname !== "/login") return Response.redirect(`${url.origin}/login`, 302);

    let response;
    if (url.pathname === "/login") {
      const res = await env.ASSETS.fetch(new Request(new URL("/login.html", request.url)));
      response = new Response(res.body, { headers: { "Content-Type": "text/html; charset=utf-8" } });
    } else {
      response = await env.ASSETS.fetch(request);
    }

    // 3. 安全標頭注入 (Security Headers)
    const newHeaders = new Headers(response.headers);
    newHeaders.set("X-Content-Type-Options", "nosniff");
    newHeaders.set("X-Frame-Options", "SAMEORIGIN");
    newHeaders.set("X-XSS-Protection", "1; mode=block");
    newHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");
    // 設定 CSP 防止未經授權的腳本執行
    newHeaders.set("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://klcskeeqkwkakgzrewtn.supabase.co; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://klcskeeqkwkakgzrewtn.supabase.co;");

    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders
    });
  },
};

