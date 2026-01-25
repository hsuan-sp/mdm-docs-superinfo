import React from 'react'
import Link from 'next/link'
import { Home, AlertCircle, ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import { translations } from '@/locales'

export default function Custom404() {
  const { language } = useLanguage()
  const t = translations[language as keyof typeof translations]?.error404 || translations['zh-TW'].error404

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Animated Error Icon */}
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full scale-150 animate-pulse" />
          <div className="relative bg-white dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 p-8 rounded-[2.5rem] shadow-2xl">
            <AlertCircle className="w-16 h-16 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-lg uppercase tracking-widest">
            Error 404
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight">
          {t.title}
        </h1>
        <p 
          className="text-zinc-500 dark:text-zinc-400 font-bold mb-10 leading-relaxed text-lg"
          dangerouslySetInnerHTML={{ __html: t.subtitle }}
        />

        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <Link 
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-[15px] hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
          >
            <Home className="w-4 h-4" />
            {t.backHome}
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-2xl font-black text-[15px] hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all active:scale-95 border border-zinc-200 dark:border-zinc-700"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.backPrev}
          </button>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-100 dark:border-zinc-800">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
            Superinfo Apple MDM Hub
          </p>
        </div>
      </div>
    </div>
  )
}
