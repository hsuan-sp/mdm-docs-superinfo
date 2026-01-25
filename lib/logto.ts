import LogtoClient from "@logto/next";

// 強制檢查與環境變數回退邏輯
const endpoint = process.env.LOGTO_ENDPOINT || "https://36dxrv.logto.app/";
const appId = process.env.LOGTO_APP_ID || "gkv7y7qb9hts3wib55g46";
const baseUrl =
  process.env.LOGTO_BASE_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://mdm-docs-superinfo.netlify.app"
    : "http://localhost:3000");

export const logtoConfig = {
  endpoint,
  appId,
  appSecret: process.env.LOGTO_APP_SECRET || "",
  baseUrl,
  cookieSecret:
    process.env.LOGTO_COOKIE_SECRET ||
    "complex_secret_at_least_32_characters_long",
  cookieSecure: process.env.NODE_ENV === "production",
  scopes: ["email", "profile"], // 使用字串確保 100% 相容性
};

export const logtoClient = new LogtoClient(logtoConfig);
