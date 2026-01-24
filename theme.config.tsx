import React from 'react'
import type { DocsThemeConfig } from 'nextra-theme-docs'
import Footer from './components/layout/Footer'
import { Logo, NavbarExtra } from './components/layout/NavbarItems'

/**
 * Superinfo Apple MDM Hub - Theme Configuration
 * Nextra 3.x Standard Configuration
 */

const config = {
  logo: <Logo />,
  logoLink: '/',
  project: {}, // No project link
  chat: {}, // No chat link
  docsRepositoryBase: 'https://github.com/hsuan-sp/mdm-support-site/tree/main',
  gitTimestamp: null,
  useNextSeoProps() {
    return {
      titleTemplate: '%s – 極電資訊',
      defaultTitle: '極電資訊 | Apple MDM Hub 專業知識庫',
      description: '專業的 Apple 裝置管理 (MDM) 知識庫，包含實戰指南、技術術語與常見問題解答。',
      openGraph: {
        type: 'website',
        locale: 'zh_TW',
        url: 'https://mdm-docs-superinfo.netlify.app/',
        site_name: '極電資訊 Apple MDM Hub',
      },
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="apple-mobile-web-app-title" content="MDM Hub" />
    </>
  ),
  navbar: {
    extraContent: <NavbarExtra />,
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: false, // 隱藏 Nextra 預設的 hamburger，使用自訂 MobileNav
  },
  footer: {
    component: null
  },
  toc: { float: true, title: '本頁目錄' },
  search: { component: null },
  nextThemes: { defaultTheme: 'light' },
  themeSwitch: {
    component: null  // 禁用 Nextra 預設深色模式切換，使用自訂的
  },
  primaryHue: 214,
  primarySaturation: 95
}

export default config
