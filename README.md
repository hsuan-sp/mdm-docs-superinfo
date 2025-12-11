# 極電資訊 Apple MDM 知識庫 (MDM Support Site)

這是一個專為台灣教育場域設計的 Apple MDM 知識庫網站，旨在協助學校資訊組長與管理人員解決日常管理問題。

## 專案特色
- **零知識術語表**：將艱澀的技術名詞轉化為白話文比喻。
- **實戰問答集**：收錄台灣教育現場最常見的 Jamf Pro / Jamf School 操作問題。
- **美觀設計**：採用現代化的 Apple 風格介面 (VitePress)。

## 技術架構
- **框架**: [VitePress](https://vitepress.dev/)
- **語言**: TypeScript, Vue 3
- **資料源**: `docs/data/*.ts` (結構化資料) + `docs/guide/*.md` (頁面載體)

## 本地開發

1. **安裝相依套件**
   ```bash
   npm install
   ```

2. **啟動開發伺服器**
   ```bash
   npm run docs:dev
   ```
   網站將於 `http://localhost:5173/mdm-support-site/` 啟動。

## 內容維護指南

### 新增 Q&A
1. 開啟 `docs/data/` 下對應分類的 `.ts` 檔案 (例如 `01-account.ts`)。
2. 依照 JSON 格式新增問題物件 (含 `id`, `question`, `answer`, `tags`)。
3. 執行搜尋索引更新腳本 (通常在 build 時會自動執行)：
   ```bash
   node scripts/update-search-index.js
   ```

### 新增術語
1. 開啟 `docs/data/glossary.ts`。
2. 在 `glossaryData` 陣列中新增術語物件。

## 部署 (GitHub Pages)

本專案已設定 GitHub Actions。
只要 Push 到 `main` 分支，流程會自動：
1. 建置靜態網站。
2. 更新搜尋索引。
3. 部署至 `gh-pages` 分支。

手動建置指令：
```bash
npm run docs:build
```

## 聯絡支援
- **Line 業務客服**: @406ifuui
- **Line 技術客服**: @257yzoxx
