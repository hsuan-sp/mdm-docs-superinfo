export default async function handler(req, res) {
  const cookie = req.headers.cookie || "";
  const tokenMatch = cookie.match(/sb-access-token=([^;]+)/);
  const access_token = tokenMatch ? tokenMatch[1] : null;

  if (!access_token) {
    return res.status(200).json({ email: null });
  }

  const SB_URL = process.env.SUPABASE_URL.replace(/\/$/, "");
  const SB_ANON = process.env.SUPABASE_ANON_KEY;

  try {
    const response = await fetch(`${SB_URL}/auth/v1/user`, {
      headers: { Authorization: `Bearer ${access_token}`, apikey: SB_ANON },
    });

    if (response.ok) {
      const user = await response.json();
      return res.status(200).json({ email: user.email });
    }
    return res.status(200).json({ email: null });
  } catch (error) {
    return res.status(200).json({ email: null });
  }
}
