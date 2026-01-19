---
term: "Jamf binary"
category: ["Jamf","macOS"]
---

## 術語定義

Jamf Binary (`Jamf` 指令) 是 Jamf Pro 安裝在 macOS 上的管理代理程式 (Agent)。它讓管理員可以在終端機執行 `sudo Jamf policy` 來手動觸發管理政策，是 macOS 受管裝置的核心執行元件。iOS 裝置因系統封閉，沒有此元件。

## 白話文比喻

這是駐守在 Mac 裡的「執行官」。MDM 伺服器大多時候只是發號施令，真正動手做事（安裝軟體、執行腳本、回報資料）的，都是這位駐守在電腦裡的執行官（Jamf Binary）。
