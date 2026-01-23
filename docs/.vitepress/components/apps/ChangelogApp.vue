<script setup>
import { computed, ref, onMounted, shallowRef, watch } from "vue";
import { useData } from "vitepress";
// @ts-ignore
import { data as rawLogsData } from "../../../data/changelog.data";

const { lang } = useData();
const isMounted = ref(false);
const selectedVersion = ref("");

// Use shallowRef for large log datasets
const logsData = shallowRef(rawLogsData);

onMounted(() => {
  isMounted.value = true;
});

// Detect language
const isEn = computed(() => lang.value === "en-US" || lang.value === "en");
const currentLogs = computed(() => {
  const d = logsData.value;
  const logs = isEn.value ? d?.en : d?.zh;
  if (!logs) return [];
  // Smart Sort: Date descending, then version descending
  return [...logs].sort((a, b) => {
    const dateCompare = b.date.localeCompare(a.date);
    if (dateCompare !== 0) return dateCompare;
    return b.version.localeCompare(a.version, undefined, { numeric: true });
  });
});

// UI Translations
const ui = computed(() =>
  isEn.value
    ? {
        selectVersion: "Select Version",
        latest: "Latest",
        noLogs: "No changelogs available.",
        allVersions: "All Versions",
      }
    : {
        selectVersion: "選擇版本",
        latest: "最新版本",
        noLogs: "目前沒有更新紀錄。",
        allVersions: "所有版本",
      }
);

// Initialization
watch(
  currentLogs,
  (newLogs) => {
    if (newLogs.length > 0 && !selectedVersion.value) {
      selectedVersion.value = newLogs[0].version;
    }
  },
  { immediate: true }
);

const filteredLogs = computed(() => {
  if (selectedVersion.value === "ALL") return currentLogs.value;
  return currentLogs.value.filter(
    (log) => log.version === selectedVersion.value
  );
});

const getTypeLabel = (type) => {
  return type ? type.toUpperCase() : "PATCH";
};
</script>

<template>
  <div class="changelog-container">
    <!-- Version Selector -->
    <div v-if="currentLogs.length > 1" class="version-selector-wrapper">
      <label for="version-select" class="selector-label">{{
        ui.selectVersion
      }}</label>
      <div class="custom-select">
        <select id="version-select" v-model="selectedVersion">
          <option
            v-for="(log, idx) in currentLogs"
            :key="log.version"
            :value="log.version"
          >
            {{ log.version }} ({{ log.date }})
            {{ idx === 0 ? `[${ui.latest}]` : "" }}
          </option>
          <option value="ALL">{{ ui.allVersions }}</option>
        </select>
      </div>
    </div>

    <div v-if="isMounted">
      <div
        v-for="(log, index) in filteredLogs"
        :key="log.version"
        class="version-entry"
        :id="log.version"
      >
        <div class="version-header">
          <div class="version-primary">
            <a :href="'#' + log.version" class="version-title">
              <h2>{{ log.version }}</h2>
            </a>
            <span class="version-date">{{ log.date }}</span>
          </div>
          <span
            v-if="index === 0 && selectedVersion !== 'ALL'"
            class="latest-badge"
            >{{ ui.latest }}</span
          >
        </div>

        <div class="version-body markdown-body" v-html="log.content"></div>
      </div>

      <div v-if="currentLogs.length === 0" class="empty-state">
        <p>{{ ui.noLogs }}</p>
      </div>
    </div>

    <!-- Skeleton / Loading Space -->
    <div v-else class="loading-placeholder"></div>
  </div>
</template>

<style scoped>
/* Version Selector Styles */
.version-selector-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 3rem;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
}

.selector-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.custom-select {
  position: relative;
  flex: 1;
  max-width: 300px;
}

.custom-select select {
  width: 100%;
  padding: 10px 16px;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  appearance: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.custom-select select:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.custom-select::after {
  content: "▼";
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  pointer-events: none;
}

/* Version Entry Styles */
.version-entry {
  margin-bottom: 4rem;
  position: relative;
}

.version-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.75rem;
}

.version-primary {
  display: flex;
  align-items: baseline;
  gap: 16px;
}

.version-title {
  text-decoration: none;
  color: inherit;
}

.version-title:hover {
  color: var(--vp-c-brand);
}

.version-header h2 {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  font-family: var(--vp-font-family-mono);
}

.version-date {
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-3);
  font-size: 0.95rem;
}

.latest-badge {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 12px;
  text-transform: uppercase;
}

/* Content Styles */
:deep(.version-body h3) {
  font-size: 1.05rem;
  font-weight: 800;
  margin-top: 1.75rem;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
  gap: 8px;
}

:deep(.version-body h3::before) {
  content: "";
  display: inline-block;
  width: 4px;
  height: 1.2em;
  background: var(--vp-c-brand);
  border-radius: 2px;
}

/* Removed specific list overrides to use global .markdown-body styles from markdown-styles.css */

/* Loading Placeholder */
.loading-placeholder {
  height: 400px;
  background: var(--vp-c-bg-soft);
  border-radius: 20px;
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }

  50% {
    opacity: 0.3;
  }

  100% {
    opacity: 0.6;
  }
}

/* Mobile responsive */
@media (max-width: 640px) {
  .version-header {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }

  .version-primary {
    flex-direction: column;
    gap: 4px;
  }

  .version-selector-wrapper {
    flex-direction: column;
    align-items: stretch;
  }

  .custom-select {
    max-width: 100%;
  }
}
</style>
