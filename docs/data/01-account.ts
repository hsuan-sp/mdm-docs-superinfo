import { QASection } from '../types'

export const data: QASection[] = [
  {
    title: '第一部分：帳號與伺服器管理 (Account & Server Management)',
    items: [
      {
        id: 'acc-1',
        question: '登入 Apple 校務管理 (ASM) 時，系統提示需同意新的條款與約定，這很重要嗎？',
        important: true,
        tags: ['ASM', '條款更新'],
        answer: `
**非常重要，請優先處理。**
當 Apple 更新服務條款時，只有 **管理員 (Administrator)** 權限的帳號能同意。
若未同意，新的裝置將無法註冊，且 VPP 應用程式授權可能會暫停同步。
請務必由具備權限的人員登入 ASM 勾選同意。
`
      },
      {
        id: 'acc-2',
        question: '推播憑證 (APNs Certificate) 過期會發生什麼事？',
        important: true,
        tags: ['憑證', '災難預防'],
        answer: `
**後果極嚴重：MDM 將完全失效。**
*   所有裝置將**無法接收任何指令** (無法派 App、無法解鎖)。
*   若憑證已過期並被移除，您可能需要**重新註冊每一台裝置** (需重置整機)。
*   **預防**：Jamf Pro 會在過期前 30 天發送通知，請務必使用 **原本的 Apple ID** 進行續約 (Renew)，切勿建立新的 (Create New)。
`
      },
      {
        id: 'acc-3',
        question: '如何重置學生的「管理式 Apple ID」密碼？',
        tags: ['密碼重置', 'ASM'],
        answer: `
**操作步驟**：
1.  登入 **Apple 校務管理 (school.apple.com)**。
2.  點選 **「帳號 (Accounts)」** 並搜尋該學生。
3.  點選 **「登入資訊」** 下方的 **「重置密碼」**。
4.  您可以選擇產生一組暫時密碼，或直接輸入新密碼。
`
      },
      {
        id: 'acc-7',
        question: '我可以使用個人的 Apple ID 登入學校 iPad 嗎？',
        tags: ['Apple ID', '帳號管理', '替代方案'],
        answer: `
**標準建議：不可以。**
學校設備應使用 **「管理式 Apple ID (Managed Apple ID)」**，以確保資料歸屬權與隱私分離。

> **⚠️ 替代方案 (風險警告)**
> 若老師或學生堅持登入私人 Apple ID (例如為了下載已購項目)，請務必注意：
> 1.  **資料混合風險**：您的私人相片、聯絡人可能會同步到這台公用平板，被下一位使用者看到。
> 2.  **啟用鎖定 (Activation Lock) 風險**：若歸還時忘記登出，這台 iPad 將會被您的帳號鎖死，學校可能需送回原廠解鎖 (需數週)。
> 3.  **App 更新問題**：用私人帳號下載的 App，學校 MDM 無法協助更新。
> **建議作法**：僅在需要下載特定 App 時「暫時登入」App Store，下載完畢後**立即登出**，且**不要登入 iCloud**。
`
      },
      {
        id: 'acc-4',
        question: 'Jamf Pro 顯示「VPP Token」即將過期，如何更新？',
        tags: ['VPP', 'Token更新'],
        answer: `
**更新流程**：
1.  **下載**：登入 ASM，前往 **「偏好設定」>「付款與帳單」>「App 與書籍」**，下載新的服務代號 (Token)。
2.  **上傳**：登入 Jamf Pro，前往 **「設定」>「全域管理」>「大量採購」**。
3.  點選對應的位置，上傳剛下載的 **.vpptoken** 檔案。
4.  儲存後，狀態應顯示為「Active」。
`
      },
      {
        id: 'acc-5',
        question: '忘記 Jamf Pro 的管理員登入密碼怎麼辦？',
        tags: ['密碼重置', 'Jamf Pro'],
        answer: `
**救援方式**：
*   **如果您是 Cloud 版**：請至 Jamf Account 網站重置，或聯絡 Jamf 支援。
*   **如果您是地端 (On-Premise) 版**：需透過伺服器端工具或 MySQL 指令重置。
*   **建議**：平時請建立至少兩組管理員帳號 (一組日常用，一組備用)，以免單一帳號鎖死導致無法進後台。
`
      },
      {
        id: 'acc-6',
        question: '裝置一直顯示「連線失敗」或無法更新庫存？',
        tags: ['連線問題', 'APNs'],
        answer: `
**檢查清單**：
1.  **APNs 憑證**：確認是否過期。
2.  **網路環境**：裝置的 Wi-Fi 是否能連上 Apple 伺服器 (17.0.0.0/8 Port 5223)。
3.  **時間設定**：裝置的時間是否準確？時間誤差會導致加密連線失敗。
`
      }
    ]
  }
]
