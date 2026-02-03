import { Hono } from "hono";
import { jwt } from "hono/jwt";
import * as recordService from "../services/record.js";

const recordRoutes = new Hono();

const authMiddleware = jwt({
  secret: process.env.DB_JWT_SECRET || "fallback_secret_for_debug",
  alg: "HS256",
});

// 新增Record
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

// 查找Record
recordRoutes.get("/", authMiddleware, async (c) => {
  try {
    const payload = c.get("jwtPayload");
    const userId = payload.id;

    const records = await recordService.getRecordsByUserId(userId);
    return c.json({ message: "查詢成功", data: records }, 200);
  } catch (error) {
    return c.json({ error: "查詢失敗" }, 500);
  }
});

//
recordRoutes.get("/stats", authMiddleware, async (c) => {
  const userId = c.get("jwtPayload").id;

  const year = parseInt(c.req.query("year") || "2026");
  const month = parseInt(c.req.query("month") || "2");

  const stats = await recordService.getMonthlyStats(userId, year, month);

  return c.json({
    success: true,
    data: stats,
  });
});

export default recordRoutes;
