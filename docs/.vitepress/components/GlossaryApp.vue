<script setup lang="ts">
import { ref, computed, onMounted, nextTick, shallowRef } from "vue";
import { useData } from "vitepress";
// @ts-ignore
import { data as _rawDataImported } from "../../data/all.data";

const { lang } = useData();
const isMounted = ref(false);

const rawData = shallowRef(_rawDataImported);

const langData = computed(() => {
  const d = rawData.value;
  return lang.value === "en-US" ? d?.en : d?.zh;
});
const glossaryData = computed(() => langData.value?.glossaryData || []);

import { useLayoutMode } from "../theme/composables/useLayoutMode";
import { useAppFeatures } from "../theme/composables/useAppFeatures";
import { useKeyboardShortcuts } from "../theme/composables/useKeyboardShortcuts";
import AppSidebar from "./AppSidebar.vue";
import MobileDrawer from "../theme/components/MobileDrawer.vue";
import EmptyState from "../theme/components/EmptyState.vue";

const t = computed(() => {
  const translations = {
    "zh-TW": {
      sidebarTitle: "術語分類",
      searchPlaceholder: "輸入 MDM 術語或縮寫...",
      categoryLabel: "類別",
      allLabel: "全部顯示",
      allChips: "全部",
      sortAZ: "A-Z",
      sortZA: "Z-A",
      sortBtnAZ: "排序 A-Z",
      sortBtnZA: "排序 Z-A",
      allCategories: "所有術語",
      totalTerms: "找到 {n} 項",
      analogyLabel: "白話文解說",
      emptyState: "未找到「{q}」",
      clearSearch: "清除搜尋",
      menuBtn: "搜尋與設定",
      drawerTitle: "術語搜尋與設定",
      drawerCategoryTitle: "術語分類",
      fontScaleTitle: "字體大小調整",
      fontExtraSmall: "極小",
      fontSmall: "小",
      fontMedium: "中",
      fontLarge: "大",
      fontExtraLarge: "極大",
      categories: {
        Core: "核心",
        Enrollment: "註冊",
        Apple: "Apple",
        Security: "安管",
        Network: "網路",
        Hardware: "硬體",
        Apps: "軟體",
        Other: "其他",
        Education: "教育",
        macOS: "macOS",
        Jamf: "Jamf",
      },
    },
    "en-US": {
      sidebarTitle: "Glossary Categories",
      searchPlaceholder: "Search terms or abbreviations...",
      categoryLabel: "Module",
      allLabel: "Show All",
      allChips: "All",
      sortAZ: "A-Z",
      sortZA: "Z-A",
      sortBtnAZ: "Sort A-Z",
      sortBtnZA: "Sort Z-A",
      allCategories: "Glossary",
      totalTerms: "{n} items",
      analogyLabel: "In Plain English",
      emptyState: 'No results for "{q}"',
      clearSearch: "Clear",
      menuBtn: "Search & Filter",
      drawerTitle: "Glossary Settings",
      drawerCategoryTitle: "Categories",
      fontScaleTitle: "Font Size",
      fontExtraSmall: "XS",
      fontSmall: "S",
      fontMedium: "M",
      fontLarge: "L",
      fontExtraLarge: "XL",
      categories: {
        Core: "Core",
        Enrollment: "Enroll",
        Apple: "Apple",
        Security: "Security",
        Network: "Network",
        Hardware: "Hardware",
        Apps: "Apps",
        Other: "Other",
        Education: "Edu",
        macOS: "macOS",
        Jamf: "Jamf",
      },
    },
  };
  return (
    translations[lang.value as keyof typeof translations] ||
    translations["zh-TW"]
  );
});

const { isMobileView } = useLayoutMode();
const { fontScale, isSidebarCollapsed, toggleSidebar } =
  useAppFeatures("mdm-glossary");
const searchQuery = ref("");
const selectedCategory = ref<string | "All">("All");
const sortOrder = ref<"asc" | "desc">("asc");
const isSettingsOpen = ref(false);

const closeMobileDrawer = () => {
  isSettingsOpen.value = false;
};

const selectCategoryAndClose = (cat: string) => {
  selectedCategory.value = cat;
  closeMobileDrawer();
};

const categoriesList = [
  "All",
  "Core",
  "Enrollment",
  "Apple",
  "Security",
  "Network",
  "Hardware",
  "Apps",
  "Education",
  "macOS",
  "Jamf",
  "Other",
] as const;

const filteredTerms = computed(() => {
  let filtered = glossaryData.value.filter((item: any) => {
    const queries = searchQuery.value.trim().toLowerCase().split(/\s+/);
    const matchesSearch = queries.every(
      (q) =>
        item.term.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        item.analogy.toLowerCase().includes(q),
    );

    const matchesCategory =
      selectedCategory.value === "All" ||
      (Array.isArray(item.category)
        ? item.category.includes(selectedCategory.value)
        : item.category === selectedCategory.value);

    return matchesSearch && matchesCategory;
  });

  return filtered.sort((a: any, b: any) => {
    const termA = a.term.replace(/\s*\([^)]*\)/g, "").toUpperCase();
    const termB = b.term.replace(/\s*\([^)]*\)/g, "").toUpperCase();
    return sortOrder.value === "asc"
      ? termA.localeCompare(termB)
      : termB.localeCompare(termA);
  });
});

const getCategoryColor = (cat: string) => `badge-${cat.toLowerCase()}`;
const toggleSort = () =>
  (sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc");

useKeyboardShortcuts({
  onSearchFocus: () =>
    (document.querySelector(".search-input") as HTMLInputElement)?.focus(),
  onEscape: () => {
    searchQuery.value = "";
    isSettingsOpen.value = false;
  },
});

onMounted(async () => {
  isMounted.value = true;
  await nextTick();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("card-visible");
      });
    },
    { threshold: 0.1 },
  );
  document.querySelectorAll(".term-card").forEach((el) => observer.observe(el));
});

const getCategoryCount = (cat: string) => {
  if (cat === "All") return glossaryData.value.length;
  return glossaryData.value.filter((item: any) =>
    Array.isArray(item.category)
      ? item.category.includes(cat)
      : item.category === cat,
  ).length;
};

const getCategoryName = (cat: string) =>
  cat === "All" ? t.value.allLabel : (t.value.categories as any)[cat] || cat;
const getCategoryChipName = (cat: string) =>
  cat === "All" ? t.value.allChips : (t.value.categories as any)[cat] || cat;
</script>

<template>
  <div class="glossary-app" :class="{ 'sidebar-collapsed': isSidebarCollapsed }" :style="{ '--app-scale': fontScale }">
    <div v-if="isMounted" class="app-layout">
      <!-- Desktop Sidebar -->
      <AppSidebar :title="t.sidebarTitle" :is-open="!isSidebarCollapsed" class="desktop-only" @toggle="toggleSidebar"
        @update:scale="(val) => (fontScale = val)">
        <template #search>
          <div class="search-section">
            <div class="search-box">
              <span class="search-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
              <input v-model="searchQuery" type="text" :placeholder="t.searchPlaceholder" class="search-input" />
            </div>
          </div>
        </template>

        <template #nav-items>
          <div class="categories-header">
            <span>{{ t.categoryLabel }}</span>
            <button @click="toggleSort" class="sort-btn">
              {{ sortOrder === "asc" ? t.sortAZ : t.sortZA }}
            </button>
          </div>
          <div class="categories-list">
            <button v-for="cat in categoriesList" :key="cat" @click="selectedCategory = cat"
              :class="['cat-item', { active: selectedCategory === cat }]">
              {{ getCategoryName(cat) }}
              <span class="cat-count" v-if="getCategoryCount(cat) > 0">{{
                getCategoryCount(cat)
              }}</span>
            </button>
          </div>
        </template>
      </AppSidebar>

      <main class="app-content">
        <header class="content-header">
          <div class="view-status-bar">
            <span class="status-label">{{
              selectedCategory === "All"
                ? t.allCategories
                : getCategoryName(selectedCategory)
            }}</span>
            <span class="status-count">{{
              t.totalTerms.replace("{n}", String(filteredTerms.length))
            }}</span>
            <button v-if="!isMobileView" @click="toggleSort" class="desk-sort-btn">
              {{ sortOrder === "asc" ? "A-Z" : "Z-A" }}
            </button>
          </div>
        </header>

        <TransitionGroup name="list" tag="div" class="terms-grid">
          <article v-for="item in filteredTerms" :key="item.term" class="term-card">
            <div class="term-card-content">
              <div class="card-main">
                <header class="card-header">
                  <h3 class="term-title">{{ item.term }}</h3>
                  <div class="term-badges">
                    <span v-for="cat in Array.isArray(item.category)
                      ? item.category
                      : [item.category]" :key="cat" :class="['badge', getCategoryColor(cat)]">{{ getCategoryName(cat)
                      }}</span>
                  </div>
                </header>
                <div class="term-definition markdown-body" :lang="lang" v-html="item.definition"></div>
              </div>
              <section v-if="item.analogy" class="analogy-wrapper">
                <div class="analogy-header">
                  <span class="analogy-icon">💡</span>
                  <span class="analogy-label">{{ t.analogyLabel }}</span>
                </div>
                <div class="analogy-text markdown-body" :lang="lang" v-html="item.analogy"></div>
              </section>
            </div>
          </article>
        </TransitionGroup>

        <EmptyState v-if="filteredTerms.length === 0" :description="t.emptyState.replace('{q}', searchQuery)"
          :action-text="t.clearSearch" @clear="
            searchQuery = '';
          selectedCategory = 'All';
          " />
      </main>
    </div>

    <!-- Mobile Unified Settings Drawer -->
    <MobileDrawer v-if="isMounted" :is-open="isSettingsOpen" :title="t.drawerTitle" @close="closeMobileDrawer">
      <div class="mobile-drawer-inner">
        <!-- Search Section -->
        <div class="drawer-section">
          <div class="search-box mobile-search-bar">
            <span class="search-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input v-model="searchQuery" type="text" :placeholder="t.searchPlaceholder" class="search-input" />
            <button v-if="searchQuery" class="clear-search-btn" @click="searchQuery = ''">
              ✕
            </button>
          </div>
        </div>

        <!-- Category Chips -->
        <div class="drawer-section">
          <div class="section-label-mini">
            <span>{{ t.drawerCategoryTitle }}</span>
            <button @click="toggleSort" class="sort-text-btn">
              {{ sortOrder === "asc" ? t.sortBtnAZ : t.sortBtnZA }}
            </button>
          </div>
          <div class="mobile-filter-chips">
            <div class="chip-scroll-container">
              <button v-for="cat in categoriesList" :key="cat" @click="selectCategoryAndClose(cat)"
                :class="['filter-chip', { active: selectedCategory === cat }]">
                {{ getCategoryChipName(cat) }}
              </button>
            </div>
          </div>
        </div>

        <!-- Font Controls -->
        <div class="drawer-section">
          <div class="section-label-mini">
            <span>{{ t.fontScaleTitle }}</span>
          </div>
          <div class="btn-group-mobile">
            <button @click="fontScale = 0.85" :class="{ active: fontScale === 0.85 }">
              {{ t.fontExtraSmall }}
            </button>
            <button @click="fontScale = 0.92" :class="{ active: fontScale === 0.92 }">
              {{ t.fontSmall }}
            </button>
            <button @click="fontScale = 1.0" :class="{ active: fontScale === 1.0 }">
              {{ t.fontMedium }}
            </button>
            <button @click="fontScale = 1.2" :class="{ active: fontScale === 1.2 }">
              {{ t.fontLarge }}
            </button>
            <button @click="fontScale = 1.4" :class="{ active: fontScale === 1.4 }">
              {{ t.fontExtraLarge }}
            </button>
          </div>
        </div>
      </div>
    </MobileDrawer>

    <!-- Super FAB Button -->
    <button v-if="isMounted" class="super-fab-btn" @click="isSettingsOpen = true" :aria-label="t.menuBtn">
      <div class="fab-icons">
        <svg v-if="!searchQuery" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2.5">
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
  word-wrap: break-word;
  overflow-wrap: break-word;
  letter-spacing: 0.015em;
  /* WCAG: 0.12x font size */
  word-spacing: 0.02em;
  max-width: 75ch;
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
  text-align: left;
  word-break: break-word;
}

/* Language-Specific Optimizations: English */
.markdown-body[lang="en"],
.markdown-body[lang="en-US"] {
  line-height: 1.6 !important;
  word-spacing: 0.04em;
  /* Enhanced word spacing for English */
  text-align: left;
  hyphens: auto;
  -webkit-hyphens: auto;
}

/* Mixed Language: English words within Chinese text */
.markdown-body[lang="zh"] :deep(code),
.markdown-body[lang="zh-TW"] :deep(code) {
  /* Code blocks maintain normal spacing */
  letter-spacing: 0;
  word-spacing: 0;
}

.glossary-app {
  --base-size: calc(16px * var(--app-scale, 1));
  width: 100%;
  color: var(--vp-c-text-1);
}

.app-layout {
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 24px;
  max-width: 1600px;
  margin: 0 auto;
}

.app-content {
  flex: 1;
  min-width: 0;
  font-size: var(--base-size);
}

/* Super FAB Button */
.super-fab-btn {
  position: fixed;
  bottom: 24px;
  left: 24px;
  padding: 0 24px;
  height: 56px;
  background: var(--vp-c-brand-1);
  color: white;
  border-radius: 28px;
  display: none;
  align-items: center;
  gap: 12px;
  box-shadow: 0 12px 32px rgba(var(--vp-c-brand-1-rgb), 0.4);
  z-index: 1000;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-weight: 700;
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

@media (max-width: 900px) {
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

/* Mobile Drawer Styling */
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

.section-label-mini {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  font-weight: 800;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.sort-text-btn {
  color: var(--vp-c-brand-1);
  text-transform: none;
  font-weight: 700;
  letter-spacing: 0;
}

.mobile-search-bar .search-input {
  width: 100%;
  padding: 16px 16px 16px 48px;
  border-radius: 16px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-mute);
  font-size: 17px;
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
  text-align: center;
  min-width: 100px;
  transition: all 0.2s;
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
}

/* Content Styling */
.content-header {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
}

.view-status-bar {
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 14px;
  color: var(--vp-c-text-3);
  font-weight: 700;
  width: 100%;
}

.status-label {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 4px 12px;
  border-radius: 8px;
}

.desk-sort-btn {
  margin-left: auto;
  color: var(--vp-c-brand-1);
}

.terms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 400px), 1fr));
  gap: 24px;
}

.term-card {
  height: 100%;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.term-card-content {
  background: var(--vp-c-bg-elv);
  border-radius: 20px;
  border: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.term-card:hover {
  transform: translateY(-8px);
}

.card-main {
  padding: 28px;
  flex: 1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 20px;
}

.term-title {
  font-size: 22px;
  font-weight: 800;
  margin: 0;
  line-height: 1.2;
}

.analogy-wrapper {
  background: var(--vp-c-bg-soft);
  padding: 24px 28px;
  border-top: 1px solid var(--vp-c-divider);
}

.analogy-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.analogy-icon {
  font-size: 20px;
}

.analogy-label {
  font-weight: 800;
  font-size: 11px;
  color: var(--vp-c-brand-1);
  text-transform: uppercase;
}

.analogy-text :deep(strong) {
  color: var(--vp-c-brand-1);
  font-weight: 700;
}

.badge {
  font-size: 10px;
  padding: 3px 10px;
  border-radius: 8px;
  font-weight: 800;
  text-transform: uppercase;
  white-space: nowrap;
}

.badge-core {
  background: rgba(0, 113, 227, 0.1);
  color: #0071e3;
}

.badge-enrollment {
  background: rgba(52, 199, 89, 0.1);
  color: #28cd41;
}

.badge-apple {
  background: rgba(0, 0, 0, 0.05);
  color: #1d1d1f;
}

.badge-security {
  background: rgba(255, 59, 48, 0.1);
  color: #ff3b30;
}

.badge-network {
  background: rgba(88, 86, 214, 0.1);
  color: #5856d6;
}

.badge-hardware {
  background: rgba(255, 149, 0, 0.1);
  color: #ff9500;
}

.badge-apps {
  background: rgba(255, 45, 85, 0.1);
  color: #ff2d55;
}

.badge-education {
  background: rgba(255, 204, 0, 0.1);
  color: #cca300;
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

.cat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  width: 100%;
  border: none;
  background: transparent;
  transition: all 0.2s;
}

.cat-item:hover {
  background: var(--vp-c-bg-soft);
}

.cat-item.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 700;
}

.cat-count {
  font-size: 11px;
  background: var(--vp-c-bg-alt);
  padding: 2px 10px;
  border-radius: 10px;
  font-weight: 600;
}

.app-loading-placeholder {
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-soft);
  margin: 40px;
  border-radius: 20px;
}
</style>
