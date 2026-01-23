import {
  pgTable,
  serial,
  text,
  numeric,
  timestamp,
  integer,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  password: text("password").notNull(),
});

export const records = pgTable("records", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  type: varchar("type", { length: 10 }).notNull(),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  category: varchar("category", { length: 50 }),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
