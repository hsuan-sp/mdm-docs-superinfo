// 硬編碼的 Supabase 設定 (請將您的數值填入下方)
const SUPABASE_CONFIG = {
  URL: "https://your-project-id.supabase.co", // 請替換您的 Project URL
  ANON_KEY: "your-anon-key", // 請替換您的 Anon Key
  // 強制定義：如果不填，也會嘗試讀取 env，但硬編碼最穩
};

// 驗證 Token 的新方法：直接問 Supabase
async function verifyUserWithSupabase(token, url, anonKey) {
  try {
    const res = await fetch(`${url}/auth/v1/user`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "apikey": anonKey
      }
    });
    
    if (res.ok) {
        const data = await res.json();
        return data; // 回傳使用者物件 { id, email, ... }
    }
    return null;
  } catch (e) {
    console.error(`[Auth Error] ${e.message}`);
    return null;
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const cookie = request.headers.get("Cookie") || "";
    
    // 優先使用硬編碼設定，若無則使用環境變數
    const SB_URL = (SUPABASE_CONFIG.URL.includes("your-project") ? env.SUPABASE_URL : SUPABASE_CONFIG.URL)?.replace(/\/$/, "");
    const SB_ANON = SUPABASE_CONFIG.ANON_KEY.includes("your-anon") ? env.SUPABASE_ANON_KEY : SUPABASE_CONFIG.ANON_KEY;
    const SB_SERVICE = env.SUPABASE_SERVICE_ROLE_KEY; // Service Role 還是建議放 env 比較安全

    if (!SB_URL || !SB_ANON) {
        return new Response("Supabase Config Missing", { status: 500 });
    }

    // --- 0. 安全防護層 ---
    
    // 阻擋常見惡意爬蟲 User-Agent
    const ua = request.headers.get("User-Agent") || "";
    if (ua.match(/(GPTBot|ChatGPT|Bytespider|CCBot|FacebookBot|Google-Extended)/i)) {
       return new Response("Access Denied", { status: 403 });
    }

    // --- 1. API 路由優先 ---
    if (url.pathname === "/auth/health") {
      try {
        const res = await fetch(`${SB_URL}/auth/v1/health`, { headers: { "apikey": SB_ANON } });
        return new Response(JSON.stringify({ status: res.ok ? "online" : "error" }), { headers: { "Content-Type": "application/json" } });
      } catch (e) { return new Response(JSON.stringify({ status: "offline" }), { status: 200 }); }
    }

    if (url.pathname === "/auth/otp" && request.method === "POST") {
      const { email } = await request.json();
      // 後端強制檢查：嚴格驗證網域
      const validDomain = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.)?edu\.tw$/.test(email) || email.endsWith("@superinfo.com.tw");
      
      if (!validDomain) {
        // 隱藏內部登入資訊，對外只宣稱支援 edu.tw
        return new Response(JSON.stringify({ error: "僅限教育網域 (*.edu.tw) 登入" }), { status: 403 });
      }
      const redirectTo = `${url.origin}/login`;
      return await fetch(`${SB_URL}/auth/v1/otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "apikey": SB_ANON },
        body: JSON.stringify({ email, create_user: true, data: { redirect_to: redirectTo } })
      });
    }

    if ((url.pathname === "/auth/verify" || url.pathname === "/auth/session") && request.method === "POST") {
      const body = await request.json();
      let access_token, user;

      if (url.pathname === "/auth/session") {
        access_token = body.access_token;
        // 直接用 Token 問 Supabase 取得使用者資料
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
        ctx.waitUntil(fetch(`${SB_URL}/rest/v1/login_logs`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json", 
            "apikey": SB_ANON, 
            "Authorization": `Bearer ${SB_SERVICE}`,
            "Prefer": "return=minimal"
          },
          body: JSON.stringify({ email: user.email })
        }));
        
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Set-Cookie": `sb-access-token=${access_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=31536000` }
        });
      }
      return new Response(JSON.stringify({ error: "驗證失敗" }), { status: 401 });
    }

    // 取得當前使用者資訊 (Email)
    if (url.pathname === "/auth/me") {
        const tokenMatch = cookie.match(/sb-access-token=([^;]+)/);
        if (tokenMatch) {
            // 嘗試快取驗證或直接問 Supabase
            const user = await verifyUserWithSupabase(tokenMatch[1], SB_URL, SB_ANON);
            if (user) {
                return new Response(JSON.stringify({ email: user.email }), { headers: { "Content-Type": "application/json" } });
            }
        }
        return new Response(JSON.stringify({ email: null }), { headers: { "Content-Type": "application/json" } });
    }

    // 登出 (清除 Cookie)
    if (url.pathname === "/auth/logout") {
        return new Response(null, {
            status: 302,
            headers: {
                "Location": "/login",
                "Set-Cookie": "sb-access-token=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0" // 立即過期
            }
        });
    }

    // --- 2. 登入狀態檢查 (透過 API 驗證) ---
    const tokenMatch = cookie.match(/sb-access-token=([^;]+)/);
    let isAuthenticated = false;

    if (tokenMatch) {
       // 為了效能，我們可以加一個極短的 Cache，但這裡為了準確性先直連
       const user = await verifyUserWithSupabase(tokenMatch[1], SB_URL, SB_ANON);
       isAuthenticated = !!user;
    }

    // --- 3. 路由重定向 ---
    if (isAuthenticated && url.pathname === "/login") {
      return Response.redirect(`${url.origin}/`, 302);
    }

    const isPublicAsset = url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg|woff2?|json)$/) || url.pathname === "/login.html";
    if (!isAuthenticated && !isPublicAsset && url.pathname !== "/login") {
      return Response.redirect(`${url.origin}/login`, 302);
    }

    // --- 4. 返回資源 (注入防盜與原始碼隱藏) ---
    if (url.pathname === "/login") {
      const res = await env.ASSETS.fetch(new Request(new URL("/login.html", request.url)));
      // 對登入頁進行原始碼混淆 (暫停使用)
      const originalHtml = await res.text();
      return new Response(originalHtml, { headers: { "Content-Type": "text/html; charset=utf-8" } });
    }

    const response = await env.ASSETS.fetch(request);
    
    // 如果是 HTML 頁面且非登入頁，注入全域腳本並混淆
    if (response.headers.get("Content-Type")?.includes("text/html") && isAuthenticated) {
        let html = await response.text();
        const injection = `
        <style>
          /* 懸浮登出按鈕 */
          #global-auth-bar {
            position: fixed; top: 0; left: 50%; transform: translateX(-50%);
            background: rgba(0,0,0,0.8); backdrop-filter: blur(10px);
            color: white; padding: 8px 16px; border-radius: 0 0 12px 12px;
            font-size: 13px; z-index: 99999; display: flex; align-items: center; gap: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2); transition: top 0.3s;
          }
          #global-auth-bar:hover { padding-bottom: 12px; }
          .auth-btn { color: #ff5e5e; text-decoration: none; font-weight: bold; cursor: pointer; }
          .auth-info { color: #ccc; font-size: 11px; }
        </style>
        <div id="global-auth-bar">
           <span>👤 ${user ? user.email : '已登入'}</span>
           <span class="auth-info">| 系統僅暫存身分識別</span>
           <a href="#" onclick="logout()" class="auth-btn">登出</a>
        </div>
        <script>
           function logout() { if(confirm('確定要登出系統嗎？')) location.href = '/auth/logout'; }
        </script>
        `;
        html = html.replace('</body>', injection + '</body>');
        return new Response(html, response);
    }
    return response;
  },
};

// 輔助函式：HTML 原始碼混淆器 (Worker Safe Version)
function obfuscateHtml(html) {
    // 使用簡單的字元編碼進行混淆，避免 Worker Runtime Error
    // 這裡不使用 btoa/unescape，改用標準的 UTF-8 轉 Base64 邏輯
    const encoder = new TextEncoder();
    const data = encoder.encode(html);
    let binary = '';
    const len = data.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(data[i]);
    }
    // Worker 環境下通常有 btoa，若是 Node.js 環境則需 Buffer，此前 Cloudflare 支援 btoa
    const b64 = btoa(binary);

    return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Loading...</title></head><body><script>
    // Client-side decoding
    const b64 = "${b64}";
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    const decoder = new TextDecoder();
    document.write(decoder.decode(bytes));
    document.close();
    </script><noscript>請啟用 JavaScript 以瀏覽此頁面</noscript></body></html>`;
}
