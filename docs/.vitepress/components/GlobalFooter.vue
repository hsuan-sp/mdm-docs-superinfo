<script setup>
/**
 * 全域頁尾元件 (GlobalFooter)
 * 
 * 負責展示公司品牌資訊、服務標章以及版權宣告。
 * 採用簡潔、對稱的佈置，與 Apple 官網的資訊揭露層次保持一致。
 */
import { withBase } from 'vitepress'
</script>

<template>
  <footer class="global-footer" role="contentinfo">
    <!-- 品牌推廣區塊 -->
    <div class="footer-promo">
      <h2 class="company-name">極電資訊有限公司</h2>
      <p class="service-badges">Apple 授權教育經銷商｜Apple 校園體驗中心｜軟硬體專業諮詢</p>
      <a href="https://www.superinfo.com.tw" target="_blank" class="slogan-link" title="前往極電資訊官方網站">
        <p class="slogan">致力於給您最好的服務</p>
      </a>
    </div>

    <div class="divider" role="presentation"></div>

    <!-- 底部版權宣告區塊 -->
    <div class="footer-copyright">
      <p>Copyright ©2026 極電資訊｜Apple 授權教育經銷商</p>
      <p>極電資訊有限公司 | 統一編號 23756990</p>
    </div>
  </footer>
</template>

<style scoped>
/* 
 * 靜態排版與視覺引導 
 * 採用 VP 變數以實現跨主題模式的色調連貫性。
 */
.global-footer {
  background: var(--vp-c-bg-alt);
  padding: 80px 24px 60px;
  text-align: center;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  margin-top: 80px;
}

:global(.dark) .global-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  background: var(--vp-c-bg);
}

.company-name {
  font-size: 20px;
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

.divider {
  height: 1px;
  width: 60px;
  background: var(--vp-c-divider);
  margin: 40px auto;
}

.footer-copyright p {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin: 4px 0;
  font-weight: 400;
}

@media (min-width: 768px) {
  .global-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
