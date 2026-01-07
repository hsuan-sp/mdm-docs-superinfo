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

// Helper to count items per category
const getCategoryCount = (cat: string) => {
  if (cat === 'All') return glossaryData.length;
  return glossaryData.filter(item => 
    Array.isArray(item.category) 
      ? item.category.includes(cat as any)
      : item.category === cat
  ).length;
};

// Platform Detection
const isMobilePlatform = ref(false);
onMounted(() => {
    isMobilePlatform.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (window.innerWidth <= 1200);
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 1200) isMobilePlatform.value = true;
    });
});
</script>

<template>
  <div class="glossary-app" :class="{ 'is-mobile-device': isMobilePlatform }">
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
      </aside>

      <!-- Right Content: Grid -->
      <main class="app-content">
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
      </main>
    </div>

    <!-- Mobile Floating Filter Button (< 1200px) -->
    <button class="mobile-floating-btn" @click="isControlsExpanded = true" v-if="!isControlsExpanded">
      <span class="icon">🔍</span>
      <span class="label">篩選與搜尋</span>
    </button>

    <!-- Mobile Drawer Overlay -->
    <div class="mobile-drawer-overlay" :class="{ open: isControlsExpanded }" @click="isControlsExpanded = false">
      <div class="mobile-drawer" @click.stop>
        <div class="drawer-header">
          <h3>篩選與搜尋</h3>
          <button class="close-btn" @click="isControlsExpanded = false">✕</button>
        </div>
        
        <div class="drawer-content">
            <div class="search-box">
                <span class="search-icon">🔍</span>
                <input v-model="searchQuery" type="text" placeholder="搜尋術語..." class="search-input" />
            </div>

            <div class="categories-wrapper">
              <div class="categories-header">
                  <span>分類選擇</span>
                  <button @click="toggleSort" class="sort-btn">
                      {{ sortOrder === 'asc' ? '排序 A-Z' : '排序 Z-A' }}
                  </button>
              </div>
              <div class="categories-grid">
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
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Mobile Drawer & Floating Button */
.mobile-floating-btn {
  display: none; /* Desktop hidden */
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 600;
  box-shadow: 0 8px 24px rgba(var(--vp-c-brand-rgb), 0.4);
  z-index: 100;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.mobile-floating-btn:hover {
  transform: scale(1.05);
}

.mobile-floating-btn:active {
  transform: scale(0.95);
}

.mobile-drawer-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(4px);
  z-index: 200;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

.mobile-drawer-overlay.open {
  opacity: 1;
  pointer-events: auto;
}

.mobile-drawer {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  background: var(--vp-c-bg);
  border-radius: 24px 24px 0 0;
  padding: 24px;
  max-height: 85vh;
  overflow-y: auto;
  transform: translateY(100%);
  transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  box-shadow: 0 -10px 40px rgba(0,0,0,0.1);
}

.mobile-drawer-overlay.open .mobile-drawer {
  transform: translateY(0);
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.drawer-header h3 { font-size: 20px; font-weight: 700; margin: 0; }
.close-btn { background: none; border: none; font-size: 24px; color: var(--vp-c-text-2); cursor: pointer; }

.categories-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.cat-chip {
  padding: 8px 16px;
  border-radius: 20px;
  background: var(--vp-c-bg-alt);
  border: 1px solid transparent;
  font-size: 14px;
}
.cat-chip.active {
  background: var(--vp-c-brand);
  color: white;
}

/* Apple-style Design System */
.glossary-app {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 2% 60px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: var(--vp-c-text-1);
}

/* Header */
.glossary-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 80px 0 20px; 
  margin-top: 60px; /* Force extra space for navbar */
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

/* 2-Column Layout */
.app-layout {
  display: flex;
  align-items: flex-start;
  gap: 40px;
  position: relative;
}

.app-sidebar {
  width: 280px;
  flex-shrink: 0;
  position: sticky;
  top: 100px; 
  background: var(--vp-c-bg-alt);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid var(--vp-c-divider);
}

.app-content {
  flex-grow: 1;
  min-width: 0; 
}

/* Sidebar Elements */
.sidebar-header h2 {
    font-size: 18px; font-weight: 700; margin-bottom: 20px; padding-bottom: 12px;
    border-bottom: 1px solid var(--vp-c-divider);
}
.categories-list { display: flex; flex-direction: column; gap: 4px; }
.cat-item {
    display: flex; justify-content: space-between; align-items: center;
    padding: 10px 12px; border-radius: 8px; font-size: 14px; color: var(--vp-c-text-2);
    cursor: pointer; transition: all 0.2s; text-align: left; width: 100%;
}
.cat-item:hover { background: var(--vp-c-bg-mute); color: var(--vp-c-brand); }
.cat-item.active { background: var(--vp-c-brand-soft); color: var(--vp-c-brand); font-weight: 600; }
.cat-count {
    font-size: 11px; background: rgba(128,128,128,0.1); padding: 2px 6px;
    border-radius: 10px; min-width: 24px; text-align: center;
}
.categories-header {
    display: flex; justify-content: space-between; align-items: center;
    margin-top: 24px; margin-bottom: 12px; font-size: 12px; font-weight: 600;
    text-transform: uppercase; color: var(--vp-c-text-3); letter-spacing: 0.05em;
}
.sort-btn { font-size: 11px; color: var(--vp-c-brand); cursor: pointer; }
.search-input { width: 100%; padding: 12px 16px 12px 42px; border-radius: 8px; font-size: 14px; }
.search-icon { left: 14px; width: 16px; height: 16px; }

/* Grid Layout */
.terms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
  padding-bottom: 100px;
}

/* Card Design */
.term-card {
  background: var(--vp-c-bg-alt);
  border-radius: 20px;
  border: 1px solid rgba(128, 128, 128, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  display: flex; flex-direction: column; position: relative; overflow: hidden; height: 100%;
}
.card-main { padding: 24px; flex-grow: 1; display: flex; flex-direction: column; }
.card-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 12px; }
.term-title {
  font-size: 22px; font-weight: 700; margin: 0; color: var(--vp-c-text-1); line-height: 1.3;
  word-break: break-word; hyphens: auto; /* Fix Text Adaptability */
}
.term-definition {
  font-size: 16px; line-height: 1.6; color: var(--vp-c-text-2); margin: 0;
  word-break: break-word; /* Fix Text Adaptability */
}
.analogy-wrapper {
  background: var(--vp-c-bg-mute); padding: 16px 24px;
  border-top: 1px solid rgba(128, 128, 128, 0.05);
  display: flex; gap: 12px; align-items: flex-start;
}
.analogy-icon { font-size: 18px; flex-shrink: 0; padding-top: 2px; opacity: 0.7; }
.analogy-label { display: block; font-weight: 600; font-size: 11px; color: var(--vp-c-brand); text-transform: uppercase; margin-bottom: 4px; }
.analogy-text { font-size: 15px; line-height: 1.5; color: var(--vp-c-text-2); margin: 0; }
.term-badges { display: flex; flex-wrap: wrap; gap: 6px; justify-content: flex-end; }
.badge { font-size: 10px; padding: 3px 8px; border-radius: 6px; font-weight: 600; text-transform: uppercase; background: #f5f5f7; color: #6e6e73; white-space: nowrap; }

/* Responsive Breakpoints & Platform Logic */
@media (max-width: 1200px) {
  .desktop-only { display: none !important; }
  .app-layout { display: block; }
  .mobile-floating-btn { display: flex; }
  .terms-grid { grid-template-columns: 1fr; } 
  .term-card { border-radius: 16px; }
}

/* Force Mobile Layout on Mobile OS even if resolution is high (e.g. iPad Pro landscape) */
.is-mobile-device .desktop-only { display: none !important; }
.is-mobile-device .app-layout { display: block; }
.is-mobile-device .mobile-floating-btn { display: flex; }
.is-mobile-device .terms-grid { grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); } 
.is-mobile-device .term-card { border-radius: 16px; }


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
