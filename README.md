# 極電資訊 Apple MDM 知識庫 (Enterprise Knowledge Base)

**Last Updated:** 2026-01-19

![VitePress](https://img.shields.io/badge/VitePress-1.6.4+-646CFF.svg) ![Node](https://img.shields.io/badge/Node-20%2B-339933.svg) ![License](https://img.shields.io/badge/Copyright-SuperInfo-orange.svg)

本專案為專為台灣教育場域建置的 Apple 行動裝置管理 (MDM) 知識庫系統。整合實務經驗與官方技術文件，提供結構化的技術指引與故障排除方案。系統採用現代化前端架構開發，強調高可用性、資訊安全與閱讀體驗。

## 🚀 系統概述 (Overview)

本平台基於 **VitePress** 靜態站點生成技術構建，並結合深度客製化的 Vue 3 組件系統 (`IntegratedGuideApp`, `GlossaryApp`)，實現動態的知識檢索與雙語切換功能。

### 核心特性 (Key Features)

* **現代化前端架構**
  * 基於 **VitePress** 的高性能 SSG (Static Site Generation)。
  * **TypeScript** 驅動的資料載入層 (`data/all-data.data.ts`)，支援 Build-time 預渲染 Markdown。
  * **原子化內容管理**：將 Q&A 與術語拆分為獨立 Markdown 檔案，便於維護與版本控制。

* **雙語支援 (Bilingual Support)**
  * 原生支援 **繁體中文 (Traditional Chinese)** 與 **英文 (English)**。
  * 具備動態語系偵測與 UI 切換功能，適應國際學校 (如 TES) 需求。

* **自動化維護 (Automated Maintenance)**
  * **Linting & Formatting**：內建 `fix-markdown.js` 自動修正標題層級、列表縮排、中英文空格及表格排版。
  * **Content Manager**：提供 Python GUI 工具 (`content_manager.py`) 降低維護門檻。

* **資訊安全 (Security)**
  * **原始碼防護**：構建時強制啟用 Terser 混淆，防止逆向工程。
  * **內容保護**：實作 CSS 層級的 User-Select Protection。
  * **爬蟲阻擋**：配置嚴格的 `robots.txt` 與 Meta Noindex。

## 🛠️ 技術架構 (Architecture)

| 組件 | 規格 | 說明 |
| :--- | :--- | :--- |
| **Framework** | VitePress 1.6+ | 核心文檔框架。 |
| **UI Engine** | Vue 3 (Composition API) | 用於構建 `GlossaryApp` 等互動組件。 |
| **Data Layer** | TypeScript Loader | 伺服器端預處理 Markdown (MarkdownIt)，輸出 JSON 資料。 |
| **Styling** | Native CSS Variables | 支援深色模式 (Dark Mode) 與 Glassmorphism 設計。 |
| **Automation** | Node.js & Python | 維護腳本與內容管理工具。 |

## 📂 專案結構 (Project Structure)

```text
├── docs/
│   ├── .vitepress/        # 系統核心配置、主題與 Vue 組件
│   ├── data/
│   │   ├── items/         # [中文] 原子化 Markdown 內容庫
│   │   ├── items-en/      # [英文] 原子化 Markdown 內容庫
│   │   ├── all-data.data.ts # 資料載入器 (核心邏輯)
│   │   ├── INSTRUCTION_*.md # 撰寫規範
│   │   └── MAINTENANCE_INDEX.md # 自動生成的維護索引
│   └── public/            # 靜態資源 (Images, Robots.txt)
├── scripts/               # 自動化維護工具 (詳見 scripts/README.md)
│   ├── fix-markdown.js    # Markdown 格式修正與 Linting
│   ├── content_manager.py # GUI 內容編輯器
│   └── generate_maintenance_index.mjs
└── package.json
```

## 👩‍💻 開發指南 (Development)

本專案推薦使用 **VS Code** 搭配 **Volar** extension 進行開發。

### 環境需求

* Node.js 20+
* npm 10+
* Python 3.10+ (僅用於執行 `content_manager.py`)

### 常用指令

```bash
# 1. 安裝依賴
npm install

# 2. 啟動本地開發伺服器 (http://localhost:5173)
npm run dev

# 3. 執行 Markdown 自動修正 (提交前必做)
npm run fix-markdown

# 4. 更新維護索引
node scripts/generate_maintenance_index.mjs

# 5. 建置生產版本
npm run build
```

## 📝 內容維護 (Content Maintenance)

我們提供了一套完整的工具鏈來協助維護者管理大量文件。

### 方式一：使用 GUI 工具 (推薦)

```bash
python3 scripts/content_manager.py
```

這會啟動一個圖形介面，讓您可以：

* 瀏覽現有的 Q&A 與術語。
* 使用標準模板新增內容。
* **自動存檔並修正格式** (Auto-lint on save)。

### 方式二：手動維護

1. 在 `docs/data/items` 或 `docs/data/items-en` 下新增/修改 Markdown 檔案。
1. 務必執行 `npm run fix-markdown` 確保格式正確。
1. 執行 `node scripts/generate_maintenance_index.mjs` 更新索引。

## 📄 版權資訊 (License)

Copyright © 2026 **SuperInfo Co., Ltd.**
極電資訊有限公司 版權所有

本系統內容受版權保護。未經授權禁止複製、轉載或用於機器學習模型訓練。
