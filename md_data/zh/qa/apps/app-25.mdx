---
id: app-25

title: "macOS 26 的「宣告式 .pkg 部署」如何使用？與傳統 Jamf Policy 有何不同？"

category: "第三部分：應用程式分發與管理 (Apps & Books)"

important: false

tags: ["macOS 26", "Package", "DDM", ".pkg", "Jamf Policy"]
---

**macOS 26 (Tahoe) 將非 App Store 軟體 (.pkg) 納入宣告式裝置管理 (DDM) 範疇，允許透過 Declaration 部署軟體包，提供比傳統 Jamf Policy 更現代化、更透明的安裝體驗。**

## DDM Package vs. Jamf Policy

| 特性         | Jamf Policy (傳統)                                            | DDM Package Declaration (新)                                  |
| :----------- | :------------------------------------------------------------ | :------------------------------------------------------------ |
| **運作核心** | 依賴 `Jamf` binary 代理程式執行腳本與安裝                     | 依賴 macOS 系統內建的 MDM 框架直接安裝                        |
| **觸發時機** | 需設定觸發器 (Trigger)，如 Login、Startup、Recurring Check-in | **自主評估** (Autonomous)。只要符合宣告條件，系統即刻嘗試安裝 |
| **狀態回報** | 回報至 Jamf Pro logs，有延遲                                  | **即時回報** 安裝進度、錯誤代碼至 MDM                         |
| **離線支援** | 需連線 MDM 才能觸發 Policy                                    | 只要 Declaration 已下達，裝置可在背景自行處理                 |
| **適用軟體** | 所有類型的安裝檔、腳本 (.pkg、.dmg、.sh)                      | 標準簽署的 **.pkg (Distribution Package)**                    |

## 適用條件與限制

- **macOS 版本需求** ：macOS 26 (Tahoe) 或更新版本。
- **.pkg 檔案要求** ：
  - 必須由 **Apple Developer ID Installer certificate** 正確簽署。
  - 必須為標準的 Distribution Package 格式。
  - 安裝路徑需符合 macOS 安全性要求（通常為 `/Applications` 資料夾）。

## 何時該用哪一個？

### 優先使用 DDM Package ：

- 標準軟體安裝（如 Microsoft Office、Google Chrome、Adobe Acrobat）。
- 需要即時確認安裝成功率的關鍵軟體。
- macOS 26 以上的新電腦。
- 希望減少對 Jamf binary 依賴的環境。

### 繼續使用 Jamf Policy ：

- 複雜的安裝流程（如：安裝後需執行 script 修改設定、需互動視窗）。
- 非標準 .pkg 格式的軟體（如拖曳式 .dmg、需要特殊處理的安裝檔）。
- 舊版 macOS 裝置。
- 需要搭配前置或後置腳本的部署情境。

## Jamf Pro 設定步驟 ：

1.  確保 .pkg 已由 Apple Developer ID 正確簽署。
2.  在 Jamf Pro 建立 **Package Declaration** （位於 Blueprints 或 Packages 區域）。
3.  上傳 .pkg 檔案至 Jamf 分發點。
4.  設定部署條件（可選）：例如僅在磁碟空間 > 10GB 時安裝。
5.  指派給目標裝置或裝置群組。

## 專家建議 ：

- **混合使用策略** ：對於 macOS 26 以上裝置優先使用 DDM，舊版裝置保留 Policy，透過 Smart Groups 自動區分。
- **公證 (Notarization) 是關鍵** ：macOS 26 的 DDM 部署對安全性要求極高。 **所有 .pkg 檔案必須經過 Apple 公證 (Notarized)** ，否則裝置將拒絕安裝，並在 Status Channel 回報 `VerificationFailed` 錯誤。
- **測試先行** ：新軟體部署前，建議先在測試裝置上驗證 .pkg 是否具備完整的簽署鍊與公證票據。
