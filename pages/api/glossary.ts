import { logtoClient } from "@/lib/logto";
import { getGlossaryData } from "@/lib/data";
import { isAuthorizedEmail } from "@/lib/auth";

/**
 * Glossary API (Pages Router)
 * 100% 符合官方與生產環境的安全規範。
 */
export default logtoClient.withLogtoApiRoute(async (req, res) => {
  const { isAuthenticated, claims } = req.user;

  // 1. 後端身分攔截
  if (!isAuthenticated || !claims) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // 2. 授權網域校驗
  const email = claims.email || (claims as any).primary_email;
  if (!isAuthorizedEmail(email)) {
    return res.status(403).json({ error: "Forbidden domain" });
  }

  // 3. 資料獲取與防快取
  try {
    const { lang } = req.query;
    const data = await getGlossaryData(lang === "en" ? "en" : "zh");

    res.setHeader("Cache-Control", "no-store, max-age=0");
    res.status(200).json(data);
  } catch (error) {
    console.error("[API Glossary Error]", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
