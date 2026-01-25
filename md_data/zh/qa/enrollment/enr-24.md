---
id: enr-24

title: "如何設定「強制執行截止日期」(Enforcement Deadline) 確保裝置按時完成 MDM 註冊或系統更新？"

category: "第二部分：裝置註冊與部署 (Device Enrollment)"

important: true

tags: ["Enforcement Deadline", "DDM", "強制執行", "截止日期", "合規"]
---

**透過宣告式裝置管理 (DDM) 設定強制執行截止日期，裝置會自主評估並在截止時移除「稍後」選項，自動執行更新或註冊。**

## 功能說明 ：

## 運作原理 ：

- 裝置接收包含截止日期的宣告 (Declaration)。
- 裝置自主管理通知頻率和提醒時機。
- 到達截止日時，強制執行指定動作。
- 無需 MDM 伺服器持續推送指令。

## 適用範圍 ：

- iOS 26、iPadOS 26、macOS 26、visionOS 26、tvOS 26。
- 軟體更新強制執行。
- MDM 註冊截止（用於 MDM 遷移）。
- 設定描述檔的強制安裝。

## 設定步驟（Jamf Pro 範例） ：

### 軟體更新截止日設定

1.  進入 **Devices** > **Blueprints** 或 **Computers** > **Blueprints** 。
2.  建立或編輯 **Software Update Declaration** 。
3.  設定更新目標：
    - 指定目標 iOS/macOS 版本。
    - 或選擇「最新版本」。

4.  啟用 **Enforcement Deadline** ：
    - 設定具體日期和時間（如 2026-02-28 17:00）。
    - 選擇時區（建議使用裝置本地時間）。

5.  部署至目標裝置群組。

### MDM 遷移截止日設定

1.  在 ASM/ABM 中設定遷移目標 MDM。
2.  設定 **Enrollment Deadline** 。
3.  裝置會自動處理遷移流程。

## 使用者體驗時間軸 ：

### 截止日前的通知機制

- 裝置會自主決定何時向使用者顯示通知。
- 隨著截止日期臨近，通知會變得更加頻繁。
- 使用者在截止日前仍可選擇「稍後」更新。

### 到達截止日時

- 「稍後」選項將被移除。
- 裝置執行強制更新或註冊。
- 確保所有裝置在指定時間前符合合規要求。
