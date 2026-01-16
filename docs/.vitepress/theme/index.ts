/**
 * VitePress 主題進入點 (Theme Entry)
 * 
 * 本檔案負責擴充預設主題、註冊全域元件並掛載自定義佈向插槽。
 */
import { h } from 'vue'
import Theme from 'vitepress/theme'
import type { EnhanceAppContext } from 'vitepress'
import './style.css'

// 匯入知識庫核心應用元件
import GlossaryApp from '../components/GlossaryApp.vue'
import IntegratedGuideApp from '../components/IntegratedGuideApp.vue'
import AppleHome from '../components/AppleHome.vue'
import BackToTop from '../components/BackToTop.vue'
import GlobalFooter from '../components/GlobalFooter.vue'
import WIPBanner from '../components/WIPBanner.vue'

// 匯入全域佈局增強元件
import UserCenter from './components/UserCenter.vue'
import SecurityGuard from './components/SecurityGuard.vue'
import MobileDrawer from './components/MobileDrawer.vue'
import EmptyState from './components/EmptyState.vue'

export default {
  extends: Theme,
  /**
   * 自定義佈局設定
   * 利用 VitePress 提供的插槽 (Slot) 機制，在不改動核心的情況下注入自定義功能。
   */
  Layout: () => {
    return h(Theme.Layout, null, {
      // 在導覽列右側注入使用者中心與安全性防護元件
      'nav-bar-content-after': () => [h(UserCenter), h(SecurityGuard)],
      // 在頁面最底層掛載全域頁尾與返回頂部按鈕
      'layout-bottom': () => [h(GlobalFooter), h(BackToTop)],
      // WIP 提示橫幅 (顯示於導覽列下方)
      'doc-before': () => h(WIPBanner),
      'home-hero-before': () => h(WIPBanner)
    })
  },
  /**
   * 應用程式增強擴充 (Enhance App)
   * 註冊全域元件，使其能在 Markdown 檔案中直接調用。
   */
  enhanceApp({ app, router, siteData }: EnhanceAppContext) {
    app.component('GlossaryApp', GlossaryApp)
    app.component('IntegratedGuideApp', IntegratedGuideApp)
    app.component('AppleHome', AppleHome)
    app.component('GlobalFooter', GlobalFooter)
    app.component('MobileDrawer', MobileDrawer)
    app.component('EmptyState', EmptyState)
    app.component('WIPBanner', WIPBanner)
  }
}
