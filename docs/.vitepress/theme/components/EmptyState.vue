<script setup lang="ts">
/**
 * 空狀態呈現元件 (EmptyState)
 * 
 * 用於搜尋無結果或清單為空時的視覺提示。
 */
defineProps<{
  icon?: string;         // 顯示的圖示 (Emoji)
  title?: string;        // 標題文字
  description?: string;  // 詳細描述文字
  actionText?: string;   // 動作按鈕文字
}>();

defineEmits<{
  (e: 'clear'): void;    // 清除/重設動作事件
}>();
</script>

<template>
  <div class="empty-results">
    <div class="empty-icon">{{ icon || '🔍' }}</div>
    <h3>{{ title || '找不到相關結果' }}</h3>
    <p>{{ description || '請嘗試使用不同的關鍵字，或者檢查拼字是否正確。' }}</p>
    <button v-if="actionText" @click="$emit('clear')" class="clear-btn">{{ actionText }}</button>
  </div>
</template>

<style scoped>
/* 
 * 採用虛線外框與置中排版 
 * 強調該狀態為臨時性的搜尋結果缺位。
 */
.empty-results {
  text-align: center;
  padding: 80px 24px;
  background: var(--vp-c-bg-alt);
  border-radius: 24px;
  border: 1px dashed var(--vp-c-divider);
  margin-top: 40px;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.empty-results h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 12px;
}

.empty-results p {
  color: var(--vp-c-text-3);
  margin-bottom: 24px;
}

.clear-btn {
  padding: 10px 24px;
  background: var(--vp-c-brand-1);
  color: white;
  border-radius: 99px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 113, 227, 0.3);
}
</style>
