import React from 'react'
import { useConfig } from 'nextra-theme-docs'
import { Logo, NavbarExtra } from './components/layout/NavbarItems'

// 修正：直接導出物件，讓 Nextra 處理型別檢查，避免 unresolved type 報錯
const config = {
  logo: <Logo />,
  logoLink: '/',
  head: function Head() {
    const config = useConfig()
    // 強制斷言繞過 pageOpts 型別問題
    const pageOpts = (config as any).pageOpts
    const title = pageOpts?.title 
      ? `${pageOpts.title} | Superinfo`
      : 'Superinfo Apple MDM Hub'
    
    return (
      <>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/favicon.ico`} />
      </>
    )
  },
  
  navbar: {
    extraContent: <NavbarExtra />,
  },
  
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  
  footer: { 
    text: null, 
    component: () => null 
  }, 
  
  toc: { 
    float: true, 
    title: '本頁目錄' 
  },

  search: {
    component: () => null
  }
}

export default config