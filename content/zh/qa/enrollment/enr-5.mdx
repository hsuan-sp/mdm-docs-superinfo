---
id: enr-5

title: "如何在學校網域環境下，順利進行「帳號驅動註冊」的服務偵測？"

category: "第二部分：裝置註冊與部署 (Device Enrollment)"

important: false

tags: ["帳號驅動註冊", "服務偵測", ".well-known", "BYOD"]
---

**帳號驅動註冊 (Account-driven Enrollment) 依賴 Apple 的「服務偵測 (Service Discovery)」機制，** 讓使用者只需輸入管理式 Apple 帳號即可引導註冊。

** 運作原理與挑戰 ** ：

當使用者在裝置登入時，裝置會嘗試存取該 Email 網域下的 **.well-known** 資源檔案。

具體流程如下：

1. 使用者輸入 `user@school.edu.tw`。

1. 裝置發送 HTTP GET 請求至：

`https://school.edu.tw/.well-known/com.apple.remotemanagement`

1. 伺服器需回傳一個 JSON 檔案，其中包含 MDM 伺服器的 URL。

**實作需求** ：

- **網頁伺服器** ：學校官網的主機必須託管該 JSON 檔案。

- **Content-Type** ：回傳的標頭必須設為 `application/json`。
- **SSL 憑證** ：伺服器必須具備有效的 HTTPS 憑證。

若學校無法修改官網設定，Jamf Pro 或 ASM 通常不提供此 JSON 的直接託管服務。

**替代方案** ：

1. **直接瀏覽註冊網址** ：管理員可產出 MDM 註冊 URL（通常是 `https://your-server.jamfcloud.com/enroll`），讓使用者直接透過 Safari 下載描述檔。

1. **QR Code 掃描** ：將註冊網址製作成 QR Code 貼在教室或教員室，使用者掃描後即可快速跳轉至註冊入口。

1. **預載配置** ：對於學校資產，優先使用 **自動裝置註冊 (ADE)** ，完全不需手動輸入帳號或偵測服務。
