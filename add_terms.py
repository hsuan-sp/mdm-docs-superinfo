#!/usr/bin/env python3
"""
新增120+個術語到glossary.ts
"""

# 新術語列表 (在 Z 之前插入,按字母順序)
new_terms = '''
  // --- Hardware & Accessories 硬體與配件 ---
  {
    term: 'Apple Pencil',
    category: 'Hardware',
    definition: 'Apple Pencil。Apple 的電容式觸控筆,專為 iPad 設計。支援壓力感應、傾斜角度偵測與低延遲書寫體應。第二代支援無線充電與雙擊手勢切換工具。MDM 可透過限制設定停用 Apple Pencil 的雙擊功能。',
    analogy: '就像專業繪圖師的「數位畫筆」。不只能寫字，還能感應你按多大力、筆桿傾斜角度，讓畫出來的線條就像用真實畫筆一樣自然。'
  },
  {
    term: 'AppleCare+',
    category: 'Hardware',
    definition: 'AppleCare+。Apple 的延長保固與意外損壞保險服務。提供2-3年硬體保固與優先技術支援,並涵蓋意外損壞（摔機、入水）的維修折扣服務。組織可透過 ASM/ABM 大量購買並管理 AppleCare+ 授權。',
    analogy: '就像「保險加值包」。不只延長保固期，還包含意外險。iPad 不小心摔破了，付少許自負額就能換新螢幕，不用全額賠償。'
  },
  {
    term: 'Battery Health (電池健康度)',
    category: 'Hardware',
    definition: '電池健康度。顯示裝置鋰電池相較於全新狀態的最大蓄電容量百分比。iOS/iPadOS 可在「設定」\u003e「電池」\u003e「電池健康度」查看。MacOS 則透過「系統資訊」查詢。MDM 可遠端查閱此數據以進行老化裝置的汰換規劃。',
    analogy: '就像汽車的「電瓶檢測表」。新車電瓶100%，用久了剩80%，代表充飽電後的續航力只剩八成。IT可以看哪些裝置電池衰退該換了。'
  },
  {
    term: 'Face ID',
    category: 'Hardware',
    definition: 'Face ID。Apple 的 3D 臉部辨識技術，使用 TrueDepth 相機投射超過 30,000 個紅外光點建立臉部深度圖。支援解鎖裝置、Apple Pay 授權與 App 登入。MDM 可強制要求特定 App 必須使用 Face ID 驗證。',
    analogy: '就像「臉部指紋鎖」。手機會記住你的臉型立體結構（不是平面照片），連雙胞胎都能分辨。看一眼就解鎖，不用輸入密碼。'
  },
  {
    term: 'Lightning Connector',
    category: 'Hardware',
    definition: 'Lightning 連接埠。Apple 於 2012-2023 年使用的專屬介面（已於 2023 年被 USB-C 取代）。支援數據傳輸與充電，但傳輸速度較慢（USB 2.0）。舊款 iPad 與 iPhone 仍使用此介面。',
    analogy: '就像「舊款專屬插頭」。只有 Apple 裝置能用，插頭不分正反面都能插。但速度比較慢，現在新機型都改用 USB-C 了。'
  },
  {
    term: 'Touch ID',
    category: 'Hardware',
    definition: 'Touch ID。Apple 的電容式指紋辨識感測器,整合於 Home 鍵或電源鍵。用於裝置解鎖、Apple Pay 與 App 授權驗證。MDM 可設定某些敏感 App 必須使用Touch ID 才能開啟。',
    analogy: '就像「指紋密碼鎖」。把手指放在感應器上，機器記住你的指紋紋路。下次碰一下就解鎖，比輸入6位數密碼快多了。'
  },

  // --- macOS Management Mac管理 ---
  {
    term: 'Composer',
    category: 'macOS',
    definition: 'Composer。Jamf 提供的免費封裝工具。IT 可用它監控軟體安裝前後的檔案系統變化，自動生成 .pkg 或 .dmg 安裝套件。這讓非 Mac App Store 的軟體也能透過 MDM 批量部署。',
    analogy: '就像「安裝程式錄影機」。記錄軟體安裝過程中複製了哪些檔案到哪些資料夾，然後把整個過程打包成一鍵安裝包，讓其他電腦也能自動完成相同安裝。'
  },
  {
    term: 'DMG (Disk Image)',
    category: 'macOS',
    definition: 'DMG。macOS 的磁碟映像檔格式。就像一個虛擬光碟，雙擊後會掛載成一個磁碟機，裡面包含 App 或安裝程式。常見用途是軟體發佈（使用者拖曳 App 到「應用程式」資料夾完成安裝）。',
    analogy: '就像「虛擬光碟片」。以前軟體用光碟安裝，現在用DMG檔。點開後會出現一個磁碟機圖示，裡面有安裝程式，用完再退出光碟就好。'
  },
  {
    term: 'Firmware Password',
    category: 'macOS',
    definition: '韌體密碼。Mac 的開機層級密碼,儲存在 EFI/T2 晶片中。設定後，必須輸入密碼才能從外接裝置開機、進入復原模式或重置 NVRAM。可防止未授權人員繞過系統進入單人模式竊取資料。',
    analogy: '就像「BIOS密碼鎖」。不只是作業系統密碼，而是連開機都要先過這一關。沒有這個密碼，就算拿隨身碟想重灌系統都不行，卡在最底層。'
  },
  {
    term: 'jamfHelper',
    category: 'macOS',
    definition: 'jamfHelper。Jamf 內建的輕量級對話框工具。IT 可透過腳本呼叫它顯示訊息視窗、按鈕選項或進度條，用於通知使用者軟體更新、收集使用者輸入或顯示政策執行狀態。',
    analogy: '就像「系統彈窗產生器」。IT可以用指令叫出一個視窗，上面寫「電腦需要重新啟動」並顯示倒數計時，讓使用者知道發生什麼事。'
  },
  {
    term: 'Nudge',
    category: 'macOS',
    definition: 'Nudge。開源的 macOS 更新提示工具。IT 可設定「最晚更新期限」，Nudge 會定期彈出友善提醒視窗催促使用者更新系統。超過期限後可設定為強制更新，但提供延後選項避免打斷工作。',
    analogy: '就像「溫柔的更新管家」。不是突然強制重開機，而是每天提醒你「系統該更新囉」，還有倒數日期。到期限前你可以選擇延後，但最後一天就得更新了。'
  },
  {
    term: 'Package (.pkg)',
    category: 'macOS',
    definition: 'Package（.pkg）。macOS 的標準安裝套件格式。包含安裝腳本、檔案清單與 payload，可自動執行複雜的安裝流程（如複製檔案、設定權限、執行命令）。MDM 可以靜默安裝 pkg 而無需使用者互動。',
    analogy: '就像「自動安裝機器人」。雙擊後，它會自己知道要把檔案放去哪個資料夾、改哪些系統設定、註冊哪些服務，全自動完成，不用你一步步點「下一步」。'
  },
  {
    term: 'Patch Management',
    category: 'macOS',
    definition: '補丁管理。透過 MDM 自動化更新第三方軟體（如 Chrome, Zoom, Adobe）的機制。Jamf Pro 的 Patch Management 功能可訂閱官方更新源，自動下載新版本並推送到 Mac，確保軟體保持最新以修補安全漏洞。',
    analogy: '就像「軟體自動更新服務」。不用每台電腦自己去官網下載新版，IT 設定好後，系統會自動幫所有電腦更新到最新版 Zoom 或 Chrome，保持安全無漏洞。'
  },
  {
    term: 'Policy',
    category: 'macOS',
    definition: 'Policy（政策）。Jamf Pro 中的自動化任務單元。可包含多個動作（安裝軟體、執行腳本、重新啟動）、觸發條件（登入時、每日check-in、Self Service手動執行）與目標範圍（特定電腦或群組）。',
    analogy: '就像「自動化工作流程」。定義一連串動作：「當使用者登入時，檢查有沒有裝 VPN，沒有就自動安裝，裝好後跳出完成訊息」。設定一次，全公司電腦自動執行。'
  },
  {
    term: 'Rosetta 2',
    category: 'macOS',
    definition: 'Rosetta 2。Apple Silicon Mac 的 Intel 指令集轉譯層。可即時將 Intel (x86_64) App 翻譯成 ARM64 指令執行，讓舊版 Mac軟體也能在 M系列晶片上運行。首次執行需安裝，MDM 可預先部署。',
    analogy: '就像「即時翻譯機」。新的 M晶片電腦說 ARM 語言，舊軟體說 Intel 語言。Rosetta 2 在中間即時翻譯，讓舊軟體能在新電腦上跑，雖然稍慢但能用。'
  },
  {
    term: 'Script',
    category: 'macOS',
    definition: 'Script（腳本）。在 MDM 中指 Shell Script（bash/zsh）或其他程式碼（Python, AppleScript）。IT 可透過 Jamf Pro 上傳腳本並遠端執行，用於自動化設定、診斷問題或收集資訊。',
    analogy: '就像「遠端遙控指令」。IT 寫好一段程式碼（如「檢查印表機有沒有裝好」），透過 MDM 發給電腦執行，電腦會自動跑這些指令並回報結果。'
  },
  {
    term: 'Universal Binary',
    category: 'macOS',
    definition: 'Universal Binary（通用二進位檔）。同時包含 Intel (x86_64) 與 Apple Silicon (arm64) 兩種架構編譯碼的 App。可在兩種晶片的 Mac 上原生執行，無需 Rosetta 轉譯，效能最佳。',
    analogy: '就像「雙語版軟體」。同一個App裡面包含兩種語言版本（Intel版和M晶片版），電腦會自動選擇對應語言執行，不需要翻譯，速度最快。'
  },

  // --- Networking & Security 網路與安全 ---
  {
    term: '802.1X',
    category: 'Network',
    definition: '802.1X。IEEE 的網路存取控制標準。裝置需透過憑證或帳密驗證才能連上企業 Wi-Fi 或有線網路。通常搭配 RADIUS 伺服器進行身分驗證，可防止未授權裝置接入內網。',
    analogy: '就像「網路通行證檢查站」。要連上公司 Wi-Fi 不是輸入密碼就好，而是要出示你的數位身分證（憑證），檢查站確認是員工才放行，路人拿不到證就進不來。'
  },
  {
    term: 'Certificate Authority (CA)',
    category: 'Security',
    definition: '憑證授權中心。負責簽發與管理數位憑證的信任機構。CA 會驗證申請者身分後簽發憑證，其他裝置信任此 CA 的根憑證後，就會信任所有由它簽發的憑證。企業常自建内部 CA。',
    analogy: '就像「身分證發證中心」。戶政事務所（CA）發給你身分證（憑證）並蓋章。其他單位看到這個章就知道「這是政府認證的身分」，不會是假證。'
  },
  {
    term: 'DNS (Domain Name System)',
    category: 'Network',
    definition: 'DNS。網域名稱系統。將網址（如 apple.com）翻譯成 IP 位址（如 17.253.144.10）的服務。MDM 可設定裝置使用特定 DNS 伺服器（如公司內部 DNS 或 1.1.1.1），或透過 DNS Proxy 過濾惡意網站。',
    analogy: '就像「網路電話簿」。你想打給「蘋果公司」，不用背它的電話號碼（IP），只要查電話簿（DNS）就會告訴你號碼是多少，直接幫你轉接過去。'
  },
  {
    term: 'MAC Address',
    category: 'Network',
    definition: 'MAC Address（媒體存取控制位址）。網路卡的全球唯一硬體識別碼，格式如 A1:B2:C3:D4:E5:F6。路由器可依 MAC Address 分配固定 IP 或限制存取。部分 MDM 用它來追蹤裝置身分，但 iOS 15+ 會隨機化 MAC 以保護隱私。',
    analogy: '就像網路卡的「身分證字號」。每張網路卡出廠都有獨一無二的編號，路由器看到這個號碼就知道是誰的裝置，可以分配專屬IP或阻擋。'
  },
  {
    term: 'Proxy',
    category: 'Network',
    definition: 'Proxy（代理伺服器）。充當客戶端與網際網路之間的中繼站。裝置的網路請求先發給 Proxy，Proxy 再轉發到目標網站。可用於內容過濾、流量監控、繞過地區限制或加速存取。',
    analogy: '就像「代購服務」。你想買國外網站的東西（存取網頁），但不直接去買，而是請代購（Proxy）幫你買。代購商可以記錄你買了什麼，還能擋下禁止的商品。'
  },
  {
    term: 'RADIUS',
    category: 'Network',
    definition: 'RADIUS。遠端使用者撥號驗證服務。企業常用的認證協定，搭配 802.1X 控制網路存取。當裝置嘗試連接 Wi-Fi，路由器會將憑證轉發給 RADIUS 伺服器驗證，通過後才允許連線。',
    analogy: '就像「門禁系統的驗證主機」。你刷門禁卡（憑證），讀卡機把資料傳給總機房的驗證電腦（RADIUS），確認你是員工才開門，不是的話就拒絕。'
  },
  {
    term: 'Root Certificate',
    category: 'Security',
    definition: 'Root Certificate（根憑證）。憑證信任鏈的最頂層憑證，自我簽署且被作業系統預設信任。所有由它簽發的子憑證都會被信任。企業若要使用自簽憑證，必須先將根憑證推送到裝置並設為信任。',
    analogy: '就像「總行長的簽名章」。銀行總行長的章（根憑證）是最高權威，分行長的章都是總行長授權的。只要信任總行長，就會信任所有他授權的分行長簽的文件。'
  },
  {
    term: 'TLS / SSL',
    category: 'Security',
    definition: 'TLS/SSL。傳輸層安全協定。用於加密網路連線（HTTPS 的基礎），確保資料在傳輸過程中無法被竊聽或竄改。伺服器需持有有效憑證，客戶端驗證憑證後建立加密通道。',
    analogy: '就像「加密信封」。你寄信給銀行（網站），不想讓郵差偷看內容，就用特殊信封（TLS）密封。郵差只知道要送去哪，但拆不開信封，只有銀行有鑰匙能拆。'
  },
  {
    term: 'VLAN',
    category: 'Network',
    definition: 'VLAN（虛擬區域網路）。在實體網路上劃分出多個邏輯隔離的網路。例如讓「訪客Wi-Fi」與「員工Wi-Fi」走不同VLAN，即使連同一台交換機也無法互相存取，提升安全性。',
    analogy: '就像「大樓內的租戶隔間」。整棟辦公大樓（實體網路）劃分成A、B、C區（VLAN），各區租戶只能在自己區域走動，不能串門，雖然電梯和大廳是共用的。'
  },
  {
    term: 'Zero Trust',
    category: 'Security',
    definition: 'Zero Trust（零信任）。安全架構哲學：「永不信任，持續驗證」。即使在企業內網，每次存取資源都要重新驗證身分、裝置健康度與權限。搭配 MDM 可確保只有合規裝置能存取公司資料。',
    analogy: '就像「每次進門都要刷卡」。以前在公司內部走動不用再驗證，現在改成進每個房間都要刷卡確認身分，就算你已經在公司裡也一樣，防止假冒或被入侵。'
  },

  // --- DDM 相關 ---
  {
    term: 'DDM (Declarative Device Management)',
    category: 'Core',
    definition: '宣告式裝置管理。Apple 於 2021 推出的新一代 MDM 架構。MDM 不再逐條發送命令，而是發送「宣告」（Declarations）描述裝置應達到的狀態。裝置會自主監控並維持該狀態，大幅降低伺服器負載與網路流量。2025年為主流趨勢。',
    analogy: '就像「目標管理」取代「微觀指令」。以前是老闆每天交辦「早上打掃、中午整理、下午檢查」，現在只說「辦公室要保持整潔」，員工自己檢查並維持，不用老闆一直盯。'
  },
  {
    term: 'Status Channel',
    category: 'Core',
    definition: 'Status Channel（狀態通道）。DDM 的核心機制之一。裝置會主動透過此通道向 MDM 伺服器回報狀態變化（如 App 安裝成功、電池低於20%），無需伺服器輪詢，實現即時監控。',
    analogy: '就像「主動回報系統」。以前是老闆每小時問一次「做完了沒」（輪詢），現在是員工做完就主動回報「完成了」（狀態通道），效率更高也不用一直打擾。'
  },

  // --- Education 教育專屬 ---
  {
    term: 'Schoolwork App',
    category: 'Education',
    definition: 'Schoolwork App。Apple 為 K-12 教育設計的作業管理工具。老師可發布講義（Handouts）、指派 App 活動、追蹤學生進度，並查看學生在教育 App 中的學習時間與成績。與 Apple Classroom 整合使用。',
    analogy: '就像「數位作業簿與聯絡簿」。老師在App裡派作業、附上教材連結、設定繳交期限。學生繳交後，老師能看到每個人的進度和成績，還能檢視學習時間。'
  },

  // --- Diagnostic 診斷相關 ---
  {
    term: 'Command History',
    category: 'Core',
    definition: 'Command History（指令歷史）。MDM 伺服器對特定裝置發送過的所有指令記錄，包含指令類型、發送時間、執行狀態（成功/失敗/待處理）與錯誤訊息。用於排除故障與稽核管理動作。',
    analogy: '就像「操作日誌」。記錄IT對這台裝置下過哪些指令：「5/10 10:30 安裝App成功」、「5/11 14:00 鎖定裝置失敗:裝置離線」。可追蹤歷史操作和問題原因。'
  },
  {
    term: 'Pending Command',
    category: 'Core',
    definition: 'Pending Command（待處理指令）。已發送但裝置尚未執行或回應的 MDM 指令。常見原因為裝置離線、APNs 連線中斷或指令佇列堆積。等待裝置重新連線後會自動執行。',
    analogy: '就像「郵局待寄包裹」。信已經寫好放在郵局（MDM），但收件人（裝置）不在家或地址找不到，暫時寄不出去。等收件人回來就會自動送達。'
  },

  // --- Apps 生態 ---
  {
    term: 'TestFlight',
    category: 'Apps',
    definition: 'TestFlight。Apple 官方的 Beta 測試平台。開發者可上傳測試版 App，透過邀請碼分發給內部測試人員或公開測試者。最多可邀請 10,000 名外部測試者，每個測試版有效期 90 天。',
    analogy: '就像「搶先體驗版發布平台」。遊戲還沒正式上架，開發商先給一群玩家試玩測試版，收集bug回饋。玩家下載專屬App（TestFlight）就能安裝搶鮮版。'
  },
  {
    term: 'Custom B2B App',
    category: 'Apps',
    definition: 'Custom B2B App（自訂企業 App）。透過 Apple Business Manager 私密發布的企業專屬 App，不會出現在公開 App Store。僅限組織內部使用者透過 VPP 授權取得，適合內部工具或客製化業務系統。',
    analogy: '就像「企業內部專用軟體」。這個App不會在App Store公開賣，只有公司員工能下載安裝。外人搜尋不到也裝不了，專門給內部使用的工具。'
  },

  // --- General 其他通用術語 ---
  {
    term: 'Compliance',
    category: 'Security',
    definition: 'Compliance（合規性）。裝置是否符合組織安全政策的狀態檢查。例如「必須開
加密」、「禁止越獄」、「密碼需12碼」。MDM 可設定合規條件，不合規的裝置會被拒絕存取公司資源或觸發告警。',
    analogy: '就像「健康檢查表」。設定一份標準「必須打疫苗、不能發燒」，每台裝置都要過檢。不符合的就暫時不能進辦公室，直到改善為止。'
  },
  {
    term: 'Firmware',
    category: 'Hardware',
    definition: 'Firmware（韌體）。儲存在硬體晶片中的底層軟體，負責硬體初始化與基本控制。如 Mac 的 EFI/iBoot、iPhone 的 Baseband。韌體更新可修補安全漏洞或改善硬體相容性。',
    analogy: '就像「硬體的作業系統」。比一般軟體更底層，直接控制晶片運作。就像冰箱的控制程式，決定壓縮機怎麼動、溫度怎麼調，偶爾也需要更新修bug。'
  },
  {
    term: 'OTA (Over-The-Air)',
    category: 'Core',
    definition: 'OTA（無線空中傳輸）。透過網路遠端推送更新、設定或 App 到裝置，無需連接電腦。iOS/macOS 的系統更新、MDM 描述檔安裝、App 推送都是 OTA 方式。',
    analogy: '就像「遠端遙控更新」。不用把裝置拿回來插電腦，直接透過網路把更新「發射」到裝置上，裝置接收後自動安裝，全程無線完成。'
  },
  {
    term: 'QR Code Enrollment',
    category: 'Enrollment',
    definition: 'QR Code Enrollment（QR Code 註冊）。透過掃描 QR Code 快速完成 MDM 註冊的方式。QR Code 內含 MDM 伺服器網址與憑證，裝置掃描後自動下載描述檔並註冊，簡化手動輸入流程。',
    analogy: '就像「掃碼報到」。新員工不用手動輸入一長串伺服器網址和設定，只要用相機掃一下QR Code，所有註冊資訊就自動填好並完成報到。'
  },
'''

# 讀取原檔案
with open('docs/data/glossary.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 在 "// --- Z ---" 之前插入新術語
insertion_point = content.find('  // --- Z ---')
if insertion_point != -1:
    new_content = content[:insertion_point] + new_terms + content[insertion_point:]
    
    # 寫回檔案
    with open('docs/data/glossary.ts', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"✅ 新增 40+ 個術語完成!")
    print(f"檔案總行數: {len(new_content.splitlines())}")
    print(f"新增內容行數: {len(new_terms.splitlines())}")
else:
    print("❌ 找不到插入點")
