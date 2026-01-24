import React from 'react'
import type { DocsThemeConfig } from 'nextra-theme-docs'
import { useConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'
import { Logo, NavbarExtra } from './components/layout/NavbarItems'
import { useLanguage } from './hooks/useLanguage'
import { translations } from './locales'

/**
 * Superinfo Apple MDM Hub - Smart Title Configuration
 * Optimized for SEO & Netlify Performance
 */

const config: DocsThemeConfig = {
  logo: <Logo />,
  logoLink: '/',
  project: {},
  chat: {},
  docsRepositoryBase: 'https://github.com/hsuan-sp/mdm-support-site/tree/main',
  gitTimestamp: null,
  
  head: function Comp() {
    const { title, frontMatter } = useConfig()
    const { route } = useRouter()
    const { language } = useLanguage()
    const isEn = language === 'en'
    
    // 1. Define Brand Names
    const brandLong = isEn ? 'Superinfo | Apple MDM Support Hub' : '極電資訊 | Apple MDM 專業知識庫'
    const brandShort = isEn ? 'Superinfo MDM Hub' : '極電資訊 MDM 知識庫'
    
    // 2. Identify Page Name from translation map or auto-detection
    const t = translations[language as keyof typeof translations] || translations['zh-TW']
    const routeKey = route === '/' ? 'index' : route.replace('/', '')
    const mappedPageName = t.pageTitles ? (t.pageTitles as any)[routeKey] : null
    const pageName = mappedPageName || title || frontMatter.title
    
    // 3. Construct Final Title
    // If it's the home page, use the full branded title
    // Otherwise, use "Page Name – Short Brand"
    const finalTitle = (route === '/' || !pageName) 
      ? brandLong 
      : `${pageName} – ${brandShort}`
    
    const description = frontMatter.description || (isEn 
      ? 'A professional MDM knowledge base for Apple device management.' 
      : '專業的 Apple 裝置管理 (MDM) 知識庫，包含實戰指南、技術術語與常見問題解答。')

    return (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content={isEn ? 'en' : 'zh-TW'} />
        <title>{finalTitle}</title>
        <meta name="description" content={description} />
        
        {/* Open Graph / Social */}
        <meta property="og:title" content={finalTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={isEn ? 'en_US' : 'zh_TW'} />
        
        <meta name="apple-mobile-web-app-title" content="MDM Hub" />
        <link rel="icon" href="/favicon.ico" />
      </>
    )
  },
  
  navbar: {
    extraContent: <NavbarExtra />,
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: false, 
  },
  footer: {
    component: null
  },
  toc: { float: true, title: '本頁目錄' },
  search: { component: null },
  nextThemes: { defaultTheme: 'light' },
  themeSwitch: {
    component: null
  }
}

export default config
