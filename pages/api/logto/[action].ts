import { logtoClient } from "@/lib/logto";
import { type NextRequest } from "next/server";

export const runtime = "edge";

/**
 * Logto Auth API Handler for Edge Runtime
 * 由於 @logto/next/edge 不提供 handleAuthRoutes，我們需手動導流不同動作。
 */
export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get("action");

  try {
    switch (action) {
      case "sign-in":
        return await logtoClient.handleSignIn()(req);
      case "sign-in-callback":
        return await logtoClient.handleSignInCallback()(req);
      case "sign-out":
        return await logtoClient.handleSignOut()(req);
      case "user":
        return await logtoClient.handleUser()(req);
      default:
        return new Response(null, { status: 404 });
    }
  } catch (error: any) {
    console.error("[Logto Edge API Error]", error);
    return new Response(
      JSON.stringify({
        error: "Authentication Error",
        message: error.message,
      }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      }
    );
  }
}
