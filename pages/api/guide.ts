import type { NextApiRequest, NextApiResponse } from "next";
import { logtoClient } from "@/lib/logto";
import { getQAData } from "@/lib/data";

// ⚠️ 重要：一定要拿掉 runtime = "edge"，否則 OpenNext 會編譯失敗
// export const runtime = "edge"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 1. 💡 建立相容性請求物件 (相容 Node.js 與 Logto Edge SDK)
    // 我們手動將 Node 的 req.headers 轉成 Web 標準的 Headers 物件
    const requestForLogto = (req.headers as any).get
      ? req
      : new Request(`http://${req.headers.host}${req.url}`, {
        headers: new Headers(req.headers as any),
        method: req.method,
      });

    // 2. 檢查身分 (傳入處理過的物件)
    const context = await logtoClient.getLogtoContext(requestForLogto as any);

    if (!context.isAuthenticated) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Sign-in session not found or expired",
      });
    }

    // 3. 獲取參數 (Pages Router 直接從 req.query 拿，比 URL 解析簡單多了)
    const lang = req.query.lang as string;

    // 4. 獲取數據
    const data = await getQAData(lang === "en" ? "en" : "zh");

    // 5. 回傳回應 (使用標準 res 物件)
    res.setHeader("Cache-Control", "no-store, max-age=0");
    return res.status(200).json(data);

  } catch (error: any) {
    console.error("[Guide API Error]:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
}