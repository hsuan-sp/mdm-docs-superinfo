import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 擴大白名單，確保不會攔截首頁與核心頁面
const publicRoutes = [
  "/",
  "/sign-in",
  "/sign-up",
  "/api/logto",
  "/changelog",
  "/unauthorized",
];
const protectedRoutes = ["/guide", "/glossary"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. 優先解除白名單
  if (
    publicRoutes.some(
      (route) => pathname === route || pathname.startsWith("/api/logto")
    )
  ) {
    return NextResponse.next();
  }

  // 2. 檢查受保護路由
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    const hasAuthCookie = request.cookies.has("logto_session");

    if (!hasAuthCookie) {
      const signInUrl = new URL("/api/logto/sign-in", request.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
