export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { access_token } = req.body;
  const SB_URL = process.env.SUPABASE_URL.replace(/\/$/, "");
  const SB_ANON = process.env.SUPABASE_ANON_KEY;
  const SB_SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY;

  try {
    // Verify token with Supabase
    const response = await fetch(`${SB_URL}/auth/v1/user`, {
      headers: { Authorization: `Bearer ${access_token}`, apikey: SB_ANON },
    });

    const user = response.ok ? await response.json() : null;

    if (user) {
      res.setHeader(
        "Set-Cookie",
        `sb-access-token=${access_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=31536000`
      );

      const ip =
        req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown";
      const ua = req.headers["user-agent"] || "unknown";

      fetch(`${SB_URL}/rest/v1/login_logs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SB_SERVICE,
          Authorization: `Bearer ${SB_SERVICE}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          email: user.email,
          user_id: user.id,
          ip_address: ip,
          user_agent: ua,
          action: "auto",
          meta_data: { method: "自動快取" },
        }),
      }).catch((e) => console.error("Log error", e));

      return res.status(200).json({ success: true });
    }

    return res.status(401).json({ error: "Invalid Token" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
