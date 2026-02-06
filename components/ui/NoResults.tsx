"use client";

import React from "react";
import { SearchX } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface NoResultsProps {
  query: string;
  onClear: () => void;
}

const NoResults: React.FC<NoResultsProps> = ({ query, onClear }) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-enter-up">
      <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-full mb-6">
        <SearchX className="w-12 h-12 text-zinc-300 dark:text-zinc-600" />
      </div>
      <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
        {t("glossary.emptyState", { q: query })}
      </h3>
      <p className="text-zinc-500 dark:text-zinc-400 mb-6 max-w-md mx-auto">
        {t("guide.searchPlaceholder")}
      </p>
      <button
        onClick={onClear}
        className="px-6 py-2.5 bg-apple-blue hover:bg-apple-blue-hover text-white rounded-full font-bold transition-all active:scale-95 shadow-lg shadow-apple-blue/20 min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-apple-blue"
      >
        {t("glossary.clearSearch")}
      </button>
    </div>
  );
};

export default NoResults;
