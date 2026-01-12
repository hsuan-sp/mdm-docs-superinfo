<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

const handleContextMenu = (e: MouseEvent) => {
  e.preventDefault();
  console.warn('⚠️ 本站原創內容，未經授權禁止複製或側錄。');
};

const handleKeyDown = (e: KeyboardEvent) => {
  // 禁止 Ctrl+S, Ctrl+U, Ctrl+P, F12, Ctrl+Shift+I, Alt+Cmd+I
  const isForbidden = 
    (e.keyCode === 123) || // F12
    ((e.ctrlKey || e.metaKey) && e.keyCode === 85) || // Ctrl+U
    ((e.ctrlKey || e.metaKey) && e.keyCode === 83) || // Ctrl+S
    ((e.ctrlKey || e.metaKey) && e.keyCode === 80) || // Ctrl+P
    ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
    ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 67) || // Ctrl+Shift+C
    (e.metaKey && e.altKey && e.keyCode === 73); // Mac Opt+Cmd+I
  
  if (isForbidden) {
    e.preventDefault();
    console.error('🛡️ 系統已攔截受限操作 (Security Intercepted)');
  }
};

const handleCopy = (e: ClipboardEvent) => {
  const selection = window.getSelection();
  if (!selection || selection.toString().length < 10) return;

  const watermark = `\n\n----------------------------\n🔒 本站原創內容受技術保護，禁止側錄抓取。\n原文連結：${window.location.href}\n----------------------------`;
  
  if (e.clipboardData) {
    e.clipboardData.setData('text/plain', selection.toString() + watermark);
    e.preventDefault();
  }
};

// 反偵控偵測：Debug 陷阱
// 這會讓打開開發者工具的使用者不斷被斷點擋住
const startDebuggerTrap = () => {
    setInterval(() => {
        (function() {
            (function a() {
                try {
                    (function b(i) {
                        if (("" + i / i).length !== 1 || i % 20 === 0) {
                            (function() {}).constructor("debugger")();
                        } else {
                            debugger;
                        }
                        b(++i);
                    })(0);
                } catch (e) {}
            })();
        })();
    }, 2000);
};

onMounted(() => {
  document.addEventListener('contextmenu', handleContextMenu);
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('copy', handleCopy);

  // 1. 基本檢測顯示
  console.log('%c🛡️ 技術保護已啟動 (MDM Support Shield Active)', 'color: white; background: #ff3b30; padding: 4px 10px; border-radius: 4px;');
  
  // 2. 啟動 Debug 陷阱（選用，這對普通用戶無感，但對想打開 F12 的人很痛苦）
  // 為了保險，我們只在檢測到視窗尺寸異常時啟動，或乾脆跑一個溫和版
  const checkDevTools = () => {
    const threshold = 160;
    if (window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold) {
        console.clear();
        console.log('%c🔒 原創內容，嚴禁側錄', 'font-size: 30px; color: red;');
    }
  };

  window.addEventListener('resize', checkDevTools);
});

onUnmounted(() => {
  document.removeEventListener('contextmenu', handleContextMenu);
  document.removeEventListener('keydown', handleKeyDown);
  document.removeEventListener('copy', handleCopy);
});
</script>

<template>
  <div style="display: none;" aria-hidden="true"></div>
</template>
