// lib/data.ts
import manifest from "./shards/manifest.json";

/**
 * 數據加載器
 * 實現分片加載以優化 Edge Runtime 性能與內存佔用
 */

export async function getQAData(locale: string = "zh") {
  const langKey = locale === "en" ? "en" : "zh";
  const chapters = manifest.qa[langKey as "zh" | "en"];

  // 平行加載所有章節的分片
  const shards = await Promise.all(
    chapters.map(async (slug) => {
      try {
        // Next.js / Turbopack 支援帶有變數的動態 import，但路徑前綴需固定
        const shard = await import(`./shards/qa-${langKey}-${slug}.json`);
        return shard.default || shard;
      } catch (e) {
        console.error(`Failed to load shard: qa-${langKey}-${slug}`, e);
        return null;
      }
    })
  );

  return shards.filter(Boolean);
}

export async function getGlossaryData(locale: string = "zh") {
  const langKey = locale === "en" ? "en" : "zh";
  const { pages } = manifest.glossary[langKey as "zh" | "en"];

  const shards = await Promise.all(
    Array.from({ length: pages }).map(async (_, i) => {
      try {
        const shard = await import(`./shards/glossary-${langKey}-${i}.json`);
        return shard.default || shard;
      } catch (e) {
        console.error(`Failed to load shard: glossary-${langKey}-${i}`, e);
        return [];
      }
    })
  );

  return shards.flat();
}

export async function getChangelogData(locale: string = "zh") {
  const langKey = locale === "en" ? "en" : "zh";
  try {
    const shard = await import(`./shards/changelog-${langKey}.json`);
    return shard.default || shard;
  } catch (e) {
    console.error(`Failed to load shard: changelog-${langKey}`, e);
    return [];
  }
}
