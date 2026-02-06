"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/hooks/useLanguage'
import { Globe, ChevronDown, ExternalLink, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { translations } from '@/locales'
import UserCenter from '@/components/features/UserCenter'
import MobileNav from '@/components/layout/MobileNav'

interface ResourceItem {
  text: string;
  link: string;
}

interface ResourceGroup {
  title: string;
  items: ResourceItem[];
}

// Logo 組件
export const Logo = () => {
  const { language } = useLanguage()
  const isZh = language === 'zh-TW'
  return (
    <div className="flex items-center gap-3.5 select-none group branding-logo-container relative cursor-pointer">
      <div className="relative">
        <div className="absolute inset-0 bg-apple-blue/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative z-10 p-1.5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-xl shadow-sm border border-zinc-200/50 dark:border-zinc-800/50 group-hover:border-apple-blue/30 transition-all duration-500 group-hover:scale-105">
          <Image 
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logo-square.png`} 
            alt="極電資訊 Apple MDM Hub Logo" 
            width={28}
            height={28}
            className="h-6 w-6 md:h-7 md:w-7 transition-transform duration-700 group-hover:rotate-12 shrink-0"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-zinc-950 dark:text-zinc-50 whitespace-nowrap leading-tight tracking-tight transition-colors group-hover:text-apple-blue" style={{ fontSize: 'clamp(15px, 2.5vw, 19px)' }}>
          {isZh ? '極電資訊' : 'Superinfo'}
        </span>
        <span className="font-bold text-zinc-400 dark:text-zinc-500 whitespace-nowrap leading-none mt-1 tracking-widest" style={{ fontSize: 'clamp(9px, 2vw, 10px)' }}>
          APPLE MDM HUB
        </span>
      </div>
    </div>
  )
}

// Navbar 右側功能區 (包含中間選單與右側按鈕)
export const NavbarExtra = () => {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  
  const isZh = language === 'zh-TW'
  const resourceGroups = translations[language].resources.groups;

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="h-10" />

  const navLinks = [
    { path: '/', label: t('pageTitles.index') },
    { path: '/guide', label: t('pageTitles.guide') },
    { path: '/glossary', label: t('pageTitles.glossary') },
    { path: '/changelog', label: t('pageTitles.changelog') }
  ]

  return (
    <div className="flex items-center gap-2 md:gap-4">
      {/* 1. 中間導覽連結 (桌面版) */}
      <nav className="hidden lg:flex items-center gap-1.5 mx-6">
        {navLinks.map((link) => {
          const isActive = pathname === link.path
          return (
            <Link
              key={link.path}
              href={link.path}
              className={`px-4 py-2 rounded-full text-[13px] font-bold transition-all duration-300 relative group overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue ${
                isActive 
                  ? 'text-apple-blue bg-apple-blue/5 dark:bg-apple-blue/10' 
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50'
              }`}
            >
              {link.label}
              {isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-apple-blue rounded-full" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* 手機版漢堡選單按鈕 */}
      <button 
        onClick={() => setIsMobileNavOpen(true)} 
        className="lg:hidden p-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all active:scale-95 flex items-center justify-center border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 shadow-sm md:shadow-none min-h-11 min-w-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue"
        aria-label="Open menu"
      >
        <svg className="w-6 h-6 text-zinc-700 dark:text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* --- 右側功能按鈕區 --- */}
      <div className="hidden lg:flex items-center gap-2">
        
        {/* 資源下拉選單 */}
        <div className="relative">
          <button
            onClick={() => setResourcesOpen(!resourcesOpen)}
            className={`flex items-center gap-1.5 px-4 py-2 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80 rounded-full transition-all text-[13px] font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue ${resourcesOpen ? 'text-apple-blue bg-apple-blue/5 dark:bg-apple-blue/10' : 'text-zinc-600 dark:text-zinc-400'}`}
            aria-label="Toggle resources menu"
            aria-expanded={resourcesOpen}
          >
            <span>{t('resources.label')}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${resourcesOpen ? 'rotate-180' : ''}`} />
          </button>

          {resourcesOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setResourcesOpen(false)} />
              <div className="absolute right-0 mt-3 w-80 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-zinc-200/50 dark:border-zinc-800/50 z-50 overflow-hidden animate-reveal p-2">
                {resourceGroups.map((group: ResourceGroup, idx: number) => (
                  <div key={idx} className="mb-1 last:mb-0">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400/80 px-4 py-2.5">{group.title}</h3>
                    <div className="space-y-0.5">
                      {group.items.map((item: ResourceItem, itemIdx: number) => (
                        <a
                          key={itemIdx}
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-4 py-2.5 text-[13.5px] font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue/50"
                        >
                          <span className="flex-1 truncate">{item.text}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-600 group-hover:text-blue-500 transition-colors" />
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 mx-1" />

        {/* 主題切換 */}
        <button 
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')} 
          className="p-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all active:scale-90 relative group min-h-11 min-w-11 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue"
          aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <div className="relative z-10">
            {resolvedTheme === 'dark' ? <Sun className="w-4.5 h-4.5 text-amber-500" /> : <Moon className="w-4.5 h-4.5 text-zinc-600" />}
          </div>
          <span className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
        </button>

        {/* 語言切換 */}
        <button 
          onClick={() => setLanguage(language === 'zh-TW' ? 'en' : 'zh-TW')} 
          className="flex items-center gap-2 px-3.5 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all text-[11px] font-bold text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 shadow-sm min-h-11 min-w-11 justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue"
          aria-label={language === 'zh-TW' ? 'Switch to English' : '切換至中文'}
        >
          <Globe className="w-3.5 h-3.5 opacity-70" />
          <span>{isZh ? 'EN' : '中文'}</span>
        </button>
      </div>

      {/* 使用者中心 */}
      <UserCenter />

      {/* 手機版導覽抽屜 */}
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
    </div>
  )
}