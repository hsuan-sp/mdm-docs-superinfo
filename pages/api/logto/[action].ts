import { logtoClient } from "@/lib/logto";

/**
 * Logto Auth Routes for Pages Router
 * Handles /api/logto/sign-in, /api/logto/sign-in-callback, etc.
 * 使用 @/lib/logto 別名確保路徑正確。
 */
export default logtoClient.handleAuthRoutes();
