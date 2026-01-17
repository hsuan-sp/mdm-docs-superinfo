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
    position: relative;
    z-index: 1000;
    background: linear-gradient(90deg, #ff9500 0%, #ffcc00 100%);
    color: #1d1d1f;
    padding: 8px 24px;
    /* Tighter padding for top bar look */
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.wip-content {
    max-width: var(--vp-layout-max-width);
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    /* Center for announcement look */
    gap: 12px;
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
    /* Stylized underline */
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
