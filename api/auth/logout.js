export default function handler(req, res) {
  res.setHeader(
    "Set-Cookie",
    "sb-access-token=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0"
  );
  res.redirect("/login.html");
}
