"use client";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { TranslationType } from "@/locales";
import { PathsToLeaves } from "@/lib/i18n-utils";
import {
  Search,
  X,
  SortAsc,
  SortDesc,
  List as ListIcon,
  LayoutGrid,
  Grid,
  Filter,
  Menu,
} from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import NoResults from "@/components/ui/NoResults";
import { TranslationParams, GlossaryItem } from "@/types";
import { useLanguage } from "@/hooks/useLanguage";
// Removed CardSheen for readability
import { useUser } from "@/hooks/useLogtoUser";
import useDebounce from "@/hooks/useDebounce";
import AuthGate from "@/components/ui/AuthGate";
import { highlightHtml } from "@/lib/highlight";

// --- 子組件：側邊欄內容 (獨立出來避免重渲染效能問題) ---
const SidebarContent: React.FC<{
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  getCategoryName: (v: string) => string;
  getChapterCount: (v: string) => number;
  gridCols: number;
  setGridCols: (v: 1 | 2 | 3) => void;
  fontScale: number;
  setFontScale: (v: number) => void;
  setIsDrawerOpen: (v: boolean) => void;
  t: (
    key: PathsToLeaves<TranslationType>,
    params?: TranslationParams
  ) => string;
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
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar pb-10">
      {/* Search Input */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-apple-gray" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t("glossary.searchPlaceholder")}
          className="w-full pl-10 pr-10 py-2.5 bg-apple-bg dark:bg-apple-dark-bg-secondary border border-apple-border dark:border-apple-dark-border rounded-lg text-[15px] outline-none focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-1 top-1/2 -translate-y-1/2 p-2 text-apple-gray hover:text-apple-text transition-colors min-h-11 min-w-11 flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Navigation */}
      <div className="mb-6">
        <p className="text-xs font-medium text-apple-gray mb-3 px-1">
          {t("glossary.sidebarTitle")}
        </p>
        <nav className="space-y-1">
          {/* "全部" 選項 - 與 Guide 一致，有圖示 */}
          <button
            onClick={() => {
              setSelectedCategory("All");
              setIsDrawerOpen(false);
            }}
            className={`sidebar-btn w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue rounded-lg ${selectedCategory === "All" ? "sidebar-btn-active" : ""}`}
          >
            <div className="flex items-center gap-2 font-extrabold tracking-tight">
              <Menu className="w-4 h-4" />
              <span>{getCategoryName("All")}</span>
            </div>
            <span
              className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${selectedCategory === "All" ? "bg-white/20 text-white" : "bg-apple-bg dark:bg-apple-dark-border text-apple-gray"}`}
            >
              {getChapterCount("All")}
            </span>
          </button>

          {/* 子分類選項 */}
          {CATEGORIES.filter((cat) => cat !== "All").map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setIsDrawerOpen(false);
                }}
                className={`sidebar-btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue rounded-lg ${isActive ? "sidebar-btn-active" : ""}`}
              >
                <span className="truncate pr-4 text-left font-bold">
                  {getCategoryName(cat)}
                </span>
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${isActive ? "bg-white/20 text-white" : "bg-apple-bg dark:bg-apple-dark-border text-apple-gray"}`}
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
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-all text-sm font-medium min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue ${
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
              className={`flex-1 flex items-center justify-center py-2 rounded-xl text-[12px] font-black transition-all min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue ${
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

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsDrawerOpen(false);
    };
    if (isDrawerOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isDrawerOpen]);

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

  const getChapterCount = useCallback(
    (cat: string) => {
      if (cat === "All") return data.length;
      return data.filter((item) =>
        Array.isArray(item.category)
          ? item.category.includes(cat)
          : item.category === cat
      ).length;
    },
    [data]
  );

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

  const getCategoryName = useCallback(
    (cat: string) =>
      cat === "All"
        ? t("glossary.allLabel")
        : t(`glossary.categories.${cat}` as PathsToLeaves<TranslationType>) ||
          cat,
    [t]
  );

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
    [
      searchQuery,
      selectedCategory,
      gridCols,
      fontScale,
      t,
      getCategoryName,
      getChapterCount,
    ]
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
        <aside className="hidden lg:block w-85 shrink-0 sticky top-28 h-[calc(100vh-8rem)] ml-6">
          <div className="sidebar-glass-container h-full">
            {memoizedSidebar}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 px-6 lg:px-10 xl:px-12 lg:max-w-6xl xl:max-w-7xl mx-auto">
          {/* Mobile Filter Trigger Button (Removed in favor of FAB) */}

          <div className="flex items-center justify-between mb-10">
            <div className="text-[12px] font-bold text-apple-gray uppercase tracking-[0.2em] flex items-center gap-2.5">
              <Filter className="w-3.5 h-3.5 text-apple-blue" />
              {t("glossary.totalTerms", { n: filteredTerms.length })}
            </div>
            <button
              onClick={() =>
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
              }
              className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-apple-blue hover:opacity-80 transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue rounded-lg px-2 py-1"
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
                  className={`apple-card-content group flex flex-col ${gridCols === 1 ? "p-10 sm:p-12 md:p-14" : "p-8 md:p-10"} relative overflow-hidden animate-enter-up`}
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
                      dangerouslySetInnerHTML={{
                        __html: highlightHtml(item.term, debouncedQuery),
                      }}
                    />
                  </header>

                  <div
                    className={`flex-1 prose prose-zinc dark:prose-invert max-w-none text-apple-gray dark:text-apple-dark-gray leading-[1.6] mb-8 relative z-10 ${gridCols > 1 ? "text-[15px]" : "text-[17px]"}`}
                    style={{ fontSize: `${fontScale * 100}%` }}
                    dangerouslySetInnerHTML={{
                      __html: highlightHtml(item.definition, debouncedQuery),
                    }}
                  />

                  {item.analogy && (
                    <div
                      className={`relative z-10 p-6 rounded-2xl bg-apple-bg dark:bg-apple-dark-border/30 border border-apple-border dark:border-apple-dark-border ${gridCols === 1 ? "text-[15px]" : "text-[13px]"}`}
                    >
                      <span className="block text-[10px] font-black uppercase tracking-widest text-apple-blue mb-2">
                        {t("glossary.analogyLabel")}
                      </span>
                      <div
                        className="prose prose-zinc dark:prose-invert max-w-none text-apple-text dark:text-apple-dark-text font-medium leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: highlightHtml(item.analogy, debouncedQuery),
                        }}
                      />
                    </div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <NoResults query={searchQuery} onClear={() => setSearchQuery("")} />
          )}
        </main>

        {/* Mobile Floating Filter Button */}
        {mounted &&
          createPortal(
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="lg:hidden fixed bottom-8 left-6 w-12 h-12 rounded-full bg-apple-blue/90 text-white shadow-2xl shadow-apple-blue/30 backdrop-blur-md flex items-center justify-center z-140 transition-all active:scale-90 hover:scale-105 animate-in fade-in zoom-in duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-apple-blue"
              aria-label="Filter"
            >
              <Filter className="w-5 h-5" />
              {/* Active Indicator Dot */}
              {selectedCategory !== "All" && (
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900" />
              )}
            </button>,
            document.body
          )}

        {/* Mobile Drawer - Rendered via Portal */}
        {mounted &&
          isDrawerOpen &&
          createPortal(
            <div className="fixed inset-0 z-200 lg:hidden animate-in fade-in duration-200">
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={() => setIsDrawerOpen(false)}
              />
              <div className="absolute bottom-0 left-0 w-full h-[85vh] bg-white dark:bg-apple-dark-bg mobile-sheet shadow-2xl flex flex-col overflow-hidden border-t border-apple-border dark:border-apple-dark-border animate-in slide-in-from-bottom duration-300 rounded-t-3xl">
                {/* Simple Sheet Handle */}
                <div className="h-1.5 w-12 bg-zinc-200 dark:bg-zinc-700/50 rounded-full mx-auto mt-4 mb-6 shrink-0" />

                <div className="flex-1 overflow-y-auto px-8 pb-12 no-scrollbar">
                  {memoizedSidebar}
                </div>
              </div>
            </div>,
            document.body
          )}
      </div>
    </>
  );
};

export default Glossary;
