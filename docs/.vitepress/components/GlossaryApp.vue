<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue";
import { glossaryData } from "../../data/glossary";

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
  let filtered = glossaryData.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.definition.includes(searchQuery.value) ||
      item.analogy.includes(searchQuery.value);
    
    // 修復: 處理category為數組的情況
    const currentCategory = selectedCategory.value;
    const matchesCategory =
      currentCategory === "All" ||
      (Array.isArray(item.category) 
        ? item.category.includes(currentCategory as any)
        : item.category === currentCategory);

    return matchesSearch && matchesCategory;
  });
  
  // 應用排序
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

const getCategoryColor = (cat: string) => {
  return `badge-${cat.toLowerCase()}`;
};

// 切換排序順序
const toggleSort = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
};

// 切換搜尋工具展開/收起
const toggleControls = () => {
  isControlsExpanded.value = !isControlsExpanded.value;
};

// Instant animation on scroll
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
</script>

<template>
  <div class="glossary-app">
    <!-- Header Section -->
    <header class="glossary-header">
      <h1>零知識術語表</h1>
      <p class="subtitle">從專有名詞到白話文翻譯，讓您輕鬆讀懂裝置管理。</p>
    </header>

    <!-- Sticky Controls -->
    <!-- Sticky Controls -->
    <div class="controls-wrapper">
      <div class="controls-inner">
        <!-- Toggle Button -->
        <button 
          @click="toggleControls" 
          class="controls-toggle"
          :class="{ expanded: isControlsExpanded }"
          :aria-label="isControlsExpanded ? '收起搜尋工具' : '展開搜尋工具'"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span class="control-text">{{ isControlsExpanded ? '收起篩選器' : '搜尋與篩選' }}</span>
          <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        <!-- Collapsible Content -->
        <div class="controls-container" :class="{ collapsed: !isControlsExpanded }">
          <div class="controls-content">
            <div class="search-box">
              <span class="search-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </span>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜尋術語（如：ADE, 憑證...）"
                class="search-input"
              />
            </div>

            <div class="categories">
              <button
                @click="toggleSort"
                class="cat-btn"
                :title="sortOrder === 'asc' ? '切換為 Z-A' : '切換為 A-Z'"
              >
                <span v-if="sortOrder === 'asc'">A-Z</span>
                <span v-else>Z-A</span>
              </button>
              
              <div class="divider"></div>

              <button
                v-for="cat in categories"
                :key="cat"
                @click="selectedCategory = cat"
                :class="['cat-btn', { active: selectedCategory === cat }]"
              >
                {{ cat }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="terms-grid">
      <div
        v-for="(item, index) in filteredTerms"
        :key="index"
        class="term-card"
        :style="{ '--delay': index % 20 }"
      >
        <div class="card-main">
          <div class="card-header">
            <h3 class="term-title">{{ item.term }}</h3>
            <div class="term-badges">
              <span 
                v-for="cat in (Array.isArray(item.category) ? item.category : [item.category])" 
                :key="cat"
                :class="['badge', getCategoryColor(cat)]"
              >
                {{ cat }}
              </span>
            </div>
          </div>

          <p class="term-definition">{{ item.definition }}</p>
        </div>

        <div v-if="item.analogy" class="analogy-wrapper">
          <div class="analogy-icon">💡</div>
          <div class="analogy-content">
            <span class="analogy-label">白話文 / 比喻</span>
            <p class="analogy-text">{{ item.analogy }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredTerms.length === 0" class="empty-state">
      沒有找到符合「{{ searchQuery }}」的術語 🧐
    </div>
  </div>
</template>

<style scoped>
/* 
  Apple-style Design System 
*/
.glossary-app {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 2% 60px;
  /* Premium Traditional Chinese Font Stack */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang TC", "Microsoft JhengHei UI", "Microsoft JhengHei", "Noto Sans TC", sans-serif;
  color: var(--vp-c-text-1);
}

/* Header */
.glossary-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 80px 0 20px; /* 增加頂部間距，避免被切到 */
}

.glossary-header h1 {
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 20px;
  color: var(--vp-c-text-1);
}

.subtitle {
  font-size: clamp(16px, 2vw, 19px);
  color: var(--vp-c-text-2);
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.6;
}

/* --- Controls Section (Sticky & Glassmorphism) --- */
.controls-wrapper {
  position: sticky;
  top: var(--vp-nav-height);
  z-index: 10;
  padding: 24px 0;
  margin: 0 -40px 40px -40px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
}

.controls-inner {
  max-width: 100%;
  padding: 0 2%;
}

/* Toggle Button */
.controls-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 16px; /* Slightly larger */
  background: var(--vp-c-bg-alt);
  border: 1px solid transparent;
  border-radius: 16px;
  color: var(--vp-c-text-2);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
  margin-bottom: 0;
}

.controls-toggle:hover {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
}

.controls-toggle .chevron {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.controls-toggle.expanded .chevron {
  transform: rotate(180deg);
}

.control-text {
  font-size: 14px;
}

/* Collapsible Container Animation */
.controls-container {
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease;
  max-height: 500px; /* Arbitrary large height */
  opacity: 1;
}

.controls-container.collapsed {
  max-height: 0;
  opacity: 0;
  pointer-events: none;
  margin-top: 0;
}

/* Search Input */
.search-box {
  position: relative;
  margin-bottom: 24px;
  margin-top: 16px;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--vp-c-text-3);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 16px 20px 16px 52px;
  font-size: 18px;
  border-radius: 20px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
}

.search-input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1), 0 10px 30px rgba(0,0,0,0.08);
  background: var(--vp-c-bg);
  transform: translateY(-2px);
}

/* Categories */
.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
}

@media (max-width: 768px) {
  .categories {
    flex-wrap: nowrap;
    justify-content: flex-start;
    overflow-x: auto;
    scrollbar-width: none;
    padding: 10px 4px;
    margin: 0 -10px;
  }
  .categories::-webkit-scrollbar { display: none; }
}

.divider {
  width: 1px;
  height: 24px;
  background: var(--vp-c-divider);
  margin: 0 4px;
  flex-shrink: 0;
}

.cat-btn {
  padding: 8px 16px;
  border-radius: 980px; /* Pilot shape */
  font-size: 14px;
  font-weight: 500;
  background: var(--vp-c-bg-alt);
  border: 1px solid rgba(128, 128, 128, 0.1);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
  user-select: none;
  white-space: nowrap;
}

.cat-btn:hover {
  background: var(--vp-c-bg-mute);
  transform: translateY(-1px);
}

.cat-btn.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: transparent;
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-1), 0.3);
}


/* --- Grid Layout --- */
.terms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 40px;
  max-width: 100%;
  padding: 0 2% 100px;
}

/* Mobile: Single column is handled by minmax(300px), but let's ensure small screens are safe */
@media (max-width: 639px) {
  .terms-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .glossary-header {
    padding: 40px 0 30px;
  }
  
  .controls-wrapper {
    padding: 12px 0;
  }
}




/* --- Card Design (Refined Apple Style) --- */
.term-card {
  background: var(--vp-c-bg-alt);
  border-radius: 20px;
  /* Removed padding here, handled by internal wrappers */
  padding: 0; 
  border: 1px solid rgba(128, 128, 128, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  height: 100%;
}

/* Hover Effect */
@media (hover: hover) {
  .term-card:hover {
    transform: translateY(-6px) scale(1.01);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08); /* Stronger lift */
    border-color: rgba(128, 128, 128, 0.2);
    z-index: 10;
  }
}

/* Animation Entry */
.term-card.card-visible {
  animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(var(--delay) * 40ms);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 1. Main Content Zone */
.card-main {
  padding: 24px 24px 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* Align top if title is long */
  gap: 12px;
  margin-bottom: 16px;
}

.term-title {
  font-size: 22px; /* Large title */
  font-weight: 700;
  margin: 0;
  color: var(--vp-c-text-1);
  line-height: 1.3;
}

/* Definition - Readable & Clean */
.term-definition {
  font-size: 17px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0;
}

/* 2. Analogy Zone - Visually Separated */
.analogy-wrapper {
  background: var(--vp-c-bg-mute); /* Muted background */
  padding: 16px 24px;
  border-top: 1px solid rgba(128, 128, 128, 0.05);
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.analogy-icon {
  font-size: 18px;
  flex-shrink: 0;
  padding-top: 2px;
  filter: grayscale(0.2);
}

.analogy-content {
  flex: 1;
}

.analogy-label {
  display: block;
  font-weight: 600;
  font-size: 12px;
  color: var(--vp-c-brand-1);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}

.analogy-text {
  font-size: 15px; /* Slightly smaller than main def */
  line-height: 1.5;
  color: var(--vp-c-text-2);
  margin: 0;
}

.category-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.badge {
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  background: #f5f5f7;
  color: #6e6e73;
}

/* Badge Colors */
.badge-core { background: #e8f2ff; color: #0066cc; }
.badge-enrollment { background: #e6ffed; color: #008040; }
.badge-apple { background: #f5f5f7; color: #1d1d1f; }
.badge-security { background: #ffebeb; color: #d60000; }
.badge-network { background: #efeaff; color: #5856d6; }
.badge-hardware { background: #fff4e6; color: #f58e00; }
.badge-apps { background: #ffeaf4; color: #d0006f; }
.badge-other { background: #f5f5f7; color: #86868b; }
.badge-education { background: #fff9db; color: #b58900; }
.badge-macos { background: #f3e8ff; color: #8d4fdb; }
.badge-jamf { background: #e6fffa; color: #009688; }

/* Dark Mode Badges */
@media (prefers-color-scheme: dark) {
  .badge-core { background: rgba(10, 132, 255, 0.2); color: #5ac8fa; }
  .badge-enrollment { background: rgba(48, 209, 88, 0.2); color: #30d158; }
  .badge-apple { background: rgba(255, 255, 255, 0.1); color: #fff; }
  .badge-security { background: rgba(255, 69, 58, 0.2); color: #ff453a; }
  .badge-network { background: rgba(94, 92, 230, 0.2); color: #bf5af2; }
  .badge-hardware { background: rgba(255, 159, 10, 0.2); color: #ff9f0a; }
  .badge-apps { background: rgba(255, 55, 95, 0.2); color: #ff375f; }
  .badge-other { background: rgba(142, 142, 147, 0.2); color: #98989d; }
  .badge-education { background: rgba(255, 214, 10, 0.2); color: #ffd60a; }
  .badge-macos { background: rgba(175, 82, 222, 0.2); color: #af52de; }
  .badge-jamf { background: rgba(100, 210, 255, 0.2); color: #64d2ff; }
}

/* No Results */
.no-results {
  text-align: center;
  padding: 80px 0;
  color: #86868b;
}

.no-content-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

/* Dark Mode Polish */
.dark .term-card {
  background: #1c1c1e;
  border-color: rgba(255, 255, 255, 0.05);
}

.dark .analogy-wrapper {
  background: rgba(255, 255, 255, 0.03);
}

.dark .controls-wrapper {
  background: var(--vp-c-bg);
}

.dark .cat-btn {
  background: #2c2c2e;
}

.dark .cat-btn.active {
  background: var(--vp-c-brand-1);
}
</style>
