<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from "vue";
import { allQAData, glossaryData } from "../../data/all-data";
import type { QAItem, QASection } from "../types";
import MarkdownIt from "markdown-it";

const props = defineProps<{
  data: QASection[];
}>();

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

const searchQuery = ref("");
const activeSection = ref("All");

// Computed: Extract all available section titles for the Filter Bar
const sections = computed(() => ["All", ...props.data.map((s) => s.title)]);

// Helper: Simple "Fuzzy" Match - checks if ALL search terms are present in the target string
const isMatch = (text: string, terms: string[]) => {
  const lower = text.toLowerCase();
  return terms.every(term => lower.includes(term));
};

// Computed: Filtered Results
const filteredSections = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  // Mode 1: Search Active
  if (query) {
    const terms = query.split(/\s+/).filter(t => t.length > 0); // Split "account lock" -> ["account", "lock"]
    const results: QASection[] = [];
    const qaMatches: QAItem[] = [];

    // Search all Q&A Data
    allQAData.forEach((file) => {
      file.sections.forEach((section) => {
        section.items.forEach((item) => {
          // Check Question, Answer, and Tags
          const matchFound = 
            isMatch(item.question, terms) || 
            isMatch(item.answer, terms) || 
            item.tags.some(tag => isMatch(tag, terms));

          if (matchFound) {
            qaMatches.push({
              ...item,
              tags: [...item.tags, file.source] // Add source context
            });
          }
        });
      });
    });

    if (qaMatches.length > 0) {
      results.push({
        title: `搜尋結果 (${qaMatches.length})`,
        items: qaMatches,
      });
    }

    // Search Glossary
    const glossaryMatches = glossaryData
      .filter((term) => {
        return (
          isMatch(term.term, terms) ||
          isMatch(term.definition, terms) ||
          isMatch(term.analogy, terms)
        );
      })
      .map((term) => ({
        id: `glossary-${term.term}`,
        question: term.term,
        answer: `**定義**：${term.definition}\n\n**白話文**：${term.analogy}`,
        tags: [term.category, "術語表"],
        important: false,
      } as QAItem));

    if (glossaryMatches.length > 0) {
      results.push({
        title: "術語表結果",
        items: glossaryMatches,
      });
    }

    return results;
  }

  // Mode 2: Browsing (No Search)
  if (activeSection.value === "All") {
    return props.data;
  } else {
    // Filter by selected section pill
    return props.data
      .filter((section) => section.title === activeSection.value)
      .map(section => ({ ...section })); // shallow copy
  }
});

// Logic for Accordion (Toggle Q&A items)
const openItems = ref<Set<string>>(new Set());

const toggleItem = (id: string) => {
  if (openItems.value.has(id)) {
    openItems.value.delete(id);
  } else {
    openItems.value.add(id);
  }
};

const renderMarkdown = (text: string) => {
  return md.render(text);
};

// Reset open items when search changes to avoid clutter
watch(searchQuery, () => {
  openItems.value.clear();
});

// Simple visibility reveal on mount
const isLoaded = ref(false);
onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true;
  }, 100);
});
</script>

<template>
  <div class="qa-container">
    
    <!-- 1. Hero Search Area -->
    <section class="qa-hero">
      <h1 class="hero-title">需要什麼協助？</h1>
      <div class="search-box-wrapper">
        <div class="search-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
        <input
          v-model="searchQuery"
          type="text"
          class="search-input"
          placeholder="輸入關鍵字，例如『帳號』、『VPP』或『註冊』..."
        />
        <button v-if="searchQuery" class="clear-btn" @click="searchQuery = ''">✕</button>
      </div>
    </section>

    <!-- 2. Sticky Filter Pills (Only show when not searching) -->
    <div class="filter-bar-sticky" v-if="!searchQuery && sections.length > 2">
      <div class="filter-scroll-container">
        <button
          v-for="s in sections"
          :key="s"
          @click="activeSection = s"
          class="filter-pill"
          :class="{ active: activeSection === s }"
        >
          {{ s === 'All' ? '全部顯示' : s.split('：')[1]?.split('(')[0] || s }}
        </button>
      </div>
    </div>

    <!-- 3. Results Area -->
    <div class="qa-results" :class="{ 'fade-in': isLoaded }">
      
      <!-- Empty State -->
      <div v-if="filteredSections.length === 0" class="empty-state">
        <div class="empty-emoji">🤔</div>
        <h3>找不到相符的內容</h3>
        <p>請嘗試其他關鍵字，或查看<a href="/glossary">術語表</a>。</p>
      </div>

      <!-- Content Sections -->
      <div 
        v-for="section in filteredSections" 
        :key="section.title" 
        class="qa-section"
      >
        <h2 class="section-title">
          {{ section.title }}
        </h2>

        <div class="cards-stack">
          <div
            v-for="item in section.items"
            :key="item.id"
            class="qa-card"
            :class="{ 'is-open': openItems.has(item.id) }"
          >
            <!-- Card Header (Question) -->
            <div 
              class="card-header" 
              @click="toggleItem(item.id)"
              role="button"
              :aria-expanded="openItems.has(item.id)"
            >
              <div class="header-main">
                <span v-if="item.important" class="badge-important">重要</span>
                <h3 class="question-text">{{ item.question }}</h3>
              </div>
              <div class="header-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chevron"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>

            <!-- Card Body (Answer) -->
            <div class="card-body-container" :style="{ maxHeight: openItems.has(item.id) ? '2000px' : '0px' }">
              <div class="card-body">
                <div class="answer-content markdown-body" v-html="renderMarkdown(item.answer)"></div>
                
                <!-- Tags Footer -->
                <div class="card-footer" v-if="item.tags && item.tags.length">
                  <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* --- Layout & Reset --- */
.qa-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 24px 100px;
}

/* --- Hero Search --- */
.qa-hero {
  text-align: center;
  margin-bottom: 40px;
}

.hero-title {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 24px;
  background: linear-gradient(120deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.search-box-wrapper {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 16px 48px;
  font-size: 17px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: all 0.2s ease;
}

.search-input:focus {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 8px 24px rgba(var(--vp-c-brand-1), 0.15);
  outline: none;
  transform: translateY(-2px);
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--vp-c-text-3);
  pointer-events: none;
}

.clear-btn {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--vp-c-text-3);
  cursor: pointer;
  padding: 4px;
}

/* --- Sticky Filter Pills --- */
.filter-bar-sticky {
  position: sticky;
  top: var(--vp-nav-height); /* Adapts to VitePress navbar */
  z-index: 20;
  background: rgba(var(--vp-c-bg-rgb), 0.85); /* Use RGB var if available, else standard color */
  backdrop-filter: blur(10px);
  margin: 0 -24px 40px -24px; /* Bleed to edges */
  padding: 16px 24px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.filter-scroll-container {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: none; /* Hide scrollbar Firefox */
  -ms-overflow-style: none;  /* Hide scrollbar IE 10+ */
}

.filter-scroll-container::-webkit-scrollbar { 
  display: none; /* Hide scrollbar Chrome/Safari */
}

.filter-pill {
  white-space: nowrap;
  padding: 8px 18px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
}

.filter-pill:hover {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
}

.filter-pill.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-1), 0.25);
}

/* --- Results Stack --- */
.qa-results {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.qa-results.fade-in {
  opacity: 1;
  transform: translateY(0);
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  margin: 40px 0 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
}

.qa-section:first-child .section-title {
  margin-top: 0;
}

/* --- QA Card Design --- */
.qa-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  margin-bottom: 16px;
  overflow: hidden;
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.qa-card:hover {
  border-color: var(--vp-c-text-3);
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
}

.qa-card.is-open {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 12px 32px rgba(0,0,0,0.08);
}

.card-header {
  padding: 20px 24px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  background: var(--vp-c-bg);
}

.card-header:active {
  background: var(--vp-c-bg-mute);
}

.question-text {
  font-size: 17px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  margin: 0;
}

.badge-important {
  display: inline-block;
  font-size: 11px;
  color: #ff3b30;
  background: rgba(255, 59, 48, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  margin-bottom: 6px;
  font-weight: 700;
}

.header-icon {
  color: var(--vp-c-text-3);
  transition: transform 0.3s;
  margin-top: 2px;
}

.qa-card.is-open .header-icon {
  transform: rotate(180deg);
  color: var(--vp-c-brand-1);
}

/* --- Card Body --- */
.card-body-container {
  border-top: 1px solid transparent;
  transition: max-height 0.4s cubic-bezier(0, 1, 0, 1), border-color 0.4s;
}

.qa-card.is-open .card-body-container {
  border-top-color: var(--vp-c-divider);
}

.card-body {
  padding: 24px;
  background: var(--vp-c-bg-alt);
}

.answer-content {
  font-size: 16px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

/* --- Tags --- */
.card-footer {
  margin-top: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  font-size: 12px;
  padding: 4px 10px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  color: var(--vp-c-text-2);
}

/* --- Empty State --- */
.empty-state {
  text-align: center;
  padding: 60px 0;
  color: var(--vp-c-text-3);
}

.empty-emoji {
  font-size: 48px;
  margin-bottom: 16px;
}

/* --- Mobile / Dark Mode Fixes --- */
@media (max-width: 600px) {
  .qa-container {
    padding: 20px 16px 80px;
  }
  
  .filter-bar-sticky {
    margin: 0 -16px 30px -16px;
    padding: 12px 16px;
  }
}
</style>
