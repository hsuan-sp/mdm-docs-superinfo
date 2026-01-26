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
  const { t, language: locale } = useLanguage()
  
  // Since features is an array, we access it from the raw translations object for now
  // OR we can define a standard for arrays in our i18n system.
  // For simplicity, let's get the features array directly.
  const features = translations[locale as keyof typeof translations].home.features;

  const handleRoute = (id: string) => {
    if (id === 'glossary') {
      router.push('/glossary')
    } else {
      // 在 App Router 中，push 帶 hash 的路徑依然有效
      router.push(`/guide#${id}`)
    }
  }

  return (
    <div className="relative isolate min-h-screen overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[72.1875rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-apple-blue to-apple-purple opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>

      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 text-center lg:px-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-apple-bg dark:bg-apple-dark-bg/50 border border-apple-border dark:border-apple-dark-border text-apple-blue mb-10 animate-reveal">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-apple-blue/50 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-apple-blue"></span>
          </span>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em]">{t('home.eyebrow')}</p>
        </div>
        
        <h1 className="text-fluid-4xl font-bold tracking-tight text-apple-text dark:text-apple-dark-text leading-[1.05] mb-10 animate-reveal [animation-delay:100ms] text-balance">
          {t('home.title')}
        </h1>
        
        <div className="max-w-3xl mx-auto space-y-8 animate-reveal [animation-delay:200ms]">
          <p className="text-xl md:text-2xl font-medium text-apple-text dark:text-apple-dark-text opacity-90">
            {t('home.intro1')}
          </p>
          <p className="text-base md:text-lg text-apple-gray dark:text-apple-dark-gray leading-relaxed max-w-2xl mx-auto">
            {t('home.intro2')}
          </p>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 animate-reveal [animation-delay:300ms]">
          <button
            onClick={() => router.push('/guide')}
            className="w-full sm:w-auto rounded-full bg-apple-blue px-12 py-4 text-base font-bold text-white shadow-xl shadow-apple-blue/20 hover:bg-apple-blue-hover transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 group"
          >
            {t('home.explore')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => router.push('/glossary')}
            className="w-full sm:w-auto px-10 py-4 text-base font-bold text-apple-text dark:text-apple-dark-text hover:text-apple-blue transition-all flex items-center justify-center gap-2 group"
          >
            {t('home.searchGlossary')} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="mx-auto max-w-7xl px-6 pb-40 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 animate-reveal [animation-delay:500ms]">
          {features.map((f: any, idx: number) => {
            return (
              <div 
                key={f.id} 
                onClick={() => handleRoute(f.id)}
                className="apple-card group cursor-pointer p-10 flex flex-col h-full"
                style={{ animationDelay: `${idx * 100 + 500}ms` }}
              >
                <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-apple-bg dark:bg-apple-dark-border transition-all duration-500 group-hover:scale-110 text-4xl shadow-sm">
                  {f.emoji || "✨"}
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-apple-text dark:text-apple-dark-text tracking-tight">
                  {f.title}
                </h3>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-apple-blue opacity-70 mb-5">
                  {f.subtitle}
                </p>
                <p className="text-[16px] leading-[1.4] text-apple-gray dark:text-apple-dark-gray font-medium flex-1">
                  {f.desc}
                </p>
                
                <div className="mt-10 flex items-center gap-2 text-apple-blue font-bold text-sm tracking-tight group-hover:gap-3 transition-all">
                   {t('home.learnMore')} <ArrowRight className="w-4 h-4" />
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