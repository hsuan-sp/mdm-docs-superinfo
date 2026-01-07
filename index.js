// 輔助函式：驗證 JWT 簽章 (使用 Web Crypto API)
async function verifyJWT(token, secret) {
  try {
    const [headerB64, payloadB64, signatureB64] = token.split('.');
    const encoder = new TextEncoder();
    const data = encoder.encode(`${headerB64}.${payloadB64}`);
    const key = await crypto.subtle.importKey(
      "raw", encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false, ["verify"]
    );
    const signature = Uint8Array.from(atob(signatureB64.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));
    const isValid = await crypto.subtle.verify("HMAC", key, signature, data);
    if (!isValid) return null;
    const payload = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')));
    if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) return null;
    return payload;
  } catch (err) { return null; }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const cookie = request.headers.get("Cookie") || "";
    
    // --- 1. 特別處理：從網址獲取 Token (Magic Link) ---
    // Supabase Magic Link 通常會跳轉回 /#access_token=... 或是 /?code=...
    // 為了讓 Worker 攔截到，前端會需要把這個送到後端，
    // 但因為 # 後面的東西後端看不到，我們這裡先處理 ?code= 的部分
    const code = url.searchParams.get("code");
    if (code) {
      // 這裡可以透過 exchange code 邏輯處理，但為了簡單，我們建議使用者
      // 進入登入頁後，前端會處理 # 之後的 fragment。
    }

    // --- 2. API 路由 (健康檢查、寄送、驗證) ---

    // 健康檢查
    if (url.pathname === "/auth/health") {
      try {
        const res = await fetch(`${env.SUPABASE_URL}/auth/v1/health`, {
          headers: { "apikey": env.SUPABASE_ANON_KEY }
        });
        return new Response(JSON.stringify({ status: res.ok ? "online" : "error" }), { 
          headers: { "Content-Type": "application/json" } 
        });
      } catch (e) {
        return new Response(JSON.stringify({ status: "offline" }), { status: 200 });
      }
    }

    // 發送 OTP / Magic Link
    // 發送 OTP / Magic Link
    if (url.pathname === "/auth/otp" && request.method === "POST") {
      const { email } = await request.json();
      if (!email.endsWith("@superinfo.com.tw") && !email.endsWith(".edu.tw")) {
        return new Response(JSON.stringify({ error: "禁止登入：僅限指定網域" }), { status: 403 });
      }
      
      // 明確指定 redirect_to 到 /login，這樣 Magic Link 帶的 hash fragment 才會保留在客戶端
      const redirectTo = `${url.origin}/login`;

      return await fetch(`${env.SUPABASE_URL}/auth/v1/otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "apikey": env.SUPABASE_ANON_KEY },
        body: JSON.stringify({ 
          email, 
          create_user: true,
          data: { redirect_to: redirectTo }
        })
      });
    }

    // 驗證 OTP
    if (url.pathname === "/auth/verify" && request.method === "POST") {
      const { email, token } = await request.json();
      const res = await fetch(`${env.SUPABASE_URL}/auth/v1/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "apikey": env.SUPABASE_ANON_KEY },
        body: JSON.stringify({ email, token, type: "email" })
      });
      const data = await res.json();
      if (res.ok && data.access_token) {
        ctx.waitUntil(fetch(`${env.SUPABASE_URL}/rest/v1/login_logs`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json", 
            "apikey": env.SUPABASE_ANON_KEY, 
            "Authorization": `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}` 
          },
          body: JSON.stringify({ email })
        }));
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Set-Cookie": `sb-access-token=${data.access_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400` }
        });
      }
      return new Response(JSON.stringify({ error: "驗證失敗" }), { status: 401 });
    }

    // --- 3. API: 處理 Magic Link 回調並紀錄 ---
    if (url.pathname === "/auth/session" && request.method === "POST") {
      const { access_token } = await request.json();
      const user = await verifyJWT(access_token, env.JWT_SECRET);
      
      if (user && user.email) {
        // 紀錄登入
        ctx.waitUntil(fetch(`${env.SUPABASE_URL}/rest/v1/login_logs`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json", 
            "apikey": env.SUPABASE_ANON_KEY, 
            "Authorization": `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}` 
          },
          body: JSON.stringify({ email: user.email })
        }));

        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Set-Cookie": `sb-access-token=${access_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400` }
        });
      }
      return new Response(JSON.stringify({ error: "無效的 Session" }), { status: 401 });
    }

    // --- 4. 登入狀態檢查 (JWT 驗證) ---
    const tokenMatch = cookie.match(/sb-access-token=([^;]+)/);
    // 詳細 Log: 偵測到的 Cookie 狀態
    console.log(`[Auth Check] Cookie present: ${!!cookie}, Token match: ${!!tokenMatch}`);
    
    let user = null;
    if (tokenMatch) {
       console.log(`[Auth Check] Verifying token signature...`);
       user = await verifyJWT(tokenMatch[1], env.JWT_SECRET);
       console.log(`[Auth Check] User verified: ${!!user}`);
    }
    const isAuthenticated = !!user;

    // --- 4. 靜態資源與路由 ---
    if (url.pathname === "/login") {
      const res = await env.ASSETS.fetch(new Request(new URL("/login.html", request.url)));
      return new Response(res.body, { headers: { "Content-Type": "text/html; charset=utf-8" } });
    }

    const isPublicAsset = url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg|woff2?|json)$/);
    if (isPublicAsset || url.pathname === "/login.html") {
      return await env.ASSETS.fetch(request);
    }

    if (!isAuthenticated) {
      // 如果網址出現了 Supabase 的 fragment (#access_token=...)，讓網頁透過前端處理
      return Response.redirect(`${url.origin}/login`, 302);
    }

    return await env.ASSETS.fetch(request);
  },
};
