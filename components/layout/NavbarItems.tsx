"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '../../hooks/useLanguage'
import { Globe, ChevronDown, ExternalLink, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { translations } from '../../locales'
import UserCenter from '../features/UserCenter'
import MobileNav from './MobileNav'

// Logo 組件
export const Logo = () => {
  const { language } = useLanguage()
  const isZh = language === 'zh-TW'
  return (
    <Link href="/" className="flex items-center gap-3 select-none group branding-logo-container relative">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <img 
          src="/logo-square.png" 
          alt="Logo" 
          className="h-6 md:h-7 w-auto transition-all duration-700 group-hover:rotate-[360deg] group-hover:scale-110 shrink-0 relative z-10" 
        />
      </div>
      <div className="flex flex-col overflow-hidden">
        <span className="font-black text-zinc-900 dark:text-white whitespace-nowrap leading-tight tracking-tight transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400" style={{ fontSize: 'clamp(14px, 2.5vw, 18px)' }}>
          {isZh ? '極電資訊' : 'Superinfo'}
        </span>
        <span className="font-bold text-zinc-400 dark:text-zinc-500 whitespace-nowrap leading-none mt-0.5" style={{ fontSize: 'clamp(10px, 2vw, 11px)' }}>
          {isZh ? 'APPLE MDM Hub' : 'APPLE MDM Hub'}
        </span>
      </div>
    </Link>
  )
}

// Navbar 右側功能區 (包含中間選單與右側按鈕)
export const NavbarExtra = () => {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  
  const isZh = language === 'zh-TW'
  const t = translations[language as keyof typeof translations] || translations['zh-TW']

  useEffect(() => {
    setMounted(true)
  }, [])

  // 防止伺服器渲染與客戶端渲染不一致
  if (!mounted) return <div className="h-10" />

  const navLinks = [
    { path: '/', label: isZh ? '網站首頁' : 'Home' },
    { path: '/guide', label: isZh ? '實戰指南' : 'Guides' },
    { path: '/glossary', label: isZh ? '專有名詞' : 'Glossary' },
    { path: '/changelog', label: isZh ? '版本更新' : 'Updates' }
  ]

  return (
    <div className="flex items-center gap-2 md:gap-3">
      {/* 1. 中間導覽連結 (桌面版) */}
      <nav className="hidden lg:flex items-center gap-1 mx-4">
        {navLinks.map((link) => {
          const isActive = pathname === link.path
          return (
            <Link
              key={link.path}
              href={link.path}
              className={`px-3 py-1.5 rounded-full text-sm font-bold transition-all ${
                isActive 
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' 
                  : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
              }`}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>

      {/* 手機版漢堡選單按鈕 */}
      <button 
        onClick={() => setIsMobileNavOpen(true)} 
        className="lg:hidden p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
      >
        <svg className="w-6 h-6 text-zinc-700 dark:text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* --- 右側功能按鈕區 --- */}
      <div className="hidden lg:flex items-center gap-1">
        
        {/* 資源下拉選單 */}
        <div className="relative">
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
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 z-50 overflow-hidden">
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
                          <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-blue-600 shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* 主題切換 */}
        <button 
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')} 
          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all"
        >
          {resolvedTheme === 'dark' ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-zinc-600" />}
        </button>

        {/* 語言切換 */}
        <button 
          onClick={() => setLanguage(language === 'zh-TW' ? 'en' : 'zh-TW')} 
          className="flex items-center gap-1.5 px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all text-sm font-bold text-zinc-700 dark:text-zinc-300"
        >
          <Globe className="w-4 h-4" />
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