import { QASection } from '../types'

export const data: QASection[] = [
  {
    title: '第七部分：Mac 電腦進階管理 (Mac Management)',
    items: [
      {
        id: 'mac-1',
        question: 'Mac 需要綁定 AD (Active Directory) 嗎？現代化的建議是什麼？',
        important: true,
        tags: ['AD', '身分認證', 'Jamf Connect', 'No-Bind'],
        answer: `
**現代化建議：不要綁定 AD (No-Bind 策略)。改用 Jamf Connect 或平台單一登入 (Platform SSO) 讓使用者以雲端身分登入 Mac，同時與本機帳號同步。**

傳統上，企業與學校會將 Mac 電腦「綁定」至 Active Directory (AD)，讓使用者以 AD 帳號登入。然而，這種做法在現代行動化環境中問題重重。

**傳統 AD 綁定的問題**：

| 問題 | 說明 |
|------|------|
| **行動化困難** | 筆電離開校園網路後，無法連上 AD 進行驗證或密碼變更。 |
| **登入延遲** | 若 AD 伺服器回應慢或無法連線，登入畫面會卡住數分鐘。 |
| **密碼同步問題** | 使用者在 AD 變更密碼後，Mac 本機密碼可能不同步，導致帳號被鎖。 |
| **依賴內網** | 需要 VPN 或實體在校才能正常使用部分功能。 |
| **Apple 趨勢** | Apple 正逐步淘汰對 AD 綁定的支援，推動現代驗證方式。 |

**現代替代方案**：

**方案一：Jamf Connect**

Jamf Connect 是 Jamf 提供的身分驗證解決方案，實現「雲端身分 → Mac 本機帳號」的橋接：

*   **運作方式**：
    1.  使用者在 Mac 登入畫面輸入 Google Workspace 或 Microsoft Entra ID 帳號密碼。
    2.  Jamf Connect 向雲端身分提供者驗證。
    3.  驗證通過後，Jamf Connect 將該密碼同步至 Mac 本機帳號。
    4.  使用者以該密碼登入 Mac。
*   **優點**：
    *   無需 AD 綁定。
    *   校外也能正常登入（只要有網路）。
    *   密碼與雲端帳號保持同步。
    *   支援多因素驗證 (MFA)。

**方案二：平台單一登入 (Platform SSO) — macOS Ventura 及更新**

Apple 在 macOS Ventura (13) 引入的原生功能，與身分提供者 (IdP) 整合：

*   **運作方式**：
    1.  透過 MDM 設定 SSO 擴充功能。
    2.  使用者在登入畫面或首次使用時，以 IdP 帳號完成驗證。
    3.  系統自動處理與本機帳號的關聯。
*   **優點**：
    *   Apple 原生支援，整合度高。
    *   不需額外安裝軟體（如 Jamf Connect）。
*   **2025 年更新 (macOS 15 Sequoia)**：
    *   **Tap to Login**：支援使用與 IdP 連結的硬體金鑰或智慧型手機進行生物辨識登入，無需輸入長密碼。
    *   **離線驗證備援**：進一步強化了在沒有網路時的登入可靠性。
*   **限制**：
    *   需 macOS 13 以上，且 IdP 需支援。

**遷移建議**：

若學校目前仍使用 AD 綁定：
1.  **評估現況**：盤點多少 Mac 綁定 AD，使用者有哪些依賴（如網路磁碟、印表機）。
2.  **規劃雲端 IdP**：確認學校的 Google Workspace 或 Azure AD 設定完善。
3.  **試點導入**：先在資訊組的 Mac 上測試 Jamf Connect。
4.  **逐步遷移**：依部門或年級逐步將 Mac 解除 AD 綁定，改用 Jamf Connect。
5.  **調整相依服務**：網路磁碟改用 OneDrive/Google Drive；印表機改用 IPP 或 AirPrint。
`
      },
      {
        id: 'mac-2',
        question: '如何管理 Mac 的本機管理者權限 (Local Admin)？',
        tags: ['帳號權限', 'LAPS', '資安', '最小權限'],
        answer: `
**最佳實踐是「日常使用標準帳戶」+「LAPS 管理的隨機管理員密碼」。這降低惡意軟體取得根權限的風險，同時保留管理維護能力。**

Mac 的權限管理常被忽視，但對資安至關重要。若所有使用者都以管理員身分操作，一旦下載惡意軟體或被社交工程攻擊，攻擊者即可取得完整系統控制權。

**權限層級說明**：

| 帳號類型 | 權限 | 適用情境 |
|---------|------|---------|
| **標準使用者** | 無法安裝系統層級軟體、修改系統設定、建立新帳號 | 日常辦公、教學使用 |
| **管理員** | 可安裝任何軟體、修改所有設定、管理其他帳號 | IT 維護時使用 |
| **Root** | 最高權限，可修改任何系統檔案 | 極少數進階維護 |

**最佳實踐：LAPS (Local Administrator Password Solution)**

LAPS 是 Jamf Pro 提供的功能，讓每台 Mac 的本機管理員密碼都**隨機生成**且**定期自動更換**：

**運作方式**：
1.  Jamf Pro 在每台 Mac 上建立一個本機管理員帳號（例如：「jamfadmin」）。
2.  該帳號的密碼由 Jamf Pro 隨機生成（例如：複雜的 32 字元密碼）。
3.  密碼儲存於 Jamf Pro 後台，可由授權管理員查詢。
4.  可設定每隔一定時間（如每 30 天）或每次使用後自動更換密碼。

**設定步驟（Jamf Pro）**：
1.  前往「設定」>「全域管理」>「本機管理員密碼管理」。
2.  啟用 LAPS 功能。
3.  設定管理員帳號名稱、密碼長度、更換頻率。
4.  將設定套用至 Mac 群組。

**維護時使用管理員**：
1.  登入 Jamf Pro。
2.  找到目標 Mac 的紀錄頁面。
3.  在「本機管理員密碼」區塊查看當前有效密碼。
4.  使用該密碼於 Mac 上執行需要管理員權限的操作。
5.  操作完畢後，Jamf Pro 可自動更換密碼（若設定了「使用後更換」）。

**日常使用標準帳戶**：
*   教職員的帳號應設定為「標準使用者」。
*   需安裝軟體時，透過 Jamf Pro 的 Self Service 或 Policy 派送，無需使用者輸入管理員密碼。
*   若確實需要臨時管理員權限，可使用「特權存取管理 (Privileges)」工具（開源），讓使用者在限定時間內提升權限。

**風險提醒**：
*   若所有教職員都知道一個共用的管理員密碼，一旦洩漏，所有 Mac 都會受威脅。
*   LAPS 確保每台 Mac 密碼不同且定期更換，大幅降低此風險。

**macOS 15 (Sequoia) 安全限制更新**：
在最新系統中，管理員可以限制 **iPhone 鏡像輸出 (iPhone Mirroring)** 功能，防止使用者在企業 Mac 上存取未受管理的個人 iPhone 內容，降低資料外洩風險。
`
      },
      {
        id: 'mac-3',
        question: '如何派送非 App Store 的軟體（如 Chrome, Adobe, Office）？',
        tags: ['軟體派送', 'Patch Management', 'PKG', 'App Installers'],
        answer: `
**透過 Jamf Pro 的 Policy 功能派送 .pkg 或 .dmg 安裝檔，或使用 Jamf 維護的「App Installers」功能自動部署與更新常用軟體。**

許多教學或辦公必需軟體並非透過 Mac App Store 發布，例如 Google Chrome、Adobe Acrobat Reader、Microsoft Office、Zoom 等。Jamf Pro 提供完整的解決方案。

**方法一：使用 Jamf App Installers（最推薦）**

Jamf 維護了一個常用軟體庫，管理員無需自行打包，Jamf 會自動更新至最新版本：

1.  **登入 Jamf Pro**，前往「設定」>「Jamf Apps」>「App Installers」。
2.  **啟用 App Installers 功能**（若尚未啟用）。
3.  **瀏覽可用軟體**：包含 Chrome, Firefox, Zoom, Slack, VLC 等數百種常用軟體。
4.  **選擇軟體並建立 Policy**：
    *   選擇目標軟體。
    *   設定觸發條件（如：新機註冊時、使用者登入時、Self Service）。
    *   設定 Scope（目標群組）。
5.  **自動更新**：Jamf 會定期更新軟體庫，裝置會自動取得最新版本。

**優點**：無需手動打包、自動更新、Jamf 負責維護。

---

**方法二：手動打包 .pkg 並上傳**

若軟體不在 App Installers 清單中，或需要特定舊版本：

1.  **取得安裝檔**：從官網下載 .pkg 或 .dmg 安裝檔。

2.  **打包（若為 .dmg）**：
    *   使用 **Jamf Composer** 或 **Packages** (開源工具) 將 .dmg 中的 .app 打包成 .pkg。
    *   這確保可透過命令列靜默安裝。

3.  **上傳至 Jamf Pro**：
    *   前往「設定」>「電腦管理」>「套件 (Packages)」。
    *   點選「+ 新增」，上傳 .pkg 檔案。

4.  **建立 Policy**：
    *   前往「電腦」>「原則 (Policies)」>「+ 新增」。
    *   在「套件」區塊選擇剛才上傳的 .pkg。
    *   設定觸發條件與 Scope。

5.  **部署**：Policy 會在符合條件時自動執行安裝。

---

**方法三：使用 Installomator（進階/自動化）**

Installomator 是社群維護的開源 Shell 腳本，可用於自動下載並安裝數百種 App：

1.  在 Jamf Pro 建立 Script，使用 Installomator 的程式碼。
2.  在 Policy 中呼叫該 Script，傳入軟體名稱參數。
3.  Script 會自動從官網下載最新版並安裝。

**優點**：永遠取得最新版，無需手動更新 .pkg。

**軟體更新管理**：
*   建議設定定期 Policy 或使用 Jamf App Installers 的自動更新功能。
*   對於安全性敏感軟體（如瀏覽器），應盡速推送安全更新。
`
      },
      {
        id: 'mac-4',
        question: '為什麼 MDM 要求開啟 FileVault？忘記密碼怎麼辦？',
        important: true,
        tags: ['FileVault', '資料加密', '資安', '復原金鑰'],
        answer: `
**FileVault 是 macOS 的全磁碟加密功能，確保硬碟被拔走時資料無法被讀取。Jamf Pro 會收集復原金鑰，忘記密碼時可用於解鎖。**

在處理學生個資、考試題目、行政文件的教育環境中，FileVault 是保護資料的最後防線。即使電腦被竊或遺失，沒有正確的密碼或復原金鑰，攻擊者無法讀取硬碟資料。

**FileVault 的運作原理**：

*   **加密**：整個開機磁碟使用 AES-XTS 加密。
*   **解密時機**：只有在使用者輸入正確的登入密碼後，系統才會解密並啟動。
*   **效能影響**：現代 Mac（尤其是 Apple Silicon）硬體加速，開啟 FileVault 對效能幾乎無影響。

**啟用 FileVault（透過 Jamf Pro）**：

1.  **建立設定描述檔**：
    *   前往「設定描述檔」>「+ 新增」。
    *   加入「FileVault」Payload。
    *   設定為「延遲啟用」（使用者下次登出時啟用）或「立即啟用」。
    *   **重要**：勾選「將復原金鑰託管至 Jamf Pro」。

2.  **設定 Scope**：套用至所有 Mac。

3.  **使用者體驗**：
    *   使用者登出或重啟時，系統會提示「正在加密磁碟」。
    *   加密過程可能需要數小時（依硬碟大小）。
    *   完成後，每次開機都需輸入密碼解鎖磁碟。

**個人復原金鑰 (Personal Recovery Key)**：

啟用 FileVault 時，系統會生成一組 24 碼的「個人復原金鑰」。若使用者忘記登入密碼：

1.  在登入畫面連續輸錯密碼 3 次。
2.  畫面會顯示「使用復原金鑰重置密碼」選項。
3.  輸入復原金鑰即可重置密碼並解鎖磁碟。

**從 Jamf Pro 查詢復原金鑰**：

1.  登入 Jamf Pro。
2.  找到目標 Mac 的紀錄頁面。
3.  在「安全性 (Security)」或「FileVault」區塊，查看「個人復原金鑰」。
4.  將金鑰提供給使用者。

**金鑰輪換**：
*   部分合規要求在復原金鑰被使用後自動更換。
*   Jamf Pro 可設定在金鑰被查詢或使用後自動輪換。

**注意事項**：
*   **復原金鑰至關重要**：若遺失金鑰且忘記密碼，硬碟資料**永久無法救回**。
*   **機構密鑰 (Institutional Key)**：進階設定，允許使用學校的主金鑰解鎖任何電腦，適合大型機構。

**停用 FileVault（不建議）**：
*   若因特殊原因需停用，必須先解密磁碟（耗時）。
*   即使是測試機，仍建議保持 FileVault 啟用。
`
      },
      {
        id: 'mac-5',
        question: 'Jamf 的 Script（腳本）功能可以做什麼？',
        tags: ['自動化', 'Shell Script', '進階管理', '腳本'],
        answer: `
**Script 功能讓管理員可在 Mac 上執行任意 Shell 腳本，實現 MDM 標準 Payload 無法達成的客製化自動化。可能性無限。**

Jamf Pro 的 Script 是進階管理的核心工具。配合 Policy（原則）執行，可在特定時機自動運行，達成各種系統設定、軟體部署、用戶體驗優化的需求。

**常見應用場景**：

| 場景 | 腳本功能 |
|------|---------|
| **自訂 Dock** | 移除預設 App、加入學校常用軟體圖示 |
| **設定桌布** | 強制套用學校標準桌布圖片 |
| **清理暫存檔** | 定期刪除快取、下載資料夾、瀏覽器歷史 |
| **安裝 Homebrew 軟體** | 自動安裝開發工具或 CLI 工具 |
| **修改系統偏好設定** | 調整滑鼠速度、鍵盤重複率等 GUI 無法批量設定的選項 |
| **使用者通知** | 透過 Jamf Helper 或 Swift Dialog 彈出公告視窗 |
| **健康檢查** | 檢測軟體版本、確認安全性設定、回報至 Extension Attribute |
| **裝置命名** | 根據序號或 AD 屬性自動設定電腦名稱 |

**建立並執行 Script**：

1.  **撰寫腳本**：
    *   使用 Bash, Zsh, Python, Swift 等語言（Mac 支援的直譯器）。
    *   腳本第一行需指定直譯器，如 \`#!/bin/bash\`。

2.  **上傳至 Jamf Pro**：
    *   前往「設定」>「電腦管理」>「腳本 (Scripts)」。
    *   點選「+ 新增」，貼上腳本內容。
    *   設定參數標籤（若腳本需傳入參數）。

3.  **建立 Policy 執行腳本**：
    *   前往「電腦」>「原則 (Policies)」>「+ 新增」。
    *   在「腳本」區塊選擇剛才建立的腳本。
    *   設定觸發條件（如：新機註冊、使用者登入、定期執行、Self Service）。
    *   設定 Scope。

4.  **測試與驗證**：
    *   先在測試群組執行，確認效果正確。
    *   檢視 Policy 執行紀錄，確認腳本成功執行。

**範例腳本：修改 Dock**

\`\`\`bash
#!/bin/bash
# 清空現有 Dock
defaults write com.apple.dock persistent-apps -array

# 加入指定 App
defaults write com.apple.dock persistent-apps -array-add "<dict><key>tile-data</key><dict><key>file-data</key><dict><key>_CFURLString</key><string>/System/Applications/Safari.app</string><key>_CFURLStringType</key><integer>0</integer></dict></dict></dict>"

# 重啟 Dock
killall Dock
\`\`\`

**Jamf Helper（用戶通知）**：

Jamf Pro 內建的 \`jamf helper\` 工具可顯示自訂對話框：
\`\`\`bash
/Library/Application\\ Support/JAMF/bin/jamfHelper.app/Contents/MacOS/jamfHelper \\
  -windowType utility \\
  -title "學校公告" \\
  -heading "重要通知" \\
  -description "系統將於今晚 22:00 進行維護更新，請儲存工作。" \\
  -button1 "瞭解"
\`\`\`

**注意事項**：
*   腳本以 Root 權限執行，務必謹慎測試。
*   避免在腳本中寫死密碼等敏感資訊。
*   善用 Jamf Pro 的參數功能，讓腳本更具彈性。
`
      },
      {
        id: 'mac-6',
        question: '什麼是 Nudge？如何優雅地催促使用者更新 macOS？',
        tags: ['Nudge', '系統更新', '使用者體驗', 'macOS 更新'],
        answer: `
**Nudge 是開源工具，透過漸進式視覺提醒催促使用者更新 macOS，比 MDM 強制更新更友善，同時確保合規時間前完成更新。**

強制使用者立即更新 macOS 常導致抱怨：工作中斷、會議延誤、未儲存的文件遺失。Nudge 提供「溫柔但堅定」的替代方案。

**Nudge 的運作原理**：

1.  **初期提醒**：距離截止日期較遠時，偶爾跳出小視窗提醒「有新版本可用」，視窗可關閉。
2.  **中期加強**：隨著截止日期逼近，視窗跳出頻率增加，且停留時間變長。
3.  **最終強制**：截止日期當天，視窗佔據全螢幕，無法關閉，使用者**必須**更新才能繼續工作。

**可自訂的項目**：

| 設定 | 功能 |
|------|------|
| **視窗外觀** | 學校 Logo、自訂文案、情境說明 |
| **目標版本** | 指定使用者必須更新到的 macOS 版本 |
| **截止日期** | 合規的最終期限 |
| **提醒頻率** | 距截止日多久開始提醒、頻率遞增曲線 |
| **寬限次數** | 使用者可按「稍後提醒」多少次 |
| **強制執行** | 截止日後是否完全阻止使用 |

**部署 Nudge（透過 Jamf Pro）**：

1.  **下載 Nudge**：
    *   從 GitHub ([github.com/macadmins/nudge](https://github.com/macadmins/nudge)) 下載最新版 .pkg。

2.  **上傳至 Jamf Pro**：
    *   前往「設定」>「電腦管理」>「套件」，上傳 Nudge.pkg。

3.  **建立設定描述檔**：
    *   Nudge 透過 JSON 檔案設定。
    *   可使用 Jamf Pro 的「自訂設定 (Custom Settings)」或透過腳本部署 JSON。

4.  **設定檔範例（簡化版）**：
    \`\`\`json
    {
      "optionalFeatures": {
        "acceptableAssertionUsage": false
      },
      "osVersionRequirements": [
        {
          "aboutUpdateURLs": [
            {
              "_language": "zh-TW",
              "aboutUpdateURL": "https://support.apple.com/zh-tw/HT213781"
            }
          ],
          "requiredInstallationDate": "2024-03-15T00:00:00Z",
          "requiredMinimumOSVersion": "14.3.1",
          "targetedOSVersionsRule": "default"
        }
      ],
      "userInterface": {
        "updateElements": [
          {
            "_language": "zh-TW",
            "mainHeader": "需要更新 macOS",
            "mainContentText": "您的 Mac 需要更新至 macOS 14.3.1 以確保安全性。請在 2024 年 3 月 15 日前完成更新。"
          }
        ]
      }
    }
    \`\`\`

5.  **建立 Policy**：
    *   安裝 Nudge.pkg。
    *   部署設定檔。
    *   設定 Launch Agent 讓 Nudge 定期啟動。

**使用者體驗**：
*   視窗會說明為何需更新、如何更新、截止日期。
*   提供「更新」按鈕，點擊直接開啟軟體更新。
*   使用者感受到「有時間準備」而非「被強迫」。

**與 MDM 強制更新的比較**：

| 方式 | 使用者體驗 | 管理員控制 |
|------|-----------|-----------|
| MDM 強制更新 | 差（可能中斷工作） | 最高 |
| Nudge | 佳（漸進提醒） | 高（仍可設定強制） |
| 僅通知不強制 | 佳 | 低（使用者可能忽略） |
`
      },
      {
        id: 'mac-7',
        question: '安裝軟體顯示「來自未識別的開發者」無法打開？',
        tags: ['Gatekeeper', '安全性', '軟體安裝', '公證'],
        answer: `
**這是 macOS 的 Gatekeeper 安全機制。對於經過公證的軟體，可右鍵開啟；對於組織軟體，應透過 MDM 派送以避免此問題。**

Gatekeeper 是 macOS 的核心安全功能，預設只信任來自 Mac App Store 或「已識別的開發者」（已向 Apple 註冊且軟體經過公證）的應用程式。

**為何會出現此訊息**：

| 情況 | 訊息 |
|------|------|
| 軟體未簽署 | 「無法驗證開發者」 |
| 軟體簽署但未公證 (Notarization) | 「Apple 無法確認是否含有惡意軟體」 |
| 軟體來自未知開發者 | 「來自未識別的開發者」 |

**解決方法**：

**方法一：右鍵開啟（單次繞過）**

1.  在 Finder 中找到該應用程式。
2.  **按住 Control 鍵**（或右鍵）點選該 App。
3.  選擇「打開 (Open)」。
4.  在彈出的對話框中再次點選「打開」。
5.  此後該 App 會被信任，可正常開啟。

*   **注意**：這是針對已確認安全的軟體的個別處理方式。

**方法二：系統偏好設定允許**

1.  嘗試開啟 App，出現阻擋訊息。
2.  前往「系統偏好設定」>「隱私權與安全性」。
3.  下方會顯示「[App 名稱] 已被阻擋」，點選「仍要打開」。

**方法三：透過 MDM 派送（建議的企業/學校做法）**

*   透過 Jamf Pro Policy 安裝的軟體不會觸發 Gatekeeper 警告。
*   MDM 安裝的 App 自動被系統信任。
*   這是最適合學校的做法—使用者無需處理安全提示。

**方法四：通知隔離屬性移除（進階）**

macOS 對於從網路下載的檔案會加上「隔離屬性」。移除此屬性可避免 Gatekeeper 檢查：

\`\`\`bash
xattr -r -d com.apple.quarantine /Applications/SomeApp.app
\`\`\`

*   **警告**：僅對已確認安全的軟體執行此操作。

**不建議的做法：關閉 Gatekeeper**

可透過以下命令停用 Gatekeeper：
\`\`\`bash
sudo spctl --master-disable
\`\`\`

但這會**大幅降低系統安全性**，強烈不建議。

**組織的最佳實踐**：
*   所有軟體透過 Jamf Pro 派送。
*   使用者無需了解 Gatekeeper—軟體直接可用。
*   若有特殊軟體需手動安裝，由 IT 人員處理右鍵繞過。
*   定期教育使用者不要隨意繞過安全警告。
`
      },
      {
        id: 'mac-8',
        question: '如何防止學生進入 Recovery Mode 格式化電腦？',
        tags: ['防篡改', 'Recovery Lock', '韌體密碼', '安全'],
        answer: `
**對於 Intel Mac，設定韌體密碼 (Firmware Password)；對於 Apple Silicon Mac，設定 Recovery Lock（復原鎖定）。兩者皆可透過 MDM 部署。**

Mac 的 Recovery Mode（復原模式）提供許多強大功能：重新安裝 macOS、清除硬碟、重置密碼等。若不加保護，任何有實體接觸電腦的人都可進入並執行這些操作。

**保護機制依晶片類型**：

| Mac 類型 | 保護機制 | 設定方式 |
|---------|---------|---------|
| **Intel Mac** | 韌體密碼 (Firmware Password) | MDM 或手動設定 |
| **Apple Silicon (M 系列)** | Recovery Lock (復原鎖定) | 僅 MDM |

---

**Intel Mac：韌體密碼**

韌體密碼會阻止未授權者：
*   從外部磁碟或網路啟動。
*   進入 Recovery Mode。
*   重置 NVRAM/PRAM。

**透過 Jamf Pro 設定**：
1.  建立設定描述檔，加入「韌體密碼 (Firmware Password)」Payload。
2.  設定密碼（建議使用複雜密碼並記錄於安全位置）。
3.  套用至 Intel Mac 群組。

**驗證**：
*   重啟 Mac，嘗試在開機時按住 Command + R 進入 Recovery。
*   應出現鎖頭圖示，要求輸入韌體密碼。

---

**Apple Silicon Mac：Recovery Lock**

M 系列 Mac 的安全架構不同，不使用傳統韌體密碼，而是使用 Recovery Lock：

**透過 Jamf Pro 設定**：
1.  在 Jamf Pro 前往「電腦」>「遠端命令」。
2.  對目標 Mac 選擇「Set Recovery Lock」。
3.  設定密碼。

**或透過設定描述檔**：
1.  建立描述檔，啟用「Recovery Lock」功能。
2.  設定密碼。
3.  套用至 Apple Silicon Mac 群組。

**驗證**：
*   關閉 Mac。
*   長按電源按鈕進入啟動選項。
*   嘗試進入 Recovery，應要求輸入密碼。

**密碼管理**：
*   **記錄密碼**：韌體密碼/Recovery Lock 密碼一旦遺忘，解鎖流程非常麻煩（Intel Mac 需送 Apple 店；Apple Silicon 需 MDM 解除或 Apple 支援）。
*   建議使用密碼管理工具記錄所有 Mac 的密碼。
*   可在 Jamf Pro 中查詢 Recovery Lock 密碼。

**注意事項**：
*   設定後，合法的 IT 維護也需輸入密碼才能進入 Recovery。
*   若 Mac 需送修，可能需先移除密碼保護。
*   Apple Silicon Mac 的 Recovery Lock 與「啟用鎖定 (Activation Lock)」不同—啟用鎖定與 Apple ID 綁定；Recovery Lock 與 MDM 綁定。
`
      },
      {
        id: 'mac-9',
        question: 'Google Meet 或 Zoom 想要分享螢幕，卻一直跳出權限請求？',
        tags: ['PPPC', '隱私權限', 'TCC', '螢幕錄製'],
        answer: `
**這是 macOS 的 TCC (Transparency, Consent, and Control) 隱私機制。螢幕錄製權限必須由使用者手動授予，MDM 無法強制允許。但可透過 PPPC 描述檔簡化其他權限。**

從 macOS Mojave (10.14) 開始，Apple 加強了隱私控制。任何 App 要存取麥克風、鏡頭、螢幕錄製、完整磁碟存取等敏感資源，必須取得使用者明確同意。

**權限類型與 MDM 能力**：

| 權限類型 | MDM 可預先授權? | 說明 |
|---------|----------------|------|
| **麥克風** | ✅ 可以 | PPPC 描述檔可預先允許 |
| **相機/鏡頭** | ✅ 可以 | PPPC 描述檔可預先允許 |
| **輔助使用 (Accessibility)** | ✅ 可以 | 需白名單 App 的 Bundle ID |
| **螢幕錄製 (Screen Recording)** | ❌ 不能強制允許 | Apple 的隱私政策限制 |
| **完整磁碟存取** | ✅ 可以（部分） | 可白名單，但使用者可能仍被提示 |

**為何螢幕錄製無法預先授權**：

Apple 認為螢幕錄製涉及高度敏感資訊（如密碼輸入、私人訊息），必須由使用者主動且明確同意。這是刻意的安全設計，即使 MDM 也無法繞過。

**最佳化使用者體驗**：

**步驟一：部署 PPPC 描述檔（處理可預先授權的權限）**

1.  **使用 PPPC Utility** (開源工具) 或 Jamf Pro 內建功能建立描述檔。
2.  加入目標 App（如 Zoom, Google Meet）的 Bundle ID。
3.  為麥克風、鏡頭等權限設為「允許」。
4.  透過 Jamf Pro 推送描述檔。

這至少可避免使用者每次開會都要處理麥克風/鏡頭權限請求。

**步驟二：提供使用者指引（處理螢幕錄製）**

由於螢幕錄製無法自動授權，需教育使用者：

1.  首次分享螢幕時，會出現「Zoom/Google Meet 想要錄製此電腦螢幕」彈窗。
2.  點選「打開系統偏好設定」。
3.  在「隱私權與安全性」>「螢幕錄製」中，勾選該 App。
4.  可能需重啟 App 才能生效。

**可製作教學文件或內部知識庫文章供教職員參考。**

**步驟三：減少權限疲勞**

*   一旦使用者授予權限，除非 App 更新或系統升級，通常不會再次詢問。
*   建議在新學年開始或新 Mac 發放時，集中處理權限設定。

**常見問題**：
*   **權限已授予但仍無法分享螢幕**：嘗試從「螢幕錄製」列表移除該 App 再重新加入。
*   **使用者是標準帳戶，無法修改系統偏好設定**：部分權限修改需要管理員密碼。可考慮讓 IT 人員協助設定，或提供臨時管理員權限。
`
      },
      {
        id: 'mac-10',
        question: '如何派送印表機設定給老師的 Mac？',
        tags: ['印表機', 'CUPS', '列印', '部署'],
        answer: `
**透過 Jamf Pro 的 Script 或 Policy 執行 \`lpadmin\` 命令加入網路印表機，或使用設定描述檔部署印表機佇列。驅動程式需另行處理。**

Mac 使用 CUPS (Common Unix Printing System) 管理印表機。透過命令列可靜默加入網路印表機，無需使用者手動設定。

**方法一：透過 Script 加入網路印表機（推薦）**

適用於 IPP/AirPrint/SMB 等標準協定的網路印表機：

**範例腳本**：
\`\`\`bash
#!/bin/bash

# 印表機資訊
PRINTER_NAME="Office_HP"
PRINTER_LOCATION="行政大樓一樓"
PRINTER_IP="192.168.1.100"
PRINTER_DRIVER="HP LaserJet Pro M404d"

# 使用 IPP 協定加入印表機
lpadmin -p "$PRINTER_NAME" \\
        -L "$PRINTER_LOCATION" \\
        -v "ipp://$PRINTER_IP/ipp/print" \\
        -m everywhere \\
        -o printer-is-shared=false

# 設為預設印表機（可選）
lpoptions -d "$PRINTER_NAME"

echo "印表機 $PRINTER_NAME 已加入。"
\`\`\`

**說明**：
*   \`-p\`：印表機在系統中的名稱（無空格）。
*   \`-L\`：描述/位置（可選）。
*   \`-v\`：印表機 URI。IPP 格式通常為 \`ipp://IP/ipp/print\`。
*   \`-m everywhere\`：使用 AirPrint/IPP Everywhere 驅動（多數現代印表機支援）。
*   若印表機不支援 AirPrint，需指定驅動 PPD 檔案路徑。

**部署**：
1.  將腳本上傳至 Jamf Pro。
2.  建立 Policy，執行該腳本。
3.  設定觸發條件（如：使用者登入時、Self Service）。
4.  Scope 設定為需要該印表機的教師群組。

---

**方法二：透過設定描述檔（較限制）**

Jamf Pro 可部署「印表機 (Printers)」Payload：
*   需提供 PPD 檔案或使用 Generic Printer。
*   適用於有特定驅動需求的情況。

---

**驅動程式處理**：

**IPP Everywhere / AirPrint**：
*   多數現代印表機支援，無需額外驅動。
*   使用 \`-m everywhere\` 參數即可。

**需特定驅動的印表機**：
1.  從印表機廠商官網下載 macOS 驅動 .pkg。
2.  透過 Jamf Pro Policy 安裝驅動。
3.  在 \`lpadmin\` 命令中指定 PPD 路徑，如：
   \`\`\`bash
   -m "drv:///sample.drv/laserjet.ppd"
   \`\`\`
   或完整路徑：
   \`\`\`bash
   -P "/Library/Printers/PPDs/Contents/Resources/HP LaserJet.gz"
   \`\`\`

---

**Self Service 選項**：

若不同教師需要不同印表機，可建立多個 Policy，每個對應一台印表機，加入 Self Service。教師可根據自己的辦公室位置自行選擇安裝。

**測試與驗證**：
*   部署後，前往「系統偏好設定」>「印表機與掃描器」確認印表機出現。
*   執行測試列印。
`
      },
      {
        id: 'mac-11',
        question: '如何大量部署 Microsoft Office 並啟用授權？',
        tags: ['Office', 'Microsoft 365', '軟體部署', '授權'],
        answer: `
**從 Microsoft 官網下載獨立安裝檔透過 Jamf Pro 派送，搭配 Serializer（裝置授權）或使用者登入（使用者授權）完成啟用。不要使用 App Store 版本安裝。**

Microsoft Office 是教育環境的核心生產力工具。正確的部署方式可確保所有使用者順利使用，並符合授權合規要求。

**Office 版本選擇**：

| 來源 | 適合情境 | 授權管理 |
|------|---------|---------|
| **Mac App Store** | 個人購買 | 需個人 Apple ID，不適合組織 |
| **Microsoft 官網獨立安裝檔** | 組織部署 | 支援大量授權 (VL) 和 Microsoft 365 訂閱 |

**建議使用 Microsoft 官網版本。**

---

**安裝部署**：

1.  **下載安裝檔**：
    *   前往 [Microsoft 官網](https://www.microsoft.com/zh-tw/microsoft-365/microsoft-365-for-mac-word-excel-powerpoint) 下載最新版 Office 安裝 .pkg。
    *   或使用 Jamf App Installers（若可用）。

2.  **上傳至 Jamf Pro**：
    *   前往「設定」>「電腦管理」>「套件」，上傳 .pkg。

3.  **建立 Policy 安裝 Office**：
    *   加入 Office 安裝套件。
    *   設定觸發條件（如：註冊時、Self Service）。
    *   設定 Scope。

---

**授權啟用**：

**方式一：使用者登入啟用（Microsoft 365 訂閱）**

*   使用者首次開啟 Word/Excel 時，會被提示登入。
*   登入學校的 Microsoft 365 帳號（如 @school.edu.tw）。
*   若帳號有 Office 授權，會自動啟用。

**優點**：簡單、授權隨帳號移動。
**缺點**：每位使用者需手動登入。

---

**方式二：裝置授權 / Serializer（大量授權）**

若學校購買的是「裝置授權 (Device-based license)」：

1.  **取得 Serializer 檔案**：
    *   登入 Microsoft Volume Licensing Service Center (VLSC)。
    *   下載 「Microsoft Office [版本] Volume License Serializer」.pkg。

2.  **透過 Jamf Pro 部署 Serializer**：
    *   上傳 Serializer .pkg。
    *   建立 Policy，在安裝 Office 後執行 Serializer。
    *   Serializer 會將授權資訊寫入系統，Office 自動啟用。

**優點**：使用者無需登入、適合共用電腦。
**缺點**：授權綁定裝置，不隨帳號移動。

---

**更新管理**：

*   Office 內建「Microsoft AutoUpdate (MAU)」自動更新機制。
*   可透過 MAU 的設定描述檔控制更新行為（自動更新、延遲更新等）。
*   或透過 Jamf Pro 派送更新套件進行集中控制。

**建議的部署順序**：
1.  安裝 Office 主程式。
2.  安裝 Serializer（若裝置授權）。
3.  設定 MAU 偏好設定。
4.  設定 Outlook 的 App Configuration（若需預填帳號）。

**常見問題**：
*   **啟用失敗**：確認 Serializer 版本與 Office 版本相容。
*   **持續要求登入**：可能是網路問題或授權伺服器無法連線。
*   **多版本衝突**：確保移除舊版 Office 後再安裝新版。
`
      },
      {
        id: 'mac-12',
        question: '【Sequoia 新功能】如何管理或禁用「iPhone 鏡像輸出 (iPhone Mirroring)」？',
        tags: ['macOS Sequoia', '隱私', 'iPhone 鏡像'],
        answer: `
**macOS 15 Sequoia 引入的 iPhone 鏡像輸出功能確實存在資料外洩隱憂，管理員可透過 MDM 強制限制。**

**管理策略**：
1.  **資安風險**：私人 iPhone 的 App 通知與內容（可能包含私密訊息）會顯示在受管理的 Mac 螢幕上。
2.  **停用方式**：在「限制」描述檔中，取消勾選 **「Allow iPhone Mirroring」**。
3.  **適用情境**：學校行政處室或高安全性要求的電腦教室建議關閉，以防非故意性的隱私曝露。
`
      },
      {
        id: 'mac-13',
        question: '【硬體部署】2025 年電腦教室改用 Mac Mini M4 有什麼優勢？',
        tags: ['Mac Mini M4', '硬體選擇', '0-Touch'],
        answer: `
**Mac Mini M4 憑藉其超小體積與 M4 晶片的 AI 效能，是 2025 年學校電腦教室的首選方案。**

**核心優勢**：
*   **極低功耗**：相比傳統桌上型 PC，能大幅減少電力開支，符合淨零排放政策。
*   **ADE 自動部署**：配合 ASM 與 Jamf Pro，可實現插電即安裝（0-Touch），自動灌好 Office、Adobe、Python 等軟體。
*   **AI 與 剪輯**：M4 晶片的 NPU 效能足以讓學生在本機端執行簡單的 AI 模型與 4K 影片剪輯，無需依賴雲端。
*   **空間利用**：體積僅 12.7 公分，可鎖在螢幕後方或收納於抽屜架，桌面更簡潔。
`
      },
      {
        id: 'mac-14',
        question: '【Activation Lock】Mac 送修回來被舊使用者的帳號鎖住了，怎麼辦？',
        tags: ['Mac 安全', '啟用鎖定', '解鎖'],
        answer: `
**2025 年起，歸屬於 ASM 且受 MDM 管理的 Mac，可直接在 ASM 後台自助解鎖。**

**操作流程**：
1.  登入 **Apple School Manager (ASM)**。
2.  點選「裝置」，搜尋該台 Mac 的序號。
3.  點選 **「解除啟用鎖定 (Release/Unlock)」**。
4.  原本的 Apple ID 鎖定會被移除，重灌後即可正常設定。
*   **注意**：裝置必須已指派給您的 MDM 伺服器且記錄在 ASM 資產內。
`
      }
    ]
  }
]
