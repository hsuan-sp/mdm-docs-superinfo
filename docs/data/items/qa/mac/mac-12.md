---
id: mac-12
title: "如何防止學生進入 Recovery Mode (復原模式) 格式化電腦？"
category: "第七部分：Mac 裝置管理 (Mac Management)"
important: false
tags: ["防篡改","Recovery Lock","韌體密碼","資安","遠端指令"]
---

## Q: 如何防止學生進入 Recovery Mode (復原模式) 格式化電腦？

## Answer

**針對不同架構的 Mac，防護機制有所不同：Intel 機型需設定「韌體密碼」，**
**而 Apple Silicon (M 系列) 則需設定「復原鎖定 (Recovery Lock)」。兩者皆可透過 Jamf Pro 部署。**

Mac 的復原模式功能強大，若未加鎖，任何人只要接觸實體機器，
即可透過「抹除磁碟」或「重灌系統」來規避監管。

**保護機制對照表：**

| 架構類型 | 保護機制 | 部署方式 |
| :--- | :--- | :--- |
| **Apple Silicon (M1-M5)** | **復原鎖定 (Recovery Lock)** | 僅能透過 **MDM 遠端指令** 設定 |
| **Intel Mac** | **韌體密碼 (Firmware Password)** | 透過 **設定描述檔** 或指令設定 |
