<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()

// Show banner only for English version
const showBanner = computed(() => lang.value === 'en-US')
</script>

<template>
    <Transition name="slide-down">
        <div v-if="showBanner" class="wip-banner" role="alert">
            <div class="wip-content">
                <div class="wip-icon">🚧</div>
                <div class="wip-text">
                    <strong>Work in Progress</strong>
                    <span>English content is currently being translated. Some pages may be incomplete.</span>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.wip-banner {
    position: sticky;
    top: var(--vp-nav-height);
    z-index: 999;
    background: linear-gradient(135deg, #ff9500 0%, #ffcc00 100%);
    color: #1d1d1f;
    padding: 16px 24px;
    box-shadow: 0 4px 16px rgba(255, 149, 0, 0.4);
    border-bottom: 3px solid rgba(0, 0, 0, 0.2);
}

.wip-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 16px;
}

.wip-icon {
    font-size: 28px;
    flex-shrink: 0;
    animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.15);
    }
}

.wip-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.wip-text strong {
    font-size: 17px;
    font-weight: 800;
    letter-spacing: -0.01em;
    color: #000;
}

.wip-text span {
    font-size: 14px;
    opacity: 0.9;
    font-weight: 600;
    color: #1d1d1f;
}

/* Transitions */
.slide-down-enter-active,
.slide-down-leave-active {
    transition: all 0.3s ease;
}

.slide-down-enter-from {
    transform: translateY(-100%);
    opacity: 0;
}

.slide-down-leave-to {
    transform: translateY(-100%);
    opacity: 0;
}

@media (max-width: 768px) {
    .wip-banner {
        padding: 14px 20px;
    }

    .wip-icon {
        font-size: 24px;
    }

    .wip-text strong {
        font-size: 16px;
    }

    .wip-text span {
        font-size: 13px;
    }
}
</style>
