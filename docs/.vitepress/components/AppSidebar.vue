<script lang="ts">
/**
 * 專業側邊欄導覽元件 (AppSidebar)
 * 
 * 為桌面端提供結構化的章節導覽、即時搜尋掛載以及全局字體縮放控制器。
 * 特色：
 * 1. 彈性收合：支援切換展開/收起狀態，最佳化寬螢幕與窄螢幕顯示空間。
 * 2. 閱讀最佳化：內建字體大小切換功能，符合無障礙與長時間閱讀需求。
 * 3. 視覺層次：採用 Apple 引發的 Glassmorphism 磨砂質感與微過度動效。
 */
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'AppSidebar',
  props: {
    // 側邊欄頂部顯示的導航標題
    title: {
      type: String,
      required: true
    },
    // 外部受控狀態：側邊欄當前是否處於開啟（展開）狀態
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  emits: ['toggle', 'close', 'update:scale'],
  setup(_, { emit }) {
    // 雖然外部控制縮放，但在內部保持一個初始參考值（如需要擴充邏輯用）
    const fontScale = ref(1.0);

    return {
      fontScale,
      emit
    };
  }
});
</script>

<template>
  <aside class="app-sidebar" :class="{ 'collapsed': !isOpen }">
    <div class="sidebar-top">
      <div class="sidebar-ctrls">
        <!-- 核心切換機制：控制側邊欄展開與否 -->
        <button class="sidebar-toggle-btn" @click="emit('toggle')" :title="isOpen ? '收合側邊欄' : '展開側邊欄'">
          <!-- 切換圖示：使用 SVG 以確保在高解析度螢幕下的絕對銳利度 -->
          <svg v-if="isOpen" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="3" x2="9" y2="21"></line>
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <!-- 搜尋元件掛載插槽 (Slot)：當側邊欄展開時才注入搜尋框 -->
        <div class="search-wrapper" v-if="isOpen">
          <slot name="search"></slot>
        </div>
      </div>

      <!-- 導覽選單導航：用於放置章節清單或類別按鈕 -->
      <nav class="nav-menu" v-if="isOpen">
        <div class="chapter-nav">
          <slot name="nav-items"></slot>
        </div>
      </nav>
    </div>

    <!-- 增值功能：字體調節面板 -->
    <div class="sidebar-bottom" v-if="isOpen">
      <div class="font-controls">
        <span class="ctrl-label">內文視覺縮放</span>
        <div class="btn-group">
          <!-- 發送 update:scale 事件至上層容器，控制全域 CSS 變數 -->
          <button @click="$emit('update:scale', 0.9)" title="縮小字體 (適配高密度顯示)">A-</button>
          <button @click="$emit('update:scale', 1.0)" title="重置為標準大小">1:1</button>
          <button @click="$emit('update:scale', 1.15)" title="放大字體 (護眼模式)">A+</button>
        </div>
      </div>
      <slot name="footer"></slot>
    </div>
  </aside>
</template>

<style scoped>
/* 
 * 商業級側邊欄佈局樣式
 * 運用 Sticky 與動態寬度切換，達成在內容捲動時始終在側邊守護導航。
 */
.app-sidebar {
  position: -webkit-sticky;
  position: sticky;
  top: 84px;
  width: 280px;
  max-height: calc(100vh - 104px);
  height: auto;
  display: flex;
  flex-direction: column;

  /* 現代磨砂質感定義 (Glassmorphism Tier 1) */
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);

  border-radius: 20px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.04);
  transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  z-index: 10;
  overflow: hidden;
}

/* 深色模式外觀映射 */
:global(.dark) .app-sidebar {
  background: rgba(30, 30, 32, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

/* 收合（圖示模式）下的極度簡約樣式 */
.app-sidebar.collapsed {
  width: 64px;
  padding: 20px 10px;
  backdrop-filter: blur(12px);
}

.sidebar-ctrls {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.sidebar-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid transparent;
  background: rgba(0, 0, 0, 0.03);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  flex-shrink: 0;
}

/* 捲動區域質感優化：補償漸層遮罩 */
.nav-menu {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 6px;
  mask-image: linear-gradient(to bottom, black 95%, transparent 100%);
}

/* 底部互動區樣式 */
.font-controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ctrl-label {
  font-size: 0.7em;
  color: var(--vp-c-text-3);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-left: 4px;
}

.btn-group {
  display: flex;
  gap: 4px;
  background: rgba(0, 0, 0, 0.03);
  padding: 4px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.02);
}

/* 響應式：平板與手機則完全隱藏桌面側邊欄，由行動版抽屜接管 */
@media (max-width: 1200px) {
  .app-sidebar {
    display: none;
  }
}
</style>
