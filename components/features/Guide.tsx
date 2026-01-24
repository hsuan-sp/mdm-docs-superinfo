"use client"
import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { useRouter } from 'nextra/hooks'
import { Search, ChevronDown, Tag, AlertCircle, X, ChevronRight, Menu, Maximize2, Minimize2, Settings2, Filter } from 'lucide-react'
import { QAModule, QAItem } from '@/types'
import EmptyState from '@/components/ui/EmptyState'

import { translations } from '@/locales'
import { useLanguage } from '@/hooks/useLanguage'

interface GuideProps {
  allData: QAModule[]
}

const Guide: React.FC = () => {
  const router = useRouter()
  const { language: locale } = useLanguage()
  const t = translations[locale as keyof typeof translations]?.guide || translations['zh-TW'].guide

  const [allData, setAllData] = useState<QAModule[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeSource, setActiveSource] = useState<string | 'All'>('All')
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())
  const [fontScale, setFontScale] = useState(0.9)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  
  // Infinite Scroll State
  const [visibleCount, setVisibleCount] = useState(20)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/guide?lang=${locale}`)
        if (res.ok) {
          const data = await res.json()
          setAllData(data)
        }
      } catch (error) {
        console.error('Failed to fetch guide data', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [locale])

  // Reset visible count on search/filter change
  useEffect(() => {
    setVisibleCount(20)
  }, [searchQuery, activeSource])

  // 獲取章節題目數量的輔助函式
  const getChapterCount = useCallback((source: string) => {
    const module = allData.find(m => m.source === source)
    if (!module) return 0
    return module.sections.reduce((total, section) => total + section.items.length, 0)
  }, [allData])

  const totalCount = useMemo(() => {
    return allData.reduce((total, module) => total + module.sections.reduce((t, s) => t + s.items.length, 0), 0)
  }, [allData])

  const filteredFullData = useMemo(() => {
    let baseData = allData
    if (activeSource !== 'All') {
      baseData = allData.filter(m => m.source === activeSource)
    }

    if (!searchQuery.trim()) return baseData

    const query = searchQuery.toLowerCase()
    return baseData.map(module => ({
      ...module,
      sections: module.sections.map(section => ({
        ...section,
        items: section.items.filter(item => 
          item.question.toLowerCase().includes(query) || 
          item.answer.toLowerCase().includes(query) ||
          item.tags?.some(tag => tag.toLowerCase().includes(query))
        )
      })).filter(section => section.items.length > 0)
    })).filter(module => module.sections.length > 0)
  }, [allData, activeSource, searchQuery])

  // Flatten items for virtualization/pagination
  const visibleModules = useMemo(() => {
    let count = 0
    return filteredFullData.map(module => ({
      ...module,
      sections: module.sections.map(section => {
        const items = section.items
        const remaining = visibleCount - count
        if (remaining <= 0) return { ...section, items: [] }
        
        const slice = items.slice(0, remaining)
        count += slice.length
        return { ...section, items: slice }
      }).filter(s => s.items.length > 0)
    })).filter(m => m.sections.length > 0)
  }, [filteredFullData, visibleCount])

  const hasMore = useMemo(() => {
    const currentShown = visibleModules.reduce((acc, m) => acc + m.sections.reduce((a, s) => a + s.items.length, 0), 0)
    const totalFiltered = filteredFullData.reduce((acc, m) => acc + m.sections.reduce((a, s) => a + s.items.length, 0), 0)
    return currentShown < totalFiltered
  }, [visibleModules, filteredFullData])

  // Intersection Observer for Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setVisibleCount(prev => prev + 20)
        }
      },
      { threshold: 0.1 }
    )
    
    const sentinel = document.getElementById('scroll-sentinel')
    if (sentinel) observer.observe(sentinel)

    return () => observer.disconnect()
  }, [hasMore, visibleModules])

  // Font scale classes
  const fontClasses = useMemo(() => {
    if (fontScale === 0.8) return 'text-[13px] prose-sm'
    if (fontScale === 0.9) return 'text-[14px] prose-sm'
    if (fontScale === 1.1) return 'text-[17px] prose-lg'
    if (fontScale === 1.2) return 'text-[19px] prose-xl'
    return 'text-[16px] prose-base'
  }, [fontScale])

  const toggleItem = (id: string) => {
    const next = new Set(openItems)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setOpenItems(next)
  }

  const expandAll = () => {
    const allIds = new Set<string>()
    filteredFullData.forEach(module => {
      module.sections.forEach(section => {
        section.items.forEach(item => allIds.add(item.id))
      })
    })
    setOpenItems(allIds)
    setIsDrawerOpen(false)
  }

  const collapseAll = () => {
    setOpenItems(new Set())
    setIsDrawerOpen(false)
  }

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

      <div className="mb-6">
        <p className="text-[11px] font-black uppercase tracking-widest text-zinc-400 px-2 mb-4">{t.categoryTitle || '章節篩選'}</p>
        <nav className="grid grid-cols-2 lg:flex lg:flex-col gap-2">
          <button
            onClick={() => { setActiveSource('All'); setIsDrawerOpen(false); }}
            className={`flex items-center justify-between px-4 py-3 rounded-xl text-[14px] font-bold transition-all ${activeSource === 'All' ? 'bg-blue-600 text-white shadow-lg' : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-100 dark:border-zinc-800/50 flex-1'}`}
          >
            <div className="flex items-center gap-2">
              <Menu className="w-4 h-4" />
              {t.allQuestions}
            </div>
            <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${activeSource === 'All' ? 'bg-white/20' : 'bg-zinc-100 dark:bg-zinc-800'}`}>{totalCount}</span>
          </button>
          
          {allData.map(module => (
            <button
              key={module.source}
              onClick={() => { setActiveSource(module.source); setIsDrawerOpen(false); }}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-[14px] font-bold transition-all ${activeSource === module.source ? 'bg-blue-600 text-white shadow-lg' : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-100 dark:border-zinc-800/50 flex-1'}`}
            >
              <span className="truncate">{module.source}</span>
              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${activeSource === module.source ? 'bg-white/20' : 'bg-zinc-100 dark:bg-zinc-800'}`}>{getChapterCount(module.source)}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-8">
        <button 
          onClick={expandAll}
          className="flex items-center justify-center gap-2 px-3 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl text-[12px] font-black uppercase tracking-widest hover:bg-blue-100 border border-blue-100 dark:border-blue-900/30 transition-all"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          {t.expandAll}
        </button>
        <button 
          onClick={collapseAll}
          className="flex items-center justify-center gap-2 px-3 py-3 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 rounded-xl text-[12px] font-black uppercase tracking-widest hover:bg-zinc-100 border border-zinc-100 dark:border-zinc-800 transition-all"
        >
          <Minimize2 className="w-3.5 h-3.5" />
          {t.collapseAll}
        </button>
      </div>

      <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800">
        <p className="text-[11px] font-black uppercase tracking-widest text-zinc-400 mb-4">{t.fontScaleTitle}</p>
        <div className="flex items-center justify-between p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl">
          {[0.85, 0.9, 1, 1.1, 1.15].map(scale => (
            <button
              key={scale}
              onClick={() => setFontScale(scale)}
              className={`flex-1 flex items-center justify-center py-2 rounded-lg text-[13px] font-bold transition-all ${fontScale === scale ? 'bg-white dark:bg-zinc-800 text-blue-600 shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}
            >
              {scale === 0.85 ? 'A--' : scale === 0.9 ? 'A-' : scale === 1 ? 'A' : scale === 1.1 ? 'A+' : 'A++'}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-4"></div>
          <div className="w-48 h-4 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-0 lg:gap-12 py-10">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-[320px] flex-shrink-0 sticky top-28 h-[calc(100vh-8rem)]">
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 px-6 lg:px-0">
        {searchQuery && (
          <div className="mb-10 p-6 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-3xl flex items-center justify-between animate-in fade-in slide-in-from-top-4">
            <p className="text-[#0071e3] font-bold">
              {t.searchResult.replace('{q}', searchQuery)}
            </p>
            <button 
              onClick={() => setSearchQuery('')}
              className="text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-blue-600"
            >
              {t.clearSearch}
            </button>
          </div>
        )}

        {visibleModules.length > 0 ? (
          <div className="space-y-16">
            {visibleModules.map(module => (
              <section key={module.source} id={module.source} className="scroll-mt-32 space-y-8">
                <div className="p-6 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl flex items-center justify-between border border-blue-100/50 dark:border-blue-900/20">
                   <h2 className="text-xl font-black tracking-tight text-[#0071e3] m-0">
                     {module.source}
                   </h2>
                </div>

                <div className="space-y-4">
                {module.sections.map((section, sIdx) => (
                  <div key={sIdx} className="space-y-6">
                    {section.title !== module.source && (
                      <h3 className="text-base font-black text-zinc-800 dark:text-zinc-200 mt-10 mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                        {section.title}
                      </h3>
                    )}
                    <div className="space-y-4">
                      {section.items.map(item => (
                        <div 
                          key={item.id}
                          className={`group transition-all duration-300 rounded-3xl border-2 ${
                            openItems.has(item.id) 
                              ? 'bg-white dark:bg-zinc-900 border-blue-500/30 shadow-2xl shadow-blue-500/10' 
                              : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-blue-500/20 hover:shadow-xl'
                          }`}
                        >
                          <button 
                            onClick={() => toggleItem(item.id)}
                            className="w-full text-left p-6 sm:p-7 md:p-8 flex items-start gap-4 md:gap-5"
                          >
                            <div className="flex-1 min-w-0">
                              {item.important && (
                                <span className="inline-flex items-center px-2.5 py-1 mb-4 bg-[#ff3b30] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-lg shadow-lg shadow-red-500/20">
                                  {t.important}
                                </span>
                              )}
                              <h4 className={`text-base sm:text-lg md:text-xl font-bold leading-snug transition-colors ${
                                openItems.has(item.id) ? 'text-[#0071e3]' : 'text-[#1d1d1f] dark:text-zinc-100'
                              }`}>
                                {item.question}
                              </h4>
                            </div>
                            <div className={`mt-1.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                              openItems.has(item.id) 
                                ? 'rotate-180 bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'
                            }`}>
                               <ChevronDown className="w-5 h-5" />
                            </div>
                          </button>

                          {openItems.has(item.id) && (
                            <div className="px-6 pb-8 pt-0 sm:px-7 md:px-8 md:pb-10 animate-in fade-in slide-in-from-top-2 duration-300">
                              <div 
                                className="prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 leading-relaxed prose-p:mb-6 prose-headings:text-zinc-800 dark:prose-headings:text-zinc-100"
                                style={{ '--current-font-scale': fontScale } as any}
                                dangerouslySetInnerHTML={{ __html: item.answer }}
                              />
                              {item.tags && item.tags.length > 0 && (
                                <div className="mt-10 flex flex-wrap gap-2">
                                  {item.tags.map(tag => (
                                    <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full text-[11px] font-bold border border-zinc-200 dark:border-zinc-700">
                                      <Tag className="w-3.5 h-3.5" />
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                </div>
              </section>
            ))}
            
            {/* Scroll Sentinel */}
            {hasMore && (
              <div id="scroll-sentinel" className="py-8 flex justify-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
              </div>
            )}
          </div>
        ) : (
          <EmptyState onClear={() => { setSearchQuery(''); setActiveSource('All'); }} actionText={t.clearSearch} />
        )}
      </main>

      {/* Mobile Floating Button - 模仿截圖 4 */}
      <div className="lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center gap-2 px-6 py-4 bg-[#0071e3] text-white rounded-full font-black text-[15px] shadow-2xl shadow-blue-500/40 active:scale-95 transition-all border border-blue-400/50"
        >
          <Search className="w-5 h-5" />
          {t.menuBtn}
        </button>
      </div>

      {/* Mobile Drawer Overlay - 模仿截圖 3 */}
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
  )
}

export default Guide
