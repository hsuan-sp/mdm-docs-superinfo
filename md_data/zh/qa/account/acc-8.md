---
id: acc-8

title: "忘記 Jamf Pro 的管理員登入密碼怎麼辦？"

category: "第一部分：帳號與伺服器管理 (Account & Server Management)"

important: false

tags: ["密碼重置", "Jamf Pro", "災難復原"]
---

**重置方式取決於您的 Jamf Pro 部署環境（雲端版或地端版），以及是否啟用了 SSO。**

## 情境一：Jamf Pro 雲端版 (Jamf Cloud)

1. **使用登入頁面連結** ：
   - 在 Jamf Pro 登入畫面點選 **「Forgot password?」** 。
   - 輸入您的管理員 Email，系統會寄送密碼重置郵件。

1. **尋求其他管理員協助** ：
   - 若組織內有其他具備管理權限的同事，請其登入後前往 **「設定」>「系統設定」>「Jamf Pro 使用者帳號與群組」** ，選取您的帳號並點選「編輯」來直接重置密碼。

1. **聯絡 Jamf 客戶成功團隊 (Support)** ：
   - 若您是唯一的管理員且無法收信，請前往 **[Jamf Account](https://account.jamf.com)** 提交支援案例。Jamf 團隊在驗證您的機構身分後，可協助恢復主管理員帳號的存取權。

## 情境二：Jamf Pro 地端版 (On-Premise)

1. **資料庫層級操作** ：
   - 需具備 MySQL 存取權限。透過 SQL 指令直接將管理員密碼雜湊值更新為預設值。這通常是地端版最後的救援手段。

1. **使用 Jamf Pro 控制台工具** ：
   - 在安裝 Jamf Pro 的伺服器上，運行 Jamf Pro Server 備份/恢復工具，某些版本支援透過命令列重置特定的管理員權限。

## 情境三：使用了 SSO / 多重身分驗證 (MFA)

- **SSO 整合** ：若您的 Jamf Pro 介接了 **Microsoft Entra ID** 或 **Google Workspace** ，請直接重置該平台的密碼。
- **MFA 遺失** ：如果您記得密碼但遺失了 MFA 驗證器（如換手機），請聯繫其他管理員為您「暫時停用 MFA」或「重置 MFA 註冊狀態」。

## 實務建議 ：

- **設置緊急備用帳號 (Break-glass Account)** ：建立一個不與個人信箱綁定、使用超強密碼且排除在 SSO 之外的在地管理員帳號，並將帳密物理備份於安全處。
- **備援管理員** ：機構應至少維持兩位具備管理權限的人員，避免單點故障。
- **託管密碼管理** ：建議將管理員憑證儲存於組織級的密碼管理工具（如 1Password 或 Bitwarden）中，而非瀏覽器記憶密碼。
