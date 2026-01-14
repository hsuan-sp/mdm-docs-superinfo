<script setup lang="ts">
/**
 * 整合指南專題應用程式 (IntegratedGuideApp)
 * 
 * 本元件是知識庫的核心入口，負責處理大量的 Q&A 資料流、全文檢索以及動態排版。
 * 
 * 核心架構：
 * 1. 非同步資料匯流：透過虛擬模組匯集所有 Markdown 資料，支援分章節與全域顯示。
 * 2. 智慧相關性檢索：不僅是關鍵字匹配，更根據標題、標籤與內文的不同權重計算相關性分數。
 * 3. 內容清洗引擎 (Markdown Sanitizer)：處理由於多行字串縮排或解析器標準差異導致的格式問題。
 * 4. 路由狀態同步：支援 URL Hash 深度連結，使用者可直接進入「裝置註冊」等特定分類。
 */
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useAppFeatures } from '../theme/composables/useAppFeatures';
import { useKeyboardShortcuts } from '../theme/composables/useKeyboardShortcuts';
import * as loaderData from "../../data/all-data.data";
import type { QAItem, QASection, QAModule } from "../../types";
import MarkdownIt from "markdown-it";
import AppSidebar from './AppSidebar.vue';
import MobileDrawer from '../theme/components/MobileDrawer.vue';
import EmptyState from '../theme/components/EmptyState.vue';

/**
 * 資料初始化
 * VitePress Data Loader 在構建時產生的 JSON 樹。
 */
const data: any = loaderData;
const rawData = data.data || data.default || data;
const allQAData: QAModule[] = rawData.allQAData || [];

/**
 * Markdown 渲染執行個體設定
 * 設定為支援 HTML 以呈現複雜的表格，並強制 breaks 換行以符合技術指南的閱讀直覺。
 */
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true
});

/**
 * 統計模組內部的 QA 項目總數
 * 用於側邊欄導航選單中顯示計數指標。
 */
const getChapterCount = (source: string) => {
  const module = allQAData.find(m => m.source === source);
  if (!module) return 0;
  return module.sections.reduce((total: number, section: QASection) => total + section.items.length, 0);
};

// --- 前端介面狀態監控 ---
const searchQuery = ref("");                // 搜尋關鍵字同步
const activeSource = ref<string | "All">("All"); // 當前章節篩選器
const isSidebarOpen = ref(false);           // 行動版導航抽屜狀態
const { fontScale, isSidebarCollapsed, toggleSidebar } = useAppFeatures('mdm-qa');

/**
 * Deep Link 處理中心
 * 監聽 window.location.hash，實現跨頁面跳轉至特定 Q&A 分類的功能。
 */
const handleHashChange = () => {
  const hash = window.location.hash.replace('#', '').toLowerCase();
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

  const targetSource = hashMap[hash] || (allQAData as any[]).find(m => m.source.toLowerCase().includes(hash))?.source;

  if (targetSource) {
    activeSource.value = targetSource;
    searchQuery.value = '';
  } else if (hash === 'all') {
    activeSource.value = 'All';
    searchQuery.value = '';
  }
};

/**
 * 核心權重檢索演算法 (Search Score Algorithm)
 * 
 * 我們不使用簡單的 includes()，而是透過查詢加權實現「最佳結果優先」。
 * 權重分配邏輯：
 * 1. 題目匹配 (Score: 10)：代表完全命中核心問題。
 * 2. 標籤匹配 (Score: 5)：代表具備高度主題相關性。
 * 3. 內文解析 (Score: 1)：代表詳細解答中包含關鍵字。
 * 
 * 只有所有空格分隔的關鍵字皆匹配時，才會列入結果，並依權重降冪排序。
 */
const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return null;
  const queries = searchQuery.value.trim().toLowerCase().split(/\s+/);
  const results: { source: string, items: (QAItem & { relevance: number })[] }[] = [];

  allQAData.forEach(file => {
    const matches: (QAItem & { relevance: number })[] = [];
    file.sections.forEach((s: QASection) => s.items.forEach((i: QAItem) => {
      let relevance = 0;
      const tags = i.tags.join(' ').toLowerCase();

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
        matches.push({ ...i, tags: [...i.tags, file.source], relevance });
      }
    }));

    if (matches.length) {
      matches.sort((a, b) => b.relevance - a.relevance);
      results.push({ source: file.source, items: matches });
    }
  });
  return results;
});

/**
 * 章節內容資料引用
 */
const currentModule = computed(() => {
  if (activeSource.value === 'All') return null;
  return allQAData.find(d => d.source === activeSource.value);
});

// 使用 ID Set 管理手風琴摺疊與展開（支援同時展開多項）
const openItems = ref(new Set<string>());
const toggleItem = (id: string) => {
  const next = new Set(openItems.value);
  next.has(id) ? next.delete(id) : next.add(id);
  openItems.value = next;
};

/**
 * 進階排版最佳化引擎 (Layout Sanitizer)
 * 
 * 解決 TypeScript 多行模板字串帶來的常見問題：
 * 1. 首行空位差：自動計算並切除最小公共縮排空隙。
 * 2. 列表解析失效：在項目符號（如 - 或 1.）前強制補足雙換行。
 */
const renderMarkdown = (text: string) => {
  if (!text) return "";
  const lines = text.split('\n');

  // 自動修復：縮排一致性校正
  const nonEmptyLines = lines.filter(l => l.trim());
  const minIndent = nonEmptyLines.length > 0
    ? nonEmptyLines.reduce((min, line) => {
      const match = line.match(/^\s*/);
      return Math.min(min, match ? match[0].length : min);
    }, Infinity)
    : 0;

  let cleaned = lines.map(line => line.slice(minIndent)).join('\n').trim();

  // Typography：修正 Markdown 標準
  let processed = cleaned
    .replace(/([^\n])\n(\s*[-*+])/g, '$1\n\n$2')
    .replace(/([^\n])\n(\s*\d+\.)/g, '$1\n\n$2');

  return md.render(processed);
};

// 鍵盤快速鍵生命週期管理
useKeyboardShortcuts({
  onSearchFocus: () => {
    const searchInput = document.querySelector('.search-input') as HTMLInputElement;
    searchInput?.focus();
  },
  onEscape: () => {
    if (searchQuery.value) searchQuery.value = '';
    else if (isSidebarOpen.value) isSidebarOpen.value = false;
  }
});

onMounted(() => {
  handleHashChange();
  window.addEventListener('hashchange', handleHashChange);
});

onUnmounted(() => {
  window.removeEventListener('hashchange', handleHashChange);
});

/**
 * 章節跳轉邏輯
 */
const switchModule = (source: string | "All") => {
  activeSource.value = source;
  searchQuery.value = '';
  isSidebarOpen.value = false;
  openItems.value.clear(); // 切換模組時重設顯示狀態，維持頁面清爽
};
</script>

<template>
  <div class="guide-app" :style="{ '--app-scale': fontScale }" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
    <div class="app-layout">

      <!-- 桌機版側邊選單：結構化導覽 -->
      <AppSidebar title="指南導覽" :is-open="!isSidebarCollapsed" class="desktop-only" @toggle="toggleSidebar"
        @update:scale="(val: number) => fontScale = val">
        <template #search>
          <div class="search-section">
            <input v-model="searchQuery" type="text" placeholder="搜尋題目... (按 / 聚焦)" class="search-input" />
          </div>
        </template>

        <template #nav-items>
          <button @click="switchModule('All')"
            :class="['nav-item', { active: activeSource === 'All' && !searchQuery }]">
            <span class="nav-text">顯示所有題目</span>
            <span class="nav-count">{{(allQAData as QAModule[]).reduce((t: number, m: QAModule) => t +
              getChapterCount(m.source),
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
        <!-- 核心頁頭：展示當前搜尋狀態 -->
        <header class="content-header" v-if="searchQuery">
          <h2 class="title-text">搜尋關鍵字：「{{ searchQuery }}」</h2>
        </header>

        <!-- 展示模式一：搜尋結果 (跨章節加權排序) -->
        <div v-if="searchQuery" class="result-container">
          <div v-if="searchResults && searchResults.length > 0">
            <div v-for="group in searchResults" :key="group.source" class="module-group">
              <h3 class="group-label">{{ group.source }}</h3>
              <div v-for="item in group.items" :key="item.id" class="qa-item" :class="{ open: openItems.has(item.id) }">
                <div class="qa-trigger" @click="toggleItem(item.id)">
                  <div class="q-main">
                    <span v-if="item.important" class="imp-tag">重要</span>
                    <span class="q-text">{{ item.question }}</span>
                  </div>
                  <span class="arrow">▼</span>
                </div>
                <!-- 展示清洗後的 Markdown 解答 -->
                <div v-if="openItems.has(item.id)" class="qa-content">
                  <div class="markdown-body" v-html="renderMarkdown(item.answer)"></div>
                  <div class="tags"><span v-for="t in item.tags" :key="t" class="tag">#{{ t }}</span></div>
                </div>
              </div>
            </div>
          </div>
          <EmptyState v-else @clear="searchQuery = ''" action-text="清除搜尋" />
        </div>

        <!-- 展示模式二：章節與全域導覽 -->
        <div v-else class="module-view">
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
          <!-- 循環展示知識章節 -->
          <template v-else>
            <div v-for="module in allQAData" :key="module.source" class="chapter-group">
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

    <!-- 行動版互動入口：全域浮動章節按鈕 -->
    <button class="mobile-menu-btn" @click="isSidebarOpen = true">
      章節導覽選單
    </button>

    <!-- 行動版導覽抽屜 (Responsive Component) -->
    <MobileDrawer :is-open="isSidebarOpen" title="章節導覽" @close="isSidebarOpen = false">
      <div class="mobile-search">
        <input v-model="searchQuery" type="text" placeholder="輸入關鍵字搜尋..." class="search-input" />
      </div>

      <div class="mobile-nav-scroll">
        <div @click="switchModule('All')" class="m-nav-item"
          :class="{ active: activeSource === 'All' && !searchQuery }">
          <span class="nav-text">顯示所有題目</span>
          <span class="nav-count">{{(allQAData as QAModule[]).reduce((t: number, m: QAModule) => t +
            getChapterCount(m.source),
            0)}}</span>
        </div>

        <div v-for="m in allQAData" :key="m.source" @click="switchModule(m.source)" class="m-nav-item"
          :class="{ active: activeSource === m.source && !searchQuery }">
          <span class="nav-text">{{ m.source }}</span>
          <span class="nav-count">{{ getChapterCount(m.source) }}</span>
        </div>
      </div>
    </MobileDrawer>
  </div>
</template>

<style scoped>
/* 
 * 核心視覺排版體系
 * 採用 Apple 風格的文字比例 (System Font Stack) 與深度投影設計。
 */
.guide-app {
  --base-size: calc(16px * var(--app-scale));
  font-size: var(--base-size);
  width: 100%;
}

.app-layout {
  display: flex;
  gap: 48px;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 24px;
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
}

/* QA 摺疊單元：包含流體動力學懸浮效果 */
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
}

/* Markdown 高階排版樣式修正 */
:deep(.markdown-body strong) {
  color: var(--vp-c-brand-1);
  font-weight: 800;
}

:deep(.markdown-body table) {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: 24px 0;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
}

/* 行動版按鈕：懸浮於介面上層 */
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
  .app-layout {
    display: block;
    padding-top: 10px;
  }

  .mobile-menu-btn {
    display: block;
  }
}

.m-nav-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px;
  border-radius: 16px;
  margin-bottom: 8px;
  background: rgba(0, 0, 0, 0.03);
  cursor: pointer;
}

.m-nav-item.active {
  background: var(--vp-c-brand-1);
  color: white;
  font-weight: 700;
}
</style>
