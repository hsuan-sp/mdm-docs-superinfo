---
term: "Window App (視窗化 App)"
category: ["Core"]
tags: ["Window App", "多工", "iPadOS 26", "視窗化", "拖放式多工"]
---
## 術語定義

iPadOS 26 引入的視窗化多工系統，允許 iPad 像 Mac 一樣以視窗形式開啟多個 App。使用者可透過拖拉 App 圖示（從 Dock 或 Spotlight）創建分割視圖、滑動置前或獨立視窗。這是 iPad 多工處理的重大革新。

## 白話文比喻

以前 iPad 的多工像是「並排攤開課本」，一次看兩本。現在 Window App 讓 iPad 變成「書桌」，你可以把課本、筆記本隨意擺放、重疊、調整大小，就像真的在桌上整理資料一樣自由。

## MDM 相關

教育場域需考慮是否限制此功能，避免低年級學生操作混亂或上課分心。MDM 可透過「Restrictions」描述檔管理多工權限。

**Jamf Pro 設定路徑**：

* Restrictions > Functionality > 取消勾選 "Allow Multitasking" (若需完全禁用)。
* 或透過 DDM 設定更精細的 App 視窗規則。

## 風險提示

過於複雜的多工介面可能讓國小低年級學生不知所措，建議分年級段管理。
