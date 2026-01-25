import type { NextApiRequest, NextApiResponse } from "next";
import LogtoClient from "@logto/next";
import { logtoConfig } from "@/lib/logto";
import { getGlossaryData } from "@/lib/data";

/**
 * Glossary API (High Stability)
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 伺服器端現場取回 Context
  const client = new LogtoClient(logtoConfig);
  const context = await client.getContext(req, res);

  if (!context.isAuthenticated) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { lang } = req.query;
    const data = await getGlossaryData(lang === "en" ? "en" : "zh");
    res.setHeader("Cache-Control", "no-store, max-age=0");
    res.status(200).json(data);
  } catch (error) {
    console.error("[Glossary API Error]", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
