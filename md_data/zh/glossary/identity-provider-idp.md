---
term: "Identity Provider (IdP)"

category: ["Security"]
---

## 術語定義

**Identity Provider (IdP)** 是負責建立、維護與管理數位身分驗證的集中式服務。

常見的教育版 IdP 包括 **Google Workspace** 、 **Microsoft Entra ID** (前稱 Azure AD) 與 **Okta** 。

在現代 MDM 架構中：

- **身分委外** ：MDM 不直接儲存或管理密碼，而是將驗證工作「外包」給 IdP。

- **單一登入 (SSO)** ：學生只需記住一組帳號密碼，即可登入 iPad、Email 與學習平台。MDM 會向 IdP 確認「這個人是誰」，驗證通過後即放行。

## 白話文比喻

這是學校的 **「數位戶政事務所」** 。

其他的網站、App 或 iPad 不需要自己保存一份全校師生的帳號清單，也不用擔心密碼外洩。

當有人要登入時，它們只要打電話問 IdP：「這個人真的是王小明嗎？」一旦 IdP 確認身分並蓋章（驗證通過），大門就打開了。這讓學生只需要一把 **「萬用鑰匙」** 就能通行無阻。
