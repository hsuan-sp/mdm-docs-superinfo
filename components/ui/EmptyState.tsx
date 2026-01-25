import React from 'react'
import { useRouter } from 'next/router'
import { SearchX } from 'lucide-react'

interface EmptyStateProps {
  icon?: string
  title?: string
  description?: string
  actionText?: string
  onClear?: () => void
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = '🔍',
  title,
  description,
  actionText,
  onClear
}) => {
  const { locale } = useRouter()
  
  const t = {
    title: locale === 'en' ? 'No results found' : '找不到相關結果',
    desc: locale === 'en' 
      ? 'Please try using different keywords or check your spelling.' 
      : '請嘗試使用不同的關鍵字，或者檢查拼字是否正確。'
  }

  return (
    <div className="text-center py-24 px-6 bg-zinc-50/50 dark:bg-white/[0.02] rounded-[32px] border border-zinc-200/50 dark:border-white/10 mt-10 transition-all">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-blue-50 dark:bg-blue-500/10 rounded-[24px] flex items-center justify-center text-blue-600 dark:text-blue-400">
          <SearchX className="w-10 h-10" />
        </div>
      </div>
      <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-3 tracking-tight">{title || t.title}</h3>
      <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-sm mx-auto leading-relaxed font-medium">{description || t.desc}</p>
      {actionText && (
        <button 
          onClick={onClear}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all active:scale-95 shadow-xl shadow-blue-500/20"
        >
          {actionText}
        </button>
      )}
    </div>
  )
}

export default EmptyState
