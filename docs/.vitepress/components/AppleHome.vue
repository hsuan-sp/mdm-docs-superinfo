<script setup>
/**
 * 專案首頁核心元件 (Apple Inspiration Home)
 * 
 * 本元件採用 Apple 官方設計規範，結合高階動效與網格佈局，
 * 旨在為使用者提供沉浸式的 MDM 知識庫導向體驗。
 * 
 * 核心功能：
 * 1. 視覺引航：Hero 視覺區塊搭配精心調校的 fadeInUp 動畫。
 * 2. 位置感應：使用 IntersectionObserver 監控區塊捲動，觸發交錯進場動畫。
 * 3. 分類導覽：利用互動卡片引導使用者進入帳號、部署、App 等不同維管章節。
 */
import { useRouter, withBase } from 'vitepress'
import { onMounted, onUnmounted } from 'vue'

const router = useRouter()

onMounted(() => {
  // 為 Body 添加首頁標記，便於全域 CSS 進行特定首頁樣式微調
  document.body.classList.add('is-home')

  /**
   * 初始化捲動監測觀察器
   * 透過 IntersectionObserver API 監控標有 .fade-in-on-scroll 的元素。
   * 當元素進入視窗閾值時，依序添加 is-visible Class 觸發平滑過度。
   */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // 利用 setTimeout 達成視覺上的「連鎖交錯 (Stagger)」感
          setTimeout(() => {
            entry.target.classList.add('is-visible')
          }, index * 80)

          // 動畫執行後即移除觀察，節省客戶端渲染資源
          observer.unobserve(entry.target)
        }
      });
    },
    {
      threshold: 0.1,    // 元素出現 10% 時觸發
      rootMargin: '50px' // 預留空間，確保在使用者看到前就開始動畫
    }
  )

  document.querySelectorAll('.fade-in-on-scroll').forEach((el) => {
    observer.observe(el)
  })
})

onUnmounted(() => {
  // 元件卸載時清除首頁標記，避免影響其他子頁面佈局
  document.body.classList.remove('is-home')
})

/**
 * 導覽分集卡片設定資料
 * 定義了首頁網格系統顯示的主題、色彩、連結與圖示。
 * 每個卡片都對應知識庫中的一個核心維管維度。
 */
const navCards = [
  {
    title: 'Identity',
    subtitle: '帳號與身分',
    desc: '深入了解管理式 Apple ID、聯合驗證與權限委派。',
    link: '/guide/#account',
    bg: '#F5F5F7',
    textColor: '#1d1d1f',
    icon: '👤'
  },
  {
    title: 'Deployment',
    subtitle: '零接觸部署',
    desc: '透過 Apple Configurator 與 ADE 達成自動化開箱即用。',
    link: '/guide/#enrollment',
    bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    textColor: '#fff',
    icon: '📦'
  },
  {
    title: 'VPP Apps',
    subtitle: '軟體採購',
    desc: '掌握 App 與圖書的批量授權派發與生命週期管理。',
    link: '/guide/#apps',
    bg: '#F5F5F7',
    textColor: '#1d1d1f',
    icon: '📱'
  },
  {
    title: 'Classroom',
    subtitle: '課堂教學',
    desc: '賦能教師掌握即時畫面控管、文件傳送與數位互動。',
    link: '/guide/#classroom',
    bg: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
    textColor: '#1d1d1f',
    icon: '🍎'
  },
  {
    title: 'Education',
    subtitle: '方案規範',
    desc: '接軌教育部專案規範，優化校園數位學習環境。',
    link: '/guide/#digital',
    bg: '#F5F5F7',
    textColor: '#1d1d1f',
    icon: '🎓'
  },
  {
    title: 'Service',
    subtitle: '維護報修',
    desc: '了解硬體保固查詢、維修流程與備機管理策略。',
    link: '/guide/#hardware',
    bg: '#F5F5F7',
    textColor: '#1d1d1f',
    icon: '🔧'
  },
  {
    title: 'macOS',
    subtitle: '電腦管理',
    desc: '針對 Mac 的專屬組態描述檔與安全性原則管理。',
    link: '/guide/#mac',
    bg: 'linear-gradient(135deg, #434343 0%, #000000 100%)',
    textColor: '#f5f5f7',
    icon: '💻'
  },
  {
    title: 'Scenarios',
    subtitle: '情境實戰',
    desc: '集結第一線網管與教師的高頻率常見問題集 (FAQ)。',
    link: '/guide/#education',
    bg: '#F5F5F7',
    textColor: '#1d1d1f',
    icon: '🏫'
  },
  {
    title: 'Glossary',
    subtitle: '零知識術語表',
    desc: '從專有名詞到白話文翻譯，讓您輕鬆讀懂裝置管理。',
    link: '/glossary',
    bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    textColor: '#1d1d1f',
    icon: '📖'
  }
]
</script>

<template>
  <div class="apple-container">

    <!-- Hero 核心視覺區：強調品牌氛圍與關鍵動效 -->
    <header class="hero">
      <div class="hero-content fade-in-up">
        <span class="eyebrow">Superinfo Apple MDM Hub</span>
        <h1>Empowering <br />Education.</h1>
        <p class="intro">
          專為台灣教育現場打造。<br />
          極致簡單的 Apple 裝置管理知識庫。
        </p>
        <div class="hero-links">
          <!-- 跳轉至完整指南頁面 -->
          <a :href="withBase('/guide/')" class="primary-btn">
            開始探索指南
            <span class="btn-icon" aria-hidden="true">→</span>
          </a>
          <!-- 跳轉至專業術語解密頁面 -->
          <a :href="withBase('/glossary')" class="text-link">
            查詢術語表
            <span aria-hidden="true">›</span>
          </a>
        </div>
      </div>
    </header>

    <!-- 主題網格展示區：根據維管維度自動擴展 -->
    <section class="grid-section">
      <div class="section-header fade-in-on-scroll">
        <h2>深度主題探索</h2>
        <p>從基礎部署設定到校園情境實戰，專家知識一覽無遺。</p>
      </div>

      <div class="cards-grid">
        <a v-for="card in navCards" :key="card.link" :href="withBase(card.link)" class="card fade-in-on-scroll"
          :style="{ background: card.bg, color: card.textColor }" :aria-label="`前往 ${card.subtitle} 章節`">
          <div class="card-icon" aria-hidden="true">{{ card.icon }}</div>
          <div class="card-text">
            <span class="card-subtitle">{{ card.subtitle }}</span>
            <h3>{{ card.title }}</h3>
            <p>{{ card.desc }}</p>
          </div>
          <div class="card-arrow" aria-hidden="true">→</div>
        </a>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* 
 * 核心樣式系統 (Aesthetic Design System)
 * 使用 clamp() 實現動態響應式排版，確保在跨裝置顯示下始終保持 Apple 風格的呼吸感。
 */
.apple-container {
  font-family: var(--vp-font-family-base);
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  min-height: 100vh;
  isolation: isolate;
}

/* 輔助性功能：針對減少動態效果設定的使用者最佳化 */
@media (prefers-reduced-motion: reduce) {

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* 核心關鍵字動畫 (Keyframes) */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
}

/* 捲動感應樣式：提供平展過渡效果 */
.fade-in-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.2, 0, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0, 0.2, 1);
}

.fade-in-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* 響應式 Hero 排版 */
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: clamp(80px, 15vh, 140px) clamp(20px, 5vw, 48px);
  max-width: 1400px;
  margin: 0 auto;
}

.hero h1 {
  font-size: clamp(40px, 7vw, 84px);
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.2;
  background: linear-gradient(135deg, var(--vp-c-text-1) 0%, var(--vp-c-brand-1) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 高質感卡片樣式：結合懸浮投影與微縮放 */
.card {
  border-radius: 24px;
  padding: 32px;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 280px;
  will-change: transform, box-shadow;
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12);
}
</style>
