import { db } from "../db/index.js";
import { records } from "../db/schema.js";
import { eq, desc } from "drizzle-orm";

// 增加
export const createRecord = async (data) => {
  const result = await db
    .insert(records)
    .values({
      userId: data.userId,
      type: data.type,
      amount: data.amount,
      category: data.category,
      content: data.content,
    })
    .returning();
  return result[0];
};

// 查詢
export const findRecordsByUserId = async (userId) => {
  const result = await db
    .select()
    .from(records)
    .where(eq(records.userId, userId));
  return result;
};
