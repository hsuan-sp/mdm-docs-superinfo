# 組件重構計劃 - 2026 VitePress 最佳實踐

## 決策：統一路由架構

基於2026 Web標準和VitePress最佳實踐，採用**單一整合導覽 (SPA模式)**：

### ✅ 保留
- `/guide/` → IntegratedGuideApp (主導覽頁)
- `/glossary` → GlossaryApp
- `/` → AppleHome

### ❌ 移除
刪除8個單獨的QA頁面 (`guide/01-account.md` ~ `guide/08-qa-education.md`)

### 理由
1. **避免功能重複**: QAViewer 與 IntegratedGuideApp 功能100%重疊
2. **更好的UX**: 整合導覽支持跨模組搜尋、快速切換
3. **維護性**: 單一真實來源 (Single Source of Truth)
4. **效能**: 減少路由和組件數量，提升構build速度
5. **2026標準**: SPA模式符合現代Web App架構

## 實施步驟

1. ✅ 更新 AppleHome.vue 連結到 `/guide/`
2. 🔄 刪除 guide/01~08.md 單頁文件  
3. 🔄 刪除 QAViewer.vue 組件
4. 🔄 升級 IntegratedGuideApp.vue 支持 hash 導航
5. ✅ 測試所有路由正常運作
6. ✅ Push to repository

---
**狀態**: Ready to execute
**風險**: 低 (IntegratedGuideApp功能完整)
