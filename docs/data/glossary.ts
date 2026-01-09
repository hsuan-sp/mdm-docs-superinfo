/**
 * 維護指南 (2025/12/11 更新)：
 * 1. 本表已更新至最新技術標準。
 * 2. 定義區塊大幅擴充，旨在讓無背景知識的新手也能理解技術脈絡。
 * 3. 包含 Apple 裝置管理、網路基礎、Jamf 生態系與通用 IT 術語。
 */

export interface Term {
  term: string;
  category: (
    | "Core"
    | "Enrollment"
    | "Apple"
    | "Network"
    | "Security"
    | "Hardware"
    | "Apps"
    | "Other"
    | "Education"
    | "Jamf"
    | "macOS"
  )[];
  definition: string;
  analogy: string; // "白話文/比喻"
}

export const glossaryData: Term[] = [
  // --- 8 ---
  {
    term: "802.1X",

    category: ["Network"],

    definition:
      "802.1X 是 IEEE 制定的一種網路存取控制標準，主要用於企業與校園 Wi-Fi 環境（如 TANet 的 eduroam）。當裝置嘗試連線時，必須提供有效的數位憑證或帳號密碼，經過 RADIUS 伺服器驗證後才能獲准存取網路。這比一般家用 Wi-Fi 共用密碼的方式更安全，能有效防止未授權裝置進入內部網路。",

    analogy:
      "這是企業級網路的身分檢查站。家用 Wi-Fi 就像家門鑰匙，誰拿到都能開門；802.1X 則像機場安檢，每個人都要出示自己的護照（憑證）與機票，確認身分無誤才准進入，無法共用或冒用。",
  },

  // --- A ---
  {
    term: "AAS (Automatic Assessment Configuration)",

    category: ["Education"],

    definition:
      "Automatic Assessment Configuration（自動評量設定）是 iOS/iPadOS 專為高風險標準化測驗設計的鎖定模式。當考生開啟支援此功能的測驗 App 時，系統會自動停用字典、拼字檢查、截圖、錄影及所有推播通知。測驗結束後，裝置會自動解除鎖定並恢復原狀，無需 IT 人員逐台解鎖。",

    analogy:
      "這是平板的「監考模式」。考試一開始，系統會自動把所有可能作弊的工具（如字典、複製貼上、截圖）全部暫時沒收。直到考生交卷離開 App，這些功能才會自動歸還，確保考試公平。",
  },
  {
    term: "ABM (Apple Business Manager)",

    category: ["Apple"],

    definition:
      "Apple Business Manager (ABM) 是企業管理 Apple 裝置與數位資產的中央入口網站。它整合了裝置註冊 (ADE)、大量 App 採購 (VPP) 以及管理式 Apple 帳號的功能。MDM 伺服器必須與 ABM 串接，才能證明企業對裝置的所有權並執行自動化部署。",

    analogy:
      "ABM 是企業 Apple 裝置的「資產總部」。所有公司買來的設備、軟體授權和員工帳號，都要先在這裡註冊建檔。MDM 就像外包的管理公司，必須獲得總部（ABM）的授權，才能進場管理這些資產。",
  },
  {
    term: "Account-Driven Device Enrollment",

    category: ["Enrollment"],

    definition:
      "Account-Driven Device Enrollment（帳號驅動裝置註冊）是現代化的 BYOD 註冊方式。使用者只需在「設定」中登入公司的「管理式 Apple 帳號」，系統即會自動引導完成 MDM 註冊。此模式會將公司資料與個人資料嚴格分離（User Enrollment），確保企業只能管理工作資料，無法觸及個人隱私。",

    analogy:
      "這是透過「登入帳號」來啟動管理的機制。就像登入公司信箱一樣簡單，使用者只要輸入帳號密碼，手機就會自動切換出一個「工作空間」來放公司資料。不想用時登出帳號，工作空間就會消失，完全不影響原本的個人照片和 App。",
  },
  {
    term: "ACME (Automated Certificate Management Environment)",

    category: ["Security"],

    definition:
      "Automated Certificate Management Environment (ACME) 是一種自動化憑證管理協定。它能讓裝置自動向憑證中心申請、驗證並更新數位憑證，無需人工介入。在 MDM 中，ACME 正逐漸取代舊有的 SCEP 協定，用來確保裝置的身分憑證永遠有效。",

    analogy:
      "ACME 是憑證的「自動續約機制」。就像你的數位通行證快過期時，系統會自動在背景幫你跑完續約流程並換發新證。使用者完全沒感覺，但永遠不會遇到「憑證過期」導致連不上網路的問題。",
  },
  {
    term: "Activation Lock (啟用鎖定)",

    category: ["Security"],

    definition:
      "Activation Lock（啟用鎖定）是 Apple 的防盜機制，與「尋找 (Find My)」功能綁定。重置裝置後，必須輸入原使用者的 Apple ID 密碼才能啟用。這對企業是雙面刃：能防盜，但若員工離職未登出，裝置將無法給下一人使用。企業需透過 MDM 的 Activation Lock Bypass Code 來解決此問題。",

    analogy:
      "這是裝置的「防盜死結」。即使把手機重灌，開機時還是會被鎖住，要求輸入原主人的密碼。這能防止小偷銷贓，但也可能變成「殭屍裝置」，如果前員工沒登出又聯絡不上，公司就解不開這台手機了。",
  },
  {
    term: "Activation Lock Bypass Code",

    category: ["Security"],

    definition:
      "Activation Lock Bypass Code（啟用鎖定略過代碼）是 MDM 自動從受監管裝置 (Supervised) 收集的一組特殊解鎖碼。當遇到員工離職未登出導致的 Activation Lock 鎖死情況時，IT 管理員可輸入此代碼來強制解鎖，無需原使用者的 Apple ID 密碼。",

    analogy:
      "這是企業專用的「備用萬能鑰匙」。當員工把公司的手機鎖死後離職失聯，IT 不用猜密碼，只要從 MDM 系統叫出這串代碼輸入，就能把「防盜鎖」打開，讓手機恢復自由身重新分配。",
  },
  {
    term: "ADE (Automated Device Enrollment)",

    category: ["Enrollment"],

    definition:
      "Automated Device Enrollment (ADE) 是 Apple 企業管理的部署標準（前身為 DEP）。新購裝置的序號會直接由經銷商加入企業的 ABM 帳戶。裝置一開機連網，就會自動下載 MDM 設定檔並強制註冊，使用者無法跳過。這是實現「零接觸部署 (Zero-Touch)」的唯一途徑。",

    analogy:
      "這是裝置的「出廠身分綁定」。就像這台 iPad 在工廠出貨時，額頭上就被蓋了公司的印章。不管誰拿到它、重灌幾次，只要一連上網，它就會認祖歸宗，自動向公司的 MDM 報到並接受管理。",
  },
  {
    term: "Admin Account (管理者帳號)",

    category: ["Security"],

    definition:
      "Admin Account（管理者帳號）是 macOS 中擁有最高權限的使用者，可執行安裝軟體、修改系統設定等操作。在受管環境中，為符合資安規範，IT 通常會建立一個隱藏的 Admin 帳號供維護用，並將員工的日常帳號權限降級為標準使用者 (Standard User)。",

    analogy:
      "這是電腦的「最高指揮官」。擁有這個身分的人可以隨意拆裝軟體、更改系統核心設定。為了安全，通常只有 IT 人員保留指揮官權限，一般員工則給予「操作員」權限，能工作但不能亂改系統。",
  },
  {
    term: "AirDrop",

    category: ["Core"],

    definition:
      "AirDrop 是 Apple 裝置間的近距離無線傳檔技術。利用藍牙發現周邊裝置，再透過 Wi-Fi Direct 點對點高速傳輸。雖然方便，但也可能成為資料外洩管道。企業可透過 MDM 限制 AirDrop 僅限於「管理式聯絡人」或完全停用。",

    analogy:
      "這是 Apple 裝置專屬的「隔空傳送」。不需要網路線或隨身碟，只要兩台裝置靠得夠近，就能直接把檔案「丟」給對方。速度很快，但如果不設防，員工可能會不小心把機密文件丟給路人。",
  },
  {
    term: "AirDrop for Business",

    category: ["Security"],

    definition:
      "AirDrop for Business（受管 AirDrop）是 MDM 對 AirDrop 的管控機制。透過定義「管理式」與「非管理式」空間，IT 可以限制員工不能透過 AirDrop 將公司文件傳送到私人裝置，或完全禁止使用 AirDrop。",

    analogy:
      "這是 AirDrop 的「企業過濾器」。公司可以設定規則，讓 AirDrop 只能在公司的電腦之間互傳檔案，一旦你想把檔案傳給私人的手機，系統就會直接擋下來，確保資料不落地。",
  },
  {
    term: "AirPlay",

    category: ["Core"],

    definition:
      "AirPlay 是 Apple 的無線影音串流協定，可將畫面鏡像輸出到 Apple TV 或支援的螢幕。在教育與企業環境，MDM 可預先配置 AirPlay 權限（如特定會議室密碼），或指定只有受管裝置能進行投影，防止未授權人員佔用螢幕。",

    analogy:
      "這是「無線投影」功能。一鍵就能把手機或電腦畫面投到大電視上。企業管理時，可以幫員工預先輸入好會議室的投影密碼，員工一走進去就能直接投屏開會，不用再問密碼是多少。",
  },
  {
    term: "AirPrint",

    category: ["Core"],

    definition:
      "AirPrint 是 Apple 的免驅動程式列印技術。只要印表機支援 AirPrint 並在同一網段，裝置即可直接列印。MDM 可透過 AirPrint Payload 預先將公司印表機清單推送到員工裝置，讓其自動出現在列印選項中。",

    analogy:
      "這是「免安裝驅動」的列印方式。不用像以前要下載安裝一堆驅動程式，只要手機看得到印表機就能印。IT 可以幫全公司設定好，員工手機一連上 Wi-Fi，打開文件按列印，就會自動看到公司的印表機。",
  },
  {
    term: "Always-on VPN",

    category: ["Network"],

    definition:
      "Always-on VPN（全時 VPN）是一種強制性的網路安全策略。裝置偵測到網路連線時，會自動在背景建立 VPN 加密通道連回企業內網。若連線失敗，甚至可設定切斷所有網路流量（Lockdown），確保資料絕不會在未加密的公用網路上傳輸。",

    analogy:
      "這是網路連線的「強制加密通道」。不管員工在咖啡廳還是機場上網，系統都會強制先把連線拉回公司加密。如果連不回公司，就會直接斷網保護，確保沒有任何資料會因為連到不安全的公共 Wi-Fi 而被竊取。",
  },
  {
    term: "APNs (Apple Push Notification service)",

    category: ["Apple"],

    definition:
      "Apple Push Notification service (APNs) 是 MDM 傳送指令的傳令兵。MDM 伺服器無法直接控制裝置，必須發送訊號給 Apple 的 APNs 伺服器，再由 APNs「喚醒」裝置向 MDM 報到並領取任務。若 APNs 連線中斷，MDM 將完全無法管理裝置。",

    analogy:
      "APNs 是 MDM 與裝置間的「傳話筒」。MDM 想叫裝置做事（如安裝 App），不能直接喊，要透過 Apple (APNs) 拍拍裝置的肩膀說「這有你的新任務」。如果這個傳話筒壞了（無法連線 Apple），MDM 喊破喉嚨裝置也聽不到。",
  },
  {
    term: "App Config (App Configuration)",

    category: ["Apps"],

    definition:
      "App Configuration（管理式 App 設定）允許 MDM 在派送 App 時，同步注入預設設定值（如伺服器網址、使用者帳號）。這讓 App 安裝後即可直接使用，使用者無需手動輸入複雜的參數，大幅減少設定錯誤。",

    analogy:
      "這是「幫你填好表單」的 App 安裝。當 IT 派送 Email App 給這你時，裡面已經自動填好了公司的伺服器設定和你的信箱帳號。你只要打開 App 就能收信，不用自己去問 IT 到底要填什麼 IP 或連接埠。",
  },
  {
    term: "AppleCare+",

    category: ["Hardware"],

    definition:
      "AppleCare+ 是 Apple 的延長保固與意外損壞保險服務。除了延長硬體保固期，最重要的是提供「意外損壞」的低價維修（如螢幕破裂）。企業可透過 ABM 統一購買並追蹤保固狀態，降低設備維護的不可預期成本。",

    analogy:
      "這是原廠的「意外險」。除了原本的一年保固外，如果 iPad 不小心摔破螢幕或進水，有買 AppleCare+ 的話，只要付一點點自負額就能維修或換整新機，不用花大錢買新的，幫公司省下大筆維修費。",
  },
  {
    term: "Apple Classroom (Apple 課堂)",

    category: ["Education"],

    definition:
      "Apple Classroom（Apple 課堂）是專為教師設計的控班 App，利用藍牙與 Wi-Fi 近端控制學生 iPad。教師可即時監看學生畫面、將全班鎖定在特定 App、一鍵派送網頁或檔案。此功能不依賴 MDM 伺服器，適合課堂現場的即時互動。",

    analogy:
      "這是老師手中的「課堂遙控器」。老師可以在自己的 iPad 上看到全班同學現在正在看什麼畫面。如果想讓大家專心上課，可以一鍵把所有學生的 iPad 畫面都切換到課本 App 並鎖定，讓學生不能偷偷切換去玩遊戲。",
  },
  {
    term: "Apple Configurator",

    category: ["Core"],

    definition:
      "Apple Configurator 是 Mac 上的實體部署工具。當裝置發生嚴重故障需重刷 (IPSW)，或需要將非經銷商購買的裝置手動加入 ABM 時，需使用 USB 線連接此工具操作。它是 MDM 無法觸及時的救援與初始化工具。",

    analogy:
      "這是 IT 的「實體工作台」。當 iPad 死機連不上網，或是買來的二手設備不在公司管理名單內，就一定得拿 USB 線接上這台電腦，進行深度的重置或強制納管註冊。",
  },
  {
    term: "Apple Intelligence Management",

    category: ["Security"],

    definition:
      "Apple Intelligence Management（Apple Intelligence 管理）是針對 iOS 18+/macOS 15+ 生成式 AI 功能的 MDM 管控選項。企業可限制 AI 是否能分析使用者內容、是否允許資料傳送至私有雲端運算 (PCC)，以防止企業機密被 AI 模型讀取或外洩。",

    analogy:
      "這是針對 AI 功能的「保密開關」。雖然系統內建了強大的 AI 助理，但公司可以透過這個設定，禁止 AI 去讀取公司的郵件或文件內容，確保最敏感的商業機密不會被 AI 拿去分析或學習。",
  },
  {
    term: "Apple Intelligence Reports (AI 報告管理)",

    category: ["Security"],

    definition:
      "Apple Intelligence Reports（AI 報告管理）是 MDM 的進階稽核功能。當企業或學校禁止使用 AI 產生的內容摘要時（例如防止學生用 AI 寫閱讀心得），MDM 可停用裝置端的「Safari 網頁摘要」或「郵件智慧摘要」功能。",

    analogy:
      "這是為了防止「AI 代筆」的管控機制。就像學校規定讀書心得必須自己寫，不能叫學長代寫一樣。老師可以關閉平板上的 AI 摘要功能，確保學生是真的把文章讀完，而不是只看 AI 生成的懶人包。",
  },
  {
    term: "Apple Pencil",

    category: ["Hardware"],

    definition:
      "Apple Pencil 是 iPad 專用的主動式觸控筆，支援壓力感應與防手掌誤觸。在教育考試或特定工作場景中，MDM 可透過描述檔停用 Apple Pencil 的連線或特定手勢（如點兩下切換工具），以防止誤操作或作弊。",

    analogy:
      "這是 iPad 的「專用繪圖筆」。除了寫字畫畫，它還有電子功能（如輕點兩下換橡皮擦）。在嚴格的考試場合，監考單位可以鎖住這些電子快捷鍵，讓它變成一支只能寫字的普通鉛筆。",
  },
  {
    term: "Apple Silicon",

    category: ["Hardware"],

    definition:
      "Apple Silicon (M1/M2/M3...) 是 Apple 自行研發的晶片架構，取代了舊有的 Intel 處理器。它引入了嚴格的硬體安全機制，例如「Volume Owner（磁碟擁有者）」概念。這使得安裝系統更新或修改安全性設定時，必須通過硬體層級的身分驗證，改變了以往 MDM 只要有 Admin 權限就能做所有事的規則。",

    analogy:
      "這是 Apple 電腦的「新一代引擎」。以前的引擎（Intel）只要有鑰匙就能發動，現在的新引擎（M 晶片）為了防盜，還多了指紋辨識和 DNA 驗證（Volume Owner）。雖然更安全，但也讓修車師傅（IT 管理員）的工作變得更複雜。",
  },
  {
    term: "App Store",

    category: ["Apps"],

    definition:
      "App Store 是 Apple 官方的應用程式下載中心。在企業或學校的受監管裝置 (Supervised) 上，IT 人員通常會透過 MDM 完全隱藏 App Store 圖示，禁止使用者自行下載遊戲或娛樂軟體，僅允許透過內部的自強服務 (Self Service) 安裝經由公司審核的 App。",

    analogy:
      "這是 Apple 的「官方軟體百貨公司」。為了怕員工上班逛街、學生上課玩遊戲，公司可以直接把通往百貨公司的大門「水泥封死」（隱藏 App Store）。這樣使用者就只能去公司開設的福利社（Self Service）領取文具用品。",
  },
  {
    term: "ARD (Apple Remote Desktop)",

    category: ["Core"],

    definition:
      "Apple Remote Desktop (ARD) 是一套 Mac 專用的進階遠端管理軟體。雖然 MDM 負責大方向的設定，但 ARD 擅長處理「即時性」的任務，例如即時監控全班螢幕、接管滑鼠鍵盤協助故障排除，或是透過區域網路快速傳送大型檔案。",

    analogy:
      "這是 IT 下達「即時指令」的控制台。MDM 比較像貼公告（派送設定），大家看到了才會做；ARD 則是現場廣播（即時控制），IT 可以直接接管你的畫面幫你按按鈕，或是瞬間把檔案丟到你桌面上。",
  },
  {
    term: "ASM (Apple School Manager)",

    category: ["Apple"],

    definition:
      "Apple School Manager (ASM) 是教育機構專用的 Apple 設備管理入口（教育版的 ABM）。它除了管理裝置與 App 授權外，還能與學校的「學生資訊系統 (SIS)」連結，自動建立以課程為單位的「管理式 Apple 帳號」與班級名單，是推動數位教學的基礎與核心。",

    analogy:
      "ASM 是學校 Apple 設備的「數位教務處」。它不只管平板（財產），還管人（師生帳號）和課表（班級名單）。所有要在課堂上用的 iPad 和 App，都要先在這裡分配好，老師上課時才能直接看到正確的學生名單。",
  },
  {
    term: "Asset Tag (資產標籤)",

    category: ["Core"],

    definition:
      "Asset Tag（資產標籤）是企業內部自訂的財產管理編號（不同於 Apple 原廠序號）。MDM 可以將這組公司自編的財產號碼寫入裝置系統，並強制顯示在鎖定畫面或登入視窗上，方便 IT 人員進行實體盤點或遺失時辨識歸屬。",

    analogy:
      "這是印在螢幕上的「數位財產標籤」。就像公司會在椅子、螢幕背面貼上一張有條碼的財產貼紙。MDM 把這張貼紙數位化，直接顯示在 iPad 的鎖定畫面上，撿到的人不用解鎖就能知道這是「編號 A-101」的公務資產。",
  },

  // --- B ---
  {
    term: "Battery Health (電池健康度)",

    category: ["Hardware"],

    definition:
      "Battery Health（電池健康度）顯示裝置電池相較於全新狀態的最大蓄電容量（百分比）。MDM 可以遠端收集此數據，讓 IT 管理員找出這批設備中哪些電池已經老化（例如低於 80%），以便在還沒膨脹或故障前主動安排維修更換。",

    analogy:
      "這是電池的「體力檢測報告」。新電池體力是 100%，用久了體力會衰退。IT 不用把每一台 iPad 收回來檢查，只要看報表就知道哪幾台「體力不支」（老化），該換電池了，避免影響員工工作。",
  },
  {
    term: "Bonjour",

    category: ["Network", "Apple"],

    definition:
      "Bonjour 是 Apple 開發的零組態網路協定 (Zero Configuration Networking)。它讓 Apple 裝置能自動發現同一區域網路內的印表機 (AirPrint)、投影螢幕 (AirPlay) 和課堂裝置 (Apple Classroom)，完全無需手動設定 IP 位址。",

    analogy:
      "這是裝置的「自動打招呼」機制。就像新通學走進教室大喊「我是小明，我會畫畫」，其他人（裝置）就會自動認識他並知道他能做什麼（服務）。如果沒有 Bonjour，你就得知道每個人的詳細座位座標（IP 位址）才能跟他說話。",
  },
  {
    term: "mDNS (Multicast DNS)",

    category: ["Network"],

    definition:
      "Multicast DNS (mDNS) 是 Bonjour 技術的底層通訊協定。它使用 UDP 5353 連接埠在區域網路內進行廣播，讓裝置互相解析名稱。在跨網段（如不同樓層 VLAN）的校園網路中，網管人員通常需要設定 mDNS Gateway 才能讓 Bonjour 訊號跨越網段傳送。",

    analogy:
      "這是區域網路內的「廣播電台」。裝置透過這個電台發送「我在這裡」的訊號。因為是廣播，訊號通常穿不過牆壁（路由器/VLAN），除非網管幫忙架設中繼站（mDNS Gateway）轉播訊號。",
  },
  {
    term: "Bootstrap Token",

    category: ["Security"],

    definition:
      "Bootstrap Token（引導代幣）是 macOS 的自動化授權憑證。當第一位使用者啟用 FileVault 加密時，系統會產生此代幣並託管給 MDM。MDM 可使用此 Token 授權其他管理員帳號登入加密的 Mac，或在無人值守的情況下自動完成軟體更新的授權。",

    analogy:
      "這是 MDM 保管的「系統備用鑰匙」。當電腦被加密鎖住（FileVault）時，通常只有原使用者有鑰匙能開。Bootstrap Token 就是由 IT 保管的備用鑰匙，讓 IT 人員可以隨時開門進去維護，或是把鑰匙複製給新進員工使用。",
  },
  {
    term: "Bundle ID",

    category: ["Apps"],

    definition:
      "Bundle ID (Bundle Identifier) 是 App 在作業系統中的唯一識別碼（例如 com.google.chrome）。MDM 在派送 App、設定黑白名單或配置 VPN 時，必須精確使用此 ID 來指定目標 App，而非使用 App 的顯示名稱。",

    analogy:
      "這是 App 的「身分證字號」。世界上可能有很多 App 都叫「計算機」（同名），但身分證字號（Bundle ID）絕對不會重複。IT 系統只認這組號碼，確保不會抓錯人或派錯工作。",
  },
  {
    term: "BYOD (Bring Your Own Device)",

    category: ["Enrollment"],

    definition:
      "Bring Your Own Device (BYOD) 指員工或學生攜帶私人裝置到工作場所處理公務。透過 Apple 的「使用者註冊 (User Enrollment)」模式，企業可以在私人裝置上建立一個加密的「工作容器」來管理公務資料，同時完全無法存取使用者的私人照片、簡訊或 App，達成隱私與安全的平衡。",

    analogy:
      "這是「公私分明」的管理模式。就像你在自己的家裡（私人手機）劃出一張辦公桌（工作容器）給公司用。公司可以隨時整理或收回那張桌子上的文件，但絕對無權打開你家裡的其他抽屜或衣櫃。",
  },

  // --- C ---
  {
    term: "CDN (Content Delivery Network)",

    category: ["Network"],

    definition:
      "Content Delivery Network (CDN) 是 Apple 與教育部（TANet）合作建置的內容快取網路。它將熱門的 iOS 更新檔或 App 安裝包暫存在台灣本地的伺服器節點。當學校大量更新 iPad 時，流量會直接導向最近的 CDN 節點，大幅提升下載速度並減少對外頻寬壅塞。",

    analogy:
      "這是網路上的「超商取貨點」。不用每次都從美國總倉庫（Apple 總部）發貨，Apple 把常用的貨（更新檔）先送到台灣各地的超商（CDN）。學校要更新時，直接去巷口超商拿貨就好，速度快又不用付昂貴的國際運費（頻寬）。",
  },
  {
    term: "Client Isolation (用戶隔離)",

    category: ["Network"],

    definition:
      "Client Isolation（用戶隔離）是無線基地台 (AP) 的一項安全設定，禁止連上同一 Wi-Fi 的裝置互相通訊。雖然這能防止病毒在內網傳播，但也會直接導致 AirPlay、AirDrop 和其他依賴點對點連線的 Apple 課堂功能失效。",

    analogy:
      "這是 Wi-Fi 的「防群聚模式」。每台連上網的裝置都被關在獨立的房間裡，雖然都可以上網，但用喊的（廣播）聽不到隔壁的聲音。這雖然安全，但也讓大家無法分組討論（無法使用 AirPlay 投影或 AirDrop 傳檔）。",
  },
  {
    term: "Certificate (憑證)",

    category: ["Security"],

    definition:
      "Certificate（數位憑證）是用於網路身分驗證與加密通訊的電子文件。在 MDM 環境中，憑證用於證明裝置身分（S/MIME）、建立加密連線（TLS）、或簽署 App 程式碼。若憑證過期，裝置將無法連上 Wi-Fi 或與 MDM 伺服器通訊。",

    analogy:
      "這是網路世界的「數位身分證」與「印鑑證明」。就像去銀行辦事要帶證件一樣，裝置連線時要出示這張憑證，證明自己是合法的公司裝置，對方（伺服器）才會信任並建立連線。",
  },
  {
    term: "Certificate Authority (CA)",

    category: ["Security"],

    definition:
      "Certificate Authority (CA) 是負責簽發與管理數位憑證的可信第三方機構。裝置必須先安裝並信任 CA 的「根憑證 (Root Certificate)」，才會信任由該 CA 簽發的所有子憑證。企業通常會架設內部 CA 來發放 Wi-Fi 或 VPN 憑證。",

    analogy:
      "這是憑證的「發證機關」。就像戶政事務所負責發身分證、外交部負責發護照。只有這些權威機構蓋章發出的證件，大家才會承認是有效的。",
  },
  {
    term: "Command History",

    category: ["Core"],

    definition:
      "Command History（指令歷史）記錄了 MDM 對特定裝置發送過的所有指令及其執行結果（成功、失敗、待處理）。管理員可透過此紀錄追蹤裝置的操作歷程，例如確認何時發送了「鎖定裝置」指令，或查詢 App 安裝失敗的錯誤代碼。",

    analogy:
      "這是裝置的「操作紀錄檔」。就像銀行的存摺會列出每一筆交易紀錄，這裡會列出 IT 對這台裝置下達過的所有命令。如果出問題，查閱紀錄就能知道是哪個指令卡住了。",
  },
  {
    term: "Compliance",

    category: ["Security"],

    definition:
      "Compliance（合規性）是指裝置是否符合企業資安規範的狀態。管理員可設定一系列條件（如：必須設定密碼、OS 必須更新到最新版、不可越獄）。MDM 會持續檢查裝置狀態，若發現不合規，可自動執行限制存取或發送警告。",

    analogy:
      "這是裝置的「資安體檢標準」。就像進入無塵室前要檢查服裝儀容。系統會檢查每台裝置有沒有符合規定（打疫苗、戴口罩）。不合格的裝置會被擋在門外，直到改善後才能連接公司網路。",
  },
  {
    term: "Composer",

    category: ["macOS", "Jamf"],

    definition:
      "Composer 是 Jamf 提供的 macOS 軟體封裝工具。IT 人員可用它來監控軟體安裝前後的檔案系統變化 (Snapshot)，將複雜的安裝過程打包成一個標準的 .pkg 或 .dmg 檔案，以便透過 MDM 進行大量部署。",

    analogy:
      "這是製作安裝包的「打包機」。就像你要把一堆散亂的零件（檔案）寄給別人，Composer 幫你把這些零件整齊地裝進一個箱子（.pkg）並封好。收到箱子的人（其他 Mac），只要打開箱子，零件就會自動歸位，變成組裝好的樣子。",
  },
  {
    term: "Content Caching (內容快取)",

    category: ["Network"],

    definition:
      "Content Caching（內容快取）是 macOS 內建的頻寬優化服務。開啟此功能的 Mac 會自動暫存已下載的 iCloud 資料、App 或系統更新檔。當同網段的其他裝置需要下載相同內容時，會直接從這台 Mac 抓取，無需佔用對外頻寬，極大提升更新速度。",

    analogy:
      "這是辦公室內的「資源共享站」。就像有人去總公司開會拿了一份會議資料回來，並把資料影印放在辦公室櫃台。其他同事要看這份資料，直接去櫃台拿就好，不用每個人都親自跑一趟總公司。",
  },
  {
    term: "Custom B2B App",

    category: ["Apps"],

    definition:
      "Custom B2B App（自訂企業 App）是企業開發並透過 VPP 私密發佈的應用程式。這些 App 不會在公開的 App Store 上架，僅限特定企業透過 ABM 購買並分發給員工使用，適合部署內部專用的業務工具。",

    analogy:
      "這是企業內部的「私房軟體」。就像公司餐廳的隱藏菜單，外面的人點不到也買不到。只有公司授權的員工，才能透過內部的管道（MDM）安裝使用。",
  },

  // --- D ---
  {
    term: "DDM (Declarative Device Management)",

    category: ["Core"],

    definition:
      "Declarative Device Management (DDM) 是 Apple 推出的新一代 MDM 架構。不同於傳統 MDM 由伺服器持續輪詢指令，DDM 允許伺服器傳送「宣告 (Declaration)」給裝置。裝置會自主監控狀態並執行宣告內容，並在狀態改變時透過 Status Channel 主動回報，大幅減輕伺服器負擔並提升反應速度。",

    analogy:
      "這是從「聽口令動作」進化到「自主管理」的變革。傳統 MDM 像遙控車，按一下走一步；DDM 像自動駕駛車，你只要給它目的地（規則），車子會自己判斷路況、自己轉彎煞車，並主動回報「我到了」。",
  },
  {
    term: "DDM (Declarative Device Management)",

    category: ["Core"],

    definition:
      "Declarative Device Management (DDM) 是 MDM 的未來標準。Apple 透過此架構強化了裝置的自主性 (Autonomy) 與主動性 (Proactive)。裝置不再被動等待指令，而是能主動評估自身狀態（如空間不足、版本過舊）並觸發預定的管理動作。",

    analogy:
      "這是從「被動指派」轉變為「主動執行」。就像以前員工只會坐在位子上等老闆派工作，現在員工（裝置）拿到工作手冊後，會自己看進度、自己找事做，做完了再跟老闆回報。",
  },
  {
    term: "DDM App Management (宣告式 App 管理)",

    category: ["Apps"],

    definition:
      "DDM App Management 是基於 DDM 架構的應用程式部署方式。由裝置端全權負責 App 的下載、安裝進度監控與重試機制。若使用者不小心刪除受管 App，裝置會偵測到狀態不符宣告，並立即自動重新安裝，無需等待 MDM 伺服器發現。",

    analogy:
      "這是 App 的「自動補貨機制」。就像便利商店的智慧貨架，一旦發現架上的商品（App）被拿走了，貨架會自己發通知補貨，不用等店長巡店時才發現東西沒了。",
  },
  {
    term: "Deprecated (已棄用)",

    category: ["Other"],

    definition:
      "Deprecated（已棄用）是技術文件中的術語，表示某項功能或 API 已被原廠標記為「過時」。雖然目前版本可能仍可使用，但未來的系統更新將會移除它。IT 人員看到此標籤應儘早規劃遷移至新技術。",

    analogy:
      "這是技術上的「拆除預告」。這棟房子（舊功能）雖然還沒倒，但政府已經貼了紅單，隨時準備拆除。住戶（IT 人員）應該趕快找新房子搬家，不要等到怪手來了（功能失效）才手忙腳亂。",
  },
  {
    term: "Device Group (裝置群組)",

    category: ["Core"],

    definition:
      "Device Group（裝置群組）是 MDM 中用來分類管理裝置的容器。可分為「靜態群組 (Static)」：手動選擇裝置加入；以及「智慧型群組 (Smart)」：依據條件（如 iOS 版本、電量、部門）自動篩選裝置。群組是所有管理政策 (Policy) 與設定檔 (Profile) 的派發目標。",

    analogy:
      "就像學校的「分班制度」。靜態群組是「座號分班」，誰在哪一班是固定的；智慧型群組是「能力分班」，成績好的自動進 A 班，成績退步了就自動掉到 B 班，名單會隨時變動。",
  },
  {
    term: "DFU Mode (Device Firmware Update)",

    category: ["Hardware"],

    definition:
      "DFU Mode (Device Firmware Update) 是 iOS 裝置最底層的救援模式，位階低於復原模式 (Recovery Mode)。當裝置系統嚴重損壞、無法開機或卡在白蘋果時，需進入 DFU 模式才能強制重刷韌體。此模式下螢幕保持全黑，需連接電腦透過 Configurator 或 Finder 操作。",

    analogy:
      "這是裝置的「深度電擊急救」。當病患（裝置）已經沒有心跳呼吸，吃藥打針（重開機）都沒效時，只能送進加護病房進行電擊（DFU），試圖把它的生命跡象救回來。",
  },
  {
    term: "Directory Service (目錄服務)",

    category: ["Network"],

    definition:
      "Directory Service（目錄服務）是企業集中儲存與管理使用者身分、電腦資訊與存取權限的資料庫系統（如 Microsoft Active Directory, LDAP）。MDM 可與目錄服務整合，讓員工使用既有的公司帳號登入裝置或自強服務 App。",

    analogy:
      "這是全公司的「戶籍資料庫」。裡面詳細記錄了每個員工是誰、屬於哪個部門、權限等級是多少。其他系統（如 MDM）要查身分時，都會來問這個資料庫，確保資料一致。",
  },
  {
    term: "DMG (Disk Image)",

    category: ["macOS"],

    definition:
      "DMG (Disk Image) 是 macOS 特有的磁碟映像檔格式。雙擊開啟後，會在桌面上掛載成一個虛擬的磁碟機，裡面通常包含應用程式。使用者只需將 App 拖曳到「應用程式」資料夾即可完成安裝。這是 macOS 最常見的軟體分發方式。",

    analogy:
      "這是虛擬的「軟體光碟片」。下載 DMG 就像下載了一張光碟檔案。點開它，電腦裡就會多出一台光碟機，裡面裝著軟體。安裝完畢後，把光碟機「退出」丟掉就可以了。",
  },
  {
    term: "DNS (Domain Name System)",

    category: ["Network"],

    definition:
      "DNS (Domain Name System) 是網際網路的電話簿服務。它將人類容易記憶的網址（如 apple.com）翻譯成電腦需要的 IP 位址（如 17.253.144.10）。MDM 可透過設定，強制裝置使用特定的 DNS 伺服器，以達到網站過濾或加速存取的效果。",

    analogy:
      "這是網路的「自動查號台」。你知道店名（網址）但不知道電話（IP），所以先問查號台。查號台告訴你號碼後，你的電腦才能撥通電話連上網站。",
  },
  {
    term: "DHCP (Dynamic Host Configuration Protocol)",

    category: ["Network"],

    definition:
      "Dynamic Host Configuration Protocol (DHCP) 是一種自動分配 IP 位址的網路協定。當裝置連上網路時，DHCP 伺服器會自動租借一組 IP 給它使用。這避免了手動設定 IP 的麻煩與衝突風險。租約到期後，IP 會被回收並重新分配。",

    analogy:
      "這是網路上的「車位分配員」。當你開車進入停車場（連上網路），管理員自動指派一個車位（IP）給你停。你不用自己找車位，也不會跟別人的車位重複。離開後，車位就讓給下一台車。",
  },
  {
    term: "IP Address (IP 位址)",

    category: ["Network"],

    definition:
      "IP Address（IP 位址）是裝置在網路上的數位門牌，用於識別與定位。格式如 192.168.1.10 (IPv4)。分為「固定 IP (Static)」：手動設定，永久不變；以及「動態 IP (Dynamic / DHCP)」：由伺服器自動分配，會隨時間改變。MDM 伺服器依賴準確的 IP 來與裝置通訊。",

    analogy:
      "這是網路世界的「門牌號碼」。信差（資料）必須知道準確的地址（IP）才能把信送到你家。有些地址是買斷的（固定 IP），永遠屬於你；有些是租用的（動態 IP），退租後會換給別人用。",
  },
  {
    term: "SSID (Service Set Identifier)",

    category: ["Network"],

    definition:
      "Service Set Identifier (SSID) 是無線網路的名稱識別碼（如 School_WiFi）。MDM 可以透過設定描述檔 (Wi-Fi Payload) 預先將學校的 SSID 寫入裝置，讓裝置一進入訊號範圍就自動連線，使用者無需手動搜尋或輸入密碼。",

    analogy:
      "這是 Wi-Fi 的「招牌名稱」。你在手機 Wi-Fi 列表上看到的名字就是 SSID。就像找店面要看招牌，裝置也是認這個名字來決定要連到哪個無線網路。",
  },
  {
    term: "WPA / WPA2 / WPA3",

    category: ["Network", "Security"],

    definition:
      "WPA / WPA2 / WPA3 是 Wi-Fi 網路的安全加密標準。企業與校園環境通常採用等級最高的 WPA2/WPA3 Enterprise 模式，搭配 802.1X 身份驗證，確保只有授權的裝置與人員能存取網路。",

    analogy:
      "這是 Wi-Fi 的「防盜鎖等級」。WPA 像老式喇叭鎖（容易被撬開，已淘汰），WPA2 是標準鐵門鎖（目前最普遍），WPA3 則是銀行金庫鎖（最新、最安全）。企業通常會要求至少要用鐵門鎖等級以上的防護。",
  },

  // --- E ---
  {
    term: "Domain Capture (域名擷取)",

    category: ["Apple", "Security"],

    definition:
      "Domain Capture（域名擷取）是 Apple Business Manager 的安全性功能。當企業驗證了 Email網域（如 @company.com）的所有權後，可以強制接管所有使用該網域註冊的「個人 Apple ID」，要求使用者將其轉換為受企業管理的「管理式 Apple 帳號」，或更改為私人信箱。",

    analogy:
      "這是企業對公司信箱的「正名行動」。公司規定這網域是公家的，如果你以前私下用公司信箱去註冊個人帳號，現在必須把帳號交出來給公司管理，不然就得把信箱改成你私人的 Gmail。",
  },
  {
    term: "eSIM",

    category: ["Hardware"],

    definition:
      "eSIM（嵌入式 SIM 卡）是直接焊接在裝置電路板上的數位 SIM 卡。企業可透過 MDM 將電信資費方案（Carrier Plan）無線推送到 iPad 或 iPhone 上，無需採購與插拔實體 SIM 卡，大幅簡化行動網路版裝置的部署流程。",

    analogy:
      "這是「虛擬化」的手機門號卡。以前換電信公司要用迴紋針戳半天換小卡片，現在只要掃個條碼或按個鈕，卡片資料就直接寫進手機裡，馬上就能上網。",
  },
  {
    term: "Extension Attribute (擴充屬性)",

    category: ["Core"],

    definition:
      "Extension Attribute（擴充屬性）是 Jamf Pro 的高階功能，允許管理員使用 Script (Bash/Python) 收集標準 MDM 協定以外的客製化資訊。例如：偵測電腦是否安裝了非法的挖礦軟體、檢查電池循環次數，或確認某個內部設定檔是否存在。",

    analogy:
      "這是資產盤點的「自訂問卷」。標準的盤點只會問型號、序號（標準屬性）。Extension Attribute 讓你可加問：「你有沒有裝遊戲？」、「上次重開機是什麼時候？」等特殊問題，讓管理員掌握更細節的資訊。",
  },

  // --- F ---
  {
    term: "Face ID",

    category: ["Hardware"],

    definition:
      "Face ID 是 Apple 的臉部辨識技術，利用 TrueDepth 相機投射紅外光點建立 3D 臉部模型。它比指紋辨識或平面照片辨識更安全。MDM 可強制要求使用者必須啟用 Face ID 或 Touch ID 才能存取企業 App，作為密碼之外的第二道防線。",

    analogy:
      "這是刷臉解鎖的「3D 驗證」。它不是單純拍照比對，而是用紅外線掃描臉的立體形狀。就算有人拿你的照片放在鏡頭前，也無法騙過系統，安全性比傳統密碼更高。",
  },
  {
    term: "Federated Authentication (聯合驗證)",

    category: ["Apple"],

    definition:
      "Federated Authentication（聯合驗證）是一種身分整合機制。它將 Apple Business Manager 與企業的 Identity Provider (IdP)（如 Google Workspace 或 Microsoft Entra ID）連結。設定後，員工可以直接使用原本的公司帳號密碼登入「管理式 Apple 帳號」，無需另外記憶一組 Apple ID 密碼。",

    analogy:
      "這是帳號的「互通橋樑」。就像很多網站可以用「Facebook 登入」一樣。透過聯合驗證，員工可以用原本就有的公司 Google 帳號直接登入 Apple 的服務，不用再多辦一個新帳號。",
  },
  {
    term: "FileVault",

    category: ["Security"],

    definition:
      "FileVault 是 macOS 內建的全磁碟加密技術 (Full Disk Encryption)。啟用後，硬碟資料會被高強度加密 (XTS-AES-128)。即使電腦遺失或硬碟被拆出，沒有登入密碼或修復金鑰 (Recovery Key) 就完全無法讀取資料。這是企業資安合規的基本要求。",

    analogy:
      "這是整台電腦的「數位保險箱」。一般電腦如果被偷，小偷只要拔出硬碟就能看光資料。開啟 FileVault 後，整顆硬碟都被亂碼鎖住，沒有密碼，那顆硬碟對小偷來說就只是一塊廢鐵。",
  },
  {
    term: "Firmware",

    category: ["Hardware"],

    definition:
      "Firmware（韌體）是燒錄在硬體晶片中的底層控制軟體，負責硬體的初始化與基本運作（如 Mac 的 iBoot）。韌體介於硬體與作業系統 (macOS) 之間。Apple 通常會透過系統更新一併升級韌體，以修補底層安全漏洞。",

    analogy:
      "這是硬體零件的「內建大腦」。作業系統是給人用的軟體，韌體則是給機器用的軟體。它控制螢幕怎麼亮、風扇怎麼轉。這層軟體壞了，電腦連開機畫面都看不到。",
  },
  {
    term: "Firmware Password",

    category: ["macOS"],

    definition:
      "Firmware Password（韌體密碼）是 Intel Mac 的開機安全鎖（Apple Silicon Mac 改用 Recovery Lock）。設定後，必須輸入密碼才能使用外接硬碟開機或進入復原模式。這能防止未經授權的人員繞過主系統竊取資料。",

    analogy:
      "這是電腦的最底層「開機鎖」。一般的密碼是進了系統才要打，韌體密碼是一按開機鈕就要打。沒有這個密碼，小偷連重灌系統或用隨身碟開機這招都沒辦法用。",
  },

  // --- G ---
  {
    term: "Gatekeeper",

    category: ["Security"],

    definition:
      "Gatekeeper 是 macOS 的安全防護機制，預設會阻擋未經 Apple 公證 (Notarized) 的軟體執行，以防止惡意程式入侵。IT 人員可透過 MDM 暫時放寬限制，或將內部開發的 App 加入信任清單，避免員工在安裝合規軟體時被系統阻擋。",

    analogy:
      "這是系統的「軟體海關」。當你要執行剛下載的程式，海關（Gatekeeper）會檢查它有沒有 Apple 發的簽證（公證）。如果是來路不明的程式（無簽證），海關會直接攔截並拒絕入境執行。",
  },
  {
    term: "Global Proxy",

    category: ["Network"],

    definition:
      "Global HTTP Proxy（全域 HTTP 代理）是強制全機流量轉導的設定。啟用後，裝置所有上網流量（HTTP/HTTPS）都會先經過指定的代理伺服器 (Proxy Server) 過濾與紀錄。這通常用於校園網路的內容過濾（如過濾色情網站），但也可能導致部分 App 無法連線。",

    analogy:
      "這是網路流量的「必經檢查哨」。所有要進出的車輛（網路流量）都必須先開進這個檢查站受檢。檢查站可以過濾違禁品（色情網站），但也因為每台車都要停下來檢查，常會造成塞車（網速變慢）。",
  },

  // --- I ---
  {
    term: "Identity Provider (IdP)",

    category: ["Security"],

    definition:
      "Identity Provider (IdP) 是負責管理與驗證使用者身分的雲端服務（如 Microsoft Entra ID、Google Workspace）。MDM 不直接管理帳號，而是透過聯合驗證 (Federation) 把登入請求轉交給 IdP 處理，讓企業能用同一套帳號登入所有系統（SSO）。",

    analogy:
      "這是雲端的「戶政事務所」。其他網站或 App（MDM）不需要自己保存你的密碼，而是問這家事務所：「這個人是不是真的小明？」。事務所確認後發張證明，你就登入成功了。",
  },
  {
    term: "Install Later",

    category: ["Core"],

    definition:
      "Install Later（稍後安裝）是 MDM 發送更新指令的一種策略。系統會先在背景下載更新檔，但不會立即中斷使用者工作，而是等待夜間充電或使用者主動點擊時才進行安裝。這是減少使用者反感的最佳實務。",

    analogy:
      "就像「預約更新」。先把更新檔偷偷搬回家放著，等主人睡覺了再來敲敲打打裝修，這樣就不會吵到主人工作。",
  },
  {
    term: "iBeacon",

    category: ["Hardware"],

    definition:
      "iBeacon 是 Apple 的藍牙低功耗 (BLE) 定位技術。學校可在教室佈署 iBeacon 發射器，當學生的 iPad 偵測到特定訊號時，MDM 就能判斷裝置位置並自動觸發動作，例如：「進入圖書館自動靜音」或「進入教室自動開啟課本 App」。",

    analogy:
      "這是教室裡的「隱形感應樁」。就像捷運進站感應一樣，當 iPad 靠近裝有 iBeacon 的教室時，不需要刷卡，系統就會感應到「你進教室了」，然後自動幫你把上課用的書打開。",
  },
  {
    term: "IMEI",

    category: ["Hardware"],

    definition:
      "International Mobile Equipment Identity (IMEI) 是行動通訊裝置的全球唯一識別碼。每一台支援 SIM 卡的 iPad 或 iPhone 都有自己獨一無二的 IMEI 碼。如果裝置遺失，報警或向電信商掛失時，必須提供此號碼才能鎖定裝置訊號。",

    analogy:
      "這是手機的「身分證字號」。車牌（電話號碼）可以隨時換，但引擎號碼（IMEI）出廠就刻在機身上改不掉。只要知道這組號碼，電信警察就能追蹤這台機器現在連上哪座基地台。",
  },
  {
    term: "Install Application",

    category: ["Core"],

    definition:
      "Install Application 是 MDM 用來命令裝置安裝 App 的標準指令。MDM 會發送一個包含 App 資訊（如 App Store ID 或 Bundle ID）的清單給裝置，裝置收到後就會排程下載並安裝指定的應用程式。",

    analogy:
      "這是給裝置的「軟體採購單」。IT 勾選要裝什麼軟體，開出一張單子（Install Application）給裝置。裝置收到單子後，就會乖乖去 App Store 把清單上的貨（App）全部搬回來裝好。",
  },
  {
    term: "Intelligent Hub",

    category: ["Apps"],

    definition:
      "Intelligent Hub 是 VMware Workspace ONE 的用戶端 App。在 Jamf 的生態系中我們較少使用此術語，相對應的用戶端 App 是「Jamf Self Service」。它提供員工自助安裝軟體、檢視裝置狀態與接收 IT 通知的功能。",

    analogy:
      "這是裝置上的「公司入口 App」。就像是公司專屬的 App Store 兼佈告欄。雖然這是別家廠商（VMware）的產品名稱，但概念跟 Jamf Self Service 是一樣的。員工有問題先開這個 App 就對了。",
  },
  {
    term: "Inventory",

    category: ["Core"],

    definition:
      "Inventory（資產清單）是 MDM 資料庫中記錄的所有裝置詳細資訊。每次裝置連線回報 (Inventory Update) 時，都會更新這些資料，包含型號、序號、IP 位址、剩餘電量、已安裝 App 清單等。這是管理者進行決策與分組的基礎。",

    analogy:
      "這是所有裝置的「詳細名冊」。就像學校的學籍資料庫，不只記名字，還記了身高體重、住址、家長電話。MDM 定期點名，把每台裝置的最新狀況（電量、版本）都登記在名冊裡，方便老師（IT）管理。",
  },
  {
    term: "iPaaS",

    category: ["Other"],

    definition:
      "iPaaS (Integration Platform as a Service) 是一種雲端服務，提供平台讓企業整合不同應用程式、資料來源與流程。MDM 可透過 iPaaS 與其他企業系統（如 HR、ERP）串接，實現自動化流程。",

    analogy:
      "就像「數位世界的萬用轉接頭」。公司裡有各種不同廠牌的電器（系統），iPaaS 就像一個萬用插座，讓這些電器都能互相溝通、協同工作，不用再買一堆專用轉接頭。",
  },

  // --- J ---
  {
    term: "Jamf Connect",

    category: ["Security", "Jamf"],

    definition:
      "Jamf Connect 是 Jamf 開發的 mac 登入體驗強化工具。它取代了 macOS 原生的登入畫面，允許使用者直接用雲端帳號（Google, Microsoft Entra ID）登入 Mac，並自動同步雲端密碼與本機帳號密碼，解決忘記密碼與帳號不同步的問題。",

    analogy:
      "這是 Mac 的「雲端登入畫面」。傳統 Mac 要設另外一組開機密碼，容易忘記。用了 Jamf Connect，開機就可以直接打你在公司的 Google 帳號密碼登入，就像登入網頁一樣方便，而且密碼永遠跟公司同步。",
  },
  {
    term: "jamfHelper",

    category: ["macOS", "Jamf"],

    definition:
      "jamfHelper。Jamf 內建的輕量級對話框工具。IT 可透過腳本呼叫它顯示訊息視窗、按鈕選項或進度條，用於通知使用者軟體更新、收集使用者輸入或顯示政策執行狀態。",

    analogy:
      "就像「系統彈窗產生器」。IT可以用指令叫出一個視窗，上面寫「電腦需要重新啟動」並顯示倒數計時，讓使用者知道發生什麼事。",
  },
  {
    term: "Jamf Pro",

    category: ["Core", "Jamf"],

    definition:
      "Jamf Pro 是 Jamf 旗下的企業級 MDM 解決方案，即大家俗稱的「旗艦版」。它功能最強大、彈性最高，支援完整的 macOS 管理（Script, LaunchDaemon, Extension Attribute），適合需要高度客製化與複雜自動化流程的企業或大型組織。",

    analogy:
      "這是 MDM 界的「專業單眼相機」。功能多到數不完，按鈕可以自訂，鏡頭可以換，適合專業攝影師（IT 工程師）拍出任何想要的效果。雖然操作比較複雜，但沒有它做不到的事。",
  },
  {
    term: "Jamf Protect",

    category: ["Security", "Jamf"],

    definition:
      "Jamf Protect。專為 Mac 設計的端點防護系統 (Endpoint Security)，功能類似進階版防毒軟體。它利用 Apple 原生的 Endpoint Security Framework 來監控惡意行為，而不像傳統防毒軟體那樣拖慢系統效能。",

    analogy:
      "就像「專懂 Mac 的保鑣」。一般防毒軟體像外來的傭兵，穿著厚重盔甲（耗資源）且動作笨重。Jamf Protect 像受過忍者訓練的貼身保鑣，輕裝上陣，平常感覺不到他在，但在威脅出現的瞬間就會出手攔截。",
  },
  {
    term: "iPhone Mirroring (iPhone 鏡像)",

    category: ["macOS", "Security"],

    definition:
      "iPhone 鏡像。macOS 15 的新功能，允許在 Mac 螢幕上完全遠端操作 iPhone。MDM 可停用此功能以防止在公用電腦上洩漏個人隱私，或防止透過此管道規避某些 Mac 端的水印或稽核軟體。",

    analogy:
      "就像「電腦裡的虛擬手機」。你可以直接在電腦螢幕上滑手機、回簡訊，但這對公司的電腦來說，就像是一個無法監控的隱藏小視窗，所以有些公司會為了安全把它鎖起來。",
  },
  {
    term: "JSON (JavaScript Object Notation)",

    category: ["Other"],

    definition:
      "JSON (JavaScript Object Notation) 是一種輕量級的資料交換格式，易於人類閱讀與機器解析。在 MDM 中，我們常用 JSON 格式來編寫進階設定檔 (Schema) 或透過 API 傳遞資料。它的結構像是一層層的「鍵值對 (Key-Value)」。",

    analogy:
      "這是程式之間的「填空題表格」。格式非常固定且工整。例如：{ \"姓名\": \"小明\", \"年齡\": 10 }。電腦看到這個大括號和冒號，就能準確知道該把資料填進哪個欄位，絕對不會看錯行。",
  },

  // --- K ---
  {
    term: "Kernel Extension (Kext)",

    category: ["Core"],

    definition:
      "Kernel Extension (Kext) 是 macOS 的核心擴充功能（類似 Windows 的驅動程式）。因為 Kext 權限極高，若有漏洞會造成嚴重資安風險，因此 Apple 正逐步用較安全的 System Extension 取代它。現在安裝 Kext 需要在復原模式下降低安全性才能執行。",

    analogy:
      "這是作業系統的「心臟支架手術」。它直接修改系統最核心、最要命的部分（Kernel）。雖然能讓系統功能變強，但風險極高。現在 Apple 醫生已經不太願意動這種大刀，改推微創手術（System Extension）來替代。",
  },
  {
    term: "Keychain (鑰匙圈)",

    category: ["Security"],

    definition:
      "Keychain（鑰匙圈）是 Apple 裝置內建的加密密碼管理系統。它負責安全地儲存使用者的網站密碼、Wi-Fi 密碼、私密金鑰與數位憑證。使用者登入一次後，系統就會自動從鑰匙圈取出密碼代填，無需重複輸入。",

    analogy:
      "這是系統的「萬能鑰匙包」。你不用把每一把鑰匙（密碼）都掛在脖子上，而是交給這個隨身保險箱（Keychain）保管。只要用你的指紋或開機密碼打開這個保險箱，裡面的所有鑰匙都能直接拿來開門。",
  },

  // --- L ---
  {
    term: "Local Account",

    category: ["Core"],

    definition:
      "Local Account（本機帳號）是僅存在於該台電腦上的使用者帳號，其密碼與權限資訊都儲存在電腦硬碟裡，不與雲端同步。與「網路帳號」或「行動帳號」不同，本機帳號通常用於管理員維護或不聯網的裝置。",

    analogy:
      "這是房間的「獨立鑰匙」。這把鑰匙（帳號）只能開這扇門（這台電腦），去開別的房間門（其他電腦）是打不開的。不像通用的房卡（網域帳號）一張卡可以開很多間會議室。",
  },
  {
    term: "Lost Mode (遺失模式)",

    category: ["Security"],

    definition:
      "遺失模式。這是 MDM 的遠端鎖定功能。當裝置遺失時，IT 可透過 MDM 啟用此模式，裝置會立即鎖定並顯示自訂訊息（如聯絡電話），同時持續回報 GPS 位置。對方無法使用裝置，也無法關機或清除資料。找回後，IT 可遠端解除鎖定。此功能需要裝置處於受監管 (Supervised) 狀態。",

    analogy:
      "就像「手機的遠端防盜鎖」。iPad 掉了之後，IT 在辦公室按一個按鈕，這台 iPad 就會立刻鎖死並顯示「此裝置屬於 XX 學校，請撥 02-1234-5678」，同時會一直回報位置，讓你有機會找回來。",
  },
  {
    term: "LAPS (Local Administrator Password Solution)",

    category: ["Security"],

    definition:
      "本機管理員密碼解決方案。這是一種資安機制，確保每台電腦的本機管理員帳號 (Local Admin) 使用「隨機、唯一且定期輪替」的密碼，並將密碼儲存在 MDM 或目錄服務中。這能防止駭客猜到一組通用密碼後，橫向感染所有電腦。",

    analogy:
      "就像「自動換鎖系統」。以前所有房間的鑰匙都一樣，一把鑰匙開萬門。LAPS 則是每天自動把每扇門的鎖換成不同的新密碼，就算小偷今天偷到這間的鑰匙，也開不了隔壁的門，甚至明天鑰匙就失效了。",
  },
  {
    term: "LDAP",
    category: ["Apple"],
    definition:
      "Lightweight Directory Access Protocol (LDAP) 是一種網路協定，用於讀取企業內部的目錄服務資料庫（如 AD）。MDM 透過 LDAP 與企業伺服器溝通，以取得員工名單、部門架構與群組資訊，進而將管理政策精確地派發給特定部門的人員。",

    analogy:
      "這是系統查資料的「共通語言」。就像不管是去戶政事務所還是去銀行，只要用「中文」（LDAP 協定）溝通，就能查到這個人的基本資料（帳號資訊）。",
  },
  {
    term: "Lightning Connector",

    category: ["Hardware"],

    definition:
      "Lightning Connector（閃電連接埠）是 Apple 專屬的實體連接介面，廣泛用於 iPhone 5 至 iPhone 14 及舊款 iPad。雖然新款裝置已全面轉向 USB-C，但學校現存的舊設備仍大量使用此介面。支援充電與 USB 2.0 速度的資料傳輸。",

    analogy:
      "這是 Apple 舊款裝置的「專用充電孔」。跟安卓手機通用的 USB-C 長得不一樣，線不能混用。雖然現在新機都改用 USB-C 了，但學校裡那些還沒壞的舊平板都還是用這種線。",
  },
  {
    term: "Local Account",

    category: ["Core"],

    definition:
      "Local Account（本機帳號）是僅存在於該台電腦上的使用者帳號，其密碼與權限資訊都儲存在電腦硬碟裡，不與雲端同步。與「網路帳號」或「行動帳號」不同，本機帳號通常用於管理員維護或不聯網的裝置。",

    analogy:
      "這是房間的「獨立鑰匙」。這把鑰匙（帳號）只能開這扇門（這台電腦），去開別的房間門（其他電腦）是打不開的。不像通用的房卡（網域帳號）一張卡可以開很多間會議室。",
  },
  {
    term: "Lost Mode (遺失模式)",

    category: ["Security"],

    definition:
      "遺失模式。這是 MDM 的遠端鎖定功能。當裝置遺失時，IT 可透過 MDM 啟用此模式，裝置會立即鎖定並顯示自訂訊息（如聯絡電話），同時持續回報 GPS 位置。對方無法使用裝置，也無法關機或清除資料。找回後，IT 可遠端解除鎖定。此功能需要裝置處於受監管 (Supervised) 狀態。",

    analogy:
      "就像「手機的遠端防盜鎖」。iPad 掉了之後，IT 在辦公室按一個按鈕，這台 iPad 就會立刻鎖死並顯示「此裝置屬於 XX 學校，請撥 02-1234-5678」，同時會一直回報位置，讓你有機會找回來。",
  },

  // --- M ---
  {
    term: "管理式 Apple 帳號 (Managed Apple Account)",

    category: ["Apple"],

    definition:
      "Managed Apple Account（管理式 Apple 帳號）是專為企業與教育機構設計的帳號類型，舊稱 Managed Apple ID。它由組織透過 ABM/ASM 建立與擁有，雖然可用於登入 iCloud 與下載 App，但無法自行購買付費軟體，且組織有權重置密碼與稽核資料。",

    analogy:
      "這是「公務用」的 Apple 帳號。就像公司配發的 Email 信箱，是給你工作用的。公司可以隨時幫你找回密碼，離職時公司也會收回。跟你自己用 Gmail 註冊的私人帳號（個人 Apple ID）是完全不同的兩回事。",
  },
  {
    term: "Managed Device Attestation",

    category: ["Security"],

    definition:
      "Managed Device Attestation（管理式裝置證明）是 Apple 的高階安全功能。裝置利用內建的 Secure Enclave 生成無法被偽造的加密證明，向伺服器證實「我是真正的那台 iPad，不是駭客模擬的假裝置」。這比單純檢查序號更安全。",

    analogy:
      "這是裝置的「生物特徵認證」。以前只要報出身分證字號（序號），系統就相信你是本人。現在系統會要求驗指紋或虹膜（Attestation），確認你是活生生的本人，而不是拿著別人身分證照片的冒牌貨。",
  },
  {
    term: "Managed Open In",

    category: ["Security"],

    definition:
      "管理式開啟 (Managed Open In)。這是一項 DLP (資料外洩防護) 功能。MDM 可設定邊界，禁止「受管 App (如公司 Email)」的文件被「非受管 App (如個人 Line)」開啟。這能有效阻止員工將公司機密檔案轉傳到私人社交軟體。",

    analogy:
      "就像「公文不落地」。規定公司的機密文件只能在公司的桌子上（受管 App）閱讀，禁止帶回家或拿到外面的咖啡廳（私人 App）去打開。",
  },
  {
    term: "MDM (Mobile Device Management)",

    category: ["Core"],

    definition:
      "Mobile Device Management (MDM) 是一種用於集中管理行動裝置（手機、平板、筆電）的技術架構。IT 人員透過 MDM 伺服器無線發送指令，對遠端裝置進行軟體更新、資安設定、App 部署與遺失鎖定，無需接觸實體裝置。",

    analogy:
      "這是 IT 的「中央控制塔台」。就像塔台指揮空中所有的飛機（裝置）起降一樣。IT 人員坐在塔台（MDM Console）裡，就能指揮每一台裝置該去哪裡、該做什麼，不用爬到每一架飛機上去設定。",
  },
  {
    term: "MDM Profile (MDM 描述檔)",

    category: ["Core"],

    definition:
      "MDM Profile（MDM 描述檔）是安裝在裝置上的核心設定檔。它是裝置與 MDM 伺服器之間的「契約」。一旦安裝，裝置就正式受到管理；反之，若使用者移除了此描述檔，裝置就會立刻脫離管理，所有公司派發的 App 和 Wi-Fi 設定也會一併消失。",

    analogy:
      "這是受管裝置的「入職合約」。簽了合約（安裝描述檔），公司就給你員工證、配發電腦（派送資源），你也必須遵守公司規定。一旦你撕毀合約（移除描述檔），所有公司給你的福利和權限也會瞬間收回。",
  },

  // --- N ---
  {
    term: "N-1 Strategy",

    category: ["Core"],

    definition:
      "N-1 Support 指的是軟體版本相容性政策。系統通常會支援「當前最新版本 (N)」以及「前一個主要版本 (N-1)」。例如當 iOS 17 (N) 推出時，Jamf 會保證支援 iOS 17 與 iOS 16 (N-1)，但過舊的 iOS 15 就可能不再支援新功能。",

    analogy:
      "這是軟體的「保固範圍」。就像車廠通常保證新車款（N）和上一代車款（N-1）都有零件可修。再更老的舊車，原廠可能就不保證有零件了，要修可能會有問題。",
  },
  {
    term: "NIST Benchmarks (資安基準)",

    category: ["Security", "Education"],

    definition:
      "NIST 行動裝置資安基準。由美國國家標準與技術研究院制定的資安框架，已被教育部採納作為學習載具的安檢指標。包含 6 碼複雜密碼、自動更新強制、資料不落地等。",

    analogy:
      "就像「數位消防安檢標準」。每間學校的平板都要通過這套標準：滅火器（防毒）有沒有準備、逃生口（更新）有沒有通、防火牆（加密）有沒有蓋好，通過了才能上線。",
  },
  {
    term: "Notarization (公證)",

    category: ["Security"],

    definition:
      "Notarization（公證）是 Apple 的軟體安全審查機制。開發者在發布 macOS 軟體前，需上傳給 Apple 自動掃描惡意代碼。通過後，Apple 會發給「公證票證」，讓 Gatekeeper 放行安裝。這是確保 Mac 軟體不含病毒的關鍵步驟。",

    analogy:
      "這是軟體的「良民證」或「檢驗合格標章」。就像食品上市前要送驗，確認沒有塑化劑（惡意程式）。通過檢驗的產品會貼上合格標章，消費者（Gatekeeper）看到標章才會安心購買（執行）。",
  },
  {
    term: "Software Update",

    category: ["macOS", "Jamf"],

    definition:
      "Software Update（軟體更新）包含 macOS/iOS 的功能升級 (Upgrade) 與安全性修補 (Update)。MDM 透過宣告式管理 (DDM) 或傳統指令，可強制裝置在指定時間下載並安裝更新，或延後更新以確保應用程式相容性。",

    analogy:
      "這是裝置的「進化與修練」。軟體更新讓裝置學會新技能（新功能），或是把身體練得更強壯（修補漏洞）。IT 教練會安排時間表，規定大家什麼時候該練功。",
  },

  // --- O ---
  {
    term: "OIDC (OpenID Connect)",

    category: ["Security"],

    definition:
      "OpenID Connect。基於 OAuth 2.0 的新一代身分認證協定。Jamf Connect 與現代 SSO 登入流程大多採用此標準。它比傳統的 LDAP 更安全，支援多因素驗證 (MFA)，且傳輸的是 Token 而非密碼。",

    analogy:
      "就像「現代化數位通行證」。以前要一直輸入帳號密碼，現在你只要在 Google/Microsoft 那邊登入過，它就發給你一張臨時通行證（Token），拿著這張證去其他遊樂設施玩，不用再重複驗票。",
  },
  {
    term: "OTA (Over-The-Air)",

    category: ["Core"],

    definition:
      "Over-the-Air (OTA) 是一種無線傳輸技術，允許裝置透過 Wi-Fi 或行動網路接收系統更新、安裝 App 或接收 MDM 指令。使用者無需將裝置連接電腦與傳輸線，只要連上網，就能自動完成所有維護工作。",

    analogy:
      "這是「隔空取物」的技術。以前手機壞了或要升級，要拿去店裡插線用電腦修。現在就像手機會通靈一樣，雲端的大師（伺服器）發功，你的手機就修好了，完全不用插線。",
  },
  {
    term: "MAC Address",

    category: ["Network"],

    definition:
      "Media Access Control Address (MAC Address) 是網卡的實體位址，由 12 碼英數字組成（如 00:1A:2B:3C:4D:5E）。為了保護隱私，現代 iOS 預設會使用「私有 Wi-Fi 位址 (Private Wi-Fi Address)」，即隨機生成假的 MAC Address 給 Wi-Fi 基地台看，以防止被追蹤。",

    analogy:
      "這是網卡的「指紋」。理論上每張網卡的指紋都是全世界獨一無二的。但為了怕被跟蹤，現在的手機連 Wi-Fi 時會「戴手套」（私有位址），讓基地台看不出真正的指紋是誰。",
  },

  // --- P ---
  {
    term: "Package (.pkg)",

    category: ["macOS"],

    definition:
      "Package (.pkg) 是 macOS 的標準軟體安裝包格式。它包含應用程式的檔案、安裝腳本與權限設定。MDM 可透過 Policy 將 .pkg 檔派送至 Mac 並在背景靜默安裝，無需使用者輸入管理者密碼。",

    analogy:
      "這是軟體的「懶人包」。裡面不只有軟體本身，還包含了「要把檔案放在哪裡」、「安裝後要不要重開機」的說明書。電腦收到這個懶人包，就會自動照著說明書把軟體裝好。",
  },
  {
    term: "Passkeys",

    category: ["Security"],

    definition:
      "通行密鑰。這是 FIDO 聯盟與 Apple 推動的「無密碼」登入標準。它利用裝置的生物辨識（FaceID/TouchID）與公開金鑰加密技術來取代傳統密碼。企業正逐步導入 Passkeys 以消除釣魚攻擊與密碼外洩風險。",

    analogy:
      "就像「指紋就是密碼」。以後登入網站不用再想破頭記那串「P@ssw0rd123」了，只要對著鏡頭笑一下（刷臉）或按個指紋，門就開了。鑰匙就在你身上，別人偷不走。",
  },
  {
    term: "Patch Management",

    category: ["macOS", "Jamf"],

    definition:
      "補丁管理。透過 MDM 自動化更新第三方軟體（如 Chrome, Zoom, Adobe）的機制。Jamf Pro 的 Patch Management 功能可訂閱官方更新源，自動下載新版本並推送到 Mac，確保軟體保持最新以修補安全漏洞。",

    analogy:
      "就像「軟體自動更新服務」。不用每台電腦自己去官網下載新版，IT 設定好後，系統會自動幫所有電腦更新到最新版 Zoom 或 Chrome，保持安全無漏洞。",
  },
  {
    term: "Payload",

    category: ["Core"],

    definition:
      "Payload（設定承載）是描述檔 (Profile) 中的最小設定單位。一個 Profile 可以包含多個 Payload，例如一個「Wi-Fi 設定檔」可能包含「Wi-Fi 連線 Payload」與「憑證 Payload」。這是 MDM 組成管理策略的積木。",

    analogy:
      "這是設定檔裡的「單一條款」。如果描述檔是一份合約，Payload 就是合約裡的一條條規定，例如「第一條：要連 Wi-Fi」、「第二條：要設密碼」。你可以自由組合這些條款變成一份新合約。",
  },
  {
    term: "Pending Command",

    category: ["Core"],

    definition:
      "Pending Command（待處理指令）。已發送但裝置尚未執行或回應的 MDM 指令。常見原因為裝置離線、APNs 連線中斷或指令佇列堆積。等待裝置重新連線後會自動執行。",

    analogy:
      "就像「郵局待寄包裹」。信已經寫好放在郵局（MDM），但收件人（裝置）不在家或地址找不到，暫時寄不出去。等收件人回來就會自動送達。",
  },
  {
    term: "Platform SSO",

    category: ["Security"],

    definition:
      "Platform SSO (PSSO) 是 Apple 在 macOS 13 推出的新一代身分驗證技術，旨在取代傳統 AD 綁定。PSSO 允許 Mac 本機帳號與雲端 IdP（如 Microsoft Entra ID）直接同步密碼與權限，且支援在開機畫面直接進行雲端身分驗證。",

    analogy:
      "這是 Mac 的「雲端通行證」。以前電腦只認得本機密碼，現在透過 PSSO，電腦直接聽命於雲端總部。你在雲端改了密碼，電腦門鎖也會自動跟著換，真正實現一組帳號走天下。",
  },
  {
    term: "Policy (原則)",

    category: ["Core"],

    definition:
      "原則 (Policy)。這是 Jamf Pro (macOS) 管理的核心邏輯單元。一個 Policy 包含三個要素：觸發時機 (Trigger，如開機時)、執行範圍 (Scope，如所有工程師電腦)、以及執行動作 (Package/Script)。這是讓 Mac 自動執行任務的劇本。",

    analogy:
      "就像「自動化任務包」。設定好：「每天早上九點（時機），對所有業務部的電腦（範圍），執行安裝 Office 的動作（任務）」。時間一到，機器人就會自動去跑這些流程。",
  },
  {
    term: "Policy",

    category: ["macOS", "Jamf"],

    definition:
      "Policy（政策）是 Jamf Pro 用來執行管理任務的邏輯單元。一個 Policy 包含「觸發時機 (Trigger)」、「執行頻率 (Frequency)」與「執行內容 (Payload)」。例如：「每週一次 (頻率) 當使用者登入時 (時機)，執行軟體更新 (內容)」。",

    analogy:
      "這是 IT 的「自動化SOP」。就像你規定：「每週一早上（時機 + 頻率），警衛要檢查全大樓滅火器（任務）」。設好 Policy，MDM 就會自動照表操課，不用你每次手動下令。",
  },
  {
    term: "PreStage Enrollment",

    category: ["Enrollment", "Jamf"],

    definition:
      "PreStage Enrollment 是裝置在開機設定輔助程式 (Setup Assistant) 階段就會套用的部署設定。它決定了使用者開機後會看到哪些設定畫面（如跳過條款頁、跳過 Siri 設定），並可強制裝置在啟用當下立即自動安裝 MDM 描述檔。",

    analogy:
      "這是裝置的「開箱預設值」。就像你去餐廳點餐，服務生問你「要不要加辣？要不要蔥？」。PreStage Enrollment 就是你先把這些喜好都勾好交給廚房。等iPad一端上來（開機），就已經是你設定好的樣子（跳過所有囉唆的設定），直接開吃（使用）。",
  },
  {
    term: "PPPC (Privacy Preferences Policy Control)",

    category: ["Security", "macOS"],

    definition:
      "Privacy Preferences Policy Control (PPPC) 允許 MDM 預先授權應用程式存取敏感資料（如相機、麥克風、桌面檔案）。這能避免使用者在使用公司派發的軟體時，頻繁跳出「是否允許存取」的擾人視窗。",

    analogy:
      "這是應用程式的「特權通行證」。一般 App 要用麥克風都要先問過使用者。但有這張通行證（PPPC）的 App（如遠距會議軟體），系統會直接放行，讓使用者不用一直點「同意」。",
  },
  {
    term: "Profile (Configuration Profile)",

    category: ["Core"],

    definition:
      "Configuration Profile（設定描述檔）是一個 XML 格式的檔案（.mobileconfig），用來設定 Apple 裝置的功能。例如：設定 Wi-Fi 密碼、Email 帳號、密碼複雜度要求或限制使用相機。MDM 的核心工作就是派送這些檔案給裝置。",

    analogy:
      "這是給裝置的「操作守則」。就像學校發給學生的手冊，裡面寫著「幾點上學（設定）」、「不能帶零食（限制）」。裝置拿到這本手冊，就會乖乖照著裡面的規定運作。",
  },
  {
    term: "Provisioning Profile",

    category: ["Apps", "Security"],

    definition:
      "Provisioning Profile（佈建描述檔）是 Apple 開發者帳號簽署的授權檔案，允許 App 在特定裝置上執行。對於企業內部開發的 App (In-House App)，此檔案必須每年更新一次。若檔案過期，App 將立即無法開啟閃退。",

    analogy:
      "這是 App 的「臨時居留證」。一般 App 上架 App Store 就像拿到永久身分證。但企業內部 App 只有居留證，期限一到（過期），App 就會被鎖住不能用，必須去換發新證件。",
  },
  {
    term: "Proxy",

    category: ["Network"],

    definition:
      "Proxy（代理伺服器）是位於裝置與網際網路之間的中介站。裝置不直接連上網頁，而是請 Proxy 代為抓取資料。這不僅能加速網頁載入（透過快取），還能讓網管人員過濾不想讓使用者看到的內容（如暴力或色情網頁）。",

    analogy:
      "這是網路的「代購業者」。你想買美國的東西（連美國網站），自己去買很慢又危險。你委託代購（Proxy）幫你買，他會幫你檢查東西有沒有問題（過濾病毒），再交給你。",
  },
  {
    term: "Push Notification (推播通知)",

    category: ["Core", "Apple"],

    definition:
      "Push Notification（推播通知）是伺服器主動發送訊息給裝置的技術。MDM 透過 Apple 的推播服務 (APNs) 發送「喚醒封包」給裝置，告訴裝置「有新指令了，快來跟伺服器連線」。這是 MDM 即時管理的基礎。",

    analogy:
      "這是伺服器的「戳一下」。裝置平常為了省電會睡覺。當 MDM 有事要找裝置時，不能直接搖醒它，而是發一個推播（戳一下），裝置感覺到震動醒來後，才會主動打電話回伺服器問：「老闆找我什麼事？」",
  },
  {
    term: "Private Relay (私密轉送)",

    category: ["Security", "Apple"],

    definition:
      "iCloud Private Relay（私密轉送）是 Apple 提供給 iCloud+ 用戶的隱私服務。它會將 Safari 的瀏覽流量加密並經過兩次轉送，隱藏使用者的真實 IP。這可能會導致企業網管無法識別流量來源，因此大多數學校網路會阻擋此功能。",

    analogy:
      "這是上網的「隱形斗篷」。穿上它（開啟功能），網站就看不到你是誰（IP），網管也看不到你去哪。但在學校裡，因為老師需要知道誰在做什麼（安全考量），所以通常規定在學校不能穿隱形斗篷。",
  },
  {
    term: "Private Wi-Fi Address (私有 Wi-Fi 位址)",

    category: ["Network", "Security"],

    definition:
      "Private Wi-Fi Address（私有 Wi-Fi 位址）是 iOS/iPadOS 為了防止被追蹤而隨機生成的假的 MAC Address。這能保護使用者隱私，但在依賴 MAC Address 進行認證（MAC Binding）的校園網路中，會導致裝置無法連線或被視為陌生裝置。",

    analogy:
      "這是連 Wi-Fi 時用的「假名」。去咖啡廳連 Wi-Fi 用假名沒關係，但在學校，警衛（路由器）只認得你的真名（真實 MAC）。如果你一直報假名，警衛就不讓你進校門（連不上網）。",
  },

  // --- Q ---
  {
    term: "QR Code Enrollment",

    category: ["Enrollment"],

    definition:
      "QR Code Enrollment（QR Code 註冊）。透過掃描 QR Code 快速完成 MDM 註冊的方式。QR Code 內含 MDM 伺服器網址與憑證，裝置掃描後自動下載描述檔並註冊，簡化手動輸入流程。",

    analogy:
      "就像「掃碼報到」。新員工不用手動輸入一長串伺服器網址和設定，只要用相機掃一下QR Code，所有註冊資訊就自動填好並完成報到。",
  },

  // --- R ---
  {
    term: "RADIUS",

    category: ["Network"],

    definition:
      "RADIUS。遠端使用者撥號驗證服務。企業常用的認證協定，搭配 802.1X 控制網路存取。當裝置嘗試連接 Wi-Fi，路由器會將憑證轉發給 RADIUS 伺服器驗證，通過後才允許連線。",

    analogy:
      "就像「門禁系統的驗證主機」。你刷門禁卡（憑證），讀卡機把資料傳給總機房的驗證電腦（RADIUS），確認你是員工才開門，不是的話就拒絕。",
  },
  {
    term: "Rapid Security Response (RSR)",

    category: ["Security"],

    definition:
      "Rapid Security Response (RSR) 是 Apple 用於修補重大安全漏洞的快速更新機制。不同於完整的系統升級 (OS Upgrade)，RSR 檔案較小、安裝速度快，且通常不需要重開機（或僅需快速重啟），讓 IT 能在零日攻擊風險出現時迅速部署防禦。",

    analogy:
      "這是系統的「急救貼布」。不用進行全身大手術（完整系統更新），哪裡受傷（有漏洞）就趕快貼個 OK 繃止血。動作快、副作用小，貼上去就能繼續打仗。",
  },
  {
    term: "Recovery Lock",

    category: ["Security"],

    definition:
      "復原鎖。這是 Apple Silicon Mac 的關鍵防護機制。它禁止未經授權的使用者透過長按開機鍵進入「復原模式 (Recovery Mode)」來清除電腦或降低安全性設定。要進入復原模式，必須輸入 MDM 設定的一組密碼。",

    analogy:
      "就像「急診室的密碼鎖」。以前任何人都可以把電腦送進急診室（復原模式）隨便亂搞。現在急診室門口裝了鎖，不知道密碼的人，連重灌電腦的機會都沒有。",
  },
  {
    term: "Remote Management",

    category: ["Core", "Jamf"],

    definition:
      "Remote Management 指透過 MDM 對裝置進行遠端配置與監控的過程。在 Apple 裝置上，這通常特指「裝置本身已開啟接受 MDM 管理的權限」。在「設定輔助程式」中看到的「遠端管理」畫面，就是確認裝置即將被納入 MDM 體系的關鍵步驟。",

    analogy:
      "這是裝置的「被託管狀態」。就像你把房子交給物業公司代管。物業公司（MDM）可以遠端幫你收信、修繕、換鎖，你不用親自處理這些雜事。",
  },
  {
    term: "Restricted Software",

    category: ["Security"],

    definition:
      "Restricted Software（受限軟體）是 Jamf Pro 的黑名單機制。系統會監控使用者是否開啟了被禁止的應用程式（如遊戲或 macOS 安裝檔）。一旦偵測到，系統會立即強制關閉該程式並刪除，同時跳出警告視窗。",

    analogy:
      "這是公司的「違禁品糾察隊」。糾察隊隨時在旁邊盯著，只要你敢把遊戲機（違禁軟體）拿出來，他馬上衝過來沒收，還會記你一筆。",
  },
  {
    term: "Return to Service",

    category: ["Enrollment"],

    definition:
      "重置並自動部署。這是一項現代化的清除指令。當 MDM 發送此指令清除 iOS 裝置時，會同時寫入一組 Wi-Fi 設定。裝置清除完畢後，會自動連上 Wi-Fi 並重新向 MDM 註冊，完全無需人工介入點擊螢幕。這對共享裝置或自助服務站 (Kiosk) 非常重要。",

    analogy:
      "就像「轉生保留記憶」。這台裝置喝了孟婆湯（清除資料）準備投胎，但口袋裡被塞了一張紙條（Wi-Fi 設定）。所以它一醒來，不用人教，自己就知道路跑回來公司報到。",
  },
  {
    term: "Root Certificate",

    category: ["Security"],

    definition:
      "Root Certificate（根憑證）是信任鏈 (Chain of Trust) 的源頭。所有受信任的數位憑證，最終都必須追溯到一個受系統信任的 Root CA。MDM 必須將企業的 Root Certificate 派送到裝置，裝置才會信任企業內部的 Wi-Fi 或網站。",

    analogy:
      "這是信任的「老祖宗」。憑證像家譜一樣有層級。如果裝置信任這位老祖宗（Root CA），那麼所有由老祖宗認可的子孫（子憑證），裝置也會一併信任。如果老祖宗不被信任，整家族都會被拒於門外。",
  },
  {
    term: "Rosetta 2",

    category: ["macOS"],

    definition:
      "Rosetta 2。Apple Silicon Mac 的 Intel 指令集轉譯層。可即時將 Intel (x86_64) App 翻譯成 ARM64 指令執行，讓舊版 Mac軟體也能在 M系列晶片上運行。首次執行需安裝，MDM 可預先部署。",

    analogy:
      "就像「即時翻譯機」。新的 M晶片電腦說 ARM 語言，舊軟體說 Intel 語言。Rosetta 2 在中間即時翻譯，讓舊軟體能在新電腦上跑，雖然稍慢但能用。",
  },
  {
    term: "Roster (班級名冊)",

    category: ["Education"],

    definition:
      "班級名冊。在教育環境中，ASM 可透過 SFTP 或手動方式匯入學生與教師的班級資料（CSV 格式）。這些資料會自動同步到 Apple Classroom App，讓老師的 iPad 一開啟課堂 App 就能看到正確的學生名單。",

    analogy:
      "「數位點名簿」。就像老師手上的點名冊，系統會自動把哪些學生在哪個班、誰是導師的資料填好。老師打開 App，學生名單已經準備好了，不用手動一個個加。",
  },

  // --- S ---
  {
    term: "SCEP (Simple Certificate Enrollment Protocol)",

    category: ["Security"],

    definition:
      "簡易憑證註冊協定。這是一種讓裝置自動向憑證授權中心 (CA) 申請憑證的標準。透過 SCEP，MDM 可以發送一個設定檔，讓裝置自己去跟 CA 說：「我是合法的，請發給我一張 Wi-Fi 通行證」。這是實現零接觸 Wi-Fi 部署的關鍵。",

    analogy:
      "就像「自動辦證通道」。不用每個人都親自去櫃檯排隊辦證件。MDM 給你一張介紹信，你拿著信去機器掃一下，證件就自動印出來給你了。",
  },
  {
    term: "Schoolwork App",

    category: ["Education"],

    definition:
      "Schoolwork App。Apple 為 K-12 教育設計的作業管理工具。老師可發布講義（Handouts）、指派 App 活動、追蹤學生進度，並查看學生在教育 App 中的學習時間與成績。與 Apple Classroom 整合使用。",

    analogy:
      "就像「數位作業簿與聯絡簿」。老師在App裡派作業、附上教材連結、設定繳交期限。學生繳交後，老師能看到每個人的進度和成績，還能檢視學習時間。",
  },
  {
    term: "Scope (範圍)",

    category: ["Core", "Jamf"],

    definition:
      "Scope（部署範圍）是 Jamf Pro 中決定 Policy 或 Profile 要派發給哪些裝置的設定。管理員可精確設定 Scope 為「全體裝置」、「特定群組」或「排除特定群組」。例如：「派送 Office 給全公司（Target），但排除財務部（Exclusion）」。",

    analogy:
      "這是任務的「點名單」。就像老師指派打掃工作：「全班同學（Target）都要去掃地，但是受傷的同學（Exclusion）不用去」。Scope 就是這張決定誰要做、誰不做的名單。",
  },
  {
    term: "Script",

    category: ["macOS"],

    definition:
      "Script（腳本）是一段由程式碼組成的指令集（通常是 Bash 或 Python）。它給予管理員超越標準 MDM 功能的強大控制力，能執行複雜的客製化任務，如：修改系統隱藏設定、自動修復印表機連線、或定期清理暫存檔。",

    analogy:
      "這是給電腦的「錦囊妙計」。當標準功能（一般按鈕）不夠用時，IT 會寫一段咒語（程式碼）放在錦囊（Script）裡。電腦打開執行後，就能做出原本做不到的神奇事情。",
  },
  {
    term: "Secure Token",

    category: ["Security"],

    definition:
      "Secure Token（安全權標）是 macOS 上授予使用者「啟用 FileVault 加密」權限的數位憑證。在現代 macOS 中，必須擁有 Secure Token 的使用者帳號，才能解鎖被 FileVault 加密的硬碟。通常建立的第一個使用者會自動獲得此權限。",

    analogy:
      "這是加密硬碟的「授權印章」。只有蓋過這個章（擁有 Token）的使用者，才有資格轉動保險箱的轉盤（解鎖硬碟）。如果你沒有這個章，就算你有帳號密碼，電腦也不讓你開機進入系統。",
  },
  {
    term: "Shared iPad (共用 iPad)",

    category: ["Education", "Enrollment"],

    definition:
      "Shared iPad（共享 iPad）模式允許一台 iPad 供多位學生輪流登入使用。學生輸入自己的管理式 Apple 帳號後，iPad 會從雲端拉取該學生的作業與資料，並呈現專屬的個人化桌面。登出後，資料會同步回雲端並從本機清除（或暫存），讓下一位學生使用。",

    analogy:
      "這是平板的「公用電腦模式」。就像圖書館的公用電腦，A 同學用完登出，B 同學登入時看到的是乾淨的桌面。每個人的檔案都存在雲端，不會混在一起，一台機器可以服務好多人。",
  },
  {
    term: "Self Service",

    category: ["Apps", "Jamf"],

    definition:
      "Self Service（自助服務）是 Jamf 提供的企業專屬應用程式商店。IT 人員可將公司核准的 App、修復腳本、電子書或設定檔上架至此。員工可隨時自行開啟 Self Service 安裝所需資源，無需等待 IT 人員協助，也無需 admin 權限。",

    analogy:
      "這是公司的「軟體福利社」。員工缺什麼軟體（如 Office, Photoshop），只要打開這個 App 自己點一下「安裝」就好，不用填單申請，也不用麻煩 IT 人員跑過來幫你裝。",
  },
  {
    term: "Setup Assistant",

    category: ["Enrollment"],

    definition:
      "設定輔助程式。Apple 裝置第一次開機時出現的引導畫面（Hello/哈囉畫面開始）。它會逐步詢問語言、Wi-Fi、Apple 帳號、定位服務等設定。透過 ADE + PreStage，IT 可以跳過大部分畫面，讓裝置直接進入可用狀態。",

    analogy:
      "就像「新手教學關卡」。就像遊戲一開始的新手村，會問你一堆問題：選語言、連網路、創帳號。但公司可以幫你設定「跳關」，讓你直接跳到主畫面開始使用。",
  },
  {
    term: "Single App Mode (Kiosk Mode)",

    category: ["Apps"],

    definition:
      "Single App Mode（單一 App 模式），俗稱 Kiosk 模式。這是一種將 iPad 或 iPhone 鎖定在「單一個應用程式」無法退出的狀態。常用於博物館導覽、餐廳點餐機或考試專用機，防止使用者跳出畫面去玩遊戲或修改設定。",

    analogy:
      "這是裝置的「專用機模式」。就像超商的 iBon 機器，雖然它本質上是一台電腦，但你只能用它來印票、繳費，沒辦法把視窗縮小去開 Facebook 或 YouTube。",
  },
  {
    term: "SIP (System Integrity Protection)",

    category: ["Security"],

    definition:
      "系統完整性保護。macOS 的核心防護罩。它禁止任何使用者（包含最高權限的 root）修改系統核心檔案與資料夾（如 /System, /usr）。這確保了就算惡意軟體拿到了 root 權限，也無法破壞作業系統的根基。",

    analogy:
      "就像「防彈玻璃罩」。把最重要的系統核心檔案放在防彈玻璃後面。就算你是這棟房子的主人（root），拿著大鐵鎚想去敲那些檔案，也會被玻璃擋住敲不到。",
  },
  {
    term: "Site (Jamf Pro Sites)",

    category: ["Core"],

    definition:
      "Sites（分站）。Jamf Pro 的多租戶架構功能。一個 Jamf 伺服器可以分割成多個虛擬「分站」，每個分站有獨立的管理員、裝置、設定，彼此資料隔離。這常用於縣市教育局集中管理數十所學校的情境。",

    analogy:
      "就像「總公司下的分公司」。一台大型伺服器就像總公司大樓，但裡面分成好幾個獨立辦公室（分站）。台北辦公室看不到高雄辦公室的資料，各自管理自己的員工和裝置。",
  },
  {
    term: "Smart Group",

    category: ["Core", "Jamf"],

    definition:
      "Smart Group（智慧型群組）是 Jamf Pro 的核心功能，依據特定條件（如：電量<20%、未安裝 Office、屬於財務部）自動篩選裝置。當裝置狀態改變時，會自動加入或移出群組。這是實現「自動化管理」的基礎。",

    analogy:
      "這是管理的「自動分類機」。你設好規則：「只要是紅色的球就分到 A 籃」。系統就會自動盯著所有球，一變成紅色就抓過去，褪色了就踢出來。完全不用人工手動分類。",
  },
  {
    term: "Security Update",

    category: ["Core", "Jamf"],

    definition:
      "Security Update（安全性更新）是針對作業系統漏洞的修補程式。這類更新通常不包含新功能，僅修復已知的資安風險。MDM 可設定強制裝置在背景自動下載並安裝安全性更新，以確保防護網隨時維持在最新狀態。",

    analogy:
      "這是系統的「抗體補強」。就像打流感疫苗一樣，雖然不會讓你變壯（增加新功能），但能讓你產生抗體（修補漏洞），抵抗最新的病毒攻擊。這是最基本也最重要的保養。",
  },
  {
    term: "Status Channel",

    category: ["Core"],

    definition:
      "Status Channel（狀態通道）。DDM 的核心機制之一。裝置會主動透過此通道向 MDM 伺服器回報狀態變化（如 App 安裝成功、電池低於20%），無需伺服器輪詢，實現即時監控。",

    analogy:
      "就像「主動回報系統」。以前是老闆每小時問一次「做完了沒」（輪詢），現在是員工做完就主動回報「完成了」（狀態通道），效率更高也不用一直打擾。",
  },
  {
    term: "Supervision (受監管)",

    category: ["Core"],

    definition:
      "Supervision（監管模式）是 iOS 裝置的最高管理權限狀態。透過 ADE 註冊或 Apple Configurator 處理過的裝置會進入此模式。只有在監管模式下，MDM 才能執行「單一 App 模式」、「網頁內容過濾」或「靜默安裝 App」等進階管理功能。",

    analogy:
      "這是裝置的「公司資產模式」。一般買來的 iPhone 是「個人模式」，很多設定不能鎖。一旦進入監管模式，這台手機就認定是「公司的財產」，權限全開，IT 想鎖什麼就可以鎖什麼。",
  },
  {
    term: "System Extension",

    category: ["Core"],

    definition:
      "System Extension（系統擴充功能）是 macOS 新一代的系統擴充機制，取代舊有的 Kext。它運行在使用者空間 (User Space) 而非核心空間，因此就算當機也不會導致整台電腦崩潰，安全性與穩定性大幅提升。",

    analogy:
      "這是作業系統的「微創手術」。以前要加功能（如防毒）得在心臟（Kernel）上動刀（Kext），風險很大。現在改成穿戴式裝置（System Extension），功能照樣強大，但絕對不會危及生命安全。",
  },

  // --- T ---
  {
    term: "Temporary Session (Guest Mode)",

    category: ["Education"],

    definition:
      "臨時工作階段（訪客模式）。Shared iPad 的一種使用模式。使用者點擊「訪客」即可免帳號登入使用。登出後，所有資料（瀏覽紀錄、下載檔案、App 資料）會被立即清除，確保下一位使用者拿到的是乾淨的裝置。",

    analogy:
      "就像「圖書館公用電腦」。你不用登入帳號，坐下就能用。但你離開後，系統會自動清空你的瀏覽紀錄和下載資料，下一個人看不到你用過的痕跡。",
  },
  {
    term: "TestFlight",

    category: ["Apps"],

    definition:
      "TestFlight。Apple 官方的 Beta 測試平台。開發者可上傳測試版 App，透過邀請碼分發給內部測試人員或公開測試者。最多可邀請 10,000 名外部測試者，每個測試版有效期 90 天。",

    analogy:
      "就像「搶先體驗版發布平台」。遊戲還沒正式上架，開發商先給一群玩家試玩測試版，收集bug回饋。玩家下載專屬App（TestFlight）就能安裝搶鮮版。",
  },
  {
    term: "TLS / SSL",

    category: ["Security"],

    definition:
      "TLS (Transport Layer Security) 和 SSL (Secure Sockets Layer) 是用於加密網路通訊的協定。它們確保資料在客戶端（如瀏覽器）和伺服器之間傳輸時不被竊聽或篡改。MDM 伺服器與裝置之間的通訊也依賴 TLS 加密。",

    analogy:
      "這是網路世界的「加密郵筒」。你把信（資料）放進去，郵筒會自動加密上鎖，確保郵差（網路）在傳遞過程中，沒人能偷看或竄改你的信件內容。",
  },
  {
    term: "Token (代號/權杖)",

    category: ["Security"],

    definition:
      "Token（代號/權杖）是身分驗證中的數位憑證。當使用者輸入帳號密碼登入後，伺服器會發給一張 Token。之後使用者要存取資料時，只要出示這張 Token 即可，無需重複輸入密碼。Token 通常有時效性，過期需換發。",

    analogy:
      "這是遊樂園的「當日手環」。你在門口驗過票（輸入帳密）後，工作人員給你戴上手環（Token）。接下來你要玩任何設施，只要秀出手環就好，不用每玩一項都拿身分證出來驗。",
  },
  {
    term: "Touch ID",

    category: ["Hardware"],

    definition:
      "Touch ID。Apple 的電容式指紋辨識感測器,整合於 Home 鍵或電源鍵。用於裝置解鎖、Apple Pay 與 App 授權驗證。MDM 可設定某些敏感 App 必須使用Touch ID 才能開啟。",

    analogy:
      "就像「指紋密碼鎖」。把手指放在感應器上，機器記住你的指紋紋路。下次碰一下就解鎖，比輸入6位數密碼快多了。",
  },

  // --- U ---
  {
    term: "UIE (User-Initiated Enrollment)",

    category: ["Enrollment"],

    definition:
      "使用者自行啟動註冊。這是透過網頁連結或 QR Code 讓使用者主動下載 MDM 描述檔的註冊方式。缺點是無法達到完整的監管狀態，且使用者可以隨時移除描述檔，因此不適合企業用的公配載具。",

    analogy:
      "就像「自願報名制」。不像 ADE 是強制徵召，UIE 是使用者自己去網站報名參加管理。但既然是自願的，使用者也可以隨時退出，公司管不住。",
  },
  {
    term: "Unified Logging",
    category: ["Core"],
    definition:
      "Unified Logging 是 Apple 裝置的統一系統日誌機制。它會收集系統核心與應用程式的運作紀錄。當裝置發生問題時，IT 人員可透過 `log collect` 指令導出這些日誌檔，分析錯誤發生的原因與時間點。",
    analogy:
      "這是飛機的「黑盒子」。它默默記錄著飛機（裝置）飛行過程中的所有數據和對話。平常沒人理它，但一旦這架飛機出事（當機、連不上網），調查人員第一個就是要找黑盒子來分析原因。",
  },
  {
    term: "Universal Binary",

    category: ["macOS"],

    definition:
      "Universal Binary（通用二進位檔）。同時包含 Intel (x86_64) 與 Apple Silicon (arm64) 兩種架構編譯碼的 App。可在兩種晶片的 Mac 上原生執行，無需 Rosetta 轉譯，效能最佳。",

    analogy:
      "就像「雙語版軟體」。同一個App裡面包含兩種語言版本（Intel版和M晶片版），電腦會自動選擇對應語言執行，不需要翻譯，速度最快。",
  },
  {
    term: "Update Inventory",

    category: ["Core"],

    definition:
      "更新資產清單。這是 MDM 向裝置發送的一個指令，要求裝置立即回報最新的硬體資訊、已安裝 App 清單、電池狀態、儲存空間等資料。在排除故障時，這通常是第一個執行的動作。",

    analogy:
      "「財產盤點」。就像公司定期要求員工回報辦公室裡有哪些設備、電腦裝了哪些軟體。IT 發出盤點指令，裝置就會把最新的清單回報上來。",
  },
  {
    term: "USB-C",

    category: ["Hardware"],

    definition:
      "USB Type-C。現今 Apple 全線產品（iPhone 15/16+, iPad, Mac）的通用介面。它支援正反插，且集成了資料傳輸、影音輸出 (DisplayPort) 與雙向高瓦數供電 (PD)。對於管理者而言，這意味著周邊配件與充電器的統一，但也帶來了資料透過隨身碟外洩的風險，需透過 MDM 管控 USB 權限。",

    analogy:
      "就像「萬用孔」。以前要分 HDMI、電源線、傳輸線，現在全部合併成一個孔。一條線能搞定充電、傳螢幕、傳檔案，插頭還不會插反。",
  },
  {
    term: "User Enrollment",

    category: ["Enrollment"],

    definition:
      "User Enrollment（使用者註冊）是專為 BYOD 設計的註冊模式。在此模式下，MDM 只能管理「工作容器」內的資料（如公司 Email、Wi-Fi），完全無法存取使用者的私人照片或 App，且使用者可隨時移除管理，保障個人隱私。",

    analogy:
      "這是「公私分流」的註冊方式。就像你在私人手機上裝了一個「公司專用 App」。公司只能控制那個 App 裡的東西，至於你手機裡存的自拍照、玩什麼遊戲，公司完全看不到也管不著。",
  },

  // --- V ---
  {
    term: "VLAN",

    category: ["Network"],

    definition:
      "Virtual Local Area Network (VLAN) 是在實體網路交換器上切分出的虛擬子網段。學校通常會將「教學用網路」、「行政用網路」與「訪客網路」切分成不同的 VLAN，以隔離廣播封包並提升安全性。",

    analogy:
      "這是網路線裡的「虛擬隔間」。雖然大家共用同一條大水管（網路線），但裡面像切蛋糕一樣隔成了好幾個獨立通道（VLAN）。A 通道的水流不到 B 通道，彼此互不干擾，也比較安全。",
  },
  {
    term: "Volume Owner",

    category: ["Security"],

    definition:
      "磁碟擁有者。Apple Silicon Mac 特有的安全角色。只有在初始設定時建立的使用者（或被賦予 Token 的使用者）才是 Volume Owner。只有 Owner 有權限授權安裝 macOS 更新或修改開機安全性設定。MDM 的指令若涉及這些操作，必須透過 Bootstrap Token 來模擬 Owner 權限。",

    analogy:
      "就像「房產證持有人」。這間房子雖然住了很多人，但只有持有人有權力決定要不要裝修房子（更新系統）或換大門鎖。其他房客想做這些事，得先獲得持有人的同意。",
  },
  {
    term: "VPP (Volume Purchase Program)",

    category: ["Apple"],

    definition:
      "Volume Purchase Program (VPP)，現整合於 Apple Business Manager 的「App 與書籍」。這是一項允許企業大量採購 App 和電子書的計畫。採購後的授權可透過 MDM 分發給裝置，且支援「撤銷」功能，當員工離職時可收回授權給下一位使用。",

    analogy:
      "這是企業的「大量團購機制」。公司一次買 100 套 Office 軟體，這些軟體是算在公司頭上。分給員工用，員工離職時，公司就把軟體收回來給新員工用，不用每次有人來就重買一次。",
  },

  // --- W ---
  {
    term: "Web Clip (網頁捷徑)",

    category: ["Apps"],

    definition:
      "網頁捷徑。MDM 可透過設定描述檔在裝置主畫面建立網站的捷徑圖示，點擊後會以全螢幕模式開啟特定網址（類似 Progressive Web App）。常用於推送校務系統、學習平台（如均一、因材網）或內部入口網站的快速存取。IT 可自訂圖示、標題，並設定為無法移除。",

    analogy:
      "就像「桌面捷徑」。IT 可以在每個學生的 iPad 主畫面自動新增一個「校園學習平台」的圖示，學生點一下就直接進入網站，不用開瀏覽器再輸入網址，且學生無法刪除這個捷徑。",
  },
  {
    term: "Wi-Fi Payload",

    category: ["Network"],

    definition:
      "Wi-Fi 設定單元。Configuration Profile 中的一種 Payload 類型。它可以預先配置 Wi-Fi 的 SSID、密碼、加密方式（WPA2/WPA3）、是否自動連線，甚至可以設定 802.1x 憑證認證，讓裝置開機就自動連上企業網路。",

    analogy:
      "就像「網路設定懶人包」。就像把 Wi-Fi 名稱和密碼事先寫在一張紙條上塞進裝置。裝置一開機，看到紙條就自動連上網路，不用使用者手動輸入密碼。",
  },
  {
    term: "Wipe (清除裝置)",

    category: ["Core"],

    definition:
      "清除裝置。MDM 的一個遠端指令，會將裝置恢復到原廠出廠狀態。所有資料、App、照片、設定全部清除，裝置重啟後會回到 Hello 歡迎畫面。這用於裝置遺失、回收或轉移給其他使用者。",

    analogy:
      "「重置鍵」。就像按下工廠重置按鈕，把手機洗成一台全新的樣子，裡面什麼都沒有，就像剛從商店買回來一樣。",
  },

  // --- Z ---
  {
    term: "Zero-Touch Deployment",

    category: ["Enrollment"],

    definition:
      "Zero Touch Deployment（零接觸部署）是指完全無需 IT 人員手動設定，新裝置從拆封那一刻起，只要連上網路，就會自動依據 ABM 與 MDM 的設定完成所有配置。這是現代化 IT 管理的最高境界。",

    analogy:
      "這是「開箱即用」的魔法。IT 人員甚至連箱子都不用拆，直接把新買的 1000 台 iPad 寄給員工。員工打開連上 Wi-Fi，iPad 就自動開始安裝公司軟體、設定 Email。就像變魔術一樣，完全自動化。",
  },
  {
    term: "Zero Trust",

    category: ["Security"],

    definition:
      "Zero Trust（零信任）是一種資安架構理念，核心原則是「永不信任，始終驗證」。在零信任環境下，就算你在辦公室內，系統也不會預設信任你的裝置，每次存取資料時都會檢查身分、裝置合規性與位置，確保萬無一失。",

    analogy:
      "這是資安界的「疑心病模式」。系統把每個人都當成潛在的小偷。不管你是總經理還是工讀生，不管你在總部還是在家，每次要開機密檔案，都要重新檢查 ID、驗指紋、看地點。絕不輕易放行。",
  },

  // --- B ---
  {
    term: "Blueprints",
    category: ["Jamf", "Core"],
    definition:
      "Jamf Pro 的進階自動化框架。允許管理員定義「理想狀態」並持續監控,當裝置偏離標準時自動修正。例如設定「必須安裝防毒軟體」,Jamf 會定期檢查並自動安裝缺失的軟體。 Blueprint 比傳統 Policy 更智慧,能主動偵測並自我修復,確保裝置始終符合企業安全基準。",
    analogy:
      "就像「自動駕駛模式」。你設定「時速100公里,保持車道中央」,車子就自動維持;Blueprints 讓你設定「必須有防毒+加密」,裝置就自動保持合規狀態,偏離了會自動拉回來。",
  },

  // --- E ---
  {
    term: "Enrollment Invitation",
    category: ["Jamf", "Enrollment"],
    definition:
      "註冊邀請。Jamf 的手動註冊方式之一。管理員產生一個專屬連結或 QR Code,發送給使用者,使用者點擊後即可將個人裝置註冊到 Jamf。常用於 BYOD(Bring Your Own Device)場景,讓員工自主將私人 iPhone 或 Mac 加入公司管理,同時保留個人隱私。",
    analogy:
      "就像「入會邀請函」。公司發你一個專屬連結,點進去照著步驟走,你的個人手機就加入了公司的管理系統,可領 App 和 Wi-Fi,但私人照片訊息還是你的。",
  },


  // --- I ---
  {
    term: "Inventory Collection",
    category: ["Jamf", "Core"],
    definition:
      "清單收集。Jamf 定期從裝置收集硬體資訊、已安裝軟體、系統設定、使用者資料、Extension Attribute 等的程序。預設每天自動執行,也可手動觸發「Update Inventory」指令立即收集最新狀態。這是 Jamf 掌握裝置現況的核心機制,所有報表和 Smart Group 都依賴此資料。",
    analogy:
      "就像「定期健康檢查」。每天自動量體溫血壓(收集資料),醫生(管理員)就能看到最新健康狀態;也可以說「現在馬上給我量!」立即更新,不用等明天。",
  },

  // --- J ---
  {
    term: "JamfAAD",
    category: ["Jamf", "Security"],
    definition:
      "JamfAAD 是 Jamf Pro 內建於 macOS 的背景執行程序，專門負責處理與 Microsoft Azure AD (Entra ID) 的註冊與合規性驗證。當使用者需要存取受保護的公司資源（如 Office 365）時，JamfAAD 會負責向微軟證明「這台電腦是合規的公司電腦」。",

    analogy:
      "這是專門跟微軟溝通的「外交官」。當你要開 Word 或 Excel 登入公司帳號時，微軟警衛會攔住你。這時 JamfAAD 會出面遞交國書（合規證明），跟微軟警衛說：「放心，這台電腦很安全，是我們管的」，微軟才會放行。",
  },
  {
    term: "Jamf binary",
    category: ["Jamf", "macOS"],
    definition:
      "Jamf Binary (`jamf` 指令) 是 Jamf Pro 安裝在 macOS 上的管理代理程式 (Agent)。它讓管理員可以在終端機執行 `sudo jamf policy` 來手動觸發管理政策，是 macOS 受管裝置的核心執行元件。iOS 裝置因系統封閉，沒有此元件。",

    analogy:
      "這是駐守在 Mac 裡的「執行官」。MDM 伺服器大多時候只是發號施令，真正動手做事（安裝軟體、執行腳本、回報資料）的，都是這位駐守在電腦裡的執行官（Jamf Binary）。",
  },
  {
    term: "Jamf Connect",
    category: ["Jamf", "Security", "macOS"],
    definition:
      "Jamf 的雲端身分認證解決方案。讓 Mac 使用者可用公司的雲端帳號(如 Azure AD、Okta、Google Workspace)登入 macOS,取代傳統本機帳號。支援密碼同步、多重驗證(MFA)整合和零接觸部署。使用者只需一組密碼即可登入 Mac 和所有企業服務,IT 也能集中管理身分。",
    analogy:
      "就像「公司門禁卡通用化」。不用記一堆密碼,刷同一張員工證(雲端帳號)就能開公司大門、登 Mac、進 Google Workspace,全部統一管理,改密碼也一次搞定。",
  },
  {
    term: "Jamf Pro API",
    category: ["Jamf", "Other"],
    definition:
      "Jamf Pro 提供的 RESTful API 介面。允許開發者和系統管理員使用程式自動化操作 Jamf,如批量建立 Policy、匯入裝置清單、產生自訂報表、觸發遠端指令等。現已全面改用 Jamf Pro API v2,提供更完整的功能和更好的效能。支援各種程式語言整合。",
    analogy:
      "就像「管理後台的遙控器」。不用手動點網頁,寫程式就能一次建立100條政策、每天自動匯出報表寄信、批量更新1000台裝置設定,省下90%重複操作時間。",
  },
  {
    term: "Jamf Protect",
    category: ["Jamf", "Security", "macOS"],
    definition:
      "Jamf 的 macOS 端點偵測與回應(EDR)解決方案。提供即時威脅偵測、惡意軟體防護、行為分析和自動化回應。與 Jamf Pro 深度整合,可在發現威脅時自動隔離裝置、執行修復 Policy 或通知管理員。使用機器學習偵測未知威脅,填補傳統防毒軟體的不足。",
    analogy:
      "就像「保鑣+監視器」。不只鎖門(防火牆),還有保鑣24小時巡邏,發現可疑人士(惡意程式)立刻警報,自動隔離並通知警衛室(IT),甚至能認出偽裝的壞人。",
  },
  {
    term: "Jamf School",
    category: ["Jamf", "Education"],
    definition:
      "Jamf 專為 K-12 教育市場設計的簡化版 MDM 解決方案。相較於 Jamf Pro,介面更簡單、定價更親民,專注於課堂管理(Classroom)、家長控制、學生裝置部署和內容過濾。讓不懂 IT 的老師也能輕鬆管理班級 iPad,家長也能從 App 查看孩子的使用狀況。",
    analogy:
      "就像「教育版軟體」。就像 Adobe 給學校的便宜授權,Jamf School 是給中小學的輕量版,老師不用懂 IT 也能上手管理30台 iPad,但進階功能比企業版 Jamf Pro 少一些。",
  },

  {
    term: "Jamf Remote",
    category: ["Jamf", "macOS"],
    definition:
      "Jamf Remote (Jamf Remote Assist)。Jamf Pro內建的瀏覽器端遠端桌面工具。IT可透過網頁直接連線到Mac進行螢幕分享、終端機操作、檔案傳輸與故障排除,無需安裝第三方遠端控制軟體。支援attended(使用者需同意)和unattended(無人值守)兩種連線模式。",
    analogy:
      "就像「遠端遙控器」。IT坐在辦公室,透過瀏覽器就能看到並控制員工的Mac螢幕,幫忙抓bug或設定軟體,不用跑過去或叫使用者安裝TeamViewer。",
  },
  {
    term: "Jamf Now",
    category: ["Jamf"],
    definition:
      "Jamf Now。Jamf推出的簡化版雲端MDM解決方案,專為小型企業(50台裝置以下)設計。提供基本的裝置管理、App派送與安全設定功能,但不包含Jamf Pro的進階功能如Policy、Script、Extension Attribute等。定價較低,介面更友善。",
    analogy:
      "就像「入門版管理工具」。Jamf Pro是專業級瑞士刀(功能超多但複雜),Jamf Now是簡化版多功能刀,只有最基本幾個工具,適合剛起步的小公司使用。",
  },
  {
    term: "Jamf Teacher",
    category: ["Jamf", "Education"],
    definition:
      "Jamf Teacher。專為教師設計的課堂管理iPad App,是Apple Classroom的Jamf強化版。老師可即時監看學生畫面、鎖定App、開啟網頁、發送訊息、收集作業並控制裝置。與Jamf School或Jamf Pro整合,支援更精細的課堂控制與行為管理功能。",
    analogy:
      "就像「數位教鞭」。老師用iPad就能管理全班30台學生平板:一鍵讓大家打開同一個網頁、鎖定在測驗App、偷看誰在分心,比站起來巡教室更有效率。",
  },
  {
    term: "Jamf Student",
    category: ["Jamf", "Education"],
    definition:
      "Jamf Student。安裝在學生iPad上的配套App,與Jamf Teacher溝通。學生可透過此App查看課堂講義、繳交作業、舉手發問或請求協助。老師發送的指令(如開啟App、鎖定畫面)會透過此App執行。",
    analogy:
      "就像「學生端接收器」。老師的指令透過Jamf Teacher發出,學生的iPad上Jamf Student App會接收並執行,形成完整的課堂管理循環。",
  },
  {
    term: "Jamf Trust (Jamf Private Access)",
    category: ["Jamf", "Security", "Network"],
    definition:
      "Jamf Trust (前身為Jamf Private Access/Wandera)。Jamf的零信任網路存取(ZTNA)解決方案。提供裝置姿態檢查(device posture checking)、條件式存取、動態分割通道VPN與網路威脅防護。確保只有合規的裝置才能存取企業資源,支援BYOD與遠端工作場景。",
    analogy:
      "就像「智慧門禁系統」。不只檢查你的員工證(帳號),還要檢查你有沒有發燒(裝置合規性)、是否戴口罩(安全設定),全部通過才讓你進辦公室(存取資源),確保零信任安全。",
  },
  {
    term: "Jamf Safe Internet",
    category: ["Jamf", "Security", "Network"],
    definition:
      "Jamf Safe Internet。Jamf提供的DNS層級內容過濾與網路安全服務。可阻擋惡意網站、釣魚連結、不當內容,並提供網路活動報表。與Jamf Pro整合,可套用至特定裝置群組,適合學校與企業保護裝置免於網路威脅。",
    analogy:
      "就像「網路保鑣」。在你連上任何網站之前,先幫你檢查網址是不是詐騙網站或色情網站,是的話直接擋下來,保護你不會不小心點錯連結。",
  },
  {
    term: "Jamf Data Policy",
    category: ["Jamf", "Security"],
    definition:
      "Jamf Data Policy。Jamf Pro的資料外洩防護(DLP)功能。允許管理員設定規則防止敏感資料透過AirDrop、截圖、複製貼上等方式外洩。可針對特定App或檔案類型設定限制,並記錄所有違規行為供稽核。",
    analogy:
      "就像「資料防盜網」。設定規則禁止將財務報告截圖傳給私人LINE,或禁止把機密文件AirDrop出去,系統會自動攔截並記錄誰試圖這麼做。",
  },
  {
    term: "Recon",
    category: ["Jamf", "macOS"],
    definition:
      "Recon。`jamf recon`指令的簡稱,是Jamf binary最常用的指令之一。執行後會立即收集Mac的最新清單資訊(硬體規格、已安裝軟體、使用者資料、Extension Attribute等)並回傳至Jamf Pro伺服器。故障排除時的第一步驟。",
    analogy:
      "就像「立即體檢」指令。跟電腦說`sudo jamf recon`,它就會馬上量身高體重、檢查有裝哪些軟體,然後把最新健康報告傳回總部(Jamf),不用等每天的定期檢查。",
  },
  {
    term: "Casper Suite",
    category: ["Jamf"],
    definition:
      "Casper Suite。Jamf Pro的前身品牌名稱(2002-2015)。早期Jamf的管理工具稱為Casper,後來更名為Jamf Pro。有些舊文件或討論串仍會使用Casper這個稱呼,但指的就是現在的Jamf Pro。",
    analogy:
      "就像「舊品牌名稱」。就像Facebook改名Meta,Casper Suite就是Jamf Pro的舊名字。看到有人講Casper,不用困惑,他們講的就是Jamf Pro。",
  },

  // --- P ---


  // --- R ---

];
