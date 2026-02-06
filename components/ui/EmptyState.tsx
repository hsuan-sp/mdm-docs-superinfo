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
        <div className="w-24 h-24 bg-apple-bg dark:bg-apple-dark-border rounded-apple-lg flex items-center justify-center text-apple-gray dark:text-apple-dark-gray shadow-inner">
          {icon || <SearchX className="w-10 h-10" />}
        </div>
      </div>
      
      <h3 className="text-2xl md:text-3xl font-bold text-apple-text dark:text-apple-dark-text mb-4 tracking-tight">
        {title || t('glossary.emptyState', { q: '' })}
      </h3>
      
      <p className="text-apple-gray dark:text-apple-dark-gray mb-12 max-w-sm mx-auto leading-relaxed font-medium text-lg">
        {description || t('guide.searchPlaceholder')}
      </p>
      
      {actionText && (
        <button 
          onClick={onClear}
          className="px-10 py-3.5 bg-apple-blue hover:bg-apple-blue-hover text-white rounded-full font-bold transition-all active:scale-95 shadow-xl shadow-apple-blue/20 min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-apple-blue"
        >
          {actionText}
        </button>
      )}
    </div>
  )
}

export default EmptyState