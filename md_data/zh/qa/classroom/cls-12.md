---
id: cls-12

title: "【考試防弊】如何避免學生用 Apple Intelligence (寫作工具) 或數學備忘錄作弊？"

category: "第四部分：課堂管理與教學應用 (Classroom Management)"

important: false

tags: ["Apple Intelligence", "寫作工具", "數學備忘錄", "防弊", "iOS 18"]
---

**針對 iOS 26+ 裝置，管理員應優先透過「宣告式裝置管理 (DDM)」進行即時控管。**

## 風險功能與控管方式 ：

- **寫作工具 (Writing Tools)** ：透過 DDM 的 **Restrictions** 宣告停用 `allowWritingTools`。
- **數學備忘錄 (Math Notes)** ：停用 `allowMathNotes`。
- **Genmoji 與影像遊樂場** ：停用 `allowGenmoji` 與 `allowImagePlayground`。

## 設定路徑 (Jamf Pro) ：

1.  進入 **Blueprints** 或 **Declarations** 。
2.  新增 **Restrictions** 宣告。
3.  針對上述 AI 功能進行封鎖，DDM 具備「即時生效」特性，適合考試前快速派送。

## 未納管裝置 ：

若學生使用個人裝置，管理員可在 **ASM (Apple 校務管理)** 的「服務存取」中，針對租戶層級關閉管理式 Apple 帳號的 Apple Intelligence 權限。

## 硬體門檻校對 ：

- Apple Intelligence 僅支援配備 **M 系列晶片** 或 **A17 Pro 以上** 的裝置。
- **備註** ：目前的入門款 iPad (如第 10 代、第 11 代，搭載 A14/A16 晶片) 硬體本身即不支援上述 AI 功能，管理員可將重點放在配備 M 系列晶片的 iPad Air 與 iPad Pro。
