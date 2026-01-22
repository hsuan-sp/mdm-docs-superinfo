#!/bin/bash
# Get the directory of the script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
EDITOR_SCRIPT="$SCRIPT_DIR/DualEditor.py"

# Use Official Python.org Python (Has Working Tkinter)
PYTHON_BIN="/Library/Frameworks/Python.framework/Versions/3.12/bin/python3"

echo "🚀 Starting Dual Editor (Python 3.12 Framework)..."

if [ ! -f "$PYTHON_BIN" ]; then
    echo "❌ Expected Python not found at $PYTHON_BIN"
    exit 1
fi

# Install dependencies
echo "⬇️ Ensuring dependencies..."
"$PYTHON_BIN" -m pip install --user tkhtmlview markdown pillow --upgrade --break-system-packages

# Run the editor
echo "🖥️ Launching DualEditor..."
"$PYTHON_BIN" "$EDITOR_SCRIPT"
