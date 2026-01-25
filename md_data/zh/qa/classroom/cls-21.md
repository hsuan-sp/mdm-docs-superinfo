---
id: cls-21

title: "老師可以強制將學生的畫面投影到 Apple TV 或大螢幕嗎？"

category: "第四部分：課堂管理與教學應用 (Classroom Management)"

important: false

tags: ["AirPlay", "Apple TV", "畫面分享", "教學展示"]
---

**可以。老師透過「課堂」App，能指定任意學生的畫面透過 AirPlay 投射出來，無需學生操作。**

## 操作方式 ：

1.  在「課堂」App 中點選該名學生。
2.  點選 **「AirPlay」** 圖示。
3.  選擇教室內的 Apple TV 或支援 AirPlay 的大屏/投影機。
4.  學生的畫面會立即被「強制」投射出去。

## 關鍵設定 (防止搶頻) ：

為了避免學生惡作劇隨意投影干擾上課，建議管理員在 **Apple TV** 設定中開啟 **「需要驗證碼」** 或 **「僅限同網域」** 。同時，在 Jamf Pro 的限制描述檔中，可以設定 **「強制 AirPlay 請求 (Force AirPlay outgoing requests to accept pairing password)」** ，讓老師擁有主控權。
