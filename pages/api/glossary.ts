import type { NextApiRequest, NextApiResponse } from "next";
import { logtoClient } from "@/lib/logto";
import { getGlossaryData } from "@/lib/data";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 💡 關鍵：相容性補丁
    // 讓 Logto SDK 無論在 Node 還是 Edge 環境下都能讀到 Header
    const requestForLogto = (req.headers as any).get
      ? req
      : new Request(`http://${req.headers.host}${req.url}`, {
        headers: new Headers(req.headers as any),
        method: req.method,
      });

    // 1. 檢查身分 (傳入這個經過處理的請求)
    const context = await logtoClient.getLogtoContext(requestForLogto as any);

    if (!context.isAuthenticated) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Sign-in session not found or expired",
      });
    }

    // 2. 獲取參數 (Pages Router 標準寫法)
    const { lang } = req.query;

    // 3. 獲取數據
    const data = await getGlossaryData(lang === "en" ? "en" : "zh");

    // 4. 回傳回應 (Pages Router 標準寫法)
    res.setHeader("Cache-Control", "no-store, max-age=0");
    return res.status(200).json(data);

  } catch (error: any) {
    console.error("[Glossary API Error]:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
}