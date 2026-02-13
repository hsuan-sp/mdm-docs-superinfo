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

// 排版優化 (保留原有邏輯)
function enhanceTypography(text) {
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
        .replace(/([\u4e00-\u9fa5])"/g, "$1”")
        .replace(/"([\u4e00-\u9fa5])/g, "“$1");
    })
    .join("\n");
}

function renderMarkdown(text) {
  if (!text) return "";
  return md.render(enhanceTypography(text));
}

const CWD = process.cwd();
const CONTENT_DIR = path.join(CWD, "content");
const OUTPUT_FILE = path.join(CWD, "lib", "generated-data.json");
const LOCALES = ["zh", "en"];
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

const SOURCE_TITLE_MAP = {
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

function generate() {
  console.log("🚀 開始生成全站索引 (from .mdx content)...");

  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`❌ Content directory not found: ${CONTENT_DIR}`);
    process.exit(1);
  }

  const database = {
    qa: { zh: [], en: [] },
    glossary: { zh: [], en: [] },
    changelog: { zh: [], en: [] },
    meta: {
      generatedAt: new Date().toISOString(),
      version: "2.0.0-mdx",
    },
  };

  LOCALES.forEach((locale) => {
    const rootDir = path.join(CONTENT_DIR, locale === "en" ? "en" : "zh");

    // 1. Glossary Processing
    const glossaryDir = path.join(rootDir, "glossary");
    if (fs.existsSync(glossaryDir)) {
      const files = fs
        .readdirSync(glossaryDir)
        .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

      const terms = files
        .map((file) => {
          try {
            const content = fs.readFileSync(
              path.join(glossaryDir, file),
              "utf-8"
            );
            const { data, content: mdBody } = matter(content);

            const analogyMarker =
              locale === "en" ? "## Analogy" : "## 白話文比喻";
            const definitionMarker =
              locale === "en" ? "## Term Definition" : "## 術語定義";

            const parts = mdBody.split(analogyMarker);
            const definition = parts[0].replace(definitionMarker, "").trim();
            const analogy = parts[1] ? parts[1].trim() : "";

            return {
              term: String(
                data.term || path.basename(file, path.extname(file))
              ),
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
            console.error(`Error processing glossary ${file}:`, e);
            return null;
          }
        })
        .filter(Boolean)
        .sort((a, b) => a.term.localeCompare(b.term));

      database.glossary[locale] = terms;
      console.log(`✓ [${locale}] Indexed ${terms.length} glossary terms`);
    }

    // 2. Q&A Processing
    const qaRootDir = path.join(rootDir, "qa");
    if (fs.existsSync(qaRootDir)) {
      // Instead of relying on files order, we use QA_ORDER to structure the data
      const modules = [];

      QA_ORDER.forEach((slug) => {
        const dir = path.join(qaRootDir, slug);
        if (fs.existsSync(dir)) {
          const files = fs
            .readdirSync(dir)
            .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

          const items = files
            .map((file) => {
              try {
                const content = fs.readFileSync(path.join(dir, file), "utf-8");
                const { data, content: mdBody } = matter(content);

                return {
                  id: String(
                    data.id || path.basename(file, path.extname(file))
                  ),
                  question: String(
                    data.title || path.basename(file, path.extname(file))
                  ),
                  answer: renderMarkdown(mdBody.trim()),
                  important: Boolean(data.important),
                  category: data.category || SOURCE_TITLE_MAP[locale][slug],
                  tags: Array.isArray(data.tags)
                    ? data.tags
                    : data.tags
                      ? [data.tags]
                      : [],
                };
              } catch (e) {
                console.error(`Error processing QA ${file}:`, e);
                return null;
              }
            })
            .filter(Boolean)
            .sort((a, b) =>
              (a.id || "").localeCompare(b.id || "", undefined, {
                numeric: true,
              })
            );

          if (items.length > 0) {
            modules.push({
              id: slug,
              source: SOURCE_TITLE_MAP[locale][slug] || slug,
              sections: [
                {
                  title: items[0]?.category || SOURCE_TITLE_MAP[locale][slug],
                  items,
                },
              ],
            });
          }
        }
      });

      database.qa[locale] = modules;
      console.log(`✓ [${locale}] Indexed ${modules.length} QA modules`);
    }

    // 3. Changelog Processing
    const changelogDir = path.join(rootDir, "changelog");
    if (fs.existsSync(changelogDir)) {
      const files = fs
        .readdirSync(changelogDir)
        .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

      const logs = files
        .map((file) => {
          try {
            const content = fs.readFileSync(
              path.join(changelogDir, file),
              "utf-8"
            );
            const { data, content: mdBody } = matter(content);

            return {
              version: String(
                data.version || path.basename(file, path.extname(file))
              ),
              date: String(data.date || new Date().toISOString().split("T")[0]),
              type: String(data.type || "patch"),
              content: renderMarkdown(mdBody.trim()),
            };
          } catch (e) {
            console.error(`Error processing changelog ${file}:`, e);
            return null;
          }
        })
        .filter(Boolean)
        .sort((a, b) => b.date.localeCompare(a.date));

      database.changelog[locale] = logs;
      console.log(`✓ [${locale}] Indexed ${logs.length} changelog entries`);
    }
  });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(database, null, 2));
  console.log(`✅ Index generated successfully at: ${OUTPUT_FILE}`);
}

generate();
