import LogtoClient from "@logto/next";
import { logtoConfig } from "../../../lib/logto";

const logtoClient = new LogtoClient(logtoConfig);

export default logtoClient.handleAuthRoutes();
