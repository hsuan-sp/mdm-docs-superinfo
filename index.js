// 輔助函式：驗證 JWT 簽章 (使用 Web Crypto API)
async function verifyJWT(token, secret) {
  try {
    const [headerB64, payloadB64, signatureB64] = token.split('.');
    const encoder = new TextEncoder();
    const data = encoder.encode(`${headerB64}.${payloadB64}`);
    
    // 將 Secret 轉為 CryptoKey
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    // 驗證簽章
    const signature = Uint8Array.from(atob(signatureB64.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));
    const isValid = await crypto.subtle.verify("HMAC", key, signature, data);
    
    if (!isValid) return null;

    // 解析 Payload 檢查過期時間
    const payload = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')));
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && now > payload.exp) return null;

    return payload;
  } catch (err) {
    return null;
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const cookie = request.headers.get("Cookie") || "";
    
    // 1. 從 Cookie 提取 Token
    const tokenMatch = cookie.match(/sb-access-token=([^;]+)/);
    const token = tokenMatch ? tokenMatch[1] : null;

    // 2. 核心驗證：使用 JWT_SECRET 檢查 Token 真偽
    let user = null;
    if (token && env.JWT_SECRET) {
      user = await verifyJWT(token, env.JWT_SECRET);
    }
    const isAuthenticated = !!user;

    // --- 3. 靜態資源、登入、健康檢查不受限 ---
    const isLoginPage = url.pathname === "/login";
    const isHealthCheck = url.pathname === "/auth/health";
    const isAuthApi = url.pathname.startsWith("/auth/");
    const isPublicAsset = url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg|woff2?|json)$/);
    
    if (isLoginPage || isHealthCheck || isAuthApi || isPublicAsset || url.pathname === "/login.html") {
      return await env.ASSETS.fetch(request);
    }

    // --- 4. 健康檢查 API ---
    if (url.pathname === "/auth/health") {
      try {
        if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
          return new Response(JSON.stringify({ status: "error", error: "環境變數未設定" }), { status: 200 });
        }
        const res = await fetch(`${env.SUPABASE_URL}/auth/v1/health`, { headers: { "apikey": env.SUPABASE_ANON_KEY } });
        return new Response(JSON.stringify({ status: res.ok ? "online" : "error" }), { status: 200 });
      } catch (e) {
        return new Response(JSON.stringify({ status: "offline" }), { status: 200 });
      }
    }

    // --- 5. OTP 發送 API ---
    if (url.pathname === "/auth/otp" && request.method === "POST") {
      const { email } = await request.json();
      const isAllowed = email.endsWith("@superinfo.com.tw") || email.endsWith(".edu.tw");
      if (!isAllowed) {
        return new Response(JSON.stringify({ error: "禁止登入：僅限指定網域" }), { status: 403 });
      }
      return await fetch(`${env.SUPABASE_URL}/auth/v1/otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "apikey": env.SUPABASE_ANON_KEY },
        body: JSON.stringify({ email, create_user: true })
      });
    }

    // --- 6. OTP 驗證 API ---
    if (url.pathname === "/auth/verify" && request.method === "POST") {
      const { email, token: otpToken } = await request.json();
      const res = await fetch(`${env.SUPABASE_URL}/auth/v1/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "apikey": env.SUPABASE_ANON_KEY },
        body: JSON.stringify({ email, token: otpToken, type: "email" })
      });
      const data = await res.json();
      if (res.ok && data.access_token) {
        // 背景紀錄 Email 到資料表
        ctx.waitUntil(fetch(`${env.SUPABASE_URL}/rest/v1/login_logs`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json", 
            "apikey": env.SUPABASE_ANON_KEY, 
            "Authorization": `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}` 
          },
          body: JSON.stringify({ email })
        }));
        // 回傳並設定 Cookie
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Set-Cookie": `sb-access-token=${data.access_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400` }
        });
      }
      return new Response(JSON.stringify({ error: "驗證失敗" }), { status: 401 });
    }

    // --- 7. 最終攔截：未登入者導向 /login ---
    if (!isAuthenticated) {
      return Response.redirect(`${url.origin}/login`, 302);
    }

    return await env.ASSETS.fetch(request);
  },
};
