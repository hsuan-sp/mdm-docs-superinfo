// --- 1. 設定與工具函式 ---
const SUPABASE_CONFIG = {
  URL: "https://your-project-id.supabase.co", 
  ANON_KEY: "your-anon-key",
};

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
async function logLogin(user, request, actionType, SB_URL, SB_ANON, SB_SERVICE) {
  const ip = request.headers.get("cf-connecting-ip") || "unknown";
  const country = request.headers.get("cf-ipcountry") || "unknown";
  const ua = request.headers.get("user-agent") || "unknown";
  
  console.log(`[Attempting Log] User: ${user.email}, IP: ${ip}, Action: ${actionType}`);

  try {
    const res = await fetch(`${SB_URL}/rest/v1/login_logs`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        "apikey": SB_ANON, 
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
    console.log(`[Log Result] Status: ${res.status} ${res.statusText}`);
  } catch (e) {
    console.error(`[Log Error] ${e.message}`);
  }
}

// --- 2. Worker 主邏輯 ---
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const cookie = request.headers.get("Cookie") || "";
    
    // 優先讀取 Cloudflare 環境變數 (最穩定的做法)
    const SB_URL = (env.SUPABASE_URL || SUPABASE_CONFIG.URL)?.replace(/\/$/, "");
    const SB_ANON = env.SUPABASE_ANON_KEY || SUPABASE_CONFIG.ANON_KEY;
    const SB_SERVICE = env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SB_URL || SB_URL.includes("your-project")) return new Response("Supabase URL Missing", { status: 500 });
    if (!SB_ANON || SB_ANON.includes("your-anon")) return new Response("Supabase Anon Key Missing", { status: 500 });
    
    // API: 健康檢查
    if (url.pathname === "/auth/health") return new Response("OK");

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
        ctx.waitUntil(logLogin(user, request, url.pathname === "/auth/session" ? "auto" : "manual", SB_URL, SB_ANON, SB_SERVICE));
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Set-Cookie": `sb-access-token=${access_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=31536000` }
        });
      }
      return new Response("Unauthorized", { status: 401 });
    }

    // API: 取得使用者
    if (url.pathname === "/auth/me") {
        const token = cookie.match(/sb-access-token=([^;]+)/)?.[1];
        const user = token ? await verifyUserWithSupabase(token, SB_URL, SB_ANON) : null;
        return new Response(JSON.stringify({ email: user?.email || null }), { headers: { "Content-Type": "application/json" } });
    }

    // 登出
    if (url.pathname === "/auth/logout") {
        return new Response(null, { status: 302, headers: { "Location": "/login", "Set-Cookie": "sb-access-token=; Path=/; HttpOnly; Max-Age=0" } });
    }

    // --- 3. 靜態資源與重定向 ---
    const token = cookie.match(/sb-access-token=([^;]+)/)?.[1];
    const isAuth = token ? !!(await verifyUserWithSupabase(token, SB_URL, SB_ANON)) : false;

    if (isAuth && url.pathname === "/login") return Response.redirect(`${url.origin}/`, 302);
    const isPublic = url.pathname.match(/\.(css|js|png|jpg|ico|svg|json)$/) || url.pathname === "/login.html";
    if (!isAuth && !isPublic && url.pathname !== "/login") return Response.redirect(`${url.origin}/login`, 302);

    if (url.pathname === "/login") {
      const res = await env.ASSETS.fetch(new Request(new URL("/login.html", request.url)));
      return new Response(res.body, { headers: { "Content-Type": "text/html" } });
    }

    return await env.ASSETS.fetch(request);
  },
};
