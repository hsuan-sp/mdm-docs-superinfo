<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { glossaryData } from "../../data/glossary";

type CategoryType = "Core" | "Enrollment" | "Apple" | "Security" | "Network" | "Hardware" | "Apps" | "Other" | "Education" | "macOS" | "Jamf";

const searchQuery = ref("");
const selectedCategory = ref<CategoryType | "All">("All");
const sortOrder = ref<'asc' | 'desc'>('asc'); // 新增排序狀態

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

// Instant animation on scroll
onMounted(() => {
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
      <h1>MDM Zero-Knowledge Glossary</h1>
      <p class="subtitle">從專有名詞到白話文翻譯，讓您輕鬆讀懂裝置管理。</p>
    </header>

    <!-- Sticky Controls -->
    <div class="controls-wrapper">
      <div class="controls glass-effect">
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
          <!-- 排序按鈕 -->
          <button
            @click="toggleSort"
            class="sort-button"
            :title="sortOrder === 'asc' ? '目前：A-Z 順序 (點擊切換為 Z-A)' : '目前：Z-A 倒序 (點擊切換為 A-Z)'"
          >
            <svg v-if="sortOrder === 'asc'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 5h10M11 9h7M11 13h4M3 17l3 3 3-3M6 18V4"/>
            </svg>
            <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 5h10M11 9h7M11 13h4M3 7l3-3 3 3M6 6v14"/>
            </svg>
            <span class="sort-label">{{ sortOrder === 'asc' ? 'A-Z' : 'Z-A' }}</span>
          </button>
        </div>

        <div class="category-pills">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="selectedCategory = cat"
            :class="['pill', { active: selectedCategory === cat }]"
          >
            {{ cat }}
          </button>
        </div>
      </div>
    </div>

    <!-- Results Grid -->
    <div class="term-grid">
      <div
        v-for="(item, index) in filteredTerms"
        :key="index"
        class="term-card"
      >
        <div class="card-header">
          <div class="header-top">
            <div class="category-badges">
              <span 
                v-for="cat in (Array.isArray(item.category) ? item.category : [item.category])" 
                :key="cat"
                :class="['badge', getCategoryColor(cat)]"
              >
                {{ cat }}
              </span>
            </div>
          </div>
          <h3 class="term-title">{{ item.term }}</h3>
        </div>

        <div class="card-body">
          <div class="section definition">
            <p>{{ item.definition }}</p>
          </div>

          <div class="section analogy">
            <span class="emoji">💡</span>
            <p>{{ item.analogy }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredTerms.length === 0" class="no-results">
      <div class="no-content-icon">🔍</div>
      <p>找不到符合的術語，試試其他關鍵字？</p>
    </div>
  </div>
</template>

<style scoped>
.glossary-app {
  padding: 40px 24px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

/* Header */
.glossary-header {
  text-align: center;
  margin-bottom: 60px;
}

.glossary-header h1 {
  font-size: 48px;
  font-weight: 700;
  letter-spacing: -0.015em;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #1d1d1f 0%, #434344 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.3; /* Increased to prevent clipping */
  padding-bottom: 4px; /* Safety padding */
  padding-top: 4px; /* Safety padding */
}

.glossary-header .subtitle {
  font-size: 21px;
  color: #86868b;
  font-weight: 400;
}

/* Controls */
.controls-wrapper {
  position: sticky;
  top: 80px;
  z-index: 20;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
}

.controls {
  padding: 20px;
  border-radius: 24px;
  width: 100%;
  max-width: 800px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  box-shadow: 0 10px 40px rgba(0,0,0,0.08);
  border: 1px solid rgba(255,255,255,0.4);
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.3s ease;
}

.search-box {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #86868b;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 14px 16px 14px 48px;
  border-radius: 12px;
  border: 1px solid transparent;
  background: rgba(0,0,0,0.05);
  color: #1d1d1f;
  font-size: 17px;
  transition: all 0.2s;
}

.search-input:focus {
  background: #fff;
  box-shadow: 0 0 0 4px rgba(0,125,250,0.2);
  outline: none;
}

.sort-button {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,0.1);
  background: rgba(0,0,0,0.03);
  color: #515154;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 13px;
  font-weight: 500;
}

.sort-button:hover {
  background: rgba(0,0,0,0.06);
  border-color: rgba(0,0,0,0.15);
}

.sort-button svg {
  width: 16px;
  height: 16px;
}

.sort-label {
  font-weight: 600;
  letter-spacing: 0.5px;
}

.category-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.pill {
  padding: 8px 16px;
  border-radius: 980px;
  border: 1px solid rgba(0,0,0,0.1);
  background: transparent;
  font-size: 14px;
  font-weight: 500;
  color: #515154;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
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
  background: rgba(0,0,0,0.05);
  transform: translate(-50%, -50%);
  transition: width 0.4s, height 0.4s;
}

.pill:hover::before {
  width: 200px;
  height: 200px;
}

.pill:hover {
  background: rgba(0,0,0,0.05);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.pill:active {
  transform: translateY(0) scale(0.98);
}

.pill.active {
  background: #1d1d1f;
  color: #fff;
  border-color: #1d1d1f;
  box-shadow: 0 4px 16px rgba(29, 29, 31, 0.3);
  transform: scale(1.05);
}

.pill.active:hover {
  box-shadow: 0 6px 20px rgba(29, 29, 31, 0.4);
}

/* Grid */
.term-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

/* Enhanced Card Animations */
.term-card {
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
  border: 1px solid rgba(0,0,0,0.05);
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  flex-direction: column;
  opacity: 0;
  transform: translateY(30px) scale(0.95);
  position: relative;
  overflow: hidden;
}

.term-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 113, 227, 0.05) 0%, rgba(0, 113, 227, 0) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.term-card.card-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.term-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 16px 40px rgba(0,0,0,0.12);
  border-color: rgba(0, 113, 227, 0.2);
}

.term-card:hover::before {
  opacity: 1;
}

.card-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.term-title {
  font-size: 20px;
  font-weight: 700;
  line-height: 1.3;
  color: #1d1d1f;
  margin: 0;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.definition p {
  font-size: 15px;
  line-height: 1.5;
  color: #424245;
  margin: 0;
}

.analogy {
  display: flex;
  gap: 12px;
  background: #fbfbfd;
  padding: 14px;
  border-radius: 12px;
  align-items: flex-start;
}

.analogy .emoji {
  font-size: 18px;
  margin-top: 1px;
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

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .glossary-header h1 {
    background: linear-gradient(135deg, #fff 0%, #aeb0b2 100%);
    -webkit-background-clip: text;
    background-clip: text;
  }
  
  .controls {
    background: rgba(28, 28, 30, 0.8);
    border-color: rgba(255,255,255,0.1);
  }
  
  .search-input {
    background: rgba(255,255,255,0.1);
    color: #fff;
  }
  
  .search-input:focus {
    background: #000;
  }
  
  .search-icon { color: #a1a1a6; }
  
  .sort-button {
    background: rgba(255,255,255,0.08);
    border-color: rgba(255,255,255,0.1);
    color: #a1a1a6;
  }
  
  .sort-button:hover {
    background: rgba(255,255,255,0.12);
    border-color: rgba(255,255,255,0.15);
  }
  
  .pill {
    color: #a1a1a6;
    border-color: rgba(255,255,255,0.1);
  }
  
  .pill:hover { background: rgba(255,255,255,0.1); }
  
  .pill.active {
    background: #fff;
    color: #000;
  }
  
  .term-card {
    background: #1c1c1e;
    border-color: rgba(255,255,255,0.05);
  }
  
  .term-title { color: #f5f5f7; }
  .definition p { color: #d2d2d7; }
  
  .analogy {
    background: rgba(255,255,255,0.05);
  }
  
  .analogy p { color: #a1a1a6; }
}
</style>
