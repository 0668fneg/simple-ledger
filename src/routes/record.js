import { Hono } from "hono";
import { jwt } from "hono/jwt";
import * as recordService from "../services/record.js";

const recordRoutes = new Hono();

const authMiddleware = jwt({
  secret: process.env.DB_JWT_SECRET || "fallback_secret_for_debug",
  alg: "HS256",
});

recordRoutes.post("/", authMiddleware, async (c) => {
  try {
    const payload = c.get("jwtPayload");
    const body = await c.req.json();

    const newRecord = await recordService.addRecord({
      ...body,
      userId: payload.id,
    });

    return c.json({ message: "新增成功", data: newRecord }, 201);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
});

export default recordRoutes;
