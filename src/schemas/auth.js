import { z } from "zod";

// 用戶名 和 密碼的規範
const baseAuthSchema = z.object({
  username: z
    .string()
    .min(3, "用戶名至少需要 3 個字元")
    .max(20, "用戶名太長了")
    .trim(),
  password: z.string().min(7, "密碼至少需要 7 個字元"),
});

// 註冊用的 Schema
export const registerSchema = baseAuthSchema;

// 登錄用的 Schema
export const loginSchema = baseAuthSchema;
