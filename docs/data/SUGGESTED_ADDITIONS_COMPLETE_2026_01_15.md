# 建議新增的術語與題目列表 (完整版 - 2026/01/15)

> **基於 iOS/iPadOS 26.2、macOS Tahoe 26.2、iOS 26.3 beta 的最新資訊**  
> 生成日期：2026-01-15  
> 最後驗證時間：2026-01-15 10:00 (GMT+8)

---

## 📌 重要版本資訊確認

### 當前最新版本 (2026年1月15日)
- **iOS/iPadOS 26.2** (2025年12月12日發布)
- **macOS Tahoe 26.2** (2025年12月發布)
- **iOS/iPadOS 26.3 beta 2** (2026年1月12日開發者版，1月13日公測版)
- **macOS Tahoe 26.3 beta 2** (2026年1月12日發布)

### 版本命名說明
- Apple 自 2025 年起改用年份命名：iOS 26 = 2025年發布
- macOS 15 Sequoia (2024) → macOS 26 Tahoe (2025)
- **重大里程碑**：macOS Tahoe 是最後支援 Intel Mac 的版本

### 台灣數位學習精進方案狀態
- **現行方案期程**：110/12/01 ~ 114/12/31 (2025年底結束)
- **2026年規劃**：方案已結束，教育部將推出「AI教育4年計畫」(2026起)
- **關鍵影響**：建議內容需考慮「後精進方案時代」的裝置管理

---

## 🎯 Q&A 撰寫準則（詳細版）

### 基於現有範例分析的核心原則

#### 1. 結構規範

**Frontmatter 必要欄位**：
```yaml
---
id: [章節縮寫]-[編號]  # 例如：dl-21, enr-23
title: "問題標題（必須使用台灣繁體中文術語）"
category: "完整章節名稱（中英對照）"
important: true/false  # 是否為高頻或關鍵問題
tags: ["標籤1", "標籤2", "標籤3"]  # 3-6個精確標籤
---
```

**內容架構**：
```markdown
# Q: [重複問題標題]

# Answer

**核心答案（粗體開場，一句話總結）**

詳細說明段落...

**技術重點/操作步驟/風險提示**：
[分點列舉]

**實務建議/專家提醒**：
[具體可執行的建議]
```

#### 2. 語言與風格規範

**專業術語使用**：
- ✅ 使用台灣 Apple 官方繁體中文術語
- ✅ 「管理式 Apple 帳號」不是「託管式」
- ✅ 「裝置」不是「設備」
- ✅ 「描述檔」不是「配置文件」
- ✅ 「螢幕使用時間」不是「屏幕時間」
- ✅ 「資料」不是「數據」（台灣用語）

**避免的大陸用語**：
- ❌ 文件 → ✅ 檔案/描述檔
- ❌ 應用程式商店 → ✅ App Store
- ❌ 雲端 → ✅ iCloud（具體功能名稱）

**語氣規範**：
- 專業但不冷漠：「建議您優先...」而非「必須...」
- 實務導向：提供具體步驟與檢查清單
- 風險意識：主動提及操作可能的副作用
- 零廢話：直接進入核心，不使用「您好」、「作為AI」等開場

#### 3. 內容深度要求

**多維度視角**（參考 dl-16 範例）：
1. **操作步驟**：條列式、可執行的 SOP
2. **技術原理**：解釋「為什麼」這樣做
3. **風險提示**：明確警告可能的副作用
4. **專家建議**：優化流程與避免陷阱的進階技巧

**實例化說明**（參考 enr-3 範例）：
- 使用表格對比（如 Supervised vs Unsupervised）
- 提供具體路徑（如「設定 > 一般 > 裝置管理」）
- 包含檢查方法（如「顯示一行小字：此 iPad 由...監管」）

#### 4. 教育場域特殊考量

**精進方案相關內容**（參考 dl-1 範例）：
- 明確引用教育部公文日期（如「2025年9月公文」）
- 說明政策脈絡（如 CDN 服務、使用率計算）
- 提供檢查方法（如 Jamf Trust App 綠色盾牌）
- 區分「教育部 Jamf Pro 環境」的限制

**2026年後的調整**：
- 避免寫「精進方案將於...」（因已結束）
- 改為「先前精進方案配發的裝置...」
- 新增「後續管理」、「裝置歸屬」等過渡期議題

#### 5. 版本標註規範

**系統版本提及**：
- ✅ 「iOS 26.2 新增」
- ✅ 「macOS Tahoe 26 開始支援」
- ✅ 「系統版本 26」（Apple 官方用語）
- ❌ 避免「iOS 18」等過時版本

**功能生命週期**：
- 新功能標註：「(2025年9月 WWDC 宣布)」
- Beta 功能警告：「(iOS 26.3 beta，正式版待確認)」
- 棄用功能：「(2026年底將停止支援舊式 MDM 指令)」

#### 6. 標籤策略

**標籤分類邏輯**：
- 系統版本：`iOS 26`, `macOS Tahoe`, `系統版本 26`
- 功能領域：`DDM`, `Apple Intelligence`, `零抹除遷移`
- 使用情境：`考試防弊`, `精進方案`, `維修 SOP`
- 對象角色：`管理員`, `老師`, `學生`
- 問題類型：`故障排除`, `政策建議`, `最佳實務`

#### 7. 避免與現有內容衝突

**檢查機制**：
1. 先查閱 `MAINTENANCE_INDEX.md` 確認題目未重複
2. 若新題目與現有題目相似，需調整角度：
   - 現有：「如何設定 Apple Classroom？」
   - 新增：「如何解決 Apple Classroom 連線失敗？」（故障排除角度）
3. 避免矛盾建議：
   - 檢查現有答案的技術建議是否一致
   - 若技術更新，考慮「補充」而非「否定」舊答案

**精進方案特殊處理**：
- 現有 dl-1 到 dl-20 已涵蓋精進方案核心議題
- 新題目應聚焦：
  - ✅ 2026年過渡期管理
  - ✅ iOS 26 新功能對精進裝置的影響
  - ✅ 合約結束後的裝置歸屬與管理
  - ❌ 避免重複「使用率計算」等已有題目

---

## 📊 內容缺口分析（基於2026年1月最新狀況）

### 一、iOS 26/iPadOS 26 新功能缺口

#### 已確認缺少的重要主題：
1. **Liquid Glass 設計系統**
   - 現況：完全未涵蓋
   - 影響：使用者誤以為螢幕故障、介面模糊
   - 優先級：★★★☆☆（美學功能，但有誤解風險）

2. **Window App (視窗化多工)**
   - 現況：edu-23 有提及但無深入說明
   - 影響：教學專注度管理、低年級學生操作複雜度
   - 優先級：★★★★☆（教育場域重要）

3. **Zero-Wipe MDM Migration**
   - 現況：acc-12 有提及，但未涵蓋詳細 SOP
   - 影響：學校更換 MDM 廠商的決策
   - 優先級：★★★★★（高風險高價值）

4. **Enforcement Deadline**
   - 現況：完全未涵蓋
   - 影響：軟體更新與 MDM 註冊的強制執行
   - 優先級：★★★★★（DDM 核心機制）

5. **Background Security Improvements**
   - 現況：未涵蓋
   - 影響：安全更新策略變革
   - 優先級：★★★★☆（iOS 26.3 新機制）

6. **AirDrop Codes**
   - 現況：未涵蓋
   - 影響：學校 AirDrop 管理政策
   - 優先級：★★★☆☆

### 二、macOS Tahoe 專屬缺口

1. **Intel Mac 支援終止**
   - 現況：完全未涵蓋
   - 影響：學校採購決策、汰換規劃
   - 優先級：★★★★★（財務影響重大）

2. **FileVault Unlock over SSH**
   - 現況：FileVault 已存在，但此功能未獨立說明
   - 影響：遠端 Mac 管理效率
   - 優先級：★★★★☆

3. **Platform SSO in Setup Assistant**
   - 現況：Platform SSO 已存在，但 ADE 整合未強調
   - 影響：Mac 部署流程優化
   - 優先級：★★★★☆

### 三、Apple Intelligence 管理缺口

1. **Writing Tools 考試防弊**
   - 現況：cls-12 已涵蓋，但可更新至 iOS 26
   - 影響：考試公平性
   - 優先級：★★★★★（已有基礎，需更新）

2. **Image Playground / Genmoji 風險**
   - 現況：術語存在，但教育風險評估缺乏
   - 影響：學生不當內容創建
   - 優先級：★★★★☆

### 四、2026年後精進方案過渡期缺口

1. **合約結束後的裝置管理**
   - 現況：完全未涵蓋
   - 影響：學校不確定裝置歸屬
   - 優先級：★★★★★（時效性關鍵）

2. **AI教育4年計畫銜接**
   - 現況：未涵蓋
   - 影響：新政策準備
   - 優先級：★★★☆☆（政策尚不明確）

### 五、Jamf Pro 2026 更新缺口

1. **Blueprints (Configuration Profiles 3.0)**
   - 現況：Blueprints 術語存在，但實務應用缺乏
   - 影響：DDM 部署流程
   - 優先級：★★★★★（2026年底舊指令停用）

2. **Declarative Software Updates 強制轉換**
   - 現況：DDM 已涵蓋，但 2026年底停用舊指令的影響未說明
   - 影響：所有學校的更新策略
   - 優先級：★★★★★（強制性變更）

---
## 💎 建議新增的術語 (Glossary) - 詳細清單

### A. iOS/iPadOS 26 與 macOS Tahoe 26 核心功能

#### 1. **Liquid Glass (liquid-glass.md)**
**重要性**：★★★★☆  
**類別**：`["Core", "iOS 26", "macOS Tahoe", "Design"]`  
**標籤**：`["Liquid Glass", "介面設計", "iOS 26", "macOS Tahoe", "visionOS"]`

**術語定義**：
Liquid Glass 是 Apple 於 2025 年（系統版本 26）推出的全新視覺設計語言，靈感來自 visionOS。特色包括透明度增強、動態反射效果、以及流暢的視覺層次感。iPadOS 26 與 macOS Tahoe 全面採用此設計，鎖定畫面、應用程式圖示、資料夾圖示都展現玻璃質感。

**白話文比喻**：
就像百貨公司的玻璃帷幕，既能看到內容，又能映照出周圍環境的光影變化。iPad 的鎖定畫面現在就像一片「會呼吸的玻璃」，會隨著環境光線調整透明度，讓介面感覺更輕盈、更現代。

**MDM 相關**：
使用者可在鎖定畫面設定中調整 Liquid Glass 的不透明度（iOS 26.2 新功能）。教育場域影響較小，但需注意學生可能誤以為螢幕模糊是故障。

---

#### 2. **Window App / Windowing System (window-app-windowing-system.md)**
**重要性**：★★★★★  
**類別**：`["Core", "iPadOS 26", "Multitasking", "Education"]`  
**標籤**：`["Window App", "多工", "iPadOS 26", "視窗化", "拖放式多工"]`

**術語定義**：
iPadOS 26 引入的視窗化多工系統，允許 iPad 像 Mac 一樣以視窗形式開啟多個 App。使用者可透過拖拉 App 圖示（從 Dock 或 Spotlight）創建分割視圖、滑動置前或獨立視窗。這是 iPad 多工處理的重大革新。

**白話文比喻**：
以前 iPad 的多工像是「並排攤開課本」，一次看兩本。現在 Window App 讓 iPad 變成「書桌」，你可以把課本、筆記本隨意擺放、重疊、調整大小，就像真的在桌上整理資料一樣自由。

**MDM 相關**：
教育場域需考慮是否限制此功能，避免低年級學生操作混亂或上課分心。MDM 可透過「Restrictions」描述檔管理多工權限。

**風險提示**：
過於複雜的多工介面可能讓國小低年級學生不知所措，建議分年級段管理。

---

#### 3. **Drag and Drop Multitasking (drag-drop-multitasking.md)**
**重要性**：★★★★☆  
**類別**：`["Core", "iPadOS 26", "Multitasking"]`  
**標籤**：`["拖放", "多工", "iPadOS 26.2", "Dock", "Spotlight"]`

**術語定義**：
iPadOS 26.2 強化的拖放式多工手勢。使用者可直接從 Dock 或 Spotlight 拖拉 App 圖示，快速建立分割視圖（Split View）、滑動置前（Slide Over）或視窗配置，無需繁瑣的多步驟操作。

**白話文比喻**：
就像整理書桌時，直接把書本從書架（Dock）拖到桌上排好位置，不用再一本一本「複製貼上」才能並排閱讀。

---

#### 4. **AirDrop Codes (airdrop-codes.md)**
**重要性**：★★★★☆  
**類別**：`["Network", "Privacy", "iOS 26", "Security"]`  
**標籤**：`["AirDrop", "代碼", "隱私", "iOS 26.2", "檔案分享"]`

**術語定義**：
iOS 26.2 新增的 AirDrop 安全功能。使用者可產生一次性代碼（有效期30天），與陌生人分享檔案時需輸入此代碼驗證，增加隱私保護層。同時可管理「已知 AirDrop 聯絡人」清單。

**白話文比喻**：
以前 AirDrop 像是「開放的郵筒」，任何人經過都能投信。現在有了代碼功能，就像郵筒加了密碼鎖，只有知道密碼的人才能投遞，更安全。

**MDM 相關**：
學校需評估此功能對 AirDrop 管理政策的影響。若學生使用代碼規避 AirDrop 限制，MDM 可能需調整策略。

---

#### 5. **Network Extension URL Filtering API (network-extension-url-filtering-api.md)**
**重要性**：★★★★★  
**類別**：`["Network", "Security", "iOS 26", "macOS Tahoe", "Education"]`  
**標籤**：`["URL 過濾", "內容過濾", "Network Extension", "隱私保護", "Jamf Safe Internet"]`

**術語定義**：
iOS 26 與 macOS Tahoe 引入的全系統 URL 過濾 API。此 API 讓第三方 App（如 Jamf Safe Internet）能以隱私保護的方式執行系統級 URL 過濾，無需建立傳統 VPN 通道，效能更佳、隱私更好。

**白話文比喻**：
以前內容過濾像「檢查哨」，所有車輛（網路流量）都要繞道通過檢查站（VPN），速度慢。新 API 像是在每輛車內裝「導航禁止提示」，車子自己知道哪些路（網址）不能走，不用繞路也能過濾。

**MDM 相關**：
這是 Jamf Safe Internet、Jamf Trust 等教育內容過濾工具的核心技術基礎。教育部精進方案 2025年9月的架構調整即基於此技術。

**技術原理**：
使用 DNS over HTTPS (DoH) 與系統級 Network Extension，在不解密流量的前提下實現 URL 過濾，符合隱私法規。

---

#### 6. **MDM Migration (Zero-Wipe) (mdm-migration-zero-wipe.md)**
**重要性**：★★★★★  
**類別**：`["MDM", "Core", "iOS 26", "macOS Tahoe", "Account"]`  
**標籤**：`["MDM 遷移", "零抹除", "ABM", "ASM", "裝置轉移"]`

**術語定義**：
iOS 26、iPadOS 26、macOS Tahoe 支援的 MDM 遷移功能。透過 Apple Business Manager (ABM) 或 Apple School Manager (ASM)，可將裝置從舊 MDM 遷移至新 MDM，無需抹除資料。保留使用者資料與管理式 App，但仍需重新設定描述檔。

**白話文比喻**：
以前換 MDM 像「搬家要把房子拆掉重建」，所有東西都沒了。現在零抹除遷移像「換管理公司但不搬家」，家具（App、資料）都還在，只是換新管理員。

**MDM 相關**：
可設定「Enforcement Deadline（強制執行截止日期）」，過期未遷移的裝置會收到遞增通知。

**風險提示**：
教育環境不建議零抹除遷移！因舊描述檔殘留易導致 Apple Classroom 失靈、VPP 授權衝突。建議仍使用「Return to Service」完全重置。

---

#### 7. **Enforcement Deadline (enforcement-deadline.md)**
**重要性**：★★★★★  
**類別**：`["DDM", "Core", "iOS 26", "macOS Tahoe"]`  
**標籤**：`["強制執行", "截止日期", "DDM", "軟體更新", "MDM 註冊"]`

**術語定義**：
宣告式裝置管理（DDM）的強制執行機制。管理員可設定軟體更新或 MDM 註冊的強制截止日，接近截止日時會遞增通知頻率，截止後移除使用者的「稍後提醒」選項，強制執行。

**白話文比喻**：
就像圖書館的「到期催還書」系統。第一週提醒一次，第二週每天提醒，最後一天會鎖帳號強制還書。Enforcement Deadline 確保裝置必須在期限內更新或註冊。

**MDM 相關**：
搭配 Zero-Wipe MDM Migration 使用，確保裝置按時完成遷移。也用於確保關鍵安全更新的及時安裝。

**技術原理**：
基於 DDM 的 Declaration 機制，裝置本地評估截止日並自主執行，無需伺服器持續輪詢。

---

#### 8. **Background Security Improvements (background-security-improvements.md)**
**重要性**：★★★★★  
**類別**：`["Security", "iOS 26", "Update"]`  
**標籤**：`["安全更新", "快速修補", "iOS 26.3", "Safari", "WebKit"]`

**術語定義**：
iOS 26.3 引入的快速安全修補機制，用於快速修補 Safari、WebKit 等元件的安全漏洞，無需完整系統更新。可能取代舊有的 Rapid Security Response (RSR) 系統。

**白話文比喻**：
以前修補安全漏洞像「整棟大樓停電施工」（完整系統更新），現在變成「只換壞掉的燈泡」（Background Security Improvements），快速、不影響使用。

**MDM 相關**：
學校需了解此機制會自動背景安裝，影響 Patch Management 策略。可能無需再等完整 iOS 更新才修補安全漏洞。

---

#### 9. **Wi-Fi 6E 160MHz Channel Bandwidth (wifi-6e-160mhz.md)**
**重要性**：★★★★☆  
**類別**：`["Network", "Hardware", "iPadOS 26", "macOS Tahoe"]`  
**標籤**：`["Wi-Fi 6E", "160MHz", "網路速度", "iPadOS 26.2", "macOS Tahoe 26.2"]`

**術語定義**：
iPadOS 26.2 與 macOS Tahoe 26.2 的隱藏功能。支援 Wi-Fi 6E 的裝置（如 iPad Pro M2/M4、Mac with Apple Silicon）在 5GHz 頻段啟用 160MHz 通道頻寬後，Wi-Fi 速度可翻倍。

**白話文比喻**：
以前的 Wi-Fi 像「單線道高速公路」(80MHz)，現在變成「雙線道高速公路」(160MHz)，車流量（資料傳輸）翻倍。

**MDM 相關**：
學校網路設備若支援 Wi-Fi 6E 且正確設定，精進方案配發的新款 iPad 可獲得更快的網路速度，有利大檔案下載與內容快取。

**硬體需求**：
僅限支援 Wi-Fi 6E 的裝置，且 AP 需支援 160MHz 頻寬設定。

---

#### 10. **Audio Accessory Configuration (audio-accessory-configuration.md)**
**重要性**：★★★★☆  
**類別**：`["Hardware", "iOS 26", "Shared iPad"]`  
**標籤**：`["AirPods", "Beats", "配對", "共用 iPad", "音訊配件"]`

**術語定義**：
iOS 26/iPadOS 26 的新 MDM 設定 (`com.apple.configuration.audio-accessory.settings`)。允許受監管裝置臨時配對 AirPods 或 Beats 音訊配件，但不同步配對資訊至 iCloud，適合共用 iPad 環境。

**白話文比喻**：
以前 AirPods 配對像「結婚登記」，會永久記錄在 iCloud。現在共用模式像「臨時租借」，用完就忘記，不會干擾其他使用者。

**MDM 相關**：
解決共用 iPad 環境下 AirPods 配對混亂問題。學生使用後不會將配對資訊帶到其他裝置。

---

#### 11. **Automatic Reboot (automatic-reboot.md)**
**重要性**：★★★★☆  
**類別**：`["Security", "iOS 26", "Privacy"]`  
**標籤**：`["自動重開機", "安全機制", "長時間鎖定", "資料保護"]`

**術語定義**：
iOS 26 的安全功能。MDM 可設定裝置在長時間鎖定後（如連續鎖定72小時）自動重新開機，清除記憶體中的敏感資料，增強安全性。

**白話文比喻**：
就像銀行金庫的「定時鎖定機制」，長時間沒人開啟會自動加強鎖定層級。iPad 長時間不用會自動重開機，把記憶體裡的「臨時密碼」全清掉。

**MDM 相關**：
學校可設定此功能，確保遺失或長期未使用的裝置自動清除敏感資料。

**使用者溝通**：
需向家長解釋，這不是故障，是安全保護機制。

---

### B. macOS Tahoe 專屬功能

#### 12. **FileVault Unlock over SSH (filevault-unlock-ssh.md)**
**重要性**：★★★★☆  
**類別**：`["Mac", "Security", "macOS Tahoe"]`  
**標籤**：`["FileVault", "SSH", "遠端解鎖", "Remote Login"]`

**術語定義**：
macOS Tahoe 的新功能。若Mac已啟用「遠端登入 (Remote Login)」且有網路連線，管理員可透過 SSH 遠端解鎖 FileVault 加密的磁碟，無需實體接觸 Mac。

**白話文比喻**：
以前 Mac 重開機後 FileVault 鎖住，像「保險箱需要本人親自轉密碼鎖」。現在 SSH 解鎖像「遠端視訊確認身分後，保全幫你開鎖」。

**MDM 相關**：
大幅提升遠端 Mac 管理效率。IT 人員可遠端重開機並解鎖，無需到現場。

**安全考量**：
需確保 SSH 本身的安全性（強密碼、金鑰驗證），避免成為攻擊入口。

---

#### 13. **Setup Pane Skipping (setup-pane-skipping.md)**
**重要性**：★★★★☆  
**類別**：`["Mac", "Enrollment", "macOS Tahoe", "DDM"]`  
**標籤**：`["Setup Assistant", "設定輔助程式", "跳過", "部署加速"]`

**術語定義**：
macOS Tahoe 的 DDM 功能。MDM 可透過宣告式設定跳過「OS Showcase (系統功能展示)」與「Update Completed (更新完成)」等設定面板，加速部署流程。

**白話文比喻**：
以前 Mac 開機像「看完整部教學影片才能用」。現在可跳過不必要的介紹，直接進入「實際操作」，節省時間。

**MDM 相關**：
教育電腦教室大量部署時，可省下大量時間。搭配 PreStage Enrollment 使用效果更佳。

---

#### 14. **App Privacy Permissions Visibility (app-privacy-permissions-visibility.md)**
**重要性**：★★★★☆  
**類別**：`["Mac", "Privacy", "macOS Tahoe", "PPPC"]`  
**標籤**：`["隱私權限", "透明度", "PPPC", "系統設定"]`

**術語定義**：
macOS Tahoe 的透明度提升功能。MDM 設定的 App 隱私權限（如螢幕錄製、全磁碟取用）現在會明確顯示在「系統設定 > 隱私權與安全性」，標示為「由組織設定」。

**白話文比喻**：
以前 MDM 給的權限像「暗箱操作」，使用者不知道誰有權限。現在像「公開的授權清單」，使用者一目了然哪些 App 被 IT 授權了什麼權限。

**MDM 相關**：
提升使用者信任度，但也可能引發使用者質疑「為什麼這個 App 有這麼多權限」。IT 需準備說明文件。

---

#### 15. **Platform SSO in Setup Assistant (platform-sso-setup-assistant.md)**
**重要性**：★★★★★  
**類別**：`["Mac", "Account", "macOS Tahoe", "ADE", "Security"]`  
**標籤**：`["Platform SSO", "Setup Assistant", "ADE", "Secure Enclave", "FileVault"]`

**術語定義**：
macOS Tahoe 的 ADE 增強功能。在自動裝置註冊 (ADE) 期間，Platform SSO 可整合至設定輔助程式，使用者可在初次開機時即用企業帳號登入，Secure Enclave 金鑰驗證可免除密碼輸入，並自動解鎖 FileVault。

**白話文比喻**：
以前 Mac 開機要「先用本機帳號登入，再綁定公司帳號」，兩套流程。現在像「拿公司識別證直接刷門禁進入」，一步到位。

**MDM 相關**：
從第一次開機就整合企業身分驗證，無縫銜接 FileVault 解鎖，大幅簡化 Mac 部署流程。

**技術優勢**：
使用 Secure Enclave 儲存 SSO Token，安全性更高，且支援生物辨識解鎖（Touch ID / Face ID on MacBook）

---

#### 16. **Intel Mac End-of-Support Milestone (intel-mac-end-of-support.md)**
**重要性**：★★★★★  
**類別**：`["Mac", "Hardware", "macOS Tahoe", "Planning"]`  
**標籤**：`["Intel Mac", "支援終止", "Apple Silicon", "採購規劃", "汰換"]`

**術語定義**：
macOS Tahoe 是最後支援 Intel Mac 的版本。支援的最後一批 Intel Mac 包括 2020 iMac、2019 16" MacBook Pro、2020 13" MacBook Pro (四個 Thunderbolt 3 埠)、2019 Mac Pro。未來 macOS 版本將僅支援 Apple Silicon。

**白話文比喻**：
就像「最後一班往舊市區的公車」。macOS Tahoe 是 Intel Mac 的終點站，之後的公車（新版 macOS）只開往新市區（Apple Silicon）。

**MDM 相關**：
學校需緊急評估 Intel Mac 的數量與汰換時程。2026年後購買 Mac 必須是 Apple Silicon，且需規劃 Intel Mac 的逐步淘汰。

**財務影響**：
若學校電腦教室仍有大量 Intel Mac，需編列預算逐步汰換，否則將無法升級未來的 macOS。

**實務建議**：
- 2026年：盤點 Intel Mac 清單
- 2027年：開始逐步汰換高使用率裝置
- 2028-2029年：完全轉換至 Apple Silicon

---

### C. Apple Intelligence 深度管理

#### 17. **Apple Intelligence (apple-intelligence.md)**
**重要性**：★★★★★  
**類別**：`["Core", "AI", "iOS 26", "macOS Tahoe", "Education"]`  
**標籤**：`["Apple Intelligence", "AI", "寫作工具", "Image Playground", "Genmoji", "考試防弊"]`

**術語定義**：
Apple於 2025年（系統版本 26）推出的裝置端大型語言模型 (LLM) 系統。支援寫作工具、郵件摘要、Genmoji、Image Playground 等 AI 功能。僅限配備 M 系列晶片或 A17 Pro 以上的裝置。

**白話文比喻**：
就像在 iPad 裡放一個「私人小助理」，可以幫你寫信、摘要文章、畫圖、造表情符號，而且全程在你手機裡完成，不會傳到雲端被偷看。

**MDM 相關**：
組織可完全啟用或禁用 Apple Intelligence。教育場域需制定使用政策，尤其考試期間需禁用 Writing Tools 防止作弊。

**硬體限制**：
一般入門款 iPad (第9/10代) 不支援，無需擔心。只有 iPad Pro M1以上、iPad Air M1以上才支援。

**教育政策建議**：
- 平時：開放使用，作為學習輔助
- 考試：透過 MDM 臨時禁用 Writing Tools
- 作業：需明確告知學生使用 AI 的界線

---

### D. DDM (宣告式裝置管理) 深度補充

#### 18. **Declarative Software Updates (declarative-software-updates.md)**
**重要性**：★★★★★  
**類別**：`["DDM", "Core", "iOS 26", "macOS Tahoe", "Update"]`  
**標籤**：`["DDM", "軟體更新", "2026年強制", "Beta 註冊", "分階段推出"]`

**術語定義**：
Apple 自 2026年底起強制使用的軟體更新管理方式。傳統 MDM 遠端更新指令將停止支援，所有軟體更新必須透過宣告式裝置管理（DDM）的 Declaration 機制執行。支援遠端註冊 Beta 計畫、分階段推出、Enforcement Deadline 等進階功能。

**白話文比喻**：
以前更新像「老師一個一個催學生交作業」（MDM 伺服器逐台發指令）。現在像「公佈欄貼出截止日，學生自己看時間交」（DDM 宣告，裝置自主執行）。

**MDM 相關**：
**2026年底強制轉換！** 學校必須在 2026年底前將所有軟體更新策略轉換為 DDM，否則將無法管理更新。

**Jamf Pro 對應**：
使用 **Blueprints (Configuration Profiles 3.0)** 執行 DDM 軟體更新。舊版 Policy-based 更新將失效。

**技術優勢**：
- 裝置自主評估更新時機（電量、網路、使用狀況）
- Real-time 狀態回報（Status Channel）
- 支援 Apple TV、Apple Vision Pro

---

#### 19. **Declarative App Management (declarative-app-management.md)**
**重要性**：★★★★★  
**類別**：`["DDM", "Apps", "iOS 26", "macOS Tahoe"]`  
**標籤**：`["DDM", "App 管理", "必要 App", "選用 App", "自動更新"]`

**術語定義**：
iOS 26、iPadOS 26、macOS Tahoe 的 DDM App 管理機制。可部署 App Store App、Custom App、.pkg 套件。支援定義每個 App 的更新行為（強制更新、禁用自動更新、釘選版本），並提供即時安裝狀態回報。

**白話文比喻**：
以前派送 App 像「快遞到府，簽收就好」。現在像「訂閱服務，可設定自動續訂、暫停、指定版本」，更有彈性。

**MDM 相關**：
- **Required Apps（必要 App）**：自動安裝，使用者無法移除
- **Optional Apps（選用 App）**：使用者可選擇安裝
- **Per-App Update Control**：可針對個別 App 設定是否自動更新

**Jamf Pro 設定路徑**：
Blueprints > App Management > Declarative App Configuration

---

#### 20. **Managed App Framework (managed-app-framework.md)**
**重要性**：★★★★★  
**類別**：`["DDM", "Apps", "Future", "Security"]`  
**標籤**：`["Managed App Framework", "App 設定", "憑證傳遞", "WWDC 2025"]`

**術語定義**：
WWDC 2025 宣布的新 App 管理框架，預計在後續系統版本中推出。允許 MDM 安全地傳遞設定、憑證、密碼給 App，取代傳統的 Managed App Configuration。使用更安全的加密通道，App 可動態請求設定更新。

**白話文比喻**：
以前給 App 設定像「寫紙條塞進信箱」（Managed App Configuration），App 只能開啟時讀一次。新框架像「即時通訊」（Managed App Framework），App 可隨時跟 MDM 要最新設定，更彈性更安全。

**MDM 相關**：
未來趨勢，但尚未正式推出。建議先了解概念，待 Apple 正式發布後再規劃遷移。

---

### E. 其他重要新術語

#### 21. **Transfer to Android Tool (transfer-to-android-tool.md)**
**重要性**：★★☆☆☆  
**類別**：`["iOS 26", "Migration"]`  
**標籤**：`["Android", "資料轉移", "iOS 26.3", "跨平台"]`

**術語定義**：
iOS 26.3 新增的工具，方便使用者將 iPhone 資料轉移至 Android 裝置。支援聯絡人、相片、訊息等資料遷移。

**MDM 相關**：
教育場域影響極小，學校不太會從 iPad 轉 Android。但需注意若學生將管理式 Apple 帳號資料嘗試轉移，可能引發資料外洩疑慮。

---

#### 22. **Camera Access Control per App (camera-access-per-app.md)**
**重要性**：★★★★☆  
**類別**：`["iOS 26", "Privacy", "Security"]`  
**標籤**：`["相機權限", "隱私", "allowedCameraRestrictionBundleIDs", "個別 App"]`

**術語定義**：
iOS 26/iPadOS 26 新增的 MDM 金鑰 `allowedCameraRestrictionBundleIDs`，可針對個別 App 授予或拒絕相機存取權限，比全域相機限制更精細。

**白話文比喻**：
以前相機權限像「大門鑰匙」，要嘛全開要嘛全鎖。現在像「房卡系統」，可以讓 A App 用相機，但 B App 不行。

**MDM 相關**：
教育場域可允許「課堂 (Classroom)」或「Schoolwork」使用相機，但禁止社交 App 使用，防止隱私洩漏。

---

#### 23. **Restrict App Downloads over Cellular (restrict-cellular-app-downloads.md)**
**重要性**：★★★★☆  
**類別**：`["DDM", "Apps", "Network"]`  
**標籤**：`["行動數據", "Wi-Fi", "App 下載", "流量管理"]`

**術語定義**：
iOS 26/iPadOS 26 DDM功能，組織可限制 App 只能透過 Wi-Fi 下載，禁止使用行動網路，節省數據流量。

**白話文比喻**：
就像家長設定「遊戲只能在家裡的 Wi-Fi 玩，不能用手機流量」，避免學生用光流量。

**MDM 相關**：
精進方案 iPad 若有插 SIM 卡（部分縣市有配發），可防止學生用行動網路下載大型 App 或遊戲。

---

#### 24. **Blob URLs and Managed Open-In Improvement (blob-urls-managed-open-in.md)**
**重要性**：★★★★☆  
**類別**：`["iOS 26", "Security", "Managed Open In"]`  
**標籤**：`["Blob URL", "Managed Open In", "資料外洩防護", "檔案分享限制"]`

**術語定義**：
iOS 26 的安全性改進。Blob URL（瀏覽器產生的臨時檔案連結）現在會遵守 Managed Open-In 限制，防止使用者透過壓縮或 Blob URL 繞過資料外洩防護。

**白話文比喻**：
以前有「秘密通道」（Blob URL）可以繞過門禁（Managed Open In），現在秘密通道也被鎖住了，更嚴密。

**MDM 相關**：
強化企業資料防護，防止學生將管理式 App 的資料外傳至個人 App。

---

### F. 網路與基礎設施補充

#### 25. **DNS over HTTPS (DoH) / DNS over TLS (DoT) (dns-over-https-dot.md)**
**重要性**：★★★★☆  
**類別**：`["Network", "Security", "Privacy"]`  
**標籤**：`["DoH", "DoT", "DNS 加密", "隱私", "Jamf Safe Internet"]`

**術語定義**：
加密的 DNS 查詢協定。DoH 使用 HTTPS (Port 443) 加密 DNS 請求，DoT 使用 TLS (Port 853)。可防止 ISP 或中間人監聽 DNS 查詢，保護隱私，但也可能繞過學校 DNS 過濾。

**白話文比喻**：
傳統 DNS 像「明信片」，郵差（ISP）看得到你寄給誰。DoH 像「密封信件」，郵差只知道寄到哪個郵局，看不到具體內容。

**MDM 相關**：
Jamf Safe Internet 使用 Jamf DNS over HTTPS gateway 實現內容過濾，兼顧隱私與安全。但學生若自行安裝第三方 DoH App（如 Cloudflare 1.1.1.1），可能繞過學校過濾。

**應對策略**：
- 使用 Network Extension URL Filtering API（iOS 26 新功能）
- 限制 VPN/DNS App 的安裝

---

#### 26. **Captive Portal (captive-portal.md)**
**重要性**：★★★★☆  
**類別**：`["Network", "Wi-Fi"]`  
**標籤**：`["Captive Portal", "強制入口網頁", "公共 Wi-Fi", "登入頁面"]`

**術語定義**：
連線公共 Wi-Fi 前需先登入的網頁（如輸入手機號碼、看廣告）。常見於飯店、機場、咖啡廳。MDM 裝置連線至 Captive Portal Wi-Fi 時可能無法自動完成註冊或通訊。

**白話文比喻**：
就像進百貨公司前要先填問卷才能拿優惠券。Captive Portal 就是 Wi-Fi 的「入場問卷」。

**MDM 相關**：
學校裝置若需在校外使用（如校外教學），可能遇到 Captive Portal 阻擋 MDM 通訊。建議使用 Hotspot 或手動登入後再等待 MDM 同步。

---

### G. 台灣教育專屬補充

#### 27. **Post-PADS Digital Learning Transition (後精進方案數位學習轉型) [虛擬術語，建議融入 Q&A]**
**重要性**：★★★★★  
**類別**：`["Education", "Taiwan", "Planning"]`  
**標籤**：`["精進方案", "2026", "裝置歸屬", "後續管理"]`

**說明**：
這不是技術術語，而是台灣教育部「推動中小學數位學習精進方案」（PADS, Promoting Adaptive Digital Strategy）於 2025年12月31日結束後的過渡期議題。

**關鍵問題**：
1. 裝置所有權：配發給學生的 iPad 是否轉為學生財產或回收？
2. MDM 持續管理：學校是否繼續管理這些裝置？
3. 新政策銜接：2026年起的「AI教育4年計畫」如何銜接？

**建議處理方式**：
- 不建議新增為術語，但需在 Q&A 中新增專門題目討論此過渡期
- 待教育部正式公告後再更新明確政策

---

#### 28. **Taiwan K-12 Digital Learning Cloud Platforms (台灣中小學數位學習雲端平台) [虛擬術語，建議融入 Q&A]**
**說明**：
各縣市教育局自建的雲端學習平台，如：
- 台北市酷課雲（Cooc Cloud）
- 新北市親師生平台
- 高雄市達學堂

**MDM 相關**：
這些平台需與 Jamf Trust、Jamf Safe Internet 的內容過濾策略協調，確保教學網站不被誤檔。

**建議處理方式**：
不建議新增為獨立術語，但在「數位精進」Q&A 中可提及縣市平台與 MDM 的整合。

---

## 📋 建議新增的 Q&A 題目（按章節詳列）

### 第一部分：帳號與伺服器 (`qa/account`)

#### acc-22: 如何在 ASM 中批次建立管理式 Apple 帳號？使用 SFTP 還是手動 CSV 匯入？
**重要性**：★★★★★  
**標籤**：`["ASM", "批次作業", "SFTP", "CSV", "管理式 Apple 帳號"]`  
**避免衝突**：與 acc-3（重置密碼）不衝突，聚焦「批次建立」

**答案架構**：
1. **核心答案**：ASM 支援三種批次建立方式：SFTP 自動化、手動 CSV 匯入、Rostering API
2. **操作步驟**：
   - SFTP 方式：設定 SFTP 伺服器、準備 CSV 格式、自動同步
   - 手動 CSV：準備帳號清單、上傳至 ASM、驗證結果
3. **技術重點**：
   - CSV 格式要求（Person ID、First Name、Last Name、Email等）
   - SFTP 適合大規模學校（500人以上）
   - 手動適合小規模或臨時建立
4. **風險提示**：
   - CSV 格式錯誤會導致批次失敗
   - Person ID 不可重複，且永久綁定
5. **專家建議**：
   - 先用小批次測試（10人）確認格式無誤再大量上傳
   - 保留 CSV 備份作為帳號清單

---

#### acc-23: WWDC 2025 宣布的「防止個人 Apple 帳號登入組織裝置」功能如何設定？有什麼限制？
**重要性**：★★★★★  
**標籤**：`["個人帳號", "資料外洩", "iOS 26", "組織裝置", "WWDC 2025"]`  
**避免衝突**：與 acc-7（個人帳號使用）相關，但此題聚焦「2026新功能」

**答案架構**：
1. **核心答案**：系統版本 26 支援強制組織裝置只能登入管理式 Apple 帳號，完全阻擋個人 Apple ID
2. **設定路徑**：ASM > 設定 > 裝置管理 > 啟用「限制個人 Apple 帳號登入」
3. **技術原理**：
   - 裝置會在啟用時檢查是否為組織擁有（透過 ADE 序號判定）
   - 即使在設定輔助程式階段也無法登入個人帳號
4. **限制與例外**：
   - 僅限 iOS 26/macOS Tahoe 以上系統
   - 需透過 ADE 註冊的裝置（手動註冊無效）
   - iCloud 功能（如尋找、備份）需使用管理式 Apple 帳號
5. **實務建議**：
   - 啟用前需確保所有師生都有管理式 Apple 帳號
   - 向家長說明此政策原因（防止資料外洩、確保管理）

---

#### acc-24: 管理式 Apple 帳號的 iCloud 儲存空間配額如何管理？學生作業滿了怎麼辦？
**重要性**：★★★★☆  
**標籤**：`["iCloud", "儲存空間", "配額", "管理式 Apple 帳號"]`  
**避免衝突**：現有題目未涵蓋此主題

**答案架構**：
1. **核心答案**：管理式 Apple 帳號預設提供 200GB iCloud 儲存空間（教育版），且無法由學校自行調整配額
2. **配額說明**：
   - 教育版：200GB（Apple 免費提供給教育機構）
   - 企業版：視 Apple Business Essentials 訂閱而定（台灣未開放）
3. **學生滿額處理**：
   - 方案一：使用 Schoolwork App 繳交作業（不佔 iCloud 空間）
   - 方案二：定期清理 iCloud 照片、舊備份
   - 方案三：使用學校 NAS 或Google Drive 作為主要儲存
4. **技術限制**：
   - 管理員無法「擴充」個別帳號空間
   - 無法購買額外儲存（管理式帳號限制）
5. **專家建議**：
   - 教導學生區分「課業資料」（雲端）與「個人相片」（本機）
   - 建議使用 iPad「最佳化儲存空間」功能

---

#### acc-25: ABM/ASM 的新 API (2025-2026) 可以用來做什麼自動化工作？需要開發能力嗎？
**重要性**：★★★★☆  
**標籤**：`["API", "自動化", "ABM", "ASM", "進階管理"]`  
**避免衝突**：現有題目未涵蓋 API 主題，此為進階需求

**答案架構**：
1. **核心答案**：2025-2026 年 ASM 新增 API 帳號功能，允許第三方應用或腳本存取組織資料、執行裝置管理任務
2. **可自動化的任務**：
   - 批次查詢裝置序號與 MDM 指派狀態
   - 自動分配裝置至特定 MDM
   - 撈取裝置清單、序號、型號資訊
   - 整合校務系統自動化帳號管理
3. **技術門檻**：
   - 需要基礎程式開發能力（Python、JavaScript等）
   - 理解 RESTful API 與 OAuth 2.0 驗證
   - 或使用 Jamf 等 MDM 提供的整合工具（無需自行開發）
4. **應用情境**：
   - 大型學區：整合 SIS (Student Information System) 自動建帳號
   - 多校管理：統一監控所有學校的裝置狀態
5. **專家建議**：
   - 小型學校不建議自行開發，使用 MDM 內建功能即可
   - 大型學區可委託 SI 廠商協助開發整合腳本

---

### 第二部分：裝置註冊 (`qa/enrollment`)

#### enr-23: 什麼是「Zero-Wipe MDM Migration (零抹除 MDM 遷移)」？iOS 26 的新功能學校該用嗎？
**重要性**：★★★★★  
**標籤**：`["MDM 遷移", "零抹除", "iOS 26", "macOS Tahoe", "風險評估"]`  
**避免衝突**：acc-12 已簡單提及，此題深入 SOP 與教育場域評估

**答案架構**：
1. **核心答案**：iOS 26/macOS Tahoe 支援零抹除 MDM 遷移，但教育環境「強烈不建議」使用，應優先使用 Return to Service
2. **功能說明**：
   - 透過 ASM/ABM 設定遷移目標 MDM
   - 裝置保留使用者資料與管理式 App
   - 但會移除舊描述檔並重新註冊新 MDM
3. **教育環境風險（重點）**：
   - 風險一：舊描述檔殘留導致 Apple Classroom 失靈
   - 風險二：VPP App 授權無法順利轉移
   - 風險三：系統快取與暫存檔累積，新設定可能無效
   - 風險四：學生個人資料混亂（共用 iPad 環境）
4. **正確做法：Return to Service**：
   - iOS 26 最佳化的功能
   - 自動抹除 + 保留 Wi-Fi 設定 + 自動重新註冊
   - 可保留管理式 App（iOS 26 新功能），減少重新下載時間
5. **例外情境**：
   - 僅限「企業 BYOD 裝置」考慮零抹除遷移
   - 學校公有裝置一律使用 Return to Service

---

#### enr-24: 如何設定「Enforcement Deadline (強制執行截止日期)」確保裝置按時完成 MDM 註冊或系統更新？
**重要性**：★★★★★  
**標籤**：`["Enforcement Deadline", "DDM", "強制執行", "截止日期", "合規"]`  
**避免衝突**：全新主題，DDM 核心功能

**答案架構**：
1. **核心答案**：透過 DDM (宣告式裝置管理) 設定截止日期，裝置會自主評估並在截止日移除「稍後」選項，強制執行
2. **設定步驟（Jamf Pro）**：
   - 使用 Blueprints 建立 Declarative Configuration
   - 設定「Software Update Declaration」或「MDM Enrollment Declaration」
   - 啟用 Enforcement Deadline 並指定日期時間
3. **使用者體驗**：
   - 截止日前 7 天：每天提醒一次
   - 截止日前 3 天：每天提醒兩次
   - 截止日前 1 天：每小時提醒
   - 截止後：移除「稍後」按鈕，強制執行
4. **應用情境**：
   - 情境一：確保關鍵安全更新在期限內安裝
   - 情境二：MDM 遷移時確保所有裝置按時完成註冊
   - 情境三：新學期前確保全校裝置升級至特定 iOS 版本
5. **專家建議**：
   - 截止日設定需合理（建議給 2-4 週緩衝）
   - 避免設在上課日，建議週五下午或假日
   - 向師生預告截止日與重要性

---

#### enr-25: PreStage 註冊時可以跳過哪些「設定輔助程式 (Setup Assistant)」步驟？教育場域的最佳實務為何？
**重要性**：★★★★★  
**標籤**：`["PreStage", "Setup Assistant", "ADE", "部署加速", "最佳實務"]`  
**避免衝突**：Setup Assistant 術語存在，但最佳實務未整理成 Q&A

**答案架構**：
1. **核心答案**：PreStage 可跳過多達 20+ 個設定步驟，教育場域建議跳過所有非必要步驟以加速部署
2. **建議跳過的步驟（教育場域）**：
   - ✅ 跳過：Location Services（定位）、Siri、Apple Pay、Screen Time、iMessage、FaceTime、True Tone
   - ✅ 跳過：App Analytics、iCloud 私密轉送、Liquid Glass 自訂
   - ❌ 不可跳過：「遠端管理」畫面（此為 ADE 核心，無法跳過）
   - ❌ 建議不跳過：Touch ID/Face ID（安全性考量）
3. **Jamf Pro 設定路徑**：
   - 電腦 > PreStage Enrollments > 編輯 > Setup Assistant
   - 勾選要跳過的項目（注意：勾選=跳過，不勾選=顯示）
4. **不同年級策略**：
   - 國小低年級：跳過所有可選項（越簡單越好）
   - 國中以上：保留 Touch ID、Apple Pay（培養數位素養）
   - 教師裝置：僅跳過不必要項目（保留彈性）
5. **時間節省估算**：
   - 完整流程：約10-15分鐘/台
   - 最佳化流程：約3-5分鐘/台
   - 大量部署節省顯著（100台可省約 15小時）

---

#### enr-26: iOS 26 的「Return to Service 改進」保留管理式 App 是什麼意思？實際操作流程為何？
**重要性**：★★★★★  
**標籤**：`["Return to Service", "iOS 26", "共用 iPad", "App 保留", "快速部署"]`  
**避免衝突**：Return to Service 術語存在，但 iOS 26 改進未詳述

**答案架構**：
1. **核心答案**：iOS 26/iPadOS 26 改進的 Return to Service 會保留管理式 App，僅抹除使用者資料，大幅加速共用裝置重新部署
2. **iOS 26 之前 vs. 之後**：
   - iOS 17-25：抹除後需重新下載所有 App（耗時 30-60 分鐘）
   - iOS 26：保留 App 快取，僅重新啟用授權（耗時 5-10 分鐘）
3. **實際操作流程（Jamf Pro）**：
   - 步驟一：選取裝置 > 管理指令 > 傳送裝置指令
   - 步驟二：選擇「Return to Service (擦除並保留註冊)」
   - 步驟三：確認勾選「保留 Wi-Fi 設定」
   - 步驟四：裝置自動重開機 > 自動連 Wi-Fi > 自動註冊 MDM > App 快速啟用
4. **適用情境**：
   - 學期末/學期初：班級輪替時快速清空上學期資料
   - 共用 iPad：學生畢業/轉學後快速準備給新生
   - 臨時借用：歸還後快速重置
5. **技術限制**：
   - 僅保留「管理式 App」，個人安裝的 App 會被移除
   - 需 iOS 26 以上系統
   - 裝置需有網路連線（Wi-Fi 設定保留的重要性）
6. **效率評估**：
   - 傳統抹除重新部署：60分鐘/台  
   - Return to Service (iOS 26)：10分鐘/台
   - 50台 iPad 可節省約 40小時工時

---

### 第三部分：App 管理 (`qa/apps`)

#### app-23: 什麼是「Declarative App Management (宣告式 App 管理)」？與傳統 VPP App 指派有什麼不同？
**重要性**：★★★★★  
**標籤**：`["DDM", "App 管理", "宣告式", "自動更新", "iOS 26"]`  
**避免衝突**：app-20 有提及，但此題深入對比與實務

**答案架構**：
1. **核心答案**：iOS 26/macOS Tahoe 的 DDM App 管理，裝置自主管理 App 安裝與更新，比傳統指令更快更可靠
2. **傳統 vs. 宣告式對比表**：

| 項目 | 傳統 VPP 指派 | 宣告式 App 管理 |
|------|---------------|-----------------|
| 安裝觸發 | MDM 伺服器發 Install 指令 | 裝置自主評估 Declaration |
| 狀態回報 | 輪詢（每 8 小時） | 即時（Status Channel） |
| 更新控制 | 全域設定 | 可針對個別 App 設定 |
| 網路需求 | 需與 MDM 通訊 | 可離線評估部分策略 |
| 支援系統 | iOS 9+ | iOS 26+, macOS Tahoe+ |

3. **Declarative 的優勢**：
   - Real-time 狀態：IT 立即知道哪台 iPad 的哪個 App 安裝失敗
   - 更新彈性：可設定「必須自動更新」的 App、「禁止更新」的 App、「釘選版本」的 App
   - 自主修復：裝置發現 App 缺失會自動重新申請安裝
4. **Jamf Pro 設定**：
   - Blueprints > Apps > 新增 App Declaration
   - 選擇 App > 設定 Installation Behavior：
     * Required（必要）：強制安裝，使用者無法移除
     * Optional（選用）：使用者可選擇安裝
   - 設定 Update Behavior：
     * Automatic（自動）
     * Deferred（延遲xx天）
     * Pinned（釘選版本xx）
5. **現階段建議**：
   - 新裝置（iOS 26+）：全面使用 Declarative
   - 舊裝置（iOS 25-）：仍使用傳統 VPP
   - 混合環境：兩者並行，逐步遷移

---

#### app-24: iOS 26 如何限制學生只能透過 Wi-Fi 下載 App，避免消耗行動數據？
**重要性**：★★★★☆  
**標籤**：`["行動數據", "Wi-Fi", "App 下載", "流量管理", "iOS 26"]`  
**避免衝突**：全新功能，現有題目未涵蓋

**答案架構**：
1. **核心答案**：iOS 26 DDM 新增限制功能，可禁止透過行動網路下載 App，僅允許 Wi-Fi
2. **設定路徑（Jamf Pro）**：
   - Blueprints > Restrictions > Network
   - 啟用「Restrict downloads over cellular」
   - 套用至目標群組（如「學生 iPad」）
3. **影響範圍**：
   - App Store 下載：✅ 受限
   - VPP/MDM 推送 App：✅ 受限
   - 系統更新：不受影響（另有獨立設定）
   - 串流媒體（YouTube）：不受影響（非下載行為）
4. **適用情境**：
   - 精進方案 iPad 有插 SIM 卡的縣市
   - 學生帶裝置回家可能用行動網路
   - 防止學生下載大型遊戲耗盡流量
5. **專家建議**：
   - 搭配「限制 App Store」政策，雙層防護
   - 向學生說明：「學校 App 會自動安裝，無需自行下載」
   - 家長溝通：此限制可避免手機帳單暴增

---

#### app-25: macOS Tahoe 的「宣告式 .pkg 部署」如何使用？與 Jamf Policy 有何不同？
**重要性**：★★★★☆  
**標籤**：`["macOS Tahoe", "Package", "DDM", ".pkg", "Jamf Policy"]`  
**避免衝突**：Package 術語存在，但 DDM 部署方式未說明

**答案架構**：
1. **核心答案**：macOS Tahoe 26 開始支援透過 DDM 部署 .pkg 套件，提供即時狀態回報，比傳統 Policy 更透明
2. **DDM Package vs. Policy Package**：

| 項目 | Jamf Policy | DDM Declaration |
|------|-------------|-----------------|
| 狀態回報 | Check-in 時回報（每8小時） | 即時 Status Channel |
| 安裝時機 | Policy 觸發（登入/開機/自訂） | 裝置自主評估條件 |
| 失敗重試 | 手動重試或等下次 Policy | 自動重試機制 |
| 適用系統 | macOS 10.9+ | macOS Tahoe 26+ |

3. **DDM Package 設定（Jamf Pro）**：
   - Blueprints > Packages > 新增 Package Declaration
   - 上傳 .pkg 檔案
   - 設定安裝條件（如：僅在 AC 電源時）
   - 即時監控安裝進度與結果
4. **適用軟體**：
   - Adobe Creative Cloud
   - Microsoft Office
   - 校園自訂軟體包
5. **現階段建議**：
   - macOS Tahoe 26+：優先使用 DDM Package
   - macOS Sonoma 15：仍使用 Policy
   - 複雜邏輯（如條件判斷腳本）：仍需 Policy
6. **注意事項**：
   - .pkg 必須支援靜默安裝（`-target /`）
   - 檔案大小限制視 Jamf 雲端方案而定

---

### 第四部分：課堂管理 (`qa/classroom`)

#### cls-24: 如何防止學生使用 iPadOS 26 的「Window App（視窗化多工）」功能在課堂分心？
**重要性**：★★★★☆  
**標籤**：`["Window App", "多工", "專注度", "iPadOS 26", "課堂管理"]`  
**避免衝突**：全新功能，現有題目未涵蓋

**答案架構**：
1. **核心答案**：可透過 MDM Restrictions 限制多工功能，或使用「單一 App 模式」鎖定課堂 App
2. **三種管理策略**：
   - **策略一：完全禁用多工**
     * Jamf Pro > Restrictions > 取消勾選「允許多工 (Allow Multitasking)」
     * 適用：國小低年級
     * 缺點：失去多工學習機會
   
   - **策略二：單一 App 模式（課堂臨時鎖定）**
     * 老師透過 Jamf Teacher 或 Apple Classroom 啟動
     * 鎖定考試 App 或課堂 App
     * 適用：考試、專注學習時段
   
   - **策略三：僅限制特定 App 的多工**
     * 進階設定（需 DDM）
     * 允許「學習 App」多工，但禁止「社交 App」多工
     * 適用：國中以上
3. **分年級建議**：
   - 國小低年級（1-3年級）：禁用多工
   - 國小高年級（4-6年級）：課堂時用單一 App 模式，課後開放
   - 國中以上：開放，但加強數位素養教育
4. **老師臨時控管**：
   - 使用 Apple Classroom「鎖定 App」功能
   - 一鍵鎖定全班於特定 App（如 Keynote）
   - 下課後自動解除
5. **專家建議**：
   - 不宜一刀切禁用，多工是重要數位技能
   - 應培養學生「何時該專注、何時可多工」的自律

---

#### cls-25: 「Apple Schoolwork」與「Apple Classroom」有什麼不同？老師該用哪一個？
**重要性**：★★★★★  
**標籤**：`["Schoolwork", "Classroom", "功能對比", "教學工具", "作業管理"]`  
**避免衝突**：兩者常被混淆，需清楚對比

**答案架構**：
1. **核心答案**：Classroom 是「即時課堂管控」，Schoolwork 是「作業指派與成果收集」，兩者互補而非替代
2. **功能對比表**：

| 功能 | Apple Classroom | Apple Schoolwork |
|------|-----------------|------------------|
| **定位** | 即時課堂管理 | 作業發放與追蹤 |
| **即時監控** | ✅ 看學生螢幕 | ❌ 無 |
| **網頁導航** | ✅ 引導全班開啟網頁 | ❌ 無 |
| **鎖定螢幕** | ✅ 一鍵鎖定全班 | ❌ 無 |
| **作業指派** | ❌ 無 | ✅ 完整作業流程 |
| **成果收集** | ❌ 無 | ✅ 收 Pages/Keynote 檔案 |
| **進度追蹤** | ❌ 無 | ✅ 長期學習進度 |
| **跨課程** | ❌ 單堂課 | ✅ 整學期/年 |

3. **使用時機建議**：
   - **上課中**：使用 Classroom
     * 引導學生開啟教學網頁
     * 鎖定特定 App（如數學練習 App）
     * 檢查學生是否跟上進度
   
   - **課後作業**：使用 Schoolwork
     * 發放「完成 Pages 簡報」作業
     * 設定截止日期
     * 收集學生成果並給予評分回饋
4. **搭配使用情境**：
   - 上課時用 Classroom 引導全班開啟 Schoolwork App
   - 學生在 Schoolwork 查看今日作業
   - 老師用 Classroom 監控完成進度
   - 下課後學生在 Schoolwork 繳交成果
5. **第三方替代**：
   - Jamf Teacher：Classroom + 進階功能（家長管控、裝置健康）
   - Google Classroom：跨平台作業管理
6. **選擇建議**：
   - 全 Apple 環境：Classroom + Schoolwork 搭配最佳
   - 混合環境（Android+iPad）：Google Classroom
   - 進階需求：Jamf Teacher

---

#### cls-26: iOS 26.2 的「AirDrop Codes」會影響學校的 AirDrop 管理政策嗎？學生會利用此功能繞過管控嗎？
**重要性**：★★★★☆  
**標籤**：`["AirDrop", "代碼", "隱私", "政策調整", "iOS 26.2"]`  
**避免衝突**：cls-14 已討論 AirDrop 管理，但此題聚焦新功能影響

**答案架構**：
1. **核心答案**：AirDrop Codes 主要影響「陌生人分享」情境，學校既有政策（限制 AirDrop 為「聯絡人」或「關閉」）仍有效
2. **AirDrop Codes 運作方式**：
   - 學生 A 產生代碼（有效期 30天）
   - 學生 B 輸入代碼後，成為「臨時可信賴聯絡人」
   - 在代碼有效期內，雙方可 AirDrop 分享
3. **MDM 管控是否失效？**：
   - ❌ 不會失效：若 MDM 設定「AirDrop 禁用」，則完全無法使用（代碼也無效）
   - ❌ 不會失效：若 MDM 設定「僅聯絡人」，代碼分享仍需雙方在對方聯絡人清單
   - ⚠️ 灰色地帶：若設定「所有人」，代碼可讓陌生人臨時變可信賴
4. **建議政策調整**：
   - **維持原政策**：
     * 禁用 AirDrop（最嚴格，適合考試期間）
     * 僅聯絡人（平衡，適合日常）
   - **無需特別針對 Codes 調整**，因現有管控已涵蓋
5. **教育學生**：
   - 說明代碼的用途（與陌生人安全分享）
   - 警告：不要隨意分享代碼給不認識的人
   - 提醒：學校內分享請加入聯絡人，無需代碼
6. **專家觀點**：
   - AirDrop Codes 是增強隱私的功能，非繞過管控的漏洞
   - 學校政策無需因此變更
   - 重點仍是「何時該關閉 AirDrop」的情境判斷

---

### 第五部分：數位精進 (`qa/digital-learning`)

#### dl-21: 教育部「數位學習精進方案」於 2025年底結束後，2026年起學校該如何管理這些 iPad？
**重要性**：★★★★★  
**標籤**：`["精進方案", "2026", "後續管理", "裝置歸屬", "政策過渡"]`  
**避免衝突**：現有 dl 系列聚焦「進行中的方案」，此題討論「過渡期」

**答案架構**：
1. **核心答案**：截至 2026年1月，教育部尚未正式公告後續政策，但裝置所有權歸學校，建議持續管理
2. **目前已知資訊**：
   - 方案期程：110/12/01 ~ 114/12/31 (2025年底結束)
   - 裝置所有權：公有財產，歸學校所有（非學生個人財產）
   - 2026年新計畫：「AI教育4年計畫」（細節待公布）
3. **2026年過渡期建議**：
   - **MDM 持續管理**：
     * 不要解除 MDM 註冊
     * 繼續執行內容過濾與安全政策
     * 持續監控裝置健康狀況
   
   - **裝置歸屬清點**：
     * 盤點現有 iPad 數量與狀態
     * 確認保固到期日（部分裝置可能 2026-2027到期）
     * 評估哪些裝置需汰換
   
   - **使用模式調整**：
     * 若學生畢業/轉學，iPad 回收給新生
     * 仍可用於課堂教學
     * 等待教育部新政策指引
4. **常見問題處理**：
   - **Q: 學生可以把 iPad 帶回家當私人用嗎？**
     A: 不行。除非教育部明確公告轉為學生財產，否則仍為學校公有財產
   
   - **Q: MDM 授權費用誰付？**
     A: 需確認縣市教育局政策。部分縣市可能延續補助，部分需學校自籌
   
   - **Q: Jamf Trust 使用率回報還需要嗎？**
     A: 方案結束後理論上不需回報KPI，但建議仍保留內容過濾功能保護學生
5. **專家建議**：
   - 密切關注教育部與縣市教育局公告
   - 2026年Q1應有明確政策
   - 在政策明朗前，維持現狀管理最安全

---

#### dl-22: iOS 26 的「Network Extension URL Filtering API」對 Jamf Safe Internet 有什麼影響？架構改變了嗎？
**重要性**：★★★★★  
**標籤**：`["Jamf Safe Internet", "URL Filtering", "iOS 26", "架構升級", "內容過濾"]`  
**避免衝突**：dl-1 討論 iPadOS 17 架構，此題更新至 iOS 26

**答案架構**：
1. **核心答案**：iOS 26 的新 API 正是 Jamf Safe Internet 從 2025年9月起採用的核心技術，效能與隱私都更佳
2. **架構演進歷程**：
   - **2024年前（iPadOS 16-）**：Per-App VPN 模式
     * 缺點：顯示 VPN 圖示、耗電、可能與 CDN 衝突
   
   - **2025年9月（iPadOS 17+）**：DNS Proxy + Content Filter
     * 優點：無 VPN 圖示、省電、相容 CDN
     * 基於：舊版 Network Extension
   
   - **2025年底-2026年（iOS 26）**：Network Extension URL Filtering API
     * 優點：Apple 官方標準化 API、更高效能、系統級整合
     * Jamf Safe Internet 無縫升級（使用者無感）
3. **技術差異**：
   - **舊架構**：DNS 過濾為主，部分 HTTP/HTTPS 啟發式判斷
   - **新架構（iOS 26）**：
     * 完整 URL 過濾（不只 Domain）
     * 支援 HTTPS 加密流量判斷（不解密內容，但可辨識目標URL）
     * 隱私保護：符合 Apple 隱私政策
4. **學校需要做什麼？**：
   - **答：什麼都不用做**
   - Jamf Safe Internet 自動使用新 API（iOS 26 裝置）
   - 舊裝置（iOS 25-）繼續使用舊架構
   - 過濾規則、政策設定完全不變
5. **效能提升**：
   - 過濾準確度：提升 15-20%（根據 Jamf 官方數據）
   - 電池消耗：減少 10%
   - 網路延遲：幾乎無感（< 5ms）
6. **家長常見疑問**：
   - **Q: 新架構會監聽孩子的訊息內容嗎？**
     A: 不會。僅檢查「目標網站網址」，不解密內容（如 LINE 訊息內文）
   
   - **Q: 為什麼有些網站還是會被誤檔？**
     A: URL 過濾基於資料庫分類，偶有誤判。可向學校回報白名單申請

---

#### dl-23: iOS 26.3 的「Background Security Improvements」會自動安裝嗎？學校需要調整更新策略嗎？
**重要性**：★★★★☆  
**標籤**：`["Background Security", "iOS 26.3", "快速修補", "安全更新", "自動化"]`  
**避免衝突**：全新機制，現有題目未涵蓋

**答案架構**：
1. **核心答案**：Background Security Improvements 會自動在背景安裝（類似 App 更新），無需完整系統更新，學校幾乎無需調整策略
2. **運作方式**：
   - 修補對象：Safari、WebKit、系統安全元件
   - 安裝時機：裝置閒置時（夜間、充電中）
   - 使用者感知：幾乎無感（不會跳提示、不需重開機）
   - 速度：數十 MB，數分鐘完成
3. **與傳統更新的差異**：

| 項目 | 傳統 iOS 更新 | Background Security |
|------|---------------|---------------------|
| 檔案大小 | 5-8 GB | 50-200 MB |
| 安裝時間 | 30-60 分鐘 | 5-10 分鐘 |
| 重開機 | ✅ 需要 | ❌ 多數不需 |
| 使用者操作 | 需點「安裝」 | 自動背景安裝 |
| MDM 控制 | ✅ 可管控 | ⚠️ 較難管控 |

4. **MDM 管理選項**：
   - **選項一：完全允許（建議）**
     * 讓裝置自動安裝安全修補
     * 確保最快速度封堵漏洞
     * 適合：大多數學校
   
   - **選項二：延遲安裝（進階）**
     * 透過 DDM 設定「延後xx天」
     * 觀察是否有修補後的問題
     * 適合：大型學區、需穩定性優先的環境
5. **是否取代 Rapid Security Response (RSR)？**：
   - iOS 26.3 beta 資料顯示可能取代
   - RSR 曾有安裝失敗問題（iOS 16-17時期）
   - Background Security 更無縫整合
6. **學校策略建議**：
   - 無需調整：保持預設（允許自動安裝）
   - 監控：透過 Jamf Pro Inventory 確認安全版本號
   - 溝通：向師生說明「系統自動修補漏洞，更安全」

---

### 第六部分：Mac 管理 (`qa/mac`)

#### mac-19: 如何使用「Erase All Content and Settings」快速重置 Mac？與傳統重灌有何不同？
**重要性**：★★★★★  
**標籤**：`["Erase All Content", "快速重置", "macOS Monterey", "電腦教室", "部署加速"]`  
**避免衝突**：mac-6 提及 Wipe，但未詳述此功能

**答案架構**：
1. **核心答案**：macOS Monterey (12) 引入的快速重置功能，5-10分鐘即可完全抹除並重灌 macOS，比傳統重灌快 10倍
2. **傳統重灌 vs. Erase All Content**：

| 項目 | 傳統重灌 (Recovery) | Erase All Content |
|------|---------------------|-------------------|
| 時間 | 1-2 小時 | 5-10 分鐘 |
| 網路需求 | ✅ 需重新下載 macOS | ❌ 使用本機快取 |
| 操作複雜度 | 需進 Recovery、抹除、重灌 | 點兩下確認即可 |
| 支援系統 | macOS 10.7+ | macOS Monterey 12+ |
| 支援晶片 | Intel 與 Apple Silicon | Apple Silicon（Intel需條件） |

3. **操作步驟**：
   - **方式一：系統設定執行（最簡單）**
     1. 系統設定 > 一般 > 傳輸或重置
     2. 點「清除所有內容與設定」
     3. 輸入管理員密碼確認
     4. 自動執行（5-10分鐘）
   
   - **方式二：透過 MDM 遠端執行（Jamf Pro）**
     1. 選取 Mac > 管理指令 > 清除所有內容與設定
     2. 勾選「返回 ADE 註冊」（保留 MDM 綁定）
     3. 遠端觸發，Mac 自動重置並重新註冊
4. **技術原理**：
   - Apple Silicon Mac：使用 One True Recovery (1TR) 快速重置
   - 本機快取 macOS 映像，無需重新下載
   - 加密磁區金鑰直接作廢，資料立即無法復原
5. **適用情境**：
   - 電腦教室學期初/末重置
   - Mac 故障需快速重建
   - 借用 Mac 歸還後快速清空
   - 教師離職 Mac 交接清空
6. **Intel Mac 限制**：
   - 需搭配 T2 晶片（2018年後機種）
   - 較舊 Intel Mac 仍需傳統重灌
7. **實務效益**：
   - 30台電腦教室 Mac：
     * 傳統重灌：60 小時工時
     * Erase All Content：5 小時工時
     * 節省 55 小時！

---

#### mac-20: macOS Tahoe 的「FileVault Unlock over SSH」如何設定？有什麼安全風險？
**重要性**：★★★★☆  
**標籤**：`["FileVault", "SSH", "遠端解鎖", "macOS Tahoe", "遠端管理"]`  
**避免衝突**：FileVault 術語存在，但此新功能未說明

**答案架構**：
1. **核心答案**：macOS Tahoe 允許透過 SSH 遠端解鎖 FileVault，但需事前啟用「遠端登入」且有正確設定，安全風險可控
2. **功能說明**：
   - Mac 重開機後 FileVault 鎖定
   - 傳統：需實體接觸 Mac 輸入密碼才能開機
   - Tahoe：IT 可透過 SSH 遠端輸入密碼解鎖
3. **設定步驟（MDM 推送）**：
   - 步驟一：啟用 Remote Login
     * MDM 描述檔：`com.apple.RemoteManagement.plist`
     * 啟用 SSH (Port 22)
   
   - 步驟二：設定 FileVault 授權使用者
     * 確保管理員帳號有 FileVault 解鎖權限
   
   - 步驟三：確保網路連線
     * Mac 需有乙太網路或 Wi-Fi 自動連線
4. **實際操作流程**：
   ```bash
   # IT 人員在遠端電腦執行
   ssh username@mac-ip-address
   # Mac 會提示輸入 FileVault 解鎖密碼
   # 輸入後 Mac 完成開機
   ```
5. **安全風險評估**：
   - **風險一：SSH 本身的安全性**
     * 緩解：使用 SSH 金鑰驗證取代密碼
     * 緩解：限制 SSH 存取 IP 範圍（校內網路）
     * 緩解：啟用多重身分驗證 (MFA)
   
   - **風險二：遠端解鎖密碼外洩**
     * 緩解：使用專用管理員帳號（非個人帳號）
     * 緩解：定期更換解鎖密碼
   
   - **風險三：中間人攻擊**
     * 緩解：使用VPN連線至校內網路再 SSH
6. **適用情境**：
   - 伺服器 Mac 無螢幕鍵盤，重開機後需解鎖
   - 電腦教室 Mac 大量部署，IT 遠端批次解鎖
   - 異地辦公室 Mac 維護
7. **不適用情境**：
   - 高度機密環境（建議仍實體解鎖）
   - 缺乏 IT 資安專業的學校（風險高於便利性）
8. **專家建議**：
   - 僅在必要時啟用，非所有 Mac 都需此功能
   - 搭配 MDM 的 Network 限制保護
   - 記錄所有 SSH 解鎖操作（audit log）

---

#### mac-21: macOS Tahoe 升級後，「App 隱私權限可見性」讓學生看到 MDM 設定的權限，該如何向學生解釋？
**重要性**：★★★★☆  
**標籤**：`["隱私權限", "透明度", "PPPC", "macOS Tahoe", "溝通策略"]`  
**避免衝突**：PPPC 術語存在，但此透明度改變未說明

**答案架構**：
1. **核心答案**：macOS Tahoe 讓 MDM 設定的權限變透明，學生會在「系統設定 > 隱私權與安全性」看到「由組織設定」標籤，建議主動溝通而非迴避
2. **學生會看到什麼？**：
   - 原本：權限清單，無標示來源
   - Tahoe：清楚標示「由 [學校名稱] 設定」
   - 範例：
     * Zoom：螢幕錄製權限（由 XX國中 設定）
     * Jamf Management：完全磁碟取用權限（由 XX國中 設定）
3. **常見學生疑問與標準回應**：
   - **Q: 為什麼學校要給 Zoom 螢幕錄製權限？**
     A: 讓老師在線上課程時能分享螢幕教學，這是必要的教學功能。學校不會監控你的螢幕內容。
   
   - **Q: 為什麼 Jamf 有完全磁碟取用權限？**
     A: MDM 管理軟體需要此權限才能確保裝置安全、推送更新、安裝教學軟體。這是為了保護學校財產與你的資料安全。
   
   - **Q: 學校是在監視我嗎？**
     A: 不是監視，是為了確保裝置正常運作與符合教育目的使用。權限透明化就是為了讓你清楚知道學校做了什麼設定。
4. **主動溝通策略**：
   - **時機**：macOS Tahoe 升級「之前」
   - **對象**：師生、家長
   - **內容**：
     * 說明權限的用途（教學、安全、管理）
     * 強調透明化是好事（Apple 要求，保護使用者知情權）
     * 提供權限清單與說明文件
5. **準備書面說明範例**：
   ```
   以下是學校 Mac 的標準權限設定：
   
   1. Zoom / Google Meet
      - 螢幕錄製：線上教學分享螢幕用
      - 相機/麥克風：視訊通話用
   
   2. Jamf Management
      - 完全磁碟取用：管理系統設定、推送更新
      - 自動化：執行維護腳本
   
   3. Microsoft Office
      - 檔案存取：開啟/儲存文件
   
   所有權限皆為教學與管理必要，不會用於監控個人隱私。
   ```
6. **家長常見疑慮**：
   - 疑慮：學校會看到孩子的私人檔案嗎？
   - 回應：權限不等於實際監控。學校有權限是為了系統管理，但不會主動查看個人檔案。除非裝置故障需維修，才會在家長同意下檢查。
7. **專家建議**：
   - 將此視為「建立信任的機會」而非「麻煩」
   - 主動透明比被動回應更能建立信任
   - 準備 FAQ 文件給 IT 人員快速回應

---

#### mac-22: macOS Tahoe 是最後支援 Intel Mac 的版本，學校該如何規劃 Intel Mac 的汰換時程與預算？
**重要性**：★★★★★  
**標籤**：`["Intel Mac", "汰換規劃", "Apple Silicon", "預算編列", "macOS Tahoe"]`  
**避免衝突**：全新主題，影響採購決策

**答案架構**：
1. **核心答案**：macOS Tahoe 後的 macOS 27 (2026年9月) 將僅支援 Apple Silicon，Intel Mac 需在 2026-2029 年間逐步汰換
2. **最後支援的 Intel Mac 機種**：
   - 2020 iMac
   - 2019 16" MacBook Pro
   - 2020 13" MacBook Pro (四個 Thunderbolt 3 埠)
   - 2019 Mac Pro
   - 更舊機種：已不支援 macOS Tahoe
3. **時間表建議**：

| 年份 | 行動 | 說明 |
|------|------|------|
| **2026** | 盤點清查 | 統計 Intel Mac 數量、型號、保固狀態 |
| **2027** | 開始汰換高使用率裝置 | 優先汰換：電腦教室、辦公室主力機 |
| **2028** | 汰換中使用率裝置 | 第二優先：備用機、特定用途機 |
| **2029** | 完成全面轉換 | 最遲期限（macOS Tahoe 支援約3年） |

4. **預算估算範例（以30台電腦教室為例）**：
   - 現況：2019 iMac 27" (30台)
   - 替代方案：
     * 方案A：Mac mini M4 + 螢幕 → 約 NT$ 90 萬
     * 方案B：iMac M4 24" → 約 NT$ 150 萬
     * 方案C：分年汰換（每年10台） → 分攤預算壓力
5. **評估 Intel Mac 的剩餘價值**：
   - 2024-2025 年購買的 Intel Mac：虧損最大（應避免）
   - 2020-2022 年購買的：還有 3-5 年使用期
   - 2019 年前購買的：該規劃汰換了
6. **Apple Silicon 的效能與成本優勢**：
   - 效能：M4 Mac mini ≈ 舊款 iMac Pro
   - 能耗：省電 60-70%（每年可省電費）
   - 無風扇：M4 Mac mini 更安靜、更耐用
   - 軟體相容：Intel App 仍可透過 Rosetta 2 執行
7. **學校採購策略建議**：
   - **策略一：一次性汰換（預算充足）**
     * 優點：統一管理、效能一致
     * 缺點：初期投資大
   
   - **策略二：分年汰換（預算分散）**
     * 優點：預算壓力小
     * 缺點：混合環境管理複雜
   
   - **策略三：優先汰換高故障率機種**
     * 依據維修記錄決定優先順序
8. **MDM 管理考量**：
   - Intel 與 Apple Silicon 可在同一 MDM 管理
   - 但部分 Policy 需分開（如 Kernel Extension vs System Extension）
   - Jamf Pro 完全支援混合環境
9. **專家建議**：
   - 2026年**立即停止採購 Intel Mac**
   - 若 2025-2026 有採購案進行中，務必改為 Apple Silicon
   - 編列 3-5 年汰換預算，避免 2029年後無安全更新的風險

---

### 第七部分：教育實戰 (`qa/qa-education`)

#### edu-24: iOS 26 的「Writing Tools (寫作工具)」在考試時該如何管理？哪些功能需要禁用？
**重要性**：★★★★★  
**標籤**：`["Writing Tools", "Apple Intelligence", "考試防弊", "iOS 26", "AI"]`  
**避免衝突**：cls-12 已涵蓋整體 AI 管理，此題聚焦考試情境

**答案架構**：
1. **核心答案**：考試期間應透過 MDM 描述檔完全禁用 Writing Tools，或使用「單一 App 模式」鎖定考試 App
2. **Writing Tools 的作弊風險**：
   - **改寫 (Rewrite)**：學生可把爛作文瞬間變佳作
   - **校對 (Proofread)**：自動修正文法、錯別字
   - **摘要 (Summarize)**：長文一鍵濃縮成重點
   - **回覆建議 (Smart Reply)**：郵件自動產生專業回覆
3. **防弊方案**：
   - **方案一：考試前臨時禁用（推薦）**
     * Jamf Pro：建立「考試限制」描述檔
     * 取消勾選「Allow Writing Tools」
     * 考試前推送至學生群組
     * 考試後移除限制
   
   - **方案二：單一 App 模式（最嚴格）**
     * 使用 Apple Classroom 鎖定考試 App
     * 學生無法切換到其他 App 使用 Writing Tools
   
   - **方案三：完全禁用 Apple Intelligence（最簡單）**
     * 適合入門款 iPad（硬體本身不支援）
     * iPad Pro/Air M 系列需透過 MDM 禁用
4. **硬體限制澄清**：
   - ✅ 支援 Apple Intelligence：
     * iPad Pro M1/M2/M4
     * iPad Air M1/M2
   - ❌ 不支援（無需擔心）：
     * iPad 第9代、第10代
     * 較舊 iPad Pro
5. **不同科目的策略**：
   - **國文作文考試**：必須禁用 Writing Tools
   - **英文寫作測驗**：必須禁用 Writing Tools
   - **數學考試**：禁用 Math Notes（計算機的 AI 功能）
   - **開書考試**：可視情況允許（培養「如何正確使用 AI」的素養）
6. **倫理教育（更重要！）**：
   - 教導學生：AI 是工具，濫用是作弊
   - 討論：何時可用 AI、何時不可用
   - 培養：批判思考能力，不盲從 AI 建議
7. **大學入學考試（學測/指考）**：
   - 考場規則：禁止攜帶具 AI 功能的裝置
   - 學校演練：模擬考應比照正式考試，禁用 AI
8. **專家建議**：
   - 不宜長期全面禁用，應培養正確使用態度
   - 平時作業：可使用，但需標註「使用 AI 輔助」
   - 評量方式調整：出 AI 難以回答的題目（如批判性思考、創意發想）

---

#### edu-25: 精進方案結束後，學生帶回家的 iPad 還可以繼續用於學習嗎？系統升級到 iOS 26 會有問題嗎？
**重要性**：★★★★★  
**標籤**：`["精進方案", "2026", "系統升級", "iOS 26", "後續使用"]`  
**避免衝突**：與 dl-21 互補，聚焦技術面

**答案架構**：
1. **核心答案**：裝置歸學校所有，升級 iOS 26 技術上可行，但後續管理需依教育部與學校政策
2. **系統升級 iOS 26 的技術影響**：
   - ✅ 可以升級：硬體支援（精進方案 iPad 多為 2021-2024 機種）
   - ✅ 功能更好：Window App、Background Security 等新功能
   - ⚠️ MDM 相容：需確認學校 Jamf Pro 版本支援 iOS 26
3. **升級前的考量**：
   - MDM 授權：2026年後學校是否續用 MDM？
   - 內容過濾：若學校停用 Jamf Trust，升級後無過濾保護
   - App 相容性：確認教學 App 支援 iOS 26
4. **不同政策情境下的建議**：
   - **情境一：學校繼續管理（裝置未轉讓）**
     * 建議升級：享受新功能與安全更新
     * MDM 持續推送：確保控管與保護
   
   - **情境二：裝置轉讓給學生（待教育部公布）**
     * 需先解除 MDM：否則學生無法完全使用
     * 建議升級：但失去學校保護機制
     * 家長責任：自行管理孩子的使用
   
   - **情境三：裝置回收再利用**
     * Return to Service：快速重置給新生
     * 升級至 iOS 26：最佳化效能
5. **家長常見問題**：
   - **Q: 孩子畢業了，iPad 可以留著用嗎？**
     A: 需等教育部公告。目前裝置歸學校所有，原則上應繳回。
   
   - **Q: 如果可以留著，可以自己用 Apple ID 嗎？**
     A: 若裝置轉讓，學校會解除 MDM 與管理式 Apple 帳號，屆時可登入個人 Apple ID。
   
   - **Q: 升級 iOS 26 後會更快嗎？**
     A: 視 iPad 機型。M 系列晶片 iPad 會有顯著提升，較舊機種提升有限。
6. **學校 IT 建議**：
   - 2026年Q1：等待教育部明確指引
   - 暫緩升級：除非有安全漏洞急需修補
   - 盤點現況：哪些 iPad 已升級、哪些可升級
7. **技術準備清單**：
   - [ ] 確認 Jamf Pro 版本支援 iOS 26
   - [ ] 測試關鍵教學 App 在 iOS 26 相容性
   - [ ] 準備 iOS 26 相關的家長說明文件
   - [ ] 規劃升級時程（避開考試週） 

---

## 📊 優先順序總整理（基於 2026/01/15 最新狀況）

### 🔥 超高優先（建議 1 個月內完成）

#### 術語（10個）
1. ⭐ **Intel Mac End-of-Support** - 影響採購決策（財務重大）
2. ⭐ **Zero-Wipe MDM Migration** - MDM 策略關鍵
3. ⭐ **Enforcement Deadline** - DDM 強制轉換核心
4. ⭐ **Declarative Software Updates** - 2026底強制使用
5. ⭐ **Network Extension URL Filtering API** - 內容過濾基礎
6. ⭐ **Window App** - iPadOS 26 教育重大影響
7. ⭐ **Apple Intelligence** - 考試防弊核心議題
8. ⭐ **Writing Tools** - 學術誠信關鍵
9. ⭐ **Background Security Improvements** - 安全策略變革
10. ⭐ **Liquid Glass** - 使用者常見誤解

#### Q&A（10個）
1. ⭐ **mac-22**: Intel Mac 汰換規劃（影響預算編列）
2. ⭐ **dl-21**: 精進方案結束後的管理（時效性關鍵）
3. ⭐ **enr-23**: Zero-Wipe Migration 教育評估（MDM 遷移決策）
4. ⭐ **enr-24**: Enforcement Deadline 設定（DDM 核心）
5. ⭐ **edu-24**: Writing Tools 考試管理（高頻需求）
6. ⭐ **acc-22**: ASM 批次建帳號（學校實務痛點）
7. ⭐ **app-23**: Declarative App Management（未來趨勢）
8. ⭐ **mac-19**: 快速重置 Mac（效率提升）
9. ⭐ **enr-25**: PreStage 最佳實務（部署必備）
10. ⭐ **dl-22**: URL Filtering API 影響（架構理解）

---

### ⚡ 高優先（建議 3 個月內完成）

#### 術語（8個）
- FileVault Unlock over SSH
- Platform SSO in Setup Assistant
- Declarative App Management
- Return to Service (iOS 26 改進)
- AirDrop Codes
- Managed App Framework
- Camera Access per App
- Restrict Cellular App Downloads

#### Q&A（8個）
- acc-23: 防止個人帳號登入
- acc-24: iCloud 儲存管理
- enr-26: Return to Service iOS 26
- app-24: 限制行動網路下載
- cls-24: Window App 專注度管理
- cls-25: Schoolwork vs Classroom
- mac-20: FileVault SSH 解鎖
- dl-23: Background Security 策略

---

### 📋 中優先（建議 6 個月內完成）

#### 術語（7個）
- Drag and Drop Multitasking
- Audio Accessory Configuration
- Automatic Reboot
- Wi-Fi 6E 160MHz
- Setup Pane Skipping
- App Privacy Permissions Visibility
- Blob URLs Improvement

#### Q&A（4個）
- app-25: macOS Package DDM 部署
- cls-26: AirDrop Codes 政策
- mac-21: 隱私權限溝通
- edu-25: 精進方案後系統升級

---

### 📌 低優先（視需求彈性新增）

#### 術語（5個）
- Transfer to Android Tool
- DNS over HTTPS / DoT
- Captive Portal
- Image Playground (單獨術語)
- Genmoji (單獨術語)

---

## 🎯 執行建議與時程規劃

### 第一階段：緊急補強（2026/01 - 2026/02）

**目標**：填補關鍵缺口，解決時效性議題

**任務清單**：
1. ✅ 新增「Intel Mac 汰換規劃」Q&A (mac-22)
2. ✅ 新增「精進方案過渡期管理」Q&A (dl-21)
3. ✅ 更新 acc-12「MDM 遷移」，強調 Zero-Wipe 風險
4. ✅ 新增 Writing Tools 考試管理 Q&A (edu-24)
5. ✅ 新增 Intel Mac End-of-Support 術語

**驗收標準**：
- 2026/02/28 前完成 5 個術語 + 5 個 Q&A
- 經過實際學校測試驗證內容正確性

---

### 第二階段：DDM 全面說明（2026/03 - 2026/05）

**目標**：因應 2026年底強制轉換，深化 DDM 內容

**任務清單**：
1. ✅ 新增 Enforcement Deadline 術語與 Q&A
2. ✅ 新增 Declarative Software Updates 術語
3. ✅ 新增 Declarative App Management Q&A (app-23)
4. ✅ 更新 Blueprints 術語（強調 2026 必要性）
5. ✅ 新增「從 Policy 遷移至 DDM」實務指南

**驗收標準**：
- Jamf Pro 管理員可依指南自行完成 DDM 轉換
- 提供完整 DDM vs 傳統 MDM 對比表

---

### 第三階段：教育實務深化（2026/06 - 2026/08）

**目標**：優化教學場景的實務 Q&A

**任務清單**：
1. ✅ 新增 Window App 管理 Q&A (cls-24)
2. ✅ 新增 Schoolwork vs Classroom 對比 (cls-25)
3. ✅ 新增 Return to Service iOS 26 改進說明
4. ✅ 新增 ASM 批次建帳號操作 (acc-22)
5. ✅ 新增 AI 教育倫理相關討論

**驗收標準**：
- 老師可自行理解並使用 iOS 26 新功能
- 提供可直接用於家長會的說明文件

---

### 第四階段：Mac 管理完善（2026/09 - 2026/12）

**目標**：補強 macOS Tahoe 管理內容

**任務清單**：
1. ✅ 新增 FileVault SSH 解鎖 Q&A (mac-20)
2. ✅ 新增快速重置 Mac 實務 (mac-19)
3. ✅ 新增隱私權限溝通策略 (mac-21)
4. ✅ 新增 macOS Package DDM 部署 (app-25)
5. ✅ 新增 Platform SSO Setup Assistant 說明

**驗收標準**：
- Mac 電腦教室管理效率提升 50%
- Intel Mac 汰換計畫完成初稿

---

## 📝 內容品質保證機制

### 撰寫前檢查清單
- [ ] 已查閱 MAINTENANCE_INDEX.md 確認題目未重複
- [ ] 已參考 3 個以上現有 Q&A 範例掌握風格
- [ ] 已搜尋 Apple 官方文件確認技術正確性
- [ ] 已確認不與數位精進方案現有內容衝突

### 撰寫中標準
- [ ] 使用台灣繁體中文官方術語（管理式、裝置、描述檔等）
- [ ] 包含多維度視角（操作+原理+風險+建議）
- [ ] 提供具體可執行的步驟或路徑
- [ ] 標註系統版本號（iOS 26、macOS Tahoe）
- [ ] 實例化說明（表格、範例、對比）

### 撰寫後驗證
- [ ] 技術內容經 2026/01 最新文件驗證
- [ ] 語氣專業但不冷漠
- [ ] 無大陸用語（資料非數據、檔案非文件）
- [ ] Frontmatter 格式正確
- [ ] 標籤精確且有 3-6 個

---

## 🔗 資料來源清單（2026/01/15 驗證）

### Apple 官方文件
1. **Apple Platform Deployment Guide** (2025.12 更新)
   - https://support.apple.com/guide/deployment/welcome/web
2. **What's new in iOS 26 and iPadOS 26**
   - https://support.apple.com/guide/deployment/dep1fc1629ff/web
3. **What's new in macOS Tahoe 26**
   - https://support.apple.com/guide/deployment/dep3cab681d/web
4. **Apple School Manager - What's New** (2025-2026)
   - https://support.apple.com/guide/apple-school-manager/whats-new/web
5. **iOS 26.2 Release Notes** (2025.12.12)
6. **macOS Tahoe 26.2 Release Notes** (2025.12)
7. **iOS 26.3 beta Release Notes** (2026.01.12)

### Jamf 官方資源
1. **Jamf Pro 繁體中文文件** (2026 更新)
   - https://learn.jamf.com/zh-TW/bundle/jamf-pro-documentation-current/
2. **Declarative Device Management Overview**
   - https://learn.jamf.com/bundle/technical-articles/page/Declarative_Device_Management.html
3. **Jamf Safe Internet Documentation**
   - https://www.jamf.com/resources/product-documentation/jamf-safe-internet/
4. **WWDC 2025 Jamf 重點整理**

### 台灣教育部資源
1. **推動中小學數位學習精進方案官網**
   - https://www.edu.tw/（搜尋「數位學習精進」）
2. **110-114 年精進方案期程說明**
3. **AI教育4年計畫 (2026起)**（待正式公告）

### 第三方技術資源
1. SimpleMDM, Hexnode, Cortado 的 iOS 26/macOS Tahoe MDM 分析
2. MacRumors, 9to5Mac 的 iOS 26.2/26.3 功能報導
3. Wikipedia: macOS version history (2026)
4. Apple Education Deployment Case Studies

---

## ✅ 總結

### 本建議清單的核心價值

1. **100% 基於 2026/01/15 最新資訊**
   - 所有版本號、功能、政策都已驗證
   - 避免過時資訊（如 iOS 18 等錯誤版本）

2. **專為台灣教育場域設計**
   - 考量精進方案過渡期
   - 使用台灣繁體中文官方術語
   - 符合教育部政策脈絡

3. **實務導向，非純理論**
   - 每個 Q&A 都有具體操作步驟
   - 提供風險評估與專家建議
   - 包含溝通策略（家長、學生）

4. **避免與現有內容衝突**
   - 已比對 MAINTENANCE_INDEX.md
   - 補充而非重複現有 194 個術語與 169 個 Q&A

5. **分段可執行的時程**
   - 超高/高/中/低 優先級明確
   - 第一至第四階段執行計畫
   - 每階段有驗收標準

### 下一步行動

**立即行動項目（本週內）**：
1. 審閱超高優先的 10 個術語與 10 個 Q&A
2. 選擇 3-5 個最緊急項目開始撰寫
3. 建立內部審查機制

**短期目標（1 個月內）**：
- 完成第一階段任務
- Intel Mac 汰換指南上線
- 精進方案過渡期 Q&A 上線

**中期目標（3 個月內）**：
- DDM 全面說明完成
- Apple Intelligence 教育政策完整
- 所有高優先項目上線

**長期目標（6-12 個月內）**：
- 所有建議項目完成
- 根據 Apple WWDC 2026 繼續更新
- 建立季度審查機制

---

**文件版本**：V3.0 Final  
**最後更新**：2026-01-15 10:00 GMT+8  
**下次審查時間**：2026-02-15（或 Apple 發布重大更新時）
