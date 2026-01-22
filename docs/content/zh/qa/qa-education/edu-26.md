---
id: edu-26
title: 老師如何管理 iOS 26 的 Apple Intelligence「寫作工具」？
category: 第八部分：教育場域常見情境 (Education Scenarios)
important: true
tags:
  - Apple Intelligence
  - 寫作工具
  - AI 管理
  - 測驗安全
---
## Q: 老師如何管理 iOS 26 的 Apple Intelligence「寫作工具」？

## Answer

**Apple Intelligence 的「寫作工具 (Writing Tools)」是強大的輔助，但在作文課或語言測驗中可能涉及學術誠信。**
**老師可以透過 MDM 完全關閉、部分限制，或在「課堂」App 中即時監控使用狀態。**

## 管理三策略

## 1. MDM 端的行政控管 (強制性)

管理員可以在 Jamf Pro 的限制描述檔中設定：

* **完全禁用寫作工具**：適用於全校性的作文大考期間。
* **禁用改寫功能，保留校對與摘要**：適用於日常教學，讓學生學習修正文法錯誤，但不依賴 AI 代寫文章。
* **受管 Apple 帳號隔離**：若學生登入「受管 Apple 帳號」，Writing Tools 會自動符合教育部的資料隱私規範（資料不被存入模型訓練）。

## 2. 「課堂 (Classroom)」App 的即時視角 (動態管理)

iOS 26 強化了老師對學生設備狀態的感知：

* **螢幕檢視**：老師可以即時看到學生是否啟用了 Writing Tools 的浮動面板。
* **使用記錄分析**：課堂結束後，老師可透過「課堂總結」查看哪些學生在撰寫過程中頻繁啟用了 AI 輔助。

## 3. 使用 Assessment Mode (測驗模式)

在進行正式測驗時，建議讓 App 進入「單一 App 模式」。在 **iOS 26** 中，進入此模式會 **自動禁用** 系統級的 Apple Intelligence 功能，確保測驗純淨性。

## 教學引導建議

* **AI 標示規範**：若允許使用 Writing Tools，建議要求學生在文章末尾標註「本文經 Apple Intelligence 校對」。
* **反向教學**：利用 Writing Tools 產出的多個改寫版本，與學生討論不同修辭的優劣。

**實務建議：**

AI 是未來的必備能力，與其全面封殺，建議老師在「創意發想」階段開放，在「正式撰寫」與「測驗」階段則透過 MDM 限制。
