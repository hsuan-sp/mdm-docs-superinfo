import { QASection } from "../types";

export const data: QASection[] = [
  {
    title: "第七部分：Mac 電腦進階管理 (Mac Management)",
    items: [
      {
        id: "mac-1",
        question: "Mac 需要綁定 AD (Active Directory) 嗎？現代化的建議是什麼？",
        important: true,
        tags: ["AD", "身分認證", "Jamf Connect", "Platform SSO", "No-Bind"],
        answer: `
**高度建議不要綁定 AD (No-Bind 策略)。請改用「平台單一登入 (Platform SSO)」或 Jamf Connect。**

傳統將 Mac「綁定 (Bind)」至 AD 網域的做法，在行動辦公與資安零信任（Zero Trust）架構下已顯得笨重且不可靠。

**為何拋棄 AD 綁定？**
1.  **行動化障礙**：筆電一旦離開校園內網，無法連線 DC (網域控制站)，導致密碼無法同步或登入緩慢。
2.  **鑰匙圈 (Keychain) 災難**：AD 密碼變更後，Mac 本機的鑰匙圈密碼往往不會同步更新，導致使用者頻繁遭遇彈窗報錯。
3.  **Apple 政策**：Apple 已不再積極維護 AD Plugin，並建議轉向現代化驗證。

**近年的主流替代方案：**

**方案 A：平台單一登入 (Platform SSO) — 原生推薦**
自 macOS 13 Ventura 起，Apple 與微軟/Google 合作推出的原生功能。
*   **運作原理**：利用 MDM 配置 SSO 擴充功能，直接與 IdP (如 Microsoft Entra ID) 溝通。
*   **優勢**：
*   **密碼同步**：Mac 本機密碼可與雲端 Entra ID 密碼保持同步。
*   **Token 整合**：登入 Mac 後，Safari 與系統服務會自動登入 Microsoft 365 / Google Workspace。
*   **Touch ID 支援**：macOS 15 (Sequoia) 更支援透過與 IdP 綁定的 iPhone 或硬體金鑰進行無密碼登入。

**方案 B：Jamf Connect — 進階管控**
若學校需要更客製化的登入畫面（如顯示校規、倒數計時）或使用非主流 IdP。
*   **Just-in-Time (JIT) 佈建**：使用者第一次開機時輸入雲端帳號，Jamf Connect 會即時建立對應的本機帳戶。
*   **多因素驗證 (MFA)**：強制使用者在登入 Mac 時通過手機 MFA 驗證，資安等級最高。

**遷移建議**：
若貴校仍有大量 Mac 綁定 AD，請優先計畫「解除綁定 (Unbind)」專案，並導入 Platform SSO，這能大幅減少資訊組長處理「密碼不同步」工單的數量。
    `,
      },
      {
        id: "mac-2",
        question: "如何管理 Mac 的本機管理者權限 (Local Admin)？",
        tags: ["帳號權限", "LAPS", "資安", "Privileges", "最小權限原則"],
        answer: `
**最佳實踐是「日常使用標準帳戶」搭配「LAPS (本機管理員密碼解決方案)」。嚴禁讓使用者長期持有 Admin 權限。**

給予教師或學生 Admin 權限是校園資安的最大破口，這會導致防毒軟體被關閉、惡意軟體被安裝，甚至整個內網被勒索病毒加密。

**管理策略三部曲：**

**1. 剝奪常駐權限 (Standard User)**
*   所有教職員配發的 Mac，預設登入帳號應為 **「標準使用者 (Standard User)」**。
*   在此權限下，使用者無法修改系統核心設定或安裝系統級軟體。

**2. 導入 LAPS (Local Administrator Password Solution)**
*   **痛點**：以往 IT 會在所有電腦設定一個通用的 admin 密碼（如 \`School2025!\`），一旦洩漏全校淪陷。
*   **解法**：Jamf Pro 內建 LAPS 功能，能確保每台 Mac 的隱藏管理員密碼 **「皆不相同」** 且 **「定期自動輪換」**。
*   **操作**：當 IT 需要維修某台電腦時，至 Jamf Pro 後台查詢該機當下的隨機密碼，使用後系統會自動在下次連網時更換新密碼。

**3. 自助權限提升 (Privileges App)**
*   若老師偶爾需要安裝驅動程式怎麼辦？
*   **工具**：部署 **Privileges** (免費開源工具) 或 Jamf 內建的類似功能。
*   **流程**：老師點選 Dock 上的鎖頭圖示 > 說明理由 > 獲得 **「20 分鐘的管理員權限」**。時間一到，系統自動將其降回標準使用者。
*   這既給予了方便，又維持了「最小權限原則 (Principle of Least Privilege)」。
    `,
      },
      {
        id: "mac-3",
        question: "如何派送非 App Store 的軟體（如 Chrome, Adobe, Office）？",
        tags: ["軟體派送", "App Installers", "PKG", "自動更新"],
        answer: `
**放棄手動打包。請優先使用 Jamf Pro 的「App Installers」服務，實現「隨選即裝」與「自動更新」。**

在 Mac 管理中，軟體派送曾經是最繁瑣的工作（下載 DMG -> 封裝成 PKG -> 上傳 -> 測試）。現在有更聰明的方法。

**現代化軟體部署層級：**

**Level 1：Jamf App Installers (首選)**
*   **原理**：Jamf 官方維護了一個龐大的軟體庫 (App Catalog)，包含 Chrome, Zoom, Office, Adobe Reader 等數百種常用軟體。
*   **操作**：在 Jamf Pro 中勾選軟體 > 指派給智慧型群組。
*   **優勢**：**全自動化**。當 Chrome 釋出新版時，Jamf 會自動打包並推送到使用者電腦，管理員完全不需介入，確保校園軟體永遠修補好資安漏洞。

**Level 2：Mac App Store (VPP)**
*   適用於 Keynote, GarageBand, Goodnotes 等上架於商店的 App。
*   透過 ASM 購買授權 (VPP) 並指派給裝置，可實現靜默安裝與更新。

**Level 3：手動 PKG 部署 (最後手段)**
*   適用於校務行政系統、特定的驅動程式或沒有在 App Catalog 中的冷門軟體。
*   **工具**：使用 **Jamf Composer** 進行快照 (Snapshot) 或封裝。
*   **流程**：將軟體打包為 \`.pkg\` 或 \`.mpkg\` > 上傳至 Jamf Pro > 建立 Policy 派送。

**實務建議**：
對於 Adobe Creative Cloud (CC)，建議使用 Adobe Admin Console 建立 **「Shared Device License (共用裝置授權)」** 的安裝包，再透過 Jamf Pro 派送，以符合電腦教室多人共用的授權規範。
    `,
      },
      {
        id: "mac-4",
        question:
          "Mac 下載軟體時出現「無法打開，因為它來自未識別的開發者」，如何解決？",
        tags: ["Gatekeeper", "安全性", "Notarization", "軟體簽署"],
        answer: `
**這是 macOS 的「Gatekeeper (守門員)」安全機制。管理員可透過 MDM 允許特定開發者，或教導使用者正確的開啟方式。**

Apple 強制要求軟體需經過 **公證 (Notarization)**。若軟體太舊或未簽署，就會被阻擋。

**解決方案：**

**方法 A：使用者端操作 (右鍵開啟)**
這是最簡單的臨時解法，不需降低安全性設定。
1.  在 Finder 中找到該 App。
2.  按住鍵盤 \`Control\` 鍵並點擊 App (或是滑鼠右鍵)。
3.  在選單中選擇 **「打開 (Open)」**。
4.  此時跳出的視窗會多出一個「打開」按鈕，點選後系統會將其加入信任白名單，下次即可直接雙擊開啟。

**方法 B：MDM 統一設定 (System Policy Control)**
若某個教學軟體全校都要用，且都會被擋：
1.  在 Jamf Pro 建立「組態設定檔」。
2.  選擇 **「系統原則控制 (System Policy Control)」** Payload。
3.  雖然可以選擇「允許從任何來源下載 (Disable Gatekeeper)」，但**極度不推薦**，因為這會讓 Mac 對惡意軟體門戶大開。
4.  **正確做法**：提取該軟體的 **Team ID** 或簽署憑證，將其加入 **「核心延伸功能 (Kernel Extensions)」** 或 **「系統延伸功能」** 的白名單中。

**實務建議**：
若遇到連右鍵都打不開的軟體（顯示「已損毀」），通常是因為該軟體未經公證且被隔離 (Quarantine)。需透過終端機指令 \`xattr -r -d com.apple.quarantine /path/to/app\` 解除隔離，這可透過 Jamf Policy 的 Script 功能統一執行。
    `,
      },
      {
        id: "mac-5",
        question:
          "如何強制 Mac 進行 macOS 系統更新？學生一直按「稍後提醒」怎麼辦？",
        tags: ["系統更新", "DDM", "Nudge", "宣告式管理", "SOP"],
        answer: `
**現在的標準是使用「宣告式裝置管理 (DDM)」。若需更強烈的視覺提醒，則搭配開源工具 "Nudge"。**

與 iOS 不同，macOS 的更新往往涉及長時間重開機，因此 Apple 的設計傾向讓使用者選擇時間，但這常導致校園電腦版本碎片化。

**策略一：DDM 宣告式更新 (macOS 14+ 推薦)**
*   **原理**：這是 Apple 最新的管理協定。管理員設定一個 **「強制執行期限 (Enforcement Deadline)」**。
*   **流程**：
1.  在期限前，系統會溫和提醒使用者更新。
2.  越接近期限，提醒頻率越高。
3.  **一旦過了期限**，系統會強制下載並重開機安裝，使用者無法再推遲。
*   **設定**：在 Jamf Pro 的「組態設定檔」中選擇 **「軟體更新 (Software Update)」** > 設定目標版本與日期。

**策略二：Nudge (強效視覺提醒)**
*   若 DDM 的原生通知不夠顯眼，社群標準工具 **Nudge** 是最佳解法。
*   **功能**：它會跳出一個無法忽視的視窗（可以包含校徽、更新說明），要求使用者更新。若使用者一直拖延，視窗會佔據全螢幕甚至模糊背景應用程式，直到更新完成為止。
*   **部署**：透過 Jamf Pro 派送 Nudge 安裝檔與 JSON 設定檔。

**實務建議**：
對於電腦教室（無人使用的時段），可設定 **「Power Nap」** 與 **「排程開機」**，並發送 MDM 指令在深夜自動執行下載與安裝，避開教學時段。
    `,
      },
      {
        id: "mac-6",
        question: "Mac 電腦教室如何像還原卡一樣，快速清除重置 (Wipe)？",
        tags: ["重置", "EACS", "抹除所有內容", "電腦教室", "Imaging"],
        answer: `
**Apple Silicon (M系列) 時代已不建議，而且可能也無法使用「還原卡」或「Ghost」。請改用「清除所有內容和設定 (EACS)」指令。**

傳統的磁碟映像檔部署 (Monolithic Imaging) 因為已被 Apple 徹底淘汰。現在的重置邏輯是「清除使用者資料 + 保留作業系統 + 自動重新註冊」。

**標準重置 SOP (Jamf Pro)：**

1.  **發送指令**：
*   對目標電腦群組發送 **「清除電腦 (Wipe Computer)」** 指令。
*   **關鍵**：針對 Apple Silicon 與配備 T2 晶片的 Mac，此指令會觸發 **EACS (Erase All Content and Settings)**。

2.  **執行過程 (數分鐘內)**：
*   系統會瞬間丟棄加密金鑰（Cryptographic Erase），數據幾秒內即無法讀取。
*   電腦重開機，回到「哈囉 (Hello)」畫面。

3.  **自動部署 (Zero-Touch)**：
*   電腦連上網路（需規劃好免驗證 Wi-Fi 或有線網路）。
*   自動觸發 **ADE (自動裝置註冊)**。
*   自動從 Jamf Pro 下載 **PreStage Enrollment** 設定。
*   自動建立管理員帳號、安裝軟體、套用設定。

**與傳統還原卡的差異**：
*   傳統還原卡是「開機即還原」。
*   現代 Mac 管理是「學期末/專案結束時」執行一次 EACS 重置。若需每日還原（如圖書館公用機），則需透過 **「Guest User (訪客模式)」** 設定登出即刪除資料，或使用專門的 kiosk 軟體 (如 Deep Freeze Mac 版，但支援度需確認)。
    `,
      },
      {
        id: "mac-7",
        question: "M 系列晶片 (Apple Silicon) 的 Mac 在管理上有什麼特殊限制？",
        tags: ["Apple Silicon", "Bootstrap Token", "安全啟動", "核心延伸功能"],
        answer: `
**Apple Silicon (M1/M2/M3/M4) 的安全性架構與 Intel Mac 完全不同。管理核心在於「Bootstrap Token」與「擁有權 (Ownership)」。**

若未正確配置，MDM 將無法執行軟體更新或安裝核心外掛。

**關鍵技術指標：**

1.  **Bootstrap Token (引導代令)**：
*   **問題**：在 Apple Silicon 上，部分高權限操作（如安裝軟體更新、啟用核心延伸功能）需要「安全代令」。
*   **解法**：確認 Jamf Pro 的 **PreStage Enrollment** 已勾選「允許 MDM 上傳 Bootstrap Token」。
*   **驗證**：在 Jamf Pro 電腦紀錄中，確認 \`Bootstrap Token Allowed\` 為 \`Yes\`。若為 No，許多管理指令會失敗。

2.  **Volume Ownership (磁碟擁有權)**：
*   只有被視為「擁有者」的使用者才能執行系統重置或更新。
*   透過 ADE 註冊並建立的第一個帳號會自動獲得擁有權。MDM 透過 Bootstrap Token 託管此權限。

3.  **核心延伸功能 (Kernel Extensions / KEXTs)**：
*   Apple Silicon 預設**封鎖**所有第三方 KEXTs。
*   若必須安裝（如舊款防毒軟體），必須重開機進入 Recovery Mode 降低安全性設定（Reduced Security）。
*   **現代建議**：請改用 **系統延伸功能 (System Extensions)**，這是 Apple 推薦的新架構，可直接透過 MDM 設定檔授權，無需降低系統安全性。
    `,
      },
      {
        id: "mac-8",
        question:
          "為什麼 MDM 要求開啟 FileVault？使用者忘記登入密碼時該如何救援？",
        important: true,
        tags: [
          "FileVault",
          "全磁碟加密",
          "資料安全",
          "復原密鑰",
          "Jamf Pro",
          "資產",
        ],
        answer: `
**FileVault 是 macOS 內建的「全磁碟加密」技術，能確保電腦遺失時資料無法被竊取。透過 MDM 託管「復原密鑰 (Recovery Key)」，管理員可在使用者忘記密碼時協助解鎖。**

**技術原理：**
*   **XTS-AES-128 加密**：未登入前，硬碟數據處於加密亂碼狀態。
*   **效能影響**：現代 Mac 透過 Secure Enclave 硬體處理加密，對日常效能幾乎無影響。

**Jamf Pro 部署與託管流程 (SOP)：**

1.  **建立設定描述檔 (Configuration Profile)**：
*   前往 **「設定描述檔」** > **「+ 新增」** > 選擇 **「FileVault」**。
*   設定為 **「需要 FileVault (Require FileVault)」**。
*   **關鍵步驟**：務必設定 **「建立個人復原密鑰」** 並選擇 **「將個人復原密鑰託管給 MDM」**。

2.  **使用者端啟用**：
*   派送後，使用者下次登出或重開機時，系統會提示啟用加密。
*   **注意**：只有當使用者完成此步驟，加密狀態變為「已加密」後，Jamf Pro 才會收到金鑰。

**救援情境：查詢復原密鑰 (Recovery Key)**

若使用者忘記密碼，管理員需至後台查詢。

1.  **進入資產頁面**：
*   登入 Jamf Pro，使用 **「搜尋資產」** 找到該電腦。
*   點選進入詳細頁面，切換至 **「資產 (Inventory)」** 頁籤 > **「磁碟加密 (Disk Encryption)」**。

2.  **確認加密狀態與金鑰**：
*   首先檢查 **「已啟用 FileVault 2」** 是否為 **「Encrypted (已加密)」** 或 **「已啟用」**。
*   **若已加密**：您會看到 **「個人復原密鑰 (Personal Recovery Key)」** 欄位，點選旁邊的 **「顯示密鑰 (Show Key)」** 按鈕即可取得代碼。
*   **若未加密 (如您的範例)**：該欄位不會出現，代表加密尚未完成或金鑰未成功回傳，此時無法透過 MDM 救援。

3.  **執行解鎖**：
*   在 Mac 登入畫面點擊問號 (?) 或輸錯三次密碼，選擇 **「使用復原密鑰重置密碼」** 並輸入代碼。

**重要注意事項：**
*   **資料遺失風險**：若 FileVault 已開啟但 Jamf Pro 顯示「Unknown」或無金鑰，代表託管失敗。此時若忘記密碼，資料將**永久無法救回**，只能清除重灌。
*   **機構復原密鑰 (IRK)**：現代管理建議優先使用「個人復原密鑰 (PRK)」機制，安全性較高。
    `,
      },
      {
        id: "mac-9",
        question: "Jamf 的 Script (腳本) 功能可以做什麼？如何建立與執行？",
        tags: ["自動化", "Shell Script", "Zsh", "政策", "腳本", "jamfHelper"],
        answer: `
**腳本 (Scripts) 讓管理員能以 Root 權限在 Mac 上執行 Shell 指令，實現標準 MDM 描述檔 (Payload) 無法達成的進階客製化功能。**

Jamf Pro 的強大之處在於其專屬的二進位檔案 (Binary)，配合 **「政策 (Policies)」** 使用，可達成以下進階場景：

**常見應用場景：**

| 場景 | 腳本功能範例 |
|------|-------------|
| **使用者互動** | 使用 \`jamfHelper\` 彈出全螢幕公告或倒數計時視窗。 |
| **系統清理** | 定期刪除特定的快取檔案、暫存檔或重置印表機系統。 |
| **進階安裝** | 安裝 Homebrew、Rosetta 2 或呼叫 Installomator 自動更新軟體。 |
| **資產回報** | 蒐集標準庫存欄位以外的資訊（如電池健康度百分比），回傳至 **「延伸屬性 (Extension Attributes)」**。 |
| **權限管理** | 暫時賦予使用者 Admin 權限並在指定時間後移除。 |

**建立與部署流程 (SOP)：**

1.  **撰寫腳本**：
*   建議使用 **Zsh** (\`#!/bin/zsh\`)，這是現代 macOS 的預設 Shell。
*   *注意：macOS 12.3 起已移除內建 Python 2.7，若需執行 Python 腳本需自行部署直譯器。*

2.  **上傳至 Jamf Pro**：
*   前往 **「設定」** > **「電腦管理」** > **「腳本 (Scripts)」**。
*   點選 **「+ 新增」**，輸入顯示名稱並貼上腳本內容。
*   **參數設定**：可設定 \`$4\` 到 \`$11\` 的參數標籤，讓同一支腳本透過不同政策帶入不同變數（例如：設定印表機 IP）。

3.  **透過政策執行**：
*   前往 **「電腦」** > **「政策 (Policies)」** > **「+ 新增」**。
*   設定 **「觸發程序 (Trigger)」**（如：報到 Recurring Check-in、登入時）。
*   設定 **「腳本 (Scripts)」** 承載資料，選取剛才上傳的腳本。
*   設定 **「範圍 (Scope)」** 指派給目標電腦。

4.  **執行頻率 (Frequency)**：
*   務必設定頻率（例如：**Once per computer** 僅執行一次，或 **Ongoing** 每次觸發都執行）。

**實用範例：使用 jamfHelper 顯示公告**

這是 Jamf 內建最強大的通知工具，位於 \`/Library/Application Support/JAMF/bin/jamfHelper.app\`。

\`\`\`bash
#!/bin/bash
# 設定變數
HELPER="/Library/Application Support/JAMF/bin/jamfHelper.app/Contents/MacOS/jamfHelper"
TITLE="學校資訊組公告"
HEADING="軟體更新通知"
DESC="您的電腦將在 10 分鐘後進行安全性更新，請儲存手邊的工作並連接電源。"

# 執行視窗
"$HELPER" -windowType utility -title "$TITLE" -heading "$HEADING" -description "$DESC" -button1 "我已了解" -defaultButton 1
\`\`\`

**專家提示：**
*   **權限**：Jamf Pro 執行的腳本預設皆為 **Root (系統最高權限)**，請務必先在測試機上驗證，以免誤刪重要系統檔。
*   **登入使用者的執行**：若需以當前登入使用者的身分執行指令（例如修改使用者的 Dock），需使用 \`sudo -u $(stat -f%Su /dev/console) command\` 的語法切換身分。
    `,
      },
      {
        id: "mac-10",
        question:
          "Jamf Pro 預設的「資產」報告中沒有我要的資訊（如特定檔案版本、最後重開機時間），該如何自訂收集？",
        tags: [
          "延伸屬性",
          "Extension Attributes",
          "腳本",
          "資產",
          "客製化欄位",
        ],
        answer: `
**請使用「電腦延伸屬性 (Computer Extension Attributes)」功能。這是 Jamf Pro 用於擴充資料庫欄位、收集非標準硬體/軟體資訊的核心工具。**

標準的 Jamf Pro 資產檢視雖然已包含硬體規格、作業系統、應用程式清單等資訊，但面對特殊管理需求（例如：檢查某個特定設定檔是否被竄改、電池循環次數、或是自訂的財產編號），就需要透過「延伸屬性」來達成。

**運作原理：**
1.  管理員建立一個延伸屬性欄位，並指定資料來源（最常使用 **腳本 (Script)**）。
2.  電腦在執行 **「更新資產 (Update Inventory)」** 政策時，Jamf Binary 會一併執行這個腳本。
3.  腳本將執行結果 (Result) 回傳給 Jamf Pro 伺服器。
4.  該數值會儲存在電腦的資產紀錄中，並可用於建立 **「智慧型電腦群組 (Smart Computer Groups)」** 的自動篩選條件。

**建立步驟 (SOP)：**

1.  **路徑**：前往右上角 **「設定 (Settings)」** > **「電腦管理」** > **「延伸屬性」**。
2.  **新增**：點選 **「+ 新增」**。
3.  **設定屬性**：
*   **顯示名稱**：欄位名稱（例如：Last Reboot Time）。
*   **輸入類型 (Input Type)**：選擇 **「腳本 (Script)」**。
*   **資料類型**：選擇 String (字串)、Integer (整數) 或 Date (日期)，這會影響後續智慧型群組的判斷邏輯（如「大於/小於」或「包含」）。
4.  **撰寫腳本**：
*   在編輯器中貼上 Shell Script。
*   **關鍵語法**：Jamf Pro 僅會讀取被 \`<result>\` 與 \`</result>\` 標籤包住的輸出值。
*   *任何未被標籤包住的 echo 輸出僅會出現在除錯日誌中，不會寫入資料庫。*

**實戰範例：收集「系統運作天數 (Uptime)」**

\`\`\`bash
#!/bin/bash
# 取得系統運作時間並回傳給 Jamf Pro
# 這裡使用 awk 抓取 uptime指令輸出的天數部分
days=$(uptime | awk '{ print $3 }')
echo "<result>$days</result>"
\`\`\`

**進階應用場景：**
*   **合規性檢查**：撰寫腳本檢查特定資安軟體（如 CrowdStrike 或 SentinelOne）的守護程序 (Daemon) 是否運作中。若回傳 "Stopped"，該電腦自動落入「不合規群組」並觸發修復政策。
*   **行政管理**：將輸入類型設為 **「彈出式選單 (Pop-up Menu)」**，定義如「教務處」、「學務處」、「總務處」等選項，讓管理員在發放設備時手動選取歸屬單位，便於分群管理。

**專家提示：**
*   **執行效能**：延伸屬性腳本會在**每次**資產更新時執行。請避免撰寫耗時過長（如 \`find / ...\` 掃描全硬碟）的腳本，以免拖慢全校電腦的資產回報速度或造成系統卡頓。
    `,
      },
      {
        id: "mac-11",
        question:
          "Mac 安裝軟體時顯示「來自未識別的開發者」或「無法打開」，如何解決？",
        tags: ["Gatekeeper", "安全性", "公證", "Notarization", "軟體安裝"],
        answer: `
**這是 macOS 的 Gatekeeper 安全機制。對於教學所需但未經公證的軟體，建議透過「右鍵開啟」繞過，或由 MDM 統一派送以避免隔離標記。**

Apple 強制要求所有 macOS 軟體必須經過 **「公證 (Notarization)」**，以確保不含惡意程式碼。若軟體太舊或開發者未向 Apple 註冊，就會被系統阻擋。

**使用者端的解決方案 (SOP)：**

**方法一：右鍵開啟 (單次繞過)**
這是最快速且不降低系統安全性的標準做法。
1.  在 Finder 中找到該 App 圖示。
2.  按住鍵盤 **Control 鍵** (或滑鼠右鍵) 點選該 App。
3.  在選單中點選 **「打開 (Open)」**。
4.  此時跳出的視窗會多出一個 **「打開」** 按鈕，點選後系統會將其加入信任白名單。

**方法二：系統設定放行**
1.  當出現阻擋訊息時，點選「好」。
2.  前往 **「系統設定 (System Settings)」** > **「隱私權與安全性」**。
3.  在「安全性」區塊下方會顯示「[App 名稱] 已被阻擋」，點選 **「仍要打開 (Open Anyway)」**。
4.  驗證管理者密碼後即可執行。

**管理員端的解決方案 (Jamf Pro)：**

**策略一：透過 Policy 派送 (推薦)**
*   **原理**：當軟體透過 Jamf Pro 的政策 (Policy) 安裝時，是由 Jamf Binary 以 Root 權限寫入，通常**不會**被標記「網路隔離屬性 (com.apple.quarantine)」。
*   **優勢**：使用者開啟時完全不會看到 Gatekeeper 警告，體驗最流暢。

**策略二：移除隔離屬性 (進階排錯)**
若軟體是透過腳本下載或複製進去的，可能會帶有隔離標籤。可透過 Jamf 腳本執行以下指令移除：
\`\`\`bash
# 移除指定 App 的隔離屬性 (慎用)
xattr -r -d com.apple.quarantine /Applications/AppName.app
\`\`\`

**策略三：調整 Gatekeeper 政策 (不推薦)**
雖然可透過 **「安全性與隱私權」** 描述檔將 Gatekeeper 設定為「允許從任何來源下載」，但這會讓校園電腦暴露在極高的勒索病毒風險下，**資安稽核通常不允許此設定**。

**實務建議：**
若遇到軟體顯示 **「已損毀，應丟到垃圾桶」**，通常不是真的壞了，而是該軟體的簽署憑證過期或未經公證。請優先嘗試上述「移除隔離屬性」的指令，通常能起死回生。
    `,
      },
      {
        id: "mac-12",
        question: "如何防止學生進入 Recovery Mode (復原模式) 格式化電腦？",
        tags: ["防篡改", "Recovery Lock", "韌體密碼", "資安", "遠端指令"],
        answer: `
**針對不同架構的 Mac，防護機制有所不同：Intel 機型需設定「韌體密碼」，而 Apple Silicon (M系列) 則需設定「復原鎖定 (Recovery Lock)」。兩者皆可透過 Jamf Pro 部署。**

Mac 的復原模式功能強大，若未加鎖，任何人只要接觸實體機器，即可透過「抹除磁碟」或「重灌系統」來規避監管。

**保護機制對照表：**

| 架構類型 | 保護機制 | 部署方式 |
| :--- | :--- | :--- |
| **Apple Silicon (M1/M2/M3/M4)** | **復原鎖定 (Recovery Lock)** | 僅能透過 **MDM 遠端指令** 設定 |
| **Intel Mac** | **韌體密碼 (Firmware Password)** | 透過 **組態設定檔** 或指令設定 |

---

**情境一：Apple Silicon (M 系列) 的復原鎖定**

這是一種與 MDM 管理權限綁定的安全機制。設定後，使用者進入「啟動選項 (Startup Options)」時，必須輸入該密碼才能進行復原操作。

**Jamf Pro 設定步驟 (SOP)：**
1.  **發送指令**：
*   進入目標電腦或群組，點選 **「檢視」** > **「管理」** > **「遠端指令 (Remote Commands)」**。
*   選擇 **「設定復原鎖定 (Set Recovery Lock)」**。
*   設定一組密碼（或選擇隨機生成）。
2.  **查詢密碼**：
*   設定成功後，該密碼會回傳至 Jamf Pro。
*   可在電腦的 **「資產 (Inventory)」** > **「安全性 (Security)」** > **「復原鎖定密碼」** 欄位中查看。
3.  **驗證方式**：
*   將 Mac 關機，長按電源鍵直到出現「正在載入啟動選項」。
*   點選「選項」>「繼續」，此時系統應要求輸入復原鎖定密碼。

---

**情境二：Intel Mac 的韌體密碼**

這是傳統的 EFI 層級密碼，能阻止電腦從外接硬碟開機或重置 PRAM。

**Jamf Pro 設定步驟：**
1.  建立一個新的 **「組態設定檔 (Configuration Profile)」**。
2.  選擇 **「韌體密碼 (Firmware Password)」** 承載資料。
3.  設定密碼，並派送給 Intel 機型群組。
4.  *注意：Intel 機型的密碼若遺失，必須攜帶購買證明至 Apple 原廠解鎖，無法透過 MDM 遠端清除，請務必妥善保存。*

**重要差異與注意事項：**

*   **與「啟用鎖定 (Activation Lock)」的區別**：
*   **啟用鎖定**：綁定 Apple 帳號 (防盜用)。
*   **復原鎖定**：綁定 MDM (防篡改)。學校資產建議兩者並行，但管理權責不同。
*   **維修前置作業**：若 Mac 需要送修，除了關閉「尋找」外，管理員也必須透過 Jamf Pro 發送 **「移除復原鎖定」** 指令，否則維修中心無法進行硬體檢測。
    `,
      },
      {
        id: "mac-13",
        question:
          "Google Meet 或 Zoom 想要分享螢幕，卻一直跳出權限請求？MDM 能自動全開嗎？",
        tags: ["PPPC", "隱私權限", "TCC", "螢幕錄製", "標準使用者"],
        answer: `
**這是 macOS 的 TCC (透明度、同意與控制) 隱私機制。針對「螢幕錄製」、「麥克風」與「相機」，Apple 強制要求必須由使用者「親自點選同意」，MDM 無法越俎代庖強制開啟。**

但管理員可以透過 Jamf Pro 派送 **PPPC (隱私權偏好設定原則控制)** 描述檔，來解決「標準使用者 (老師)」無法自行修改設定的權限問題。

**MDM 權限控制能力對照表 (2025 最新版)：**

| 權限類型 | MDM 可強制開啟? | 使用者仍需點同意? | 關鍵設定 |
| :--- | :--- | :--- | :--- |
| **螢幕錄製** | ❌ **不可** | ✅ **必須** | 需授權標準使用者可修改 |
| **麥克風 / 相機** | ❌ **不可** | ✅ **必須** | 僅能「不阻擋」 |
| **輔助使用 (Accessibility)** | ✅ **可以** | ❌ 免 | 可完全靜默授權 (適合遠端控制軟體) |
| **完整磁碟存取** | ✅ **可以** | ❌ 免 | 可完全靜默授權 (適合防毒軟體) |

**學校環境的最佳實踐 (SOP)：**

**1. 解決「標準使用者」卡關問題 (最重要)**
學校電腦通常將老師設為「標準使用者 (Standard User)」。預設情況下，當老師要允許 Zoom 螢幕錄製時，系統會要求輸入「管理員密碼」，導致老師無法上課。
*   **解法**：在 Jamf Pro 的 **「隱私權偏好設定 (PPPC)」** 承載資料中。
*   **設定**：針對 \`Screen Recording\` (螢幕錄製) 權限，勾選 **「允許標準使用者允許存取 (Allow Standard Users to allow access)」**。
*   **效果**：老師在系統設定勾選螢幕錄製時，**不再需要輸入管理員密碼**。

**2. 靜默授權「輔助使用」**
Zoom 或 Teams 的遠端控制功能需要「輔助使用」權限。
*   **設定**：在 PPPC 中加入 Zoom 的 **Bundle ID** (\`us.zoom.xos\`)，並將 \`Accessibility\` 設為 **「Allow」**。
*   **效果**：使用者不會看到輔助使用的詢問視窗，功能直接可用。

**3. 教育訓練**
由於螢幕錄製無法自動化，請務必製作圖文教學傳給老師：
*   *「第一次使用時，請點選『打開系統設定』，將開關打開，並**重新啟動** Zoom/Meet，或是重新整理網頁。」*

**專家提示：**
若發現 PPPC 設定檔派送後無效（User 仍需輸密碼），通常是因為 **Bundle ID** 或 **Code Requirement** 填寫錯誤。建議使用開源工具 **"PPPC Utility"** 來產生正確的參數，再上傳至 Jamf Pro。
    `,
      },
      {
        id: "mac-14",
        question:
          "學校有多台網路印表機，如何透過 Jamf Pro 派送設定給老師的 Mac？",
        tags: ["印表機", "AirPrint", "lpadmin", "政策", "自助服務", "驅動程式"],
        answer: `
**現代化 Mac 列印部署應優先採用「AirPrint (免驅動)」協定。若需進階設定，則透過「政策 (Policies)」或 Shell 腳本執行 \`lpadmin\` 指令。**

在過去，Mac 管理員需花費大量時間打包驅動程式 (PPD)。但在 macOS 12 Monterey 之後，Apple 大力推動 IPP/AirPrint 通用協定，大幅簡化了流程。

**部署策略三部曲：**

**方法一：Jamf Pro 原生政策 (最適合初學者)**
Jamf Pro 內建了印表機對應介面，適合標準的網路印表機。
1.  **新增印表機**：
*   前往 **「設定」** > **「電腦管理」** > **「印表機」**。
*   點選 **「+ 新增」**，輸入 IP 位址與顯示名稱。
*   **關鍵設定**：在「驅動程式」欄位，若印表機支援 AirPrint，可選擇 **「Generic PCL Laser Printer」** 或 **「Generic PostScript Printer」**，通常無需額外安裝廠商驅動。
2.  **建立派送政策**：
*   前往 **「電腦」** > **「政策」** > **「+ 新增」**。
*   在 **「印表機」** 承載資料中，點選「安裝」剛才建立的印表機。
*   **觸發程序**：建議設為 **「自助服務 (Self Service)」**，讓老師根據自己所在的辦公室位置點選安裝。

**方法二：Shell Script (進階/免驅動部署)**
若需精確控制參數（如使用 \`-m everywhere\` 呼叫原生 AirPrint 驅動），腳本是最佳解。

\`\`\`bash
#!/bin/bash
# 定義變數
PRINTER_NAME="Teacher_Office_HP"
DISPLAY_NAME="教務處 HP M404"
ADDRESS="ipp://192.168.1.100/ipp/print" # 請確認印表機支援 IPP

# 執行 lpadmin (使用 -m everywhere 自動抓取 AirPrint 描述檔)
# -E: 啟用印表機
# -o printer-is-shared=false: 禁止這台 Mac 再分享出去
/usr/sbin/lpadmin -p "$PRINTER_NAME" -D "$DISPLAY_NAME" -E -v "$ADDRESS" -m everywhere -o printer-is-shared=false

# (選用) 設定預設選項：啟用雙面列印
/usr/sbin/lpadmin -p "$PRINTER_NAME" -o Duplex=DuplexNoTumble

echo "Printer $DISPLAY_NAME installed successfully."
\`\`\`

**方法三：處理舊款需要驅動的印表機**
若印表機太舊不支援 AirPrint，必須安裝廠商驅動：
1.  **打包驅動**：下載廠商的 \`.pkg\` 驅動程式，上傳至 Jamf Pro。
2.  **安裝驅動**：建立一個政策先安裝該 \`.pkg\`。
3.  **對應 PPD**：
*   在執行 \`lpadmin\` 腳本時，需指定 PPD 檔案在本機的路徑 (通常在 \`/Library/Printers/PPDs/...\`)。
*   語法：\`-P "/Library/Printers/PPDs/Contents/Resources/HP_LaserJet_v10.gz"\`

**最佳實踐：自助服務 (Self Service)**
*   **痛點**：學校印表機眾多，全校派送會導致老師的選單出現數十台印表機，造成混亂。
*   **解法**：將每台印表機做成一個 **「自助服務」** 項目，並附上位置說明（如：「安裝 - 二樓導師室印表機」）。讓老師走到哪、裝到哪，亦可減少驅動衝突。
    `,
      },
      {
        id: "mac-15",
        question:
          "如何大量部署 Microsoft Office 並啟用授權？電腦教室與行政機有何不同？",
        tags: [
          "Office",
          "Microsoft 365",
          "Serializer",
          "大量授權",
          "Jamf App Installers",
        ],
        answer: `
**最佳實踐是使用「Jamf App Installers」自動部署安裝檔，並依據使用場景區分「序列化 (Serializer)」或「使用者登入」兩種啟用方式。**

請務必使用 Microsoft 官方 CDN 版本（或透過 Jamf 派送），**嚴禁使用 Mac App Store 版本**，否則將無法支援大量授權功能。

**場景一：電腦教室 / 公用電腦 (Device-Based Licensing)**
電腦教室必須讓學生「坐下即用」，不能要求學生登入微軟帳號。
1.  **安裝主程式**：透過 Jamf Pro 的 **「App Installers」** 派送 Microsoft Office 365。
2.  **啟用授權 (關鍵)**：
*   前往微軟大量授權中心 (VLSC) 下載 **「Volume License Serializer (VL Serializer)」** 的 .pkg 檔。
*   將此 .pkg 上傳至 Jamf Pro 並建立 **「政策 (Policy)」** 安裝。
*   **效果**：安裝後，Office 會認證「這台電腦」的授權，任何使用者開啟 Word 都不需登入即可使用。

**場景二：教職員 / 行政電腦 (User-Based Licensing)**
行政同仁通常擁有個人的 Microsoft 365 (A3/A5) 帳號。
1.  **安裝主程式**：同樣透過 **「App Installers」** 派送，確保軟體永遠保持最新。
2.  **啟用授權**：
*   不需安裝 Serializer。
*   使用者首次開啟 App 時，輸入學校提供的 Microsoft 365 帳號密碼登入即可啟用。
*   **優點**：可存取 OneDrive 與個人雲端紀錄。

**部署 SOP (Jamf Pro)：**
1.  **設定 App Installers**：在「電腦管理」>「Mac App」中啟用 Microsoft Office 365 (包含 Teams/Outlook 等)。
2.  **建立 Serializer 政策 (僅限教室)**：將 VL Serializer 設為「Once per computer」並派送給教室群組。
3.  **設定 MAU (Microsoft AutoUpdate)**：建立組態設定檔，強制設定 MAU 的更新期限 (Deadline)，確保漏洞被修補。

**專家提示**：
若發生「授權衝突」，通常是因為電腦同時殘留了舊版的 Serializer 與新版登入資訊。建議使用微軟官方的 **License Removal Tool** (可包裝成腳本透過 Jamf 執行) 清除乾淨後再重新部署。
    `,
      },
      {
        id: "mac-16",
        question:
          "【Sequoia 新功能】如何管理或禁用「iPhone 鏡像輸出 (iPhone Mirroring)」？",
        tags: ["macOS 15", "iPhone Mirroring", "隱私", "限制", "DLP"],
        answer: `
**macOS 15 Sequoia 引入的「iPhone 鏡像輸出」雖然方便，但在校園公用電腦或高機密行政機上存在資料外洩 (DLP) 風險，建議透過 MDM 限制。**

**資安風險：**
當使用者將個人 iPhone 與學校 Mac 配對後，iPhone 的通知、照片與 App 內容可直接投射在 Mac 螢幕上，甚至支援檔案拖曳。這可能導致個資外洩或學生在上課時偷玩手機遊戲。

**Jamf Pro 設定步驟：**
1.  **建立/編輯組態設定檔**：
*   前往 **「電腦」** > **「組態設定檔」** > **「限制 (Restrictions)」**。
2.  **功能限制 (Functionality)**：
*   找到 macOS 15 專區。
*   取消勾選 **「允許 iPhone 鏡像輸出 (Allow iPhone Mirroring)」**。
3.  **派送範圍**：建議優先套用於「電腦教室」、「圖書館公用機」與「行政處室」。

**效果**：
設定生效後，即使使用者登入了相同的 Apple 帳號，開啟「iPhone 鏡像輸出」App 時會顯示「由管理員停用」的訊息。
    `,
      },
      {
        id: "mac-17",
        question: "【硬體部署】學校電腦教室改用 Mac mini (M4) 有什麼優勢？",
        tags: ["Mac mini", "M4", "電腦教室", "自動部署", "ADE"],
        answer: `
**Mac mini (M4) 憑藉其「零接觸部署 (Zero-Touch)」與「極低功耗」，已成為取代傳統 PC 電腦教室的首選方案。**

**架構師觀點：為何選擇 Mac mini？**

1.  **告別 Ghost 還原**：
*   **傳統 PC**：需製作龐大的映像檔 (Image)，透過網路派送還原，維護耗時且驅動程式易衝突。
*   **Mac mini**：結合 **ASM** 與 **Jamf Pro**，新機拆箱插上網路線，開機即自動觸發 **ADE (自動裝置註冊)**。所有軟體 (Office/Adobe)、設定 (印表機/桌布) 自動到位。
*   **重置**：學期末只需發送 **「抹除電腦 (EraseDevice)」** 指令，幾分鐘內回復原廠並自動重新部署。

2.  **空間與能源效率**：
*   M4 晶片的 Mac mini 體積僅 12.7 公分見方，可輕易掛載於螢幕後方，釋放桌面空間。
*   功耗極低，全負載運作甚至低於傳統 PC 的待機功耗，顯著降低學校電費支出。

3.  **AI 教學就緒**：
*   M4 晶片內建強大的神經網路引擎 (NPU)，無需依賴雲端算力即可執行本機 AI 模型教學或 4K 影片剪輯，符合新課綱數位內容需求。
    `,
      },
      {
        id: "mac-18",
        question:
          "【資產救援】Mac 送修回來或離職交接時被舊 Apple 帳號鎖住 (啟用鎖定)，怎麼辦？",
        tags: ["啟用鎖定", "Activation Lock", "ASM", "解除鎖定", "資產回收"],
        answer: `
**只要該 Mac 屬於學校資產（已加入 ASM），管理員可直接在 Apple School Manager 後台強制解除鎖定，無需聯絡原使用者。**

這是 Apple 針對教育與企業提供的最高權限救援機制，解決「人員離職/畢業後帳號未登出」導致電腦變磚的問題。

**標準解鎖 SOP：**

1.  **登入 ASM**：使用管理員帳號登入 [school.apple.com](https://school.apple.com)。
2.  **搜尋裝置**：在側邊欄點選 **「裝置 (Devices)」**，輸入該 Mac 的序號。
3.  **執行解鎖**：
*   在裝置詳情頁面，找到 **「啟用鎖定 (Activation Lock)」** 狀態。
*   點選 **「關閉 (Turn Off)」** 或 **「解除鎖定」**。
*   系統會跳出確認視窗，點擊確認。
4.  **重置裝置**：
*   解鎖指令送出後，通常幾分鐘內生效。
*   將 Mac 進入 **復原模式 (Recovery Mode)** 重新安裝 macOS，原本的帳號鎖定畫面將不再出現。

**前提條件**：
*   該裝置必須是 **「自動裝置註冊 (ADE/DEP)」** 的一部分，且已指派給學校的 MDM 伺服器。
*   若為早期自行購買未入庫的機器，需先透過 Apple Configurator 將其加入 ASM 才能使用此功能。
    `,
      },
    ],
  },
];
