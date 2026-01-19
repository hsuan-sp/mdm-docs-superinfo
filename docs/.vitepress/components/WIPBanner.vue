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
    <div v-if="showBanner" class="wip-wrapper" :class="{ 'is-minimized': isCollapsed }">
        <Transition name="morph" mode="out-in">
            <!-- Expanded Banner -->
            <div v-if="!isCollapsed" class="wip-banner" role="alert" key="expanded">
                <div class="wip-content">
                    <div class="wip-icon">🚧</div>
                    <div class="wip-text">
                        <strong>Work in Progress</strong>
                        <span>English content translated & pending final check.</span>
                    </div>
                    <button class="collapse-btn" @click.stop="toggleCollapse" aria-label="Minimize notice">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m18 15-6-6-6 6" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Minimized Floating Button -->
            <button v-else class="wip-fab" @click="toggleCollapse" aria-label="Expand notice" key="collapsed">
                <span class="fab-icon">🚧</span>
                <span class="fab-label">WIP</span>
                <svg class="chevron" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
        </Transition>
    </div>
</template>

<style scoped>
/* Main Banner Styles */
.wip-banner {
    background: linear-gradient(90deg, #ff9500 0%, #ffcc00 100%);
    color: #1d1d1f;
    padding: 8px 24px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 1000;
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

/* FAB (Floating Button) Styles */
.wip-fab {
    position: fixed;
    top: 72px;
    left: 20px;
    z-index: 1001;
    background: linear-gradient(135deg, #ff9500 0%, #ffcc00 100%);
    color: #1d1d1f;
    padding: 8px 14px;
    border-radius: 20px;
    border: 2.5px solid #fff;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.wip-fab:hover {
    transform: scale(1.05) translateX(2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

.fab-icon {
    font-size: 16px;
}

.fab-label {
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

.collapse-btn {
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
    position: absolute;
    right: -10px;
}

.collapse-btn:hover {
    background: rgba(0, 0, 0, 0.2);
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
    color: rgba(0, 0, 0, 0.82);
    border-bottom: 1.5px solid rgba(0, 0, 0, 0.15);
}

/* Morphing Transition */
.morph-enter-active,
.morph-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.morph-enter-from {
    opacity: 0;
    transform: translateY(-20px) scale(0.9);
}

.morph-leave-to {
    opacity: 0;
    transform: translateY(-20px) scale(0.9);
}

@media (max-width: 768px) {
    .wip-banner {
        padding: 10px 20px;
    }

    .wip-fab {
        top: auto;
        bottom: 80px;
        left: 20px;
        padding: 6px 12px;
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
