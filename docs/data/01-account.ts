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

當 Apple 更新服務條款時，系統會在登入 Apple 校務管理 (Apple School Manager, ASM) 時跳出「條款與約定」的彈出視窗。請注意以下重點：

**影響範圍**：
*   若未同意新條款，**新購買的裝置將無法完成自動裝置註冊 (Automated Device Enrollment, ADE)**，因為 Apple 伺服器會拒絕回應該組織的註冊請求。
*   **VPP (大量採購計畫) 內容同步將暫停**，導致您無法將新購買的 App 與書籍授權指派給裝置。
*   現有已註冊的裝置不會立即受影響，但長期拖延可能導致無法派送新的設定描述檔或 App 更新。
*   **2025 年新功能限制**：若未同意條款，您將無法存取 Apple 校務管理中的新功能，例如 **Apple Intelligence 控制項** 或 **裝置 AppleCare 保養範圍資訊**。

**誰可以同意**：
只有在 ASM 中具備 **「管理員 (Administrator)」** 角色的帳號才有權限勾選同意條款。「管理者 (Manager)」或「技術經理 (People Manager)」等角色無法代為同意。

**操作步驟**：
1.  使用具備管理員權限的 Apple ID 登入 [school.apple.com](https://school.apple.com)。
2.  系統會自動彈出條款視窗，請仔細閱讀後勾選「我已閱讀並同意...」。
3.  點選「同意」按鈕即可完成。

**最佳實踐**：
建議學校指派至少 2 位管理員角色的帳號（例如資訊組長/設備組長及一位系統管理師），以確保當主要負責人請假或離職時，仍有人可以處理這類緊急事項。
`
      },
      {
        id: 'acc-2',
        question: '推播憑證 (APNs Certificate) 過期會發生什麼事？如何續約？',
        important: true,
        tags: ['APNs', '憑證', '災難預防'],
        answer: `
**後果極為嚴重：MDM 系統將完全失效。**

Apple 推播通知服務憑證 (Apple Push Notification service Certificate, APNs Certificate) 是 MDM 與 Apple 伺服器溝通的「身分證」，所有 MDM 指令都必須透過此憑證簽章才能被 Apple 伺服器轉發至裝置。

**過期後果**：
*   **所有受管裝置將無法接收任何遠端指令**：包括派送 App、推送設定描述檔、發送清除密碼指令、鎖定裝置等——全部失效。
*   **裝置不會主動脫離管理**，但管理端已無法控制它們，形同「失聯」。
*   **若憑證過期太久被 Apple 復原**：您可能需要重新建立新憑證，導致所有裝置必須**個別進行清除 (Erase) 並重新註冊**。對於數百台裝置的學校而言，這將是災難性的工作量。

**續約流程（務必使用原本的 Apple ID）**：
1.  **Jamf Pro 提醒**：系統會在到期前 30 天發送 Email 通知，並在儀錶板顯示警告。請立即處理！
2.  **登入 Jamf Pro**：前往 **「設定 (Settings)」>「全域管理 (Global Management)」>「推播憑證 (Push Certificates)」**。
3.  **點選「續約 (Renew)」**，系統會產生一個 **憑證簽署請求 (CSR)** 檔案供您下載。
4.  **登入 Apple 推播憑證入口網站**：前往 [identity.apple.com/pushcert](https://identity.apple.com/pushcert)，使用**最初建立該憑證的同一個 Apple ID** 登入。
    *   ⚠️ **嚴重警告**：若使用不同的 Apple ID 登入並建立新憑證，Apple 會將其視為「全新的 MDM 服務」，所有裝置將與 Jamf Pro 斷開連結！
5.  **找到對應的憑證點選「Renew」**：上傳 CSR 檔案，下載新的 .pem 憑證檔。
6.  **回到 Jamf Pro 上傳新憑證**：完成後，憑證有效期將延長一年。

**最佳實踐**：
*   在組織共用行事曆中設定每年提前 60 天的續約提醒。
*   將負責憑證的 Apple ID 密碼與雙重認證備援方法或**硬體安全金鑰**記錄於安全的密碼管理系統中。
*   建議使用機構專屬的 Apple ID（如 mdm-admin@school.edu.tw），而非個人 Apple ID。
*   **2025 年更新**：現在管理員可以透過 [iforgot.apple.com](https://iforgot.apple.com) 更輕鬆地重設管理式 Apple 帳戶密碼，但仍強烈建議保持電話號碼的有效性。
`
      },
      {
        id: 'acc-3',
        question: '如何重置學生的「管理式 Apple ID」密碼？',
        tags: ['密碼重置', 'ASM', '管理式 Apple ID'],
        answer: `
**管理式 Apple ID 的密碼重置只能由管理員在 Apple 校務管理 (ASM) 後台操作。**

管理式 Apple ID (Managed Apple ID) 是 Apple 專為教育與企業機構設計的帳號類型，與一般消費者的 Apple ID 不同，它的密碼重置不會寄送 Email 給使用者，而是由機構的 IT 管理員直接在後台處理。

**操作步驟**：
1.  使用管理員帳號登入 **Apple 校務管理** ([school.apple.com](https://school.apple.com))。
2.  點選左側選單的 **「帳號 (Accounts)」**，再點選 **「使用者 (People)」**。
3.  在搜尋框中輸入該學生的姓名、Email 或 Apple ID 進行搜尋。
4.  點選該使用者進入詳細資訊頁面。
5.  找到 **「登入資訊 (Sign-in)」** 區塊，點選 **「重置密碼 (Reset Password)」**。
6.  您有兩個選項：
    *   **產生暫時密碼**：系統會產生一組隨機密碼，您需要口頭或安全管道告知學生。學生首次登入後必須立即變更密碼。
    *   **自訂密碼**：您可以直接輸入一組符合密碼規則的新密碼。

**注意事項**：
*   如果學生設定了「帳號復原聯絡人」（例如家長的 Email），Apple 會同時通知該聯絡人密碼已被重置，這是正常的安全機制。
*   若學校啟用了與 Google Workspace 或 Microsoft Entra ID 的 **聯邦驗證 (Federated Authentication)**，密碼重置需在身分提供者端進行，而非 ASM。

**大量重置**：
若需要一次重置多位學生的密碼（例如開學初始化），可使用 ASM 的 **CSV 批次匯入** 功能，在試算表中填寫新密碼欄位後匯入。
`
      },
      {
        id: 'acc-4',
        question: 'Jamf Pro 顯示「VPP Token」即將過期，如何更新？',
        tags: ['VPP', 'Token', '大量採購'],
        answer: `
**VPP (大量採購方案) Token 是 Jamf Pro 與 Apple 校務管理之間同步 App 授權的橋梁，每年需更新一次。**

當 Token 過期後，Jamf Pro 將無法從 ASM 取得最新的授權資訊，導致新購買的 App 無法派送、現有授權狀態無法更新。

**過期前 Jamf Pro 會提供以下警告**：
*   儀錶板顯示紅色或橘色警告標籤。
*   管理員 Email 會收到到期通知（通常為到期前 30 天）。

**更新流程**：

**步驟一：從 Apple 校務管理下載新的 Token**
1.  登入 [school.apple.com](https://school.apple.com)，使用具備「管理員」或「App 與書籍管理者」權限的帳號。
2.  點選左下角的 **帳號名稱**，進入 **「偏好設定 (Preferences)」**。
3.  選擇 **「付款與帳單 (Payments and Billing)」** 分頁。
4.  找到 **「App 與書籍 (Apps and Books)」** 區塊。
5.  在對應的「位置 (Location)」旁邊，點選 **「下載 (Download)」** 按鈕，將 **.vpptoken** 檔案儲存到電腦。

**步驟二：將新 Token 上傳至 Jamf Pro**
1.  登入 Jamf Pro 管理介面。
2.  前往 **「設定 (Settings)」>「全域管理 (Global Management)」>「大量採購 (Volume Purchasing)」**。
3.  找到對應的位置 (Location) 項目，點選進入編輯畫面。
4.  點選 **「上傳 (Upload)」**，選擇剛才下載的 .vpptoken 檔案。
5.  儲存後，狀態應顯示為 **「有效 (Active)」** 或綠色勾勾。

**常見問題**：
*   **Token 與位置不符**：若您的學校在 ASM 中有多個「位置」，每個位置都有獨立的 Token。請確認下載與上傳的 Token 是對應的位置，否則會導致授權數量對不上。
*   **Token 無法上傳**：請確認檔案副檔名為 .vpptoken，且檔案未損毀。可嘗試重新下載。

**最佳實踐**：
*   將 VPP Token 更新日期設定在行事曆提醒，建議每年固定日期處理（例如暑假開學前）。
*   更新 Token 後，建議執行一次 **「同步大量採購內容 (Sync Volume Purchasing Content)」** 以確保授權數量正確。
`
      },
      {
        id: 'acc-5',
        question: '我們學校有使用 Google Workspace / Microsoft 365，可以用這些帳號登入 Apple 服務嗎？',
        tags: ['聯邦驗證', 'Google Workspace', 'Microsoft Entra ID', 'SSO'],
        answer: `
**可以，這稱為「聯邦驗證 (Federated Authentication)」，能讓師生使用學校的 Google 或 Microsoft 帳號登入 Apple 服務。**

聯邦驗證是 Apple 校務管理 (ASM) 提供的進階功能，讓學校可以將現有的 Google Workspace 或 Microsoft Entra ID (原 Azure AD) 帳號系統與 Apple 的管理式 Apple ID 整合。

**優點**：
*   **單一帳號**：師生只需記住一組 Google/Microsoft 帳密，即可登入 iCloud、課堂 App、共用 iPad 等 Apple 服務。
*   **帳號自動同步**：當學校在 Google Admin 或 Microsoft 365 管理中心建立新帳號時，會自動在 ASM 中建立對應的管理式 Apple ID（透過 SCIM 連接器）。
*   **密碼同步**：密碼變更在 Google/Microsoft 端進行，ASM 會自動信任該身分驗證。
*   **2025 年新功能**：macOS 15 (Sequoia) 以上版本支援 **「輕點登入 (Tap to Login)」**，讓師生能透過 iPhone 或 Apple Watch 的 NFC 憑證，快速登入已與 IdP 關聯的 Mac。

**設定需求（需 IT 管理員操作）**：
1.  **驗證網域**：在 ASM 中新增並驗證學校的 Email 網域（如 @school.edu.tw），需在 DNS 設定中加入 TXT 記錄。
2.  **選擇身分提供者 (IdP)**：在 ASM 的「設定」>「帳號」>「連接的網域」中，選擇 Google Workspace 或 Microsoft Entra ID。
3.  **授權存取**：按照畫面指示，在 Google Admin 或 Azure 入口網站中授權 Apple 存取帳號資料。
4.  **啟用 SCIM（可選）**：若要自動同步帳號，需設定 SCIM 連接器，讓帳號建立、停用、刪除自動化。

**注意事項**：
*   每個網域只能關聯一個身分提供者。若學校同時使用 Google 和 Microsoft，需選擇其中一個作為主要登入方式。
*   啟用聯邦驗證後，現有使用者首次登入時會被要求「確認帳號」，這是正常流程。
*   若身分提供者（如 Google）發生故障，師生將暫時無法登入 Apple 服務。

**適用情境**：
特別適合已全面使用 Google Classroom 或 Microsoft Teams 的學校，可大幅降低帳號管理負擔。
`
      },
      {
        id: 'acc-6',
        question: '學生畢業或離校了，我該如何處理他們的管理式 Apple ID？',
        tags: ['帳號生命週期', '畢業離校', '資料保留'],
        answer: `
**畢業或離校帳號應先停用，確認無誤後再刪除。貿然刪除將無法復原！**

管理式 Apple ID 的生命週期管理是學校 IT 的重要職責。妥善處理可確保帳號不被濫用，同時符合個資法規要求。

**建議處理流程**：

**階段一：停用帳號 (Deactivate)**
1.  登入 Apple 校務管理 ([school.apple.com](https://school.apple.com))。
2.  進入 **「帳號」>「使用者」**，搜尋並選擇該學生。
3.  將帳號狀態切換為 **「停用 (Inactive)」**。
4.  **效果**：
    *   該帳號無法再登入任何 Apple 服務。
    *   iCloud 中的資料仍保留在 Apple 伺服器上（200 MB 免費空間）。
    *   可隨時重新啟用。

**階段二：等待緩衝期**
建議在畢業典禮後保留帳號 30-90 天，以因應學生需要回來取得雲端資料的情況。

**階段三：刪除帳號 (Delete)**
1.  在 ASM 中選擇該帳號，點選 **「刪除使用者」**。
2.  **警告**：刪除是**永久性**的！
    *   該帳號雲端的所有資料（作業、筆記、照片備份）將無法救回。
    *   VPP 授權會自動釋放回授權池。
    *   該 Apple ID 永遠無法再被使用。

**批次處理**：
若需一次處理大量畢業生帳號，可使用 ASM 的 **「匯入」** 功能：
1.  匯出現有帳號清單為 CSV。
2.  篩選畢業班學生，將狀態欄改為「Inactive」或刪除該列。
3.  重新匯入 CSV，系統會批次更新。

**合規提醒**：
根據《個人資料保護法》，學校對於學生資料應有明確的儲存與銷毀政策。建議在新生入學時即告知管理式 Apple ID 資料之儲存期限（如離校後保留 90 天），並於離校時讓學生自行備份雲端資料。
`
      },
      {
        id: 'acc-7',
        question: '我可以使用個人的 Apple ID 登入學校的 iPad 嗎？',
        tags: ['個人 Apple ID', '帳號管理', '風險警告'],
        answer: `
**標準政策：不可以。學校裝置應使用管理式 Apple ID (Managed Apple ID) 或不登入任何 Apple ID。**

這項政策的目的是確保資料歸屬權明確、保護個人隱私、以及維持 MDM 管理的一致性。

**為何禁止**：

| 風險項目 | 詳細說明 |
|---------|---------|
| 資料混合 | 您的私人照片、聯絡人、訊息可能會透過 iCloud 同步到這台公用平板，被下一個使用者看到。 |
| 啟用鎖定 (Activation Lock) | 若登入個人 Apple ID 且開啟「尋找」功能，歸還時忘記登出會導致這台 iPad 被您的帳號鎖死。學校可能需要花費數週送 Apple 原廠驗證解鎖。 |
| 授權衝突 | 您用個人帳號下載的 App，學校的 VPP 授權將無法覆蓋它。造成同一款 App 出現兩個來源的混亂狀況。 |
| 無法遠端管理 | 用個人帳號下載的 App，MDM 無法替您更新或移除。 |
| 隱私爭議 | 若學校執行遠端清除，您個人的雲端資料設定可能受影響，引發法律爭議。 |

**若堅持需要使用個人帳號（例如：特殊教學需求）**：

> ⚠️ **替代方案（需管理員核准）**
>
> 若老師或學生確實需要登入個人 Apple ID 下載已購買的 App，請遵守以下規則：
>
> 1.  **僅登入 App Store**：在「設定」>「App Store」中使用個人 Apple ID 登入，但**切勿**登入「設定」>「Apple ID」頂端的 iCloud 帳號區塊。
> 2.  **下載完畢立即登出**：完成 App 下載後，請至「設定」>「App Store」>「登出」。
> 3.  **由學校 MDM 控管更新**：告知管理員您安裝了哪些 App，若需更新請重新短暫登入。
> 4.  **絕對不要開啟「尋找」功能**。
>
> 即便遵守上述步驟，仍可能造成 App 版本不相容或授權問題。學校有權拒絕此類請求。
`
      },
      {
        id: 'acc-8',
        question: '忘記 Jamf Pro 的管理員登入密碼怎麼辦？',
        tags: ['密碼重置', 'Jamf Pro', '災難復原'],
        answer: `
**密碼重置方式取決於您使用的 Jamf Pro 部署類型（雲端版或地端版）。**

**情境一：Jamf Pro 雲端版 (Jamf Cloud)**

若您使用的是 Jamf 代管的雲端服務：

1.  **使用「忘記密碼」功能**：在 Jamf Pro 登入頁面點選「Forgot your password?」，輸入您的 Email，系統會寄送重置連結。
2.  **聯絡 Jamf 支援**：若無法收到 Email，請登入 [Jamf Account](https://account.jamf.com) 網站，在「Support」區塊提交案件，說明需要重置雲端管理員密碼。需提供組織驗證資訊。
3.  **其他管理員協助**：若組織中有其他具備「管理員」權限的使用者，他們可以登入 Jamf Pro，前往「設定」>「系統設定」>「Jamf Pro 使用者帳號與群組」，直接為您重置密碼。

**情境二：Jamf Pro 地端版 (On-Premise)**

若 Jamf Pro 安裝在學校自有伺服器上：

1.  **資料庫層級重置**：需由具備 MySQL 存取權限的人員，直接在資料庫中更新密碼雜湊值。Jamf 官方提供詳細的 SQL 指令，請參閱 Jamf Knowledge Base 文章「Resetting the Jamf Pro User Accounts」。
2.  **設定檔重置**：若完全失去資料庫存取權，可能需要重新初始化 Jamf Pro（這會導致資料遺失），或聯絡 Jamf 企業支援尋求協助。

**最佳實踐（預防再次發生）**：
*   **建立至少兩組管理員帳號**：一組日常使用，另一組作為「緊急備援帳號」，密碼由資訊組長與裝置組長分別保管。
*   **使用密碼管理工具**：如 Bitwarden、1Password 等，將 Jamf Pro 管理員密碼儲存於機構共用金庫。
*   **啟用 SSO 整合**：若學校使用 Azure AD 或 Google Workspace，可將 Jamf Pro 與 SAML SSO 整合，管理員使用學校帳號登入，減少獨立密碼管理負擔。
`
      },
      {
        id: 'acc-9',
        question: '裝置一直顯示「連線失敗」或無法更新庫存 (Inventory)？',
        tags: ['連線問題', 'APNs', '網路', '故障排除'],
        answer: `
**這通常表示裝置與 MDM 伺服器或 Apple 服務之間的通訊出現問題。請依序檢查以下項目：**

**檢查項目一：APNs 憑證狀態**
*   登入 Jamf Pro，前往「設定」>「全域管理」>「推播憑證」。
*   確認憑證狀態為「有效 (Valid)」且未過期。
*   若已過期或即將過期，請參閱「APNs 憑證過期如何續約」問題。

**檢查項目二：網路連線與防火牆**
*   **Apple Push 服務**：裝置必須能連上 Apple 的推播伺服器。請確認學校防火牆允許以下連線：
    *   目標 IP 範圍：**17.0.0.0/8**（Apple 保留網段）
    *   埠號：**TCP 443, 2197, 5223**
*   **Jamf Pro 伺服器**：裝置也必須能連上您的 Jamf Pro 網址（若為雲端版，格式通常為 https://yourschool.jamfcloud.com）。
*   **測試方法**：在 iPad 上開啟 Safari，嘗試前往 [https://www.apple.com](https://www.apple.com) 以及您的 Jamf Pro 登入頁面，確認皆可正常載入。

**檢查項目三：系統時間**
*   **時間誤差會導致 SSL 憑證驗證失敗**。請檢查裝置的「設定」>「一般」>「日期與時間」，確認已開啟 **「自動設定」**。
*   若裝置時間與伺服器時間誤差超過數分鐘，加密通訊會被拒絕。

**檢查項目四：MDM 描述檔狀態**
*   在 iPad 上前往「設定」>「一般」>「VPN 與裝置管理」。
*   確認 MDM 描述檔（通常顯示為「管理描述檔」或「Jamf Pro MDM Profile」）仍存在且未被移除。
*   若描述檔遺失，該裝置可能已脫離管理，需重新註冊。

**檢查項目五：Jamf Pro 指令佇列**
*   在 Jamf Pro 中找到該裝置的紀錄頁面。
*   點選「管理」>「管理指令 (Management Commands)」。
*   若有大量指令處於「擱置中 (Pending)」狀態，可嘗試「取消所有擱置中的指令 (Cancel All Pending Commands)」，然後手動觸發「更新資產 (Update Inventory)」。

**仍無法解決**：
請聯絡 Jamf 技術支援，並提供以下資訊：
*   裝置序號
*   問題發生時間
*   Jamf Pro 系統紀錄檔（位於「設定」>「全域管理」>「Jamf Pro 系統紀錄」）
`
      },
      {
        id: 'acc-10',
        question: '學校的 Email 網域更換了（例如從 .edu.tw 改為 .xh.edu.tw），該怎麼更改管理式 Apple ID？',
        tags: ['網域變更', '帳號管理', '重大異動'],
        answer: `
**這是一項重大變更，需要周詳規劃。管理式 Apple ID 的 Email 格式會隨網域變更而改變，影響所有使用者的登入方式。**

**變更前的評估**：
*   **影響人數**：估算有多少師生帳號需要更新。
*   **時間點**：強烈建議在 **寒暑假期間** 進行，以減少對教學的影響。
*   **通知計畫**：事先發布公告，告知師生新的 Apple ID 格式與變更生效日期。

**操作流程**：

**步驟一：新增並驗證新網域**
1.  登入 Apple 校務管理 ([school.apple.com](https://school.apple.com))。
2.  前往「設定」>「網域」，點選「新增網域」。
3.  輸入新的網域（如 @school.xh.edu.tw）。
4.  依指示在 DNS 加入 TXT 驗證記錄，完成網域驗證。

**步驟二：批次更新使用者 Apple ID**
1.  前往「帳號」>「使用者」。
2.  使用「匯出」功能將所有帳號匯出為 CSV 檔案。
3.  在試算表軟體中，將所有 Apple ID 欄位的舊網域（@school.edu.tw）取代為新網域（@school.xh.edu.tw）。
4.  儲存並重新匯入 CSV 至 ASM。

**步驟三：通知使用者重新登入**
*   已登入的裝置會跳出「Apple ID 驗證失敗」的提示。
*   使用者需使用 **新的 Apple ID**（新網域格式）重新登入。
*   密碼通常維持不變（除非您在步驟二中同時重置了密碼）。

**注意事項**：
*   **共用 iPad**：若使用共用 iPad 模式，使用者登入畫面會自動更新為新的 Apple ID 格式。
*   **iCloud 資料**：帳號識別碼變更後，iCloud 資料理論上會跟著帳號走。但建議在變更前請使用者自行備份重要資料至本機或 Google 雲端硬碟。
*   **聯邦驗證**：若已設定與 Google/Microsoft 的聯邦驗證，需確認身分提供者端的 Email 也同步更新，否則會驗證失敗。
*   **2025 年更新**：Apple 現在允許管理員下載已驗證網域中「非管理式 Apple 帳戶」的 Email 清單，協助您識別有哪些個人帳號使用了學校網域。

**回滾計畫**：
若更新過程發生嚴重問題，可嘗試將 CSV 中的 Apple ID 改回舊格式並重新匯入。但此操作複雜且有資料遺失風險，因此強烈建議在小規模測試群組（如資訊組成員）先行測試後，再全面推行。
`
      },
      {
        id: 'acc-11',
        question: '【憑證陷阱】Apple 課堂突然全校失靈，顯示「描述檔無效」？',
        important: true,
        tags: ['憑證過期', 'Apple 課堂', '維修'],
        answer: `
**這通常是因為「教育身分憑證 (Education Identity Certificate)」過期（效期 2 年）。**

**症狀**：
老師反映 Apple 課堂 (Classroom) 內所有學生都顯示離線，查驗裝置發現「教育設定描述檔」狀態為「無效」或「紅色」。

**解決方案**：
1. 進入 Jamf Pro 「設定」 > 「全域管理」 > 「Apple 教育支援」。
2. 檢查憑證狀態，若已過期，點選「Renew」重新產生。
3. 重新產生後，所有「班級 (Classes)」的描述檔會進入待推送清單。
4. **重要**：對所有受影響裝置發送「更新資產」指令，強制重拉新的憑證。
`
      },
      {
        id: 'acc-12',
        question: '【Migration】更換新 MDM 廠商時，如何「不抹除資料」進行遷移？',
        important: true,
        tags: ['遷移', '2025 新功能', 'MDM 轉移'],
        answer: `
**2025 年 Apple 官方支援的「Migration without Wipe」API。**

1. **前提**：原 MDM 與新 MDM 均需支援此遷移 API。
2. **流程**：
   *   在 ASM 中將裝置指派從舊 MDM 更改為新 MDM。
   *   新 MDM 發送「遷移」指令。
   *   裝置會靜默解除舊描述檔並安裝新描述檔。
*   **限制**：若裝置版本過舊 (需 iOS 17.5+)，仍需透過清除重置的方式進行遷移。
`
      },
      {
        id: 'acc-13',
        question: '【iForgot】忘記管理式 Apple ID 密碼，一定要聯絡資訊組嗎？',
        tags: ['密碼重置', 'ASM', '2025 新功能'],
        answer: `
**2025 年新功能：支援透過 iforgot.apple.com 自行重設。**

*   前提：管理員在 ASM 中有設定「復原聯絡資訊」(手機或備用信箱)。
*   使用者可自行前往 iforgot 並依照驗證流程重設密碼，無需資訊組介入。
`
      },
      {
        id: 'acc-14',
        question: '廠商能幫忙管理學校的 Intune 或 Windows 裝置 (Surface Go) 嗎？',
        tags: ['Intune', 'Windows', '服務範圍'],
        answer: `
**術業有專攻。Apple MDM 廠商通常專注於 Jamf/Apple 生態系。**

*   **Intune / Windows**：屬於 Microsoft 的管理架構，與 Apple MDM 的通訊協定、管理邏輯完全不同。
*   **建議**：若學校有 Surface Go 或 Windows 筆電的管理需求，建議尋找專門的微軟系統整合商 (SI) 協助 Intune 部署。我們專注於提供最專業的 Apple 裝置管理服務。
`
      },
      {
        id: 'acc-15',
        question: '為什麼精進計畫建議學校使用 Jamf Pro 而非 Jamf School？',
        tags: ['Jamf Pro', 'Jamf School', '比較'],
        answer: `
**雖然 Jamf School 介面簡單，但 Jamf Pro 更適合大規模的縣市級集中管理。**

1.  **分層架構 (Sites)**：Jamf Pro 獨有的 Site 架構，能讓教育局 (Super Admin) 與學校 (Site Admin) 完美分權。教育局可派送全縣市統一樣板，學校仍保有校內微調彈性。
2.  **API 擴充性**：Jamf Pro 擁有強大的 API，能與教育部的數據儀錶板 (mdm.edu.tw) 對接，自動回傳使用率與資產數據。
3.  **進階排錯**：Jamf Pro 提供更詳細的指令紀錄 (Logs) 與智慧型群組邏輯，對於數萬台裝置的除錯至關重要。
`
      },
      {
        id: 'acc-16',
        question: '2025 年新功能：如何在 Apple 校務管理中強制「域名擷取 (Domain Capture)」？',
        important: true,
        tags: ['Domain Capture', 'ASM', '2025 新功能', '帳號轉移'],
        answer: `
**這是在 iOS 18 / macOS 15 之後最重要的管理功能之一，能將使用學校網域註冊的個人帳號強制納入管理。**

**功能解說**：
以往師生若先用學校 Email (@school.edu.tw) 註冊了個人的 Apple ID，學校在 ASM 中驗證網域時會發生衝突。2025 年 Apple 提供的「域名擷取 (Domain Capture)」功能允許管理員：
1.  **識別衝突帳號**：ASM 會列出有多少個人帳號使用了您的已驗證網域。
2.  **強制轉移 (Account Transfer)**：您可以發出通知，要求這些使用者在 60 天內將帳號改為個人 Email，或是配合轉移為「管理式 Apple ID」。
3.  **自動擷取**：對於未處理的帳號，系統可設定在期限後自動將其 Email 識別碼擷取，強制轉換為機構管理狀態。

**操作路徑**：
*   登入 [school.apple.com](https://school.apple.com) >「設定」>「網域」。
*   選擇已驗證網域，開啟「域名擷取」開關。
*   設定使用者通知信件內容與緩衝期限。

**注意事項**：
擷取後的帳號會變成受控狀態，使用者原有的照片、個人資料將受機構政策限制。建議執行前務必發布全校公告，請同仁先自行修改個人帳號的聯繫 Email。
`
      },
      {
        id: 'acc-17',
        question: '如何結合 Platform SSO (PSSO) 讓 Mac 直接用網路帳密解鎖 FileVault？',
        tags: ['PSSO', 'FileVault', 'macOS 15', '身分驗證'],
        answer: `
**在 macOS 15 (Sequoia) 以上版本，Platform SSO 終於支援了 FileVault 整合，實現真正的「單一登入」。**

**傳統痛點**：
以往即使設定了 Azure AD 或 Okta 登入 Mac，開機時的第一層 FileVault 加密畫面仍必須輸入「本機帳號密碼」，造成使用者需要輸入兩次密碼的困擾。

**2025 年解決方案**：
透過更新 Jamf Pro 描述檔並啟用 **「FileVault 延伸功能」**，系統可將 PSSO 的憑證與加密磁碟解鎖權限綁定。
1.  **需求**：macOS 15+、支援 PSSO 的 IdP（如 Microsoft Entra ID）、Jamf Pro 11.10+。
2.  **設定**：在「設定描述檔」>「單一登入延伸功能」中，啟用「啟用 FileVault 解鎖」選項。
3.  **效果**：使用者只需要輸入一次公司 IDP 帳密，系統就會自動同步解鎖 FileVault 並登入桌面，且密碼會與公司網域保持即時同步。
`
      },
      {
        id: 'acc-18',
        question: '學校更換 MDM 廠商時，原本購買的 VPP App 授權需要重新買嗎？如何轉移？',
        tags: ['VPP', 'MDM 遷移', '授權轉移', '大量採購'],
        answer: `
**不需要重新購買。App 授權是綁定在 Apple 校務管理 (ASM) 的「位置 (Location)」上，而非 MDM 軟體本身。**

**轉移步驟**：
1.  **下載 Token**：從 ASM 下載新廠商所需的 VPP Token（與舊位置相同即可）。
2.  **上傳 Token**：將 Token 上傳至新的 MDM (如從 MDM A 換到 Jamf Pro)。
3.  **回收舊授權**：在舊的 MDM 中，將所有指派給裝置的 App 任務刪除或撤銷。這會讓授權回到 ASM 的「可用數量」中。
4.  **重新指派**：在新 MDM 同步 VPP 內容後，您會看到與之前相同的總授權數，即可開始重新指派給裝置。

**進階 Tip**：
2025 年 Apple 推出的 **「MDM 遷移 API」** 甚至支援「Preserve VPP Assignment」。若使用此 API，App 在遷移過程中不會被刪除，且授權狀態會靜默移轉到新 MDM 中，無需使用者重新下載。
`
      }
    ]
  }
]
