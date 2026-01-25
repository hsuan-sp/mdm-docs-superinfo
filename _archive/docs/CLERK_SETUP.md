# Clerk 設定指南 | Clerk Dashboard Setup Guide

為了完成這個專業的登入體驗，請您前往 [Clerk Dashboard](https://dashboard.clerk.com/) 進行以下設定。在我這邊，我已經為您準備好了所有的程式碼與環境變數。

## 1. 品牌設定 (Branding)

- **名稱 (Name)**: 專案名稱 (例如 `Superinfo MDM Hub`)
- **Logo**: 請上傳專案的 Logo (`/public/logo-square.png`)，這會讓登入畫面看起來非常專業。
- **顏色 (Colors)**:
  - 主色調 (Primary): `#2563EB` (Blue 600) - 與我們網站的主題色一致。
  - 背景色 (Background): 建議保持預設或設定為白色/深色。

## 2. 社群登入 (Social Connections)

建議啟用以下登入方式，讓使用者能快速登入：

- **Google** (推薦！適用於大部分教育網域帳號)
- **Microsoft** (選用，適用於使用 Azure AD 的學校)

## 3. 路徑設定 (Paths) **(非常重要！)**

請進入 Clerk 後台的 **Paths** 設定頁面，確保設定如下 (這對應了我幫您建立的頁面)：

- **Sign-in URL**: `/sign-in`
- **Sign-up URL**: `/sign-up`
- **Home URL**: `/`
- **After sign-in URL**: `/`
- **After sign-up URL**: `/`

> 這樣使用者點擊登入後，會導向我們精美的自訂登入頁，而不是 Clerk 的預設託管頁面。

## 4. 環境變數 (Environment Variables)

我已經自動幫您在 `.env.local` 檔案中加入了以下設定，您**不需要**手動修改，只要確認後台的路徑設定與上面一致即可：

```bash
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

## 5. 進階限制 (Optional)

如果您希望網站只開放給特定學校或教育網域 (@\*.edu.tw)：

1. 前往 **User & Authentication > Email, Phone, Username** 2.啟用 **Restrictions** (限制)
2. 在 Allowlist (允許清單) 中加入：`edu.tw` 或特定的學校網域。

---

**完成以上設定後，您的登入系統就大功告成了！**
點擊右上角的登入按鈕，即可看到整合好的 Clerk 登入流程。
