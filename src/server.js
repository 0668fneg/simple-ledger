import { serve } from "@hono/node-server";
import app from "./index.js";
import logger from "../utils/logger.js";

const port = 3000;

serve({
  fetch: app.fetch,
  port: port,
});

logger.info(`服務啟動: http://localhost:${port}`);
