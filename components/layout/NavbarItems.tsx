import React, { useEffect, useState } from 'react'
import { useLanguage } from '../../hooks/useLanguage'
import { Globe, ChevronDown, ExternalLink, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { translations } from '../../locales'
import UserCenter from '../features/UserCenter'
import MobileNav from './MobileNav'

// Logo Component  
export const Logo = () => {
  const { language } = useLanguage()
  const isZh = language === 'zh-TW'
  return (
    <div className="flex items-center gap-2 select-none group branding-logo-container">
      <img src="/logo-square.png" alt="Logo" className="h-5 md:h-6 w-auto transition-transform duration-500 group-hover:rotate-[360deg] shrink-0" />
      <div className="flex flex-col md:flex-row md:items-baseline md:gap-1.5 overflow-hidden">
        {/* 使用 clamp 讓字體平滑縮小而非隱藏 */}
        <span className="font-black text-zinc-900 dark:text-white whitespace-nowrap leading-tight" style={{ fontSize: 'clamp(11px, 2.5vw, 17px)' }}>
          {isZh ? '極電資訊' : 'Superinfo'}
        </span>
        <span className="font-medium text-zinc-700 dark:text-zinc-300 md:text-zinc-400 md:dark:text-zinc-500 whitespace-nowrap" style={{ fontSize: 'clamp(10px, 2vw, 14px)' }}>
          {isZh ? 'Apple MDM 知識庫' : 'Apple MDM Hub'}
        </span>
      </div>
    </div>
  )
}

// NavTranslator Component
export const NavTranslator = () => {
  const { language } = useLanguage()
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const navLinks = document.querySelectorAll('.nextra-nav-container a')
      const navMap: Record<string, Record<string, string>> = {
        'zh-TW': {
          '/': '首頁',
          '/guide': '指南',
          '/glossary': '術語表',
          '/changelog': '更新日誌'
        },
        'en': {
          '/': 'Home',
          '/guide': 'Guide',
          '/glossary': 'Glossary',
          '/changelog': 'Changelog'
        }
      }

      navLinks.forEach((link: any) => {
        const href = link.getAttribute('href')
        // Skip logo container
        if (link.querySelector('.branding-logo-container') || link.querySelector('img')) return

        if (href && navMap[language][href]) {
          const span = link.querySelector('span')
          if (span) {
            span.textContent = navMap[language][href]
          } else if (link.childNodes.length > 0) {
            link.childNodes.forEach((node: any) => {
              if (node.nodeType === Node.TEXT_NODE) {
                node.textContent = navMap[language][href]
              }
            })
          }
        }
      })
    }, 200)
    return () => clearTimeout(timer)
  }, [language])

  return null
}

// NavbarExtra Component
export const NavbarExtra = () => {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  
  const t = translations[language as keyof typeof translations] || translations['zh-TW']

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <NavTranslator />
      <div className="flex items-center gap-2 md:gap-3">
        {/* Hamburger Button - Mobile Only */}
        <button
          onClick={() => setIsMobileNavOpen(true)}
          className="lg:hidden p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
          aria-label="Open menu"
        >
          <svg className="w-6 h-6 text-zinc-700 dark:text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Resources Dropdown - Desktop Only */}
        <div className="hidden lg:block relative">
          <button
            onClick={() => setResourcesOpen(!resourcesOpen)}
            className="flex items-center gap-1.5 px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all text-sm font-bold text-zinc-700 dark:text-zinc-300"
          >
            <span>{t.resources?.label || '資源'}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
          </button>

          {resourcesOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setResourcesOpen(false)} />
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                {t.resources?.groups.map((group: any, idx: number) => (
                  <div key={idx} className={`p-4 ${idx > 0 ? 'border-t border-zinc-100 dark:border-zinc-800' : ''}`}>
                    <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400 mb-3">{group.title}</h3>
                    <div className="space-y-1">
                      {group.items.map((item: any, itemIdx: number) => (
                        <a
                          key={itemIdx}
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-all group"
                        >
                          <span className="flex-1 truncate">{item.text}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-blue-600 flex-shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Theme Toggle - Desktop Only */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="hidden lg:flex p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-zinc-600" />
            )}
          </button>
        )}

        {/* Language Toggle - Desktop Only */}
        <button
          onClick={() => setLanguage(language === 'zh-TW' ? 'en' : 'zh-TW')}
          className="hidden lg:flex items-center gap-1.5 px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all text-sm font-bold text-zinc-700 dark:text-zinc-300"
        >
          <Globe className="w-4 h-4" />
          <span>{language === 'zh-TW' ? 'EN' : '中文'}</span>
        </button>

        {/* User Center */}
        <UserCenter />
      </div>

      {/* Custom Mobile Navigation */}
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
    </>
  )
}
