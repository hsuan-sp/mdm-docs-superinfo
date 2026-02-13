/**
 * Centralized Data Access Layer
 * Reads from the generated index file (lib/generated-data.json)
 * which is produced by scripts/generate-index.mjs
 */

import generatedData from "./generated-data.json";

export async function getQAData(locale: string = "zh") {
  const langKey = locale === "en" ? "en" : "zh";
  const data = generatedData as any;

  // Return the QA modules directly
  return data.qa[langKey] || [];
}

export async function getGlossaryData(locale: string = "zh") {
  const langKey = locale === "en" ? "en" : "zh";
  const data = generatedData as any;

  // Return the full glossary list
  return data.glossary[langKey] || [];
}

export async function getChangelogData(locale: string = "zh") {
  const langKey = locale === "en" ? "en" : "zh";
  const data = generatedData as any;

  // Return the changelog entries
  return data.changelog[langKey] || [];
}
