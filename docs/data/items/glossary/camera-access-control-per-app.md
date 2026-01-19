---
term: "Camera Access Control per App (個別 App 相機存取控制)"
category: ["Privacy"]
tags: ["相機權限", "隱私", "allowedCameraRestrictionBundleIDs", "個別 App"]
---

## 術語定義

iOS 26/iPadOS 26 新增的 MDM 金鑰 `allowedCameraRestrictionBundleIDs`，可針對個別 App 授予或拒絕相機存取權限，比全域相機限制更精細。

## 白話文比喻

以前相機權限像「大門鑰匙」，要嘛全開要嘛全鎖。現在像「房卡系統」，可以讓 A App 用相機，但 B App 不行。

## MDM 相關

教育場域可允許「課堂 (Classroom)」或「Schoolwork」使用相機，但禁止社交 App 使用，防止隱私洩漏。
