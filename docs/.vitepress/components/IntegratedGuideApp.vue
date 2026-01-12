<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from "vue";
import { useRoute } from "vitepress";
import { allQAData } from "../../data/all-data";
import type { QAItem } from "../../types";
import MarkdownIt from "markdown-it";

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
const activeSource = ref(allQAData[0].source);
const isSidebarOpen = ref(false);
const fontScale = ref(1); // 使用比例來控制全域大小
const isSidebarCollapsed = ref(false); // 側邊欄是否收合

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
    }
};

const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return null;
  const query = searchQuery.value.trim().toLowerCase();
  const results: { source: string, items: QAItem[] }[] = [];
  allQAData.forEach(file => {
    const matches: QAItem[] = [];
    file.sections.forEach(s => s.items.forEach(i => {
      if ((i.question + i.answer).toLowerCase().includes(query)) matches.push({...i, tags: [...i.tags, file.source]});
    }));
    if (matches.length) results.push({ source: file.source, items: matches });
  });
  return results;
});

const currentModule = computed(() => allQAData.find(d => d.source === activeSource.value));
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
});

const switchModule = (source: string) => {
  activeSource.value = source;
  searchQuery.value = '';
  isSidebarOpen.value = false;
  openItems.value.clear();
};

// Persistence
watch(fontScale, (val) => {
  localStorage.setItem('mdm-qa-font-scale', val.toString());
});

onMounted(() => {
  const savedScale = localStorage.getItem('mdm-qa-font-scale');
  if (savedScale) fontScale.value = parseFloat(savedScale);

  const savedCollapsed = localStorage.getItem('mdm-qa-sidebar-collapsed');
  if (savedCollapsed) isSidebarCollapsed.value = savedCollapsed === 'true';
});

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
  localStorage.setItem('mdm-qa-sidebar-collapsed', isSidebarCollapsed.value.toString());
};
</script>

<template>
  <div class="guide-app" :style="{ '--app-scale': fontScale }" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
    <div class="app-layout">
      <!-- Left Sidebar: Filters & Search (Desktop > 1200px) -->
      <aside class="app-sidebar">
        <div class="sidebar-top">
            <div class="sidebar-ctrls">
                <button class="sidebar-toggle-btn" @click="toggleSidebar" title="收合側邊欄">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
                </button>
                <div class="search-section">
                    <input v-model="searchQuery" type="text" placeholder="搜尋..." class="search-input" />
                </div>
            </div>
            <nav class="nav-menu">
                <button 
                    v-for="module in allQAData" :key="module.source"
                    @click="switchModule(module.source)"
                    :class="['nav-item', { active: activeSource === module.source && !searchQuery }]"
                >
                    <span class="nav-text">{{ module.source }}</span>
                    <span class="nav-count">{{ getChapterCount(module.source) }}</span>
                </button>
            </nav>
        </div>

        <div class="sidebar-bottom">
            <div class="font-controls">
                <span class="ctrl-label">字體大小調整</span>
                <div class="btn-group">
                    <button @click="fontScale = 0.9" :class="{active: fontScale === 0.9}">小</button>
                    <button @click="fontScale = 1.0" :class="{active: fontScale === 1.0}">中</button>
                    <button @click="fontScale = 1.2" :class="{active: fontScale === 1.2}">大</button>
                </div>
            </div>
        </div>
      </aside>

      <main class="app-content">
        <!-- 頂部標題與切換鈕行 -->
        <header class="content-header">
            <button v-if="isSidebarCollapsed" class="expand-toggle-btn" @click="toggleSidebar" title="展開側邊欄">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line><path d="M12 9l3 3-3 3"></path></svg>
            </button>
            <h2 class="title-text">{{ searchQuery ? '搜尋結果：' + searchQuery : currentModule?.source }}</h2>
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
            <div v-for="section in currentModule?.sections" :key="section.title" class="section-block">
                <h3 class="section-label">{{ section.title }}</h3>
                <div v-for="item in section.items" :key="item.id" class="qa-item" :class="{ open: openItems.has(item.id) }">
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
      </main>
    </div>

    <!-- 行動版選單 -->
    <button class="mobile-menu-btn" @click="isSidebarOpen = !isSidebarOpen">
      {{ isSidebarOpen ? '關閉' : '章節選單' }}
    </button>
    <div v-if="isSidebarOpen" class="mobile-nav-overlay" @click="isSidebarOpen = false">
      <div class="mobile-nav-content" @click.stop>
        <div class="mobile-search"><input v-model="searchQuery" type="text" placeholder="搜尋..." /></div>
        <div v-for="m in allQAData" :key="m.source" @click="switchModule(m.source)" class="m-nav-item" :class="{active: activeSource === m.source}">
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
    justify-content: center; /* 確保內容相對於容器中心展開 */
    align-items: start;
    padding: 40px 24px;
    position: relative;
    max-width: 1400px;
    margin: 0 auto;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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

/* 展開切換鈕 */
.expand-toggle-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 12px;
    border: 1px solid var(--vp-c-divider);
    background: var(--vp-c-bg-alt);
    color: var(--vp-c-brand-1);
    cursor: pointer;
    transition: all 0.2s;
    flex-shrink: 0;
}

.expand-toggle-btn:hover {
    background: var(--vp-c-bg-mute);
    transform: scale(1.05);
}

@media (max-width: 900px) { 
    .app-layout { display: block; padding-top: 10px; } 
    .app-sidebar { display: none !important; } 
    .content-header { gap: 10px; margin-bottom: 20px; }
    .title-text { font-size: 1.8em; }
}

/* 側邊欄視覺與固定邏輯 */
.app-sidebar { 
    position: sticky; 
    top: 100px; 
    width: 280px;
    height: calc(100vh - 140px); 
    display: flex; 
    flex-direction: column;
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
                opacity 0.3s,
                margin 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
}

.guide-app.sidebar-collapsed .app-sidebar {
    width: 0;
    margin-right: -48px; /* 抵消 gap 確保真正居中 */
    opacity: 0;
    pointer-events: none;
}

.sidebar-ctrls {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
}

.sidebar-toggle-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    border: none;
    background: var(--vp-c-bg-mute);
    color: var(--vp-c-text-2);
    cursor: pointer;
    transition: all 0.2s;
    flex-shrink: 0;
}

.sidebar-toggle-btn:hover {
    background: var(--vp-c-brand-soft);
    color: var(--vp-c-brand-1);
}

.sidebar-top { flex: 1; display: flex; flex-direction: column; min-height: 0; }
.nav-menu { flex: 1; overflow-y: auto; margin-top: 8px; padding-right: 8px; }

/* 滾動條樣式 */
.nav-menu::-webkit-scrollbar { width: 4px; }
.nav-menu::-webkit-scrollbar-thumb { background: var(--vp-c-divider); border-radius: 4px; }

.sidebar-bottom { 
    padding-top: 24px; 
    margin-top: 8px;
    border-top: 1px solid var(--vp-c-divider); 
}

.search-input { 
    width: 100%; 
    padding: 10px 16px; 
    border-radius: 10px; 
    border: 1px solid var(--vp-c-divider); 
    background: var(--vp-c-bg-soft); 
    font-size: 0.9em;
    color: var(--vp-c-text-1);
    transition: border-color 0.2s;
}
.search-input:focus { border-color: var(--vp-c-brand-1); outline: none; }

.nav-item { 
    display: flex; justify-content: space-between; align-items: center;
    width: 100%; text-align: left; padding: 10px 14px; border: none; 
    background: transparent; cursor: pointer; border-radius: 10px; margin-bottom: 4px;
    font-size: 0.9em; color: var(--vp-c-text-2); transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.nav-item:hover { background: var(--vp-c-bg-mute); color: var(--vp-c-text-1); transform: translateX(4px); }
.nav-item.active { background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1); font-weight: 700; }

.nav-text { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-right: 10px; }
.nav-count { font-size: 11px; background: var(--vp-c-bg-alt); padding: 2px 8px; border-radius: 10px; border: 1px solid var(--vp-c-divider); transition: all 0.2s; }

.nav-item.active .nav-count { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }

/* 側邊欄字體控制 */
.font-controls { display: flex; flex-direction: column; gap: 8px; }
.ctrl-label { font-size: 0.75em; color: var(--vp-c-text-3); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
.btn-group { display: flex; gap: 2px; background: var(--vp-c-bg-soft); padding: 3px; border-radius: 8px; border: 1px solid var(--vp-c-divider); }
.btn-group button { 
    flex: 1; padding: 6px; border: none; background: transparent; border-radius: 6px; 
    cursor: pointer; font-size: 0.85em; transition: 0.2s; color: var(--vp-c-text-2); font-weight: 600;
}
.btn-group button.active { background: var(--vp-c-bg); color: var(--vp-c-brand-1); box-shadow: 0 2px 6px rgba(0,0,0,0.06); }

/* 問答卡片 */
.qa-item { border: 1px solid var(--vp-c-divider); border-radius: 16px; margin-bottom: 16px; overflow: hidden; background: var(--vp-c-bg-alt); transition: all 0.3s; }
.qa-item.open { border-color: var(--vp-c-brand-1); box-shadow: 0 4px 20px rgba(0,0,0,0.06); transform: translateY(-2px); }
.qa-trigger { padding: 20px 24px; cursor: pointer; display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
.q-main { display: flex; align-items: flex-start; gap: 12px; flex: 1; }
.q-text { font-size: 1.15em; font-weight: 700; line-height: 1.45; color: var(--vp-c-text-1); }
.imp-tag { font-size: 0.75em; background: #ff3b30; color: white; padding: 2px 8px; border-radius: 6px; flex-shrink: 0; font-weight: 800; margin-top: 2px; }
.arrow { color: var(--vp-c-text-3); transition: transform 0.3s; margin-top: 4px; }
.qa-item.open .arrow { transform: rotate(180deg); color: var(--vp-c-brand-1); }

/* 內容樣式 */
.qa-content { padding: 0 24px 32px; border-top: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft); }
.markdown-body { font-size: 1.05em; line-height: 1.8; color: var(--vp-c-text-1); padding-top: 24px; }
.markdown-body :deep(strong) { color: var(--vp-c-brand-1); font-weight: 800; }
.markdown-body :deep(blockquote) { margin: 1.5em 0; padding: 12px 24px; border-left: 4px solid var(--vp-c-brand-1); background: var(--vp-c-bg-alt); border-radius: 8px; }

.section-label { font-size: 1.6em; margin: 48px 0 24px; padding-bottom: 12px; border-bottom: 2px solid var(--vp-c-divider); font-weight: 800; color: var(--vp-c-text-1); }

/* 行動版 */
.mobile-menu-btn { 
    position: fixed; bottom: 24px; right: 24px; z-index: 100; padding: 14px 28px;
    background: var(--vp-c-brand-1); color: white; border-radius: 100px; border: none; font-weight: 700;
    box-shadow: 0 8px 25px rgba(0,113,227,0.3); display: none;
}
@media (max-width: 900px) { .mobile-menu-btn { display: block; } }

.mobile-nav-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 99; backdrop-filter: blur(4px); }
.mobile-nav-content { width: 80%; max-width: 300px; height: 100%; background: var(--vp-c-bg); padding: 40px 20px; }
.mobile-search input { width: 100%; padding: 12px; margin-bottom: 30px; border-radius: 8px; border: 1px solid var(--vp-c-divider); }
.m-nav-item { 
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px; border-bottom: 1px solid var(--vp-c-divider); 
}
.m-nav-item.active { color: var(--vp-c-brand-1); font-weight: 700; background: var(--vp-c-brand-soft); }
.m-nav-item .nav-count { font-size: 12px; }
</style>
