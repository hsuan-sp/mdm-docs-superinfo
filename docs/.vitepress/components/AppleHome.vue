<script setup>
import { useRouter, withBase } from 'vitepress'

const router = useRouter()

const navCards = [
  { 
    title: 'Deployment', 
    subtitle: '自動化部署',
    desc: '從開箱到使用的零接觸體驗。', 
    link: '/guide/02-enrollment', 
    bg: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)',
    textColor: '#333',
    class: 'col-span-1'
  },
  { 
    title: 'Identity', 
    subtitle: '帳號管理',
    desc: '管理式 Apple ID 與權限。', 
    link: '/guide/01-account', 
    bg: '#F5F5F7',
    textColor: '#1d1d1f',
    class: 'col-span-1'
  },
  { 
    title: 'Apps', 
    subtitle: '應用程式',
    desc: 'VPP 批量採購與派發。', 
    link: '/guide/03-apps', 
    bg: '#F5F5F7',
    textColor: '#1d1d1f',
    class: 'col-span-1'
  },
  { 
    title: 'Classroom', 
    subtitle: '課堂教學',
    desc: '賦能教師的數位教學工具。', 
    link: '/guide/04-classroom', 
    bg: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
    textColor: '#333',
    class: 'col-span-1'
  },
  { 
    title: 'Education', 
    subtitle: '精進方案',
    desc: '教育部專案規範專區。', 
    link: '/guide/05-digital-learning', 
    bg: '#F5F5F7',
    textColor: '#1d1d1f',
    class: 'col-span-1'
  },
  { 
    title: 'Support', 
    subtitle: '硬體維護',
    desc: '保固查詢與報修流程。', 
    link: '/guide/06-hardware', 
    bg: '#F5F5F7',
    textColor: '#1d1d1f',
    class: 'col-span-1'
  },
  { 
    title: 'Mac', 
    subtitle: '電腦管理',
    desc: 'macOS 專屬管理策略。', 
    link: '/guide/07-mac', 
    bg: '#1d1d1f',
    textColor: '#f5f5f7',
    class: 'col-span-1 dark-card'
  },
  { 
    title: 'Scenarios', 
    subtitle: '校園實戰',
    desc: '真實情境 QA 問答集。', 
    link: '/guide/08-education', 
    bg: '#F5F5F7',
    textColor: '#1d1d1f',
    class: 'col-span-1'
  }
]
</script>

<template>
  <div class="apple-container">
    
    <!-- Hero Section -->
    <header class="hero">
      <div class="hero-content fade-in-up">
        <span class="eyebrow">Superinfo Apple MDM Hub</span>
        <h1>Empowering <br/>Education.</h1>
        <p class="intro">
          專為台灣教育現場打造。<br/>
          極致簡單的 Apple 裝置管理知識庫。
        </p>
        <div class="hero-links">
           <a :href="withBase('/guide/01-account')" class="primary-btn">開始探索</a>
           <a :href="withBase('/glossary')" class="text-link">查詢術語表 ›</a>
        </div>
      </div>
      <div class="hero-visual fade-in delay-2">
        <img :src="withBase('/mdm_hero.png')" alt="MDM Abstract Art" />
      </div>
    </header>

    <!-- Grid Section -->
    <section class="grid-section">
      <div class="section-header fade-in-on-scroll">
        <h2>探索主題</h2>
        <p>從基礎設定到進階管理，一切盡在掌握。</p>
      </div>
      
      <div class="cards-grid">
        <a 
          v-for="card in navCards" 
          :key="card.link"
          :href="withBase(card.link)"
          class="card fade-in-on-scroll"
          :class="[card.class, { 'dark-mode': card.bg === '#1d1d1f' }]"
          :style="{ background: card.bg, color: card.textColor }"
        >
          <div class="card-text">
            <span class="card-subtitle">{{ card.subtitle }}</span>
            <h3>{{ card.title }}</h3>
            <p>{{ card.desc }}</p>
          </div>
          <!-- Clickable area is guaranteed by the anchor tag wrapper -->
        </a>
      </div>
    </section>

    <!-- Footer Promo -->
    <section class="promo fade-in-on-scroll">
      <div class="promo-content">
        <h2>極電資訊有限公司</h2>
        <p class="promo-subtitle">Apple 授權教育經銷商｜Apple 校園體驗中心｜軟硬體專業諮詢</p>
        <p class="promo-desc">致力於給您最好的服務</p>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* Fonts & Variables */
.apple-container {
  font-family: var(--vp-font-family-base);
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  min-height: 100vh;
  padding-bottom: 80px;
}

/* Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in-up { animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
.fade-in { animation: fadeIn 1.5s ease-out forwards; opacity: 0; }
.delay-2 { animation-delay: 0.2s; }

/* Hero */
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 140px 24px 80px;
  max-width: 1400px;
  margin: 0 auto;
}

.eyebrow {
  color: #f56300;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 24px;
  display: block;
}

.hero h1 {
  font-size: clamp(48px, 5vw, 84px); /* Responsive Typography */
  line-height: 1.05; 
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 24px;
  white-space: pre-wrap; /* Allow wrapping */
}

.intro {
  font-size: 24px;
  line-height: 1.4;
  color: var(--vp-c-text-2);
  font-weight: 400;
  max-width: 640px;
  margin: 0 auto 48px;
}

.hero-links {
  margin-bottom: 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 24px;
}

.primary-btn {
  background: var(--vp-c-brand-1);
  color: #fff;
  padding: 14px 32px;
  border-radius: 980px;
  font-size: 17px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  box-shadow: 0 4px 12px rgba(0, 113, 227, 0.3);
}

.primary-btn:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 113, 227, 0.4);
}

.text-link {
  color: var(--vp-c-brand-1);
  font-size: 17px;
  font-weight: 500;
  transition: color 0.2s;
}

.text-link:hover { text-decoration: underline; color: var(--vp-c-brand-2); }

.hero-visual {
  width: 100%;
  max-width: 1000px;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: var(--glass-shadow);
  border: 1px solid rgba(0,0,0,0.05);
}

.hero-visual img {
  width: 100%;
  height: auto;
  display: block;
  transform: scale(1.01); /* Prevent anti-aliasing gap lines */
}

/* Grid Section */
.grid-section {
  max-width: 1400px;
  margin: 120px auto 0;
  padding: 0 24px;
}

.section-header {
  margin-bottom: 50px;
  text-align: left;
  max-width: 800px;
}

.section-header h2 {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.1; 
  margin-bottom: 16px;
  letter-spacing: -0.015em;
}

.section-header p {
  font-size: 21px;
  color: var(--vp-c-text-2);
  margin-top: 0;
  line-height: 1.4;
}

/* Responsive Grid - Strict Uniformity */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 24px;
}

@media (min-width: 600px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.card {
  border-radius: 28px;
  padding: 40px 32px;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 320px; /* Taller for elegance */
  background: var(--vp-c-bg-alt);
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  box-shadow: var(--vp-shadow-1);
  border: 1px solid transparent;
}

/* Explicit Light Mode Card bg override if needed */
.card:not(.dark-mode) {
  background: #ffffff;
}

.card:hover {
  transform: scale(1.02);
  box-shadow: 0 24px 48px rgba(0,0,0,0.12);
  z-index: 2;
}

.card-text {
  z-index: 1;
}

.card-subtitle {
  font-size: 12px;
  font-weight: 600;
  opacity: 0.6;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: block;
  margin-bottom: 12px;
}

.card h3 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 1.1;
  letter-spacing: -0.01em;
}

.card p {
  font-size: 17px;
  font-weight: 500;
  opacity: 0.8;
  line-height: 1.5;
  max-width: 90%;
}

/* Promo */
.promo {
  text-align: center;
  margin-top: 140px;
  padding: 80px 24px;
  background: var(--vp-c-bg-alt);
  border-radius: 32px;
  margin-left: 24px;
  margin-right: 24px;
}

.promo h2 { font-size: 36px; font-weight: 700; margin-bottom: 16px; letter-spacing: -0.02em; }
.promo-subtitle { font-size: 19px; color: var(--vp-c-text-1); margin-bottom: 8px; font-weight: 600; opacity: 0.9; }
.promo-desc { font-size: 17px; color: var(--vp-c-text-2); margin-top: 0; }

/* Dark Mode Overrides */
@media (prefers-color-scheme: dark) {
  .apple-container { background: #000; color: #f5f5f7; }
  .hero-visual { box-shadow: 0 40px 80px rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); }
  .card { background: #1c1c1e; border-color: rgba(255,255,255,0.05); }
  .promo { background: #1c1c1e; }
}
</style>
