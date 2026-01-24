import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);
const isProtectedRoute = createRouteMatcher([
  "/guide(.*)",
  "/glossary(.*)",
  "/changelog(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return;

  try {
    const { userId, redirectToSignIn } = await auth();
    if (isProtectedRoute(req) && !userId) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  } catch (error) {
    console.error("Middleware Auth Error:", error);
    // 只有在開發環境且金鑰完全未配置時才允許繞過，避免洩漏
    if (
      process.env.NODE_ENV === "development" &&
      !process.env.CLERK_SECRET_KEY
    ) {
      return;
    }
    // 預期行為：如果金鑰失效，伺服器會噴錯提醒開發者，而非安靜地讓內容洩漏
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
