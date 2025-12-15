import { QASection } from '../types'

export const data: QASection[] = [
  {
    title: '第一部分：帳號、憑證與伺服器管理 (Account & Server Management)',
    items: [
      {
        id: 'acc-1',
        question: '[緊急] 登入 Jamf Pro/School 時顯示「您的帳戶已被鎖定 (Account locked)」或密碼錯誤，該如何處理？',
        important: true,
        tags: ['帳號鎖定', '密碼重置', '緊急'],
        answer: `
**問題描述**：嘗試登入 MDM 後台時，顯示 "Account locked" 或密碼錯誤，即使嘗試多次仍無法登入。

**解決方案**：
1.  **Jamf Pro (精進方案/校內自購)**：
    *   **教育部統一配發帳號** (如 \`schooladmin\`)：請立即聯繫教育部數位學習推動辦公室或極電資訊客服協助解鎖。
    *   **學校自建帳號**：請聯絡校內擁有「管理員 (Administrator)」權限的同仁登入後台，前往 **設定 (Settings) > 系統設定 (System Settings) > 管理員帳戶 (Jamf Pro User Accounts & Groups)**，找到被鎖定的帳號進行解鎖或重置密碼。
    *   **全面鎖定**：若所有管理員皆無法登入，請立即聯繫我們，我們將透過後端支援協助處理。

2.  **Jamf School**：
    *   Jamf School 執行嚴格的密碼安全性政策（需 15 碼以上），若久未登入可能需強制重置。
    *   請點擊登入畫面下方的 **「Forgot Password?」**，輸入您的 Email。系統會寄送重置信件，請依照信中連結設定新密碼即可。
`
      },
      {
        id: 'acc-2',
        question: '[緊急] 收到「Apple 推播通知服務 (APNs) 憑證即將到期」或已過期的通知，會影響平板運作嗎？如何更新？',
        important: true,
        tags: ['APNs', '憑證更新', '緊急', '嚴重'],
        answer: `
**嚴重性說明**：
**⚠️ 絕對禁止：切勿點選「Create New (建立新的)」憑證！這將導致需要將所有已註冊的 iPad 收回並重新清除重置 (Erase)！**
**若 APNs 憑證過期，MDM 將完全失去對裝置的控制能力，無法發送任何指令。**

**解決方案**：
**若當初施作時是由我們負責更新憑證，請勿自行進行任何操作，立刻聯絡我們協助更新 Apple 推播通知服務 (APNs) 憑證。**

**自行操作步驟 (Jamf Pro 為例)**：
1.  登入 **Jamf Pro** > **設定 (齒輪圖示)** > **全域管理 (Global Management)** > **推播憑證 (Push Certificates)**。
2.  點選即將到期的憑證名稱（確認 Apple ID 是否吻合），按一下右下角的 **「更新 (Renew)」**。
3.  **下載簽署要求 (CSR)**：點選 **Download signed CSR from Jamf**，下載 \`JAMFSignedCSR.plist\` 檔案。
4.  **前往 Apple 入口網站**：點選連結前往 [Apple Push Certificates Portal](https://identity.apple.com/pushcert/)。
5.  **登入 Apple ID**：**務必使用「當初建立此憑證的同一個 Apple ID」登入**。
    *   *檢查點：登入後，憑證列表中的 Serial Number 必須與 Jamf Pro 上顯示的一致。*
6.  **更新憑證**：在 Apple 網站列表中找到對應的憑證，點選 **"Renew"**，上傳剛剛下載的 \`JAMFSignedCSR.plist\`。
7.  **下載並上傳**：Apple 網站會生成一個新的 \`.pem\` 檔案 (通常名為 \`MDM_ JAMF Software_Certificate.pem\`)。下載後回到 Jamf Pro 介面，上傳此檔案並儲存。
`
      },
      {
        id: 'acc-3',
        question: '[緊急] Jamf 後台顯示「自動裝置註冊 (ADE) 伺服器代號」或「App 與書籍 (VPP) 伺服器代號」過期，該如何更新？',
        important: true,
        tags: ['ADE', 'VPP', '代號更新', 'Token'],
        answer: `
**影響說明**：
*   **ADE (自動裝置註冊) 代號過期**：新購或清除重置後的 iPad 無法進行自動註冊流程。
*   **App 與書籍 (大量採購) 代號過期**：無法購買新 App，也無法派送或更新現有 App。

**解決方案**：
這兩個代號 (Token) 可以由任何具備「管理員」、「機構經理」或「內容經理(僅VPP)」權限的帳號更換。請登入 **[Apple 校務管理 (ASM)](https://school.apple.com/)** 取得新的代號 (Token)。

**1. 更新自動裝置註冊 (ADE) 代號**：
*   **ASM 端**：登入 ASM > 左下角帳戶名稱 > **偏好設定 (Preferences)** > **MDM 伺服器指派 (MDM Server Assignment)** > 點選對應的伺服器 (常命名為 Jamf Pro) > **下載代號 (Download Token)**。
*   **Jamf Pro 端**：**設定** > **全域管理** > **自動裝置註冊 (Automated Device Enrollment)** > 點選該實例 > **編輯** > 上傳剛剛下載的 \`.p7m\` 檔案 > **儲存**。

**2. 更新 App 與書籍 (Apps & Books / VPP) 代號**：
*   **ASM 端**：登入 ASM > 左下角帳戶名稱 > **偏好設定** > **付款與帳單 (Payments & Billing)** > **App 與書籍** > 滾動至 **內容代號 (Content Tokens)** > 找到對應的位置 (Location) > **下載 (Download)**。
*   **Jamf Pro 端**：**設定** > **全域管理** > **大量採購 (Volume Purchasing)** > 點選對應的位置名稱 > **編輯** > 上傳 \`.vpptoken\` 檔案 > **儲存** > **點選「回收服務代號 (Reclaim Service Token)」** 以確保立即生效。
`
      },
      {
        id: 'acc-4',
        question: '登入 Apple 校務管理 (ASM) 時，系統要求同意新的條款與約定，若不同意會有什麼影響？',
        important: true,
        tags: ['ASM', '條款', '重要'],
        answer: `
**影響**：
若未同意新版條款與約定 (T&Cs)，Apple 將會**暫停**該組織 ASM 的 API 存取權限。這會直接導致：
1.  Jamf 無法同步新購的裝置 (ADE 失效)。
2.  Jamf 無法同步或指派 App 授權 (VPP 失效)。

**解決方案**：
1.  請使用具備 **「管理員 (Administrator)」** 權限的 Apple ID 登入 [https://school.apple.com/](https://school.apple.com/)。
    *   *注意：「人員經理」、「內容經理」或「機構經理」通常無法執行此簽署動作。*
2.  登入後，網頁會自動跳出新的條款視窗，或在上方顯示黃色橫幅。
3.  請檢視內容並勾選 **「同意 (Agree)」**。
4.  完成後，建議回到 Jamf Pro 手動執行一次 **更新資產**，確保連線狀態恢復綠燈。
`
      },
      {
        id: 'fed-auth',
        question: '什麼是「聯合驗證 (Federated Authentication)」？',
        tags: ['聯合驗證', 'Google', 'Entra ID', 'SSO'],
        answer: '聯合驗證允許組織將 **Apple 校務管理 (ASM)** 與 **Google Workspace** 或 **Microsoft Entra ID (Azure AD)** 連結。設定後，教職員與學生可以直接使用原本學校的 Google 或微軟帳號密碼來登入「管理式 Apple ID」，無需另外記憶一組 Apple 專用密碼，大幅降低忘記密碼的管理成本。'
      },
      {
        id: 'acc-5',
        question: 'Apple 校務管理 (ASM) 的「管理式 Apple ID」密碼遺失或被鎖定，如何重置？',
        important: false,
        tags: ['管理式 Apple ID', '密碼重置'],
        answer: `
**適用對象**：忘記密碼的老師、學生、行政人員，以及**管理員本人**。

**解決方案**：

#### 情況一：一般使用者（老師、學生、職員）忘記密碼
由學校的「管理員 (Administrator)」或「人員經理 (People Manager)」協助重置。
1.  管理員登入 **[Apple 校務管理 (ASM)](https://school.apple.com/)**。
2.  點選左側選單的 **「使用者 (Users)」**。
3.  搜尋該使用者的姓名、Email 或學號。
4.  點選該帳號，點擊 **「重置密碼 (Reset Password)」**。
5.  系統會生成一組臨時密碼，請選擇「下載 PDF」或「拷貝」並提供給使用者。使用者下次登入時需強制更改密碼。

#### 情況二：管理員 (Administrator) 本人忘記密碼
若您是最高權限管理員，請依序嘗試：

**1. 透過系統「自助重置」 (優先)**
*   前往 ASM 登入頁面，點選 **「忘記 Apple ID 或密碼？」**。
*   輸入您的管理式 Apple ID 與綁定的 **受信任電話號碼**。
*   輸入收到的簡訊/語音驗證碼後即可重設。

**2. 尋求校內「其他管理員」協助**
*   若貴校有 2 位以上的管理員（Strongly Recommended），請另一位登入協助重置您的密碼。

**3. 聯繫 Apple 官方支援 (最後手段)**
*   若上述皆失效，請準備好學校的 **機構 ID (Organization ID)** 與申請公文副本，致電 Apple 教育支援專線：**0800-095-998** (週一至週五 09:00-18:00)。
`
      },
      {
        id: 'acc-6',
        question: '如何新增或移除 Apple 校務管理 (ASM) 中的管理員帳號？',
        important: false,
        tags: ['ASM', '管理員', '帳號管理'],
        answer: `
**最佳實務**：為了避免單點故障 (Bus Factor)，強烈建議學校隨時保持 **至少 2 位** 管理員帳號 (主責老師 + 職務代理人)。

**操作步驟**：
1.  **登入**：使用現有管理員帳號登入 ASM。
2.  **新增管理員**：
    *   點選 **「使用者」** > **「+」**。
    *   輸入姓名與 **校內 Email** (建議公務信箱)。
    *   在「角色」欄位選擇 **「管理員 (Administrator)」**，完成建立。
3.  **停用/刪除舊管理員前的「關鍵檢查」**：

**⚠️ 嚴重警告：刪除帳號前的必做檢查**

**1. 檢查 APNs 推播憑證歸屬 (最重要！)**
*   **風險**：APNs 憑證**綁定於建立它的 Apple ID**。若刪除了該帳號，未來將無法「更新 (Renew)」憑證，導致全校裝置必須重新註冊。
*   **檢查**：登入 Jamf Pro > **全域管理** > **推播憑證** > 查看 **Apple ID** 欄位。
*   **判斷**：若該 Email 正是您要刪除的帳號，**絕對不可刪除**。請保留帳號並交接密碼，或聯繫極電資訊協助轉移憑證 (需原廠介入，流程繁瑣)。

**2. 關於 App 與書籍 (VPP) 代號**
*   ASM 中的內容代號是綁定於**「位置 (Location)」**，不受刪除管理員影響。只要新管理員有權限存取該位置即可。

**結論**：確認 APNs 安全後，即可在 ASM 使用者列表中搜尋該人員，點選 **「停用 (Deactivate)」**。
`
      },
      {
        id: 'acc-7',
        question: '學校的 Jamf Pro 授權席次 (License) 顯示不足，該如何處理？',
        important: false,
        tags: ['授權', 'License', '席次'],
        answer: `
**可能原因**：
1.  新採購的授權尚未啟用。
2.  已報廢或遺失的舊裝置未從 Jamf Pro 中徹底移除，佔用了席次。

**解決方案**：
1.  **釋放舊席次**：
    *   **ASM 端**：登入 ASM > **裝置** > 搜尋該裝置 > **編輯 MDM 伺服器** > 選擇 **「取消指派 (Unassign)」**。
    *   **Jamf Pro 端**：搜尋該裝置 > 進入詳細頁面 > 點選右下角 **「刪除 (Delete)」**。
    *   *注意：僅在 ASM 取消指派是不夠的，必須在 Jamf Pro 執行刪除才會釋放授權。*

2.  **更新授權數量**：
    *   若有新購授權，請聯繫我們取得新的 **啟用代碼 (Activation Code)**。
    *   前往 **設定** > **系統設定** > **啟用代碼**，輸入新代碼並儲存。
`
      },
      {
        id: 'acc-8',
        question: '如何查詢目前學校 Jamf 授權的到期日與剩餘數量？',
        important: false,
        tags: ['授權', '到期日'],
        answer: `
**Jamf Pro**：
*   前往 **設定 (右上角齒輪)** > **系統設定** > **啟用代碼 (Activation Code)**。
*   頁面中會顯示授權總數 (Total License Count)、已使用數量 (Used License Count) 以及授權到期日 (Expiration Date)。

**Jamf School**：
*   登入後台，點選左下角的 **「Organization」** > **「Licenses」**。
`
      },
      {
        id: 'acc-9',
        question: '原生 macOS Server (Profile Manager) 停止服務後，舊有裝置該如何遷移至 Jamf？',
        important: false,
        tags: ['macOS Server', '遷移', 'Profile Manager'],
        answer: `
**背景說明**：
Apple 已於 2022 年正式終止 macOS Server 的 Profile Manager 功能。**2024 年 10 月起**，舊有的推播通知憑證已無法更新。若憑證過期，伺服器將完全失去對裝置的控制。

請依據規劃選擇遷移方式：

#### **情境 A：遷移至雲端 MDM (推薦，如 Jamf Pro)**
若要將裝置納入 Jamf Pro 管理：
1.  **備份資料**：遷移過程必須**清除重置 (Erase)** 裝置，請務必先備份重要資料。
2.  **ASM 轉移**：
    *   登入 **Apple 校務管理 (ASM)** > **裝置** > 搜尋該批裝置。
    *   點選 **「編輯 MDM 伺服器」** > 指派給 **Jamf Pro**。
3.  **清除裝置**：
    *   手動執行「清除所有內容與設定」，或連接電腦透過 Apple Configurator / Finder 進行回復。
4.  **重新註冊**：
    *   裝置重啟後連上 Wi-Fi，進入「遠端管理」畫面，即會自動下載 Jamf Pro 的設定檔完成註冊。

#### **情境 B：轉為 Apple Configurator 本地管理**
若不打算使用 MDM，改為單機維護：
1.  準備一台 Mac 安裝 **Apple Configurator**。
2.  連接 iPad，點選 **「準備 (Prepare)」**。
3.  勾選 **「監管裝置 (Supervise devices)」** 與 **「加入 Apple 校務管理」**。
4.  在 MDM 伺服器選項選擇 **「不要註冊 MDM」**。
5.  完成後，這台 iPad 即可透過 USB 線連接此 Mac 進行 App 安裝與描述檔管理。
`
      },
      {
        id: 'acc-10',
        question: 'Jamf ID (Jamf Account) 的密碼忘記了，與 Jamf Pro 的登入密碼有何不同？',
        important: false,
        tags: ['Jamf ID', '密碼'],
        answer: `
**區分說明**：
*   **Jamf Pro 帳號**：這是您日常登入學校 MDM 後台 (如 \`schoolname.jamfcloud.com\`) 用的帳號。
*   **Jamf ID (Jamf Account)**：這是登入 Jamf 官方入口網站 (如 \`account.jamf.com\`) 用的全域帳號，用於管理授權、查看訂閱狀態或存取 Jamf Nation 論壇。

**解決方案**：
*   若忘記 **Jamf ID** 密碼，請前往 [account.jamf.com](https://account.jamf.com) 點選 **「Forgot Password?」**。
*   Jamf 近期更新了密碼強度政策，若舊密碼失效，請直接執行重置流程設定新密碼。
`
      },
      {
        id: 'acc-11',
        question: '如何更改 Jamf Pro 控制台的網頁語言（中/英文切換）？',
        important: false,
        tags: ['語言', '繁體中文'],
        answer: `
**操作步驟**：
1.  登入 Jamf Pro。
2.  點選畫面右上角的人像圖示（或帳戶名稱）。
3.  選擇 **「帳戶偏好設定 (Account Preferences)」**。
4.  在 **「語言 (Language)」** 下拉選單中，選擇 **「Chinese (Traditional) / 繁體中文」**。
5.  點選 **「儲存 (Save)」**，網頁重新整理後介面即會中文化。
`
      },
      {
        id: 'acc-12',
        question: '遇到 Jamf Cloud 網頁無法開啟或顯示 503 Service Unavailable 時，該如何確認服務狀態？',
        important: false,
        tags: ['故障排除', '503', '狀態檢查'],
        answer: `
**說明**：Jamf Cloud 可能會進行預定維護或遭遇臨時服務中斷。

**檢測步驟**：
1.  前往 **[Jamf Status Page](https://status.jamf.com/)**。
2.  查看是否有公告 **"Cloud Maintenance"** 或 **"Service Interruption"**。
3.  若狀態顯示 **All Systems Operational** 但您仍無法登入：
    *   清除瀏覽器快取 (Cookie/Cache) 或嘗試「無痕模式」。
    *   確認學校防火牆是否阻擋了 \`jamfcloud.com\` 網域。
    *   若問題持續，請截圖錯誤畫面並聯繫極電資訊客服。
`
      },
      {
        id: 'acc-13',
        question: '我都還沒收到過期通知，可以「提早」更新 APNs 或 VPP 代號嗎？',
        important: false,
        tags: ['憑證更新', '最佳實務'],
        answer: `
**答案**：**絕對可以，且強烈建議這麼做。**

**最佳實務建議**：
許多資深管理員會固定在 **「暑假期間 (7-8月)」** 統一更新所有憑證與代號 (APNs, ADE, Apps & Books)。
*   **優點 1**：避開學期中教學繁忙時段。
*   **優點 2**：確保未來一整學年都不會跳出過期通知，避免突發性服務中斷。
*   **優點 3**：此時若遇到問題，有充裕時間聯繫客服處理。
`
      },
      {
        id: 'acc-14',
        question: '學校地址或電話變更了，如何在 Apple 校務管理 (ASM) 中修改？',
        important: false,
        tags: ['ASM', '基本資料'],
        answer: `
**操作步驟**：
1.  以管理員身分登入 ASM。
2.  點選左下角帳戶名稱 > **「偏好設定 (Preferences)」**。
3.  選擇 **「註冊資訊 (Enrollment Information)」**。
4.  在地址或電話欄位點選 **「編輯」** 進行修改。
5.  **注意**：此修改可能觸發 Apple 的重新審核機制 (D-U-N-S 資料核對)，通常需 1-3 個工作天生效。
`
      },
      {
        id: 'acc-15',
        question: 'ASM 中的「人員經理」、「內容經理」與「管理員」權限有何不同？',
        important: false,
        tags: ['角色權限', 'ASM'],
        answer: `
**權限分級說明**：
*   **管理員 (Administrator)**：擁有最高權限。可管理所有帳號、同意條款、管理 MDM 伺服器連結、重置任何人密碼。學校應嚴格控管此角色數量。
*   **地點經理 (Site Manager)**：擁有特定「地點 (Location)」的所有權限。適合分校區負責人，可管理該地點的人員與裝置。
*   **人員經理 (People Manager)**：僅能管理使用者帳號 (建立學生、老師 ID)，**無法**存取 VPP 或 ADE 功能。
*   **內容經理 (Content Manager)**：僅能購買 App 與書籍 (Apps & Books)。適合指派給教務處採購人員或會計。
`
      },
      {
        id: 'acc-16',
        question: 'Jamf Pro 可以整合學校的 Google 或微軟帳號進行「單一登入 (SSO)」嗎？',
        important: false,
        tags: ['SSO', 'Google', 'Entra ID'],
        answer: `
**可以。**

Jamf Pro 完整支援 **SAML 2.0** 與 **OIDC** 標準。
*   **整合優勢**：管理員登入 Jamf 後台時，可直接使用學校原本的 Google Workspace 或 Microsoft Entra ID 帳號驗證。
*   **安全性提升**：可直接沿用貴校在 Google/Microsoft 端設定的雙重驗證 (2FA/MFA) 機制，無需額外設定。
`
      },
      {
        id: 'acc-17',
        question: '一個 Apple 校務管理 (ASM) 帳號，可以連結到多個 MDM 伺服器嗎？',
        important: false,
        tags: ['多伺服器', 'ASM'],
        answer: `
**可以。**

**應用情境**：
若貴校同時有 Jamf Pro (用於管理公用載具) 與另一個測試用的 MDM，您可以在 ASM 中新增多個 **「MDM 伺服器」**。
*   **裝置分配**：在 ASM 的「裝置」頁面，您可以自由選擇將哪幾台 iPad 指派給 Jamf Pro，哪幾台給測試服。
*   **授權區隔**：建議為不同的 MDM 伺服器建立不同的 **「位置 (Location)」**，以避免 App 授權 (VPP) 混用或搶佔。
`
      }
    ]
  }
]
