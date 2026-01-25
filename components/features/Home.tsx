"use client"
import React from 'react'
import { useRouter } from 'nextra/hooks'
import { 
  User, Package, Smartphone, GraduationCap, Apple, Wrench, Monitor, HelpCircle, Book,
  ArrowRight, ChevronRight
} from 'lucide-react'
import { translations } from '@/locales'
import { useLanguage } from '@/hooks/useLanguage'

const Home: React.FC = () => {
  const router = useRouter()
  const { language: locale } = useLanguage()
  const t = translations[locale as keyof typeof translations]?.home || translations['zh-TW'].home

  const handleRoute = (id: string) => {
    if (id === 'glossary') {
      router.push('/glossary')
    } else {
      router.push(`/guide#${id}`)
    }
  }

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-16 text-center lg:px-8 lg:pt-32">
        <p className="text-xs md:text-sm font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 mb-6 animate-in fade-in slide-in-from-top-4 duration-700">
          Superinfo Apple MDM Hub
        </p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight mb-6 animate-in fade-in slide-in-from-top-6 duration-700 delay-100">
          {t.title}
        </h1>
        <div className="space-y-4 animate-in fade-in slide-in-from-top-8 duration-700 delay-200">
          <p className="text-lg md:text-xl font-bold text-zinc-600 dark:text-zinc-300">
            {t.intro1}
          </p>
          <p className="text-base md:text-lg font-medium text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {t.intro2}
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
          <button
            onClick={() => router.push('/guide')}
            className="w-full sm:w-auto rounded-full bg-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
          >
            {t.explore}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => router.push('/glossary')}
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-center gap-1 group bg-zinc-100 dark:bg-zinc-800/50 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800"
          >
            {t.searchGlossary} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="mx-auto max-w-7xl px-6 pb-32 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
          {t.features.map((f: any) => {
            return (
              <div 
                key={f.id} 
                onClick={() => handleRoute(f.id)}
                className="group cursor-pointer relative flex flex-col justify-between rounded-3xl p-6 md:p-8 bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/50 backdrop-blur-sm shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-50 dark:bg-zinc-800 text-4xl group-hover:scale-110 transition-transform duration-300">
                    {f.emoji || "✨"}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-zinc-100 tracking-tight">
                    {f.title}
                  </h3>
                  <p className="text-[13px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
                    {f.subtitle}
                  </p>
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {f.desc}
                  </p>
                </div>
                
                <div className="mt-6 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/20">
                     <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
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
