<script setup lang="ts">
import { ref, computed } from "vue";
import { glossaryData } from "../../data/glossary";

const searchQuery = ref("");
const selectedCategory = ref("All");

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
];

const filteredTerms = computed(() => {
  return glossaryData.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.definition.includes(searchQuery.value) ||
      item.analogy.includes(searchQuery.value);
    const matchesCategory =
      selectedCategory.value === "All" ||
      item.category === selectedCategory.value;

    return matchesSearch && matchesCategory;
  });
});

const getCategoryColor = (cat: string) => {
  // Enhanced colors for better contrast and visuals
  const map: Record<string, string> = {
    Core: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300",
    Enrollment: "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-300",
    Apple: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
    Security: "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-300",
    Network: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300",
    Hardware: "bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300",
    Apps: "bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-300",
    Other: "bg-gray-50 text-gray-500 dark:bg-gray-900/30 dark:text-gray-400",
    Education: "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-300",
  };
  return map[cat] || "bg-gray-100 text-gray-600";
};
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
          <h3 class="term-title">{{ item.term }}</h3>
          <span :class="['tag', getCategoryColor(item.category)]">{{ item.category }}</span>
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
}

.glossary-header .subtitle {
  font-size: 21px;
  color: #86868b;
  font-weight: 400;
}

/* Controls */
.controls-wrapper {
  position: sticky;
  top: 20px;
  z-index: 100;
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
  transition: all 0.2s;
}

.pill:hover {
  background: rgba(0,0,0,0.05);
}

.pill.active {
  background: #1d1d1f;
  color: #fff;
  border-color: #1d1d1f;
}

/* Grid */
.term-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.term-card {
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
  border: 1px solid rgba(0,0,0,0.05);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  flex-direction: column;
}

.term-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.08);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 12px;
}

.term-title {
  font-size: 20px;
  font-weight: 700;
  line-height: 1.2;
  color: #1d1d1f;
  margin: 0;
}

.tag {
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
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

.analogy p {
  margin: 0;
  font-size: 14px;
  color: #6e6e73;
  line-height: 1.5;
  font-style: italic;
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
