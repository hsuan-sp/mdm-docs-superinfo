<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useLayoutMode } from '../composables/useLayoutMode';
import { useData, useRouter } from 'vitepress';

import { useAuth } from '../composables/useAuth';

useLayoutMode();
const { isDark, theme } = useData();
const { user, isGuest, username, checkAuth, logout } = useAuth();
const router = useRouter();

const isMenuOpen = ref(false);
const expandedNav = ref<number | null>(null);

const handleLinkClick = (e: Event, link: string) => {
    isMenuOpen.value = false;
    if (link.startsWith('http')) {
        return;
    }
    e.preventDefault();
    router.go(link);
};

const toggleNav = (index: any) => {
    expandedNav.value = expandedNav.value === index ? null : index;
};

// Ensure user is always set for consistent UI
onMounted(async () => {
    await checkAuth();
});

const toggleDarkMode = () => {
    // VitePress dark mode toggle
    const html = document.documentElement;
    html.classList.toggle('dark');
    const newValue = html.classList.contains('dark');
    localStorage.setItem('vitepress-theme-appearance', newValue ? 'dark' : 'light');
};

const { lang } = useData();
const switchLanguage = () => {
    const currentPath = window.location.pathname;
    let targetPath = '';

    if (lang.value === 'zh-TW') {
        // Switch to English
        targetPath = currentPath.startsWith('/mdm-support-site/')
            ? currentPath.replace('/mdm-support-site/', '/mdm-support-site/en/')
            : '/en' + currentPath;
    } else {
        // Switch to Chinese
        targetPath = currentPath.replace('/en/', '/');
    }

    router.go(targetPath);
};
</script>

<template>
    <div class="user-center">
        <!-- Desktop Horizontal View -->
        <div class="desktop-actions">


            <div class="divider"></div>

            <!-- Language Switch -->
            <button @click="switchLanguage" class="action-btn" :title="lang === 'zh-TW' ? 'Switch to English' : '切換至中文'">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
            </button>

            <div class="divider"></div>

            <!-- Dark Mode Toggle -->
            <button @click="toggleDarkMode" class="action-btn" :title="isDark ? '切換至淡色模式' : '切換至深色模式'">
                <svg v-if="isDark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
                <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
            </button>

            <div class="divider"></div>

            <div class="user-info" v-if="user">
                <span class="username">{{ username }}</span>
                <button v-if="!isGuest" @click="logout" class="logout-link">登出</button>
            </div>
        </div>

        <!-- Mobile Menu Trigger - Hamburger Icon -->
        <button class="mobile-menu-trigger" @click="isMenuOpen = !isMenuOpen" aria-label="開啟選單">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
        </button>

        <!-- Mobile Dropdown Panel (Teleported to body to avoid clipping) -->
        <Teleport to="body">
            <Transition name="slide-up">
                <div v-if="isMenuOpen" class="mobile-dropdown-overlay" @click="isMenuOpen = false">
                    <div class="mobile-dropdown-card" @click.stop>
                        <div class="drawer-handle"></div>
                        <div class="menu-items">
                            <!-- Navigation Links (Integrated with Deep Nesting) -->
                            <template v-if="theme.nav">
                                <div v-for="(item, index) in theme.nav" :key="index" class="nav-group">
                                    <!-- Level 1: Single Link -->
                                    <a v-if="item.link" :href="item.link" class="menu-item nav-link"
                                        @click="handleLinkClick($event, item.link)">
                                        <div class="item-text">
                                            <div class="label">{{ item.text }}</div>
                                        </div>
                                        <div class="item-icon-right">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </a>

                                    <!-- Level 1: Group Header -->
                                    <div v-else class="menu-item nav-group-header"
                                        :class="{ expanded: expandedNav === index }" @click="toggleNav(index)">
                                        <div class="item-text">
                                            <div class="label">{{ item.text }}</div>
                                        </div>
                                        <div class="item-icon-right chevron">▼</div>
                                    </div>

                                    <!-- Level 1: Submenu Container -->
                                    <div v-if="!item.link && expandedNav === index" class="submenu-container">
                                        <div v-for="(subItem, subIndex) in item.items" :key="subIndex">

                                            <!-- Level 2: Sub-Group Header -->
                                            <div v-if="subItem.items" class="submenu-group-label">
                                                {{ subItem.text }}
                                            </div>

                                            <!-- Level 2: Sub-Group Items -->
                                            <template v-if="subItem.items">
                                                <a v-for="leaf in subItem.items" :key="leaf.text" :href="leaf.link"
                                                    class="submenu-item nested" @click="isMenuOpen = false">
                                                    {{ leaf.text }}
                                                </a>
                                            </template>

                                            <!-- Level 2: Direct Link -->
                                            <a v-else :href="subItem.link" class="submenu-item"
                                                @click="isMenuOpen = false">
                                                {{ subItem.text }}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="divider-horizontal"></div>
                            </template>

                            <!-- Settings Grid (Compact Row) -->
                            <div class="settings-grid">
                                <!-- Dark Mode -->
                                <div class="menu-item compact" @click="toggleDarkMode">
                                    <div class="compact-icon">
                                        <svg v-if="isDark" width="20" height="20" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2">
                                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                        </svg>
                                        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2">
                                            <circle cx="12" cy="12" r="5"></circle>
                                            <line x1="12" y1="1" x2="12" y2="3"></line>
                                            <line x1="12" y1="21" x2="12" y2="23"></line>
                                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                            <line x1="1" y1="12" x2="3" y2="12"></line>
                                            <line x1="21" y1="12" x2="23" y2="12"></line>
                                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                                        </svg>
                                    </div>
                                    <div class="compact-label">主題模式</div>
                                    <div class="compact-status">{{ isDark ? '深色' : '淡色' }}</div>
                                </div>

                                <!-- Language Switch -->
                                <div class="menu-item compact" @click="switchLanguage">
                                    <div class="compact-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            stroke-width="2">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="2" y1="12" x2="22" y2="12"></line>
                                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                        </svg>
                                    </div>
                                    <div class="compact-label">語言 / Lang</div>
                                    <div class="compact-status">{{ lang === 'zh-TW' ? 'English' : '中文' }}</div>
                                </div>
                            </div>
                        </div>

                        <div class="dropdown-footer">
                            <!-- User Info moved to Footer -->
                            <div class="user-detail-footer">
                                <div class="current-user-label">目前登入</div>
                                <div class="name">{{ username }}</div>
                            </div>

                            <button v-if="!isGuest" class="logout-btn-full" @click="logout">登出帳號</button>
                            <button class="close-btn" @click="isMenuOpen = false">關閉選單</button>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<style scoped>
.user-center {
    display: flex;
    align-items: center;
    margin-left: 20px;
    flex-shrink: 0;
    z-index: 100;
}

/* Desktop View */
.desktop-actions {
    display: none;
    align-items: center;
    gap: 16px;
}

@media (min-width: 960px) {
    .desktop-actions {
        display: flex;
    }

    .mobile-menu-trigger {
        display: none;
    }
}

.action-btn {
    background: none;
    border: none;
    color: var(--vp-c-text-2);
    cursor: pointer;
    padding: 4px;
    border-radius: 6px;
    transition: all 0.2s;
}

.action-btn:hover {
    color: var(--vp-c-brand);
    background: var(--vp-c-bg-mute);
}

.divider {
    width: 1px;
    height: 18px;
    background: var(--vp-c-divider);
}

.user-info {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
}

.username {
    color: var(--vp-c-text-1);
    font-weight: 600;
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.logout-link,
.login-link {
    color: var(--vp-c-brand);
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    font-weight: 600;
    text-decoration: none;
}

.login-link:hover {
    text-decoration: underline;
}

/* Mobile Trigger - Integrated in Navbar */
.mobile-menu-trigger {
    display: none;
    width: 32px;
    height: 32px;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    color: var(--vp-c-text-2);
    transition: color 0.2s;
    background: transparent;
    border: none;
    cursor: pointer;
    margin-left: 12px;
}

.mobile-menu-trigger:hover {
    color: var(--vp-c-brand);
    background-color: var(--vp-c-bg-mute);
}

@media (max-width: 959px) {
    .mobile-menu-trigger {
        display: flex;
    }

    /* Force hide standard VitePress Desktop Menu on mobile */
    :global(.VPNavBarMenu) {
        display: none !important;
    }
}

/* Mobile Dropdown - Bottom Sheet Style */
.mobile-dropdown-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    z-index: 20000;
    /* Extremely high Z-index to beat navbar */
    display: flex;
    align-items: flex-end;
    /* Align to Bottom */
    justify-content: center;
    padding: 0;
}

.mobile-dropdown-card {
    width: 100%;
    max-width: 600px;
    /* Limit width on tablets */
    margin: 0 auto;
    /* Center horizontally */
    background: rgba(255, 255, 255, 0.96);
    backdrop-filter: blur(30px) saturate(180%);
    -webkit-backdrop-filter: blur(30px) saturate(180%);
    border-radius: 32px 32px 0 0;
    /* Top corners only */
    padding: 24px 24px calc(24px + env(safe-area-inset-bottom)) 24px;
    box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.15);
    border: none;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    max-height: 85vh;
    overflow-y: auto;
    position: relative;
    display: flex;
    flex-direction: column;
}

.dark .mobile-dropdown-card {
    background: rgba(28, 28, 30, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.drawer-handle {
    width: 40px;
    height: 5px;
    background: var(--vp-c-divider);
    border-radius: 10px;
    margin: 0 auto 20px;
}

.menu-items {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
    margin-top: 12px;
}

.menu-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 18px;
    background: rgba(0, 0, 0, 0.03);
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
    border: 1px solid transparent;
}

.menu-item:hover {
    background: rgba(0, 0, 0, 0.06);
    transform: scale(1.01);
}

.menu-item:active {
    transform: scale(0.98);
}

.dark .menu-item {
    background: rgba(255, 255, 255, 0.05);
}

.dark .menu-item:hover {
    background: rgba(255, 255, 255, 0.08);
}

.item-icon {
    color: var(--vp-c-text-2);
    display: flex;
    align-items: center;
}

.item-text {
    flex: 1;
}

.item-text .label {
    font-size: 15px;
    font-weight: 600;
    color: var(--vp-c-text-1);
}

/* Switch Toggle Style */
.toggle-track {
    display: none;
}

/* Using compact mode now */

.dropdown-footer {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 16px;
    border-top: 1px solid var(--vp-c-divider);
}

.user-detail-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 8px;
}

.current-user-label {
    font-size: 11px;
    color: var(--vp-c-text-3);
    margin-bottom: 2px;
}

.user-detail-footer .name {
    font-size: 16px;
    font-weight: 600;
    color: var(--vp-c-text-1);
}


.logout-btn-full {
    width: 100%;
    padding: 16px;
    border-radius: 16px;
    background: #ff3b30;
    color: white !important;
    font-weight: 700;
    border: none;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.2s;
}

.logout-btn-full:active {
    transform: scale(0.96);
}

.close-btn {
    width: 100%;
    padding: 16px;
    border-radius: 16px;
    background: rgba(0, 0, 0, 0.04);
    color: var(--vp-c-text-1);
    font-weight: 600;
    border: none;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.2s;
}

.dark .close-btn {
    background: rgba(255, 255, 255, 0.08);
}

.close-btn:active {
    transform: scale(0.96);
}

/* Slide Up Transition */
.slide-up-enter-active,
.slide-up-leave-active {
    transition: opacity 0.3s ease;
}

.slide-up-enter-active .mobile-dropdown-card,
.slide-up-leave-active .mobile-dropdown-card {
    transition: transform 0.3s cubic-bezier(0.2, 0.9, 0.2, 1.05);
    /* Faster physics */
}

.slide-up-enter-from,
.slide-up-leave-to {
    opacity: 0;
}

.slide-up-enter-from .mobile-dropdown-card {
    transform: translateY(100%);
}

.slide-up-leave-to .mobile-dropdown-card {
    transform: translateY(100%);
}

/* Navigation Styles */
.nav-link {
    text-decoration: none;
    color: inherit;
}

.nav-group-header {
    justify-content: space-between;
}

.item-icon-right {
    color: var(--vp-c-text-3);
    font-size: 12px;
    display: flex;
    align-items: center;
}

.chevron {
    transition: transform 0.3s;
}

.nav-group-header.expanded .chevron {
    transform: rotate(180deg);
    color: var(--vp-c-brand);
}

.submenu-container {
    padding-left: 20px;
    /* Aligned left but indented */
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 4px;
    margin-bottom: 20px;
    border-left: 2px solid var(--vp-c-divider);
    margin-left: 24px;
}

.submenu-group-label {
    font-size: 12px;
    font-weight: 700;
    color: var(--vp-c-text-3);
    margin-bottom: 6px;
    padding-left: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.submenu-item {
    display: block;
    padding: 12px 14px;
    background: transparent;
    border-radius: 8px;
    font-size: 15px;
    color: var(--vp-c-text-1);
    text-decoration: none;
    transition: all 0.2s;
}

.submenu-item.nested {
    font-size: 14px;
    color: var(--vp-c-text-2);
}

.submenu-item:hover {
    background: rgba(0, 0, 0, 0.04);
    color: var(--vp-c-brand);
}

.divider-horizontal {
    height: 1px;
    background: var(--vp-c-divider);
    margin: 8px 16px 20px;
    opacity: 0.5;
}

/* Settings Grid (Side-by-Side) */
.settings-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 0;
}

.menu-item.compact {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 8px;
    padding: 16px 10px;
}

.compact-icon {
    color: var(--vp-c-text-2);
    margin-bottom: 4px;
}

.menu-item.compact:hover .compact-icon {
    color: var(--vp-c-brand);
}

.compact-label {
    font-size: 14px;
    font-weight: 600;
    color: var(--vp-c-text-1);
}

.compact-status {
    font-size: 11px;
    color: var(--vp-c-text-3);
}

.no-hover:hover {
    transform: none !important;
    background: rgba(0, 0, 0, 0.03) !important;
    cursor: default !important;
}

.dark .no-hover:hover {
    background: rgba(255, 255, 255, 0.05) !important;
}



/* Global Override to hide default VitePress Hamburger only */
:global(.VPNavBarHamburger) {
    display: none !important;
}
</style>
