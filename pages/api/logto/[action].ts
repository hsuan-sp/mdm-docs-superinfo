import LogtoClient from "@logto/next";
import { logtoConfig } from "@/lib/logto";

/**
 * Logto Auth Handler - Fixed Standard
 * 每次請求重新實例化以保證 Session 的一致性與獨立性。
 */
export default new LogtoClient(logtoConfig).handleAuthRoutes();
