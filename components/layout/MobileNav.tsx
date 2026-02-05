"use client"

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
// ✅ App Router 標準引用
import { useRouter, usePathname } from 'next/navigation'
import { useLanguage } from '@/hooks/useLanguage'
import { translations } from '@/locales'
import { X, ChevronRight, Moon, Sun, Globe, ExternalLink, User as UserIcon, LogOut } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useUser } from '@/hooks/useLogtoUser'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const router = useRouter()
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { user, signIn, signOut } = useUser()
  
  const isZh = language === 'zh-TW'
  const resourceGroups = translations[language].resources.groups;

  useEffect(() => {
    setMounted(true)
  }, [])

  // 處理 Body 鎖定
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => { document.body.style.overflow = 'auto' }
  }, [isOpen])

  const navigate = (path: string) => {
    router.push(path)
    onClose()
  }

  const navigateExternal = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  // 避免 Hydration Mismatch 與 Portal 錯誤
  if (!mounted || !isOpen) return null

  const navLinks = [
    { path: '/', label: t('pageTitles.index') },
    { path: '/guide', label: t('pageTitles.guide') },
    { path: '/glossary', label: t('pageTitles.glossary') },
    { path: '/changelog', label: t('pageTitles.changelog') }
  ]

  return createPortal(
    <div className="fixed inset-0 z-10000 lg:hidden text-balance shadow-2xl">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xl animate-reveal" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-[85vw] max-w-sm bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl animate-in slide-in-from-right duration-500 ease-apple-out flex flex-col overflow-hidden border-l border-zinc-200/50 dark:border-zinc-800/50 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 bg-white/40 dark:bg-zinc-950/40 h-20 shrink-0 border-b border-zinc-100 dark:border-zinc-900">
          <div className="flex items-center gap-3.5">
            <div className="p-2 bg-apple-blue/10 rounded-2xl border border-apple-blue/20 shadow-sm">
              <img src="/logo-square.png" alt="極電資訊 Apple MDM Hub Logo" className="h-6.5 w-6.5 object-contain" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-[15px] font-bold text-zinc-900 dark:text-zinc-50 leading-tight tracking-tight">{isZh ? '極電資訊' : 'Superinfo'}</h2>
              <p className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mt-0.5">APPLE MDM HUB</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all active:scale-90 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700" aria-label="Close menu">
            <X className="w-5 h-5 text-zinc-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-10 no-scrollbar">
          
          {/* 使用者狀態區 */}
          <div className="p-1.5 bg-zinc-50 dark:bg-zinc-900/50 rounded-5xl border border-zinc-100 dark:border-zinc-800/50 shadow-inner">
            {user ? (
              <div className="flex flex-col p-2 space-y-2">
                <div className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-900 rounded-4xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                  <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-lg shadow-blue-500/20">
                    {user.email ? user.email[0].toUpperCase() : <UserIcon className="w-5 h-5" />}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[9px] font-bold text-apple-blue dark:text-blue-400 uppercase tracking-widest leading-none">Authenticated</span>
                    <span className="text-[14px] font-bold text-zinc-900 dark:text-zinc-100 truncate mt-1.5">{user.email ?? 'Unknown User'}</span>
                  </div>
                </div>
                <button onClick={() => signOut()} className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 text-red-500 dark:text-red-400 font-bold text-[13px] hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-all active:scale-95">
                  <LogOut className="w-4 h-4 opacity-70" />
                  {t('userCenter.logout')}
                </button>
              </div>
            ) : (
              <button onClick={() => signIn()} className="w-full flex items-center justify-center gap-3 px-6 py-4.5 bg-apple-blue text-white rounded-4xl font-bold text-[15px] hover:bg-apple-blue-hover shadow-xl shadow-apple-blue/20 active:scale-95 transition-all">
                {t('userCenter.login')}
                <ChevronRight className="w-4.5 h-4.5" />
              </button>
            )}
          </div>

          {/* 常用導航 */}
          <nav className="space-y-1.5">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600 px-5 mb-4">Core Navigation</h3>
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-bold transition-all duration-300 min-h-touch-target active:scale-[0.97] group ${
                    isActive 
                      ? 'bg-apple-blue text-white shadow-xl shadow-apple-blue/25 translate-x-1' 
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:translate-x-1'
                  }`}
                >
                  <span className="text-[15px]">{link.label}</span>
                  {!isActive && <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-40 transition-opacity" />}
                </button>
              );
            })}
          </nav>

          {/* 常用連結 */}
          <div className="pt-6 border-t border-zinc-100 dark:border-zinc-900">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600 px-5 mb-5">{t('resources.label')}</h3>
            {resourceGroups.map((group: any, idx: number) => (
              <div key={idx} className="mb-8 last:mb-0">
                <h4 className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 px-5 mb-3 border-l-2 border-apple-blue/30 ml-1">{group.title}</h4>
                <div className="space-y-1">
                  {group.items.map((item: any, itemIdx: number) => (
                    <button
                      key={itemIdx}
                      onClick={() => navigateExternal(item.link)}
                      className="w-full flex items-center justify-between px-6 py-4 text-[13.5px] font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 rounded-2xl transition-all min-h-touch-target active:scale-[0.97]"
                    >
                      <span className="flex-1 text-left truncate">{item.text}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-700 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 系統設定 */}
          <div className="pt-6 border-t border-zinc-100 dark:border-zinc-900 pb-12 space-y-3">
              <button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')} className="w-full flex items-center justify-between p-4.5 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-[0.97]">
                <div className="flex items-center gap-3.5">
                  <div className={`p-2.5 rounded-xl border ${resolvedTheme === 'dark' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' : 'bg-amber-500/10 border-amber-500/20 text-amber-500'}`}>
                    {resolvedTheme === 'dark' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
                  </div>
                  <span className="text-[14px] font-bold text-zinc-900 dark:text-zinc-100">Appearance</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{resolvedTheme?.toUpperCase()}</span>
              </button>

              <button onClick={() => setLanguage(language === 'zh-TW' ? 'en' : 'zh-TW')} className="w-full flex items-center justify-between p-4.5 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-[0.97]">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-zinc-500 border border-zinc-200 dark:border-zinc-700">
                    <Globe className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[14px] font-bold text-zinc-900 dark:text-zinc-100">Language</span>
                </div>
                <div className="px-3 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-bold text-apple-blue">
                  {language === 'zh-TW' ? 'ENGLISH' : '繁體中文'}
                </div>
              </button>
          </div>

        </div>
      </div>
    </div>,
    document.body
  )
}
export default MobileNav