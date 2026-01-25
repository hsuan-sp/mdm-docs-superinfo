"use client"
import React, { useState } from 'react'
import { X, Copy, Mail, Check } from 'lucide-react'

interface ReportIssueDialogProps {
  isOpen: boolean
  onClose: () => void
  template: string
  email: string
  t: any
}

const ReportIssueDialog: React.FC<ReportIssueDialogProps> = ({ isOpen, onClose, template, email, t }) => {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedTemplate, setCopiedTemplate] = useState(false)

  if (!isOpen) return null

  const copyToClipboard = async (text: string, type: 'email' | 'template') => {
    await navigator.clipboard.writeText(text)
    if (type === 'email') {
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    } else {
      setCopiedTemplate(true)
      setTimeout(() => setCopiedTemplate(false), 2000)
    }
  }

  return (
    <div 
      className="fixed inset-0 z-[2000] flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-900 rounded-3xl sm:rounded-[32px] border border-zinc-100 dark:border-zinc-800 shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6 md:p-8">
          <div className="flex justify-between items-start mb-4 sm:mb-6 gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white mb-2">{t.dialogTitle || '專業問題回報'}</h3>
              <p className="text-xs sm:text-sm font-medium text-zinc-400 dark:text-zinc-500 leading-relaxed">
                {t.dialogDesc || '如無法自動開啟郵件程式，請複製以下資訊並寄送至技術團隊：'}
              </p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 flex-shrink-0">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest px-1">Email Address</label>
              <div className="flex flex-col sm:flex-row gap-2 p-1.5 bg-zinc-50 dark:bg-black border border-zinc-100 dark:border-zinc-800 rounded-2xl sm:items-center">
                <code className="flex-1 px-3 py-2 sm:py-0 text-xs sm:text-sm font-bold text-zinc-600 dark:text-zinc-300 truncate">{email}</code>
                <button 
                  onClick={() => copyToClipboard(email, 'email')}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${copiedEmail ? 'bg-green-500 text-white' : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-200 hover:bg-zinc-100'}`}
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedEmail ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest px-1">Report Template</label>
              <div className="relative group">
                <pre className="w-full h-40 sm:h-48 overflow-y-auto p-3 sm:p-4 bg-zinc-50 dark:bg-black border border-zinc-100 dark:border-zinc-800 rounded-2xl text-[11px] sm:text-[12px] leading-relaxed text-zinc-500 dark:text-zinc-400 font-mono scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                  {template}
                </pre>
                <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3">
                  <button 
                    onClick={() => copyToClipboard(template, 'template')}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold shadow-lg transition-all ${copiedTemplate ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  >
                    {copiedTemplate ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="hidden sm:inline">{copiedTemplate ? 'Template Copied' : 'Copy Template'}</span>
                    <span className="sm:hidden">{copiedTemplate ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 flex justify-end">
            <button 
              onClick={onClose}
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-200 rounded-2xl text-sm font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all min-w-[100px]"
            >
              {t.close || '關閉'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportIssueDialog
