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
.back-to-top {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 999;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}

.back-to-top:hover {
  transform: translateY(-4px);
  background: rgba(0, 0, 0, 0.9);
  box-shadow: 0 12px 24px rgba(0,0,0,0.3);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (prefers-color-scheme: dark) {
  .back-to-top {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }
  .back-to-top:hover {
    background: rgba(255, 255, 255, 0.3);
  }
}
</style>
