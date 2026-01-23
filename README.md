# 極電資訊 Apple MDM 專業知識庫 (Professional Knowledge Base)

**當前版本 (Current Version):** 1.1.0
**重構日期 (Restructured):** 2026-01-23

![VitePress](https://img.shields.io/badge/VitePress-1.6.4+-646CFF.svg) ![Node](https://img.shields.io/badge/Node-20%2B-339933.svg) ![Environment](https://img.shields.io/badge/Specs-2026_Tahoe-blue.svg)

本專案為極電資訊 (Superinfo) 專為台灣教育場域打造的 Apple MDM 專業知識庫。2026 年 1 月完成大規模結構重構，實現「內容與邏輯分離」，大幅提升維護效率與資料安全性。

---

## 📂 專案核心架構 (Standardized Structure)

為了保持簡約與直覺，專案劃分為以下四大核心區塊：

### 1. 核心內容 (`docs/content/`)

存放所有的原子化 Markdown 內容檔案（QA、術語表）。

- `zh/`: 繁體中文術語表與常見問答。
- `en/`: 英文版同步內容（用於 i18n 切換）。

### 2. 資料與邏輯 (`docs/data/`)

存放系統層級的資料載入器與變更日誌。

- `all.data.ts`: 全域資料載入器（基於 `gray-matter` 確保解析安全）。
- `changelog.data.ts`: 更新日誌載入器。
- `logs/`: 存放按版本分層的 Changelog 原始 Markdown。

### 3. 維護與指南 (`docs/maintenance/`)

存放維護者的「指南針」，避免與核心內容混雜。

- `INDEX_ZH.md` / `INDEX_EN.md`: 自動產生的維護索引（不可手動編輯）。
- `MAINTENANCE_QA_GUIDE.md`: 問答集撰寫指南。
- `MAINTENANCE_GLOSSARY_GUIDE.md`: 術語表撰寫指南。
- `MAINTENANCE_CHANGELOG_GUIDE.md`: 更新日誌撰寫規範。

### 4. 英文版頁面 (`docs/en/`)

存放英文版的路由入口，導往 `docs/content/en` 中的資料。

### 5. 組件架構 (`docs/.vitepress/components/`)

2026/01 重構後採取的四層級組件架構，確保邏輯與樣式的一致性：

- **`apps/`**: 全頁面大型應用組件 (例：`HomeApp.vue`, `GuideApp.vue`)。
- **`layout/`**: 全域佈局元素 (例：`LayoutSidebar.vue`, `LayoutFooter.vue`)。
- **`features/`**: 具備特定業務邏輯的模組 (例：`UserCenter.vue`, `SecurityGuard.vue`)。
- **`ui/`**: 可重複使用的視覺組件 (例：`EmptyState.vue`)。

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
