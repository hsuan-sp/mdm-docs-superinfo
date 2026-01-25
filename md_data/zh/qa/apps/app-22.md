---
id: app-22

title: "【番外篇-實務採購常見狀況】以 Procreate 與 Procreate Pocket 為例，這兩者有什麼差別？學校買錯了怎麼辦？"

category: "第三部分：應用程式分發與管理 (Apps & Books)"

important: false

tags: ["Procreate", "App 採購", "VPP", "通用購買", "退款"]
---

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
