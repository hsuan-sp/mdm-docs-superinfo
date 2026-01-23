<script setup>
import { onMounted, onUnmounted, ref, computed } from "vue";
import { useData } from "vitepress";

const { lang } = useData();
const visible = ref(false);

const t = computed(() => {
  return lang.value === "zh-TW"
    ? {
        backToTop: "返回頂部",
      }
    : {
        backToTop: "Back to Top",
      };
});

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrollPercentage = (scrollTop / scrollHeight) * 100;

  // Only show button if we've scrolled more than 20% of the page
  visible.value = scrollPercentage > 20;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <transition name="slide-fade">
    <button
      v-if="visible"
      class="back-to-top"
      :aria-label="t.backToTop"
      @click="scrollToTop"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  </transition>
</template>

<style scoped>
/* Liquid Glass Back to Top */
.back-to-top {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #0071e3;
  /* Original Blue */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex !important;
  /* Force visible */
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 90;
  /* Lower than UserCenter drawer */
  box-shadow: 0 4px 12px rgba(0, 113, 227, 0.4);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: pulse-border 3s infinite;
}

@keyframes pulse-border {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 113, 227, 0.4);
  }

  70% {
    box-shadow: 0 0 0 10px rgba(0, 113, 227, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(0, 113, 227, 0);
  }
}

@media (max-width: 640px) {
  .back-to-top {
    bottom: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
  }
}

.back-to-top svg {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.back-to-top:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow:
    0 12px 32px rgba(0, 0, 0, 0.2),
    0 6px 12px rgba(var(--vp-c-brand-rgb), 0.4);
}

.back-to-top:hover svg {
  transform: translateY(-2px);
}

.back-to-top:active {
  transform: translateY(-2px) scale(0.98);
}

/* Smooth Slide Fade Transition */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition:
    opacity 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}

.dark .back-to-top {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.15);
}

.dark .back-to-top:hover {
  background: rgba(255, 255, 255, 0.18);
}
</style>
