import { NextResponse } from "next/server";
import { getChangelogData } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang") || "zh-TW";

  const locale = lang === "en" ? "en" : "zh";

  try {
    const data = await getChangelogData(locale);
    return NextResponse.json(data);
  } catch (error) {
    console.error("[API] Failed to load changelog:", error);
    return NextResponse.json(
      { error: "Failed to load changelog" },
      { status: 500 }
    );
  }
}
