---
term: "Network Extension URL Filtering API (網路擴充功能 URL 過濾 API)"

category: ["Network"]
---

## 術語定義

**Network Extension URL Filtering API** 是 Apple 在 macOS 與 iOS 引入的現代化網路過濾架構。

它的特性包括：

- **系統層級整合** ：直接運作於作業系統核心層，允許第三方資安 App (如 Jamf Trust) 在不建立 VPN 的情況下過濾流量。

- **效能優勢** ：相比傳統 VPN 方式，它不需將流量導向外部伺服器，過濾速度更快，電池消耗更少。
- **隱私保護** ：支援 DNS over HTTPS (DoH) 和加密流量檢測，能在不解密使用者敏感數據（如密碼）的前提下阻擋惡意網站。

## 白話文比喻

這是內建在車上的 **「智慧導航禁區」** 。

- **舊方法 (VPN)** ：像是在路上設 **「檢查哨」** 。所有車子都要先開到檢查哨停下來，檢查完才能通過，容易塞車（網速慢）。

- **新方法 (API)** ：像是直接更新車上的 **「導航圖資」** 。車子（裝置）自己就知道哪條路（網址）是禁區不能走。不用停車檢查，既省油（省電）又順暢。

## MDM 相關

這是 Jamf Safe Internet、Jamf Trust 等教育內容過濾工具的核心技術基礎。教育部精進方案 2025 年 9 月的架構調整即基於此技術。

## 技術原理

使用 DNS over HTTPS (DoH) 與系統級 Network Extension，在不解密流量的前提下實現 URL 過濾，符合隱私法規。
