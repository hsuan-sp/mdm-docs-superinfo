---
id: mac-1
title: "Mac 需要綁定 AD (Active Directory) 嗎？現代化的建議是什麼？"
category: "第七部分：Mac 電腦進階管理 (Mac Management)"
important: true
tags: ["AD","身分認證","Jamf Connect","Platform SSO","No-Bind"]
---

# Q: Mac 需要綁定 AD (Active Directory) 嗎？現代化的建議是什麼？

# Answer

**高度建議不要綁定 AD (No-Bind 策略)。**
**請改用「平台單一登入 (Platform SSO)」或 Jamf Connect。**

傳統將 Mac「綁定 (Bind)」至 AD 網域的做法，
在行動辦公與資安零信任（Zero Trust）架構下已顯得笨重且不可靠。

**為何拋棄 AD 綁定？**
1.  **行動化障礙**：筆電一旦離開校園內網，無法連線 DC (網域控制站)，
    導致密碼無法同步或登入緩慢。
2.  **鑰匙圈 (Keychain) 災難**：AD 密碼變更後，Mac 本機的鑰匙圈密碼往往不會同步更新，
    導致使用者頻繁遭遇彈窗報錯。
3.  **Apple 政策**：Apple 已不再積極維護 AD Plugin，並建議轉向現代化驗證。

**近年的主流替代方案：**

**方案 A：平台單一登入 (Platform SSO) — 原生推薦**
自 macOS 13 Ventura 起，Apple 與微軟/Google 合作推出的原生功能。
*   **運作原理**：利用 MDM 設定 SSO 擴充功能，直接與 IdP (如 Microsoft Entra ID) 溝通。
*   **優勢**：
    *   **密碼同步**：Mac 本機密碼可與雲端 Entra ID 密碼保持同步。
    *   **Token 整合**：登入 Mac 後，Safari 與系統服務會自動登入 Microsoft 365 / Google Workspace。
    *   **Touch ID 支援**：macOS 15 (Sequoia) 更支援透過與 IdP 綁定的 iPhone
        或硬體金鑰進行無密碼登入。

**方案 B：Jamf Connect — 進階管控**
若學校需要更客製化的登入畫面（如顯示校規、倒數計時）或使用非主流 IdP。
*   **Just-in-Time (JIT) 佈建**：使用者第一次開機時輸入雲端帳號，
    Jamf Connect 會即時建立對應的本機帳戶。
*   **多因素驗證 (MFA)**：強制使用者在登入 Mac 時通過手機 MFA 驗證，資安等級最高。

**實務建議：遷移策略**
若貴校仍有大量 Mac 綁定 AD，請優先計畫「解除綁定 (Unbind)」專案，
並導入 Platform SSO，這能大幅減少資訊組長處理「密碼不同步」工單的數量。
    