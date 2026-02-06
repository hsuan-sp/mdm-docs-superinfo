"use client"

import React, { useEffect, useState } from 'react'
import { LogIn, LogOut, User as UserIcon } from 'lucide-react'
// ✅ 使用 @/ 別名更符合 Next.js 15 慣例
import { translations } from '@/locales'
import { useLanguage } from '@/hooks/useLanguage'
import { useUser } from '@/hooks/useLogtoUser'

const UserCenter: React.FC = () => {
  const { t } = useLanguage()
  const { user, isLoading, signIn, signOut } = useUser()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || isLoading) {
    return (
      <div className="flex items-center gap-2 px-2">
        <div className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 animate-pulse border border-zinc-200/50 dark:border-zinc-700/50" />
      </div>
    )
  }

  const getAvatarContent = () => {
    const email = user?.email
    if (email && email.length > 0) {
      return email[0].toUpperCase()
    }
    return <UserIcon className="w-4 h-4" />
  }

  return (
    <div className="flex items-center gap-3 pl-2">
      {user ? (
        <div className="flex items-center gap-3">
          <div className="hidden xl:flex flex-col items-end leading-none select-none">
            <span className="text-[9px] font-bold text-apple-blue dark:text-blue-400 uppercase tracking-widest mb-1.5 opacity-80">Authorized</span>
            <span className="text-[12.5px] font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              {(user.email ?? 'User').split('@')[0]}
            </span>
          </div>
          
          <div 
            className="w-9 h-9 rounded-full bg-apple-blue text-white flex items-center justify-center font-bold text-[13px] shadow-lg shadow-apple-blue/20 cursor-help select-none ring-1 ring-apple-blue/50 dark:ring-blue-400/50 ring-offset-2 ring-offset-white dark:ring-offset-zinc-950 transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue"
            title={`已登入：${user.email ?? 'Unknown'}`}
            tabIndex={0}
            role="img"
          >
            {getAvatarContent()}
          </div>

          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full text-[12px] font-bold text-zinc-600 dark:text-zinc-400 transition-all active:scale-95 border border-zinc-200/50 dark:border-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-600 shadow-sm min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue"
          >
            <LogOut className="w-3.5 h-3.5 opacity-60" />
            <span className="hidden md:inline">{t('userCenter.logout')}</span>
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn()}
          className="flex items-center gap-2 px-5 py-2.5 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 rounded-full text-[13px] font-bold hover:opacity-90 transition-all active:scale-95 shadow-xl shadow-zinc-950/10 dark:shadow-zinc-50/10 group min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-500"
        >
          <LogIn className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          <span>{t('userCenter.login')}</span>
        </button>
      )}
    </div>
  )
}

export default UserCenter