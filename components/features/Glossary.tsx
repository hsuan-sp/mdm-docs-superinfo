"use client"
import React, { useState, useMemo, useEffect } from 'react'
import { Search, X, Lightbulb, SortAsc, SortDesc, Filter, Grid, List as ListIcon, LayoutGrid } from 'lucide-react'
import { GlossaryItem } from '@/types'
import EmptyState from '@/components/ui/EmptyState'
import { translations } from '@/locales'
import { useLanguage } from '@/hooks/useLanguage'
import { useUser } from '@/hooks/useLogtoUser'
import AuthGate from '../ui/AuthGate'

// 如果沒有 useDebounce，可以簡單寫一個或暫時不用
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

const CATEGORIES = [
  'All', 'Core', 'Enrollment', 'Apple', 'Security', 'Network',
  'Hardware', 'Apps', 'Education', 'macOS', 'Jamf', 'Other',
]

interface GlossaryProps {
  initialData?: GlossaryItem[];
}

const Glossary: React.FC<GlossaryProps> = ({ initialData }) => {
  const { t, language: locale } = useLanguage()

  const [data, setData] = useState<GlossaryItem[]>(initialData || [])
  const [isLoading, setIsLoading] = useState(!initialData)
  
  // 搜尋相關
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedQuery = useDebounce(searchQuery, 300) 

  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [fontScale, setFontScale] = useState(1) 
  const [gridCols, setGridCols] = useState<1 | 2 | 3>(1)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  
  const { user, isLoading: isAuthLoading, isAuthenticated } = useUser()

  useEffect(() => {
    const isGitHubPages = typeof window !== 'undefined' && window.location.hostname.includes('github.io');
    if (initialData && data.length > 0) return;
    if (isGitHubPages) return;
    if (isAuthLoading) return;
    if (!isAuthenticated) return;

    const fetchData = async () => {
      setIsLoading(true) 
      try {
        const res = await fetch(`/api/glossary?lang=${locale}`)
        if (res.ok) {
          const result = await res.json()
          setData(result)
        }
      } catch (error) {
        console.error('Failed to fetch glossary data', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [locale, user, isAuthLoading, isAuthenticated, initialData])

  const getChapterCount = (cat: string) => {
    if (cat === 'All') return data.length
    return data.filter(item => 
      Array.isArray(item.category) 
        ? item.category.includes(cat) 
        : item.category === cat
    ).length
  }

  const filteredTerms = useMemo(() => {
    const q = debouncedQuery.toLowerCase().trim()
    
    let filtered = data.filter(item => {
      const matchesSearch = !q || 
        item.term.toLowerCase().includes(q) || 
        item.definition.toLowerCase().includes(q) || 
        item.analogy.toLowerCase().includes(q)

      const matchesCategory = selectedCategory === 'All' || 
        (Array.isArray(item.category) 
          ? item.category.includes(selectedCategory) 
          : item.category === selectedCategory)

      return matchesSearch && matchesCategory
    })

    return filtered.sort((a, b) => {
      const termA = a.term.toUpperCase()
      const termB = b.term.toUpperCase()
      return sortOrder === 'asc' ? termA.localeCompare(termB) : termB.localeCompare(termA)
    })
  }, [data, debouncedQuery, selectedCategory, sortOrder])

  const getCategoryName = (cat: string) => 
    cat === 'All' ? t('glossary.allLabel') : t(`glossary.categories.${cat}` as any) || cat

  const SidebarContent = () => (
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar pb-10">
      <div className="relative group mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#86868b] group-focus-within:text-apple-blue transition-colors" />
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('glossary.searchPlaceholder')}
          className="w-full pl-12 pr-10 py-4 bg-[#f5f5f7] dark:bg-zinc-900/50 border border-transparent focus:bg-white dark:focus:bg-black focus:border-[#0071e3] rounded-2xl text-[16px] outline-none transition-all font-medium"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="mb-10">
        <p className="hidden lg:block text-[11px] font-bold uppercase tracking-[0.2em] text-[#86868b] px-4 mb-5">{t('glossary.sidebarTitle')}</p>
        <nav className="grid grid-cols-2 lg:flex lg:flex-col gap-1.5">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setIsDrawerOpen(false); }}
              className={`sidebar-btn ${selectedCategory === cat ? 'sidebar-btn-active' : 'text-[#1d1d1f] dark:text-[#f5f5f7]'}`}
            >
              <span className="truncate pr-4 text-left">{getCategoryName(cat)}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${selectedCategory === cat ? 'bg-white/20' : 'bg-zinc-100 dark:bg-zinc-800'}`}>{getChapterCount(cat)}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mb-12">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#86868b] px-4 mb-5">
          {t('glossary.layoutTitle')}
        </p>
        <div className="flex items-center gap-1.5 p-1.5 bg-[#f5f5f7] dark:bg-zinc-900/50 rounded-2xl">
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => setGridCols(num as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all ${
                gridCols === num 
                  ? 'bg-white dark:bg-zinc-800 text-apple-blue shadow-sm' 
                  : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
              }`}
            >
              {num === 1 && <ListIcon className="w-4 h-4" />}
              {num === 2 && <Grid className="w-4 h-4" />}
              {num === 3 && <LayoutGrid className="w-4 h-4" />}
              <span className="text-xs font-bold">{num}x</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-8 border-t border-zinc-100 dark:border-zinc-800">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#86868b] mb-5">{t('glossary.fontScaleTitle')}</p>
        <div className="flex items-center justify-between p-1 bg-[#f5f5f7] dark:bg-zinc-900 rounded-xl">
          {[0.8, 0.9, 1, 1.1, 1.2].map(scale => (
            <button
              key={scale}
              onClick={() => setFontScale(scale)}
              className={`flex-1 flex items-center justify-center py-2.5 rounded-lg text-[13px] font-bold transition-all ${fontScale === scale ? 'bg-white dark:bg-zinc-800 text-apple-blue shadow-sm' : 'text-[#86868b] hover:text-[#1d1d1f]'}`}
            >
              {scale === 0.8 ? 'A--' : scale === 0.9 ? 'A-' : scale === 1 ? 'A' : scale === 1.1 ? 'A+' : 'A++'}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  if (isAuthLoading) return null 
  if (!user) return <AuthGate />

  if (isLoading) {
    return (
      <div className="flex flex-col lg:flex-row gap-0 lg:gap-16 py-12 opacity-60">
        <aside className="hidden lg:block w-[320px] shrink-0 space-y-6">
          <div className="h-14 w-full bg-[#f5f5f7] dark:bg-zinc-900 rounded-2xl animate-pulse" />
          <div className="h-64 w-full bg-[#f5f5f7] dark:bg-zinc-900 rounded-2xl animate-pulse" />
        </aside>
        <main className="flex-1 space-y-8">
          {[1,2,3].map(i => (
            <div key={i} className="h-56 w-full bg-[#f5f5f7] dark:bg-zinc-900 rounded-[2.5rem] animate-pulse" />
          ))}
        </main>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-0 lg:gap-16 py-12 animate-reveal">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-[320px] shrink-0 sticky top-28 h-[calc(100vh-8rem)]">
            <SidebarContent />
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0 px-6 lg:px-0">
            <div className="flex items-center justify-between mb-10">
              <div className="text-[12px] font-bold text-[#86868b] uppercase tracking-[0.2em] flex items-center gap-2.5">
                <Filter className="w-3.5 h-3.5 text-apple-blue" />
                {t('glossary.totalTerms', { n: filteredTerms.length })}
              </div>
              <button 
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-apple-blue hover:opacity-80 transition-all active:scale-95"
              >
                {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                {sortOrder === 'asc' ? t('glossary.sortAZ') : t('glossary.sortZA')}
              </button>
            </div>

            {filteredTerms.length > 0 ? (
              <div className={`grid grid-cols-1 ${gridCols === 2 ? 'md:grid-cols-2' : gridCols === 3 ? 'md:grid-cols-2 xl:grid-cols-3' : ''} gap-8`}>
                {filteredTerms.map((item, idx) => (
                  <article 
                    key={item.term}
                    className={`apple-card flex flex-col ${gridCols === 1 ? 'p-10 sm:p-12 md:p-14' : 'p-8 md:p-10'} relative overflow-hidden`}
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <header className="mb-8 relative z-10">
                      <div className="flex flex-wrap gap-2 mb-6">
                        {(Array.isArray(item.category) ? item.category : [item.category]).map(cat => (
                          <span 
                            key={cat} 
                            className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] bg-apple-blue/10 dark:bg-apple-blue/20 text-apple-blue border border-apple-blue/10"
                          >
                            {getCategoryName(cat)}
                          </span>
                        ))}
                      </div>
                      <h3 className={`${gridCols === 1 ? 'text-3xl sm:text-4xl' : 'text-xl md:text-2xl'} font-bold tracking-tight text-[#1d1d1f] dark:text-white group-hover:text-apple-blue transition-colors duration-300`}>
                        {item.term}
                      </h3>
                    </header>

                    <div 
                      className={`flex-1 prose prose-zinc dark:prose-invert max-w-none text-[#515154] dark:text-zinc-400 leading-[1.6] mb-8 relative z-10 ${gridCols > 1 ? 'text-[15px]' : 'text-[17px]'}`}
                      style={{ fontSize: `${fontScale * 100}%` }}
                      dangerouslySetInnerHTML={{ __html: item.definition }}
                    />

                    {item.analogy && (
                      <div 
                        className={`p-6 sm:p-8 bg-[#f5f5f7] dark:bg-zinc-800/50 rounded-3xl relative z-10 border border-transparent hover:border-apple-blue/10 transition-all`}
                        style={{ fontSize: `${fontScale * 100}%` }}
                      >
                        <div className="flex items-center gap-2 mb-4 text-[#86868b] dark:text-[#f5f5f7]/60 font-bold text-[11px] uppercase tracking-[0.2em]">
                          <Lightbulb className="w-4 h-4 text-amber-500" />
                          {t('glossary.analogyLabel')}
                        </div>
                        <div 
                          className={`${gridCols === 1 ? 'text-[16px] md:text-[18px]' : 'text-[15px]'} text-[#1d1d1f] dark:text-zinc-200 leading-relaxed font-medium italic`}
                          dangerouslySetInnerHTML={{ __html: item.analogy }}
                        />
                      </div>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState onClear={() => { setSearchQuery(''); setSelectedCategory('All'); }} actionText={t('glossary.clearSearch')} title={t('glossary.emptyState', { q: searchQuery })} />
            )}
          </main>

          {/* Mobile Floating Button */}
          <div className="lg:hidden fixed bottom-10 left-1/2 -translate-x-1/2 z-40">
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-2.5 px-8 py-4 bg-apple-blue text-white rounded-full font-bold text-[16px] shadow-2xl shadow-blue-500/30 active:scale-95 transition-all"
            >
              <Search className="w-5 h-5" />
              {t('glossary.menuBtn')}
            </button>
          </div>

          {/* Mobile Drawer */}
          {isDrawerOpen && (
            <div className="fixed inset-0 z-[100] lg:hidden animate-reveal">
              <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setIsDrawerOpen(false)} />
              <div className="absolute bottom-0 left-0 w-full h-[85vh] bg-white dark:bg-black rounded-t-[2.5rem] shadow-2xl flex flex-col overflow-hidden">
                <div className="h-1.5 w-12 bg-zinc-200 dark:bg-zinc-800 rounded-full mx-auto mt-4 mb-6 shrink-0" />
                <div className="flex-1 overflow-y-auto px-8 pb-12 no-scrollbar">
                  <SidebarContent />
                </div>
              </div>
            </div>
          )}
      </div>
    </>
  )
}

export default Glossary