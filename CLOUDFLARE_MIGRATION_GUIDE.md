# 🚀 Nextra + Logto: Cloudflare Pages 遷移終極指南

這份指南旨在確保您的文件網站在從 Netlify 搬遷至 Cloudflare Pages 時，身份驗證系統（Logto）能 100% 穩定運作。

---

## 🏗️ 1. Cloudflare Pages 控制台設定 (Dashboard)

在 Cloudflare Pages 建立專案後，請務必按照以下設定：

### A. 建置設定 (Build Settings)

- **Framework preset**: `Next.js`
- **Build command**: `npm run build`
- **Build output directory**: `.vercel/output` (或是 `.next`)
- **Node.js Version**: 建議設定為 `20` 以上。

### B. 相容性標誌 (Compatibility Flags) - ⚡ 最關鍵

1.  進入 `Settings` -> `Functions` -> `Compatibility Flags`。
2.  在 **Production** 與 **Preview** 環境中都新增：
    - `nodejs_compat`
    - _(註：這是因為 Logto 的加密模組需要 Node.js 的原生 API 支持)_

### C. 環境變數 (Environment Variables)

請在 `Settings` -> `Environment variables` 中填入：

- `LOGTO_ENDPOINT`: `https://36dxrv.logto.app/`
- `LOGTO_APP_ID`: `gkv7y7qb9hts3wib55g46`
- `LOGTO_APP_SECRET`: _(您的 App Secret)_
- `LOGTO_BASE_URL`: `https://<您的新域名>.pages.dev` (末尾不可有斜線)
- `LOGTO_COOKIE_SECRET`: _(32位元隨機字串)_

---

## 🔐 2. Logto Console 設定變更

由於域名從 Netlify 變更為 Cloudflare，請前往 [Logto Console](https://cloud.logto.io/) 更新 Application：

- **Redirect URIs**:
  `https://<您的新域名>.pages.dev/api/logto/sign-in-callback`
- **Post Sign-out Redirect URIs**:
  `https://<您的新域名>.pages.dev/`
- **Scopes**: 確保勾選 `email` 與 `profile`。

---

## 💻 3. 程式碼核心架構要求 (Edge Runtime)

Cloudflare Pages 使用 **Edge Runtime (V8 Isolates)**，因此程式碼必須符合以下標準：

### A. 全面切換至 Edge SDK

引用位置必須改為：

```typescript
import LogtoClient from "@logto/next/edge";
// 不要使用 @logto/next，那在 Edge 環境會崩潰
```

### B. 強制標註 Runtime

在 `pages/api/logto/[action].ts` 以及所有受保護的 API 頂部加入：

```typescript
export const runtime = "edge";
```

### C. 處理 API 請求 (Request/Response)

因為是 Edge 環境，API 手冊不再使用 `NextApiRequest/Response`，改用全標準的 `Response`：

```typescript
return new Response(JSON.stringify(data), {
  status: 200,
  headers: { "content-type": "application/json" },
});
```

---

## 🛠️ 4. 常見問題排除 (Troubleshooting)

### ❌ 報錯: "Sign-in session not found" (500)

- **原因**: Cookie 作用網域不對或 `nodejs_compat` 未開啟。
- **解法**: 確保 `lib/logto.ts` 中設有 `cookiePath: "/"`，且 Cloudflare 控制台已開啟相容標誌。

### ❌ 報錯: 404 Not Found

- **原因**: `/api/logto/[action].ts` 檔名被改掉，或是 Cloudflare 路由映射緩存。
- **解法**: 確保檔名精確為 `[action].ts` (含中括號)，並在 Cloudflare 重啟 Deploy (Clear cache and redeploy)。

### ❌ 報錯: "getContext is not a function"

- **原因**: 在 Edge 版本中，函數名稱或調用方式不對。
- **解法**: 直接調用 `await logtoClient.getLogtoContext(req)`。

---

## 📝 5. 遷移檢查清單 (Final Checklist)

- [ ] `package.json` 包含 `@cloudflare/next-on-pages` 與 `swr`。
- [ ] `lib/logto.ts` 已切換為 `@logto/next/edge`。
- [ ] `pages/api/logto/[action].ts` 已實作手動分發器 (Dispatcher)。
- [ ] `_app.tsx` 僅對 `/guide` 與 `/glossary` 進行拦截，不影響 `/`。
- [ ] Logto 控制台的 Redirect URI 已更新。
- [ ] Cloudflare `nodejs_compat` 已開啟。

---

祝遷移順利！如果遇到任何無法解決的開發問題，請優先檢查 **Cloudflare Build Logs**，那裡通常有最詳細的 Edge 報錯資訊。
