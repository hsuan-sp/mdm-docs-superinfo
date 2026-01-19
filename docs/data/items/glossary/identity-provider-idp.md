---
term: "Identity Provider (IdP)"
category: ["Security"]
---

## 術語定義

Identity Provider (IdP) 是負責管理與驗證使用者身分的雲端服務（如 Microsoft Entra ID、Google Workspace）。MDM 不直接管理帳號，而是透過聯合驗證 (Federation) 把登入請求轉交給 IdP 處理，讓企業能用同一套帳號登入所有系統（SSO）。

## 白話文比喻

這是雲端的「戶政事務所」。其他網站或 App（MDM）不需要自己保存你的密碼，而是問這家事務所：「這個人是不是真的小明？」。事務所確認後發張證明，你就登入成功了。
