---
id: mac-7
title: "M 系列晶片 (Apple Silicon) 的 Mac 在管理上有什麼特殊限制？"
category: "第七部分：Mac 裝置管理 (Mac Management)"
important: false
tags: ["Apple Silicon","Bootstrap Token","安全啟動","核心延伸功能"]
---

## Q: M 系列晶片 (Apple Silicon) 的 Mac 在管理上有什麼特殊限制？

## Answer

**Apple Silicon (M1-M5) 的安全性架構與 Intel Mac 完全不同。**
**管理核心在於「Bootstrap Token」與「擁有權 (Ownership)」。**

若未正確設定，MDM 將無法執行軟體更新或安裝核心外掛。

**關鍵技術指標：**

1. **Bootstrap Token (引導代令)**：

* **問題**：在 Apple Silicon 上，部分高權限操作（如安裝軟體更新、啟用核心延伸功能）

 需要「安全代令」。

* **解法**：確認 Jamf Pro 的 **PreStage Enrollment** 已勾選「允許 MDM 上傳 Bootstrap Token」。
* **驗證**：在 Jamf Pro 電腦紀錄中，確認 `Bootstrap Token Allowed` 為 `Yes`。

 若為 No，許多管理指令會失敗。

1. **Volume Ownership (磁碟擁有權)**：

* 只有被視為「擁有者」的使用者才能執行系統重置或更新。
* 透過 ADE 註冊並建立的第一個帳號會自動獲得擁有權。MDM 透過 Bootstrap Token 託管此權限。

1. **核心延伸功能 (Kernel Extensions / KEXTs)**：

* Apple Silicon 預設**封鎖**所有第三方 KEXTs。
* 若必須安裝（如舊款防毒軟體），必須重開機進入 Recovery Mode 降低安全性設定（Reduced Security）。
* **現代建議**：請改用 **系統延伸功能 (System Extensions)**，這是 Apple 推薦的新架構，

 可直接透過 MDM 設定檔授權，無需降低系統安全性。
