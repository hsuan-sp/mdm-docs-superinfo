---
term: "OIDC (OpenID Connect)"

category: ["Security"]
---

## 術語定義

**OIDC (OpenID Connect)** 是基於 OAuth 2.0 架構的新一代身分認證標準。

它的特性包括：

- **現代化整合** ：被廣泛應用於現代 SSO（單一登入）解決方案，如 Jamf Connect、Google 登入、Microsoft Entra ID。

- **安全性** ：比起舊式 LDAP，它更安全，支援多因素驗證 (MFA)。
- **Token 驗證** ：傳輸過程使用 Token (代幣) 而非直接傳輸帳號密碼，減少密碼外洩風險。

## 白話文比喻

這是網路世界的 **「數位通行手環」** 。

- **購票（登入）** ：你在入口處（如 Google）驗票買票一次。

- **手環（Token）** ：工作人員給你戴上一個防水手環。
- **暢遊** ：之後要去其他遊樂設施（如 Jamf Pro、雲端教室），只要秀出手環就好，不用每一站都重新拿身分證排隊買票。
