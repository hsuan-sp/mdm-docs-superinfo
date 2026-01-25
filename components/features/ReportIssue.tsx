import React, { useState, useMemo } from 'react'
import { useLanguage } from '../../hooks/useLanguage'
import { useRouter } from 'next/router'
import { useConfig } from 'nextra-theme-docs'
import { createPortal } from 'react-dom'
import { Mail, Copy, X, FileText } from 'lucide-react'

const ReportIssue = () => {
  const { language } = useLanguage()
  const router = useRouter()
  const config = useConfig()
  const [showDialog, setShowDialog] = useState(false)

  const t = useMemo(() => {
    const isZh = language === 'zh-TW'
    const pageTitle = config.title || 'Untitled'
    
    // Client-side URL detection
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'Unknown URL'

    // Context Detection
    let category = isZh ? '一般頁面' : 'General'
    if (currentUrl.includes('/glossary/')) category = isZh ? '術語表' : 'Glossary'
    if (currentUrl.includes('/qa/')) category = isZh ? '問答庫' : 'Q&A'

    const unifiedBody = `=== PAGE ISSUE REPORT / 頁面問題回報 ===

[PAGE CONTEXT / 頁面資訊]
- Title / 標題: ${pageTitle}
- URL / 網址: ${currentUrl}
- Category / 類別: ${category}

[ISSUE TYPE / 問題類型]
(Please mark with [x] / 請在括號中填入 x)
[ ] Content Accuracy / 內容準確性 (e.g. Incorrect technical info / 技術資訊錯誤)
[ ] Outdated Info / 資訊過時 (e.g. Does not match iOS 26 specifications / 已不符 2026 規格)
[ ] Translation / 翻譯建議 (e.g. Phrasing or Terminology / 術語或語句優化)
[ ] Technical Bug / 技術故障 (e.g. Layout or Function error / 頁面功能異常)
[ ] Broken Link / 連結失效 (e.g. Image or External link / 圖片或連結失效)

[DESCRIPTION & EXAMPLES / 詳細描述與範例]
(Please describe the issue below. Example: "The DDM section in acc-11 mentions iOS 25, but it should be iOS 26.")
(請在下方詳述問題。範例：「acc-11 中的 DDM 描述提到 iOS 25，應更正為 iOS 26。」)

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
          dialogDesc:
            'If mail client fails to open, please copy the info below and send to our team:',
          copyEmail: 'Copy Email',
          copyTemplate: 'Copy Template',
          close: 'Close',
          template: unifiedBody,
        }
  }, [language, config.title, router.asPath])

  const openReport = () => {
    const start = Date.now()
    window.location.href = t.mailtoLink

    setTimeout(() => {
      if (Date.now() - start < 2000) {
        setShowDialog(true)
      }
    }, 500)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="mt-4">
      <button
        onClick={openReport}
        title={t.title}
        className="inline-flex items-center gap-1.5 px-3 py-1 text-[13px] text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-600 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all font-medium"
      >
        <Mail className="w-3.5 h-3.5" />
        {t.label}
      </button>

      {showDialog && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setShowDialog(false)}
        >
          <div 
            className="bg-white dark:bg-zinc-900 rounded-2xl p-6 w-full max-w-lg shadow-2xl border border-zinc-200 dark:border-zinc-800"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-3 text-zinc-900 dark:text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              {t.dialogTitle}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
              {t.dialogDesc}
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1.5">Email</label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-zinc-50 dark:bg-zinc-950 px-3 py-2 rounded-lg text-sm font-mono border border-zinc-100 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200">
                    {t.email}
                  </code>
                  <button 
                    onClick={() => copyToClipboard(t.email)}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-auto"
                    title={t.copyEmail}
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1.5">Template</label>
                <div className="flex flex-col gap-2">
                  <pre className="bg-zinc-50 dark:bg-zinc-950 p-3 rounded-lg text-xs font-mono border border-zinc-100 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap max-h-[150px] overflow-y-auto custom-scrollbar">
                    {t.template}
                  </pre>
                  <button 
                    onClick={() => copyToClipboard(t.template)}
                    className="flex items-center justify-center gap-2 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-xs font-bold"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    {t.copyTemplate}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <button 
                className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded-lg text-sm font-bold transition flex items-center gap-2"
                onClick={() => setShowDialog(false)}
              >
                <X className="w-4 h-4" />
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

export default ReportIssue
