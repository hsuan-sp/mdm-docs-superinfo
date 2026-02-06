"use client"

import React, { useEffect, useState } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { translations } from '@/locales'
import ReportIssue from '@/components/features/ReportIssue'

const Footer = () => {
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <footer className="w-full pt-20 flex flex-col items-center text-center space-y-12 mt-24 mb-16 px-6 py-16 animate-reveal">
      <div className="space-y-6 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-apple-text dark:text-apple-dark-text tracking-tight">
          {mounted ? t('footer.company') : "Superinfo"}
        </h2>
        <p className="text-[14px] md:text-[16px] font-medium text-apple-gray leading-relaxed">
          {mounted ? t('footer.badges') : "Apple Authorized Education Specialist"}
        </p>
      </div>
      
      <div>
        <a 
          href="https://www.superinfo.com.tw" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-apple-blue text-white font-bold text-base shadow-lg shadow-apple-blue/20 hover:bg-apple-blue-hover transition-all hover:scale-[1.02] active:scale-95 min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-apple-blue"
        >
          {mounted ? t('footer.slogan') : "Superinfo Service"}
        </a>
      </div>

      <div className="w-16 h-px bg-zinc-200 dark:bg-zinc-800"></div>

      <div className="space-y-4 pb-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6">
          <p className="text-[12px] font-medium text-apple-gray tracking-tight">
            {mounted ? t('footer.copyright') : "Copyright © 2026 Superinfo"}
          </p>
          <p className="text-[12px] font-medium text-apple-gray tracking-tight border-t md:border-t-0 md:border-l border-apple-border dark:border-apple-dark-border pt-2 md:pt-0 md:pl-6">
            {mounted ? t('footer.info') : ""}
          </p>
        </div>
        <div className="pt-6 opacity-60 hover:opacity-100 transition-opacity duration-500">
          <ReportIssue />
        </div>
      </div>
    </footer>
  )
}

export default Footer