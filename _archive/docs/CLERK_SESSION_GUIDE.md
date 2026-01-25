# Clerk Session 設定指南

## Session Duration（登入時長）設定

Session 時長**必須在 Clerk Dashboard 設定**，無法在本地端程式碼中控制。

### 設定步驟

1. 前往 [Clerk Dashboard](https://dashboard.clerk.com/)
2. 選擇您的 Application
3. 點擊左側選單的 **Sessions**
4. 您會看到兩個主要設定：

#### 1. **Inactivity timeout（閒置逾時）**

- **功能**：用戶無活動（關閉應用或停止刷新 token）多久後自動登出
- **預設**：停用
- **建議設定**：
  - 教育環境：`30 分鐘` 到 `1 小時`
  - 高安全需求：`15 分鐘`
  - 一般使用：`1 小時`
- **注意**：Production 需要付費方案，但 Development 可免費測試

#### 2. **Maximum lifetime（最長有效期）**

- **功能**：Session 的絕對過期時間，無論用戶是否活躍
- **預設**：7 天
- **建議設定**：
  - 嚴格安全：`1 天`
  - 平衡體驗：`7 天`（預設）
  - 長期使用：`30 天`
- **注意**：Production 自訂需要付費方案

### ⚠️ 重要限制

- **兩個設定不能同時停用**（安全考量）
- **付費方案**：自訂 Session 時長在 Production 環境需要付費方案
- **Development 免費**：開發環境可以免費測試所有設定

### 範例設定（教育場景）

```
✅ 推薦組合 1（平衡安全與體驗）：
- Inactivity timeout: 1 hour
- Maximum lifetime: 7 days

✅ 推薦組合 2（高安全）：
- Inactivity timeout: 30 minutes
- Maximum lifetime: 1 day

✅ 推薦組合 3（長期使用）：
- Inactivity timeout: 2 hours
- Maximum lifetime: 30 days
```

### Session 自動更新機制

Clerk 會自動處理 Session 更新：

- 用戶活躍時會自動刷新 token
- 即將過期時會靜默更新（無需用戶操作）
- 完全過期後會自動導向登入頁

### 程式碼中無需額外設定

所有 Session 管理都由 Clerk 自動處理，您在程式碼中只需：

1. 使用 `<ClerkProvider>` 包裹應用（✅ 已完成）
2. 使用 `clerkMiddleware()` 保護路由（✅ 已完成）
3. 檢查 `userId` 驗證身份（✅ 已完成）

---

## 內容保護功能總覽

### 已實現的安全機制

✅ **路由保護**：未登入無法訪問 `/guide` 和 `/glossary`
✅ **API 保護**：所有數據 API 都需要驗證身份
✅ **防複製**：禁用右鍵選單、Ctrl+C、文字選取
✅ **防開發者工具**：攔截 F12、Ctrl+Shift+I 等快捷鍵
✅ **爬蟲偵測**：偵測 Puppeteer、Selenium 等自動化工具
✅ **浮水印**：自動添加半透明浮水印防止截圖
✅ **DevTools 警告**：開啟開發者工具時顯示警告訊息

### 使用建議

- 這些保護措施主要針對一般用戶
- 技術高手仍可繞過（這是網頁技術的限制）
- 最重要的是 **API 身份驗證**（已實現）
- 建議搭配 Clerk 的 **Session 時長限制** 使用
