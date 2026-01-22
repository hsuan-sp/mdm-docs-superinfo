---
category: 第八部分：教育場景與教學應用 (Education Scenarios)
id: edu-24
important: true
tags:
  - Writing Tools
  - Apple Intelligence
  - 考試防弊
  - iOS 26
  - AI
title: iOS 26 的「寫作工具」(Writing Tools) 在正式評量或正式評量或正式評量或正式評量或考試時該如何管理？哪些功能需要禁用？
---
## Q: iOS 26 的「寫作工具」(Writing Tools) 在正式評量或正式評量或正式評量或正式評量或考試時該如何管理？哪些功能需要禁用？

## Answer

* **Apple Intelligence 的「寫作工具」即使離線也能運作，能自動改寫、校對與摘要，對語文類考試構成作弊風險。支援 Apple Intelligence 的裝置必須透過 MDM 強制禁用。**

## 作弊風險分析

* **改寫 (Rewrite)**：學生輸入零碎關鍵字，AI 自動潤飾成完整通順的段落
* **校對 (Proofread)**：自動修正錯別字與文法錯誤，影響英文或國文測驗的鑑別度
* **摘要 (Summarize)**：閱讀測驗時，直接生成文章重點，跳過閱讀過程

## 防弊管理方案

## 方案 A：考試模式描述檔（MDM 限制）

建議在 Jamf Pro 或其他 MDM 中建立專用的考試描述檔：

1. 建立 **Configuration Profile**，命名為「考試限制模式」
2. 前往 **Restrictions (限制)**>**Intelligence**或**Siri** 相關分類
3. 啟用以下限制（設為 Restrict 或取消 Allow）：

* **Allow Writing Tools (允許寫作工具)**
* **Allow Image Playground (允許影像樂園)**
* **Allow Genmoji**
* **Allow Math Notes (允許數學筆記)**（防止數學作弊）

1. **部署策略**：在考試前派送至目標裝置群組，考完試後移除

## 方案 B：單一 App 模式（最嚴格）

若不確定描述檔是否生效，或混用個人裝置（BYOD），建議使用 **「課堂」(Classroom)**App 的 **「鎖定 App」(App Lock)** 功能：

* **操作**：老師將學生的 iPad 鎖定在特定的測驗 App 或瀏覽器頁面
* **原理**：單一 App 模式下，學生無法選取文字呼叫系統選單，也無法使用任何浮動視窗或多工處理，自然無法使用寫作工具

## 裝置差異與管理

需注意班上設備可能不一致，管理需求不同：

| 裝置型號 | 晶片 | 支援 Apple Intelligence | 管理需求 |
| :--- | :--- | :--- | :--- |
| **iPad (第 9 代)**| A13 | ❌ 不支援 |**無需設定**（不符需求） |
| **iPad (第 10 代)**| A14 | ❌ 不支援 |**無需設定**（不符需求） |
| **iPad (A16)**| A16 | ❌ 不支援 |**無需設定**（不符需求） |
| **iPad Air (M1/M2+)**| M1+ | ✅ 支援 |**必須設定** 上述限制 |
| **iPad Pro (M1+)**| M1+ | ✅ 支援 |**必須設定** 上述限制 |
| **iPad mini (A17 Pro)**| A17 Pro | ✅ 支援 |**必須設定** 上述限制 |
