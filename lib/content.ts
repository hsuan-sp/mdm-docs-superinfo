/**
 * Server-side MDX Content Loader
 * 替代原先的 JSON shards 架构，直接读取并解析 MDX 文件
 * 完全兼容 Vercel 部署
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: false,
});

// 中英文排版优化
function enhanceTypography(text: string): string {
  if (!text) return "";
  return text
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (
        trimmed.startsWith("|") ||
        trimmed.startsWith("#") ||
        trimmed.startsWith(">") ||
        trimmed.startsWith("- ") ||
        trimmed.startsWith("* ") ||
        /^\d+\. /.test(trimmed) ||
        trimmed.startsWith("**") ||
        trimmed.startsWith("___") ||
        trimmed.startsWith("```")
      ) {
        return line;
      }
      return line
        .replace(/([\u4e00-\u9fa5])([a-zA-Z0-9])/g, "$1 $2")
        .replace(/([a-zA-Z0-9])([\u4e00-\u9fa5])/g, "$1 $2")
        .replace(/([\u4e00-\u9fa5]),/g, "$1，")
        .replace(/([\u4e00-\u9fa5]):/g, "$1：")
        .replace(/([\u4e00-\u9fa5]);/g, "$1；")
        .replace(/([\u4e00-\u9fa5])!/g, "$1！")
        .replace(/([\u4e00-\u9fa5])\?/g, "$1？")
        .replace(/\.\.\./g, "…")
        .replace(/--/g, "—")
        .replace(/([\u4e00-\u9fa5])"/g, '$1"')
        .replace(/"([\u4e00-\u9fa5])/g, '"$1');
    })
    .join("\n");
}

function renderMarkdown(text: string): string {
  if (!text) return "";
  return md.render(enhanceTypography(text));
}

const ROOT_DIR = process.cwd();
const DATA_DIR = path.join(ROOT_DIR, "md_data");

// ===== Glossary Loader =====
export interface GlossaryItem {
  term: string;
  definition: string;
  analogy: string;
  category: string | string[];
  tags?: string[];
}

export async function loadGlossary(
  locale: "zh" | "en"
): Promise<GlossaryItem[]> {
  const glossaryDir = path.join(
    DATA_DIR,
    locale === "en" ? "en" : "zh",
    "glossary"
  );

  if (!fs.existsSync(glossaryDir)) {
    console.warn(`Glossary directory not found: ${glossaryDir}`);
    return [];
  }

  const files = fs.readdirSync(glossaryDir).filter((f) => f.endsWith(".mdx"));

  const items = files
    .map((file) => {
      try {
        const content = fs.readFileSync(path.join(glossaryDir, file), "utf-8");
        const { data, content: mdBody } = matter(content);

        const analogyMarker = locale === "zh" ? "## 白話文比喻" : "## Analogy";
        const definitionMarker =
          locale === "zh" ? "## 術語定義" : "## Term Definition";

        const parts = mdBody.split(analogyMarker);
        const definition = parts[0].replace(definitionMarker, "").trim();
        const analogy = parts[1] ? parts[1].trim() : "";

        return {
          term: String(data.term || path.basename(file, ".mdx")),
          definition: renderMarkdown(definition),
          analogy: renderMarkdown(analogy),
          category: data.category || [],
          tags: Array.isArray(data.tags)
            ? data.tags
            : data.tags
              ? [data.tags]
              : [],
        };
      } catch (e) {
        console.error(`Error parsing glossary file ${file}:`, e);
        return null;
      }
    })
    .filter(Boolean) as GlossaryItem[];

  return items.sort((a, b) => a.term.localeCompare(b.term));
}

// ===== Q&A Loader =====
export interface QAItem {
  id: string;
  question: string;
  answer: string;
  important: boolean;
  tags: string[];
  category: string;
}

export interface QASection {
  title: string;
  items: QAItem[];
}

export interface QAModule {
  id: string;
  source: string;
  sections: QASection[];
}

const SOURCE_TITLE_MAP: Record<string, Record<string, string>> = {
  zh: {
    account: "帳號與伺服器",
    enrollment: "裝置部署",
    apps: "App 與內容",
    classroom: "課堂管理",
    "digital-learning": "精進方案",
    hardware: "維修保固",
    mac: "Mac 管理",
    "qa-education": "校園實務 Q&A",
  },
  en: {
    account: "Account & Server",
    enrollment: "Zero-Touch Deployment",
    apps: "Apps & Content",
    classroom: "Classroom Tools",
    "digital-learning": "Digital Initiative",
    hardware: "Service & Support",
    mac: "Mac Management",
    "qa-education": "Campus Case Q&A",
  },
};

const QA_ORDER = [
  "account",
  "enrollment",
  "apps",
  "classroom",
  "digital-learning",
  "hardware",
  "mac",
  "qa-education",
];

export async function loadGuide(locale: "zh" | "en"): Promise<QAModule[]> {
  const qaRootDir = path.join(DATA_DIR, locale === "en" ? "en" : "zh", "qa");

  if (!fs.existsSync(qaRootDir)) {
    console.warn(`QA directory not found: ${qaRootDir}`);
    return [];
  }

  const modules: QAModule[] = [];

  for (const slug of QA_ORDER) {
    const dir = path.join(qaRootDir, slug);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
    if (files.length === 0) continue;

    const items = files
      .map((file) => {
        try {
          const content = fs.readFileSync(path.join(dir, file), "utf-8");
          const { data, content: mdBody } = matter(content);

          return {
            id: String(data.id || path.basename(file, ".mdx")),
            question: String(data.title || path.basename(file, ".mdx")),
            answer: renderMarkdown(mdBody.trim()),
            important: Boolean(data.important),
            tags: Array.isArray(data.tags)
              ? data.tags
              : data.tags
                ? [data.tags]
                : [],
            category: data.category || SOURCE_TITLE_MAP[locale][slug],
          };
        } catch (e) {
          console.error(`Error parsing QA file ${file}:`, e);
          return null;
        }
      })
      .filter(Boolean) as QAItem[];

    items.sort((a, b) =>
      (a.id || "").localeCompare(b.id || "", undefined, { numeric: true })
    );

    modules.push({
      id: slug,
      source: SOURCE_TITLE_MAP[locale][slug] || slug,
      sections: [
        { title: items[0]?.category || SOURCE_TITLE_MAP[locale][slug], items },
      ],
    });
  }

  return modules;
}

// ===== Changelog Loader =====
export interface ChangelogEntry {
  version: string;
  date: string;
  type: string;
  content: string;
}

export async function loadChangelog(
  locale: "zh" | "en"
): Promise<ChangelogEntry[]> {
  const changelogDir = path.join(
    DATA_DIR,
    locale === "en" ? "en" : "zh",
    "changelog"
  );

  if (!fs.existsSync(changelogDir)) {
    console.warn(`Changelog directory not found: ${changelogDir}`);
    return [];
  }

  const files = fs.readdirSync(changelogDir).filter((f) => f.endsWith(".mdx"));

  const logs = files
    .map((file) => {
      try {
        const content = fs.readFileSync(path.join(changelogDir, file), "utf-8");
        const { data, content: mdBody } = matter(content);

        return {
          version: String(data.version || path.basename(file, ".mdx")),
          date: String(data.date || new Date().toISOString().split("T")[0]),
          type: String(data.type || "patch"),
          content: renderMarkdown(mdBody.trim()),
        };
      } catch (e) {
        console.error(`Error parsing changelog file ${file}:`, e);
        return null;
      }
    })
    .filter(Boolean) as ChangelogEntry[];

  return logs.sort((a, b) => b.date.localeCompare(a.date));
}
