"use client" // ✅ 1. 必須加入，因為使用了 Hooks 和 DOM 操作

import React, { useState, useMemo, useEffect } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { usePathname } from 'next/navigation' // ✅ 2. App Router 必須改用 navigation
import { useConfig } from 'nextra-theme-docs'
import { createPortal } from 'react-dom'
import { Mail, Copy, X, FileText, Check } from 'lucide-react'

import { LucideIconComponent } from '@/types'

// 1. 複製按鈕小元件 (保持不變)
const CopyButton = ({ text, label, icon: Icon }: { text: string, label: string, icon: LucideIconComponent }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button 
      onClick={handleCopy}
      className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg transition text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ${
        copied 
          ? 'bg-green-600 text-white hover:bg-green-700' 
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
      title={label}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
      {copied ? 'Copied!' : label}
    </button>
  )
}

// 定義 Nextra Config 的最小需求介面
interface NextraConfig {
  normalizePagesResult?: {
    activeMetadata?: {
      title?: string;
    };
  };
}

const ReportIssue = () => {
  const { language } = useLanguage()
  const pathname = usePathname() // ✅ 3. 取代原本的 router.asPath
  
  // ✅ 4. 使用自定義介面取代 any，確保型別安全
  const config = useConfig() as unknown as NextraConfig 
  
  const [showDialog, setShowDialog] = useState(false)
  const [mounted, setMounted] = useState(false)

  // 防止 Hydration Mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // 支援 ESC 鍵關閉視窗
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowDialog(false)
    }
    if (showDialog) window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [showDialog])

  const t = useMemo(() => {
    const isZh = language === 'zh-TW'
    
    // ✅ 5. Nextra 4 取得標題的安全路徑
    const pageTitle = config?.normalizePagesResult?.activeMetadata?.title || 'Untitled'
    
    const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

    let category = isZh ? '一般頁面' : 'General'
    if (currentUrl.includes('/glossary/')) category = isZh ? '術語表' : 'Glossary'
    if (currentUrl.includes('/qa/')) category = isZh ? '問答庫' : 'Q&A'

    const unifiedBody = `=== PAGE ISSUE REPORT / 頁面問題回報 ===

[PAGE CONTEXT / 頁面資訊]
Title / 標題: ${pageTitle}
URL / 網址: ${currentUrl}
Category / 類別: ${category}

[ISSUE TYPE / 問題類型]
(Please mark with [x] / 請在括號中填入 x)
[ ] Content Accuracy / 內容準確性
[ ] Outdated Info / 資訊過時
[ ] Translation / 翻譯建議
[ ] Technical Bug / 技術故障
[ ] Broken Link / 連結失效

[DESCRIPTION / 詳細描述]
Description:

=== END OF REPORT ===`.trim()

    const subjectPrefix = isZh ? '[問題回報]' : '[Issue Report]'
    const subject = encodeURIComponent(`${subjectPrefix} ${pageTitle}`)
    const body = encodeURIComponent(unifiedBody)
    const mailto = `mailto:hsuan@superinfo.com.tw?subject=${subject}&body=${body}`

    return isZh
      ? {
          label: '回報頁面問題',
          title: '回報此頁面的錯誤或建議',
          email: 'hsuan@superinfo.com.tw',
          mailtoLink: mailto,
          dialogTitle: '專業問題回報',
          dialogDesc: '如無法自動開啟郵件程式，請複製以下資訊並寄送至技術團隊：',
          copyEmail: '複製 Email',
          copyTemplate: '複製模板',
          close: '關閉',
          template: unifiedBody,
        }
      : {
          label: 'Report Page Issue',
          title: 'Report errors or suggestions for this page',
          email: 'hsuan@superinfo.com.tw',
          mailtoLink: mailto,
          dialogTitle: 'Issue Report',
          dialogDesc: 'If mail client fails to open, please copy the info below and send to our team:',
          copyEmail: 'Copy Email',
          copyTemplate: 'Copy Template',
          close: 'Close',
          template: unifiedBody,
        }
  }, [language, config, pathname]) // ✅ 6. 依賴項更新為 pathname

  const openReport = (e: React.MouseEvent) => {
    e.preventDefault()
    window.location.href = t.mailtoLink
    
    setTimeout(() => {
      setShowDialog(true)
    }, 800)
  }

  if (!mounted) return null

  return (
    <div className="mt-6 print:hidden">
      <button
        onClick={openReport}
        title={t.title}
        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-full hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-600 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <Mail className="w-4 h-4" />
        {t.label}
      </button>

      {showDialog && createPortal(
        <div 
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setShowDialog(false)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="bg-white dark:bg-zinc-900 rounded-2xl p-6 w-full max-w-lg shadow-2xl border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                {t.dialogTitle}
              </h3>
              <button 
                onClick={() => setShowDialog(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition min-h-11 min-w-11 flex items-center justify-center -mr-2 -mt-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
              {t.dialogDesc}
            </p>

            <div className="space-y-5 mb-6">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1.5">Email</label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-zinc-50 dark:bg-zinc-950 px-3 py-2 rounded-lg text-sm font-mono border border-zinc-100 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 select-all">
                    {t.email}
                  </code>
                  <div className="w-24">
                    <CopyButton text={t.email} label="Copy" icon={Copy} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1.5">Template</label>
                <div className="flex flex-col gap-2">
                  <pre className="bg-zinc-50 dark:bg-zinc-950 p-3 rounded-lg text-xs font-mono border border-zinc-100 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap max-h-50 overflow-y-auto custom-scrollbar select-all">
                    {t.template}
                  </pre>
                  <CopyButton text={t.template} label={t.copyTemplate} icon={FileText} />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <button 
                className="px-5 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded-lg text-sm font-bold transition flex items-center gap-2 min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                onClick={() => setShowDialog(false)}
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

export default ReportIssue;