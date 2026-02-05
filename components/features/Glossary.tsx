"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  X,
  Lightbulb,
  SortAsc,
  SortDesc,
  Filter,
  Grid,
  List as ListIcon,
  LayoutGrid,
} from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import { GlossaryItem } from "@/types";
import EmptyState from "@/components/ui/EmptyState";
import { translations } from "@/locales";
import { useLanguage } from "@/hooks/useLanguage";
import { useUser } from "@/hooks/useLogtoUser";
import AuthGate from "../ui/AuthGate";

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
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  getCategoryName: (v: string) => string;
  getChapterCount: (v: string) => number;
  gridCols: number;
  setGridCols: (v: any) => void;
  fontScale: number;
  setFontScale: (v: number) => void;
  setIsDrawerOpen: (v: boolean) => void;
  t: any;
}> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  getCategoryName,
  getChapterCount,
  gridCols,
  setGridCols,
  fontScale,
  setFontScale,
  setIsDrawerOpen,
  t,
}) => {
  const CATEGORIES = [
    "All",
    "Core",
    "Enrollment",
    "Apple",
    "Security",
    "Network",
    "Hardware",
    "Apps",
    "Education",
    "macOS",
    "Jamf",
    "Other",
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar pb-10 px-1">
      <div className="relative group mb-8 mt-2">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-apple-gray" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t("glossary.searchPlaceholder")}
          className="input-apple pl-10 pr-10"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-apple-gray hover:text-apple-text transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="mb-8">
        <p className="hidden lg:block text-xs font-medium text-apple-gray mb-3 px-1">
          {t("glossary.sidebarTitle")}
        </p>
        <nav className="space-y-1">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setIsDrawerOpen(false);
                }}
                className={`sidebar-btn w-full ${isActive ? "sidebar-btn-active" : ""}`}
              >
                <span className="truncate pr-4 text-left font-semibold tracking-tight">
                  {getCategoryName(cat)}
                </span>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-lg ${isActive ? "bg-white/20 text-white" : "bg-apple-bg dark:bg-apple-dark-border text-apple-gray"}`}
                >
                  {getChapterCount(cat)}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mb-10">
        <p className="text-xs font-medium text-apple-gray mb-3 px-1">
          {t("glossary.layoutTitle")}
        </p>
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => setGridCols(num as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-all text-sm font-medium ${
                gridCols === num
                  ? "bg-white dark:bg-apple-dark-border text-apple-blue shadow-sm border border-apple-border"
                  : "text-apple-gray hover:text-apple-text hover:bg-apple-bg"
              }`}
            >
              {num === 1 && <ListIcon className="w-4 h-4" />}
              {num === 2 && <Grid className="w-3.5 h-3.5" />}
              {num === 3 && <LayoutGrid className="w-3.5 h-3.5" />}
              <span className="text-[12px] font-black">{num}x</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-8 border-t border-apple-border dark:border-apple-dark-border">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-apple-gray/60 mb-4 px-1">
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

interface GlossaryProps {
  initialData?: GlossaryItem[];
}

const Glossary: React.FC<GlossaryProps> = ({ initialData }) => {
  const { t, language: locale } = useLanguage();

  // 🔍 避免在英文語系下閃過中文初值
  const isInitialZH = locale === "zh-TW";
  const [data, setData] = useState<GlossaryItem[]>(
    isInitialZH && initialData ? initialData : []
  );
  const [isLoading, setIsLoading] = useState(!isInitialZH || !initialData);

  // 搜尋相關
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 300);

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [fontScale, setFontScale] = useState(1);
  const [gridCols, setGridCols] = useState<1 | 2 | 3>(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const lastLocale = React.useRef<string | null>(null);

  const { user, isLoading: isAuthLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (isAuthLoading) return;
    if (!isAuthenticated) return;

    // 🔍 語系與資料同步邏輯
    // 如果切換回中文且有初始資料，直接使用初始資料 (避免多餘 API 請求)
    if (locale === "zh-TW" && initialData && initialData.length > 0) {
      if (lastLocale.current !== "zh-TW") {
        setData(initialData);
        setIsLoading(false);
        lastLocale.current = "zh-TW";
      }
      return;
    }

    // 如果語系沒變且已經有資料，跳過
    if (lastLocale.current === locale && data.length > 0) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/glossary?lang=${locale}`);
        if (res.ok) {
          const result = await res.json();
          setData(result);
          lastLocale.current = locale;
        }
      } catch (error) {
        console.error("Failed to fetch glossary data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [locale, user, isAuthLoading, isAuthenticated, initialData, data.length]);

  const getChapterCount = (cat: string) => {
    if (cat === "All") return data.length;
    return data.filter((item) =>
      Array.isArray(item.category)
        ? item.category.includes(cat)
        : item.category === cat
    ).length;
  };

  const filteredTerms = useMemo(() => {
    const q = debouncedQuery.toLowerCase().trim();

    let filtered = data.filter((item) => {
      const matchesSearch =
        !q ||
        item.term.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        item.analogy.toLowerCase().includes(q);

      const matchesCategory =
        selectedCategory === "All" ||
        (Array.isArray(item.category)
          ? item.category.includes(selectedCategory)
          : item.category === selectedCategory);

      return matchesSearch && matchesCategory;
    });

    return filtered.sort((a, b) => {
      const termA = a.term.toUpperCase();
      const termB = b.term.toUpperCase();
      return sortOrder === "asc"
        ? termA.localeCompare(termB)
        : termB.localeCompare(termA);
    });
  }, [data, debouncedQuery, selectedCategory, sortOrder]);

  const getCategoryName = (cat: string) =>
    cat === "All"
      ? t("glossary.allLabel")
      : t(`glossary.categories.${cat}` as any) || cat;

  const memoizedSidebar = useMemo(
    () => (
      <SidebarContent
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        getCategoryName={getCategoryName}
        getChapterCount={getChapterCount}
        gridCols={gridCols}
        setGridCols={setGridCols}
        fontScale={fontScale}
        setFontScale={setFontScale}
        setIsDrawerOpen={setIsDrawerOpen}
        t={t}
      />
    ),
    [searchQuery, selectedCategory, gridCols, fontScale, locale, data.length]
  );

  if (isAuthLoading) return null;
  if (!user) return <AuthGate />;

  if (isLoading) {
    return (
      <div className="flex flex-col lg:flex-row min-h-screen pt-20">
        {/* Sidebar Skeleton */}
        <div className="hidden lg:block w-72 shrink-0 p-6 border-r border-apple-border dark:border-apple-dark-border">
           <Skeleton className="h-10 w-full mb-8 rounded-xl" />
           <div className="space-y-4">
             {[1, 2, 3, 4, 5, 6].map((i) => (
               <Skeleton key={i} className="h-9 w-full rounded-lg" />
             ))}
           </div>
        </div>
        
        {/* Content Skeleton */}
        <div className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
           <div className="flex justify-between items-center mb-10">
             <Skeleton className="h-8 w-48 rounded-lg" />
             <div className="flex gap-2">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <Skeleton className="h-10 w-10 rounded-lg" />
             </div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {[1, 2, 3, 4, 5, 6].map((i) => (
               <Skeleton key={i} className="h-64 rounded-3xl" />
             ))}
           </div>
        </div>
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
          {/* Mobile Category Sidebar (Horizontal Scroll) with Filter Trigger */}
          <div className="lg:hidden -mx-6 mb-10 sticky top-14 bg-white/80 dark:bg-apple-dark-bg/80 backdrop-blur-xl z-30 border-b border-apple-border dark:border-apple-dark-border flex items-center">
            
            {/* Scrollable Categories */}
            <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-2 px-4 py-4 mask-fade-right">
              {[
                "All", "Core", "Enrollment", "Apple", "Security", "Network",
                "Hardware", "Apps", "Education", "macOS", "Jamf", "Other",
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-bold transition-all shrink-0 ${
                    selectedCategory === cat
                      ? "bg-apple-blue text-white shadow-lg shadow-apple-blue/25"
                      : "bg-apple-bg dark:bg-apple-dark-border text-apple-gray dark:text-apple-dark-gray"
                  }`}
                >
                  {getCategoryName(cat)}
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

          <div className="flex items-center justify-between mb-10">
            <div className="text-[12px] font-bold text-apple-gray uppercase tracking-[0.2em] flex items-center gap-2.5">
              <Filter className="w-3.5 h-3.5 text-apple-blue" />
              {t("glossary.totalTerms", { n: filteredTerms.length })}
            </div>
            <button
              onClick={() =>
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
              }
              className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-apple-blue hover:opacity-80 transition-all active:scale-95"
            >
              {sortOrder === "asc" ? (
                <SortAsc className="w-4 h-4" />
              ) : (
                <SortDesc className="w-4 h-4" />
              )}
              {sortOrder === "asc"
                ? t("glossary.sortAZ")
                : t("glossary.sortZA")}
            </button>
          </div>

          {filteredTerms.length > 0 ? (
            <div
              className={`grid grid-cols-1 ${gridCols === 2 ? "md:grid-cols-2" : gridCols === 3 ? "md:grid-cols-2 xl:grid-cols-3" : ""} gap-8`}
            >
              {filteredTerms.map((item, idx) => (
                <article
                  key={item.term}
                  className={`apple-card flex flex-col ${gridCols === 1 ? "p-10 sm:p-12 md:p-14" : "p-8 md:p-10"} relative overflow-hidden animate-enter-up`}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <header className="mb-8 relative z-10">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {(Array.isArray(item.category)
                        ? item.category
                        : [item.category]
                      ).map((cat) => (
                        <span
                          key={cat}
                          className="px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] bg-apple-blue/10 dark:bg-apple-blue/20 text-apple-blue border border-apple-blue/5"
                        >
                          {getCategoryName(cat)}
                        </span>
                      ))}
                    </div>
                    <h3
                      className={`${gridCols === 1 ? "text-3xl sm:text-4xl" : "text-xl md:text-2xl"} font-bold tracking-tight text-apple-text dark:text-apple-dark-text group-hover:text-apple-blue transition-colors duration-300`}
                    >
                      {item.term}
                    </h3>
                  </header>

                  <div
                    className={`flex-1 prose prose-zinc dark:prose-invert max-w-none text-apple-gray dark:text-apple-dark-gray leading-[1.6] mb-8 relative z-10 ${gridCols > 1 ? "text-[15px]" : "text-[17px]"}`}
                    style={{ fontSize: `${fontScale * 100}%` }}
                    dangerouslySetInnerHTML={{ __html: item.definition }}
                  />

                  {item.analogy && (
                    <div
                      className={`p-6 sm:p-8 bg-apple-bg dark:bg-apple-dark-card rounded-3xl relative z-10 border border-transparent hover:border-apple-blue/10 transition-all`}
                      style={{ fontSize: `${fontScale * 100}%` }}
                    >
                      <div className="flex items-center gap-2 mb-4 text-apple-gray dark:text-apple-dark-text/60 font-bold text-[11px] uppercase tracking-[0.2em]">
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                        {t("glossary.analogyLabel")}
                      </div>
                      <div
                        className={`${gridCols === 1 ? "text-[16px] md:text-[18px]" : "text-[15px]"} text-apple-text dark:text-apple-dark-text leading-relaxed font-medium`}
                        dangerouslySetInnerHTML={{ __html: item.analogy }}
                      />
                    </div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              onClear={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              actionText={t("glossary.clearSearch")}
              title={t("glossary.emptyState", { q: searchQuery })}
            />
          )}
        </main>


        {/* Mobile Drawer */}
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

export default Glossary;
