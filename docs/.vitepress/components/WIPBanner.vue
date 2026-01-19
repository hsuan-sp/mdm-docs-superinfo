<script setup>
import { ref, computed } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()

// Show banner only for English version
const showBanner = computed(() => lang.value === 'en-US')
const isCollapsed = ref(false)

const toggleCollapse = () => {
    isCollapsed.value = !isCollapsed.value
}
</script>

<template>
    <Transition name="slide-down">
        <div v-if="showBanner" class="wip-banner" :class="{ 'is-collapsed': isCollapsed }" role="alert">
            <div class="wip-content" v-show="!isCollapsed">
                <div class="wip-icon">🚧</div>
                <div class="wip-text">
                    <strong>Translation Complete</strong>
                    <span>English content is fully translated but is currently pending review.</span>
                </div>
                <button class="collapse-btn" @click="toggleCollapse" aria-label="Collapse banner">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m18 15-6-6-6 6" />
                    </svg>
                </button>
            </div>
            <button v-show="isCollapsed" class="expand-btn" @click="toggleCollapse" aria-label="Expand banner">
                <span class="expand-icon">🚧</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
        </div>
    </Transition>
</template>

<style scoped>
.wip-banner {
    position: relative;
    z-index: 1000;
    background: linear-gradient(90deg, #ff9500 0%, #ffcc00 100%);
    color: #1d1d1f;
    padding: 8px 24px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.wip-banner.is-collapsed {
    padding: 2px 24px;
    cursor: pointer;
}

.wip-banner.is-collapsed:hover {
    background: linear-gradient(90deg, #ffcc00 0%, #ff9500 100%);
}

.wip-content {
    max-width: var(--vp-layout-max-width);
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    position: relative;
}

.collapse-btn,
.expand-btn {
    background: rgba(0, 0, 0, 0.1);
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #000;
    transition: all 0.2s ease;
    padding: 0;
}

.collapse-btn {
    position: absolute;
    right: -10px;
}

.expand-btn {
    margin: 0 auto;
    width: auto;
    height: 20px;
    background: transparent;
    gap: 8px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
}

.collapse-btn:hover {
    background: rgba(0, 0, 0, 0.2);
    transform: translateY(-1px);
}

.expand-icon {
    font-size: 14px;
}

.wip-icon {
    font-size: 20px;
    flex-shrink: 0;
    animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
    }
}

.wip-text {
    display: flex;
    align-items: center;
    gap: 8px;
    text-align: center;
}

.wip-text strong {
    font-size: 14px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #000;
}

.wip-text span {
    font-size: 13px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
    border-bottom: 1.5px solid rgba(0, 0, 0, 0.2);
}

/* Transitions */
.slide-down-enter-active,
.slide-down-leave-active {
    transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
    transform: translateY(-100%);
    opacity: 0;
}

@media (max-width: 768px) {
    .wip-banner {
        padding: 10px 20px;
    }

    .collapse-btn {
        right: -5px;
    }

    .wip-text {
        flex-direction: column;
        gap: 2px;
    }

    .wip-text span {
        border-bottom: none;
        font-size: 12px;
    }
}
</style>
