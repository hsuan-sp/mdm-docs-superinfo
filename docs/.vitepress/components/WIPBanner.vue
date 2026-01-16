<script setup>
import { ref, onMounted, watch } from 'vue'
import { useData, withBase } from 'vitepress'

const { lang } = useData()
const showBanner = ref(false)

const checkWipStatus = async () => {
    // Only check/show on English pages
    if (lang.value !== 'en-US') {
        showBanner.value = false
        return
    }

    try {
        // Check if WIP_NOTICE.html exists (build artifact of WIP_NOTICE.md)
        // using withBase to handle base path correctly
        const response = await fetch(withBase('/en/WIP_NOTICE.html'), { method: 'HEAD' })
        showBanner.value = response.ok
    } catch {
        showBanner.value = false
    }
}

onMounted(() => {
    checkWipStatus()
})

// Watch for language changes to re-check
watch(lang, () => {
    checkWipStatus()
})
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
    z-index: 99;
    background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
    color: #1d1d1f;
    padding: 12px 24px;
    box-shadow: 0 2px 12px rgba(255, 193, 7, 0.3);
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}

.wip-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 16px;
}

.wip-icon {
    font-size: 24px;
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
    flex-direction: column;
    gap: 2px;
}

.wip-text strong {
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -0.01em;
}

.wip-text span {
    font-size: 13px;
    opacity: 0.85;
    font-weight: 500;
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
        padding: 10px 16px;
    }

    .wip-icon {
        font-size: 20px;
    }

    .wip-text strong {
        font-size: 14px;
    }

    .wip-text span {
        font-size: 12px;
    }
}
</style>
