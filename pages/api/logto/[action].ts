import LogtoClient from "@logto/next";
import { logtoConfig } from "@/lib/logto";

/**
 * Logto Auth API Handler
 * 採用「請求即建立」模式，確保 Session 對接 100% 正確。
 */
export default async function handler(req: any, res: any) {
  const { action } = req.query;
  const client = new LogtoClient(logtoConfig);

  try {
    switch (action) {
      case "sign-in":
        return await client.handleSignIn()(req, res);
      case "sign-in-callback":
      case "callback":
        return await client.handleSignInCallback()(req, res);
      case "sign-out":
        return await client.handleSignOut()(req, res);
      case "user":
        return await client.handleUser()(req, res);
      default:
        res.status(404).end();
    }
  } catch (error: any) {
    console.error("[Logto API Error]", error);
    res.status(500).json({
      error: "Authentication Error",
      message: error.message,
    });
  }
}
