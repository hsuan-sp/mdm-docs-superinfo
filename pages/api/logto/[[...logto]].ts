import { logtoClient } from "../../../lib/logto";

/**
 * Logto Auth Routes for Pages Router
 * Handles /api/logto/sign-in, /api/logto/sign-in-callback, /api/logto/sign-out, etc.
 */
export default logtoClient.handleAuthRoutes();
