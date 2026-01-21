# 極電資訊 Apple MDM 專業知識庫 (Professional Knowledge Base)

**當前版本 (Current Version):** 1.0.0 (Released 2026-01-21)

![VitePress](https://img.shields.io/badge/VitePress-1.6.4+-646CFF.svg) ![Node](https://img.shields.io/badge/Node-20%2B-339933.svg) ![Environment](https://img.shields.io/badge/Specs-2026_Tahoe-blue.svg)

本專案為極電資訊 (Superinfo) 專為台灣教育場域量身打造的 Apple 行動裝置管理 (MDM) 專業知識庫。系統整合多年實戰部署經驗與 Apple 2026 最新技術基準（iOS 26 / macOS Tahoe），為學校 IT 人員提供結構化的技術指引與故障排除方案。

---

## 🚀 系統架構與特性

本平台採用現代化前端技術棧構建，旨在提供極致的性能、安全性與雙語閱讀體驗。

### 1. 核心技術棧 (Technical Stack)
*   **文檔框架**: [VitePress](https://vitepress.dev/) (SSG 靜態站點生成)
*   **互動組件**: Vue 3 (Composition API)
*   **資料載入**: TypeScript Data Loaders (Build-time 預處理)
*   **樣式系統**: 原生 CSS 變數 + 現代化毛玻璃視覺 (Glassmorphism)

### 2. 核心功能模組
*   **雙語動態切換**: 支援繁體中文與英文即時切換，內容 100% 同步。
*   **智慧型回報系統**: 整合於頁尾的 Issue Report 功能，自動擷取頁面上下文 (Context)，加速技術問題排查。
*   **自動化內容管理**: 
    *   `fix-markdown.js`: 自動校正標題、清單、中英文空格及排版錯誤。
    *   `generate_maintenance_index.mjs`: 自動生成維護索引，確保 220+ 篇文章的維護效率。
*   **多層級安全性**: 內建程式碼混淆 (Terser) 與內容保護機制，防止未經授權的內容抓取。

---

## 📂 專案目錄結構

```text
├── docs/
│   ├── .vitepress/        # 核心配置、佈景主題與全域組件
│   ├── data/
│   │   ├── items/         # [中文] Q&A 與術語內容庫
│   │   ├── items-en/      # [英文] Q&A 與術語內容庫
│   │   ├── logs/          # 版本更新與系統概況日誌 (Changelog items)
│   │   ├── all-data.data.ts # 核心資料載入邏輯
│   │   └── MAINTENANCE_INDEX.md # 維護索引 (自動生成)
│   ├── guide/             # 整合式問答指南導覽
│   ├── glossary.md        # 術語查詢入口
│   └── CHANGELOG.md       # 版本更新日誌入口
├── scripts/               # 自動化維護與 Linting 工具
└── package.json           # 專案依賴管理
```

---

## 🛠️ 維護者指南 (Maintainer Guide)

### 環境需求
*   Node.js 20+
*   npm / npx

### 開發與維護指令
```bash
# 啟動本地開發模式 (http://localhost:5173)
npm run dev

# 格式自動校正 (提交前必須執行)
npm run fix-markdown

# 手動更新維護索引 (增減內容後執行)
npm run update-index

# 構建生產環境版本
npm run build
```

---

## 📄 版權與免責聲明

Copyright © 2026 **Superinfo Computer Co., Ltd.**
極電資訊有限公司 版權所有。

本系統內容與架構受著作權法保護。未經書面授權，禁止以任何形式複製、轉載或將內容用於第三方 AI 模型訓練。
