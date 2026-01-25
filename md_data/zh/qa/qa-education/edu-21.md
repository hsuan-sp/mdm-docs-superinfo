---
id: edu-21

title: "如何管理 iOS 18 新增的「訊息摘要 (Notification Summary)」功能？"

category: "第八部分：教育場域常見情境 (Education Scenarios)"

important: true

tags: ["iOS 18", "Apple Intelligence", "通知管理"]
---

**iOS 18 引進了 AI 自動摘要通知內容的功能 (Apple Intelligence)。這在某些專注模式下是很有用的，但也可能讓學生忽略完整訊息或在課堂中造成分心。**

## 實務建議：管理方式

1.  **限制模式**：管理員可以透過 Jamf Pro 的「Restrictions Payload（限制載荷）」關閉 **「Allow Intelligent Notification Preview (允許智慧通知預覽)」**。這將禁用 AI 對通知內容的自動提取與摘要。
1.  **教學引導**：若不完全禁用，可鼓勵學生在「上課時間」的專注模式中設定此功能，僅顯示最緊急的教育資訊，減少非教學訊息（如社群通知）的長篇大論干擾。

## 提示

此功能屬於 Apple Intelligence 的一部分，僅能在支援 AI 的機型（如 iPad Air M1/M2/M3, iPad Pro M1-M4 等）上運作與進行軟體管控。
