# 🛠️ Scripts 自動化維護工具箱

本目錄存放了確保 **MDM Support Site** 達到「旗艦級」排版品質與資料一致性的自動化腳本。

---

## 目錄結構

```text
scripts/
└── maintenance/           # 核心維護腳本 (Node.js)
    ├── fix-markdown.js    # 排版校正與 Lint 修正
    ├── generate-index.js  # 生成維護索引 (MAINTENANCE/INDEX)
    ├── align-glossary.js  # 同步中英文術語檔名
    └── rename-glossary.js # 標準化術語檔案命名
```

---

## 🚀 核心工具說明

### 1. 排版修正器 (`maintenance/fix-markdown.js`)

專門解決 Markdown 排版中的各種「不完美」。

- **中英文空格**：自動在中文與英數字之間插入空格（如 `iPad 10`）。
- **專有名詞校正**：強制修正大小寫（如 `Jamf Pro`, `Wi-Fi`）。
- **列表壓縮 (Tight List)**：自動移除列表項目間的多餘空行。
- **Frontmatter 安全**：使用 `gray-matter` 解析，確保 `tags` 等陣列欄位不會被破壞。

### 2. 索引生成器 (`maintenance/generate-index.js`)

此腳本用於掃描 `docs/content/` 下的所有 Markdown 檔案，並產生總覽索引，方便維護者快速檢索現有內容。

**產出檔案：**

*   `docs/maintenance/INDEX_ZH.md` (中文索引)
*   `docs/maintenance/INDEX_EN.md` (英文索引)

**使用方式：**

*   手動執行：`node scripts/maintenance/generate-index.js`

---

## ⚙️ 排版規則細節 (Formatting Rules)

我們的自動化腳本遵循以下嚴格的排版慣例，請在手動編輯時盡量遵守：

### 1. 標題層級 (Headers)

*   正文一律使用 **二級標題** (`##`) 作為主要區塊。
*   避免使用一級標題 (`#`) 或三級以上標題 (`###`)，以保持文件結構扁平化。

### 2. 列表格式 (Lists)

- **無序列表**：統一使用星號 `*`。
- **有序列表**：統一使用數字 `1.` (Markdown 會自動依序渲染)。
- **縮排**：標準縮排為 **2 個空格**。
- **間距**：列表項目符號後必須保留 **1 個空格**。

### 3. 空格與符號 (Spacing & Symbols)

*   中文與英文/數字之間必須有一個半形空格。
*   表格 (`Table`) 的 pipe 符號 `|` 兩側需保留空格。

### 4. 專有名詞 (Proper Nouns)

*   `Apple` (不使用 apple)
*   `iPad`, `iPhone`, `macOS`, `iOS`
*   `Wi-Fi` (不使用 Wifi 或 wifi)
*   `Jamf Pro`, `Jamf School`

## 📦 目標目錄 (Target Directories)

這些腳本主要針對以下目錄進行處理：

*   `docs/content/zh/qa` (中文問答)
*   `docs/content/zh/glossary` (中文術語)
*   `docs/content/en/qa` (英文問答)
*   `docs/content/en/glossary` (英文術語)

---

## 🔧 如何使用

多數情況下，您只需要透過 `package.json` 中的腳本調用：

```bash
# 自動修正所有 Markdown 檔案的排版
npm run fix-markdown

# 更新維護索引檔案
npm run update-index
```

---

## ⚖️ 排版規範與核心規則

為了保持專案一致性，所有腳本均強制執行以下規則：
- **標題**：問答一律使用 `## Q:` 開頭。
- **層級**：不使用 `#` (H1)，統一從 `##` (H2) 開始，確保 SideBar 生成正確。
- **術語**：嚴格遵守 `MAINTENANCE_GLOSSARY_GUIDE.md` 中的台灣官方術語對照表。
