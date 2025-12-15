import { QASection } from '../types'

export const data: QASection[] = [
    {
        title: '第三部分：應用程式分發與管理 (Apps & Books)',
        items: [
            {
                id: 'app-1',
                question: 'iPad 上的 App 一直顯示「等待中」或無法安裝，如何排除？',
                important: true,
                tags: ['故障排除', 'App安裝'],
                answer: `
**常見原因與檢查清單**：

1.  **網路連線**：這是一切的基礎。請確認 iPad Wi-Fi 連線正常且未被防火牆阻擋 Apple 服務。
2.  **儲存空間**：檢查 iPad 是否空間已滿 (建議保留至少 2GB)。
3.  **VPP 授權**：
    *   前往 Jamf Pro 該 App 的 **「管理式分發」** 頁籤，確認已勾選 **「指派大量採購的內容 (Assign VPP Content)」**。若未勾選，iPad 會等待使用者登入 Apple ID 而卡住。
4.  **重新發送指令**：
    *   在裝置紀錄中，點選 **「管理」>「取消所有失敗的指令」**。
    *   接著點選 **「更新資產 (Update Inventory)」** 觸發同步。
`
            },
            {
                id: 'app-2',
                question: '分發失敗並顯示「License info not found」或授權不足',
                important: true,
                tags: ['VPP', '授權管理', 'ASM'],
                answer: `
**原因**：Apple 校務管理 (ASM) 中的授權數量不足，或購買到了錯誤的位置 (Location)。

**解決方案**：
1.  **登入 ASM**：前往 **「App 與書籍」**。
2.  **補購授權**：搜尋該 App 並輸入需要的數量。即使是 **免費 App**，也必須執行「購買」動作以取得授權 (金額為 0 元)。
3.  **檢查位置**：確認購買時選擇的 **「指定給 (Assign to)」** 位置與 Jamf Pro 連動的位置一致。
4.  **同步 Jamf**：回到 Jamf Pro > **設定** > **全域管理** > **大量採購**，執行手動同步。
`
            },
            {
                id: 'app-4',
                question: '如何設定 App 自動安裝，不需要學生手動點擊？',
                tags: ['自動安裝', '分發設定'],
                answer: `
**設定步驟**：
1.  在 Jamf Pro 前往 **「行動裝置 App」** 並點選目標 App。
2.  進入 **「一般 (General)」** > **「分發 (Distribution)」** 區塊。
3.  將分發方式 (Distribution Method) 改為 **「Install Automatically/Prompt User to Install」**。
4.  **建議一併勾選**：
    *   **「Make app managed if currently installed as unmanaged」** (若已安裝則接管)。
    *   **「Automatically Force Update」** (自動強制更新)。
`
            },
            {
                id: 'app-5',
                question: '為什麼長按 App 沒有「移除」選項？(如何刪除 App)',
                tags: ['限制', '移除App'],
                answer: `
**原因**：
這是因為裝置套用了 **限制描述檔 (Configuration Profile)**，其中啟用了 **「不允許移除 App」** 的限制。

**如何刪除**：
若只是要釋放空間或移除特定 App，無需解除限制，可透過設定選單操作：
1.  前往 **「設定」>「一般」>「iPad 儲存空間」**。
2.  在清單中找到該 App。
3.  點選 **「刪除 App」** 即可繞過主畫面的限制進行刪除。
`
            },
            {
                id: 'app-6',
                question: '如何禁止學生自行從 App Store 下載遊戲？',
                tags: ['App Store', '限制描述檔'],
                answer: `
**解決方案**：
透過 **限制描述檔** 隱藏 App Store。

1.  在 Jamf Pro 編輯學生的限制描述檔。
2.  前往 **「限制 (Restrictions)」** > **「iOS」** > **「App」**。
3.  取消勾選 **「Allow installing apps (允許安裝 App)」**。
4.  儲存後，iPad 上的 App Store 圖示將會消失，學生僅能透過 Self Service 安裝學校核准的 App。

> **⚠️ 替代方案 (風險警告)**
> 若您確實需要開放 App Store 讓師生自行下載 App，請勾選上述的 **「Allow installing apps」** 選項。
> **潛在風險**：
> *   學生可登入私人 Apple ID 下載遊戲或社群軟體。
> *   **無法阻止** VPP 授權衝突 (私人帳號下載了學校買的同款 App)。
> *   **個資外洩**：私人照片可能會同步到公用載具上。
> 請務必在開放前評估管理風險。
`
            },
            {
                id: 'app-7',
                question: '如何派送網頁捷徑 (Web Clip) 到主畫面？',
                tags: ['Web Clip', '捷徑'],
                answer: `
**操作步驟**：
1.  在 Jamf Pro 新增一個 **設定描述檔**。
2.  選擇 **「Web Clip (網頁捷徑)」** Payload。
3.  設定 **標籤 (名稱)** 與 **URL**。
4.  上傳一個辨識度高的 **圖示 (Icon)**。
5.  指派給裝置後，該捷徑就會像 App 一樣出現在 iPad 主畫面。
`
            },
            {
                id: 'app-12',
                question: '什麼是「管理式分發 (Managed Distribution)」？',
                tags: ['概念', 'VPP'],
                answer: `
**核心概念**：
這是 Apple 現代化的授權機制，特色是 **「認裝置，不認 Apple ID」**。

**運作方式**：
學校在 ASM 購買授權後，由 MDM 直接將授權「借」給 iPad 的序號。因此，iPad **完全不需要登入個人的 Apple ID**，即可在背景靜默安裝付費或免費 App。這是達成 1:1 或共用 iPad 自動化部署的關鍵。
`
            },
            {
                id: 'app-10',
                question: '舊款 iPad 無法安裝新版 App (如 Google Meet)，提示需 iOS 17 以上？',
                tags: ['舊機型', '版本相容性'],
                answer: `
**問題**：App 開發商停止支援舊版 iOS，但學校設備無法升級。

**解決方案**：
利用 Apple 的 **「舊版相容」** 機制。
1.  確認該 App 已在 ASM 購買足夠授權。
2.  在 Jamf Pro 將其分發方式設為 **「自動安裝」**。
3.  當 MDM 推送指令時，若裝置系統過舊，iPad 系統會嘗試尋找 **「最後一個支援該 iOS 版本的 App 版本」** 進行安裝。
    *   *注意：這取決於開發商是否保留了舊版檔案在 App Store 上，並非對所有 App 皆有效。*
`
            },
            {
                id: 'app-13',
                question: '學校可以購買 App 內的「內購項目 (In-App Purchase)」嗎？',
                tags: ['內購', '採購限制'],
                answer: `
**不行。**
Apple 校務管理的 VPP 系統 **僅支援購買 App 本體**。無法採購訂閱制服務、遊戲點數或解鎖功能的內購。

**建議作法**：
請尋找該軟體是否有推出 **「教育版」** 或 **「Pro 版」** (獨立的付費 App)，這類 App 通常已包含完整功能，可透過 VPP 購買。
`
            },
            {
                id: 'app-15',
                question: '什麼是「App 設定 (Managed App Configuration)」？',
                tags: ['進階應用', '自動化'],
                answer: `
**功能**：
這允許管理員在派送 App 的同時，預先注入設定檔。

**常見應用**：
*   **Google Chrome**：預設開啟學校首頁、阻擋特定網址。
*   **Microsoft Office**：預先填入使用者的學校 Email，簡化登入。
*   **Zoom**：預設關閉視訊或麥克風。
*   *前提：該 App 開發商必須支援 AppConfig 標準。*
`
            },
            {
                id: 'app-9',
                question: '如何讓 iPad 上的 App 保持在最新版本？',
                tags: ['自動更新', '維護'],
                answer: `
**設定排程更新**：
在 Jamf Pro 的 App 設定中，勾選 **「Automatically Force Update (自動強制更新)」**。
Jamf Pro 會定期向 App Store 查詢版本，一旦發現更新，便會對裝置下達更新指令。建議配合 **「每日庫存更新」** 頻率以獲得最佳效果。
`
            }
        ]
    }
]
