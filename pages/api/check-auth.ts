import { logtoClient } from "@/lib/logto";
import { isAuthorizedEmail } from "@/lib/auth";

/**
 * Check Auth API (Pages Router)
 * 基於 withLogtoApiRoute 的標準實作
 */
export default logtoClient.withLogtoApiRoute(async (req, res) => {
  const { isAuthenticated, claims } = req.user;

  // 1. 檢查是否登入
  if (!isAuthenticated || !claims) {
    return res.status(401).json({ authorized: false, reason: "not_logged_in" });
  }

  // 2. 獲取 Email 並校驗
  // 同步檢查多個可能的 Email 欄位以增強相容性
  const email =
    claims.email ||
    (claims as any).primary_email ||
    (claims as any).email_address;

  if (!email) {
    return res
      .status(403)
      .json({ authorized: false, reason: "no_email_provided" });
  }

  if (isAuthorizedEmail(email)) {
    return res.status(200).json({ authorized: true, email });
  } else {
    return res
      .status(403)
      .json({ authorized: false, reason: "invalid_domain" });
  }
});
