---
term: "Bootstrap Token"
category: ["Security"]
---

## 術語定義

Bootstrap Token（引導代幣）是 macOS 的自動化授權憑證。當第一位使用者啟用 FileVault 加密時，系統會產生此代幣並託管給 MDM。MDM 可使用此 Token 授權其他管理員帳號登入加密的 Mac，或在無人值守的情況下自動完成軟體更新的授權。

## 白話文比喻

這是 MDM 保管的「系統備用鑰匙」。當電腦被加密鎖住（FileVault）時，通常只有原使用者有鑰匙能開。Bootstrap Token 就是由 IT 保管的備用鑰匙，讓 IT 人員可以隨時開門進去維護，或是把鑰匙複製給新進員工使用。
