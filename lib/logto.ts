import LogtoClient from "@logto/next/edge";
import { UserScope } from "@logto/next/edge";

/**
 * Logto Configuration & Client for Cloudflare Pages (Edge Runtime)
 * 使用 @logto/next/edge 並建立全域實例，符合 Edge 執行環境規範。
 */
export const logtoConfig = {
  endpoint: process.env.LOGTO_ENDPOINT || "https://36dxrv.logto.app/",
  appId: process.env.LOGTO_APP_ID || "gkv7y7qb9hts3wib55g46",
  appSecret: process.env.LOGTO_APP_SECRET || "",
  baseUrl: process.env.LOGTO_BASE_URL || "http://localhost:3000",
  cookieSecret:
    process.env.LOGTO_COOKIE_SECRET ||
    "complex_secret_for_logto_session_32_chars",
  cookieSecure: process.env.NODE_ENV === "production",
  cookiePath: "/",
  scopes: [UserScope.Email, UserScope.Profile],
};

// 建立 Edge 相容的 LogtoClient
export const logtoClient = new LogtoClient(logtoConfig);
