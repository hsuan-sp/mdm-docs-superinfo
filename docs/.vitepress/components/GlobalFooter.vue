<script setup>
import { withBase } from 'vitepress'
</script>

<template>
  <footer class="global-footer fade-in-on-scroll">
    <div class="footer-content">
      <div class="footer-columns">
        <div class="footer-col">
          <h3>極電資訊 Superinfo</h3>
          <p>專為台灣教育打造的 MDM 知識庫。<br>Apple 授權教育經銷商。</p>
        </div>
        <div class="footer-col">
          <h3>常用連結</h3>
          <ul>
            <li><a href="https://www.superinfo.com.tw" target="_blank">極電資訊官網 ↗</a></li>
            <li><a href="https://www.apple.com/tw/education/" target="_blank">Apple 教育官網 ↗</a></li>
            <li><a href="https://school.apple.com/" target="_blank">Apple School Manager ↗</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h3>服務支援</h3>
          <ul>
            <li><a href="https://page.line.me/xat.0000119425.rpn?openQrModal=true" target="_blank">LINE 官方客服</a></li>
            <li><a href="mailto:support@superinfo.com.tw">Email 聯絡我們</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 極電資訊有限公司 Superinfo Co., Ltd. All Rights Reserved.</p>
        <p class="disclaimer">本站內容僅供教學參考，商標權歸屬原公司所有。</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.global-footer {
  border-top: 1px solid var(--vp-c-divider);
  padding: 64px 24px 48px;
  background: var(--vp-c-bg-alt);
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 64px;
}

.footer-col h3 {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 24px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.footer-col p {
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.6;
}

.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-col li {
  margin-bottom: 12px;
}

.footer-col a {
  color: var(--vp-c-text-2);
  font-size: 14px;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-col a:hover {
  color: var(--vp-c-brand-1);
}

.footer-bottom {
  text-align: center;
  padding-top: 32px;
  border-top: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-3);
  font-size: 12px;
}

.footer-bottom p {
  margin: 4px 0;
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  .global-footer {
    background: #1c1c1e; /* Match pure dark mode bg */
  }
}
</style>
