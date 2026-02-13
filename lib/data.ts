/**
 * 数据加载器 (已迁移至 MDX)
 * 这个文件现在是 lib/content.ts 的兼容层
 *
 * 保留此文件是为了向后兼容，实际逻辑已迁移至 server-side MDX loader
 */

import { loadGuide, loadGlossary, loadChangelog } from "./content";

/**
 * 加载 Q&A 指南数据
 * @deprecated 直接使用 loadGuide() 从 lib/content
 */
export async function getQAData(locale: string = "zh") {
  const langKey = locale === "en" ? "en" : "zh";
  return await loadGuide(langKey);
}

/**
 * 加载术语百科数据
 * @deprecated 直接使用 loadGlossary() 从 lib/content
 */
export async function getGlossaryData(locale: string = "zh") {
  const langKey = locale === "en" ? "en" : "zh";
  return await loadGlossary(langKey);
}

/**
 * 加载更新日志数据
 * @deprecated 直接使用 loadChangelog() 从 lib/content
 */
export async function getChangelogData(locale: string = "zh") {
  const langKey = locale === "en" ? "en" : "zh";
  return await loadChangelog(langKey);
}
