#!/usr/bin/env python3
"""
擴充Jamf術語並更新現有術語的category
"""

# 要新增的Jamf專屬術語
new_jamf_terms = [
    {
        'term': 'Jamf binary',
        'category': ['Jamf', 'macOS'],
        'definition': 'Jamf binary。安裝在每台受管 Mac 上的命令列工具,位於 `/usr/local/jamf/bin/jamf`。負責與 Jamf Pro 伺服器通訊、執行 Policy、回報清單資料、處理遠端指令等核心功能。管理員可透過終端機執行 `sudo jamf recon` 手動更新清單,或使用 `sudo jamf policy` 觸發政策。',
        'analogy': '就像「間諜程式」(正面意義)。裝在 Mac 裡的小特務,定時向總部(Jamf伺服器)回報情報(裝置狀態),接收並執行總部下達的任務(Policy),是Jamf整套系統運作的幕後功臣。'
    },
    {
        'term': 'Jamf Remote',
        'category': ['Jamf', 'macOS'],
        'definition': 'Jamf Remote (Jamf Remote Assist)。Jamf Pro內建的瀏覽器端遠端桌面工具。IT可透過網頁直接連線到Mac進行螢幕分享、終端機操作、檔案傳輸與故障排除,無需安裝第三方遠端控制軟體。支援attended(使用者需同意)和unattended(無人值守)兩種連線模式。',
        'analogy': '就像「遠端遙控器」。IT坐在辦公室,透過瀏覽器就能看到並控制員工的Mac螢幕,幫忙抓bug或設定軟體,不用跑過去或叫使用者TeamViewer。'
    },
    {
        'term': 'Jamf Now',
        'category': ['Jamf'],
        'definition': 'Jamf Now。Jamf推出的簡化版雲端MDM解決方案,專為小型企業(50台裝置以下)設計。提供基本的裝置管理、App派送與安全設定功能,但不包含Jamf Pro的進階功能如Policy、Script、Extension Attribute等。定價較低,介面更友善。',
        'analogy': '就像「入門版管理工具」。Jamf Pro是專業級瑞士刀(功能超多但複雜),Jamf Now是簡化版多功能刀,只有最基本幾個工具,適合剛起步的小公司使用。'
    },
    {
        'term': 'Jamf Teacher',
        'category': ['Jamf', 'Education'],
        'definition': 'Jamf Teacher。專為教師設計的課堂管理iPad App,是Apple Classroom的Jamf強化版。老師可即時監看學生畫面、鎖定App、開啟網頁、發送訊息、收集作業並控制裝置。與Jamf School或Jamf Pro整合,支援更精細的課堂控制與行為管理功能。',
        'analogy': '就像「數位教鞭」。老師用iPad就能管理全班30台學生平板:一鍵讓大家打開同一個網頁、鎖定在測驗App、偷看誰在分心,比站起來巡教室更有效率。'
    },
    {
        'term': 'Jamf Student',
        'category': ['Jamf', 'Education'],
        'definition': 'Jamf Student。安裝在學生iPad上的配套App,與Jamf Teacher溝通。學生可透過此App查看課堂講義、繳交作業、舉手發問或請求協助。老師發送的指令(如開啟App、鎖定畫面)會透過此App執行。',
        'analogy': '就像「學生端接收器」。老師的指令透過Jamf Teacher發出,學生的iPad上Jamf Student App會接收並執行,形成完整的課堂管理循環。'
    },
    {
        'term': 'Jamf Trust (Jamf Private Access)',
        'category': ['Jamf', 'Security', 'Network'],
        'definition': 'Jamf Trust (前身為Jamf Private Access/Wandera)。Jamf的零信任網路存取(ZTNA)解決方案。提供裝置姿態檢查(device posture checking)、條件式存取、動態分割通道VPN與網路威脅防護。確保只有合規的裝置才能存取企業資源,支援BYOD與遠端工作場景。',
        'analogy': '就像「智慧門禁系統」。不只檢查你的員工證(帳號),還要檢查你有沒有發燒(裝置合規性)、是否戴口罩(安全設定),全部通過才讓你進辦公室(存取資源),確保零信任安全。'
    },
    {
        'term': 'Jamf Safe Internet',
        'category': ['Jamf', 'Security', 'Network'],
        'definition': 'Jamf Safe Internet。Jamf提供的DNS層級內容過濾與網路安全服務。可阻擋惡意網站、釣魚連結、不當內容,並提供網路活動報表。與Jamf Pro整合,可套用至特定裝置群組,適合學校與企業保護裝置免於網路威脅。',
        'analogy': '就像「網路保鑣」。在你連上任何網站之前,先幫你檢查網址是不是詐騙網站或色情網站,是的話直接擋下來,保護你不會不小心點錯連結。'
    },
    {
        'term': 'Jamf Data Policy',
        'category': ['Jamf', 'Security'],
        'definition': 'Jamf Data Policy。Jamf Pro的資料外洩防護(DLP)功能。允許管理員設定規則防止敏感資料透過AirDrop、截圖、複製貼上等方式外洩。可針對特定App或檔案類型設定限制,並記錄所有違規行為供稽核。',
        'analogy': '就像「資料防盜網」。設定規則禁止將財務報告截圖傳給私人LINE,或禁止把機密文件AirDrop出去,系統會自動攔截並記錄誰試圖這麼做。'
    },
    {
        'term': 'Recon',
        'category': ['Jamf', 'macOS'],
        'definition': 'Recon。`jamf recon`指令的簡稱,是Jamf binary最常用的指令之一。執行後會立即收集Mac的最新清單資訊(硬體規格、已安裝軟體、使用者資料、Extension Attribute等)並回傳至Jamf Pro伺服器。故障排除時的第一步驟。',
        'analogy': '就像「立即體檢」指令。跟電腦說`sudo jamf recon`,它就會馬上量身高體重、檢查有裝哪些軟體,然後把最新健康報告傳回總部(Jamf),不用等每天的定期檢查。'
    },
    {
        'term': 'Casper Suite',
        'category': ['Jamf'],
        'definition': 'Casper Suite。Jamf Pro的前身品牌名稱(2002-2015)。早期Jamf的管理工具稱為Casper,後來更名為Jamf Pro。有些舊文件或討論串仍會使用Casper這個稱呼,但指的就是現在的Jamf Pro。',
        'analogy': '就像「舊品牌名稱」。就像Facebook改名Meta,Casper Suite就是Jamf Pro的舊名字。看到有人講Casper,不用困惑,他們講的就是Jamf Pro。'
    },
]

# 需要添加'Jamf'分類的現有術語 (term name)
terms_to_add_jamf_category = [
    'Smart Group',
    'Static Group',
    'Configuration Profile',
    'Policy',
    'Patch Management',
    'Composer',
    'jamfHelper',
    'Nudge',
    'Self Service',
    'PreStage Enrollment',
    'Scope',
    'Extension Attribute',
]

print("準備新增的Jamf術語:")
for t in new_jamf_terms:
    print(f"  - {t['term']}")

print(f"\n準備添加Jamf分類的現有術語:")
for t in terms_to_add_jamf_category:
    print(f"  - {t}")
    
print(f"\n共新增 {len(new_jamf_terms)} 個Jamf專屬術語")
print(f"共更新 {len(terms_to_add_jamf_category)} 個現有術語")
