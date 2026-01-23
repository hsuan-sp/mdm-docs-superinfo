<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";

const props = defineProps<{ title: string; isOpen: boolean }>();

const emit = defineEmits<{
  (e: "toggle"): void;
  (e: "close"): void;
  (e: "update:scale", value: number): void;
}>();

const { lang } = useData();

const t = computed(() => {
  return lang.value === "zh-TW"
    ? {
        fontSize: "字體大小",
        extraSmaller: "極小",
        smaller: "縮小",
        reset: "重置",
        larger: "放大",
        extraLarger: "極大",
        toggleSidebar: "收合側邊欄",
      }
    : {
        fontSize: "Font Size",
        extraSmaller: "XS",
        smaller: "Smaller",
        reset: "Reset",
        larger: "Larger",
        extraLarger: "XL",
        toggleSidebar: "Toggle Sidebar",
      };
});
</script>

<template>
  <aside class="app-sidebar" :class="{ collapsed: !isOpen }">
    <div class="sidebar-top">
      <div class="sidebar-ctrls">
        <button
          class="sidebar-toggle-btn"
          @click="emit('toggle')"
          :title="t.toggleSidebar"
        >
          <svg
            v-if="isOpen"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="3" x2="9" y2="21"></line>
          </svg>
          <svg
            v-else
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <div class="search-wrapper" v-if="isOpen">
          <slot name="search"></slot>
        </div>
      </div>

      <nav class="nav-menu" v-if="isOpen">
        <div class="chapter-nav">
          <slot name="nav-items"></slot>
        </div>
      </nav>
    </div>

    <div class="sidebar-bottom" v-if="isOpen">
      <div class="font-controls">
        <span class="ctrl-label">{{ t.fontSize }}</span>
        <div class="btn-group">
          <button @click="emit('update:scale', 0.85)" :title="t.extraSmaller">
            A--
          </button>
          <button @click="emit('update:scale', 0.92)" :title="t.smaller">
            A-
          </button>
          <button @click="emit('update:scale', 1.0)" :title="t.reset">A</button>
          <button @click="emit('update:scale', 1.2)" :title="t.larger">
            A+
          </button>
          <button @click="emit('update:scale', 1.4)" :title="t.extraLarger">
            A++
          </button>
        </div>
      </div>
      <slot name="footer"></slot>
    </div>
  </aside>
</template>

<style scoped>
/* Commercial-Grade Sidebar Styling */
.app-sidebar {
  position: -webkit-sticky;
  /* Safari support */
  position: sticky;
  top: 84px;
  /* Fixed distance from viewport top (below navbar) */
  width: 280px;
  /* Instead of fixed height, use max-height to fit viewport */
  max-height: calc(100vh - 104px);
  /* 84px top + 20px bottom padding */
  height: auto;
  display: flex;
  flex-direction: column;

  /* Modern Glassmorphism */
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);

  border-radius: 20px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.04);

  transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  z-index: 10;

  /* Important for child scrolling */
  overflow: hidden;
}

/* Dark Mode Adaptation */
:global(.dark) .app-sidebar {
  background: rgba(30, 30, 32, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.app-sidebar.collapsed {
  width: 64px;
  padding: 20px 10px;
  backdrop-filter: blur(12px);
  /* Less blur when small */
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
  /* Larger touch target */
  height: 44px;
  border-radius: 12px;
  border: 1px solid transparent;
  background: rgba(0, 0, 0, 0.03);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  flex-shrink: 0;
}

:global(.dark) .sidebar-toggle-btn {
  background: rgba(255, 255, 255, 0.05);
}

.sidebar-toggle-btn:hover {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.sidebar-toggle-btn:active {
  transform: translateY(1px);
}

.search-wrapper {
  flex: 1;
  opacity: 1;
  transition: opacity 0.3s;
}

.sidebar-top {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
}

.nav-menu {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 6px;
  scroll-behavior: smooth;
  mask-image: linear-gradient(to bottom, black 95%, transparent 100%);
  /* Fade out bottom */
}

/* Custom Scrollbar for Nav Menu */
.nav-menu::-webkit-scrollbar {
  width: 4px;
}

.nav-menu::-webkit-scrollbar-track {
  background: transparent;
}

.nav-menu::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.nav-menu:hover::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
}

:global(.dark) .nav-menu::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
}

:global(.dark) .nav-menu:hover::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}

.sidebar-bottom {
  padding-top: 16px;
  margin-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

:global(.dark) .sidebar-bottom {
  border-top-color: rgba(255, 255, 255, 0.05);
}

.font-controls,
.lang-controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.lang-controls {
  margin-top: 16px;
}

.lang-switch-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  background: rgba(var(--vp-c-brand-1-rgb), 0.1);
  color: var(--vp-c-brand-1);
  border: 1px solid rgba(var(--vp-c-brand-1-rgb), 0.2);
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.lang-switch-btn:hover {
  background: var(--vp-c-brand-soft);
  transform: translateY(-1px);
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

:global(.dark) .btn-group {
  background: rgba(255, 255, 255, 0.05);
  border-color: transparent;
}

.btn-group button {
  flex: 1;
  padding: 6px 2px;
  border: none;
  background: transparent;
  border-radius: 8px;
  color: var(--vp-c-text-2);
  font-weight: 600;
  font-size: 0.8em;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.btn-group button:hover {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

:global(.dark) .btn-group button:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Styles for Slotted Content - Deep Selectors */
:deep(.nav-item) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-align: left;
  padding: 12px 14px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 12px;
  margin-bottom: 2px;
  font-size: 0.95em;
  color: var(--vp-c-text-2);
  border: 1px solid transparent;
  /* Prevent layout shift on hover */
  transition: all 0.2s ease-out;
}

:deep(.nav-item:hover) {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  transform: translateX(2px);
}

:deep(.nav-item.active) {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 600;
  border-color: rgba(var(--vp-c-brand-1), 0.1);
}

:deep(.nav-count) {
  font-size: 10px;
  background: rgba(0, 0, 0, 0.04);
  padding: 2px 8px;
  border-radius: 8px;
  font-weight: 600;
  color: var(--vp-c-text-3);
  transition: all 0.2s;
}

:global(.dark) :deep(.nav-count) {
  background: rgba(255, 255, 255, 0.08);
}

:deep(.nav-item.active .nav-count) {
  background: var(--vp-c-bg);
  color: var(--vp-c-brand-1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

:deep(.categories-header) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 28px 4px 12px 4px;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
  letter-spacing: 0.08em;
}

:deep(.sidebar-divider) {
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    var(--vp-c-divider),
    transparent
  );
  margin: 16px 0;
  opacity: 0.5;
}

@media (max-width: 959px) {
  .app-sidebar {
    display: none;
  }
}
</style>
