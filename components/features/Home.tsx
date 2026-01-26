"use client"

import React from 'react'
// ✅ Nextra 4 / App Router 下必須從 next/navigation 引入 useRouter
import { useRouter } from 'next/navigation'
import { 
  User, Package, Smartphone, GraduationCap, Apple, Wrench, Monitor, HelpCircle, Book,
  ArrowRight, ChevronRight
} from 'lucide-react'
import { translations } from '@/locales'
import { useLanguage } from '@/hooks/useLanguage'

const Home: React.FC = () => {
  const router = useRouter()
  const { language: locale } = useLanguage()
  
  // 取得對應語言的翻譯資料
  const t = translations[locale as keyof typeof translations]?.home || translations['zh-TW'].home

  const handleRoute = (id: string) => {
    if (id === 'glossary') {
      router.push('/glossary')
    } else {
      // 在 App Router 中，push 帶 hash 的路徑依然有效
      router.push(`/guide#${id}`)
    }
  }

  return (
    <div className="relative isolate min-h-screen">
      {/* Background Decor */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-288.75" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
      </div>

      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-16 text-center lg:px-8 lg:pt-32">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <p className="text-[10px] font-black uppercase tracking-[0.2em]">{t.eyebrow}</p>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.1] mb-8 animate-in fade-in slide-in-from-top-6 duration-1000 delay-100">
          {t.title}
        </h1>
        
        <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-top-8 duration-1000 delay-200">
          <p className="text-xl md:text-2xl font-semibold text-zinc-700 dark:text-zinc-200">
            {t.intro1}
          </p>
          <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
            {t.intro2}
          </p>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
          <button
            onClick={() => router.push('/guide')}
            className="w-full sm:w-auto rounded-2xl bg-blue-600 px-10 py-4 text-sm font-black text-white shadow-2xl shadow-blue-500/40 hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 group"
          >
            {t.explore}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => router.push('/glossary')}
            className="w-full sm:w-auto px-10 py-4 text-sm font-black text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all flex items-center justify-center gap-2 group bg-white/50 dark:bg-zinc-800/30 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-700/50 rounded-2xl hover:bg-white dark:hover:bg-zinc-800"
          >
            {t.searchGlossary} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="mx-auto max-w-7xl px-6 pb-32 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
          {t.features.map((f: any, idx: number) => {
            return (
              <div 
                key={f.id} 
                onClick={() => handleRoute(f.id)}
                className="group cursor-pointer relative flex flex-col justify-between rounded-4xl p-8 bg-white/40 dark:bg-zinc-900/40 border border-white/20 dark:border-zinc-800/20 backdrop-blur-xl shadow-2xl shadow-zinc-200/20 dark:shadow-none hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-500"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="absolute inset-0 rounded-4xl bg-linear-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-[1.25rem] bg-white dark:bg-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 text-4xl">
                    {f.emoji || "✨"}
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-zinc-900 dark:text-zinc-100 tracking-tight">
                    {f.title}
                  </h3>
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600/60 dark:text-blue-400/60 mb-4">
                    {f.subtitle}
                  </p>
                  <p className="text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium">
                    {f.desc}
                  </p>
                </div>
                
                <div className="mt-8 flex justify-end relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                   <div className="p-3 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-lg group-hover:bg-blue-600 group-hover:scale-110 transition-all">
                     <ArrowRight className="w-5 h-5" />
                   </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Home