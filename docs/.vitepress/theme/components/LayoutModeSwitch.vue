<script setup lang="ts">
import { useLayoutMode } from '../composables/useLayoutMode';
import { onMounted, ref } from 'vue';

const { isMobileView, toggleLayout } = useLayoutMode();
const mounted = ref(false);

onMounted(() => {
    mounted.value = true;
});
</script>

<template>
  <button 
    v-if="mounted"
    class="layout-switch-btn" 
    @click="toggleLayout"
    :title="isMobileView ? '切換至電腦版佈局' : '切換至行動版佈局'"
    aria-label="Toggle Layout Mode"
  >
    <div class="icon-container">
        <!-- Desktop Icon (Show when in Mobile Mode to indicate 'Switch to Desktop') -->
        <svg v-if="isMobileView" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
        
        <!-- Mobile Icon (Show when in Desktop Mode to indicate 'Switch to Mobile') -->
        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
    </div>
  </button>
</template>

<style scoped>
.layout-switch-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: all 0.2s;
  margin-left: 12px;
}

.layout-switch-btn:hover {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
}

.layout-switch-btn:active {
  transform: scale(0.95);
}

@media(max-width: 600px) {
    .layout-switch-btn {
        margin-left: 8px;
    }
}
</style>
