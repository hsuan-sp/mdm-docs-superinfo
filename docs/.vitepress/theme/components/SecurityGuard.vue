<script setup lang="ts">
/**
 * 內容保護元件 (Security Shield)
 * 
 * 負責攔截複製行為、滑鼠右鍵選單以及開發者工具快速鍵，以保護專案原創內容。
 * 核心機制：透過全域 DOM 事件監聽器實施操作限制。
 */
import { onMounted, onUnmounted } from 'vue';

/**
 * 攔截右鍵點擊事件
 */
const handleContextMenu = (e: MouseEvent) => {
  e.preventDefault();
  console.warn('⚠️ 本站原創內容，未經授權禁止複製或側錄。');
};

/**
 * 攔截危險快速鍵 (例如 F12, Ctrl+U, Ctrl+S 等)
 */
const handleKeyDown = (e: KeyboardEvent) => {
  // 禁用項清單：F12, 原始碼檢視, 儲存網頁, 列印, 開發者除錯工具
  const isForbidden =
    (e.keyCode === 123) || // F12
    ((e.ctrlKey || e.metaKey) && e.keyCode === 85) || // Ctrl+U (原始碼)
    ((e.ctrlKey || e.metaKey) && e.keyCode === 83) || // Ctrl+S (儲存)
    ((e.ctrlKey || e.metaKey) && e.keyCode === 80) || // Ctrl+P (列印)
    ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I (檢查)
    ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 67) || // Ctrl+Shift+C (檢查)
    (e.metaKey && e.altKey && e.keyCode === 73); // Mac Opt+Cmd+I (除錯)

  if (isForbidden) {
    e.preventDefault();
    console.error('🛡️ 系統已攔截受限操作 (Security Intercepted)');
  }
};

/**
 * 攔截文字複製行為 (Copy)
 */
const handleCopy = (e: ClipboardEvent) => {
  e.preventDefault();
  const msg = '🔒 本站內容受技術保護，禁止複製或側錄。';
  if (e.clipboardData) {
    e.clipboardData.setData('text/plain', msg);
  }
  console.error('🛡️ 複製操作已被攔截');
};

// 元件掛載時註冊全域攔截事件
onMounted(() => {
  document.addEventListener('contextmenu', handleContextMenu);
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('copy', handleCopy);

  // 透過 CSS 強制禁用文字選擇功能
  document.body.style.userSelect = 'none';
  document.body.style.webkitUserSelect = 'none';

  console.log('%c🛡️ MDM Support Shield Active', 'color: #ff3b30; font-weight: bold;');
});

// 元件卸載時清除攔截監聽，恢復正常狀態
onUnmounted(() => {
  document.removeEventListener('contextmenu', handleContextMenu);
  document.removeEventListener('keydown', handleKeyDown);
  document.removeEventListener('copy', handleCopy);
  document.body.style.userSelect = 'auto';
  document.body.style.webkitUserSelect = 'auto';
});
</script>

<template>
  <!-- 本元件僅負責邏輯攔截，不產生任何視覺元素 -->
  <div style="display: none;" aria-hidden="true"></div>
</template>
