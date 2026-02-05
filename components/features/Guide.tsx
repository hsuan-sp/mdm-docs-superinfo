"use client";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Search,
  ChevronDown,
  Tag,
  AlertCircle,
  X,
  ChevronRight,
  Menu,
  Maximize2,
  Minimize2,
  Settings2,
  Filter,
} from "lucide-react";
import { QAModule } from "../../types";
import EmptyState from "../../components/ui/EmptyState";
import { translations } from "../../locales";
import { useLanguage } from "../../hooks/useLanguage";
import { useUser } from "../../hooks/useLogtoUser";
import AuthGate from "../ui/AuthGate";
import BackButton from "../ui/BackButton";

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
  searchQuery,
  setSearchQuery,
  activeSource,
  setActiveSource,
  allData,
  getChapterCount,
  totalCount,
  expandAll,
  collapseAll,
  fontScale,
  setFontScale,
  setIsDrawerOpen,
  t,
}) => {
  return (
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar pb-10">
      {/* Search Input */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-apple-gray" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t("guide.searchPlaceholder")}
          className="w-full pl-10 pr-10 py-2.5 bg-apple-bg dark:bg-apple-dark-bg-secondary border border-apple-border dark:border-apple-dark-border rounded-lg text-[15px] outline-none focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-apple-gray hover:text-apple-text transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Navigation */}
      <div className="mb-6">
        <p className="text-xs font-medium text-apple-gray mb-3 px-1">
          {t("guide.categoryTitle")}
        </p>
        <nav className="space-y-1">
          <button
            onClick={() => {
              setActiveSource("All");
              setIsDrawerOpen(false);
            }}
            className={`sidebar-btn w-full ${activeSource === "All" ? "sidebar-btn-active" : ""}`}
          >
            <div className="flex items-center gap-2 font-extrabold tracking-tight">
              <Menu className="w-4 h-4" />
              <span>{t("guide.allQuestions")}</span>
            </div>
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${activeSource === "All" ? "bg-white/20 text-white" : "bg-apple-bg dark:bg-apple-dark-border text-apple-gray"}`}>
              {totalCount}
            </span>
          </button>

          {allData.map((module) => {
            const isActive = activeSource === module.source;
            return (
              <button
                key={module.source}
                onClick={() => {
                  setActiveSource(module.source);
                  setIsDrawerOpen(false);
                }}
                className={`sidebar-btn ${isActive ? "sidebar-btn-active" : ""}`}
              >
                <span className="truncate pr-4 text-left font-bold">{module.source}</span>
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${isActive ? "bg-white/20 text-white" : "bg-apple-bg dark:bg-apple-dark-border text-apple-gray"}`}
                >
                  {getChapterCount(module.source)}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-8">
        <button
          onClick={expandAll}
          className="btn-apple-secondary btn-sm w-full"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          {t("guide.expandAll")}
        </button>
        <button
          onClick={collapseAll}
          className="btn-apple-secondary btn-sm w-full text-apple-gray border-apple-gray/30 hover:bg-apple-gray/5 hover:text-apple-text hover:border-apple-gray"
        >
          <Minimize2 className="w-3.5 h-3.5" />
          {t("guide.collapseAll")}
        </button>
      </div>

      <div className="mt-auto pt-8 border-t border-apple-border dark:border-apple-dark-border">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-apple-gray/60 mb-4">
          {t("guide.fontScaleTitle")}
        </p>
        <div className="flex items-center justify-between p-1 bg-apple-bg dark:bg-apple-dark-bg/50 rounded-2xl border border-apple-border dark:border-apple-dark-border">
          {[0.85, 0.9, 1, 1.1, 1.15].map((scale) => (
            <button
              key={scale}
              onClick={() => setFontScale(scale)}
              className={`flex-1 flex items-center justify-center py-2 rounded-xl text-[12px] font-black transition-all ${
                fontScale === scale 
                  ? "bg-white dark:bg-apple-dark-border text-apple-blue shadow-lg shadow-black/5" 
                  : "text-apple-gray/60 hover:text-apple-text"
              }`}
            >
              {scale === 0.85
                ? "A--"
                : scale === 0.9
                  ? "A-"
                  : scale === 1
                    ? "A"
                    : scale === 1.1
                      ? "A+"
                      : "A++"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

interface GuideProps {
  initialData?: QAModule[];
}

const Guide: React.FC<GuideProps> = ({ initialData }) => {
  // const router = useRouter() // 沒用到可以移除
  const { t, language: locale } = useLanguage();

  // 🔍 避免在英文語系下閃過中文初值
  const isInitialZH = locale === "zh-TW";
  const [allData, setAllData] = useState<QAModule[]>(() => {
    if (isInitialZH && initialData) return initialData;
    return [];
  });
  const [isDataLoading, setIsDataLoading] = useState(
    !isInitialZH || !initialData
  );
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 300);

  const [activeSource, setActiveSource] = useState<string | "All">("All");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [fontScale, setFontScale] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const lastLocale = React.useRef<string | null>(null);

  const { user, isLoading: isAuthLoading, isAuthenticated } = useUser();

  // Infinite Scroll State
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    if (isAuthLoading) return;
    if (!isAuthenticated) return;

    // 🔍 語系與資料同步邏輯
    // 如果切換回中文且有初始資料，直接使用初始資料
    if (locale === "zh-TW" && initialData && initialData.length > 0) {
      if (lastLocale.current !== "zh-TW") {
        setAllData(initialData);
        setIsDataLoading(false);
        lastLocale.current = "zh-TW";
      }
      return;
    }

    // 如果語系沒變且已經有資料，跳過
    if (lastLocale.current === locale && allData.length > 0) return;

    const fetchData = async () => {
      setIsDataLoading(true);
      try {
        const res = await fetch(`/api/guide?lang=${locale}`);
        if (res.ok) {
          const data = await res.json();
          setAllData(data);
          lastLocale.current = locale;
        }
      } catch (error) {
        console.error("Failed to fetch guide data", error);
      } finally {
        setIsDataLoading(false);
      }
    };
    fetchData();
  }, [
    locale,
    user,
    isAuthLoading,
    isAuthenticated,
    initialData,
    allData.length,
  ]);

  // Reset visible count on search/filter change
  useEffect(() => {
    setVisibleCount(20);
  }, [debouncedQuery, activeSource]); // 依賴 debouncedQuery

  // 獲取章節題目數量的輔助函式
  const getChapterCount = useCallback(
    (source: string) => {
      if (!allData || allData.length === 0) return 0;
      const mod = allData.find((m) => m && m.source === source);
      if (!mod || !mod.sections) return 0;
      return mod.sections.reduce(
        (total, section) => total + (section.items?.length || 0),
        0
      );
    },
    [allData]
  );

  const totalCount = useMemo(() => {
    return allData.reduce(
      (total, module) =>
        total + module.sections.reduce((t, s) => t + s.items.length, 0),
      0
    );
  }, [allData]);

  const filteredFullData = useMemo(() => {
    let baseData = allData;
    if (activeSource !== "All") {
      baseData = allData.filter((m) => m.source === activeSource);
    }

    // 使用 debouncedQuery
    if (!debouncedQuery.trim()) return baseData;

    const query = debouncedQuery.toLowerCase();
    return baseData
      .map((module) => ({
        ...module,
        sections: module.sections
          .map((section) => ({
            ...section,
            items: section.items.filter(
              (item) =>
                item.question.toLowerCase().includes(query) ||
                item.answer.toLowerCase().includes(query) ||
                item.tags?.some((tag) => tag.toLowerCase().includes(query))
            ),
          }))
          .filter((section) => section.items.length > 0),
      }))
      .filter((module) => module.sections.length > 0);
  }, [allData, activeSource, debouncedQuery]); // 依賴 debouncedQuery

  // Flatten items for virtualization/pagination
  const visibleModules = useMemo(() => {
    let count = 0;
    return filteredFullData
      .map((module) => ({
        ...module,
        sections: module.sections
          .map((section) => {
            const items = section.items;
            const remaining = visibleCount - count;
            if (remaining <= 0) return { ...section, items: [] };

            const slice = items.slice(0, remaining);
            count += slice.length;
            return { ...section, items: slice };
          })
          .filter((s) => s.items.length > 0),
      }))
      .filter((m) => m.sections.length > 0);
  }, [filteredFullData, visibleCount]);

  const hasMore = useMemo(() => {
    const currentShown = visibleModules.reduce(
      (acc, m) => acc + m.sections.reduce((a, s) => a + s.items.length, 0),
      0
    );
    const totalFiltered = filteredFullData.reduce(
      (acc, m) => acc + m.sections.reduce((a, s) => a + s.items.length, 0),
      0
    );
    return currentShown < totalFiltered;
  }, [visibleModules, filteredFullData]);

  // Intersection Observer for Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setVisibleCount((prev) => prev + 20);
        }
      },
      { threshold: 0.1 }
    );

    const sentinel = document.getElementById("scroll-sentinel");
    if (sentinel) observer.observe(sentinel);

    return () => observer.disconnect();
  }, [hasMore, visibleModules]); // 這裡依賴正確

  const toggleItem = (id: string) => {
    const next = new Set(openItems);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setOpenItems(next);
  };

  const expandAll = useCallback(() => {
    const allIds = new Set<string>();
    filteredFullData.forEach((module) => {
      module.sections.forEach((section) => {
        section.items.forEach((item) => allIds.add(item.id));
      });
    });
    setOpenItems(allIds);
    setIsDrawerOpen(false);
  }, [filteredFullData]);

  const collapseAll = useCallback(() => {
    setOpenItems(new Set());
    setIsDrawerOpen(false);
  }, []);

  const memoizedSidebar = useMemo(
    () => (
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
    ),
    [
      searchQuery,
      activeSource,
      allData,
      totalCount,
      fontScale,
      expandAll,
      collapseAll,
      getChapterCount,
      t,
    ]
  );

  // Handle hash scrolling
  useEffect(() => {
    if (isDataLoading || !allData.length) return;

    // Check hash on load or data ready
    const hash = window.location.hash;
    if (hash) {
      // Decode hash to handle special characters if any, though IDs should be slugs
      const id = decodeURIComponent(hash.substring(1));
      const element = document.getElementById(id);
      if (element) {
        // Delay slightly to ensure layout is stable
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [isDataLoading, allData.length]);

  if (isAuthLoading) return null;
  if (!user || !isAuthenticated) return <AuthGate redirectPath="/guide" />;

  if (isDataLoading) {
    return (
      <div className="flex flex-col lg:flex-row gap-0 lg:gap-16 py-12">
        <aside className="hidden lg:block w-[320px] shrink-0 space-y-6 px-4">
          <div className="skeleton h-14 w-full rounded-2xl" />
          <div className="skeleton h-80 w-full rounded-2xl" />
          <div className="skeleton h-24 w-full rounded-2xl" />
        </aside>
        <main className="flex-1 px-6 lg:px-0 space-y-10">
          <div className="lg:hidden -mx-6 mb-10 h-16 skeleton rounded-none" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton-card skeleton mb-8" />
          ))}
        </main>
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-0 lg:gap-16 py-12 animate-enter-up">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-85 shrink-0 sticky top-28 h-[calc(100vh-8rem)]">
          <div className="sidebar-glass-container h-full">
            {memoizedSidebar}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 px-6 lg:px-0 lg:max-w-4xl xl:max-w-5xl">
          {/* Back Button */}
          <div className="mb-6">
            <BackButton />
          </div>

          {/* Mobile Category Sidebar (Horizontal Scroll) with Filter Trigger */}
          <div className="lg:hidden -mx-6 mb-10 sticky top-14 bg-white/80 dark:bg-apple-dark-bg/80 backdrop-blur-xl z-30 border-b border-apple-border dark:border-apple-dark-border flex items-center">
            
            {/* Scrollable Categories */}
            <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-2 px-4 py-4 mask-fade-right">
              <button
                onClick={() => setActiveSource("All")}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-bold transition-all shrink-0 ${
                  activeSource === "All"
                    ? "bg-apple-blue text-white shadow-lg shadow-apple-blue/25"
                    : "bg-apple-bg dark:bg-apple-dark-border text-apple-gray dark:text-apple-dark-gray"
                }`}
              >
                {t("guide.allLabel")}
              </button>
              {allData.map((module) => (
                <button
                  key={module.source}
                  onClick={() => setActiveSource(module.source)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-bold transition-all shrink-0 ${
                    activeSource === module.source
                      ? "bg-apple-blue text-white shadow-lg shadow-apple-blue/25"
                      : "bg-apple-bg dark:bg-apple-dark-border text-apple-gray dark:text-apple-dark-gray"
                  }`}
                >
                  {module.source}
                </button>
              ))}
            </div>

            {/* Fixed Filter/Search Trigger */}
            <div className="pr-4 pl-2 shrink-0 border-l border-apple-border dark:border-apple-dark-border/50 bg-transparent">
              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="p-2.5 bg-apple-bg dark:bg-apple-dark-border/50 text-apple-gray dark:text-apple-dark-text rounded-full active:scale-95 transition-all"
                aria-label="Search and Filters"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {searchQuery && (
            <div className="mb-12 p-8 bg-apple-blue/5 border border-apple-blue/10 rounded-apple-lg flex items-center justify-between">
              <p className="text-apple-blue font-bold text-lg">
                {t("guide.searchResult", { q: searchQuery })}
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="text-[12px] font-bold uppercase tracking-[0.2em] text-apple-gray hover:text-apple-blue transition-colors"
              >
                {t("guide.clearSearch")}
              </button>
            </div>
          )}

          {visibleModules.length > 0 ? (
            <div className="space-y-24">
              {visibleModules.map((module) => (
                <section
                  key={module.source}
                  id={module.id} // use slug as ID
                  className="scroll-mt-32 space-y-10"
                >
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
                          {section.items.map((item) => (
                            <div
                              key={item.id}
                              className={`apple-card group transition-all duration-500 overflow-hidden ${
                                openItems.has(item.id)
                                  ? "bg-white dark:bg-apple-dark-card ring-2 ring-apple-blue/20 shadow-2xl scale-[1.01]"
                                  : ""
                              }`}
                            >
                              <button
                                onClick={() => toggleItem(item.id)}
                                className="w-full text-left p-8 sm:p-10 flex items-start gap-6"
                              >
                                <div className="flex-1 min-w-0">
                                  {item.important && (
                                    <span className="inline-flex items-center px-3 py-1 mb-5 bg-apple-red text-white text-[10px] font-extrabold uppercase tracking-[0.2em] rounded-full shadow-lg shadow-red-500/10">
                                      {t("guide.important")}
                                    </span>
                                  )}
                                  <h4
                                    className={`text-lg sm:text-xl font-bold leading-tight transition-colors ${
                                      openItems.has(item.id)
                                        ? "text-apple-blue"
                                        : "text-apple-text dark:text-apple-dark-text"
                                    }`}
                                  >
                                    {item.question}
                                  </h4>
                                </div>
                                <div
                                  className={`mt-1.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                                    openItems.has(item.id)
                                      ? "rotate-180 bg-apple-blue text-white shadow-xl shadow-apple-blue/20"
                                      : "bg-apple-bg dark:bg-apple-dark-border text-apple-gray"
                                  }`}
                                >
                                  <ChevronDown className="w-5 h-5" />
                                </div>
                              </button>

                              {openItems.has(item.id) && (
                                <div className="px-8 pb-10 pt-0 sm:px-10 sm:pb-12 animate-enter-up">
                                  {/* 內容區域：修正字體縮放應用 */}
                                  <div
                                    className="prose prose-zinc dark:prose-invert max-w-none text-apple-gray dark:text-apple-dark-gray leading-[1.6] prose-p:mb-6 prose-headings:text-apple-text dark:prose-headings:text-apple-dark-text"
                                    // 直接使用百分比縮放
                                    style={{ fontSize: `${fontScale * 100}%` }}
                                    dangerouslySetInnerHTML={{
                                      __html: item.answer,
                                    }}
                                  />
                                  {item.tags && item.tags.length > 0 && (
                                    <div className="mt-10 flex flex-wrap gap-2.5">
                                      {item.tags.map((tag) => (
                                        <span
                                          key={tag}
                                          className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-apple-bg dark:bg-apple-dark-border text-apple-gray dark:text-apple-dark-gray rounded-full text-[11px] font-bold border border-transparent"
                                        >
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
            <EmptyState
              onClear={() => {
                setSearchQuery("");
                setActiveSource("All");
              }}
              actionText={t("guide.clearSearch")}
            />
          )}
        </main>


        {/* Mobile Drawer Overlay */}
        {isDrawerOpen && (
          <div className="fixed inset-0 z-100 lg:hidden animate-reveal">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300"
              onClick={() => setIsDrawerOpen(false)}
            />
            <div className="absolute bottom-0 left-0 w-full h-[85vh] bg-white dark:bg-apple-dark-bg mobile-sheet shadow-2xl flex flex-col overflow-hidden border-t border-apple-border dark:border-apple-dark-border">
              {/* Simple Sheet Handle */}
              <div className="h-1.5 w-12 bg-zinc-200 dark:bg-zinc-800 rounded-full mx-auto mt-4 mb-6 shrink-0" />
              
              <div className="flex-1 overflow-y-auto px-8 pb-12 no-scrollbar">
                {memoizedSidebar}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Guide;
