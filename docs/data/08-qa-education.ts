import { QASection } from '../types'

export const educationQA: QASection[] = [
  {
    title: '第八部分：教育場域常見情境 (Education Scenarios)',
    items: [
      {
        id: 'edu-01',
        question: 'iPadOS 17 以上沒有 VPN 圖示，這樣正常嗎？',
        important: true,
        tags: ['精進方案', 'VPN', 'Jamf Trust'],
        answer: `
**正常現象。**
新版 iPadOS 17 改用 **DNS Proxy** 技術進行過濾，不再顯示 VPN 圖示。
只要 **Jamf Trust App** 顯示**綠色盾牌**，即代表防護運作中。
`
      },
      {
        id: 'edu-02',
        question: '「共用 iPad (Shared iPad)」跟一般的 iPad 有什麼不同？',
        tags: ['Shared iPad', '多帳號'],
        answer: `
**一般 iPad (1-to-1)**：
也就是「個人載具」。整台機器隨時保持同一位使用者的資料。

**共用 iPad (Shared iPad)**：
*   **多帳號登入**：學生點擊自己的頭像登入。
*   **雲端同步**：登入後自動下載該學生的作業與檔案；登出後資料自動上傳雲端並從本機清除 (或暫存)。
*   **訪客模式**：允許臨時使用者登入，但登出後資料**完全不保留**。
`
      },
      {
        id: 'edu-04',
        question: '班級輪替時，如何快速整理平板給下一班使用？',
        tags: ['課堂管理', 'SOP'],
        answer: `
**建議流程**：

1.  **若使用訪客模式**：
    *   請學生點擊 **「登出」**。資料會在一瞬間自動清除，即可直接交給下一班。
2.  **若使用一般模式**：
    *   **登出帳號**：這最重要。請學生登出 Google Classroom、Canva 等個人帳號。
    *   **清理相簿**：刪除課堂拍攝的照片。
    *   **MDM 重置 (Return to Service)**：若需徹底還原，管理員可發送清除指令，讓平板在 5 分鐘內自動重灌並連回網路。
`
      },
      {
        id: 'edu-07',
        question: '覺得平板變慢、卡卡的，是不是壞掉了？',
        tags: ['效能', '故障排除'],
        answer: `
**通常不是壞掉。**
常見原因：
1.  **太久沒關機**：建議每週**重新啟動**一次。
2.  **正在背景更新**：剛好遇到 iOS 更新或 App 大量更新。
3.  **儲存空間不足**：檢查空間是否被影片塞滿。
`
      },
      {
        id: 'edu-10',
        question: '為什麼 App Store 不見了？我要怎麼下載 App？',
        important: true,
        tags: ['App Store', 'Self Service'],
        answer: `
**因為學校把 App Store 藏起來了 (為了管理)。**

請改用 **「Self Service (自助服務)」** App。
這是學校專屬的 App 商店，裡面只有經過老師與學校審核通過的 App，點擊即可安裝，完全**不需要 Apple ID 密碼**。
`
      },
      {
        id: 'edu-11',
        question: '我可以登入自己的 Apple ID 下載以前買過的遊戲嗎？',
        tags: ['Apple ID', '公私分明'],
        answer: `
**不建議，且通常被禁止。**
1.  **資料混雜**：您的私人照片與聯絡人會同步到公用平板上。
2.  **管理衝突**：可能會導致 VPP 授權指派失敗。
3.  **建議**：若有教學需求，請由學校統購並透過 MDM 派送。
`
      },
      {
        id: 'edu-20',
        question: '感覺 MDM 很耗電？',
        tags: ['電池', '迷思'],
        answer: `
**這是迷思。**
MDM 在背景久久才連線一次，耗電量極低。
真正耗電的殺手通常是：**螢幕亮度開全亮**、**長時間開啟定位 (如地圖)**、或 **AirDrop 持續搜尋中**。
`
      },
      {
        id: 'edu-16',
        question: '收到 iOS 更新通知，我可以馬上更新嗎？',
        tags: ['系統更新', '穩定性'],
        answer: `
**先等等！(N-1 原則)**
新版 iOS剛推出時，可能會造成某些舊教學 App 閃退或 MDM 功能異常。
建議**等待學校通知**，或由管理員統一在夜間進行排程更新。
`
      },
      {
        id: 'edu-03',
        question: '老師的 iPad 跟學生的 iPad 有什麼不一樣？',
        tags: ['角色差異', '權限'],
        answer: `
**Teacher Device (老師版)**：
*   權限較大，通常允許自行安裝 App。
*   已安裝 **Apple 課堂** 與 **Jamf Teacher**，擁有管理權。

**Student Device (學生版)**：
*   權限受限，App Store 被隱藏。
*   受 **「學生限制描述檔」** 管控 (如上課時無法上網、無法用相機)。
`
      }
    ]
  }
]
