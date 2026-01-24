import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/", "/sign-in", "/sign-up", "/api/logto"];
const protectedRoutes = ["/guide", "/glossary", "/changelog"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 允許公開路由和 API routes 通過
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // 檢查是否為受保護路由
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // 檢查是否有認證 cookie（簡化版本）
    const hasAuthCookie = request.cookies.has("logto_session");

    if (!hasAuthCookie) {
      // 重導向到登入
      const signInUrl = new URL("/api/logto/sign-in", request.url);
      signInUrl.searchParams.set("returnUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
