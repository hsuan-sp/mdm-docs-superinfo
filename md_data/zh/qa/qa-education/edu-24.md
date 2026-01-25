---
id: edu-24

title: "iOS 26 的「寫作工具」(Writing Tools) 在正式評量或考試時該如何管理？哪些功能需要禁用？"

category: "第八部分：教育場景與教學應用 (Education Scenarios)"

important: true

tags: ["Writing Tools", "Apple Intelligence", "考試防弊", "iOS 26", "AI"]
---

**Apple Intelligence 的「寫作工具」即使離線也能運作，對語文類考試構成作弊風險。**支援 Apple Intelligence 的裝置必須在正式評量時透過 MDM 強制禁用相關功能，以維護考試公平性。

## 作弊風險分析

- **改寫 (Rewrite)**：學生輸入零碎關鍵字，AI 自動潤飾成完整通順的段落。
- **校對 (Proofread)**：自動修正錯別字與文法錯誤，影響英文或國文測驗的鑑別度。
- **摘要 (Summarize)**：閱讀測驗時，直接生成文章重點，跳過學生自主閱讀理解的過程。

## 防弊管理方案

### 方案 A：考試模式描述檔（MDM 限制）

建議在 Jamf Pro 中建立專用的「考試限制模式」配置描述檔：

1.  前往 **Restrictions (限制)** > **Intelligence** 分類。

1.  啟用以下限制（設為不允許）：
    - **Allow Writing Tools (不允許寫作工具)**
    - **Allow Image Playground (不允許影像樂園)**
    - **Allow Math Notes (不允許數學筆記)**（防止數學自動求解作弊）

### 方案 B：應用程式鎖定（單一 App 模式）

使用「課堂」(Classroom) App 的 **「鎖定 App (App Lock)」** 功能：

- **原理**：在單一 App 模式下，學生無法選取文字呼叫系統選單，也無法使用任何浮動視窗。這會**自動阻斷**系統級的寫作工具入口。

## 裝置管理需求差異

需注意班上設備可能不一致，只有具備 M 系列晶片或 A17 Pro 以上的機型（如 iPad Air M1/M2+, iPad Pro M1+, iPad mini 7）支援 AI，因此必須優先針對這些裝置設定限制。對於 iPad 9 或 iPad 10 等不支援 AI 的裝置，則無需特別設定。
