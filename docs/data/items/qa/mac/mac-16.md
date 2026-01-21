---
id: mac-16
title: "【Sequoia 新功能】如何管理或禁用「iPhone 鏡像輸出 (iPhone Mirroring)」？"
category: "第七部分：Mac 裝置管理 (Mac Management)"
important: false
tags: ["macOS 15","iPhone Mirroring","隱私","限制","DLP"]
---

## Q: 【Sequoia 新功能】如何管理或禁用「iPhone 鏡像輸出 (iPhone Mirroring)」？

## Answer

**macOS 15 Sequoia 引入的「iPhone 鏡像輸出」雖然方便，**
**但在校園公用電腦或高機密行政機上存在資料外洩 (DLP) 風險，建議透過 MDM 限制。**

**資安風險：**

當使用者將個人 iPhone 與學校 Mac 配對後，iPhone 的通知、照片與 App 內容可直接投射在 Mac 螢幕上，
甚至支援檔案拖曳。這可能導致個資外洩或學生在上課時偷玩手機遊戲。

**Jamf Pro 設定步驟：**

1. **建立/編輯設定描述檔**：

* 前往 **「電腦」** > **「設定描述檔」** > **「限制 (Restrictions)」**。

1. **功能限制 (Functionality)**：

* 找到 macOS 26 (Tahoe) 專區。
* **選項 A (完全禁用)**：取消勾選 **「允許 iPhone 鏡像輸出」**。
* **選項 B (進階控制)**：勾選並設定為 **「僅限檢視 (View Only)」** 模式。
* **選項 C (安全加強)**：取消勾選 **「允許檔案與剪貼簿同步」**。

1. **派送範圍**：電腦教室建議全禁，行政電腦建議開啟但視情況關閉檔案同步。

**效果**：

設定生效後，即使使用者登入了相同的 Apple 帳號，開啟「iPhone 鏡像輸出」App 時會顯示「由管理員停用」的訊息。
