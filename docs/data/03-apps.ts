import { QASection } from '../types'

export const data: QASection[] = [
    {
        title: '第三部分：應用程式分發與管理 (Apps & Books)',
        items: [
            {
                id: 'app-1',
                question: 'iPad 上的 App 一直顯示「等待中」或無法安裝，如何排除？',
                important: true,
                tags: ['故障排除', 'App 安裝', 'VPP'],
                answer: `
**「等待中」通常表示 App 安裝流程在某個環節卡住了。需依序排查網路、授權、指令佇列等問題。**

當 MDM 向裝置發送 App 安裝指令後，裝置會經歷以下流程：
1.  收到 MDM 推播通知
2.  向 Jamf Pro 確認安裝指令
3.  向 Apple App Store 伺服器請求下載 App
4.  取得 VPP 授權認證
5.  下載並安裝 App

任何一個環節出問題都可能導致 App 圖示顯示「等待中」並停滯不動。

**排查步驟**：

**步驟一：確認網路連線**
*   這是最常見的原因。請確認 iPad 的 Wi-Fi 連線正常且穩定。
*   嘗試開啟 Safari 前往 [https://www.apple.com](https://www.apple.com)，若無法載入，網路即為問題根源。
*   學校防火牆可能阻擋 Apple 服務。請確認以下目標已開放：
    *   IP 範圍：**17.0.0.0/8**（Apple 保留網段）
    *   網域：**itunes.apple.com, apps.apple.com, *.mzstatic.com**
    *   端口：**TCP 443, 80**

**步驟二：檢查儲存空間**
*   若 iPad 儲存空間不足，App 無法下載。
*   **操作**：前往「設定」>「一般」>「iPad 儲存空間」，確認剩餘空間至少超過該 App 大小的 1.5 倍。
*   **建議**：維持至少 2GB 以上的可用空間。

**步驟三：確認 VPP 授權狀態**
*   若 App 是透過大量採購方案 (VPP) 派送，需確認授權已正確指派。
*   **確認方式**：
    1.  登入 Jamf Pro，前往該 App 的設定頁面。
    2.  進入「管理式分發 (Managed Distribution)」區塊。
    3.  確認已勾選 **「指派大量採購的內容 (Assign VPP Content)」**。
    4.  確認「可用授權數量」大於 0。若為 0，需至 ASM 補購授權。
*   若未勾選「指派 VPP 內容」，裝置會等待使用者手動登入 Apple ID 確認，從而卡在「等待中」。

**步驟四：清除擱置中的管理指令**
*   若 Jamf Pro 與裝置之間有大量失敗的指令堆積，可能阻塞後續操作。
*   **操作**：
    1.  在 Jamf Pro 中找到該裝置的紀錄頁面。
    2.  點選「管理」>「管理指令 (Management Commands)」。
    3.  點選「取消所有擱置中的指令 (Cancel All Pending Commands)」。
    4.  點選「更新資產 (Update Inventory)」重新建立連線。
    5.  重新觸發 App 安裝指令（透過 Scope 調整或手動指派）。

**步驟五：檢查 App 相容性**
*   若 App 版本要求的 iOS 版本高於該裝置，安裝會失敗但可能不會顯示明確錯誤。
*   **確認方式**：在 App Store 網頁版查詢該 App 的「相容性」資訊，比對裝置的 iPadOS 版本。

**最終手段：刪除後重裝**
*   若 App 圖示已在主畫面但呈現灰色，嘗試長按刪除該圖示。
*   然後透過 **Self Service** App 重新安裝，或等待 MDM 重新推送。

**仍無法解決**：
請收集以下資訊聯絡 Jamf 支援：
*   裝置序號與型號
*   卡住的 App 名稱與 Bundle ID
*   Jamf Pro 中該裝置的「管理指令」截圖
`
            },
            {
                id: 'app-2',
                question: '分發失敗並顯示「License info not found」或授權不足',
                important: true,
                tags: ['VPP', '授權管理', 'ASM', '大量採購'],
                answer: `
**這表示 Jamf Pro 嘗試為該裝置取得 App 授權時失敗，通常是因為 ASM 中的授權數量不足或購買位置不符。**

Apple 的 App 與書籍大量採購方案 (Volume Purchase Program, VPP) 採用「授權 (License)」機制。學校需在 Apple 校務管理 (ASM) 中「購買」（即使是免費 App 也要走購買流程），才能取得授權並透過 MDM 派發給裝置。

**錯誤訊息解析**：

| 錯誤訊息 | 可能原因 |
|---------|---------|
| **License info not found** | Jamf Pro 中該 App 沒有關聯任何 VPP 授權，或 VPP Token 失效。 |
| **No available VPP licenses** | 已購授權數量不足，全部授權都已被佔用。 |
| **Asset not associated with this server** | App 購買時選擇的「位置」與 Jamf Pro 綁定的 VPP Token 不一致。 |

**排查與解決**：

**步驟一：確認 App 已在 ASM 購買並有足夠授權**
1.  登入 Apple 校務管理 ([school.apple.com](https://school.apple.com))。
2.  前往 **「App 與書籍 (Apps and Books)」**。
3.  在搜尋框中輸入 App 名稱，找到該 App。
4.  檢查 **「已購買 (Purchased)」** 與 **「使用中 (In Use)」** 數量。
    *   若「使用中」等於或超過「已購買」，需補購授權。
    *   若「已購買」為 0，表示從未購買過，即使是免費 App 也需點選「取得 (Get)」完成「購買」。
5.  **重要**：購買時，請確認「指定給 (Assign to)」欄位選擇的是與 Jamf Pro VPP Token 對應的 **「位置 (Location)」**。

**步驟二：補購授權**
1.  在 ASM 找到該 App。
2.  點選「購買更多 (Buy More)」或直接輸入「數量」（免費 App 金額為 $0）。
3.  確認「位置」正確。
4.  點選「取得 (Get)」或「購買 (Buy)」。

**步驟三：同步 Jamf Pro 的 VPP 內容**
1.  登入 Jamf Pro。
2.  前往 **「設定」>「全域管理」>「大量採購 (Volume Purchasing)」**。
3.  選擇對應的位置，點選「同步 (Sync)」。
4.  等待同步完成（可能需要數分鐘）。
5.  回到該 App 的設定頁面，確認「可用授權數量」已更新。

**步驟四：確認 App 設定中勾選了 VPP 分發**
1.  在 Jamf Pro 前往 **「行動裝置 App」**，選擇該 App。
2.  進入「一般」或「VPP」頁籤。
3.  確認 **「指派大量採購的內容 (Assign VPP Content)」** 已勾選。
4.  儲存。

**常見陷阱**：
*   **多位置問題**：若學校在 ASM 有多個「位置」（例如：總校與分校各一個），每個位置的授權是獨立的。在 A 位置購買的 App 無法指派給 B 位置 Token 管理的裝置。
*   **授權回收**：若授權用完，可檢查哪些裝置佔用了授權。在裝置列表中，將已不用的裝置從 App 的 Scope 中移除，授權會自動釋放回可用池。

**注意事項**：
*   VPP 授權同步可能有最多 24 小時的延遲。若剛購買完找不到授權，請稍後再試。
*   若 VPP Token 本身過期，所有 VPP 相關操作都會失敗。請確認 Token 狀態為「有效 (Active)」。
`
            },
            {
                id: 'app-3',
                question: '為什麼 App 圖示一直是灰色的，也沒有在下載？',
                tags: ['App 安裝', '故障排除', 'Ghost Icon'],
                answer: `
**灰色 App 圖示（俗稱「Ghost Icon」）表示安裝流程在 App Store 下載階段卡住了，但系統已在主畫面預留了位置。**

這種現象通常發生在以下情境：
*   網路不穩定中斷了下載
*   VPP 授權取得過程延遲
*   App 簽章與裝置上已存在的版本衝突
*   App Store 伺服器暫時性問題

**診斷與解決**：

**方法一：等待並輕觸**
1.  確認 Wi-Fi 連線正常。
2.  輕觸灰色 App 圖示一次。
3.  等待 2-3 分鐘，觀察是否開始顯示下載進度圈。
*   有時候只是下載佇列延遲，輕觸可提高其優先順序。

**方法二：刪除灰色圖示後重裝**
1.  長按灰色 App 圖示，選擇「移除 App」>「刪除 App」。
2.  前往 **Self Service** App，找到該 App 重新安裝。
3.  或者等待 MDM 下一次同步時自動重推。

**方法三：取消擱置指令並重新派送（MDM 管理端）**
1.  登入 Jamf Pro，找到該裝置紀錄。
2.  點選「管理」>「管理指令」>「取消所有擱置中的指令」。
3.  點選「更新資產」強制裝置重新報到。
4.  重新調整該 App 的 Scope（移出再加回），觸發新的安裝指令。

**方法四：檢查 App 簽章衝突**
*   若使用者曾用個人 Apple ID 下載過同一款 App（例如：家長的帳號裝的 LINE），該 App 的簽章會與 VPP 版本衝突。
*   **解決**：
    1.  完全刪除該 App（至「設定」>「一般」>「iPad 儲存空間」確認已刪除）。
    2.  重啟 iPad。
    3.  透過 MDM 重新派送 VPP 版本的 App。

**方法五：網路層面排查**
*   灰色圖示常與網路中斷有關。
*   **測試**：嘗試使用手機熱點連網，看看是否能正常下載。若可以，表示學校 Wi-Fi 或防火牆有阻擋 App Store 流量。
*   **開放**：確認防火牆已允許 *.apple.com, *.mzstatic.com (Apple 的 CDN 網域) 的 TCP 443/80 流量。

**預防措施**：
*   確保 Jamf Pro 中該 App 的「分發方式」設為 **「自動安裝 (Install Automatically)」**，而非「Self Service 提供 (Make Available in Self Service)」。自動安裝模式會在背景持續重試。
*   確保 VPP 授權數量充足且已正確關聯。
`
            },
            {
                id: 'app-4',
                question: '如何設定 App 自動安裝，不需要學生手動點擊？',
                tags: ['自動安裝', '分發設定', 'VPP'],
                answer: `
**透過 Jamf Pro 的「行動裝置 App」設定，可以讓 App 在裝置連網時自動靜默安裝，無需使用者任何操作。**

這是實現「即開即用」部署體驗的關鍵設定。當裝置完成 MDM 註冊後，系統會自動派送所有設定為「自動安裝」的 App，學生拿到平板時所需的 App 都已就緒。

**設定步驟**：

1.  **登入 Jamf Pro**，前往 **「行動裝置 App (Mobile Device Apps)」**。

2.  **選擇目標 App** 或新增一個 App。

3.  **進入「一般 (General)」>「分發 (Distribution)」區塊**，進行以下設定：

    | 設定項目 | 建議值 | 說明 |
    |---------|-------|------|
    | **分發方式** | Install Automatically / Prompt Users to Install | 選擇「自動安裝」可完全靜默安裝。選擇「提示安裝」會在使用者裝置跳出確認對話框。 |
    | **指派 VPP 內容** | ✅ 勾選 | 必須勾選，否則會等待使用者登入 Apple ID。 |
    | **轉為管理式 App** | ✅ 勾選 | 若使用者已自行安裝該 App，MDM 會嘗試接管。 |
    | **自動強制更新** | ✅ 勾選 | App 有新版本時，MDM 會自動推送更新。 |
    | **App 移除時移除資料** | 依需求 | 勾選後，若從 MDM 取消派送，App 及其資料會一併刪除。 |

4.  **設定 Scope（範圍）**：
    *   點選「範圍 (Scope)」頁籤。
    *   加入目標的「智慧型群組 (Smart Group)」或「靜態群組 (Static Group)」。例如：「所有學生 iPad」或「112 年度精進方案裝置」。

5.  **儲存**。Jamf Pro 會在下一次裝置報到時（通常數分鐘內）推送安裝指令。

**驗證安裝狀態**：
*   在 Jamf Pro 中，進入該 App 的「紀錄 (History)」或「範圍」頁籤，可查看「已安裝」與「待安裝」的裝置列表。
*   若多數裝置顯示「待安裝」超過 30 分鐘，可能有指令發送問題，請參閱「App 顯示等待中」問題。

**注意事項**：
*   **App 大小**：大型 App（如遊戲、影片編輯軟體）可能需要較長下載時間。建議在穩定的 Wi-Fi 環境下部署。
*   **頻寬考量**：若同時對 500 台裝置派送 1GB 的 App，可能會造成學校網路壅塞。建議錯開時段部署，或使用 Jamf Pro 的「限速」功能（需額外設定）。
*   **iOS 版本相容性**：若 App 要求 iOS 版本高於部分裝置，那些裝置會安裝失敗。可建立條件式智慧型群組，排除不相容裝置。

**進階設定：延遲安裝 (Deferral)**
*   若不希望 App 在裝置註冊當下就立即安裝（例如：避免佔用開學當天頻寬），可利用 Smart Group 條件：
    *   條件：「最後報到時間」大於「X 天前」。
    *   如此一來，App 只會在裝置使用一段時間後才推送。
`
            },
            {
                id: 'app-5',
                question: '為什麼長按 App 沒有「移除」選項？如何刪除 App？',
                tags: ['限制', '移除 App', '描述檔'],
                answer: `
**這是因為裝置已套用限制描述檔，禁止使用者從主畫面刪除 App。但仍有替代方式可以刪除。**

在教育環境中，學校通常會希望保護必要的教學 App 不被學生誤刪，因此會透過 MDM 派送「限制描述檔 (Restrictions Configuration Profile)」，其中有一項設定是「不允許移除 App (Disallow removing apps)」。

**確認是否為限制描述檔造成**：
1.  前往「設定」>「一般」>「VPN 與裝置管理」。
2.  點選已安裝的 MDM 描述檔（例如「Jamf Pro MDM Profile」）。
3.  點選「限制 (Restrictions)」（若有的話），查看是否有「不允許刪除 App」的限制。

**替代刪除方式（不需解除限制）**：

若您只是要釋放空間或移除不需要的 App，無需移除限制描述檔，可透過「設定」選單操作：

1.  前往 **「設定」>「一般」>「iPad 儲存空間」**。
2.  等待系統載入 App 列表（可能需要幾秒鐘）。
3.  在列表中找到要刪除的 App，點選進入。
4.  點選 **「刪除 App」**。
5.  確認刪除。

這個方法可以繞過主畫面長按的限制，因為它走的是「儲存空間管理」的系統層級路徑。

**注意事項**：
*   **MDM 管理的 App 無法從裝置端刪除**：即使使用上述方法，若該 App 是由 MDM 強制安裝（設定為「自動安裝」且持續在 Scope 中），刪除後系統會在下次連網時自動重新安裝。
*   **要永久移除 MDM 派送的 App**：必須由管理員在 Jamf Pro 中將該裝置從 App 的 Scope 中移除，或取消勾選「自動安裝」。

**若需要暫時解除限制（管理員操作）**：
1.  在 Jamf Pro 找到該裝置所屬的群組。
2.  將該群組從「限制描述檔」的 Scope 中暫時移除。
3.  等待裝置同步（或手動執行「更新資產」指令）。
4.  此時裝置上的限制會暫時解除，可正常長按刪除 App。
5.  操作完畢後，別忘了將群組重新加回限制描述檔的 Scope。

**建議**：
與其頻繁解除限制，不如建立良好的 App 管理機制：
*   只派送必要的 App。
*   不需要的 App 從 Scope 移除即可。
*   若學生有特殊需求需安裝額外 App，可透過 Self Service 的「請求」功能讓管理員審核。
`
            },
            {
                id: 'app-6',
                question: '如何禁止學生自行從 App Store 下載遊戲或 App？',
                tags: ['App Store', '限制描述檔', '內容過濾'],
                answer: `
**透過 MDM 的「限制描述檔」可以完全隱藏 App Store，學生只能透過學校核准的「Self Service」安裝 App。**

這是教育環境中最常見的配置方式。隱藏 App Store 後，學生無法自行下載遊戲、社群軟體或其他分散學習注意力的 App，所有 App 來源皆由學校控管。

**設定步驟**：

1.  **登入 Jamf Pro**，前往 **「設定描述檔 (Configuration Profiles)」**。

2.  **編輯或建立一個「限制 (Restrictions)」描述檔**，專門用於學生裝置。

3.  **進入「限制」Payload，找到「App」相關區塊**：
    *   取消勾選 **「允許安裝 App (Allow installing apps)」**。
    *   這會**隱藏 App Store 圖示**，學生在主畫面與搜尋中都找不到 App Store。

4.  **設定 Scope**：
    *   將此描述檔指派給「學生 iPad」群組。
    *   **請勿**將此描述檔套用至教師裝置，以免限制教師安裝教學工具的彈性。

5.  **儲存**。描述檔會在下次裝置同步時生效。

**補充設定：進一步限制**

| 限制項目 | 用途 |
|---------|------|
| 不允許安裝 App | 隱藏 App Store |
| 不允許刪除 App | 防止學生刪除學校派送的 App |
| 強制執行 App 分級限制 | 可依國家分級（如「4+」）阻擋成人內容 App |
| 不允許 App 內購買 | 防止學生在遊戲中消費（若 App Store 開放時適用） |

**學生如何安裝 App**：

當 App Store 被隱藏後，學生需要透過 **「Self Service」App** 安裝學校核准的 App：
1.  打開 Self Service App（通常有學校 Logo 作為圖示）。
2.  瀏覽可用的 App 列表（由管理員設定）。
3.  點選「安裝」按鈕，App 會自動安裝，**無需 Apple ID 密碼**。

**替代方案（若需開放 App Store）**：

> ⚠️ **風險警告**
>
> 若因特殊教學需求決定開放 App Store，請注意以下風險：
> *   學生可登入個人 Apple ID 下載任意 App（包括遊戲、社群軟體）。
> *   可能造成 VPP 授權衝突（學生用個人帳號裝的 App 與學校版本不同）。
> *   個人 Apple ID 的 iCloud 照片、通訊錄可能同步到公用載具。
> *   若開啟「尋找 (Find My)」，歸還時可能觸發啟用鎖定。
>
> **若仍決定開放**：
> 1.  在限制描述檔中勾選「允許安裝 App」。
> 2.  同時搭配「App 分級限制」（區域設為台灣，等級設為「4+」或「9+」）減少不當內容。
> 3.  保留「不允許 App 內購買」限制。
> 4.  透過 Jamf Teacher 或 Apple 課堂，讓老師可在課堂中暫時鎖定 App Store。
`
            },
            {
                id: 'app-7',
                question: '學校可以自己開發 App 並派送給學生嗎（In-House App / 自製 App）？',
                tags: ['自製 App', '企業簽章', 'In-House', 'IPA'],
                answer: `
**可以，但需要加入 Apple Developer Enterprise Program，並注意企業憑證的年度更新與分發限制。**

Apple 提供幾種方式讓組織分發自行開發的 App：

| 方案 | 費用 | 分發方式 | 適合情境 |
|------|------|---------|---------|
| **Apple Developer Program** | 年費約 $99 USD | 上架 App Store（公開或不公開） | 希望 App 可被外部搜尋下載 |
| **Apple Developer Enterprise Program** | 年費約 $299 USD | 內部分發（In-House），不上架 App Store | 僅供組織內部人員使用 |
| **Apple Developer Enterprise + MDM** | 同上 | 透過 MDM 靜默安裝 | 大型組織批次部署 |

**In-House App 部署流程**：

1.  **申請 Apple Developer Enterprise Program**：
    *   需提供公司/機關的 D-U-N-S 編號（稅務登記相關）。
    *   Apple 審核流程較嚴格，可能需要 2-4 週。

2.  **開發並打包 App**：
    *   使用 Xcode 編譯並使用「Enterprise Distribution」簽章打包成 **.ipa** 檔案。

3.  **上傳至 Jamf Pro**：
    *   前往 **「行動裝置 App」>「+ 新增」**。
    *   選擇 **「In-House App」**。
    *   上傳 .ipa 檔案。
    *   設定分發方式（自動安裝或 Self Service）。
    *   設定 Scope。

4.  **部署至裝置**：
    *   裝置連網後會自動下載並安裝（若設為自動安裝）。
    *   **首次安裝時，使用者需「信任」企業開發者**：前往「設定」>「一般」>「VPN 與裝置管理」，點選企業開發者憑證並「信任」。
    *   透過 MDM 派送的 In-House App，可自動處理此信任步驟。

**重要：企業憑證年度更新**

*   企業分發憑證 (Enterprise Distribution Certificate) 有效期為 **1 年**。
*   若憑證過期：
    *   **所有使用該憑證簽章的 App 將立即無法開啟**（閃退）。
    *   必須使用新憑證重新打包並重新部署所有 App。
*   **最佳實踐**：在行事曆設定憑證到期前 60 天提醒，提前準備更新。

**注意事項**：
*   **App 不可對外分發**：In-House App 依 Apple 規定僅供組織內部人員使用，不得公開分享給外部使用者。違規可能導致帳號被撤銷。
*   **檔案大小限制**：Jamf Pro 對 In-House App 有上傳大小限制（視伺服器設定）。大型 App 可能需調整設定。
*   **版本管理**：每次上傳新版本時，建議增加 Bundle Version，確保裝置能辨識為「更新」。
`
            },
            {
                id: 'app-8',
                question: '如何派送網頁捷徑 (Web Clip) 到主畫面？',
                tags: ['Web Clip', '捷徑', '網頁 App'],
                answer: `
**Web Clip 可以將網站連結以 App 圖示的形式放置於主畫面，使用者點擊後會直接開啟該網頁。透過 Jamf Pro 的設定描述檔即可派送。**

這項功能適合以下情境：
*   學校官網快速入口
*   線上學習平台（如 Google Classroom 網頁版）
*   圖書館查詢系統
*   校務行政系統
*   任何沒有原生 App 但需要經常存取的網站

**設定步驟**：

1.  **登入 Jamf Pro**，前往 **「設定描述檔 (Configuration Profiles)」**。

2.  **新增或編輯一個描述檔**（例如「學校常用連結」）。

3.  **加入「Web Clip」Payload**：
    *   點選左側的 **「+ 新增」** 按鈕。
    *   選擇 **「Web Clip」**。

4.  **填寫設定**：

    | 欄位 | 說明 | 範例 |
    |------|------|------|
    | **標籤 (Label)** | 顯示在主畫面圖示下方的名稱 | 「學校首頁」 |
    | **URL** | 網站完整網址（含 https://） | https://www.school.edu.tw |
    | **圖示 (Icon)** | 上傳 PNG 或 JPG 圖片作為圖示（建議尺寸 180x180 像素） | 學校 Logo |
    | **全螢幕 (Full Screen)** | 勾選後開啟網頁時會隱藏 Safari 網址列（像 App 一樣） | ✅ 勾選 |
    | **可移除 (Removable)** | 是否允許使用者刪除此捷徑 | 依需求 |
    | **略過清單 (Precomposed Icon)** | 防止 iOS 自動為圖示加上光澤效果 | ✅ 勾選（保持原始設計） |

5.  **設定 Scope**：指派給目標裝置群組。

6.  **儲存**。裝置同步後，Web Clip 會自動出現在主畫面。

**進階應用：多個 Web Clip**

若要派送多個網站捷徑，可以在同一個描述檔中加入多個 Web Clip Payload，或為每個網站建立獨立的描述檔（方便個別管理 Scope）。

**注意事項**：
*   **HTTPS 優先**：建議所有 URL 都使用 https://，以免因安全性問題導致網頁無法載入。
*   **無法離線使用**：Web Clip 只是網頁捷徑，不具備離線功能。需網路連線才能載入內容。
*   **認證問題**：若網站需要登入，使用者每次開啟仍需輸入帳密（除非網站本身有「記住登入」功能）。
*   **圖示品質**：若不上傳自訂圖示，iOS 會自動截取網頁的 favicon 作為圖示，可能模糊不清。建議上傳高解析度圖片。
`
            },
            {
                id: 'app-9',
                question: '什麼是「管理式分發 (Managed Distribution)」？與傳統 VPP 有何不同？',
                tags: ['概念', 'VPP', '管理式分發', '裝置型授權'],
                answer: `
**管理式分發是 Apple VPP 的現代化實作方式，讓 App 授權直接綁定裝置而非 Apple ID，實現無 Apple ID 也能安裝 App 的「靜默部署」。**

這是 Apple 在 2014 年後推動的重大變革，徹底改變了企業與教育機構分發 App 的方式。

**傳統 VPP（舊式：使用者型授權）**：
*   購買 App 授權後，需透過「兌換碼 (Redemption Code)」發放給使用者。
*   使用者必須登入個人 Apple ID 並輸入兌換碼才能安裝 App。
*   授權與該使用者的 Apple ID 永久綁定，無法回收。

**現代 VPP（新式：裝置型授權 / 管理式分發）**：
*   MDM 直接將授權「借給」裝置的序號，而非綁定 Apple ID。
*   裝置 **無需登入任何 Apple ID** 即可接收 App 安裝指令。
*   當裝置不再使用該 App 時（例如：從 Scope 移除或清除裝置），授權自動回收到可用池，可再指派給其他裝置。

**兩者比較**：

| 特性 | 傳統 VPP (兌換碼) | 管理式分發 (裝置型) |
|------|------------------|------------------|
| 需登入 Apple ID | ✅ 需要 | ❌ 不需要 |
| 靜默安裝 | ❌ 不行 | ✅ 可以 |
| 授權可回收 | ❌ 不行 | ✅ 可以 |
| 適合共用裝置 | ❌ 困難 | ✅ 非常適合 |
| MDM 整合 | 有限 | 完整 |

**如何確認使用的是管理式分發**：
1.  在 Jamf Pro 前往該 App 的設定頁面。
2.  進入「VPP」或「一般」頁籤。
3.  確認 **「指派大量採購的內容 (Assign VPP Content)」** 已勾選。
4.  確認「分發方式」選擇為「裝置型授權 (Device Assignment)」而非「使用者型授權 (User Assignment)」。

**重要概念：VPP Token**

VPP Token 是連結 Jamf Pro 與 Apple 校務管理 (ASM) 的橋梁：
*   每個 Token 對應 ASM 中的一個「位置 (Location)」。
*   Token 每年需更新一次。
*   Token 過期會導致所有管理式分發功能失效。

**共用 iPad 情境**：
管理式分發對「共用 iPad (Shared iPad)」模式尤為重要。由於不同學生會輪流使用同一台裝置，若要求每個學生都登入 Apple ID 安裝 App 會非常麻煩。透過管理式分發，App 直接綁定裝置，任何學生登入後都能使用已安裝的 App。
`
            },
            {
                id: 'app-10',
                question: '舊款 iPad 無法安裝新版 App（如 Google Meet），提示需 iOS 17 以上？',
                tags: ['舊機型', '版本相容性', '降級'],
                answer: `
**這是 App 開發商不再支援舊版 iOS 造成的限制。但 Apple 有時會提供「安裝舊版 App」的機制作為變通方案。**

許多 App 開發商會定期提高其 App 的最低 iOS/iPadOS 版本要求，以便使用新功能並減少維護成本。例如，Google Meet 在 2023 年後要求 iOS 16 以上，Zoom 要求 iOS 12 以上。

若學校的裝置硬體過舊（如 iPad Air 2）無法升級到所需的 iOS 版本，會遇到安裝失敗的問題。

**Apple 的舊版相容機制**：

當您嘗試透過 MDM 派送一款 App 給不相容的裝置時，Apple 系統會自動嘗試尋找該 App 的 **「最後一個相容版本」**：
*   例如：Google Meet 現在最新版是 v290（要求 iOS 17），但 v250（要求 iOS 15）仍保留在 Apple 伺服器上。
*   若您的 iPad 是 iOS 15，Apple 會自動派送 v250 而非 v290。

**前提條件**：
*   該 App 必須是透過 **管理式分發 (Managed Distribution / VPP)** 派送。
*   開發商必須沒有主動從 App Store 下架舊版本。

**如何驗證舊版能否安裝**：
1.  在 Jamf Pro 中建立一個測試群組，加入一台舊款裝置。
2.  將該 App 指派給此群組。
3.  觀察安裝結果。若成功安裝，表示 Apple 提供了舊版本。
4.  可在裝置上查看 App 版本號確認。

**若舊版機制無效**：

有些 App 開發商會主動刪除舊版本，或 App 後端服務本身不支援舊版用戶端。此時可能需考慮：

| 替代方案 | 說明 |
|---------|------|
| **使用網頁版** | 許多服務（如 Google Meet, Zoom）提供網頁版。可建立 Web Clip 作為捷徑。 |
| **尋找替代 App** | 尋找功能類似但系統要求較低的 App。 |
| **升級硬體** | 若舊裝置數量龐大且長期使用有困難，可能需規劃汰換。 |
| **聯絡開發商** | 大型開發商有時會為教育機構提供特殊支援。 |

**查詢 App 系統需求**：
1.  前往 [apps.apple.com](https://apps.apple.com) 網頁版。
2.  搜尋該 App。
3.  向下捲動至「資訊」區塊，查看「相容性」欄位。

**注意事項**：
*   舊版 App 可能缺少新功能或有安全漏洞，不建議長期依賴。
*   若學校有大量舊裝置無法執行必要 App，應將此納入裝置採購規劃考量。
`
            },
            {
                id: 'app-11',
                question: '如何讓 iPad 上的 App 保持在最新版本？',
                tags: ['自動更新', '維護', 'App 更新'],
                answer: `
**透過 Jamf Pro 的「自動強制更新」設定，可確保 MDM 管理的 App 隨時保持最新版本。**

保持 App 更新對於安全性與功能相容性至關重要。過時的 App 可能有安全漏洞，或無法與最新服務端溝通。

**設定自動更新**：

1.  **登入 Jamf Pro**，前往 **「行動裝置 App」**。

2.  **選擇目標 App** 進入編輯畫面。

3.  **在「一般」或「分發」區塊中，勾選以下選項**：
    *   ✅ **「自動強制更新應用程式 (Automatically Force App Updates)」**

4.  **儲存**。

**更新機制運作方式**：
*   Jamf Pro 會定期（約每 24 小時）向 Apple App Store 查詢該 App 是否有新版本。
*   若有新版本，Jamf Pro 會對所有在 Scope 內的裝置發送更新指令。
*   裝置收到指令後，會在背景自動下載並安裝更新，無需使用者操作。

**前提條件**：
*   App 必須是透過 **VPP 管理式分發** 安裝的。若 App 是使用者自行用個人 Apple ID 安裝，MDM 無法控制其更新。
*   VPP Token 必須有效。
*   裝置需連網。

**手動觸發更新（若自動更新失效）**：

若發現某些裝置的 App 沒有自動更新：
1.  在 Jamf Pro 中找到該裝置。
2.  點選「管理」>「更新資產 (Update Inventory)」觸發同步。
3.  或者，進入該 App 的設定頁面，執行「重新處理分發 (Redistribute)」動作。

**App 更新日誌**：
*   可在 Jamf Pro 的「行動裝置 App」>「歷史紀錄 (History)」頁籤中查看各裝置的更新狀態。
*   可建立「智慧型群組」條件篩選「App 版本低於 X」的裝置，方便追蹤。

**注意事項**：
*   **大型 App 更新可能影響網路**：若數百台裝置同時下載 1GB 的 App 更新，可能造成學校網路壅塞。可考慮使用 Jamf 的「限速」功能或 Apple Caching Server。
*   **App 更新可能帶來問題**：某些 App 更新後可能有 Bug 或介面大改。建議先在測試群組驗證後再全面推送（可設定不同的 Update Check 頻率或延遲）。

**Apple Caching Server**：
若學校有 macOS 伺服器或 Mac Mini，可啟用「內容快取 (Content Caching)」功能。當第一台裝置下載 App 更新後，其他裝置可從區域快取取得，大幅減少網路流量。
`
            },
            {
                id: 'app-12',
                question: '學校可以購買 App 內的「內購項目 (In-App Purchase)」嗎？',
                tags: ['內購', 'IAP', '採購限制'],
                answer: `
**不行。Apple 的教育 VPP 方案僅支援購買 App 本體，無法購買訂閱制服務、解鎖功能或遊戲點數等 App 內購項目。**

這是 Apple 大量採購方案的根本限制，對許多依賴訂閱制的現代 App 造成挑戰。

**可透過 VPP 購買的項目**：
*   ✅ 免費 App（需「購買」取得授權，金額為 $0）
*   ✅ 付費 App（一次性購買，如 GoodNotes、Notability）
*   ✅ Apple Books 電子書
*   ❌ App 內訂閱（如 Canva Pro 月費、Adobe Creative Cloud）
*   ❌ App 內功能解鎖（如遊戲關卡、進階工具）
*   ❌ 虛擬貨幣或點數

**常見問題與變通方案**：

| 情境 | 變通方案 |
|------|---------|
| **需要 Canva Pro** | Canva 教育版 (Canva for Education) 對 K-12 師生免費，無需內購。使用教育機構 Email 註冊即可。 |
| **需要 Adobe 全功能** | Adobe 有提供「教育機構大量授權 (VIP)」，直接購買企業授權而非透過 App Store 內購。 |
| **需要 Notability Pro** | 原本 Notability 是買斷制，現改為訂閱制。舊版買斷授權仍有效，但新功能需訂閱。可考慮改用 GoodNotes 5（仍為買斷制）。 |
| **需要 App 進階功能** | 許多開發商針對教育機構有個別授權方案。建議直接聯繫開發商的教育銷售部門。 |

**關於「教育版」App**：

許多開發商為教育機構推出「教育版」或「學校版」App，這些版本通常：
*   功能與商業版相同或接近
*   對教育機構免費或大幅折扣
*   以獨立 App 形式存在於 App Store，可透過 VPP 採購
*   例如：Canva for Education, Kahoot! for Schools

**建議做法**：
1.  在採購 App 前，先確認該 App 的授權模式（買斷 vs 訂閱）。
2.  搜尋 App Store 是否有獨立的「教育版」App。
3.  聯絡開發商詢問是否有教育機構專屬定價或大量授權方案。
4.  若開發商僅提供訂閱制且無教育版，評估是否有功能類似的替代 App。

**注意事項**：
*   即使學校無法統一購買訂閱，個別教師仍可選擇用個人帳號訂閱所需服務（但此時屬個人行為，非學校統一管理）。
*   部分「訂閱制」App 提供「免費層級」功能，可能已足夠基本教學使用。
`
            },
            {
                id: 'app-13',
                question: '什麼是「App 設定 (Managed App Configuration / AppConfig)」？',
                tags: ['進階應用', 'AppConfig', '自動化', 'App 設定'],
                answer: `
**Managed App Configuration 允許 MDM 在派送 App 的同時，預先注入設定參數，讓 App 開啟時就已完成初始設定，無需使用者手動操作。**

這是企業與教育 MDM 的強大功能，可顯著提升使用者體驗並確保設定一致性。此功能基於 **AppConfig 標準**，許多主流 App 都支援。

**運作原理**：
1.  支援 AppConfig 的 App 開發商會公開一份「設定規格 (Configuration Schema)」，列出可接受的設定參數。
2.  MDM 管理員在派送該 App 時，填入這些參數值。
3.  App 安裝後首次開啟時，會讀取 MDM 注入的設定並自動套用。

**常見應用情境**：

| App | 可設定參數範例 |
|-----|---------------|
| **Google Chrome** | 預設首頁 URL、阻擋特定網站、停用無痕模式 |
| **Microsoft Outlook** | 預填使用者 Email、自動設定 Exchange 帳號 |
| **Zoom** | 預設關閉視訊/麥克風、停用虛擬背景 |
| **Adobe Acrobat** | 預設開啟方式、雲端儲存設定 |
| **Slack** | 預設 Workspace、SSO 設定 |

**設定步驟（以 Jamf Pro 為例）**：

1.  **確認 App 支援 AppConfig**：
    *   查閱 [appconfig.org](https://www.appconfig.org/content/) 社群資源。
    *   或搜尋「[App 名稱] AppConfig specification」。

2.  **在 Jamf Pro 前往該 App 的設定頁面**。

3.  **進入「App 設定 (App Configuration)」區塊**：
    *   選擇「Property List」或「字典 (Dictionary)」格式。
    *   依據該 App 的規格文件填入 Key-Value 參數。

4.  **範例（Google Chrome 設定首頁）**：
    \`\`\`xml
    <dict>
        <key>HomepageLocation</key>
        <string>https://www.school.edu.tw</string>
        <key>HomepageIsNewTabPage</key>
        <false/>
    </dict>
    \`\`\`

5.  **儲存並推送**。App 更新或重新安裝後會載入新設定。

**進階：動態變數**

Jamf Pro 支援在 App Configuration 中使用變數，讓設定可依裝置或使用者自動調整：
*   \`$EMAIL\` → 使用者的 Email
*   \`$FULLNAME\` → 使用者的全名
*   \`$SERIALNUMBER\` → 裝置序號
*   \`$JSSID\` → Jamf Pro 中的裝置 ID

例如，為 Outlook 預填使用者 Email：
\`\`\`xml
<dict>
    <key>EmailAddress</key>
    <string>$EMAIL</string>
</dict>
\`\`\`

**注意事項**：
*   **並非所有 App 都支援 AppConfig**。不支援的 App 會直接忽略 MDM 注入的設定。
*   設定格式必須嚴格符合開發商規格，否則可能被忽略或導致 App 異常。
*   若設定有誤，通常不會顯示錯誤訊息，App 只是不會套用設定。建議先在測試裝置驗證。
`
            }
        ]
    }
]
