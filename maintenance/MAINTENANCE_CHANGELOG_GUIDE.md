---
title: 更新日誌 (Changelog) 維護指南
---

## 1. 核心原則 (Keep a Changelog)

本專案採用 **Keep a Changelog** 國際標準。更新日誌是寫給「人」看的，而非機器生成的 Git Commit 紀錄。撰寫時請遵循以下原則：

- **人本導向**：使用清晰的敘述說明對使用者的影響，避免過多底層技術細節。
- **嚴謹專業**：**絕對禁止使用表情符號 (Emoji)** 或任何非正式用語。
- **雙語對齊**：所有更新必須由維護者手動同步更新至 `items/` (中文) 與 `items-en/` (英文) 目錄中。

---

## 2. 檔案結構與位置

- **中文路徑**：`docs/data/logs/items/v[版本號].md`
- **英文路徑**：`docs/data/logs/items-en/v[版本號].md`
- **命名範例**：`v1.1.0.md`

---

## 3. 內容格式規範

每個日誌檔案必須包含正確的 Frontmatter 與結構化的變更分類。

## 3.1 標準模板

```markdown
---
version: "v[版本號]"
date: "YYYY-MM-DD"
type: "major/minor/patch"
---

### [摘要標題，例如：重大功能更新]

### Added

- [新增功能 A]
- [新增功能 B]

### Changed

- [變更功能 C]

### Fixed

- [修正錯誤 D]

### Security

- [安全性更新 E]
```

## 3.2 變更類別定義

請將變更分類至以下標準標題下：

- **`Added`**: 新增的功能、組件或大章節內容。
- **`Changed`**: 現有功能的重大調整或語意變更。
- **`Deprecated`**: 即將棄用的功能預告。
- **`Removed`**: 已移除的舊功能。
- **`Fixed`**: 重要的錯誤修正（微小錯字修正不需記錄）。
- **`Security`**: 漏洞修復或資訊安全強化。

---

## 4. 撰寫禁忌

1. **禁止 Emoji**：如 🚀、✅、🐞 等，保持企業級文件的肅穆感。
2. **禁止流水帳**：不需要記錄「修正檔案 A 的錯字」，應摘要為「優化術語表文字準確性」。
3. **禁止技術黑話**：例如「Refactor state management logic」，應寫為「優化全域切換性能與反應速度」。

---

## 5. 發布流程

1. 確定版本號（遵循 Semantic Versioning，如 v1.1.0）。
2. 在 `docs/data/logs/items/` 與 `docs/data/logs/items-en/` 同步建立 Markdown 檔案。
3. 執行 `npm run build` 驗證頁面渲染是否正常。
4. Commit 並 Push 變更。系統會自動在「更新日誌」頁面呈現最新的內容。
