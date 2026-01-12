<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  title: string;
  isOpen: boolean;
}>();

const emit = defineEmits(['toggle', 'close', 'update:scale']);

const fontScale = ref(1.0); // Manage locally or pass as prop if needed globally
</script>

<template>
  <aside class="app-sidebar" :class="{ 'collapsed': !isOpen }">
    <div class="sidebar-top">
      <div class="sidebar-ctrls">
        <button class="sidebar-toggle-btn" @click="emit('toggle')" title="收合側邊欄">
          <svg v-if="isOpen" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
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
        <span class="ctrl-label">字體大小</span>
        <div class="btn-group">
          <button @click="$emit('update:scale', 0.9)" title="縮小">A-</button>
          <button @click="$emit('update:scale', 1.0)" title="重置">A</button>
          <button @click="$emit('update:scale', 1.15)" title="放大">A+</button>
        </div>
      </div>
      <slot name="footer"></slot>
    </div>
  </aside>
</template>

<style scoped>
/* Extracted from previous IntegratedGuideApp styles */
.app-sidebar {
    position: sticky;
    top: 100px;
    width: 280px;
    height: calc(100vh - 140px);
    display: flex;
    flex-direction: column;
    background: var(--vp-c-bg-soft);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    border-radius: 20px;
    padding: 24px;
    border: 1px solid var(--vp-c-divider);
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    z-index: 10;
}

.app-sidebar.collapsed {
    width: 60px;
    padding: 24px 10px;
}

.sidebar-ctrls {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
}

.sidebar-toggle-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    border: none;
    background: var(--vp-c-bg-mute);
    color: var(--vp-c-text-2);
    cursor: pointer;
    transition: all 0.2s;
    flex-shrink: 0;
}
.sidebar-toggle-btn:hover {
    background: var(--vp-c-brand-soft);
    color: var(--vp-c-brand-1);
}

.search-wrapper {
    flex: 1;
}

.sidebar-top { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.nav-menu { flex: 1; overflow-y: auto; padding-right: 4px; }

.nav-menu::-webkit-scrollbar { width: 4px; }
.nav-menu::-webkit-scrollbar-thumb { background: var(--vp-c-divider); border-radius: 4px; }

.sidebar-bottom {
    padding-top: 20px;
    margin-top: 20px;
    border-top: 1px solid var(--vp-c-divider);
}

.font-controls { display: flex; flex-direction: column; gap: 8px; }
.ctrl-label { font-size: 0.75em; color: var(--vp-c-text-3); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
.btn-group { display: flex; gap: 2px; background: var(--vp-c-bg-soft); padding: 3px; border-radius: 8px; border: 1px solid var(--vp-c-divider); }
.btn-group button {
    flex: 1; padding: 6px; border: none; background: transparent; border-radius: 6px;
    color: var(--vp-c-text-2); font-weight: 600; font-size: 0.8em; cursor: pointer;
    transition: all 0.2s;
}
.btn-group button:hover { background: var(--vp-c-bg-mute); color: var(--vp-c-text-1); }

@media (max-width: 1200px) {
    .app-sidebar { display: none; }
}
</style>
