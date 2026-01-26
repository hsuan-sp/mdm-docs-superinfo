// app/logto.ts
import { LogtoNextConfig, UserScope } from '@logto/next';

export const logtoConfig: LogtoNextConfig = {
  appId: process.env.LOGTO_APP_ID!,
  appSecret: process.env.LOGTO_APP_SECRET!,
  endpoint: process.env.LOGTO_ENDPOINT!,
  baseUrl: process.env.LOGTO_BASE_URL!,
  cookieSecret: process.env.LOGTO_COOKIE_SECRET!, // 確保 > 32 字元
  cookieSecure: process.env.NODE_ENV === 'production',
  // 核心修正：某些環境下 CookieStorage 需要明確的 encryptionKey
  // @ts-ignore - 部分 SDK 版本可能尚未在型別定義中加入此欄位，但運行時需要
  encryptionKey: process.env.LOGTO_COOKIE_SECRET!,
  // 依照官方建議使用 UserScope 列舉
  scopes: [
    UserScope.Email,
    UserScope.Profile,
    'offline_access'
  ],
};