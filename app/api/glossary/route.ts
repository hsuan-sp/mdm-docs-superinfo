import { NextResponse } from "next/server";
import { loadGlossary } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang") || "zh-TW";

  const locale = lang === "en" ? "en" : "zh";

  try {
    const data = await loadGlossary(locale);
    return NextResponse.json(data);
  } catch (error) {
    console.error("[API] Failed to load glossary:", error);
    return NextResponse.json(
      { error: "Failed to load glossary" },
      { status: 500 }
    );
  }
}
