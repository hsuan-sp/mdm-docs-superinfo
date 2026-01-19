---
term: "Platform SSO in Setup Assistant (設定輔助程式中的 Platform SSO)"
category: ["Mac"]
tags: ["Platform SSO", "Setup Assistant", "ADE", "Secure Enclave", "FileVault"]
---

## 術語定義

macOS Tahoe 的 ADE 增強功能。在自動裝置註冊 (ADE) 期間，Platform SSO 可整合至設定輔助程式，使用者可在初次開機時即用企業帳號登入，Secure Enclave 金鑰驗證可免除密碼輸入，並自動解鎖 FileVault。

## 白話文比喻

以前 Mac 開機要「先用本機帳號登入，再綁定公司帳號」，兩套流程。現在像「拿公司識別證直接刷門禁進入」，一步到位。

## MDM 相關

從第一次開機就整合企業身分驗證，無縫銜接 FileVault 解鎖，大幅簡化 Mac 部署流程。

## 技術優勢

使用 Secure Enclave 儲存 SSO Token，安全性更高，且支援生物辨識解鎖（Touch ID / Face ID on MacBook）
