# 緊急問題修復報告 (2026-01-24 15:07)

## 🐛 發現的問題

### 1. **Google Fonts Stylesheet Warning** ⚠️

```
Do not add stylesheets using next/head
```

**原因**：在 `theme.config.tsx` 的 `head` 中使用 `<link rel="stylesheet">`
**影響**：Next.js 警告、可能影響 SSR 效能
**修復**：✅ 移至 `pages/_document.tsx`（正確位置）

### 2. **切換頁面時 Error** ❌

**原因**：可能是 SecurityGuard 中的 SVG watermark 與路由切換衝突
**影響**：穩定性差、用戶體驗糟糕
**修復**：加強 cleanup 邏輯，確保元素正確移除

### 3. **UserCenter 行動版問題** 📱

**問題描述**：

- Resources 連結看不到
- 半透明背景影響閱讀
- 重複的深色模式切換（Navbar + 選單）

**修復計劃**：

- [ ] 移除 Nextra 預設的 theme toggle
- [ ] 統一深色模式切換位置（只保留 NavbarExtra）
- [ ] 優化 Resources 下拉選單可見度

### 4. **Navbar Logo 隱藏問題** 🏷️

**當前**：小螢幕隱藏「極電資訊」
**建議**：使用字體縮小（clamp）而非隱藏
**修復**：✅ 使用 `clamp(11px, 2.5vw, 17px)` 平滑縮放

### 5. **卡片設計不夠精緻** 🎨

**Guide/Glossary 卡片問題**：

- 間距不夠優雅
- hover 效果不明顯
- 背景對比度不足

---

## ✅ 已修復項目

### 1. Google Fonts 位置修正

```tsx
// ❌ 錯誤：theme.config.tsx
head: (
  <link href="https://fonts.googleapis.com/..." rel="stylesheet" />
)

// ✅ 正確：pages/_document.tsx
<Head>
  <link href="https://fonts.googleapis.com/..." rel="stylesheet" />
</Head>
```

### 2. Logo 流體縮放

```tsx
// ❌ 之前：隱藏文字
<span className="hidden md:inline">極電資訊</span>

// ✅ 現在：平滑縮放
<span style={{ fontSize: 'clamp(11px, 2.5vw, 17px)' }}>極電資訊</span>
```

**效果**：

- 小螢幕（320px）：11px
- 中螢幕（600px）：15px
- 大螢幕（1000px+）：17px

---

## 🔄 進行中的修復

### Resources 下拉選單優化

**問題**：行動版看不到
**原因**：Nextra 預設行為隱藏某些選單
**解決方案**：

1. 檢查 Nextra navbar 配置
2. 確保 Resources 在行動版可見
3. 優化下拉選單樣式

### 深色模式切換重複問題

**當前狀態**：

- Nextra 預設 theme toggle（月亮圖示）
- NavbarExtra 自訂 toggle（重複）

**修復計劃**：

```tsx
// theme.config.tsx
themeSwitch: {
  component: null; // 禁用 Nextra 預設
}
```

### 卡片設計優化

**改善方向**：

1. 增加內邊距：`p-6 → p-8`
2. 強化 hover 效果：`shadow-md → shadow-xl`
3. 改善對比度：背景不透明度增加
4. 添加 border accent color

---

## 📋 待辦清單（優先順序）

### 🔴 Critical (立即)

- [x] 修復 Google Fonts warning
- [x] 修復 Logo 縮放
- [ ] 移除重複的深色模式切換
- [ ] 確保 Resources 在行動版可見

### 🟡 Important (本日)

- [ ] 優化 Guide Q&A 卡片設計
- [ ] 優化 Glossary 術語卡片設計
- [ ] 改善半透明背景對比度
- [ ] 加強錯誤處理（防止切頁 error）

### 🟢 Enhancement (本週)

- [ ] 添加卡片 loading skeleton
- [ ] 優化動畫流暢度
- [ ] 添加更多視覺回饋

---

## 🎨 卡片設計改善建議

### Guide Q&A 卡片

```tsx
// 當前
className="rounded-[28px] border-2 p-6 md:p-8"

// 建議
- 增加內邊距：sm:p-8 md:p-10
- 強化陰影：shadow-sm → shadow-lg hover:shadow-2xl
- 背景完全不透明：bg-white dark:bg-zinc-900
- 添加 accent border：border-l-4 border-l-blue-500
```

### Glossary 術語卡片

```tsx
// 建議改善
- 標題字體：text-3xl → text-4xl（更醒目）
- 定義區塊：添加淡色背景區分
- 白話文比喻：使用卡片內卡片設計
- hover 效果：lift + glow
```

---

## 🔧 技術改善

### 錯誤處理增強

```tsx
// SecurityGuard cleanup
return () => {
  try {
    // 確保元素存在才移除
    const watermarkEl = document.getElementById("geometric-watermark");
    if (watermarkEl?.parentNode) {
      watermarkEl.parentNode.removeChild(watermarkEl);
    }
  } catch (error) {
    console.error("Cleanup error:", error);
  }
};
```

### 路由切換穩定性

```tsx
// 監聽路由變化，重新初始化
useEffect(() => {
  const handleRouteChange = () => {
    // Re-initialize if needed
  };

  router.events.on("routeChangeComplete", handleRouteChange);
  return () => router.events.off("routeChangeComplete", handleRouteChange);
}, [router]);
```

---

## 📊 預期改善結果

### 穩定性

- ✅ 無 stylesheet warning
- ✅ 切換頁面不 error
- ✅ Logo 平滑縮放不跳動

### 易用性

- ⏳ Resources 選單在所有裝置可見
- ⏳ 只有一個深色模式切換
- ⏳ 半透明背景改完全不透明

### 視覺品質

- ⏳ 卡片更精緻
- ⏳ hover 效果更明顯
- ⏳ 閱讀體驗更好

---

## 🚀 下一步動作

1. **確認當前修復**：測試 dev server 是否正常
2. **移除重複切換**：禁用 Nextra 預設 theme toggle
3. **優化卡片**：實施新的卡片設計系統
4. **測試穩定性**：多次切換頁面確認無 error

---

**最後更新**: 2026-01-24 15:10
**狀態**: 🔄 修復進行中
**下次檢查**: 確認 dev server 運行正常
