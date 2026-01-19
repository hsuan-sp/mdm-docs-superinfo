---
term: "System Extension"
category: ["Core"]
---

## 術語定義

System Extension（系統擴充功能）是 macOS 新一代的系統擴充機制，取代舊有的 Kext。它運行在使用者空間 (User Space) 而非核心空間，因此就算當機也不會導致整台電腦崩潰，安全性與穩定性大幅提升。

## 白話文比喻

這是作業系統的「微創手術」。以前要加功能（如防毒）得在心臟（Kernel）上動刀（Kext），風險很大。現在改成穿戴式裝置（System Extension），功能照樣強大，但絕對不會危及生命安全。
