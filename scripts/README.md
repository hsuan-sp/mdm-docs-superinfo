# 開發工具腳本說明

## dev-clean 腳本

### 目的

自動清理佔用 port 的舊 dev server process，避免每次啟動時手動關閉。

### 支援平台

- ✅ **Windows** (使用 `netstat` + `taskkill`)
- ✅ **macOS** (使用 `lsof` + `kill`)
- ✅ **Linux** (使用 `lsof` + `kill`)

### 使用方式

#### 推薦方式（跨平台）

```bash
npm run dev:clean
```

#### Windows 專用（PowerShell）

```powershell
.\scripts\dev-clean.ps1
```

### 運作原理

#### Windows

```bash
1. netstat -ano | findstr :3000  # 找到佔用 port 3000 的 PID
2. taskkill /F /PID <pid>        # 強制關閉 process
3. npm run dev                    # 啟動新 server
```

#### macOS/Linux

```bash
1. lsof -ti:3000                 # 找到佔用 port 3000 的 PID
2. kill -9 <pid>                 # 強制關閉 process
3. npm run dev                    # 啟動新 server
```

### 自訂 Port

如果需要使用不同的 port：

```bash
# 方式 1：環境變數
PORT=3001 npm run dev:clean

# 方式 2：修改 scripts/dev-clean.js
const PORT = 3001;
```

### 錯誤處理

腳本會自動處理以下情況：

- ✅ Port 已經是自由的（直接啟動）
- ✅ 多個 process 佔用同一 port（全部關閉）
- ✅ Process 已經不存在（忽略錯誤）
- ✅ 權限不足（顯示警告但繼續）

### 檔案說明

| 檔案            | 平台    | 用途                       |
| --------------- | ------- | -------------------------- |
| `dev-clean.js`  | 跨平台  | **推薦使用**，Node.js 腳本 |
| `dev-clean.ps1` | Windows | PowerShell 備用腳本        |

### 進階用途

#### 在 CI/CD 中使用

```yaml
# .github/workflows/test.yml
- name: Clean and start dev server
  run: npm run dev:clean
```

#### 在 Docker 中使用

```dockerfile
RUN npm run dev:clean
```

### 疑難排解

#### 問題 1：權限錯誤

**Windows**：以管理員身分執行 Terminal
**macOS**：可能需要 `sudo npm run dev:clean`

#### 問題 2：找不到 lsof (macOS)

```bash
# 安裝 lsof（通常已預裝）
brew install lsof
```

#### 問題 3：Port 仍被佔用

手動檢查：

```bash
# Windows
netstat -ano | findstr :3000

# macOS/Linux
lsof -ti:3000
```

### 日誌輸出

腳本會顯示彩色的狀態訊息：

- 🔍 **藍色**：檢查中
- ⚠️ **黃色**：發現舊 process
- ✓ **綠色**：成功操作
- ❌ **紅色**：錯誤訊息

### 安全性

- ✅ 只關閉指定 port 的 process
- ✅ 不會影響其他 process
- ✅ 使用強制關閉（-9/-F）確保清理乾淨
