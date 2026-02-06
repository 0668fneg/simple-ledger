import { describe, it, expect, beforeAll } from "vitest";
import app from "../src/index";

describe("記帳接口測試", () => {
  let authToken = "";

  // 要獲取 token
  beforeAll(async () => {
    const res = await app.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: "abcd",
        password: "12345678",
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    authToken = data.token;
  });

  it("成功新增一筆支出", async () => {
    const res = await app.request("/records", {
      method: "POST",
      body: JSON.stringify({
        amount: 100,
        category: "餐飲",
        type: "expense",
        note: "午餐",
        date: "2026-02-06",
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.message).toBe("新增成功");
  });

  it("未授權訪問應被攔截", async () => {
    const res = await app.request("/records", {
      method: "POST",
      body: JSON.stringify({ amount: 100 }),
      headers: { "Content-Type": "application/json" },
    });

    expect(res.status).toBe(401);
  });
});
