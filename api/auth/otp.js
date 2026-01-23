export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email required" });
  }

  // Education domain restrict
  if (!email.match(/@.*\.edu\.tw$/) && !email.endsWith("@superinfo.com.tw")) {
    return res.status(403).json({ error: "僅限教育網域登入" });
  }

  const SB_URL = process.env.SUPABASE_URL.replace(/\/$/, "");
  const SB_ANON = process.env.SUPABASE_ANON_KEY;

  try {
    const response = await fetch(`${SB_URL}/auth/v1/otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: SB_ANON },
      body: JSON.stringify({
        email,
        create_user: true,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return res
        .status(response.status)
        .json({
          error: data.msg || data.error_description || "Error sending OTP",
        });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
