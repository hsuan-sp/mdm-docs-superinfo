<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue";
import * as loaderData from "../../data/all-data.data";
const data: any = loaderData;
const rawData = data.data || data.default || data;
const glossaryData = rawData.glossaryData || [];
import { useLayoutMode } from '../theme/composables/useLayoutMode';
import { useAppFeatures } from '../theme/composables/useAppFeatures';
import { useKeyboardShortcuts } from '../theme/composables/useKeyboardShortcuts';
import AppSidebar from './AppSidebar.vue';
import MobileDrawer from '../theme/components/MobileDrawer.vue';
import EmptyState from '../theme/components/EmptyState.vue';
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true
});

const renderMarkdown = (text: string) => {
  if (!text) return "";
  // Fix list spacing for better rendering
  const processed = text
    .replace(/([^\n])\n(\s*[-*+])/g, '$1\n\n$2')
    .replace(/([^\n])\n(\s*\d+\.)/g, '$1\n\n$2');
  return md.render(processed);
};

const { isMobileView } = useLayoutMode();
const { fontScale, isSidebarCollapsed, toggleSidebar } = useAppFeatures('mdm-glossary');
type CategoryType = "Core" | "Enrollment" | "Apple" | "Security" | "Network" | "Hardware" | "Apps" | "Other" | "Education" | "macOS" | "Jamf";

const searchQuery = ref("");
const selectedCategory = ref<CategoryType | "All">("All");
const sortOrder = ref<'asc' | 'desc'>('asc'); // 新增排序狀態
const isControlsExpanded = ref(false); // 控制搜尋工具的展開/收起，預設收起

const categories = [
  "All",
  "Core",
  "Enrollment",
  "Apple",
  "Security",
  "Network",
  "Hardware",
  "Apps",
  "Other",
  "Education",
  "macOS",    // 新增
  "Jamf",     // 新增
] as const;

const filteredTerms = computed(() => {
  let filtered = glossaryData.filter((item: any) => {
    const queries = searchQuery.value.trim().toLowerCase().split(/\s+/);

    const matchesSearch = queries.every(q => {
      return item.term.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        item.analogy.toLowerCase().includes(q);
    });

    const currentCategory = selectedCategory.value;
    const matchesCategory =
      currentCategory === "All" ||
      (Array.isArray(item.category)
        ? item.category.includes(currentCategory as any)
        : item.category === currentCategory);

    return matchesSearch && matchesCategory;
  });

  return filtered.sort((a: any, b: any) => {
    const termA = a.term.replace(/\s*\([^)]*\)/g, '').toUpperCase();
    const termB = b.term.replace(/\s*\([^)]*\)/g, '').toUpperCase();

    if (sortOrder.value === 'asc') {
      return termA.localeCompare(termB);
    } else {
      return termB.localeCompare(termA);
    }
  });
});

const getCategoryColor = (cat: string) => {
  return `badge-${cat.toLowerCase()}`;
};

// 切換排序順序
const toggleSort = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
};

// Keyboard shortcuts
useKeyboardShortcuts({
  onSearchFocus: () => {
    const searchInput = document.querySelector('.search-input') as HTMLInputElement;
    searchInput?.focus();
  },
  onEscape: () => {
    if (searchQuery.value) {
      searchQuery.value = '';
    } else if (isControlsExpanded.value) {
      isControlsExpanded.value = false;
    }
  }
});

onMounted(async () => {
  await nextTick();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('card-visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.term-card').forEach((el) => {
    observer.observe(el);
  });
});


// Helper to count items per category
const getCategoryCount = (cat: string) => {
  if (cat === 'All') return glossaryData.length;
  return glossaryData.filter((item: any) =>
    Array.isArray(item.category)
      ? item.category.includes(cat as any)
      : item.category === cat
  ).length;
};

const clearSearch = () => {
  searchQuery.value = '';
  selectedCategory.value = 'All';
};


</script>

<template>
  <div class="glossary-app" :class="{ 'is-mobile-device': isMobileView, 'sidebar-collapsed': isSidebarCollapsed }"
    :style="{ '--app-scale': fontScale }">
    <div class="app-layout">
      <!-- Left Sidebar: Filters & Search (Desktop > 1200px) -->
      <!-- Left Sidebar: Filters & Search (Desktop > 1200px) -->
      <AppSidebar title="術語庫分類" :is-open="!isSidebarCollapsed" class="desktop-only" @toggle="toggleSidebar"
        @update:scale="val => fontScale = val">
        <template #search>
          <div class="search-box">
            <span class="search-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input v-model="searchQuery" type="text" placeholder="搜尋術語... (按 / 聚焦)" class="search-input" />
          </div>
        </template>

        <template #nav-items>
          <div class="categories-header">
            <span>分類</span>
            <button @click="toggleSort" class="sort-btn" :title="sortOrder === 'asc' ? 'A-Z' : 'Z-A'">
              {{ sortOrder === 'asc' ? 'A-Z' : 'Z-A' }}
            </button>
          </div>

          <div class="categories-list">
            <button v-for="cat in categories" :key="cat" @click="selectedCategory = cat"
              :class="['cat-item', { active: selectedCategory === cat }]">
              {{ cat === 'All' ? '全部顯示' : cat }}
              <span class="cat-count" v-if="getCategoryCount(cat) > 0">{{ getCategoryCount(cat) }}</span>
            </button>
          </div>
        </template>
      </AppSidebar>

      <main class="app-content">
        <!-- 內容頁首：頂部控制行 -->
        <header class="content-header">

          <div class="view-status-bar">
            <span class="status-label">{{ selectedCategory === 'All' ? '所有分類' : selectedCategory }}</span>
            <span class="status-count">共 {{ filteredTerms.length }} 個術語</span>
          </div>
        </header>
        <TransitionGroup name="list" tag="div" class="terms-grid">
          <article v-for="(item, index) in filteredTerms" :key="item.term" class="term-card"
            :style="{ '--delay': (index as any) % 10 }">
            <div class="card-main">
              <header class="card-header">
                <h3 class="term-title">{{ item.term }}</h3>
                <div class="term-badges">
                  <span v-for="cat in (Array.isArray(item.category) ? item.category : [item.category])" :key="cat"
                    :class="['badge', getCategoryColor(cat)]">
                    {{ cat }}
                  </span>
                </div>
              </header>

              <div class="term-definition markdown-body" v-html="renderMarkdown(item.definition)"></div>
            </div>

            <section v-if="item.analogy" class="analogy-wrapper">
              <div class="analogy-icon" aria-hidden="true">💡</div>
              <div class="analogy-content">
                <span class="analogy-label">白話文 / 比喻</span>
                <div class="analogy-text markdown-body" v-html="renderMarkdown(item.analogy)"></div>
              </div>
            </section>
          </article>
        </TransitionGroup>

        <!-- Empty State -->
        <EmptyState v-if="filteredTerms.length === 0" icon="🧐" :description="`沒有找到符合「${searchQuery}」的術語`"
          action-text="清除搜尋條件" @clear="clearSearch" />
      </main>
    </div>

    <!-- Mobile Floating Filter Button -->
    <button class="mobile-floating-btn" @click="isControlsExpanded = true" v-if="!isControlsExpanded"
      aria-label="開啟搜尋與篩選">
      <span class="icon" aria-hidden="true">🔍</span>
      <span class="label">篩選與搜尋</span>
    </button>

    <!-- Mobile Drawer (Using Shared Component) -->
    <MobileDrawer :is-open="isControlsExpanded" title="篩選與搜尋" @close="isControlsExpanded = false">
      <div class="search-box">
        <span class="search-icon" aria-hidden="true">🔍</span>
        <input v-model="searchQuery" type="text" placeholder="搜尋術語..." class="search-input" aria-label="搜尋術語" />
      </div>

      <div class="categories-wrapper">
        <div class="categories-header">
          <span>分類選擇</span>
          <button @click="toggleSort" class="sort-btn">
            {{ sortOrder === 'asc' ? '排序 A-Z' : '排序 Z-A' }}
          </button>
        </div>
        <div class="categories-chips">
          <button v-for="cat in categories" :key="cat" @click="selectedCategory = cat; isControlsExpanded = false"
            :class="['cat-chip', { active: selectedCategory === cat }]">
            {{ cat === 'All' ? '全部' : cat }}
          </button>
        </div>
      </div>

      <!-- Mobile Font Adjust -->
      <div class="font-controls-mobile">
        <div class="categories-header"><span>字體大小調整</span></div>
        <div class="btn-group-mobile">
          <button @click="fontScale = 0.9" :class="{ active: fontScale === 0.9 }">小</button>
          <button @click="fontScale = 1.0" :class="{ active: fontScale === 1.0 }">中</button>
          <button @click="fontScale = 1.2" :class="{ active: fontScale === 1.2 }">大</button>
        </div>
      </div>
    </MobileDrawer>
  </div>
</template>

<style scoped>
/* Mobile Floating Button */
.mobile-floating-btn {
  display: none;
  position: fixed;
  bottom: 32px;
  left: 24px;
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 100px;
  font-weight: 700;
  font-size: 15px;
  box-shadow: 0 8px 20px rgba(0, 113, 227, 0.3);
  z-index: 100;
  display: none;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.mobile-floating-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 113, 227, 0.4);
}

.categories-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

/* 術語表獨立比例控制 */
.glossary-app {
  --base-size: calc(16px * var(--app-scale, 1));
  font-size: var(--base-size);
  width: 100%;
}

/* Local Font Controls Styles */
.font-controls {
  margin-top: 32px;
}

.btn-group {
  display: flex;
  gap: 4px;
  background: var(--vp-c-bg-mute);
  padding: 4px;
  border-radius: 12px;
}

.btn-group button {
  flex: 1;
  padding: 8px;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.2s;
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.btn-group button.active {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-brand-1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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

/* Header section refined */
.glossary-header {
  display: none;
}

.hero-title {
  display: none;
}

.subtitle {
  display: none;
}

/* 2-Column Layout */
/* 2-Column Layout Refined */
.app-layout {
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: flex-start;
  /* Critical for sticky to work */
  padding: 40px 24px 100px;
  position: relative;
  max-width: 1600px;
  margin: 0 auto;
  min-height: 100vh;
  transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}

/* 內容區頂部控制列 */
.content-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 32px;
  height: 44px;
}

.view-status-bar {
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 14px;
  color: var(--vp-c-text-3);
  font-weight: 700;
}

.status-label {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 2px 10px;
  border-radius: 6px;
}


.app-content {
  flex: 1;
  min-width: 0;
}

/* Sidebar Elements */
.sidebar-header h2 {
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 20px;
  color: var(--vp-c-text-2);
}

.categories-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 14px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  border: none;
  background: transparent;
}

.cat-item:hover {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
  transform: translateX(4px) scale(1.02);
}

.cat-item.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 600;
  transform: scale(1.02);
}

.cat-count {
  font-size: 11px;
  background: var(--vp-c-bg-alt);
  padding: 2px 8px;
  border-radius: 10px;
  min-width: 28px;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
}

.categories-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
  margin-bottom: 12px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
  letter-spacing: 0.05em;
}

.sort-btn {
  font-size: 12px;
  color: var(--vp-c-brand-1);
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
}

.search-box {
  position: relative;
}

.search-input {
  width: 100%;
  padding: 12px 16px 12px 40px;
  border-radius: 12px;
  font-size: 14px;
  transition: all 0.2s;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
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
}

/* Grid Layout with Transition */
.terms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 400px), 1fr));
  gap: 32px;
}

/* List Transitions */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.list-leave-active {
  position: absolute;
}

/* Card Design */
.term-card {
  background: var(--vp-c-bg-elv, #ffffff);
  border-radius: 24px;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  animation: idle-float 6s ease-in-out infinite;
  animation-delay: calc(var(--delay, 0) * 0.2s);
}

@keyframes idle-float {
  0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
  33% { transform: translate3d(3px, -8px, 0) rotate(0.4deg); }
  66% { transform: translate3d(-2px, -14px, 0) rotate(-0.4deg); }
}

.term-card:hover {
  border-color: var(--vp-c-brand-soft);
  transform: translate3d(0, -18px, 0) scale(1.03);
  box-shadow: 0 45px 90px rgba(0, 0, 0, 0.12);
  z-index: 10;
}

.card-main {
  padding: 32px;
  flex: 1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;
}

.term-title {
  font-size: 22px;
  font-weight: 800;
  margin: 0;
  color: var(--vp-c-text-1);
  line-height: 1.3;
}

.term-definition {
  font-size: 16px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.analogy-wrapper {
  background: var(--vp-c-bg-soft);
  padding: 24px 32px;
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  gap: 16px;
}

.analogy-icon {
  font-size: 20px;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.term-card:hover .analogy-icon {
  animation: silky-float 3s ease-in-out infinite;
}

@keyframes silky-float {
  0%, 100% { transform: translateY(0) scale(1.1); }
  50% { transform: translateY(-6px) scale(1.25); }
}

.analogy-label {
  display: block;
  font-weight: 800;
  font-size: 11px;
  color: var(--vp-c-brand-1);
  text-transform: uppercase;
  margin-bottom: 6px;
  letter-spacing: 0.1em;
}

.analogy-text {
  font-size: 15px;
  line-height: 1.7;
  color: var(--vp-c-text-1);
  margin: 0;
  font-weight: 500;
}

/* Markdown Support Styles */
:deep(.markdown-body) {
  font-size: inherit;
  line-height: inherit;
}

:deep(.markdown-body p) {
  margin-bottom: 12px;
}

:deep(.markdown-body p:last-child) {
  margin-bottom: 0;
}

:deep(.markdown-body ul),
:deep(.markdown-body ol) {
  padding-left: 20px;
  margin-bottom: 16px;
}

:deep(.markdown-body li) {
  margin-bottom: 4px;
}

:deep(.markdown-body strong) {
  color: var(--vp-c-brand-1);
  font-weight: 700;
}

:deep(.markdown-body table) {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  font-size: 0.9em;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

:deep(.markdown-body th) {
  background: var(--vp-c-bg-soft);
  padding: 12px;
  text-align: left;
  font-weight: 700;
  border-bottom: 2px solid var(--vp-c-divider);
}

:deep(.markdown-body td) {
  padding: 10px 12px;
  border-bottom: 1px solid var(--vp-c-divider);
}

:deep(.markdown-body tr:last-child td) {
  border-bottom: none;
}

:deep(.markdown-body tr:nth-child(even)) {
  background: rgba(0, 0, 0, 0.02);
}

.dark :deep(.markdown-body tr:nth-child(even)) {
  background: rgba(255, 255, 255, 0.02);
}

.term-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: flex-end;
}

.badge {
  font-size: 10px;
  padding: 4px 10px;
  border-radius: 8px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Badge Color System */
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

.badge-other {
  background: rgba(142, 142, 147, 0.1);
  color: #8e8e93;
}

.badge-education {
  background: rgba(255, 204, 0, 0.1);
  color: #cca300;
}

.badge-macos {
  background: rgba(175, 82, 222, 0.1);
  color: #af52de;
}

.badge-jamf {
  background: rgba(0, 0, 0, 0.1);
  color: #1d1d1f;
}

.dark .badge-apple,
.dark .badge-jamf {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

/* Responsive */
@media (max-width: 1200px) {
  .app-layout {
    display: block;
  }

  .app-sidebar {
    display: none !important;
  }

  .expand-sidebar-btn {
    display: none !important;
  }

  .mobile-floating-btn {
    display: flex;
  }

  .glossary-app {
    padding: 0 24px 100px;
  }

  .terms-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 640px) {
  .glossary-header {
    padding-top: 40px;
  }

  .terms-grid {
    grid-template-columns: 1fr;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {

  .list-move,
  .list-enter-active,
  .list-leave-active {
    transition: none !important;
  }
}

.cat-chip {
  padding: 8px 16px;
  border-radius: 20px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  font-size: 14px;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}

.cat-chip.active {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}
</style>
