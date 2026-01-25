import React from 'react'
import { useLanguage } from '../../hooks/useLanguage'
import { translations } from '../../locales'
import ReportIssue from '../features/ReportIssue'

const Footer = () => {
  const { language } = useLanguage()
  const isZh = language === 'zh-TW'

  const t = isZh ? {
    company: "極電資訊有限公司",
    badges: "Apple 授權教育經銷商｜Apple 校園體驗中心｜軟硬體專業諮詢",
    slogan: "致力於給您最好的服務",
    copyright: "Copyright ©2026 極電資訊｜Apple 授權教育經銷商",
    info: "極電資訊有限公司 | 統一編號 23756990",
  } : {
    company: "Superinfo Computer Co., Ltd.",
    badges: "Apple Authorized Education Specialist｜Apple Campus Experience Center｜Hardware & Software Advisory",
    slogan: "Committed to excellence in service",
    copyright: "Copyright © 2026 Superinfo｜Apple Authorized Education Specialist",
    info: "Superinfo Computer Co., Ltd. | Tax ID 23756990",
  }

  return (
    <div className="w-full pt-16 flex flex-col items-center text-center space-y-8 mt-20 mb-10 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/90 backdrop-blur-sm rounded-3xl mx-4">
      <div className="space-y-4 px-4">
        <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white tracking-widest uppercase">{t.company}</h2>
        <p className="text-[12px] md:text-[14px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.1em] max-w-2xl mx-auto leading-relaxed">
          {t.badges}
        </p>
      </div>
      
      <div>
        <a 
          href="https://www.superinfo.com.tw" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm text-sm font-bold text-blue-600 hover:text-blue-500 hover:scale-105 transition-all"
        >
          {t.slogan}
        </a>
      </div>

      <div className="w-16 h-px bg-zinc-200 dark:bg-zinc-800"></div>

      <div className="space-y-2 pb-6">
        <p className="text-[11px] font-bold text-zinc-400 dark:text-zinc-600">{t.copyright}</p>
        <p className="text-[11px] font-bold text-zinc-400 dark:text-zinc-600">{t.info}</p>
        <ReportIssue />
      </div>
    </div>
  )
}

export default Footer
