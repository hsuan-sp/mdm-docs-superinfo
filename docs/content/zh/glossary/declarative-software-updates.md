---
term: "Declarative Software Updates (宣告式軟體更新)"
category: ["DDM"]
---

## 術語定義**Declarative Software Updates (宣告式軟體更新)**是 Apple 自**2026 年底起強制使用**的軟體更新管理方式。

傳統 MDM 的遠端更新指令將停止支援，所有更新必須透過 DDM 的 Declaration 機制執行。它支援更進階的功能：

***Beta 註冊**：遠端將裝置註冊到 Beta 測試計畫。
***分階段推出**：逐步對機隊進行更新，避免同時更新造成網路癱瘓。
***Enforcement Deadline**：設定強制的更新截止期限。

## 白話文比喻

以前更新像**「老師一個一個催學生交作業」**（MDM 伺服器逐台發指令），老師很累，學生也被催得很煩。

現在像**「公佈欄貼出截止日」**（DDM 宣告），上面寫著：「下週五前要把作業交出來，沒交的就死當」。學生（裝置）會自己看時間，找空檔把作業寫完交上去。

## MDM 相關

⚠️**重要提醒**：學校必須在**2026 年底前**將所有軟體更新策略轉換為 DDM，否則將無法管理更新。**Jamf Pro 對應**：

* 使用**Blueprints (Configuration Profiles 3.0)**執行 DDM 軟體更新。
* 舊版 Policy-based 更新將失效。

## 技術優勢

***自主評估**：裝置會依據電量、網路狀況、是否正在使用中，自主決定最佳更新時機。
***即時回報**：透過**Status Channel**即時回報更新進度。
***跨平台**：支援 iPhone、iPad、Mac、Apple TV 及 Apple Vision Pro。
