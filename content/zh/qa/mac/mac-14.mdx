---
id: mac-14

title: "學校有多台網路印表機，如何透過 Jamf Pro 派送設定給老師的 Mac？"

category: "第七部分：Mac 裝置管理 (Mac Management)"

important: false

tags: ["印表機", "AirPrint", "lpadmin", "政策", "自助服務", "驅動程式"]
---

**現代化 Mac 列印部署應優先採用「AirPrint (免驅動)」協定。若需進階設定，則透過「政策 (Policies)」或 Shell 腳本執行 `lpadmin` 指令。**

在過去，Mac 管理員需花費大量時間打包驅動程式 (PPD)。但在 macOS 12 Monterey 之後，Apple 大力推動 IPP/AirPrint 通用協定，大幅簡化了流程。

**部署策略三部曲：**

### 方法一：Jamf Pro 原生政策 (最適合初學者)

Jamf Pro 內建了印表機對應介面，適合標準的網路印表機。

1. **新增印表機**：
   - 前往 **「設定」** > **「電腦管理」** > **「印表機」**。
   - 點選 **「+ 新增」**，輸入 IP 位址與顯示名稱。
   - **關鍵設定**：在「驅動程式」欄位，若印表機支援 AirPrint，可選擇 **「Generic PCL Laser Printer」** 或 **「Generic PostScript Printer」**，通常無需額外安裝廠商驅動。

1. **建立派送政策**：
   - 前往 **「電腦」** > **「政策」** > **「+ 新增」**。
   - 在 **「印表機」** 承載資料中，點選「安裝」剛才建立的印表機。
   - **觸發程序**：建議設為 **「自助服務 (Self Service)」**，讓老師根據自己所在的辦公室位置點選安裝。

### 方法二：Shell Script (進階/免驅動部署)

若需精確控制參數（如使用 `-m everywhere` 呼叫原生 AirPrint 驅動），腳本是最佳解。

```bash
#!/bin/bash

## 定義變數

PRINTER_NAME="Teacher_Office_HP"

DISPLAY_NAME="教務處 HP M404"

ADDRESS="ipp://192.168.1.100/ipp/print" # 請確認印表機支援 IPP

## 執行 lpadmin (使用 -m everywhere 自動抓取 AirPrint 描述檔)

## -E: 啟用印表機

## -o printer-is-shared=false: 禁止這台 Mac 再分享出去

/usr/sbin/lpadmin -p "$PRINTER_NAME" -D "$DISPLAY_NAME" -E -v "$ADDRESS" -m everywhere -o printer-is-shared=false

## (選用) 設定預設選項：啟用雙面列印

/usr/sbin/lpadmin -p "$PRINTER_NAME" -o Duplex=DuplexNoTumble

echo "Printer $DISPLAY_NAME installed successfully."

```

### 方法三：處理舊款需要驅動的印表機

若印表機太舊不支援 AirPrint，必須安裝廠商驅動：

1. **打包驅動**：下載廠商的 `.pkg` 驅動程式，上傳至 Jamf Pro。

1. **安裝驅動**：建立一個政策先安裝該 `.pkg`。
1. **對應 PPD**：
   - 在執行 `lpadmin` 腳本時，需指定 PPD 檔案在本機的路徑 (通常在 `/Library/Printers/PPDs/...`)。
   - 語法：`-P "/Library/Printers/PPDs/Contents/Resources/HP_LaserJet_v10.gz"`

**實務建議：最佳實踐 - 自助服務 (Self Service)**

- **痛點**：學校印表機眾多，全校派送會導致老師的選單出現數十台印表機，造成混亂。

- **解法**：將每台印表機做成一個 **「自助服務」** 項目，並附上位置說明（如：「安裝 - 二樓導師室印表機」）。讓老師走到哪、裝到哪，亦可減少驅動衝突。
