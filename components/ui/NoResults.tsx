import React from "react"
import { SearchX } from "lucide-react"

interface NoResultsProps {
    query: string;
    onClear: () => void;
}

const NoResults: React.FC<NoResultsProps> = ({ query, onClear }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-enter-up">
      <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-full mb-6">
        <SearchX className="w-12 h-12 text-zinc-300 dark:text-zinc-600" />
      </div>
      <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
        No results found for "{query}"
      </h3>
      <p className="text-zinc-500 dark:text-zinc-400 mb-6 max-w-md mx-auto">
        We couldn't find anything matching your search. Try adjusting your keywords or clearing the filter.
      </p>
      <button
        onClick={onClear}
        className="px-6 py-2.5 bg-apple-blue hover:bg-apple-blue-hover text-white rounded-full font-bold transition-all active:scale-95 shadow-lg shadow-apple-blue/20"
      >
        Clear Search
      </button>
    </div>
  )
}

export default NoResults
