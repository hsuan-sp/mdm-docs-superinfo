import { QASection } from '../types'

export const data: QASection[] = [
  {
    title: '第三部分：應用程式派送與管理 (Apps & Books)',
    items: [
      {
        id: 'app-1',
        question: '[常用] 已經在 Jamf 指派了 App，但在 iPad 上一直顯示「等待中」或無法安裝，如何排除？',
        important: true,
        tags: ['App安裝', '等待中', '故障排除'],
        answer: `
**問題描述**：在 Jamf Pro 中已將 App 指派給裝置，但 iPad 上的 App 圖示呈現灰色並顯示「等待中」，或是在 Self Service 中點選安裝後長時間沒有反應。

**解決方案**：
請依照以下步驟進行系統性排查：

1.  **檢查裝置端基本狀態 (最常見)**：
    *   **網路連線**：確認 iPad 是否已連上穩定且可對外連線的 Wi-Fi。例如嘗試開啟 Safari 瀏覽網頁，確認網路暢通。
    *   **儲存空間**：前往 **「設定」>「一般」>「iPad 儲存空間」**，確認剩餘空間是否足夠安裝 App（推薦至少保留 App 大小的 1.5 倍空間）。
    *   **重新啟動**：強制重新啟動 iPad，有時可解決暫時的系統錯誤。

2.  **在 Jamf Pro 中重設指令**：
    *   在 Jamf Pro 搜尋該裝置，進入裝置詳細頁面。
    *   前往 **「管理 (Management)」** 標籤頁 > **「管理命令 (Management Commands)」**。
    *   點選 **「取消所有失敗和待處理的命令 (Cancel All Failed and Pending Commands)」**。
    *   等待一分鐘後，再點選 **「更新資產 (Update Inventory)」**，強制裝置與 Jamf Pro 重新同步。

3.  **檢查 App 派送範圍與設定**：
    *   前往 **「行動裝置 App (Mobile Device Apps)」**，點進該 App。
    *   檢查 **「範圍 (Scope)」** 頁籤，確認目標裝置或其所屬群組是否正確包含在內。
    *   檢查 **「管理式發佈 (Managed Distribution)」** 頁籤，確認 **「指派大量採購的內容 (Assign VPP Content)」** 已勾選。

4.  **檢查 App 相容性**：
    *   確認該 App 是否支援裝置目前的 iPadOS 版本。若 App 至少要求 iPadOS 17，而裝置停留在 iPadOS 16，則無法安裝。
`
      },
      {
        id: 'app-2',
        question: '[常用] 派送 App 時出現「License info not found」或授權不足的錯誤，如何解決？',
        important: true,
        tags: ['授權錯誤', 'License', 'VPP'],
        answer: `
**問題描述**：Jamf Pro 指令失敗，錯誤訊息提示找不到授權或授權數量不足。

**解決方案**：
此問題根源在於 Apple 校務管理 (ASM) 中的 App 授權。

1.  **確認授權數量**：
    *   登入 **[Apple 校務管理 (ASM)](https://school.apple.com/)**。
    *   點選左側 **「App (Apps)」**。
    *   搜尋該 App，確認 **「可用」** 的授權數量是否足夠。若不足，請點選該 App 並購買更多授權（即使是免費 App 同樣需要「購買」0 元的授權）。

2.  **確認指派位置 (Location)**：
    *   在 ASM 購買 App 時，必須將授權指派到與 Jamf Pro 連動的**正確位置 (Location)**。
    *   若不慎買到其他位置，請在 ASM 中找到該 App，點選 **「轉移 (Transfer)」**，將所需數量的授權轉移到正確的位置，或者直接重買。

3.  **同步 Jamf Pro**：
    *   完成 ASM 操作後，回到 Jamf Pro。
    *   **設定** > **全域管理** > **大量採購 (Volume Purchasing)**。
    *   點選對應的 VPP 帳號，點擊 **「同步內容 (Sync Content)」** 或等待數分鐘內自動同步。
`
      },
      {
        id: 'app-3',
        question: '如何在 Apple School Manager (ASM) 購買免費 App 並同步到 Jamf？',
        important: false,
        tags: ['ASM', '購買流程'],
        answer: `
**操作步驟**：
1.  使用具備 **「內容經理」**、**「機構經理」** 或 **「管理員」** 權限的帳號登入 ASM。
2.  點選左側 **「App (Apps)」**。
3.  在搜尋框中輸入您想要的 App 名稱（例如 \`Google Classroom\`）。
4.  在搜尋結果中點選正確的 App。
5.  在右側的 **「指定給 (Assign to)」** 下拉選單，選擇與貴校 Jamf Pro 連動的位置 (Location)。
    *   *精進計畫的學校通常會命名為 \`Jamf Pro_VPP\` 或類似名稱。*
6.  輸入您需要的 **「數量 (Quantity)」**。即使是免費 App，也務必取得足夠數量的授權，若是免費的 App 推薦一次性取得遠超出貴校 Jamf 總權數的量。
7.  點擊藍色的 **「取得 (Get)」** 按鈕。
8.  等待幾分鐘後，回到 Jamf Pro 的 **「行動裝置 App」** 清單，數分鐘內該 App 就會自動出現。
`
      },
      {
        id: 'app-4',
        question: '如何設定 App 為「自動安裝」而非在 Self Service 中手動下載？',
        important: false,
        tags: ['自動安裝', '派送'],
        answer: `
**說明**：Jamf 提供兩種派送方式：強制推送 (自動安裝) 或提供下載入口 (Self Service)。

**設定步驟**：
1.  登入 Jamf Pro > **裝置** > **行動裝置 App**。
2.  點選您要設定的 App。
3.  點擊 **「範圍 (Scope)」** 標籤頁。
4.  指派好您要指派的目標群組或裝置，並在該 App 設定欄位中至少改動這兩欄：
    *   **Installation Method (安裝方式)**：選擇 **「Install Automatically/Prompt User to Install (自動安裝/提示使用者安裝)」**。
    *   **將非管理式 App 轉換為管理式**：建議勾選，以免出現需要打開商店認證的問題。
    *   **此外也推薦勾選**排程 Jamf Pro，使其自動檢查 App Store 是否有應用程式更新（並將商店選擇Taiwan）**跟**自動強制執行App更新**，以確保 App 版本夠新，這對一些需要保持新版本的 App 很有用。
5.  **儲存** 設定。指令發送後，符合條件的裝置就會自動開始下載安裝。
`
      },
      {
        id: 'app-5',
        question: '為什麼教師機或特定裝置無法刪除自行下載的 App（長按 App 沒有「移除」選項）？',
        important: false,
        tags: ['無法刪除', '限制描述檔'],
        answer: `
**原因**：
這是因為 MDM 的**限制描述檔**中，設定了「禁止移除 App」。為了維持教學環境一致性，此選項通常是啟用的。

**解決方案**：

*   **方法 A (MDM 後台暫時排除)**：
    1.  找出套用該限制的描述檔（可能名為 \`學生限制描述檔\` 或 \`教師機限制描述檔\`等等)。
    2.  進入該描述檔的 **「範圍」** > **「排除項目 (Exclusions)」**。
    3.  將需要刪除 App 的教師機加入排除列表並儲存。
    4.  待教師刪除完畢後，再從排除列表中移除，恢復限制。

*   **方法 B (裝置端操作，無需動後台)**：
    1.  前往 **「設定」>「一般」>「iPad 儲存空間」**。
    2.  在 App 列表中找到您要刪除的 App 並點擊。
    3.  選擇 **「刪除 App (Delete App)」**。此處的操作不受主畫面限制的影響。
    *   *注意：「卸載 App (Offload App)」僅會移除 App 主程式以釋放空間，但會保留其文件與資料。*
`
      },
      {
        id: 'app-6',
        question: '如何禁止學生自行從 App Store 下載遊戲或與教學無關的應用程式？',
        important: false,
        tags: ['App Store', '限制下載'],
        answer: `
**解決方案**：
透過**限制描述檔 (Configuration Profile)** 來達成。

1.  登入 Jamf Pro > **裝置** > **設定描述檔 (Configuration Profiles)**。編輯現有的「學生限制描述檔」，或點選 **「+ 新增 (+ New)」** 建立一個。
2.  前往 **「限制 (Restrictions)」** Payload > **「App (應用程式)」** 頁籤。  
3.  打開「使用App Store安裝App」並選擇限制。
4.  儲存描述檔，並將其**範圍 (Scope)** 指派給學生群組。
5.  **效果**：描述檔套用後，iPad 上的 **App Store 圖示會直接消失**，學生將無法自行安裝任何 App。
`
      },
      {
        id: 'app-7',
        question: '如何派送「網頁捷徑 (Web Clip)」到 iPad 主畫面，並設定自訂圖示？',
        important: false,
        tags: ['Web Clip', '捷徑'],
        answer: `
**解決方案**：
同樣使用**設定描述檔 (Configuration Profile)**。

1.  登入 Jamf Pro > **裝置** > **設定描述檔** > **+ 新增**。
2.  在 **「一般 (General)」** Payload 中為此描述檔命名（例如 \`校務系統 Web Clip\`）。
3.  在左側 Payload 清單中找到 **「Web Clip」**。
4.  **設定 Web Clip**：
    *   **標籤 (Label)**：輸入您希望顯示在圖示下方的名稱（如 \`成績查詢\`）。
    *   **URL**：輸入完整的網址 (如 \`https://school.system.edu.tw\`)。
    *   **圖示 (Icon)**：可選，點擊「上傳」按鈕，選擇您設計好的 \`.png\` 或 \`.jpg\` 圖檔 (建議尺寸為 180x180 像素)。
    *   **卸除式 (Removable)**：若不希望學生自行刪除，請**取消勾選**。
5.  儲存並將此描述檔指派給目標裝置。
`
      },
      {
        id: 'app-8',
        question: '已購買的付費 App，如何從舊的 MDM 伺服器轉移授權給新的 Jamf 使用？',
        important: false,
        tags: ['VPP轉移', '授權'],
        answer: `
**適用情境**：學校從舊的 MDM 系統（如 macOS Server）遷移至 Jamf，希望保留原有的付費 App 授權。

**解決方案**：
此操作需在 **Apple 校務管理 (ASM)** 內完成。

1.  登入 ASM > **App 與書籍**。
2.  搜尋您要轉移的付費 App。
3.  點選該 App，您會看到授權分配在不同「位置 (Location)」的詳細資訊。
4.  找到分配給舊 MDM 的位置，點擊其右側的 **「轉讓 (Transfer)」**。
5.  輸入要轉移的授權數量，並在下拉選單中選擇要轉入的新位置（與 Jamf Pro 連動的位置）。
6.  完成轉移後，回到 Jamf Pro 手動同步 VPP 內容，授權數量即會更新。
`
      },
      {
        id: 'app-9',
        question: '如何更新 iPad 上的 App 版本？可以設定自動更新嗎？',
        important: false,
        tags: ['App更新', '自動更新'],
        answer: `
**解決方案**：
Jamf Pro 提供了多種更新方式。

*   **方法 A：強制立即更新 (單次)**：
    1.  前往 **行動裝置 App** > 點進要更新的 App。
    2.  在 App 的儀表板頁面，點擊右下角的 **「強制更新 (Force Update)」** 按鈕。
    3.  此指令會立即推送給所有已安裝該 App 的裝置。

*   **方法 B：設定排程自動更新 (一勞永逸)**：
    1.  進入該 App 的設定頁面 > **「一般 (General)」**。
    2.  勾選 **「自動強制更新 (Automatically Force Update)」**。
    3.  勾選 **「排程 Jamf Pro 檢查 App Store 更新 (Schedule Jamf Pro to check for App Store updates)」**。
    4.  設定檢查頻率（如每天一次）。
    5.  **運作方式**：Jamf Pro 會定期檢查 App Store，一旦發現新版本，就會自動觸發強制更新指令。
`
      },
      {
        id: 'app-10',
        question: '派送 Google 系列 App (Meet, Classroom) 時，出現版本不相容或需要 iPadOS 更新的提示，該怎麼辦？',
        important: false,
        tags: ['版本不相容', '舊機型'],
        answer: `
**問題描述**：
在 Jamf Pro 中派送 App（如 \`Chrome\` 或 \`Google Meet\`）時，指令失敗或在 iPad 上顯示「此 App 需要更新至 iPadOS 17.0 或以上版本」。學校的 iPad 因型號較舊（如 iPad 6 代）而無法升級到最新系統。

**核心原因**：
大型開發商（如 Google、Microsoft）為了導入新功能與維持安全性，會在新版 App 中停止支援過舊的作業系統。

#### **解決方案 A：更新 iPadOS 至 App 要求的最低版本 (適用於可更新的裝置)**

如果您的 iPad 硬體支援 App 所需的 iPadOS 版本，這是最直接的解決方案。

1.  **確認相容性**：
    *   在 App Store 查詢該 App，檢視「相容性」區塊，確認所需的最低 iPadOS 版本（例如 \`iPadOS 16.0\`）。
    *   確認您的 iPad 型號是否支援該版本（例如 iPad 7 代最高可升至 \`iPadOS 18\`，符合要求）。
2.  **派送更新指令**：
    *   在 Jamf Pro 中，對目標裝置群組發送 **遠端指令 (Remote Commands) > 更新 OS 版本 (Update OS Version)**。
    *   待 iPadOS 更新完成後，App 安裝指令就會成功執行。

#### **解決方案 B：部署舊版相容 App (適用於無法更新的舊裝置)**

如果 iPad 硬體已達升級上限（如 iPad 6 最高只能到 iPadOS 17），無法滿足 App 最新版本的系統需求，您可以利用 Apple 的機制，讓裝置下載**與其系統相容的最後一個舊版本**。

**運作原理**：
Apple 允許使用者在自己的購買紀錄中，為舊裝置下載 App 的「舊版相容版本」。透過 MDM，我們可以觸發類似的機制，前提是該 App 必須曾被指派過。

**操作步驟**：
此流程無需在 Jamf Pro 做特殊設定，重點在於確保**授權指派**與**裝置狀態**正確。

1.  **確保 VPP 授權已指派**：
    *   確認您已在 **Apple 校務管理 (ASM)** 中為該 App 購買了足夠的授權，並已指派給 Jamf Pro。
2.  **確認 App 設為「管理式」**：
    *   在 Jamf Pro 該 App 的設定中，**「管理式發佈 (Managed Distribution)」** 頁籤下的 **「指派大量採購的內容 (Assign VPP Content)」** 必須勾選。
3.  **派送安裝指令**：
    *   將此 App 的**範圍 (Scope)** 指派給包含這些舊款 iPad 的群組，並設定為 **「自動安裝」**。
4.  **系統自動處理**：
    *   當 Jamf Pro 向舊款 iPad 發送安裝指令時，Apple 的 App Store 服務會偵測到該裝置的作業系統版本過低，無法安裝最新版。
    *   此時，系統會自動尋找並提供**與該 iPadOS 版本相容的最後一個可用舊版本**進行下載安裝。
    *   iPad 上可能會短暫跳出提示，詢問是否要下載此 App 的較舊版本，系統會自動處理或提示使用者點擊確認。

**疑難排解**：
*   **若依然失敗**：有時裝置端的 App Store 快取會導致判斷錯誤。請嘗試在 Jamf Pro 中，將該裝置從 App 的 Scope 中**排除 (Exclude)**，等待 App 圖示從 iPad 上消失後，再將其加回 Scope，重新觸發一次派送流程。
*   **開發者下架舊版**：極少數情況下，App 開發者可能會從 App Store 伺服器上徹底移除舊版本，導致此方法失效。

### **總結與建議**

*   對於**還能升級**的 iPad，優先選擇**更新 iPadOS**，以獲得最好的功能與安全性。
*   對於**已達硬體極限**的舊款 iPad，請直接派送 App。系統大多會自動處理，讓裝置下載相容的舊版本。
*   **關鍵**：確保 App 的 VPP 授權是透過「管理式發佈」指派給裝置，這樣 Apple 伺服器才能正確處理版本匹配。
`
      },
      {
        id: 'app-11',
        question: '如何隱藏 iPad 內建的 App（如：FaceTime, 訊息, App Store）？',
        important: false,
        tags: ['隱藏App', '限制'],
        answer: `
**解決方案**：
透過**限制描述檔**中的 **App Restrictions** 功能。

1.  在 Jamf Pro 編輯貴校使用的「學生限制描述檔」。
2.  前往 **「限制 (Restrictions)」** Payload > **「App (應用程式)」** 頁籤。
3.  找到「App使用情況」，並選擇「不允許部分App」，在 **「App使用情況」** 清單中，加入您想要隱藏的內建 App，例如：
    *   \`FaceTime\`
    *   \`App Store\`
    *   \`相機 (Camera)\`
    所需要的套件識別碼在此網址可以獲取 https://support.apple.com/zh-tw/guide/deployment/depece748c41/web 。
    若不是內建的 App可以到Jamf Pro自己的行動裝置App頁籤或App Store獲取。
4.  儲存並套用描述檔。該 App 的圖示就會從主畫面上消失。
`
      },
      {
        id: 'app-12',
        question: '什麼是「管理式發佈 (Managed Distribution)」？為什麼一定要勾選並分配授權才能派送？',
        important: false,
        tags: ['Managed Distribution', '概念'],
        answer: `
**概念解釋**：
「管理式發佈」是 Apple 推出的一套現代化的 App 授權分發機制，其核心是**將 App 授權指派給「裝置」本身，而非「使用者 Apple ID」**。

*   **舊時代 (無管理式發佈)**：
    *   派送 App 時，iPad 會跳出視窗要求「登入 iTunes Store」。
    *   每台 iPad 都需要登入一組 Apple ID 才能安裝 App，而且需要手動處理。
    *   管理上極為混亂，若使用公用 Apple ID，容易被鎖定或洩漏密碼。

*   **新時代 (啟用管理式發佈)**：
    *   學校在 ASM 購買的授權，透過 Jamf Pro 直接指派給特定 iPad 的**序號**。
    *   iPad **無需登入任何 Apple ID** 即可在背景靜默安裝 App。
    *   這才是實現「零接觸部署」、自動化管理的核心。

**在 Jamf Pro 中的設定**：
*   前往 **行動裝置 App** > 點進該 App > **管理式發佈 (Managed Distribution)** 頁籤。
*   **務必勾選「指派大量採購的內容 (Assign VPP Content)」**。
*   這個勾選動作，就是在告訴 Jamf：「請使用新時代的裝置授權模式以及我買好的授權來派送這個 App」。若不勾選，Jamf 就會退回舊模式，導致 iPad 跳出登入 iTunes 的提示。
`
      },
      {
        id: 'app-13',
        question: '學校可以用 VPP (ASM) 購買 App 內的「內購項目 (In-App Purchase)」嗎？',
        important: false,
        tags: ['內購', 'IAP', '限制'],
        answer: `
**答案**：**不行。**

Apple 的大量採購計畫 (VPP) **僅支援購買「App 本體」**（無論是付費或免費）。
*   **內購限制**：無法透過 VPP 購買如「解鎖完整版」、「訂閱會員」或「遊戲金幣」等內購項目。
*   **解決方案**：
    *   尋找該廠商是否提供 **「完整版 App」** (Pro Version) 可直接購買。
    *   聯繫廠商是否支援 **「大量啟用序號」** 方式，讓您在 App 內輸入序號啟用功能。
`
      },
      {
        id: 'app-14',
        question: '我們可以派送電子書 (iBooks/ePub) 給學生嗎？',
        important: false,
        tags: ['電子書', 'Books'],
        answer: `
**可以。**

Jamf Pro 支援派送 **ePub** 或 **PDF** 格式的電子書。
1.  **來源**：可以是 ASM 購買的書籍，也可以是學校老師自製的 PDF/ePub 上傳。
2.  **派送方式**：前往 **「行動裝置」>「eBooks」** 上傳並指派範圍。
3.  **閱讀**：學生會在 iPad 上的 **「書籍 (Books)」** App 中看到這本書。
`
      },
      {
        id: 'app-15',
        question: '什麼是「App 設定 (App Configuration)」？可以用來做什麼？',
        important: false,
        tags: ['App Config', '進階設定'],
        answer: `
**功能說明**：
這是一個進階功能，允許 MDM 在派送 App 的同時，**把「預設設定值」一起塞進去**。

**常見應用**：
*   **Google Chrome**：強制設定首頁、預設書籤。
*   **Zoom/Webex**：預先填入學校的伺服器網址。
*   **Microsoft Office**：預先填入使用者的 Email (變數)，簡化登入流程。

*注意：該 App 本身必須支援「Managed App Configuration」規格才有效。*
`
      },
      {
        id: 'app-16',
        question: '廠商說要提供「Custom B2B App」給我們學校，這是什麼？',
        important: false,
        tags: ['B2B', '客製化App'],
        answer: `
**說明**：
這通常指廠商專為貴校開發的 App，**不希望公開在 App Store 讓大眾下載**。

**流程**：
1.  廠商在 App Store Connect 上架時，選擇 **「私人發佈 (Private Distribution)」** 並指定貴校的 **機構 ID (Organization ID)**。
2.  貴校登入 ASM > **「自訂 App (Custom Apps)」**。
3.  您就會看到該 App 出現在列表中，接著就像買一般 App 一樣購買授權並同步到 Jamf 即可派送。
`
      },
      {
        id: 'app-17',
        question: 'Jamf Pro 有沒有「一鍵更新所有 App」的功能？',
        important: false,
        tags: ['App更新', '批量操作'],
        answer: `
**有類似功能。**

雖然沒有一顆按鈕叫「更新全世界」，但您可以透過 **「大量動作 (Mass Actions)」** 達成：
1.  前往 **「行動裝置 App」** 列表。
2.  勾選所有 App（或特定幾個）。
3.  點選下方的 **「編輯 (Edit)」** (或 Action)。
4.  在版本設定中選擇 **「強制更新」**。
5.  或者，最建議的做法是直接將所有 App 設定為 **「自動強制更新」** (參考 Q9)，讓 Jamf 每天自動幫您巡邏並更新。
`
      }
    ]
  }
]
