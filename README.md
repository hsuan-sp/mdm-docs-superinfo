# 極電資訊 Apple MDM 專業知識庫 (Professional Knowledge Base)

**當前版本 (Current Version):** 1.2.0
**最後更新 (Last Updated):** 2026-01-27

![Next.js](https://img.shields.io/badge/Next.js-16.1-black.svg) ![Node](https://img.shields.io/badge/Node-22%2B-339933.svg) ![Tailwind](https://img.shields.io/badge/Tailwind-v4-38bdf8.svg)

本專案為極電資訊 (Superinfo) 專為台灣教育場域打造的 Apple MDM 專業知識庫。2026 年 1 月完成大規模架構遷移，從 VitePress 升級至 **Next.js 16 App Router + Nextra 4**，實現「內容與邏輯分離」，大幅提升維護效率與資料安全性。

---

## 📂 專案核心架構 (Standardized Structure)

為了保持簡約與直覺，專案劃分為以下三大核心區塊：

### 1. 核心內容 (`md_data/`)

存放所有的原子化 Markdown 內容檔案，採用「內容與程式碼完全分離」策略。

- `zh/`: 繁體中文術語表、常見問答與更新日誌。
- `en/`: 英文版同步內容。

### 2. 靜態資料分片 (`lib/shards/`)

由建置腳本自動生成的 JSON 分片，優化了 Edge Runtime 的讀取效能，避免大檔案載入。

### 3. 維護與指南 (`maintenance/`)

存放維護者的「指南針」，以及系統生成的日誌。

- `build.log`: **每次建置的詳細日誌**，包含資料驗證與異常記錄（不留存舊版）。
- `MAINTENANCE_*_GUIDE.md`: 各項內容的撰寫規範。
- `MARKDOWN_STYLE_GUIDE.md`: Markdown 排版建議。

## 🏗️ 技術架構 (Modern Stack)

- **框架**: Next.js 16 (App Router) + Nextra 4
- **驗證**: Logto (OIDC)
- **樣式**: Tailwind CSS v4 (Apple-Style Design System)

## 🌐 部署平台支援 (Deployment Platform)

專案採用 Vercel 作為唯一部署平台，以支援完整的身分驗證與安全性功能：

- **網址**: [https://mdm-docs-superinfo.vercel.app/](https://mdm-docs-superinfo.vercel.app/)
- **功能**: 具備完整的 Logto 身分驗證、登入日誌紀錄與全站安全性攔截。
- **運作機制**: 使用 Vercel Edge Middleware 與 Serverless Functions 進行後端與 OIDC 驗證。

---

## 🚀 快速開始 (Quick Start)

### For New Contributors (跨平台開發設定)

**一鍵設定 (推薦):**

```bash
./scripts/setup-dev-env.sh
```

**手動設定:**

```bash
# 1. 配置 Git 使用 LF 換行符
git config core.autocrlf false
git config core.eol lf

# 2. 安裝依賴
npm install

# 3. 啟動開發伺服器
npm run dev
```

**詳細說明:** 請參閱 [`docs/CROSS_PLATFORM_SETUP.md`](docs/CROSS_PLATFORM_SETUP.md) 了解完整的跨平台開發配置。

---

## 🛠️ 維護者指令速查

| 指令                   | 說明         | 適用情境                                    |
| :--------------------- | :----------- | :------------------------------------------ |
| `npm run dev`          | 本地開發模式 | 預覽修改內容                                |
| `npm run fix-markdown` | 自動校正排版 | 提交代碼前的必經步驟 (Spaces, Proper Nouns) |
| `npm run update-index` | 更新維護索引 | 新增或刪除 MD 檔案後同步索引                |

---

## 📜 版權聲明

Copyright © 2026 **Superinfo Computer Co., Ltd.**
極電資訊有限公司 版權所有。未經授權禁止將內容用於第三方 AI 模型訓練或商業轉載。
