"use client"
import React, { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'nextra/hooks'
import { Search, X, Lightbulb, Tag, SortAsc, SortDesc, Filter, Menu, Grid, List as ListIcon, LayoutGrid } from 'lucide-react'
import { GlossaryItem } from '@/types'
import EmptyState from '@/components/ui/EmptyState'

import { translations } from '@/locales'
import { useLanguage } from '@/hooks/useLanguage'
import { useUser } from '@/hooks/useLogtoUser'
import AuthGate from '../ui/AuthGate'

interface GlossaryProps {
  data: GlossaryItem[]
}

const CATEGORIES = [
  'All',
  'Core',
  'Enrollment',
  'Apple',
  'Security',
  'Network',
  'Hardware',
  'Apps',
  'Education',
  'macOS',
  'Jamf',
  'Other',
]

const Glossary: React.FC = () => {
  const router = useRouter()
  const { language: locale } = useLanguage()
  const t = translations[locale as keyof typeof translations]?.glossary || translations['zh-TW'].glossary

  const [data, setData] = useState<GlossaryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [fontScale, setFontScale] = useState(0.9) 
  const [gridCols, setGridCols] = useState<1 | 2 | 3>(1)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { user, isLoading: isAuthLoading } = useUser()

  useEffect(() => {
    if (isAuthLoading || !user) return

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
  }, [locale, user, isAuthLoading])

  const getChapterCount = (cat: string) => {
    if (cat === 'All') return data.length
    return data.filter(item => 
      Array.isArray(item.category) 
        ? item.category.includes(cat) 
        : item.category === cat
    ).length
  }

  const filteredTerms = useMemo(() => {
    let filtered = data.filter(item => {
      const q = searchQuery.toLowerCase().trim()
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
  }, [data, searchQuery, selectedCategory, sortOrder])

  const getCategoryName = (cat: string) => 
    cat === 'All' ? t.allLabel : (t.categories as any)[cat] || cat

  const SidebarContent = () => (
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar pb-10">
      <div className="relative group mb-8 lg:mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full pl-12 pr-10 py-3.5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-[15px] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
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

      <div className="mb-8">
        <p className="hidden lg:block text-[11px] font-black uppercase tracking-widest text-zinc-400 px-4 mb-4">{t.sidebarTitle}</p>
        <nav className="grid grid-cols-2 lg:flex lg:flex-col gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setIsDrawerOpen(false); }}
              className={`sidebar-btn ${selectedCategory === cat ? 'sidebar-btn-active' : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'}`}
            >
              <span className="truncate pr-4">{getCategoryName(cat)}</span>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${selectedCategory === cat ? 'bg-white/20' : 'bg-zinc-100 dark:bg-zinc-800'}`}>{getChapterCount(cat)}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Layout Grid Switcher */}
      <div className="mb-10 lg:mb-12 pt-2">
        <p className="text-[11px] font-black uppercase tracking-widest text-zinc-400 px-1 mb-4">
          {t.layoutTitle || '版面配置'}
        </p>
        <div className="flex items-center gap-2 p-1.5 bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => setGridCols(num as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${
                gridCols === num 
                  ? 'bg-white dark:bg-zinc-800 text-[#0071e3] shadow-md border border-zinc-200 dark:border-zinc-700' 
                  : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
              }`}
            >
              {num === 1 && <ListIcon className="w-4 h-4" />}
              {num === 2 && <Grid className="w-4 h-4" />}
              {num === 3 && <LayoutGrid className="w-4 h-4" />}
              <span className="text-xs font-black">{num}x</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800">
        <p className="text-[11px] font-black uppercase tracking-widest text-zinc-400 mb-4">{t.fontScaleTitle}</p>
        <div className="flex items-center justify-between p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl">
          {[0.8, 0.9, 1, 1.1, 1.2].map(scale => (
            <button
              key={scale}
              onClick={() => setFontScale(scale)}
              className={`flex-1 flex items-center justify-center py-2 rounded-lg text-[13px] font-bold transition-all ${fontScale === scale ? 'bg-white dark:bg-zinc-800 text-blue-600 shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}
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
      <div className="flex flex-col lg:flex-row gap-0 lg:gap-12 py-10 opacity-60">
        <aside className="hidden lg:block w-[320px] shrink-0 space-y-4">
          <div className="h-12 w-full skeleton-pulse mb-8" />
          <div className="h-64 w-full skeleton-pulse" />
        </aside>
        <main className="flex-1 space-y-6">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-48 w-full skeleton-pulse" />
          ))}
        </main>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-0 lg:gap-12 py-10">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-[320px] flex-shrink-0 sticky top-28 h-[calc(100vh-8rem)]">
            <SidebarContent />
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0 px-6 lg:px-0">
            <div className="flex items-center justify-between mb-8">
              <div className="text-sm font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <Filter className="w-4 h-4 text-blue-500" />
                {t.totalTerms.replace('{n}', filteredTerms.length.toString())}
              </div>
              <button 
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="flex items-center gap-2 text-[13px] font-black uppercase tracking-[0.1em] text-[#0071e3] transition-all active:scale-95"
              >
                {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                {sortOrder === 'asc' ? t.sortAZ : t.sortZA}
              </button>
            </div>

            {filteredTerms.length > 0 ? (
              <div className={`grid grid-cols-1 ${gridCols === 2 ? 'md:grid-cols-2' : gridCols === 3 ? 'md:grid-cols-2 xl:grid-cols-3' : ''} gap-6`}>
                {filteredTerms.map(item => (
                  <article 
                    key={item.term}
                    className={`group flex flex-col bg-white dark:bg-zinc-900 rounded-3xl border-2 border-zinc-200 dark:border-zinc-800 hover:border-blue-500/20 ${gridCols === 1 ? 'p-10 sm:p-12 md:p-16' : 'p-8 md:p-10'} shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative`}
                  >
                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/10 transition-all duration-700" />
                    
                    <header className="mb-8 relative z-10">
                      <div className="flex flex-wrap gap-2 mb-6">
                        {(Array.isArray(item.category) ? item.category : [item.category]).map(cat => (
                          <span 
                            key={cat} 
                            className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50"
                          >
                            {getCategoryName(cat)}
                          </span>
                        ))}
                      </div>
                      <h3 className={`${gridCols === 1 ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-xl md:text-2xl'} font-black tracking-tight text-[#1d1d1f] dark:text-zinc-100 group-hover:text-[#0071e3] transition-colors duration-300`}>
                        {item.term}
                      </h3>
                    </header>

                    <div 
                      className={`flex-1 prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 leading-relaxed prose-p:mb-6 mb-8 relative z-10 ${gridCols > 1 ? 'text-sm' : ''}`}
                      style={{ '--current-font-scale': fontScale } as any}
                      dangerouslySetInnerHTML={{ __html: item.definition }}
                    />

                    {item.analogy && (
                      <div 
                        className={`${gridCols === 1 ? 'p-6 sm:p-8' : 'p-5 md:p-6'} bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-900/30 rounded-3xl relative group-hover:border-amber-300 dark:group-hover:border-amber-800/40 transition-all z-10`}
                        style={{ '--current-font-scale': fontScale } as any}
                      >
                        <div className="flex items-center gap-2 mb-4 text-amber-600 dark:text-amber-500 font-black text-xs uppercase tracking-[0.2em]">
                          <Lightbulb className="w-4 h-4" />
                          {t.analogyLabel}
                        </div>
                        <div 
                          className={`${gridCols === 1 ? 'text-[15px] md:text-[17px]' : 'text-sm'} text-zinc-800 dark:text-zinc-200 leading-relaxed font-bold italic opacity-90`}
                          style={{ fontSize: `calc(${fontScale} * ${gridCols === 1 ? '16px' : '14px'})` }}
                          dangerouslySetInnerHTML={{ __html: item.analogy }}
                        />
                      </div>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState onClear={() => { setSearchQuery(''); setSelectedCategory('All'); }} actionText={t.clearSearch} />
            )}
          </main>

          {/* Mobile Floating Button */}
          <div className="lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-2 px-6 py-4 bg-[#0071e3] text-white rounded-full font-black text-[15px] shadow-2xl shadow-blue-500/40 active:scale-95 transition-all border border-blue-400/50"
            >
              <Search className="w-5 h-5" />
              {t.menuBtn}
            </button>
          </div>

          {/* Mobile Drawer Overlay */}
          {isDrawerOpen && (
            <div className="fixed inset-0 z-[100] lg:hidden">
              <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" 
                onClick={() => setIsDrawerOpen(false)} 
              />
              <div className="absolute bottom-0 left-0 w-full h-[85vh] bg-white dark:bg-zinc-900 rounded-t-[40px] shadow-2xl animate-in slide-in-from-bottom duration-500 overflow-hidden flex flex-col">
                <div className="h-1.5 w-12 bg-zinc-200 dark:bg-zinc-800 rounded-full mx-auto mt-3 mb-6 shrink-0" />
                
                <div className="px-8 pb-4 flex items-center justify-between shrink-0">
                  <h2 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">{t.drawerTitle}</h2>
                  <button 
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-8 no-scrollbar pt-2">
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
