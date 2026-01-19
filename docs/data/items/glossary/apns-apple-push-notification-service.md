---
term: "APNs (Apple Push Notification service)"
category: ["Apple"]
---

## 術語定義

Apple Push Notification service (APNs) 是 MDM 傳送指令的傳令兵。MDM 伺服器無法直接控制裝置，必須發送訊號給 Apple 的 APNs 伺服器，再由 APNs「喚醒」裝置向 MDM 報到並領取任務。若 APNs 連線中斷，MDM 將完全無法管理裝置。

## 白話文比喻

APNs 是 MDM 與裝置間的「傳話筒」。MDM 想叫裝置做事（如安裝 App），不能直接喊，要透過 Apple (APNs) 拍拍裝置的肩膀說「這有你的新任務」。如果這個傳話筒壞了（無法連線 Apple），MDM 喊破喉嚨裝置也聽不到。
