---
term: "Network Extension URL Filtering API (網路擴充功能 URL 過濾 API)"
category: ["Network"]
tags: ["URL 過濾", "內容過濾", "Network Extension", "隱私保護", "Jamf Safe Internet"]
---

## 術語定義

iOS 26 與 macOS Tahoe 引入的全系統 URL 過濾 API。此 API 讓第三方 App（如 Jamf Safe Internet）能以隱私保護的方式執行系統級 URL 過濾，無需建立傳統 VPN 通道，效能更佳、隱私更好。

## 白話文比喻

以前內容過濾像「檢查哨」，所有車輛（網路流量）都要繞道通過檢查站（VPN），速度慢。新 API 像是在每輛車內裝「導航禁止提示」，車子自己知道哪些路（網址）不能走，不用繞路也能過濾。

## MDM 相關

這是 Jamf Safe Internet、Jamf Trust 等教育內容過濾工具的核心技術基礎。教育部精進方案 2025 年 9 月的架構調整即基於此技術。

## 技術原理

使用 DNS over HTTPS (DoH) 與系統級 Network Extension，在不解密流量的前提下實現 URL 過濾，符合隱私法規。
