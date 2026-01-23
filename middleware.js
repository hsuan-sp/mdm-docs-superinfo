import { NextResponse } from "next/server";

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const { pathname } = url;

  // 1. 定義定義公開路徑 (不需驗證)
  // 包含靜態內容, login 頁面, 與 auth API
  const isPublicAsset = pathname.match(
    /\.(css|js|png|jpg|jpeg|gif|ico|svg|woff2?|json)$/
  );
  const isLoginPage = pathname === "/login" || pathname === "/login.html";
  const isAuthApi =
    pathname.startsWith("/api/auth") || pathname.startsWith("/auth");

  if (isPublicAsset || isLoginPage || isAuthApi) {
    return NextResponse.next();
  }

  // 2. 檢查驗證令牌
  const cookie = req.cookies.get("sb-access-token");
  const token = cookie ? cookie.value : null;

  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // 3. 驗證 Token 合法性 (向 Supabase 確認)
  // 注意：在 Middleware 中執行 fetch 會稍微增加延遲，這與原本 Worker 行為一致。
  try {
    const SB_URL = process.env.SUPABASE_URL.replace(/\/$/, "");
    const SB_ANON = process.env.SUPABASE_ANON_KEY;

    const res = await fetch(`${SB_URL}/auth/v1/user`, {
      headers: { Authorization: `Bearer ${token}`, apikey: SB_ANON },
    });

    if (!res.ok) {
      // Token 無效，清除 Cookie 並導向登入
      const redirectRes = NextResponse.redirect(new URL("/login", req.url));
      redirectRes.cookies.delete("sb-access-token");
      return redirectRes;
    }

    return NextResponse.next();
  } catch (e) {
    // 網路錯誤時暫時允許通過，或導向錯誤頁面
    console.error("Middleware Auth Error:", e);
    return NextResponse.next();
  }
}

// 設定 Middleware 攔截範圍：攔截所有路徑，除了 _next 內部檔案
export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
