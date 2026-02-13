---
id: cls-22

title: "學校網路有分「老師」與「學生」不同網段 (VLAN)，「課堂」App 還能通嗎？"

category: "第四部分：課堂管理與教學應用 (Classroom Management)"

important: true

tags: ["網路架構", "VLAN", "Bonjour", "mDNS"]
---

**預設情況下會不通。因為 Apple Classroom 依賴的 Bonjour 廣播封包無法跨越不同的網段 (Subnet/VLAN)。**

若學校網路架構將師生切分在不同網段（例如：老師 IP 192.168.10.x，學生 IP 192.168.20.x），必須在網路裝置上進行特殊設定：

## 解決方案：設定 Bonjour Gateway (或 mDNS Reflector)

請網管人員在核心交換器或無線控制器 (WLC) 上設定：

1.  **啟用 mDNS 轉發** ：允許 Bonjour 封包在 VLAN 之間流動。

2.  **放行服務** ：特別是 `_classroom._tcp` (Apple Classroom) 與 `_airplay._tcp` (AirPlay) 服務。

## 替代方案 ：

若網路裝置不支援，最簡單的做法是讓老師的 iPad 連接至 **「學生 Wi-Fi」** ，確保雙方在同一個廣播網域內，即可順利連線。
