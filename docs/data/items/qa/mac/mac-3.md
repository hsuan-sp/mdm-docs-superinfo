---
id: mac-3
title: "如何派送非 App Store 的軟體（如 Chrome, Adobe, Office）？"
category: "第七部分：Mac 裝置管理 (Mac Management)"
important: false
tags: ["軟體派送","App Installers","PKG","自動更新"]
---

## Q: 如何派送非 App Store 的軟體（如 Chrome, Adobe, Office）？

## Answer

**放棄手動打包。請優先使用 Jamf Pro 的「App Installers」服務，**
**實現「隨選即裝」與「自動更新」。**

在 Mac 管理中，軟體派送曾經是最繁瑣的工作（下載 DMG -> 封裝成 PKG -> 上傳 -> 測試）。
現在有更聰明的方法。

**現代化軟體部署層級：**

**Level 1：Jamf App Installers 與 DDM 宣告式管理 (首選)**

* **2026 年演進**：結合 **DDM (Declarative Device Management)** 軟體管理。
* **原理**：管理員不再只是「發送安裝命令」，而是「宣告該裝置必須擁有此軟體」。
* **優勢**：**具備自癒性 (Self-Healing)**。若學生誤刪了受管 App（如 Chrome），Mac 會主動發現狀態不一致，並在背景自動補回安裝，大幅減少組長的重複工單。
* **自動更新**：確保全校瀏覽器永遠處於最新安全版本。

**Level 2：Mac App Store (VPP)**

* 適用於 Keynote, GarageBand, Goodnotes 等上架於商店的 App。
* 透過 ASM 購買授權 (VPP) 並指派給裝置，可實現靜默安裝與更新。

**Level 3：手動 PKG 部署 (最後手段)**

* 適用於校務行政系統、特定的驅動程式或沒有在 App Catalog 中的冷門軟體。
* **工具**：使用 **Jamf Composer** 進行快照 (Snapshot) 或封裝。
* **流程**：將軟體打包為 `.pkg` 或 `.mpkg` > 上傳至 Jamf Pro > 建立 Policy 派送。

**實務建議**：

對於 Adobe Creative Cloud (CC)，建議使用 Adobe Admin Console 建立

**「Shared Device License (共用裝置授權)」** 的安裝包，

再透過 Jamf Pro 派送，以符合電腦教室多人共用的授權規範。
