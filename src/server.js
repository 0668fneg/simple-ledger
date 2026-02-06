import { serve } from "@hono/node-server";
import app from "./index.js";

const port = 3000;

serve({
  fetch: app.fetch,
  port: port,
});

console.log(`服務啟動: http://localhost:${port}`);
