import type { NextApiRequest, NextApiResponse } from "next";
import LogtoClient from "@logto/next";
import { logtoConfig } from "@/lib/logto";
import { getQAData } from "@/lib/data";

/**
 * Guide API (High Stability)
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = new LogtoClient(logtoConfig);
  const context = await client.getContext(req, res);

  if (!context.isAuthenticated) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { lang } = req.query;
    const data = await getQAData(lang === "en" ? "en" : "zh");
    res.status(200).json(data);
  } catch (error) {
    console.error("[Guide API Error]", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
