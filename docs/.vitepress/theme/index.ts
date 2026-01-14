import { h } from 'vue'
import Theme from 'vitepress/theme'
import type { EnhanceAppContext } from 'vitepress'
import './style.css'
import GlossaryApp from '../components/GlossaryApp.vue'

import AppleHome from '../components/AppleHome.vue'
import BackToTop from '../components/BackToTop.vue'
import GlobalFooter from '../components/GlobalFooter.vue'

import UserCenter from './components/UserCenter.vue'
import SecurityGuard from './components/SecurityGuard.vue'
import MobileDrawer from './components/MobileDrawer.vue'
import EmptyState from './components/EmptyState.vue'

import IntegratedGuideApp from '../components/IntegratedGuideApp.vue'

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      'nav-bar-content-after': () => [h(UserCenter), h(SecurityGuard)],
      'layout-bottom': () => [h(GlobalFooter), h(BackToTop)]
    })
  },
  enhanceApp({ app, router, siteData }: EnhanceAppContext) {
    app.component('GlossaryApp', GlossaryApp)
    app.component('IntegratedGuideApp', IntegratedGuideApp)
    app.component('AppleHome', AppleHome)
    app.component('GlobalFooter', GlobalFooter)
    app.component('MobileDrawer', MobileDrawer)
    app.component('EmptyState', EmptyState)
  }
}
