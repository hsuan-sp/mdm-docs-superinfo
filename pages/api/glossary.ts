import type { NextApiRequest, NextApiResponse } from "next";
import LogtoClient from "@logto/next";
import { logtoConfig } from "@/lib/logto";
import { getGlossaryData } from "@/lib/data";
import { isAuthorizedEmail } from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = new LogtoClient(logtoConfig);
  const { isAuthenticated, claims } = await client.getLogtoContext(req, res);

  if (!isAuthenticated || !claims) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const email = claims.email || (claims as any).primary_email;
  if (!isAuthorizedEmail(email)) {
    return res.status(403).json({ error: "Forbidden domain" });
  }

  try {
    const { lang } = req.query;
    const data = await getGlossaryData(lang === "en" ? "en" : "zh");

    res.setHeader("Cache-Control", "no-store, max-age=0");
    res.status(200).json(data);
  } catch (error) {
    console.error("[API Glossary Error]", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
