import type { NextApiRequest, NextApiResponse } from "next";
import LogtoClient from "@logto/next";
import { logtoConfig } from "@/lib/logto";
import { isAuthorizedEmail } from "@/lib/auth";

/**
 * Check Auth API (Secure Implementation)
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = new LogtoClient(logtoConfig);
  const { isAuthenticated, claims } = await client.getLogtoContext(req, res);

  if (!isAuthenticated || !claims) {
    return res.status(401).json({ authorized: false, reason: "not_logged_in" });
  }

  // 同時相容多個 Email 欄位
  const email = claims.email || (claims as any).primary_email;

  if (!email) {
    return res
      .status(403)
      .json({ authorized: false, reason: "no_email_provided" });
  }

  if (isAuthorizedEmail(email)) {
    return res.status(200).json({ authorized: true, email });
  } else {
    return res
      .status(403)
      .json({ authorized: false, reason: "invalid_domain" });
  }
}
