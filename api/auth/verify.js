export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, token } = req.body;
  const SB_URL = process.env.SUPABASE_URL.replace(/\/$/, "");
  const SB_ANON = process.env.SUPABASE_ANON_KEY;
  const SB_SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY;

  try {
    const response = await fetch(`${SB_URL}/auth/v1/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: SB_ANON },
      body: JSON.stringify({
        email,
        token,
        type: "email",
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: data.msg || data.error_description || "Invalid Token" });
    }

    const access_token = data.access_token;
    const user = data.user;

    if (access_token && user) {
      // Set secure cookie
      res.setHeader(
        "Set-Cookie",
        `sb-access-token=${access_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=31536000`
      );

      // Log login (non-blocking in worker, here we await it for simplicity or background it)
      const ip =
        req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown";
      const ua = req.headers["user-agent"] || "unknown";

      // Async log call (fire and forget)
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
          action: "manual",
          meta_data: { method: "OTP 驗證" },
        }),
      }).catch((e) => console.error("Log error", e));

      return res.status(200).json({ success: true });
    }

    return res.status(401).json({ error: "Unauthorized" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
