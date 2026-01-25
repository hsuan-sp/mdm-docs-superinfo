---
File: mac-1.md
---

---

id: mac-1

title: "Mac 需要綁定 AD (Active Directory) 嗎？現代化的建議是什麼？"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: true

## tags: ["AD", "身分認證", "Jamf Connect", "Platform SSO", "No-Bind"]

**高度建議不要綁定 AD (No-Bind 策略)。請改用「平台單一登入 (Platform SSO)」或 Jamf Connect。** 傳統將 Mac「綁定 (Bind)」至 AD 網域的做法，在行動辦公與資安零信任（Zero Trust）架構下已顯得笨重且不可靠。

**為何拋棄 AD 綁定？**

1. **行動化障礙**：筆電一旦離開校園內網，無法連線 DC (網域控制站)，導致密碼無法同步或登入緩慢。

1. **鑰匙圈 (Keychain) 災難**：AD 密碼變更後，Mac 本機的鑰匙圈密碼往往不會同步更新，導致使用者頻繁遭遇彈窗報錯。
1. **Apple 政策**：Apple 已不再積極維護 AD Plugin，並建議轉向現代化驗證。

**近年的主流替代方案：**

**方案 A：平台單一登入 (Platform SSO 2.0) — 2026 年標配方案**

自 macOS 13 起引進，並在 macOS 26 (Tahoe) 獲得重大更新。

- **2026 年新功能：精簡設定 (Simplified Setup)**：
  - 管理員可直接在開箱時的「設定輔助程式」階段強制透過 IdP 驗證。
  - 使用者輸入 Entra ID (Azure AD) 或 Google 帳號後，直接自動建立對應的本機帳戶。
  - 這實現了真正的「零接觸部署」，資訊組長不再需要預設一組臨時密碼。

- **優勢**：
  - **密碼同步**：Mac 本機密碼與雲端強標准同步，符合資安稽核。
  - **無密碼體驗**：macOS 26 支援透過 iPhone 的 FaceID/Touch ID 直接授權 Mac 登入。

**方案 B：Jamf Connect — 進階管控**

若學校需要更客製化的登入畫面（如顯示校規、倒數計時）或使用非主流 IdP。

- **Just-in-Time (JIT) 佈建**：使用者第一次開機時輸入雲端帳號，Jamf Connect 會即時建立對應的本機帳戶。

- **多因素驗證 (MFA)**：強制使用者在登入 Mac 時通過手機 MFA 驗證，資安等級最高。

**實務建議：遷移策略**

若貴校仍有大量 Mac 綁定 AD，請優先計畫「解除綁定 (Unbind)」專案，並導入 Platform SSO，這能大幅減少資訊組長處理「密碼不同步」工單的數量。

---

## File: mac-2.md

---

id: mac-2

title: "如何管理 Mac 的本機管理者權限 (Local Admin)？"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: false

## tags: ["帳號權限", "LAPS", "資安", "Privileges", "最小權限原則"]

**最佳實踐是「日常使用標準帳戶」搭配「LAPS (本機管理員密碼解決方案)」。嚴禁讓使用者長期持有 Admin 權限。**

給予教師或學生 Admin 權限是校園資安的最大破口，這會導致防毒軟體被關閉、惡意軟體被安裝，甚至整個內網被勒索病毒加密。

## 管理策略三部曲：

### 1. 剝奪常駐權限 (Standard User)

- 所有教職員配發的 Mac，預設登入帳號應為 **「標準使用者 (Standard User)」**。
- 在此權限下，使用者無法修改系統核心設定或安裝系統級軟體。

### 2. 導入 Native LAPS (原生管理式本機管理者密碼)

- **2026 年現狀**：Apple 自 macOS 14.4 起內建原生 LAPS 協定。
- **優勢**：
  - **自動輪替與託管**：Jamf Pro 會自動每隔一段時間更換管理者密碼。
  - **DDM 即時回報**：透過宣告式管理，電腦一更換密碼就會主動回傳，不再有資產回報的時間差。

- **操作**：當維修需要權限時，至 Jamf Pro 後台查詢該機當下的隨機密碼，使用後系統會自動在下次連網時更換新密碼。安全性遠高於手動設定。

### 3. 自助權限提升 (Privileges App)

若老師偶爾需要安裝驅動程式怎麼辦？

- **工具**：部署 **Privileges** (免費開源工具) 或 Jamf 內建的類似功能。

- **流程**：老師點選 Dock 上的鎖頭圖示 > 說明理由 > 獲得 **「20 分鐘的管理員權限」**。時間一到，系統自動將其降回標準使用者。
- 這既給予了方便，又維持了「最小權限原則 (Principle of Least Privilege)」。

---

## File: mac-3.md

---

id: mac-3

title: "如何派送非 App Store 的軟體（如 Chrome, Adobe, Office）？"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: false

## tags: ["軟體派送", "App Installers", "PKG", "自動更新"]

**放棄手動打包。請優先使用 Jamf Pro 的「App Installers」服務，實現「隨選即裝」與「自動更新」。**

在 Mac 管理中，軟體派送曾經是最繁瑣的工作（下載 DMG -> 封裝成 PKG -> 上傳 -> 測試）。現在有更聰明的方法。

## 現代化軟體部署層級：

### Level 1：Jamf App Installers 與 DDM 宣告式管理 (首選)

- **2026 年演進** ：結合 **DDM (Declarative Device Management)** 軟體管理。
- **原理** ：管理員不再只是「發送安裝命令」，而是「宣告該裝置必須擁有此軟體」。
- **優勢** ： **具備自癒性 (Self-Healing)** 。若學生誤刪了受管 App（如 Chrome），Mac 會主動發現狀態不一致，並在背景自動補回安裝，大幅減少組長的重複工單。
- **自動更新** ：確保全校瀏覽器永遠處於最新安全版本。

### Level 2：Mac App Store (VPP)

- 適用於 Keynote, GarageBand, Goodnotes 等上架於商店的 App。
- 透過 ASM 購買授權 (VPP) 並指派給裝置，可實現靜默安裝與更新。

### Level 3：手動 PKG 部署 (最後手段)

- 適用於校務行政系統、特定的驅動程式或沒有在 App Catalog 中的冷門軟體。
- **工具** ：使用 **Jamf Composer** 進行快照 (Snapshot) 或封裝。
- **流程** ：將軟體打包為 `.pkg` 或 `.mpkg` > 上傳至 Jamf Pro > 建立 Policy 派送。

## 實務建議 ：

對於 Adobe Creative Cloud (CC)，建議使用 Adobe Admin Console 建立 **「Shared Device License (共用裝置授權)」** 的安裝包，再透過 Jamf Pro 派送，以符合電腦教室多人共用的授權規範。

---

## File: mac-4.md

---

id: mac-4

title: "如何制定 2026 年的 macOS 軟體更新策略？DDM 宣告式更新與傳統更新有何不同？"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: true

## tags: ["軟體更新", "DDM", "macOS 26", "宣告式更新", "資訊組長實務"]

**在 macOS 26 (Tahoe) 環境下，Apple 已正式棄用舊款指令式更新，全面轉向更強大的 DDM (宣告式管理) 模式。** 這讓 資訊組長從「催促裝置更新」變為「定義目標狀態」，解決了以往更新指令容易塞車的問題。

## 一、 傳統更新 vs. 宣告式更新 (DDM)

| 比較項目     | 傳統 MDM 指令 (Legacy)       | 宣告式更新 (DDM)                             |
| :----------- | :--------------------------- | :------------------------------------------- |
| **主動權**   | 伺服器發送指令，裝置被動執行 | 裝置自主監控，符合條件即執行                 |
| **強制性**   | 指令可能被使用者無視或延後   | **強制截止日期 (Deadline)** ，時間到自動重啟 |
| **透明度**   | 管理員難以得知下載進度       | 提供即時狀態（下載中、準備中）               |
| **頻寬優化** | 全校同時觸發可能造成斷網     | 裝置分散下載，配合快取伺服器更穩定           |

## 二、 2026 年 資訊組長的標準軟體更新策略

### 1. 設定強制升級截止日 (Enforcement Deadline)

- **核心版本 (macOS 26.x)** ：建議設為發布後 14-21 天。
- **安全更新 (Rapid Security Response)** ：建議設為 48 小時內。
- **效果** ：使用者會收到多次倒數通知，若未在期限前更新，系統將在 Deadline 到達時 **強制重啟安裝** ，確保資安無死角。

### 2. 活用 DDM 狀態頻道 (Status Channel)

- 資訊組長不需要手動「掃描資產」來確認誰還沒更新。
- DDM 會主動向 Jamf Pro 報信：「我已經下載好更新檔，預計 17:00 安裝」。

### 3. 校園網路配套

- 全校 Mac 同時執行 DDM 更新時頻寬壓力極大。
- **關鍵配套** ：務必在各機房或行政大樓放置一台 Mac mini (M5) 作為 **「內容快取 (Content Caching)」** 伺服器，讓 90% 的更新流量在內網傳輸。

## 三、 實務叮嚀

- **避開大考日期** ：DDM 的強制性極高。在段考週或線上檢定期間，請務必將相關更新 Profile 暫時解除指派，避免電腦在考試中途因為 Deadline 到達而自動重啟。

---

## File: mac-5.md

---

id: mac-5

title: "如何強制 Mac 進行 macOS 系統更新？學生一直按「稍後提醒」怎麼辦？"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: false

## tags: ["系統更新", "DDM", "Nudge", "宣告式管理", "SOP"]

**現在的標準是使用「宣告式裝置管理 (DDM)」。** 若需更強烈的視覺提醒，則搭配開源工具 "Nudge"。

與 iOS 不同，macOS 的更新往往涉及長時間重開機，因此 Apple 的設計傾向讓使用者選擇時間，但這常導致校園電腦版本碎片化。

## 策略一：DDM 宣告式更新 (macOS 14+ 推薦)

- **原理** ：這是 Apple 最新的管理協定。管理員設定一個 **「強制執行期限 (Enforcement Deadline)」** 。
- **流程** ：
  1.  在期限前，系統會溫和提醒使用者更新。
  2.  越接近期限，提醒頻率越高。
  3.  **一旦過了期限** ，系統會強制下載並重開機安裝，使用者無法再推遲。

- **設定** ：在 Jamf Pro 的「設定描述檔」中選擇 **「軟體更新 (Software Update)」** > 設定目標版本與日期。

## 策略二：Nudge (強效視覺提醒)

若 DDM 的原生通知不夠顯眼，社群標準工具 **Nudge** 是最佳解法。

- **功能** ：它會跳出一個無法忽視的視窗（可以包含校徽、更新說明），要求使用者更新。若使用者一直拖延，視窗會佔據全螢幕甚至模糊背景應用程式，直到更新完成為止。

- **部署** ：透過 Jamf Pro 派送 Nudge 安裝檔與 JSON 設定檔。

## 實務建議 ：

對於電腦教室（無人使用的時段），可設定 **「Power Nap」** 與 **「排程開機」** ，並發送 MDM 指令在深夜自動執行下載與安裝，避開教學時段。

---

## File: mac-6.md

---

id: mac-6

title: "Mac 電腦教室如何像還原卡一樣，快速清除重置 (Wipe)？"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: false

## tags: ["重置", "EACS", "抹除所有內容", "電腦教室", "Imaging"]

**Apple Silicon (M 系列) 時代已不建議，而且可能也無法使用「還原卡」或「Ghost」。** 請改用「清除所有內容和設定 (EACS)」指令。

傳統的磁碟映像檔部署 (Monolithic Imaging) 已被 Apple 徹底淘汰。現在的重置邏輯是「清除使用者資料 + 保留作業系統 + 自動重新註冊」。

## 二、 運作原理比較

| 比較項目       | 傳統重灌 (Legacy)             | 清除所有內容和設定 (EACS)     |
| :------------- | :---------------------------- | :---------------------------- |
| **原理**       | 格式化硬碟 > 重新下載安裝系統 | 銷毀加密金鑰 > 清除使用者資料 |
| **所需時間**   | 1-2 小時                      | **5-10 分鐘**                 |
| **網路需求**   | 需下載 12GB+ 系統檔案         | **幾乎不佔頻寬**              |
| **資料安全性** | 磁碟格式化（可能被救援）      | 加密銷毀（絕對無法復原）      |
| **硬體支援**   | 所有 Intel/Apple Silicon Mac  | 配備 T2 或 M 系列晶片之 Mac   |

## 三、 標準重置 SOP (Jamf Pro)：

1.  **發送指令** ：
    - 對目標電腦群組發送 **「清除電腦 (Wipe Computer)」** 指令。
    - **關鍵** ：針對 Apple Silicon 與配備 T2 晶片的 Mac，此指令會觸發 **EACS (Erase All Content and Settings)** 。

1.  **執行過程 (數分鐘內)** ：
    - 系統會瞬間丟棄加密金鑰（Cryptographic Erase），資料幾秒內即無法讀取。
    - 電腦重開機，回到「哈囉 (Hello)」畫面。

1.  **自動部署 (Zero-Touch)** ：
    - 電腦連上網路（需規劃好免驗證 Wi-Fi 或有線網路）。
    - 自動觸發 **ADE (自動裝置註冊)** 。
    - 自動從 Jamf Pro 下載 **PreStage Enrollment** 設定。
    - 自動建立管理員帳號、安裝軟體、套用設定。

## 與傳統還原卡的差異 ：

- 傳統還原卡是「開機即還原」。
- 現代 Mac 管理是「學期末/專案結束時」執行一次 EACS 重置。
- 若需每日還原（如圖書館公用機），則需透過 **「Guest User (訪客模式)」** 設定登出即刪除資料，或使用專門的 kiosk 軟體 (如 Deep Freeze Mac 版，但支援度需確認)。

---

## File: mac-7.md

---

id: mac-7

title: "M 系列晶片 (Apple Silicon) 的 Mac 在管理上有什麼特殊限制？"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: false

## tags: ["Apple Silicon", "Bootstrap Token", "安全啟動", "核心延伸功能"]

**Apple Silicon (M1-M5) 的安全性架構與 Intel Mac 完全不同。管理核心在於「Bootstrap Token」與「擁有權 (Ownership)」。若未正確設定，MDM 將無法執行軟體更新或安裝核心外掛。**

## 關鍵技術指標：

### 1. Bootstrap Token (引導代令)

- **問題** ：在 Apple Silicon 上，部分高權限操作（如安裝軟體更新、啟用核心延伸功能）需要「安全代令」。
- **解法** ：確認 Jamf Pro 的 **PreStage Enrollment** 已勾選「允許 MDM 上傳 Bootstrap Token」。
- **驗證** ：在 Jamf Pro 電腦紀錄中，確認 `Bootstrap Token Allowed` 為 `Yes`。若為 No，許多管理指令會失敗。

### 2. Volume Ownership (磁碟擁有權)

- 只有被視為「擁有者」的使用者才能執行系統重置或更新。
- 透過 ADE 註冊並建立的第一個帳號會自動獲得擁有權。MDM 透過 Bootstrap Token 託管此權限。

### 3. 核心延伸功能 (Kernel Extensions / KEXTs)

- Apple Silicon 預設 **封鎖** 所有第三方 KEXTs。
- 若必須安裝（如舊款防毒軟體），必須重開機進入 Recovery Mode 降低安全性設定（Reduced Security）。
- **現代建議** ：請改用 **系統延伸功能 (System Extensions)** ，這是 Apple 推薦的新架構，可直接透過 MDM 設定檔授權，無需降低系統安全性。

---

## File: mac-8.md

---

id: mac-8

title: "為什麼 MDM 要求開啟 FileVault？使用者忘記登入密碼時該如何救援？"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: true

## tags: ["FileVault", "全磁碟加密", "資料安全", "復原密鑰", "Jamf Pro", "資產"]

**FileVault 是 macOS 內建的「全磁碟加密」技術，能確保電腦遺失時資料無法被竊取。透過 MDM 託管「復原密鑰 (Recovery Key)」，管理員可在使用者忘記密碼時協助解鎖。**

## 技術原理：

- **XTS-AES-128 加密** ：未登入前，硬碟資料處於加密亂碼狀態。
- **效能影響** ：現代 Mac 透過 Secure Enclave 硬體處理加密，對日常效能幾乎無影響。
- **2026 年新體驗：Platform SSO Boot to Desktop** ：
  - 在 macOS 26 中，配合 PSSO，使用者只需在 FileVault 畫面輸入一次密碼，即可直接「進入桌面」，系統會自動處理後續的 IdP 驗證與登入。
  - 這解決了以往 FileVault 與 系統登入 需要「輸入兩次密碼」的痛點。

## Jamf Pro 部署與託管流程 (SOP)：

1.  **建立設定描述檔 (Configuration Profile)** ：
    - 前往 **「設定描述檔」** > **「+ 新增」** > 選擇 **「FileVault」** 。
    - 設定為 **「需要 FileVault (Require FileVault)」** 。
    - **關鍵步驟** ：務必設定 **「建立個人復原密鑰」** 並選擇 **「將個人復原密鑰託管給 MDM」** 。

1.  **使用者端啟用** ：
    - 派送後，使用者下次登出或重開機時，系統會提示啟用加密。
    - **注意** ：只有當使用者完成此步驟，加密狀態變為「已加密」後，Jamf Pro 才會收到金鑰。

## 救援情境：查詢復原密鑰 (Recovery Key)

若使用者忘記密碼，管理員需至後台查詢。

1.  **進入資產頁面** ：
    - 登入 Jamf Pro，使用 **「搜尋資產」** 找到該電腦。
    - 點選進入詳細頁面，切換至 **「資產 (Inventory)」** 頁籤 > **「磁碟加密 (Disk Encryption)」** 。

1.  **確認加密狀態與金鑰** ：
    - 首先檢查 **「已啟用 FileVault 2」** 是否為 **「Encrypted (已加密)」** 或 **「已啟用」** 。
    - **若已加密** ：您會看到 **「個人復原密鑰 (Personal Recovery Key)」** 欄位，點選旁邊的 **「顯示密鑰 (Show Key)」** 按鈕即可取得代碼。
    - **若未加密** ：該欄位不會出現，代表加密尚未完成或金鑰未成功回傳，此時無法透過 MDM 救援。

1.  **執行解鎖** ：
    - 在 Mac 登入畫面點擊問號 (?) 或輸錯三次密碼，選擇 **「使用復原密鑰重置密碼」** 並輸入代碼。

## 實務建議：重要注意事項

- **資料遺失風險** ：若 FileVault 已開啟 but Jamf Pro 顯示「Unknown」或無金鑰，代表託管失敗。此時若忘記密碼，資料將 **永久無法救回** ，只能清除重灌。
- **機構復原密鑰 (IRK)** ：現代管理建議優先使用「個人復原密鑰 (PRK)」機制，安全性較高。

---

## File: mac-9.md

---

id: mac-9

title: "Jamf 的 Script (腳本) 功能 can do what? How to create and run?"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: false

## tags: ["自動化", "Shell Script", "Zsh", "政策", "腳本", "jamfHelper"]

**腳本 (Scripts) 讓管理員能以 Root 權限在 Mac 上執行 Shell 指令，實現標準 MDM 描述檔 (Payload) 無法達成的進階客製化功能。**

Jamf Pro 的強大之處在於其專屬的二進位檔案 (Binary)，配合 **「政策 (Policies)」** 使用，可達成以下進階場景：

## 常見應用場景：

| 場景           | 腳本功能範例                                                                                        |
| :------------- | :-------------------------------------------------------------------------------------------------- |
| **使用者互動** | 使用 `jamfHelper` 彈出全螢幕公告或倒數計時視窗。                                                    |
| **系統清理**   | 定期刪除特定的快取檔案、暫存檔或重置印表機系統。                                                    |
| **進階安裝**   | 安裝 Homebrew、Rosetta 2 或呼叫 Installomator 自動更新軟體。                                        |
| **資產回報**   | 蒐集標準庫存欄位以外的資訊（如電池健康度百分比），回傳至 **「延伸屬性 (Extension Attributes)」** 。 |
| **權限管理**   | 暫時賦予使用者 Admin 權限並在指定時間後移除。                                                       |
| **AI 自動化**  | 透過腳本預先觸發 Apple Intelligence 模型的本機索引或語意搜索初始化。                                |
| **Swift 腳本** | 2026 年新趨勢：使用 Swift 撰寫更安全、更高效且支援原生 API 的自動化程式。                           |

## 2026 年趨勢：DDM 正在取代「重複性腳本」

以前需要靠腳本定期檢查系統狀態，現在 macOS 26 推薦使用 **DDM (宣告式管理)** 。

- **例子** ：以前用腳本定期刪除 `/tmp/` 下的大型快取，現在可定義 DDM 政策讓系統「原地自修 (Self-Healing)」，效能更好且更即時。

## 建立與部署流程 (SOP)：

1.  **撰寫腳本** ：
    - 建議使用 **Zsh** (`#!/bin/zsh`)，這是現代 macOS 的預設 Shell。 **注意：macOS 12.3 起已移除內建 Python 2.7，若需執行 Python 腳本需自行部署直譯器。**

1.  **上傳至 Jamf Pro** ：
    - 前往 **「設定」** > **「電腦管理」** > **「腳本 (Scripts)」** 。
    - 點選 **「+ 新增」** ，輸入顯示名稱並貼上腳本內容。
    - **參數設定** ：可設定 `$4` 到 `$11` 的參數標籤，讓同一支腳本透過不同政策帶入不同變數（例如：設定印表機 IP）。

1.  **透過政策執行** ：
    - 前往 **「電腦」** > **「政策 (Policies)」** > **「+ 新增」** 。
    - 設定 **「觸發程序 (Trigger)」** （如：報到 Recurring Check-in、登入時）。
    - 設定 **「腳本 (Scripts)」** 承載資料，選取剛才上傳的腳本。
    - 設定 **「範圍 (Scope)」** 指派給目標電腦。

1.  **執行頻率 (Frequency)** ：
    - 務必設定頻率（例如： **Once per computer** 僅執行一次，或 **Ongoing** 每次觸發都執行）。

## 實用範例：使用 jamfHelper 顯示公告

這是 Jamf 內建最強大的通知工具，位於 `/Library/Application Support/Jamf/bin/jamfHelper.app`。

```bash
#!/bin/bash

## 設定變數

HELPER="/Library/Application Support/JAMF/bin/jamfHelper.app/Contents/MacOS/jamfHelper"

TITLE="學校 資訊組公告"

HEADING="軟體更新通知"

DESC="您的電腦將在 10 分鐘後進行安全性更新，請儲存手邊的工作並連接電源。"

## 執行視窗

"$HELPER" -windowType utility -title "$TITLE" -heading "$HEADING" -description "$DESC" -button1 "我已了解" -defaultButton 1

```

## 實務建議：專家提示

- **權限** ：Jamf Pro 執行的腳本預設皆為 **Root (系統最高權限)** ，請務必先在測試機上驗證，以免誤刪重要系統檔。
- **登入使用者的執行** ：若需以當前登入使用者的身分執行指令（例如修改使用者的 Dock），需使用 `sudo -u $(stat -f%Su /dev/console) command` 的語法切換身分。

---

## File: mac-10.md

---

id: mac-10

title: "Jamf Pro 預設的「資產」報告中沒有我要的資訊（如特定檔案版本、最後重開機時間），該如何自訂收集？"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: false

## tags: ["延伸屬性", "Extension Attributes", "腳本", "資產", "客製化欄位"]

**請使用「電腦延伸屬性 (Computer Extension Attributes)」功能。**

**這是 Jamf Pro 用於擴充資料庫欄位、收集非標準硬體/軟體資訊的核心工具。**

標準的 Jamf Pro 資產檢視雖然已包含硬體規格、作業系統、應用程式清單等資訊，但面對特殊管理需求（例如：檢查某個特定設定檔是否被竄改、電池循環次數、或是自訂的財產編號），就需要透過「延伸屬性」來達成。

**2026 年新典範：DDM 狀態頻道 (Status Channel)**

除了傳統的「更新資產」外，macOS 26 推薦使用 DDM 狀態頻道：

- **即時性**：裝置狀態（如 CPU 負載、磁碟空間、金鑰狀態）一旦變更，裝置會主動「報信」給 Jamf Pro，不再需要等待每週期的資產掃描。

- **低負載**：僅回傳變更的欄位，大幅減輕伺服器負擔。
- **實務建議**：對於需要精確掌握狀態的欄位（如安全軟體是否執行），應優先掛載 DDM 狀態頻道。

**建立步驟 (SOP)：**

1. **路徑**：前往右上角 **「設定 (Settings)」** > **「電腦管理」** > **「延伸屬性」**。

1. **新增**：點選 **「+ 新增」**。
1. **設定屬性**：
   - **顯示名稱**：欄位名稱（例如：Last Reboot Time）。
   - **輸入類型 (Input Type)**：選擇 **「腳本 (Script)」**。
   - **資料類型**：選擇 String (字串)、Integer (整數) 或 Date (日期)，這會影響後續智慧型群組的判斷邏輯（如「大於/小於」或「包含」）。

1. **撰寫腳本**：
   - 在編輯器中貼上 Shell Script。
   - **關鍵語法**：Jamf Pro 僅會讀取被 `<result>` 與 `</result>` 標籤包住的輸出值。
   - **任何未被標籤包住的 echo 輸出僅會出現在除錯日誌中，不會寫入資料庫。**

**實戰範例：收集「系統運作天數 (Uptime)」**

```bash
#!/bin/bash

## 取得系統運作時間並回傳給 Jamf Pro

## 這裡使用 awk 抓取 uptime 指令輸出的天數部分

days=$(uptime | awk '{ print $3 }')

echo "<result>$days</result>"

```

**進階應用場景：**

- **合規性檢查**：撰寫腳本檢查特定資安軟體（如 CrowdStrike 或 SentinelOne）的守護程序 (Daemon) 是否運作中。若回傳 "Stopped"，該電腦自動落入「不合規群組」並觸發修復政策。

- **行政管理**：將輸入類型設為 **「彈出式選單 (Pop-up Menu)」**，定義如「教務處」、「學務處」、「總務處」等選項，讓管理員在發放裝置時手動選取歸屬單位，便於分群管理。

**實務建議：專家提示**

- **執行效能**：延伸屬性腳本會在 **每次** 資產更新時執行。請避免撰寫耗時過長（如 `find / ...` 掃描全硬碟）的腳本，以免拖慢全校電腦的資產回報速度或造成系統卡頓。

---

## File: mac-11.md

---

id: mac-11

title: "Mac 安裝軟體時顯示「來自未識別的開發者」或「無法打開」，如何解決？"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: false

## tags: ["Gatekeeper", "安全性", "公證", "Notarization", "軟體安裝"]

**這是 macOS 的 Gatekeeper 安全機制。對於教學所需但未經公證的軟體，建議透過「右鍵開啟」繞過，或由 MDM 統一派送以避免隔離標記。**

Apple 強制要求所有 macOS 軟體必須經過 **「公證 (Notarization)」**，以確保不含惡意程式碼。若軟體太舊或開發者未向 Apple 註冊，就會被系統阻擋。

**使用者端的解決方案 (SOP)：**

**方法一：右鍵開啟 (單次繞過)**

這是最快速且不降低系統安全性的標準做法。

1. 在 Finder 中找到該 App 圖示。

1. 按住鍵盤 **Control 鍵** (或滑鼠右鍵) 點選該 App。
1. 在選單中點選 **「打開 (Open)」**。
1. 此時跳出的視窗會多出一個 **「打開」** 按鈕，點選後系統會將其加入信任允許名單。

**方法二：系統設定放行**

1. 當出現阻擋訊息時，點選「好」。

1. 前往 **「系統設定 (System Settings)」** > **「隱私權與安全性」**。
1. 在「安全性」區塊下方會顯示「[App 名稱] 已被阻擋」，點選 **「仍要打開 (Open Anyway)」**。
1. 驗證管理者密碼後即可執行。

**管理員端的解決方案 (Jamf Pro)：**

**策略一：透過 Policy 派送 (推薦)**

- **原理**：當軟體透過 Jamf Pro 的政策 (Policy) 安裝時，是由 Jamf Binary 以 Root 權限寫入，通常 **不會** 被標記「網路隔離屬性 (com.apple.quarantine)」。

- **優勢**：使用者開啟時完全不會看到 Gatekeeper 警告，體驗最流暢。

**策略二：移除隔離屬性 (進階排錯)**

若軟體是透過腳本下載 or 複製進去的，可能會帶有隔離標籤。可透過 Jamf 腳本執行以下指令移除：

```bash

## 移除指定 App 的隔離屬性 (慎用)

xattr -r -d com.apple.quarantine /Applications/AppName.app

```

**策略三：調整 Gatekeeper 政策 (不推薦)**

雖然可透過 **「安全性與隱私權」** 描述檔將 Gatekeeper 設定為「允許從任何來源下載」，但這會讓校園電腦暴露在極高的勒索病毒風險下，**資安稽核通常不允許此設定**。

**實務建議：**

若遇到軟體顯示 **「已損毀，應丟到垃圾桶」**，通常不是真的故障，而是該軟體的簽署憑證過期或未經公證。請優先嘗試上述「移除隔離屬性」的指令，通常能起死回生。

---

## File: mac-12.md

---

id: mac-12

title: "如何防止學生進入 Recovery Mode (復原模式) 格式化電腦？"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: false

## tags: ["防篡改", "Recovery Lock", "韌體密碼", "資安", "遠端指令"]

**針對不同架構的 Mac，防護機制有所不同：Intel 機型需設定「韌體密碼」，而 Apple Silicon (M 系列) 則需設定「復原鎖定 (Recovery Lock)」。兩者皆可透過 Jamf Pro 部署。**

Mac 的復原模式功能強大，若未加鎖，任何人只要接觸實體機器，即可透過「抹除磁碟」或「重灌系統」來規備監管。

**保護機制對照表：**

| 架構類型                  | 保護機制                         | 部署方式                       |
| :------------------------ | :------------------------------- | :----------------------------- |
| **Apple Silicon (M1-M5)** | **復原鎖定 (Recovery Lock)**     | 僅能透過 **MDM 遠端指令** 設定 |
| **Intel Mac**             | **韌體密碼 (Firmware Password)** | 透過 **設定描述檔** 或指令設定 |

---

## File: mac-13.md

---

id: mac-13

title: "Google Meet 或 Zoom 想要分享螢幕，卻一直跳出權限請求？MDM 能自動全開嗎？"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: false

tags:
["PPPC", "隱私權限", "TCC", "螢幕錄製", "標準使用者", "Apple Intelligence"]

---

**這是 macOS 的 TCC (透明度、同意與控制) 隱私機制。針對「螢幕錄製」、「麥克風」與「相機」，Apple 強制要求必須由使用者「親自點選同意」，MDM 無法越俎代庖強制開啟。**

但管理員可以透過 Jamf Pro 派送 **PPPC (隱私權偏好設定原則控制)** 描述檔，來解決「標準使用者 (老師)」無法自行修改設定的權限問題。

## 一、 MDM 權限控制能力對照表 (2026 最新版)

| 權限類型                     | MDM 可強制開啟? | 使用者仍需點同意? | 關鍵設定                      |
| :--------------------------- | :-------------- | :---------------- | :---------------------------- |
| **螢幕錄製**                 | ❌ 不可         | ✅ 必須           | 需授權標準使用者可修改        |
| **麥克風 / 相機**            | ❌ 不可         | ✅ 必須           | 僅能「不阻擋」                |
| **輔助使用 (Accessibility)** | ✅ 可以         | ❌ 免             | 可完全靜默授權 (適合遠端控制) |
| **完整磁碟存取**             | ✅ 可以         | ❌ 免             | 可完全靜默授權 (適合防毒軟體) |
| **Apple Intelligence**       | ⚠️ 部分         | ✅ 必須           | 書寫工具可透過 Profile 限制   |
| **iPhone 鏡像輸出**          | ❌ 不可         | ✅ 必須           | macOS 26 支援「僅限檢視」模式 |

## 二、 2026 年學校環境的最佳實踐 (SOP)

### 1. 解決「標準使用者」卡關問題 (核心操作)

由於學校老師通常非管理者，當其要允許螢幕錄製時，系統會要求輸入「管理員密碼」。

- **解法**：在 Jamf Pro 的 **「隱私權偏好設定 (PPPC)」** Payload 中。

- **設定**：針對 `Screen Recording` 權限，勾選 **「允許標準使用者允許存取 (Allow Standard Users to allow access)」**。
- **效果**：老師點擊開關時， **不再需要輸入管理員密碼**，即點即用。

### 2. 靜默授權與 AI 功能控管

- **輔助使用**：直接將常用教育 App (如 Zoom, Teams) 設為 **Allow**，減少彈窗。
- **AI 隱私**：針對 macOS 26 的 **書寫工具 (Writing Tools)**，雖然 TCC 無法全開，但可透過「限制 (Restrictions)」描述檔禁用不符合校規的 AI 功能（如 Image Playground）。

## 三、 實務建議

若發現 PPPC 設定檔派送後無效，通常是因為 **Bundle ID** 或 **Code Requirement** 填寫錯誤。建議使用開源工具 **"PPPC Utility"** 來產生正確的代碼特徵，再貼回 Jamf Pro。

**注意**：macOS 26 強化了對「螢幕快照」與「錄製」的通知，即使已授權，系統仍會定期提醒使用者「該 App 正在觀察您的系統」，這是系統級保護，建議向師生說明這是正常安全現象。

---

## File: mac-14.md

---

id: mac-14

title: "學校有多台網路印表機，如何透過 Jamf Pro 派送設定給老師的 Mac？"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: false

## tags: ["印表機", "AirPrint", "lpadmin", "政策", "自助服務", "驅動程式"]

**現代化 Mac 列印部署應優先採用「AirPrint (免驅動)」協定。若需進階設定，則透過「政策 (Policies)」或 Shell 腳本執行 `lpadmin` 指令。**

在過去，Mac 管理員需花費大量時間打包驅動程式 (PPD)。但在 macOS 12 Monterey 之後，Apple 大力推動 IPP/AirPrint 通用協定，大幅簡化了流程。

**部署策略三部曲：**

### 方法一：Jamf Pro 原生政策 (最適合初學者)

Jamf Pro 內建了印表機對應介面，適合標準的網路印表機。

1. **新增印表機**：
   - 前往 **「設定」** > **「電腦管理」** > **「印表機」**。
   - 點選 **「+ 新增」**，輸入 IP 位址與顯示名稱。
   - **關鍵設定**：在「驅動程式」欄位，若印表機支援 AirPrint，可選擇 **「Generic PCL Laser Printer」** 或 **「Generic PostScript Printer」**，通常無需額外安裝廠商驅動。

1. **建立派送政策**：
   - 前往 **「電腦」** > **「政策」** > **「+ 新增」**。
   - 在 **「印表機」** 承載資料中，點選「安裝」剛才建立的印表機。
   - **觸發程序**：建議設為 **「自助服務 (Self Service)」**，讓老師根據自己所在的辦公室位置點選安裝。

### 方法二：Shell Script (進階/免驅動部署)

若需精確控制參數（如使用 `-m everywhere` 呼叫原生 AirPrint 驅動），腳本是最佳解。

```bash
#!/bin/bash

## 定義變數

PRINTER_NAME="Teacher_Office_HP"

DISPLAY_NAME="教務處 HP M404"

ADDRESS="ipp://192.168.1.100/ipp/print" # 請確認印表機支援 IPP

## 執行 lpadmin (使用 -m everywhere 自動抓取 AirPrint 描述檔)

## -E: 啟用印表機

## -o printer-is-shared=false: 禁止這台 Mac 再分享出去

/usr/sbin/lpadmin -p "$PRINTER_NAME" -D "$DISPLAY_NAME" -E -v "$ADDRESS" -m everywhere -o printer-is-shared=false

## (選用) 設定預設選項：啟用雙面列印

/usr/sbin/lpadmin -p "$PRINTER_NAME" -o Duplex=DuplexNoTumble

echo "Printer $DISPLAY_NAME installed successfully."

```

### 方法三：處理舊款需要驅動的印表機

若印表機太舊不支援 AirPrint，必須安裝廠商驅動：

1. **打包驅動**：下載廠商的 `.pkg` 驅動程式，上傳至 Jamf Pro。

1. **安裝驅動**：建立一個政策先安裝該 `.pkg`。
1. **對應 PPD**：
   - 在執行 `lpadmin` 腳本時，需指定 PPD 檔案在本機的路徑 (通常在 `/Library/Printers/PPDs/...`)。
   - 語法：`-P "/Library/Printers/PPDs/Contents/Resources/HP_LaserJet_v10.gz"`

**實務建議：最佳實踐 - 自助服務 (Self Service)**

- **痛點**：學校印表機眾多，全校派送會導致老師的選單出現數十台印表機，造成混亂。

- **解法**：將每台印表機做成一個 **「自助服務」** 項目，並附上位置說明（如：「安裝 - 二樓導師室印表機」）。讓老師走到哪、裝到哪，亦可減少驅動衝突。

---

## File: mac-15.md

---

id: mac-15

title: "如何大量部署 Microsoft Office 並啟用授權？電腦教室與行政機有何不同？"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: false

tags:
["Office", "Microsoft 365", "Serializer", "大量授權", "Jamf App Installers"]

---

**最佳實踐是使用「Jamf App Installers」自動部署安裝檔，並依據使用場景區分「序列化 (Serializer)」或「使用者登入」兩種啟用方式。**

請務必使用 Microsoft 官方 CDN 版本（或透過 Jamf 派送）， **嚴禁使用 Mac App Store 版本**，否則將無法支援大量授權功能。

**場景一：電腦教室 / 公用電腦 (Device-Based Licensing)**

電腦教室必須讓學生「坐下即用」，不能要求學生登入微軟帳號。

1. **安裝主程式**：透過 Jamf Pro 的 **「App Installers」** 派送 Microsoft Office 365。

1. **啟用授權 (關鍵)**：
   - 前往微軟大量授權中心 (VLSC) 下載 **「Volume License Serializer (VL Serializer)」** 的 .pkg 檔。
   - 將此 .pkg 上傳至 Jamf Pro 並建立 **「政策 (Policy)」** 安裝。
   - **效果**：安裝後，Office 會認證「這台電腦」的授權，任何使用者開啟 Word 都不需登入即可使用。

**場景二：教職員 / 行政電腦 (User-Based Licensing)**

行政同仁通常擁有個人的 Microsoft 365 (A3/A5) 帳號。

1. **安裝主程式**：同樣透過 **「App Installers」** 派送，確保軟體永遠保持最新。

1. **啟用授權**：
   - 不需安裝 Serializer。
   - 使用者首次開啟 App 時，輸入學校提供的 Microsoft 365 帳號密碼登入即可啟用。
   - **優點**：可存取 OneDrive 與個人雲端紀錄。

**部署 SOP (Jamf Pro)：**

1. **設定 App Installers**：在「電腦管理」>「Mac App」中啟用 Microsoft Office 365 (包含 Teams/Outlook 等)。

1. **建立 Serializer 政策 (僅限教室)**：將 VL Serializer 設為「Once per computer」並派送給教室群組。
1. **設定 MAU (Microsoft AutoUpdate)**：建立設定描述檔，強制設定 MAU 的更新期限 (Deadline)，確保漏洞被修補。

**實務建議：專家提示**

若發生「授權衝突」，通常是因為電腦同時殘留了舊版的 Serializer 與新版登入資訊。建議使用微軟官方的 **License Removal Tool** (可包裝成腳本透過 Jamf 執行) 清除乾淨後再重新部署。

---

## File: mac-16.md

---

id: mac-16

title: "【Sequoia 新功能】如何管理或禁用「iPhone 鏡像輸出 (iPhone Mirroring)」？"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: false

## tags: ["macOS 15", "iPhone Mirroring", "隱私", "限制", "DLP"]

**macOS 15 Sequoia 引入的「iPhone 鏡像輸出」雖然方便，但在校園公用電腦或高機密行政機上存在資料外洩 (DLP) 風險，建議透過 MDM 限制。**

**資安風險：**

當使用者將個人 iPhone 與學校 Mac 配對後，iPhone 的通知、照片與 App 內容可直接投射在 Mac 螢幕上，甚至支援檔案拖曳。這可能導致個資外洩或學生在上課時偷玩手機遊戲。

**Jamf Pro 設定步驟：**

1. **建立/編輯設定描述檔**：前往 **「電腦」** > **「設定描述檔」** > **「限制 (Restrictions)」**。

1. **功能限制 (Functionality)**：
   - 找到 macOS 26 (Tahoe) 專區。
   - **選項 A (完全禁用)**：取消勾選 **「允許 iPhone 鏡像輸出」**。
   - **選項 B (進階控制)**：勾選並設定為 **「僅限檢視 (View Only)」** 模式。
   - **選項 C (安全加強)**：取消勾選 **「允許檔案與剪貼簿同步」**。

1. **派送範圍**：電腦教室建議全禁，行政電腦建議開啟但視情況關閉檔案同步。

**效果**：

設定生效後，即使使用者登入了相同的 Apple 帳號，開啟「iPhone 鏡像輸出」App 時會顯示「由管理員停用」的訊息。

---

## File: mac-17.md

---

id: mac-17

title: "【硬體部署】學校電腦教室改用 Mac mini (M4) 有什麼優勢？"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: false

## tags: ["Mac mini", "M4", "電腦教室", "自動部署", "ADE"]

**Mac mini 憑藉其「零接觸部署 (Zero-Touch)」與「極低功耗」，已成為取代傳統 PC 電腦教室的首選方案。**

**架構師觀點：為何選擇 Mac mini？**

1. **告別 Ghost 還原與零抹除遷移**：
   - **傳統 PC**：需製作龐大的映像檔 (Image)，透過網路派送還原。
   - **Mac mini (M5)**：支援 macOS 26 的 **「零抹除 MDM 遷移 (Zero-Wipe Migration)」**。這代表若學校未來要更換 MDM 品牌（如從中央版轉為學校自建版），無需清除重灌，即可在不影響教學軟體的情況下原地完成移轉。
   - **ADE 自動化**：拆箱插電，開機即自動完成 Office/Adobe 及校園網路設定。
   - **重置**：幾分鐘內即可執行 EACS 快速重置。

1. **空間與能源效率**：
   - M4 晶片的 Mac mini 體積僅 12.7 公分見方，可輕易掛載於螢幕後方，釋放桌面空間。
   - 功耗極低，全負載運作甚至低於傳統 PC 的待機功耗，顯著降低學校電費支出。

1. **AI 教學就緒**：
   - M4 晶片內建強大的神經網路引擎 (NPU)，無需依賴雲端算力即可執行本機 AI 模型教學或 4K 影片剪輯，符合新課綱數位內容需求。

---

## File: mac-18.md

---

id: mac-18

title: "【資產救援】Mac 送修回來或離職交接時被舊 Apple 帳號鎖住 (啟用鎖定)，怎麼辦？"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: false

## tags: ["啟用鎖定", "Activation Lock", "ASM", "解除鎖定", "資產回收"]

**只要該 Mac 屬於學校資產（已加入 ASM），管理員可直接在 Apple School Manager 後台強制解除鎖定，無需聯絡原使用者。**

這是 Apple 針對教育與企業提供的最高權限救援機制，解決「人員離職/畢業後帳號未登出」導致電腦變磚的問題。

**標準解鎖 SOP：**

1. **登入 ASM**：使用管理員帳號登入 [school.apple.com](https://school.apple.com)。

1. **搜尋裝置**：在側邊欄點選 **「裝置 (Devices)」**，輸入該 Mac 的序號。
1. **執行解鎖**：
   - 在裝置詳情頁面，找到 **「啟用鎖定 (Activation Lock)」** 狀態。
   - 點選 **「關閉 (Turn Off)」** 或 **「解除鎖定」**。
   - 系統會跳出確認視窗，點擊確認。

1. **重置裝置**：
   - 解鎖指令送出後，通常幾分鐘內生效。
   - 將 Mac 進入 **復原模式 (Recovery Mode)** 重新安裝 macOS，原本的帳號鎖定畫面將不再出現。

**前提條件：**

- 該裝置必須是 **「自動裝置註冊 (ADE/DEP)」** 的一部分，且已指派給學校的 MDM 伺服器。

- 若為早期自行購買未入庫的機器，需先透過 Apple Configurator 將其加入 ASM 才能使用此功能。

---

## File: mac-19.md

---

id: mac-19

title: "2026 年 macOS 部署與離線安裝進階策略：如何應對大規模新機註冊？"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: false

## tags: ["部署策略", "ADE", "離線安裝", "內容快取", "macOS 26"]

**在 2026 年的校園環境中，零接觸部署 (Zero-Touch) 已經是標準操作。但面對全校性大規模採購（如 M5 Mac mini 教室）時，網路頻寬與 MDM 伺服器的負載將是最大挑戰。**

## 一、 2026 年核心部署策略

### 1. 內容快取伺服器 (Content Caching)

這是大規模部署的命脈。

- **做法**：在各機房或行政大樓放置一台 Mac mini (M5) 專職任務。

- **優勢**：當第一台 Mac 下載 Office 或系統更新後，後續 49 台電腦將直接從該快取機抓取，下載速度可從「小時」縮短為「分鐘」，且不佔用外網頻寬。

### 2. 宣告式註冊 (Declarative Enrollment)

macOS 26 支援更強大的註冊機制。

- **特性**：裝置在註冊成功後，會主動向 MDM「宣示目標狀態」，而不是等待指令。

- **結果**：軟體安裝成功率較以往提升 30%，大大減少了因網路抖動造成的部署失敗。

## 二、 離線安裝與特殊環境應對

若學校教室網路不穩，可採用以下混合策略：

1.  **預載 PKG 策略**：透過外部高速 SSD，將核心 App (如 Adobe CC 離線包) 預錄至外接碟，再配合腳本呼叫 `/usr/sbin/installer` 本機安裝。

1.  **IP 信號隔離派送**：將部署量分散至不同時段，配合 Jamf Pro 的「延遲執行」功能。

## 三、 實務案例：新電腦教室 50 台部署 SOP

1.  **ASM/ADE 綁定**：確保序號已入庫並指向校內 Jamf。
1.  **開箱啟動**：
    - **方法 A (有線網路)**：透過 Thunderbolt 轉 Ethernet 同時啟動 10 台。
    - **方法 B (無線網路)**：配合 WPA 3 預導向 (Managed Wi-Fi) 靜默連線。

1.  **監控 DDM 頻道**：在 Jamf Pro 回報頁面，即時觀察軟體安裝進度。

**建議**：對於 2026 年的主力機型 (M4/M5)，請務必利用其強大的 NPU 加速特性，在部署時同步完成 AI 模型的本機索引初始化，讓學生開機即可使用書寫工具等功能。

---

## File: mac-20.md

---

id: mac-20

title: "macOS 26 的「透過 SSH 解鎖 FileVault」如何設定？有什麼安全考量？"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: false

## tags: ["FileVault", "SSH", "遠端解鎖", "macOS 26", "遠端管理"]

**macOS 26 新增在 Pre-boot 階段透過 SSH 解鎖 FileVault 的功能，解決遠端管理無螢幕主機的痛點。**

## 問題背景

啟用 FileVault 的 Mac 重開機後：

- 停在登入畫面等待密碼解鎖

- Wi-Fi 和遠端連線尚未啟動
- 必須實體鍵盤輸入才能繼續
- 遠端重開機等於失聯

典型情境：機房 Mac mini、多校區 Mac、無螢幕部署。

## 設定需求

1.  **啟用遠端登入**：
    - 「系統設定」>「一般」>「共享」>「遠端登入」
    - 或透過 MDM 推送 `com.apple.RemoteManagement`

1.  **網路連線**：乙太網路（最可靠）或 Pre-boot 可用的 Wi-Fi
1.  **授權使用者**：SSH 帳號必須是 FileVault 授權使用者
1.  **系統版本**：macOS 26 或更新

## 操作流程

遠端解鎖指令：

`SSH -o PreferredAuthentications=password -o PubkeyAuthentication=no username@mac-ip`

輸入密碼後，SSH 會暫時中斷（解鎖中），系統完成開機後可重新連線。

## 安全風險與緩解

| 風險       | 緩解措施                                        |
| :--------- | :---------------------------------------------- |
| 暴力破解   | 限制來源 IP、使用防火牆、強密碼、變更預設連接埠 |
| 中間人攻擊 | 驗證主機金鑰、使用 VPN                          |
| 網路監聽   | 專用管理 VLAN、網路存取控制                     |

## 五、 2026 年新安全性注意事項 (M5 / macOS 26)

**⚠️ 重要警告：** 在搭載 **M5 晶片** 的 Mac 上，Apple 進一步強化了 **Secure Enclave** 的保護機制。

- 若您在 macOS 26 中啟用了「極限安全模式」，SSH 遠端解鎖 FileVault 可能會失效。

- **建議**：對於需要 SSH 遙測解鎖的機房機台，請在 MDM 限制中取消勾選「進階資料保護」相關的強制選項，以確保 Pre-boot 階段的網路棧能正常啟動。

## 適用建議

- **建議啟用**：機房伺服器、無螢幕部署、多校區環境
- **不建議啟用**：電腦教室、公開網路、學生可存取網段

---

## File: mac-21.md

---

id: mac-21

title: "macOS 26 升級後，學生可以看到 MDM 設定的隱私權限，如何處理詢問？"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: false

## tags: ["隱私權限", "透明度", "PPPC", "macOS 26", "使用者溝通"]

**macOS 26 在「系統設定 > 隱私權與安全性」中，會明確標註哪些權限是由組織管理的。**

## 介面變更

### 過去（macOS 15 Sequoia 以前）

- 使用者看到權限已勾選，但不知道是誰設定的
- 權限開關呈現灰色不可變更

### macOS 26

- 標註「由 [組織名稱] 管理」
- 顯示管理圖示
- 使用者仍無法變更，但知道是學校設定的

## 常見疑問與回應角度

### 「為什麼強制開啟麥克風？」

- 讓 Zoom、Google Meet 等視訊軟體正常運作
- 擁有權限不等於正在使用
- macOS 錄音時會顯示橘色指示燈（硬體層級，無法繞過）

### 「螢幕錄製是在監控嗎？」

- 讓學生能在視訊課程中分享螢幕報告
- 權限讓 App 有能力分享，不代表持續監控
- 分享時會顯示綠色指示燈

### 「為什麼不能關閉？」

- 確保教學活動順利進行
- 避免誤關後無法使用相關功能
- 減少重複開啟權限的支援負擔

## 實務建議

### 可考慮準備的說明

- 學校設定的權限清單及原因
- 常見問題回答（FAQ）
- 說明這是 macOS 26 的新設計，非新增監控

### 回應原則

- 承認對隱私的關注是合理的
- 說明每個權限的教學必要性
- 強調 macOS 的保護機制（指示燈、通知等）

---

## File: mac-22.md

---

id: mac-22

title: "macOS 26 是最後支援 Intel Mac 的版本，現有 Intel Mac 可以用多久？"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: true

## tags: ["Intel Mac", "Apple Silicon", "系統支援", "macOS 26", "裝置規劃"]

## Q: macOS 26 是最後支援 Intel Mac 的版本，現有 Intel Mac 可以用多久？

**macOS 26 (Tahoe) 是支援 Intel Mac 的最後一個主要版本（終章版本）。從 2027 年發布的 macOS 27 開始，將僅支援 Apple Silicon（M1-M5 系列）。**

## 支援現況與退場時間表

### 1. macOS 26 支援的最後一支 Intel 隊伍

- **iMac (Retina 5K, 27 吋, 2020)** ：Intel Mac 的巔峰之作。
- **MacBook Pro (16 吋, 2019)**。
- **Mac Pro (2019+)**。
- **注意** ：其餘更舊機型（如 2017 以前）已無法安裝現代 macOS，僅能運作於舊版。

### 2. macOS 27（2026 下半年）

- 僅支援 Apple Silicon（M1/M2/M3/M4/M5）
- Intel Mac 無法升級

## 生命週期

### 1. 安全更新

- macOS 26 停止主要更新後，通常提供 2-3 年安全更新。
- 預估可獲得安全更新至 2028-2029 年。

### 2. 應用程式支援

- 軟體廠商通常支援有安全更新的系統。
- 停止安全更新後，軟體廠商也可能停止支援。

## 現有 Intel Mac 評估

### 1. 透過 MDM 盤點

Jamf Pro 範例：

- 建立 Smart Computer Group

- 條件：`Architecture` = `x86_64`

### 2. 使用情境影響

| 情境                   | 影響評估                                           |
| :--------------------- | :------------------------------------------------- |
| **電腦教室／專業軟體** | 軟體廠商可能逐步停止支援 Intel 版本                |
| **行政文書**           | Office、瀏覽器等對版本要求較低，可用至安全更新結束 |
| **教師教學**           | 視使用軟體而定                                     |

## 時間軸參考

- **2026-2027** ：Intel Mac 停留在 macOS 26，仍可正常使用。
- **2027-2028** ：軟體支援逐步減少。
- **2029 之後** ：安全更新結束，建議更換或轉為非連網用途。

## Apple Silicon 特點

- M1/M2/M3/M4/M5 系列在效能、電池續航力上領先 Intel。
- macOS 和 Apple App 針對 Apple Silicon 優化。
- 原生支援 iOS/iPadOS App。

---

## File: mac-23.md

---

id: mac-23

title: "【課室秩序】如何透過 MDM 控管或禁用「iPhone 鏡像輸出」，防止學生在課堂中進行遠端干擾？"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: false

## tags: ["iPhone 鏡像輸出", "教室管理", "限制", "macOS 26", "教學端控制"]

**macOS 26 針對「iPhone 鏡像輸出」提供了更精細的控制，資訊組長可以根據「教室共享機」或「行政專用機」設定不同的權限層級。**

在學校環境中，最擔心的情境是學生操作教室後方的共享 Mac，卻映射了自己 iPhone 上的社交訊息或不當遊戲畫面，干擾課堂進行。

## 一、 2026 年三種管控模式 (SOP)

您可以依據電腦所在的群組（Smart Groups），在 Jamf Pro 的「Restrictions」中套用以下 Payload：

1.  **完全禁用 (High Security)**：
    - **對象**：電腦教室、圖書館檢索區。
    - **設定**：取消勾選 `Allow iPhone Mirroring`。
    - **效果**：學生嘗試配對 iPhone 時會直接顯示「您的組織已停用此功能」。

1.  **僅限檢視模式 (View Only)**：
    - **對象**：教師用機（投影至大螢幕時）。
    - **設定**：勾選 `Force View-Only Mirroring`。
    - **效果**：iPhone 畫面可以顯示 Map 上（便於展示學生作品），但無法使用 Mac 的鍵盤滑鼠操作該 iPhone。

1.  **禁用檔案傳輸 (DLP Focus)**：
    - **對象**：行政處室電腦。
    - **設定**：取消勾選 `Allow File and Clipboard Sync with iPhone Mirroring`。
    - **效果**：可遠端操作 iPhone，但禁止將 iPhone 上的檔案直接拖曳進 Mac，防止公務個資外洩。

## 二、 實務營運建議

- **自動化策略**：建議利用 Jamf Pro 的「時間排程 (Time-Based Policy)」，在授課期間全面切換為「僅限檢視」，課後再開放一般用途。
- **指示燈監控**：提醒師生，當 iPhone 鏡像啟動時，Mac 選單列會出現紫色橫條，iPhone 端也會有顯眼的藍色圖示，便於現場巡堂檢查。

**組長觀點**：對於 M5 晶片的 Mac，鏡像輸出的延遲極低，建議利用「僅限檢視模式」作為「作品展示」的輔助工具，而非全然封殺，以發揮科技教學的最大價值。

---

## File: mac-24.md

---

id: mac-24

title: "【考試防弊】如何管理 Safari 的「干擾控制 (Distraction Control)」，避免學生在網頁檢定中隱藏關鍵 UI？"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: true

## tags: ["Safari", "干擾控制", "考試防弊", "macOS 26", "教學端管理"]

**macOS 26 Safari 推出的「干擾控制」允許使用者點擊並隱藏網頁上的部分元素（如廣告、側欄）。但在電腦化測驗 (CBT) 中，學生可能利用此功能隱藏測驗計時器、剩餘題數或導覽列，造成公平性疑慮。**

## 一、 風險場景

- **練習模式**：學生隱藏「提示」或「規則說明」。
- **正式檢定**：學生隱藏「剩餘時間 (Countdown)」，藉此宣稱未注意到結束時間，或隱藏「監考狀態標籤」。

## 二、 MDM 管控方案 (SOP)

資訊組長應在大型測驗或檢定期間，透過 Jamf Pro 執行以下設定：

### 1. 透過 Configuration Profile 鎖定 (推薦)

- **路徑**：`com.apple.Safari` 網域下的進階設定。
- **設定**：`AllowDistractionControl` = `false`
- **效果**：Safari 目錄下的「干擾控制」功能將變為灰色不可選取，學生無法針對特定測驗頁面發動隱藏指令。

### 2. 測驗模式 (Assessment Mode / AAC)

如果是高規格檢定，建議讓 App 呼叫 Apple 的 **「自動評量控制 (AAC)」**。

- 此模式會強制進入全螢幕，並自動停用所有非必要的系統功能（包含干擾控制、Siri、通知中心）。

## 三、 實務營運建議

1.  **Smart Group 分組**：建立一個「考試機」群組，僅在考前 15 分鐘推送限制設定檔。
1.  **腳本檢查**：考前可透過延伸屬性 (Extension Attributes) 檢查 Safari 的 `DistractionControl` 是否已成功被 MDM 覆寫。

**組長觀點**：雖然「干擾控制」能提升日常閱讀效率，但在資訊素養檢定或校內段考情境下，它是個顯著的防弊漏洞。建議組長在「測驗用設定檔」中，將此選項與「翻譯功能」一併評估是否關閉。

---

## File: mac-25.md

---

id: mac-25

title: "【資安稽核】如何利用 PSSO 實現「開機即登入」，並自動滿足教育部對資安強密碼之要求？"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: false

## tags: ["Platform SSO", "無密碼", "資安規範", "教育部要求", "身分驗證"]

**在 2026 年，藉由 Platform SSO (PSSO) 2.0，學校可以徹底解決「老師密碼太弱」與「登入兩次（FileVault + 系統）」的維運問題。** 透過將本機登入與組織雲端帳號 (Entra ID / Google Workspace) 同步，您可以強制執行符合資安規範的密碼原則，而使用者只需在解鎖磁碟時輸入一次密碼。

## 一、 PSSO 實作流程 (SOP)

1.  **整合雲端帳號** ：
    - 在 Jamf Pro 中設定 PSSO 配置。
    - 選取驗證模式為 **「分層式加密 (Shared Secret)」** 或 **「硬體金鑰 (Hardware Bound Key)」** 。

1.  **開機即登入 (Boot to Desktop)** ：
    - 啟用 **「FileVault 登入與 PSSO 同步」** 功能。
    - **效果** ：使用者在開機第一個畫面（FileVault）輸入密碼後，系統會自動在後台完成組織驗證，直接載入桌面，不再跳出第二次登入視窗。

1.  **強制強密碼原則** ：
    - 由雲端 IdP (如 Microsoft Entra) 統一控管密碼強度（需包含長度、複雜度、定期更換）。
    - **優勢** ：資訊組長無須逐機檢查老师的本機密碼，只要 IdP 通過，即代表符合教育部資安稽核標準。

## 二、 常見資安問答

- **Q: 離線時還能登入嗎？**
  - A: 可以。PSSO 會在本地保留快取認證，確保老師在家中或無網路環境仍能正常上課。

- **Q: 如果老師在雲端改了密碼，本機也要改嗎？**
  - A: 系統會自動提示密碼不一致，引導使用者輸入新密碼並同步本地帳戶，流程極簡。

## 三、 實務營運建議

1.  **分批切換** ：建議先從「行政處室」開始實施，確認穩定後再推行至「教師教學用機」。
1.  **MDM 回報** ：利用 Jamf 的 DDM Status Channel，監聽每台 Mac 的 PSSO 同步狀態是否為 `Healthy`。

**組長觀點** ：PSSO 是 2026 年 Mac 管理的最重要拼圖。它不僅滿足了政府對資安的管控需求，更大幅提升了老師的「使用者體驗」，是 資訊組長展現專業價值的最佳方案。

---

## File: mac-26.md

---

id: mac-26

title: "【新舊互通】2026 混合環境管理：如何設定 Smart Group 正確區分 Intel 與 Apple Silicon 的軟體包？"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: false

## tags: ["混合環境", "Intel Mac", "Apple Silicon", "Smart Group", "部署策略"]

**2026 年是 Intel Mac 邁向生命週期終點的關鍵年。校內同時存在「x86_64 (Intel)」與「arm 64 (M1-M5)」兩種架構，若派錯軟體包，輕則軟體無法執行，重則導致系統不穩。**

## 一、 建立精準的 Smart Group (SOP)

資訊組應在 Jamf Pro 中建立以下基準群組：

### 1. Apple Silicon 群組 (主力)

- **變數** ：`Architecture Type`
- **運算子** ：`is`
- **數值** ：`arm 64` (或 `Apple Silicon`)

### 2. Intel Mac 群組 (退場中)

- **變數** ：`Architecture Type`
- **運算子** ：`is`
- **數值** ：`x86_64`

### 3. Rosetta 2 安裝狀態群組

- 有些 Universal App 仍需要 Rosetta 2 輔助，可建立一個「未安裝 Rosetta」的群組進行自動補抓安裝。

## 二、 部署策略建議

1.  **優先使用 Universal 二進位檔** ：如果廠商提供 Universal 版（如 Chrome、Office），請直接上傳該版本，Jamf 會自動適配。
1.  **區分 PKG 派送** ：
    - 針對專業軟體（如 Adobe 系列、特定實驗軟體），請分別製作 `Soft_v1.0_AppleSilicon.pkg` 與 `Soft_v1.0_Intel.pkg`。
    - 在政策中，將前者派送給 Apple Silicon 群組，後者派送給 Intel 群組。

1.  **App Store Apps (VPP)** ：Apple 伺服器會自動偵測架構下載正確版本，這是最省心的做法，建議優先採用。

## 三、 實務營運建議

- **系統更新路徑** ：Apple 針對不同架構的系統更新檔案不同。在 macOS 26 中，請務必使用 **DDM (宣告式管理)** 進行更新，系統會自動在本地驗證正確性，不再需要組長手動區分。
- **汰換標籤** ：建議在 Intel 群組中附加上「Expected Retirement: 2028」的標籤，便於報廢預算編列。

**組長觀點** ：混合環境的管理關鍵在於「精準分群」。只要 Smart Group 設定正確，後續的軟體部署就不會出錯，這也能讓 資訊組長對於學校資產的健康度有更科學的掌握。

---

## File: mac-27.md

---

id: mac-27

title: "【自動化維管】利用 macOS 26 DDM 設定「智慧能源管理」：兼顧校園節能與凌晨自動更新。"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: false

## tags: ["節能政策", "DDM", "自動更新", "能源管理", "macOS 26"]

**過往「資訊組希望開機更新」與「總務處希望按時關機省電」一直是學校維運的兩難。macOS 26 與 DDM 的結合提供了一個完美的自動化平衡點。**

## 一、 DDM 能源配置策略 (SOP)

透過 macOS 26 的 **系統配置承載資料 (System Configurations)** ，您可以設定以下智慧型邏輯：

1.  **動態睡眠排程 (Dynamic Sleep Schedule)** ：
    - **平日授課** ：設定 20 分鐘閒置即喚醒，確保師生開機即用。
    - **夜間保護** ：設定在 18:00 後進入深層睡眠 (Power Nap)。

1.  **更新優先喚醒 (Update-Initiated Wake)** ：
    - **設定** ：啟用 DDM 中的 `Allow Wake for Managed Activity`。
    - **效果** ：即使 Mac 處於睡眠狀態，當 Jamf Pro 推送 **安全性更新 (Rapid Security Response)** 或 **DDM 軟體配給** 時，Mac 會自動短暫喚醒、完成安裝後再度進入深度睡眠。

1.  **節能回報 (Energy Status Channel)** ：
    - 您可以透過 DDM 狀態頻道監控全校電腦的「電池循環次數」或「處於高效能模式的時數」，作為未來報廢汰換的量化依據。

## 二、 實務營運建議

- **避免實體中斷電源** ：建議總務處不要採取「直接斷大電」的做法，這會導致 M4/M5 機型無法執行夜間背景維護（如本機 AI 索引或系統快取清理）。
- **配合 Nudge 或通知** ：如果更新後需要重啟，利用 DDM 觸發 Nudge 提示老師在隔天早上「一鍵重啟」，而不是在凌晨強制重啟導致未儲存檔案遺失。

## 三、 實務案例

某校將 100 台 M5 Mac mini 透過 DDM 設為「凌晨 2:00 自動定時喚醒 (Power Nap)」並檢查 DDM 更新頻道，平均每台電腦每月電費僅增加不到 5 元，卻能確保系統永遠維持在最新安全版本。

**組長觀點** ：數位校園的管理不應是全天候耗電。透過 macOS 26 的宣告式能源管理，我們能做到「有需要才醒來，沒事就深睡」，徹底解決 資訊組與總務處的多年心結。

---

## File: mac-28.md

---

id: mac-28

title: "【現場救援】Mac 快速重置 (EACS) 後若自動註冊卡住，有哪些離線恢復與修復技巧？"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: true

## tags: ["EACS", "ADE 故障排除", "網路認證", "Terminal 指令", "復原模式"]

**雖然「清除所有內容和設定 (EACS)」非常穩定，但在學校環境中，常因 Wi-Fi 需要網頁認證或防火牆擋掉 Apple 註冊伺服器，導致電腦卡在「遠端管理」註冊畫面。**

## 一、 第一現場診斷：為什麼卡住？

1.  **時間不同步 (最常見)** ：Mac 的系統時間與 Apple 伺服器落差太大，導致 SSL 憑證驗證失敗。
1.  **網路環境限制** ：學校 Wi-Fi 啟用了 802.1X 但尚未下發憑證，或防火牆阻擋了 `*apple.com` 443 埠。
1.  **序號指派錯誤** ：ASM 上的序號未正確指向正確的 MDM 伺服器。

## 二、 常見救援技巧 (SOP)

### 技巧 1：強制同步系統時間 (終端機命令)

在 Setup Assistant 畫面，按下 **Command + Option + T** 開啟終端機（或從選單進入）：

```bash

sntp -sS time.apple.com

## 或是手動設定 (格式: MMDDhhmmYY)

date 0115100026

```

### 技巧 2：手動觸發雲端設定檢查

```bash

sudo profiles renew -type enrollment

```

這會強制 Mac 重新連網詢問 Apple 伺服器：「誰是我的管理程式？」

### 技巧 3：利用 iPhone 熱點

如果學校 Wi-Fi 的防火牆有問題，請先讓 Mac 連接管理員的手機熱點，這通常能繞過校園網管限制，快速完成「註冊 (Enrollment)」階段，進入系統後再由政策切換回校園 Wi-Fi。

## 三、 進階離線恢復模式

若 EACS 完全無法啟動，請進入 **復原模式 (Recovery Mode)** ：

1.  **Apple Silicon (M1-M5)** ：長按電源鍵進入。

1.  **Intel Mac (T2)** ：開機時按住 `Command + R`。
1.  **操作** ：點選「抹除 Mac」並重新啟動，強迫系統重置所有與硬體綁定的安全金鑰 (Secure Enclave)。

**組長觀點** ：遇到大量電腦卡註冊時「莫驚慌」。通常 90% 的問題只要「同步時間」或「換個熱點」就能解決。建議組長在維修 USB 中預載一份包含常見 Apple 高頻域名通訊埠的清單，以便隨時與網管組溝通。

---

## File: mac-29.md

---

id: mac-29

title: "如何透過 Jamf Pro 統一推送系統更新 (iOS/iPadOS/macOS)？"

category: "第一部分：硬體與系統更新 (Hardware & OS Updates)"

important: true

## tags: ["系統更新", "Jamf Pro", "DDM", "軟體更新藍圖", "iOS 更新", "macOS 更新"]

**在 2026 年的 Jamf Pro 中，推送系統更新（iOS/iPadOS/macOS）已全面轉向「宣告式管理 (DDM)」模式。** 這不僅比舊式的遠端指令更穩定，還能讓裝置「自主」處理下載與安裝流程，大幅降低伺服器負載。

## 1. 使用「軟體更新藍圖 (Software Update Blueprints)」

這是目前最推薦且最專業的做法：

1.  進入 **`Settings` > `Device Management` > `Software Update Blueprints`** 。

1.  點選 `New` 並設定目標版本（如：iOS 26.x 或 macOS 26 Tahoe）。
1.  **關鍵設定：強制執行截止日 (Deadline)** ：
    - 您可以設定一個日期（例如：三天後的下午 5 點）。
    - 在截止日之前，使用者會收到溫和的系統提醒。
    - **一旦到達截止日，裝置將無視使用者狀態，強制重新啟動並執行更新。**

1.  將此藍圖指派給目標裝置群組。

## 2. 透過大量動作傳送遠端命令 (傳統方式)

若需要對特定搜尋結果的裝置立即發送更新：

1.  在 `Mobile Devices` 或 `Computers` 的搜尋結果頁面，點選右下角的 **`Action (對所有裝置採取行動)`** 。

1.  選擇 **`Send Remote Commands (傳送遠端命令)`** 。
1.  在遠端命令清單中，選擇 **「更新受監管裝置上的 OS 版」** 。
1.  在 **「更新 OS 選項」** 頁面中，您可以根據需求選擇：
    - **目標版本** ：建議選擇「Latest version based on device eligibility (符合裝置資格的最新版本)」。
    - **採取行動** ：
      - **Download the update for users to install** (下載供使用者安裝)：裝置會先下載好檔案，等到學生有空再點選。
      - **Download and install the update, and restart devices after installation** (下載並安裝，並在安裝後重啟)：強制執行，適合在放學後安排統一更新。

## 3. 2026 年管理重點：macOS 26 Tahoe 與 Intel Mac

- **Legacy 支援** ：macOS 26 是最後一個支援 Intel 處理器 Mac 的版本，對於老舊 Mac，更新時建議預留兩倍的下載時間，並確認 **Bootstrap Token** 已正確代管。
- **DDM 自助性** ：在最新的系統中，裝置會根據 DDM 宣告，自動在夜間充電且閒置時執行更新，成功率明顯高於以往的推送指令。

## 最佳實踐建議：

1.  **避開大考周** ：雖然可以強制更新，但請務必避開考試或重要演示期間，以免裝置進入更新畫面（通常需 15-30 分鐘）影響學生。
1.  **電源確認** ：提醒學生在排程更新的當晚，將 iPad/Mac 插上充電器，這是確保更新成功的最大關鍵。
