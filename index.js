export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const cookie = request.headers.get("Cookie") || "";
    
    // 1. 檢查是否已登入 (透過驗證 Cookie 中的 JWT)
    const isAuthenticated = cookie.includes("sb-access-token");

    // 2. 靜態資源排除 (僅限真的資源，不排除 HTML)
    const isStaticAsset = url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff2?|json)$/);
    if (isStaticAsset || url.pathname === "/superinfo_logo.png") {
      return await env.ASSETS.fetch(request);
    }

    // 3. API: 傳送 OTP
    if (url.pathname === "/auth/otp" && request.method === "POST") {
      const { email } = await request.json();
      
      // 網域檢查邏輯
      const isAllowed = email.endsWith("@superinfo.com.tw") || email.endsWith(".edu.tw");
      if (!isAllowed) {
        return new Response(JSON.stringify({ error: "禁止登入：僅限公司或台灣教育單位信箱 (@*.edu.tw)" }), {
          status: 403,
          headers: { "Content-Type": "application/json" }
        });
      }

      // 呼叫 Supabase 寄送 OTP
      const res = await fetch(`${env.SUPABASE_URL}/auth/v1/otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": env.SUPABASE_ANON_KEY
        },
        body: JSON.stringify({ email, create_user: true })
      });

      return new Response(await res.text(), {
        status: res.status,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 4. API: 驗證 OTP 並紀錄 Email
    if (url.pathname === "/auth/verify" && request.method === "POST") {
      const { email, token } = await request.json();

      const res = await fetch(`${env.SUPABASE_URL}/auth/v1/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": env.SUPABASE_ANON_KEY
        },
        body: JSON.stringify({ email, token, type: "signup" })
      });

      const data = await res.json();

      if (res.ok && data.access_token) {
        // A. 紀錄到 Supabase login_logs (使用 Service Role Key)
        ctx.waitUntil(
          fetch(`${env.SUPABASE_URL}/rest/v1/login_logs`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "apikey": env.SUPABASE_SERVICE_ROLE_KEY,
              "Authorization": `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
              "Prefer": "return=minimal"
            },
            body: JSON.stringify({ email })
          })
        );

        // B. 設定 Cookie 並跳轉 (有效期限 86400 秒)
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Set-Cookie": `sb-access-token=${data.access_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400`
          }
        });
      }

      return new Response(JSON.stringify({ error: "驗證碼不正確或已超過時效" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 5. 登入頁面路由
    if (url.pathname === "/login") {
      const loginHtmlRes = await env.ASSETS.fetch(new Request(new URL("/login.html", request.url)));
      return new Response(loginHtmlRes.body, {
        headers: { "Content-Type": "text/html; charset=utf-8" }
      });
    }

    // 6. 路由攔截：未登入者一律導向 /login
    if (!isAuthenticated) {
      return Response.redirect(`${url.origin}/login`, 302);
    }

    // 7. 已登入，正常存取 VitePress 靜態資源
    return await env.ASSETS.fetch(request);
  },
};
