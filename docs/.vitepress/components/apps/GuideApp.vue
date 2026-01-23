<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, shallowRef } from "vue";
import { useData } from "vitepress";
import { useAppFeatures } from "../../theme/composables/useAppFeatures";
import { useKeyboardShortcuts } from "../../theme/composables/useKeyboardShortcuts";
// @ts-ignore
import { data as rawLoaderData } from "../../../data/all.data";

const { lang } = useData();
const isMounted = ref(false);

// Use shallowRef to avoid deep reactivity overhead on huge static data
const rawData = shallowRef(rawLoaderData);

// Selected data based on current language
const langData = computed(() => {
  const d = rawData.value;
  return lang.value === "en-US" ? d?.en : d?.zh;
});
const allQAData = computed(() => langData.value?.allQAData || []);

import type { QAItem } from "../../../types";
import LayoutSidebar from "../layout/LayoutSidebar.vue";
import LayoutMobileDrawer from "../layout/LayoutMobileDrawer.vue";
import EmptyState from "../ui/EmptyState.vue";

// UI Translations
const t = computed(() => {
  const translations = {
    "zh-TW": {
      sidebarTitle: "指南導覽",
      allQuestions: "全部題目",
      searchPlaceholder: "搜尋服務、硬體或常見問題...",
      important: "重要",
      searchResult: "搜尋結果：{q}",
      clearSearch: "清除搜尋",
      menuBtn: "設定與搜尋",
      drawerTitle: "搜尋與指南設定",
      prevPage: "上一頁",
      nextPage: "下一頁",
      fontScaleTitle: "字體大小調整",
      fontExtraSmall: "極小",
      fontSmall: "小",
      fontMedium: "中",
      fontLarge: "大",
      fontExtraLarge: "極大",
      allLabel: "全部",
      categoryTitle: "章節篩選",
      expandAll: "展開全部題目",
      collapseAll: "收合全部題目",
      hashMap: {
        account: "帳號與伺服器",
        enrollment: "裝置註冊",
        apps: "App 管理",
        classroom: "課堂管理",
        "digital-learning": "數位精進",
        hardware: "硬體排除",
        mac: "Mac 管理",
        "qa-education": "教育實戰",
      },
    },
    "en-US": {
      sidebarTitle: "Guide Navigation",
      allQuestions: "All Questions",
      searchPlaceholder: "Search services, hardware...",
      important: "Important",
      searchResult: "Search results: {q}",
      clearSearch: "Clear Search",
      menuBtn: "Filter & Search",
      drawerTitle: "Search & Guide Settings",
      prevPage: "Previous",
      nextPage: "Next",
      fontScaleTitle: "Font Size Adjustment",
      fontExtraSmall: "XS",
      fontSmall: "S",
      fontMedium: "M",
      fontLarge: "L",
      fontExtraLarge: "XL",
      allLabel: "All",
      categoryTitle: "Chapters",
      expandAll: "Expand All Questions",
      collapseAll: "Collapse All Questions",
      hashMap: {
        account: "Account & Server Management",
        enrollment: "Enrollment & Device Setup",
        apps: "App & Content Distribution",
        classroom: "Apple Classroom & Teaching Tools",
        "digital-learning": "Campus Digital Initiatives",
        hardware: "Hardware & Maintenance",
        mac: "Advanced Mac Management",
        "qa-education": "Education Scenarios & FAQ",
      },
    },
  };
  return (
    translations[lang.value as keyof typeof translations] ||
    translations["zh-TW"]
  );
});

const getChapterCount = (source: string) => {
  const module = (allQAData.value as any[]).find((m) => m.source === source);
  if (!module) return 0;
  return module.sections.reduce(
    (total: number, section: any) => total + section.items.length,
    0
  );
};

const searchQuery = ref("");
const activeSource = ref<string | "All">("All");
const isSidebarOpen = ref(false);
const { fontScale, isSidebarCollapsed, toggleSidebar } =
  useAppFeatures("mdm-qa");

const handleHashChange = () => {
  const hash = window.location.hash.replace("#", "").toLowerCase();
  if (!hash) return;

  const hashMap = t.value.hashMap as Record<string, string>;
  const targetSource =
    hashMap[hash] ||
    (allQAData.value as any[]).find((m: any) =>
      m.source.toLowerCase().includes(hash)
    )?.source;

  if (targetSource) {
    activeSource.value = targetSource;
    searchQuery.value = "";
  } else if (hash === "all") {
    activeSource.value = "All";
    searchQuery.value = "";
  }
};

const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return null;
  const queries = searchQuery.value.trim().toLowerCase().split(/\s+/);
  const results: {
    source: string;
    items: (QAItem & { relevance: number })[];
  }[] = [];

  allQAData.value.forEach((file: any) => {
    const matches: (QAItem & { relevance: number })[] = [];
    file.sections.forEach((s: any) =>
      s.items.forEach((i: any) => {
        let relevance = 0;
        const tags = (i.tags || []).join(" ").toLowerCase();

        const allMatch = queries.every((q) => {
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
            relevance,
          });
        }
      })
    );

    if (matches.length) {
      matches.sort((a, b) => b.relevance - a.relevance);
      results.push({ source: file.source, items: matches });
    }
  });
  return results;
});

const currentModule = computed(() => {
  if (activeSource.value === "All") return null;
  return (allQAData.value as any[]).find(
    (d: any) => d.source === activeSource.value
  );
});

const allQuestions = computed(() => {
  if (activeSource.value !== "All") return null;
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

const expandAll = () => {
  const allIds = new Set<string>();
  if (searchResults.value) {
    searchResults.value.forEach((group: any) => {
      group.items.forEach((item: any) => allIds.add(item.id));
    });
  } else if (activeSource.value === "All") {
    allQAData.value.forEach((module: any) => {
      module.sections.forEach((section: any) => {
        section.items.forEach((item: any) => allIds.add(item.id));
      });
    });
  } else if (currentModule.value) {
    currentModule.value.sections.forEach((section: any) => {
      section.items.forEach((item: any) => allIds.add(item.id));
    });
  }
  openItems.value = allIds;
};

const collapseAll = () => {
  openItems.value = new Set();
};

const isAllExpanded = computed(() => {
  if (searchResults.value) {
    const totalItems = searchResults.value.reduce(
      (acc: number, group: any) => acc + group.items.length,
      0
    );
    return openItems.value.size === totalItems && totalItems > 0;
  } else if (activeSource.value === "All") {
    const totalItems = allQAData.value.reduce(
      (acc: number, module: any) =>
        acc +
        module.sections.reduce(
          (s: number, section: any) => s + section.items.length,
          0
        ),
      0
    );
    return openItems.value.size === totalItems && totalItems > 0;
  } else if (currentModule.value) {
    const totalItems = currentModule.value.sections.reduce(
      (acc: number, section: any) => acc + section.items.length,
      0
    );
    return openItems.value.size === totalItems && totalItems > 0;
  }
  return false;
});

// Auto-open logic for search results
import { watch } from "vue";
watch(searchQuery, (newVal) => {
  if (newVal.length > 2) {
    // If search is active, we don't necessarily open all, but we keep track
  }
});

useKeyboardShortcuts({
  onSearchFocus: () => {
    const searchInput = document.querySelector(
      ".search-input"
    ) as HTMLInputElement;
    searchInput?.focus();
  },
  onEscape: () => {
    if (searchQuery.value) {
      searchQuery.value = "";
    } else if (isSidebarOpen.value) {
      isSidebarOpen.value = false;
    }
  },
});

onMounted(() => {
  isMounted.value = true;
  handleHashChange();
  window.addEventListener("hashchange", handleHashChange);
});

onUnmounted(() => {
  window.removeEventListener("hashchange", handleHashChange);
});

const switchModule = (source: string | "All") => {
  activeSource.value = source;
  searchQuery.value = "";
  isSidebarOpen.value = false;
  openItems.value.clear();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const closeMobileDrawer = () => {
  isSidebarOpen.value = false;
};
</script>

<template>
  <div
    class="guide-app"
    :style="{ '--app-scale': fontScale }"
    :class="{ 'sidebar-collapsed': isSidebarCollapsed }"
  >
    <div v-if="isMounted" class="app-layout">
      <!-- Desktop Sidebar -->
      <LayoutSidebar
        :title="t.sidebarTitle"
        :is-open="!isSidebarCollapsed"
        class="desktop-only"
        @toggle="toggleSidebar"
        @update:scale="(val) => (fontScale = val)"
      >
        <template #search>
          <div class="search-section">
            <div class="search-box">
              <span class="search-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
              <input
                v-model="searchQuery"
                type="text"
                :placeholder="t.searchPlaceholder"
                class="search-input"
              />
            </div>
          </div>
        </template>

        <template #nav-items>
          <button
            @click="switchModule('All')"
            :class="[
              'nav-item',
              { active: activeSource === 'All' && !searchQuery },
            ]"
          >
            <span class="nav-text">{{ t.allQuestions }}</span>
            <span class="nav-count">{{
              (allQAData as any[]).reduce(
                (t: any, m: any) => t + getChapterCount(m.source),
                0
              )
            }}</span>
          </button>
          <div class="sidebar-divider"></div>
          <button
            v-for="module in allQAData"
            :key="module.source"
            @click="switchModule(module.source)"
            :class="[
              'nav-item',
              { active: activeSource === module.source && !searchQuery },
            ]"
          >
            <span class="nav-text">{{ module.source }}</span>
            <span class="nav-count">{{ getChapterCount(module.source) }}</span>
          </button>
        </template>

        <template #footer>
          <div class="sidebar-actions">
            <button
              @click="isAllExpanded ? collapseAll() : expandAll()"
              class="desktop-expand-btn"
            >
              <svg
                v-if="!isAllExpanded"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
              <svg
                v-else
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
              <span>{{ isAllExpanded ? t.collapseAll : t.expandAll }}</span>
            </button>
          </div>
        </template>
      </LayoutSidebar>

      <main class="app-content">
        <header class="content-header" v-if="searchQuery">
          <h2 class="title-text">
            {{ t.searchResult.replace("{q}", searchQuery) }}
          </h2>
        </header>

        <div v-if="searchQuery" class="result-container">
          <div v-if="searchResults && searchResults.length > 0">
            <div
              v-for="group in searchResults"
              :key="group.source"
              class="module-group"
            >
              <h3 class="group-label">{{ group.source }}</h3>
              <div
                v-for="(item, idx) in group.items"
                :key="item.id"
                class="qa-item"
                :class="{ open: openItems.has(item.id) }"
                :style="{ '--item-index': idx }"
              >
                <div class="qa-card-content">
                  <div class="qa-trigger" @click="toggleItem(item.id)">
                    <div class="q-main">
                      <span v-if="item.important" class="imp-tag">{{
                        t.important
                      }}</span>
                      <span class="q-text">{{ item.question }}</span>
                    </div>
                    <span class="arrow">▼</span>
                  </div>
                  <div v-if="openItems.has(item.id)" class="qa-content">
                    <div
                      class="markdown-body"
                      :lang="lang"
                      v-html="item.answer"
                    ></div>
                    <div class="tags">
                      <span v-for="tag in item.tags" :key="tag" class="tag"
                        >#{{ tag }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <EmptyState
            v-else
            @clear="searchQuery = ''"
            :action-text="t.clearSearch"
          />
        </div>

        <div v-else class="module-view">
          <template v-if="activeSource !== 'All'">
            <div
              v-for="section in currentModule?.sections"
              :key="section.title"
              class="section-block"
            >
              <h3 class="section-label">{{ section.title }}</h3>
              <div
                v-for="(item, idx) in section.items"
                :key="item.id"
                class="qa-item"
                :class="{ open: openItems.has(item.id) }"
                :style="{ '--item-index': idx }"
              >
                <div class="qa-card-content">
                  <div class="qa-trigger" @click="toggleItem(item.id)">
                    <div class="q-main">
                      <span v-if="item.important" class="imp-tag">{{
                        t.important
                      }}</span>
                      <span class="q-text">{{ item.question }}</span>
                    </div>
                    <span class="arrow">▼</span>
                  </div>
                  <div v-if="openItems.has(item.id)" class="qa-content">
                    <div
                      class="markdown-body"
                      :lang="lang"
                      v-html="item.answer"
                    ></div>
                    <div class="tags">
                      <span v-for="tag in item.tags" :key="tag" class="tag"
                        >#{{ tag }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template v-else>
            <div
              v-for="module in allQuestions"
              :key="module.source"
              class="chapter-group"
            >
              <h2 class="chapter-title">{{ module.source }}</h2>
              <div
                v-for="section in module.sections"
                :key="section.title"
                class="section-block"
              >
                <h3 class="section-label">{{ section.title }}</h3>
                <div
                  v-for="(item, idx) in section.items"
                  :key="item.id"
                  class="qa-item"
                  :class="{ open: openItems.has(item.id) }"
                  :style="{ '--item-index': idx }"
                >
                  <div class="qa-card-content">
                    <div class="qa-trigger" @click="toggleItem(item.id)">
                      <div class="q-main">
                        <span v-if="item.important" class="imp-tag">{{
                          t.important
                        }}</span>
                        <span class="q-text">{{ item.question }}</span>
                      </div>
                      <span class="arrow">▼</span>
                    </div>
                    <div v-if="openItems.has(item.id)" class="qa-content">
                      <div
                        class="markdown-body"
                        :lang="lang"
                        v-html="item.answer"
                      ></div>
                      <div class="tags">
                        <span v-for="tag in item.tags" :key="tag" class="tag"
                          >#{{ tag }}</span
                        >
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

    <div v-if="!isMounted" class="app-loading-placeholder"></div>

    <!-- Mobile Super Drawer: Contains Everything -->
    <LayoutMobileDrawer
      v-if="isMounted"
      :is-open="isSidebarOpen"
      :title="t.drawerTitle"
      @close="closeMobileDrawer"
    >
      <div class="mobile-drawer-inner">
        <!-- Search Section -->
        <div class="drawer-section">
          <div class="search-box mobile-search-bar">
            <span class="search-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="t.searchPlaceholder"
              class="search-input"
            />
            <button
              v-if="searchQuery"
              class="clear-search-btn"
              @click="searchQuery = ''"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- Filter Chips Section -->
        <div class="drawer-section">
          <div class="section-header-mini">
            <span>{{ t.categoryTitle }}</span>
          </div>
          <div class="mobile-filter-chips">
            <div class="chip-scroll-container">
              <button
                @click="switchModule('All')"
                :class="['filter-chip', { active: activeSource === 'All' }]"
              >
                {{ t.allLabel }}
              </button>
              <button
                v-for="m in allQAData"
                :key="m.source"
                @click="switchModule(m.source)"
                :class="['filter-chip', { active: activeSource === m.source }]"
              >
                {{ m.source }}
              </button>
            </div>
          </div>
        </div>

        <!-- Font Controls Section -->
        <div class="drawer-section">
          <div class="section-header-mini">
            <span>{{ t.fontScaleTitle }}</span>
          </div>
          <div class="btn-group-mobile">
            <button
              @click="fontScale = 0.85"
              :class="{ active: fontScale === 0.85 }"
            >
              {{ t.fontExtraSmall }}
            </button>
            <button
              @click="fontScale = 0.92"
              :class="{ active: fontScale === 0.92 }"
            >
              {{ t.fontSmall }}
            </button>
            <button
              @click="fontScale = 1.0"
              :class="{ active: fontScale === 1.0 }"
            >
              {{ t.fontMedium }}
            </button>
            <button
              @click="fontScale = 1.2"
              :class="{ active: fontScale === 1.2 }"
            >
              {{ t.fontLarge }}
            </button>
            <button
              @click="fontScale = 1.4"
              :class="{ active: fontScale === 1.4 }"
            >
              {{ t.fontExtraLarge }}
            </button>
          </div>
        </div>

        <!-- Expand/Collapse All Button -->
        <div class="drawer-section">
          <button
            @click="
              isAllExpanded ? collapseAll() : expandAll();
              closeMobileDrawer();
            "
            class="expand-all-btn"
          >
            <svg
              v-if="!isAllExpanded"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
            <svg
              v-else
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
            <span>{{ isAllExpanded ? t.collapseAll : t.expandAll }}</span>
          </button>
        </div>
      </div>
    </LayoutMobileDrawer>

    <!-- Super Button: Floating Action Button -->
    <button
      v-if="isMounted"
      class="super-fab-btn"
      @click="isSidebarOpen = true"
      :aria-label="t.menuBtn"
    >
      <div class="fab-icons">
        <svg
          v-if="!searchQuery"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <div v-else class="search-active-dot"></div>
      </div>
      <span class="fab-label">{{ t.menuBtn }}</span>
    </button>
  </div>
</template>

<style scoped>
/* WCAG 2.1 AA Compliant Typography - Research-Based Readability */
.markdown-body {
  font-size: 1.0625rem;
  line-height: 1.6 !important;
  padding-top: 16px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  letter-spacing: 0.015em;
  /* WCAG: 0.12x font size */
  word-spacing: 0.02em;
  max-width: 75ch;
  text-align: left;
}

.markdown-body :deep(p) {
  margin-bottom: 1.25rem;
  line-height: inherit;
  word-spacing: inherit;
}

.markdown-body :deep(h2),
.markdown-body :deep(h3) {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

/* Ensure paragraphs inside list items don't have bottom margin */
.markdown-body :deep(li p) {
  margin-bottom: 0 !important;
}

/* Language-Specific Optimizations: Chinese */
.markdown-body[lang="zh"],
.markdown-body[lang="zh-TW"],
.markdown-body[lang="zh-CN"] {
  line-height: 1.85 !important;
  /* CJK needs more breathing room */
  letter-spacing: 0.02em;
  word-break: break-word;
}

/* Language-Specific Optimizations: English */
.markdown-body[lang="en"],
.markdown-body[lang="en-US"] {
  line-height: 1.6 !important;
  word-spacing: 0.04em;
  /* Enhanced word spacing for English */
  hyphens: auto;
  -webkit-hyphens: auto;
}

/* Mixed Language: Code blocks maintain proper spacing */
.markdown-body :deep(code) {
  letter-spacing: 0;
  word-spacing: 0;
}

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
  font-size: var(--base-size);
}

/* FAB Styling - Super Button */
.super-fab-btn {
  position: fixed;
  bottom: 24px;
  left: 24px;
  /* Placed left to avoid conflict with BackToTop on right */
  padding: 0 24px;
  height: 56px;
  background: var(--vp-c-brand-1);
  color: white;
  border-radius: 28px;
  display: none;
  /* Desktop hidden */
  align-items: center;
  gap: 12px;
  box-shadow: 0 12px 32px rgba(var(--vp-c-brand-1-rgb), 0.4);
  z-index: 1000;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-weight: 700;
}

.super-fab-btn:active {
  transform: scale(0.92);
}

.fab-label {
  font-size: 15px;
}

.search-active-dot {
  width: 12px;
  height: 12px;
  background: #34c759;
  border-radius: 50%;
  border: 2px solid white;
}

@media (max-width: 959px) {
  .super-fab-btn {
    display: flex;
  }

  .app-layout {
    display: block;
    padding: 12px 20px;
  }

  .desktop-only {
    display: none !important;
  }
}

/* Drawer Internal Styling */
.mobile-drawer-inner {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.drawer-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-header-mini {
  font-size: 11px;
  font-weight: 800;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-left: 4px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.mobile-search-bar .search-input {
  width: 100%;
  padding: 16px 16px 16px 48px;
  border-radius: 16px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-mute);
  font-size: 17px;
  /* Best for iOS input */
}

.mobile-search-bar .search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.6;
  pointer-events: none;
  display: flex;
  align-items: center;
  z-index: 2;
}

.clear-search-btn {
  position: absolute;
  right: 12px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-3);
  font-size: 18px;
}

.mobile-filter-chips {
  overflow: hidden;
  margin: 0 -12px;
  padding: 0 12px;
}

.chip-scroll-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 10px;
  padding: 4px 0;
}

.filter-chip {
  white-space: nowrap;
  padding: 12px 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.2s;
  text-align: center;
  min-width: 100px;
}

.filter-chip.active {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(0, 122, 255, 0.2);
}

.btn-group-mobile {
  display: flex;
  gap: 10px;
}

.btn-group-mobile button {
  flex: 1;
  padding: 16px;
  background: var(--vp-c-bg-mute);
  border-radius: 14px;
  border: 1px solid var(--vp-c-divider);
  font-weight: 700;
  color: var(--vp-c-text-2);
}

.btn-group-mobile button.active {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}

/* Expand All Button */
.expand-all-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 24px;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  color: white;
  border-radius: 14px;
  border: none;
  font-weight: 700;
  font-size: 15px;
  box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
}

.expand-all-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 122, 255, 0.4);
}

.expand-all-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0, 122, 255, 0.3);
}

.expand-all-btn svg {
  flex-shrink: 0;
}

/* QA Cards Styling */
.qa-item {
  margin-bottom: 24px;
}

.qa-card-content {
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  overflow: hidden;
  background: var(--vp-c-bg-elv);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.qa-trigger {
  padding: 24px 28px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.q-main {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.q-text {
  font-size: 1.15em;
  font-weight: 800;
  line-height: 1.35;
  letter-spacing: -0.01em;
}

.imp-tag {
  background: #ff3b30;
  color: white;
  padding: 0 8px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
  flex-shrink: 0;
  white-space: nowrap;
  margin-bottom: 2px;
  /* Optical adjustment to align with CJK text center line */
}

.arrow {
  color: var(--vp-c-text-3);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.qa-item.open .arrow {
  transform: rotate(180deg);
  color: var(--vp-c-brand-1);
}

.qa-content {
  padding: 0 40px 40px;
  /* Increased to 40px (2.5em) to ensure list markers don't clip */
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
}

.section-label {
  font-size: 1.6em;
  margin: 48px 0 24px;
  font-weight: 900;
  border-bottom: 3px solid var(--vp-c-brand-soft);
  padding-bottom: 10px;
  color: var(--vp-c-text-1);
}

.chapter-title {
  font-size: 2em;
  margin: 80px 0 32px;
  padding: 16px 24px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 20px;
  font-weight: 900;
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
  display: flex;
  align-items: center;
  color: var(--vp-c-text-3);
  pointer-events: none;
  z-index: 2;
}

@media (max-width: 640px) {
  .qa-trigger {
    padding: 20px 24px;
  }

  .qa-content {
    padding: 0 32px 32px;
  }

  .q-text {
    font-size: 1.1em;
  }
}

.sidebar-actions {
  margin-top: 16px;
  padding: 0 4px;
}

.desktop-expand-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  color: white;
  border-radius: 12px;
  border: none;
  font-size: 0.85em;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 12px rgba(0, 122, 255, 0.2);
}

.desktop-expand-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 122, 255, 0.3);
}

.desktop-expand-btn:active {
  transform: translateY(0);
}

.desktop-expand-btn svg {
  flex-shrink: 0;
}
</style>
