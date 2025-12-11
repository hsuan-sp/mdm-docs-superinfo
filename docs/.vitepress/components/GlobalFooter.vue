<script setup>
import { withBase } from 'vitepress'
</script>

<template>
  <footer class="global-footer">
    <!-- Top Promo Section -->
    <div class="footer-promo">
      <h2 class="company-name">極電資訊有限公司</h2>
      <p class="service-badges">Apple 授權教育經銷商｜Apple 校園體驗中心｜軟硬體專業諮詢</p>
      <p class="slogan">致力於給您最好的服務</p>
    </div>

    <div class="divider"></div>

    <!-- Bottom Copyright Section -->
    <div class="footer-copyright">
      <p>Copyright ©2025 極電資訊｜Apple 授權教育經銷商</p>
      <p>極電資訊有限公司 | 統一編號 23756990</p>
    </div>
  </footer>
</template>

<style scoped>
.global-footer {
  background-color: var(--vp-c-bg-alt);
  padding: 60px 24px 40px;
  text-align: center;
  border-top: 1px solid var(--glass-border);
  margin-top: 60px;
}

/* Promo Section */
.footer-promo {
  margin-bottom: 40px;
}

.company-name {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 12px;
  color: var(--vp-c-text-1);
}

.service-badges {
  font-size: 16px;
  color: var(--vp-c-text-2);
  margin: 0 0 8px;
  font-weight: 500;
}

.slogan {
  font-size: 15px;
  color: var(--vp-c-brand-1);
  font-weight: 600;
  opacity: 0.9;
  margin: 0;
}

/* Divider */
.divider {
  height: 1px;
  background: var(--vp-c-divider);
  max-width: 200px;
  margin: 0 auto 30px;
  opacity: 0.5;
}

/* Copyright Section */
.footer-copyright p {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin: 4px 0;
  line-height: 1.5;
}

/* Dark Mode Adjustments */
.dark .global-footer {
  background-color: var(--vp-c-bg);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
