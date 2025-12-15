<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue";
import { allQAData, glossaryData } from "../../data/all-data";
import type { QAItem, QASection } from "../types";
import MarkdownIt from "markdown-it";

const props = defineProps<{
  data: QASection[];
}>();

const md = new MarkdownIt();
const searchQuery = ref("");
const activeSection = ref("All");

// Extract all unique tags
const allTags = computed(() => {
  const tags = new Set<string>();
  props.data.forEach((section) => {
    section.items.forEach((item) => {
      item.tags.forEach((tag) => tags.add(tag));
    });
  });
  return Array.from(tags);
});

const sections = computed(() => ["All", ...props.data.map((s) => s.title)]);

const filteredSections = computed(() => {
  // 1. Local Page Logic (No Search)
  if (!searchQuery.value) {
    if (activeSection.value === "All") {
      return props.data;
    }
    return props.data
      .map((section) => {
        if (section.title !== activeSection.value) {
          return { ...section, items: [] };
        }
        return section;
      })
      .filter((section) => section.items.length > 0);
  }

  // 2. Global Search Logic
  const q = searchQuery.value.toLowerCase();
  const results: QASection[] = [];

  // Search Q&A
  const qaMatches: QAItem[] = [];
  allQAData.forEach((file) => {
    file.sections.forEach((section) => {
      section.items.forEach((item) => {
        if (
          item.question.toLowerCase().includes(q) ||
          item.answer.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q))
        ) {
          // Add source file name to key for context if needed, or just push
          // Cloning item to add contextual tag if beneficial, purely optional
           qaMatches.push({
             ...item,
             tags: [...item.tags, file.source] // Add source as a tag for context
           });
        }
      });
    });
  });

  if (qaMatches.length > 0) {
    results.push({
      title: "問答指南搜尋結果",
      items: qaMatches,
    });
  }

  // Search Glossary
  const glossaryMatches = glossaryData
    .filter((term) => {
      return (
        term.term.toLowerCase().includes(q) ||
        term.definition.toLowerCase().includes(q) ||
        term.analogy.toLowerCase().includes(q)
      );
    })
    .map((term) => ({
      id: `glossary-${term.term}`,
      question: term.term, // Map Term -> Question
      answer: `**定義**：${term.definition}\n\n**白話文**：${term.analogy}`, // Map Def -> Answer
      tags: [term.category, "術語表"],
      important: false,
    } as QAItem));

  if (glossaryMatches.length > 0) {
    results.push({
      title: "術語表搜尋結果",
      items: glossaryMatches,
    });
  }

  return results;
});

// Accordion Logic
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

// Instant animation on scroll
onMounted(async () => {
  await nextTick();
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('item-visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.qa-item').forEach((el) => {
    observer.observe(el);
  });
});
</script>

<template>
  <div class="qa-app">
    <!-- Controls -->
    <div class="controls">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="搜尋問題..."
        class="search-input"
      />

      <div class="section-pills">
        <button
          v-for="s in sections"
          :key="s"
          @click="activeSection = s"
          :class="['pill', { active: activeSection === s }]"
        >
          {{ s }}
        </button>
      </div>
    </div>

    <!-- Results -->
    <div class="qa-content">
      <div
        v-for="section in filteredSections"
        :key="section.title"
        class="qa-section"
      >
        <h2 class="section-title">{{ section.title }}</h2>

        <div class="qa-list">
          <div
            v-for="item in section.items"
            :key="item.id"
            class="qa-item glass-panel"
            :class="{ open: openItems.has(item.id) }"
          >
            <div class="qa-header" @click="toggleItem(item.id)">
              <h3 class="qa-question">{{ item.question }}</h3>
              <div class="qa-header-right">
                <span v-if="item.important" class="badge-important">重要</span>
                <span class="icon">{{ openItems.has(item.id) ? "−" : "+" }}</span>
              </div>
            </div>

            <div v-show="openItems.has(item.id)" class="qa-body">
              <div class="tags">
                <span v-for="tag in item.tags" :key="tag" class="tag"
                  >#{{ tag }}</span
                >
              </div>
              <div
                class="markdown-body"
                v-html="renderMarkdown(item.answer)"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredSections.length === 0" class="no-results">
        無符合結果
      </div>
    </div>
  </div>
</template>

<style scoped>
.qa-app {
  padding: 2rem 0;
}

.controls {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.search-input {
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(128, 128, 128, 0.1);
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  font-size: 1.1rem;
  box-shadow: var(--vp-shadow-1);
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 4px rgba(var(--vp-c-brand-1), 0.1), var(--vp-shadow-2);
}

.section-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.pill {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background: var(--vp-c-bg-alt);
  font-size: 0.9rem;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: 1px solid transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  box-shadow: var(--vp-shadow-1);
  position: relative;
  overflow: hidden;
}

.pill::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(var(--vp-c-brand-1), 0.1);
  transform: translate(-50%, -50%);
  transition: width 0.4s, height 0.4s;
}

.pill:hover::before {
  width: 200px;
  height: 200px;
}

.pill:hover {
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text-1);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 6px 16px rgba(0,0,0,0.1);
}

.pill:active {
  transform: translateY(-1px) scale(0.98);
}

.pill.active {
  background: var(--vp-c-brand-1);
  color: white;
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-1), 0.3);
}

.section-title {
  margin: 2rem 0 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  border: none;
  color: var(--vp-c-brand-3);
}

.qa-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.glass-panel {
  background: var(--vp-c-bg-alt);
  border: 1px solid rgba(128, 128, 128, 0.1);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--vp-shadow-1);
  opacity: 1;
  transform: translateY(0) scale(1);
  position: relative;
}

.glass-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(var(--vp-c-brand-1), 0.03) 0%, rgba(var(--vp-c-brand-1), 0) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 0;
}

.glass-panel.item-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.glass-panel:hover {
  background: var(--vp-c-bg-elv);
  box-shadow: 0 12px 32px rgba(0,0,0,0.15);
  transform: translateY(-6px) scale(1.01);
  border-color: var(--vp-c-brand-1);
}

.glass-panel:hover::before {
  opacity: 1;
}

.qa-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
  gap: 1rem;
}

.qa-header-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.badge-important {
  background: rgba(255, 59, 48, 0.1);
  color: #ff3b30;
  border: 1px solid rgba(255, 59, 48, 0.2);
  font-size: 0.75rem;
  padding: 0.3rem 0.7rem;
  border-radius: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
}

.qa-question {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  flex: 1;
}

.icon {
  font-size: 1.5rem;
  color: var(--vp-c-text-2);
  transition: transform 0.3s ease;
}

.qa-item.open .icon {
  transform: rotate(180deg);
  color: var(--vp-c-brand-1);
}

.qa-body {
  padding: 0 1.5rem 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
  background: rgba(var(--vp-c-bg-alt), 0.5);
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.tags {
  margin: 1rem 0;
  display: flex;
  gap: 0.5rem;
}

.tag {
  color: var(--vp-c-brand-1);
  font-size: 0.85rem;
  background: rgba(var(--vp-c-brand-1), 0.1);
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  font-weight: 600;
}

/* Markdown Styles inside Accordion */
.markdown-body {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--vp-c-text-1);
}

.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3) {
  margin-top: 1.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-brand-3);
}

.markdown-body :deep(ul) {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.markdown-body :deep(strong) {
  font-weight: 700;
  color: var(--vp-c-brand-2);
}

/* Dark Mode Overrides */
:global(.dark) .search-input,
:global(.dark) .pill,
:global(.dark) .glass-panel {
  background: var(--vp-c-bg-alt);
  border-color: rgba(255, 255, 255, 0.1);
}

:global(.dark) .qa-body {
  background: rgba(255, 255, 255, 0.02);
}
</style>
