<script setup>
/**
 * 返回頂部導覽元件 (BackToTop)
 * 
 * 負責在頁面垂直捲動超過一定閾值 (300px) 時，平滑展示一鍵置頂按鈕。
 * 採用 Apple 經典藍色主題搭配高階毛玻璃濾鏡，提升介面整體的層次感。
 */
import { onMounted, onUnmounted, ref } from 'vue'

const visible = ref(false)

/**
 * 捲動位置監測
 * 動態判斷當前 ScrollY 數值以控制按鈕的可見性狀態。
 */
const handleScroll = () => {
  // 當捲動高度大於 300 像素時觸發顯示
  visible.value = window.scrollY > 300
}

/**
 * 漸進式平滑捲動
 * 調用瀏覽器原生的視窗捲動 API，實現符合人體工學的 Smooth Motion。
 */
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// 生命週期：事件掛載與清理
onMounted(() => {
  // 使用 passive 模式監控捲動事件，提升行動端之長頁面效能
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <!-- 使用 slide-fade 過渡效果，確保按鈕進場時具備位移與淡入感 -->
  <transition name="slide-fade">
    <button v-if="visible" class="back-to-top" aria-label="返回頂部" @click="scrollToTop" title="返回頂部">
      <!-- 採用簡潔的向量箭頭圖示 -->
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
        stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  </transition>
</template>

<style scoped>
/**
 * 按鈕外觀設計
 * 結合 Apple 品牌藍色 (#0071e3) 與 Glassmorphism 設定。
 */
.back-to-top {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #0071e3;

  /* 高質感磨砂玻璃效果 */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex !important;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 90;

  /* 雙層投影效果：強調深度與氛圍感 */
  box-shadow: 0 4px 12px rgba(0, 113, 227, 0.4);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@media (max-width: 640px) {
  .back-to-top {
    bottom: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
  }
}

/* 懸浮互動增強 */
.back-to-top:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2), 0 6px 12px rgba(0, 113, 227, 0.4);
}

.back-to-top:hover svg {
  transform: translateY(-2px);
}

/* 點擊反饋：微縮放動畫 */
.back-to-top:active {
  transform: translateY(-2px) scale(0.98);
}

/* 滑動 + 淡入淡出 (Motion System) */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}

/* 深色模式適應：融合透明背景 */
:global(.dark) .back-to-top {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.15);
}

:global(.dark) .back-to-top:hover {
  background: rgba(255, 255, 255, 0.18);
}
</style>
