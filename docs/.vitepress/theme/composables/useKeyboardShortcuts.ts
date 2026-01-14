import { onMounted, onUnmounted } from 'vue';

interface ShortcutOptions {
    onSearchFocus?: () => void;
    onEscape?: () => void;
    searchInputSelector?: string;
}

export function useKeyboardShortcuts(options: ShortcutOptions = {}) {
    const {
        onSearchFocus,
        onEscape,
        searchInputSelector = '.search-input'
    } = options;

    const handleKeyDown = (e: KeyboardEvent) => {
        // Search focus shortcut (/)
        if (e.key === '/' && (e.target as HTMLElement).tagName !== 'INPUT') {
            e.preventDefault();

            if (onSearchFocus) {
                onSearchFocus();
            }

            const searchInput = document.querySelector(searchInputSelector) as HTMLInputElement;
            searchInput?.focus();
        }

        // Escape shortcut
        if (e.key === 'Escape') {
            if (onEscape) {
                onEscape();
            }
        }
    };

    onMounted(() => {
        window.addEventListener('keydown', handleKeyDown);
    });

    onUnmounted(() => {
        window.removeEventListener('keydown', handleKeyDown);
    });
}
