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
  typographer: true
});

// State
const searchQuery = ref("");
const activeSource = ref(allQAData[0].source);
const isSidebarOpen = ref(false);

const handleHashChange = () => {
  const hash = window.location.hash.replace('#', '').toLowerCase();
  if (hash) {
    // Explicit mapping for predictable navigation
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
    } else {
      // Fallback: Fuzzy match
      const matched = allQAData.find(m => 
        m.source.toLowerCase().includes(hash) ||
        hash.includes(m.source.toLowerCase().slice(0, 3))
      );
      if (matched) {
        activeSource.value = matched.source;
        searchQuery.value = '';
      }
    }
  }
};

// Search across ALL modules
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
    if (fileMatches.length > 0) {
      results.push({ source: file.source, items: fileMatches });
    }
  });

  return results;
});

// Current module content
const currentModule = computed(() => {
    return allQAData.find(d => d.source === activeSource.value);
});

// Accordion state
const openItems = ref<Set<string>>(new Set());
const toggleItem = (id: string) => {
  if (openItems.value.has(id)) openItems.value.delete(id);
  else openItems.value.add(id);
};

// Markdown rendering
const renderMarkdown = (text: string) => md.render(text);

// Listen to URL changes
onMounted(() => {
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    
    // Intersection Observer for animation trigger
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '50px' });

    // Watch for internal navigation
    watch([activeSource, searchQuery], async () => {
        await nextTick();
        document.querySelectorAll('.qa-card').forEach(el => observer.observe(el));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, { immediate: true });
});


// Switch module
const switchModule = (source: string) => {
  activeSource.value = source;
  searchQuery.value = '';
  isSidebarOpen.value = false;
  openItems.value.clear();
};
</script>

<template>
  <div class="guide-app">
    <!-- Header -->
    <header class="page-header">
        <h1>MDM 實戰指南</h1>
        <p>完整收錄 8 大管理模組，超過 100+ 實務常見問答。</p>
    </header>

    <div class="app-layout">
      <!-- Desktop Sidebar -->
      <aside class="app-sidebar">
        <div class="sidebar-section">
            <div class="search-box">
                <span class="search-icon" aria-hidden="true">🔍</span>
                <input 
                    v-model="searchQuery" 
                    type="text" 
                    placeholder="搜尋全站指南..." 
                    class="search-input"
                    aria-label="搜尋指南內容"
                />
                <button 
                  v-if="searchQuery" 
                  @click="searchQuery = ''" 
                  class="clear-btn"
                  aria-label="清除搜尋"
                >
                  ✕
                </button>
            </div>
        </div>

        <nav class="sidebar-section nav-menu" aria-label="模組導航">
            <h3>章節選擇</h3>
            <button 
                v-for="module in allQAData" 
                :key="module.source"
                @click="switchModule(module.source)"
                :class="['nav-item', { active: activeSource === module.source && !searchQuery }]"
                :aria-current="activeSource === module.source && !searchQuery ? 'page' : undefined"
            >
                <span class="nav-icon" aria-hidden="true">📄</span>
                <span class="nav-text">{{ module.source }}</span>
                <span class="nav-arrow" aria-hidden="true">›</span>
            </button>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="app-content">
        
        <!-- Search Results -->
        <div v-if="searchQuery" class="result-container">
            <h2 class="section-title">搜尋結果：{{ searchQuery }}</h2>
            <div v-if="searchResults && searchResults.length > 0">
                <section v-for="group in searchResults" :key="group.source" class="module-group">
                    <h3 class="group-title">{{ group.source }}</h3>
                    <div class="cards-stack">
                        <article 
                          v-for="item in group.items" 
                          :key="item.id" 
                          class="qa-card" 
                          :class="{ 'is-open': openItems.has(item.id) }"
                        >
                            <div 
                              class="card-header" 
                              @click="toggleItem(item.id)"
                              role="button"
                              :aria-expanded="openItems.has(item.id)"
                              tabindex="0"
                              @keydown.enter="toggleItem(item.id)"
                              @keydown.space.prevent="toggleItem(item.id)"
                            >
                                <div class="header-main">
                                  <span v-if="item.important" class="badge-important" aria-label="重要問題">⭐ 重要</span>
                                  <h3>{{ item.question }}</h3>
                                </div>
                                <span class="chevron" aria-hidden="true">▼</span>
                            </div>
                            <div class="card-body-wrapper" :style="{ maxHeight: openItems.has(item.id) ? '3000px' : '0px' }">
                              <div class="card-body">
                                <div class="markdown-body" v-html="renderMarkdown(item.answer)"></div>
                                <div class="tags" v-if="item.tags && item.tags.length">
                                    <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
                                </div>
                              </div>
                            </div>
                        </article>
                    </div>
                </section>
            </div>
            <div v-else class="empty-state">
                <div class="empty-icon">🤔</div>
                <p>找不到相關內容，請嘗試其他關鍵字。</p>
            </div>
        </div>

        <!-- Browse Module -->
        <div v-else class="module-container">
            <h2 class="module-title">{{ currentModule?.source }}</h2>
            
            <section v-for="section in currentModule?.sections" :key="section.title" class="qa-section">
                <h3 class="section-subtitle">{{ section.title }}</h3>
                
                <div class="cards-stack">
                    <article 
                      v-for="item in section.items" 
                      :key="item.id" 
                      class="qa-card"
                      :class="{ 'is-open': openItems.has(item.id) }"
                    >
                        <div 
                          class="card-header" 
                          @click="toggleItem(item.id)"
                          role="button"
                          :aria-expanded="openItems.has(item.id)"
                          tabindex="0"
                          @keydown.enter="toggleItem(item.id)"
                          @keydown.space.prevent="toggleItem(item.id)"
                        >
                            <div class="header-main">
                              <span v-if="item.important" class="badge-important" aria-label="重要問題">⭐ 重要</span>
                              <h3>{{ item.question }}</h3>
                            </div>
                            <span class="chevron" aria-hidden="true">▼</span>
                        </div>
                        <div class="card-body-wrapper" :style="{ maxHeight: openItems.has(item.id) ? '3000px' : '0px' }">
                          <div class="card-body">
                            <div class="markdown-body" v-html="renderMarkdown(item.answer)"></div>
                            <div class="tags" v-if="item.tags && item.tags.length">
                                <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
                            </div>
                          </div>
                        </div>
                    </article>
                </div>
            </section>
        </div>

      </main>
    </div>

    <!-- Mobile FAB Button -->
    <button 
      class="mobile-fab" 
      @click="isSidebarOpen = true" 
      v-show="!isSidebarOpen"
      aria-label="開啟搜尋與章節選單"
    >
      <span aria-hidden="true">🔍</span>
      <span class="fab-label">搜尋</span>
    </button>

    <!-- Mobile Drawer -->
    <div class="mobile-drawer-overlay" :class="{ open: isSidebarOpen }" @click="isSidebarOpen = false">
      <aside class="mobile-drawer" @click.stop role="dialog" aria-label="搜尋與章節選單">
        <div class="drawer-header">
          <h3>搜尋與章節</h3>
          <button class="close-btn" @click="isSidebarOpen = false" aria-label="關閉選單">✕</button>
        </div>
        
        <div class="drawer-content">
            <div class="search-box mobile-search">
                <span class="search-icon" aria-hidden="true">🔍</span>
                <input 
                  v-model="searchQuery" 
                  type="text" 
                  placeholder="搜尋全站指南..." 
                  class="search-input"
                  aria-label="搜尋指南內容"
                />
            </div>

            <nav class="nav-menu mobile-menu" aria-label="模組導航">
                <h4>章節選擇</h4>
                <button 
                    v-for="module in allQAData" 
                    :key="module.source"
                    @click="switchModule(module.source)"
                    :class="['nav-item', { active: activeSource === module.source && !searchQuery }]"
                >
                    <span class="nav-icon" aria-hidden="true">📄</span>
                    <span class="nav-text">{{ module.source }}</span>
                    <span class="nav-arrow" aria-hidden="true">›</span>
                </button>
            </nav>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
/* Modern Layout with Container Queries */
.guide-app {
    max-width: 1600px;
    margin: 0 auto;
    padding: clamp(32px, 5vw, 60px) clamp(20px, 3vw, 40px) 100px;
    container-type: inline-size;
}

/* Header */
.page-header {
    text-align: center;
    margin-bottom: clamp(40px, 8vh, 80px);
}

.page-header h1 {
    font-size: clamp(32px, 5vw, 48px);
    font-weight: 800;
    margin-bottom: 16px;
    line-height: 1.2;
    background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.page-header p {
    font-size: clamp(16px, 2vw, 20px);
    color: var(--vp-c-text-2);
}

/* Layout */
.app-layout {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: clamp(32px, 5vw, 60px);
    align-items: start;
}

@media (max-width: 960px) {
  .app-layout {
    grid-template-columns: 1fr;
  }
}

/* Sidebar */
.app-sidebar {
    position: sticky;
    top: calc(var(--vp-nav-height, 60px) + 24px);
    border-radius: 20px;
    background: var(--vp-c-bg-soft);
    padding: 24px;
    border: 1px solid var(--vp-c-divider);
}

@media (max-width: 960px) {
  .app-sidebar {
    display: none;
  }
}

.sidebar-section {
    margin-bottom: 32px;
}

.sidebar-section:last-child {
  margin-bottom: 0;
}

.sidebar-section h3 {
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--vp-c-text-2);
    margin-bottom: 16px;
}

/* Search Box */
.search-box {
    position: relative;
}

.search-input {
    width: 100%;
    padding: 12px 40px 12px 40px;
    border-radius: 12px;
    border: 1px solid var(--vp-c-divider);
    background: var(--vp-c-bg);
    color: var(--vp-c-text-1);
    font-size: 14px;
    transition: all 0.2s;
}

.search-input:focus {
    outline: none;
    border-color: var(--vp-c-brand-1);
    box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb, 0, 113, 227), 0.1);
}

.search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    opacity: 0.5;
}

.clear-btn {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: var(--vp-c-text-3);
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 6px;
    transition: all 0.2s;
}

.clear-btn:hover {
    background: var(--vp-c-bg-mute);
    color: var(--vp-c-text-1);
}

/* Navigation */
.nav-menu .nav-item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 10px;
    border: none;
    background: transparent;
    color: var(--vp-c-text-2);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    margin-bottom: 4px;
}

.nav-item:hover {
    background: var(--vp-c-bg-mute);
    color: var(--vp-c-text-1);
}

.nav-item.active {
    background: var(--vp-c-brand-soft);
    color: var(--vp-c-brand-1);
    font-weight: 600;
}

.nav-text {
    flex: 1;
    text-align: left;
}

.nav-arrow {
    opacity: 0;
    transition: all 0.2s;
}

.nav-item:hover .nav-arrow,
.nav-item.active .nav-arrow {
    opacity: 1;
}

/* Main Content */
.app-content {
    min-width: 0; /* Fix flex overflow */
}

.section-title,
.module-title {
    font-size: clamp(24px, 4vw, 36px);
    font-weight: 800;
    margin-bottom: 32px;
    line-height: 1.2;
}

.group-title,
.section-subtitle {
    font-size: clamp(18px, 3vw, 24px);
    font-weight: 700;
    margin: 40px 0 20px;
    padding-bottom: 12px;
    border-bottom: 2px solid var(--vp-c-divider);
}

.module-group:first-child .group-title,
.qa-section:first-child .section-subtitle {
  margin-top: 0;
}

/* QA Cards */
.qa-card {
    background: var(--vp-c-bg);
    border: 1px solid var(--vp-c-divider);
    border-radius: 16px;
    margin-bottom: 16px;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    opacity: 0;
    transform: translateY(20px);
}

.qa-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.qa-card:hover {
    border-color: var(--vp-c-brand-soft);
   box-shadow: 0 8px 24px rgba(0,0,0,0.06);
    transform: translateY(-2px);
}

.qa-card.is-open {
    border-color: var(--vp-c-brand-1);
    box-shadow: 0 12px 32px rgba(0,0,0,0.1);
}

.card-header {
    padding: 20px 24px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    transition: background 0.2s;
}

.card-header:hover {
    background: var(--vp-c-bg-soft);
}

.card-header:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}

.header-main {
  flex: 1;
  min-width: 0;
}

.header-main h3 {
    font-size: clamp(16px, 2.5vw, 19px);
    font-weight: 700;
    line-height: 1.4;
    color: var(--vp-c-text-1);
    margin: 0;
}

.badge-important {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    font-weight: 800;
    color: #fff;
    background: linear-gradient(135deg, #ff3b30, #ff7b71);
    padding: 4px 10px;
    border-radius: 12px;
    margin-bottom: 8px;
    box-shadow: 0 2px 8px rgba(255, 59, 48, 0.25);
}

.chevron {
    font-size: 14px;
    color: var(--vp-c-text-3);
    transition: transform 0.3s;
    flex-shrink: 0;
}

.qa-card.is-open .chevron {
    transform: rotate(180deg);
    color: var(--vp-c-brand-1);
}

/* Card Body */
.card-body-wrapper {
    overflow: hidden;
    transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-top: 1px solid transparent;
}

.qa-card.is-open .card-body-wrapper {
    border-top-color: var(--vp-c-divider);
}

.card-body {
    padding: 20px 24px;
    background: var(--vp-c-bg-soft);
}

.markdown-body {
    font-size: clamp(15px, 2vw, 17px);
    line-height: 1.7;
    color: var(--vp-c-text-1);
}

/* Tags */
.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 16px;
}

.tag {
    font-size: 12px;
    padding: 4px 12px;
    background: var(--vp-c-bg);
    border: 1px solid var(--vp-c-divider);
    border-radius: 12px;
    color: var(--vp-c-text-2);
    font-weight: 500;
}

/* Empty State */
.empty-state {
    text-align: center;
    padding: 80px 20px;
    color: var(--vp-c-text-3);
}

.empty-icon {
    font-size: 64px;
    margin-bottom: 16px;
}

/* Mobile FAB */
.mobile-fab {
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: var(--vp-c-brand-1);
    color: #fff;
    border: none;
    border-radius: 28px;
    padding: 14px 24px;
    font-size: 16px;
    font-weight: 600;
    box-shadow: 0 8px 24px rgba(0, 113, 227, 0.3);
    cursor: pointer;
    display: none;
    align-items: center;
    gap: 8px;
    z-index: 100;
    transition: all 0.3s;
}

.mobile-fab:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 113, 227, 0.4);
}

@media (max-width: 960px) {
  .mobile-fab {
    display: flex;
  }
}

/* Mobile Drawer */
.mobile-drawer-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.4);
    backdrop-filter: blur(4px);
    z-index: 1000;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
}

.mobile-drawer-overlay.open {
    opacity: 1;
    pointer-events: auto;
}

.mobile-drawer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(360px, 85vw);
    background: var(--vp-c-bg);
    box-shadow: -4px 0 24px rgba(0,0,0,0.1);
    transform: translateX(100%);
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    display: flex;
    flex-direction: column;
}

.mobile-drawer-overlay.open .mobile-drawer {
    transform: translateX(0);
}

.drawer-header {
    padding: 24px;
    border-bottom: 1px solid var(--vp-c-divider);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.drawer-header h3 {
    font-size: 20px;
    font-weight: 700;
    margin: 0;
}

.close-btn {
    background: var(--vp-c-bg-soft);
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}

.close-btn:hover {
    background: var(--vp-c-bg-mute);
}

.drawer-content {
    flex: 1;
    overflow-y: auto;
    padding: 24px;
}

.mobile-search {
    margin-bottom: 24px;
}

.mobile-menu h4 {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--vp-c-text-3);
    margin-bottom: 12px;
}

/* Accessibility: Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Print Styles */
@media print {
  .app-sidebar,
  .mobile-fab,
  .mobile-drawer-overlay {
    display: none !important;
  }
  
  .app-layout {
    grid-template-columns: 1fr;
  }
  
  .qa-card {
    break-inside: avoid;
  }
}
</style>
