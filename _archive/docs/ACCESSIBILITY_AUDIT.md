# 全面易取用性審查報告 (2026 標準)

## 📐 解析度支援範圍

- **最小**：800×600 (舊設備/小視窗)
- **常見**：1920×1080 (Full HD)
- **高解析度**：2560×1440 (2K)
- **超高解析度**：3840×2160 (4K)

---

## 🔍 當前問題識別

### A. **極小解析度 (800×600) 問題**

#### 1. **Navbar 過於擁擠**

- ❌ Logo + 導航連結 + Resources + UserCenter 可能溢出
- ❌ 字體過小難以點擊
- ✅ **解決方案**：
  - 優先使用 hamburger 選單（<1024px）
  - Logo 簡化至只顯示圖示
  - 增加觸控目標至最小 44×44px

#### 2. **卡片排列問題**

- ❌ 三欄卡片在小屏會變形
- ✅ **解決方案**：
  - 800px以下：單欄
  - 800-1024px：雙欄
  - 1024px以上：三欄

#### 3. **Dialog/Modal 問題**

- ❌ ReportIssueDialog 在 800×600 可能超出視窗
- ✅ **解決方案**：
  - 最大高度限制：`max-h-[90vh]`
  - 內容區域可滾動
  - padding 響應式縮減

### B. **4K 解析度問題**

#### 1. **文字過小**

- ❌ 在 4K 螢幕上，16px 字體顯得極小
- ✅ **解決方案**：
  - 使用 `clamp()` 函數：`clamp(14px, 1vw, 18px)`
  - 或使用 `@media (min-width: 2560px)` 增大基礎字體

#### 2. **最大寬度限制**

- ❌ 內容區域可能過窄（浪費空間）
- ✅ **解決方案**：
  - 首頁：`max-w-7xl` → `max-w-[1600px]`
  - Guide/Glossary：`max-w-none` 但維持適當 padding

#### 3. **圖示與按鈕**

- ❌ 圖示可能顯得過小
- ✅ **解決方案**：
  - 在超大螢幕增加圖示尺寸：`2xl:w-6 2xl:h-6`

### C. **半透明度可讀性問題**

#### 1. **背景漸層 vs 文字對比**

- ⚠️ 當前背景：`rgba(59, 130, 246, 0.08)` 可能影響低對比度
- ✅ **解決方案**：
  - 所有文字容器使用不透明背景
  - 或增加文字陰影/描邊

#### 2. **Navbar 半透明**

- ⚠️ 滾動時背景半透明可能降低可讀性
- ✅ **解決方案**：
  - 滾動後使用完全不透明背景
  - 或使用更重的 `backdrop-blur-xl`

#### 3. **Footer 半透明**

- ⚠️ `bg-zinc-50/50` 可能不夠清晰
- ✅ **解決方案**：
  - 改為 `bg-zinc-50` (完全不透明)

### D. **操作一致性問題**

#### 1. **按鈕樣式不統一**

- ⚠️ 有些按鈕 `rounded-full`，有些 `rounded-xl`
- ✅ **解決方案**：
  - 統一主要 CTA：`rounded-2xl`
  - 統一次要按鈕：`rounded-xl`
  - 統一圖示按鈕：`rounded-full`

#### 2. **Hover 效果不一致**

- ⚠️ 有些有 `hover:scale`，有些沒有
- ✅ **解決方案**：
  - 統一互動元素：`hover:scale-105 active:scale-95`
  - 統一過渡時間：`transition-all duration-200`

#### 3. **間距系統不一致**

- ⚠️ 有些用 `gap-2`，有些 `gap-3`，沒有明確規則
- ✅ **解決方案**：
  - 定義間距系統：
    - Compact: `gap-2` (8px)
    - Normal: `gap-4` (16px)
    - Comfortable: `gap-6` (24px)

---

## ✅ 優先改善清單

### 🔴 Critical (立即修復)

1. **ReportIssueDialog 響應式**
   - 添加 `max-h-[90vh]` 和 `overflow-y-auto`
   - 小屏 padding 縮減

2. **Navbar 觸控目標**
   - 所有按鈕最小 44×44px
   - 間距增加避免誤觸

3. **半透明度修正**
   - Footer 改為完全不透明
   - 確保所有文字容器有足夠對比度

4. **字體大小響應式**
   - 添加 4K 支援
   - 確保最小可讀性

### 🟡 Important (近期改善)

5. **卡片響應式斷點**
   - 優化 800px 以下顯示
   - 4K 顯示優化

6. **統一按鈕樣式**
   - 建立 Button 組件
   - 統一 rounded、hover、transition

7. **間距系統標準化**
   - 文件化間距規則
   - 全站統一應用

### 🟢 Enhancement (持續優化)

8. **動畫性能優化**
   - 使用 `transform` 和 `opacity` (GPU 加速)
   - 避免 `height`、`width` 動畫

9. **可訪問性 (a11y)**
   - 所有互動元素有 `aria-label`
   - 鍵盤導航支援
   - Focus visible 樣式

10. **深色模式對比度**
    - WCAG AAA 標準
    - 確保所有文字對比度 > 7:1

---

## 📱 響應式斷點策略

```css
/* 定義明確的斷點 */
xs:  0-639px    /* 極小螢幕、舊設備 */
sm:  640-767px  /* 小型手機 */
md:  768-1023px /* 平板直向 */
lg:  1024-1279px /* 平板橫向、小筆電 */
xl:  1280-1535px /* 筆電、桌機 */
2xl: 1536-2559px /* 大螢幕 */
3xl: 2560+px     /* 2K/4K (需自訂) */
```

### 內容寬度策略

```
800×600:    100% - 32px padding
1920×1080:  max-w-7xl (1280px)
2560×1440:  max-w-[1600px]
3840×2160:  max-w-[2000px]
```

---

## 🎨 半透明度使用規範

### ✅ 可以使用半透明

- 裝飾性背景（不含文字）
- Overlay/Modal 背景（黑色半透明）
- 分隔線：`border-zinc-200/50`

### ❌ 避免半透明

- 文字背景（必須完全不透明）
- 按鈕背景（影響可點擊性）
- 表單輸入框背景

### 半透明度檢查清單

- [ ] 確保文字對比度 ≥ 4.5:1 (WCAG AA)
- [ ] 使用 `backdrop-blur` 增強可讀性
- [ ] 深色模式單獨測試
- [ ] 在不同背景上測試

---

## 🧪 測試清單

### 解析度測試

- [ ] 800×600 (Chrome Dev Tools)
- [ ] 1366×768 (常見筆電)
- [ ] 1920×1080 (Full HD)
- [ ] 2560×1440 (2K)
- [ ] 3840×2160 (4K，可用縮放模擬)

### 設備測試

- [ ] iPhone SE (375×667)
- [ ] iPhone 14 Pro (393×852)
- [ ] iPad (810×1080)
- [ ] MacBook Air (1280×800)
- [ ] iMac 27" (2560×1440)

### 功能測試

- [ ] 所有按鈕可點擊（最小 44px）
- [ ] 文字可讀（最小 14px）
- [ ] Modal 不超出視窗
- [ ] 導航在所有解析度下可用
- [ ] 卡片排列正確

---

## 📦 建議的組件系統

### Button Component

```typescript
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

// 統一樣式
primary:   bg-blue-600 hover:bg-blue-700 rounded-2xl
secondary: bg-zinc-100 hover:bg-zinc-200 rounded-xl
ghost:     hover:bg-zinc-100 rounded-full
danger:    bg-red-50 text-red-600 rounded-xl
```

### Typography System

```css
/* 響應式字體 */
--text-xs: clamp(10px, 0.875rem, 12px) --text-sm: clamp(12px, 0.875rem, 14px)
  --text-base: clamp(14px, 1rem, 18px) --text-lg: clamp(16px, 1.125rem, 20px)
  --text-xl: clamp(18px, 1.25rem, 24px) --text-2xl: clamp(20px, 1.5rem, 28px)
  --text-3xl: clamp(24px, 1.875rem, 36px);
```

### Spacing System

```css
--spacing-compact: 0.5rem /* 8px */ --spacing-normal: 1rem /* 16px */
  --spacing-comfortable: 1.5rem /* 24px */ --spacing-spacious: 2rem /* 32px */;
```

---

## 🚀 實施計劃

### Phase 1: Critical Fixes (立即)

1. ReportIssueDialog 響應式修正
2. Navbar 觸控目標優化
3. 半透明度修正
4. 基礎響應式斷點

### Phase 2: Consistency (本週)

5. 統一按鈕樣式系統
6. 統一間距規則
7. 4K 字體優化

### Phase 3: Polish (持續)

8. 動畫優化
9. 可訪問性增強
10. 性能優化

---

## 📊 成功指標

✅ **功能性**

- 所有功能在 800×600 到 4K 都可正常使用
- 無水平滾動條（在正常視窗寬度下）
- 所有互動元素可觸及

✅ **可讀性**

- 文字對比度 ≥ 4.5:1
- 最小字體 14px（或等效）
- 無文字截斷或重疊

✅ **一致性**

- 相同功能使用相同樣式
- 統一的 hover/active 效果
- 統一的間距系統

✅ **性能**

- 頁面載入 < 3s
- 互動回應 < 100ms
- 60fps 流暢動畫

✅ **可訪問性**

- 鍵盤可完全導航
- 螢幕閱讀器友好
- WCAG 2.1 AA 標準
