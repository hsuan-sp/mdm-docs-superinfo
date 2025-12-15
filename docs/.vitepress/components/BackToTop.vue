<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const visible = ref(false)

const handleScroll = () => {
  visible.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <transition name="fade">
    <button
      v-if="visible"
      class="back-to-top"
      aria-label="Back to Top"
      @click="scrollToTop"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </button>
  </transition>
</template>

<style scoped>
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 113, 227, 0.5);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(0, 113, 227, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 113, 227, 0);
  }
}

.back-to-top {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(0, 113, 227, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 999;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 8px 24px rgba(0, 113, 227, 0.3);
  animation: pulse 2s infinite;
}

.back-to-top svg {
  transition: transform 0.3s ease;
}

.back-to-top:hover {
  transform: translateY(-6px) scale(1.1);
  background: rgba(0, 113, 227, 1);
  box-shadow: 0 12px 32px rgba(0, 113, 227, 0.5);
  animation: none;
}

.back-to-top:hover svg {
  transform: translateY(-3px);
}

.back-to-top:active {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 113, 227, 0.4);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), 
              transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.8);
}

@media (prefers-color-scheme: dark) {
  .back-to-top {
    background: rgba(255, 255, 255, 0.15);
    color: white;
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 24px rgba(255, 255, 255, 0.1);
  }
  
  .back-to-top:hover {
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 12px 32px rgba(255, 255, 255, 0.2);
  }
}
</style>
