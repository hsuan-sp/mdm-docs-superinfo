---
term: "Platform SSO in Setup Assistant (設定輔助程式中的 Platform SSO)"

category: ["Mac"]
---

## 術語定義

**Platform SSO in Setup Assistant** 是 macOS Tahoe 針對自動裝置註冊 (ADE) 所推出的強化身分驗證功能。

它的特性包括：

- **開箱即驗證** ：在使用者第一次開機設定 Mac (Setup Assistant) 的過程中，直接嵌入身分驗證（如 Microsoft Entra ID）。

- **無縫整合** ：登入完成後，系統會自動建立本機帳號、啟用 FileVault 硬碟加密，並將雲端密碼同步到電腦。
- **Secure Enclave** ：使用硬體級安全晶片儲存憑證，支援 Touch ID 等生物辨識登入。

## 白話文比喻

這是新員工報到的 **「一站式服務櫃台」** 。

- **舊流程** ：先去櫃台換臨時證（本機帳號），進辦公室後再開電腦綁定公司信箱（SSO），手續繁瑣。

- **新流程** ：在門口報到時直接刷身分證（Setup Assistant 登入），同時發給你員工證、設定好電腦密碼、開通所有門禁權限。一走進辦公室，電腦就已經準備好等你開工了。

## MDM 相關

從第一次開機就整合企業身分驗證，無縫銜接 FileVault 解鎖，大幅簡化 Mac 部署流程。

## 技術優勢

使用 Secure Enclave 儲存 SSO Token，安全性更高，且支援生物辨識解鎖（Touch ID / Face ID on MacBook）
