---
id: acc-14

title: "ASM 中新採購的裝置無法同步到 Jamf Pro？（ADE 伺服器代號續約）"

category: "第一部分：帳號與伺服器管理 (Account & Server Management)"

important: true

tags: ["ADE", "Server Token", "自動裝置註冊"]
---

**新採購的裝置若未出現在清單中，最常見的原因是「伺服器代號 (Server Token)」過期或裝置未指派。**

這是連結 Apple 校務管理 (ASM) 與 Jamf Pro 之間關於「硬體裝置」的橋梁（即原 DEP 流程）。它負責將 Apple 端的採購序號同步至 MDM 後台。

## 故障原因排查 ：

1.  **Token 過期** ：伺服器代號有效期為一年。過期後，Jamf Pro 無法從 Apple 擷取任何新序號或更新裝置的註冊狀態。
2.  **未指派裝置** ：新購買的裝置必須在 ASM 中指派給 Jamf Pro 的「MDM 伺服器」，Jamf Pro 才能看見它。
3.  **條款未同意** ：誠如前述（問題 acc-1），若有新條款未勾選，Apple 會暫停所有 ADE 的同步動作。

## 操作步驟：伺服器代號 (Server Token) 續約 ：

1.  登入 [school.apple.com](https://school.apple.com)。
2.  點選左下角帳號名稱 > **「偏好設定」** > **「您的 MDM 伺服器」** 。
3.  選擇對應的伺服器名稱，點選 **「下載代號 (Download Token)」** 。
4.  登入 Jamf Pro，前往 **「設定」>「全域管理」>「裝置註冊 (Device Enrollment)」** 。
5.  點選您的伺服器項目進入，上傳新下載的代號檔案完成更新。

## 關於同步的現況 ：

- **立即同步 (Sync Now)** ：這是一項長年存在的功能，當您在 ASM 完成指派後，若希望 Jamf Pro 立即顯示新序號，可點選此按鈕。
- **自動化趨勢** ：在現今的系統版本下，Apple 已強化了背景推送機制，通常在 ASM 指派後數分鐘內系統會自動更新，但若遇到延遲，「立即同步」仍是管理員排除故障的首選工具。

## 實務建議 ：

建議在 ASM 中設定「預設裝置指派」，讓未來所有新購的 iPad/Mac 自動指派給您的 Jamf Pro 伺服器。這樣您只需每年定期續約一次 Token，就能實現完全自動化的裝置入庫流程。
