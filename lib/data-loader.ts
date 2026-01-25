// 附註：此檔案為 VitePress 的 Data Loader (資料載入器)。
// 它在建置階段於 Node.js 環境運行，但檔案本身會被使用者端代碼匯入。
// 為避免 Rollup/Vite 嘗試為瀏覽器封裝 Node.js 內建模組，
// 我們必須避免在最外層 (Top-level) 使用 'node:*' 的匯入語法。

/**
 - Q&A 章節顯示順序定義
 */
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: false, // Stop converting newlines to <br> to fix excessive spacing
});

/**
 - 專業排版引擎：處理中英文間隔 (Pangu Spacing) 與標點規範
 */
function enhanceTypography(text: string) {
  if (!text) return "";

  // Split into lines to avoid breaking markdown structures like tables and code blocks
  return text
    .split("\n")
    .map((line) => {
      // Skip lines that look like markdown syntax
      const trimmed = line.trim();
      if (
        trimmed.startsWith("|") ||
        trimmed.startsWith("#") ||
        trimmed.startsWith(">") ||
        trimmed.startsWith("- ") ||
        trimmed.startsWith("* ") ||
        /^\d+\. /.test(trimmed) || // Ordered lists
        trimmed.startsWith("**") || // Bold starts
        trimmed.startsWith("___") || // Horizontal rule
        trimmed.startsWith("```") // Code block
      ) {
        return line;
      }

      return (
        line
          // 1. Pangu Spacing
          .replace(/([\u4e00-\u9fa5])([a-zA-Z0-9])/g, "$1 $2")
          .replace(/([a-zA-Z0-9])([\u4e00-\u9fa5])/g, "$1 $2")
          // 2. 標點規範
          .replace(/([\u4e00-\u9fa5]),/g, "$1，")
          .replace(/([\u4e00-\u9fa5]):/g, "$1：")
          .replace(/([\u4e00-\u9fa5]);/g, "$1；")
          .replace(/([\u4e00-\u9fa5])!/g, "$1！")
          .replace(/([\u4e00-\u9fa5])\?/g, "$1？")
          // 3. 標點美化
          .replace(/\.\.\./g, "…")
          .replace(/--/g, "—")
          .replace(/([\u4e00-\u9fa5])"/g, "$1”")
          .replace(/"([\u4e00-\u9fa5])/g, "“$1")
      );
    })
    .join("\n");
}

/**
 - 預渲染 Markdown 到 HTML
 */
function renderMarkdown(text: string) {
  if (!text) return "";

  // 應用排版優化
  const enhanced = enhanceTypography(text);

  return md.render(enhanced);
}

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

/**
 - 原始 slug 與顯示名稱的映射表 (中文)
 */
const SOURCE_TITLE_MAP: Record<string, string> = {
  account: "帳號與伺服器",
  enrollment: "裝置註冊",
  apps: "App 管理",
  classroom: "課堂管理",
  "digital-learning": "數位精進",
  hardware: "硬體排除",
  mac: "Mac 管理",
  "qa-education": "教育實戰",
};

/**
 - 原始 slug 與顯示名稱的映射表 (英文)
 */
const EN_SOURCE_TITLE_MAP: Record<string, string> = {
  account: "Account & Server Management",
  enrollment: "Enrollment & Device Setup",
  apps: "App & Content Distribution",
  classroom: "Apple Classroom & Teaching Tools",
  "digital-learning": "Campus Digital Initiatives",
  hardware: "Hardware & Maintenance",
  mac: "Advanced Mac Management",
  "qa-education": "Education Scenarios & FAQ",
};

export default {
  watch: ["../content/zh/**/*.md", "../content/en/**/*.md"], // Relative to docs/data/all.data.ts
  async load() {
    const { fileURLToPath } = await import("node:url");
    const path = await import("node:path");
    const fs = await import("node:fs");
    const matter = await import("gray-matter"); // Use gray-matter

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    // Correct path from data/ to content/
    const ZH_ROOT = path.resolve(__dirname, "../content/zh");
    const EN_ROOT = path.resolve(__dirname, "../content/en");

    const getFiles = (dir: string): string[] => {
      if (!fs.existsSync(dir)) return [];
      return fs
        .readdirSync(dir)
        .filter((file) => file.endsWith(".md"))
        .map((file) => path.join(dir, file));
    };

    const loadQAData = async (
      root: string,
      titleMap: Record<string, string>
    ) => {
      const sections = [];
      for (const slug of QA_ORDER) {
        const dir = path.join(root, "qa", slug);
        const files = getFiles(dir);
        const items = [];

        for (const filePath of files) {
          try {
            const fileContent = fs.readFileSync(filePath, "utf-8");
            const { data, content } = matter.default(fileContent);

            items.push({
              id: String(data.id || path.basename(filePath, ".md")),
              question: String(data.title || path.basename(filePath, ".md")),
              answer: renderMarkdown(content.trim()),
              important: Boolean(data.important),
              tags: Array.isArray(data.tags)
                ? data.tags
                : data.tags
                  ? [data.tags]
                  : [],
              category: data.category || titleMap[slug],
            });
          } catch (err) {
            console.error(
              `[Data Loader] Error parsing QA file ${filePath}:`,
              err
            );
            // Don't throw, just skip this file to let the build continue
          }
        }

        items.sort((a, b) =>
          (a.id || "").localeCompare(b.id || "", undefined, { numeric: true })
        );

        if (items.length > 0) {
          sections.push({
            source: titleMap[slug] || slug,
            sections: [
              {
                title: items[0].category || titleMap[slug],
                items: items,
              },
            ],
          });
        }
      }
      return sections;
    };

    const loadGlossaryData = async (root: string, lang: "zh" | "en") => {
      const dir = path.join(root, "glossary");
      const files = getFiles(dir);
      const terms = [];

      const analogyMarker = lang === "zh" ? "## 白話文比喻" : "## Analogy";
      const definitionMarker =
        lang === "zh" ? "## 術語定義" : "## Term Definition";

      for (const filePath of files) {
        try {
          const fileContent = fs.readFileSync(filePath, "utf-8");
          const { data, content } = matter.default(fileContent);

          const parts = content.split(analogyMarker);
          const definition = parts[0].replace(definitionMarker, "").trim();
          const analogy = parts[1] ? parts[1].trim() : "";

          terms.push({
            term: String(data.term || path.basename(filePath, ".md")),
            definition: renderMarkdown(definition),
            analogy: renderMarkdown(analogy),
            category: data.category || [],
            tags: Array.isArray(data.tags)
              ? data.tags
              : data.tags
                ? [data.tags]
                : [],
          });
        } catch (err) {
          console.error(
            `[Data Loader] Error parsing Glossary file ${filePath}:`,
            err
          );
        }
      }

      terms.sort((a, b) => (a.term || "").localeCompare(b.term || ""));
      return terms;
    };

    const [zhQA, zhGlossary, enQA, enGlossary] = await Promise.all([
      loadQAData(ZH_ROOT, SOURCE_TITLE_MAP),
      loadGlossaryData(ZH_ROOT, "zh"),
      loadQAData(EN_ROOT, EN_SOURCE_TITLE_MAP),
      loadGlossaryData(EN_ROOT, "en"),
    ]);

    return {
      zh: { allQAData: zhQA, glossaryData: zhGlossary },
      en: { allQAData: enQA, glossaryData: enGlossary },
    };
  },
};
