# Scripts 目錄說明

這個目錄包含了維護 **MDM Support Site** 文檔品質與內容管理所需的自動化工具。

## 🛠️ 核心工具 (Core Tools)

### 1. [`content_manager.py`](./content_manager.py) (內容管理 GUI)

這是專案的主要內容編輯工具，提供圖形化介面 (Tkinter) 讓維護者能輕鬆新增、編輯與管理 Markdown 文件。

**主要功能：**

* **雙語管理**：支援切換「中文 (Traditional Chinese)」與「英文 (English)」內容庫。
* **自動格式化**：存檔時自動呼叫 `fix-markdown.js`，確保文檔符合所有排版規範。
* **索引同步**：編輯後自動更新 `MAINTENANCE_INDEX.md`，保持索引最新。
* **智慧模板**：新增檔案時自動帶入標準的 Q&A 或術語表 (Glossary) 模板。

**啟動方式：**

```bash
# 使用 Python 直接執行
python3 scripts/content_manager.py

# 或使用 Shell Script 包裹 (若有)
./scripts/run_content_manager.sh
```

### 2. [`fix-markdown.js`](./fix-markdown.js) (全能修正腳本)

這是專案的**自動化排版與 Lint 修正核心**，一次執行即可修復絕大多數的格式問題。

**修正範圍：**

* **格式規範化 (Normalization)**：
  * 統一所有標題為二級標題 (`##`)。
  * 修正檔案結尾換行與多餘空行 (`MD047`, `MD012`)。
* **列表處理 (List Handling)**：
  * 統一無序列表符號為星號 `*` (`MD004`)。
  * 統一有序列表編號為 `1.` (`MD029`)。
  * 自動修正列表縮排 (2 spaces) 與巢狀結構 (`MD007`)。
  * 確保列表周圍有正確的空行 (`MD032`)。
* **排版優化 (Typography)**：
  * **中英文空格**：自動在中文與英文/數字間加入空白 (如 `iPad 10`)。
  * **專有名詞校正**：強制統一大小寫 (如 `iPad`, `Wi-Fi`, `macOS`, `Jamf Pro`)。
  * **表格優化**：自動調整 Markdown 表格欄位的空格 padding (`MD060`)。

**使用方式：**

```bash
# 在專案根目錄執行
npm run fix-markdown
```

### 3. [`generate_maintenance_index.mjs`](./generate_maintenance_index.mjs) (索引生成)

此腳本用於掃描 `docs/data` 下的所有 Markdown 檔案，並產生總覽索引，方便維護者快速檢索現有內容。

**產出檔案：**

* `docs/data/MAINTENANCE_INDEX.md` (中文索引)
* `docs/data/MAINTENANCE_INDEX_EN.md` (英文索引)

**使用方式：**

```bash
# 通常由 content_manager.py 自動呼叫
# 也可以手動執行：
node scripts/generate_maintenance_index.mjs
```

## ⚙️ 排版規則細節 (Formatting Rules)

我們的自動化腳本遵循以下嚴格的排版慣例，請在手動編輯時盡量遵守：

### 1. 標題層級 (Headers)

* 正文一律使用 **二級標題** (`##`) 作為主要區塊。
* 避免使用一級標題 (`#`) 或三級以上標題 (`###`)，以保持文件結構扁平化。

### 2. 列表格式 (Lists)

* **無序列表**：統一使用星號 `*`。
* **有序列表**：統一使用數字 `1.` (Markdown 會自動依序渲染)。
* **縮排**：標準縮排為 **2 個空格**。
* **間距**：列表項目符號後必須保留 **1 個空格**。

### 3. 空格與符號 (Spacing & Symbols)

* 中文與英文/數字之間必須有一個半形空格。
* 表格 (`Table`) 的 pipe 符號 `|` 兩側需保留空格。

### 4. 專有名詞 (Proper Nouns)

* `Apple` (不使用 apple)
* `iPad`, `iPhone`, `macOS`, `iOS`
* `Wi-Fi` (不使用 Wifi 或 wifi)
* `Jamf Pro`, `Jamf School`

## 📦 目標目錄 (Target Directories)

這些腳本主要針對以下目錄進行處理：

* `docs/data/items/qa` (中文問答)
* `docs/data/items/glossary` (中文術語)
* `docs/data/items-en/qa` (英文問答)
* `docs/data/items-en/glossary` (英文術語)
