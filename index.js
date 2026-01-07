// 輔助函式：處理 Base64URL 解碼 (補足位元並處理特殊字元)
function base64UrlDecode(str) {
  let b64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4) b64 += '=';
  return atob(b64);
}

// 輔助函式：驗證 JWT 簽章
async function verifyJWT(token, secret) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const [headerB64, payloadB64, signatureB64] = parts;
    const encoder = new TextEncoder();
    const data = encoder.encode(`${headerB64}.${payloadB64}`);
    
    const key = await crypto.subtle.importKey(
      "raw", encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false, ["verify"]
    );

    const signature = Uint8Array.from(base64UrlDecode(signatureB64), c => c.charCodeAt(0));
    const isValid = await crypto.subtle.verify("HMAC", key, signature, data);
    
    if (!isValid) return null;

    const payload = JSON.parse(base64UrlDecode(payloadB64));
    if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) return null;

    return payload;
  } catch (err) {
    console.error(`[JWT Error] ${err.message}`);
    return null;
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const cookie = request.headers.get("Cookie") || "";
    
    // --- 1. API 路由優先 (Health, OTP, Verify, Session) ---
    if (url.pathname === "/auth/health") {
      try {
        const res = await fetch(`${env.SUPABASE_URL}/auth/v1/health`, { headers: { "apikey": env.SUPABASE_ANON_KEY } });
        return new Response(JSON.stringify({ status: res.ok ? "online" : "error" }), { headers: { "Content-Type": "application/json" } });
      } catch (e) { return new Response(JSON.stringify({ status: "offline" }), { status: 200 }); }
    }

    if (url.pathname === "/auth/otp" && request.method === "POST") {
      const { email } = await request.json();
      if (!email.endsWith("@superinfo.com.tw") && !email.endsWith(".edu.tw")) {
        return new Response(JSON.stringify({ error: "禁止登入" }), { status: 403 });
      }
      const redirectTo = `${url.origin}/login`;
      return await fetch(`${env.SUPABASE_URL}/auth/v1/otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "apikey": env.SUPABASE_ANON_KEY },
        body: JSON.stringify({ email, create_user: true, data: { redirect_to: redirectTo } })
      });
    }

    if (url.pathname === "/auth/verify" && request.method === "POST" || (url.pathname === "/auth/session" && request.method === "POST")) {
      let access_token, email;
      if (url.pathname === "/auth/session") {
        const body = await request.json();
        access_token = body.access_token;
        const user = await verifyJWT(access_token, env.JWT_SECRET);
        email = user ? user.email : null;
      } else {
        const body = await request.json();
        const res = await fetch(`${env.SUPABASE_URL}/auth/v1/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "apikey": env.SUPABASE_ANON_KEY },
          body: JSON.stringify({ email: body.email, token: body.token, type: "email" })
        });
        const data = await res.json();
        access_token = data.access_token;
        email = body.email;
      }

      if (access_token) {
        if (email) {
          ctx.waitUntil(fetch(`${env.SUPABASE_URL}/rest/v1/login_logs`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "apikey": env.SUPABASE_ANON_KEY, "Authorization": `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}` },
            body: JSON.stringify({ email })
          }));
        }
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Set-Cookie": `sb-access-token=${access_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=31536000` } // 設為一年
        });
      }
      return new Response(JSON.stringify({ error: "驗證失敗" }), { status: 401 });
    }

    // --- 2. 登入狀態檢查 ---
    const tokenMatch = cookie.match(/sb-access-token=([^;]+)/);
    let user = null;
    if (tokenMatch && env.JWT_SECRET) {
       user = await verifyJWT(tokenMatch[1], env.JWT_SECRET);
    }
    const isAuthenticated = !!user;

    // --- 3. 路由重定向邏輯 ---
    
    // 如果已登入卻去訪問 /login，直接送回首頁
    if (isAuthenticated && url.pathname === "/login") {
      return Response.redirect(`${url.origin}/`, 302);
    }

    // 如果未登入且不是靜態資源，送去 /login
    const isPublicAsset = url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg|woff2?|json)$/);
    if (!isAuthenticated && !isPublicAsset && url.pathname !== "/login") {
      return Response.redirect(`${url.origin}/login`, 302);
    }

    // --- 4. 正常返回資源 ---
    if (url.pathname === "/login") {
      const res = await env.ASSETS.fetch(new Request(new URL("/login.html", request.url)));
      return new Response(res.body, { headers: { "Content-Type": "text/html; charset=utf-8" } });
    }

    return await env.ASSETS.fetch(request);
  },
};
