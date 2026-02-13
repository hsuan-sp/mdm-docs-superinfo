---
id: mac-20

title: "macOS 26 的「透過 SSH 解鎖 FileVault」如何設定？有什麼安全考量？"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: false

tags: ["FileVault", "SSH", "遠端解鎖", "macOS 26", "遠端管理"]
---

**macOS 26 新增在 Pre-boot 階段透過 SSH 解鎖 FileVault 的功能，解決遠端管理無螢幕主機的痛點。**

## 問題背景

啟用 FileVault 的 Mac 重開機後：

- 停在登入畫面等待密碼解鎖

- Wi-Fi 和遠端連線尚未啟動
- 必須實體鍵盤輸入才能繼續
- 遠端重開機等於失聯

典型情境：機房 Mac mini、多校區 Mac、無螢幕部署。

## 設定需求

1.  **啟用遠端登入**：
    - 「系統設定」>「一般」>「共享」>「遠端登入」
    - 或透過 MDM 推送 `com.apple.RemoteManagement`

1.  **網路連線**：乙太網路（最可靠）或 Pre-boot 可用的 Wi-Fi
1.  **授權使用者**：SSH 帳號必須是 FileVault 授權使用者
1.  **系統版本**：macOS 26 或更新

## 操作流程

遠端解鎖指令：

`SSH -o PreferredAuthentications=password -o PubkeyAuthentication=no username@mac-ip`

輸入密碼後，SSH 會暫時中斷（解鎖中），系統完成開機後可重新連線。

## 安全風險與緩解

| 風險       | 緩解措施                                        |
| :--------- | :---------------------------------------------- |
| 暴力破解   | 限制來源 IP、使用防火牆、強密碼、變更預設連接埠 |
| 中間人攻擊 | 驗證主機金鑰、使用 VPN                          |
| 網路監聽   | 專用管理 VLAN、網路存取控制                     |

## 五、 2026 年新安全性注意事項 (M5 / macOS 26)

**⚠️ 重要警告：** 在搭載 **M5 晶片** 的 Mac 上，Apple 進一步強化了 **Secure Enclave** 的保護機制。

- 若您在 macOS 26 中啟用了「極限安全模式」，SSH 遠端解鎖 FileVault 可能會失效。

- **建議**：對於需要 SSH 遙測解鎖的機房機台，請在 MDM 限制中取消勾選「進階資料保護」相關的強制選項，以確保 Pre-boot 階段的網路棧能正常啟動。

## 適用建議

- **建議啟用**：機房伺服器、無螢幕部署、多校區環境
- **不建議啟用**：電腦教室、公開網路、學生可存取網段
