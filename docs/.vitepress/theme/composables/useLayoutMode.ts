import { ref, onMounted, onUnmounted } from "vue";

const isMobileView = ref(false);

/**
 * 行動裝置偵測邏輯
 *
 * 結合 User Agent 字串解析與螢幕寬度判斷，
 * 確保在平板與手機端能獲得正確的佈向。
 */
const detectMobile = (): boolean => {
  if (typeof window === "undefined") return false;

  const ua = navigator.userAgent || navigator.vendor || (window as any).opera;

  // 偵測 iOS 系列 (iPhone/iPod + 加入觸控支援的 iPad)
  const isIOS = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
  const isIpadOS =
    navigator.platform === "MacIntel" && navigator.maxTouchPoints > 0;

  // 偵測 Android 系統
  const isAndroid = /android/i.test(ua);

  // 偵測其他行動瀏覽器環境
  const isMobileBrowser = /Mobile|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
    ua
  );

  // 偵測螢幕寬度 (以 VitePress 標準斷點 960px 為依據)
  const isSmallScreen = window.innerWidth < 960;

  return isIOS || isIpadOS || isAndroid || isMobileBrowser || isSmallScreen;
};

/**
 * 佈向模式 Hook (useLayoutMode)
 *
 * 即時反應當前裝置環境是否為行動端，以便元件切換渲染策略。
 */
export function useLayoutMode() {
  const updateLayout = () => {
    isMobileView.value = detectMobile();
  };

  onMounted(() => {
    updateLayout();
    window.addEventListener("resize", updateLayout);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateLayout);
  });

  return {
    isMobileView,
    toggleLayout: () => {}, // 保留相容性介面，但不執行額外操作
  };
}
