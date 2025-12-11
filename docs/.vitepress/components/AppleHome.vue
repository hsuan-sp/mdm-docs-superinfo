<script setup>
import { useRouter } from 'vitepress'

const router = useRouter()

const navCards = [
  { 
    title: 'Deployment', 
    subtitle: '自動化部署',
    desc: '從開箱到使用的零接觸體驗。', 
    link: '/guide/02-enrollment', 
    bg: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)',
    textColor: '#333',
    class: 'col-span-2 row-span-2 big-card'
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
    class: 'col-span-1 row-span-1'
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
    class: 'col-span-2 dark-card'
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
        <span class="eyebrow">MDM Support Center</span>
        <h1>Designed for <br/>Education.</h1>
        <p class="intro">
          極致簡單的 Apple 裝置管理指南。<br/>
          專為台灣教育現場打造。
        </p>
        <div class="hero-links">
           <a href="/guide/01-account" class="primary-btn">開始探索</a>
           <a href="/glossary" class="text-link">查詢術語表 ›</a>
        </div>
      </div>
      <div class="hero-visual fade-in delay-2">
        <img src="/mdm_hero.png" alt="MDM Abstract Art" />
      </div>
    </header>

    <!-- Masonry Grid -->
    <section class="grid-section">
      <div class="section-header fade-in-on-scroll">
        <h2>探索主題</h2>
        <p>從基礎設定到進階管理，一切盡在掌握。</p>
      </div>
      
      <div class="bento-grid">
        <a 
          v-for="card in navCards" 
          :key="card.link"
          :href="card.link" 
          class="card fade-in-on-scroll"
          :class="[card.class, { 'dark-mode': card.bg === '#1d1d1f' }]"
          :style="{ background: card.bg, color: card.textColor }"
        >
          <div class="card-text">
            <span class="card-subtitle">{{ card.subtitle }}</span>
            <h3>{{ card.title }}</h3>
            <p>{{ card.desc }}</p>
          </div>
          <div class="hover-overlay"></div>
        </a>
      </div>
    </section>

    <!-- Footer Promo -->
    <section class="promo fade-in-on-scroll">
      <div class="promo-content">
        <h2>還在煩惱 MDM？</h2>
        <p>讓我們協助您解決所有疑難雜症。</p>
        <a href="https://www.apple.com/tw/education/" target="_blank" class="apple-link">拜訪 Apple 教育官網 ›</a>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* Fonts & Variables */
.apple-container {
  font-family: "SF Pro Display", "SF Pro Text", system-ui, -apple-system, sans-serif;
  color: #1d1d1f;
  background: #fff;
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
  padding: 120px 24px 60px;
  max-width: 1200px;
  margin: 0 auto;
}

.eyebrow {
  color: #f56300;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 20px;
  display: block;
}

.hero h1 {
  font-size: 80px;
  line-height: 1.05;
  font-weight: 700;
  letter-spacing: -0.015em;
  margin-bottom: 24px;
}

.intro {
  font-size: 24px;
  line-height: 1.4;
  color: #86868b;
  font-weight: 400;
  max-width: 600px;
  margin: 0 auto 40px;
}

.hero-links {
  margin-bottom: 60px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.primary-btn {
  background: #0071e3;
  color: #fff;
  padding: 12px 26px;
  border-radius: 980px;
  font-size: 17px;
  font-weight: 500;
  transition: all 0.2s;
}

.primary-btn:hover {
  background: #0077ed;
  transform: scale(1.02);
}

.text-link {
  color: #0071e3;
  font-size: 17px;
  font-weight: 500;
}

.text-link:hover { text-decoration: underline; }

.hero-visual {
  width: 100%;
  max-width: 1000px;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 40px 80px rgba(0,0,0,0.1);
}

.hero-visual img {
  width: 100%;
  height: auto;
  display: block;
}

/* Grid Section */
.grid-section {
  max-width: 1200px;
  margin: 100px auto 0;
  padding: 0 24px;
}

.section-header {
  margin-bottom: 50px;
  text-align: left;
}

.section-header h2 {
  font-size: 48px;
  font-weight: 700;
}

.section-header p {
  font-size: 21px;
  color: #86868b;
}

/* Bento Grid */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 24px;
}

@media (min-width: 768px) {
  .bento-grid {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(240px, auto);
  }
}

.card {
  border-radius: 28px;
  padding: 40px 30px;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s;
}

.card:hover {
  transform: scale(1.02);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  z-index: 2;
}

.card-subtitle {
  font-size: 12px;
  font-weight: 600;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: block;
  margin-bottom: 8px;
}

.card h3 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 12px;
  line-height: 1.1;
}

.card p {
  font-size: 17px;
  font-weight: 500;
  opacity: 0.9;
  line-height: 1.4;
  max-width: 80%;
}

.col-span-2 { grid-column: span 1; }
.row-span-2 { grid-row: span 1; min-height: 400px; }

@media (min-width: 768px) {
  .col-span-2 { grid-column: span 2; }
  .row-span-2 { grid-row: span 2; }
}

.big-card h3 { font-size: 48px; }

/* Promo */
.promo {
  text-align: center;
  margin-top: 120px;
  padding: 60px 24px;
  background: #f5f5f7;
  border-radius: 24px;
  margin-left: 24px;
  margin-right: 24px;
}

.promo h2 { font-size: 40px; font-weight: 700; margin-bottom: 10px; }
.promo p { font-size: 20px; color: #86868b; margin-bottom: 24px; }
.apple-link { color: #0071e3; font-size: 19px; }

/* Dark Mode Overrides (Basic support) */
@media (prefers-color-scheme: dark) {
  .apple-container { background: #000; color: #f5f5f7; }
  .hero-visual { box-shadow: 0 40px 80px rgba(255,255,255,0.05); }
}
</style>
