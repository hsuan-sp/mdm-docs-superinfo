# Vercel to Netlify 遷移完整指南

## 🎯 為什麼要遷移到 Netlify？

- Vercel 可能將此專案視為商業用途（教育機構專用知識庫）
- Netlify 對非營利/教育專案更友善
- Netlify 提供慷慨的免費額度

---

## 📋 遷移前準備清單

### 1. **確認當前專案設定**

查看 `vercel.json`：

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs"
}
```

### 2. **環境變數清單**

需要從 Vercel 遷移的環境變數：

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
CLERK_SECRET_KEY=YOUR_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

---

## 🚀 Netlify 遷移步驟

### Step 1: 創建 Netlify 配置檔

創建 `netlify.toml` 在專案根目錄：

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "10"

[[plugins]]
  package = "@netlify/plugin-nextjs"

# 重定向規則
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# 自訂 headers（安全性）
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
```

### Step 2: 安裝 Netlify CLI（本機測試用）

```bash
npm install -g netlify-cli
```

### Step 3: 本機測試 Netlify Build

```bash
# 測試 build
netlify build

# 本機預覽
netlify dev
```

### Step 4: 準備部署

#### 選項 A：透過 Netlify UI（推薦）

1. 前往 https://app.netlify.com
2. 點擊「Add new site」→「Import an existing project」
3. 選擇 GitHub repository
4. 設定：
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Functions directory**: 留空（Next.js 會自動處理）

#### 選項 B：透過 CLI

```bash
# 登入 Netlify
netlify login

# 初始化專案
netlify init

# 部署
netlify deploy --prod
```

### Step 5: 設定環境變數

在 Netlify Dashboard：

1. 進入 Site settings → Environment variables
2. 添加所有環境變數：

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = YOUR_LIVE_PUBLISHABLE_KEY  # 注意：改為 production key
CLERK_SECRET_KEY = YOUR_LIVE_SECRET_KEY                   # 注意：改為 production key
NEXT_PUBLIC_CLERK_SIGN_IN_URL = /sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL = /sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL = /
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL = /
```

### Step 6: 設定自訂域名（可選）

1. Site settings → Domain management
2. 添加自訂域名
3. 更新 DNS 設定：
   - CNAME: `your-site.netlify.app`
   - 或 A record: Netlify IP

---

## 🔐 Clerk Production 模式設定

### Step 1: 升級到 Production

1. 前往 https://dashboard.clerk.com
2. 選擇你的專案
3. 點擊左下角「Upgrade to Production」

### Step 2: 驗證網域

1. Settings → Domains
2. 添加你的 production 域名：
   ```
   https://your-domain.com
   ```
3. Clerk 會提供驗證 DNS 記錄
4. 添加到你的 DNS provider：
   ```
   Type: CNAME
   Name: _clerk
   Value: clerk-verify.your-app-id.clerk.accounts.dev
   ```

### Step 3: 更新 API Keys

Production 模式後，Clerk 會給你新的 keys：

```env
# Development (舊的，保留用於本機開發)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key

# Production (新的，用於 Netlify)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_live_publishable_key
CLERK_SECRET_KEY=your_live_secret_key
```

### Step 4: 設定 Allowed Origins

在 Clerk Dashboard：

1. Settings → API Keys
2. Allowed origins：
   ```
   https://your-netlify-site.netlify.app
   https://your-custom-domain.com
   http://localhost:3000  # 保留用於開發
   ```

### Step 5: 更新重定向 URLs

1. Settings → Paths
2. 設定：
   ```
   Sign-in URL: /sign-in
   Sign-up URL: /sign-up
   After sign-in: /
   After sign-up: /
   ```

---

## 📝 遷移 Checklist

### 準備階段

- [ ] 創建 `netlify.toml`
- [ ] 本機測試 `netlify build`
- [ ] 導出 Vercel 環境變數
- [ ] 準備 Clerk production keys

### Netlify 設定

- [ ] 創建 Netlify 帳號
- [ ] 連接 GitHub repository
- [ ] 設定 build settings
- [ ] 添加環境變數
- [ ] 測試部署

### Clerk Production

- [ ] 升級到 production plan
- [ ] 驗證域名
- [ ] 更新 API keys（Netlify 環境變數）
- [ ] 設定 allowed origins
- [ ] 測試登入/登出功能

### 驗證測試

- [ ] 首頁載入正常
- [ ] Guide/Glossary/Changelog 正常運作
- [ ] 登入/登出功能正常
- [ ] 行動版選單正常
- [ ] 語言切換正常
- [ ] 深色模式正常
- [ ] API routes 正常

---

## 🔄 環境變數對照表

| Vercel                | Netlify                               | 說明     |
| --------------------- | ------------------------------------- | -------- |
| Environment Variables | Site settings → Environment variables | 位置     |
| Production            | Production                            | 環境     |
| Preview               | Deploy previews                       | 預覽環境 |
| Development           | 可在本機 `.env.local`                 | 開發環境 |

---

## ⚠️ 注意事項

### 1. **Next.js 特性支援**

Netlify 需要 `@netlify/plugin-nextjs` 來支援：

- ✅ API Routes
- ✅ ISR (Incremental Static Regeneration)
- ✅ Middleware
- ✅ Image Optimization

安裝：

```bash
npm install -D @netlify/plugin-nextjs
```

### 2. **Build 時間限制**

| 平台    | 免費方案 Build 時間 |
| ------- | ------------------- |
| Vercel  | 6,000 分鐘/月       |
| Netlify | 300 分鐘/月         |

**建議**：

- 優化 build（已使用 Turbopack）
- 使用 cache（Netlify 自動處理）

### 3. **頻寬限制**

| 平台    | 免費方案頻寬 |
| ------- | ------------ |
| Vercel  | 100 GB/月    |
| Netlify | 100 GB/月    |

### 4. **Clerk 費用**

| 方案        | 月費   | MAU (Monthly Active Users) |
| ----------- | ------ | -------------------------- |
| Development | 免費   | 無限（開發用）             |
| Production  | $25/月 | 10,000 MAU                 |

**建議**：

- 如果是教育專案，可申請 Clerk 的教育優惠
- 監控 MAU 使用量

---

## 🚀 快速遷移腳本

創建 `scripts/migrate-to-netlify.sh`：

```bash
#!/bin/bash

echo "🚀 Starting Netlify migration..."

# 1. 創建 netlify.toml
cat > netlify.toml << 'EOF'
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[plugins]]
  package = "@netlify/plugin-nextjs"
EOF

# 2. 安裝 Netlify plugin
npm install -D @netlify/plugin-nextjs

# 3. 測試 build
echo "📦 Testing build..."
npm run build

# 4. 初始化 Netlify
echo "🌐 Initializing Netlify..."
netlify init

echo "✅ Migration preparation complete!"
echo "📝 Next steps:"
echo "1. Push code to GitHub"
echo "2. Set environment variables in Netlify dashboard"
echo "3. Deploy with: netlify deploy --prod"
```

---

## 💰 成本對比

### Vercel（當前）

- **免費方案限制**：
  - 可能被標記為商業用途
  - 需升級至 Pro ($20/月)

### Netlify（建議）

- **免費方案優勢**：
  - 對教育/非營利更友善
  - 無商業限制疑慮
  - 同等功能

### Clerk

- **Development**: 免費（當前）
- **Production**: $25/月
- **教育優惠**: 可申請折扣

**總成本**：

- Vercel: $0（有風險）或 $20/月
- Netlify: $0 + Clerk Production $25/月 = **$25/月**

---

## 📞 支援與資源

### Netlify

- 文件：https://docs.netlify.com/integrations/frameworks/next-js/
- 社群：https://answers.netlify.com/

### Clerk

- 文件：https://clerk.com/docs
- 教育優惠申請：https://clerk.com/pricing

---

## 🎯 立即執行（簡易版）

```bash
# 1. 創建 netlify.toml
echo '[build]
  command = "npm run build"
  publish = ".next"
[[plugins]]
  package = "@netlify/plugin-nextjs"' > netlify.toml

# 2. 安裝依賴
npm install -D @netlify/plugin-nextjs

# 3. Commit
git add netlify.toml package.json
git commit -m "chore: prepare for Netlify deployment"
git push

# 4. 前往 Netlify Dashboard 連接 repository
# 5. 設定環境變數
# 6. Deploy！
```

---

**遷移預估時間**：30-60 分鐘
**難度**：⭐⭐ 簡單（大部分是點擊設定）
**風險**：低（可先測試再正式遷移）
