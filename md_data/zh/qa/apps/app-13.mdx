---
id: app-13

title: "什麼是「受管理的應用程式設定 (Managed App Configuration)」？如何應用於大量部署？"

category: "第三部分：應用程式分發與管理 (Apps & Books)"

important: false

tags: ["AppConfig", "XML", "變數代換", "Jamf Pro"]
---

**「受管理的應用程式設定」是利用 MDM 協定，將 XML 格式的設定檔注入至支援 AppConfig 標準的應用程式中，實現「免接觸設定 (Zero-touch Configuration)」。**

這不只是單純的預填資料，而是能強制鎖定 App 的特定行為，防止使用者修改。

## 技術實作與 Jamf Pro 變數應用 ：

在 Jamf Pro 的行動裝置 App 詳細資訊頁面中，切換至 **「App Configuration」** 分頁。您需要貼入符合該 App 開發者規範的 **Plist (Property List)** XML 代碼。

### Jamf Pro 獨家優勢：變數代換 (Variable Substitution)

您可以使用 Jamf Pro 的內建變數來動態填入每台裝置的專屬資訊，無需為每個人製作獨立的設定檔。

- **常用變數範例** ：
  - `$SERIALNUMBER`：自動填入裝置序號。
  - `$EMAIL`：自動填入使用者的 Email（需與 Inventory 連結）。
  - `$USERNAME`：自動填入使用者名稱。
  - `$JSSID`：填入 Jamf Pro ID。

## 實務範例 (設定 Zoom SSO 登入網域) ：

```xml

<dict>

    <key>SetSSOURL</key>

    <string>true</string>

    <key>SSOURL</key>

    <string>yourschool.zoom.us</string>

    <key>PrepopulateUsername</key>

    <string>$EMAIL</string>

</dict>

```

_(注意：具體的 Key 值必須參閱該 App 開發商（如 Zoom, Chrome, Microsoft）的官方管理手冊。)_
