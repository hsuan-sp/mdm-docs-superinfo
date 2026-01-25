/**
 * Logto Configuration for Pages Router
 * 這個檔案只負責導出配置物件，實例化動作由各個 API 路由在伺服器端現場執行。
 * 這能保證前端引入此檔案時不會觸發 Node.js 專屬模組，解決 500 錯誤。
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
  cookiePath: "/", // 確保全網域可用
  scopes: ["email", "profile"], // 為了取回身分資訊
};
