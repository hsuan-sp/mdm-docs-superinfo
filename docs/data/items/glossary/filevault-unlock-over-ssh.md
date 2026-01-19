---
term: "FileVault Unlock over SSH (透過 SSH 解鎖 FileVault)"
category: ["Mac"]
tags: ["FileVault", "SSH", "遠端解鎖", "Remote Login"]
---

## 術語定義

macOS Tahoe 的新功能。若 Mac 已啟用「遠端登入 (Remote Login)」且有網路連線，管理員可透過 SSH 遠端解鎖 FileVault 加密的磁碟，無需實體接觸 Mac。

## 白話文比喻

以前 Mac 重開機後 FileVault 鎖住，像「保險箱需要本人親自轉密碼鎖」。現在 SSH 解鎖像「遠端視訊確認身分後，保全幫你開鎖」。

## MDM 相關

大幅提升遠端 Mac 管理效率。IT 人員可遠端重開機並解鎖，無需到現場。

## 安全考量

需確保 SSH 本身的安全性（強密碼、金鑰驗證），避免成為攻擊入口。
