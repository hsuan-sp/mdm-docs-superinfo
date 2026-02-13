---
id: mac-9

title: "Jamf 的 Script (腳本) 功能 can do what? How to create and run?"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: false

tags: ["自動化", "Shell Script", "Zsh", "政策", "腳本", "jamfHelper"]
---

**腳本 (Scripts) 讓管理員能以 Root 權限在 Mac 上執行 Shell 指令，實現標準 MDM 描述檔 (Payload) 無法達成的進階客製化功能。**

Jamf Pro 的強大之處在於其專屬的二進位檔案 (Binary)，配合 **「政策 (Policies)」** 使用，可達成以下進階場景：

## 常見應用場景：

| 場景           | 腳本功能範例                                                                                        |
| :------------- | :-------------------------------------------------------------------------------------------------- |
| **使用者互動** | 使用 `jamfHelper` 彈出全螢幕公告或倒數計時視窗。                                                    |
| **系統清理**   | 定期刪除特定的快取檔案、暫存檔或重置印表機系統。                                                    |
| **進階安裝**   | 安裝 Homebrew、Rosetta 2 或呼叫 Installomator 自動更新軟體。                                        |
| **資產回報**   | 蒐集標準庫存欄位以外的資訊（如電池健康度百分比），回傳至 **「延伸屬性 (Extension Attributes)」** 。 |
| **權限管理**   | 暫時賦予使用者 Admin 權限並在指定時間後移除。                                                       |
| **AI 自動化**  | 透過腳本預先觸發 Apple Intelligence 模型的本機索引或語意搜索初始化。                                |
| **Swift 腳本** | 2026 年新趨勢：使用 Swift 撰寫更安全、更高效且支援原生 API 的自動化程式。                           |

## 2026 年趨勢：DDM 正在取代「重複性腳本」

以前需要靠腳本定期檢查系統狀態，現在 macOS 26 推薦使用 **DDM (宣告式管理)** 。

- **例子** ：以前用腳本定期刪除 `/tmp/` 下的大型快取，現在可定義 DDM 政策讓系統「原地自修 (Self-Healing)」，效能更好且更即時。

## 建立與部署流程 (SOP)：

1.  **撰寫腳本** ：
    - 建議使用 **Zsh** (`#!/bin/zsh`)，這是現代 macOS 的預設 Shell。 **注意：macOS 12.3 起已移除內建 Python 2.7，若需執行 Python 腳本需自行部署直譯器。**

1.  **上傳至 Jamf Pro** ：
    - 前往 **「設定」** > **「電腦管理」** > **「腳本 (Scripts)」** 。
    - 點選 **「+ 新增」** ，輸入顯示名稱並貼上腳本內容。
    - **參數設定** ：可設定 `$4` 到 `$11` 的參數標籤，讓同一支腳本透過不同政策帶入不同變數（例如：設定印表機 IP）。

1.  **透過政策執行** ：
    - 前往 **「電腦」** > **「政策 (Policies)」** > **「+ 新增」** 。
    - 設定 **「觸發程序 (Trigger)」** （如：報到 Recurring Check-in、登入時）。
    - 設定 **「腳本 (Scripts)」** 承載資料，選取剛才上傳的腳本。
    - 設定 **「範圍 (Scope)」** 指派給目標電腦。

1.  **執行頻率 (Frequency)** ：
    - 務必設定頻率（例如： **Once per computer** 僅執行一次，或 **Ongoing** 每次觸發都執行）。

## 實用範例：使用 jamfHelper 顯示公告

這是 Jamf 內建最強大的通知工具，位於 `/Library/Application Support/Jamf/bin/jamfHelper.app`。

```bash
#!/bin/bash

## 設定變數

HELPER="/Library/Application Support/JAMF/bin/jamfHelper.app/Contents/MacOS/jamfHelper"

TITLE="學校 資訊組公告"

HEADING="軟體更新通知"

DESC="您的電腦將在 10 分鐘後進行安全性更新，請儲存手邊的工作並連接電源。"

## 執行視窗

"$HELPER" -windowType utility -title "$TITLE" -heading "$HEADING" -description "$DESC" -button1 "我已了解" -defaultButton 1

```

## 實務建議：專家提示

- **權限** ：Jamf Pro 執行的腳本預設皆為 **Root (系統最高權限)** ，請務必先在測試機上驗證，以免誤刪重要系統檔。
- **登入使用者的執行** ：若需以當前登入使用者的身分執行指令（例如修改使用者的 Dock），需使用 `sudo -u $(stat -f%Su /dev/console) command` 的語法切換身分。
