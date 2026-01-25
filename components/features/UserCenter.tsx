"use client"
import React from 'react'
import { LogIn, LogOut, User } from 'lucide-react'
import { translations } from '../../locales'
import { useLanguage } from '../../hooks/useLanguage'
import { useUser } from '../../hooks/useLogtoUser'

const UserCenter: React.FC = () => {
  const { language: locale } = useLanguage()
  const t = translations[locale as keyof typeof translations]?.userCenter || translations['zh-TW'].userCenter
  const { user, isLoading, signIn, signOut } = useUser()

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 md:gap-3">
      {user ? (
        <div className="flex items-center gap-2">
          <button
            onClick={signOut}
            className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full text-[12px] md:text-[13px] font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all active:scale-95 whitespace-nowrap"
          >
            <LogOut className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span>{t.logout || '登出'}</span>
          </button>
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
            {user.username?.[0]?.toUpperCase() || user.primaryEmail?.[0]?.toUpperCase() || <User className="w-4 h-4" />}
          </div>
        </div>
      ) : (
        <button
          onClick={signIn}
          className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 bg-blue-600 text-white rounded-full text-[12px] md:text-[13px] font-bold hover:bg-blue-700 hover:shadow-lg shadow-blue-500/20 transition-all active:scale-95 whitespace-nowrap"
        >
          <LogIn className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span>{t.login}</span>
        </button>
      )}
    </div>
  )
}

export default UserCenter
