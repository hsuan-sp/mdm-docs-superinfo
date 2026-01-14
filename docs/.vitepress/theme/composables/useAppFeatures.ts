import { ref, onMounted, onUnmounted, watch } from 'vue';

/**
 * 應用程式功能 Hook (useAppFeatures)
 * 
 * 負責管理全域性的介面狀態，如字體縮放、側邊欄收合等，
 * 並提供持久化儲存 (localStorage) 功能。
 */
export function useAppFeatures(storageKeyPrefix: string) {
  const fontScale = ref(1.0);
  const isSidebarCollapsed = ref(false);

  // 持久化儲存鍵名
  const SCALE_KEY = `${storageKeyPrefix}-font-scale`;
  const SIDEBAR_KEY = `${storageKeyPrefix}-sidebar-collapsed`;

  onMounted(() => {
    // 1. 還原先前的狀態設定
    const savedScale = localStorage.getItem(SCALE_KEY);
    if (savedScale) fontScale.value = parseFloat(savedScale);

    const savedCollapsed = localStorage.getItem(SIDEBAR_KEY);
    if (savedCollapsed) isSidebarCollapsed.value = savedCollapsed === 'true';

    // 2. 為 body 標註類別，供全域樣式渲染參考
    document.body.classList.add('is-app');
  });

  onUnmounted(() => {
    document.body.classList.remove('is-app');
  });

  // 監聽狀態變動並即時同步至儲存區
  watch(fontScale, (val) => {
    localStorage.setItem(SCALE_KEY, val.toString());
  });

  /**
   * 切換側邊欄顯示狀態
   */
  const toggleSidebar = () => {
    isSidebarCollapsed.value = !isSidebarCollapsed.value;
    localStorage.setItem(SIDEBAR_KEY, isSidebarCollapsed.value.toString());
  };

  return {
    fontScale,
    isSidebarCollapsed,
    toggleSidebar
  };
}
