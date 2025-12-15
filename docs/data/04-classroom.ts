import { QASection } from '../types'

export const data: QASection[] = [
  {
    title: '第四部分：課堂管理與限制設定 (Classroom Management & Restrictions)',
    items: [
      {
        id: 'cls-1',
        question: '[常用] 「Apple 課堂」App 顯示學生「離線」或無法連接，該如何排查？',
        important: true,
        tags: ['Apple 課堂 (Classroom)', '離線', '故障排除'],
        answer: `
**問題描述**：教師機的「Apple 課堂」App 中，部分或全部學生的 iPad 顯示為「離線」，無法進行鎖定、畫面監看等操作。

**解決方案**：
「Apple 課堂」的運作依賴於區域網路 (Wi-Fi) 與藍牙，請依照以下順序系統性排查：

1.  **基礎硬體檢查 (教師機與學生機都需檢查)**：
    *   **Wi-Fi 狀態**：確認所有裝置都已連上**同一個 Wi-Fi SSID** (無線網路名稱)。若學校有多個 AP (無線基地台)，即使 SSID 相同，也要確保它們屬於同一個網段 (Subnet)。
    *   **藍牙狀態**：確認所有裝置的**藍牙功能皆已開啟**。藍牙用於裝置間的初始探索與部分低功耗通訊。
    *   **距離**：確保學生機與教師機在合理的藍牙通訊範圍內（建議在同一間教室，約 10 公尺內）。

2.  **Jamf Pro 後台設定檢查**：
    *   **教育設定描述檔**：確認 Jamf Pro 已成功分發「教育設定描述檔 (Education Configuration Profile)」到所有裝置。這個描述檔包含了班級的師生名冊 (Roster)。
    *   **使用者與裝置配對**：檢查 Jamf Pro 中，學生的「使用者」是否已正確配對到對應的 iPad「裝置」。若配對錯誤或遺失，課堂將無法辨識該學生。
    *   **重新派送班級設定**：登入 Jamf Pro > **裝置** > **群組分類** > **班級 (Classes)** > 找到該班級並**編輯** > **儲存** (無需做任何修改，僅儲存即可)。此動作會強制 Jamf 重新分發教育設定描述檔給該班級的所有成員。

3.  **進階網路排查**：
    *   **AP 隔離 (AP Isolation)**：聯繫網管人員，確認學校的無線基地台**沒有開啟「AP 隔離」** 或類似的「客戶端隔離 (Client Isolation)」功能。此功能會禁止同一 Wi-Fi 下的裝置互相通訊，是導致課堂 App 失敗的最常見網路設定原因。
    *   **防火牆連接埠**：確認學校防火牆沒有阻擋 Apple 課堂所需的特定 TCP/UDP 連接埠。

4.  **最終手段 (裝置端)**：
    *   **重新啟動**：將教師機與離線的學生機都強制重新啟動。
    *   **重置網路設定**：在學生機上前往 **「設定」>「一般」>「移轉或重置 iPad」>「重置」>「重置網路設定」**。此動作會清除所有 Wi-Fi 密碼，需手動重新連線，但能解決多數連線異常。
`
      },
      {
        id: 'cls-2',
        question: '如何在 Jamf Pro 中建立「班級」並對應教師機與學生機？',
        important: false,
        tags: ['班級設定', 'Jamf Pro'],
        answer: `
**操作步驟**：
1.  **確認使用者與裝置已配對**：
    *   在建立班級前，請務必確保 Jamf Pro 中的每一位老師和學生「使用者」，都已經與他們實際使用的 iPad「裝置」完成配對。
    *   路徑：**使用者 (Users)** > 點選使用者 > **行動裝置 (Mobile Devices)** > **編輯** > 新增對應的 iPad。

2.  **建立班級**：
    *   登入 Jamf Pro > **裝置 (Devices)** > **群組分類** > **班級 (Classes)**。
    *   點選 **「+ 新增 (+ New)」**。
    *   **班級名稱 (Display Name)**：輸入班級名稱，例如「701 國文課」。
3.  **加入教師**：
    *   在 **「教師 (Teachers)」** 區塊，點選 **「+ 新增 (+ Add)」**。
    *   搜尋並勾選該班級的教師使用者。
4.  **加入學生**：
    *   在 **「學生 (Students)」** 區塊，點選 **「+ 新增 (+ Add)」**。
    *   搜尋並勾選所有學生的使用者。
    *   **效率技巧**：若學生已建立群組，可直接搜尋並加入整個「使用者群組」。
5.  **儲存**：
    *   點選右下角 **「儲存 (Save)」**。Jamf Pro 會自動生成並分發教育設定描述檔給所有成員的 iPad。教師機打開「課堂」App 後，就會看到這個班級。
`
      },
      {
        id: 'cls-3',
        question: 'Jamf Teacher App 與 Apple 課堂 App 有什麼不同？學校該用哪一個？',
        important: false,
        tags: ['比較', 'Jamf Teacher', 'Apple 課堂 (Classroom)'],
        answer: `
**功能定位差異**：
*   **Apple 課堂 (Classroom)**：**即時互動與監看工具**。
    *   **優點**：可即時看到所有學生畫面的縮圖牆 (螢幕牆)，方便巡視；操作直覺，可快速引導學生開啟 App/網頁或鎖定螢幕。
    *   **限制**：強烈依賴**區域網路與藍牙**，師生必須在同一間教室的同一個 Wi-Fi 網段下才能運作。

*   **Jamf Teacher**：**預設課程與嚴格限制工具**。
    *   **優點**：可預先設定「課程範本 (Lesson)」，例如「考試模式」(只允許開啟特定 App、禁用相機、禁用 AirDrop)，上課時一鍵套用；不依賴區域網路，只要學生 iPad 能連上網際網路，即使在家也能接收限制。
    *   **限制**：**沒有即時的螢幕牆監看功能**，無法像 Apple 課堂一樣隨時查看所有學生的畫面。

**選擇建議**：
*   **若您的主要需求是「課堂即時監控與互動」**，例如引導低年級學生操作、確保學生專心，請使用 **Apple 課堂**。
*   **若您的主要需求是「執行嚴格的測驗環境」或「自動化管理」**，例如舉辦線上測驗、防止學生使用非教學用 App，請使用 **Jamf Teacher**。
*   **最佳實踐**：兩者可以**同時安裝，互為補充**。老師可以使用 Jamf Teacher 套用嚴格的課程限制，再切換到 Apple 課堂進行畫面監看。
`
      },
      {
        id: 'cls-4',
        question: '如何設定「限制描述檔 (Configuration Profile)」，禁止學生修改桌布或裝置名稱？',
        important: false,
        tags: ['限制', '桌布', '裝置名稱'],
        answer: `
**解決方案**：
透過單一的「限制描述檔」即可同時設定。

1.  登入 Jamf Pro > **裝置** > **設定描述檔** > 編輯「學生限制描述檔」。
2.  在左側承載資料 (Payload) 清單中找到 **「限制 (Restrictions)」**。
3.  **禁止修改桌布**：
    *   在 **「功能 (Functionality)」** 頁籤中，找到「桌布」相關選項。
    *   取消勾選 **「允許修改背景圖片 (Allow modifying wallpaper)」**。
4.  **禁止修改裝置名稱**：
    *   在同一個 **「功能 (Functionality)」** 頁籤中，找到「裝置名稱」相關選項。
    *   取消勾選 **「允許修改裝置名稱 (Allow modifying device name)」**。
5.  儲存並套用描述檔。iPad 收到設定後，對應的設定選項將會反灰或直接消失。
`
      },
      {
        id: 'cls-5',
        question: '如何設定 iPad 的「單一 App 模式 (Single App Mode)」，讓學生上課時只能用特定 App？',
        important: false,
        tags: ['單一App模式', '鎖定'],
        answer: `
**解決方案**：
此功能又稱「App 鎖定 (App Lock)」，可透過 **Jamf Teacher** 或直接在 **Jamf Pro** 中設定。

*   **透過 Jamf Teacher (由老師操作)**：
    1.  老師在 Jamf Teacher App 中建立或編輯一個「課程範本 (Lesson)」。
    2.  在「允許的 App (Allowed Apps)」中，只加入一個您希望學生使用的 App (例如 \`Kahoot!\`)。
    3.  上課時啟用此課程，學生 iPad 就會自動鎖定在該 App，無法跳出。

*   **透過 Jamf Pro (由管理者操作，用於長時間鎖定)**：
    1.  在 Jamf Pro 建立一個新的**設定描述檔**。
    2.  在左側承載資料 (Payload) 清單中選擇 **「單一 App 模式 (Single App Mode)」**。
    3.  點擊「設定」，在 App Bundle ID 欄位輸入該 App 的識別碼 (例如 \`com.apple.mobilesafari\`)。
    4.  儲存並將此描述檔指派給目標裝置。
    *   **注意**：此方法為強制鎖定，除非管理者移除描述檔，否則裝置將永遠鎖在該 App，請謹慎使用。
`
      },
      {
        id: 'cls-6',
        question: '如何透過 Jamf 限制學生在特定時段（如上課時間）只能瀏覽白名單網站？',
        important: false,
        tags: ['網站過濾', '白名單'],
        answer: `
**解決方案**：
使用 Jamf 的 **「內容過濾器 (Content Filter)」** 描述檔。

1.  在 Jamf Pro 建立一個新的**設定描述檔**。
2.  在左側承載資料 (Payload) 清單中選擇 **「內容過濾器」**。
3.  **設定過濾器**：
    *   **篩選器類型**：選擇 **「特定網站 (Specific Websites Only)」**。
    *   在 **「允許的 URL (Permitted URLs)」** 清單中，逐一加入允許瀏覽的網站網址。
4.  **設定時間限制 (非 Jamf 內建，需搭配其他工具)**：
    *   Jamf Pro 本身無法直接設定「時間觸發」的描述檔。若要實現此功能，管理者需要在上課時手動將此描述檔**指派**給學生群組，下課後再**取消指派**。
`
      },
      {
        id: 'cls-7',
        question: '如何關閉 iPad 的「專用 Wi-Fi 位址 (Private Wi-Fi Address)」以配合學校防火牆管理？',
        important: false,
        tags: ['Wi-Fi', 'MAC位址', '隨機化'],
        answer: `
**原因**：iPadOS 14 以上版本預設會為每個 Wi-Fi 網路產生一個隨機的 MAC 位址，這會導致學校的 MAC 位址白名單認證失效。

**解決方案**：
在 **Wi-Fi 設定描述檔** 中強制關閉此功能。

1.  登入 Jamf Pro > **裝置** > **設定描述檔**。
2.  編輯或新增一個 **「Wi-Fi」** 承載資料 (Payload)。
3.  在 Wi-Fi 設定頁面下方，找到並**勾選「停用關聯 MAC 位址隨機化 (Disable MAC Address Randomization)」**。
4.  儲存並套用描述檔。iPad 連接該 Wi-Fi 時，就會強制使用其**真實的硬體 MAC 位址**。
`
      },
      {
        id: 'cls-8',
        question: '如何設定 iPad 只能連接學校指定的 Wi-Fi，並禁止連接手機熱點？',
        important: false,
        tags: ['Wi-Fi限制', '熱點'],
        answer: `
**解決方案**：
透過組合兩個設定描述檔達成。

1.  **建立 Wi-Fi 描述檔**：
    *   建立一個包含學校 Wi-Fi SSID 與密碼的描述檔，並將其分發給所有裝置。
2.  **建立限制描述檔**：
    *   建立或編輯「學生限制描述檔」。
    *   在 **「限制 (Restrictions)」** 承載資料 (Payload) 中：
        *   勾選 **「連線至非管理式的Wi-Fi網路」**，並選擇限制。
    *   **效果**：此設定生效後，iPad 的 Wi-Fi 設定將會跟著變動，裝置只會自動連接您透過描述檔分發的網路。
`
      },
      {
        id: 'cls-9',
        question: '學生的 iPad 即使在「課堂」中顯示上線，但畫面監看一直是黑屏或權限不足，如何處理？',
        important: false,
        tags: ['黑屏', '權限', '故障排除'],
        answer: `
**原因**：
這是 Apple 課堂 App 的一個權限問題，通常發生在裝置重置或重新註冊後，監看畫面的授權沒有被正確觸發。

**解決方案**：
1.  **確認 PreStage 設定**：
    *   登入 Jamf Pro > **裝置** > **預先階段註冊**。
    *   在 **「一般」** 設定中，確認 **「課堂選項 (Classroom Options)」** 區塊的設定。
    *   確保 **「螢幕觀察權限 (Screen Observation Permission)」** 設定為 **「自動授予權限 (Automatically grant permission)」** 或 **「提示使用者授予權限 (Prompt for permission)」**。
2.  **重置課堂權限**：
    *   在 Jamf Pro 中找到該學生的裝置。
    *   發送遠端指令 **「更新資產 (Update Inventory)」**。
    *   有時，將該學生從「班級」中移除再重新加入，可以強制刷新權限。
3.  **手動觸發 (若設為提示)**：
    *   如果 PreStage 設為「提示」，請確認學生 iPad 在老師第一次嘗試監看時，是否有點選彈出視窗中的 **「永遠允許 (Always Allow)」**。
`
      },
      {
        id: 'cls-10',
        question: '如何設定主畫面佈局 (Home Screen Layout)，統一全校 iPad 的 App 排列方式？',
        important: false,
        tags: ['主畫面', '佈局'],
        answer: `
**解決方案**：
使用 **「主畫面佈局 (Home Screen Layout)」** 描述檔。

1.  在 Jamf Pro 建立一個新的**設定描述檔**。
2.  在左側承載資料 (Payload) 清單中選擇 **「主畫面佈局」**。
3.  **設計佈局**：
    *   **Dock**：將您希望固定在 Dock 上的 App（如 Safari, 設定）從右側 App 列表拖曳至下方 Dock 區。
    *   **頁面**：點擊 **「新增頁面」**，然後將 App 拖曳至頁面中，可建立資料夾並將 App 分類放入。
4.  儲存並將此描述檔指派給目標群組。
    *   **效果**：iPad 收到描述檔後，主畫面會被強制鎖定為您設計的佈局，學生無法移動或刪除 App 圖示。
`
      },
      {
        id: 'cls-11',
        question: '共享 iPad (Shared iPad) 模式是什麼？如何設定與登入管理式 Apple ID？',
        important: false,
        tags: ['共享iPad', 'Shared iPad'],
        answer: `
**概念**：
共享 iPad (Shared iPad) 是一種特殊的多使用者模式，允許多位學生使用**各自的管理式 Apple ID** 登入同一台 iPad。登入後，學生的 iCloud 雲碟、照片、App 資料會從雲端同步下來；登出後，資料會被移除，保護個人隱私。

**設定條件**：
*   iPad 必須為**受監管**狀態。
*   iPad 儲存空間**至少需 32GB**。

**設定步驟 (Jamf Pro)**：
1.  在 **PreStage 註冊** 的設定檔中：
    *   勾選 **「啟用共享 iPad (Enable Shared iPad)」**。
2.  **設定使用者數量**：
    *   您可以預設一個使用者數量上限，系統會為每個使用者預留儲存空間。
3.  **登入**：
    *   iPad 清除重置並套用此設定後，開機畫面會變為一個使用者列表。
    *   學生點選自己的名字（或輸入管理式 Apple ID）與密碼即可登入。
    *   另可設定 **「訪客模式 (Guest Mode)」**，提供臨時無帳號登入，登出後資料即清除。
`
      },
      {
        id: 'cls-12',
        question: '如何限制 iPad 的藍牙功能保持開啟，避免學生關閉導致「課堂」斷線？',
        important: false,
        tags: ['藍牙', '限制'],
        answer: `
**解決方案**：
透過**限制描述檔**來鎖定此設定。

1.  登入 Jamf Pro > 編輯「學生限制描述檔」。
2.  在 **「限制 (Restrictions)」** 承載資料 (Payload) > **「功能 (Functionality)」** 頁籤中：
    *   找到「藍牙」相關設定。
    *   取消勾選 **「允許修改藍牙設定 (Allow modifying Bluetooth settings)」**。
3.  **事前準備**：
    *   在分發此限制之前，**請務必先確認所有學生的 iPad 藍牙是開啟狀態**。
    *   因為此限制一旦生效，若藍牙剛好是關閉的，學生將無法自行將其打開，會造成無法連接狀態。
4.  儲存並套用描述檔。之後，學生在「設定」或「控制中心」中的藍牙開關將會反灰，無法關閉。
`
      },
      {
        id: 'cls-13',
        question: 'Jamf Teacher 的「App 鎖定 (App Lock)」與 Apple 課堂的「鎖定 App」有何不同？',
        important: false,
        tags: ['App Lock', '比較', 'Jamf Teacher'],
        answer: `
**核心差異**：
*   **Apple 課堂**：
    *   **即時性**：老師當下點選，學生 iPad 立即開啟並鎖定該 App。
    *   **解除**：老師點選解鎖，或下課鐘響、藍牙斷線，鎖定即解除。
    *   **適合**：隨堂測驗、臨時導讀。

*   **Jamf Teacher**：
    *   **持久性**：透過「課程 (Lesson)」設定。只要課程時間還在進行中，學生就算重開機、斷網，iPad 依然會被鎖定在該 App (透過 Web Clip 或背景派送描述檔)。
    *   **範圍**：可設定「白名單」，允許學生在 3-4 個 App 之間切換，而非只能鎖定 1 個。
    *   **適合**：長時間的各科測驗、期中考模式。
`
      },
      {
        id: 'cls-14',
        question: '如何使用 Jamf Teacher 進行「網頁鎖定」？(僅允許特定網站)',
        important: false,
        tags: ['Jamf Teacher', 'Web Lock', '白名單'],
        answer: `
**操作步驟**：
1.  開啟 **Jamf Teacher App**。
2.  建立或編輯一個課程 (Lesson)。
3.  在 **「允許的網站 (Allowed Websites)」** 區塊中：
    *   加入您允許學生瀏覽的 URL (如 \`kahoot.it\`, \`google.com\`)。
    *   **注意**：一旦啟用此課程，**Safari 將會隱藏所有其他書籤與網址列**，學生僅能瀏覽您清單中的網站。
4.  設定課程時間長度 (如 45 分鐘)。
5.  點選 **「開始 (Start)」**。所有學生的 iPad 將立即進入受限瀏覽模式。
`
      },
      {
        id: 'cls-15',
        question: 'Jamf Teacher 顯示「等待中 (Pending)」或學生無法收到指令？',
        important: false,
        tags: ['故障排除', 'Jamf Teacher', 'Pending'],
        answer: `
**Jamf Teacher 運作原理**：
它是透過 **網際網路 (Internet)** 與 Jamf Pro 伺服器溝通，再由伺服器發送 APNs 指令給學生 iPad。與 Apple 課堂 (藍牙) 不同。

**排查步驟**：
1.  **確認網路**：老師 iPad 與學生 iPad **都必須連上網際網路**。若學生斷網，就收不到指令。
2.  **確認推播 (APNs)**：檢查學校防火牆是否阻擋了 Apple 推播服務 (Port 5223)。
3.  **重新整理**：在 Jamf Teacher 介面下拉刷新，或請學生打開 **Jamf Student App** (若有安裝) 讓裝置主動回報狀態。
`
      },
      {
        id: 'cls-16',
        question: 'Jamf Teacher 可以限制學生的藍牙、相機或拼字檢查嗎？',
        important: false,
        tags: ['功能限制', 'Jamf Teacher'],
        answer: `
**可以**。這是 Jamf Teacher 的強項。

**設定方式**：
在建立課程 (Lesson) 時，進入 **「功能限制 (Restrictions)」** 選單，您可以一鍵開關以下功能：
*   **相機 (Camera)**：禁止拍照/錄影。
*   **拼字檢查 (Spell Check)**：英文考試時防止作弊。
*   **字典/定義 (Dictionary)**：防止查詢單字。
*   **AirDrop**：防止傳遞答案。
*   **Safari**：直接禁用瀏覽器。

這些限制僅在課程進行期間生效，課程結束後自動恢復。
`
      }
    ]
  }
]
