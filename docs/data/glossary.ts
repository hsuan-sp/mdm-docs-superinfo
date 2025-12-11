/**
 * 維護指南：
 * 1. 若要新增術語，請直接複製下方的 {...}區塊並貼在對應分類中。
 * 2. 修改存檔後，下次啟動 (npm run docs:dev) 會自動更新搜尋索引。
 */
export interface Term {
  term: string;
  category: 'Core' | 'Enrollment' | 'Apple' | 'Network' | 'Security' | 'Hardware' | 'Apps' | 'Other' | 'Education';
  definition: string;
  analogy: string; // "白話文/比喻"
}

export const glossaryData: Term[] = [
  // A
  {
    term: 'ABM (Apple Business Manager)',
    category: 'Apple',
    definition: 'Apple 商務管理。專為企業設計的網頁入口，集成了裝置註冊、內容購買、角色管理等功能，是企業部署 Apple 裝置的起點。',
    analogy: '企業的「數位總部」。註冊公司裝置、買 App、分派管理員權限都在這裡完成。'
  },
  {
    term: 'Activation Lock (啟用鎖定)',
    category: 'Security',
    definition: '一項防盜功能，與「尋找」功能連動。當裝置遺失或重置後，必須輸入原擁有者的 Apple ID 與密碼才能重新啟用。MDM 可透過代碼繞過此鎖定。',
    analogy: '防小偷的「數位大鎖」。就算小偷把平板偷走重灌，沒有原主人的帳號密碼也打不開，變磚頭一塊。'
  },
  {
    term: 'ACME (Automated Certificate Management Environment)',
    category: 'Security',
    definition: '自動憑證管理環境。一種通訊協定，用於自動化憑證的發發與安裝，簡化了設備身分驗證的流程。',
    analogy: '憑證的「自動販賣機」。設備需要身分證（憑證）時，不用人工審核，投幣（驗證）後自動發給你。'
  },
  {
    term: 'ADE (Automated Device Enrollment)',
    category: 'Enrollment',
    definition: '自動裝置註冊（舊稱 DEP）。讓新裝置在開機設定輔助程式中，自動向 MDM 伺服器報到並下載設定，實現零接觸部署。',
    analogy: '平板的「入學報到單」。一開機連上網，Apple 就會告訴它：「你是某某學校的財產，請去跟資訊組報到」，完全不用人手設定。'
  },
  {
    term: 'AirDrop',
    category: 'Core',
    definition: 'Apple 裝置專屬的無線傳輸技術，利用藍牙搜尋裝置，再透過 Wi-Fi 點對點快速傳輸檔案。',
    analogy: '數位「傳紙條」。不用連上網，手機對手機直接把照片或檔案丟過去，速度快又方便。'
  },
  {
    term: 'AirPlay',
    category: 'Core',
    definition: '無線串流技術。允許將 iOS/iPadOS 或 Mac 的畫面、音訊鏡像輸出至 Apple TV 或支援的顯示器上。',
    analogy: '無線「投影線」。不用接線，直接把小螢幕的畫面變魔術般投射到大電視上給全班看。'
  },
  {
    term: 'APNs (Apple Push Notification service)',
    category: 'Apple',
    definition: 'Apple 推播通知服務。MDM 伺服器與受管裝置之間通訊的必要橋樑，用於喚醒裝置以接收指令。',
    analogy: 'MDM 的「傳令兵」。MDM 不能直接對平板大吼大叫，一定要透過這個傳令兵（Apple）把指令送達。'
  },
  {
    term: 'Federated Authentication (聯合驗證)',
    category: 'Apple',
    definition: '讓使用者能使用現有的組織帳號（如 Google Workspace 或 Microsoft Entra ID）直接登入管理式 Apple ID，無需另外記憶一組密碼。',
    analogy: '「帳號通」。用公司的 Google 帳號就能直接開 Apple 的門，不用再多辦一張證件。'
  },
  {
    term: 'Apple ID',
    category: 'Apple',
    definition: 'Apple 生態系的使用者帳戶，用於存取 App Store、iCloud、iMessage 等所有 Apple 服務。',
    analogy: 'Apple 世界的「身分證」。'
  },
  {
    term: 'ASM (Apple School Manager)',
    category: 'Apple',
    definition: 'Apple 校務管理。專為教育機構設計的網頁入口，整合了 SIS 學生資訊系統、裝置指派與 VPP 內容購買。',
    analogy: '學校的「數位教務處」。所有學校買的平板、App 和師生帳號都要先在這裡登記列管。'
  },
  {
    term: 'Asset Tag (資產標籤)',
    category: 'Core',
    definition: '組織內部自行編列的設備編號，通常實體貼紙貼於機身，並記錄於 MDM 系統中以便盤點。',
    analogy: '財產上的「編號貼紙」。像是學校桌椅後面貼的那個銀色貼紙「110-學-001」，用來盤點這台平板是誰的。'
  },
  // B
  {
    term: 'Blueprint (藍圖)',
    category: 'Enrollment',
    definition: 'Apple Configurator 中的功能概念，指一組預先設定好的配置與 App，可一鍵套用至多台連接的裝置。',
    analogy: '設定平板的「模具」。刻好一個模具（包含所有設定），平板接上來，「啪」蓋下去，設定就全好了。'
  },
  {
    term: 'Brick (磚塊/死機)',
    category: 'Hardware',
    definition: '指裝置因軟體更新失敗或嚴重系統錯誤，導致無法開機或無反應，就像一塊磚頭一樣。',
    analogy: '「高科技紙鎮」。原本是先進的平板，現在因為系統壞掉，只能拿來壓紙或當磚塊墊桌腳。'
  },
  {
    term: 'Bundle ID',
    category: 'Apps',
    definition: 'Bundle Identifier。App 的唯一識別碼（如 com.apple.safari），MDM 透過此 ID 精確辨識與管理 App。',
    analogy: 'App 的「身分證字號」。世界上可能有很多 App 叫 "Calculator"，但 Bundle ID 絕對不會重複。'
  },
  {
    term: 'BYOD (Bring Your Own Device)',
    category: 'Other',
    definition: '自攜裝置。指允許員工或學生攜帶私人裝置進入組織網路，並進行有限度的管理與存取公司資源。',
    analogy: '「自備工具」。師傅帶自己的電鑽去工地工作，雖然是私人的，但在工地還是要遵守工地的安全規範。'
  },
  // C
  {
    term: 'Cache (快取)',
    category: 'Core',
    definition: '內容快取 (Content Caching)。macOS 內建功能，可暫存 App Store 更新或 iCloud 資料，加速區網內其他裝置的下載速度。',
    analogy: '學校的「糧倉」。常用的課本（App）先搬一堆放在學校糧倉，學生要領書直接去糧倉拿，不用每個人都跑去出版社（Apple）搬，節省對外頻寬。'
  },
  {
    term: 'Cellular (行動網路版)',
    category: 'Hardware',
    definition: '指具備行動通訊模組（SIM 卡插槽或 eSIM）的 iPad 機型，可透過電信訊號獨立上網。',
    analogy: '「可插卡版」。像手機一樣，走到哪都有網路，不用到處找 Wi-Fi。'
  },
  {
    term: 'Certificate (憑證)',
    category: 'Security',
    definition: '數位憑證 (Digital Certificate)。用於驗證通訊雙方身分及建立加密連線的電子文件，是 MDM 安全運作的基礎。',
    analogy: '數位世界的「印鑑證明」。證明「我是我」，確保沒人冒充 Jamf 伺服器來騙你的平板，確保通訊安全。'
  },
  {
    term: 'Classroom App (Apple 課堂)',
    category: 'Apps',
    definition: 'Apple 專為教師設計的 iPad/Mac App，提供課堂管理功能，如監看學生畫面、鎖定 iPad、導引開啟特定 App。',
    analogy: '各科老師的「隨堂助教」。老師在講台上，可以直接看到台下每一位同學的平板畫面，確認大家有沒有專心上課，還能一鍵幫大家開課本（App）。'
  },
  {
    term: 'Content Filter (內容過濾)',
    category: 'Security',
    definition: '數位學習精進方案中的關鍵組件（如 Jamf Trust）。用於攔截色情、暴力或賭博等不當網頁，並記錄流量以計算「使用率」。',
    analogy: '校園網路的「守門員」。就像學校警衛會檢查訪客一樣，它會檢查你要去的網站，壞網站不准進，同時記錄你今天有來上學（有產生流量）。'
  },
  {
    term: 'COPE (Corporate-Owned, Personally Enabled)',
    category: 'Other',
    definition: '公司擁有的個人化裝置。組織配發裝置給員工，允許一定程度的私人用途，但組織保有完全管理權。',
    analogy: '「配車」。公司配給你一台車，上班要開去送貨（公務），但下班允許你開去買菜（私人），前提是不能違規改裝。'
  },
  {
    term: 'CSR (Certificate Signing Request)',
    category: 'Security',
    definition: '憑證簽署請求。在申請正式數位憑證前，需先產生的一段加密文字，包含申請者的公開金鑰與身分資訊。',
    analogy: '「申請書」。你要申請印鑑證明（憑證），要先填好這張申請書，蓋上你的私章，再拿去給戶政事務所（Apple）核發。'
  },
  // D
  {
    term: 'DEP Token (伺服器權杖)',
    category: 'Security',
    definition: '正式名稱為 MDM Server Token。用於驗證 MDM 伺服器與 ASM/ABM 之間的信任關係，允許同步 ADE 裝置資料。需每年更新。',
    analogy: '給 ASM 戶政事務所的「委託書」。你要委託 MDM 幫你去 Apple 那邊把新買的平板領回來納管，就要這張有效期限一年的委託書。'
  },
  {
    term: 'Device Enrollment',
    category: 'Enrollment',
    definition: '裝置註冊。傳統的 MDM 註冊方式，適用於組織擁有的裝置，提供廣泛的管理權限。',
    analogy: '這台車是「公務車」。整台車都是公司的，公司可以隨時查看、管理、甚至收回。'
  },
  {
    term: 'DFU Mode',
    category: 'Hardware',
    definition: 'Device Firmware Update Mode。裝置韌體更新模式，是比復原模式更底層的救援狀態，用於在系統嚴重損壞時強制重灌韌體。',
    analogy: '平板的「加護病房」。當平板病入膏肓（系統掛點），連普通急診（復原模式）都救不了時，就要送進這裡強制電擊（重灌）。'
  },
  {
    term: 'Digital Learning Enhancement Plan (中小學數位學習精進方案)',
    category: 'Education',
    definition: '教育部推動的重大政策（俗稱生生用平板）。目標是達成「班班有網路，生生用平板」，提供載具、內容與管理系統（MDM）的全面支援。',
    analogy: '教育界的「基礎建設工程」。就像蓋高速公路一樣，政府鋪設網路、發平板、架設管理系統，讓數位學習可以順暢通行。'
  },
  {
    term: 'Dongle (轉接器)',
    category: 'Hardware',
    definition: '泛指各種介面轉換器。如 USB-C 轉 HDMI、Lightning 轉 3.5mm 耳機孔等配件。',
    analogy: '「翻譯蒟蒻」。平板講中文（USB-C），投影機講英文（HDMI），中間插這根才能溝通。'
  },
  // E
  {
    term: 'eSIM',
    category: 'Hardware',
    definition: 'Embedded SIM。嵌入式 SIM 卡，直接焊接於裝置主機板上的虛擬 SIM 卡晶片，無需插拔實體卡片即可啟用行動網路。',
    analogy: '「數位門號」。不用去電信行拿小卡片插進去，掃個 QR Code 手機就有訊號了。'
  },
  // G
  {
    term: 'Global Proxy (全域代理)',
    category: 'Network',
    definition: '強制裝置所有的網路流量（HTTP/HTTPS）都必須經過指定的代理伺服器 (Proxy) 進行轉發與檢查。',
    analogy: '高速公路的「唯一檢查站」。不管你的車（流量）要去哪裡，一定要經過這個站點檢查蓋章，不能走其他小路。'
  },
  // J
  {
    term: 'JSS (Jamf Software Server)',
    category: 'Core',
    definition: 'Jamf Pro 系統的核心管理伺服器（現多稱 Jamf Pro Server）。負責儲存裝置清單、發送指令與接收回報。',
    analogy: 'MDM 的「大腦」或「指揮中心」。所有指令都是從這裡發出去的，它也記得每一台平板叫什麼名字、剩多少電。'
  },
  {
    term: 'Jamf Trust',
    category: 'Apps',
    definition: '一款安全性 App，需安裝於載具上以執行內容過濾與網路防護。在精進方案中，此 App 的運作狀態直接影響「使用率」的計算。',
    analogy: '平板的「通行證檢查站」。這款 App 必須一直開著（背景執行），才能幫你過濾網站並證明你有在使用平板。如果不小心關掉，就像翹課一樣，教育部會以為你沒在上課（使用率為零）。'
  },
  // K
  {
    term: 'Kiosk Mode (導覽機模式)',
    category: 'Apps',
    definition: '即單一 App 模式 (Single App Mode)。將 iOS 裝置鎖定在單一應用程式前台運作，停用 Home 鍵與多工手勢。',
    analogy: '「展場導覽模式」。像你去博物館看到的平板，只能按導覽頁面，不能跳出來上網或玩遊戲。'
  },
  // L
  {
    term: 'Lightning Connector',
    category: 'Hardware',
    definition: 'Apple 獨有的 8-pin 傳輸與充電介面，曾廣泛用於 iPhone 與舊款 iPad，現逐漸被 USB-C 取代。',
    analogy: '「蘋果舊款接頭」。只能插蘋果裝置，跟外面通用的線不相容。'
  },
  {
    term: 'Lost Mode (遺失模式)',
    category: 'Security',
    definition: 'MDM 安全功能。啟用後會鎖定裝置螢幕，顯示自訂遺失訊息與聯絡電話，並強制回報裝置地理位置。',
    analogy: '「緊急封鎖令」。平板不見了，馬上遠端鎖死它，並要在螢幕上顯示「這是我掉的，請打電話給我」，同時瘋狂回報位置。'
  },
  // M
  {
    term: 'MAC Address (MAC 位址)',
    category: 'Network',
    definition: 'Media Access Control Address。網路介面卡的的實體位址，是裝置在網路層的唯一硬體識別碼。',
    analogy: '網卡的「身分證字號」。全世界唯一，用來在網路上辨識這台機器是誰。'
  },
  {
    term: 'Managed Apple ID (管理式 Apple ID)',
    category: 'Apple',
    definition: '由組織（ASM/ABM）建立與擁有的 Apple ID。與個人 Apple ID 不同，其功能受限（如無法購買 App），專用於公務與教學協作。',
    analogy: '學校配發的「公務帳號」。專門用來教學和協作，權限由資訊組長控管，不能像私人帳號那樣隨意下載付費軟體。'
  },
  {
    term: 'MDM (Mobile Device Management)',
    category: 'Core',
    definition: '行動裝置管理系統。一種利用設定檔與指令，對智慧型裝置進行遠端設定、監控、部署與維護的技術架構。',
    analogy: '學校的「資訊組長」。坐在辦公室透過電腦系統，統一管理全校所有的平板，不用一台一台與老師借來設定。'
  },
  // N
  {
    term: 'Night Shift',
    category: 'Hardware',
    definition: 'iOS/macOS 功能。根據時間或日落自動調整螢幕色溫至暖色調，減少藍光對眼睛的刺激。',
    analogy: '螢幕的「護眼模式」。晚上把刺眼的藍光濾掉，變黃一點讓你好睡一點。'
  },
  // O
  {
    term: 'OTA (Over-The-Air)',
    category: 'Core',
    definition: '空中傳輸。指透過無線通訊網路（Wi-Fi 或行動網路）傳送軟體更新、設定檔或指令，無需實體連接線。',
    analogy: '「隔空傳送」。不用把平板收回來插線，直接用網路發送命令解決問題。'
  },
  // P
  {
    term: 'Passcode Policy (密碼原則)',
    category: 'Security',
    definition: 'MDM 安全策略。強制要求使用者設定符合特定複雜度（如長度、英數混合）的螢幕解鎖密碼。',
    analogy: '「門禁卡設定規定」。規定你的密碼一定要設幾位數以上，太簡單的像 1234 不能用，確保安全。'
  },
  {
    term: 'Payload (承載資料)',
    category: 'Core',
    definition: '設定描述檔 (Profile) 中的最小設定單元。這可以是一個 Wi-Fi 設定、一個電子郵件帳戶或一項功能限制。',
    analogy: '資訊組長發的「設定檢核表」。錦囊（描述檔）是整張表，Payload 就是上面勾選的一個個項目：「要連學校Wi-Fi」、「不能自行安裝遊戲」。'
  },
  {
    term: 'Pending Command (擱置的指令)',
    category: 'Core',
    definition: '指 MDM 已發出但裝置尚未接收或執行的指令。通常發生於裝置離線、關機或被鎖定時。',
    analogy: '「未讀訊息」。老闆用 Line 傳訊息給你，但你手機沒開，訊息就掛在那邊（Pending）等你開機連網才看得到。'
  },
  {
    term: 'PreStage Enrollment',
    category: 'Enrollment',
    definition: 'Jamf Pro 功能術語。用於定義 ADE 裝置在開機設定助理 (Setup Assistant) 階段的行為，如跳過特定步驟或強制自動安裝。',
    analogy: '新生入學的「報到關卡設定」。決定平板第一次開機時要跳過哪些廢話畫面、要不要自動裝軟體。'
  },
  {
    term: 'Private Wi-Fi Address (私有 Wi-Fi 位址)',
    category: 'Network',
    definition: 'iOS 隱私功能。裝置在連接不同 Wi-Fi 網路時，會自動隨機產生假的 MAC 位址，以防止被網路營運商追蹤。',
    analogy: '網路上的「假名」。去咖啡廳連 Wi-Fi 時用假名，老闆就不知道你昨天也來過。但在學校這會導致網管不認識你，連不上網（所以通常在學校要關掉）。'
  },
  {
    term: 'Profile (設定描述檔)',
    category: 'Core',
    definition: 'Configuration Profile。一個 XML 格式的檔案（.mobileconfig），包含了將載入到裝置上的設定與授權資訊。',
    analogy: '給平板的「錦囊妙計」。平板接收並安裝這個錦囊（描述檔），就知道該連哪個 Wi-Fi、相機該不該鎖起來。'
  },
  {
    term: 'Provisioning (佈建)',
    category: 'Other',
    definition: '指將全新裝置從拆箱、註冊、設定到安裝軟體，直到交付給使用者隨時可用的完整準備過程。',
    analogy: '「新機整備」。從新員工（平板）報到、領識別證、開帳號到分配座位的整個流程，準備好讓人立刻可以直接上工。'
  },
  {
    term: 'Push Notification (推播通知)',
    category: 'Core',
    definition: '推播通知。MDM 透過 APNs 發送給裝置的喚醒訊號，指示裝置連線回伺服器檢查新指令。',
    analogy: '資訊組長廣播「請注意」。MDM 發出訊號，平板收到後就會醒來接收新的指令。'
  },
  // R
  {
    term: 'Recovery Mode (復原模式)',
    category: 'Hardware',
    definition: 'iOS 裝置的一種故障排除模式。當標準系統無法啟動時，可進入此模式連接電腦進行系統還原或更新。',
    analogy: '平板的「急診室」。系統怪怪的或密碼忘記時，進來這裡掛號，醫生（電腦）幫你重裝系統。'
  },
  {
    term: 'Remote Wipe (遠端清除)',
    category: 'Security',
    definition: 'MDM 安全指令。強制清除受管裝置上的所有資料與設定，將其回復至出廠預設狀態。',
    analogy: '「遠端格式化」。確認平板找不回來或要換人用了，遠端按個鈕，裡面照片資料瞬間清空，變回新機狀態。'
  },
  {
    term: 'Renew Certificate (更新憑證)',
    category: 'Security',
    definition: '更新數位憑證的過程。MDM 推播憑證通常有一年效期，必須在過期前進行更新，否則通訊會中斷。',
    analogy: '「換發通行證」。這張證件只有一年效期，過期前要去換一張新的，不然警衛（Apple）就不讓你進去辦公了。'
  },
  {
    term: 'Return to Service',
    category: 'Enrollment',
    definition: 'iPadOS 17+ 新功能。允許 MDM 在發送清除指令時附帶 Wi-Fi 設定，讓裝置重置後能自動連網並重新註冊。',
    analogy: '「投胎轉世但帶著記憶」。平板喝了孟婆湯（重置）忘記所有資料，但還記得 Wi-Fi 密碼，所以能馬上連線回來找 MDM 報到。'
  },
  {
    term: 'Roaming (漫遊)',
    category: 'Network',
    definition: '無線漫遊。當行動裝置在不同無線基地台 (AP) 覆蓋範圍移動時，自動切換至訊號較佳的 AP 而不中斷連線的能力。',
    analogy: '「基地台接力賽」。你走到哪，哪邊的基地台就接手服務你，網路不會因為走動而斷掉。'
  },
  // S
  {
    term: 'SCEP (Simple Certificate Enrollment Protocol)',
    category: 'Security',
    definition: '簡易憑證註冊協定。一種網路協定，讓裝置能自動向憑證授權中心 (CA) 申請並取得數位憑證，無需人工介入。',
    analogy: '「線上自動辦證」。平板自己透過網路去跟發證中心申請身分證，不用人跑櫃台。'
  },
  {
    term: 'Self Service',
    category: 'Apps',
    definition: 'Jamf Pro 的自助服務 App。一個企業內部的 App Store，讓使用者自行安裝經 IT 核准的 App 或執行維護腳本，無需管理員密碼。',
    analogy: '學校專屬的「福利社」。架上都是老師挑選好的 App，學生可以自己進去拿（下載），不用花錢也不需審核。'
  },
  {
    term: 'Shared iPad (共享 iPad)',
    category: 'Apps',
    definition: 'Apple 教育功能。允許多位學生使用各自的「管理式 Apple ID」登入同一台 iPad，並保有個人的資料與學習進度。',
    analogy: '「公用電腦」模式。雖然大家輪流用同一台平板，但每個人登入後看到都是自己的桌面和檔案，不會跟別人的混在一起。'
  },
  {
    term: 'Sideloading (側載)',
    category: 'Apps',
    definition: '側載。不透過官方 App Store，而是使用安裝檔（.ipa）直接將應用程式安裝到裝置上的行為。通常需透過 Configurator 或企業憑證。',
    analogy: '「走後門」安裝。不走正門（App Store）審核下載，直接把 App 檔案塞進平板裡。'
  },
  {
    term: 'Single App Mode (單一 App 模式)',
    category: 'Apps',
    definition: 'MDM 限制功能。將裝置鎖定在單一 App 中運行，並封鎖其他功能、按鈕與手勢。常用於考試或 kiosk 場景。',
    analogy: '「鎖定模式」。平板把你關進一個房間（App），門鎖死，考完試之前絕對出不去，不能偷看小抄（其他App）。'
  },
  {
    term: 'Smart Group (智慧型群組)',
    category: 'Core',
    definition: 'Jamf Pro 中的動態群組。系統根據預設條件（如：iOS 版本舊於 17.0）自動將符合的裝置加入群組。',
    analogy: '「自動分類帽」。不用人工分班，只要設定條件（例如：沒更新的人），系統會自動把符合條件的平板抓進這個群組。'
  },
  {
    term: 'SSID',
    category: 'Network',
    definition: 'Service Set Identifier。無線網路的名稱識別碼，即我們在 Wi-Fi 清單中看到的名稱。',
    analogy: 'Wi-Fi 的「名字」。你在清單上看到的「TP-Link_5G」或「School-WiFi」就是 SSID。'
  },
  {
    term: 'Static Group (靜態群組)',
    category: 'Core',
    definition: 'Jamf Pro 中的固定群組。成員清單固定，需由管理員手動新增或移除裝置。',
    analogy: '「固定名冊」。資訊組長手動建立的名單，例如「五年級自然科用機」，除非手動改，否則名單不會變。'
  },
  {
    term: 'Supervision (受監管)',
    category: 'Core',
    definition: '受監管模式。這是一種更高等級的裝置管理狀態，通常透過 ADE 或 Configurator 啟用。它允許 MDM 執行更多深層控制（如全域代理、單一 App 模式）。',
    analogy: '平板的「完全公務模式」。一旦受監管，這台機器就是學校的資產，不再是個人的玩具，學校擁有絕對的控制權。'
  },
  // T
  {
    term: 'Tethering (個人熱點)',
    category: 'Network',
    definition: '網路分享功能。允許裝置將自身的行動網路連線透過 Wi-Fi、藍牙或 USB 分享給其他裝置使用。',
    analogy: '手機開「熱點」。把你的手機變成一台 Wi-Fi 機，分網路給平板或筆電用。'
  },
  {
    term: 'True Tone (原彩顯示)',
    category: 'Hardware',
    definition: 'Apple 顯示技術。利用感測器偵測環境光色溫，自動調整螢幕顯示顏色，使其在不同光源下看起來更自然。',
    analogy: '螢幕的「變色龍」功能。在黃光下螢幕變黃一點，白光下變白一點，讓你看起來像在看紙張一樣舒服。'
  },
  // U
  {
    term: 'USB-C',
    category: 'Hardware',
    definition: 'Universal Serial Bus Type-C。新一代通用序列匯流排介面，支援高速傳輸、影像輸出與充電。已成為新款 iPad 與 Mac 的標準接孔。',
    analogy: '「萬用插孔」。跟筆電、安卓手機通用的插孔，插隨身碟、接螢幕都很方便，不用再找轉接頭。'
  },
  {
    term: 'User Enrollment',
    category: 'Enrollment',
    definition: '使用者註冊。專為 BYOD 設計的註冊模式，將使用者個人資料與工作資料分區隔離，在保護隱私的前提下進行有限管理。',
    analogy: '在你的私人手機上租一個「獨立辦公室」。學校只能管辦公室裡的東西（公事），管不到你私人的照片和 Line。'
  },
  // V
  {
    term: 'VPN (Virtual Private Network)',
    category: 'Network',
    definition: '虛擬私人網路。透過加密通道將裝置連線至私有網路，確保資料傳輸安全，或用於存取內部資源。',
    analogy: '網路上的「專用加密隧道」。雖然走在公共道路上，但我們蓋了一條隧道，外面的人看不到你在裡面傳送什麼。'
  },
  {
    term: 'VPP (Volume Purchase Program)',
    category: 'Apple',
    definition: '大量採購計畫（現整合於 ASM/ABM「App 與書籍」）。允許組織批量購買應用程式授權，並透過 MDM 分派給裝置或使用者。',
    analogy: 'App 的「團購批發」。學校一次買 100 個授權，然後分給 100 台平板用，不用每個人自己付錢。'
  },
  {
    term: 'VPP Token (伺服器權杖)',
    category: 'Security',
    definition: '正式名稱為 Content Token。用於驗證 MDM 伺服器與 ASM/ABM 內容購買系統之間的權限，允許 MDM 分派購買的 App。需每年更新。',
    analogy: '去好事多 (Costco) 的「會員卡」。MDM 要去 Apple「批貨」下載 App，一定要出示這張會員卡，Apple 才會讓你搬貨。'
  },
  // W
  {
    term: 'Wallpaper (桌布)',
    category: 'Core',
    definition: '裝置的主畫面與鎖定畫面背景。在教育現場，統一桌布常用於識別「公用載具」或「特定年級」，MDM 可強制鎖定不讓學生隨意更換。',
    analogy: '學校的「制服」。為了管理方便與視覺整齊，學校規定大家的平板都要穿一樣的衣服（桌布），不能自己亂換成偶像照片。'
  },
  {
    term: 'Web Clip',
    category: 'Core',
    definition: '網頁捷徑。MDM 可派送至裝置主畫面的一個圖示，點擊後會在瀏覽器中開啟指定的 URL 網頁。',
    analogy: '放在桌面的「網頁書籤」。長得像 App 圖示，但點開來其實是連到學校官網或教學平台的網頁。'
  },
  // Z
  {
    term: 'Zero-Touch Deployment',
    category: 'Enrollment',
    definition: '零接觸部署。結合 ASM 與 MDM，讓裝置從拆箱開機起，自動完成註冊與設定，IT 人員完全無需接觸裝置。',
    analogy: '「開箱即用」。新平板寄到老師手上，撕開膠膜開機，所有學校設定自動跑出來，完全不用麻煩資訊組長一台台設定。'
  }
];
