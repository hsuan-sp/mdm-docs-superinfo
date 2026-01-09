<script setup>
import { withBase } from 'vitepress'
</script>

<template>
  <footer class="global-footer" role="contentinfo">
    <!-- Top Promo Section -->
    <div class="footer-promo">
      <h2 class="company-name">極電資訊有限公司</h2>
      <p class="service-badges">Apple 授權教育經銷商｜Apple 校園體驗中心｜軟硬體專業諮詢</p>
      <p class="slogan">致力於給您最好的服務</p>
    </div>

    <div class="divider" role="presentation"></div>

    <!-- Bottom Copyright Section -->
    <div class="footer-copyright">
      <p>Copyright ©2026 極電資訊｜Apple 授權教育經銷商</p>
      <p>極電資訊有限公司 | 統一編號 23756990</p>
    </div>
  </footer>
</template>

<style scoped>
@keyframes fadeInFooter {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.global-footer {
  background-color: var(--vp-c-bg-alt);
  padding: 60px 24px 40px;
  text-align: center;
  border-top: 1px solid var(--glass-border);
  margin-top: 60px;
  position: relative;
  z-index: 200;
  animation: fadeInFooter 0.8s ease-out;
}

/* Promo Section */
.footer-promo {
  margin-bottom: 40px;
}

.company-name {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 16px;
  color: var(--vp-c-text-1);
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
}

.service-badges {
  font-size: 16px;
  color: var(--vp-c-text-2);
  margin: 0 0 12px;
  font-weight: 500;
  line-height: 1.6;
  transition: color 0.3s ease;
}

.slogan {
  font-size: 16px;
  color: var(--vp-c-brand-1);
  font-weight: 600;
  opacity: 0.95;
  margin: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
  display: inline-block;
}

.slogan:hover {
  opacity: 1;
  transform: scale(1.05);
}

/* Divider */
.divider {
  height: 2px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    var(--vp-c-brand-1) 50%, 
    transparent 100%);
  max-width: 200px;
  margin: 0 auto 30px;
  opacity: 0.3;
  transition: opacity 0.3s ease;
}

.global-footer:hover .divider {
  opacity: 0.6;
}

/* Copyright Section */
.footer-copyright p {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin: 6px 0;
  line-height: 1.6;
  transition: color 0.3s ease;
}

.footer-copyright p:hover {
  color: var(--vp-c-text-2);
}

/* Dark Mode Adjustments */
.dark .global-footer {
  background-color: var(--vp-c-bg);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
