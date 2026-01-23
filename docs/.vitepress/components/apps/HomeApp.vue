<script setup>
import { useData, useRouter, withBase } from "vitepress";
import { onMounted, onUnmounted, computed, ref } from "vue";

const { lang, localePath } = useData();
const router = useRouter();
const isMounted = ref(false);

// Standardized translation object
const t = computed(() => {
  return lang.value === "en-US"
    ? {
        eyebrow: "Superinfo Apple MDM Hub",
        title: "Empowering Education",
        intro1: "MDM Glossary × Expert Q&A",
        intro2: "Professional MDM Guide\nfor Taiwan Education",
        explore: "Get Started",
        searchGlossary: "Search Glossary",
        exploreThemes: "Explore Topics",
        mastery: "From basic setup to advanced management, master it all here.",
      }
    : {
        eyebrow: "Superinfo Apple MDM Hub",
        title: "賦能教育科技",
        intro1: "MDM 術語庫 × 實戰問答集",
        intro2: "台灣教育現場的專業技術指南",
        explore: "開始探索",
        searchGlossary: "查詢術語表",
        exploreThemes: "探索主題",
        mastery: "從基礎設定到進階管理，一切盡在掌握。",
      };
});

// Navigation cards data
const navCards = computed(() => {
  const isEn = lang.value === "en-US";
  const base = isEn ? "/en/" : "/";
  const isZh = lang.value === "zh-TW";

  return [
    {
      title: "Identity",
      subtitle: isZh ? "帳號與身分" : "Account & Identity",
      desc: isZh
        ? "深入了解管理式 Apple ID、聯合驗證與權限委派。"
        : "Learn about Managed Apple IDs, Federated Authentication, and roles.",
      link: `${base}guide/#account`,
      bg: "#F5F5F7",
      textColor: "#1d1d1f",
      icon: "👤",
    },
    {
      title: "Deployment",
      subtitle: isZh ? "零接觸部署" : "Zero-Touch Deployment",
      desc: isZh
        ? "透過 Apple Configurator 與 ADE 達成自動化開箱即用。"
        : "Achieve out-of-the-box automation with Apple Configurator and ADE.",
      link: `${base}guide/#enrollment`,
      bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      textColor: "#fff",
      icon: "📦",
    },
    {
      title: "VPP Apps",
      subtitle: isZh ? "軟體採購" : "Software Procurement",
      desc: isZh
        ? "掌握 App 與圖書的批量授權派發與生命週期管理。"
        : "Master bulk licensing and lifecycle management for apps and books.",
      link: `${base}guide/#apps`,
      bg: "#F5F5F7",
      textColor: "#1d1d1f",
      icon: "📱",
    },
    {
      title: "Classroom",
      subtitle: isZh ? "課堂教學" : "Classroom Instruction",
      desc: isZh
        ? "賦能教師掌握即時畫面控管、文件傳送與數位互動。"
        : "Empower teachers with screen monitoring, file sharing, and interaction.",
      link: `${base}guide/#classroom`,
      bg: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
      textColor: "#1d1d1f",
      icon: "🍎",
    },
    {
      title: "Education",
      subtitle: isZh ? "方案規範" : "Project Compliance",
      desc: isZh
        ? "接軌教育部專案規範，優化校園數位學習環境。"
        : "Align with MOE technical requirements to optimize digital learning.",
      link: `${base}guide/#digital-learning`,
      bg: "#F5F5F7",
      textColor: "#1d1d1f",
      icon: "🎓",
    },
    {
      title: "Service",
      subtitle: isZh ? "維護報修" : "Maintenance & Repair",
      desc: isZh
        ? "了解硬體保固查詢、維修流程與備機管理策略。"
        : "Hardware warranty checks, repair flows, and loaner management.",
      link: `${base}guide/#hardware`,
      bg: "#F5F5F7",
      textColor: "#1d1d1f",
      icon: "🔧",
    },
    {
      title: "macOS",
      subtitle: isZh ? "電腦管理" : "Mac Management",
      desc: isZh
        ? "針對 Mac 的專屬組態描述檔與安全性原則管理。"
        : "Configuration profiles and security policy management for Mac.",
      link: `${base}guide/#mac`,
      bg: "linear-gradient(135deg, #434343 0%, #000000 100%)",
      textColor: "#f5f5f7",
      icon: "💻",
    },
    {
      title: "Scenarios",
      subtitle: isZh ? "情境實戰" : "Practical Q&A",
      desc: isZh
        ? "集結第一線網管與教師的高頻率常見問題答集。"
        : "Frequently asked questions from on-site IT admins and teachers.",
      link: `${base}guide/#qa-education`,
      bg: "#F5F5F7",
      textColor: "#1d1d1f",
      icon: "🏫",
    },
    {
      title: "Glossary",
      subtitle: isZh ? "零知識術語表" : "Glossary",
      desc: isZh
        ? "從專有名詞到白話文翻譯，讓您輕鬆讀懂裝置管理。"
        : "From technical terms to plain English, master the MDM lingo.",
      link: `${base}glossary`,
      bg: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      textColor: "#1d1d1f",
      icon: "📖",
    },
  ];
});

// Unified navigation handler
const handleNavigate = (link) => {
  if (typeof window === "undefined") return;
  const target = withBase(link);
  router.go(target);
};

onMounted(() => {
  isMounted.value = true;
  document.body.classList.add("is-home");

  setTimeout(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("is-visible");
            }, index * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    document.querySelectorAll(".fade-in-on-scroll").forEach((el) => {
      observer.observe(el);
    });
  }, 100);
});

onUnmounted(() => {
  if (typeof document !== "undefined") {
    document.body.classList.remove("is-home");
  }
});
</script>

<template>
  <div class="apple-container">
    <div v-if="isMounted">
      <!-- Hero Section -->
      <header class="hero">
        <div class="hero-content fade-in-up">
          <span class="eyebrow">{{ t.eyebrow }}</span>
          <h1 style="white-space: pre-line">{{ t.title }}</h1>
          <p class="intro">
            {{ t.intro1 }}<br />
            {{ t.intro2 }}
          </p>
          <div class="hero-links">
            <a
              :href="withBase((lang === 'en-US' ? '/en/' : '/') + 'guide/')"
              class="primary-btn"
              @click.prevent="
                handleNavigate((lang === 'en-US' ? '/en/' : '/') + 'guide/')
              "
            >
              {{ t.explore }}
              <span class="btn-icon" aria-hidden="true">→</span>
            </a>
            <a
              :href="withBase((lang === 'en-US' ? '/en/' : '/') + 'glossary')"
              class="text-link"
              @click.prevent="
                handleNavigate((lang === 'en-US' ? '/en/' : '/') + 'glossary')
              "
            >
              {{ t.searchGlossary }}
              <span aria-hidden="true">›</span>
            </a>
          </div>
        </div>
      </header>

      <!-- Grid Section -->
      <section class="grid-section">
        <div class="section-header fade-in-on-scroll">
          <h2>{{ t.exploreThemes }}</h2>
          <p>{{ t.mastery }}</p>
        </div>

        <div class="cards-grid">
          <a
            v-for="card in navCards"
            :key="card.link"
            :href="withBase(card.link)"
            class="card fade-in-on-scroll"
            @click.prevent="handleNavigate(card.link)"
            :style="{ background: card.bg, color: card.textColor }"
            :aria-label="
              (lang === 'zh-TW' ? '前往 ' : 'Go to ') + card.subtitle
            "
          >
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

    <!-- Loading State -->
    <div v-else class="home-loading">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<style scoped>
.home-loading {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--vp-c-brand-soft);
  border-top-color: var(--vp-c-brand-1);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Modern CSS Variables & Base */
.apple-container {
  font-family: var(--vp-font-family-base);
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  min-height: 100vh;
  isolation: isolate;
}

/* Enhanced Animations with reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

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

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.fade-in-up {
  animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
}

/* Scroll-triggered fade-in with stagger */
.fade-in-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.8s cubic-bezier(0.2, 0, 0.2, 1),
    transform 0.8s cubic-bezier(0.2, 0, 0.2, 1);
}

.fade-in-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: clamp(80px, 15vh, 140px) clamp(20px, 5vw, 48px)
    clamp(60px, 10vh, 100px);
  max-width: 1400px;
  margin: 0 auto;
}

.eyebrow {
  color: #f56300;
  font-weight: 700;
  font-size: clamp(11px, 1.1vw, 13px);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 24px;
  display: block;
  animation: fadeIn 0.8s ease-out;
}

.hero h1 {
  font-size: clamp(40px, 7vw, 84px);
  line-height: 1.2;
  font-weight: 800;
  letter-spacing: -0.025em;
  margin-bottom: 24px;
  white-space: pre-wrap;
  background: linear-gradient(
    135deg,
    var(--vp-c-text-1) 0%,
    var(--vp-c-brand-1) 100%
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 0.1em 0;
  margin-top: -0.1em;
}

.intro {
  font-size: clamp(18px, 2vw, 24px);
  line-height: 1.5;
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
  padding: 18px 42px;
  border-radius: 980px;
  font-size: 19px;
  font-weight: 700;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 12px 32px rgba(0, 113, 227, 0.35);
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.primary-btn:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 20px 48px rgba(0, 113, 227, 0.45);
}

.btn-icon {
  display: inline-block;
  transition: transform 0.3s;
}

.primary-btn:hover .btn-icon {
  transform: translateX(6px);
}

.text-link {
  color: var(--vp-c-text-2);
  font-size: 16px;
  font-weight: 500;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  text-decoration: none;
  opacity: 0.85;
}

.text-link:hover {
  color: var(--vp-c-brand-1);
  opacity: 1;
}

.grid-section {
  max-width: 1400px;
  margin: clamp(80px, 15vh, 160px) auto 0;
  padding: 0 clamp(20px, 5vw, 48px);
}

.section-header {
  margin-bottom: 60px;
  text-align: left;
  max-width: 800px;
}

.section-header h2 {
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
  gap: 24px;
}

@media (min-width: 960px) {
  .cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

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
  transition:
    transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1),
    box-shadow 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12);
}

.card-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.card-subtitle {
  font-size: 12px;
  font-weight: 700;
  opacity: 0.7;
  text-transform: uppercase;
  margin-bottom: 12px;
  display: block;
}

.card h3 {
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 12px;
  line-height: 1.2;
}

.card p {
  font-size: 15px;
  font-weight: 500;
  opacity: 0.85;
  line-height: 1.5;
}

.card-arrow {
  font-size: 24px;
  align-self: flex-end;
  opacity: 0;
  transform: translateX(-15px);
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.card:hover .card-arrow {
  opacity: 0.9;
  transform: translateX(0);
}

@media (max-width: 640px) {
  .hero {
    padding-top: 60px;
  }

  .hero-links {
    flex-direction: column;
    width: 100%;
  }

  .primary-btn,
  .text-link {
    width: 100%;
    justify-content: center;
  }

  .section-header {
    text-align: center;
  }

  .cards-grid {
    gap: 16px;
  }

  .card {
    min-height: 240px;
    padding: 24px;
  }
}
</style>
