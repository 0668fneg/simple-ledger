# 簡易記帳本 （simple—ledger）

這是一個基於 **Hono ** 和 **Drizzle ORM** 開發的個人記帳本後端 API，具備完整的用戶鑑權與數據校驗功能。

## 核心功能

用戶系統：支持用戶注冊與JWT 登錄驗證。
賬目管理：支持新增收入或支出，並具備數據庫層級類型限制。
月度統計：自動計算指定月份的總收入、總支出及結餘。

## 技術棧

框架：[Hono.js]（https://hono.dev/）
數據庫： [PostgreSQL]（https:// www.postgresql.org/）（使用 Drizzl ORM）
鑒權驗證： JWT （ JSON Web Tokens）

## 快速啓動

````bash
#1.安裝依賴（npm install）
#2.同步數據庫（npx drizzle—kit push）
#3.啓動服務（npm run dev）

## 核心 API 接口

### 1. 新增賬目 `POST  / records`

- **Header**: `Authorization: Bearer <Your_Token>`
- **Body**:
  ```json
  {
  "type": "income",
  "amount": 101,
  "category": "獎金",
  "content": "星期職效獎金"
  }

### 2.月度統計 `GET /records/stats`

Query: ?year=2026&month=1
功能： 返回該月總收入、總支出、及餘額。
````
