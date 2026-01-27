import { Hono } from "hono";
import { serve } from "@hono/node-server";
import userRoutes from "./routes/user.js";

const app = new Hono();

app.route("/auth", userRoutes);
console.log(" Server is running http://localhost:3000");

serve({
  fetch: app.fetch,
  port: 3000,
});
