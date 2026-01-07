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

    // --- 1. API 路由優先 ---
    if (url.pathname === "/auth/health") {
      try {
        const res = await fetch(`${SB_URL}/auth/v1/health`, { headers: { "apikey": SB_ANON } });
        return new Response(JSON.stringify({ status: res.ok ? "online" : "error" }), { headers: { "Content-Type": "application/json" } });
      } catch (e) { return new Response(JSON.stringify({ status: "offline" }), { status: 200 }); }
    }

    if (url.pathname === "/auth/otp" && request.method === "POST") {
      const { email } = await request.json();
      if (!email.endsWith("@superinfo.com.tw") && !email.endsWith(".edu.tw")) {
        return new Response(JSON.stringify({ error: "禁止登入" }), { status: 403 });
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

    // --- 4. 返回資源 ---
    if (url.pathname === "/login") {
      const res = await env.ASSETS.fetch(new Request(new URL("/login.html", request.url)));
      return new Response(res.body, { headers: { "Content-Type": "text/html; charset=utf-8" } });
    }

    return await env.ASSETS.fetch(request);
  },
};
