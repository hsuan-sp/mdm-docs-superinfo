import { QASection } from '../types'

export const data: QASection[] = [
    {
        title: '第二部分：裝置註冊與部署 (Device Enrollment)',
        items: [
            {
                id: 'enr-1',
                question: 'iPad 已停用 (iPad is disabled) 或密碼輸入錯誤太多次鎖死，怎麼辦？',
                important: true,
                tags: ['密碼鎖死', '還原', 'DFU'],
                answer: `
**這需要清除裝置 (重灌)。**

**救援方式**：
1.  **MDM 清除**：若 iPad 還連得上網路，管理員可從 Jamf Pro 發送 **「清除裝置 (Erase Device)」** 指令，裝置會自動重置。
2.  **電腦還原**：若已無法連網，需使用電腦 (Mac/PC) 搭配傳輸線：
    *   將 iPad 進入 **復原模式 (Recovery Mode)** (按法依機型不同)。
    *   連接電腦，使用 **Apple Configurator** 或 **Finder** 選擇 **「回復 (Restore)」**。
`
            },
            {
                id: 'enr-2',
                question: '新買的 iPad 開機後卻沒看到「遠端管理」畫面 (沒有被 MDM 鎖定)？',
                tags: ['ADE', 'ASM', '註冊失敗'],
                answer: `
**常見原因**：
1.  **未加入 ASM**：經銷商尚未將該序號加入學校的 Apple 校務管理 (ASM) 後台。
2.  **PreStage 未指派**：在 Jamf Pro 中，尚未將該裝置指派給 **PreStage Enrollment** 設定檔。
3.  **未連網**：開機設定過程中，Wi-Fi 連線失敗，導致無法向 Apple 伺服器查詢註冊狀態。

**解決方案**：
確認 ASM 資料正確後，必須 **「清除重置 (Erase All Content and Settings)」**，讓 iPad 重新跑一次開機流程 (Hello 畫面) 才會生效。
`
            },
            {
                id: 'enr-3',
                question: '什麼是「使用者註冊 (User Enrollment)」？跟一般的註冊有何不同？',
                tags: ['BYOD', '隱私', '註冊模式'],
                answer: `
**適用情境：BYOD (員工/學生自帶設備)**

**核心差異**：
*   **一般註冊 (Device Enrollment)**：MDM 擁有整台機器的控制權 (可清除整機、列出所有 App)。
*   **使用者註冊**：MDM **只能**管控「工作資料區」 (由 MDM 派發的 App 和帳號)。MDM **無法**取得您的個人照片、簡訊，也**無法**清除整台裝置，充分保障個人隱私。
`
            },
            {
                id: 'enr-4',
                question: '如何讓 iPad 重置後自動連上 Wi-Fi (Return to Service)？',
                tags: ['自動化', 'Wi-Fi', 'Return to Service'],
                answer: `
**Return to Service (重置並自動部署)**

這是 Jamf Pro 的進階功能。
當您發送 **「清除裝置」** 指令時，勾選 **「Clear Activation Lock」** 並選擇一組 **Wi-Fi 設定檔**。
裝置重置完成後，會自動連上該 Wi-Fi 並向 MDM 報到，完全不需要人工手持操作。
`
            },
            {
                id: 'enr-5',
                question: '註冊時出現「設定描述檔安裝失敗 (Profile Installation Failed)」？',
                tags: ['故障排除', '網路', '時間'],
                answer: `
**檢查清單**：
1.  **系統時間**：iPad 的時間是否準確？若時間與伺服器誤差過大會導致憑證驗證失敗 (請設為自動設定)。
2.  **網路限制**：學校防火牆是否擋住了 Apple 註冊伺服器 (17.0.0.0/8) 或 Jamf Pro 網址。
3.  **授權額度**：檢查 Jamf Pro 的授權席次 (License Count) 是否已滿。
`
            },
            {
                id: 'enr-6',
                question: '可以手動安裝描述檔來註冊嗎 (使用者自行啟動註冊)？',
                tags: ['手動註冊', 'UIE'],
                answer: `
**可以，但不建議用於公用載具。**

透過 Safari 連線至 Jamf 註冊頁面 (enrollment URL) 下載描述檔安裝。
*   **缺點**：使用者可以隨時在設定中移除描述檔 (脫管)，且無法達到「受監管 (Supervised)」的高權限狀態。
*   **建議**：公用載具請務必走 **ADE (自動裝置註冊)** 流程。
`
            }
        ]
    }
]
