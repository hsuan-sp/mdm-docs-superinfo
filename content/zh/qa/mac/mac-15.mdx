---
id: mac-15

title: "如何大量部署 Microsoft Office 並啟用授權？電腦教室與行政機有何不同？"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: false

tags:
  ["Office", "Microsoft 365", "Serializer", "大量授權", "Jamf App Installers"]
---

**最佳實踐是使用「Jamf App Installers」自動部署安裝檔，並依據使用場景區分「序列化 (Serializer)」或「使用者登入」兩種啟用方式。**

請務必使用 Microsoft 官方 CDN 版本（或透過 Jamf 派送）， **嚴禁使用 Mac App Store 版本**，否則將無法支援大量授權功能。

**場景一：電腦教室 / 公用電腦 (Device-Based Licensing)**

電腦教室必須讓學生「坐下即用」，不能要求學生登入微軟帳號。

1. **安裝主程式**：透過 Jamf Pro 的 **「App Installers」** 派送 Microsoft Office 365。

1. **啟用授權 (關鍵)**：
   - 前往微軟大量授權中心 (VLSC) 下載 **「Volume License Serializer (VL Serializer)」** 的 .pkg 檔。
   - 將此 .pkg 上傳至 Jamf Pro 並建立 **「政策 (Policy)」** 安裝。
   - **效果**：安裝後，Office 會認證「這台電腦」的授權，任何使用者開啟 Word 都不需登入即可使用。

**場景二：教職員 / 行政電腦 (User-Based Licensing)**

行政同仁通常擁有個人的 Microsoft 365 (A3/A5) 帳號。

1. **安裝主程式**：同樣透過 **「App Installers」** 派送，確保軟體永遠保持最新。

1. **啟用授權**：
   - 不需安裝 Serializer。
   - 使用者首次開啟 App 時，輸入學校提供的 Microsoft 365 帳號密碼登入即可啟用。
   - **優點**：可存取 OneDrive 與個人雲端紀錄。

**部署 SOP (Jamf Pro)：**

1. **設定 App Installers**：在「電腦管理」>「Mac App」中啟用 Microsoft Office 365 (包含 Teams/Outlook 等)。

1. **建立 Serializer 政策 (僅限教室)**：將 VL Serializer 設為「Once per computer」並派送給教室群組。
1. **設定 MAU (Microsoft AutoUpdate)**：建立設定描述檔，強制設定 MAU 的更新期限 (Deadline)，確保漏洞被修補。

**實務建議：專家提示**

若發生「授權衝突」，通常是因為電腦同時殘留了舊版的 Serializer 與新版登入資訊。建議使用微軟官方的 **License Removal Tool** (可包裝成腳本透過 Jamf 執行) 清除乾淨後再重新部署。
