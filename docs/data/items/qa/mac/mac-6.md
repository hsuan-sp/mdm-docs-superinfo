---
id: mac-6
title: "Mac 電腦教室如何像還原卡一樣，快速清除重置 (Wipe)？"
category: "第七部分：Mac 電腦進階管理 (Mac Management)"
important: false
tags: ["重置","EACS","抹除所有內容","電腦教室","Imaging"]
---

# Q: Mac 電腦教室如何像還原卡一樣，快速清除重置 (Wipe)？

# Answer

**Apple Silicon (M系列) 時代已不建議，而且可能也無法使用「還原卡」或「Ghost」。**
**請改用「清除所有內容和設定 (EACS)」指令。**

傳統的磁碟映像檔部署 (Monolithic Imaging) 因為已被 Apple 徹底淘汰。
現在的重置邏輯是「清除使用者資料 + 保留作業系統 + 自動重新註冊」。

**標準重置 SOP (Jamf Pro)：**

1.  **發送指令**：
    *   對目標電腦群組發送 **「清除電腦 (Wipe Computer)」** 指令。
    *   **關鍵**：針對 Apple Silicon 與配備 T2 晶片的 Mac，此指令會觸發 **EACS (Erase All Content and Settings)**。

2.  **執行過程 (數分鐘內)**：
    *   系統會瞬間丟棄加密金鑰（Cryptographic Erase），資料幾秒內即無法讀取。
    *   電腦重開機，回到「哈囉 (Hello)」畫面。

3.  **自動部署 (Zero-Touch)**：
    *   電腦連上網路（需規劃好免驗證 Wi-Fi 或有線網路）。
    *   自動觸發 **ADE (自動裝置註冊)**。
    *   自動從 Jamf Pro 下載 **PreStage Enrollment** 設定。
    *   自動建立管理員帳號、安裝軟體、套用設定。

**與傳統還原卡的差異**：
*   傳統還原卡是「開機即還原」。
*   現代 Mac 管理是「學期末/專案結束時」執行一次 EACS 重置。
    若需每日還原（如圖書館公用機），則需透過 **「Guest User (訪客模式)」** 設定登出即刪除資料，
    或使用專門的 kiosk 軟體 (如 Deep Freeze Mac 版，但支援度需確認)。
    