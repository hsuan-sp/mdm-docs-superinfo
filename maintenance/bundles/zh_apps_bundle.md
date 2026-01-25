---
File: app-1.md
---

---

id: app-1

title: "iPad 上的 App 一直顯示「等待中 (Waiting)」或無法安裝，如何排除？"

category: "第三部分：應用程式分發與管理 (Apps & Books)"

important: true

## tags: ["故障排除", "App 安裝", "VPP", "DDM"]

**「等待中」通常表示 App 安裝流程在「授權檢核」或「下載佇列」環節卡住了。**

當 MDM 向裝置發送 App 安裝指令後，裝置會經歷複雜的握手流程。請依序排查以下關鍵點：

## 常見原因與解決方案 ：

1.  **VPP 授權不足 (最常見)** ：
    - **檢查** ：登入 Jamf Pro，查看該 App 的授權使用量。若 **已用數量 = 總數量** ，Apple 伺服器會拒絕核發下載憑證。
    - **解決** ：至 ASM 購買更多授權（即便是免費 App 也要買，且若是免費 App 建議一次購買大量以備不時之需），並在 Jamf Pro 執行 VPP 同步。

2.  **網路環境阻擋** ：
    - App 下載需連向 Apple 的 **Content Delivery Network (CDN)** 。若學校防火牆阻擋了相關網域，下載會卡在 0%。
    - **測試** ：嘗試將 iPad 連接手機熱點，若立即開始跑進度條，即為校內網路問題。

3.  **Apple 帳號衝突** ：
    - 確認該 App 的分派模式是否設定為 **「指派給裝置 (Assign to Device)」** 。若錯誤設為「指派給使用者」，系統會等待使用者登入 Apple 帳號，導致卡住。

4.  **宣告式管理 (DDM) 狀態異常** ：
    - 在最新的 iPadOS 中，App 安裝狀態由 DDM 回報。若狀態不同步，請在 Jamf Pro 發送 **「取消所有擱置指令」** 並執行 **「更新資產」** 。

5.  **儲存空間不足** ：
    - 若 iPad 剩餘空間小於 App 大小，系統會主動在後台暫停下載。請檢查「設定」>「一般」>「iPad 儲存空間」。

---

## File: app-2.md

---

id: app-2

title: "不用登入 Apple 帳號也可以在 iPad 上安裝 App 嗎？"

category: "第三部分：應用程式分發與管理 (Apps & Books)"

important: true

## tags: ["VPP", "裝置型分派", "Apple 帳號", "管理式 Apple 帳號"]

**可以。這在技術上稱為「裝置型分派 (Device-based Assignment)」，是校園環境中分發 App 的首選方案。**

透過 **Apple 校務管理 (ASM)** 的大量採購計畫與 MDM 結合，管理員可以將 App 授權直接與裝置的「硬體序號」綁定，而非與「Apple 帳號」綁定。

## 方案優勢與風險評估 ：

- **零帳號部署** ：學生開機後無需登入任何個人或管理式 Apple 帳號，即可接收由管理員派送的 App。
- **授權回收機制** ：App 授權屬於學校資產。當裝置被抹除或移除管理時，授權會自動歸還至 VPP 授權池，供下一位使用者使用。
- **風險提示：內購限制** ：
  - 由於不登入 Apple 帳號，裝置將無法進行「App 內購買 (In-App Purchases)」。
  - 若教材需要額外購買解鎖內容，建議尋找支援一次性採購完整版（Pro 版）的 App。

## 操作建議 ：

在 Jamf Pro 分派 App 時，務必在「VPP」分頁中勾選 **「指派 VPP 內容 (Assign VPP Content)」** ，並確認分發方法設定為 **「裝置指派 (Device Assignment)」** 。

---

## File: app-3.md

---

id: app-3

title: "如果隱藏了 App Store，學生要如何獲取教學所需的 App？"

category: "第三部分：應用程式分發與管理 (Apps & Books)"

important: false

## tags: ["Self Service", "App Store", "限制描述檔", "自主學習"]

**即使透過限制描述檔隱藏了官方 App Store，學生仍能透過「Self Service (自助服務)」App 安全地獲取 App。**

## Self Service 的角色 ：

它是學校專屬的「自定義應用程式商店」。管理員在 Jamf Pro 中將 App 設定為「在 Self Service 中顯示」後，學生即可在該介面自行下載。

## 為什麼這樣設定較好？

1.  **環境純淨** ：防止學生下載非教學相關的遊戲或社群軟體。
2.  **節省空間與頻寬** ：無需將所有 App 都強制安裝 (Auto-Install)。學生可根據當下的課堂需求，再自行點擊安裝。
3.  **自主更新** ：若 App 有新版本，學生也可以在 Self Service 中手動點擊「更新」，而無需等待 MDM 伺服器的排程。

## 注意事項 ：

- **Self Service 無法開啟** ：請確認裝置已正確註冊，且「Self Service」App 本身已成功安裝並獲得信任。
- **Web Clips 整合** ：除了 App，您也可以將網頁捷徑（如：因材網、酷課雲）放在 Self Service 中，讓學生一鍵開啟。

---

## File: app-4.md

---

id: app-4

title: "大量採購免費 App 時，有哪些容易被忽略的細節？"

category: "第三部分：應用程式分發與管理 (Apps & Books)"

important: false

## tags: ["VPP", "ASM", "位置代號", "授權管理"]

**在 Apple 的機制中，即使是 $0 的免費 App 也必須完成「取得」流程，才能獲得分發權。**

## 實務操作與潛在陷阱 ：

1.  **位置代號 (Location Token) 匹配** ：
    - 若您的 ASM 中設有多個「位置」（如：精進 Jamf Pro、自購 Jamf Pro），採購時必須選對位置。
    - 下載的 VPP Token 與 App 授權必須在同一個位置才能在 Jamf Pro 中正確顯示數量。

2.  **授權同步延遲** ：
    - 在 ASM 點選「取得」後，App 授權不會立即出現在 Jamf Pro。通常需要等待 Jamf Pro 的自動同步排程（每日一次），或是手動在 Jamf Pro 的「大量採購」設定中點選「強制更新」來即時抓取新授權。

3.  **App 退架風險** ：
    - 雖然已取得的授權仍能使用，但若開發商將 App 下架，管理員將無法再「購買」更多額外授權。建議針對核心教學 App，初期即取得較大基數（如全校學生人數的兩倍）的授權數量。

4.  **B2B / 自訂 App 授權** ：
    - 若開發商為貴校開發專屬的 B2B App，該授權不會在一般的「搜尋」中出現，必須在「Custom Apps」欄位輸入正確的組織 ID 才能取得。

## 實務建議 ：

管理員應建立年度盤點清單，定期確認核心 App 的授權結餘數。若數量低於 10%，應立即前往 ASM 進行免費採購補足，以免開學當天發生新機無法安裝 App 的窘境。

---

## File: app-5.md

---

id: app-5

title: "如何平衡「自動安裝」與「網路頻寬」？大批 App 下載不動怎麼辦？"

category: "第三部分：應用程式分發與管理 (Apps & Books)"

important: false

## tags: ["部署策略", "內容快取", "頻寬管理", "自動安裝"]

**大型部署環境下（如開學第一天），數百台 iPad 同時下載 App 會導致網路癱瘓。建議採用「分層派送」策略。**

## 解決方案方案建議 ：

- **方案一：建立內容快取 (Content Caching)** ：
  - **最強推薦** ：在校內準備一台 Mac（連接乙太網路），開啟「設定」>「一般」> **「內容快取」** 。
  - **效果** ：第一台 iPad 下載 App 後，後續的 99 台 iPad 會直接從該 Mac 的區域網路抓取資料，不佔用對外頻寬，速度提升數十倍。

- **方案二：區分必裝與選裝** ：
  - 將核心 App（如：MDM 管理元件、基礎瀏覽器）設為「自動安裝」。
  - 將大型 App（如：GarageBand、iMovie 或 AR 工具）設為「在 Self Service 中顯示」。

- **方案三：利用 PreStage 註冊分流** ：
  - 僅在註冊階段強制安裝最輕量的 App，其餘 App 等裝置進入主畫面後，由 Jamf 根據智慧型群組分批次派送。

## 風險提示 ：

若裝置卡在「等待中」，請先檢查是否全校都在下載同一個 App，此時直接強制取消指令並重新派送往往無濟於事，應優先改善內網快取環境。

---

## File: app-6.md

---

id: app-6

title: "管理式 App 與個人安裝的 App 有何不同？學生畢業後可以將 App 帶走嗎？"

category: "第三部分：應用程式分發與管理 (Apps & Books)"

important: false

## tags: ["管理式 App", "授權歸屬", "VPP", "資料保護"]

**這取決於該 App 的「購買者」身分以及它的「管理屬性」。App 授權與其內部的資料應分開來看。**

在受管理環境中，App 分為「管理式」與「個人式」兩大類，其生命週期完全不同：

## 1. 學校指派的「管理式 App (Managed App)」

- **來源** ：由管理員透過 **Apple 校務管理 (ASM)** 採購，並經由 MDM 以「裝置型分派」下發。
- **所有權** ：授權屬於 **學校** 。
- **畢業離校處理** ：
  - **授權回收** ：當學生離校且裝置解除管理後，MDM 會撤銷授權，App 會從裝置中消失或無法開啟。該授權會回到學校的 VPP 授權池中，供下一屆學生使用。
  - **資料風險** ：若管理員啟用了「當移除管理描述檔時一併移除 App」設定，則 App 內儲存的資料（如：未存檔的專案、本地筆記）會隨之 **永久抹除** 。

## 2. 學生以個人 Apple 帳號購買的 App

- **來源** ：學生在個人裝置或未受限制的裝置上，登入私人的 Apple 帳號購買。
- **所有權** ：授權永久屬於 **該學生個人** 。
- **畢業離校處理** ：
  - **永久持有** ：學生只要在自己的新裝置登入同一個 Apple 帳號，即可重新下載，不受學校 MDM 影響。
  - **注意** ：在受監管 (Supervised) 的學校 iPad 上，管理員通常會限制「禁止登入個人 Apple Store」，因此校用機上較少出現這類 App。

## 關鍵技術機制：非管理式轉管理式

- **轉換行為** ：若學生之前已自行安裝了某款 App（如：Notability），當 MDM 再次派送同款 App 時，管理員可以選擇「將非管理式 App 轉換為管理式」。
- **影響** ：一旦轉換成功，該 App 就會受到學校政策控管（例如：禁止備份至個人 iCloud）。

## 實務建議與風險控管 ：

- **資料遷移** ：建議師生在畢業前，務必將重要作品透過雲端硬碟（如：Google Drive）或 AirDrop 導出。一旦管理權限撤銷， **管理式 App 及其內部未備份的資料將無法救回** 。
- **BYOD 建議** ：對於學生自有的裝置，建議使用「使用者註冊 (User Enrollment)」模式，這能實現「公私分明」，在移除學校資料時不影響學生個人的 App 與照片。

---

## File: app-7.md

---

id: app-7

title: "我想用的 App 在 ASM 搜不到（例如特定地區限制或下架），該如何解決？"

category: "第三部分：應用程式分發與管理 (Apps & Books)"

important: false

## tags: ["ASM 搜尋", "地區限制", "開發者設定", "App Store"]

**ASM 的搜尋結果與個人手機上的 App Store 有時不一致。若遇到搜不到的情況，可依序檢查以下因素：**

## 1. 使用 Apple 帳號字串搜尋 (推薦) ：

- 不要搜尋名稱，而是去 App Store 網頁版找到該 App 的 ID（例如：`id123456789`）。將此 ID 直接貼入 ASM 搜尋框，通常能精確命中。

## 2. 地區與商店一致性 ：

- ASM 只能搜尋到您組織帳號所屬地區的 App（如：台灣商店）。若開發者只在美國商店上架，您將無法在台灣的 ASM 採購。

## 3. 未上架 B2B (Custom Apps) ：

- 部分企業或學校自製的 App 需透過「自定義應用程式」分發。請確認開發者已將您的 **組織 ID (Organization ID)** 加入其分發清單。

## 風險提示 ：

若 App 已從 App Store 下架，即使您還有剩餘的 VPP 授權，新裝置可能也將無法下載。建議管理員針對關鍵教學 App，定期檢查其在商店的狀態。

---

## File: app-8.md

---

id: app-8

title: "可以派送網頁捷徑 (Web Clip) 到學生桌面上嗎？這算 App 嗎？"

category: "第三部分：應用程式分發與管理 (Apps & Books)"

important: false

## tags: ["Web Clip", "Safari", "設定描述檔", "教學工具"]

**可以。Web Clip 並非真正的 App，而是在桌面上建立一個指向特定網址的「書籤圖示」。**

這對於引導學生進入特定教學網站（如：因材網、酷課雲）非常有效。

## 技術細節與設定建議 ：

1.  **全螢幕體驗 (Full Screen)** ：
    - 在 Jamf Pro 設定時，務必勾選「全螢幕」選項。
    - **效果** ：開啟網頁時會隱藏 Safari 的網址列與工具列，讓網頁看起來像是一個獨立運作的原生 App，減少學生分心去瀏覽其他網址的機會。

2.  **自訂圖示與視覺** ：
    - **建議規格** ：上傳 **180x180 像素的 PNG 檔案** 以獲得最佳的清晰度。
    - **透明度支援** ：現代系統支援帶有透明背景的 PNG 圖示，這能讓桌面佈置更具設計感。

3.  **防止移除 (Non-removable)** ：
    - 對於校用公用機，您可以將 Web Clip 設定為「不可移除」。
    - **優點** ：確保必備的教學入口不會被學生誤刪，免去重複派送的麻煩。

## 限制與風險提示 ：

- **瀏覽器依賴** ：Web Clip 預設依賴內建的 Safari 引擎。若您在限制描述檔中徹底停用了 Safari 瀏覽器，Web Clip 將會無法開啟。
- **網路連線** ：它本質上是網頁，因此裝置必須在連網狀態下才能載入內容。若需離線使用，則必須尋找支援離線快取的 PWA (Progressive Web App) 或安裝原生 App。

---

## File: app-9.md

---

id: app-9

title: "更新 App 時，需要學生的 Apple 帳號密碼嗎？如何實現靜默更新？"

category: "第三部分：應用程式分發與管理 (Apps & Books)"

important: false

## tags: ["App 更新", "裝置型分派", "自動更新", "DDM"]

**不需要。只要使用「裝置型分派 (Device-based Assignment)」，更新過程完全無需人工介入。**

## 2026 年首選方式：宣告式管理 (DDM)

在最新系統架構下， **宣告式管理 (DDM)** 已成為實現靜默更新的最佳路徑：

- **自主性** ：裝置會根據 MDM 下達的 App 宣告，主動監控版本並在背景自動下載安裝，不再單向依賴伺服器的推送指令。

- **狀態透明** ：管理員能即時看到每個裝置的更新進度（如「正在下載」或「空間不足限制」），而非以前模糊的 Pending 狀態。

## 傳統 MDM 設定（作為相容層） ：

1.  **授權模式** ：必須為裝置型指派（與序號綁定）。
2.  **受監管模式** ：iPad 必須處於受監管 (Supervised) 狀態。
3.  **Jamf 設定** ：在 App 的分發設定中，開啟 **「自動更新應用程式 (Automatically Update App)」** 。（註：在支援 DDM 的裝置上，此勾選框會自動觸發 DDM 宣告輸出。）

## 更新失敗的常見排錯 ：

- **App 正在使用中** ：若學生正開啟該 App，系統通常會等待 App 進入背景或裝置閒置時才執行更新。
- **儲存空間不足** ：更新需要額外的臨時空間來下載安裝包，若空間見底會導致更新失敗。
- **指令卡住** ：若大量更新指令 Pending，可嘗試發送一個 **「空白推播 (Blank Push)」** 來強迫裝置與 Apple 伺服器 Check-in。

## 注意事項 ：

在最新系統架構下， **宣告式管理 (DDM)** 讓裝置能更主動地排程更新，降低了對 MDM 指令的即時性依賴。

---

## File: app-10.md

---

id: app-10

title: "為什麼開啟 App 時，iPad 會跳出要求輸入 Apple 帳號密碼的對話框？"

category: "第三部分：應用程式分發與管理 (Apps & Books)"

important: false

## tags: ["故障排除", "授權衝突", "管理式 App", "裝置型指派"]

**這通常是因為該 App 的「授權來源」與「安裝身分」不符，導致系統試圖驗證原購買者的身分。**

在受管理的 iPad 上，這類「彈出視窗」主要源於以下三種技術衝突：

- **原因一：個人與組織的授權衝突（最常見）**
  - **情境**：學生曾用「個人 Apple 帳號」自行下載過該 App（例如：YouTube），隨後管理員又透過 MDM 派送了同款 App。
  - **技術邏輯**：雖然 App 名稱相同，但系統判定該 App 是由「個人帳號」取得的。當 MDM 試圖將其轉為 **「管理式 App (Managed App)」** 時，若未成功完成「接管」，系統就會不斷要求輸入當初下載該 App 的個人密碼。
  - **解決方法**：**「先刪除，再重裝」**。請手動從 iPad 刪除該 App，然後由管理員透過 Jamf Pro 重新發送安裝指令。這能確保該 App 是以「裝置型指派」的授權重新安裝。

- **原因二：分派模式設定錯誤**
  - **情境**：管理員在 Jamf Pro 設定 App 分發時，將「分發方法」誤選為 **「使用者型指派 (User-based Assignment)」**。
  - **技術邏輯**：此模式要求必須有一個 Apple 帳號來「承載」這份授權。若裝置未登入帳號或登入不符，就可能會觸發登入提示。
  - **解決方法**：進入 Jamf Pro 的 App 設定，將分發方法修改為 **「裝置型指派 (Device-based Assignment)」**，並確認已勾選「指派 VPP 內容」。

- **原因三：VPP 授權尚未完成握手**
  - **情境**：指令已下達，但 Apple 端的 VPP 伺服器尚未完成該裝置序號的授權登記。
  - **技術邏輯**：裝置已下載 App，但在執行時檢查不到合法的裝置授權憑證，因此退而求其次要求使用者登入帳號以進行驗證。
  - **解決方法**：建議稍候片刻，或在 Jamf Pro 中對該裝置發送一個 **「發送空白推播 (Blank Push)」**，強迫裝置重新與 Apple 伺服器確認授權狀態。

## 實務建議 ：

- 在學校公用載具上，應嚴格執行 **「裝置型指派」**。
- 若遇到單一裝置反覆跳出彈窗，最有效率的解法通常是刪除該 App 後，透過 Jamf 的 **「Self Service (自助服務)」** 重新下載，以重新建立正確的授權連結。

---

## File: app-11.md

---

id: app-11

title: "如何派送「電子書 (PDF/ePub)」教材到學生 iPad？"

category: "第三部分：應用程式分發與管理 (Apps & Books)"

important: false

## tags: ["電子書", "教材派送", "PDF", "限制"]

**在台灣，Apple 校務管理 (ASM) 目前不支援直接採購或分發「Apple Books」商店內的內容。**

但您仍有多種方法將學校自製或購買的電子教材（如 PDF、ePub 檔案）派送至學生 iPad：

## 方案一：透過 MDM 派送自製或授權的檔案

1.  **上傳至 Jamf Pro** ：在 Jamf Pro 的「電子書」管理項目中，您可以直接上傳 PDF 或 ePub 格式的教材檔案。
2.  **指派給裝置** ：將這些自定義的電子書指派給目標裝置群組。
3.  **學生存取** ：學生即可在 iPad 的「書籍 (Books)」App 中查閱這些教材。

## 方案二：利用「檔案 App」或雲端儲存空間

1.  **雲端派送** ：將教材上傳至學校的雲端硬碟服務（如 Google Drive 或 OneDrive）。
2.  **派送雲端 App** ：透過 Jamf Pro 派送該雲端 App (例如：Google Drive App)。
3.  **學生存取** ：學生打開雲端 App 即可存取並下載這些教材。

## 方案三：透過教學平台

- 將教材上傳至學校使用的數位學習平台（如因材網、Google Classroom）。學生透過瀏覽器或平台專屬 App 即可閱讀。

## 重要限制與注意事項 ：

- **地區限制** ：您無法在台灣的 ASM 中，像採購 App 一樣去「取得」Apple Books Store 裡的付費或免費書籍。
- **版權問題** ：派送任何電子書教材時，請務必確認您已擁有該內容的合法分發權限。

## 實務建議 ：

在台灣的教育環境下，管理員應將重點放在自定義的 PDF/ePub 檔案或利用現有的雲端儲存與學習平台來分發教材，而非透過 ASM 直接派送 Apple Books 商店的內容。

---

## File: app-12.md

---

id: app-12

title: "付費 App 的授權可以分給不同學校用嗎？(跨校 VPP)"

category: "第三部分：應用程式分發與管理 (Apps & Books)"

important: false

## tags: ["VPP 位置", "資源共享", "跨校管理", "ASM"]

**可以，這透過 ASM 的「位置 (Location)」管理達成。**

這在教育局或總校統一採購的情境下非常實用：

## 操作邏輯 ：

1.  **統一採購** ：總管理員（Super Admin）在 ASM 的「總管理處」位置購買 10,000 套 App 授權。
2.  **內部轉移** ：使用 **「移轉授權 (Transfer Licenses)」** 功能，將其中 1,000 套撥給「A 國小」，500 套撥給「B 國中」。
3.  **獨立分發** ：各校的管理員登入自己的 MDM，僅能看到並使用被分配到的那 1,000 套或 500 套授權。

## 優點 ：

實現「統一議價採購，各校獨立管理」，大幅簡化核銷流程。

---

## File: app-13.md

---

id: app-13

title: "什麼是「受管理的應用程式設定 (Managed App Configuration)」？如何應用於大量部署？"

category: "第三部分：應用程式分發與管理 (Apps & Books)"

important: false

## tags: ["AppConfig", "XML", "變數代換", "Jamf Pro"]

**「受管理的應用程式設定」是利用 MDM 協定，將 XML 格式的設定檔注入至支援 AppConfig 標準的應用程式中，實現「免接觸設定 (Zero-touch Configuration)」。**

這不只是單純的預填資料，而是能強制鎖定 App 的特定行為，防止使用者修改。

## 技術實作與 Jamf Pro 變數應用 ：

在 Jamf Pro 的行動裝置 App 詳細資訊頁面中，切換至 **「App Configuration」** 分頁。您需要貼入符合該 App 開發者規範的 **Plist (Property List)** XML 代碼。

### Jamf Pro 獨家優勢：變數代換 (Variable Substitution)

您可以使用 Jamf Pro 的內建變數來動態填入每台裝置的專屬資訊，無需為每個人製作獨立的設定檔。

- **常用變數範例** ：
  - `$SERIALNUMBER`：自動填入裝置序號。
  - `$EMAIL`：自動填入使用者的 Email（需與 Inventory 連結）。
  - `$USERNAME`：自動填入使用者名稱。
  - `$JSSID`：填入 Jamf Pro ID。

## 實務範例 (設定 Zoom SSO 登入網域) ：

```xml

<dict>

    <key>SetSSOURL</key>

    <string>true</string>

    <key>SSOURL</key>

    <string>yourschool.zoom.us</string>

    <key>PrepopulateUsername</key>

    <string>$EMAIL</string>

</dict>

```

_(注意：具體的 Key 值必須參閱該 App 開發商（如 Zoom, Chrome, Microsoft）的官方管理手冊。)_

---

## File: app-14.md

---

id: app-14

title: "【TestFlight】可以讓老師使用「管理式 Apple 帳號」測試校內開發的 Beta 版 App 嗎？"

category: "第三部分：應用程式分發與管理 (Apps & Books)"

important: false

## tags: ["TestFlight", "App Store Connect", "管理式 Apple 帳號", "服務存取"]

**可以。Apple 已允許「管理式 Apple 帳號 (Managed Apple Account)」作為 TestFlight 的測試者，但必須先在 ASM 端開放權限。**

## 前置需求檢查 (ASM 端) ：

管理員必須登入 **Apple 校務管理** ，前往 **「設定」>「使用者登入與目錄同步」>「服務存取」** ，確認已將 **「TestFlight」** 服務設定為「開啟」。若此開關關閉，使用者即使收到邀請也無法登入 TestFlight。

## 標準部署流程 ：

1.  **App Store Connect 設定** ：
    - 校內開發者將老師的「管理式 Apple 帳號」加入 **「外部測試群組 (External Testing)」** 。
    - 系統會發送邀請郵件至老師的信箱。

2.  **派送 TestFlight App** ：
    - 管理員需在 ASM 採購免費的 **TestFlight App** 授權。
    - 透過 Jamf Pro 將 TestFlight 以 **「裝置型分派」** 方式安裝至老師的 iPad。

3.  **兌換邀請** ：
    - 老師在 iPad 上開啟邀請郵件，點擊「View in TestFlight」。
    - TestFlight App 會自動啟動，老師使用其管理式帳號登入並接受測試。

## 與個人帳號的差異 ：

管理式帳號無法進行 App 內購，因此無法測試涉及實際金流支付的 Beta 功能（除非是在沙盒環境下）。

---

## File: app-15.md

---

id: app-15

title: "【App 更新策略】如何避免 App 在上課時間突然更新，導致斷線或頻寬塞車？"

category: "第三部分：應用程式分發與管理 (Apps & Books)"

important: false

## tags: ["App 更新", "課堂管理", "更新策略", "頻寬控管"]

**關鍵在於關閉「自動更新」，並改採「維護時段手動推送」的策略。**

App Store 的自動更新機制難以預測時間。為了教學穩定，建議針對關鍵 App 採取以下設定：

## 1. 關閉個別 App 的自動更新

- 在 Jamf Pro 的 App 詳細資訊頁面中， **取消勾選「自動更新應用程式 (Automatically update app)」** 。
- 針對 Google Classroom、Meet 或測驗用 App，務必執行此操作，以免新版 Bug 影響課程。

## 2. 建立「維護時段 (Maintenance Window)」

- 與校方協定一個固定時段（例如：每週五下午 5 點後）。
- 利用 Jamf Pro 的 **「大量動作 (Mass Actions)」** ，選取需要更新的裝置群組，手動發送 **「更新應用程式版本」** 指令。

## 3. 善用版本鎖定 (Version Pinning)

- 若您的環境使用「大量採購 (VPP)」，雖然無法指定降版，但您可以暫時不按更新鈕，讓全校裝置維持在當前的穩定版本，直到寒暑假再統一升級。

---

## File: app-16.md

---

id: app-16

title: "我可以統一排版學生 iPad 的桌面嗎？（例如：把數學 App 放在第一頁）"

category: "第三部分：應用程式分發與管理 (Apps & Books)"

important: false

## tags: ["主畫面佈局", "Home Screen Layout", "限制", "資料夾"]

**可以。透過「主畫面佈局 (Home Screen Layout)」設定檔，管理員可以強制定義 App 的排列位置。**

## 設定方式 ：

1.  在 Jamf Pro 前往 **「行動裝置」>「設定描述檔」** 。
2.  選擇 **「主畫面佈局 (Home Screen Layout)」** Payload。
3.  您可以定義 **「Dock (下方固定列)」** 與 **「頁面 (Pages)」** 的內容。
4.  支援建立「資料夾」，將同類型的 App（如：iWork 文書處理）歸納在一起。

## 重要限制與風險 ：

- **鎖定效果** ：一旦套用此設定， **學生將無法自行移動或刪除桌面上的 App 圖示** 。整個主畫面會被「凍結」在管理員設定的狀態。
- **排擠效應** ：未被您排入佈局清單的其他 App，會被自動擠到最後一頁或 App 資料庫中。
- **建議** ：此功能適合低年級或特殊教育需求（介面單純化）；對於高年級，建議保留彈性讓學生建立自己的學習環境。
- **注意** ：教育部/教育局本身應該已經有預設的主畫面佈局描述檔，請務必確認是否已套用。若要更改可能要更改該描述檔而非另外開一個新的。

---

## File: app-17.md

---

id: app-17

title: "我在 ASM 已經「取得」了 App，為什麼 Jamf Pro 列表裡還是找不到？"

category: "第三部分：應用程式分發與管理 (Apps & Books)"

important: false

## tags: ["VPP 同步", "ASM", "故障排除", "大量採購"]

**這通常是因為「Apple 伺服器」與「MDM 伺服器」之間的排程同步尚未完成。**

## 運作機制 ：

Jamf Pro 預設通常每天只會自動與 ASM 同步一次（或依管理員設定頻率）。當您在 ASM 剛按下「取得」後，這筆資料並不會「即時」出現在 Jamf Pro 中。

## 解決方案（強制手動同步） ：

1.  登入 Jamf Pro。
2.  前往 **「設定」>「全域管理」>「大量採購 (Volume Purchasing)」** 。
3.  點選該 App 所屬的位置 (Location)。
4.  切換至 **「內容 (Content)」** 分頁，點選下方的 **「強制更新 (Force Update)」** 或 **「更新 (Update)」** 按鈕。
5.  等待約 1-2 分鐘重新整理頁面，新購買的 App 即會出現。

## 檢查重點 ：

若強制同步後仍未出現，請檢查 ASM 中該次購買是否選對了 **「位置 (Location)」** 。若買到了 A 校區，B 校區的 MDM 是絕對抓不到的。

---

## File: app-18.md

---

id: app-18

title: "我的 App Store 圖示不見了！我也沒設限制，怎麼找回來？"

category: "第三部分：應用程式分發與管理 (Apps & Books)"

important: false

## tags: ["App Store", "圖示消失", "故障排除", "螢幕使用時間", "限制"]

**App Store 圖示消失通常源於「本機螢幕使用時間」或「MDM 限制描述檔」的權限鎖定。請依序排查：**

## 1. 檢查本機「螢幕使用時間」 (最常見)

- **路徑** ：前往 iPad 的「設定」>「螢幕使用時間」>「內容與隱私權限制」>「iTunes 與 App Store 購買」。
- **關鍵設定** ：確認 **「安裝 App」** 是否被設為 **「不允許」** 。
- **說明** ：這是 iOS 本機層級的限制，即便 MDM 沒有鎖，使用者自己也能誤觸關閉。

## 2. 檢查 MDM 限制描述檔

- **路徑** ：前往「設定」>「一般」>「VPN 與裝置管理」，查看已安裝的「限制」描述檔內容。
- **關鍵設定** ：確認是否有 **「不允許安裝 App (Allow installing apps)」** 的限制條目。
- **說明** ：此限制僅對「受監管 (Supervised)」的裝置生效。

## 3. 主畫面搜尋

- 有時 App Store 只是被學生藏到了某個深層資料夾或從主畫面移除（但在 App 資料庫中）。請嘗試在主畫面下拉搜尋 "App Store"。

## 4. 重置主畫面佈局 (最後手段)

- 若圖示真的憑空消失，可前往「設定」>「一般」>「移轉或重置 iPad」>「重置」> **「重置主畫面佈局」** 。
- **注意** ：這會打亂所有已整理的 App 排列。

---

## File: app-19.md

---

id: app-19

title: "如何將 iPad 鎖定在「單一 App」進行考試？能設定讓學生自行退出嗎？"

category: "第三部分：應用程式分發與管理 (Apps & Books)"

important: true

## tags: ["單一 App 模式", "ASAM", "考試模式", "風險警示"]

**標準的「單一 App 模式」無法由使用者自行退出。若需要保留退出彈性，應改用「自主單一 App 模式 (ASAM)」。**

這兩者的運作邏輯完全不同，選錯模式是造成「死機」的主因：

## 模式一：MDM 強制單一 App 模式 (Single App Mode)

- **特性** ：由管理員發送指令「鎖死」，除非管理員發送指令「解除」，否則 **絕對無法退出** 。
- **風險** ： **斷網即死機** 。若裝置在鎖定期間 Wi-Fi 斷線，因為使用者無法進入「設定」重連，裝置收不到解鎖指令，就會永久卡住，只能透過 **有線網路轉接器 (RJ45)** 救援或強制重刷。
- **適用** ：圖書館導覽機、電子看板（不需人員操作的場景）。

## 模式二：自主單一 App 模式 (Autonomous Single App Mode, ASAM) —— 考試推薦

- **特性** ：權限下放給 App。當學生進入考試畫面時， **App 自行鎖定** ；交卷後， **App 自行解除鎖定** 。
- **優點** ：不依賴即時網路指令。即使斷網，學生只要在 App 內完成操作（如交卷），App 本身就能釋放鎖定。
- **設定方式** ：在 Jamf Pro 的「限制」描述檔中，找到「自主單一 App 模式」選項，將允許的 App Bundle ID 加入允許名單。

## 模式三：引導使用模式 (Guided Access) —— 小規模適用

- **特性** ：這是 iOS 本機功能，非 MDM 指令。老師手動連按三次電源鍵鎖定，再按三次輸入密碼解鎖。
- **優點** ：完全受控於現場人員，沒有斷網卡死的風險。

## 實務建議 ：

- **正規考試** ：請要求軟體商支援 **ASAM** （如 LockDown Browser），這是最安全且專業的做法。OS 26 已將 ASAM 納入 DDM 框架，即使在短暫斷網時，裝置也能根據本地宣告維持鎖定狀態，大幅提升考試穩定性。
- **臨時測驗** ：若 App 不支援 ASAM，請使用 **「引導使用模式」** 由監考老師手動控管。
- **盡量避免** ：對大量學生裝置使用 MDM 強制單一 App 模式，除非您有把握 Wi-Fi 絕對穩定且有能力處理死機救援。

---

## File: app-20.md

---

id: app-20

title: "新架構：什麼是「宣告式 App 管理 (Declarative App Management)」？"

category: "第三部分：應用程式分發與管理 (Apps & Books)"

important: false

## tags: ["DDM", "App 部署", "狀態監控", "新技術"]

**這是 Apple MDM 協定的重大演進，讓裝置能根據伺服器發出的「宣告 (Declarations)」，自主維持 App 的安裝狀態。**

## 與傳統 MDM 的核心差異 ：

1.  **預期狀態管理 (Desired State Management)** ：
    - **舊機制** ：伺服器發送「安裝 App」指令 -> 裝置執行一次。若使用者事後刪除，伺服器需再次掃描並補發指令。
    - **新機制 (DDM)** ：伺服器宣告「此 App 必須存在」。裝置會 **持續監控** ，一旦發現 App 被移除或狀態不符，會自動觸發重新下載，確保裝置始終符合管理員定義的狀態。

2.  **狀態通道 (Status Channel)** ：
    - 裝置會透過輕量級的狀態通道， **主動** 向 Jamf Pro 回報 App 的詳細安裝進度（如：等待中、安裝中、驗證失敗）。這比傳統的「伺服器輪詢 (Polling)」更即時且節省網路流量。

3.  **邏輯判斷 (Predicates)** ：
    - 管理員可以設定安裝條件（例如：「僅在裝置版本 > iOS 17 時安裝」）。裝置會自行在本地端判斷是否符合條件並執行安裝，無需伺服器反覆運算。

---

## File: app-21.md

---

id: app-21

title: "如何防止學生利用 iOS 18 的功能「隱藏」或「鎖定」管理式 App？"

category: "第三部分：應用程式分發與管理 (Apps & Books)"

important: true

## tags: ["iOS 18", "隱藏 App", "鎖定 App", "限制描述檔", "受監管"]

**iOS 18 新增的隱私功能允許使用者透過 Face ID 鎖定或隱藏 App，這會干擾校園的資產盤點與教學管理。**

## MDM 對策 (需 Jamf Pro 11.9+ 與 iOS 18+) ：

管理員需在 **「限制 (Restrictions)」** 描述檔中，針對 **「受監管 (Supervised)」** 裝置勾選以下兩個新限制：

1.  **不允許鎖定 App (allowLockedApps)** ：
    - 禁止使用者對任何 App 啟用 Face ID/Touch ID 驗證鎖定。
    - **註** ：若停用此項，系統會自動併同停用隱藏 App 的功能。

2.  **不允許隱藏 App (allowHiddenApps)** ：
    - 禁止使用者將 App 移入「隱藏」資料夾。

## 技術細節 ：

上述設定在 iOS 18 以上版本可透過 **宣告式裝置管理 (DDM)** 的 _Configurations_ 進行部署，比傳統 Profile 更具即時性。套用此限制後，學生長按 App Icon 時，選單中的「需要 Face ID」或「隱藏並需要 Face ID」選項將會反灰或消失。

---

## File: app-22.md

---

id: app-22

title: "【番外篇-實務採購常見狀況】以 Procreate 與 Procreate Pocket 為例，這兩者有什麼差別？學校買錯了怎麼辦？"

category: "第三部分：應用程式分發與管理 (Apps & Books)"

important: false

## tags: ["Procreate", "App 採購", "VPP", "通用購買", "退款"]

**買錯 App 版本，是教育採購很常發生的錯誤。這兩款 App 屬於不同的產品線，且不支援「通用購買 (Universal Purchase)」。**

## 規格對照 ：

- **Procreate (iPad 版)** ：專為 iPadOS 與 Apple Pencil 設計。支援大畫布與完整繪圖引擎，是美術班的標準教材。 **單價較高** 。
- **Procreate Pocket (iPhone 版)** ：專為 iOS 手機介面設計。雖然能在 iPad 上安裝（相容模式），但畫面周圍會有黑邊，且不支援 Pencil 的壓力感應與傾斜功能。 **單價較低** 。

## 買錯後的標準處理流程 ：

1.  **VPP 退款申請** ：
    - 管理員登入 **Apple 校務管理** ，前往 **「偏好設定」>「付款與帳單」>「檢視購買記錄」** 。
    - 或是直接登入 **reportaproblem.apple.com** ，使用 ASM 管理式帳號登入。
    - 選擇該筆訂單，提出「要求退款 (Request a refund)」請求，理由註明「購買了錯誤的版本 (Purchased wrong version)」。
    - **注意** ：Apple 審核退款通常需要 24-48 小時做出決定，且不可撤回。

2.  **重新採購** ：
    - 由於授權不通用，您必須重新購買正確的 iPad 版本才能進行派送。

3.  **移除錯誤指派** ：
    - 在 Jamf Pro 中，務必移除 Pocket 版的指派範圍，以免學生安裝到錯誤版本，影響上課體驗。

---

## File: app-23.md

---

id: app-23

title: "什麼是「Declarative App Management (宣告式 App 管理)」？與傳統 VPP App 指派有什麼不同？"

category: "第三部分：應用程式分發與管理 (Apps & Books)"

important: true

## tags: ["DDM", "App 管理", "宣告式", "自動更新", "iOS 26"]

**Declarative App Management (宣告式 App 管理) 是 iOS 26、iPadOS 26 與 macOS 26 引入的全新機制，讓裝置能夠「自主」管理 App 的安裝與更新狀態，取代傳統依賴 MDM 伺服器頻繁發送指令的模式。**

## 傳統 VPP vs. 宣告式 App 管理

| 特性         | 傳統 MDM (InstallApplication Command)                  | 宣告式 App 管理 (App Declaration)                                                     |
| :----------- | :----------------------------------------------------- | :------------------------------------------------------------------------------------ |
| **觸發機制** | MDM 伺服器必須「主動」發送安裝指令，若失敗需伺服器重試 | MDM 只需傳送「宣告 (Declaration)」，裝置會 **自主** 嘗試安裝直到成功                  |
| **狀態回報** | 被動。MDM 需定期輪詢 (Check-in) 才能知道安裝進度       | **即時 (Real-time)** 。安裝成功、失敗或下載中，裝置會透過 Status Channel 立即主動回報 |
| **更新控制** | 只能設定全域「自動更新」或手動推送更新                 | 可針對 **個別 App** 設定：強制更新、延遲更新、或依循使用者偏好設定                    |
| **部署範圍** | App Store App、VPP App                                 | App Store App、VPP App、Custom App，macOS 也支援 .pkg 安裝檔                          |

## 適用平台與版本

- **iOS 26 / iPadOS 26** ：支援 App Store App、Custom App 的宣告式管理。
- **macOS 26 (Tahoe)** ：除 App 外，也支援 .pkg 安裝檔的宣告式部署。
- **visionOS 26** ：同樣支援宣告式 App 管理。

## Jamf Pro 設定方式

在支援 DDM 的 Jamf Pro 版本中：

1.  進入 **Blueprints** > **App Management**

2.  建立 **App Declaration**
3.  設定 **Installation Behavior** ：
    - **Required (必要)** ：強制安裝，且使用者無法移除。若使用者刪除，裝置會自動重裝。
    - **Optional (選用)** ：出現在 Self Service 供下載，使用者可移除。

4.  設定 **Update Behavior** ：
    - **Automatic** ：永遠保持最新。
    - **Follow User Preference** ：依循使用者在 App Store 的自動更新設定。

## 部署建議

- **新裝置全面採用** ：對於符合版本需求的裝置，建議全面改用宣告式方式部署 App，可顯著降低伺服器負載並提升安裝成功率。
- **混合環境策略** ：舊版裝置仍需使用傳統 VPP 派送，Jamf Smart Groups 可協助區分新舊裝置並套用不同策略。
- **監控狀態回報** ：善用 DDM 的即時狀態回報功能，快速識別安裝失敗的裝置並採取對應措施。

---

## File: app-24.md

---

id: app-24

title: "iOS 26 如何限制學生只能透過 Wi-Fi 下載 App，避免消耗行動數據？"

category: "第三部分：應用程式分發與管理 (Apps & Books)"

important: false

## tags: ["行動數據", "Wi-Fi", "App 下載", "流量管理", "iOS 26"]

**iOS 26 與 iPadOS 26 的宣告式裝置管理 (DDM) 功能新增了「限制透過行動網路下載 App」的設定，允許學校強制學生只能在 Wi-Fi 環境下下載或更新 App，有效控管 SIM 卡流量。**

## 設定方式

此功能透過 **Declarative Device Management (DDM)** 實現，具體設定路徑視 MDM 系統而異：

### Jamf Pro ：

1.  進入 **Blueprints** 或 **App Declarations** 。
2.  針對個別受管 App 進行定義。
3.  在部署宣告中設定 **「CellularDataPolicy」** ：
    - **Disallow (不允許)** ：強制僅能透過 Wi-Fi 下載。
    - **Allow (允許)** ：不分網路類型執行安裝。

4.  部署至目標裝置群組 (需 iOS/iPadOS 18+ 且為受管與監管裝置)。

### Microsoft Intune ：

- 在裝置設定描述檔的 App Store 限制中，可找到相關設定選項。

## 適用情境與效益

- **行動方案裝置** ：部分縣市配發的 iPad 或 Chromebook 插有 SIM 卡且流量有限（如每月 10GB）。此設定可防止學生在校外誤下載大型 App 或遊戲導致流量耗盡。
- **BYOD 管理** ：對於家長付費行動上網的個人裝置，此設定也能協助控管使用行為，避免產生高額帳單。

## 影響範圍與注意事項

- **影響範圍** ：
  - App Store 手動下載。
  - MDM 透過 DDM 指派的 App 自動安裝。
  - App 自動更新。

- **不影響項目** ：
  - 一般網頁瀏覽與影片串流（學生觀看 YouTube 仍會消耗流量，需另外透過 Content Filter 管控）。
  - 已下載 App 內的內容更新（如遊戲內的資料包）。

- **使用者體驗** ：當學生在 4G/5G 環境嘗試下載 App 時，下載按鈕會反灰或顯示提示訊息「請連接 Wi-Fi 以下載」。

## 專家建議 ：

此設定僅能控管 App 本體的下載，若要全面管理行動數據使用，建議搭配：

- **Content Filter** ：限制特定網站或串流服務的存取。

- **Per-App VPN** ：將特定 App 的流量導向 VPN，僅在校內網路可用。
- **使用者教育** ：教導學生辨識會消耗大量流量的行為。

---

## File: app-25.md

---

id: app-25

title: "macOS 26 的「宣告式 .pkg 部署」如何使用？與傳統 Jamf Policy 有何不同？"

category: "第三部分：應用程式分發與管理 (Apps & Books)"

important: false

## tags: ["macOS 26", "Package", "DDM", ".pkg", "Jamf Policy"]

**macOS 26 (Tahoe) 將非 App Store 軟體 (.pkg) 納入宣告式裝置管理 (DDM) 範疇，允許透過 Declaration 部署軟體包，提供比傳統 Jamf Policy 更現代化、更透明的安裝體驗。**

## DDM Package vs. Jamf Policy

| 特性         | Jamf Policy (傳統)                                            | DDM Package Declaration (新)                                  |
| :----------- | :------------------------------------------------------------ | :------------------------------------------------------------ |
| **運作核心** | 依賴 `Jamf` binary 代理程式執行腳本與安裝                     | 依賴 macOS 系統內建的 MDM 框架直接安裝                        |
| **觸發時機** | 需設定觸發器 (Trigger)，如 Login、Startup、Recurring Check-in | **自主評估** (Autonomous)。只要符合宣告條件，系統即刻嘗試安裝 |
| **狀態回報** | 回報至 Jamf Pro logs，有延遲                                  | **即時回報** 安裝進度、錯誤代碼至 MDM                         |
| **離線支援** | 需連線 MDM 才能觸發 Policy                                    | 只要 Declaration 已下達，裝置可在背景自行處理                 |
| **適用軟體** | 所有類型的安裝檔、腳本 (.pkg、.dmg、.sh)                      | 標準簽署的 **.pkg (Distribution Package)**                    |

## 適用條件與限制

- **macOS 版本需求** ：macOS 26 (Tahoe) 或更新版本。
- **.pkg 檔案要求** ：
  - 必須由 **Apple Developer ID Installer certificate** 正確簽署。
  - 必須為標準的 Distribution Package 格式。
  - 安裝路徑需符合 macOS 安全性要求（通常為 `/Applications` 資料夾）。

## 何時該用哪一個？

### 優先使用 DDM Package ：

- 標準軟體安裝（如 Microsoft Office、Google Chrome、Adobe Acrobat）。
- 需要即時確認安裝成功率的關鍵軟體。
- macOS 26 以上的新電腦。
- 希望減少對 Jamf binary 依賴的環境。

### 繼續使用 Jamf Policy ：

- 複雜的安裝流程（如：安裝後需執行 script 修改設定、需互動視窗）。
- 非標準 .pkg 格式的軟體（如拖曳式 .dmg、需要特殊處理的安裝檔）。
- 舊版 macOS 裝置。
- 需要搭配前置或後置腳本的部署情境。

## Jamf Pro 設定步驟 ：

1.  確保 .pkg 已由 Apple Developer ID 正確簽署。
2.  在 Jamf Pro 建立 **Package Declaration** （位於 Blueprints 或 Packages 區域）。
3.  上傳 .pkg 檔案至 Jamf 分發點。
4.  設定部署條件（可選）：例如僅在磁碟空間 > 10GB 時安裝。
5.  指派給目標裝置或裝置群組。

## 專家建議 ：

- **混合使用策略** ：對於 macOS 26 以上裝置優先使用 DDM，舊版裝置保留 Policy，透過 Smart Groups 自動區分。
- **公證 (Notarization) 是關鍵** ：macOS 26 的 DDM 部署對安全性要求極高。 **所有 .pkg 檔案必須經過 Apple 公證 (Notarized)** ，否則裝置將拒絕安裝，並在 Status Channel 回報 `VerificationFailed` 錯誤。
- **測試先行** ：新軟體部署前，建議先在測試裝置上驗證 .pkg 是否具備完整的簽署鍊與公證票據。

---

## File: app-26.md

---

id: app-26

title: "如何管理 2024-2025 年新推出的 AI 輔助教學 App（如 Writing Tools、Image Playground）？"

category: "第三部分：軟體採購與 App 管理 (App Management)"

important: true

## tags: ["AI", "Apple Intelligence", "應用程式管理", "隱私安全", "考試防弊"]

**隨著 Apple Intelligence 在 2024-2025 年全面成熟，教學 App 也進入「AI 輔助時代」。對於學校來說，最大的挑戰在於如何平衡「AI 帶來的效率」與「學習評量的公平性」及「隱私安全」。iOS 26 提供了更精細的 MDM 指令來控管這些功能。**

## 1. 核心 AI 功能的開關控制

管理員可以透過 Jamf Pro 的「限制 (Restrictions)」描述檔進行管理：

- **寫作工具 (Writing Tools)** ：可設定為「全部允許」、「僅限本機處理」或「完全禁用」。在正式考試期間，建議透過 DDM 宣告暫時禁用，以確保學生獨立寫作。

- **圖像生成 (Image Playground / Genmoji)** ：可針對特定年級限制使用權限，或限制僅能於特定 App（如：無邊記 Freeform）中使用。

## 2. 第三方 AI App 的審核機制

對於整合了第三方 LLM（如 OpenAI, Google Gemini）的教學 App：

- **隱私標籤檢查** ：2026 年 App Store 要求更透明的 AI 隱私標籤。管理員應優先採購標註為「不追蹤個人數據」或「僅用於上下文推理」的 App。

- **VPP 大量派送** ：透過 Jamf Pro 統一派送已通過資安審查的 AI 工具，並禁止學生自行從 App Store 下載未經核准的 AI App。

## 3. 教學現場的靈活管理

- **利用課堂 App (Classroom)** ：老師可以在上課時利用「鎖定 App」功能，將學生的 iPad 固定在指定的教學工具中，自動停用全局的寫作工具面板。
- **網路層級過濾** ：若學校擔心學生在課堂外過度依賴 AI 瀏覽器插件，可透過 MDM 安裝「內容過濾 (Content Filtering)」描述檔，精準管控 AI 伺服器的存取。

## 💡 策略建議 ：

與其全面封鎖，建議針對「創作課」開啟權限，而在「評量課」透過 Jamf Pro 推送「考試模式 (ASAM)」自動停用所有 AI 輔助功能。

---

## File: app-27.md

---

id: app-27

title: "如何透過 Jamf Pro 更新 App？(自動強制執行與手動強制更新)"

category: "第三部分：應用程式分發與管理 (Apps & Books)"

important: true

## tags: ["App 更新", "Jamf Pro", "手動更新", "自動更新", "DDM"]

**在 Jamf Pro 中，App 的更新主要透過「自動強制執行」與「手動點選強制更新」兩種方式達成。**

為了確保教學用 iPad 始終維持在最新版本，建議結合排程檢查與強制執行設定。

## 1. 設定自動更新與檢查排程

請先進入 **「裝置 (Devices)」 > 「行動裝置 App (Mobile Device Apps)」** 並點選您要管理的 App，在 **「一般 (General)」** 標籤頁面進行以下設定：

- **排程檢查更新** ：勾選 **「排程 Jamf Pro，使其自動檢查 App Store 是否有應用程式更新」** 。這會讓 Jamf Pro 自動更新 App 的說明、圖示與版本資訊。

- **自動強制執行** ：勾選 **「自動強制執行 App 更新」** 。系統會在偵測到新版本時，自動在行動裝置上強制執行更新指令。
- **同步時間設定** ：可調整 **「App Store Sync Time」** ，建議設定在凌晨時段，以避開白天教學時的網路尖峰。

## 2. 手動強制應用程式更新 (Force Update)

若有緊急更新需求，請進入 **「裝置 (Devices)」 > 「行動裝置 App (Mobile Device Apps)」** 點選目標 App，不需要等待排程，可直接透過以下方式手動觸發：

1.  進入目標 App 的詳細頁面。

2.  向下捲動找到 **「強制應用程式更新」** 區塊。
3.  點選 **`Force Update`** 按鈕。系統會立刻向所有在該 App **「範圍 (Scope)」** 內的裝置發送更新指令。

## 3. 2026 年環境注意事項：DDM 與更新執行

在 iOS 26 與最新的系統環境下，更新執行仍受以下規則限制：

- **App 正在使用中無法更新** ：若學生正開啟該 App，更新會暫時卡在「擱置中」。點選 **「強制執行」** 會嘗試關閉 App 並更新，可能會導致教學中段（閃退）。

- **單一 App 模式限制** ：若 iPad 處於「單一 App 模式 (Guided Access/Single App Mode)」，將無法接收並安裝 App 更新，須先解除模式。
- **靜默轉換** ：若 App 原本是學生自行安裝的非管理式 App，可勾選 **「將非管理式 App 轉換為管理式」** ，讓 Jamf Pro 取得控制權後執行更新。

## 💡 溫馨提醒 ：

大批量推送更新時，請確認校內 **「內容快取 (Content Caching)」** 伺服器運作正常，以避免全校 iPad 同時向 Apple 下載導致頻寬塞車。
