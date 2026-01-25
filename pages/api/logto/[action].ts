import { logtoClient } from "@/lib/logto";

/**
 * Logto Auth API Handler (Explicit Mode)
 * 手動處理不同動作，這在 Netlify 環境下比 handleAuthRoutes 更穩定且易於偵錯。
 */
export default async function handler(req: any, res: any) {
  const { action } = req.query;

  try {
    switch (action) {
      case "sign-in":
        return await logtoClient.handleSignIn()(req, res);
      case "sign-in-callback":
      case "callback":
        return await logtoClient.handleSignInCallback()(req, res);
      case "sign-out":
        return await logtoClient.handleSignOut()(req, res);
      case "user":
        return await logtoClient.handleUser()(req, res);
      default:
        res.status(404).end();
    }
  } catch (error: any) {
    console.error("[Logto API Error]", error);
    res.status(500).json({
      error: "Authentication Error",
      message: error.message,
      detail: "Check LOGTO_APP_SECRET and Redirect URI in Logto Console",
    });
  }
}
