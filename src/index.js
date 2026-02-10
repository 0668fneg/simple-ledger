import { Hono } from "hono";
import { serve } from "@hono/node-server";
import userRoutes from "./routes/user.js";
import recordRoutes from "./routes/record.js";
import logger from "../utils/logger.js";

const app = new Hono();

app.onError((err, c) => {
  logger.error(
    {
      msg: err.message,
      stack: err.stack,
      path: c.req.path,
      method: c.req.method,
    },
    "全局攔截到未處理異常",
  );
  return c.json(
    { success: false, error: "Internal Server Error", message: err.message },
    500,
  );
});
app.notFound((c) => {
  logger.warn({ path: c.req.path }, "找不到路徑");
  return c.json({ error: "Not Found" }, 404);
});

app.route("/auth", userRoutes);
app.route("/records", recordRoutes);

export default app;
