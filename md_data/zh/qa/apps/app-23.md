---
id: app-23

title: "什麼是「Declarative App Management (宣告式 App 管理)」？與傳統 VPP App 指派有什麼不同？"

category: "第三部分：應用程式分發與管理 (Apps & Books)"

important: true

tags: ["DDM", "App 管理", "宣告式", "自動更新", "iOS 26"]
---

**Declarative App Management (宣告式 App 管理) 是 iOS 26、iPadOS 26 與 macOS 26 引入的全新機制，讓裝置能夠「自主」管理 App 的安裝與更新狀態，取代傳統依賴 MDM 伺服器頻繁發送指令的模式。**

## 傳統 VPP vs. 宣告式 App 管理

| 特性         | 傳統 MDM (InstallApplication Command)                  | 宣告式 App 管理 (App Declaration)                                                     |
| :----------- | :----------------------------------------------------- | :------------------------------------------------------------------------------------ |
| **觸發機制** | MDM 伺服器必須「主動」發送安裝指令，若失敗需伺服器重試 | MDM 只需傳送「宣告 (Declaration)」，裝置會 **自主** 嘗試安裝直到成功                  |
| **狀態回報** | 被動。MDM 需定期輪詢 (Check-in) 才能知道安裝進度       | **即時 (Real-time)** 。安裝成功、失敗或下載中，裝置會透過 Status Channel 立即主動回報 |
| **更新控制** | 只能設定全域「自動更新」或手動推送更新                 | 可針對 **個別 App** 設定：強制更新、延遲更新、或依循使用者偏好設定                    |
| **部署範圍** | App Store App、VPP App                                 | App Store App、VPP App、Custom App，macOS 也支援 .pkg 安裝檔                          |

## 適用平台與版本

- **iOS 26 / iPadOS 26** ：支援 App Store App、Custom App 的宣告式管理。
- **macOS 26 (Tahoe)** ：除 App 外，也支援 .pkg 安裝檔的宣告式部署。
- **visionOS 26** ：同樣支援宣告式 App 管理。

## Jamf Pro 設定方式

在支援 DDM 的 Jamf Pro 版本中：

1.  進入 **Blueprints** > **App Management**

2.  建立 **App Declaration**
3.  設定 **Installation Behavior** ：
    - **Required (必要)** ：強制安裝，且使用者無法移除。若使用者刪除，裝置會自動重裝。
    - **Optional (選用)** ：出現在 Self Service 供下載，使用者可移除。

4.  設定 **Update Behavior** ：
    - **Automatic** ：永遠保持最新。
    - **Follow User Preference** ：依循使用者在 App Store 的自動更新設定。

## 部署建議

- **新裝置全面採用** ：對於符合版本需求的裝置，建議全面改用宣告式方式部署 App，可顯著降低伺服器負載並提升安裝成功率。
- **混合環境策略** ：舊版裝置仍需使用傳統 VPP 派送，Jamf Smart Groups 可協助區分新舊裝置並套用不同策略。
- **監控狀態回報** ：善用 DDM 的即時狀態回報功能，快速識別安裝失敗的裝置並採取對應措施。
