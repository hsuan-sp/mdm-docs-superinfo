import { type NextRequest } from "next/server";
import { logtoClient } from "@/lib/logto";
import { getQAData } from "@/lib/data";

export const runtime = "edge";

/**
 * Guide API - Cloudflare Edge Implementation
 * 採用標準 Edge Request/Response 與 getLogtoContext 身分檢查。
 */
export default async function handler(req: NextRequest) {
  const context = await logtoClient.getLogtoContext(req);

  if (!context.isAuthenticated) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }

  try {
    const url = new URL(req.url);
    const lang = url.searchParams.get("lang");
    const data = await getQAData(lang === "en" ? "en" : "zh");

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
