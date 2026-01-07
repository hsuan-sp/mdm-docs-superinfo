<script setup>
import { ref, onMounted } from 'vue'

const user = ref(null)

onMounted(async () => {
  try {
    const res = await fetch('/auth/me')
    const data = await res.json()
    if (data.email) {
      user.value = data.email
    }
  } catch (e) {
    // 忽略錯誤，可能是未登入
  }
})

const logout = () => {
    if(confirm('確定要登出系統嗎？')) {
        location.href = '/auth/logout'
    }
}
</script>

<template>
  <div v-if="user" class="auth-box">
    <span class="email">👤 {{ user }}</span>
    <button @click="logout" class="logout-btn">登出</button>
  </div>
</template>

<style scoped>
.auth-box {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 16px;
  padding-left: 16px;
  border-left: 1px solid var(--vp-c-divider);
  font-size: 13px;
}
.email {
  color: var(--vp-c-text-2);
  display: none; /* 手機版預設隱藏 Email 以省空間 */
}
@media (min-width: 768px) {
  .email { display: inline; }
}
.logout-btn {
  color: var(--vp-c-brand);
  font-weight: 500;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  transition: opacity 0.2s;
}
.logout-btn:hover {
  opacity: 0.7;
}
</style>
