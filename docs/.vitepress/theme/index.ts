import { h } from 'vue'
import Theme from 'vitepress/theme'
import type { EnhanceAppContext } from 'vitepress'
import './style.css'
import GlossaryApp from '../components/GlossaryApp.vue'
import QAViewer from '../components/QAViewer.vue'
import AppleHome from '../components/AppleHome.vue'
import BackToTop from '../components/BackToTop.vue'
import GlobalFooter from '../components/GlobalFooter.vue'

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'layout-bottom': () => [h(GlobalFooter), h(BackToTop)]
    })
  },
  enhanceApp({ app, router, siteData }: EnhanceAppContext) {
    app.component('GlossaryApp', GlossaryApp)
    app.component('QAViewer', QAViewer)
    app.component('AppleHome', AppleHome)
    app.component('GlobalFooter', GlobalFooter)
  }
}
