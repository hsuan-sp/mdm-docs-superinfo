export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const cookie = request.headers.get("Cookie") || "";
    
    // 1. 檢查是否已登入 (驗證 Cookie)
    const isAuthenticated = cookie.includes("sb-access-token");

    // --- 2. 靜態資源、登入頁不攔截 ---
    const isLoginPage = url.pathname === "/login";
    const isPublicAsset = url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg|woff2?|json)$/);
    
    // 這裡我們也放行 login.html 檔案本身
    if (isLoginPage || isPublicAsset || url.pathname === "/login.html") {
      return await env.ASSETS.fetch(request);
    }

    // --- 3. API: 傳送 OTP ---
    if (url.pathname === "/auth/otp" && request.method === "POST") {
      try {
        const { email } = await request.json();
        
        // 網域檢查邏輯
        const isAllowed = email.endsWith("@superinfo.com.tw") || email.endsWith(".edu.tw");
        if (!isAllowed) {
          return new Response(JSON.stringify({ error: "禁止登入：僅限公司或台灣教育單位信箱 (@*.edu.tw)" }), {
            status: 403,
            headers: { "Content-Type": "application/json" }
          });
        }

        // 呼叫 Supabase 寄送 OTP (使用 GoTrue API 格式)
        const res = await fetch(`${env.SUPABASE_URL}/auth/v1/otp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": env.SUPABASE_ANON_KEY
          },
          body: JSON.stringify({ email, create_user: true })
        });

        const status = res.status;
        const text = await res.text();
        return new Response(text, {
          status: status,
          headers: { "Content-Type": "application/json" }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: "系統錯誤" }), { status: 500 });
      }
    }

    // --- 4. API: 驗證 OTP 並紀錄 Email ---
    if (url.pathname === "/auth/verify" && request.method === "POST") {
      try {
        const { email, token } = await request.json();

        // 呼叫 Supabase 驗證 (type 應該是 'otp' 或 'signup/magiclink'，Supabase OTP 主要是 'email' type)
        const res = await fetch(`${env.SUPABASE_URL}/auth/v1/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": env.SUPABASE_ANON_KEY
          },
          body: JSON.stringify({ email, token, type: "email" })
        });

        const data = await res.json();

        if (res.ok && data.access_token) {
          // A. 紀錄到 Supabase login_logs (背景執行)
          ctx.waitUntil(
            fetch(`${env.SUPABASE_URL}/rest/v1/login_logs`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "apikey": env.SUPABASE_ANON_KEY,
                "Authorization": `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
                "Prefer": "return=minimal"
              },
              body: JSON.stringify({ email })
            })
          );

          // B. 設定 Cookie (有效期限 86400 秒)
          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Set-Cookie": `sb-access-token=${data.access_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400`
            }
          });
        }

        return new Response(JSON.stringify({ error: "驗證碼不正確或已失效" }), {
          status: 401,
          headers: { "Content-Type": "application/json" }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: "驗證系統異常" }), { status: 500 });
      }
    }

    // --- 5. 路由攔截：未登入者一律導向 /login ---
    if (!isAuthenticated) {
      // 偵錯用：如果訪問的是首頁或 HTML 頁面才跳轉
      return Response.redirect(`${url.origin}/login`, 302);
    }

    // --- 6. 已登入，正常存取資源 ---
    return await env.ASSETS.fetch(request);
  },
};
