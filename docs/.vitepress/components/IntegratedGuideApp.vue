<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from "vue";
import { allQAData } from "../../data/all-data";
import type { QAItem, QASection } from "../types";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

const searchQuery = ref("");
// Default active source (first available)
const activeSource = ref(allQAData[0].source);
const isSidebarOpen = ref(false); // Mobile sidebar toggle

// Computed: Search Logic across ALL 8 files
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
            fileMatches.push({ ...item, tags: [...item.tags, file.source] }); // Add context tag
        }
      });
    });
    if (fileMatches.length > 0) {
      results.push({ source: file.source, items: fileMatches });
    }
  });

  return results;
});

// Computed: Current Module Content (when NOT searching)
const currentModule = computed(() => {
    return allQAData.find(d => d.source === activeSource.value);
});

// Accordion Logic
const openItems = ref<Set<string>>(new Set());
const toggleItem = (id: string) => {
  if (openItems.value.has(id)) openItems.value.delete(id);
  else openItems.value.add(id);
};

// Markdown Helper
const renderMarkdown = (text: string) => md.render(text);

// Animation Logic
onMounted(async () => {
    await nextTick();
    // Intersection Observer for animation trigger
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });

    // Watch for DOM updates to re-attach observer
    watch([activeSource, searchQuery], async () => {
        await nextTick();
        document.querySelectorAll('.qa-card').forEach(el => observer.observe(el));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, { immediate: true });
});
</script>

<template>
  <div class="guide-app">
    <!-- Header (Title Only) -->
    <div class="page-header">
        <h1>MDM 實戰指南</h1>
        <p>完整收錄 8 大管理模組，超過 100+ 實務常見問答。</p>
    </div>

    <div class="app-layout">
      <!-- Left Sidebar: Navigation & Search -->
      <aside class="app-sidebar">
        
        <!-- Mobile Toggle (Only visible on small screens) -->
        <div class="mobile-nav-header">
            <span>章節導覽</span>
            <button class="menu-toggle" @click="isSidebarOpen = !isSidebarOpen">
                {{ isSidebarOpen ? '✕' : '☰' }}
            </button>
        </div>

        <div class="sidebar-inner" :class="{ 'mobile-hidden': !isSidebarOpen }">
             <!-- Search Box -->
            <div class="sidebar-section">
                <div class="search-box">
                    <span class="search-icon">🔍</span>
                    <input 
                        v-model="searchQuery" 
                        type="text" 
                        placeholder="搜尋全站指南..." 
                        class="search-input"
                    />
                </div>
            </div>

            <!-- Navigation Menu -->
            <div class="sidebar-section nav-menu">
                <h3>章節選擇</h3>
                <button 
                    v-for="module in allQAData" 
                    :key="module.source"
                    @click="activeSource = module.source; searchQuery = ''; isSidebarOpen = false"
                    :class="['nav-item', { active: activeSource === module.source && !searchQuery }]"
                >
                    <span class="nav-icon">📄</span>
                    <span class="nav-text">{{ module.source }}</span>
                    <span class="nav-arrow">›</span>
                </button>
            </div>
        </div>
      </aside>

      <!-- Right Content Area -->
      <main class="app-content">
        
        <!-- Case 1: Search Results -->
        <div v-if="searchQuery" class="result-container">
            <h2 class="section-title">搜尋結果：{{ searchQuery }}</h2>
            <div v-if="searchResults && searchResults.length > 0">
                <div v-for="group in searchResults" :key="group.source" class="module-group">
                    <h3 class="group-title">{{ group.source }}</h3>
                    <div class="cards-stack">
                        <div v-for="item in group.items" :key="item.id" class="qa-card" 
                             :class="{ 'is-open': openItems.has(item.id) }">
                            <div class="card-header" @click="toggleItem(item.id)">
                                <h3>{{ item.question }}</h3>
                                <span class="chevron">▼</span>
                            </div>
                            <div class="card-body" v-if="openItems.has(item.id)">
                                <div class="markdown-body" v-html="renderMarkdown(item.answer)"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="empty-state">
                <p>找不到相關內容，請嘗試其他關鍵字。</p>
            </div>
        </div>

        <!-- Case 2: Browse Module -->
        <div v-else class="module-container">
            <h2 class="module-title">{{ currentModule?.source }}</h2>
            
            <div v-for="section in currentModule?.sections" :key="section.title" class="qa-section">
                <h3 class="section-top-title">{{ section.title }}</h3>
                
                <div class="cards-stack">
                    <div v-for="item in section.items" :key="item.id" class="qa-card"
                         :class="{ 'is-open': openItems.has(item.id) }">
                        <div class="card-header" @click="toggleItem(item.id)">
                            <div class="header-main">
                                <span v-if="item.important" class="badge-important">重要</span>
                                <h3>{{ item.question }}</h3>
                            </div>
                            <span class="chevron">▼</span>
                        </div>
                        <div class="card-body-wrapper" :style="{ maxHeight: openItems.has(item.id) ? '2000px' : '0px' }">
                             <div class="card-body">
                                <div class="markdown-body" v-html="renderMarkdown(item.answer)"></div>
                                <div class="tags" v-if="item.tags">
                                    <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </main>
    </div>
  </div>
</template>

<style scoped>
/* Layout */
.guide-app {
    max-width: 1400px;
    margin: 0 auto;
    padding: 40px 24px 100px;
}

.page-header {
    text-align: center;
    margin-bottom: 60px;
    margin-top: 60px; /* Force extra space */
}
.page-header h1 {
    font-size: 36px;
    font-weight: 800;
    margin-bottom: 12px;
}
.page-header p {
    color: var(--vp-c-text-2);
}

.app-layout {
    display: flex;
    gap: 50px;
    align-items: flex-start;
}

/* Sidebar */
.app-sidebar {
    width: 280px;
    flex-shrink: 0;
    position: sticky;
    top: 100px;
    background: var(--vp-c-bg-alt);
    border-radius: 16px;
    padding: 24px;
    border: 1px solid var(--vp-c-divider);
    box-shadow: 0 4px 20px rgba(0,0,0,0.03);
}

.sidebar-section {
    margin-bottom: 30px;
}

.sidebar-section h3 {
    font-size: 13px;
    text-transform: uppercase;
    color: var(--vp-c-text-3);
    margin-bottom: 16px;
    letter-spacing: 0.05em;
    font-weight: 700;
}

/* Search Box */
.search-box {
    position: relative;
}
.search-input {
    width: 100%;
    padding: 12px 16px 12px 40px;
    border-radius: 10px;
    background: var(--vp-c-bg);
    border: 1px solid var(--vp-c-divider);
    color: var(--vp-c-text-1);
    transition: all 0.2s;
}
.search-input:focus {
    border-color: var(--vp-c-brand);
    box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.1);
}
.search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.5;
}

/* Nav Menu */
.nav-menu {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.nav-item {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    border-radius: 12px;
    background: transparent;
    color: var(--vp-c-text-2);
    cursor: pointer;
    transition: all 0.2s;
    text-align: left;
    border: 1px solid transparent;
}

.nav-item:hover {
    background: var(--vp-c-bg-mute);
    color: var(--vp-c-text-1);
}

.nav-item.active {
    background: var(--vp-c-brand);
    color: #fff;
    box-shadow: 0 4px 12px rgba(var(--vp-c-brand-rgb), 0.3);
}

.nav-icon { margin-right: 12px; font-size: 16px; }
.nav-text { flex-grow: 1; font-weight: 500; font-size: 15px; }
.nav-arrow { opacity: 0; transform: translateX(-5px); transition: all 0.2s; }
.nav-item.active .nav-arrow { opacity: 1; transform: translateX(0); }

/* Content Area */
.app-content {
    flex-grow: 1;
    min-width: 0;
}

.module-title {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 40px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--vp-c-divider);
}

.section-top-title {
    font-size: 20px;
    color: var(--vp-c-brand);
    margin: 40px 0 20px;
}

.qa-card {
    background: var(--vp-c-bg);
    border: 1px solid var(--vp-c-divider);
    border-radius: 16px;
    margin-bottom: 20px;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.qa-card:hover { border-color: var(--vp-c-text-3); }
.qa-card.is-open { border-color: var(--vp-c-brand); box-shadow: 0 8px 30px rgba(0,0,0,0.08); }

.card-header {
    padding: 20px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
}
.card-header h3 { font-size: 17px; font-weight: 600; margin: 0; line-height: 1.5; }
.chevron { transition: transform 0.3s; opacity: 0.5; }
.qa-card.is-open .chevron { transform: rotate(180deg); opacity: 1; color: var(--vp-c-brand); }

.card-body-wrapper {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease-in-out;
}
.card-body {
    padding: 0 24px 24px 24px;
    border-top: 1px solid var(--vp-c-divider);
    background: var(--vp-c-bg-alt);
    padding-top: 20px;
    font-size: 16px;
    line-height: 1.7;
    color: var(--vp-c-text-2);
}

.badge-important {
    background: #ff3b30; color: white;
    font-size: 10px; padding: 2px 8px; border-radius: 10px;
    margin-right: 8px; vertical-align: middle;
}

.tags { margin-top: 16px; display: flex; gap: 8px; }
.tag { font-size: 12px; background: var(--vp-c-bg); padding: 4px 10px; border-radius: 8px; border: 1px solid var(--vp-c-divider); }

/* Mobile Responsive */
.mobile-nav-header { display: none; }
@media (max-width: 960px) {
    .app-layout { flex-direction: column; gap: 30px; }
    .app-sidebar { width: 100%; top: 60px; z-index: 100; }
    .mobile-nav-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; font-weight: bold; }
    .sidebar-inner.mobile-hidden { display: none; }
}
</style>
