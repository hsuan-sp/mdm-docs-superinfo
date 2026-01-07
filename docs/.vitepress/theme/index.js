import DefaultTheme from 'vitepress/theme'
import LoginStatus from './components/LoginStatus.vue'
import { h } from 'vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(LoginStatus)
    })
  }
}
