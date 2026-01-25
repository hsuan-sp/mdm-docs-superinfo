import { logtoClient } from "@/lib/logto";

/**
 * Logto Auth Handler - DO NOT WRAP THIS FUNCTION.
 * 直接導出以解決 500 Internal Server Error。
 */
export default logtoClient.handleAuthRoutes();
