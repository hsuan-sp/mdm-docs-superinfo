<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch, onUnmounted } from "vue";
import { useRoute } from "vitepress";
import { useAppFeatures } from '../theme/composables/useAppFeatures';
import { allQAData } from "../../data/all-data";
import type { QAItem } from "../../types";
import MarkdownIt from "markdown-it";
import AppSidebar from './AppSidebar.vue';

const route = useRoute();

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true // 確保單次換行也會生效
});

// Helper to count items per chapter
const getChapterCount = (source: string) => {
  const module = allQAData.find(m => m.source === source);
  if (!module) return 0;
  return module.sections.reduce((total, section) => total + section.items.length, 0);
};

// State
const searchQuery = ref("");
const activeSource = ref<string | "All">("All");
const isSidebarOpen = ref(false);
// const fontScale = ref(1); // Replaced by composable
// const isSidebarCollapsed = ref(false); // Replaced by composable
const { fontScale, isSidebarCollapsed, toggleSidebar } = useAppFeatures('mdm-qa');

const handleHashChange = () => {
  const hash = window.location.hash.replace('#', '').toLowerCase();
  // 建立映射表以支援英文 Hash
  const hashMap: Record<string, string> = {
    'account': '帳號與伺服器',
    'enrollment': '裝置註冊',
    'apps': 'App 管理',
    'classroom': '課堂管理',
    'digital': '數位精進',
    'hardware': '硬體排除',
    'mac': 'Mac 管理',
    'education': '教育實戰'
  };

  const targetSource = hashMap[hash] || allQAData.find(m => m.source.toLowerCase().includes(hash))?.source;

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
  const query = searchQuery.value.trim().toLowerCase();
  const results: { source: string, items: QAItem[] }[] = [];
  allQAData.forEach(file => {
    const matches: QAItem[] = [];
    file.sections.forEach(s => s.items.forEach(i => {
      if ((i.question + i.answer).toLowerCase().includes(query)) matches.push({ ...i, tags: [...i.tags, file.source] });
    }));
    if (matches.length) results.push({ source: file.source, items: matches });
  });
  return results;
});

const currentModule = computed(() => {
  if (activeSource.value === 'All') return null;
  return allQAData.find(d => d.source === activeSource.value);
});

// For "All" mode
const allQuestions = computed(() => {
  if (activeSource.value !== 'All') return null;
  return allQAData;
});
const openItems = ref(new Set<string>());

const toggleItem = (id: string) => {
  const next = new Set(openItems.value);
  next.has(id) ? next.delete(id) : next.add(id);
  openItems.value = next;
};

const renderMarkdown = (text: string) => {
  if (!text) return "";
  const lines = text.split('\n');
  const minIndent = lines.filter(l => l.trim()).reduce((min, line) => {
    const match = line.match(/^\s*/);
    return Math.min(min, match ? match[0].length : min);
  }, Infinity);

  // 保持原始結構，僅處理縮排
  let cleaned = lines.map(line => line.slice(minIndent)).join('\n').trim();

  // 優化排版：僅針對 Markdown 解析必須的「列表前置空行」做補強
  // 這樣您在內文中「有沒有空行」就會直接反映在畫面上
  let processed = cleaned
    .replace(/([^\n])\n(\s*[-*+])/g, '$1\n\n$2')
    .replace(/([^\n])\n(\s*\d+\.)/g, '$1\n\n$2');

  return md.render(processed);
};




onMounted(() => {
  handleHashChange();
  window.addEventListener('hashchange', handleHashChange);
  // Body class added by useAppFeatures
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
      <!-- Left Sidebar: Filters & Search (Desktop > 1200px) -->
      <AppSidebar title="指南導覽" :is-open="!isSidebarCollapsed" class="desktop-only" @toggle="toggleSidebar"
        @update:scale="val => fontScale = val">
        <template #search>
          <div class="search-section">
            <input v-model="searchQuery" type="text" placeholder="搜尋..." class="search-input" />
          </div>
        </template>

        <template #nav-items>
          <button @click="switchModule('All')"
            :class="['nav-item', { active: activeSource === 'All' && !searchQuery }]">
            <span class="nav-text">全部題目</span>
            <span class="nav-count">{{allQAData.reduce((t, m) => t + getChapterCount(m.source), 0)}}</span>
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
        <!-- 頂部標題與切換鈕行 -->
        <!-- 頂部標題與切換鈕行 (僅搜尋時顯示) -->
        <header class="content-header" v-if="searchQuery">
          <h2 class="title-text">搜尋結果：{{ searchQuery }}</h2>
        </header>

        <!-- 搜尋模式 -->
        <div v-if="searchQuery" class="result-container">
          <div v-for="group in searchResults" :key="group.source" class="module-group">
            <h3 class="group-label">{{ group.source }}</h3>
            <div v-for="item in group.items" :key="item.id" class="qa-item" :class="{ open: openItems.has(item.id) }">
              <div class="qa-trigger" @click="toggleItem(item.id)">
                <span v-if="item.important" class="imp-tag">重要</span>
                <span class="q-text">{{ item.question }}</span>
                <span class="arrow">▼</span>
              </div>
              <div v-if="openItems.has(item.id)" class="qa-content">
                <div class="markdown-body" v-html="renderMarkdown(item.answer)"></div>
                <div class="tags"><span v-for="t in item.tags" :key="t" class="tag">#{{ t }}</span></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 模組瀏覽模式 -->
        <div v-else class="module-view">
          <!-- 章節內容 -->
          <template v-if="activeSource !== 'All'">
            <div v-for="section in currentModule?.sections" :key="section.title" class="section-block">
              <h3 class="section-label">{{ section.title }}</h3>
              <div v-for="item in section.items" :key="item.id" class="qa-item"
                :class="{ open: openItems.has(item.id) }">
                <div class="qa-trigger" @click="toggleItem(item.id)">
                  <div class="q-main">
                    <span v-if="item.important" class="imp-tag">重要</span>
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
          </template>

          <!-- 全部題目模式 -->
          <template v-else>
            <div v-for="module in allQuestions" :key="module.source" class="chapter-group">
              <h2 class="chapter-title">{{ module.source }}</h2>
              <div v-for="section in module.sections" :key="section.title" class="section-block">
                <h3 class="section-label">{{ section.title }}</h3>
                <div v-for="item in section.items" :key="item.id" class="qa-item"
                  :class="{ open: openItems.has(item.id) }">
                  <div class="qa-trigger" @click="toggleItem(item.id)">
                    <div class="q-main">
                      <span v-if="item.important" class="imp-tag">重要</span>
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
          </template>
        </div>
      </main>
    </div>

    <!-- 行動版選單 -->
    <button class="mobile-menu-btn" @click="isSidebarOpen = !isSidebarOpen">
      {{ isSidebarOpen ? '關閉' : '章節選單' }}
    </button>
    <div v-if="isSidebarOpen" class="mobile-nav-overlay" @click="isSidebarOpen = false">
      <div class="mobile-nav-content" @click.stop>
        <div class="mobile-search"><input v-model="searchQuery" type="text" placeholder="搜尋..." /></div>
        <div v-for="m in allQAData" :key="m.source" @click="switchModule(m.source)" class="m-nav-item"
          :class="{ active: activeSource === m.source }">
          <span class="nav-text">{{ m.source }}</span>
          <span class="nav-count">{{ getChapterCount(m.source) }}</span>
        </div>
      </div>
    </div>
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
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  margin-bottom: 16px;
  overflow: hidden;
  background: var(--vp-c-bg-alt);
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}

.qa-item:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.06);
}

.qa-item.open {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.qa-trigger {
  padding: 20px 24px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
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
  padding: 0 24px 32px;
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
  padding: 12px 24px;
  border-left: 4px solid var(--vp-c-brand-1);
  background: var(--vp-c-bg-alt);
  border-radius: 8px;
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
  right: 24px;
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

.mobile-nav-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 99;
  backdrop-filter: blur(4px);
}

.mobile-nav-content {
  width: 80%;
  max-width: 300px;
  height: 100%;
  background: var(--vp-c-bg);
  padding: 40px 20px;
}

.mobile-search input {
  width: 100%;
  padding: 12px;
  margin-bottom: 30px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.m-nav-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.m-nav-item.active {
  color: var(--vp-c-brand-1);
  font-weight: 700;
  background: var(--vp-c-brand-soft);
}

.m-nav-item .nav-count {
  font-size: 12px;
}
</style>
