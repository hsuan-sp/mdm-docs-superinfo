import LogtoClient from "@logto/next";

/**
 * Logto Configuration - Pages Router Standard
 */
const isProd = process.env.NODE_ENV === "production";

export const logtoConfig = {
  endpoint: process.env.LOGTO_ENDPOINT || "https://36dxrv.logto.app/",
  appId: process.env.LOGTO_APP_ID || "gkv7y7qb9hts3wib55g46",
  appSecret: process.env.LOGTO_APP_SECRET || "",
  baseUrl:
    process.env.LOGTO_BASE_URL ||
    (isProd
      ? "https://mdm-docs-superinfo.netlify.app"
      : "http://localhost:3000"),
  cookieSecret:
    process.env.LOGTO_COOKIE_SECRET ||
    "complex_secret_at_least_32_characters_long",
  cookieSecure: isProd, // 確保在 Netlify 上一定是 true
  scopes: ["email", "profile"],
};

export const logtoClient = new LogtoClient(logtoConfig);
