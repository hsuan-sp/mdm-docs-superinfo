---
term: "Declarative App Management (宣告式 App 管理)"
category: ["DDM"]
tags: ["DDM", "App 管理", "必要 App", "選用 App", "自動更新"]
---

## 術語定義

iOS 26、iPadOS 26、macOS Tahoe 的 DDM App 管理機制。可部署 App Store App、Custom App、.pkg 套件。支援定義每個 App 的更新行為（強制更新、禁用自動更新、釘選版本），並提供即時安裝狀態回報。

## 白話文比喻

以前派送 App 像「快遞到府，簽收就好」。現在像「訂閱服務，可設定自動續訂、暫停、指定版本」，更有彈性。

## MDM 相關

* **Required Apps（必要 App）**：自動安裝，使用者無法移除
* **Optional Apps（選用 App）**：使用者可選擇安裝
* **Per-App Update Control**：可針對個別 App 設定是否自動更新

**Jamf Pro 設定路徑**：
Blueprints > App Management > Declarative App Configuration
