<script setup lang="ts">
/**
 * 行動版底部抽屜元件 (Bottom Sheet)
 * 
 * 提供洗鍊的動畫效果、磨砂質感背景以及 Teleport 傳送門機制。
 * 在行動端提供類似原生 App 的選擇與過濾操作體驗。
 */
defineProps<{
  isOpen: boolean;    // 是否開啟
  title?: string;     // 抽屜標題
}>();

defineEmits<{
  (e: 'close'): void; // 關閉事件
}>();
</script>

<template>
  <!-- 使用 Teleport 確保抽屜能在最頂層顯示，不受父層渲染限制 -->
  <Teleport to="body">
    <Transition name="slide-up">
      <div v-if="isOpen" class="mobile-drawer-overlay" @click="$emit('close')">
        <aside class="mobile-drawer" @click.stop role="dialog" aria-modal="true">
          <!-- 頂部手柄：強化「可下滑」的視覺引導 -->
          <div class="drawer-handle"></div>

          <div class="drawer-header">
            <h3>{{ title || '選單' }}</h3>
            <button class="close-btn" @click="$emit('close')" aria-label="關閉">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div class="drawer-content">
            <slot></slot>
          </div>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* 
 * 遮罩層：提供模糊化背景，聚焦於抽屜內容 
 */
.mobile-drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 2000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

/* 抽屜主體：採用 Apple 風格的高階磨砂玻璃設計 (Glassmorphism) */
.mobile-drawer {
  width: 100%;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(30px) saturate(180%);
  -webkit-backdrop-filter: blur(30px) saturate(180%);
  border-radius: 32px 32px 0 0;
  padding: 24px 24px calc(24px + env(safe-area-inset-bottom));
  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.1);
  max-height: 85vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

:global(.dark) .mobile-drawer {
  background: rgba(28, 28, 30, 0.95);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.drawer-handle {
  width: 40px;
  height: 5px;
  background: var(--vp-c-divider);
  border-radius: 10px;
  margin: 0 auto 20px;
  flex-shrink: 0;
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-shrink: 0;
}

.drawer-header h3 {
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
}

.close-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.drawer-content {
  flex: 1;
  overflow-y: auto;
}

/* Slide Up 動畫系統 */
:global(.slide-up-enter-active),
:global(.slide-up-leave-active) {
  transition: opacity 0.3s ease;
}

:global(.slide-up-enter-from),
:global(.slide-up-leave-to) {
  opacity: 0;
}

:global(.slide-up-enter-active .mobile-drawer),
:global(.slide-up-leave-active .mobile-drawer) {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

:global(.slide-up-enter-from .mobile-drawer),
:global(.slide-up-leave-to .mobile-drawer) {
  transform: translateY(100%);
}
</style>
