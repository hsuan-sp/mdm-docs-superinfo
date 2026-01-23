<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useRouter, useData } from "vitepress";

const { site } = useData();
const router = useRouter();

const handleContextMenu = (e: MouseEvent) => {
  e.preventDefault();
  console.warn("⚠️ 本站原創內容，未經授權禁止複製或側錄。");
};

const handleKeyDown = (e: KeyboardEvent) => {
  // 禁止 Ctrl+S, Ctrl+U, Ctrl+P, F12, Ctrl+Shift+I, Alt+Cmd+I
  const isForbidden =
    e.keyCode === 123 || // F12
    ((e.ctrlKey || e.metaKey) && e.keyCode === 85) || // Ctrl+U
    ((e.ctrlKey || e.metaKey) && e.keyCode === 83) || // Ctrl+S
    ((e.ctrlKey || e.metaKey) && e.keyCode === 80) || // Ctrl+P
    ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
    ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 67) || // Ctrl+Shift+C
    (e.metaKey && e.altKey && e.keyCode === 73); // Mac Opt+Cmd+I

  if (isForbidden) {
    e.preventDefault();
    console.error("🛡️ 系統已攔截受限操作 (Security Intercepted)");
  }
};

const handleCopy = (e: ClipboardEvent) => {
  e.preventDefault();
  const msg = "🔒 本站內容受技術保護，禁止複製或側錄。";
  if (e.clipboardData) {
    e.clipboardData.setData("text/plain", msg);
  }
  console.error("🛡️ 複製操作已被攔截");
};

// 基礎防護：攔截右鍵、快捷鍵與複製
onMounted(() => {
  // Automatic Language Detection
  if (typeof window !== "undefined") {
    const userLang =
      navigator.language || (navigator as any).userLanguage || "";
    const isChinese = userLang.toLowerCase().startsWith("zh");
    const currentPath = window.location.pathname;
    const isEnPath = currentPath.includes("/en/");
    const hasRedirected = sessionStorage.getItem("lang-redirect-checked");

    // If browser is not Chinese, and we are NOT on an English page, and haven't checked yet
    if (!isChinese && !isEnPath && !hasRedirected) {
      sessionStorage.setItem("lang-redirect-checked", "true");

      const base = site.value?.base || "/";
      const cleanPath = currentPath.startsWith(base)
        ? currentPath.slice(base.length)
        : currentPath;

      const target =
        base +
        "en/" +
        (cleanPath.startsWith("/") ? cleanPath.slice(1) : cleanPath);
      router.go(target);
    }
  }

  document.addEventListener("contextmenu", handleContextMenu);
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("copy", handleCopy);

  // 強制 CSS 禁止選擇 (如果需要更嚴格)
  document.body.style.userSelect = "none";
  document.body.style.webkitUserSelect = "none";

  console.log(
    "%c🛡️ MDM Support Shield Active",
    "color: #ff3b30; font-weight: bold;"
  );
});

onUnmounted(() => {
  document.removeEventListener("contextmenu", handleContextMenu);
  document.removeEventListener("keydown", handleKeyDown);
  document.removeEventListener("copy", handleCopy);
  document.body.style.userSelect = "auto";
  document.body.style.webkitUserSelect = "auto";
});
</script>

<template>
  <div style="display: none" aria-hidden="true"></div>
</template>
