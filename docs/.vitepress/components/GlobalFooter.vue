<script setup>
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'

const { lang } = useData()

const t = computed(() => {
  return lang.value === 'zh-TW' ? {
    company: '極電資訊有限公司',
    badges: 'Apple 授權教育經銷商｜Apple 校園體驗中心｜軟硬體專業諮詢',
    slogan: '致力於給您最好的服務',
    copyright: 'Copyright ©2026 極電資訊｜Apple 授權教育經銷商',
    info: '極電資訊有限公司 | 統一編號 23756990'
  } : {
    company: 'Superinfo Computer Co., Ltd.',
    badges: 'Apple Authorized Education Specialist｜Apple Campus Experience Center｜Hardware & Software Advisory',
    slogan: 'Committed to excellence in service',
    copyright: 'Copyright © 2026 Superinfo｜Apple Authorized Education Specialist',
    info: 'Superinfo Computer Co., Ltd. | Tax ID 23756990'
  }
})
</script>

<template>
  <footer class="global-footer" role="contentinfo">
    <!-- Top Promo Section -->
    <div class="footer-promo">
      <h2 class="company-name">{{ t.company }}</h2>
      <p class="service-badges">{{ t.badges }}</p>
      <a href="https://www.superinfo.com.tw" target="_blank" class="slogan-link"
        title="Visit Superinfo Official Website">
        <p class="slogan">{{ t.slogan }}</p>
      </a>
    </div>

    <div class="divider" role="presentation"></div>

    <!-- Bottom Copyright Section -->
    <div class="footer-copyright">
      <p>{{ t.copyright }}</p>
      <p>{{ t.info }}</p>
    </div>
  </footer>
</template>

<style scoped>
.global-footer {
  background: var(--vp-c-bg-alt);
  padding: 80px 24px 60px;
  text-align: center;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  /* Softer border */
  margin-top: 80px;
}

:global(.dark) .global-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  background: var(--vp-c-bg);
  /* Blend with background in dark mode */
}

/* Typography */
.company-name {
  font-size: 20px;
  /* Reduced from 28px for elegance */
  font-weight: 700;
  margin: 0 0 12px;
  color: var(--vp-c-text-1);
  letter-spacing: -0.01em;
}

.service-badges {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0 0 24px;
  font-weight: 400;
}

.slogan-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 20px;
  background: var(--vp-c-bg-soft);
  transition: all 0.2s ease;
}

.slogan {
  font-size: 14px;
  color: var(--vp-c-brand-1);
  font-weight: 500;
  margin: 0;
}

.slogan-link:hover {
  background: var(--vp-c-brand-soft);
  transform: translateY(-1px);
}

/* Subtle Divider */
.divider {
  height: 1px;
  width: 60px;
  background: var(--vp-c-divider);
  margin: 40px auto;
}

/* Copyright */
.footer-copyright p {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin: 4px 0;
  font-weight: 400;
}

/* Responsive */
@media (min-width: 768px) {
  .global-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
