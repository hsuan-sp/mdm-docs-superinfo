<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from "vue";
import { useRoute, useRouter } from "vitepress";
import { allQAData } from "../../data/all-data";
import type { QAItem, QASection } from "../types";
import MarkdownIt from "markdown-it";

const route = useRoute();
const router = useRouter();

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true // 允許單換行轉為 <br>
});

// State
const searchQuery = ref("");
const activeSource = ref(allQAData[0].source);
const isSidebarOpen = ref(false);
const fontSize = ref<'small' | 'medium' | 'large'>('medium');

// Font size mapping
const fontSizeMap = {
  small: { base: '14px', markdown: '15px', line: '1.6' },
  medium: { base: '16px', markdown: '17.5px', line: '1.8' },
  large: { base: '18px', markdown: '20px', line: '2.0' }
};

const handleHashChange = () => {
  const hash = window.location.hash.replace('#', '').toLowerCase();
  if (hash) {
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
    const targetSource = hashMap[hash];
    if (targetSource) {
      activeSource.value = targetSource;
      searchQuery.value = '';
    }
  }
};

const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return null;
  const query = searchQuery.value.trim().toLowerCase();
  const terms = query.split(/\s+/).filter(t => t.length > 0);
  const results: { source: string, items: QAItem[] }[] = [];
  allQAData.forEach(file => {
    const fileMatches: QAItem[] = [];
    file.sections.forEach(section => {
      section.items.forEach(item => {
        const textToSearch = (item.question + item.answer + item.tags.join(" ")).toLowerCase();
        if (terms.every(t => textToSearch.includes(t))) {
            fileMatches.push({ ...item, tags: [...item.tags, file.source] });
        }
      });
    });
    if (fileMatches.length > 0) results.push({ source: file.source, items: fileMatches });
  });
  return results;
});

const currentModule = computed(() => allQAData.find(d => d.source === activeSource.value));
const openItems = ref(new Set<string>());

const toggleItem = (id: string) => {
  const next = new Set(openItems.value);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  openItems.value = next;
};

// 重點：修復 Markdown 解析器
const renderMarkdown = (text: string | undefined | null) => {
  if (!text) return "";
  
  // 1. 去除首尾空白
  let cleaned = text.trim();
  
  // 2. 處理列表與段落：解決文字擠在一起的問題
  // 核心邏輯：在每個段落/列表項之間插入雙換行，確保 Markdown 渲染器能識別出獨立區塊
  let processed = cleaned
    .split('\n')
    .map(line => line.trim())
    .join('\n')
    .replace(/^(\*\*.+\*\*[:：])\s*/gm, '$1\n\n') // 粗體標題後強制空行
    .replace(/^([*•\-]\s+.+?)(?=\n[*•\-])/gm, '$1\n\n') // 列表項後空行
    .replace(/^(\d+\.\s+.+?)(?=\n\d+\.)/gm, '$1\n\n'); // 數字列表後空行

  try {
    return md.render(processed);
  } catch (e) {
    return text;
  }
};

onMounted(() => {
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '100px' });

    watch([activeSource, searchQuery, searchResults], async () => {
        await nextTick();
        document.querySelectorAll('.qa-card').forEach(el => observer.observe(el));
        if (!searchQuery.value && typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
    }, { immediate: true });
});

const switchModule = (source: string) => {
  activeSource.value = source;
  searchQuery.value = '';
  isSidebarOpen.value = false;
  openItems.value.clear();
};
</script>

<template>
  <div class="guide-app" :style="{ 
    '--content-font-size': fontSizeMap[fontSize].markdown,
    '--content-line-height': fontSizeMap[fontSize].line
  }">
    <header class="page-header">
        <h1>MDM 實戰指南</h1>
        <p>完整收錄 8 大管理模組，超過 100+ 實務常見問答。</p>
    </header>

    <div class="app-layout">
      <!-- 桌面側邊欄 -->
      <aside class="app-sidebar">
        <!-- 字體控制按鈕移到側邊欄最顯眼處 -->
        <div class="sidebar-section">
            <h3 class="control-label">顯示設定</h3>
            <div class="font-size-controls">
              <button 
                v-for="(config, key) in fontSizeMap" 
                :key="key"
                @click="fontSize = key" 
                :class="['font-btn', { active: fontSize === key }]"
              >
                {{ key === 'small' ? '小' : key === 'medium' ? '中' : '大' }}
              </button>
            </div>
        </div>

        <div class="sidebar-section">
            <div class="search-box">
                <span class="search-icon">🔍</span>
                <input v-model="searchQuery" type="text" placeholder="搜尋全站指南..." class="search-input" />
                <button v-if="searchQuery" @click="searchQuery = ''" class="clear-btn">✕</button>
            </div>
        </div>

        <nav class="sidebar-section nav-menu">
            <h3>模組章節</h3>
            <button 
                v-for="module in allQAData" 
                :key="module.source"
                @click="switchModule(module.source)"
                :class="['nav-item', { active: activeSource === module.source && !searchQuery }]"
            >
                <span class="nav-icon">📄</span>
                <span class="nav-text">{{ module.source }}</span>
            </button>
        </nav>
      </aside>

      <!-- 主內容 -->
      <main class="app-content">
        <!-- 搜尋結果 -->
        <div v-if="searchQuery" class="result-container">
            <h2 class="section-title">搜尋：{{ searchQuery }}</h2>
            <div v-if="searchResults && searchResults.length">
                <section v-for="group in searchResults" :key="group.source" class="module-group">
                    <h3 class="group-title">{{ group.source }}</h3>
                    <div class="cards-stack">
                        <article 
                          v-for="qaItem in group.items" :key="qaItem.id" 
                          class="qa-card" :class="{ 'is-open': openItems.has(qaItem.id) }"
                        >
                            <div class="card-header" @click="toggleItem(qaItem.id)">
                                <div class="header-main">
                                  <span v-if="qaItem.important" class="badge-important">⭐ 重要</span>
                                  <h3>{{ qaItem.question }}</h3>
                                </div>
                                <span class="chevron">▼</span>
                            </div>
                            <div class="card-body-wrapper" :style="{ maxHeight: openItems.has(qaItem.id) ? '3000px' : '0px' }">
                              <div class="card-body">
                                <div class="markdown-body" v-html="renderMarkdown(qaItem.answer)"></div>
                                <div class="tags" v-if="qaItem.tags?.length">
                                    <span v-for="tag in qaItem.tags" :key="tag" class="tag">{{ tag }}</span>
                                </div>
                              </div>
                            </div>
                        </article>
                    </div>
                </section>
            </div>
            <div v-else class="empty-state">
                <div class="empty-icon">🤔</div>
                <p>找不到內容</p>
            </div>
        </div>

        <!-- 模組內容 -->
        <div v-else class="module-container">
            <h2 class="module-title">{{ currentModule?.source }}</h2>
            <section v-for="section in currentModule?.sections" :key="section.title" class="qa-section">
                <h3 class="section-subtitle">{{ section.title }}</h3>
                <div class="cards-stack">
                    <article v-for="qaItem in section.items" :key="qaItem.id" class="qa-card" :class="{ 'is-open': openItems.has(qaItem.id) }">
                        <div class="card-header" @click="toggleItem(qaItem.id)">
                            <div class="header-main">
                              <span v-if="qaItem.important" class="badge-important">⭐ 重要</span>
                              <h3>{{ qaItem.question }}</h3>
                            </div>
                            <span class="chevron">▼</span>
                        </div>
                        <div class="card-body-wrapper" :style="{ maxHeight: openItems.has(qaItem.id) ? '3000px' : '0px' }">
                          <div class="card-body">
                            <div class="markdown-body" v-html="renderMarkdown(qaItem.answer)"></div>
                            <div class="tags" v-if="qaItem.tags?.length">
                                <span v-for="tag in qaItem.tags" :key="tag" class="tag">{{ tag }}</span>
                            </div>
                          </div>
                        </div>
                    </article>
                </div>
            </section>
        </div>
      </main>
    </div>

    <!-- 行動版 FAB -->
    <button class="mobile-fab" @click="isSidebarOpen = true" v-show="!isSidebarOpen">
      <span>🔍 章節</span>
    </button>

    <!-- 行動版抽屜 -->
    <div class="mobile-drawer-overlay" :class="{ open: isSidebarOpen }" @click="isSidebarOpen = false">
      <aside class="mobile-drawer" @click.stop>
        <div class="drawer-header">
          <h3>導覽選單</h3>
          <button @click="isSidebarOpen = false">✕</button>
        </div>
        <div class="drawer-content">
            <!-- 顯示設定在行動版優先 -->
            <div class="sidebar-section">
                <h4 style="margin-bottom: 8px">字體大小</h4>
                <div class="font-size-controls">
                  <button v-for="(config, key) in fontSizeMap" :key="key" @click="fontSize = key" :class="['font-btn', { active: fontSize === key }]">
                    {{ key === 'small' ? '小' : key === 'medium' ? '中' : '大' }}
                  </button>
                </div>
            </div>
            <div class="search-box mobile-search">
                <input v-model="searchQuery" type="text" placeholder="搜尋內容..." class="search-input" />
            </div>
            <nav class="nav-menu mobile-menu">
                <button v-for="module in allQAData" :key="module.source" @click="switchModule(module.source)" :class="['nav-item', { active: activeSource === module.source }]">
                    <span class="nav-text">{{ module.source }}</span>
                </button>
            </nav>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.guide-app {
    max-width: 1300px;
    margin: 0 auto;
    padding: 40px 20px;
}

.page-header {
    text-align: center;
    margin-bottom: 50px;
}

.page-header h1 {
    font-size: 42px;
    font-weight: 800;
    margin-bottom: 12px;
    background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.app-layout {
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 40px;
}

@media (max-width: 960px) {
    .app-layout { grid-template-columns: 1fr; }
    .app-sidebar { display: none; }
}

.app-sidebar {
    position: sticky;
    top: 100px;
    height: fit-content;
}

.sidebar-section {
    background: var(--vp-c-bg-soft);
    padding: 20px;
    border-radius: 16px;
    margin-bottom: 24px;
    border: 1px solid var(--vp-c-divider);
    box-shadow: 0 2px 8px rgba(0,0,0,0.02);
}

.control-label {
    font-size: 13px;
    color: var(--vp-c-text-2);
    margin-bottom: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.font-size-controls {
    display: flex;
    gap: 6px;
    background: var(--vp-c-bg-mute);
    padding: 4px;
    border-radius: 10px;
}

.font-btn {
    flex: 1;
    height: 32px;
    border: none;
    background: transparent;
    color: var(--vp-c-text-2);
    border-radius: 6px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.font-btn:hover { color: var(--vp-c-brand-1); }
.font-btn.active {
    background: var(--vp-c-bg-alt);
    color: var(--vp-c-brand-1);
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.search-input {
    width: 100%;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid var(--vp-c-divider);
    background: var(--vp-c-bg);
    margin-top: 8px;
}

.nav-item {
    width: 100%;
    text-align: left;
    padding: 10px 12px;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: 8px;
    color: var(--vp-c-text-2);
}

.nav-item.active {
    background: var(--vp-c-brand-soft);
    color: var(--vp-c-brand-1);
    font-weight: 700;
}

.qa-card {
    background: var(--vp-c-bg-alt);
    border: 1px solid var(--vp-c-divider);
    border-radius: 16px;
    margin-bottom: 12px;
    overflow: hidden;
}

.card-header {
    padding: 24px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-header h3 { font-size: 19px; margin: 0; }

.badge-important {
    font-size: 11px;
    background: #ff3b30;
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    margin-bottom: 8px;
    display: inline-block;
}

.markdown-body {
    font-size: var(--content-font-size);
    line-height: var(--content-line-height);
    padding: 0 24px 24px;
    color: var(--vp-c-text-1);
}

/* 修復段落與列表間距 */
.markdown-body :deep(p) {
    margin-top: 0;
    margin-bottom: 1.2em; /* 確保段落間有呼吸空間 */
}

.markdown-body :deep(p:last-child) {
    margin-bottom: 0;
}

.markdown-body :deep(ul), 
.markdown-body :deep(ol) {
    margin-top: 0;
    margin-bottom: 1.2em;
    padding-left: 1.5em; /* 確保清單縮排 */
}

.markdown-body :deep(li) {
    margin-bottom: 0.6em; /* 列表項之間稍微拉開 */
    list-style-position: outside;
}

.markdown-body :deep(ul) li {
    list-style-type: disc; /* 恢復圓點 */
}

.markdown-body :deep(ol) li {
    list-style-type: decimal; /* 恢復數字 */
}

.markdown-body :deep(strong) {
    font-weight: 800;
    color: var(--vp-c-brand-1); /* 重點文字彩色化 */
}

.tags { display: flex; gap: 8px; margin: 16px 24px 24px; }
.tag { font-size: 12px; background: var(--vp-c-bg-mute); padding: 2px 8px; border-radius: 4px; }

.mobile-fab {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: var(--vp-c-brand-1);
    color: white;
    padding: 12px 24px;
    border-radius: 30px;
    border: none;
    font-weight: 700;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.mobile-drawer-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    z-index: 1000;
    display: none;
}
.mobile-drawer-overlay.open { display: block; }

.mobile-drawer {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 280px;
    background: var(--vp-c-bg);
    padding: 24px;
}
</style>
