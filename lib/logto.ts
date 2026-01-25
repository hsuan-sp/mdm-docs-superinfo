import LogtoClient from "@logto/next";

/**
 * Logto Configuration
 * 強化環境變數檢測，確保 500 錯誤發生時有跡可循
 */
const getEnv = (key: string, fallback: string = ""): string => {
  if (typeof window !== "undefined") return ""; // 前端不應拿取 Secret
  return process.env[key] || fallback;
};

export const logtoConfig = {
  endpoint: getEnv("LOGTO_ENDPOINT", "https://36dxrv.logto.app/"),
  appId: getEnv("LOGTO_APP_ID", "gkv7y7qb9hts3wib55g46"),
  appSecret: getEnv("LOGTO_APP_SECRET"), // 伺服器端專用
  baseUrl: getEnv("LOGTO_BASE_URL", "https://mdm-docs-superinfo.netlify.app"),
  cookieSecret: getEnv(
    "LOGTO_COOKIE_SECRET",
    "complex_secret_for_logto_session_32_chars"
  ),
  cookieSecure: process.env.NODE_ENV === "production",
  scopes: ["email", "profile"],
};

export const logtoClient = new LogtoClient(logtoConfig);
