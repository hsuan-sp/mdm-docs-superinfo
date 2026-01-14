<script setup lang="ts">
/**
 * 術語表應用元件 (GlossaryApp)
 * 
 * 提供術語搜尋、分類篩選、排序、字體調節及動畫效果。
 * 使用非同步資料載入，並透過 MarkdownIt 進行內容渲染。
 */
import { ref, computed, onMounted, nextTick } from "vue";
import * as loaderData from "../../data/all-data.data";
import type { Term } from "../../types";
const data: any = loaderData;
const rawData = data.data || data.default || data;
const glossaryData: Term[] = rawData.glossaryData || [];

import { useLayoutMode } from '../theme/composables/useLayoutMode';
import { useAppFeatures } from '../theme/composables/useAppFeatures';
import { useKeyboardShortcuts } from '../theme/composables/useKeyboardShortcuts';
import AppSidebar from './AppSidebar.vue';
import MobileDrawer from '../theme/components/MobileDrawer.vue';
import EmptyState from '../theme/components/EmptyState.vue';
import MarkdownIt from "markdown-it";

/**
 * Markdown 渲染執行個體設定
 */
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true
});

/**
 * 內容預處理：最佳化 Markdown 列表顯示
 */
const renderMarkdown = (text: string) => {
  if (!text) return "";
  const processed = text
    .replace(/([^\n])\n(\s*[-*+])/g, '$1\n\n$2')
    .replace(/([^\n])\n(\s*\d+\.)/g, '$1\n\n$2');
  return md.render(processed);
};

// 狀態與 Hooks 初始化
const { isMobileView } = useLayoutMode();
const { fontScale, isSidebarCollapsed, toggleSidebar } = useAppFeatures('mdm-glossary');
type CategoryType = "Core" | "Enrollment" | "Apple" | "Security" | "Network" | "Hardware" | "Apps" | "Other" | "Education" | "macOS" | "Jamf";

const searchQuery = ref("");
const selectedCategory = ref<CategoryType | "All">("All");
const sortOrder = ref<'asc' | 'desc'>('asc');
const isControlsExpanded = ref(false);

const categories = [
  "All", "Core", "Enrollment", "Apple", "Security", "Network", "Hardware", "Apps", "Other", "Education", "macOS", "Jamf",
] as const;

/**
 * 智慧篩選邏輯：結合搜尋關鍵字與分類
 */
const filteredTerms = computed(() => {
  let filtered = glossaryData.filter((item) => {
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

  // 執行字典序最佳化排序
  return filtered.sort((a, b) => {
    const termA = a.term.replace(/\s*\([^)]*\)/g, '').toUpperCase();
    const termB = b.term.replace(/\s*\([^)]*\)/g, '').toUpperCase();

    if (sortOrder.value === 'asc') {
      return termA.localeCompare(termB);
    } else {
      return termB.localeCompare(termA);
    }
  });
});

const getCategoryColor = (cat: string) => `badge-${cat.toLowerCase()}`;
const toggleSort = () => { sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'; };

// 註冊鍵盤快捷鍵
useKeyboardShortcuts({
  onSearchFocus: () => {
    const searchInput = document.querySelector('.search-input') as HTMLInputElement;
    searchInput?.focus();
  },
  onEscape: () => {
    if (searchQuery.value) searchQuery.value = '';
    else if (isControlsExpanded.value) isControlsExpanded.value = false;
  }
});

onMounted(async () => {
  await nextTick();

  /**
   * 位置感應交錯動畫
   */
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

const getCategoryCount = (cat: string) => {
  if (cat === 'All') return glossaryData.length;
  return glossaryData.filter(item =>
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
      <!-- 桌面端側邊導覽：分類與搜尋 -->
      <AppSidebar title="術語庫分類" :is-open="!isSidebarCollapsed" class="desktop-only" @toggle="toggleSidebar"
        @update:scale="(val: number) => fontScale = val">
        <template #search>
          <div class="search-box">
            <span class="search-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
              <span class="cat-count" v-if="getCategoryCount(cat as string) > 0">{{ getCategoryCount(cat as string)
                }}</span>
            </button>
          </div>
        </template>
      </AppSidebar>

      <main class="app-content">
        <!-- 內容狀態列 -->
        <header class="content-header">
          <div class="view-status-bar">
            <span class="status-label">{{ selectedCategory === 'All' ? '所有分類' : selectedCategory }}</span>
            <span class="status-count">共 {{ filteredTerms.length }} 個術語</span>
          </div>
        </header>

        <TransitionGroup name="list" tag="div" class="terms-grid">
          <article v-for="(item, index) in filteredTerms" :key="item.term" class="term-card"
            :style="{ '--delay': index % 10 }">
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

        <EmptyState v-if="filteredTerms.length === 0" icon="🧐" :description="`沒有找到符合「${searchQuery}」的術語`"
          action-text="清除搜尋條件" @clear="clearSearch" />
      </main>
    </div>

    <!-- 行動版浮動篩選按鈕 -->
    <button class="mobile-floating-btn" @click="isControlsExpanded = true" v-if="!isControlsExpanded">
      <span class="icon" aria-hidden="true">🔍</span>
      <span class="label">篩選與搜尋</span>
    </button>

    <MobileDrawer :is-open="isControlsExpanded" title="篩選與搜尋" @close="isControlsExpanded = false">
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input v-model="searchQuery" type="text" placeholder="搜尋術語..." class="search-input" />
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
/* 
 * 視覺與過渡效果
 * Card Animations 
 */
.term-card {
  transition: all 0.3s ease;
}

.term-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.card-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
