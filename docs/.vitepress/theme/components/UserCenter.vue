<script setup lang="ts">
/**
 * 使用者中心元件 (UserCenter)
 * 
 * 為桌面端提供權限資訊、登出入口與深色模式切換。
 * 在行動端則轉化為全螢幕底層抽屜，整合導覽選單與個人化設定。
 */
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

/**
 * 處理行動版連結點擊
 * 自動關閉選單並進行頁面導向。
 */
const handleLinkClick = (e: Event, link: string) => {
    isMenuOpen.value = false;
    // 檢查是否為外部連結 (包含 http, https, mailto, tel)
    if (/^(http|https|mailto|tel):/.test(link)) return;

    e.preventDefault();
    // VitePress Router uses .go(path)
    router.go(link);
};

const toggleNav = (index: any) => {
    expandedNav.value = expandedNav.value === index ? null : index;
};

onMounted(async () => {
    await checkAuth();
});

/**
 * 主題模式切換
 * 透過 VitePress 全域樣式與 localStorage 實現深色/淺色模式持久化。
 */
const toggleDarkMode = () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
    const newValue = html.classList.contains('dark');
    localStorage.setItem('vitepress-theme-appearance', newValue ? 'dark' : 'light');
};
</script>

<template>
    <div class="user-center" role="region" aria-label="使用者中心">
        <!-- 桌面端水平操作區 -->
        <div class="desktop-actions">
            <div class="divider"></div>

            <!-- 深色模式快速切換 -->
            <button @click="toggleDarkMode" class="action-btn" :aria-label="isDark ? '切換至淡色模式' : '切換至深色模式'"
                :title="isDark ? '切換至淡色模式' : '切換至深色模式'">
                <svg v-if="isDark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
                <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                </svg>
            </button>

            <div class="divider"></div>

            <div class="user-info" v-if="user">
                <span class="username">{{ username }}</span>
                <button v-if="!isGuest" @click="logout" class="logout-link">登出</button>
            </div>
        </div>

        <!-- 行動版選單觸發鈕 (漢寶選單圖示) -->
        <button class="mobile-menu-trigger" @click="isMenuOpen = !isMenuOpen" :aria-expanded="isMenuOpen"
            aria-label="開啟主選單">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
        </button>

        <!-- 行動版下拉面板 (使用 Teleport 確保層級正確) -->
        <Teleport to="body">
            <Transition name="slide-up">
                <div v-if="isMenuOpen" class="mobile-dropdown-overlay" @click="isMenuOpen = false">
                    <div class="mobile-dropdown-card" @click.stop role="dialog" aria-modal="true" aria-label="行動版導覽選單">
                        <div class="drawer-handle"></div>
                        <div class="menu-items">
                            <!-- 整合導航連結 -->
                            <template v-if="theme.nav">
                                <nav class="nav-container">
                                    <div v-for="(item, index) in theme.nav" :key="index" class="nav-group">
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

                                        <!-- 分類標題與子選單 -->
                                        <div v-else class="menu-item nav-group-header"
                                            :class="{ expanded: expandedNav === index }" @click="toggleNav(index)"
                                            role="button" :aria-expanded="expandedNav === index" tabindex="0">
                                            <div class="item-text">
                                                <div class="label">{{ item.text }}</div>
                                            </div>
                                            <div class="item-icon-right chevron">▼</div>
                                        </div>

                                        <div v-if="!item.link && expandedNav === index" class="submenu-container">
                                            <div v-for="(subItem, subIndex) in item.items" :key="subIndex">
                                                <div v-if="subItem.items" class="submenu-group-label">{{ subItem.text }}
                                                </div>
                                                <template v-if="subItem.items">
                                                    <a v-for="leaf in subItem.items" :key="leaf.text" :href="leaf.link"
                                                        class="submenu-item nested" @click="isMenuOpen = false">
                                                        {{ leaf.text }}
                                                    </a>
                                                </template>
                                                <a v-else :href="subItem.link" class="submenu-item"
                                                    @click="isMenuOpen = false">{{ subItem.text }}</a>
                                            </div>
                                        </div>
                                    </div>
                                </nav>
                                <div class="divider-horizontal"></div>
                            </template>

                            <!-- 設定項目網格 -->
                            <div class="settings-grid">
                                <button class="menu-item compact" @click="toggleDarkMode"
                                    :aria-label="isDark ? '切換至淺色模式' : '切換至深色模式'">
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
                                        </svg>
                                    </div>
                                    <div class="compact-label">主題模式</div>
                                    <div class="compact-status">{{ isDark ? '深色' : '淡色' }}</div>
                                </button>
                            </div>
                        </div>

                        <div class="dropdown-footer">
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
}

.desktop-actions {
    display: flex;
    align-items: center;
    gap: 12px;
}

@media (max-width: 768px) {
    .desktop-actions {
        display: none;
    }
}

.mobile-menu-trigger {
    display: none;
    background: transparent;
    border: none;
    padding: 8px;
    color: var(--vp-c-text-1);
    cursor: pointer;
}

@media (max-width: 768px) {
    .mobile-menu-trigger {
        display: block;
    }
}

.divider {
    width: 1px;
    height: 24px;
    background-color: var(--vp-c-divider);
    margin: 0 4px;
}

.action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    color: var(--vp-c-text-2);
    transition: all 0.2s;
    background: transparent;
    border: none;
    cursor: pointer;
}

.action-btn:hover {
    color: var(--vp-c-text-1);
    background-color: var(--vp-c-bg-soft);
}

.user-info {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    color: var(--vp-c-text-1);
}

.username {
    font-weight: 500;
}

.logout-link {
    font-size: 13px;
    color: var(--vp-c-brand-1);
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
}

.logout-link:hover {
    text-decoration: underline;
    color: var(--vp-c-brand-2);
}

/* Mobile Dropdown Overlay & Card */
.mobile-dropdown-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    backdrop-filter: blur(4px);
}

.mobile-dropdown-card {
    background: var(--vp-c-bg);
    width: 100%;
    max-height: 85vh;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.15);
    overflow-y: auto;
}

.drawer-handle {
    width: 40px;
    height: 4px;
    background: var(--vp-c-divider);
    border-radius: 2px;
    margin: 0 auto 24px;
    opacity: 0.6;
}

.menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 24px;
}

.menu-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background: var(--vp-c-bg-soft);
    border-radius: 12px;
    text-decoration: none;
    color: var(--vp-c-text-1);
    transition: background-color 0.2s;
    border: none;
    width: 100%;
    cursor: pointer;
    text-align: left;
}

.menu-item:hover,
.menu-item:active {
    background: var(--vp-c-bg-mute);
}

.item-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.menu-item .label {
    font-weight: 600;
    font-size: 16px;
}

.item-icon-right {
    color: var(--vp-c-text-3);
    display: flex;
}

.item-icon-right.chevron {
    font-size: 12px;
    transition: transform 0.3s;
}

.nav-group-header.expanded .chevron {
    transform: rotate(180deg);
}

.submenu-container {
    padding-left: 16px;
    padding-right: 16px;
    margin-top: -4px;
    margin-bottom: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.submenu-group-label {
    font-size: 12px;
    color: var(--vp-c-text-3);
    margin-top: 12px;
    margin-bottom: 4px;
    font-weight: 600;
}

.submenu-item {
    display: block;
    padding: 12px;
    color: var(--vp-c-text-2);
    font-size: 15px;
    text-decoration: none;
    border-radius: 8px;
}

.submenu-item:hover,
.submenu-item:active {
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-brand-1);
}

.submenu-item.nested {
    padding-left: 16px;
    border-left: 2px solid var(--vp-c-divider);
    border-radius: 0 8px 8px 0;
}

.divider-horizontal {
    height: 1px;
    background-color: var(--vp-c-divider);
    margin: 16px 0;
}

.settings-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
}

.menu-item.compact {
    padding: 12px 16px;
    justify-content: flex-start;
    gap: 12px;
}

.compact-icon {
    display: flex;
    color: var(--vp-c-text-1);
}

.compact-label {
    flex: 1;
    font-weight: 500;
}

.compact-status {
    font-size: 13px;
    color: var(--vp-c-text-3);
}

.dropdown-footer {
    border-top: 1px solid var(--vp-c-divider);
    padding-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.user-detail-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.current-user-label {
    font-size: 13px;
    color: var(--vp-c-text-3);
}

.user-detail-footer .name {
    font-weight: 600;
    color: var(--vp-c-text-1);
}

.logout-btn-full {
    width: 100%;
    padding: 14px;
    background: var(--vp-c-br-red-soft, rgba(255, 59, 48, 0.1));
    color: var(--vp-c-red, #ff3b30);
    border: none;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
}

.close-btn {
    width: 100%;
    padding: 14px;
    background: var(--vp-c-bg-mute);
    color: var(--vp-c-text-1);
    border: none;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
}

/* Transitions */
.slide-up-enter-active,
.slide-up-leave-active {
    transition: opacity 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
    opacity: 0;
}

.slide-up-enter-active .mobile-dropdown-card,
.slide-up-leave-active .mobile-dropdown-card {
    transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.slide-up-enter-from .mobile-dropdown-card,
.slide-up-leave-to .mobile-dropdown-card {
    transform: translateY(100%);
}
</style>
