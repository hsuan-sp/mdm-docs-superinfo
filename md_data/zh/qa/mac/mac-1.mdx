---
id: mac-1

title: "Mac 需要綁定 AD (Active Directory) 嗎？現代化的建議是什麼？"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: true

tags: ["AD", "身分認證", "Jamf Connect", "Platform SSO", "No-Bind"]
---

**高度建議不要綁定 AD (No-Bind 策略)。請改用「平台單一登入 (Platform SSO)」或 Jamf Connect。** 傳統將 Mac「綁定 (Bind)」至 AD 網域的做法，在行動辦公與資安零信任（Zero Trust）架構下已顯得笨重且不可靠。

**為何拋棄 AD 綁定？**

1. **行動化障礙**：筆電一旦離開校園內網，無法連線 DC (網域控制站)，導致密碼無法同步或登入緩慢。

1. **鑰匙圈 (Keychain) 災難**：AD 密碼變更後，Mac 本機的鑰匙圈密碼往往不會同步更新，導致使用者頻繁遭遇彈窗報錯。
1. **Apple 政策**：Apple 已不再積極維護 AD Plugin，並建議轉向現代化驗證。

**近年的主流替代方案：**

**方案 A：平台單一登入 (Platform SSO 2.0) — 2026 年標配方案**

自 macOS 13 起引進，並在 macOS 26 (Tahoe) 獲得重大更新。

- **2026 年新功能：精簡設定 (Simplified Setup)**：
  - 管理員可直接在開箱時的「設定輔助程式」階段強制透過 IdP 驗證。
  - 使用者輸入 Entra ID (Azure AD) 或 Google 帳號後，直接自動建立對應的本機帳戶。
  - 這實現了真正的「零接觸部署」，資訊組長不再需要預設一組臨時密碼。

- **優勢**：
  - **密碼同步**：Mac 本機密碼與雲端強標准同步，符合資安稽核。
  - **無密碼體驗**：macOS 26 支援透過 iPhone 的 FaceID/Touch ID 直接授權 Mac 登入。

**方案 B：Jamf Connect — 進階管控**

若學校需要更客製化的登入畫面（如顯示校規、倒數計時）或使用非主流 IdP。

- **Just-in-Time (JIT) 佈建**：使用者第一次開機時輸入雲端帳號，Jamf Connect 會即時建立對應的本機帳戶。

- **多因素驗證 (MFA)**：強制使用者在登入 Mac 時通過手機 MFA 驗證，資安等級最高。

**實務建議：遷移策略**

若貴校仍有大量 Mac 綁定 AD，請優先計畫「解除綁定 (Unbind)」專案，並導入 Platform SSO，這能大幅減少資訊組長處理「密碼不同步」工單的數量。
