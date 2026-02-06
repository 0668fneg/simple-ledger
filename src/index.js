import { Hono } from "hono";
import { serve } from "@hono/node-server";
import userRoutes from "./routes/user.js";
import recordRoutes from "./routes/record.js";

const app = new Hono();

app.route("/auth", userRoutes);
app.route("/records", recordRoutes);

export default app;
