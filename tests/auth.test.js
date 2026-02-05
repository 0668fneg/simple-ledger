import { describe, it, expect } from "vitest";
import app from "../src/index";

describe("身份驗證接口測試", () => {
  // 確保格式是 it('描述', async () => { 邏輯 })
  it("登錄失敗測試：輸入不存在的用戶", async () => {
    const res = await app.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: "nobody_here",
        password: "wrong_password",
      }),
      headers: { "Content-Type": "application/json" },
    });

    // 斷言：狀態碼不應該是 200 (因為用戶不存在)
    expect(res.status).not.toBe(200);
  });

  it("登錄失敗測試：密碼為空", async () => {
    const res = await app.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: "testuser",
        password: "",
      }),
      headers: { "Content-Type": "application/json" },
    });

    expect(res.status).toBe(400); // 假設你的參數校驗會攔截空密碼
  });

  it("登錄成功測試：登錄成功", async () => {
    const res = await app.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: "AABB",
        password: "12345678",
      }),
      headers: { "Content-Type": "application/json" },
    });

    expect(res.status).toBe(200);

    // --- 新增的工程師檢查 ---
    const data = await res.json();
    expect(data).toHaveProperty("token"); // 斷言返回的資料裡「必須」有一個叫 token 的欄位
  });
});
