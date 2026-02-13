---
id: mac-28

title: "【現場救援】Mac 快速重置 (EACS) 後若自動註冊卡住，有哪些離線恢復與修復技巧？"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: true

tags: ["EACS", "ADE 故障排除", "網路認證", "Terminal 指令", "復原模式"]
---

**雖然「清除所有內容和設定 (EACS)」非常穩定，但在學校環境中，常因 Wi-Fi 需要網頁認證或防火牆擋掉 Apple 註冊伺服器，導致電腦卡在「遠端管理」註冊畫面。**

## 一、 第一現場診斷：為什麼卡住？

1.  **時間不同步 (最常見)** ：Mac 的系統時間與 Apple 伺服器落差太大，導致 SSL 憑證驗證失敗。
1.  **網路環境限制** ：學校 Wi-Fi 啟用了 802.1X 但尚未下發憑證，或防火牆阻擋了 `*apple.com` 443 埠。
1.  **序號指派錯誤** ：ASM 上的序號未正確指向正確的 MDM 伺服器。

## 二、 常見救援技巧 (SOP)

### 技巧 1：強制同步系統時間 (終端機命令)

在 Setup Assistant 畫面，按下 **Command + Option + T** 開啟終端機（或從選單進入）：

```bash

sntp -sS time.apple.com

## 或是手動設定 (格式: MMDDhhmmYY)

date 0115100026

```

### 技巧 2：手動觸發雲端設定檢查

```bash

sudo profiles renew -type enrollment

```

這會強制 Mac 重新連網詢問 Apple 伺服器：「誰是我的管理程式？」

### 技巧 3：利用 iPhone 熱點

如果學校 Wi-Fi 的防火牆有問題，請先讓 Mac 連接管理員的手機熱點，這通常能繞過校園網管限制，快速完成「註冊 (Enrollment)」階段，進入系統後再由政策切換回校園 Wi-Fi。

## 三、 進階離線恢復模式

若 EACS 完全無法啟動，請進入 **復原模式 (Recovery Mode)** ：

1.  **Apple Silicon (M1-M5)** ：長按電源鍵進入。

1.  **Intel Mac (T2)** ：開機時按住 `Command + R`。
1.  **操作** ：點選「抹除 Mac」並重新啟動，強迫系統重置所有與硬體綁定的安全金鑰 (Secure Enclave)。

**組長觀點** ：遇到大量電腦卡註冊時「莫驚慌」。通常 90% 的問題只要「同步時間」或「換個熱點」就能解決。建議組長在維修 USB 中預載一份包含常見 Apple 高頻域名通訊埠的清單，以便隨時與網管組溝通。
