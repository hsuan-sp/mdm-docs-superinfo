import { ref, computed } from 'vue';

const user = ref<string | null>(null);
const isGuest = ref(true);
const isChecking = ref(false);

/**
 * 身分驗證 Hook (useAuth)
 * 
 * 負責處理全域的使用者登入狀態、權限確認與登出邏輯。
 */
export function useAuth() {
  /**
   * 執行身分檢查
   * 向後端 API 請求目前的工作階段資料。
   */
  const checkAuth = async () => {
    isChecking.value = true;
    try {
      const res = await fetch('/auth/me');
      if (res.ok) {
        const data = await res.json();
        if (data.email) {
          user.value = data.email;
          isGuest.value = false;
        } else {
          throw new Error('回應中無電子郵件資料');
        }
      } else {
        throw new Error('身分驗證失敗');
      }
    } catch (e) {
      console.log('身分驗證：進入訪客模式');
      // 預設為訪客
      user.value = 'guest@edu.tw';
      isGuest.value = true;
    } finally {
      isChecking.value = false;
    }
  };

  /**
   * 登出系統
   */
  const logout = () => {
    if (isGuest.value) return;
    if (confirm('確定要登出系統嗎？')) {
      location.href = '/auth/logout';
    }
  };

  /**
   * 計算顯示用途的使用者名稱
   */
  const username = computed(() => {
    if (!user.value) return '訪客';
    return user.value.split('@')[0];
  });

  return {
    user,
    isGuest,
    isChecking,
    username,
    checkAuth,
    logout
  };
}
