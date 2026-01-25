# Nextra 3 → Nextra 4 遷移完整評估報告

## 📊 當前專案狀態分析

### 使用版本

- Nextra: 3.3.1 (Pages Router)
- Next.js: 14.2.15
- React: 18.3.1
- Clerk: 6.36.10

### 當前架構

```
專案結構:
├── pages/
│   ├── _app.tsx          # App 入口
│   ├── _document.tsx     # Document
│   ├── index.mdx         # 首頁
│   ├── guide.mdx         # Guide 頁面
│   ├── glossary.mdx      # Glossary 頁面
│   ├── changelog.mdx     # Changelog
│   └── api/              # API routes
├── theme.config.tsx      # Nextra 主題配置
├── components/           # React 組件
├── styles/              # 全局樣式
└── md_data/             # MDX 內容
```

---

## 🔄 遷移到 Nextra 4 完整步驟清單

### Phase 1: 準備工作 (1-2 小時)

#### 1.1 創建遷移分支

```bash
git checkout -b nextra-4-migration
git push -u origin nextra-4-migration
```

#### 1.2 備份關鍵配置

```bash
# 備份當前配置
cp theme.config.tsx theme.config.tsx.backup
cp next.config.js next.config.js.backup
cp package.json package.json.backup
```

#### 1.3 文件化當前設定

- 記錄所有自訂功能
- 截圖當前 UI
- 列出所有使用的 Nextra 功能

---

### Phase 2: 專案結構遷移 (3-5 小時)

#### 2.1 創建 App Router 結構

```bash
mkdir app
mkdir content  # 或選擇將 MDX 放在 app/ 下
```

#### 2.2 遷移文件結構

**選項 A：Content Directory Convention** (推薦)

```
舊結構 (Pages Router):        新結構 (App Router):
pages/                      → content/
  ├── index.mdx            →   ├── index.mdx
  ├── guide.mdx            →   ├── guide.mdx
  ├── glossary.mdx         →   ├── glossary.mdx
  └── changelog.mdx        →   └── changelog.mdx

新增:
app/
  ├── layout.tsx           # 主佈局
  ├── [[...slug]]/
  │   └── page.tsx         # MDX 路由處理
  └── api/                 # API routes (從 pages/api 移過來)
```

**選項 B：Page File Convention**

```
app/
  ├── layout.tsx
  ├── page.mdx             # 首頁
  ├── guide/
  │   └── page.mdx
  ├── glossary/
  │   └── page.mdx
  └── changelog/
      └── page.mdx
```

#### 2.3 創建必要的 App Router 文件

**app/layout.tsx** (新建)

```tsx
import { Layout, Navbar, Footer } from "nextra-theme-docs";
import { Logo, NavbarExtra } from "@/components/layout/NavbarItems";

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body>
        <Layout
          navbar={<Navbar logo={<Logo />} extra={<NavbarExtra />} />}
          footer={<Footer />}
          // 所有 theme.config.tsx 的選項移到這裡
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
```

**app/[[...slug]]/page.tsx** (如使用 Content Directory)

```tsx
import { compileMDX } from "nextra/compile";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { slug } = params;
  // MDX 編譯邏輯
}
```

**mdx-components.tsx** (專案根目錄或 app/)

```tsx
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents) {
  return {
    ...components,
    // 自訂 MDX 組件
  };
}
```

---

### Phase 3: 配置文件遷移 (2-3 小時)

#### 3.1 更新 next.config.js → next.config.mjs

```javascript
// ❌ 舊: next.config.js (CommonJS)
const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

module.exports = withNextra({
  reactStrictMode: true,
});

// ✅ 新: next.config.mjs (ESM)
import nextra from "nextra";

const withNextra = nextra({
  // theme 和 themeConfig 選項移除
  contentDirBasePath: "/content", // 可選
});

export default withNextra({
  reactStrictMode: true,
  // ... 其他 Next.js 配置
});
```

#### 3.2 遷移 theme.config.tsx 到 app/layout.tsx

**theme.config.tsx 的每個選項都需要手動遷移：**

| Nextra 3 (theme.config.tsx)        | Nextra 4 (app/layout.tsx)                              |
| ---------------------------------- | ------------------------------------------------------ |
| `logo`                             | `<Navbar logo={...} />`                                |
| `project.link`                     | `<Navbar projectLink={...} />`                         |
| `navbar.extraContent`              | `<Navbar extra={...} />`                               |
| `footer.component`                 | `<Footer component={...} />`                           |
| `sidebar.defaultMenuCollapseLevel` | `<Layout sidebar={{ defaultMenuCollapseLevel: 1 }} />` |
| `search.component`                 | `<Search component={...} />`                           |
| `toc.float`                        | `<Layout toc={{ float: true }} />`                     |
| `head`                             | 改用 Next.js Metadata API                              |

#### 3.3 更新 Metadata (Head Tags)

```tsx
// ❌ Nextra 3: theme.config.tsx
head: <>
  <meta name="viewport" content="width=device-width" />
  <link rel="icon" href="/favicon.ico" />
</>;

// ✅ Nextra 4: app/layout.tsx
export const metadata = {
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
};
```

---

### Phase 4: 組件與功能遷移 (3-4 小時)

#### 4.1 自訂組件檢查

```
需要檢查並可能重寫的組件:
✓ components/layout/NavbarItems.tsx
✓ components/layout/Footer.tsx
✓ components/layout/MobileNav.tsx
✓ components/features/Guide.tsx
✓ components/features/Glossary.tsx
✓ components/features/Changelog.tsx
✓ components/features/Home.tsx
```

#### 4.2 頁面組件遷移

**動態頁面 (Guide, Glossary, Changelog)：**

```tsx
// Nextra 3: pages/guide.mdx
import Guide from '@/components/features/Guide'
<Guide />

// Nextra 4: app/guide/page.tsx (Server Component)
import Guide from '@/components/features/Guide'

export default async function GuidePage() {
  const data = await fetch(...) // 可以直接在 server 獲取數據
  return <Guide data={data} />
}
```

#### 4.3 API Routes 遷移

```
pages/api/ → app/api/

// 語法也需要改變
// Nextra 3: export default function handler(req, res)
// Nextra 4: export async function GET(request)
```

---

### Phase 5: 搜尋功能遷移 (1-2 小時)

#### 5.1 安裝 Pagefind

```bash
npm install -D pagefind
```

#### 5.2 更新 package.json

```json
{
  "scripts": {
    "build": "next build",
    "postbuild": "pagefind --site .next"
  }
}
```

#### 5.3 更新搜尋組件配置

```tsx
// app/layout.tsx
import { Search } from "nextra-theme-docs";

<Layout search={<Search type="pagefind" />} />;
```

---

### Phase 6: 樣式遷移 (1-2 小時)

#### 6.1 Tailwind CSS 前綴更新

如果你有覆寫 Nextra 的樣式：

```css
/* Nextra 3 */
._container { ... }

/* Nextra 4 */
.x:container { ... }
```

#### 6.2 檢查 globals.css

```css
/* 確認沒有使用已棄用的 Nextra 內部類別 */
```

---

### Phase 7: 依賴升級 (30 分鐘)

```bash
# 升級到 Nextra 4
npm install nextra@4 nextra-theme-docs@4

# 升級 Next.js 到 15
npm install next@15

# 可選：升級 React 到 19
npm install react@19 react-dom@19

# 升級 Clerk (檢查相容性)
npm install @clerk/nextjs@latest

# 安裝 Pagefind
npm install -D pagefind
```

---

### Phase 8: 測試與驗證 (2-3 小時)

#### 8.1 功能測試清單

- [ ] 首頁正常顯示
- [ ] Guide 頁面正常運作
- [ ] Glossary 頁面正常運作
- [ ] Changelog 頁面正常運作
- [ ] 導航選單正常
- [ ] 行動版選單正常
- [ ] 搜尋功能正常
- [ ] 深色模式切換
- [ ] 語言切換
- [ ] Clerk 登入/登出
- [ ] API routes 正常
- [ ] 所有連結有效
- [ ] SEO metadata 正確

#### 8.2 效能測試

```bash
npm run build
npm run start

# 檢查:
- Build 是否成功
- 是否有警告
- Bundle size 是否合理
- 頁面載入速度
```

#### 8.3 瀏覽器測試

- Chrome
- Firefox
- Safari
- Edge
- 行動版 Safari/Chrome

---

## 🎯 Nextra 3 標準寫法檢查

### 當前專案需要修正的地方

#### ❌ 問題 1: theme.config.tsx 結構不完整

**當前問題**：

```tsx
// 缺少完整的 TypeScript 類型
const config = {
  logo: <Logo />,
  // ...
};
export default config;
```

**標準寫法**：

```tsx
import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <Logo />,
  project: { link: null },
  chat: { link: null },
  // ... 完整配置
};

export default config;
```

#### ❌ 問題 2: pages/\_app.tsx 可能不符合標準

需要檢查是否正確使用 Nextra 的佈局系統。

#### ✅ 已符合標準的部分

- MDX 文件結構
- 組件分離
- API routes 結構
- 動態數據載入

---

## 📊 遷移時間估算

| 階段     | 預估時間       | 難度                |
| -------- | -------------- | ------------------- |
| 準備工作 | 1-2 小時       | ⭐ 簡單             |
| 結構遷移 | 3-5 小時       | ⭐⭐⭐ 中等         |
| 配置遷移 | 2-3 小時       | ⭐⭐⭐⭐ 困難       |
| 組件遷移 | 3-4 小時       | ⭐⭐⭐ 中等         |
| 搜尋功能 | 1-2 小時       | ⭐⭐ 簡單           |
| 樣式調整 | 1-2 小時       | ⭐⭐ 簡單           |
| 依賴升級 | 30 分鐘        | ⭐ 簡單             |
| 測試驗證 | 2-3 小時       | ⭐⭐ 簡單           |
| **總計** | **14-22 小時** | **⭐⭐⭐⭐ 需專注** |

---

## ⚠️ 風險評估

### 高風險項目

1. **Server Components vs Client Components**
   - 需要決定哪些組件是 server/client
   - 當前所有組件都是 client components
   - 需要添加 `'use client'` 指令

2. **動態數據載入邏輯改變**
   - 當前在 client 端 fetch API
   - Nextra 4 鼓勵在 server 端載入

3. **Clerk 相容性**
   - 需要確認 Clerk 在 App Router 下的使用方式
   - 可能需要調整 middleware

### 中風險項目

1. **自訂組件重寫**
2. **路由結構改變**
3. **Metadata 處理**

### 低風險項目

1. **內容文件 (MDX)**
2. **樣式文件**
3. **靜態資源**

---

## 🚀 建議執行計劃

### 階段 1：現在 (穩定優化)

```bash
# 升級小版本到最新
npm install next@14.2.18 nextra@3.3.1 nextra-theme-docs@3.3.1

# 修正 Nextra 3 標準寫法
# 優化當前專案結構
```

### 階段 2：3 個月後 (評估遷移)

- Nextra 4.1 或 4.2 發布
- 社群有更多遷移案例
- 評估是否值得遷移

### 階段 3：6 個月後 (執行遷移)

- 排定 2-3 天的專注時間
- 按照本文件的步驟執行
- 充分測試後上線

---

## 📝 立即行動項目

1. ✅ 升級小版本依賴
2. ✅ 修正 theme.config.tsx 類型
3. ✅ 確認 pages/\_app.tsx 符合標準
4. ✅ 文件化所有自訂功能
5. ✅ 創建遷移檢查清單

---

**總結**：Nextra 4 遷移是一個中等複雜度的任務，需要 14-22 小時專注工作。建議先優化 Nextra 3 專案，等 Nextra 4 更成熟後再遷移。
