import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { registerSchema, loginSchema } from "../schemas/auth.js";
import { registerUser, loginUser } from "../services/user.js";
import { jwt } from "hono/jwt";

const authMiddleware = jwt({
  secret: process.env.DB_JWT_SECRET || "fallback_secret_for_debug",
  alg: "HS256",
});

const userRoutes = new Hono();

userRoutes.get("/profile", authMiddleware, (c) => {
  const user = c.get("jwtPayload");
  return c.json({ message: "加密通行證", user });
});

// 註冊
userRoutes.post(
  "/register",
  //  插入驗證中間件
  zValidator("json", registerSchema, (result, c) => {
    if (!result.success) {
      const errorMessage = result.error?.errors?.[0].message || "輸入格式錯誤";
      console.log("Zod 驗證攔截:", errorMessage);
      return c.json({ error: errorMessage }, 400);
    }
  }),
  async (c) => {
    try {
      const body = c.req.valid("json");
      const result = await registerUser(body);
      return c.json(result, 201);
    } catch (error) {
      console.error("注冊失敗詳情:", error.message);
      if (error.message === "用戶名已被使用") {
        return c.json({ error: error.message }, 400);
      }
      return c.json({ error: "服務器出錯" }, 500);
    }
  },
);

// 登錄
userRoutes.post(
  "/login",
  //  插入登錄驗證中間件
  zValidator("json", loginSchema, (result, c) => {
    if (!result.success) {
      return c.json(
        { error: result.error?.errors?.[0]?.message || "輸入格式錯誤" },
        400,
      );
    }
  }),
  async (c) => {
    try {
      const body = c.req.valid("json");
      const result = await loginUser(body);

      return c.json({ message: "登入成功", ...result }, 200);
    } catch (error) {
      console.error("登錄失敗詳情:", error.message);
      if (error.message === "用戶名不存在或密碼不正確") {
        return c.json({ error: "用戶名或密碼錯誤" }, 401);
      }
      return c.json({ error: "服務器錯誤" }, 500);
    }
  },
);

export default userRoutes;
