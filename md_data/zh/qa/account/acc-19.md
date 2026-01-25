---
id: acc-19

title: "如何控管「管理式 Apple 帳號」是否能使用 Apple Intelligence 功能？"

category: "第一部分：帳號與伺服器管理 (Account & Server Management)"

important: false

tags: ["Apple Intelligence", "服務存取", "ASM"]
---

**管理員可透過 Apple 校務管理 (ASM) 的服務存取設定，決定是否開放 AI 相關功能。**

隨著 Apple 於 2024 年底至 2025 年全面推廣 **Apple Intelligence** ，ASM 提供了帳號層級的開關，這與 MDM 的裝置限制是相輔相成的。

## 設定方式 ：

1.  **帳號層級 (ASM)** ：登入 ASM > **「設定」>「使用者登入與目錄同步」>「服務存取」** 。在此可以針對不同職務（如學生）關閉或開啟 Apple Intelligence 服務。
2.  **裝置層級 (MDM)** ：在 Jamf Pro 的限制描述檔中，可以進一步禁用「寫作工具」、「影像遊樂場」等具體功能。

## 為什麼要在帳號層級設定？

若在 ASM 中關閉了該服務，即便學生將其管理式帳號登入到未受監管的個人裝置，該帳號依然無法使用 Apple Intelligence 的雲端運算功能。

這確保了教育機構對資料流向的絕對控制權。
