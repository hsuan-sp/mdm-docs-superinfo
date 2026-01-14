---
id: enr-5
title: "如何在學校網域環境下，順利進行「帳號驅動註冊」的服務偵測？"
category: "第二部分：裝置註冊與部署 (Device Enrollment)"
important: false
tags: ["帳號驅動註冊","服務偵測",".well-known","BYOD"]
---

# Q: 如何在學校網域環境下，順利進行「帳號驅動註冊」的服務偵測？

# Answer

**帳號驅動註冊 (Account-driven Enrollment) 依賴 Apple 的「服務偵測 (Service Discovery)」機制，**
**讓使用者只需輸入管理式 Apple 帳號即可引導註冊。**

**運作原理與挑戰**：
當使用者在裝置登入時，裝置會嘗試存取該 Email 網域下的 **.well-known** 資源檔案。
具體流程如下：
1.  使用者輸入 `user@school.edu.tw`。
2.  裝置發送 HTTP GET 請求至：
    `https://school.edu.tw/.well-known/com.apple.remotemanagement`
3.  伺服器需回傳一個 JSON 檔案，其中包含 MDM 伺服器的 URL。

**實作需求**：
*   **網頁伺服器**：學校官網的主機必須託管該 JSON 檔案。
*   **Content-Type**：回傳的標頭必須設為 `application/json`。
*   **SSL 憑證**：伺服器必須具備有效的 HTTPS 憑證。

若學校無法修改官網設定，Jamf Pro 或 ASM 通常不提供此 JSON 的直接託管服務，
您可能需要請網管人員協助在 DNS 或網頁伺服器層級進行設定。
    