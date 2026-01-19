---
term: "Volume Owner"
category: ["Security"]
---

## 術語定義

磁碟擁有者。Apple Silicon Mac 特有的安全角色。只有在初始設定時建立的使用者（或被賦予 Token 的使用者）才是 Volume Owner。只有 Owner 有權限授權安裝 macOS 更新或修改開機安全性設定。MDM 的指令若涉及這些操作，必須透過 Bootstrap Token 來模擬 Owner 權限。

## 白話文比喻

就像「房產證持有人」。這間房子雖然住了很多人，但只有持有人有權力決定要不要裝修房子（更新系統）或換大門鎖。其他房客想做這些事，得先獲得持有人的同意。
