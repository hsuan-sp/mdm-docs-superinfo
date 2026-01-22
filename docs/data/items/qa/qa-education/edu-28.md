---
id: edu-28
title: "學校 iPad/Mac 到達使用年限後，MDM 管理員應如何處理「退休」流程？"
category: "第八部分：教育場域常見情境 (Education Scenarios)"
important: false
tags: ["裝置退休", "ESG", "資料清理", "資產管理"]
---

## Q: 學校 iPad/Mac 到達使用年限後，MDM 管理員應如何處理「退休」流程？

## Answer

**裝置退休不只是「關機收納」，更涉及資料安全標籤與 Apple 校務管理 (ASM) 的權限歸還。**
**正確的退休流程能確保學生隱私不外洩，並符合數位學習精進方案的 ESG 永續管理規範。**

## 裝置退休 SOP (標準作業程序)

## 1. 深度資料清除 (Zero-Touch Cleanup)

* **執行 Wipe Device**：透過 Jamf Pro 發送清除指令，確保所有使用者資料、快取、Managed Apple Accounts 殘留皆被抹除。
* **iOS 26 建議**：使用「清除所有內容與設定 (EACS)」指令，這比傳統重灌更快且更徹底。

## 2. ASM 身分「解編」 (Release From ASM)

這是最重要的一步，防止裝置在二手市場或報廢後仍試圖連回學校 MDM：

* 前往 **Apple School Manager (ASM)**。
* 找到該裝置序號，點選「解編裝置 (Release Device)」。
* **注意**：一旦解編，除非手動使用 Apple Configurator 重新加入，否則該裝置將不再具備「自動裝置註冊 (ADE)」功能。

## 3. MDM 紀錄庫存化 (Inventory Archiving)

* 不要直接刪除 Jamf Pro 中的紀錄。建議將其移動至 **「退休群組 (Retired Group)」**。
* 匯出完整資產清冊（序號、購買日期、最後報到時間），作為資產報廢的審計憑證。

## 4. 永續發展 (ESG) 與生命週期

* **二度就業**：若硬體效能尚可但無法支援 iOS 26，可降級作為「圖書館專用電子書閱讀器」或「門鎖自動化控制面板」。
* **環保報廢**：若已損壞，請選擇符合環保標章的電子廢棄物廠商，並於 ASM 中註記為「報廢 (Decommissioned)」。

**實務建議：**

退休流程的嚴謹程度，直接影響到學校的資安風險。建議 ICT 資訊支援團隊長每年學期末定期檢視資產狀態，確保「名實相符」。
