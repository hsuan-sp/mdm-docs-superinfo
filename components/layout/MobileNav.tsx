"use client"
import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/router'
import { useLanguage } from '@/hooks/useLanguage'
import { translations } from '@/locales'
import { X, ChevronRight, Moon, Sun, Globe, ExternalLink } from 'lucide-react'
import { useTheme } from 'next-themes'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const router = useRouter()
  const { language, setLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  const t = translations[language as keyof typeof translations] || translations['zh-TW']
  const isZh = language === 'zh-TW'

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  const navigate = (path: string) => {
    router.push(path)
    onClose()
  }

  const navigateExternal = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (!isOpen || !mounted) return null

  // 使用 Portal 渲染到 body 層級，突破 navbar 容器限制
  return createPortal(
    <div className="fixed inset-0 z-[10000] lg:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Drawer - Premium Design */}
      <div className="absolute right-0 top-0 h-full w-[90vw] max-w-md bg-white dark:bg-zinc-900 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col overflow-hidden border-l border-zinc-200 dark:border-zinc-800">
        {/* Header - Optimized Alignment */}
        <div className="flex items-center justify-between px-6 border-b border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 h-[72px] shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-1 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <img src="/logo-square.png" alt="Logo" className="h-7 w-7 object-contain" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-[1rem] font-black text-zinc-900 dark:text-white leading-tight">
                {isZh ? '極電資訊' : 'Superinfo'}
              </h2>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none mt-0.5">
                {isZh ? 'MDM 知識庫' : 'MDM Hub'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all active:scale-90"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-zinc-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
          {/* User Section - Enhanced Cohesion */}
          <div className="p-1 bg-zinc-50 dark:bg-zinc-800/30 rounded-3xl border border-zinc-100 dark:border-zinc-800/50">
            <SignedIn>
              <div className="flex items-center gap-4 p-4">
                <div className="bg-white dark:bg-zinc-900 p-1 rounded-full shadow-sm">
                  <UserButton afterSignOutUrl="/" />
                </div>
                <div className="flex flex-col">
                   <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">Active Account</span>
                   <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                     {isZh ? '已安全登入' : 'Securely Signed In'}
                   </span>
                </div>
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="redirect">
                <button className="w-full flex items-center justify-center gap-3 px-5 py-4 bg-blue-600 text-white rounded-2xl font-black text-[14px] hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/20">
                  {isZh ? '登入帳號系統' : 'Sign In to Access'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </SignInButton>
            </SignedOut>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 px-4 mb-2">
              {isZh ? '常用導航' : 'Navigation'}
            </h3>
            {[
              { path: '/', label: isZh ? '網站首頁' : 'Home' },
              { path: '/guide', label: isZh ? '實戰指南' : 'Guides' },
              { path: '/glossary', label: isZh ? '專有名詞' : 'Glossary' },
              { path: '/changelog', label: isZh ? '版本更新' : 'Updates' }
            ].map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl font-bold transition-all duration-300 ${
                  router.pathname === link.path 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 translate-x-1' 
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 hover:translate-x-1'
                }`}
              >
                <span className="text-[15px]">{link.label}</span>
                {router.pathname === link.path && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
              </button>
            ))}
          </nav>

          {/* Resources Section */}
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 px-4 mb-4">
              {t.resources?.label || '資源與服務'}
            </h3>
            
            {t.resources?.groups && t.resources.groups.length > 0 ? (
              t.resources.groups.map((group: any, idx: number) => (
                <div key={idx} className="mb-8 last:mb-0">
                  <h4 className="text-[11px] font-black text-zinc-500 px-4 mb-3 flex items-center gap-2">
                    <div className="w-1 h-3 bg-blue-500 rounded-full" />
                    {group.title}
                  </h4>
                  <div className="space-y-1">
                    {group.items.map((item: any, itemIdx: number) => (
                      <button
                        key={itemIdx}
                        onClick={() => navigateExternal(item.link)}
                        className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-xl transition-all group"
                      >
                        <span className="truncate pr-2 text-left">{item.text}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-zinc-300 group-hover:text-blue-500 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-zinc-500 px-4">暫無資源</p>
            )}
          </div>

          {/* Settings Section */}
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-3 pb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 px-4 mb-4">
              {isZh ? '系統設定' : 'Preferences'}
            </h3>
            
            <div className="grid grid-cols-1 gap-3 px-2">
              {/* Theme Toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800 rounded-2xl hover:bg-white dark:hover:bg-zinc-800 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl transition-colors ${theme === 'dark' ? 'bg-blue-500/10 text-blue-500' : 'bg-amber-500/10 text-amber-500'}`}>
                      {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                    </div>
                    <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                      {isZh ? '介面風格' : 'Appearance'}
                    </span>
                  </div>
                  <div className={`w-10 h-6 rounded-full relative transition-colors ${theme === 'dark' ? 'bg-blue-600' : 'bg-zinc-200'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${theme === 'dark' ? 'left-5' : 'left-1'}`} />
                  </div>
                </button>
              )}

              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'zh-TW' ? 'en' : 'zh-TW')}
                className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800 rounded-2xl hover:bg-white dark:hover:bg-zinc-800 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-zinc-100 dark:bg-zinc-700/50 rounded-xl text-zinc-500 group-hover:text-blue-500 transition-colors">
                    <Globe className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                    {isZh ? '語言切換' : 'Display Language'}
                  </span>
                </div>
                <div className="px-3 py-1 bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 rounded-lg text-xs font-black text-zinc-900 dark:text-zinc-100 shadow-sm">
                  {language === 'zh-TW' ? 'ENGLISH' : '繁體中文'}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
export default MobileNav
