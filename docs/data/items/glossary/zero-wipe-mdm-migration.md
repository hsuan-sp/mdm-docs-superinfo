---
term: "Zero-Wipe MDM Migration (零抹除 MDM 遷移)"
category: ["MDM"]
tags: ["MDM 遷移", "零抹除", "ABM", "ASM", "裝置轉移"]
---

## 術語定義

iOS 26、iPadOS 26、macOS Tahoe 支援的 MDM 遷移功能。透過 Apple Business Manager (ABM) 或 Apple School Manager (ASM)，可將裝置從舊 MDM 遷移至新 MDM，無需抹除資料。保留使用者資料與管理式 App，但仍需重新設定描述檔。

## 白話文比喻

以前換 MDM 像「搬家要把房子拆掉重建」，所有東西都沒了。現在零抹除遷移像「換管理公司但不搬家」，家具（App、資料）都還在，只是換新管理員。

## MDM 相關

可設定「Enforcement Deadline（強制執行截止日期）」，過期未遷移的裝置會收到遞增通知。

## 風險提示

教育環境不建議零抹除遷移！因舊描述檔殘留易導致 Apple Classroom 失靈、VPP 授權衝突。建議仍使用「Return to Service」完全重置。
