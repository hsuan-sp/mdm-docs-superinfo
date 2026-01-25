import type { NextApiRequest, NextApiResponse } from "next";
import { logtoClient } from "@/lib/logto";
import { getQAData } from "@/lib/data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 1. 伺服器端安全檢查 (Server-side Security Check)
  const { isAuthenticated, claims } = await logtoClient.getLogtoContext(
    req,
    res
  );

  if (!isAuthenticated || !claims) {
    return res.status(401).json({ error: "Unauthorized: Please sign in" });
  }

  const email = (
    claims.email ||
    (claims as any).primary_email ||
    ""
  ).toLowerCase();
  const isEdu = /\.edu\.tw$/i.test(email);
  const isOfficial = /@superinfo\.com\.tw$/i.test(email);

  if (!isEdu && !isOfficial) {
    console.warn("API direct access blocked for unauthorized domain:", email);
    return res
      .status(403)
      .json({ error: "Forbidden: Education email required" });
  }

  // 2. 安全性標頭：防止敏感數據在本地緩存
  res.setHeader("Cache-Control", "no-store, max-age=0");
  try {
    const { lang } = req.query;
    const data = await getQAData(lang === "en" ? "en" : "zh");

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Data not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("API Guide Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
