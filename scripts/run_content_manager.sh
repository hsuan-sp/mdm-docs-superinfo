#!/bin/bash
# Content Manager 啟動腳本

cd "$(dirname "$0")/.."

echo "🚀 啟動 MDM Support Site 內容管理工具..."
echo ""

# 檢查 Python
if ! command -v python3 &> /dev/null; then
    echo "❌ 錯誤: 找不到 python3"
    echo "請先安裝 Python 3"
    exit 1
fi

# 檢查 tkinter
if ! python3 -c "import tkinter" &> /dev/null; then
    echo "❌ 錯誤: 找不到 tkinter 模組"
    echo ""
    echo "請執行以下命令安裝:"
    echo "  brew install python-tk@3.11"
    exit 1
fi

# 設置 PATH 以包含常見的 Node.js 路徑 (針對 macOS)
export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

# 執行的工具
python3 scripts/content_manager.py

echo ""
echo "✅ 工具已關閉"
