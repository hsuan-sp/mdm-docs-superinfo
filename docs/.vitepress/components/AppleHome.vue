<script setup>
import { useRouter, withBase } from 'vitepress'
import { onMounted } from 'vue'

const router = useRouter()

onMounted(() => {
  // Staggered animation for cards
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('is-visible')
          }, index * 100)
        }
      })
    },
    { threshold: 0.1 }
  )

  document.querySelectorAll('.fade-in-on-scroll').forEach((el) => {
    observer.observe(el)
  })
})

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
        <img :src="withBase('/mdm_hero_premium.png')" alt="MDM Abstract Art with iPad" />
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

  </div>
</template>

<style scoped>
/* Fonts & Variables */
.apple-container {
  font-family: var(--vp-font-family-base);
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  min-height: 100vh;
}

/* Enhanced Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 0.6;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}

.fade-in-up { 
  animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
  opacity: 0; 
}

.fade-in { 
  animation: fadeIn 1.5s ease-out forwards; 
  opacity: 0; 
}

.delay-2 { animation-delay: 0.3s; }

/* Scroll-triggered fade-in with stagger */
.fade-in-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), 
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-in-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

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
  animation: fadeIn 0.8s ease-out;
}

.hero h1 {
  font-size: clamp(48px, 5vw, 84px);
  line-height: 1.05; 
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 24px;
  white-space: pre-wrap;
  background: linear-gradient(135deg, var(--vp-c-text-1) 0%, var(--vp-c-brand-1) 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
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
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 16px rgba(0, 113, 227, 0.3);
  position: relative;
  overflow: hidden;
}

.primary-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.primary-btn:hover::before {
  width: 300px;
  height: 300px;
}

.primary-btn:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 12px 32px rgba(0, 113, 227, 0.5);
}

.primary-btn:active {
  transform: translateY(-1px) scale(1.02);
}

.text-link {
  color: var(--vp-c-brand-1);
  font-size: 17px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
}

.text-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--vp-c-brand-1);
  transition: width 0.3s ease;
}

.text-link:hover::after {
  width: 100%;
}

.text-link:hover { 
  color: var(--vp-c-brand-2);
  transform: translateX(5px);
}

.hero-visual {
  width: 100%;
  max-width: 1000px;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
  border: 1px solid rgba(0,0,0,0.05);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.hero-visual:hover {
  transform: scale(1.02);
  box-shadow: 0 30px 80px rgba(0,0,0,0.2);
}

.hero-visual img {
  width: 100%;
  height: auto;
  display: block;
  transform: scale(1.01);
  transition: transform 0.6s ease;
}

.hero-visual:hover img {
  transform: scale(1.05);
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

/* Responsive Grid */
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

/* Enhanced Cards */
.card {
  border-radius: 28px;
  padding: 40px 32px;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 320px;
  background: var(--vp-c-bg-alt);
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  border: 1px solid transparent;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.card:hover::before {
  opacity: 1;
}

.card:not(.dark-mode) {
  background: #ffffff;
}

.card:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 28px 60px rgba(0,0,0,0.15);
  z-index: 2;
}

.card:active {
  transform: translateY(-4px) scale(1.01);
}

.card-text {
  z-index: 1;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.card:hover .card-text {
  transform: translateY(-5px);
}

.card-subtitle {
  font-size: 12px;
  font-weight: 600;
  opacity: 0.6;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: block;
  margin-bottom: 12px;
  transition: all 0.3s ease;
}

.card:hover .card-subtitle {
  opacity: 0.9;
  letter-spacing: 0.1em;
}

.card h3 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 1.1;
  letter-spacing: -0.01em;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.card:hover h3 {
  transform: scale(1.05);
  transform-origin: left;
}

.card p {
  font-size: 17px;
  font-weight: 500;
  opacity: 0.8;
  line-height: 1.5;
  max-width: 90%;
  transition: opacity 0.3s ease;
}

.card:hover p {
  opacity: 1;
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

.promo h2 { 
  font-size: 36px; 
  font-weight: 700; 
  margin-bottom: 16px; 
  letter-spacing: -0.02em; 
}

.promo-subtitle { 
  font-size: 19px; 
  color: var(--vp-c-text-1); 
  margin-bottom: 8px; 
  font-weight: 600; 
  opacity: 0.9; 
}

.promo-desc { 
  font-size: 17px; 
  color: var(--vp-c-text-2); 
  margin-top: 0; 
}

/* Dark Mode Overrides */
@media (prefers-color-scheme: dark) {
  .apple-container { 
    background: #000; 
    color: #f5f5f7; 
  }
  
  .hero-visual { 
    box-shadow: 0 40px 80px rgba(255,255,255,0.05); 
    border-color: rgba(255,255,255,0.1); 
  }
  
  .card { 
    background: #1c1c1e; 
    border-color: rgba(255,255,255,0.05); 
  }
  
  .card:hover {
    box-shadow: 0 28px 60px rgba(255,255,255,0.1);
  }
  
  .promo { 
    background: #1c1c1e; 
  }
}
</style>
