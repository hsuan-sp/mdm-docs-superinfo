---
id: app-26

title: "如何管理 2024-2025 年新推出的 AI 輔助教學 App（如 Writing Tools、Image Playground）？"

category: "第三部分：軟體採購與 App 管理 (App Management)"

important: true

tags: ["AI", "Apple Intelligence", "應用程式管理", "隱私安全", "考試防弊"]
---

**隨著 Apple Intelligence 在 2024-2025 年全面成熟，教學 App 也進入「AI 輔助時代」。對於學校來說，最大的挑戰在於如何平衡「AI 帶來的效率」與「學習評量的公平性」及「隱私安全」。iOS 26 提供了更精細的 MDM 指令來控管這些功能。**

## 1. 核心 AI 功能的開關控制

管理員可以透過 Jamf Pro 的「限制 (Restrictions)」描述檔進行管理：

- **寫作工具 (Writing Tools)** ：可設定為「全部允許」、「僅限本機處理」或「完全禁用」。在正式考試期間，建議透過 DDM 宣告暫時禁用，以確保學生獨立寫作。

- **圖像生成 (Image Playground / Genmoji)** ：可針對特定年級限制使用權限，或限制僅能於特定 App（如：無邊記 Freeform）中使用。

## 2. 第三方 AI App 的審核機制

對於整合了第三方 LLM（如 OpenAI, Google Gemini）的教學 App：

- **隱私標籤檢查** ：2026 年 App Store 要求更透明的 AI 隱私標籤。管理員應優先採購標註為「不追蹤個人數據」或「僅用於上下文推理」的 App。

- **VPP 大量派送** ：透過 Jamf Pro 統一派送已通過資安審查的 AI 工具，並禁止學生自行從 App Store 下載未經核准的 AI App。

## 3. 教學現場的靈活管理

- **利用課堂 App (Classroom)** ：老師可以在上課時利用「鎖定 App」功能，將學生的 iPad 固定在指定的教學工具中，自動停用全局的寫作工具面板。
- **網路層級過濾** ：若學校擔心學生在課堂外過度依賴 AI 瀏覽器插件，可透過 MDM 安裝「內容過濾 (Content Filtering)」描述檔，精準管控 AI 伺服器的存取。

## 💡 策略建議 ：

與其全面封鎖，建議針對「創作課」開啟權限，而在「評量課」透過 Jamf Pro 推送「考試模式 (ASAM)」自動停用所有 AI 輔助功能。
