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
  const { theme, setTheme } = useTheme()
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
    <div className="fixed inset-0 z-10000 lg:hidden text-balance">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md animate-reveal" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-[90vw] max-w-md bg-white dark:bg-apple-dark-bg shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col overflow-hidden border-l border-apple-border dark:border-apple-dark-border">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 border-b border-apple-border dark:border-apple-dark-border bg-white dark:bg-apple-dark-bg h-18 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-1 bg-apple-blue/10 rounded-lg">
              <img src="/logo-square.png" alt="Logo" className="h-7 w-7 object-contain" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-[1rem] font-bold text-apple-text dark:text-apple-dark-text leading-tight">{isZh ? '極電資訊' : 'Superinfo'}</h2>
              <p className="text-[10px] font-bold text-apple-gray uppercase tracking-widest mt-0.5">APPLE MDM Hub</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-apple-bg dark:hover:bg-apple-dark-border rounded-full transition-all active:scale-90">
            <X className="w-6 h-6 text-apple-gray" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
          
          {/* 使用者狀態區 */}
          <div className="p-1 bg-apple-bg dark:bg-apple-dark-border/30 rounded-3xl border border-apple-border dark:border-apple-dark-border/50">
            {user ? (
              <div className="flex flex-col p-2 space-y-2">
                <div className="flex items-center gap-4 p-3 bg-white dark:bg-apple-dark-bg rounded-2xl shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-apple-blue text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {user.email ? user.email[0].toUpperCase() : <UserIcon className="w-5 h-5" />}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold text-apple-blue uppercase tracking-widest leading-none">Authorized</span>
                    <span className="text-sm font-bold text-apple-text dark:text-apple-dark-text truncate mt-1">{user.email ?? 'Unknown User'}</span>
                  </div>
                </div>
                <button onClick={() => signOut()} className="w-full flex items-center justify-center gap-2 px-5 py-3 text-apple-red font-bold text-[13px] hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all">
                  <LogOut className="w-4 h-4 opacity-70" />
                  {t('userCenter.logout')}
                </button>
              </div>
            ) : (
              <button onClick={() => signIn()} className="w-full flex items-center justify-center gap-3 px-5 py-4 bg-apple-blue text-white rounded-2xl font-bold text-[14px] hover:bg-apple-blue-hover shadow-lg shadow-apple-blue/20">
                {t('userCenter.login')}
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* 常用導航 */}
          <nav className="space-y-1.5">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[rgb(134,134,139)] px-4 mb-3">Navigation</h3>
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`w-full flex items-center justify-between px-6 py-3.5 rounded-2xl font-bold transition-all duration-300 min-h-touch-target active:scale-[0.98] ${
                  pathname === link.path 
                    ? 'bg-apple-blue text-white shadow-lg shadow-apple-blue/20 translate-x-1' 
                    : 'text-apple-text dark:text-apple-dark-text hover:bg-apple-bg dark:hover:bg-apple-dark-border/80 hover:translate-x-1'
                }`}
              >
                <span className="text-[15px]">{link.label}</span>
              </button>
            ))}
          </nav>

          {/* 常用連結 */}
          <div className="pt-4 border-t border-apple-border dark:border-apple-dark-border">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-apple-gray px-4 mb-4">{t('resources.label')}</h3>
            {resourceGroups.map((group: any, idx: number) => (
              <div key={idx} className="mb-6 last:mb-0">
                <h4 className="text-[11px] font-bold text-[rgb(134,134,139)] px-4 mb-2">{group.title}</h4>
                <div className="space-y-1">
                  {group.items.map((item: any, itemIdx: number) => (
                    <button
                      key={itemIdx}
                      onClick={() => navigateExternal(item.link)}
                      className="w-full flex items-center justify-between px-6 py-3.5 text-sm font-bold text-apple-gray dark:text-apple-dark-gray hover:bg-apple-bg dark:hover:bg-apple-dark-border/50 rounded-xl transition-all min-h-touch-target active:scale-[0.98]"
                    >
                      <span className="flex-1 text-left truncate">{item.text}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 系統設定 */}
          <div className="pt-4 border-t border-apple-border dark:border-apple-dark-border pb-10 space-y-3">
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="w-full flex items-center justify-between p-4 bg-apple-bg dark:bg-apple-dark-border/40 rounded-2xl transition-all hover:bg-apple-gray/5 dark:hover:bg-apple-dark-border min-h-touch-target active:scale-[0.98]">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-apple-blue/10 text-apple-blue' : 'bg-amber-500/10 text-amber-500'}`}>
                    {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  </div>
                  <span className="text-sm font-bold text-apple-text dark:text-apple-dark-text">Appearance</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-apple-gray">{theme?.toUpperCase()}</span>
              </button>

              <button onClick={() => setLanguage(language === 'zh-TW' ? 'en' : 'zh-TW')} className="w-full flex items-center justify-between p-4 bg-apple-bg dark:bg-apple-dark-border/40 rounded-2xl transition-all hover:bg-apple-gray/5 dark:hover:bg-apple-dark-border min-h-touch-target active:scale-[0.98]">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-apple-bg dark:bg-apple-dark-border rounded-xl text-apple-gray">
                    <Globe className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-apple-text dark:text-apple-dark-text">Language</span>
                </div>
                <div className="px-3 py-1 bg-white dark:bg-apple-dark-bg border border-apple-border dark:border-apple-dark-border rounded-lg text-xs font-bold text-apple-blue">
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