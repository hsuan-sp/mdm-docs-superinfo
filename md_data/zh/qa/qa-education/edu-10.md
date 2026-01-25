---
id: edu-10

title: "為什麼 App Store 不見了？我要怎麼下載 App？"

category: "第八部分：教育場域常見情境 (Education Scenarios)"

important: true

tags: ["App Store", "Self Service", "限制"]
---

**這是學校刻意的設定。App Store 被隱藏是為了防止學生自行下載未經審核的 App。請改用「Self Service (自助服務)」App 安裝學校核准的應用程式。**

許多學生拿到學校平板後發現找不到 App Store，這是 MDM 透過限制描述檔刻意設定的結果，而非故障。

## 為何隱藏 App Store ：

| 理由             | 說明                                               |
| :--------------- | :------------------------------------------------- |
| **防止下載遊戲** | 避免學生沉迷於遊戲，影響學習                       |
| **確保環境一致** | 所有裝置安裝相同的核准 App，方便教學與管理         |
| **避免帳號問題** | 學生可能登入私人 Apple 帳號 導致啟用鎖定或資料混雜 |
| **授權合規**     | 確保所有 App 都透過 VPP 正規授權                   |

## 如何安裝 App：使用 Self Service

**Self Service（自助服務）** 是 Jamf 提供的「校園 App Store」。學校管理員可設定哪些 App 提供給師生安裝。

**操作步驟** ：

1.  在主畫面找到 **「Self Service」** App（圖示通常是學校 Logo 或 Jamf 標誌）。

1.  開啟 App，瀏覽可用的 App 與資源。
1.  找到需要的 App，點選 **「安裝 (Install)」**。
1.  App 會自動開始安裝， **無需輸入任何 Apple 帳號 密碼**。
1.  安裝完成後，App 會出現在主畫面。

## Self Service 的優點 ：

- **無需密碼**：透過 VPP 授權自動處理。
- **經過審核**：只有學校核准的 App 才會出現。
- **即時更新**：管理員可隨時新增或移除 App。
- **可自訂**：部分學校會在 Self Service 中放置教學手冊、網站捷徑等資源。

## 若需要的 App 不在 Self Service 中 ：

1.  **向老師或 IT 人員反映**：說明 App 名稱與教學用途。
1.  **由學校統一購買**：透過 ASM/VPP 購買授權。
1.  **管理員加入 Self Service**：經審核後，該 App 會出現在 Self Service 供安裝。

## 實務建議：常見問題

- **Self Service 打不開**：確認裝置已連網，嘗試重啟 iPad。
- **安裝按鈕是灰色的**：可能授權數量不足或 App 正在背景處理，稍後再試。
- **找不到 Self Service App**：它可能被收進某個資料夾中，或在第二頁。也可使用 Spotlight 搜尋。
