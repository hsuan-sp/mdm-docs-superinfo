---
search: true
layout: false
---

# 術語表索引 (Glossary Index)

此頁面僅供搜尋引擎索引使用。

## AAS (Automatic Assessment Configuration)
自動評量設定。
一考場模式。考試鐘聲一響，自動把課本收起來，只准留原子筆和橡皮擦。

## ABM (Apple Business Manager)
Apple 商務管理。專為企業設計的網頁入口，集成了裝置註冊 (ADE)、內容購買 (VPP)、與角色管理。
企業的「數位總部」。註冊公司裝置、買 App、分派管理員權限都在這裡完成。

## Account-Driven User Enrollment
基於帳號的使用者註冊。使用者只需在「設定」中登入管理式 Apple ID，即可啟動 BYOD 註冊流程，無需掃描 QR Code。
登入即報到。不用填表單，刷了員工證（登入帳號）就自動完成入職手續。

## Activation Lock (啟用鎖定)
防盜功能，與「尋找」連動。裝置重置後需輸入原 Apple ID 密碼才能啟用。MDM 可透過 Bypass Code 繞過。
防小偷的「數位大鎖」。就算偷走重灌，沒有原主人的密碼也打不開，變磚頭一塊。

## Activation Lock Bypass Code
啟用鎖定略過代碼。MDM 自動擷取的一組英數代碼，可代替 Apple ID 密碼來解鎖被鎖定的受管裝置。
萬能鑰匙。員工離職沒交出密碼，公司可以用這把備用鑰匙把鎖打開。

## ACME (Automated Certificate Management Environment)
自動憑證管理環境。一種自動化申請與更新數位憑證的通訊協定。
憑證的「自動販賣機」。需要證件時不用人工審核，投幣自動發放。

## ADE (Automated Device Enrollment)
自動裝置註冊（舊稱 DEP）。讓新裝置開機連網後，自動向 MDM 報到並下載設定，實現零接觸部署。
入學報到單。一開機，Apple 就告訴它：「你是學校的財產，請去跟資訊組報到」。

## Admin Account (管理者帳號)
擁有最高系統權限的使用者帳號，可安裝軟體、修改所有設定。在受管裝置上通常由 IT 控管。
房東。有權拆牆壁、換鎖、把房客趕出去。

## AirDrop
Apple 裝置間的無線傳輸技術，利用藍牙搜尋與 Wi-Fi 點對點傳輸。
數位「傳紙條」。不需網路，手機對手機直接丟檔案，速度快。

## AirDrop for Business
管理功能。允許 MDM 限制 AirDrop 僅能在管理式 Apple ID 或特定聯絡人間使用，防止機密外洩。
公務傳送。規定上班時間傳紙條只能傳給同事，不能傳給路人。

## Always-on VPN
全時 VPN。強制裝置只要有網路，就必須建立 VPN 連線，確保所有流量都經過加密通道。
專車接送。不管你去哪，一定要坐公司的防彈專車，不能自己走路或搭公車。

## APNs (Apple Push Notification service)
Apple 推播服務。MDM 與裝置通訊的橋樑，用於喚醒裝置以接收指令。
MDM 的「傳令兵」。MDM 不能直接對平板大叫，要靠 Apple 幫忙傳話。

## App Config (App Configuration)
App 設定配置。MDM 可在安裝 App 時一併派送 XML 設定檔，預先填好伺服器網址或使用者資訊。
預填表單。發給你的 App 已經幫你填好伺服器地址，不用自己手動輸入。

## Apple Classroom (Apple 課堂)
教師專用 App。可監看學生畫面、鎖定 iPad、導引開啟特定 App。需藍牙與同網段 Wi-Fi。
隨堂助教。老師在講台上一鍵控制全班平板，還能偷看誰在玩遊戲。

## Apple Configurator
Mac 應用程式。用於手動透過 USB 連接來修復、更新、或將裝置加入 ABM/ASM (分派)。
重裝工廠。平板有大問題或要手動納管時，接上線進廠維修。

## Apple Silicon
Apple 自研晶片 (M1/M2/M3...)。具備高效能與特殊管理架構 (如利用 Volume Owner 管理更新)。
蘋果引擎。

## ARD (Apple Remote Desktop)
Apple 的高階遠端管理軟體。可進行大規模畫面監控、檔案派送與 UNIX 指令執行。
千里眼。管理者坐在辦公室就能看到並控制整棟樓的 Mac。

## ASM (Apple School Manager)
Apple 校務管理。教育機構專用的 web portal，整合 SIS、裝置指派與內容購買。
學校的「數位教務處」。

## Asset Tag (資產標籤)
組織自訂的設備編號，可寫入裝置資訊並顯示於鎖定畫面。
財產編號。

## B2B App (Custom App)
客製化 App。由開發者透過 ABM 私有發布給特定企業的 App，不上架公開 App Store。
隱藏菜單。只有內部員工才點得到的特製餐點。

## Beta Profile
測試版描述檔。安裝後可讓裝置接收 iOS Beta 測試版更新。生產環境應禁止。
白老鼠證。持有這張證就可以去試吃還沒上市的新菜（不保證不會拉肚子）。

## Bootstrap Token
macOS 引導代幣。賦予 MDM 管理 Secure Token 的權限，讓 MDM 能授權新使用者或安裝更新。
授權信物。MDM 擁有這個信物，才能指揮加密晶片做高權限動作。

## Captive Portal
強制登入頁面。連上 Wi-Fi 後跳出的網頁認證畫面。MDM 部署通常應避開此類網路以免中斷。
連線路障。要上網前得先看廣告或輸入帳密，機器人（MDM）通常會被卡住過不去。

## Content Filter (內容過濾)
限制瀏覽特定網站的功能。iPadOS 17+ 使用 DNS/Socket 過濾技術。
網路守門員。

## Declarative Management (宣告式管理)
新一代 MDM 協定。裝置主動判定是否符合條件並套用設定，減輕伺服器負擔並提高反應速度。
自動駕駛。不用伺服器一步步教，給裝置規則書，它自己會看狀況應變。

## Deferral (延遲更新)
延遲 OS 更新可見天數（最多90天）。
新版遮蔽眼罩。戴上後90天內看不到有更新通知。

## DNS Proxy
Jamf Trust 在 iPadOS 17+ 使用的過濾技術，攔截 DNS 查詢以阻擋惡意網站。
網址過濾員。你想去哪，先問他地址對不對，壞地址直接不告訴你路。

## Federated Authentication (聯合驗證)
連結 ABM 與 Google/Azure AD，讓員工用公司原本帳號登入 Apple ID。
帳號通。

## Gatekeeper
macOS 安全機制。阻擋未簽署或惡意的軟體執行。
警衛。只放行有識別證（簽署）的人進來。

## Jamf Connect
Jamf 產品。用於同步 Mac 本機帳戶與雲端 IdP (Google/Azure) 密碼。
雲端登入外掛。

## Jamf Trust
安全性 App。提供內容過濾與數據回報。
數位通行證。

## LAPS (Local Admin Password Solution)
本機管理員密碼解決方案。自動定期更換管理員密碼。
自動換鎖。每天自動換門鎖密碼，就算今天被偷看，明天也沒用了。

## Managed App (受管 App)
由 MDM 安裝並管理的 App。MDM 可隨時移除並備份資料。
公發軟體。

## Managed Open In
資料流向限制。禁止將受管 App (如 Mail) 的附件用非受管 App (如個人 Line) 開啟。
公文不落地。公家的文件只能用公家的軟體開，不能傳到私人信箱。

## N-1 Strategy
更新策略。保持在最新版本的前一個版本，以確保穩定性。
老二哲學。不搶頭香，等別人試過沒問題再更新。

## Per-App VPN
單一 App VPN。只有開啟特定 App 時才建立 VPN 連線。
App 專用通道。開公文系統才連回公司，看 YouTube 就走一般網路。

## Platform SSO
macOS 13+ 新功能。在系統層級整合雲端身分 (IdP)，取代傳統綁定 AD。
新版帳號整合。

## Rapid Security Response
快速安全回應。小型更新，不需重開機即可修補漏洞。
熱修補。

## Return to Service
重置後自動連回 Wi-Fi 並重新註冊。
轉生保留記憶。死掉重來（重置）但還記得路，馬上跑回來報到。

## Supervision (受監管)
最高管理權限模式。
完全託管。

## Volume Owner
磁碟擁有者 (Apple Silicon)。擁有授權 Mac 啟動與更新權限的使用者。
啟動鑰匙持有人。

## Volume Purchasing (VPP)
大量採購計畫。批量購買 App 授權。
App 團購。
