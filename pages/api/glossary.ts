import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { getGlossaryData } from "@/lib/data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res
      .status(401)
      .json({ error: "Unauthorized. Please sign in to access this content." });
  }

  try {
    const { lang } = req.query;
    const data = await getGlossaryData(lang === "en" ? "en" : "zh");

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Data not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("API Glossary Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
