---
id: cls-11

title: "為什麼 iPadOS 17 以後，網管反應抓不到裝置的真實 MAC 位址？(專用 Wi-Fi 位址)"

category: "第四部分：課堂管理與教學應用 (Classroom Management)"

important: true

tags: ["MAC 位址", "專用 Wi-Fi 位址", "隱私功能", "網路管理"]
---

**這是因為 Apple 預設啟用了「專用 Wi-Fi 位址 (Private Wi-Fi Address)」功能。**

在較新版本的 iOS / iPadOS 中，此功能提供「固定 (Fixed)」與「輪替 (Rotating)」兩種模式：

- **固定模式** （預設）：針對特定 Wi-Fi 提供一個固定的隨機 MAC 位址，防止誇網路追蹤。

- **輪替模式** ：每隔約兩週變更一次 MAC 位址，安全性最高，但也最容易造成網管追蹤困難。

由於裝置廣播的是虛擬 MAC，網管系統將無法正確識別設備硬體。

## 影響層面 ：

- **DHCP 發放** ：若學校 DHCP 伺服器依賴 MAC 綁定固定 IP，此功能會導致 IP 不斷變動。
- **行為審計** ：防火牆無法透過硬體 MAC 追蹤特定學生的上網行為。

## MDM 解決方案 (全校統一關閉) ：

1.  在 Jamf Pro 編輯 **「Wi-Fi」** 設定描述檔。
2.  進入 Wi-Fi Payload 設定頁面。
3.  勾選 **「停用 MAC 位址隨機化 (Disable MAC Address Randomization)」** (或稱 Disable Private Address)。
4.  將此描述檔派送至裝置。

## 效果 ：

當裝置連接該 _特定 SSID_（例如 School-Student）時，會強制使用 **硬體真實 MAC** 。

- **注意** ：此設定僅對該描述檔指定的 Wi-Fi 有效。

- 學生回家連線自家 Wi-Fi 時，仍會自動開啟隨機化以保護隱私。
