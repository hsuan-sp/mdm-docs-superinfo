<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, shallowRef } from "vue";
import { useData } from 'vitepress';
import { useAppFeatures } from '../theme/composables/useAppFeatures';
import { useKeyboardShortcuts } from '../theme/composables/useKeyboardShortcuts';
// @ts-ignore
import { data as rawLoaderData } from "../../data/all-data.data";

const { lang } = useData();
const isMounted = ref(false);

// Use shallowRef to avoid deep reactivity overhead on huge static data
const rawData = shallowRef(rawLoaderData);

// Selected data based on current language
const langData = computed(() => {
  const d = rawData.value;
  return lang.value === 'en-US' ? d?.en : d?.zh;
});
const allQAData = computed(() => langData.value?.allQAData || []);

import type { QAItem } from "../../types";
import AppSidebar from './AppSidebar.vue';
import MobileDrawer from '../theme/components/MobileDrawer.vue';
import EmptyState from '../theme/components/EmptyState.vue';

// UI Translations
const t = computed(() => {
  const translations = {
    'zh-TW': {
      sidebarTitle: "指南導覽",
      allQuestions: "全部題目",
      searchPlaceholder: "搜尋服務、硬體或常見問題...",
      important: "重要",
      searchResult: "搜尋結果：{q}",
      clearSearch: "清除搜尋",
      menuBtn: "設定",
      drawerTitle: "介面設定",
      prevPage: "上一頁",
      nextPage: "下一頁",
      fontScaleTitle: "字體大小調整",
      fontSmall: "小",
      fontMedium: "中",
      fontLarge: "大",
      allLabel: "全部",
      hashMap: {
        'account': '帳號與伺服器',
        'enrollment': '裝置註冊',
        'apps': 'App 管理',
        'classroom': '課堂管理',
        'digital-learning': '數位精進',
        'hardware': '硬體排除',
        'mac': 'Mac 管理',
        'qa-education': '教育實戰'
      }
    },
    'en-US': {
      sidebarTitle: "Guide Navigation",
      allQuestions: "All Questions",
      searchPlaceholder: "Search services, hardware...",
      important: "Important",
      searchResult: "Search results: {q}",
      clearSearch: "Clear Search",
      menuBtn: "Settings",
      drawerTitle: "Interface Settings",
      prevPage: "Previous",
      nextPage: "Next",
      fontScaleTitle: "Font Size Adjustment",
      fontSmall: "S",
      fontMedium: "M",
      fontLarge: "L",
      allLabel: "All",
      hashMap: {
        'account': 'Account & Server Management',
        'enrollment': 'Enrollment & Device Setup',
        'apps': 'App & Content Distribution',
        'classroom': 'Apple Classroom & Teaching Tools',
        'digital-learning': 'Campus Digital Initiatives',
        'hardware': 'Hardware & Maintenance',
        'mac': 'Advanced Mac Management',
        'qa-education': 'Education Scenarios & FAQ'
      }
    }
  };
  return translations[lang.value as keyof typeof translations] || translations['zh-TW'];
});

const getChapterCount = (source: string) => {
  const module = (allQAData.value as any[]).find(m => m.source === source);
  if (!module) return 0;
  return module.sections.reduce((total: number, section: any) => total + section.items.length, 0);
};

const searchQuery = ref("");
const activeSource = ref<string | "All">("All");
const isSidebarOpen = ref(false);
const { fontScale, isSidebarCollapsed, toggleSidebar } = useAppFeatures('mdm-qa');

const handleHashChange = () => {
  const hash = window.location.hash.replace('#', '').toLowerCase();
  if (!hash) return;

  const hashMap = t.value.hashMap as Record<string, string>;
  const targetSource = hashMap[hash] || (allQAData.value as any[]).find((m: any) => m.source.toLowerCase().includes(hash))?.source;

  if (targetSource) {
    activeSource.value = targetSource;
    searchQuery.value = '';
  } else if (hash === 'all') {
    activeSource.value = 'All';
    searchQuery.value = '';
  }
};

const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return null;
  const queries = searchQuery.value.trim().toLowerCase().split(/\s+/);
  const results: { source: string, items: (QAItem & { relevance: number })[] }[] = [];

  allQAData.value.forEach((file: any) => {
    const matches: (QAItem & { relevance: number })[] = [];
    file.sections.forEach((s: any) => s.items.forEach((i: any) => {
      let relevance = 0;
      const tags = (i.tags || []).join(' ').toLowerCase();

      const allMatch = queries.every(q => {
        let match = false;
        if (i.question.toLowerCase().includes(q)) {
          relevance += 10;
          match = true;
        }
        if (tags.includes(q)) {
          relevance += 5;
          match = true;
        }
        if (i.answer.toLowerCase().includes(q)) {
          relevance += 1;
          match = true;
        }
        return match;
      });

      if (allMatch) {
        matches.push({
          ...i,
          tags: [...(i.tags || []), file.source],
          relevance
        });
      }
    }));

    if (matches.length) {
      matches.sort((a, b) => b.relevance - a.relevance);
      results.push({ source: file.source, items: matches });
    }
  });
  return results;
});

const currentModule = computed(() => {
  if (activeSource.value === 'All') return null;
  return (allQAData.value as any[]).find((d: any) => d.source === activeSource.value);
});

const allQuestions = computed(() => {
  if (activeSource.value !== 'All') return null;
  return allQAData.value;
});

const openItems = ref(new Set<string>());

const toggleItem = (id: string) => {
  const next = new Set(openItems.value);
  if (next.has(id)) {
    next.delete(id);
  } else {
    next.add(id);
  }
  openItems.value = next;
};

useKeyboardShortcuts({
  onSearchFocus: () => {
    const searchInput = document.querySelector('.search-input') as HTMLInputElement;
    searchInput?.focus();
  },
  onEscape: () => {
    if (searchQuery.value) {
      searchQuery.value = '';
    } else if (isSidebarOpen.value) {
      isSidebarOpen.value = false;
    }
  }
});

onMounted(() => {
  isMounted.value = true;
  handleHashChange();
  window.addEventListener('hashchange', handleHashChange);
});

onUnmounted(() => {
  window.removeEventListener('hashchange', handleHashChange);
});

const switchModule = (source: string | "All") => {
  activeSource.value = source;
  searchQuery.value = '';
  isSidebarOpen.value = false;
  openItems.value.clear();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<template>
  <div class="guide-app" :style="{ '--app-scale': fontScale }" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
    <div v-if="isMounted" class="app-layout">
      <!-- Desktop Sidebar -->
      <AppSidebar :title="t.sidebarTitle" :is-open="!isSidebarCollapsed" class="desktop-only" @toggle="toggleSidebar"
        @update:scale="val => fontScale = val">
        <template #search>
          <div class="search-section">
            <div class="search-box">
              <span class="search-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
              <input v-model="searchQuery" type="text" :placeholder="t.searchPlaceholder" class="search-input" />
            </div>
          </div>
        </template>

        <template #nav-items>
          <button @click="switchModule('All')"
            :class="['nav-item', { active: activeSource === 'All' && !searchQuery }]">
            <span class="nav-text">{{ t.allQuestions }}</span>
            <span class="nav-count">{{(allQAData as any[]).reduce((t: any, m: any) => t + getChapterCount(m.source),
              0)}}</span>
          </button>
          <div class="sidebar-divider"></div>
          <button v-for="module in allQAData" :key="module.source" @click="switchModule(module.source)"
            :class="['nav-item', { active: activeSource === module.source && !searchQuery }]">
            <span class="nav-text">{{ module.source }}</span>
            <span class="nav-count">{{ getChapterCount(module.source) }}</span>
          </button>
        </template>
      </AppSidebar>

      <main class="app-content">
        <!-- New Mobile Smart Header -->
        <div class="mobile-smart-header">
          <div class="mobile-search-bar">
            <div class="search-box">
              <span class="search-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
              <input v-model="searchQuery" type="text" :placeholder="t.searchPlaceholder" class="search-input" />
              <button v-if="searchQuery" class="clear-search-btn" @click="searchQuery = ''">✕</button>
            </div>
          </div>

          <div class="mobile-filter-chips">
            <div class="chip-scroll-container">
              <button @click="switchModule('All')" :class="['filter-chip', { active: activeSource === 'All' }]">
                {{ t.allLabel }}
              </button>
              <button v-for="m in allQAData" :key="m.source" @click="switchModule(m.source)"
                :class="['filter-chip', { active: activeSource === m.source }]">
                {{ m.source }}
              </button>
            </div>
          </div>
        </div>

        <header class="content-header" v-if="searchQuery">
          <h2 class="title-text">{{ t.searchResult.replace('{q}', searchQuery) }}</h2>
        </header>

        <div v-if="searchQuery" class="result-container">
          <div v-if="searchResults && searchResults.length > 0">
            <div v-for="group in searchResults" :key="group.source" class="module-group">
              <h3 class="group-label">{{ group.source }}</h3>
              <div v-for="(item, idx) in group.items" :key="item.id" class="qa-item"
                :class="{ open: openItems.has(item.id) }" :style="{ '--item-index': idx }">
                <div class="qa-card-content">
                  <div class="qa-trigger" @click="toggleItem(item.id)">
                    <div class="q-main">
                      <span v-if="item.important" class="imp-tag">{{ t.important }}</span>
                      <span class="q-text">{{ item.question }}</span>
                    </div>
                    <span class="arrow">▼</span>
                  </div>
                  <div v-if="openItems.has(item.id)" class="qa-content">
                    <div class="markdown-body" v-html="item.answer"></div>
                    <div class="tags"><span v-for="tag in item.tags" :key="tag" class="tag">#{{ tag }}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <EmptyState v-else @clear="searchQuery = ''" :action-text="t.clearSearch" />
        </div>

        <div v-else class="module-view">
          <template v-if="activeSource !== 'All'">
            <div v-for="section in currentModule?.sections" :key="section.title" class="section-block">
              <h3 class="section-label">{{ section.title }}</h3>
              <div v-for="(item, idx) in section.items" :key="item.id" class="qa-item"
                :class="{ open: openItems.has(item.id) }" :style="{ '--item-index': idx }">
                <div class="qa-card-content">
                  <div class="qa-trigger" @click="toggleItem(item.id)">
                    <div class="q-main">
                      <span v-if="item.important" class="imp-tag">{{ t.important }}</span>
                      <span class="q-text">{{ item.question }}</span>
                    </div>
                    <span class="arrow">▼</span>
                  </div>
                  <div v-if="openItems.has(item.id)" class="qa-content">
                    <div class="markdown-body" v-html="item.answer"></div>
                    <div class="tags"><span v-for="tag in item.tags" :key="tag" class="tag">#{{ tag }}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template v-else>
            <div v-for="module in allQuestions" :key="module.source" class="chapter-group">
              <h2 class="chapter-title">{{ module.source }}</h2>
              <div v-for="section in module.sections" :key="section.title" class="section-block">
                <h3 class="section-label">{{ section.title }}</h3>
                <div v-for="(item, idx) in section.items" :key="item.id" class="qa-item"
                  :class="{ open: openItems.has(item.id) }" :style="{ '--item-index': idx }">
                  <div class="qa-card-content">
                    <div class="qa-trigger" @click="toggleItem(item.id)">
                      <div class="q-main">
                        <span v-if="item.important" class="imp-tag">{{ t.important }}</span>
                        <span class="q-text">{{ item.question }}</span>
                      </div>
                      <span class="arrow">▼</span>
                    </div>
                    <div v-if="openItems.has(item.id)" class="qa-content">
                      <div class="markdown-body" v-html="item.answer"></div>
                      <div class="tags"><span v-for="tag in item.tags" :key="tag" class="tag">#{{ tag }}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </main>
    </div>

    <div v-if="!isMounted" class="app-loading-placeholder">
    </div>

    <!-- Mobile Settings Drawer (Simplified) -->
    <MobileDrawer v-if="isMounted" :is-open="isSidebarOpen" :title="t.drawerTitle" @close="isSidebarOpen = false">
      <div class="font-controls-mobile">
        <div class="categories-header-mini"><span>{{ t.fontScaleTitle }}</span></div>
        <div class="btn-group-mobile">
          <button @click="fontScale = 0.9" :class="{ active: fontScale === 0.9 }">{{ t.fontSmall }}</button>
          <button @click="fontScale = 1.0" :class="{ active: fontScale === 1.0 }">{{ t.fontMedium }}</button>
          <button @click="fontScale = 1.15" :class="{ active: fontScale === 1.15 }">{{ t.fontLarge }}</button>
        </div>
      </div>
    </MobileDrawer>

    <button v-if="isMounted" class="mobile-settings-btn" @click="isSidebarOpen = true">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="3"></circle>
        <path
          d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z">
        </path>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.app-loading-placeholder {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-soft);
  margin: 40px;
  border-radius: 24px;
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }

  50% {
    opacity: 0.3;
  }

  100% {
    opacity: 0.6;
  }
}

.guide-app {
  --base-size: calc(16px * var(--app-scale));
  font-size: var(--base-size);
  width: 100%;
  color: var(--vp-c-text-1);
}

.app-layout {
  display: flex;
  gap: 48px;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.app-content {
  flex: 1;
  min-width: 0;
  max-width: 920px;
}

/* Mobile Smart Header */
.mobile-smart-header {
  display: none;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
  position: sticky;
  top: var(--vp-nav-height);
  z-index: 100;
  background: var(--vp-c-bg);
  padding: 12px 0;
}

.mobile-search-bar .search-box {
  background: var(--vp-c-bg-mute);
  border-radius: 16px;
  border: 1px solid var(--vp-c-divider);
  padding: 4px;
}

.mobile-search-bar .search-input {
  background: transparent;
  border: none;
  font-size: 16px;
  /* Prevent zoom on iOS */
}

.clear-search-btn {
  padding: 8px 12px;
  color: var(--vp-c-text-3);
  font-size: 18px;
}

.mobile-filter-chips {
  overflow: hidden;
  margin: 0 -24px;
  padding: 0 24px;
}

.chip-scroll-container {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 8px;
  -webkit-overflow-scrolling: touch;
}

.chip-scroll-container::-webkit-scrollbar {
  display: none;
}

.filter-chip {
  white-space: nowrap;
  padding: 8px 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 100px;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.filter-chip:active {
  transform: scale(0.95);
}

.filter-chip.active {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-1-rgb), 0.3);
}

@media (max-width: 900px) {
  .app-layout {
    display: block;
    padding: 12px 20px;
  }

  .mobile-smart-header {
    display: flex;
  }

  .desktop-only {
    display: none !important;
  }
}

/* QA Cards Styling */
.qa-item {
  margin-bottom: 20px;
}

.qa-card-content {
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  overflow: hidden;
  background: var(--vp-c-bg-elv);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.qa-trigger {
  padding: 20px 24px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.q-text {
  font-size: 1.1em;
  font-weight: 700;
  line-height: 1.4;
}

.imp-tag {
  background: #ff3b30;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 800;
}

.arrow {
  color: var(--vp-c-text-3);
  transition: transform 0.3s;
}

.qa-item.open .arrow {
  transform: rotate(180deg);
  color: var(--vp-c-brand-1);
}

.qa-content {
  padding: 0 24px 24px;
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
}

.markdown-body {
  font-size: 1.05em;
  line-height: 1.7;
  padding-top: 16px;
}

.section-label {
  font-size: 1.5em;
  margin: 40px 0 20px;
  font-weight: 800;
  border-bottom: 2px solid var(--vp-c-divider);
  padding-bottom: 8px;
}

.chapter-title {
  font-size: 1.8em;
  margin: 60px 0 24px;
  padding: 12px 20px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
  border-radius: 16px;
  font-weight: 800;
}

.mobile-settings-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
  border: 1px solid var(--vp-c-divider);
}

@media (max-width: 900px) {
  .mobile-settings-btn {
    display: flex;
  }
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 12px 16px 12px 40px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.5;
  display: flex;
}

.font-controls-mobile {
  padding: 20px 0;
}

.categories-header-mini {
  font-size: 12px;
  font-weight: 700;
  color: var(--vp-c-text-3);
  margin-bottom: 12px;
  text-transform: uppercase;
}

.btn-group-mobile {
  display: flex;
  gap: 8px;
}

.btn-group-mobile button {
  flex: 1;
  padding: 14px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  font-weight: 700;
  color: var(--vp-c-text-2);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-tap-highlight-color: transparent;
}

.btn-group-mobile button:active {
  transform: scale(0.97);
}

.btn-group-mobile button.active {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-1-rgb), 0.3);
}
</style>
