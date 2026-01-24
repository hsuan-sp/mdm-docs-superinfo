export const logtoConfig = {
  endpoint: process.env.LOGTO_ENDPOINT || "https://36dxrv.logto.app/",
  appId: process.env.LOGTO_APP_ID || "gkv7y7qb9hts3wib55g46",
  appSecret: process.env.LOGTO_APP_SECRET || "",
  baseUrl: process.env.LOGTO_BASE_URL || "http://localhost:3000",
  cookieSecret: process.env.LOGTO_COOKIE_SECRET || "",
  cookieSecure: process.env.LOGTO_COOKIE_SECURE === "true",
  resources: [],
  scopes: [],
};
