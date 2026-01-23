<script setup lang="ts">
import { computed } from "vue";
import { useData, withBase } from "vitepress";
import { useAuth } from "../../theme/composables/useAuth";

const { lang } = useData();
const { user, logout } = useAuth();

const t = computed(() => {
  return lang.value === "zh-TW"
    ? {
        logoutTitle: "登出系統",
        logout: "退出",
        login: "系統登入",
      }
    : {
        logoutTitle: "Sign out",
        logout: "Exit",
        login: "Sign In",
      };
});
</script>

<template>
  <div class="login-status-nav">
    <!-- 已登入狀態 -->
    <template v-if="user">
      <div class="user-pill">
        <span class="user-email text-truncate">{{ user }}</span>
        <button class="logout-btn" @click="logout" :title="t.logoutTitle">
          {{ t.logout }}
        </button>
      </div>
    </template>

    <!-- 未登入狀態 -->
    <template v-else>
      <a :href="withBase('/login.html')" class="login-link">{{ t.login }}</a>
    </template>
  </div>
</template>

<style scoped>
/* 
 * 導覽列小元件樣式 
 * 確保在有限的高寬內保持文字可讀性。
 */
.login-status-nav {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
}

.user-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 4px 4px 12px;
  background: var(--vp-c-bg-alt);
  border-radius: 100px;
  border: 1px solid var(--vp-c-divider);
}

.user-email {
  max-width: 120px;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.logout-btn {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 2px 10px;
  border-radius: 90px;
  border: none;
  cursor: pointer;
  font-size: 11px;
  font-weight: 700;
  transition: all 0.2s;
}

.logout-btn:hover {
  background: var(--vp-c-brand-1);
  color: white;
}

.login-link {
  color: var(--vp-c-brand-1);
  font-weight: 600;
  text-decoration: none;
  padding: 4px 12px;
  border-radius: 8px;
  transition: background 0.2s;
}

.login-link:hover {
  background: var(--vp-c-brand-soft);
}
</style>
