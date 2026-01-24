# 🚀 Logto 遷移 - 你需要做的 4 件事

## ✅ 已完成（我幫你做好的）

- ✅ 安裝 Logto SDK
- ✅ 移除 Clerk
- ✅ 更新所有程式碼
- ✅ 建立 Git commit

---

## 🔴 現在請你操作（按順序）

### 1️⃣ Push 代碼到 GitHub

```bash
git push origin nextra-migration
```

如果遇到權限問題，使用 **GitHub Desktop** 或重新登入 Git。

---

### 2️⃣ 在 Logto Console 設定

前往: https://36dxrv.logto.app/ → 你的 Application → **Redirect URIs**

**開發環境**:

- Redirect URI: `http://localhost:3000/api/auth/callback`
- Post sign-out redirect URI: `http://localhost:3000/`

**正式環境**:

- Redirect URI: `https://mdm-docs-superinfo.netlify.app/api/auth/callback`
- Post sign-out redirect URI: `https://mdm-docs-superinfo.netlify.app/`

---

### 3️⃣ 在 Netlify 設定環境變數

Netlify Dashboard → Site settings → Environment variables → **Add variable**

**⚠️ 重要：以下標記 🔒 的變數請設為 "Secret"（勾選 Secret 選項）**

新增以下 6 個變數：

| 變數名稱                 | 值                                       | 是否 Secret |
| ------------------------ | ---------------------------------------- | ----------- |
| `LOGTO_ENDPOINT`         | `https://36dxrv.logto.app/`              | ❌ 否       |
| `LOGTO_APP_ID`           | `gkv7y7qb9hts3wib55g46`                  | ❌ 否       |
| `LOGTO_APP_SECRET` 🔒    | `Ju7IJJHx4w8JO7VO8zWC4CNjMA6GygyL`       | ✅ **是**   |
| `LOGTO_BASE_URL`         | `https://mdm-docs-superinfo.netlify.app` | ❌ 否       |
| `LOGTO_COOKIE_SECRET` 🔒 | `KzgXM9DILJ87sdICpZcrxJVl52WeMgqO`       | ✅ **是**   |
| `LOGTO_COOKIE_SECURE`    | `true`                                   | ❌ 否       |

**快速複製（一次全部新增）：**

```bash
LOGTO_ENDPOINT=https://36dxrv.logto.app/
LOGTO_APP_ID=gkv7y7qb9hts3wib55g46
LOGTO_APP_SECRET=YOUR_APP_SECRET_FROM_LOGTO_CONSOLE      # 記得勾選 Secret
LOGTO_BASE_URL=https://mdm-docs-superinfo.netlify.app
LOGTO_COOKIE_SECRET=YOUR_RANDOM_32_CHAR_SECRET  # 記得勾選 Secret
LOGTO_COOKIE_SECURE=true
```

---

### 4️⃣ 測試

**本地測試**:

```bash
npm run dev
```

訪問 http://localhost:3000，測試登入/登出

**正式環境測試**:
等 Netlify 部署完成後，訪問你的網站測試

---

## ❓ 遇到問題？

參考: `CLERK_TO_LOGTO_MIGRATION.md` 完整報告

---

**預估時間**: 5-10 分鐘  
**難度**: ⭐ 非常簡單（主要是複製貼上）
