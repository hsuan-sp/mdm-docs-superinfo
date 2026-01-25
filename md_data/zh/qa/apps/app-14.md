---
id: app-14

title: "【TestFlight】可以讓老師使用「管理式 Apple 帳號」測試校內開發的 Beta 版 App 嗎？"

category: "第三部分：應用程式分發與管理 (Apps & Books)"

important: false

tags: ["TestFlight", "App Store Connect", "管理式 Apple 帳號", "服務存取"]
---

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
