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
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-apple-bg dark:bg-zinc-800 animate-pulse" />
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
    <div className="flex items-center gap-3">
      {user ? (
        <div className="flex items-center gap-3">
          <div className="hidden xl:flex flex-col items-end leading-none">
            <span className="text-[10px] font-bold text-apple-gray uppercase tracking-widest mb-0.5">Authorized</span>
            <span className="text-[12px] font-bold text-[#1d1d1f] dark:text-white">
              {(user.email ?? 'User').split('@')[0]}
            </span>
          </div>
          
          <div 
            className="w-9 h-9 rounded-full bg-apple-blue text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-500/20 cursor-help select-none ring-2 ring-white dark:ring-black ring-offset-2 ring-offset-apple-blue/10 transition-all hover:scale-105"
            title={`已登入：${user.email ?? 'Unknown'}`}
          >
            {getAvatarContent()}
          </div>

          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 px-4 py-2 hover:bg-[#f5f5f7] dark:hover:bg-zinc-800 rounded-full text-[13px] font-bold text-[#1d1d1f] dark:text-white transition-all active:scale-95 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
          >
            <LogOut className="w-3.5 h-3.5 opacity-70" />
            <span className="hidden md:inline">{t('userCenter.logout')}</span>
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn()}
          className="flex items-center gap-2 px-5 py-2 bg-apple-blue text-white rounded-full text-[13px] font-bold hover:bg-[#0077ed] transition-all active:scale-95 shadow-md shadow-blue-500/10 group"
        >
          <LogIn className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          <span>{t('userCenter.login')}</span>
        </button>
      )}
    </div>
  )
}

export default UserCenter