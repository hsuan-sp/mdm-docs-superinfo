import { QASection } from '../types'

export const data: QASection[] = [
  {
    title: '第一部分：帳號、憑證與伺服器管理 (Account & Server Management)',
    items: [
      {
        id: 'acc-1',
        question: '[緊急] 登入 Jamf Pro/School 時顯示「您的帳戶已被鎖定」或密碼錯誤，該如何處理？',
        important: true,
        tags: ['帳號鎖定', '密碼重置', '緊急'],
        answer: `
**問題描述**：嘗試登入 MDM 後台時，顯示 "Account locked" 或密碼錯誤，即使嘗試多次仍無法登入。

**解決方案**：
1.  **Jamf Pro (精進計畫/校內自購)**：
    *   若您使用的是教育部統一配發的帳號（如 \`schooladmin\`），請聯繫教育部數位學習推動辦公室或我們協助解鎖。
    *   若為學校自行建立的帳號，請聯絡校內擁有「管理者 (Administrator)」權限的同仁登入後台，前往 **設定 (Settings) > 系統設定 > 管理員帳戶**，找到被鎖定的帳號進行解鎖或重置密碼。
    *   若所有管理員皆無法登入，請立即聯繫我們。

2.  **Jamf School**：
    *   Jamf School 近期強制執行較嚴格的密碼政策（需 15 碼以上），若久未登入可能需重置。
    *   請點擊登入畫面下方的 **「Forgot Password?」**，輸入您的 Email。系統會寄送重置信件，請依照信中連結設定新密碼即可。
`
      },
      {
        id: 'acc-2',
        question: '[緊急] 收到「Apple 推播通知服務 (APNs) 憑證即將到期」或已過期的通知，會影響平板運作嗎？如何更新？',
        important: true,
        tags: ['APNs', '憑證更新', '緊急'],
        answer: `
**解決方案**：
**⚠️ 警告：請務必點選「Renew (更新)」，切勿點選「Create New (建立新的)」憑證，否則所有已納管的 iPad 可能必須全部收回重置。**
**若當初施作時是由我們負責更新憑證，請勿自行進行任何操作，立刻聯絡我們協助更新Apple 推播通知服務 (APNs) 憑證。**

**操作步驟 (Jamf Pro 為例)**：
1.  登入 **Jamf Pro** > **設定 (齒輪圖示)** > **全域管理** > **推播憑證 (Push Certificates)**。
2.  點選即將到期的憑證名稱，按一下右下角的 **「更新 (Renew)」**。
3.  **下載簽署要求 (CSR)**：點選Download signed CSR from Jamf，以便下載並儲存 \`JAMFSignedCSR.plist\` 檔案。
4.  **前往 Apple 入口網站**：點選連結前往 [Apple Push Certificates Portal](https://identity.apple.com/pushcert/)，並登入**當初建立此憑證的 Apple ID**
   （極為重要，必須是同一個 ID，否則憑證無法續期，一樣會有所有已納管的 iPad 可能必須全部收回重置的風險）。
5.  **更新憑證**：在 Apple 網站列表中找到對應的憑證（確認過期日期或是備注的說明），點選 **"Renew"**，上傳剛剛下載的 \`JAMFSignedCSR.plist\` 檔案。
6.  **下載並上傳**：Apple 網站會生成一個新的 \`.pem\` 檔案，下載後回到 Jamf Pro 介面，上傳此檔案並儲存。
`
      },
      {
        id: 'acc-3',
        question: '[緊急] Jamf 後台顯示「自動裝置註冊 (ADE/DEP) 伺服器權杖」或「大量採購 (VPP) 伺服器權杖」過期，該如何更新？',
        important: true,
        tags: ['ADE', 'VPP', '權杖更新'],
        answer: `
**影響**：
*   **ADE (DEP) 過期**：新購或重置後的 iPad 無法自動納管。
*   **VPP 過期**：無法購買或派送 App，現有 App 可能無法更新。

**解決方案**：
與推播憑證"必須"用當初創建憑證時的帳號來更換不同，這兩個憑證可以由任何有管理員或機構經理權限的帳號更換，請登入 **[Apple 校務管理 (簡稱ASM)](https://school.apple.com/)** 取得新的權杖 (Token)。

**1. 更新自動裝置註冊 (ADE/DEP) 權杖**：
*   **ASM 端**：登入 ASM > 左下角帳戶名稱 > **偏好設定** > **裝置管理服務** > 點選對應的伺服器(通常為TWMOETPxxxxxx.jamfcloud.com，或其餘類似名稱，或貴校自訂名稱) > **下載代號**。
*   **Jamf Pro 端**：**設定** > **全域管理** > **自動裝置註冊** > 點選該實例(通常名稱為ASM) > **編輯** > 上傳剛剛下載的代號檔案 > **儲存**。

**2. 更新大量採購 (VPP/Apps & Books) 權杖**：
*   **ASM 端**：登入 ASM > 左下角帳戶名稱 > **偏好設定** > **付款與帳單** > **App** > **內容代號** > 找到對應的位置 (Location) > **下載代號**。
*   **Jamf Pro 端**：**設定** > **全域管理** > **大量採購** > 點選對應的位置名稱((通常名稱為Jamf Pro_VPP)) > **編輯** > 上傳代號檔案 > **儲存** > 點選 **「回收服務代號 (Reclaim Service Token)」** 以確保生效。
`
      },
      {
        id: 'acc-4',
        question: '登入 Apple School Manager (ASM) 時，系統要求同意新的條款與約定，若不同意會有什麼影響？',
        important: true,
        tags: ['ASM', '條款', '重要'],
        answer: `
**影響**：若未同意新條款，會暫停Apple School Manager (ASM)的各種功能的存取。這可能會導致 Jamf 無法同步新裝置、無法更新 VPP 授權，甚至無法派送 App。

**解決方案**：
1.  請使用具備 **「管理員 (Administrator)」** 權限的 Apple ID 登入 [https://school.apple.com/](https://school.apple.com/)。
    *   *注意：一般「人員」、「學生」或「內容經理」或「機構經理」帳號無法執行此動作。*
2.  登入後，網頁會自動跳出新的條款與約定視窗（或者可以確認上方橫幅）。
3.  請檢視內容並全數勾選 **「同意」**。
4.  完成後，建議手動登入一次 Jamf Pro 並手動執行一次資產更新，以確保連線正常和狀態更新成功。
`
      },
      {
        id: 'fed-auth',
        question: '什麼是「聯合驗證」(Federated Authentication)？',
        tags: ['聯合驗證', 'Google', 'Azure AD', 'SSO'],
        answer: '聯合驗證允許組織連結 **Google Workspace** 或 **Microsoft Azure AD (Entra ID)**。設定後，員工或學生可以直接使用原本的公司/學校 Google 或微軟帳號密碼登入「管理式 Apple ID」，無需另外記憶一組 Apple 專用的密碼，大幅降低忘記密碼的救援成本。'
      },
      {
        id: 'acc-5',
        question: 'Apple School Manager 的「管理式 Apple ID」密碼遺失或被鎖定，如何重置？',
        important: false,
        tags: ['Apple ID', '密碼重置'],
        answer: `
**適用對象**：忘記密碼的老師、學生、行政人員，以及**管理員本人**。

**解決方案**：

#### 情況一：一般使用者（老師、學生、職員）忘記密碼
由學校的「管理員」或具備「人員經理」權限的帳號協助重置。
1.  管理員登入 **[Apple 校務管理 (ASM)](https://school.apple.com/)**。
2.  點選左側選單的 **「使用者 (Users)」**。
3.  在搜尋欄輸入該使用者的姓名、Email 或學號。
4.  點選該使用者帳號，點擊上方或詳細資訊中的 **「重置密碼 (Reset Password)」**。
5.  系統會生成一組臨時密碼，您可以選擇「下載 PDF」或「拷貝」寄給該使用者。使用者下次登入時會被強制要求建立新密碼。

#### 情況二：管理員 (Administrator) 本人忘記密碼
若您是擁有最高權限的管理員，請依序嘗試以下步驟：

**1. 透過系統「自助重置」 (優先嘗試)**
*   前往 Apple 校務管理登入頁面。
*   點選下方的 **「忘記 Apple ID 或密碼？」**。
*   輸入您的管理式 Apple ID。
*   輸入與該帳號綁定的 **受信任電話號碼**。
*   系統會發送簡訊或語音來電告知驗證碼，輸入驗證碼後即可設定新密碼。

**2. 尋求校內「其他管理員」協助**
*   若貴校有設定 **2 位以上** 的管理員（強烈建議的備援機制），請聯繫另一位管理員登入 ASM。
*   請對方依照「情況一」的步驟，搜尋您的帳號並協助重置密碼。

**3. 聯繫 Apple 官方支援 (最後手段)**
*   若上述方法皆無效（例如：綁定的手機號碼已停用、且無其他管理員可協助），您必須聯繫 Apple 官方進行人工驗證。
*   **Apple 校務管理支援專線**：**0800-095-998**
*   **服務時間**：週一至週五，上午 9:00 至下午 6:00。
*   *注意：致電前推薦先準備好學校的「機構 ID (Organization ID)」及其他相關身分證明資料，以加速驗證流程。*
`
      },
      {
        id: 'acc-6',
        question: '如何新增或移除 Apple School Manager 中的管理員帳號？',
        important: false,
        tags: ['ASM', '管理員', '帳號管理'],
        answer: `
**建議**：為了避免單一管理員離職或職務調動，導致帳號無法登入而影響學校裝置管理，強烈建議學校隨時保持 **2 位或以上** 的管理員帳號。

**解決方案**：
1.  **登入**：使用現有的管理員帳號登入 **Apple 校務管理 (ASM)**。
2.  **新增管理員**：
    *   點選左側 **「使用者」** > 上方的 **「+」** 號。
    *   輸入新管理員的姓名與 **校內 Email**（建議使用公務信箱）。
    *   在「角色」欄位選擇 **「管理員 (Administrator)」**，並完成建立。
3.  **停用/移除舊管理員前的「關鍵檢查」**：
    在您按下停用按鈕之前，請務必先執行以下檢查，以免造成災難性後果。

**⚠️ 嚴重警告：刪除帳號前的必做檢查**

**1. 檢查 APNs 推播憑證歸屬 (最重要！)**
*   **風險**：APNs 憑證**綁定於建立它的 Apple ID，且無法轉移**。若您刪除了建立憑證的帳號，未來將無法「更新 (Renew)」憑證，導致全校 iPad 必須收回重置。
*   **檢查方式**：登入 Jamf Pro > **設定** > **全域管理** > **推播憑證**。查看 **「Apple ID」** 欄位顯示的 Email。
*   **判斷**：
    *   若該 Email **不是** 您要刪除的管理員帳號：👉 **可以放心刪除/停用該管理員**。
    *   若該 Email **正是** 您要刪除的管理員帳號：👉 **絕對不可刪除該帳號**。您必須保留該帳號的登入權限，並將帳號密碼交接給新任管理者，以供未來每年續約憑證使用。

**2. 關於 App 與書籍授權 (VPP)**
*   **風險較低**：在 ASM 中，軟體授權是綁定於**「位置 (Locations)」**，而非個人。
*   **判斷**：只要新的管理員擁有該「位置」的存取權限，即可接手管理 App，此部分不受刪除帳號影響。

**結論操作**：
*   確認 APNs 憑證**非**該帳號建立後，即可在 ASM 使用者列表中搜尋該人員，點選 **「停用 (Deactivate)」**。
*   (手動建立的帳號在停用 30 天後會自動永久刪除)
`
      },
      {
        id: 'acc-7',
        question: '學校的 Jamf Pro 授權數量顯示不足（已超過裝置計數），該如何處理？',
        important: false,
        tags: ['授權', 'License'],
        answer: `
**原因**：
1.  新採購的授權尚未啟用。
2.  舊的/故障的裝置未從 Jamf Pro 中刪除，佔用了授權額度。

**解決方案**：
1.  **清理舊裝置**：
    *   請先登入**[Apple 校務管理 (ASM)](https://school.apple.com/)** 左側點選裝置一欄，並將已報廢或不再使用的裝置取消指派裝置管理，並在 Jamf Pro 中搜尋同一台裝置。
    *   點選該裝置 > **刪除 (Delete)**。
    *   *注意：僅「取消指派」是不夠的，必須從 Jamf 中刪除才是釋放授權的完整步驟。*
2.  **更新授權**：
    *   若有新購授權，請聯繫我們取得新的 **啟用代碼(Activation Code)**，或由我們協助操作。
    *   前往 **設定** > **系統設定** > **啟用代碼**，輸入新的代碼並儲存，或由我們協助操作。
`
      },
      {
        id: 'acc-8',
        question: '如何查詢目前學校 Jamf 授權的到期日與剩餘數量？',
        important: false,
        tags: ['授權', '到期日'],
        answer: `
**Jamf Pro**：
*   前往 **設定 (齒輪)** > **系統設定** > **啟用代碼 (Activation Code)**。
*   頁面中會顯示授權總數、已使用數量以及授權到期日。

**Jamf School**：
*   登入後台，點選左下角的 **「Organization」** > **「License」**。
`
      },
      {
        id: 'acc-9',
        question: '原生 Apple macOS Server (Profile Manager) 停止服務後，舊有裝置該如何遷移至 Jamf？',
        important: false,
        tags: ['macOS Server', '遷移', 'Profile Manager'],
        answer: `
**背景說明**：
Apple 已於 2022 年正式終止 macOS Server 的 Profile Manager 功能。**自 2024 年 10 月起**，舊有的推播通知憑證已無法再進行更新。這意味著若憑證過期（2025 年 11 月起），舊有的 MDM 伺服器將完全失去對裝置的控制能力，無法再推送任何指令、安裝 App 或更新描述檔。

請依據貴校未來的管理規劃，選擇以下其中一種方式進行遷移：

#### **情境 A：遷移至雲端 MDM 服務 (如 Jamf Pro, Jamf School 或其他 MDM)**
若貴校已採購或規劃導入雲端 MDM 解決方案，請依照以下步驟將裝置轉移：

1.  **備份資料**：請先備份 iPad 內的重要照片或文件（因遷移過程必須將裝置重置，資料將會清空）。
2.  **ASM 轉移**：
    *   登入 **Apple 校務管理 (ASM)**，從左側側邊欄的「裝置」，搜尋並找到該台/該批裝置（若需要批量處理，請使用序號搜尋，並以半形逗號分開序號）。
    *   點選 **「指派裝置管理」**，將其從舊的 macOS Server **指派**給新的 MDM 伺服器（例如 Jamf Pro, Jamf School 或其他服務商）。
3.  **重置裝置**：
    *   由於更換了管理伺服器，**必須將 iPad 清除所有內容與設定 (Wipe/Reset)**。
    *   您可以在 iPad 上手動執行「清除所有內容與設定」，或將裝置連接至 mac 電腦使用 Apple Configurator、finder，或者使用 Windows 上的 Apple Devices App 進行清除。
4.  **重新啟用**：
    *   請您登入 Jamf Pro 或是其他您使用的 MDM ，確保該裝置已經被加入到 Prestage ，並稍微等候數十秒至數分鐘。
    *   將 iPad 清除完畢後，連上 Wi-Fi，進入「遠端管理」畫面時，即會自動偵測到並下載、安裝新的 MDM 設定檔，完成納管。

#### **情境 B：轉為使用 Apple Configurator 進行有線/本地端管理**
若貴校規劃將此批裝置改為透過 **Apple Configurator** 進行有線連接維護（不透過雲端 MDM 伺服器），請依照以下詳細步驟進行設定，以確保裝置受到「監管」並能順利安裝學校的 App 與描述檔。

**事前準備：**
*   一台 Mac 電腦（建議更新至最新 macOS）。
*   已安裝 **Apple Configurator** 應用程式（請至 Mac App Store 免費下載）。
*   學校的 **Apple 校務管理** 管理員帳號與密碼。
*   USB 傳輸線或 USB 集線器（若需同時處理多台）。

**操作步驟：**

**1. 登入組織帳號**
*   開啟 Apple Configurator。
*   點選上方選單列的 **「帳戶」** > **「登入」**。
*   輸入貴校的 **Apple 校務管理** 管理員帳號與密碼並完成登入。
    *   *此步驟是為了讓 Apple Configurator 能讀取貴校在「App 與書籍」中購買的授權，以便後續合法派送 App。*

**2. 準備裝置並建立監管 (Supervision)**
此步驟將會清除裝置資料，並將裝置與這台 Mac 電腦綁定（建立監管關係），以取得最高管理權限。

*   將 iPad 連接至 Mac 電腦。
*   在 Apple Configurator 視窗中選取該裝置（或全選多台裝置）。
*   點擊工具列上的 **「準備」** 按鈕（齒輪圖示）。
*   **準備設定**：
    *   選取 **「手動設定」**。
    *   勾選 **「將裝置加入 Apple 校務管理」**（建議勾選，以維持資產紀錄）。
    *   **務必勾選「監管裝置」**（此為關鍵步驟，確保學校擁有裝置控制權）。
    *   建議**取消勾選**「允許裝置與其他電腦配對」（安全性考量，避免學生回家自行連接電腦）。
    *   點選「下一步」。
*   **MDM 伺服器設定**：
    *   在「在 MDM 伺服器中註冊」的步驟，請選擇 **「不要註冊 MDM」**。
    *   點選「下一步」。
*   **指定組織**：
    *   選擇貴校的組織名稱。若是第一次使用這台電腦管理，請選擇 **「產生新的監管身分」**，並輸入學校名稱。
    *   點選「下一步」。
*   **設定輔助程式**：
    *   您可以選擇在 iPad 重置後要跳過哪些初始設定步驟（例如：Apple ID、Siri、螢幕使用時間等）。建議盡量全選跳過，以加速開機流程。
    *   點選 **「準備」**。
*   系統若提示裝置已設定過，請選擇 **「清除」**。等待進度條跑完，iPad 將會重置並重新啟動進入主畫面。

**3. 本地安裝 App 與描述檔**
裝置完成「準備」與「監管」後，即可開始進行內容派送：

*   **安裝 App**：
    *   在 Apple Configurator 中選取已連線的 iPad。
    *   點選工具列的 **「加入」** > **「App」**。
    *   系統會顯示貴校在 Apple 校務管理中已購買的 App 清單，選取要安裝的 App 並點選「加入」即可。
*   **安裝描述檔 (設定 Wi-Fi 或限制功能)**：
    *   您可以先在 Apple Configurator 的 **「檔案」** > **「新增描述檔」** 中，製作好 Wi-Fi 設定、限制（如隱藏 App、過濾內容）等規範。
    *   選取 iPad，點選工具列的 **「加入」** > **「描述檔」**，選擇製作好的檔案即可寫入裝置。

**4. 後續維護提醒**
*   由於未連接雲端 MDM，日後若需更新 App、修改 Wi-Fi 密碼或調整限制，**必須將 iPad 收回並實體連接至這台 Mac 電腦**才能進行變更。
*   建議善用 Apple Configurator 的 **「藍圖」** 功能，將上述設定（App + 描述檔）存成一個模版，未來只需將 iPad 接上電腦並套用藍圖，即可一鍵完成所有更新。
`
      },
      {
        id: 'acc-10',
        question: 'Jamf ID (Jamf Account) 的密碼忘記了，與 Jamf Pro 的登入密碼有何不同？',
        important: false,
        tags: ['Jamf ID', '密碼'],
        answer: `
**說明**：
*   **Jamf Pro 帳號**：這是您平常登入學校 MDM 後台（網址通常為 \`xxxxx.jamfcloud.com\`）用的帳號。
*   **Jamf ID (Jamf Account)**：這是登入 Jamf 官方入口網站（\`account.jamf.com\`）用的帳號，主要用於管理授權、查看訂閱狀態或存取 Jamf Nation 論壇。

**解決方案**：
*   若忘記 **Jamf ID** 密碼，請前往 [account.jamf.com](https://account.jamf.com) 點選 **「Forgot Password?」**。
*   近期 Jamf 更新了密碼政策，若舊密碼因此失效或是無法用於更換舊密碼，請一樣直接執行重置密碼流程。
`
      },
      {
        id: 'acc-11',
        question: '如何更改 Jamf Pro 控制台的網頁語言（中/英文切換）？',
        important: false,
        tags: ['語言', '中文'],
        answer: `
**解決方案**：
1.  登入 Jamf Pro。
2.  點選右上角的人像圖示（或帳號名稱）。
3.  選擇 **「帳戶偏好設定 (Account Preferences)」**。
4.  在 **「語言 (Language)」** 下拉選單中，選擇 **「Chinese (Traditional) / 繁體中文」**。
5.  點選 **「儲存 (Save)」**，網頁重新整理後即會生效。
`
      },
      {
        id: 'acc-12',
        question: '遇到 Jamf Cloud 網頁無法開啟或顯示維護中（503 Error）時，該如何確認服務狀態？',
        important: false,
        tags: ['故障排除', '503'],
        answer: `
**說明**：Jamf Cloud 偶爾會進行定期維護或遭遇突發性服務異常。

**解決方案**：
1.  請前往 **[Jamf Status Page](https://status.jamf.com/)**。
2.  查看是否有公告 **"Cloud Maintenance"** 或 **"Service Interruption"**。
3.  若狀態顯示一切正常 (All Systems Operational)，但您仍無法登入：
    *   請嘗試清除瀏覽器快取 (Cookie/Cache) 或使用無痕模式。
    *   確認學校防火牆是否阻擋了 Jamf 的網域。
    *   若問題持續，請截圖錯誤畫面並聯繫我們。
`
      },
      {
        id: 'acc-13',
        question: '我都還沒收到過期通知，可以「提早」更新 APNs 或 VPP 權杖嗎？',
        important: false,
        tags: ['憑證更新', 'Best Practice'],
        answer: `
**答案**：**絕對可以，且強烈建議這麼做。**

**原因**：
*   **避免空窗期**：若等到到期當天才更新，萬一遇到 Apple 網站維護或剛好負責人請假，可能會導致管理中斷。
*   **操作建議**：許多經驗豐富的管理員會固定在**「每年的暑假 (7-8月)」** 統一更新所有憑證 (APNs, ADE, VPP)，避開學期中的忙碌時段，確保未來一整年都不會跳出過期通知。
`
      },
      {
        id: 'acc-14',
        question: '學校地址或電話變更了，如何在 Apple School Manager (ASM) 中修改？',
        important: false,
        tags: ['ASM', '基本資料'],
        answer: `
**操作步驟**：
1.  以管理員身分登入 ASM。
2.  點選左下角的使用者帳戶名稱 > **「偏好設定 (Preferences)」**。
3.  選擇 **「註冊資訊 (Enrollment Information)」**。
4.  在地址或電話欄位點選 **「編輯」** 進行修改。
5.  **注意**：此修改可能需要經過 Apple 審核，通常需 1-2 個工作天生效。
`
      },
      {
        id: 'acc-15',
        question: 'ASM 中的「人員經理」、「內容經理」與「管理員」權限有何不同？',
        important: false,
        tags: ['角色權限', 'ASM'],
        answer: `
**權限分級**：
*   **管理員 (Administrator)**：最大權限。可管理所有帳號、重置任何人密碼、接受條款、轉移 VPP 授權。
*   **人員經理 (People Manager)**：僅能管理使用者帳號 (建立學生、老師 ID)，此帳號**不能**存取 VPP 或 ADE 功能。
*   **內容經理 (Content Manager)**：僅能購買 App 與書籍。適合指派給會計或採購人員。
*   **地點經理 (Site Manager)**：擁有該「地點」內的所有管理權限（包含人員與內容），適合分校區的負責人。
`
      },
      {
        id: 'acc-16',
        question: 'Jamf Pro 可以整合學校的 Google 或微軟帳號進行「單一登入 (SSO)」嗎？',
        important: false,
        tags: ['SSO', 'Google', 'Azure AD'],
        answer: `
**可以。**

Jamf Pro 支援 **SAML 2.0** 與 **OIDC** 標準。
*   **好處**：管理員登入 Jamf 後台時，直接使用學校原本的 Google/Microsoft 帳號驗證，無需記憶額外的 Jamf 密碼。
*   **安全性**：可直接沿用貴校在 Google/Microsoft 端設定的雙重驗證 (2FA) 機制，大幅提升安全性。
`
      },
      {
        id: 'acc-17',
        question: '一個 Apple School Manager (ASM) 帳號，可以連結到多個 MDM 伺服器嗎？',
        important: false,
        tags: ['多伺服器', 'ASM'],
        answer: `
**可以。**

**應用情境**：
若貴校同時有 Jamf Pro (用於公配載具) 與另一個測試用的 MDM，您可以在 ASM 中新增多個 **「MDM 伺服器」**。
*   **指派方式**：在 ASM 的「裝置」頁面，您可以自由選擇將哪幾台 iPad 指派給 Server A，哪幾台給 Server B。
*   **VPP 區隔**：建議為不同的 MDM 伺服器建立不同的 **「位置 (Location)」**，以避免 App 授權混用。
`
      }
    ]
  }
]
