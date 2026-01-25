import { logtoClient } from "@/lib/logto";
import { getQAData } from "@/lib/data";
import { isAuthorizedEmail } from "@/lib/auth";

/**
 * Guide API (Pages Router)
 * 依照官方規範使用 withLogtoApiRoute。
 */
export default logtoClient.withLogtoApiRoute(async (req, res) => {
  const { isAuthenticated, claims } = req.user;

  // 1. 安全攔截
  if (!isAuthenticated || !claims) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // 2. 獲取 Email 並判定
  const email =
    claims.email ||
    (claims as any).primary_email ||
    (claims as any).email_address;
  if (!isAuthorizedEmail(email)) {
    return res.status(403).json({ error: "Forbidden domain" });
  }

  // 3. 數據回傳
  try {
    const { lang } = req.query;
    const data = await getQAData(lang === "en" ? "en" : "zh");

    res.setHeader("Cache-Control", "no-store, max-age=0");
    res.status(200).json(data);
  } catch (error) {
    console.error("[API Guide Error]", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
