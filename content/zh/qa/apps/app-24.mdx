---
id: app-24

title: "iOS 26 如何限制學生只能透過 Wi-Fi 下載 App，避免消耗行動數據？"

category: "第三部分：應用程式分發與管理 (Apps & Books)"

important: false

tags: ["行動數據", "Wi-Fi", "App 下載", "流量管理", "iOS 26"]
---

**iOS 26 與 iPadOS 26 的宣告式裝置管理 (DDM) 功能新增了「限制透過行動網路下載 App」的設定，允許學校強制學生只能在 Wi-Fi 環境下下載或更新 App，有效控管 SIM 卡流量。**

## 設定方式

此功能透過 **Declarative Device Management (DDM)** 實現，具體設定路徑視 MDM 系統而異：

### Jamf Pro ：

1.  進入 **Blueprints** 或 **App Declarations** 。
2.  針對個別受管 App 進行定義。
3.  在部署宣告中設定 **「CellularDataPolicy」** ：
    - **Disallow (不允許)** ：強制僅能透過 Wi-Fi 下載。
    - **Allow (允許)** ：不分網路類型執行安裝。

4.  部署至目標裝置群組 (需 iOS/iPadOS 18+ 且為受管與監管裝置)。

### Microsoft Intune ：

- 在裝置設定描述檔的 App Store 限制中，可找到相關設定選項。

## 適用情境與效益

- **行動方案裝置** ：部分縣市配發的 iPad 或 Chromebook 插有 SIM 卡且流量有限（如每月 10GB）。此設定可防止學生在校外誤下載大型 App 或遊戲導致流量耗盡。
- **BYOD 管理** ：對於家長付費行動上網的個人裝置，此設定也能協助控管使用行為，避免產生高額帳單。

## 影響範圍與注意事項

- **影響範圍** ：
  - App Store 手動下載。
  - MDM 透過 DDM 指派的 App 自動安裝。
  - App 自動更新。

- **不影響項目** ：
  - 一般網頁瀏覽與影片串流（學生觀看 YouTube 仍會消耗流量，需另外透過 Content Filter 管控）。
  - 已下載 App 內的內容更新（如遊戲內的資料包）。

- **使用者體驗** ：當學生在 4G/5G 環境嘗試下載 App 時，下載按鈕會反灰或顯示提示訊息「請連接 Wi-Fi 以下載」。

## 專家建議 ：

此設定僅能控管 App 本體的下載，若要全面管理行動數據使用，建議搭配：

- **Content Filter** ：限制特定網站或串流服務的存取。

- **Per-App VPN** ：將特定 App 的流量導向 VPN，僅在校內網路可用。
- **使用者教育** ：教導學生辨識會消耗大量流量的行為。
