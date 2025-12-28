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

**常見原因與方案**：
*   **網路阻擋**：學校防火牆若未開放 Apple 下載伺服器網域，下載會失敗。
*   **VPP 授權不足**：確認 ASM (Apple School Manager) 中該 App 的可用數量不為 0。
*   **Apple 帳號衝突**：若設定為「裝置型分派」，則不需要 Apple 帳號；若設定為「使用者型分派」，則需確認裝置已登入正確的 Apple 帳號。
*   **儲存空間不足**：iPad 剩餘空間若小於 App 大小，安裝會卡住。
`
            },
            {
                id: 'app-2',
                question: '不用 Apple 帳號 也可以在 iPad 上裝 App 嗎？',
                important: true,
                tags: ['VPP', 'Apple 帳號', '基礎觀念'],
                answer: `
**可以。這稱為「裝置型分派 (Device-based Assignment)」，是學校載具管理的最佳實踐。**

透過 MDM 與 VPP (Volume Purchase Program) 的結合，管理員可以將 App 直接透過裝置序號指派給該台 iPad，而不需要學生在 iPad 上登入任何個人的 Apple 帳號。

**優點**：
1.  **管理方便**：不需要幫每一位學生申請 Apple 帳號。
2.  **授權回收**：學生畢業或換機時，管理員可以隨時收回授權並指派給新使用者。
3.  **隱私保護**：學生不需要洩漏個人帳號資訊給學校。
`
            },
            {
                id: 'app-3',
                question: 'App Store 不見了，學生還能自己裝 App 嗎？',
                tags: ['App Store', 'Self Service', '管理限制'],
                answer: `
**學生可以透過「Self Service （自助服務）」安裝學校核可的 App，即使 App Store 被隱藏。**

在管理模式下，資訊組長通常會透過「限制描述檔」隱藏內建的 App Store，以防止學生下載非教學用途的軟體（如遊戲）。

**操作方式**：
1.  學生在 iPad 上找到 **Self Service** 圖示。
2.  點進去後，會看到學校已上架且獲派給該生的 App 清單。
3.  點選「安裝」或「重新安裝」即可，過程完全不需要密碼或 Apple 帳號。

這既滿足了教學上的自由度，也確保了載具的純淨度。
`
            },
            {
                id: 'app-4',
                question: '如何一次買 100 套免費的 App？為什麼需要「購買」？',
                tags: ['VPP', 'ASM', '授權'],
                answer: `
**在 Apple 的商務/教育授權體系中，即使是 $0 的免費 App，也需要進行「採購」流程。**

**操作流程**：
1.  登入 **Apple School Manager (ASM)**。
2.  點選「App 與圖書」。
3.  搜尋目標 App，選擇正確的「指派位置 (Location)」。
4.  輸入需要的「數量」（建議買足全校總量，如 500 次，即使目前用不到那麼多）。
5.  點選「購買」。

**為什麼要這麼做？**
透過 VPP 採購，學校才擁有的該 App 的「分發權」。若未進行此步驟，MDM 無法代替 Apple Store 將權限下放給裝置，導致安裝失敗。
`
            },
            {
                id: 'app-5',
                question: 'App 分派時選「自動安裝」還是「在 Self Service 中設定」較好？',
                tags: ['部署經驗', 'Self Service'],
                answer: `
**這取決於該 App 的「必要性」。**

| 模式 | 適用場景 | 優點 | 缺點 |
|------|---------|------|------|
| **自動安裝** | 核心 App (如 Safari 瀏覽器插件、基礎學習 App) | 無需人工干預，開機即有 | 若一次裝太多會造成開學日網路塞車 |
| **Self Service** | 選擇性 App (如 藝術類、特定專題 App) | 節省裝置儲存空間，依需下載 | 需指導學生手動點擊下載 |

**組長建議**：
*   **必裝 App**（如：Jamf Student、Google Classrooom）：設為自動安裝。
*   **延伸工具**：設為 Self Service，讓學生練習自主管理。
`
            },
            {
                id: 'app-6',
                question: '學生自己買的 App，畢業後可以帶走嗎？',
                tags: ['授權歸屬', 'VPP'],
                answer: `
**看是「誰」買的。**

1.  **學生用個人帳號購買**：授權永遠屬於該 Apple 帳號。即使 MDM 移除後，只要登入原本帳號，App 仍可下載。
2.  **學校透過 VPP 指派**：授權屬於學校。當管理員在 MDM 移除該指派任務，App 可能會從裝置上消失，授權會回到學校的 VPP 池中。

**注意**：受管理裝置通常會被限制無法使用私人 ID 進行 App Store 內購，以維持裝置純淨。
`
            },
            {
                id: 'app-7',
                question: '我想用的 App 在 ASM 搜不到？（例如已下架或特定地區限制）？',
                tags: ['ASM 搜尋', '故障排除'],
                answer: `
**ASM 偶爾會發生搜尋不到特定 App 的情況，通常是以下原因：**

1.  **類別選錯**：確認搜尋範圍是「iOS App」而非「Mac App」。
2.  **地區限制**：該 App 的開發者可能未在台灣區域的 App Store 上架。
3.  **開發者設定**：部分開發者會將 App 從 VPP 大量採購計畫中排除（雖然很少見）。
4.  **下架中**：App 正在審核更新或已永久下架。

**解決方法**：
*   嘗試用 **App 的完整下載網址** 在搜尋框中直接貼上。
*   聯絡開發者，詢問是否支援大量採購。
`
            },
            {
                id: 'app-8',
                question: '可以派送網頁捷徑 (Web Clip) 到學生桌面上嗎？',
                tags: ['Web Clip', '桌布佈置'],
                answer: `
**可以。這對於經常需要快速進入特定學習官網（如：酷課雲、學習吧）非常方便。**

**管理員設定**：
1.  在 Jamf Pro 中建立「網頁領航 (Web Clip)」設定描述檔。
2.  輸入捷徑標題與網址。
3.  上傳一張自訂圖示（Icon）。
4.  指派給目標群組。

學生桌面上就會多出一個看起來像 App 的圖示，點開會直接用 Safari 開啟該網頁。
`
            },
            {
                id: 'app-9',
                question: '更新 App 時，需要學生的 Apple 帳號密碼嗎？',
                tags: ['App 更新', '管理觀念'],
                answer: `
**完全不需要！只要是透過裝置型分派 (Device-based Assignment) 的 App，更新全程自動化。**

**運作原理**：
MDM 會自動向 Apple 請求最新的 VPP 資訊，若發現有新版本，會對裝置發送更新指令。
裝置收到指令後，利用 VPP 授權直接從 App Store 下載新版本覆蓋，不需要任何帳號驗證。
`
            },
            {
                id: 'app-10',
                question: '為什麼有些 App 點開後，會一直彈出要我輸入 Apple 帳號的對話框？',
                tags: ['故障排除', 'Apple 帳號彈窗'],
                answer: `
**這通常表示該 App 的授權來源與「裝置分派」模式發生衝突。**

**可能原因**：
1.  **混合安裝**：原本裝置上已存在用個人帳號裝的同名 App，後來 MDM 又試圖派送。
2.  **授權未就緒**：VPP 指令已發出，但 Apple 端的授權尚未同步完成。
3.  **非受管 App**：該 App 是由學生私自安裝的，MDM 試圖接管其管理權但未成功。

**教學現場解決法**：
將該 App 移除，並在 Jamf Pro 重新執行「重新安裝 (Reinstall)」指令。
`
            },
            {
                id: 'app-11',
                question: '如何派送「書本 (Books/PDF/ePub)」到學生 iPad？',
                tags: ['電子書', 'iBooks'],
                answer: `
**ASM 同樣支援「App 與圖書」的採購。**

1.  在 ASM 購買電子書授權。
2.  在 Jamf Pro 的「內建電子書」或「iBooks」管理項目中新增該項目。
3.  指派後，電子書會出現在學生的「書籍 (Books)」App 中。

**注意**：PDF 檔案也可以透過描述檔或受管理 App (檔案 App) 的方式直接下傳。
`
            },
            {
                id: 'app-12',
                question: '付費 App 的授權可以分給不同學校用嗎？',
                tags: ['VPP 位置', '資源共享'],
                answer: `
**可以，這透過 ASM 的「位置 (Location)」管理達成。**

如果您在教育局端或總中心買了一批 App，可以透過「轉移 (Transfer)」功能，將授權數量分配給不同的分校 (Site/Location)。
這樣可以實現「統一預算採購，各校自行分發」。
`
            },
            {
                id: 'app-13',
                question: '什麼是「受管理的應用程式配置 (App Configuration)」？',
                tags: ['AppConfig', '自動填寫', '進階管理'],
                answer: `
**AppConfig 允許管理員遠端預設 App 的設定值（如伺服器位址、使用者名稱）。**

這能節省學生大量手動輸入的時間。例如：
*   **Zoom/Teams**：預設登入網域。
*   **教育字典 App**：預設字庫下載路徑。
*   **專用瀏覽器**：預設首頁網址。

**設定方式**：
在 Jamf Pro 的 App 設定分頁中，貼入該 App 開發商提供的 XML 格式配置碼。
`
            },
            {
                id: 'app-14',
                question: '【TestFlight】可以讓老師測試校內開發的 Beta 版 App 嗎？',
                tags: ['App 測試', 'TestFlight', '管理式 Apple 帳號'],
                answer: `
**TestFlight 現已支援「管理式 Apple 帳號」。**

*   **流程**：
    1. 管理員將教師的 Management Apple Account 加入 TestFlight 外部測試群組。
    2. 教師在 iPad 上安裝 TestFlight App。
    3. 接受邀請後，即可測試尚未在 App Store 上架的校內 App。
*   **優勢**：無需將 Beta App 打包成 In-House 版本，且更新推送更即時。
`
            },
            {
                id: 'app-15',
                question: '【App Update】如何避免 App 在上課時間突然跳出更新，導致斷線？',
                tags: ['App 更新', '課堂管理', '更新策略'],
                answer: `
**盡量關閉「自動更新」，改為夜間手動推送或排程更新。**

**策略建議**：
1. **取消自動更新**：在重要教學 App 的分發設定中，取消「自動強制更新 (Automatically Force App Updates)」。
2. **手動排程**：管理員每週五放學後，手動全選裝置執行「更新 App」指令，或透過 Jamf Pro API 腳本在凌晨 3 點觸發。
3. **避開上課時段**：確保在上課期間 (08:00-17:00) App 是鎖定在穩定版本的，避免因頻寬佔用或版本變更干擾教學。
`
            },
            {
                id: 'app-16',
                question: '【Shared Payment】ASM 的 VPP 餘額可以跨校或是跨計畫共用嗎？',
                tags: ['ASM', 'VPP', '財務管理'],
                answer: `
**ASM 支援「共享內容購買額度」。**

*   教育局 (Super Admin) 可購買一筆大型 VPP 額度。
*   透過「位置 (Location)」管理功能，將額度彈性轉移給轄下各校 (Site) 使用。
*   **優點**：無需每校單獨請款、核銷，適合縣市級統一採購案。
`
            },
            {
                id: 'app-17',
                question: '為什麼免費的 App 也需要「購買」VPP 授權？顯示「授權不足」？',
                tags: ['免費 App', 'VPP', '授權觀念'],
                answer: `
**在 VPP 的邏輯中，即使金額為 $0，每一個安裝實體仍佔用 1 個授權數 (License Count)。**

*   **原理**：當 MDM 指派 App 給裝置時，Apple 伺服器會扣除 1 個授權。若帳戶內的授權數為 0，就會拒絕安裝，回報「No license available」。
*   **解決**：去 ASM 購買該免費 App，數量輸入「10,000」或足夠涵蓋全校的數量即可。
`
            },
            {
                id: 'app-18',
                question: '我的 App Store 圖示不見了！我也沒設限制，怎麼找回來？',
                tags: ['App Store', '圖示消失', '故障排除'],
                answer: `
**這通常是殘留的限制設定，或裝置曾被設為「單一 App 模式」。**

**排查步驟**：
1. **檢查螢幕使用時間**：前往「設定」>「螢幕使用時間」>「內容與隱私權限制」>「iTunes 與 App Store 購買」。確認「安裝 App」是否設為「允許」。(這是在本機端的限制)。
2. **檢查 MDM 限制**：前往「設定」>「一般」>「VPN 與裝置管理」，查看是否有任何限制描述檔隱藏了 App Store。
3. **資料夾搜尋**：有時候只是被學生藏到深層資料夾。在主畫面下拉搜尋 "App Store"。
4. **重置主畫面佈局**：前往「設定」>「一般」>「移轉或重置 iPad」>「重置」>「重置主畫面佈局」。
`
            },
            {
                id: 'app-19',
                question: '【進階】如何使用「App 設定 (App Configuration)」預填學生 ID？',
                tags: ['App Configuration', '自動化', '進階管理'],
                answer: `
**App Configuration 允許管理員遠端預設 App 的參數。**

**實踐步驟**：
1.  在 Jamf Pro 的 App 設定中，找到「App Configuration」區塊。
2.  選擇「Property List」或「字典 (Dictionary)」格式。
3.  依據該 App 的規格文件填入 Key-Value 參數。

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
            },
            {
                id: 'app-20',
                question: '新架構：什麼是「宣告式 App 管理 (Declarative App Management)」？',
                tags: ['DDM', 'App 部署', '狀態監控'],
                answer: `
**這是從「伺服器推播」轉向「裝置自主管理」的重大技術演進。**

**核心差異：**
1. **可靠性**：裝置會隨時確保 App 處於「應有狀態」。若學生誤刪或狀態異常，裝置可以在離線狀態下自動嘗試恢復，不需等 MDM 指令。
2. **零延遲報到**：裝置不再需要頻繁向 MDM 詢問「我有什麼要裝？」而是由專門的「狀態通道 (Status Channel)」主動回報安裝進度。
3. **更強的相依性**：管理員可以設定：若 A 軟體（如安全防護）沒裝好，B 軟體（如校務系統）就不准開啟。
`
            },
            {
                id: 'app-21',
                question: '如何防止學生「隱藏」或「鎖定」管理式 App？',
                important: true,
                tags: ['iOS 18', '隱藏 App', '鎖定 App', '限制'],
                answer: `
**iOS 18 允許使用者透過 Face ID / 密碼鎖定或隱藏 App，這可能導致課堂管理失控。**

**MDM 對策：**
* **禁用鎖定與隱藏**：在相關限制 Payload 中，開啟 **「Disable App Hiding」** 與 **「Disable App Locking」**。
* **效果**：學生長按 App 時，「需要 Face ID」或「隱藏 App」的選項將不再出現，確保老師能隨時檢視學生的應用程式清單。
`
            },
            {
                id: 'app-22',
                question: '【實務採購】Procreate 與 Procreate Pocket 有什麼差別？學校買錯了怎麼辦？',
                tags: ['Procreate', 'App 採購', 'VPP', '硬體相容性'],
                answer: `
**這是學校採購最常犯的錯誤之一。兩者是針對不同裝置設計的獨立 App。**

**詳細對比**：
*   **Procreate (iPad)**：專為大螢幕與 Apple Pencil 優化，支援高解析度圖層與進階繪圖引擎。價格較高，是專業美術教育的標配。
*   **Procreate Pocket (iPhone)**：是針對手機小螢幕設計的縮小版，雖然功能強大，但在 iPad 上執行時介面會顯得非常臃腫，且部分 iPad 專屬手勢無法使用。

**解決方案**：
1.  **VPP 退款**：若在 90 天內發現買錯，管理員可嘗試在 ASM 的「回報問題」中申請退款，並重新購買正確版本。
2.  **授權重新指派**：若已透過 Jamf 指派，請先移除 Pocket 版的指派任務，回收授權。然後重新在 ASM 購買 iPad 版的 Procreate 授權，並下載新的 Token 上傳至 Jamf。

**專家建議**：
採購前請核對 **Bundle ID**。iPad Procreate 的 ID 通常包含 \`procreate\`，而手機版則會標註 \`pocket\`。
`
            }
        ]
    }
];
