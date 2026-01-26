"use client"

import React from 'react'
import { SearchX } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

interface EmptyStateProps {
  icon?: React.ReactNode // ✅ 允許傳入 Lucide Icon 或 Emoji
  title?: string
  description?: string
  actionText?: string
  onClear?: () => void
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onClear
}) => {
  const { t } = useLanguage()
  
  return (
    <div className="text-center py-24 px-8 bg-transparent animate-reveal">
      <div className="flex justify-center mb-8">
        <div className="w-24 h-24 bg-[rgb(245,245,247)] dark:bg-zinc-900 rounded-apple-lg flex items-center justify-center text-[rgb(134,134,139)] shadow-inner">
          {icon || <SearchX className="w-10 h-10" />}
        </div>
      </div>
      
      <h3 className="text-2xl md:text-3xl font-bold text-[#1d1d1f] dark:text-white mb-4 tracking-tight">
        {title || t('glossary.emptyState', { q: '' })}
      </h3>
      
      <p className="text-[rgb(134,134,139)] dark:text-zinc-400 mb-12 max-w-sm mx-auto leading-relaxed font-medium text-lg">
        {description || t('guide.searchPlaceholder')}
      </p>
      
      {actionText && (
        <button 
          onClick={onClear}
          className="px-10 py-3.5 bg-apple-blue hover:bg-[#0077ed] text-white rounded-full font-bold transition-all active:scale-95 shadow-xl shadow-blue-500/20"
        >
          {actionText}
        </button>
      )}
    </div>
  )
}

export default EmptyState