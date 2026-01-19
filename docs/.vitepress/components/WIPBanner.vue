<script setup>
import { ref, computed } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()

// Show banner only for English version
const showBanner = computed(() => lang.value === 'en-US')
const isCollapsed = ref(true) // Start collapsed as requested by user's preference for non-intrusive UI
const isMounted = ref(false)

import { onMounted } from 'vue'
onMounted(() => {
    isMounted.value = true
})

const toggleCollapse = () => {
    isCollapsed.value = !isCollapsed.value
}
</script>

<template>
    <div v-if="showBanner" class="wip-wrapper">
        <!-- Expanded Banner: Stays in layout-top (document flow) -->
        <Transition name="fade-top">
            <div v-if="!isCollapsed" class="wip-banner" role="alert">
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
        </Transition>

        <!-- Minimized Badge: Teleported into the Topbar -->
        <Teleport to=".VPNavBarTitle" v-if="isMounted && isCollapsed">
            <button class="wip-navbar-badge" @click.stop="toggleCollapse" aria-label="Expand notice">
                <span class="badge-icon">🚧</span>
                <span class="badge-label">WIP</span>
                <svg class="chevron" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
        </Teleport>
    </div>
</template>

<style scoped>
/* Main Banner Styles - Natural flow at top */
.wip-banner {
    width: 100%;
    background: linear-gradient(90deg, #ff9500 0%, #ffcc00 100%);
    color: #1d1d1f;
    padding: 8px 24px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
    z-index: 2000;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: relative;
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

/* Navbar Badge Styles - Small and subtle for top bar */
.wip-navbar-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: linear-gradient(135deg, #ff9500 0%, #ffcc00 100%);
    color: #1d1d1f;
    padding: 4px 10px;
    border-radius: 980px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    cursor: pointer;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 
        0 2px 4px rgba(0,0,0,0.05),
        inset 0 1px 0 rgba(255,255,255,0.25);
    white-space: nowrap;
    align-self: center;
    border: 1px solid rgba(0,0,0,0.05); /* Added minor definition */
}

.wip-navbar-badge:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(255, 149, 0, 0.3);
    filter: brightness(1.05);
}

.badge-icon {
    font-size: 12px;
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
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
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

/* New Transitions */
.fade-top-enter-active,
.fade-top-leave-active {
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease;
}

.fade-top-enter-from,
.fade-top-leave-to {
    transform: translateY(-100%);
    opacity: 0;
}

.fade-in-enter-active,
.fade-in-leave-active {
    transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-in-enter-from,
.fade-in-leave-to {
    opacity: 0;
    transform: scale(0.9);
}

@media (max-width: 768px) {
    .wip-banner {
        padding: 10px 20px;
    }

    .wip-navbar-badge {
        margin-left: 8px;
        padding: 3px 8px;
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
