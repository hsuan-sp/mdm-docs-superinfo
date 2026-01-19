---
term: "Declarative Software Updates (宣告式軟體更新)"
category: ["DDM"]
tags: ["DDM", "軟體更新", "2026年強制", "Beta 註冊", "分階段推出"]
---

## 術語定義

Apple 自 2026 年底起強制使用的軟體更新管理方式。傳統 MDM 遠端更新指令將停止支援，所有軟體更新必須透過宣告式裝置管理（DDM）的 Declaration 機制執行。支援遠端註冊 Beta 計畫、分階段推出、Enforcement Deadline 等進階功能。

## 白話文比喻

以前更新像「老師一個一個催學生交作業」（MDM 伺服器逐台發指令）。現在像「公佈欄貼出截止日，學生自己看時間交」（DDM 宣告，裝置自主執行）。

## MDM 相關

**2026 年底強制轉換！** 學校必須在 2026 年底前將所有軟體更新策略轉換為 DDM，否則將無法管理更新。

**Jamf Pro 對應**：
使用 **Blueprints (Configuration Profiles 3.0)** 執行 DDM 軟體更新。舊版 Policy-based 更新將失效。

## 技術優勢

* 裝置自主評估更新時機（電量、網路、使用狀況）
* Real-time 狀態回報（Status Channel）
* 支援 Apple TV、Apple Vision Pro
