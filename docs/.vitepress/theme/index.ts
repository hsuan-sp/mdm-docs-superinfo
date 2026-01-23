/**
 * VitePress 主題進入點 (Theme Entry)
 *
 * 本檔案負責擴充預設主題、註冊全域元件並掛載自定義佈向插槽。
 */
import { h } from "vue";
import Theme from "vitepress/theme";
import type { EnhanceAppContext } from "vitepress";
import "./style.css";

// 匯入知識庫核心應用元件 (Apps)
import HomeApp from "../components/apps/HomeApp.vue";
import GuideApp from "../components/apps/GuideApp.vue";
import GlossaryApp from "../components/apps/GlossaryApp.vue";
import ChangelogApp from "../components/apps/ChangelogApp.vue";

// 匯入佈局組件 (Layout)
import LayoutBackToTop from "../components/layout/LayoutBackToTop.vue";
import LayoutFooter from "../components/layout/LayoutFooter.vue";

// 匯入功能模組 (Features)
import UserCenter from "../components/features/UserCenter.vue";
import SecurityGuard from "../components/features/SecurityGuard.vue";
import ReportIssue from "../components/features/ReportIssue.vue";

// 匯入 UI 組件 (UI)
import EmptyState from "../components/ui/EmptyState.vue";
import LayoutMobileDrawer from "../components/layout/LayoutMobileDrawer.vue";

export default {
  extends: Theme,
  /**
   * 自定義佈局設定
   */
  Layout: () => {
    return h(Theme.Layout, null, {
      // 在導覽列右側注入使用者中心與安全性防護元件
      "nav-bar-content-after": () => [h(UserCenter), h(SecurityGuard)],
      // 在頁面最底層掛載全域頁尾與返回頂部按鈕
      "layout-bottom": () => [h(LayoutFooter), h(LayoutBackToTop)],
    });
  },
  /**
   * 應用程式增強擴充 (Enhance App)
   */
  enhanceApp({ app }: EnhanceAppContext) {
    app.component("HomeApp", HomeApp);
    app.component("GuideApp", GuideApp);
    app.component("GlossaryApp", GlossaryApp);
    app.component("ChangelogApp", ChangelogApp);
    app.component("LayoutFooter", LayoutFooter);
    app.component("LayoutMobileDrawer", LayoutMobileDrawer);
    app.component("EmptyState", EmptyState);
    app.component("ReportIssue", ReportIssue);
  },
};
