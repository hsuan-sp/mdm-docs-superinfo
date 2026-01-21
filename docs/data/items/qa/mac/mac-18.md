---
id: mac-18
title: "【資產救援】Mac 送修回來或離職交接時被舊 Apple 帳號鎖住 (啟用鎖定)，怎麼辦？"
category: "第七部分：Mac 裝置管理 (Mac Management)"
important: false
tags: ["啟用鎖定","Activation Lock","ASM","解除鎖定","資產回收"]
---

## Q: 【資產救援】Mac 送修回來或離職交接時被舊 Apple 帳號鎖住 (啟用鎖定)，怎麼辦？

## Answer

**只要該 Mac 屬於學校資產（已加入 ASM），管理員可直接在 Apple School Manager 後台強制解除鎖定，**
**無需聯絡原使用者。**

這是 Apple 針對教育與企業提供的最高權限救援機制，解決「人員離職/畢業後帳號未登出」導致電腦變磚的問題。

**標準解鎖 SOP：**

1. **登入 ASM**：使用管理員帳號登入 [school.apple.com](https://school.apple.com)。
1. **搜尋裝置**：在側邊欄點選 **「裝置 (Devices)」**，輸入該 Mac 的序號。
1. **執行解鎖**：

* 在裝置詳情頁面，找到 **「啟用鎖定 (Activation Lock)」** 狀態。
* 點選 **「關閉 (Turn Off)」** 或 **「解除鎖定」**。
* 系統會跳出確認視窗，點擊確認。

1. **重置裝置**：

* 解鎖指令送出後，通常幾分鐘內生效。
* 將 Mac 進入 **復原模式 (Recovery Mode)** 重新安裝 macOS，原本的帳號鎖定畫面將不再出現。

**前提條件**：

* 該裝置必須是 **「自動裝置註冊 (ADE/DEP)」** 的一部分，且已指派給學校的 MDM 伺服器。
* 若為早期自行購買未入庫的機器，需先透過 Apple Configurator 將其加入 ASM 才能使用此功能。
