/**
 * Centralized Data Access Layer
 * Dynamically reads from the generated index file (lib/generated-data.json)
 * using Node.js filesystem API to avoid build-time dependency issues.
 */

import { promises as fs } from "fs";
import path from "path";

// Define the path to the generated data file
const DATA_PATH = path.join(process.cwd(), "lib", "generated-data.json");

// Helper to load data
async function loadData() {
  try {
    const fileContent = await fs.readFile(DATA_PATH, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(
      `[Data Layer] Failed to read index from ${DATA_PATH}. Run 'npm run gen-index' first.`
    );
    return {
      qa: { zh: [], en: [] },
      glossary: { zh: [], en: [] },
      changelog: { zh: [], en: [] },
    };
  }
}

export async function getQAData(locale: string = "zh") {
  const langKey = locale === "en" ? "en" : "zh";
  const data = await loadData();
  return data.qa[langKey] || [];
}

export async function getGlossaryData(locale: string = "zh") {
  const langKey = locale === "en" ? "en" : "zh";
  const data = await loadData();
  return data.glossary[langKey] || [];
}

export async function getChangelogData(locale: string = "zh") {
  const langKey = locale === "en" ? "en" : "zh";
  const data = await loadData();
  return data.changelog[langKey] || [];
}
