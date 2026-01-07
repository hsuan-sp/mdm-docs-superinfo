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
    
    console.log(`[Request] ${request.method} ${url.pathname}`);

    // --- 1. 定義 API 邏輯 (優先處理，不要被靜態資源攔截) ---

    // 健康檢查
    if (url.pathname === "/auth/health") {
      const hasUrl = !!env.SUPABASE_URL;
      const hasKey = !!env.SUPABASE_ANON_KEY;
      console.log(`[Health] URL:${hasUrl}, Key:${hasKey}`);
      
      try {
        const res = await fetch(`${env.SUPABASE_URL}/auth/v1/health`, {
          headers: { "apikey": env.SUPABASE_ANON_KEY }
        });
        return new Response(JSON.stringify({ 
          status: res.ok ? "online" : "error",
          details: `Supabase status: ${res.status}`
        }), { headers: { "Content-Type": "application/json" } });
      } catch (e) {
        return new Response(JSON.stringify({ status: "offline", error: e.message }), { status: 200 });
      }
    }

    // 發送 OTP
    if (url.pathname === "/auth/otp" && request.method === "POST") {
      const { email } = await request.json();
      if (!email.endsWith("@superinfo.com.tw") && !email.endsWith(".edu.tw")) {
        return new Response(JSON.stringify({ error: "禁止登入：僅限指定網域" }), { status: 403 });
      }
      return await fetch(`${env.SUPABASE_URL}/auth/v1/otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "apikey": env.SUPABASE_ANON_KEY },
        body: JSON.stringify({ email, create_user: true })
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

    // --- 2. 處理頁面與靜態資源 ---

    // 登入狀態檢查
    const tokenMatch = cookie.match(/sb-access-token=([^;]+)/);
    const user = tokenMatch ? await verifyJWT(tokenMatch[1], env.JWT_SECRET) : null;
    const isAuthenticated = !!user;

    // 登入頁面
    if (url.pathname === "/login") {
      const res = await env.ASSETS.fetch(new Request(new URL("/login.html", request.url)));
      return new Response(res.body, { headers: { "Content-Type": "text/html; charset=utf-8" } });
    }

    // 靜態資源放行
    const isPublicAsset = url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg|woff2?|json)$/);
    if (isPublicAsset || url.pathname === "/login.html") {
      return await env.ASSETS.fetch(request);
    }

    // 攔截未登入者
    if (!isAuthenticated) {
      return Response.redirect(`${url.origin}/login`, 302);
    }

    // 正常存取內容
    return await env.ASSETS.fetch(request);
  },
};
