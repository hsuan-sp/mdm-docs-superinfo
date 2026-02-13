---
id: acc-2

title: "推播憑證 (APNs Certificate) 過期會發生什麼事？如何續約？"

category: "第一部分：帳號與伺服器管理 (Account & Server Management)"

important: true

tags: ["APNs", "憑證", "災難預防"]
---

**後果極為嚴重：MDM 系統將完全失效，無法推送任何新命令以管理裝置。**

Apple 推播通知服務憑證 (Apple Push Notification service Certificate, APNs Certificate) 是 MDM 與 Apple 伺服器溝通的「身分證」，所有 MDM 指令都必須透過此憑證簽章才能被 Apple 伺服器轉發至裝置。

## 過期後果 ：

- **所有受管裝置將無法接收任何遠端指令** ：包括派送 App、推送設定描述檔、發送清除密碼指令、鎖定裝置等——一律全部失效。
- **裝置不會“主動脫離管理”** ，但管理端已無法控制它們，形同「失聯」，裝置的最後資產更新或連線時間會在管理端顯示為憑證過期前的日期。
- **若憑證過期太久或更換錯誤** ：您可能需要重新建立新憑證，導致所有裝置必須 **個別進行清除 (Erase) 並重新註冊** 。對於數百台裝置的學校而言，這將是災難性的工作量。

## 續約流程（務必使用原本的 Apple 帳號） ：

1.  **Jamf Pro 提醒** ：系統會在到期前 30 天發送 Email 通知，並在儀錶板顯示警告。若您看到有相關警告請立即聯絡我們處理！（若當初是貴校自行更新的請參考以下指南）
1.  **登入 Jamf Pro** ：前往 **「設定 (Settings)」>「全域管理 (Global Management)」>「推播憑證 (Push Certificates)」** 。
1.  **點選「續約 (Renew)」** ，系統會產生一個 **憑證簽署請求 (CSR)** 檔案供您下載。
1.  **登入 Apple 推播憑證入口網站** ：前往 [identity.apple.com/pushcert](https://identity.apple.com/pushcert)，使用 **最初建立該憑證的同一個 Apple 帳號** 登入。
    - ⚠️ **嚴重警告** ：若使用不同的 Apple 帳號登入並建立新憑證，Apple 會將其視為「全新的 MDM 服務」，所有裝置將與 Jamf Pro 斷開連結！（若及時換回憑證還能救回，否則將無法控制裝置）

1.  **找到對應的憑證點選「Renew」** ：上傳 CSR 檔案，下載新的 .pem 憑證檔。
1.  **回到 Jamf Pro 上傳新憑證** ：完成上傳後，憑證將同步更新，有效期將向後延長一年。

## 實務建議 ：

- 在組織共用的行事曆中設定每年提前 60 天或更久的的續約提醒。
- 將負責憑證的 Apple 帳號密碼與雙重認證備援方法、或 **硬體安全金鑰** ，記錄於安全且不會有突然無法存取的問題的密碼管理系統中。
- 請務必使用機構專屬的管理式 Apple 帳號（如 MDM-admin@school.edu.tw），而非個人 Apple 帳號去交換憑證，以確保管理不中斷。
- **密碼重置** ：管理員可以透過 [iforgot.apple.com](https://iforgot.apple.com) 更輕鬆地重設管理式 Apple 帳號密碼，但仍強烈建議保持電話號碼的有效性，避免難以找回帳號。
