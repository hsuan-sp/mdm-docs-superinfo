---
id: app-26
title: "如何管理 2024-2025 年新推出的 AI 輔助教學 App（如 Writing Tools、Image Playground）？"
category: "第三部分：軟體採購與 App 管理 (App Management)"
important: true
tags: ["AI","Apple Intelligence","應用程式管理","隱私安全","考試防弊"]
---

# Q: 如何管理 2024-2025 年新推出的 AI 輔助教學 App（如 Writing Tools、Image Playground）？

# Answer

**隨著 Apple Intelligence 在 2024-2025 年全面成熟，教學 App 也進入「AI 輔助時代」。**
**對於學校來說，最大的挑戰在於如何平衡「AI 帶來的效率」與「學習評量的公平性」及「隱私安全」。**
**iOS 26 提供了更精細的 MDM 指令來控管這些功能。**

---

## 一、 核心 AI 功能及其教學影響

### 1. Writing Tools (寫作工具)
內建於系統底層，支援重寫、校對、摘要。
*   **優點**：輔助外語學習，改善語法。
*   **風險**：學生可能利用此功能直接生成作文題目答案。

### 2. Image Playground (圖像樂園)
生成式 AI 繪圖。
*   **優點**：激發創意，可用於數位美術與專題製作。
*   **風險**：不當圖像生成、學生分心。

### 3. Math Notes (數學備忘錄)
iPadOS 18 引進，iOS 26 強化版。
*   **優點**：即時理解公式與手寫運算。
*   **風險**：數學考試時自動解題。

---

## 二、 MDM 控管策略 (Jamf Pro 實戰)

針對不同教學場景，資訊組長可透過以下 Payload 進行分級控管：

### 🚨 策略 A：考場嚴控模式 (High Restriction)
在考試專用的智慧型群組中，推送限制 Profile：
*   **封鎖 Writing Tools**：`allowWritingTools = false`
*   **封鎖 AI 生成圖像**：`allowImagePlayground = false`
*   **禁用計算機與數學解析**：確保學生需親自運算。
*   **效果**：iPad 回歸為單純的作答工具，無法呼叫任何系統級 AI 輔助。

### 🎨 策略 B：創意教學模式 (Educational Usage)
針對美術課、語言課：
*   **允許部分功能**：開放 Image Playground，但限制在校內網路環境使用。
*   **限制隱私上傳**：啟用 `Disallow Cloud-based Generative AI` (若學校有極高資安需求)，強制 AI 僅在裝置端 (On-device) 運作，不連回雲端。

---

## 三、 隱私與資安考量

1.  **資料不落地**：Apple Intelligence 強調私密性。MDM 管理員可確認 `Private Cloud Compute` 的運作狀態，確保學生的私人資料不被用於訓練 AI 模型。
2.  **分齡管理**：由於部分生成式 AI 功能可能有 13 歲或 18 歲的年齡建議，建議透過 **「管理式 Apple 帳號」** 的分組功能，針對不同年段開啟對應功能。

---

## 四、 給老師的教學調整建議

1.  **改變作業形式**：如果 AI 可以做出標準答案，建議將作業改為「批判性思考」或「口頭報告」。
2.  **善用「記錄歷史」**：部分 AI 輔助 App 支援顯示修改紀錄。老師可要求學生展示「如何利用 AI 改善草稿」的過程，而非僅交出最終成果。
3.  **融入 AI 素養課程**：比起單純禁止，教導學生如何下出好的「提示詞 (Prompt)」更符合 2026 年的職場所需。

---

## 實務建議

AI 是工具而非威脅。建議資訊組長在全校範圍內預設開啟 AI 功能，但**提前建立好「考試專用 Profile」**，以便在大型測驗時透過一鍵排程關閉所有 AI 輔助。
