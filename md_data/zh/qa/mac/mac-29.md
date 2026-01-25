---
id: mac-29

title: "如何透過 Jamf Pro 統一推送系統更新 (iOS/iPadOS/macOS)？"

category: "第一部分：硬體與系統更新 (Hardware & OS Updates)"

important: true

tags: ["系統更新", "Jamf Pro", "DDM", "軟體更新藍圖", "iOS 更新", "macOS 更新"]
---

**在 2026 年的 Jamf Pro 中，推送系統更新（iOS/iPadOS/macOS）已全面轉向「宣告式管理 (DDM)」模式。** 這不僅比舊式的遠端指令更穩定，還能讓裝置「自主」處理下載與安裝流程，大幅降低伺服器負載。

## 1. 使用「軟體更新藍圖 (Software Update Blueprints)」

這是目前最推薦且最專業的做法：

1.  進入 **`Settings` > `Device Management` > `Software Update Blueprints`** 。

1.  點選 `New` 並設定目標版本（如：iOS 26.x 或 macOS 26 Tahoe）。
1.  **關鍵設定：強制執行截止日 (Deadline)** ：
    - 您可以設定一個日期（例如：三天後的下午 5 點）。
    - 在截止日之前，使用者會收到溫和的系統提醒。
    - **一旦到達截止日，裝置將無視使用者狀態，強制重新啟動並執行更新。**

1.  將此藍圖指派給目標裝置群組。

## 2. 透過大量動作傳送遠端命令 (傳統方式)

若需要對特定搜尋結果的裝置立即發送更新：

1.  在 `Mobile Devices` 或 `Computers` 的搜尋結果頁面，點選右下角的 **`Action (對所有裝置採取行動)`** 。

1.  選擇 **`Send Remote Commands (傳送遠端命令)`** 。
1.  在遠端命令清單中，選擇 **「更新受監管裝置上的 OS 版」** 。
1.  在 **「更新 OS 選項」** 頁面中，您可以根據需求選擇：
    - **目標版本** ：建議選擇「Latest version based on device eligibility (符合裝置資格的最新版本)」。
    - **採取行動** ：
      - **Download the update for users to install** (下載供使用者安裝)：裝置會先下載好檔案，等到學生有空再點選。
      - **Download and install the update, and restart devices after installation** (下載並安裝，並在安裝後重啟)：強制執行，適合在放學後安排統一更新。

## 3. 2026 年管理重點：macOS 26 Tahoe 與 Intel Mac

- **Legacy 支援** ：macOS 26 是最後一個支援 Intel 處理器 Mac 的版本，對於老舊 Mac，更新時建議預留兩倍的下載時間，並確認 **Bootstrap Token** 已正確代管。
- **DDM 自助性** ：在最新的系統中，裝置會根據 DDM 宣告，自動在夜間充電且閒置時執行更新，成功率明顯高於以往的推送指令。

## 最佳實踐建議：

1.  **避開大考周** ：雖然可以強制更新，但請務必避開考試或重要演示期間，以免裝置進入更新畫面（通常需 15-30 分鐘）影響學生。
1.  **電源確認** ：提醒學生在排程更新的當晚，將 iPad/Mac 插上充電器，這是確保更新成功的最大關鍵。
