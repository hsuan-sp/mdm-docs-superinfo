import { QASection } from '../types'

export const data: QASection[] = [
  {
    title: '第七部分：Mac 電腦進階管理 (Mac Management)',
    items: [
      {
        id: 'mac-1',
        question: '[常用] 如何在 Mac 上建立本機使用者帳號，或授權一般使用者成為管理者？',
        important: true,
        tags: ['帳號管理', '權限', 'Mac'],
        answer: `
**Jamf Connect / 本地帳號管理**：
1.  **策略建立 (Policy)**：
    *   在 Jamf Pro 中，使用 **「本機帳戶 (Local Accounts)」** Payload。
    *   **建立新帳戶**：設定帳號名稱 (如 \`student\`)、密碼、以及是否為管理者。
    *   **管理現有帳戶**：可重置密碼或更改圖片。

2.  **授權現有使用者為管理者**：
    *   建立一個 Policy，在 **「檔案與程序 (Files and Processes)」** Payload 或 **「Script」** 中執行指令：
    *   \`dscl . -append /Groups/admin GroupMembership <username>\`
    *   將 \`<username>\` 替換為該使用者的短名稱。
    *   將此 Policy 設為 Self Service 供申請，或直接派送。

**Jamf Connect (進階)**：
若學校有整合這項產品，可讓使用者直接用 Google/Microsoft 雲端帳號登入 Mac，並自動即時建立對應的本機帳戶。
`
      },
      {
        id: 'mac-2',
        question: 'Mac 是否需要「綁定 AD (Active Directory)」？還是有更好的身分認證方式？',
        important: false,
        tags: ['AD綁定', 'Platform SSO', 'Jamf Connect'],
        answer: `
**建議：不要綁定 AD**。

**為什麼？**
*   **行動化趨勢**：現代 Mac 手提電腦常在校外使用，AD 綁定需要內網連線，離校後無法更改密碼或同步，造成登入問題 (Keychain 錯誤)。
*   **Apple 發展方向**：Apple 正逐步淘汰傳統 AD 綁定，轉向 **Platform SSO** 與現代化身分驗證。

**替代方案**：
1.  **Jamf Connect**：目前最佳解。它在 Mac 登入畫面加入一個雲端登入視窗 (OIDC)，直接驗證 Google/Azure AD 帳密，驗證通過後才解鎖本機帳戶。密碼同步、MFA 雙重驗證一次搞定。
2.  **Kerberos 單一登入擴充功能**：若必須使用 AD 資源，透過設定檔部署「Kerberos SSO Extension」，讓使用者登入本機後，自動取得 Kerberos 票據以存取內網檔案伺服器，而無需將整台電腦綁入網域。
`
      },
      {
        id: 'mac-3',
        question: '如何管理 Mac 上的應用程式更新（如 Chrome, Adobe, Office）？',
        important: false,
        tags: ['Patch Management', '軟體更新'],
        answer: `
**Jamf Pro 內建功能：Patch Management**

1.  **設定 Patch 報告**：
    *   在 Jamf Pro > **電腦** > **修補程式管理 (Patch Management)**。
    *   新增您要追蹤的軟體標題 (Software Titles)，如 \`Google Chrome\`。這會啟用該軟體的版本偵測報告。
2.  **建立 Patch Policy**：
    *   在軟體標題內，建立 **Patch Policy**。
    *   **目標版本**：選擇最新版。
    *   **部署方式**：
        *   **Self Service**：讓使用者看到更新按鈕自行點擊。
        *   **Smart Group 自動推送**：設定「版本 < 最新版」的 Smart Group，自動背景安裝更新。
    *   **PKG 來源**：您需要將新版 Chrome 的 .pkg 檔上傳至 Jamf Distribution Point。

**更進階：Jamf App Installers (需特定授權)**
這是一項全自動服務，Jamf 會自動打包主流軟體 (Chrome, Zoom, etc.) 的最新版並自動派送，管理者完全無需手動下載或包裝 PKG。
`
      },
      {
        id: 'mac-4',
        question: '如何在 Mac 上自動安裝並設定印表機驅動程式？',
        important: false,
        tags: ['印表機', '驅動程式'],
        answer: `
**流程**：

1.  **打包驅動程式**：
    *   使用 **Jamf Composer** (Mac 管理神器) 擷取印表機驅動程式的安裝過程，打包成一個 \`.pkg\` 或 \`.dmg\`。
    *   或者直接使用廠商提供的 \`.pkg\` 安裝檔。
2.  **上傳至 Jamf**：
    *   將安裝檔上傳至 Jamf Admin / Distribution Point。
3.  **設定印表機 (Mapping)**：
    *   在 Jamf Pro > **電腦** > **印表機 (Printers)** > **+ 新增**。
    *   輸入印表機名稱、CUPS 名稱。
    *   **Device URI**：輸入協定與位置 (如 \`lpd://192.168.1.100\`)。
    *   **PPDB 檔案**：選擇剛剛安裝的驅動程式對應的 PPD 檔。
4.  **建立 Policy**：
    *   建立一個 Policy，包含兩個步驟：
        1.  安裝驅動程式套件 (Packages Payload)。
        2.  對應印表機 (Printers Payload)。
    *   派送給目標電腦。
`
      },
      {
        id: 'mac-5',
        question: '什麼是 FileVault？為什麼 MDM 會要求開啟？忘記密碼怎麼辦？',
        important: false,
        tags: ['FileVault', '磁碟加密', '資安'],
        answer: `
**定義**：
FileVault 是 macOS 內建的**全磁碟加密**技術。開啟後，硬碟資料會被 256 位元加密，即使硬碟被拔出，沒有密碼也無法讀取資料。這是資安合規的基本要求。

**MDM 管理**：
透過 **「磁碟加密 (Disk Encryption)」** Payload，Jamf Pro 可以強制開啟 FileVault。

**忘記密碼 (救援金鑰)**：
當 Jamf 啟用 FileVault 時，會生成一組 **「個人復原金鑰 (Personal Recovery Key)」** 並自動回傳至 Jamf Pro 伺服器記錄。
*   若使用者忘記登入密碼，管理者可登入 Jamf Pro > 該電腦紀錄 > **管理** > **FileVault**，查閱該台電腦的恢復金鑰。
*   在登入畫面輸入錯誤 3 次後，會出現「復原」選項，輸入此金鑰即可重置密碼並解鎖電腦。
`
      },
      {
        id: 'mac-6',
        question: 'Jamf Pro 的「Script (腳本)」功能可以用來做什麼？',
        important: false,
        tags: ['Script', 'Shell', '自動化'],
        answer: `
**強大之處**：
Jamf Pro 允許管理者上傳並執行 **Shell Script (Bash/Zsh)** 甚至 Python 腳本，這讓所有 GUI 介面沒給你的功能，都能透過指令達成。

**常見應用**：
*   **修改系統深層設定**：如 \`defaults write\` 修改 Dock 大小、關閉特定動畫。
*   **檔案操作**：刪除特定快取檔案、移動桌面檔案。
*   **安裝維護**：觸發軟體安裝後的後處理 (Post-install scripts)。
*   **互動視窗**：使用 \`jamfHelper\` 跳出學校自訂的公告視窗。

**使用方式**：
1.  **設定** > **電腦管理** > **腳本 (Scripts)** 上傳腳本。
2.  在 Policy 中加入 **「腳本 (Scripts)」** Payload，選擇執行時機 (如 Before/After)。
`
      },
      {
        id: 'mac-7',
        question: '如何重置 Mac 的本地管理員密碼 (LAPS 方案)？',
        important: false,
        tags: ['LAPS', '密碼重置', '資安'],
        answer: `
**背景**：
以往所有電腦共用一組管理員密碼 (如 \`admin/1234\`) 極不安全。**LAPS (Local Administrator Password Solution)** 讓每台 Mac 的管理員密碼都不同，且定期自動更換。

**Jamf 實作 (LAPS)**：
1.  **Jamf Pro 內建 LAPS** (近期版本功能)：
    *   在 **User & Location** 設定中開啟 LAPS 支援。
    *   MDM 會定期旋轉 (Rotate) 本機管理員密碼。
    *   管理者需要密碼時，需登入 Jamf Pro 查看「當前有效」的密碼。
2.  **管理員手動重置**：
    *   若無 LAPS，可透過 Policy 執行 \`sysadminctl -resetPassword ...\` 指令（需 Secure Token 權限）或透過 Jamf Management Action 重置。
`
      }
    ]
  }
]
