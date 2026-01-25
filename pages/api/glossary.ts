import { type NextRequest } from "next/server";
import { logtoClient } from "@/lib/logto";
import { getGlossaryData } from "@/lib/data";

export const runtime = "edge";

/**
 * Glossary API - Cloudflare Edge Implementation
 * 直接調用 getLogtoContext 進行身分檢查，解決 withLogtoApiRoute 缺失問題。
 */
export default async function handler(req: NextRequest) {
  // 1. 获取 Context
  const context = await logtoClient.getLogtoContext(req);

  if (!context.isAuthenticated) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }

  // 2. 获取数据
  try {
    const url = new URL(req.url);
    const lang = url.searchParams.get("lang");
    const data = await getGlossaryData(lang === "en" ? "en" : "zh");

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
