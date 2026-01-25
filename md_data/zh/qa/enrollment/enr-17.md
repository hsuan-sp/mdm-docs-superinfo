---
id: enr-17

title: "裝置被「啟動鎖定 (Activation Lock)」鎖住了，該如何解除？"

category: "第二部分：裝置註冊與部署 (Device Enrollment)"

important: false

tags: ["啟用鎖定", "Activation Lock", "解鎖代碼", "Apple 裝置 App"]
---

**啟動鎖定是 Apple 的資安防護機制，若您擁有該裝置的所有權，可透過多種技術途徑解除鎖定。**

當 iPad 被清除（Erase）後，若系統偵測到其曾開啟「尋找」功能，會要求輸入原 Apple 帳號密碼。身為學校管理員，您的解鎖方案如下：

## 方案一：使用解鎖代碼 (Bypass Code) —— 最快速

若裝置在鎖定前已受 Jamf Pro 管理且為受監管狀態：

1.  登入 Jamf Pro，找到該裝置紀錄。

2.  在 **「清單 (Inventory)」>「安全性 (Security)」** 中，尋找 **「啟用鎖定繞過代碼 (Activation Lock Bypass Code)」** 。
3.  在 iPad 上的密碼欄位輸入該組代碼（Apple 帳號欄位請留空），即可跳過驗證。

## 方案二：透過管理入口直接解除 —— 最新標準流程

1.  登入 [Apple 校務管理 (ASM)](https://school.apple.com)。
2.  點選「裝置」，搜尋該序號。
3.  若該裝置由組織擁有，可直接點選 **「關閉啟動鎖定 (Turn off Activation Lock)」** 。完成後稍候片刻，將 iPad 重新開機即可直接進入設定。

## 方案三：透過電腦進行回復 (Restore)

若裝置狀態異常，無法接收遠端指令：

1.  使用 Mac 的 **Finder / Apple Configurator** ，或 Windows 的 **Apple 裝置 App** 。

2.  將裝置進入復原模式進行回復。注意：此動作會清除資料，且完成後仍可能出現啟動鎖定畫面（需搭配方案一或二解鎖）。

## 方案四：聯絡 Apple 官方支援

若以上自動化工具皆失效（例如：裝置未註冊就遭學生鎖定），需準備原廠購買發票或經銷商出貨單，致電 **Apple 支援 (0800-095-988)** 建立案件，由 Apple 後端工程師手動移除。

## 實務建議 ：

在 Jamf Pro 的 PreStage 註冊 設定中，應預設開啟 **「防止啟動鎖定」** 功能，這能確保裝置在被清除時不會自動進入鎖定狀態，減少行政處理負擔。
