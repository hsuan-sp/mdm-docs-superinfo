"use client"
import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { Search, ChevronDown, Tag, AlertCircle, X, ChevronRight, Menu, Maximize2, Minimize2, Settings2, Filter } from 'lucide-react'
import { QAModule } from '../../types'
import EmptyState from '../../components/ui/EmptyState'
import { translations } from '../../locales'
import { useLanguage } from '../../hooks/useLanguage'
import { useUser } from '../../hooks/useLogtoUser'
import AuthGate from '../ui/AuthGate'

// 如果沒有 useDebounce，可以簡單寫一個或暫時不用
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  React.useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

// --- 子組件：側邊欄內容 (獨立出來避免重渲染效能問題) ---
const SidebarContent: React.FC<{
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  activeSource: string;
  setActiveSource: (v: string) => void;
  allData: QAModule[];
  getChapterCount: (v: string) => number;
  totalCount: number;
  expandAll: () => void;
  collapseAll: () => void;
  fontScale: number;
  setFontScale: (v: number) => void;
  setIsDrawerOpen: (v: boolean) => void;
  t: any;
}> = ({ 
  searchQuery, setSearchQuery, activeSource, setActiveSource, 
  allData, getChapterCount, totalCount, expandAll, collapseAll, 
  fontScale, setFontScale, setIsDrawerOpen, t 
}) => {
  return (
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar pb-10">
      <div className="relative group mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-apple-gray group-focus-within:text-apple-blue transition-colors" />
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('guide.searchPlaceholder')}
          className="w-full pl-12 pr-10 py-4 bg-apple-bg dark:bg-apple-dark-bg/50 border border-transparent focus:bg-white dark:focus:bg-black focus:border-apple-blue rounded-2xl text-[16px] outline-none transition-all font-medium"
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
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-apple-gray px-4 mb-5">{t('guide.categoryTitle')}</p>
        <nav className="grid grid-cols-2 lg:flex lg:flex-col gap-1.5">
          <button
            onClick={() => { setActiveSource('All'); setIsDrawerOpen(false); }}
            className={`sidebar-btn ${activeSource === 'All' ? 'sidebar-btn-active' : 'text-apple-text dark:text-apple-dark-text'}`}
          >
            <div className="flex items-center gap-3">
              <Menu className="w-4 h-4 opacity-70" />
              {t('guide.allQuestions')}
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${activeSource === 'All' ? 'bg-white/20' : 'bg-apple-bg dark:bg-apple-dark-border'}`}>{totalCount}</span>
          </button>
          
          {allData.map(module => (
            <button
              key={module.source}
              onClick={() => { setActiveSource(module.source); setIsDrawerOpen(false); }}
              className={`sidebar-btn ${activeSource === module.source ? 'sidebar-btn-active' : 'text-apple-text dark:text-apple-dark-text'}`}
            >
              <span className="truncate pr-4 text-left">{module.source}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${activeSource === module.source ? 'bg-white/20' : 'bg-apple-bg dark:bg-apple-dark-border'}`}>{getChapterCount(module.source)}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-10">
        <button 
          onClick={expandAll}
          className="flex items-center justify-center gap-2 px-3 py-3 bg-apple-blue/5 text-apple-blue rounded-xl text-[12px] font-bold uppercase tracking-widest hover:bg-apple-blue/10 transition-all border border-apple-blue/10"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          {t('guide.expandAll')}
        </button>
        <button 
          onClick={collapseAll}
          className="flex items-center justify-center gap-2 px-3 py-3 bg-apple-bg dark:bg-apple-dark-bg text-apple-gray rounded-xl text-[12px] font-bold uppercase tracking-widest hover:bg-apple-gray/10 transition-all border border-transparent"
        >
          <Minimize2 className="w-3.5 h-3.5" />
          {t('guide.collapseAll')}
        </button>
      </div>

      <div className="mt-auto pt-8 border-t border-apple-border dark:border-apple-dark-border">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-apple-gray mb-5">{t('guide.fontScaleTitle')}</p>
        <div className="flex items-center justify-between p-1 bg-apple-bg dark:bg-apple-dark-bg rounded-xl">
          {[0.85, 0.9, 1, 1.1, 1.15].map(scale => (
            <button
              key={scale}
              onClick={() => setFontScale(scale)}
              className={`flex-1 flex items-center justify-center py-2.5 rounded-lg text-[13px] font-bold transition-all ${fontScale === scale ? 'bg-white dark:bg-apple-dark-border text-apple-blue shadow-sm' : 'text-apple-gray hover:text-apple-text'}`}
            >
              {scale === 0.85 ? 'A--' : scale === 0.9 ? 'A-' : scale === 1 ? 'A' : scale === 1.1 ? 'A+' : 'A++'}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}


interface GuideProps {
  initialData?: QAModule[]
}

const Guide: React.FC<GuideProps> = ({ initialData }) => {
  // const router = useRouter() // 沒用到可以移除
  const { t, language: locale } = useLanguage()

  // 🔍 避免在英文語系下閃過中文初值
  const isInitialZH = locale === 'zh-TW';
  const [allData, setAllData] = useState<QAModule[]>((isInitialZH && initialData) ? initialData : [])
  const [isDataLoading, setIsDataLoading] = useState(!isInitialZH || !initialData)
  
  // 搜尋與篩選
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedQuery = useDebounce(searchQuery, 300) 
  
  const [activeSource, setActiveSource] = useState<string | 'All'>('All')
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())
  const [fontScale, setFontScale] = useState(1) 
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const lastLocale = React.useRef<string | null>(null)
  
  const { user, isLoading: isAuthLoading, isAuthenticated } = useUser()
  
  // Infinite Scroll State
  const [visibleCount, setVisibleCount] = useState(20)

  useEffect(() => {
    // 🔍 偵測是否在 GitHub Pages 環境
    const isGitHubPages = typeof window !== 'undefined' && window.location.hostname.includes('github.io');
    if (isGitHubPages) return;
    if (isAuthLoading) return;
    if (!isAuthenticated) return;

    // 🔍 語系與資料同步邏輯
    // 如果切換回中文且有初始資料，直接使用初始資料
    if (locale === 'zh-TW' && initialData && initialData.length > 0) {
      if (lastLocale.current !== 'zh-TW') {
        setAllData(initialData);
        setIsDataLoading(false);
        lastLocale.current = 'zh-TW';
      }
      return;
    }

    // 如果語系沒變且已經有資料，跳過
    if (lastLocale.current === locale && allData.length > 0) return;

    const fetchData = async () => {
      setIsDataLoading(true)
      try {
        const res = await fetch(`/api/guide?lang=${locale}`)
        if (res.ok) {
          const data = await res.json()
          setAllData(data)
          lastLocale.current = locale;
        }
      } catch (error) {
        console.error('Failed to fetch guide data', error)
      } finally {
        setIsDataLoading(false)
      }
    }
    fetchData()
  }, [locale, user, isAuthLoading, isAuthenticated, initialData, allData.length])

  // Reset visible count on search/filter change
  useEffect(() => {
    setVisibleCount(20)
  }, [debouncedQuery, activeSource]) // 依賴 debouncedQuery

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

    // 使用 debouncedQuery
    if (!debouncedQuery.trim()) return baseData

    const query = debouncedQuery.toLowerCase()
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
  }, [allData, activeSource, debouncedQuery]) // 依賴 debouncedQuery

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
  }, [hasMore, visibleModules]) // 這裡依賴正確

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

  const memoizedSidebar = useMemo(() => (
    <SidebarContent 
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      activeSource={activeSource}
      setActiveSource={setActiveSource}
      allData={allData}
      getChapterCount={getChapterCount}
      totalCount={totalCount}
      expandAll={expandAll}
      collapseAll={collapseAll}
      fontScale={fontScale}
      setFontScale={setFontScale}
      setIsDrawerOpen={setIsDrawerOpen}
      t={t}
    />
  ), [searchQuery, activeSource, allData, totalCount, fontScale, locale])

  if (isAuthLoading) return null
  if (!user) return <AuthGate />

  if (isDataLoading) {
    return (
      <div className="flex flex-col lg:flex-row gap-0 lg:gap-16 py-12 opacity-60">
        <aside className="hidden lg:block w-[320px] shrink-0 space-y-6">
          <div className="h-14 w-full bg-apple-bg dark:bg-apple-dark-bg rounded-2xl animate-pulse" />
          <div className="h-64 w-full bg-apple-bg dark:bg-apple-dark-bg rounded-2xl animate-pulse" />
        </aside>
        <main className="flex-1 space-y-10">
          {[1,2].map(i => (
            <div key={i} className="h-40 w-full bg-apple-bg dark:bg-apple-dark-bg rounded-apple-lg animate-pulse" />
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
            {memoizedSidebar}
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0 px-6 lg:px-0">
            {/* Mobile Category Sidebar (Horizontal Scroll) */}
            <div className="lg:hidden -mx-6 px-6 mb-10 sticky top-14 bg-white/80 dark:bg-apple-dark-bg/80 backdrop-blur-xl z-30 border-b border-apple-border dark:border-apple-dark-border py-4 overflow-x-auto no-scrollbar flex items-center gap-2">
              <button
                onClick={() => setActiveSource('All')}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-[13px] font-bold transition-all ${
                  activeSource === 'All' 
                    ? 'bg-apple-blue text-white shadow-lg shadow-apple-blue/25' 
                    : 'bg-apple-bg dark:bg-apple-dark-border text-apple-gray'
                }`}
              >
                {t('guide.allLabel')}
              </button>
              {allData.map(module => (
                <button
                  key={module.source}
                  onClick={() => setActiveSource(module.source)}
                  className={`whitespace-nowrap px-5 py-2.5 rounded-full text-[13px] font-bold transition-all ${
                    activeSource === module.source 
                      ? 'bg-apple-blue text-white shadow-lg shadow-apple-blue/25' 
                      : 'bg-apple-bg dark:bg-apple-dark-border text-apple-gray'
                  }`}
                >
                  {module.source}
                </button>
              ))}
            </div>

            {searchQuery && (
              <div className="mb-12 p-8 bg-apple-blue/5 border border-apple-blue/10 rounded-apple-lg flex items-center justify-between">
                <p className="text-apple-blue font-bold text-lg">
                  {t('guide.searchResult', { q: searchQuery })}
                </p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-[12px] font-bold uppercase tracking-[0.2em] text-apple-gray hover:text-apple-blue transition-colors"
                >
                  {t('guide.clearSearch')}
                </button>
              </div>
            )}

            {visibleModules.length > 0 ? (
              <div className="space-y-24">
                {visibleModules.map(module => (
                  <section key={module.source} id={module.source} className="scroll-mt-32 space-y-10">
                    <div className="p-8 bg-apple-bg dark:bg-apple-dark-bg/40 rounded-apple-lg flex items-center justify-between border border-transparent">
                      <h2 className="text-2xl font-bold tracking-tight text-apple-blue m-0">
                        {module.source}
                      </h2>
                    </div>

                    <div className="space-y-6">
                    {module.sections.map((section, sIdx) => (
                      <div key={sIdx} className="space-y-8">
                        {section.title !== module.source && (
                          <h3 className="text-lg font-bold text-apple-text dark:text-apple-dark-text mt-12 mb-6 px-4 border-l-4 border-apple-blue/30 leading-none">
                            {section.title}
                          </h3>
                        )}
                        <div className="space-y-4">
                          {section.items.map(item => (
                            <div 
                              key={item.id}
                              className={`apple-card group transition-all duration-500 overflow-hidden ${
                                openItems.has(item.id) 
                                  ? 'bg-white dark:bg-apple-dark-card ring-2 ring-apple-blue/20 shadow-2xl scale-[1.01]' 
                                  : ''
                              }`}
                            >
                              <button 
                                onClick={() => toggleItem(item.id)}
                                className="w-full text-left p-8 sm:p-10 flex items-start gap-6"
                              >
                                <div className="flex-1 min-w-0">
                                  {item.important && (
                                    <span className="inline-flex items-center px-3 py-1 mb-5 bg-apple-red text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-lg shadow-red-500/20">
                                      {t('guide.important')}
                                    </span>
                                  )}
                                  <h4 className={`text-lg sm:text-xl font-bold leading-tight transition-colors ${
                                    openItems.has(item.id) ? 'text-apple-blue' : 'text-apple-text dark:text-apple-dark-text'
                                  }`}>
                                    {item.question}
                                  </h4>
                                </div>
                                <div className={`mt-1.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                                  openItems.has(item.id) 
                                    ? 'rotate-180 bg-apple-blue text-white shadow-xl shadow-apple-blue/20' 
                                    : 'bg-apple-bg dark:bg-apple-dark-border text-apple-gray'
                                }`}>
                                  <ChevronDown className="w-5 h-5" />
                                </div>
                              </button>

                              {openItems.has(item.id) && (
                                <div className="px-8 pb-10 pt-0 sm:px-10 sm:pb-12 animate-reveal">
                                  {/* 內容區域：修正字體縮放應用 */}
                                  <div 
                                    className="prose prose-zinc dark:prose-invert max-w-none text-apple-gray dark:text-apple-dark-gray leading-[1.6] prose-p:mb-6 prose-headings:text-apple-text dark:prose-headings:text-apple-dark-text"
                                    // 直接使用百分比縮放
                                    style={{ fontSize: `${fontScale * 100}%` }}
                                    dangerouslySetInnerHTML={{ __html: item.answer }}
                                  />
                                  {item.tags && item.tags.length > 0 && (
                                    <div className="mt-10 flex flex-wrap gap-2.5">
                                      {item.tags.map(tag => (
                                        <span key={tag} className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-apple-bg dark:bg-apple-dark-border text-apple-gray dark:text-apple-dark-gray rounded-full text-[11px] font-bold border border-transparent">
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
                  <div id="scroll-sentinel" className="py-12 flex justify-center">
                    <div className="w-3 h-3 bg-apple-blue rounded-full animate-ping" />
                  </div>
                )}
              </div>
            ) : (
              <EmptyState onClear={() => { setSearchQuery(''); setActiveSource('All'); }} actionText={t('guide.clearSearch')} />
            )}
          </main>

          {/* Mobile Floating Button */}
          <div className="lg:hidden fixed bottom-10 left-1/2 -translate-x-1/2 z-40">
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-2.5 px-8 py-4 bg-apple-blue text-white rounded-full font-bold text-[16px] shadow-2xl shadow-blue-500/30 active:scale-95 transition-all"
            >
              <Search className="w-5 h-5" />
              {t('guide.menuBtn')}
            </button>
          </div>

          {/* Mobile Drawer Overlay */}
          {isDrawerOpen && (
            <div className="fixed inset-0 z-100 lg:hidden animate-reveal">
              <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setIsDrawerOpen(false)} />
              <div className="absolute bottom-0 left-0 w-full h-[85vh] bg-white dark:bg-apple-dark-bg rounded-t-apple-lg shadow-2xl flex flex-col overflow-hidden">
                <div className="h-1.5 w-12 bg-apple-bg dark:bg-apple-dark-border rounded-full mx-auto mt-4 mb-6 shrink-0" />
                <div className="flex-1 overflow-y-auto px-8 pb-12 no-scrollbar">
                  {memoizedSidebar}
                </div>
              </div>
            </div>
          )}
      </div>
    </>
  )
}

export default Guide