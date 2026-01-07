<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useLayoutMode } from '../composables/useLayoutMode';
import { useData } from 'vitepress';

const { isMobileView, toggleLayout } = useLayoutMode();
const { isDark } = useData();

const user = ref<string | null>(null);
const isGuest = ref(false);
const isMenuOpen = ref(false);

// Ensure user is always set for consistent UI
onMounted(async () => {
  try {
    const res = await fetch('/auth/me');
    if (res.ok) {
        const data = await res.json();
        if (data.email) {
            user.value = data.email;
            isGuest.value = false;
        } else {
            throw new Error();
        }
    } else {
        throw new Error();
    }
  } catch (e) {
    user.value = 'sample@edu.tw';
    isGuest.value = true;
  }
});

const toggleDarkMode = () => {
  // VitePress dark mode toggle
  const html = document.documentElement;
  html.classList.toggle('dark');
  const newValue = html.classList.contains('dark');
  localStorage.setItem('vitepress-theme-appearance', newValue ? 'dark' : 'light');
};

const logout = () => {
    if (isGuest.value) return;
    if (confirm('確定要登出系統嗎？')) {
        location.href = '/auth/logout';
    }
};
</script>

<template>
  <div class="user-center">
    <!-- Desktop Horizontal View -->
    <div class="desktop-actions">
        <!-- Layout Toggle -->
        <button @click="toggleLayout" class="action-btn" :title="isMobileView ? '切換至電腦版介面' : '切換至行動版介面'">
            <svg v-if="isMobileView" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
        </button>

        <!-- Dark Mode Toggle -->
        <button @click="toggleDarkMode" class="action-btn" :title="isDark ? '切換至淡色模式' : '切換至深色模式'">
            <svg v-if="isDark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
        </button>

        <div class="divider"></div>

        <div class="user-info" v-if="user">
            <span class="username">{{ (user || '').split('@')[0] }}</span>
            <button v-if="!isGuest" @click="logout" class="logout-link">登出</button>
        </div>
    </div>

    <!-- Mobile Integrated Menu Button -->
    <button class="mobile-menu-trigger" @click="isMenuOpen = !isMenuOpen">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
    </button>

    <!-- Mobile Dropdown Panel -->
    <Transition name="slide-up">
        <div v-if="isMenuOpen" class="mobile-dropdown-overlay" @click="isMenuOpen = false">
            <div class="mobile-dropdown-card" @click.stop>
                <div class="dropdown-header">
                    <div class="user-detail no-avatar">
                        <div class="name">{{ user ? (user || '').split('@')[0] : '訪客' }}</div>
                        <div class="full-email">{{ user || '未登入系統' }}</div>
                    </div>
                </div>

                <div class="menu-items">
                    <!-- Layout Mode -->
                    <div class="menu-item" @click="toggleLayout(); isMenuOpen = false">
                        <div class="item-icon">
                            <svg v-if="isMobileView" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                            <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                        </div>
                        <div class="item-text">
                            <div class="label">版面模式</div>
                            <div class="sublabel">{{ isMobileView ? '目前為：行動版' : '目前為：電腦版' }}</div>
                        </div>
                        <div class="toggle-track" :class="{ active: isMobileView }">
                            <div class="toggle-thumb"></div>
                        </div>
                    </div>

                    <!-- Dark Mode -->
                    <div class="menu-item" @click="toggleDarkMode">
                        <div class="item-icon">
                            <svg v-if="isDark" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                            <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                        </div>
                        <div class="item-text">
                            <div class="label">外觀模式開關</div>
                            <div class="sublabel">{{ isDark ? '目前為：深色' : '目前為：淡色' }}</div>
                        </div>
                        <div class="toggle-track" :class="{ active: isDark }">
                            <div class="toggle-thumb"></div>
                        </div>
                    </div>
                </div>

                <div class="dropdown-footer">
                    <button v-if="!isGuest" class="logout-btn-full" @click="logout">登出帳號</button>
                    <button class="close-btn" @click="isMenuOpen = false">關閉選單</button>
                </div>
            </div>
        </div>
    </Transition>
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
    .desktop-actions { display: flex; }
    .mobile-menu-trigger { display: none; }
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
.action-btn:hover { color: var(--vp-c-brand); background: var(--vp-c-bg-mute); }

.divider {
    width: 1px;
    height: 18px;
    background: var(--vp-c-divider);
}

.user-info { display: flex; align-items: center; gap: 8px; font-size: 14px; }
.username { 
    color: var(--vp-c-text-1); 
    font-weight: 600; 
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.logout-link, .login-link { 
    color: var(--vp-c-brand); cursor: pointer; background: none; border: none; padding: 0; font-weight: 600;
    text-decoration: none;
}
.login-link:hover { text-decoration: underline; }

/* Mobile Trigger */
.mobile-menu-trigger {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: var(--vp-c-brand);
    color: white;
    border: none;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
}

/* Mobile Dropdown - Liquid Glass */
.mobile-dropdown-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.3);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 9999;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 16px;
    padding-bottom: calc(16px + env(safe-area-inset-bottom));
}

.mobile-dropdown-card {
    width: 100%;
    max-width: 500px;
    min-height: 300px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(40px) saturate(200%);
    -webkit-backdrop-filter: blur(40px) saturate(200%);
    border-radius: 32px;
    padding: 28px;
    box-shadow: 0 30px 60px rgba(0,0,0,0.25);
    border: 1px solid rgba(255, 255, 255, 0.5);
    max-height: 85vh;
    overflow-y: auto;
    position: relative;
}

.dark .mobile-dropdown-card {
    background: rgba(28, 28, 30, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.dropdown-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 28px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(0,0,0,0.06);
}

.dark .dropdown-header {
    border-bottom: 1px solid rgba(255,255,255,0.08);
}

.user-detail.no-avatar {
    padding-left: 4px;
}

.user-detail .name { font-size: 18px; font-weight: 700; color: var(--vp-c-text-1); line-height: 1.2; }
.user-detail .full-email { font-size: 13px; color: var(--vp-c-text-3); margin-top: 4px; }

.menu-items { display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px; }

.menu-item {
    display: flex; align-items: center; gap: 16px;
    padding: 18px; 
    background: rgba(0,0,0,0.03);
    border-radius: 16px; 
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
    border: 1px solid transparent;
}
.menu-item:hover { 
    background: rgba(0,0,0,0.06); 
    transform: scale(1.01);
}
.menu-item:active {
    transform: scale(0.98);
}
.dark .menu-item {
    background: rgba(255,255,255,0.05);
}
.dark .menu-item:hover {
    background: rgba(255,255,255,0.08);
}

.item-icon { color: var(--vp-c-text-2); display: flex; align-items: center; }
.item-text { flex: 1; }
.item-text .label { font-size: 15px; font-weight: 600; color: var(--vp-c-text-1); }
.item-text .sublabel { font-size: 12px; color: var(--vp-c-text-3); }

/* Switch Toggle Style */
.toggle-track {
    width: 44px; height: 24px; border-radius: 12px;
    background: var(--vp-c-divider);
    position: relative; transition: background 0.3s;
}
.toggle-track.active { background: var(--vp-c-brand); }
.toggle-thumb {
    width: 20px; height: 20px; border-radius: 50%;
    background: white; position: absolute; top: 2px; left: 2px;
    transition: transform 0.3s; box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}
.toggle-track.active .toggle-thumb { transform: translateX(20px); }

.dropdown-footer { display: flex; flex-direction: column; gap: 12px; padding-top: 8px; }
.logout-btn-full {
    width: 100%; padding: 16px; border-radius: 16px;
    background: #ff3b30; color: white !important; font-weight: 700; border: none;
    text-align: center; text-decoration: none; cursor: pointer;
    font-size: 16px;
    transition: all 0.2s;
}
.logout-btn-full:active { transform: scale(0.96); }

.close-btn {
    width: 100%; padding: 16px; border-radius: 16px;
    background: rgba(0,0,0,0.04);
    color: var(--vp-c-text-1);
    font-weight: 600; border: none; cursor: pointer;
    font-size: 16px;
    transition: all 0.2s;
}
.dark .close-btn {
    background: rgba(255,255,255,0.08);
}
.close-btn:active { transform: scale(0.96); }

/* Slide Up Transition */
.slide-up-enter-active,
.slide-up-leave-active {
    transition: opacity 0.3s ease;
}

.slide-up-enter-active .mobile-dropdown-card,
.slide-up-leave-active .mobile-dropdown-card {
    transition: all 0.4s cubic-bezier(0.2, 0.9, 0.2, 1.05);
}

.slide-up-enter-from,
.slide-up-leave-to {
    opacity: 0;
}

.slide-up-enter-from .mobile-dropdown-card {
    transform: translateY(100%);
    opacity: 0;
}

.slide-up-leave-to .mobile-dropdown-card {
    transform: translateY(100%);
    opacity: 0;
}
</style>
