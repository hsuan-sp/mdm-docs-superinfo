# 極電資訊 Apple MDM 專業知識庫 (Professional Knowledge Base)

**當前版本 (Current Version):** 1.1.0
**重構日期 (Restructured):** 2026-01-23

![VitePress](https://img.shields.io/badge/VitePress-1.6.4+-646CFF.svg) ![Node](https://img.shields.io/badge/Node-20%2B-339933.svg) ![Environment](https://img.shields.io/badge/Specs-2026_Tahoe-blue.svg)

本專案為極電資訊 (Superinfo) 專為台灣教育場域打造的 Apple MDM 專業知識庫。2026 年 1 月完成大規模結構重構，實現「內容與邏輯分離」，大幅提升維護效率與資料安全性。

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

- **框架**: Next.js 15 (App Router) + Nextra 4
- **驗證**: Logto (OIDC)
- **部署**: Vercel (動態) / GitHub Pages (靜態預覽)
- **樣式**: Tailwind CSS v4 (Apple-Style Design System)


## 🌐 部署平台支援 (Deployment Platforms)

專案目前支援雙平台佈署，並自動根據環境調整行為：

1. **Vercel (推薦)**:
   - **網址**: [https://mdm-support-site.vercel.app/](https://mdm-support-site.vercel.app/) (生產環境)
   - **功能**: 具備完整的身分驗證 (OTP)、登入日誌紀錄與全站安全性攔截。
   - **運作機制**: 使用 Vercel Edge Middleware 與 Serverless Functions 進行後端驗證。

2. **GitHub Pages (靜態預覽)**:
   - **網址**: `https://hsuan-sp.github.io/mdm-support-site/` (備援與公開預覽)
   - **功能**: **純靜態顯示**，不處理登入邏輯，適合快速檢閱內容。
   - **運作機制**: 系統會偵測網域，若為 `.github.io` 則自動隱藏登入/登出 UI，直接開放內容閱讀。

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
