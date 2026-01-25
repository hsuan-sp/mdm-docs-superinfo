import type { NextApiRequest, NextApiResponse } from "next";
import { logtoClient } from "@/lib/logto";
import { getQAData } from "@/lib/data";

/**
 * Guide API - Open Mode
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const context = await (logtoClient as any).getContext(req, res);

  if (!context.isAuthenticated) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { lang } = req.query;
    const data = await getQAData(lang === "en" ? "en" : "zh");
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
}
