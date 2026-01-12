<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue";
import { glossaryData } from "../../data/glossary";
import { useLayoutMode } from '../theme/composables/useLayoutMode';

const { isMobileView } = useLayoutMode();
type CategoryType = "Core" | "Enrollment" | "Apple" | "Security" | "Network" | "Hardware" | "Apps" | "Other" | "Education" | "macOS" | "Jamf";

const searchQuery = ref("");
const selectedCategory = ref<CategoryType | "All">("All");
const sortOrder = ref<'asc' | 'desc'>('asc'); // 新增排序狀態
const isControlsExpanded = ref(false); // 控制搜尋工具的展開/收起，預設收起
const fontScale = ref(1.0); // 術語表獨立的字體比例

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

// Persistence
import { watch } from 'vue';
watch(fontScale, (val) => {
  localStorage.setItem('mdm-glossary-font-scale', val.toString());
});

onMounted(async () => {
  const saved = localStorage.getItem('mdm-glossary-font-scale');
  if (saved) fontScale.value = parseFloat(saved);

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

// Helper to count items per category
const getCategoryCount = (cat: string) => {
  if (cat === 'All') return glossaryData.length;
  return glossaryData.filter(item => 
    Array.isArray(item.category) 
      ? item.category.includes(cat as any)
      : item.category === cat
  ).length;
};


</script>

<template>
  <div class="glossary-app" :class="{ 'is-mobile-device': isMobileView }" :style="{ '--app-scale': fontScale }">
    <!-- Header Section -->
    <header class="glossary-header">
      <h1>零知識術語表</h1>
      <p class="subtitle">從專有名詞到白話文翻譯，讓您輕鬆讀懂裝置管理。</p>
    </header>

    <div class="app-layout">
      <!-- Left Sidebar: Filters & Search (Desktop > 1200px) -->
      <aside class="app-sidebar desktop-only">
        <div class="sidebar-header">
           <h2>篩選與搜尋</h2>
        </div>
        
        <div class="search-box">
           <span class="search-icon">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
           </span>
           <input
             v-model="searchQuery"
             type="text"
             placeholder="搜尋術語..."
             class="search-input"
           />
        </div>

        <div class="categories-wrapper">
          <div class="categories-header">
            <span>分類</span>
            <button @click="toggleSort" class="sort-btn" :title="sortOrder === 'asc' ? 'A-Z' : 'Z-A'">
              {{ sortOrder === 'asc' ? 'A-Z' : 'Z-A' }}
            </button>
          </div>
          
          <div class="categories-list">
            <button
               v-for="cat in categories"
               :key="cat"
               @click="selectedCategory = cat"
               :class="['cat-item', { active: selectedCategory === cat }]"
            >
               {{ cat === 'All' ? '全部顯示' : cat }}
               <span class="cat-count" v-if="getCategoryCount(cat) > 0">{{ getCategoryCount(cat) }}</span>
            </button>
          </div>
        </div>

        <!-- Local Font Adjust -->
        <div class="font-controls">
          <div class="categories-header">
            <span>字體大小調整</span>
          </div>
          <div class="btn-group">
            <button @click="fontScale = 0.9" :class="{ active: fontScale === 0.9 }">小</button>
            <button @click="fontScale = 1.0" :class="{ active: fontScale === 1.0 }">中</button>
            <button @click="fontScale = 1.2" :class="{ active: fontScale === 1.2 }">大</button>
          </div>
        </div>
      </aside>

      <!-- Right Content: Grid -->
      <main class="app-content">
        <TransitionGroup 
          name="list" 
          tag="div" 
          class="terms-grid"
        >
          <article
            v-for="(item, index) in filteredTerms"
            :key="item.term"
            class="term-card"
            :style="{ '--delay': index % 10 }"
          >
            <div class="card-main">
              <header class="card-header">
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
              </header>

              <p class="term-definition">{{ item.definition }}</p>
            </div>

            <section v-if="item.analogy" class="analogy-wrapper">
              <div class="analogy-icon" aria-hidden="true">💡</div>
              <div class="analogy-content">
                <span class="analogy-label">白話文 / 比喻</span>
                <p class="analogy-text">{{ item.analogy }}</p>
              </div>
            </section>
          </article>
        </TransitionGroup>

        <!-- Empty State -->
        <div v-if="filteredTerms.length === 0" class="empty-state">
          <div class="empty-emoji">🧐</div>
          <p>沒有找到符合「{{ searchQuery }}」的術語</p>
          <button @click="searchQuery = ''; selectedCategory = 'All'" class="reset-btn">清除搜尋條件</button>
        </div>
      </main>
    </div>

    <!-- Mobile Floating Filter Button -->
    <button 
      class="mobile-floating-btn" 
      @click="isControlsExpanded = true" 
      v-if="!isControlsExpanded"
      aria-label="開啟搜尋與篩選"
    >
      <span class="icon" aria-hidden="true">🔍</span>
      <span class="label">篩選與搜尋</span>
    </button>

    <!-- Mobile Drawer Overlay -->
    <div class="mobile-drawer-overlay" :class="{ open: isControlsExpanded }" @click="isControlsExpanded = false">
      <aside class="mobile-drawer" @click.stop role="dialog" aria-label="篩選與搜尋">
        <div class="drawer-header">
          <h3>篩選與搜尋</h3>
          <button class="close-btn" @click="isControlsExpanded = false" aria-label="關閉">✕</button>
        </div>
        
        <div class="drawer-content">
            <div class="search-box">
                <span class="search-icon" aria-hidden="true">🔍</span>
                <input v-model="searchQuery" type="text" placeholder="搜尋術語..." class="search-input" aria-label="搜尋術語" />
            </div>

            <div class="categories-wrapper">
              <div class="categories-header">
                  <span>分類選擇</span>
                  <button @click="toggleSort" class="sort-btn">
                      {{ sortOrder === 'asc' ? '排序 A-Z' : '排序 Z-A' }}
                  </button>
              </div>
              <div class="categories-chips">
                  <button
                    v-for="cat in categories"
                    :key="cat"
                    @click="selectedCategory = cat; isControlsExpanded = false"
                    :class="['cat-chip', { active: selectedCategory === cat }]"
                  >
                    {{ cat === 'All' ? '全部' : cat }}
                  </button>
              </div>
            </div>

            <!-- Mobile Font Adjust -->
            <div class="font-controls-mobile">
                <div class="categories-header"><span>字體大小調整</span></div>
                <div class="btn-group-mobile">
                    <button @click="fontScale = 0.9" :class="{ active: fontScale === 0.9 }">小</button>
                    <button @click="fontScale = 1.0" :class="{ active: fontScale === 1.0 }">中</button>
                    <button @click="fontScale = 1.2" :class="{ active: fontScale === 1.2 }">大</button>
                </div>
            </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
/* Mobile Floating Button */
.mobile-floating-btn {
  display: none;
  position: fixed;
  bottom: 32px;
  right: 24px;
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 100px;
  font-weight: 700;
  font-size: 15px;
  box-shadow: 0 8px 20px rgba(0, 113, 227, 0.3);
  z-index: 100;
  display: none;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.mobile-floating-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 113, 227, 0.4);
}

/* Liquid Glass Drawer */
.mobile-drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease;
}

.mobile-drawer-overlay.open {
  opacity: 1;
  pointer-events: auto;
}

.mobile-drawer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--vp-c-bg);
  border-radius: 32px 32px 0 0;
  padding: 32px;
  padding-bottom: calc(32px + env(safe-area-inset-bottom));
  transform: translateY(100%);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 -10px 40px rgba(0,0,0,0.1);
}

.mobile-drawer-overlay.open .mobile-drawer {
  transform: translateY(0);
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.drawer-header h3 { 
  font-size: 22px; 
  font-weight: 800; 
  margin: 0; 
}

.close-btn { 
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--vp-c-bg-mute);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--vp-c-text-1);
}

.categories-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.cat-chip {
  padding: 8px 16px;
  border-radius: 20px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  font-size: 14px;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}

.cat-chip.active {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}

/* Base Layout */
.glossary-app {
  --base-size: calc(16px * var(--app-scale, 1));
  font-size: var(--base-size);
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 40px 100px;
}

/* Local Font Controls Styles */
.font-controls { margin-top: 32px; }
.btn-group { display: flex; gap: 4px; background: var(--vp-c-bg-mute); padding: 4px; border-radius: 12px; }
.btn-group button { 
    flex: 1; padding: 8px; border: none; background: transparent; border-radius: 8px; 
    cursor: pointer; font-size: 14px; transition: 0.2s; color: var(--vp-c-text-2); font-weight: 600;
}
.btn-group button.active { background: var(--vp-c-bg-alt); color: var(--vp-c-brand-1); box-shadow: 0 2px 8px rgba(0,0,0,0.1); }

.font-controls-mobile { margin-top: 32px; }
.btn-group-mobile { display: flex; gap: 8px; }
.btn-group-mobile button {
    flex: 1; padding: 12px; background: var(--vp-c-bg-mute); border: none; border-radius: 12px;
    font-size: 15px; font-weight: 600; color: var(--vp-c-text-2); cursor: pointer;
}
.btn-group-mobile button.active { background: var(--vp-c-brand-1); color: white; }

/* Header */
.glossary-header {
  text-align: center;
  padding: 80px 0 60px; 
}

.glossary-header h1 {
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-bottom: 20px;
  line-height: 1.2;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 0.1em 0; /* 預留溢出空間避免切字 */
  margin-top: -0.1em; /* 補償 padding 造成的位移 */
}

.subtitle {
  font-size: clamp(16px, 2vw, 20px);
  color: var(--vp-c-text-2);
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

/* 2-Column Layout */
.app-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 48px;
  align-items: start;
}

.app-sidebar {
  position: sticky;
  top: calc(var(--vp-nav-height, 60px) + 24px); 
  background: var(--vp-c-bg-soft);
  border-radius: 24px;
  padding: 24px;
  border: 1px solid var(--vp-c-divider);
}

.app-content {
  min-width: 0; 
}

/* Sidebar Elements */
.sidebar-header h2 {
    font-size: 16px; 
    font-weight: 700; 
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 20px; 
    color: var(--vp-c-text-2);
}

.categories-list { 
  display: flex; 
  flex-direction: column; 
  gap: 4px; 
}

.cat-item {
    display: flex; 
    justify-content: space-between; 
    align-items: center;
    padding: 10px 16px; 
    border-radius: 12px; 
    font-size: 14px; 
    color: var(--vp-c-text-2);
    cursor: pointer; 
    transition: all 0.2s; 
    width: 100%;
    border: none;
    background: transparent;
}

.cat-item:hover { 
  background: var(--vp-c-bg-mute); 
  color: var(--vp-c-text-1); 
}

.cat-item.active { 
  background: var(--vp-c-brand-soft); 
  color: var(--vp-c-brand-1); 
  font-weight: 600; 
}

.cat-count {
    font-size: 11px; 
    background: var(--vp-c-bg-alt); 
    padding: 2px 8px;
    border-radius: 10px; 
    min-width: 28px; 
    text-align: center;
    border: 1px solid var(--vp-c-divider);
}

.categories-header {
    display: flex; 
    justify-content: space-between; 
    align-items: center;
    margin-top: 32px; 
    margin-bottom: 12px; 
    font-size: 12px; 
    font-weight: 700;
    text-transform: uppercase; 
    color: var(--vp-c-text-3); 
    letter-spacing: 0.05em;
}

.sort-btn { 
  font-size: 12px; 
  color: var(--vp-c-brand-1); 
  background: none;
  border: none;
  cursor: pointer; 
  font-weight: 600;
}

.search-box {
  position: relative;
}

.search-input { 
  width: 100%; 
  padding: 12px 16px 12px 40px; 
  border-radius: 12px; 
  font-size: 14px; 
  transition: all 0.2s; 
  border: 1px solid var(--vp-c-divider); 
  background: var(--vp-c-bg); 
  color: var(--vp-c-text-1);
}

.search-input:focus { 
  border-color: var(--vp-c-brand-1); 
  box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.1); 
  outline: none;
}

.search-icon { 
  position: absolute;
  left: 12px; 
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.5; 
}

/* Grid Layout with Transition */
.terms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 24px;
}

/* List Transitions */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.list-leave-active {
  position: absolute;
}

/* Card Design */
.term-card {
  background: var(--vp-c-bg);
  border-radius: 24px;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex; 
  flex-direction: column; 
  height: 100%;
}

.term-card:hover {
  border-color: var(--vp-c-brand-soft);
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
}

.card-main { 
  padding: 32px; 
  flex: 1; 
}

.card-header { 
  display: flex; 
  justify-content: space-between; 
  align-items: flex-start; 
  gap: 16px; 
  margin-bottom: 20px; 
}

.term-title {
  font-size: 22px; 
  font-weight: 800; 
  margin: 0; 
  color: var(--vp-c-text-1); 
  line-height: 1.3;
}

.term-definition {
  font-size: 16px; 
  line-height: 1.6; 
  color: var(--vp-c-text-2); 
}

.analogy-wrapper {
  background: var(--vp-c-bg-soft); 
  padding: 24px 32px;
  border-top: 1px solid var(--vp-c-divider);
  display: flex; 
  gap: 16px;
}

.analogy-icon { 
  font-size: 20px; 
  flex-shrink: 0; 
}

.analogy-label { 
  display: block; 
  font-weight: 800; 
  font-size: 11px; 
  color: var(--vp-c-brand-1); 
  text-transform: uppercase; 
  margin-bottom: 6px; 
  letter-spacing: 0.1em; 
}

.analogy-text { 
  font-size: 15px; 
  line-height: 1.6; 
  color: var(--vp-c-text-1); 
  margin: 0; 
  font-weight: 500; 
}

.term-badges { 
  display: flex; 
  flex-wrap: wrap; 
  gap: 6px; 
  justify-content: flex-end; 
}

.badge { 
  font-size: 10px; 
  padding: 4px 10px; 
  border-radius: 8px; 
  font-weight: 700; 
  text-transform: uppercase; 
  letter-spacing: 0.05em;
}

/* Badge Color System */
.badge-core { background: rgba(0, 113, 227, 0.1); color: #0071e3; }
.badge-enrollment { background: rgba(52, 199, 89, 0.1); color: #28cd41; }
.badge-apple { background: rgba(0, 0, 0, 0.05); color: #1d1d1f; }
.badge-security { background: rgba(255, 59, 48, 0.1); color: #ff3b30; }
.badge-network { background: rgba(88, 86, 214, 0.1); color: #5856d6; }
.badge-hardware { background: rgba(255, 149, 0, 0.1); color: #ff9500; }
.badge-apps { background: rgba(255, 45, 85, 0.1); color: #ff2d55; }
.badge-other { background: rgba(142, 142, 147, 0.1); color: #8e8e93; }
.badge-education { background: rgba(255, 204, 0, 0.1); color: #cca300; }
.badge-macos { background: rgba(175, 82, 222, 0.1); color: #af52de; }
.badge-jamf { background: rgba(0, 0, 0, 0.1); color: #1d1d1f; }

.dark .badge-apple, .dark .badge-jamf { background: rgba(255, 255, 255, 0.1); color: #fff; }

/* Empty State */
.empty-state {
  text-align: center;
  padding: 100px 40px;
  background: var(--vp-c-bg-soft);
  border-radius: 32px;
  border: 2px dashed var(--vp-c-divider);
}

.empty-emoji {
  font-size: 48px;
  margin-bottom: 20px;
}

.reset-btn {
  margin-top: 24px;
  padding: 10px 24px;
  border-radius: 20px;
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
}

/* Responsive */
@media (max-width: 1200px) {
  .app-layout { grid-template-columns: 1fr; }
  .app-sidebar { display: none; }
  .mobile-floating-btn { display: flex; }
  .glossary-app { padding: 0 24px 100px; }
  .terms-grid { grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); }
}

@media (max-width: 640px) {
  .glossary-header { padding-top: 40px; }
  .terms-grid { grid-template-columns: 1fr; }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .list-move, .list-enter-active, .list-leave-active { transition: none !important; }
}
</style>
