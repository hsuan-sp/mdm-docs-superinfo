<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useData } from 'vitepress';
import { useAppFeatures } from '../theme/composables/useAppFeatures';
import { useKeyboardShortcuts } from '../theme/composables/useKeyboardShortcuts';
import * as loaderData from "../../data/all-data.data";

const { lang } = useData();
const data: any = loaderData;
const rawData = data.data || data.default || data;

// Selected data based on current language
const langData = computed(() => lang.value === 'en-US' ? rawData.en : rawData.zh);
const allQAData = computed(() => langData.value?.allQAData || []);

import type { QAItem } from "../../types";
import MarkdownIt from "markdown-it";
import AppSidebar from './AppSidebar.vue';
import MobileDrawer from '../theme/components/MobileDrawer.vue';
import EmptyState from '../theme/components/EmptyState.vue';

// UI Translations
const t = computed(() => {
  const translations = {
    'zh-TW': {
      sidebarTitle: "指南導覽",
      allQuestions: "全部題目",
      searchPlaceholder: "搜尋... (按 / 聚焦)",
      important: "重要",
      searchResult: "搜尋結果：{q}",
      clearSearch: "清除搜尋",
      menuBtn: "章節選單",
      drawerTitle: "章節選單",
      prevPage: "上一頁",
      nextPage: "下一頁",
      fontScaleTitle: "字體大小調整",
      fontSmall: "小",
      fontMedium: "中",
      fontLarge: "大",
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
      searchPlaceholder: "Search... (Press / to focus)",
      important: "Important",
      searchResult: "Search results: {q}",
      clearSearch: "Clear Search",
      menuBtn: "Chapter Menu",
      drawerTitle: "Chapters",
      prevPage: "Previous",
      nextPage: "Next",
      fontScaleTitle: "Font Size Adjustment",
      fontSmall: "S",
      fontMedium: "M",
      fontLarge: "L",
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

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true
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

  // Mapping for both languages
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

const renderMarkdown = (text: string) => {
  if (!text) return "";
  const lines = text.split('\n');
  const nonEmptyLines = lines.filter((l: string) => l.trim());
  const minIndent = nonEmptyLines.length > 0
    ? nonEmptyLines.reduce((min: number, line: string) => {
      const match = line.match(/^\s*/);
      return Math.min(min, match ? match[0].length : min);
    }, Infinity)
    : 0;

  let cleaned = lines.map((line: string) => line.slice(minIndent)).join('\n').trim();
  let processed = cleaned
    .replace(/([^\n])\n(\s*[-*+])/g, '$1\n\n$2')
    .replace(/([^\n])\n(\s*\d+\.)/g, '$1\n\n$2');
  return md.render(processed);
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
};
</script>

<template>
  <div class="guide-app" :style="{ '--app-scale': fontScale }" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
    <div class="app-layout">
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
        <header class="content-header" v-if="searchQuery">
          <h2 class="title-text">{{ t.searchResult.replace('{q}', searchQuery) }}</h2>
        </header>

        <div v-if="searchQuery" class="result-container">
          <div v-if="searchResults && searchResults.length > 0">
            <div v-for="group in searchResults" :key="group.source" class="module-group">
              <h3 class="group-label">{{ group.source }}</h3>
              <div v-for="(item, idx) in group.items" :key="item.id" class="qa-item"
                :class="{ open: openItems.has(item.id) }" :style="{ '--item-index': idx }">
                <div class="qa-lift-layer">
                  <div class="qa-bob-layer">
                    <div class="qa-card-content">
                      <div class="qa-trigger" @click="toggleItem(item.id)">
                        <div class="q-main">
                          <span v-if="item.important" class="imp-tag">{{ t.important }}</span>
                          <span class="q-text">{{ item.question }}</span>
                        </div>
                        <span class="arrow">▼</span>
                      </div>
                      <div v-if="openItems.has(item.id)" class="qa-content">
                        <div class="markdown-body" v-html="renderMarkdown(item.answer)"></div>
                        <div class="tags"><span v-for="t in item.tags" :key="t" class="tag">#{{ t }}</span></div>
                      </div>
                    </div>
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
                <div class="qa-lift-layer">
                  <div class="qa-bob-layer">
                    <div class="qa-card-content">
                      <div class="qa-trigger" @click="toggleItem(item.id)">
                        <div class="q-main">
                          <span v-if="item.important" class="imp-tag">{{ t.important }}</span>
                          <span class="q-text">{{ item.question }}</span>
                        </div>
                        <span class="arrow">▼</span>
                      </div>
                      <div v-if="openItems.has(item.id)" class="qa-content">
                        <div class="markdown-body" v-html="renderMarkdown(item.answer)"></div>
                        <div class="tags"><span v-for="t in item.tags" :key="t" class="tag">#{{ t }}</span></div>
                      </div>
                    </div>
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
                  <div class="qa-lift-layer">
                    <div class="qa-bob-layer">
                      <div class="qa-card-content">
                        <div class="qa-trigger" @click="toggleItem(item.id)">
                          <div class="q-main">
                            <span v-if="item.important" class="imp-tag">{{ t.important }}</span>
                            <span class="q-text">{{ item.question }}</span>
                          </div>
                          <span class="arrow">▼</span>
                        </div>
                        <div v-if="openItems.has(item.id)" class="qa-content">
                          <div class="markdown-body" v-html="renderMarkdown(item.answer)"></div>
                          <div class="tags"><span v-for="t in item.tags" :key="t" class="tag">#{{ t }}</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </main>
    </div>

    <button class="mobile-menu-btn" @click="isSidebarOpen = true">
      {{ t.menuBtn }}
    </button>

    <MobileDrawer :is-open="isSidebarOpen" :title="t.drawerTitle" @close="isSidebarOpen = false">
      <div class="search-box mobile-search">
        <span class="search-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>
        <input v-model="searchQuery" type="text" :placeholder="t.searchPlaceholder" class="search-input" />
      </div>

      <div class="mobile-nav-scroll">
        <div @click="switchModule('All')" class="m-nav-item"
          :class="{ active: activeSource === 'All' && !searchQuery }">
          <span class="nav-text">{{ t.allQuestions }}</span>
          <span class="nav-count">{{(allQAData as any[]).reduce((t: any, m: any) => t + getChapterCount(m.source),
            0)}}</span>
        </div>

        <div v-for="m in allQAData" :key="m.source" @click="switchModule(m.source)" class="m-nav-item"
          :class="{ active: activeSource === m.source && !searchQuery }">
          <span class="nav-text">{{ m.source }}</span>
          <span class="nav-count">{{ getChapterCount(m.source) }}</span>
        </div>
      </div>

      <div class="font-controls-mobile">
        <div class="categories-header-mini"><span>{{ t.fontScaleTitle }}</span></div>
        <div class="btn-group-mobile">
          <button @click="fontScale = 0.9" :class="{ active: fontScale === 0.9 }">{{ t.fontSmall }}</button>
          <button @click="fontScale = 1.0" :class="{ active: fontScale === 1.0 }">{{ t.fontMedium }}</button>
          <button @click="fontScale = 1.15" :class="{ active: fontScale === 1.15 }">{{ t.fontLarge }}</button>
        </div>
      </div>
    </MobileDrawer>
  </div>
</template>

<style scoped>
/* 全域比例控制 */
.guide-app {
  --base-size: calc(16px * var(--app-scale));
  font-size: var(--base-size);
  width: 100%;
  color: var(--vp-c-text-1);
  line-height: 1.6;
}

/* 主要內容區域 */
.app-content {
  flex: 1;
  min-width: 0;
  max-width: 920px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 佈局：電腦版固定側邊欄 */
.app-layout {
  display: flex;
  gap: 48px;
  justify-content: center;
  align-items: flex-start;
  /* Critical for sticky to work */
  padding: 40px 24px;
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  /* Ensure container is tall */
  transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}

/* 統一頁首樣式 */
.content-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  min-height: 48px;
}

.title-text {
  font-size: 2.2em;
  margin: 0;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}



@media (max-width: 900px) {
  .app-layout {
    display: block;
    padding-top: 10px;
  }

  .app-sidebar {
    display: none !important;
  }

  .content-header {
    gap: 10px;
    margin-bottom: 20px;
  }
}


/* 側邊欄視覺與固定邏輯 */


/* 問答卡片 */
.qa-item {
  margin-bottom: 24px;
  width: 100%;
}

.qa-card-content {
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  overflow: hidden;
  background: var(--vp-c-bg-elv, #ffffff);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  animation: qa-intro 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: calc(var(--item-index, 0) * 0.05s);
}

@keyframes qa-intro {
  from {
    opacity: 0;
    transform: translateY(15px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.qa-item:hover .qa-card-content {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand-soft);
}

.qa-item.open .qa-card-content {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 12px 30px rgba(0, 122, 255, 0.1);
}

.qa-trigger {
  padding: 24px 32px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  transition: background-color 0.3s ease;
}

.qa-trigger:hover {
  background-color: var(--vp-c-bg-soft);
}

.q-main {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex: 1;
}

.q-text {
  font-size: 1.15em;
  font-weight: 700;
  line-height: 1.45;
  color: var(--vp-c-text-1);
}

.imp-tag {
  font-size: 0.75em;
  background: #ff3b30;
  color: white;
  padding: 2px 8px;
  border-radius: 6px;
  flex-shrink: 0;
  font-weight: 800;
  margin-top: 2px;
}

.arrow {
  color: var(--vp-c-text-3);
  transition: transform 0.3s;
  margin-top: 4px;
}

.qa-item.open .arrow {
  transform: rotate(180deg);
  color: var(--vp-c-brand-1);
}

/* 內容樣式 */
.qa-content {
  padding: 0 32px 32px;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.markdown-body {
  font-size: 1.05em;
  line-height: 1.8;
  color: var(--vp-c-text-1);
  padding-top: 24px;
}

.markdown-body :deep(strong) {
  color: var(--vp-c-brand-1);
  font-weight: 800;
}

.markdown-body :deep(blockquote) {
  margin: 1.5em 0;
  padding: 16px 24px;
  border-left: 4px solid var(--vp-c-brand-1);
  background: var(--vp-c-bg-alt);
  border-radius: 8px;
  font-style: italic;
  color: var(--vp-c-text-2);
}

.markdown-body :deep(p) {
  margin-bottom: 1.2em;
}

.markdown-body :deep(p:last-child) {
  margin-bottom: 0;
}

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  padding-left: 1.5em;
  margin-bottom: 1.2em;
}

.markdown-body :deep(li) {
  margin-bottom: 0.6em;
}

.markdown-body :deep(table) {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: 24px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
}

.markdown-body :deep(th) {
  background: var(--vp-c-bg-soft);
  padding: 14px 16px;
  text-align: left;
  font-weight: 700;
  border-bottom: 2px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.markdown-body :deep(td) {
  padding: 12px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.markdown-body :deep(tr:last-child td) {
  border-bottom: none;
}

.markdown-body :deep(tr:nth-child(even)) {
  background: rgba(0, 0, 0, 0.02);
}

.dark .markdown-body :deep(tr:nth-child(even)) {
  background: rgba(255, 255, 255, 0.02);
}

.markdown-body :deep(code) {
  background: var(--vp-c-bg-soft);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.9em;
  color: var(--vp-c-brand-1);
}

.section-label {
  font-size: 1.6em;
  margin: 48px 0 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--vp-c-divider);
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.chapter-title {
  font-size: 2em;
  margin: 64px 0 24px;
  padding: 16px 24px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
  border-radius: 20px;
  font-weight: 800;
  border: 1px solid var(--vp-c-divider);
}

.chapter-group:first-child .chapter-title {
  margin-top: 0;
}

/* 行動版 */
.mobile-menu-btn {
  position: fixed;
  bottom: 24px;
  left: 24px;
  z-index: 100;
  padding: 14px 28px;
  background: var(--vp-c-brand-1);
  color: white;
  border-radius: 100px;
  border: none;
  font-weight: 700;
  box-shadow: 0 8px 25px rgba(0, 113, 227, 0.3);
  display: none;
}

@media (max-width: 900px) {
  .mobile-menu-btn {
    display: block;
  }
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 12px 16px 12px 40px;
  border-radius: 12px;
  font-size: 14px;
  transition: all 0.2s;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
  line-height: normal;
  /* Fix misaligned text */
}

.search-input:focus {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.1);
  outline: none;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.mobile-search {
  margin-bottom: 20px;
}

.mobile-search .search-input {
  padding: 14px 18px 14px 44px;
  font-size: 16px;
  border-radius: 16px;
}

.font-controls-mobile {
  margin-top: 32px;
}

.btn-group-mobile {
  display: flex;
  gap: 8px;
}

.btn-group-mobile button {
  flex: 1;
  padding: 12px;
  background: var(--vp-c-bg-mute);
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  cursor: pointer;
}

.btn-group-mobile button.active {
  background: var(--vp-c-brand-1);
  color: white;
}

.categories-header-mini {
  margin-bottom: 12px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
  letter-spacing: 0.05em;
}

.mobile-nav-scroll {
  overflow-y: auto;
  flex: 1;
}

.m-nav-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px;
  border-radius: 16px;
  margin-bottom: 8px;
  background: rgba(0, 0, 0, 0.03);
  transition: all 0.2s;
}

.dark .m-nav-item {
  background: rgba(255, 255, 255, 0.05);
}

.m-nav-item.active {
  background: var(--vp-c-brand-1);
  color: white;
  font-weight: 700;
}

.m-nav-item.active .nav-count {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.nav-count {
  font-size: 11px;
  padding: 2px 8px;
  background: var(--vp-c-divider);
  border-radius: 10px;
}
</style>
