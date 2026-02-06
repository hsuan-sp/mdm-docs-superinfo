"use client"

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom' // ✅ 導入 Portal
import { X, Copy, Check } from 'lucide-react'

interface ReportTranslations {
  dialogTitle?: string;
  dialogDesc?: string;
  close?: string;
  [key: string]: string | undefined; // 允許其他屬性以便相容
}

interface ReportIssueDialogProps {
  isOpen: boolean
  onClose: () => void
  template: string
  email: string
  t: ReportTranslations
}

const ReportIssueDialog: React.FC<ReportIssueDialogProps> = ({ isOpen, onClose, template, email, t }) => {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedTemplate, setCopiedTemplate] = useState(false)
  const [mounted, setMounted] = useState(false) // ✅ 處理客戶端掛載

  useEffect(() => {
    setMounted(true)
    if (isOpen) {
      document.body.style.overflow = 'hidden' // ✅ 開啟時鎖定背景捲動
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => { document.body.style.overflow = 'auto' }
  }, [isOpen])

  if (!isOpen || !mounted) return null

  const copyToClipboard = async (text: string, type: 'email' | 'template') => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === 'email') {
        setCopiedEmail(true)
        setTimeout(() => setCopiedEmail(false), 2000)
      } else {
        setCopiedTemplate(true)
        setTimeout(() => setCopiedTemplate(false), 2000)
      }
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  // ✅ 使用 createPortal 渲染至 body 最上層
  return createPortal(
    <div 
      className="fixed inset-0 z-11000 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-900 rounded-3xl sm:rounded-4xl border border-zinc-100 dark:border-zinc-800 shadow-2xl animate-in zoom-in-95 duration-300 no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-4 sm:mb-6 gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white mb-2">
                {t.dialogTitle || '專業問題回報'}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-zinc-400 dark:text-zinc-500 leading-relaxed">
                {t.dialogDesc || '如無法自動開啟郵件程式，請複製以下資訊並寄送至技術團隊：'}
              </p>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all active:scale-90 text-zinc-400 shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {/* Email Section */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-widest px-1">Email Address</label>
              <div className="flex flex-col sm:flex-row gap-2 p-1.5 bg-zinc-50 dark:bg-black/40 border border-zinc-100 dark:border-zinc-800/50 rounded-2xl sm:items-center">
                <code className="flex-1 px-3 py-2 sm:py-0 text-xs sm:text-sm font-bold text-zinc-600 dark:text-zinc-300 truncate font-mono">{email}</code>
                <button 
                  onClick={() => copyToClipboard(email, 'email')}
                  className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap active:scale-95 ${
                    copiedEmail 
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' 
                      : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-blue-500'
                  }`}
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedEmail ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Template Section */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-widest px-1">Report Template</label>
              <div className="relative group">
                <pre className="w-full h-40 sm:h-48 overflow-y-auto p-4 bg-zinc-50 dark:bg-black/40 border border-zinc-100 dark:border-zinc-800/50 rounded-2xl text-[11px] sm:text-[12px] leading-relaxed text-zinc-500 dark:text-zinc-400 font-mono">
                  {template}
                </pre>
                <div className="absolute bottom-3 right-3">
                  <button 
                    onClick={() => copyToClipboard(template, 'template')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black shadow-xl transition-all active:scale-95 ${
                      copiedTemplate 
                        ? 'bg-green-500 text-white' 
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20'
                    }`}
                  >
                    {copiedTemplate ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="hidden sm:inline">{copiedTemplate ? 'Template Copied' : 'Copy Template'}</span>
                    <span className="sm:hidden">{copiedTemplate ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="mt-6 sm:mt-8 flex justify-end">
            <button 
              onClick={onClose}
              className="px-8 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-2xl text-sm font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all active:scale-95 min-w-30"
            >
              {t.close || '關閉'}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default ReportIssueDialog