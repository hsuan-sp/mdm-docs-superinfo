/**
 * Logto Configuration Object
 * 只導出純配置，不進行實例化，防止前端混淆。
 */
export const logtoConfig = {
  endpoint: process.env.LOGTO_ENDPOINT || "https://36dxrv.logto.app/",
  appId: process.env.LOGTO_APP_ID || "gkv7y7qb9hts3wib55g46",
  appSecret: process.env.LOGTO_APP_SECRET || "",
  baseUrl:
    process.env.LOGTO_BASE_URL || "https://mdm-docs-superinfo.netlify.app",
  cookieSecret:
    process.env.LOGTO_COOKIE_SECRET ||
    "complex_secret_for_logto_session_32_chars",
  cookieSecure: process.env.NODE_ENV === "production",
  // 核心穩定性：明確設定 Cookie 作用網域
  cookiePath: "/",
  scopes: ["email", "profile"],
};
