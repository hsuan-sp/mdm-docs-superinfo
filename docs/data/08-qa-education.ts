import type { QASection } from '../.vitepress/types'

export const educationQA: QASection[] = [
  {
    title: "第八部分：教育場域 MDM 實戰問答 (Education Scenarios)",
    items: [
      // Original 4 (Modernized)
      {
        id: "edu-01",
        question: "iPadOS 17 以上的裝置，為什麼沒有看見 VPN 圖示？這樣過濾功能有在運作嗎？",
        answer: `
**這是正常現象。**

在 iPadOS 17 (含) 以上版本，配合教育部的新版架構，**Jamf Trust** 改採用 **「DNS 代理 (DNS Proxy)」** 與 **「內容過濾器 (Content Filter)」** 技術運作，不再需要建立傳統的 VPN 通道。

**如何確認運作正常：**
1.  **檢查圖示**：螢幕右上角**不會**出現 [VPN] 圖示。
2.  **檢查 App**：打開 **Jamf Trust** App，只要顯示**綠色盾牌 (保護中)**，即代表過濾與數據回報功能皆正常運作。
`,
        tags: ["iPadOS 17", "VPN", "Content Filter", "Jamf Trust"],
        important: true
      },
      {
        id: "edu-02",
        question: "「共用 iPad (Shared iPad)」與「訪客模式」有什麼區別？",
        answer: `
**共用 iPad (Shared iPad)**：
*   **登入方式**：學生使用專屬的 **「管理式 Apple ID」** 登入。
*   **資料保存**：系統會將資料（照片、作業）儲存在雲端 (iCloud)。學生換到別台 iPad 登入，資料會自動同步回來。
*   **適用情境**：一人一號的長期課程、需要延續進度的專題製作。

**訪客模式 (Guest Mode)**：
*   **登入方式**：免帳號，直接點擊「訪客」登入。
*   **資料保存**：**不保存**。登出後，所有資料、瀏覽紀錄與下載的檔案會被**立即清除**。
*   **適用情境**：圖書館查詢、單次體驗課程、不需存檔的隨堂測驗。
`,
        tags: ["Shared iPad", "Guest Mode", "Managed Apple ID"]
      },
      {
        id: "edu-03",
        question: "老師的 iPad 與學生的 iPad 權限有什麼不同？",
        answer: `
在 MDM 的管理架構下，通常會依據 **「角色」** 給予不同的設定描述檔：

**老師用 iPad (Teacher Device)**：
*   **限制較少**：通常允許使用 App Store 下載教學輔助工具。
*   **特殊功能**：預載 **「Apple 課堂 (Classroom)」** App，擁有管理學生裝置的權限（如鎖定畫面、導引 App）。
*   **隱私**：雖受學校監管，但 MDM **無法** 查看老師的瀏覽紀錄、照片或個人訊息。

**學生用 iPad (Student Device)**：
*   **限制嚴格**：App Store 通常被隱藏，僅能透過 Self Service 安裝核准的 App。
*   **功能限制**：可能被禁止修改桌布、禁止修改時間、強制開啟藍牙與 Wi-Fi (為了 Apple 課堂)。
*   **網路過濾**：在精進方案下，會強制過濾不當資訊並記錄使用時數。
`,
        tags: ["Roles", "Permissions", "Teacher vs Student"]
      },
      {
        id: "edu-04",
        question: "不同班級輪流使用同一批平板，課堂間隔該如何快速整理？",
        answer: `
建議建立 **「課堂重置流程」**：

1.  **若使用訪客模式**：
    *   下課前，請學生點擊頭像選擇 **「登出」**。
    *   系統會自動清除所有資料，下一班學生拿到的是乾淨的桌面。

2.  **若使用一般模式 (1對1模式但輪用)**：
    *   **相簿清理**：請學生養成習慣，下課前自行刪除剛剛拍攝的照片。
    *   **帳號登出**：若有登入 Google Classroom 或 Canva，務必在下課前登出。
    *   **MDM 重置 (進階)**：若需徹底還原，管理員可透過 Jamf Pro 發送 **「清除 (Wipe)」** 指令（需搭配 **Return to Service** 功能），讓平板在 5 分鐘內重置並自動連回 Wi-Fi 待命。
`,
        tags: ["Classroom Management", "Reset", "Workflow"]
      },

      // New CSV-Derived Scenarios
      {
        id: "edu-05",
        question: "收到通知說「Apple 校務管理 (ASM) 條款已更新」，若不理會會有什麼後果？",
        answer: `
**後果非常嚴重**。

若未登入 ASM 同意新的條款 (Terms and Conditions)：
1.  **MDM 同步失效**：Jamf Pro 無法再與 Apple 伺服器通訊。
2.  **功能癱瘓**：無法註冊新裝置、無法更新 VPP 授權（App 無法安裝/更新）、無法同步學生資料。

**解決方案**：
請務必由具備 **「管理者 (Administrator)」** 權限的帳號，登入 [school.apple.com](https://school.apple.com) 檢視並同意條款。
`,
        tags: ["ASM", "Terms", "Critical"],
        important: true
      },
      {
        id: "edu-06",
        question: "為什麼建議 ASM (Apple School Manager) 至少要有兩組管理員帳號？",
        answer: `
這是一個重要的 **風險控管** 措施。

**原因**：
*   **人員異動**：若唯一的管理員離職或請長假，且未交接帳號密碼，學校將無法管理所有 Apple 裝置。
*   **帳號鎖定**：若管理員 Apple ID 因多次錯誤輸入被鎖定，需要另一個管理員協助解鎖。
*   **雙重驗證**：管理式 Apple ID 需要雙重驗證 (2FA)，若綁定的手機號碼失效（如離職），也需要第二位管理員協助重置。
`,
        tags: ["ASM", "Admin Account", "Best Practice"]
      },
      {
        id: "edu-07",
        question: "老師反應平板「卡卡的」或運作緩慢，通常是什麼原因？",
        answer: `
根據實務經驗，絕大多數「卡頓」並非 App 未更新，而是：
1.  **太久沒關機**：iPad 就像電腦一樣，需要定期重新啟動以釋放記憶體。
2.  **更新正在背景下載**：若剛好遇到 iOS 系統更新自動下載中，效能會暫時下降。

**建議處置**：
請老師指導學生，每週至少 **「重新啟動 (Restart)」** iPad 一次（關機再開機，非僅關閉螢幕）。
`,
        tags: ["Performance", "Lag", "Troubleshooting"]
      },
      {
        id: "edu-08",
        question: "明明有派送指令，但 Jamf 後台一直顯示「擱置中 (Pending)」且無法消除？",
        answer: `
**原因**：
裝置可能**太久沒連網**，或者在接收指令時剛好網路中斷，導致指令卡在佇列中。

**解決方案**：
1.  **取消指令**：在 Jamf Pro 中找到該裝置 > **「管理 (Management)」** > 點選 Pending 指令旁的 **「取消 (Cancel)」** 或 **「清除 (Clear)」**。
2.  **重新喚醒**：確保 iPad 連上 Wi-Fi，在 Jamf Pro 發送一個簡單的 **「更新資產 (Update Inventory)」** 指令。
3.  **重新派送**：待裝置狀態更新後，再重新派送原本失敗的指令。
`,
        tags: ["Pending Commands", "Troubleshooting", "Jamf Pro"]
      },
      {
        id: "edu-09",
        question: "iPad如果不小心摔破螢幕或無法充電（硬體損壞），該怎麼送修？流程為何？",
        answer: `
**報修流程**：
1.  **切勿自行拆解**：請勿嘗試自行找坊間通訊行維修，以免喪失保固資格 (精進方案設有原廠保固)。
2.  **確認保固**：請先確認該裝置是否仍在保固期內（通常為 3-4 年）。
3.  **聯繫廠商**：請直接聯繫 **極電資訊 (Superinfo)** 或 **Apple 原廠授權維修中心**。
    *   準備資料：裝置序號 (Serial Number) 與故障狀況照片。
    *   **極電資訊報修窗口**：請參考首頁底部的客服連結。
4.  **解鎖 (重要)**：送修前，務必先將 iPad 的 **「尋找 (Find My)」** 關閉（若有開啟），並將資料備份後清除。
`,
        tags: ["Hardware", "Repair", "Damage"]
      },
      {
        id: "edu-10",
        question: "為什麼要將「VPP 代號 (Token)」每年更新一次？過期了會怎樣？",
        answer: `
**VPP 代號** 是 MDM 伺服器用來「代表學校」向 Apple 購買與分配 App 的數位憑證。

**過期後果**：
*   **App 無法安裝**：任何新派送的 App 都會失敗。
*   **App 無法更新**：現有 App 無法更新到最新版。
*   **授權無法回收**：無法將離職老師或損壞機器的 App 授權收回。

**如何更新**：
登入 ASM 下載新的 Token，再上傳至 Jamf Pro 的 **「大量採購 (Volume Purchasing)」** 設定中。
`,
        tags: ["VPP", "Token", "Expiration", "Critical"]
      },
      {
        id: "edu-11",
        question: "老師在 iPad 上自己安裝的 App (如登入個人 Apple ID 下載)，要如何移除？",
        answer: `
**移除方式**：
與一般 iPhone/iPad 操作相同。
1.  在主畫面上 **長按** 該 App 圖示。
2.  選擇 **「移除 App (Remove App)」** > **「刪除 App (Delete App)」**。

**注意**：
若長按後沒有出現「移除」選項，代表 MDM 的 **「限制描述檔」** 中勾選了 **「不允許刪除 App」**。需請管理員暫時解除該限制才能刪除。
`,
        tags: ["App Removal", "Personal Apple ID", "Restrictions"]
      },
      {
        id: "edu-12",
        question: "單一裝置突然 VPN消失或無法連線，最快的修復方式是什麼？",
        answer: `
若確定裝置有連網且無硬體故障，**「重新加入群組」** 是最有效的修復法：

1.  **移除**：在 Jamf Pro 中，將該裝置從 **「Static Group (靜態群組)」** 中移除。
2.  **等待**：等待約 1-2 分鐘，讓 iPad 接收到變更（相關描述檔會被移除）。
3.  **加入**：再次將該裝置**加入**回原本的群組。
4.  **效果**：Jamf 會強制重新觸發所有佈建流程，包含重新安裝 VPN/Jamf Trust 與相關憑證。
`,
        tags: ["Troubleshooting", "VPN", "Quick Fix"]
      },
      {
        id: "edu-13",
        question: "iPad 系統時間跑掉為什麼會導致網路連不上去？",
        answer: `
**原理**：
Wi-Fi 認證與 HTTPS 加密連線都依賴 **「數位憑證 (Certificate)」**。憑證都有「有效期限」。如果 iPad 時間回到過去 (如 1970年) 或未來，系統會誤判憑證 **「尚未生效」** 或 **「已過期」**，因此拒絕建立安全連線。

**解法**：
必須先手動調整回正確時間，才能順利連上網路進行後續的自動校時。
`,
        tags: ["Time Sync", "SSL", "Network Error"]
      },
      {
        id: "edu-14",
        question: "我可以開啟「個人熱點」分享網路給學生嗎？",
        answer: `
除非緊急狀況，**強烈不建議**。

1.  **干擾 AirDrop/課堂**：開啟熱點會佔用 Wi-Fi 晶片通道，導致 AirDrop 與 Apple 課堂功能 **失效或極不穩定**。
2.  **管理漏洞**：學生連上老師熱點後，等於繞過了學校防火牆的保護，可能瀏覽不當內容。
3.  **限制策略**：部分學校的 MDM 策略會直接**隱藏或停用**熱點分享功能。
`,
        tags: ["Hotspot", "AirDrop", "Best Practice"]
      },
      {
        id: "edu-15",
        question: "為什麼有些 App 開啟後一直發生閃退 (Crash)？",
        answer: `
常見原因與解法：
1.  **版本過舊**：App 太久沒更新，與新的 iPadOS 不相容。請透過 Jamf 派送更新。
2.  **網路過濾誤擋**：該 App 啟動時需連線至特定伺服器，但被 Jamf Trust 或防火牆擋住了。可嘗試暫時切換到個人熱點測試，若正常則需調整過濾白名單。
3.  **記憶體不足**：背景開太多 App。請**強制重新啟動** iPad。
`,
        tags: ["App Crash", "Troubleshooting", "Updates"]
      },
      {
        id: "edu-16",
        question: "應該什麼時候進行 iPadOS 系統更新？",
        answer: `
**建議策略**：**「N-1」原則** 或 **「落後 30-90 天」**。

1.  **不要搶快**：新版 iOS 剛推出時 (如 .0 版本) 常有未知 Bug 或與 MDM/App 不相容的情況。
2.  **等待通知**：請等待 Jamf 原廠或經銷商發布相容性公告後再更新。
3.  **統一派送**：建議由 MDM 統一排程在夜間或寒暑假進行 **「受監管更新」**，避免佔用上課頻寬。
`,
        tags: ["Update Strategy", "iPadOS", "Best Practice"]
      }
    ]
  }
];
