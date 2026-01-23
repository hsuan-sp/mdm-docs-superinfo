import { onMounted, onUnmounted } from "vue";

interface ShortcutOptions {
  onSearchFocus?: () => void;
  onEscape?: () => void;
  searchInputSelector?: string;
}

/**
 * 全域快速鍵 Hook (useKeyboardShortcuts)
 *
 * 為應用程式提供便捷的實體鍵盤操作介面，提升專業網管的操作效率。
 */
export function useKeyboardShortcuts(options: ShortcutOptions = {}) {
  const {
    onSearchFocus,
    onEscape,
    searchInputSelector = ".search-input",
  } = options;

  /**
   * 處理按鍵按下事件
   */
  const handleKeyDown = (e: KeyboardEvent) => {
    // 搜尋焦點快速鍵 (/)
    if (e.key === "/" && (e.target as HTMLElement).tagName !== "INPUT") {
      e.preventDefault();

      if (onSearchFocus) {
        onSearchFocus();
      }

      const searchInput = document.querySelector(
        searchInputSelector
      ) as HTMLInputElement;
      searchInput?.focus();
    }

    // Escape 快速鍵：解除焦點或關閉彈出視窗
    if (e.key === "Escape") {
      if (onEscape) {
        onEscape();
      }
    }
  };

  onMounted(() => {
    window.addEventListener("keydown", handleKeyDown);
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", handleKeyDown);
  });
}
