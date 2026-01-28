import { Hono } from "hono";
import { registerUser } from "../services/user.js";
import { loginUser } from "../services/user.js";

const userRoutes = new Hono();

// 注冊
userRoutes.post("/register", async (c) => {
  try {
    const body = await c.req.json();
    const result = await registerUser(body);
    return c.json(result, 201);
  } catch (error) {
    console.error("注冊失敗詳情:", error.message);
    if (
      error.message === "用戶名和密碼不能爲空" ||
      error.message === "用戶名已被使用"
    ) {
      return c.json({ error: error.message }, 400);
    }
    return c.json({ error: "服務器出錯" }, 500);
  }
});

// 登錄
userRoutes.post("/login", async (c) => {
  try {
    const body = await c.req.json();

    const user = await loginUser(body);
    return c.json({ message: "登入成功", user }, 200);
  } catch (error) {
    if (err.message === "用戶名不存在或密碼不正確") {
      return c.json({ error: "用戶名或密碼錯誤" }, 401);
    }
    return c.json({ error: "服務器錯誤" }, 500);
  }
});

export default userRoutes;
