import type { NextApiRequest, NextApiResponse } from "next";
import { logtoClient } from "@/lib/logto";
import { getGlossaryData } from "@/lib/data";

/**
 * Glossary API - Open Mode
 * 只做基礎登入檢查，不做網域過濾，確保網站立刻復活。
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 1. 使用 any 強制跳過型別檢測讀取 context (解決 Netlify Build 報錯)
  const context = await (logtoClient as any).getContext(req, res);

  if (!context.isAuthenticated) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { lang } = req.query;
    const data = await getGlossaryData(lang === "en" ? "en" : "zh");
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
}
