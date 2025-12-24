/**
 * 維護指南 (2025/12/11 更新)：
 * 1. 本表已更新至 2025 年底最新技術標準。
 * 2. 定義區塊大幅擴充，旨在讓無背景知識的新手也能理解技術脈絡。
 * 3. 包含 Apple 裝置管理、網路基礎、Jamf 生態系與通用 IT 術語。
 */

export interface Term {
  term: string;
  category: ('Core' | 'Enrollment' | 'Apple' | 'Network' | 'Security' | 'Hardware' | 'Apps' | 'Other' | 'Education' | 'Jamf' | 'macOS')[];
  definition: string;
  analogy: string; // "白話文/比喻"
}

export const glossaryData: Term[] = [
  // --- 8 ---
  {

    term: '802.1X',

    category: ['Network'],

    definition: '802.1X。IEEE 的網路存取控制標準。裝置需透過憑證或帳密驗證才能連上企業 Wi-Fi 或有線網路。通常搭配 RADIUS 伺服器進行身分驗證，可防止未授權裝置接入內網。',

    analogy: '就像「網路通行證檢查站」。要連上公司 Wi-Fi 不是輸入密碼就好，而是要出示你的數位身分證（憑證），檢查站確認是員工才放行，路人拿不到證就進不來。'

  },

  // --- A ---
  {

    term: 'AAS (Automatic Assessment Configuration)',

    category: ['Education'],

    definition: '自動評量設定。這是一種專為高風險標準化測驗設計的 iOS/iPadOS 框架。當支援 AAS 的測驗 App 執行時，系統會自動進入鎖定狀態，暫時停用字典、拼字檢查、截圖、錄影以及所有通知功能，確保考生無法作弊。測驗結束後，裝置會自動恢復原狀，無需 IT 人員手動解鎖。',

    analogy: '就像「自動考場結界」。一旦考卷發下來（App 開啟），桌上的課本和小抄自動消失，耳朵也被塞住聽不到隔壁打暗號；交卷後，結界自動解除，一切恢復正常。'

  },
  {

    term: 'ABM (Apple Business Manager)',

    category: ['Apple'],

    definition: 'Apple 商務管理。這是企業管理 Apple 裝置的最高層級入口網站（數位資產的源頭）。它串聯了裝置採購來源（確保裝置屬於公司）、內容購買（大量 App 授權）以及人員帳號管理（管理式 Apple ID）。MDM 伺服器必須與 ABM 串接，才能證明其對裝置的合法管理權。',

    analogy: '就像企業的「數位總司令部」。所有新買的裝備（裝置）、糧草（App）和兵籍資料（帳號）都必須先在這裡列冊，才能分發給底下的連隊（MDM）去指揮。'

  },
  {

    term: 'Account-Driven Device Enrollment',

    category: ['Enrollment'],

    definition: '帳號驅動裝置註冊。這是 2025 年主流的註冊方式，取代了傳統掃描 QR Code 或手動下載描述檔的流程。使用者只需在「設定」>「一般」>「VPN 與裝置管理」中登入公司的管理式 Apple ID，系統便會自動引導完成 MDM 註冊流程，將公私資料分離。',

    analogy: '就像「識別證報到法」。不用填寫繁瑣的入職表格，只要刷一下公司發的識別證（登入帳號），系統就知道你是誰，並自動配發辦公所需的權限與工具。'

  },
  {

    term: 'ACME (Automated Certificate Management Environment)',

    category: ['Security'],

    definition: '自動憑證管理環境。這是一種通訊協定，用於自動化處理數位憑證的申請、驗證、簽發與更新。在現代 MDM 管理中（尤其是配合 Managed Device Attestation），ACME 取代了部分傳統 SCEP 流程，確保裝置身分憑證永遠保持最新且有效，無需人工介入。',

    analogy: '就像「憑證自動續約機器人」。它會盯著你的數位身分證，快過期時自動幫你跑腿去換發新證，你完全不用擔心證件過期失效。就像自動繳費一樣，不用自己記日期。'

  },
  {

    term: 'Activation Lock (啟用鎖定)',

    category: ['Security'],

    definition: '啟用鎖定。這是一種硬體層級的防盜機制，預設與「尋找 (Find My)」功能綁定。當裝置被重置或清除後，必須輸入原使用者的 Apple ID 與密碼才能重新啟用。這對企業 IT 是一把雙面刃：它能防盜，但若員工離職未登出，會導致裝置變磚。MDM 可透過託管機制攔截此鎖定。',

    analogy: '就像「認主人的數位大鎖」。就算小偷把手機拿去重灌洗掉資料，開機時鎖頭還是認得原主人的指紋。如果沒有主人的鑰匙（密碼），這台機器就只能當磚頭。'

  },
  {

    term: 'Activation Lock Bypass Code',

    category: ['Security'],

    definition: '啟用鎖定略過代碼。當受監管 (Supervised) 裝置開啟啟用鎖定後，MDM 伺服器會自動與 Apple 伺服器溝通並備份一組特殊的解鎖代碼。當員工離職未解鎖裝置時，IT 人員可輸入此代碼來代替原使用者的密碼，強制解除鎖定以回收裝置。',

    analogy: '就像房東的「萬能備用鑰匙」。房客（員工）搬走了卻鎖著門沒還鑰匙，房東（公司）可以用這把備用鑰匙把門打開，重新整理房子租給下一個人。'

  },
  {

    term: 'ADE (Automated Device Enrollment)',

    category: ['Enrollment'],

    definition: '自動裝置註冊（前身為 DEP）。這是 Apple 企業管理的黃金標準。當裝置序列號被經銷商加入 ABM 後，裝置在「開機設定助理 (Setup Assistant)」階段且連網的瞬間，就會強制下載 MDM 設定檔並受管。這是唯一能實現「零接觸部署 (Zero Touch)」且使用者無法自行移除管理權限的方式。',

    analogy: '就像「出生證明上的印記」。這台裝置從工廠出貨那一刻起，DNA 裡就寫著它是公司的財產。不管重灌幾次，一開機它就會自動導航回公司報到，完全逃不掉。'

  },
  {

    term: 'Admin Account (管理者帳號)',

    category: ['Security'],

    definition: '管理者帳號。擁有作業系統最高權限的使用者，可以安裝任何軟體、修改系統核心設定、讀取所有檔案。在受管環境中，IT 通常會剝奪一般使用者的 Admin 權限，僅保留一組隱藏的 IT 專用 Admin 帳號，以落實最小權限原則。',

    analogy: '就像「整棟大樓的管理員」。他有權拆牆、換鎖、趕人走。一般員工只是「房客」，只能裝飾自己的房間，不能動大樓結構。'

  },
  {

    term: 'AirDrop',

    category: ['Core'],

    definition: 'AirDrop。Apple 專有的近場傳輸技術，利用藍牙進行廣播發現裝置，再透過 Wi-Fi Direct 建立高頻寬點對點通道傳輸檔案。由於不經過網際網路，傳輸速度極快且隱密，但也常成為資料外洩的漏洞。',

    analogy: '就像數位「隔空傳物」。不需要透過郵局（網路）寄信，直接把檔案揉成紙團丟給隔壁的人，速度快但要離得夠近才行。'

  },
  {

    term: 'AirDrop for Business',

    category: ['Security'],

    definition: '商務 AirDrop 管理。MDM 可透過限制設定，將 AirDrop 鎖定為「僅限管理式聯絡人」或完全停用。這能防止員工將公司機密文件透過 AirDrop 傳送到私人的 iPhone 或路人的裝置上，同時允許公務裝置間互相傳輸。',

    analogy: '就像「公務專用傳送門」。規定上班時間傳遞公文，只能傳給佩戴公司識別證的同事，系統會自動阻擋傳給外面不認識的路人。'

  },
  {

    term: 'AirPlay',

    category: ['Core'],

    definition: 'AirPlay。Apple 的無線串流協定，可將影音無損投放到 Apple TV 或支援的螢幕上。在企業與教育環境，MDM 可預先設定 AirPlay 權限或密碼，防止閒雜人等隨意搶佔投影畫面。',

    analogy: '就像「隱形 HDMI 線」。不用找轉接頭和線材，手指一滑，畫面就直接飛到大電視上。'

  },
  {

    term: 'AirPrint',

    category: ['Core'],

    definition: 'AirPrint。一種免驅動程式的列印技術。只要印表機支援此協定並在同個網段，Apple 裝置就能直接列印。MDM 可透過 AirPrint Payload 預先將印表機資訊推送到裝置上，讓使用者無需搜尋即可列印。',

    analogy: '就像「隨插即印」。不需要安裝光碟或驅動程式，手機只要看到印表機點頭打招呼，就能直接命令它開始工作。'

  },
  {

    term: 'Always-on VPN',

    category: ['Network'],

    definition: '全時 VPN。一種強制性的網路安全策略。裝置一旦偵測到網路連線，就會自動在背景建立 VPN 通道回公司內網。如果 VPN 連線失敗，系統甚至可以設定切斷所有網路流量 (Lockdown)，確保沒有任何數據在未加密的情況下傳輸。',

    analogy: '就像「無塵室專用通道」。不管你去哪裡出差，只要一踏出門，公司就派一輛防彈專車接送。你絕對不可能自己走路（使用公共網路），確保途中沒人能竊聽。'

  },
  {

    term: 'APNs (Apple Push Notification service)',

    category: ['Apple'],

    definition: 'Apple 推播服務。這是 MDM 運作的心臟。MDM 伺服器無法直接「命令」裝置，必須先發送訊號給 Apple 的 APNs 伺服器，再由 APNs「叫醒」裝置去向 MDM 伺服器報到並領取指令。若此連線中斷，MDM 將完全失效。',

    analogy: '就像「郵局通知系統」。MDM 伺服器就像公司總部，裝置就像員工的家。總部不能直接跑到每個員工家門口喊話，而是透過郵局（Apple）寄出掛號信，郵差會去按員工家的門鈴說：「有公司來信，請回辦公室領取任務！」'

  },
  {

    term: 'App Config (App Configuration)',

    category: ['Apps'],

    definition: 'App 設定配置（Managed App Configuration）。MDM 利用 XML 格式的 Key-Value 參數，在派送 App 的同時注入設定值。例如：派發 Email App 時直接填入伺服器位址、使用者帳號，甚至鎖定特定功能。這讓使用者打開 App 就能直接工作，無需手動設定。',

    analogy: '就像「填好資料的報名表」。發給你的表格上面已經把名字、地址、電話都打字印好了，你只要簽名（打開 App）就可以直接交卷。'

  },
  {

    term: 'AppleCare+',

    category: ['Hardware'],

    definition: 'AppleCare+。Apple 的延長保固與意外損壞保險服務。提供2-3年硬體保固與優先技術支援,並涵蓋意外損壞（摔機、入水）的維修折扣服務。組織可透過 ASM/ABM 大量購買並管理 AppleCare+ 授權。',

    analogy: '就像「保險加值包」。不只延長保固期，還包含意外險。iPad 不小心摔破了，付少許自負額就能換新螢幕，不用全額賠償。'

  },
  {

    term: 'Apple Classroom (Apple 課堂)',

    category: ['Education'],

    definition: 'Apple 課堂。這是專為教師設計的課堂管理工具（基於藍牙與 Wi-Fi）。老師可以直接查看學生的 iPad 畫面（螢幕監控）、將全班鎖定在特定 App（導引使用）、一鍵開啟網頁或傳送檔案。它不需要 MDM 伺服器持續介入，是老師現場控班的神器。',

    analogy: '就像「教室遙控器」。老師站在講台上，手裡拿著萬能遙控器，按一下全班課本打開到第十頁，再按一下全班平板鎖住專心聽講，還能隨時抽查誰在偷看漫畫。'

  },
  {

    term: 'Apple Configurator',

    category: ['Core'],

    definition: 'Apple Configurator。這是一款 Mac 應用程式，主要用於「物理連接」管理。當裝置發生嚴重錯誤需要重刷系統（Revive/Restore），或是需要將非 ADE 管道購買的裝置手動加入 ABM（裝置分派）時，必須透過 USB 線連接此工具進行操作。',

    analogy: '就像「原廠維修工作台」。當無線管理失效，或者要把不明來源的裝置收編為正規軍時，就把裝置接上線，送上這個工作台進行深度改造。'

  },
  {

    term: 'Apple Intelligence Management',

    category: ['Security'],

    definition: 'Apple Intelligence 管理。隨著 iOS 18+/macOS 15+ 引入生成式 AI 功能，MDM 新增了相關限制能力。企業可管控是否允許 AI 分析螢幕內容、是否允許將資料傳送至 Private Cloud Compute，以及是否啟用 Writing Tools，以防企業敏感資料被 AI 模型讀取。',

    analogy: '就像「AI 秘書的保密協定」。公司配給你一個超強 AI 秘書，但老闆規定這個秘書不准偷看機密文件，也不准把公司會議記錄傳回總部去訓練大腦。'

  },
  {

    term: 'Apple Intelligence Reports (AI 報告管理)',

    category: ['Security'],

    definition: 'Apple Intelligence 報告管理。MDM 可控制是否允許裝置生成 AI 使用摘要與分析報告。在高風險環境（如考場）中，管理員可停用 Safari 摘要或郵件智慧摘要，防止 AI 代替人工閱讀與總結。',

    analogy: '就像「禁止代看懶人包」。老闆規定你要自己看書，不准助理（AI）幫你寫簡報大綱，這樣才能確定你真的有讀進去。'

  },
  {

    term: 'Apple Pencil',

    category: ['Hardware'],

    definition: 'Apple Pencil。Apple 的電容式觸控筆,專為 iPad 設計。支援壓力感應、傾斜角度偵測與低延遲書寫體應。第二代支援無線充電與雙擊手勢切換工具。MDM 可透過限制設定停用 Apple Pencil 的雙擊功能。',

    analogy: '就像專業繪圖師的「數位畫筆」。不只能寫字，還能感應你按多大力、筆桿傾斜角度，讓畫出來的線條就像用真實畫筆一樣自然。'

  },
  {

    term: 'Apple Silicon',

    category: ['Hardware'],

    definition: 'Apple 晶片 (M1/M2/M3/M4...)。Apple 自行研發的 ARM 架構處理器。除了效能強大，其安全架構與 Intel Mac 完全不同。它引入了「磁碟擁有者 (Volume Owner)」概念，進行系統更新或降低安全性設定時，需要使用者實體驗證，這對 MDM 的全自動化管理流程帶來了新的挑戰與變革。',

    analogy: '就像「蘋果自家引擎」。這不僅是換了引擎讓車跑更快，連車子的啟動鑰匙和防盜系統都重新設計了，舊的修車工具（管理方法）可能不再適用。'

  },
  {

    term: 'App Store',

    category: ['Apps'],

    definition: 'App Store。Apple 的官方軟體市集。在受監管裝置上，MDM 可以完全隱藏 App Store 圖示，禁止使用者自行下載任何軟體，僅允許透過公司的自助服務 (Self Service) 安裝經審核的 App。',

    analogy: '就像「官方百貨公司」。公司可以規定員工不能去逛百貨公司亂買東西，只能去公司內部的福利社領取文具。'

  },
  {

    term: 'ARD (Apple Remote Desktop)',

    category: ['Core'],

    definition: 'Apple Remote Desktop。這是一套歷史悠久的 Mac 區域網路管理軟體。雖然現代 MDM 已接管大部分設定，但 ARD 在「即時螢幕監控/控制」、「大量檔案複製」與「UNIX 指令群發」方面仍有其便利性，常作為 MDM 的輔助工具。',

    analogy: '就像「廣播教學系統」。就像學校電腦教室老師用的那套系統，可以瞬間把畫面切給全班看，或是偷看誰在玩接龍，還能一鍵幫全班關機。'

  },
  {

    term: 'ASM (Apple School Manager)',

    category: ['Apple'],

    definition: 'Apple 校務管理。這是教育機構專用的 ABM 版本。除了具備 ABM 的裝置與購買功能外，ASM 還整合了學生資訊系統 (SIS)，可自動建立「管理式 Apple ID」、班級名冊 (Roster) 與講師資料，是推動 Apple 教育應用的基礎資料庫。',

    analogy: '就像學校的「數位教務處」。這裡掌管全校師生的數位學籍，誰是老師、誰是學生、誰在哪個班級，全部都在這裡設定好，然後同步給平板使用。'

  },
  {

    term: 'Asset Tag (資產標籤)',

    category: ['Core'],

    definition: '資產標籤。這通常指企業內部定義的財產編號（非 Apple 序號）。MDM 可以將此編號寫入裝置的系統資訊中，並強制顯示在鎖定畫面上 (Lock Screen Message)，方便 IT 人員盤點或撿到遺失裝置時辨識歸屬。',

    analogy: '就像「財產編號貼紙」。就像公司椅子底下貼的那張條碼，證明這是公司的第幾號財產，只是我們把它數位化貼在螢幕上。'

  },

  // --- B ---
  {

    term: 'Battery Health (電池健康度)',

    category: ['Hardware'],

    definition: '電池健康度。顯示裝置鋰電池相較於全新狀態的最大蓄電容量百分比。iOS/iPadOS 可在「設定」>「電池」>「電池健康度」查看。MacOS 則透過「系統資訊」查詢。MDM 可遠端查閱此數據以進行老化裝置的汰換規劃。',

    analogy: '就像汽車的「電瓶檢測表」。新車電瓶100%，用久了剩80%，代表充飽電後的續航力只剩八成。IT可以看哪些裝置電池衰退該換了。'

  },
  {

    term: 'Bootstrap Token',

    category: ['Security'],

    definition: '引導代幣。這是 macOS 用來解決 FileVault 加密與安全帳號建立權限的關鍵機制。當第一位使用者啟用加密後，系統會生成此 Token 並託管給 MDM。MDM 隨後可用此 Token 授權其他帳號登入，或在無需密碼的情況下進行系統更新。',

    analogy: '就像「系統管理授權鑰匙」。第一個設定電腦的人把管理權限的備份鑰匙託管給 IT 部門（MDM）保管。之後 IT 可以用這把鑰匙授權新員工使用電腦，或者在沒有使用者在場的情況下執行系統維護。'

  },
  {

    term: 'Bundle ID',

    category: ['Apps'],

    definition: 'Bundle Identifier。這是 App 在作業系統中的唯一身分證字號（格式如 com.google.chrome）。MDM 進行 App 黑名單/白名單控管、設定派送或 VPN 綁定時，都是認這個 ID，而不是認 App 的顯示名稱。',

    analogy: '就像App 的「身分證字號」。世界上可能有一百個人叫「張偉」（App 名稱），但身分證字號（Bundle ID）只有一個。警察（MDM）抓人是看身分證字號，才不會抓錯人。'

  },
  {

    term: 'BYOD (Bring Your Own Device)',

    category: ['Enrollment'],

    definition: '自攜裝置。員工使用私人購買的設備來處理公務。透過「使用者註冊 (User Enrollment)」模式，企業只能管理「工作容器 (Work Container)」內的 App 與資料（如公司郵件），完全無法觸及員工的私人照片、簡訊或安裝的遊戲，達成隱私與安全的平衡。',

    analogy: '就像「私車公用」。你開自己的車去幫公司送貨。公司可以在後車廂裝一個上鎖的保險箱（工作區）放公文，但公司無權翻你的手套箱，也不能管你下班開車去哪裡玩。'

  },

  // --- C ---
  {

    term: 'CDN (Content Delivery Network)',

    category: ['Network'],

    definition: '內容傳遞網路。由教育部與 Apple 合作建置的本地緩存系統（如台灣學術網路 TANet CDN）。它將熱門的 App 或系統更新檔存放在離學校最近的節點，大幅減少跨國下載流量，提升全校性更新的成功率。',

    analogy: '就像「巷口福利社」。以前買文具要走一個小時去大書局（Apple 總部），現在巷口就有教育部的文具店（CDN），隨走隨買，不用怕排隊。'

  },
  {

    term: 'Certificate (憑證)',

    category: ['Security'],

    definition: '數位憑證。這是一種電子檔案，用來證明身分或加密通訊。在 MDM 環境中，憑證無所不在：Wi-Fi 連線需要憑證驗證是否為公司裝置、MDM 與 APNs 通訊需要憑證、派送 App 需要憑證簽章。憑證過期是導致服務中斷最常見的原因。',

    analogy: '就像「數位印鑑證明」或「通行證」。去銀行辦事要印鑑證明，進管制區要通行證。如果這張紙過期了或印章蓋錯了，警衛就會把你擋在門外，不管你解釋再多都沒用。'

  },
  {

    term: 'Certificate Authority (CA)',

    category: ['Security'],

    definition: '憑證授權中心。負責簽發與管理數位憑證的信任機構。CA 會驗證申請者身分後簽發憑證，其他裝置信任此 CA 的根憑證後，就會信任所有由它簽發的憑證。企業常自建内部 CA。',

    analogy: '就像「身分證發證中心」。戶政事務所（CA）發給你身分證（憑證）並蓋章。其他單位看到這個章就知道「這是政府認證的身分」，不會是假證。'

  },
  {

    term: 'Command History',

    category: ['Core'],

    definition: 'Command History（指令歷史）。MDM 伺服器對特定裝置發送過的所有指令記錄，包含指令類型、發送時間、執行狀態（成功/失敗/待處理）與錯誤訊息。用於排除故障與稽核管理動作。',

    analogy: '就像「操作日誌」。記錄IT對這台裝置下過哪些指令：「5/10 10:30 安裝App成功」、「5/11 14:00 鎖定裝置失敗:裝置離線」。可追蹤歷史操作和問題原因。'

  },
  {

    term: 'Compliance',

    category: ['Security'],

    definition: 'Compliance（合規性）。裝置是否符合組織安全政策的狀態檢查。例如「必須開啟加密」、「禁止越獄」、「密碼需12碼」。MDM 可設定合規條件，不合規的裝置會被拒絕存取公司資源或觸發告警。',

    analogy: '就像「健康檢查表」。設定一份標準「必須打疫苗、不能發燒」，每台裝置都要過檢。不符合的就暫時不能進辦公室，直到改善為止。'

  },
  {

    term: 'Composer',

    category: ['macOS', 'Jamf'],

    definition: 'Composer。Jamf 提供的免費封裝工具。IT 可用它監控軟體安裝前後的檔案系統變化，自動生成 .pkg 或 .dmg 安裝套件。這讓非 Mac App Store 的軟體也能透過 MDM 批量部署。',

    analogy: '就像「安裝程式錄影機」。記錄軟體安裝過程中複製了哪些檔案到哪些資料夾，然後把整個過程打包成一鍵安裝包，讓其他電腦也能自動完成相同安裝。'

  },
  {

    term: 'Content Caching (內容快取)',

    category: ['Network'],

    definition: '內容快取。這是 macOS 內建的一項強大功能。開啟後，這台 Mac 會將下載過的 iCloud 資料、iOS 更新檔、App Store 軟體暫存起來。同個區域網路內的其他 Apple 裝置要下載相同內容時，會直接從這台 Mac 抓取，不再佔用對外頻寬，極大化加速部署效率。',

    analogy: '就像「區域分發倉庫」。不用每個人都親自跑去台北總公司（Apple 伺服器）領貨，只要有一個人領過，就會放在辦公室的倉庫（快取 Mac）裡，其他人直接去倉庫拿，省時又省油錢。'

  },
  {

    term: 'Custom B2B App',

    category: ['Apps'],

    definition: 'Custom B2B App（自訂企業 App）。透過 Apple Business Manager 私密發布的企業專屬 App，不會出現在公開 App Store。僅限組織內部使用者透過 VPP 授權取得，適合內部工具或客製化業務系統。',

    analogy: '就像「企業內部專用軟體」。這個App不會在App Store公開賣，只有公司員工能下載安裝。外人搜尋不到也裝不了，專門給內部使用的工具。'

  },

  // --- D ---
  {

    term: 'DDM (Declarative Device Management)',

    category: ['Core'],

    definition: '宣告式裝置管理。這是繼傳統 MDM 之後的下一代管理架構（MDM 2.0）。傳統 MDM 是伺服器「命令」裝置做動作，效率低且延遲高；DDM 則是伺服器發送「規則書（宣告）」給裝置，裝置會自主監控狀態，一旦符合條件（例如：版本過舊），裝置會「自己」採取行動（例如：主動回報或執行更新），大幅減輕伺服器負擔並提升反應速度。',

    analogy: '就像「自動駕駛模式」。以前是教練（伺服器）一個口令一個動作：「左轉、踩煞車」；現在是給車子（裝置）導航和規則：「看到紅燈要停，目的地是公司」。車子會根據路況自己判斷該怎麼開，不用每秒都問教練。'

  },
  {

    term: 'DDM (Declarative Device Management)',

    category: ['Core'],

    definition: '宣告式裝置管理。Apple 於 2021 推出的新一代 MDM 架構。MDM 不再逐條發送命令，而是發送「宣告」（Declarations）描述裝置應達到的狀態。裝置會自主監控並維持該狀態，大幅降低伺服器負載與網路流量。2025年為主流趨勢。',

    analogy: '就像「目標管理」取代「微觀指令」。以前是老闆每天交辦「早上打掃、中午整理、下午檢查」，現在只說「辦公室要保持整潔」，員工自己檢查並維持，不用老闆一直盯。'

  },
  {

    term: 'DDM App Management (宣告式 App 管理)',

    category: ['Apps'],

    definition: '宣告式 App 管理。基於 DDM 架構的應用部署。由裝置自主負責 App 的下載、重試與健康監控。若 App 被刪除，裝置會主動偵測並重新安裝，不再需要 MDM 伺服器巡檢與重複下令。',

    analogy: '就像「自動補貨福利社」。只要架子上（平板）少了某樣零食（App），員工（裝置）會自己去倉庫載，不用老闆天天打電話來問貨還在不在。'

  },
  {

    term: 'Deprecated (已棄用)',

    category: ['Other'],

    definition: '已棄用。指某項技術或功能已被原廠（Apple）標記為過時，雖然目前版本可能尚可使用，但在未來的系統更新中將被移除。IT 人員看到此標籤應立即著手規劃遷移至新技術。',

    analogy: '就像「拆除預告」。這棟危樓雖然還沒倒，但政府已經貼了紅單，隨時會拆。如果你還住在裡面（使用舊技術），得趕快找新房子搬家，不要等到怪手來了才哭。'

  },
  {

    term: 'Device Group (裝置群組)',

    category: ['Core'],

    definition: '裝置群組。將裝置進行分類的容器。分為「靜態群組 (Static)」：手動把裝置拉進來，名單固定；以及「智慧型群組 (Smart)」：設定條件（如：電量低於 20%、未安裝 Office），系統會自動將符合條件的裝置撈進來，是自動化管理的基礎。',

    analogy: '就像「手動分班」與「能力分班」。靜態群組是照座號分班，誰在哪班早就定好；智慧群組是照成績分班，這次考差了（不符規定的裝置）就會自動被踢到放牛班去補修。'

  },
  {

    term: 'DFU Mode (Device Firmware Update)',

    category: ['Hardware'],

    definition: '裝置韌體更新模式。這是比恢復模式 (Recovery Mode) 更底層的救援狀態。當裝置作業系統完全損壞、卡在白蘋果或無法開機時，進入 DFU 模式可以繞過作業系統直接與硬體通訊，強制重刷韌體。螢幕通常是全黑的。',

    analogy: '就像「電擊急救」。病人（裝置）已經沒有呼吸心跳（系統死當），吃藥打針都沒用，這時只能送進加護病房用電擊器（DFU）強制重啟心跳。'

  },
  {

    term: 'Directory Service (目錄服務)',

    category: ['Network'],

    definition: '目錄服務（如 LDAP, Active Directory）。這是儲存企業所有使用者帳號、密碼、群組與電腦資訊的中央資料庫。傳統 Mac 會「綁定 (Bind)」AD，但現代做法已轉向使用 Platform SSO 或 Jamf Connect 同步雲端身分 (IdP)，不再直接加入網域。',

    analogy: '就像「全公司的戶籍資料庫」。裡面記著誰是誰、住哪裡、權限多大。以前電腦要拉專線去查戶口，現在都改成雲端連線查詢了。'

  },
  {

    term: 'DMG (Disk Image)',

    category: ['macOS'],

    definition: 'DMG。macOS 的磁碟映像檔格式。就像一個虛擬光碟，雙擊後會掛載成一個磁碟機，裡面包含 App 或安裝程式。常見用途是軟體發佈（使用者拖曳 App 到「應用程式」資料夾完成安裝）。',

    analogy: '就像「虛擬光碟片」。以前軟體用光碟安裝，現在用DMG檔。點開後會出現一個磁碟機圖示，裡面有安裝程式，用完再退出光碟就好。'

  },
  {

    term: 'DNS (Domain Name System)',

    category: ['Network'],

    definition: 'DNS。網域名稱系統。將網址（如 apple.com）翻譯成 IP 位址（如 17.253.144.10）的服務。MDM 可設定裝置使用特定 DNS 伺服器（如公司內部 DNS 或 1.1.1.1），或透過 DNS Proxy 過濾惡意網站。',

    analogy: '就像「網路電話簿」。你想打給「蘋果公司」，不用背它的電話號碼（IP），只要查電話簿（DNS）就會告訴你號碼是多少，直接幫你轉接過去。'

  },

  // --- E ---
  {

    term: 'Domain Capture (域名擷取)',

    category: ['Apple', 'Security'],

    definition: '域名擷取。Apple 校務管理中的一項安全功能。當學校驗證其 Email 網域後，可以將所有使用該網域註冊的個人 Apple ID 識別出來，並要求使用者將其轉換為管理式帳號或更改 Email。這確保了組織對所有含學校網域識別碼的帳號擁有最終控制權。',

    analogy: '就像「收編非正規車輛」。本來有人私下把自家車漆成校車顏色（用學校 Email 註冊個人帳號），現在學校規定：凡是漆成校車顏色的都要登記（納入管理），不想登記的就要把漆刷掉（換 Email）。'

  },
  {

    term: 'eSIM',

    category: ['Hardware'],

    definition: '嵌入式 SIM 卡。直接焊接在裝置主機板上的數位 SIM 卡，無需實體插拔。MDM 可透過 Carrier Payload 遠端配置 eSIM 方案，讓企業大規模部署行動網路 iPad/iPhone 時，省去分發幾千張實體小卡片的惡夢。',

    analogy: '就像「虛擬門號」。不用再拿迴紋針在那邊戳小洞換卡片了，掃個描或按個按鈕，手機就有訊號能上網。'

  },
  {

    term: 'Extension Attribute (擴充屬性)',

    category: ['Core'],

    definition: '擴充屬性（Jamf 專用語）。MDM 預設只能讀取標準硬體資訊（如序號、IP）。擴充屬性允許管理員撰寫 Script (Bash/Python) 來收集「客製化」資訊，例如：檢查某個特定檔案是否存在、電池健康度百分比、或是上次備份時間。',

    analogy: '就像「客製化問卷」。原本的體檢表只量身高體重（標準資訊），但你想知道員工「有沒有吃早餐」或「心情好不好」，就可以設計這個欄位去問，讓管理員更了解裝置狀況。'

  },

  // --- F ---
  {

    term: 'Face ID',

    category: ['Hardware'],

    definition: 'Face ID。Apple 的 3D 臉部辨識技術，使用 TrueDepth 相機投射超過 30,000 個紅外光點建立臉部深度圖。支援解鎖裝置、Apple Pay 授權與 App 登入。MDM 可強制要求特定 App 必須使用 Face ID 驗證。',

    analogy: '就像「臉部指紋鎖」。手機會記住你的臉型立體結構（不是平面照片），連雙胞胎都能分辨。看一眼就解鎖，不用輸入密碼。'

  },
  {

    term: 'Federated Authentication (聯合驗證)',

    category: ['Apple'],

    definition: '聯合驗證。這是將 ABM 與企業的身分提供者 (IdP，如 Google Workspace 或 Azure AD) 連結的機制。設定後，員工可以使用原本的公司 Email 和密碼登入管理式 Apple ID，無需另外記憶一組 Apple 專用密碼。',

    analogy: '就像「帳號通」。像去很多網站可以用「Facebook 登入」一樣。員工用公司原本的帳號密碼，就能直接通關進入 Apple 的世界，不用再辦一張新的身分證。'

  },
  {

    term: 'FileVault',

    category: ['Security'],

    definition: 'FileVault。macOS 內建的全磁碟加密技術 (FDE)。啟用後，硬碟上的所有資料都會被高強度加密 (XTS-AES-128)。在開機登入前，硬碟是一堆亂碼。MDM 強制啟用 FileVault 是企業資安合規的基本要求，防止筆電遺失後資料被取出。',

    analogy: '就像「整台電腦的保險箱」。如果不開這個功能，小偷只要把硬碟拔出來接上轉接線，所有秘密都看光光。開了 FileVault，硬碟就像鎖在保險箱裡，沒有密碼鑰匙，小偷拿到的只是一塊廢鐵。'

  },
  {

    term: 'Firmware',

    category: ['Hardware'],

    definition: 'Firmware（韌體）。儲存在硬體晶片中的底層軟體，負責硬體初始化與基本控制。如 Mac 的 EFI/iBoot、iPhone 的 Baseband。韌體更新可修補安全漏洞或改善硬體相容性。',

    analogy: '就像「硬體的作業系統」。比一般軟體更底層，直接控制晶片運作。就像冰箱的控制程式，決定壓縮機怎麼動、溫度怎麼調，偶爾也需要更新修bug。'

  },
  {

    term: 'Firmware Password',

    category: ['macOS'],

    definition: '韌體密碼。Mac 的開機層級密碼,儲存在 EFI/T2 晶片中。設定後，必須輸入密碼才能從外接裝置開機、進入復原模式或重置 NVRAM。可防止未授權人員繞過系統進入單人模式竊取資料。',

    analogy: '就像「BIOS密碼鎖」。不只是作業系統密碼，而是連開機都要先過這一關。沒有這個密碼，就算拿隨身碟想重灌系統都不行，卡在最底層。'

  },

  // --- G ---
  {

    term: 'Gatekeeper',

    category: ['Security'],

    definition: '守門員。macOS 的安全機制，預設會阻擋未經 Apple 公證 (Notarized) 或未簽署的應用程式執行。這能有效防止使用者不小心安裝偽裝成正常軟體的惡意程式。IT 可透過 MDM 調整其嚴格程度，但不建議關閉。',

    analogy: '就像「大樓警衛」。有人要進大樓（執行程式）時，警衛會檢查他有沒有掛識別證（數位簽章）。如果是來路不明的人，警衛直接擋在門口不讓進。'

  },
  {

    term: 'Global Proxy',

    category: ['Network'],

    definition: '全域代理。一種嚴格的網路設定，強制受管裝置的「所有」網路流量（HTTP/HTTPS）都必須經過指定的代理伺服器 (Proxy)。這常用於學校或高安全機構進行內容過濾與流量監控，但容易造成某些不支援 Proxy 的 App 連線失敗。',

    analogy: '就像「唯一檢查哨」。規定這座城市所有進出的車輛，不論要去哪，都必須先開進這個檢查站受檢。如果檢查站塞車或關門，全城的交通就癱瘓了。'

  },

  // --- I ---
  {

    term: 'Identity Provider (IdP)',

    category: ['Security'],

    definition: '身分認證提供者 (如 Azure AD/Entra ID, Okta, Google)。這是現代企業驗證使用者身分的雲端服務。現代 MDM 高度依賴 IdP 來進行 SSO 登入、自動建立使用者帳號與權限分配。',

    analogy: '就像「數位身分發證中心」。就像戶政事務所或護照局，他是權威機構，他說你是誰，你就是誰。其他系統都信任他發的證件。'

  },
  {

    term: 'Install Later',

    category: ['Core'],

    definition: '稍後安裝。MDM 發送更新指令的一種策略。系統會先在背景下載更新檔，但不會立即中斷使用者工作，而是等待夜間充電或使用者主動點擊時才進行安裝。這是減少使用者反感的最佳實務。',

    analogy: '就像「預約更新」。先把更新檔偷偷搬回家放著，等主人睡覺了再來敲敲打打裝修，這樣就不會吵到主人工作。'

  },

  // --- J ---
  {

    term: 'Jamf Connect',

    category: ['Security', 'Jamf'],

    definition: 'Jamf Connect。一款用於解決 Mac 本機帳號與雲端身分 (IdP) 密碼同步問題的軟體。它取代了傳統的 AD 綁定，讓使用者用 Google 或 Azure 的密碼登入 Mac，並確保兩邊密碼永遠一致。現在正逐漸整合進 Platform SSO 技術中。',

    analogy: '就像「雲端鑰匙同步器」。以前公司改密碼，電腦密碼不會跟著變，登入都會失敗。裝了這個，你在雲端改了密碼，它會自動幫你把電腦門鎖的密碼也一起換掉。'

  },
  {

    term: 'jamfHelper',

    category: ['macOS', 'Jamf'],

    definition: 'jamfHelper。Jamf 內建的輕量級對話框工具。IT 可透過腳本呼叫它顯示訊息視窗、按鈕選項或進度條，用於通知使用者軟體更新、收集使用者輸入或顯示政策執行狀態。',

    analogy: '就像「系統彈窗產生器」。IT可以用指令叫出一個視窗，上面寫「電腦需要重新啟動」並顯示倒數計時，讓使用者知道發生什麼事。'

  },
  {

    term: 'Jamf Pro',

    category: ['Core', 'Jamf'],

    definition: 'Jamf Pro。業界市佔率最高的 Apple 裝置管理解決方案 (MDM)。以其強大的腳本擴充能力 (Scripting)、API 整合性與 Smart Group 邏輯聞名，被視為 Apple 管理的黃金標準，適合中大型企業與高階教育需求。',

    analogy: '就像「蘋果艦隊的旗艦指揮官」。功能最齊全、外掛最多、能管的細節最精細的超級管家。雖然設定比較複雜，但幾乎沒有它做不到的事。'

  },
  {

    term: 'Jamf Protect',

    category: ['Security', 'Jamf'],

    definition: 'Jamf Protect。專為 Mac 設計的端點防護系統 (Endpoint Security)，功能類似進階版防毒軟體。它利用 Apple 原生的 Endpoint Security Framework 來監控惡意行為，而不像傳統防毒軟體那樣拖慢系統效能。',

    analogy: '就像「專懂 Mac 的保鑣」。一般防毒軟體像外來的傭兵，穿著厚重盔甲（耗資源）且動作笨重。Jamf Protect 像受過忍者訓練的貼身保鑣，輕裝上陣，平常感覺不到他在，但在威脅出現的瞬間就會出手攔截。'

  },
  {

    term: 'iPhone Mirroring (iPhone 鏡像)',

    category: ['macOS', 'Security'],

    definition: 'iPhone 鏡像。macOS 15 的新功能，允許在 Mac 螢幕上完全遠端操作 iPhone。MDM 可停用此功能以防止在公用電腦上洩漏個人隱私，或防止透過此管道規避某些 Mac 端的水印或稽核軟體。',

    analogy: '就像「電腦裡的虛擬手機」。你可以直接在電腦螢幕上滑手機、回簡訊，但這對公司的電腦來說，就像是一個無法監控的隱藏小視窗，所以有些公司會為了安全把它鎖起來。'

  },
  {

    term: 'JSON (JavaScript Object Notation)',

    category: ['Other'],

    definition: 'JSON。一種輕量級的資料交換格式，易於閱讀與編寫。在 MDM 管理中，API 的溝通、App Config 的設定、以及進階的報告數據，幾乎都是使用 JSON 格式。看懂 JSON 是現代管理員的必備技能。',

    analogy: '就像「電腦界的通用語言」。就像英文是國際通用語，不同系統（MDM 和其他軟體）要講話溝通，大家約定好都用 JSON 這種格式來講，才不會雞同鴨講。'

  },

  // --- K ---
  {

    term: 'Kernel Extension (Kext)',

    category: ['Core'],

    definition: '核心擴充功能（已棄用）。這是舊版 macOS 用於驅動硬體或執行防毒軟體的底層外掛。由於它權限過高（Ring 0），一旦崩潰會導致整台電腦當機 (Kernel Panic)。Apple 已在 Apple Silicon 時代全面封殺 Kext，強制開發者改用 System Extension。',

    analogy: '就像「大腦植入晶片」。以前為了讓身體（電腦）學新技能，直接在腦漿（核心）裡插晶片。雖然效果好，但晶片一短路，人就直接昏迷（當機）。現在已經禁止這種危險手術了。'

  },
  {

    term: 'Keychain (鑰匙圈)',

    category: ['Security'],

    definition: '鑰匙圈。macOS 與 iOS 內建的加密資料庫，用來儲存使用者的網站密碼、Wi-Fi 密碼、私鑰與數位憑證。使用者不需記住每一組密碼，只需記住登入密碼，系統就會自動從鑰匙圈填入對應資訊。',

    analogy: '就像「貼身密碼本」。你把所有的銀行密碼、信箱密碼都寫在這本本子裡，然後把本子鎖在保險箱。你要用的時候，系統管家會幫你翻開本子填密碼，不用你自己背。'

  },

  // --- L ---
  {

    term: 'LAPS (Local Administrator Password Solution)',

    category: ['Security'],

    definition: '本機管理員密碼解決方案。這是一種資安機制，確保每台電腦的本機管理員帳號 (Local Admin) 使用「隨機、唯一且定期輪替」的密碼，並將密碼儲存在 MDM 或目錄服務中。這能防止駭客猜到一組通用密碼後，橫向感染所有電腦。',

    analogy: '就像「自動換鎖系統」。以前所有房間的鑰匙都一樣，一把鑰匙開萬門。LAPS 則是每天自動把每扇門的鎖換成不同的新密碼，就算小偷今天偷到這間的鑰匙，也開不了隔壁的門，甚至明天鑰匙就失效了。'

  },
  {

    term: 'NIST Benchmarks (資安基準)',

    category: ['Security', 'Education'],

    definition: 'NIST 行動裝置資安基準。由美國國家標準與技術研究院制定的資安框架，2025 年起被教育部採納作為學習載具的安檢指標。包含 6 碼複雜密碼、自動更新強制、資料不落地等。',

    analogy: '就像「數位消防安檢標準」。每間學校的平板都要通過這套標準：滅火器（防毒）有沒有準備、逃生口（更新）有沒有通、防火牆（加密）有沒有蓋好，通過了才能上線。'

  },
  {

    term: 'Platform SSO (PSSO)',

    category: ['Security', 'macOS'],

    definition: '平台單一登入。Apple 在 macOS 13+ 引入的新技術，旨在取代傳統 AD 綁定。PSSO 讓 Mac 本機帳號直接與雲端 IdP（如 Entra ID）同步。2025 年新版更支援了 FileVault 解鎖，使用者輸入一次帳密即可完成開機到登入的所有流程。',

    analogy: '就像「一卡通通行」。不用一張門卡開大門，另一張鑰匙開辦公室。PSSO 讓你一張卡（一組帳密）就搞定從進公司到坐下辦公的所有權限驗證。'

  },
  {

    term: 'RCS (Rich Communication Services)',

    category: ['Network'],

    definition: '豐富通訊服務。新型態的簡訊標準，支援傳輸高畫質圖片、讀取回條與打字狀態。iOS 18 起支援。MDM 可停用此服務以減少學生的社交干擾，同時保留基本的安全通訊。',

    analogy: '就像「加強版簡訊」。以前簡訊只能傳純文字（SMS），現在可以像 Line 一樣傳照片、貼圖，還能看到對方有沒有已讀。'

  },
  {
    term: 'SCIM (System for Cross-domain Identity Management)',
    category: ['Apple'],
    definition: '身分管理系統。一種用於在不同系統（如 ASM 與 Google Workspace/Entra ID）之間同步使用者帳號的標準。支援自動建立、更新與停用帳號。',
    analogy: '就像「自動員工清單」。當人事系統增加一個人，所有辦公室系統、MDM 的帳號都會自動跟著開好，不用一個個點。'
  },
  {
    term: 'Lightning Connector',

    category: ['Hardware'],

    definition: 'Lightning 連接埠。Apple 於 2012-2023 年使用的專屬介面（已於 2023 年被 USB-C 取代）。支援數據傳輸與充電，但傳輸速度較慢（USB 2.0）。舊款 iPad 與 iPhone 仍使用此介面。',

    analogy: '就像「舊款專屬插頭」。只有 Apple 裝置能用，插頭不分正反面都能插。但速度比較慢，現在新機型都改用 USB-C 了。'

  },

  // --- M ---
  {

    term: 'MAC Address',

    category: ['Network'],

    definition: 'MAC Address（媒體存取控制位址）。網路卡的全球唯一硬體識別碼，格式如 A1:B2:C3:D4:E5:F6。路由器可依 MAC Address 分配固定 IP 或限制存取。部分 MDM 用它來追蹤裝置身分，但 iOS 15+ 會隨機化 MAC 以保護隱私。',

    analogy: '就像網路卡的「身分證字號」。每張網路卡出廠都有獨一無二的編號，路由器看到這個號碼就知道是誰的裝置，可以分配專屬IP或阻擋。'

  },
  {

    term: 'Managed Apple ID (管理式 Apple ID)',

    category: ['Apple'],

    definition: '管理式 Apple ID。由企業或學校在 ABM/ASM 中建立的 Apple 帳號。與個人 Apple ID 不同，它歸組織所有，IT 人員可重置密碼、稽核資料，且預設停用了「尋找」、「錢包」與「App Store 購買」等消費性功能，專注於協作與雲端儲存。',

    analogy: '就像「公務帳號」。這是公司發給你的，不是你自己的。你可以用它來存公文（iCloud）、開會，但不能拿去買遊戲，而且離職時帳號會被公司收回。'

  },
  {

    term: 'Managed Device Attestation',

    category: ['Security'],

    definition: '受管裝置認證。這是 Apple 強化零信任架構的新功能。裝置利用安全晶片 (Secure Enclave) 生成加密證明，向伺服器證明「我是真的 Apple 裝置，不是模擬器，且我沒有被越獄」。伺服器驗證通過後才發給連線憑證。',

    analogy: '就像「數位驗身」。這不只是看你的識別證（軟體資訊），還要驗你的指紋和視網膜（硬體加密證明），確定你是真的本人，不是戴著人皮面具的間諜，才准你進公司。'

  },
  {

    term: 'Managed Open In',

    category: ['Security'],

    definition: '管理式開啟 (Managed Open In)。這是一項 DLP (資料外洩防護) 功能。MDM 可設定邊界，禁止「受管 App (如公司 Email)」的文件被「非受管 App (如個人 Line)」開啟。這能有效阻止員工將公司機密檔案轉傳到私人社交軟體。',

    analogy: '就像「公文不落地」。規定公司的機密文件只能在公司的桌子上（受管 App）閱讀，禁止帶回家或拿到外面的咖啡廳（私人 App）去打開。'

  },
  {

    term: 'MDM (Mobile Device Management)',

    category: ['Core'],

    definition: '行動裝置管理。這是一種主從式架構 (Client-Server)，允許 IT 管理員透過無線網路 (OTA) 對分散在各地的行動裝置進行監控、設定派送、軟體安裝與安全清除。它是現代企業管理大量 Apple 裝置的唯一解法。',

    analogy: '就像「遠端遙控總管」。就像是孫悟空頭上的緊箍咒加上導航系統。唐三藏（管理員）在千里之外念個咒語（指令），孫悟空（裝置）就得乖乖聽話，不管是戴上帽子（安裝 App）還是原地待命（鎖定）。'

  },

  // --- N ---
  {

    term: 'N-1 Strategy',

    category: ['Core'],

    definition: 'N-1 策略。一種穩健的作業系統更新策略。指企業不立即升級到最新版 OS (N)，而是停留在前一個穩定版本 (N-1)，直到最新版經過充分測試確認無災情後才推進。例如：當 macOS 16 剛出時，企業維持在 macOS 15。',

    analogy: '就像「老二哲學」。新開的餐廳（新系統）常有雷，聰明的人（IT）會等別人先去試吃（當白老鼠），確定沒食物中毒（Bug）後，再帶全家大小（公司裝置）去吃。'

  },
  {

    term: 'Notarization (公證)',

    category: ['Security'],

    definition: '軟體公證。開發者在 macOS 發布軟體前，必須將程式碼上傳給 Apple 伺服器進行自動化惡意軟體掃描。通過後，Apple 會發給一張「數位票據」，Gatekeeper 才會放行安裝。這是為了確保 Mac 軟體供應鏈的安全。',

    analogy: '就像「良民證」。所有外來移民（軟體）要進入這個國家（macOS）定居前，都要先去警察局（Apple）蓋手印確認沒有犯罪紀錄，拿到良民證後，海關才會放行。'

  },
  {

    term: 'Nudge',

    category: ['macOS', 'Jamf'],

    definition: 'Nudge。開源的 macOS 更新提示工具。IT 可設定「最晚更新期限」，Nudge 會定期彈出友善提醒視窗催促使用者更新系統。超過期限後可設定為強制更新，但提供延後選項避免打斷工作。',

    analogy: '就像「溫柔的更新管家」。不是突然強制重開機，而是每天提醒你「系統該更新囉」，還有倒數日期。到期限前你可以選擇延後，但最後一天就得更新了。'

  },

  // --- O ---
  {

    term: 'OIDC (OpenID Connect)',

    category: ['Security'],

    definition: 'OpenID Connect。基於 OAuth 2.0 的新一代身分認證協定。Jamf Connect 與現代 SSO 登入流程大多採用此標準。它比傳統的 LDAP 更安全，支援多因素驗證 (MFA)，且傳輸的是 Token 而非密碼。',

    analogy: '就像「現代化數位通行證」。以前要一直輸入帳號密碼，現在你只要在 Google/Microsoft 那邊登入過，它就發給你一張臨時通行證（Token），拿著這張證去其他遊樂設施玩，不用再重複驗票。'

  },
  {

    term: 'OTA (Over-The-Air)',

    category: ['Core'],

    definition: 'OTA（無線空中傳輸）。透過網路遠端推送更新、設定或 App 到裝置，無需連接電腦。iOS/macOS 的系統更新、MDM 描述檔安裝、App 推送都是 OTA 方式。',

    analogy: '就像「遠端遙控更新」。不用把裝置拿回來插電腦，直接透過網路把更新「發射」到裝置上，裝置接收後自動安裝，全程無線完成。'

  },

  // --- P ---
  {

    term: 'Package (.pkg)',

    category: ['macOS'],

    definition: 'Package（.pkg）。macOS 的標準安裝套件格式。包含安裝腳本、檔案清單與 payload，可自動執行複雜的安裝流程（如複製檔案、設定權限、執行命令）。MDM 可以靜默安裝 pkg 而無需使用者互動。',

    analogy: '就像「自動安裝機器人」。雙擊後，它會自己知道要把檔案放去哪個資料夾、改哪些系統設定、註冊哪些服務，全自動完成，不用你一步步點「下一步」。'

  },
  {

    term: 'Passkeys',

    category: ['Security'],

    definition: '通行密鑰。這是 FIDO 聯盟與 Apple 推動的「無密碼」登入標準。它利用裝置的生物辨識（FaceID/TouchID）與公開金鑰加密技術來取代傳統密碼。在 2025 年，企業正逐步導入 Passkeys 以消除釣魚攻擊與密碼外洩風險。',

    analogy: '就像「指紋就是密碼」。以後登入網站不用再想破頭記那串「P@ssw0rd123」了，只要對著鏡頭笑一下（刷臉）或按個指紋，門就開了。鑰匙就在你身上，別人偷不走。'

  },
  {

    term: 'Patch Management',

    category: ['macOS', 'Jamf'],

    definition: '補丁管理。透過 MDM 自動化更新第三方軟體（如 Chrome, Zoom, Adobe）的機制。Jamf Pro 的 Patch Management 功能可訂閱官方更新源，自動下載新版本並推送到 Mac，確保軟體保持最新以修補安全漏洞。',

    analogy: '就像「軟體自動更新服務」。不用每台電腦自己去官網下載新版，IT 設定好後，系統會自動幫所有電腦更新到最新版 Zoom 或 Chrome，保持安全無漏洞。'

  },
  {

    term: 'Payload',

    category: ['Core'],

    definition: '負載 (Payload)。這是描述檔 (Configuration Profile) 中的最小設定單元。一個描述檔可以包含多個 Payload，例如：一個「Wi-Fi Payload」設定無線網路，加上一個「Passcode Payload」設定密碼規則。Payload 是組裝 MDM 策略的積木。',

    analogy: '就像「錦囊裡的紙條」。一個錦囊（描述檔）裡可以有好幾張紙條（Payload）。一張寫著「連上這個 Wi-Fi」，另一張寫著「禁止使用相機」。裝置打開錦囊，照著每一張紙條的指示做。'

  },
  {

    term: 'Pending Command',

    category: ['Core'],

    definition: 'Pending Command（待處理指令）。已發送但裝置尚未執行或回應的 MDM 指令。常見原因為裝置離線、APNs 連線中斷或指令佇列堆積。等待裝置重新連線後會自動執行。',

    analogy: '就像「郵局待寄包裹」。信已經寫好放在郵局（MDM），但收件人（裝置）不在家或地址找不到，暫時寄不出去。等收件人回來就會自動送達。'

  },
  {

    term: 'Platform SSO',

    category: ['Security'],

    definition: '平台單一登入。macOS 13+ 引入的原生框架。它允許身分提供者 (IdP) 的客戶端直接整合進 macOS 的登入畫面與系統底層。這取代了舊有的 Jamf Connect 登入攔截方式，讓雲端帳號登入 Mac 的體驗更滑順、原生且安全。',

    analogy: '就像「系統內建的帳號管家」。以前要靠外掛軟體（Jamf Connect）來幫忙開門，現在 macOS 原廠直接把大門改裝成可以辨識雲端帳號，不用外掛也能無縫登入。'

  },
  {

    term: 'Policy (原則)',

    category: ['Core'],

    definition: '原則 (Policy)。這是 Jamf Pro (macOS) 管理的核心邏輯單元。一個 Policy 包含三個要素：觸發時機 (Trigger，如開機時)、執行範圍 (Scope，如所有工程師電腦)、以及執行動作 (Package/Script)。這是讓 Mac 自動執行任務的劇本。',

    analogy: '就像「自動化任務包」。設定好：「每天早上九點（時機），對所有業務部的電腦（範圍），執行安裝 Office 的動作（任務）」。時間一到，機器人就會自動去跑這些流程。'

  },
  {

    term: 'Policy',

    category: ['macOS', 'Jamf'],

    definition: 'Policy（政策）。Jamf Pro 中的自動化任務單元。可包含多個動作（安裝軟體、執行腳本、重新啟動）、觸發條件（登入時、每日check-in、Self Service手動執行）與目標範圍（特定電腦或群組）。',

    analogy: '就像「自動化工作流程」。定義一連串動作：「當使用者登入時，檢查有沒有裝 VPN，沒有就自動安裝，裝好後跳出完成訊息」。設定一次，全公司電腦自動執行。'

  },
  {

    term: 'PreStage Enrollment',

    category: ['Enrollment', 'Jamf'],

    definition: '預先註冊設定。這是定義 ADE 裝置在「開機設定助理」階段行為的設定檔。IT 可在此決定要跳過哪些設定畫面（如 Siri、條款同意）、是否強制開啟定位服務、以及是否允許使用者略過註冊。這是打造「開箱即用」體驗的第一關。',

    analogy: '就像「新兵入伍流程表」。在新兵（裝置）還沒進營區前，先規定好他入伍當天要填什麼表、不用填什麼表、頭髮要剪多短。這樣新兵一進來，流程順暢，馬上就能變戰力。'

  },
  {

    term: 'Profile (Configuration Profile)',

    category: ['Core'],

    definition: '設定描述檔。這是 MDM 管理的基礎單位，是一個 XML 格式的檔案（.mobileconfig）。它可以包含多個 Payload（設定單元），用來配置 Wi-Fi、Email、VPN、限制功能等。一旦安裝到裝置上，描述檔中的所有設定會同時生效。',

    analogy: '「設定指令包」。就像一個工具箱，裡面裝了好幾種工具（Payload）：一把 Wi-Fi 設定鑰匙、一份 Email 設定說明書、一張限制功能的規則卡。把這個工具箱發給裝置，所有工具就同時派上用場。'

  },
  {

    term: 'Proxy',

    category: ['Network'],

    definition: 'Proxy（代理伺服器）。充當客戶端與網際網路之間的中繼站。裝置的網路請求先發給 Proxy，Proxy 再轉發到目標網站。可用於內容過濾、流量監控、繞過地區限制或加速存取。',

    analogy: '就像「代購服務」。你想買國外網站的東西（存取網頁），但不直接去買，而是請代購（Proxy）幫你買。代購商可以記錄你買了什麼，還能擋下禁止的商品。'

  },

  // --- Q ---
  {

    term: 'QR Code Enrollment',

    category: ['Enrollment'],

    definition: 'QR Code Enrollment（QR Code 註冊）。透過掃描 QR Code 快速完成 MDM 註冊的方式。QR Code 內含 MDM 伺服器網址與憑證，裝置掃描後自動下載描述檔並註冊，簡化手動輸入流程。',

    analogy: '就像「掃碼報到」。新員工不用手動輸入一長串伺服器網址和設定，只要用相機掃一下QR Code，所有註冊資訊就自動填好並完成報到。'

  },

  // --- R ---
  {

    term: 'RADIUS',

    category: ['Network'],

    definition: 'RADIUS。遠端使用者撥號驗證服務。企業常用的認證協定，搭配 802.1X 控制網路存取。當裝置嘗試連接 Wi-Fi，路由器會將憑證轉發給 RADIUS 伺服器驗證，通過後才允許連線。',

    analogy: '就像「門禁系統的驗證主機」。你刷門禁卡（憑證），讀卡機把資料傳給總機房的驗證電腦（RADIUS），確認你是員工才開門，不是的話就拒絕。'

  },
  {

    term: 'Rapid Security Response (RSR)',

    category: ['Security'],

    definition: '快速安全回應。Apple 在 iOS 16+/macOS 13+ 引入的更新機制。它允許 Apple 針對重大安全漏洞推送「小型修補檔」，裝置安裝後通常無需重開機（或僅需極快重啟），且如果出問題可以快速移除。這讓 IT 能在零日攻擊 (Zero-Day) 出現時迅速反應。',

    analogy: '就像「系統的 OK 繃」。不用進行全身大手術（完整系統更新），哪裡受傷（有漏洞）就趕快貼個 OK 繃止血。動作快、副作用小，貼上去就能繼續打仗。'

  },
  {

    term: 'Recovery Lock',

    category: ['Security'],

    definition: '復原鎖。這是 Apple Silicon Mac 的關鍵防護機制。它禁止未經授權的使用者透過長按開機鍵進入「復原模式 (Recovery Mode)」來清除電腦或降低安全性設定。要進入復原模式，必須輸入 MDM 設定的一組密碼。',

    analogy: '就像「急診室的密碼鎖」。以前任何人都可以把電腦送進急診室（復原模式）隨便亂搞。現在急診室門口裝了鎖，不知道密碼的人，連重灌電腦的機會都沒有。'

  },
  {

    term: 'Remote Management',

    category: ['Core', 'Jamf'],

    definition: '遠端管理。這是 MDM 的核心概念。IT 管理員可以在辦公室透過網路對分散在各地的裝置進行設定、安裝軟體、查看狀態、甚至清除資料，完全無需實體接觸裝置。',

    analogy: '「遙控器管理」。就像你可以用遙控器操作電視，IT 可以用電腦遙控全國各地的 iPad，調整設定、安裝 App，甚至緊急關機，完全不用親自跑過去。'

  },
  {

    term: 'Restricted Software',

    category: ['Security'],

    definition: '受限軟體。Jamf Pro 的功能，用於「追殺」特定軟體。只要系統偵測到使用者開啟了黑名單中的 App（例如 macOS 安裝程式或遊戲），MDM 會立即強制關閉該程序，並跳出警告視窗。',

    analogy: '就像「違禁品糾察隊」。糾察隊隨時盯著，只要看到你拿出違禁品（如遊戲），馬上衝過來沒收並記過，完全不讓你玩。'

  },
  {

    term: 'Return to Service',

    category: ['Enrollment'],

    definition: '重置並自動部署。這是一項現代化的清除指令。當 MDM 發送此指令清除 iOS 裝置時，會同時寫入一組 Wi-Fi 設定。裝置清除完畢後，會自動連上 Wi-Fi 並重新向 MDM 註冊，完全無需人工介入點擊螢幕。這對共享裝置或自助服務站 (Kiosk) 非常重要。',

    analogy: '就像「轉生保留記憶」。這台裝置喝了孟婆湯（清除資料）準備投胎，但口袋裡被塞了一張紙條（Wi-Fi 設定）。所以它一醒來，不用人教，自己就知道路跑回來公司報到。'

  },
  {

    term: 'Root Certificate',

    category: ['Security'],

    definition: 'Root Certificate（根憑證）。憑證信任鏈的最頂層憑證，自我簽署且被作業系統預設信任。所有由它簽發的子憑證都會被信任。企業若要使用自簽憑證，必須先將根憑證推送到裝置並設為信任。',

    analogy: '就像「總行長的簽名章」。銀行總行長的章（根憑證）是最高權威，分行長的章都是總行長授權的。只要信任總行長，就會信任所有他授權的分行長簽的文件。'

  },
  {

    term: 'Rosetta 2',

    category: ['macOS'],

    definition: 'Rosetta 2。Apple Silicon Mac 的 Intel 指令集轉譯層。可即時將 Intel (x86_64) App 翻譯成 ARM64 指令執行，讓舊版 Mac軟體也能在 M系列晶片上運行。首次執行需安裝，MDM 可預先部署。',

    analogy: '就像「即時翻譯機」。新的 M晶片電腦說 ARM 語言，舊軟體說 Intel 語言。Rosetta 2 在中間即時翻譯，讓舊軟體能在新電腦上跑，雖然稍慢但能用。'

  },
  {

    term: 'Roster (班級名冊)',

    category: ['Education'],

    definition: '班級名冊。在教育環境中，ASM 可透過 SFTP 或手動方式匯入學生與教師的班級資料（CSV 格式）。這些資料會自動同步到 Apple Classroom App，讓老師的 iPad 一開啟課堂 App 就能看到正確的學生名單。',

    analogy: '「數位點名簿」。就像老師手上的點名冊，系統會自動把哪些學生在哪個班、誰是導師的資料填好。老師打開 App，學生名單已經準備好了，不用手動一個個加。'

  },

  // --- S ---
  {

    term: 'SCEP (Simple Certificate Enrollment Protocol)',

    category: ['Security'],

    definition: '簡易憑證註冊協定。這是一種讓裝置自動向憑證授權中心 (CA) 申請憑證的標準。透過 SCEP，MDM 可以發送一個設定檔，讓裝置自己去跟 CA 說：「我是合法的，請發給我一張 Wi-Fi 通行證」。這是實現零接觸 Wi-Fi 部署的關鍵。',

    analogy: '就像「自動辦證通道」。不用每個人都親自去櫃檯排隊辦證件。MDM 給你一張介紹信，你拿著信去機器掃一下，證件就自動印出來給你了。'

  },
  {

    term: 'Schoolwork App',

    category: ['Education'],

    definition: 'Schoolwork App。Apple 為 K-12 教育設計的作業管理工具。老師可發布講義（Handouts）、指派 App 活動、追蹤學生進度，並查看學生在教育 App 中的學習時間與成績。與 Apple Classroom 整合使用。',

    analogy: '就像「數位作業簿與聯絡簿」。老師在App裡派作業、附上教材連結、設定繳交期限。學生繳交後，老師能看到每個人的進度和成績，還能檢視學習時間。'

  },
  {

    term: 'Scope (範圍)',

    category: ['Core', 'Jamf'],

    definition: '範圍 (Scope)。MDM 派送指令的邏輯核心，包含三個部分：目標 (Targets - 要發給誰)、限制 (Limitations - 只發給特定網段或機型)、排除 (Exclusions - 千萬不要發給誰)。設定錯誤的 Scope 是導致災難（如誤刪主管電腦）的主因。',

    analogy: '就像「任務發放名單」。這份作業（設定）要發給「全三年級（目標）」，但「限男生（限制）」，且「排除班長（排除）」。如果名單弄錯，不該寫作業的人寫了，該寫的人沒寫。'

  },
  {

    term: 'Script',

    category: ['macOS'],

    definition: 'Script（腳本）。在 MDM 中指 Shell Script（bash/zsh）或其他程式碼（Python, AppleScript）。IT 可透過 Jamf Pro 上傳腳本並遠端執行，用於自動化設定、診斷問題或收集資訊。',

    analogy: '就像「遠端遙控指令」。IT 寫好一段程式碼（如「檢查印表機有沒有裝好」），透過 MDM 發給電腦執行，電腦會自動跑這些指令並回報結果。'

  },
  {

    term: 'Secure Token',

    category: ['Security'],

    definition: '安全代幣。在 macOS 上，這代表一個使用者帳號是否有權限解鎖被 FileVault 加密的磁碟。通常只有第一個建立的使用者擁有 Token。MDM 管理的一大挑戰就是確保在多使用者環境下，正確的人擁有此 Token，否則他們重開機後會無法登入。',

    analogy: '就像「金庫鑰匙持有權」。這間房子（電腦）的大門是防爆金庫門。擁有 Token 的人才是鑰匙保管人。沒有 Token 的人，就算住在裡面，一旦門關上（重開機），他也打不開門進不去。'

  },
  {

    term: 'Self Service',

    category: ['Apps', 'Jamf'],

    definition: 'Self Service（自助服務）。Jamf 提供的專屬 App，作為使用者端的「公司 App Store」。員工或學生可以在這裡瀏覽並自行安裝 IT 預先審核的 App、執行故障排除腳本，或安裝設定描述檔，無需聯絡 IT 求助。',

    analogy: '就像「公司專屬應用商店」。就像 App Store，但裡面只有公司或學校准許的軟體。使用者可以自己逛、自己下載，不用每次都打電話問 IT「可以裝這個嗎？」'

  },
  {

    term: 'Setup Assistant',

    category: ['Enrollment'],

    definition: '設定輔助程式。Apple 裝置第一次開機時出現的引導畫面（Hello/哈囉畫面開始）。它會逐步詢問語言、Wi-Fi、Apple ID、定位服務等設定。透過 ADE + PreStage，IT 可以跳過大部分畫面，讓裝置直接進入可用狀態。',

    analogy: '就像「新手教學關卡」。就像遊戲一開始的新手村，會問你一堆問題：選語言、連網路、創帳號。但公司可以幫你設定「跳關」，讓你直接跳到主畫面開始使用。'

  },
  {

    term: 'Single App Mode (Kiosk Mode)',

    category: ['Apps'],

    definition: '單一 App 模式。將 iOS 裝置強制鎖定在某一個特定的 App 上，停用 Home 鍵、手勢與通知。這常用於導覽機、自助點餐機或展示用 iPad。一旦進入此模式，除非 MDM 解除，否則使用者無法退出。',

    analogy: '就像「無限迴圈模式」。這台 iPad 變成了只會做一件事的機器（例如只能點餐）。不管你怎麼按、怎麼滑，它永遠都停在那個畫面，變身成專用家電。'

  },
  {

    term: 'SIP (System Integrity Protection)',

    category: ['Security'],

    definition: '系統完整性保護。macOS 的核心防護罩。它禁止任何使用者（包含最高權限的 root）修改系統核心檔案與資料夾（如 /System, /usr）。這確保了就算惡意軟體拿到了 root 權限，也無法破壞作業系統的根基。',

    analogy: '就像「防彈玻璃罩」。把最重要的系統核心檔案放在防彈玻璃後面。就算你是這棟房子的主人（root），拿著大鐵鎚想去敲那些檔案，也會被玻璃擋住敲不到。'

  },
  {

    term: 'Site (Jamf Pro Sites)',

    category: ['Core'],

    definition: 'Sites（分站）。Jamf Pro 的多租戶架構功能。一個 Jamf 伺服器可以分割成多個虛擬「分站」，每個分站有獨立的管理員、裝置、設定，彼此資料隔離。這常用於縣市教育局集中管理數十所學校的情境。',

    analogy: '就像「總公司下的分公司」。一台大型伺服器就像總公司大樓，但裡面分成好幾個獨立辦公室（分站）。台北辦公室看不到高雄辦公室的資料，各自管理自己的員工和裝置。'

  },
  {

    term: 'Smart Group',

    category: ['Core', 'Jamf'],

    definition: '智慧型群組。一種「自動化」的裝置群組。管理員設定條件（如「電池健康度 < 80%」、「iOS 版本 < 17」），系統會自動將符合條件的裝置加入群組。當裝置狀態改變，群組成員會動態更新。',

    analogy: '就像「自動分類系統」。就像郵局會自動把信件依郵遞區號分類。你設定規則「電量低於 20% 的裝置」，系統就會自動把這些裝置撈進「待充電群組」，不用你手動一台台勾選。'

  },
  {

    term: 'Static Group',

    category: ['Core', 'Jamf'],

    definition: '靜態群組。與智慧型群組相反，這是「手動管理」的群組。管理員自己決定哪些裝置要加入，名單不會自動變動。適合用於特定專案或固定的設備清單。',

    analogy: '就像「手動分組名單」。就像老師手動把學生分成 A、B 兩組做報告。除非老師親自調整，否則名單不會變動，不會因為學生成績改變就自動換組。'

  },
  {

    term: 'Status Channel',

    category: ['Core'],

    definition: 'Status Channel（狀態通道）。DDM 的核心機制之一。裝置會主動透過此通道向 MDM 伺服器回報狀態變化（如 App 安裝成功、電池低於20%），無需伺服器輪詢，實現即時監控。',

    analogy: '就像「主動回報系統」。以前是老闆每小時問一次「做完了沒」（輪詢），現在是員工做完就主動回報「完成了」（狀態通道），效率更高也不用一直打擾。'

  },
  {

    term: 'Supervision (受監管)',

    category: ['Core'],

    definition: '受監管模式。這是 iOS/tvOS 裝置的一種「高權限管理狀態」。通常透過 ADE 或 Configurator 開啟。只有在受監管狀態下，MDM 才能執行「單一 App 模式」、「全域 Proxy」、「無聲安裝 App」或「繞過啟用鎖定」等進階指令。',

    analogy: '就像「完全託管契約」。這不是普通的租賃關係，而是簽了賣身契。裝置承認公司擁有它的絕對控制權，公司叫它往東，它絕不敢往西，沒有任何討價還價的空間。'

  },
  {

    term: 'System Extension',

    category: ['Core'],

    definition: '系統擴充功能。這是 Apple 用來取代 Kext 的新一代驅動程式架構。它在使用者空間 (User Space) 而非核心空間 (Kernel Space) 執行。這意味著就算驅動程式當機，也只會導致那個 App 崩潰，而不會讓整台電腦死當 (Kernel Panic)，大幅提升系統穩定性。',

    analogy: '就像「安全外掛區域」。以前外掛直接插在大腦上（Kext），一短路人就掛了。現在外掛只能穿在衣服上（System Extension），就算外掛壞掉，把衣服脫掉就好，人還是活蹦亂跳的。'

  },

  // --- T ---
  {

    term: 'Temporary Session (Guest Mode)',

    category: ['Education'],

    definition: '臨時工作階段（訪客模式）。Shared iPad 的一種使用模式。使用者點擊「訪客」即可免帳號登入使用。登出後，所有資料（瀏覽紀錄、下載檔案、App 資料）會被立即清除，確保下一位使用者拿到的是乾淨的裝置。',

    analogy: '就像「圖書館公用電腦」。你不用登入帳號，坐下就能用。但你離開後，系統會自動清空你的瀏覽紀錄和下載資料，下一個人看不到你用過的痕跡。'

  },
  {

    term: 'TestFlight',

    category: ['Apps'],

    definition: 'TestFlight。Apple 官方的 Beta 測試平台。開發者可上傳測試版 App，透過邀請碼分發給內部測試人員或公開測試者。最多可邀請 10,000 名外部測試者，每個測試版有效期 90 天。',

    analogy: '就像「搶先體驗版發布平台」。遊戲還沒正式上架，開發商先給一群玩家試玩測試版，收集bug回饋。玩家下載專屬App（TestFlight）就能安裝搶鮮版。'

  },
  {

    term: 'TLS / SSL',

    category: ['Security'],

    definition: 'TLS/SSL。傳輸層安全協定。用於加密網路連線（HTTPS 的基礎），確保資料在傳輸過程中無法被竊聽或竄改。伺服器需持有有效憑證，客戶端驗證憑證後建立加密通道。',

    analogy: '就像「加密信封」。你寄信給銀行（網站），不想讓郵差偷看內容，就用特殊信封（TLS）密封。郵差只知道要送去哪，但拆不開信封，只有銀行有鑰匙能拆。'

  },
  {

    term: 'Token (代號/權杖)',

    category: ['Security'],

    definition: 'Token（代號/權杖）。在 MDM 環境中常見的數位憑證檔案。例如 ADE Token 用於 Jamf 與 ASM 通訊、VPP Token 用於授權管理、APNs Certificate 用於推播。Token 通常有效期一年，過期後必須更新，否則相關功能會中斷。',

    analogy: '「通行證」。就像進入管制區需要的通行證，上面有效期限和權限範圍。過期了就進不去，必須去櫃檯（Apple 網站）重新申請更新。'

  },
  {

    term: 'Touch ID',

    category: ['Hardware'],

    definition: 'Touch ID。Apple 的電容式指紋辨識感測器,整合於 Home 鍵或電源鍵。用於裝置解鎖、Apple Pay 與 App 授權驗證。MDM 可設定某些敏感 App 必須使用Touch ID 才能開啟。',

    analogy: '就像「指紋密碼鎖」。把手指放在感應器上，機器記住你的指紋紋路。下次碰一下就解鎖，比輸入6位數密碼快多了。'

  },

  // --- U ---
  {

    term: 'UIE (User-Initiated Enrollment)',

    category: ['Enrollment'],

    definition: '使用者自行啟動註冊。這是透過網頁連結或 QR Code 讓使用者主動下載 MDM 描述檔的註冊方式。缺點是無法達到完整的監管狀態，且使用者可以隨時移除描述檔，因此不適合企業用的公配載具。',

    analogy: '就像「自願報名制」。不像 ADE 是強制徵召，UIE 是使用者自己去網站報名參加管理。但既然是自願的，使用者也可以隨時退出，公司管不住。'

  },
  {

    term: 'Universal Binary',

    category: ['macOS'],

    definition: 'Universal Binary（通用二進位檔）。同時包含 Intel (x86_64) 與 Apple Silicon (arm64) 兩種架構編譯碼的 App。可在兩種晶片的 Mac 上原生執行，無需 Rosetta 轉譯，效能最佳。',

    analogy: '就像「雙語版軟體」。同一個App裡面包含兩種語言版本（Intel版和M晶片版），電腦會自動選擇對應語言執行，不需要翻譯，速度最快。'

  },
  {

    term: 'Update Inventory',

    category: ['Core'],

    definition: '更新資產清單。這是 MDM 向裝置發送的一個指令，要求裝置立即回報最新的硬體資訊、已安裝 App 清單、電池狀態、儲存空間等資料。在排除故障時，這通常是第一個執行的動作。',

    analogy: '「財產盤點」。就像公司定期要求員工回報辦公室裡有哪些設備、電腦裝了哪些軟體。IT 發出盤點指令，裝置就會把最新的清單回報上來。'

  },
  {

    term: 'USB-C',

    category: ['Hardware'],

    definition: 'USB Type-C。2025 年 Apple 全線產品（iPhone 15/16+, iPad, Mac）的通用介面。它支援正反插，且集成了資料傳輸、影音輸出 (DisplayPort) 與雙向高瓦數供電 (PD)。對於管理者而言，這意味著周邊配件與充電器的統一，但也帶來了資料透過隨身碟外洩的風險，需透過 MDM 管控 USB 權限。',

    analogy: '就像「萬用孔」。以前要分 HDMI、電源線、傳輸線，現在全部合併成一個孔。一條線能搞定充電、傳螢幕、傳檔案，插頭還不會插反。'

  },
  {

    term: 'User Enrollment',

    category: ['Enrollment'],

    definition: '使用者註冊。專為 BYOD 設計的輕量級註冊模式。它會在裝置上建立一個加密的 APFS 卷宗（容器）來存放公司資料。MDM 只能抹除這個容器，完全無法觸及使用者的個人照片或 App，也無法取得裝置序號等隱私資訊。',

    analogy: '就像「便當盒的分隔」。你的飯盒（手機）裡，公司只佔其中一格放菜（公司資料）。公司可以隨時把那格菜收走，但絕對碰不到你那一格的白飯（個人資料），味道也不會混在一起。'

  },

  // --- V ---
  {

    term: 'VLAN',

    category: ['Network'],

    definition: 'VLAN（虛擬區域網路）。在實體網路上劃分出多個邏輯隔離的網路。例如讓「訪客Wi-Fi」與「員工Wi-Fi」走不同VLAN，即使連同一台交換機也無法互相存取，提升安全性。',

    analogy: '就像「大樓內的租戶隔間」。整棟辦公大樓（實體網路）劃分成A、B、C區（VLAN），各區租戶只能在自己區域走動，不能串門，雖然電梯和大廳是共用的。'

  },
  {

    term: 'Volume Owner',

    category: ['Security'],

    definition: '磁碟擁有者。Apple Silicon Mac 特有的安全角色。只有在初始設定時建立的使用者（或被賦予 Token 的使用者）才是 Volume Owner。只有 Owner 有權限授權安裝 macOS 更新或修改開機安全性設定。MDM 的指令若涉及這些操作，必須透過 Bootstrap Token 來模擬 Owner 權限。',

    analogy: '就像「房產證持有人」。這間房子雖然住了很多人，但只有持有人有權力決定要不要裝修房子（更新系統）或換大門鎖。其他房客想做這些事，得先獲得持有人的同意。'

  },
  {

    term: 'VPP (Volume Purchase Program)',

    category: ['Apple'],

    definition: '大量採購計畫（現整合於 ABM 的 Apps and Books）。這是企業大量購買 App 授權的機制。企業購買後獲得「虛擬授權」，可透過 MDM 分發給裝置或 Apple ID。最重要的是，企業保有授權的所有權，當員工離職或裝置回收時，MDM 可以「收回」授權並分發給下一位員工。',

    analogy: '就像「數位圖書館」。公司買了一百本電子書（App），借給員工看。員工看完或離職了，書就自動歸還到公司的架上，可以再借給下一個人，不用每次有人來都重新買書。'

  },

  // --- W ---
  {

    term: 'Wi-Fi Payload',

    category: ['Network'],

    definition: 'Wi-Fi 設定單元。Configuration Profile 中的一種 Payload 類型。它可以預先配置 Wi-Fi 的 SSID、密碼、加密方式（WPA2/WPA3）、是否自動連線，甚至可以設定 802.1x 憑證認證，讓裝置開機就自動連上企業網路。',

    analogy: '就像「網路設定懶人包」。就像把 Wi-Fi 名稱和密碼事先寫在一張紙條上塞進裝置。裝置一開機，看到紙條就自動連上網路，不用使用者手動輸入密碼。'

  },
  {

    term: 'Wipe (清除裝置)',

    category: ['Core'],

    definition: '清除裝置。MDM 的一個遠端指令，會將裝置恢復到原廠出廠狀態。所有資料、App、照片、設定全部清除，裝置重啟後會回到 Hello 歡迎畫面。這用於裝置遺失、回收或轉移給其他使用者。',

    analogy: '「重置鍵」。就像按下工廠重置按鈕，把手機洗成一台全新的樣子，裡面什麼都沒有，就像剛從商店買回來一樣。'

  },

  // --- Z ---
  {

    term: 'Zero-Touch Deployment',

    category: ['Enrollment'],

    definition: '零接觸部署。這是現代 IT 管理的終極目標。結合 ABM + ADE + MDM，全新的未拆封裝置直接從經銷商寄給員工。員工開機連網後，裝置自動完成所有設定、軟體安裝與加密，IT 人員完全不需要碰到機器。',

    analogy: '就像「開箱即用魔法」。IT 人員連箱子都不用拆，直接把新電腦寄給在家上班的員工。員工一打開電源，電腦就自動變成公司設定好的樣子，所有的軟體都裝好了，就像魔術一樣。'

  },
  {

    term: 'Zero Trust',

    category: ['Security'],

    definition: 'Zero Trust（零信任）。安全架構哲學：「永不信任，持續驗證」。即使在企業內網，每次存取資源都要重新驗證身分、裝置健康度與權限。搭配 MDM 可確保只有合規裝置能存取公司資料。',

    analogy: '就像「每次進門都要刷卡」。以前在公司內部走動不用再驗證，現在改成進每個房間都要刷卡確認身分，就算你已經在公司裡也一樣，防止假冒或被入侵。'

  },

  // --- B ---
  {
    term: 'Blueprints',
    category: ['Jamf', 'Core'],
    definition: 'Jamf Pro 的進階自動化框架。允許管理員定義「理想狀態」並持續監控,當裝置偏離標準時自動修正。例如設定「必須安裝防毒軟體」,Jamf 會定期檢查並自動安裝缺失的軟體。 Blueprint 比傳統 Policy 更智慧,能主動偵測並自我修復,確保裝置始終符合企業安全基準。',
    analogy: '就像「自動駕駛模式」。你設定「時速100公里,保持車道中央」,車子就自動維持;Blueprints 讓你設定「必須有防毒+加密」,裝置就自動保持合規狀態,偏離了會自動拉回來。'
  },

  // --- E ---
  {
    term: 'Enrollment Invitation',
    category: ['Jamf', 'Enrollment'],
    definition: '註冊邀請。Jamf 的手動註冊方式之一。管理員產生一個專屬連結或 QR Code,發送給使用者,使用者點擊後即可將個人裝置註冊到 Jamf。常用於 BYOD(Bring Your Own Device)場景,讓員工自主將私人 iPhone 或 Mac 加入公司管理,同時保留個人隱私。',
    analogy: '就像「入會邀請函」。公司發你一個專屬連結,點進去照著步驟走,你的個人手機就加入了公司的管理系統,可領 App 和 Wi-Fi,但私人照片訊息還是你的。'
  },
  {
    term: 'Extension Attribute',
    category: ['Jamf', 'Core'],
    definition: '擴充屬性。Jamf Pro 的自訂資料欄位功能。允許管理員使用腳本或輸入欄位收集標準清單外的裝置資訊,如特定軟體版本、安全設定狀態、使用者自填資料等。這些自訂資料可用於 Smart Group 條件、報表篩選和 Policy 範圍設定,大幅提升管理彈性。',
    analogy: '就像「客製化調查問卷」。標準健康檢查只問身高體重,但你可以加問「有無接種疫苗」「最近一次看牙醫」等客製問題,然後依答案自動分組管理。'
  },

  // --- I ---
  {
    term: 'Inventory Collection',
    category: ['Jamf', 'Core'],
    definition: '清單收集。Jamf 定期從裝置收集硬體資訊、已安裝軟體、系統設定、使用者資料、Extension Attribute 等的程序。預設每天自動執行,也可手動觸發「Update Inventory」指令立即收集最新狀態。這是 Jamf 掌握裝置現況的核心機制,所有報表和 Smart Group 都依賴此資料。',
    analogy: '就像「定期健康檢查」。每天自動量體溫血壓(收集資料),醫生(管理員)就能看到最新健康狀態;也可以說「現在馬上給我量!」立即更新,不用等明天。'
  },

  // --- J ---
  {
    term: 'Jamf Connect',
    category: ['Jamf', 'Security', 'macOS'],
    definition: 'Jamf 的雲端身分認證解決方案。讓 Mac 使用者可用公司的雲端帳號(如 Azure AD、Okta、Google Workspace)登入 macOS,取代傳統本機帳號。支援密碼同步、多重驗證(MFA)整合和零接觸部署。使用者只需一組密碼即可登入 Mac 和所有企業服務,IT 也能集中管理身分。',
    analogy: '就像「公司門禁卡通用化」。不用記一堆密碼,刷同一張員工證(雲端帳號)就能開公司大門、登 Mac、進 Google Workspace,全部統一管理,改密碼也一次搞定。'
  },
  {
    term: 'Jamf Pro API',
    category: ['Jamf', 'Other'],
    definition: 'Jamf Pro 提供的 RESTful API 介面。允許開發者和系統管理員使用程式自動化操作 Jamf,如批量建立 Policy、匯入裝置清單、產生自訂報表、觸發遠端指令等。2025 年已全面改用 Jamf Pro API v2,提供更完整的功能和更好的效能。支援各種程式語言整合。',
    analogy: '就像「管理後台的遙控器」。不用手動點網頁,寫程式就能一次建立100條政策、每天自動匯出報表寄信、批量更新1000台裝置設定,省下90%重複操作時間。'
  },
  {
    term: 'Jamf Protect',
    category: ['Jamf', 'Security', 'macOS'],
    definition: 'Jamf 的 macOS 端點偵測與回應(EDR)解決方案。提供即時威脅偵測、惡意軟體防護、行為分析和自動化回應。與 Jamf Pro 深度整合,可在發現威脅時自動隔離裝置、執行修復 Policy 或通知管理員。使用機器學習偵測未知威脅,填補傳統防毒軟體的不足。',
    analogy: '就像「保鑣+監視器」。不只鎖門(防火牆),還有保鑣24小時巡邏,發現可疑人士(惡意程式)立刻警報,自動隔離並通知警衛室(IT),甚至能認出偽裝的壞人。'
  },
  {
    term: 'Jamf School',
    category: ['Jamf', 'Education'],
    definition: 'Jamf 專為 K-12 教育市場設計的簡化版 MDM 解決方案。相較於 Jamf Pro,介面更簡單、定價更親民,專注於課堂管理(Classroom)、家長控制、學生裝置部署和內容過濾。讓不懂 IT 的老師也能輕鬆管理班級 iPad,家長也能從 App 查看孩子的使用狀況。',
    analogy: '就像「教育版軟體」。就像 Adobe 給學校的便宜授權,Jamf School 是給中小學的輕量版,老師不用懂 IT 也能上手管理30台 iPad,但進階功能比企業版 Jamf Pro 少一些。'
  },
  {
    term: 'Jamf binary',
    category: ['Jamf', 'macOS'],
    definition: 'Jamf binary。安裝在每台受管 Mac 上的命令列工具,位於 `/usr/local/jamf/bin/jamf`。負責與 Jamf Pro 伺服器通訊、執行 Policy、回報清單資料、處理遠端指令等核心功能。管理員可透過終端機執行 `sudo jamf recon` 手動更新清單,或使用 `sudo jamf policy` 觸發政策。',
    analogy: '就像「間諜程式」(正面意義)。裝在 Mac 裡的小特務,定時向總部(Jamf伺服器)回報情報(裝置狀態),接收並執行總部下達的任務(Policy),是Jamf整套系統運作的幕後功臣。'
  },
  {
    term: 'Jamf Remote',
    category: ['Jamf', 'macOS'],
    definition: 'Jamf Remote (Jamf Remote Assist)。Jamf Pro內建的瀏覽器端遠端桌面工具。IT可透過網頁直接連線到Mac進行螢幕分享、終端機操作、檔案傳輸與故障排除,無需安裝第三方遠端控制軟體。支援attended(使用者需同意)和unattended(無人值守)兩種連線模式。',
    analogy: '就像「遠端遙控器」。IT坐在辦公室,透過瀏覽器就能看到並控制員工的Mac螢幕,幫忙抓bug或設定軟體,不用跑過去或叫使用者安裝TeamViewer。'
  },
  {
    term: 'Jamf Now',
    category: ['Jamf'],
    definition: 'Jamf Now。Jamf推出的簡化版雲端MDM解決方案,專為小型企業(50台裝置以下)設計。提供基本的裝置管理、App派送與安全設定功能,但不包含Jamf Pro的進階功能如Policy、Script、Extension Attribute等。定價較低,介面更友善。',
    analogy: '就像「入門版管理工具」。Jamf Pro是專業級瑞士刀(功能超多但複雜),Jamf Now是簡化版多功能刀,只有最基本幾個工具,適合剛起步的小公司使用。'
  },
  {
    term: 'Jamf Teacher',
    category: ['Jamf', 'Education'],
    definition: 'Jamf Teacher。專為教師設計的課堂管理iPad App,是Apple Classroom的Jamf強化版。老師可即時監看學生畫面、鎖定App、開啟網頁、發送訊息、收集作業並控制裝置。與Jamf School或Jamf Pro整合,支援更精細的課堂控制與行為管理功能。',
    analogy: '就像「數位教鞭」。老師用iPad就能管理全班30台學生平板:一鍵讓大家打開同一個網頁、鎖定在測驗App、偷看誰在分心,比站起來巡教室更有效率。'
  },
  {
    term: 'Jamf Student',
    category: ['Jamf', 'Education'],
    definition: 'Jamf Student。安裝在學生iPad上的配套App,與Jamf Teacher溝通。學生可透過此App查看課堂講義、繳交作業、舉手發問或請求協助。老師發送的指令(如開啟App、鎖定畫面)會透過此App執行。',
    analogy: '就像「學生端接收器」。老師的指令透過Jamf Teacher發出,學生的iPad上Jamf Student App會接收並執行,形成完整的課堂管理循環。'
  },
  {
    term: 'Jamf Trust (Jamf Private Access)',
    category: ['Jamf', 'Security', 'Network'],
    definition: 'Jamf Trust (前身為Jamf Private Access/Wandera)。Jamf的零信任網路存取(ZTNA)解決方案。提供裝置姿態檢查(device posture checking)、條件式存取、動態分割通道VPN與網路威脅防護。確保只有合規的裝置才能存取企業資源,支援BYOD與遠端工作場景。',
    analogy: '就像「智慧門禁系統」。不只檢查你的員工證(帳號),還要檢查你有沒有發燒(裝置合規性)、是否戴口罩(安全設定),全部通過才讓你進辦公室(存取資源),確保零信任安全。'
  },
  {
    term: 'Jamf Safe Internet',
    category: ['Jamf', 'Security', 'Network'],
    definition: 'Jamf Safe Internet。Jamf提供的DNS層級內容過濾與網路安全服務。可阻擋惡意網站、釣魚連結、不當內容,並提供網路活動報表。與Jamf Pro整合,可套用至特定裝置群組,適合學校與企業保護裝置免於網路威脅。',
    analogy: '就像「網路保鑣」。在你連上任何網站之前,先幫你檢查網址是不是詐騙網站或色情網站,是的話直接擋下來,保護你不會不小心點錯連結。'
  },
  {
    term: 'Jamf Data Policy',
    category: ['Jamf', 'Security'],
    definition: 'Jamf Data Policy。Jamf Pro的資料外洩防護(DLP)功能。允許管理員設定規則防止敏感資料透過AirDrop、截圖、複製貼上等方式外洩。可針對特定App或檔案類型設定限制,並記錄所有違規行為供稽核。',
    analogy: '就像「資料防盜網」。設定規則禁止將財務報告截圖傳給私人LINE,或禁止把機密文件AirDrop出去,系統會自動攔截並記錄誰試圖這麼做。'
  },
  {
    term: 'Recon',
    category: ['Jamf', 'macOS'],
    definition: 'Recon。`jamf recon`指令的簡稱,是Jamf binary最常用的指令之一。執行後會立即收集Mac的最新清單資訊(硬體規格、已安裝軟體、使用者資料、Extension Attribute等)並回傳至Jamf Pro伺服器。故障排除時的第一步驟。',
    analogy: '就像「立即體檢」指令。跟電腦說`sudo jamf recon`,它就會馬上量身高體重、檢查有裝哪些軟體,然後把最新健康報告傳回總部(Jamf),不用等每天的定期檢查。'
  },
  {
    term: 'Casper Suite',
    category: ['Jamf'],
    definition: 'Casper Suite。Jamf Pro的前身品牌名稱(2002-2015)。早期Jamf的管理工具稱為Casper,後來更名為Jamf Pro。有些舊文件或討論串仍會使用Casper這個稱呼,但指的就是現在的Jamf Pro。',
    analogy: '就像「舊品牌名稱」。就像Facebook改名Meta,Casper Suite就是Jamf Pro的舊名字。看到有人講Casper,不用困惑,他們講的就是Jamf Pro。'
  },

  // --- P ---
  {
    term: 'Package',
    category: ['Jamf', 'macOS', 'Apps'],
    definition: '安裝套件。在 Jamf 中,Package 是指 .pkg 或 .dmg 格式的 Mac 應用程式安裝檔。管理員將 Package 上傳到 Jamf Pro,再透過 Policy 或 Self Service 分發到目標裝置。支援使用 Composer 工具自製安裝包,也可直接使用廠商提供的 .pkg 檔。',
    analogy: '就像「軟體快遞箱」。IT 把軟體裝進標準化包裹(Package),貼上標籤「僅限行銷部」,Jamf 就會自動配送到正確的 Mac 桌面,使用者點兩下就安裝完成。'
  },

  // --- R ---
  {
    term: 'Restrict Software',
    category: ['Jamf', 'Security', 'macOS'],
    definition: '軟體限制。Jamf 的應用程式黑名單功能。管理員可指定特定 App 禁止執行(如遊戲、P2P 軟體、未授權工具),當使用者嘗試開啟時會被自動阻擋並顯示客製化訊息。可設定例外清單和時間限制,也能記錄所有嘗試執行的違規行為供稽核。',
    analogy: '就像「辦公室門禁黑名單」。設定「禁止遊戲 App 進入」,員工就算下載了也無法開啟,系統會跳出「本軟體已被 IT 部門封鎖」,想玩也玩不了。'
  },

];
