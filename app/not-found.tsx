"use client"
import React from 'react'
import Link from 'next/link'
import { Home, AlertCircle, ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 bg-white dark:bg-apple-dark-bg">
      <div className="max-w-md w-full text-center">
        {/* Animated Error Icon */}
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-apple-blue/20 blur-3xl rounded-full scale-150 animate-pulse" />
          <div className="relative bg-white dark:bg-apple-dark-card border-2 border-apple-border dark:border-apple-dark-border p-8 rounded-5xl shadow-2xl">
            <AlertCircle className="w-16 h-16 text-apple-blue dark:text-apple-blue" />
          </div>
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-lg uppercase tracking-widest">
            Error 404
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-apple-text dark:text-apple-dark-text mb-4 tracking-tight">
          {t('error404.title')}
        </h1>
        <p 
          className="text-apple-gray dark:text-apple-dark-gray font-bold mb-10 leading-relaxed text-lg"
          dangerouslySetInnerHTML={{ __html: t('error404.subtitle') }}
        />

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 justify-center px-2 sm:px-0">
          <Link 
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-apple-blue text-white rounded-2xl font-black text-[15px] hover:bg-apple-blue-hover transition-all shadow-xl shadow-apple-blue/20 active:scale-95 min-h-touch-target"
          >
            <Home className="w-4 h-4" />
            {t('error404.backHome')}
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-apple-bg dark:bg-apple-dark-border text-apple-text dark:text-apple-dark-text rounded-2xl font-black text-[15px] hover:bg-apple-gray/10 dark:hover:bg-apple-dark-border/80 transition-all active:scale-95 border border-apple-border dark:border-apple-dark-border min-h-touch-target"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('error404.backPrev')}
          </button>
        </div>

        <div className="mt-16 pt-8 border-t border-apple-border dark:border-apple-dark-border">
          <p className="text-xs font-bold text-apple-gray dark:text-apple-dark-gray uppercase tracking-widest">
            Superinfo Apple MDM Hub
          </p>
        </div>
      </div>
    </div>
  )
}