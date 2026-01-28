import { db } from "../db/index.js";
import { users } from "../db/schema.js";
import { eq } from "drizzle-orm";

// 新增
export const createUser = async (userData) => {
  const [newUser] = await db.insert(users).values(userData).returning();
  return newUser;
};

// 查找
export const findUserByUsername = async (username) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.username, username));
  console.log("3. 執行 SQL 查詢:", username);
  return user;
};
