# 極電資訊 Apple MDM 專業知識庫 (Professional Knowledge Base)

**當前版本 (Current Version):** 1.0.0
**最後更新 (Last Updated):** May 2026

![Next.js](https://img.shields.io/badge/Next.js-16.1-black.svg) ![Node](https://img.shields.io/badge/Node-22%2B-339933.svg) ![Tailwind](https://img.shields.io/badge/Tailwind-v4-38bdf8.svg)

本專案為極電資訊 (Superinfo) 專為台灣教育與企業場域建置的 Apple 裝置管理參考資源。採用 Next.js 16 (App Router) 與 Nextra 4 開發，以確保文件管理的結構化與渲染效能。

---

## 📂 專案核心架構 (Standardized Structure)

專案結構如下：

### 1. 核心內容 (`content/`)

存放 Markdown 內容檔案，以雙語結構組織：

- `zh/`: 繁體中文術語表、常見問答與更新日誌。
- `en/`: 英文版對應內容。

### 2. 資料索引生成 (`scripts/`)

自動化生成全站內容索引，將 Markdown 轉換為 `lib/generated-data.json` 供前端讀取，優化查詢效能。

## 🏗️ 技術架構 (Modern Stack)

- **框架**: Next.js 16 (App Router) + Nextra 4
- **驗證**: 支援 Logto 驗證（可透過環境變數切換本地無驗證模式）
- **樣式**: Tailwind CSS v4

## 🌐 部署平台支援 (Deployment Platform)

專案支援 Vercel 等現代化託管平台：

- **驗證支援**: 可整合 OIDC 驗證服務。
- **本地部署**: 透過設置 `.env.local` 中的 `NEXT_PUBLIC_AUTH_DISABLED=true`，即可在無 Logto 驗證環境下進行開發與部署。

---

## 🚀 快速開始 (Quick Start)

**環境設定與啟動:**

```bash
# 1. 配置 Git LF 換行符 (建議)
git config core.autocrlf false
git config core.eol lf

# 2. 安裝依賴
npm install

# 3. 準備開發環境變數 (本地開發可繞過驗證)
# 請確認 .env.local 包含 NEXT_PUBLIC_AUTH_DISABLED=true

# 4. 啟動開發伺服器
npm run dev
```

---

## 🛠️ 開發與維護指令速查

| 指令                | 說明                               |
| :------------------ | :--------------------------------- |
| `npm run dev`       | 啟動本地開發伺服器                 |
| `npm run build`     | 執行生產環境建置與靜態匯出         |
| `npm run gen-index` | 根據現有 Markdown 內容更新資料索引 |

---

## 📜 版權聲明

Copyright © 2026 **Superinfo Computer Co., Ltd.**
極電資訊有限公司 版權所有。
