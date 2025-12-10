import { QASection } from '../types'

export const data: QASection[] = [
  {
    title: '第二部分：裝置註冊、納管與重置 (Enrollment & Reset)',
    items: [
      {
        id: 'enr-1',
        question: '[常用] 平板被學生設定了密碼且已忘記，導致無法解鎖，如何在不登入的情況下重置？',
        important: true,
        tags: ['密碼鎖', '重置'],
        answer: `
**問題描述**：iPad 螢幕顯示「iPad 已停用」或「iPad 無法使用」，且無法輸入密碼解鎖。

**解決方案**：
依據裝置連線狀況，有兩種處理方式。

#### **方法 A：透過 Jamf Pro 遠端清除密碼 (最推薦，需聯網)**
若 iPad **仍有 Wi-Fi 連線**（右上角有訊號），這是最快的方法，且**不會清除資料**。
1.  登入 Jamf Pro > 搜尋該裝置。
2.  點選 **「管理 (Management)」** 標籤頁。
3.  點選 **「清除密碼 (Clear Passcode)」**。
4.  指令送達後，iPad 的密碼鎖會直接解除，滑開螢幕即可進入。

#### **方法 B：使用電腦強制回復 (若已斷網或方法 A 無效)**
若 iPad 已斷網，必須使用電腦 (Mac/Windows) 強制重灌系統，**此動作會清除所有資料**。

**操作步驟：**
1.  將 iPad 連接至電腦（Mac 使用 Finder 或 Apple Configurator；Windows 使用 Apple Devices App 或 iTunes）。
2.  **強制進入「復原模式 (Recovery Mode)」**：
    *   **無 Home 鍵機型 (Face ID 機型、iPad Air 4/5/M2、iPad 10、iPad (A16))**：
        1.  按下並快速放開 **「調高音量」** 按鈕。
        2.  按下並快速放開 **「調低音量」** 按鈕。
        3.  **長按「頂端電源按鈕」不放**，即使看到 Apple 標誌也不要放開，直到看到「連接電腦」的圖示（黑底白線圖）才放開。
    *   **有 Home 鍵機型 (iPad 9 或更舊)**：
        1.  同時按住 **「主畫面按鈕 (Home)」** 與 **「頂端 (或側邊) 電源按鈕」**。
        2.  持續按住不放，即使看到 Apple 標誌也不要放開，直到看到「連接電腦」的圖示才放開。
3.  電腦端會跳出視窗，請打開您選擇的軟體，並對該裝置選擇 **「回復 (Restore)」**。電腦會下載軟體更新並清除 iPad。
`
      },
      {
        id: 'enr-2',
        question: '[常用] 使用 Apple Configurator (AC2) 重置平板時，卡在「等待裝置」或出現錯誤代碼，如何解決？',
        important: false,
        tags: ['AC2', 'DFU', '錯誤代碼'],
        answer: `
**問題描述**：在 AC2 執行「回復」或「清除」時，進度條卡住不動，或跳出錯誤代碼（如 4013, 9, 4005）。

**解決方案**：
若標準回復失敗，需進入更深層的 **DFU 模式 (Device Firmware Update)** 強制重新寫入韌體。

#### **如何進入 DFU 模式 (黑畫面模式)**
*成功進入 DFU 模式時，**iPad 螢幕必須是全黑的**，沒有任何圖示。若看到 Apple 標誌或連接電腦圖示，代表失敗，需重來。*

**A. 無 Home 鍵機型 (Face ID, iPad Air 4+, iPad 10)：**
1.  將 iPad 連接電腦，開啟 Apple Configurator。
2.  按下並快速放開 **「調高音量」**。
3.  按下並快速放開 **「調低音量」**。
4.  長按 **「電源鍵」** 約 10 秒，直到螢幕變黑。
5.  螢幕變黑的瞬間，**繼續按住「電源鍵」，並同時按住「調低音量」鍵**，持續約 5 秒。
6.  **放開「電源鍵」**，但**繼續按住「調低音量」鍵** 約 10 秒。
7.  觀察 Apple Configurator 視窗，若出現 **"DFU"** 字樣的裝置圖示，且 iPad 螢幕全黑，即成功。
8.  在 AC2 對該裝置按右鍵 > **「回復 (Restore)」**。

**B. 有 Home 鍵機型 (iPad 9 及舊款)：**
1.  將 iPad 連接電腦，開啟 Apple Configurator。
2.  同時長按 **「電源鍵」** 與 **「Home 鍵」** 約 8-10 秒，直到螢幕變黑。
3.  **放開「電源鍵」**，但**繼續按住「Home 鍵」**，持續約 5 秒以上。
4.  觀察 Apple Configurator 視窗，若出現 **"DFU"** 字樣，且 iPad 螢幕全黑，即成功。
5.  在 AC2 對該裝置按右鍵 > **「回復 (Restore)」**。

**其他排查重點**：
*   **更換傳輸線**：務必使用原廠或通過 MFi 認證或您確保能夠正常使用的線材。
*   **直接連接**：嘗試不要透過 USB Hub 或鍵盤上的 USB 孔，直接插在電腦主機板的接口（MacBook 請換一個孔試試）。
*   **網路環境**：回復過程需連線 Apple 伺服器驗證，請確保網路未阻擋 任何 apple 相關域名。
`
      },
      {
        id: 'enr-3',
        question: '如何將尚未納管（或已脫管）的 iPad，透過 AC2 手動加入 Apple School Manager？',
        important: false,
        tags: ['手動納管', 'AC2', 'ASM'],
        answer: `
**適用情境**：學校自行購買、家長會捐贈的 iPad，非透過授權經銷商走 DEP 流程採購，需手動納入管理。

**詳細步驟**：
1.  **準備工作**：
    *   Mac 電腦安裝 **Apple Configurator**。
    *   iPad 必須在「哈囉 (Hello)」歡迎畫面（若已進入桌面，請先清除裝置）。
2.  **建立 Wi-Fi 描述檔**：
    *   在 AC2 點選 \`檔案\` > \`新增描述檔\` > \`Wi-Fi\` > 設定學校 Wi-Fi 的 SSID 與密碼 > 儲存為 \`wifi.mobileconfig\`。
3.  **開始流程**：
    *   連接 iPad，在 AC2 選取裝置，點擊 **「準備 (Prepare)」**。
    *   **設定選項**：
        *   選擇 **「手動設定 (Manual Configuration)」**。
        *   勾選 **「將裝置加入 Apple 校務管理 (Add to Apple School Manager)」**。
        *   勾選 **「允許裝置與其他電腦配對」** (視學校資安需求，若不勾，以後只能用這台 Mac 連接)。
        *   **務必勾選「監管裝置 (Supervise devices)」**。
        *   **不要** 勾選「註冊 MDM」(我們會稍後在 ASM 指派，這樣比較乾淨)。
    *   **登入組織**：輸入學校 ASM 的「管理員」帳號密碼。
    *   **指派身分**：選擇「產生新的監管身分」或沿用現有組織。
    *   **設定輔助程式**：建議選擇「不顯示任何步驟」。
    *   **網路設定**：系統會要求載入 Wi-Fi 描述檔，請選取步驟 2 建立的檔案。
4.  **執行與等待**：AC2 會開始下載啟用紀錄並設定 iPad。
5.  **ASM 端指派 (關鍵)**：
    *   iPad 跑完流程後，登入 [school.apple.com](https://school.apple.com)。
    *   前往 **「裝置」** > 篩選來源 **「已手動新增」**。
    *   選取該 iPad > 點選 **「編輯 MDM 伺服器」** > 指派給 **Jamf Pro**。
6.  **Jamf Pro 端同步**：
    *   回到 Jamf Pro > 全域管理 > 自動裝置註冊 > 重新整理 (Refresh)。
    *   確認裝置出現在 **PreStage 註冊** 的範圍內並勾選它。
7.  **最終確認**：
    *   **手動加入的裝置有 30 天猶豫期**：在這 30 天內，iPad 的「設定」中會出現「離開遠端管理」的選項，使用者可自行解除監管。30 天後此選項自動消失，裝置將永久被學校綁定。
`
      },
      {
        id: 'enr-4',
        question: '裝置重置後，卡在「遠端管理」登入畫面，或顯示「無效的描述檔」，該怎麼辦？',
        important: false,
        tags: ['遠端管理', '錯誤排除'],
        answer: `
**原因分析**：
1.  **Scope (範圍) 未設定**：裝置在 ASM 指派給了 Jamf，但在 Jamf 的 PreStage 註冊中「未勾選」該裝置，導致 iPad 找不到對應的設定檔。
2.  **Token 過期**：Jamf 與 ASM 之間的 ADE Token 過期，無法同步。
3.  **時區/網路錯誤**：iPad 系統時間不正確，導致憑證驗證失敗。

**解決方案**：
1.  **檢查 PreStage 範圍 (最常見)**：
    *   登入 Jamf Pro > **裝置** > **預先階段註冊**。
    *   點進學校使用的設定檔 > **範圍 (Scope)**。
    *   搜尋該裝置序號，**務必打勾**，然後按 **儲存**。
2.  **強制 iPad 重新抓取**：
    *   按 iPad 的「返回」鍵，退回到選擇 Wi-Fi 畫面。
    *   等待約 10 秒，再次點選「下一步」，讓它重新向伺服器請求設定。
3.  **取消身分驗證**：
    *   若卡在輸入帳號密碼畫面，且學校不需要使用者驗證。請在 PreStage 註冊的 **「一般」** 設定中，**取消勾選「需要認證 (Require Authentication)」**。
`
      },
      {
        id: 'enr-5',
        question: '如何設定讓 iPad 重置後「自動」抓回原本的裝置名稱與群組設定？',
        important: false,
        tags: ['MUT', '名稱同步'],
        answer: `
**現實狀況**：
Jamf Pro 的 PreStage 註冊僅能設定「命名規則」（如：統一改為序號），無法直接透過內建功能達成「重置後自動變回自訂名稱（如 112-A01）」。因此，最穩定的管理方式是**「先讓裝置以序號命名，納管後再透過 MUT 批次改回自訂名稱」**。

**建議操作流程**：

#### **步驟 1：設定 PreStage 命名規則 (避免變回 "iPad")**
為了避免裝置重置後全部變成一模一樣的 "iPad" 導致難以辨識，建議先設定以「序號」為預設名稱。
1.  進入 **Jamf Pro** > **裝置** > **PreStage 註冊 (PreStage Enrollments)**。
2.  進入 **一般 (General)** 設定。
3.  在「行動裝置名稱」區塊：
    *   選擇 **「強制行動裝置名稱 (Enforce Mobile Device Names)」**。
    *   命名規則選擇 **「Serial Number (序號)」**。
4.  **效果**：iPad 重置並重新註冊後，名稱會自動變為該裝置的序號 (例如 \`DMPQ1234XYZ\`)，方便管理員辨識。

#### **步驟 2：使用 The MUT (可在 Mac App Store下載) 進行批次更名 (標準解法)**
當裝置完成註冊並進入 Jamf Pro 後，使用 **The MUT (Mass Update Tool)** 將序號對應回您想要的裝置名稱（如 112-A01）。

1.  **準備 CSV 對照表（The MUT 本身有提供範本模板 MobileDeviceTemplate.csv 可供使用）**：
    *   建立一個試算表（極度推薦使用模板修改），包含三欄：
    *   \`Mobile Device Serial\`：裝置序號。
    *   \`Display Name\`：您希望設定的名稱（如 112-A01）。
    *   \`Enforce Name\`：強制設定行動裝置名稱，請全數設定為大寫半形的 TRUE 。
    *   將檔案匯出為 \`.csv\` 格式。
2.  **執行 MUT**：
    *   開啟 MUT 應用程式，登入學校 Jamf Pro。
    *   將 CSV 拖入視窗。
    *   點擊 **「Submit updates」**。
3.  **結果**：Jamf 會立即發送更名指令，iPad 連網後名稱即會變更為您想要的裝置名稱，並自動依名稱歸入對應的智慧型群組。

#### **(補充) 關於 Inventory Preload 的限制**
雖然 Jamf Pro 的「Inventory Preload (資產預載)」功能允許預先上傳 Device Name，但在「自動裝置註冊 (ADE)」的過程中，PreStage 的命名規則往往會**優先於**預載資料執行，導致預載的名稱被覆蓋。因此，**不建議**單純依賴 Inventory Preload 來處理裝置命名，使用 **MUT** 才是最保險的方式。
`
      },
      {
        id: 'enr-6',
        question: 'Jamf Pro 中的「PreStage 註冊」設定是什麼？如何調整開機設定輔助程式（略過哈囉畫面、定位服務等）？',
        important: false,
        tags: ['PreStage', '設定'],
        answer: `
**設定細節**：
前往 **Jamf Pro** > **裝置** > **預先階段註冊** > **編輯**。

1.  **一般 (General)**：
    *   **自動推進 (Automatically Advance)**：(iPadOS 17+) 勾選此項，iPad 連網後會自動跑完所有設定直接進桌面，完全無需人工點擊「繼續」。
    *   **監管裝置 (Supervise)**：**必勾**。
    *   **防止取消註冊 (Prevent Unenrollment)**：**必勾**，防止學生刪除 MDM 描述檔。
    *   **啟用共享 iPad (Enable Shared iPad)**：若為 1:1 載具，**切勿勾選**，否則會變成需要 Apple ID 登入的模式。
2.  **行動裝置名稱 (Mobile Device Names)**：
    *   選擇 **Enforce Mobile Device Names** 以確保命名一致。
3.  **設定輔助程式 (Setup Assistant)**：
    *   這裡列出的所有項目（如定位、Siri、Touch ID、Apple Pay、外觀模式等），**建議全部勾選**（代表「隱藏這些步驟」）。
    *   **例外**：若您沒有使用「Return to Service (返回服務)」功能，且希望啟用「遺失模式」，則**不要隱藏「定位服務」**，以便在開機時手動開啟定位。
`
      },
      {
        id: 'enr-7',
        question: '什麼是「清除裝置 (Erase Device)」指令？它與「清除密碼 (Clear Passcode)」有何不同？',
        important: false,
        tags: ['指令', '清除'],
        answer: `
**清除密碼 (Clear Passcode)**：
*   **功能**：移除螢幕鎖定密碼 (PIN Code)。
*   **結果**：iPad 解鎖，資料完全保留，Wi-Fi 連線保留。
*   **時機**：學生忘記密碼，但機器還在手邊且有連網。

**清除裝置 (Erase Device)**：
*   **功能**：**格式化**整台 iPad，恢復到原廠出廠狀態。
*   **結果**：所有照片、App、資料、Wi-Fi 設定**全部消失**。iPad 會重啟並回到「Hello」畫面。
*   **時機**：學期末回收、裝置轉移給他人、系統異常修復、裝置遺失（為了保密）。
*   **注意**：若沒有搭配返回服務 (Return to Service)，清除後 iPad 會斷網，需人工重新連 Wi-Fi 才能納管。
`
      },
      {
        id: 'enr-8',
        question: '新購置的 iPad 沒有出現在 Jamf 後台，但在 ASM 裡有看到，如何同步？',
        important: false,
        tags: ['同步', 'ASM'],
        answer: `
**原因**：Jamf Pro 不會隨時隨地與 ASM 保持同步，通常有一天一次的排程。

**手動強制同步步驟**：
1.  登入 **Jamf Pro**。
2.  前往 **設定 (右上角齒輪)** > **全域管理 (Global Management)**。
3.  點選 **自動裝置註冊 (Automated Device Enrollment / Device Enrollment Program)**。
4.  點選畫面上的伺服器實例（通常是學校名稱）。
5.  點選下方的 **「Devices (裝置)」** 分頁。
6.  點擊右上角的 **「Refresh (重新整理)」** 按鈕。
7.  等待約 1-2 分鐘，系統會從 Apple 伺服器拉取最新名單，新 iPad 就會出現了。
`
      },
      {
        id: 'enr-9',
        question: '如何使用 Jamf 的「Return to Service (返回服務)」功能，讓裝置重置後自動連網並完成設定？',
        important: true,
        tags: ['Return to Service', '自動連網'],
        answer: `
**功能說明**：這是 iPadOS 17 以上的強大功能。發送清除指令時，會將 Wi-Fi 設定「暫存」在硬體中，重置完成後 iPad 會自動連回 Wi-Fi 並向 MDM 報到，達成**零接觸重置**。

**操作條件**：
*   iPad 必須是 **iPadOS 17.0** 或以上版本。
*   必須在 Jamf Pro 中建立一個**不需要密碼**或**密碼已預埋**的 Wi-Fi 描述檔，該描述檔不能包含 Wi-Fi以外的任何設定，並且在 PreStage 註冊中的返回服務相關設定中套用該描述檔。

**操作步驟**：
1.  在 Jamf Pro 搜尋目標裝置（或透過進階搜尋批量選取）。
2.  點選 **「管理 (Management)」** > **「清除裝置 (Erase Device)」**。
3.  在彈出視窗中：
    *   勾選 **「Clear Activation Lock (清除啟用鎖定)」**（避免卡 Apple ID 鎖）。
    *   勾選 **「Return to Service (返回服務)」**。
4.  **Wi-Fi 設定**：再次提醒，務必要先在 PreStage 註冊中，選擇一個有效的 **Wi-Fi 設定描述檔**。
    *   *注意：該 Wi-Fi 必須在重置後能連上外網，不可是 802.1x 需帳號認證的網路，除非憑證已包含在內。*
5.  發送指令。iPad 會自動清除 -> 自動重開 -> 自動連 Wi-Fi -> 自動跑完 PreStage 流程 -> 回到桌面。
`
      },
      {
        id: 'enr-10',
        question: '平板重置後，裝置名稱變回 "iPad"，如何大量重新命名（使用 MUT 工具及 CSV 匯入）？',
        important: false,
        tags: ['MUT', '重命名'],
        answer: `
**工具**：**The MUT (Mass Update Tool)** 是 Mac 上專用的 Jamf 管理神器，可以在 Mac App Store 搜尋 MUT 下載。

**操作步驟**：
當裝置完成註冊並進入 Jamf Pro 後，使用 **The MUT (Mass Update Tool)** 將序號對應回您想要的裝置名稱（如 112-A01）。

1.  **準備 CSV 對照表（The MUT 本身有提供範本模板 MobileDeviceTemplate.csv 可供使用）**：
    *   建立一個試算表（極度推薦使用模板修改），包含三欄：
    *   \`Mobile Device Serial\`：裝置序號。
    *   \`Display Name\`：您希望設定的名稱（如 112-A01）。
    *   \`Enforce Name\`：強制設定行動裝置名稱，請全數設定為大寫半形的 TRUE 。
    *   將檔案匯出為 \`.csv\` 格式。
2.  **執行 MUT**：
    *   開啟 MUT 應用程式，登入學校 Jamf Pro。
    *   將 CSV 拖入視窗。
    *   點擊 **「Submit updates」**。
3.  **結果**：Jamf 會立即發送更名指令，iPad 連網後名稱即會變更為您想要的裝置名稱，並自動依名稱歸入對應的智慧型群組，若您無法操作成功或不確定，請聯絡我們協助處理。
`
      },
      {
        id: 'enr-11',
        question: '裝置在 Jamf 後台顯示「Unmanaged (未受監管)」或失去連線超過 30 天以上，如何重新納管？',
        important: false,
        tags: ['Unmanaged', '脫管'],
        answer: `
**狀況判斷**：
需先區分裝置是「網路失聯」還是「描述檔已移除」。
*   **狀況 A（失聯）**：裝置仍在手邊，但 Jamf 後台的「上次資產更新」時間超過 30 天。
*   **狀況 B（脫管）**：Jamf 後台狀態明確顯示為 **Unmanaged**，或裝置設定內的「VPN 與裝置管理」已無 MDM 描述檔。

**解決方案**：

#### **方法一：嘗試恢復連線（僅適用於狀況 A，救回資料免重置）**
若裝置只是因為 Wi-Fi 連線問題，或裝置設定跑掉導致失聯，可嘗試以下步驟讓它重新報到：
1.  **檢查連線**：手動連接一個穩定的 Wi-Fi（如手機熱點），看看是否可以進行資產更新，若不行多換幾個熱點。（同時請先嘗試看看步驟 3）
2.  **若真的沒有辦法，請重置網路設定**：
    *   前往 **「設定」>「一般」>「移轉或重置 iPad」>「重置」>「重置網路設定」**。
    *   裝置會重開機，請重新連上 Wi-Fi。
    *   **⚠️ 注意**：執行此動作後，**裝置名稱會跳回預設的 "iPad"**。連線恢復後，請務必記得使用 **The MUT** 重新寫入正確的裝置名稱，或是於Jamf Pro手動改回。
3.  **手動觸發同步**：
    *   打開 iPad 上的 **Jamf Trust App** (若有)，讓它嘗試與伺服器抓取設定。
    *   在 Jamf 後台對該裝置發送 **「更新資產 (Update Inventory)」** 指令。

#### **方法二：清除重置重新納管（無法手動恢復連線時的標準作法 / 適用於狀況 B）**
若方法一無效，或裝置已顯示 Unmanaged，最乾淨且保證成功的作法是讓裝置重跑一次自動註冊流程 (ADE)。

1.  **確認指派狀態**：
    *   先確認該裝置在 **Apple 校務管理 (ASM)** 中，**MDM 伺服器** 欄位是指派給貴校的 Jamf Pro（未被「取消指派」）。
2.  **執行清除**：
    *   **若可進入桌面**：前往 **「設定」>「一般」>「移轉或重置 iPad」>「清除所有內容與設定」**。
    *   **若卡密碼鎖**： 需要將其進入復原模式，並透過電腦將其強制回復。
3.  **重新註冊**：
    *   iPad 重開機後會進入 Hello 畫面。
    *   連上 Wi-Fi 後，畫面會顯示 **「遠端管理 (Remote Management)」**。
    *   點選「下一步」即可自動完成納管與 App 下載。
`
      },
      {
        id: 'enr-12',
        question: '老師自行購買的 iPad 或 BYOD 裝置，如何納管但不影響其個人 Apple ID 與資料？',
        important: false,
        tags: ['BYOD', '使用者註冊'],
        answer: `
**解決方案**：
針對此情境，Apple 提供了專為 BYOD (Bring Your Own Device) 設計的納管模式，稱為 **「使用者註冊 (User Enrollment)」**。這與學校資產設備使用的 **「裝置註冊 (Device Enrollment)」** 有本質上的區別。

#### **核心概念：隱私保護與資料分離**

「使用者註冊」的核心設計理念是在單一裝置上建立兩個獨立且互相隔離的空間：**個人空間**與**學校管理空間**。

*   **個人空間**：
    *   完全由使用者掌控，使用其**個人的 Apple ID**。
    *   所有個人 App (如 Line, Facebook)、照片、訊息、檔案及瀏覽紀錄，MDM 伺服器**完全無法看見或存取**。
    *   學校無法清除整台裝置、無法清除密碼，也無法追蹤裝置的 GPS 定位。

*   **學校管理空間**：
    *   由學校的 MDM 伺- 服器（Jamf Pro）管理，並與學校配發的 **「管理式 Apple ID (Managed Apple ID)」** 綁定。
    *   學校只能在此空間內派送 App、設定描述檔（如 Wi-Fi、電子郵件帳號）、強制執行部分安全性原則（如密碼複雜度）。
    *   當老師離職或不再需要納管時，MDM 只能移除這個「學校管理空間」，**不會**動到任何個人資料。

#### **操作流程**

**Part 1：管理員事前設定 (Jamf Pro 後台)**

1.  **建立管理式 Apple ID**：
    *   首先，老師必須在 **Apple 校務管理 (ASM)** 中擁有一個學校配發的管理式 Apple ID（例如 \`teacher.lin@yourschool.appleid.com\`）。這是使用者註冊的身分基礎。
2.  **設定使用者註冊實例**：
    *   登入 Jamf Pro > **設定 (齒輪)** > **全域管理** > **使用者註冊 (User Enrollment)**。
    *   建立一個新的實例，並設定好註冊方式。
3.  **產生註冊邀請**：
    *   完成設定後，Jamf Pro 會提供一個專屬的**註冊 URL 連結**或 **QR Code**。此邀請將用於啟動老師 iPad 上的註冊程序。

**Part 2：使用者操作流程 (在老師自己的 iPad 上)**

1.  **開始註冊**：
    *   老師在自己的 iPad 上，前往 **「設定」>「一般」>「VPN 與裝置管理」**。
    *   點選最上方的 **「登入公司或學校帳號... (Sign In to Work or School Account...)」**。
2.  **登入管理式 Apple ID**：
    *   系統會要求登入。此時，老師必須輸入**學校配發的「管理式 Apple ID」**，**而非**他自己的個人 Apple ID。
3.  **下載並安裝描述檔**：
    *   登入成功後，系統會引導老師下載並安裝 MDM 描述檔。這個描述檔的作用就是在裝置上建立前述的「學校管理空間」。
4.  **完成**：
    *   安裝完成後，在「VPN 與裝置管理」中會看到學校的管理描述檔。
    *   同時，在「設定」的最上方，會看到兩個 Apple ID 帳號並存：一個是老師的個人 iCloud 帳號，另一個是學校的管理式 Apple ID 帳號。

#### **註冊完成後的效果**

*   學校可以透過 Jamf Pro 將教學用 App（如 Google Classroom、Kahoot!）派送到老師的 iPad 上，這些 App 的圖示旁可能會出現一個小的公事包標誌，以示區別。
*   老師原有的個人 App 完全不受影響。
*   老師依然可以使用自己的 Apple ID 登入 App Store 下載個人 App。
*   學校可以設定 Wi-Fi、學校 Email 等描述檔，方便老師使用。
*   MDM 的管理權限受到嚴格限制，完美平衡了學校管理需求與個人隱私保護。
`
      }
    ]
  }
]
