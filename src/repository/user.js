import { db } from "../db/index.js";
import { users } from "../db/schema.js";

export const createUser = async (userData) => {
  const [newUser] = await db.insert(users).values(userData).returning();
  return newUser;
};
