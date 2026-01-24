import MarkdownIt from "markdown-it";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: false,
});

function enhanceTypography(text: string) {
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

function renderMarkdown(text: string) {
  if (!text) return "";
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

export async function getQAData(locale: string = "zh-TW") {
  const root = path.resolve(
    process.cwd(),
    "md_data",
    locale === "en" ? "en" : "zh"
  );

  const titleMap = locale === "en" ? EN_SOURCE_TITLE_MAP : SOURCE_TITLE_MAP;

  const sections = [];

  const getFiles = (dir: string): string[] => {
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter((file) => file.endsWith(".md"))
      .map((file) => path.join(dir, file));
  };

  for (const slug of QA_ORDER) {
    const dir = path.join(root, "qa", slug);
    const files = getFiles(dir);
    const items = [];

    for (const filePath of files) {
      try {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(fileContent);

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
        console.error(`Error parsing QA file ${filePath}:`, err);
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
}

export async function getGlossaryData(locale: string = "zh-TW") {
  const root = path.resolve(
    process.cwd(),
    "md_data",
    locale === "en" ? "en" : "zh"
  );

  const isEn = locale === "en";
  const dir = path.join(root, "glossary");

  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => path.join(dir, file));

  const terms = [];
  const analogyMarker = !isEn ? "## 白話文比喻" : "## Analogy";
  const definitionMarker = !isEn ? "## 術語定義" : "## Term Definition";

  for (const filePath of files) {
    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

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
      console.error(`Error parsing Glossary file ${filePath}:`, err);
    }
  }

  terms.sort((a, b) => (a.term || "").localeCompare(b.term || ""));
  return terms;
}

export async function getChangelogData(locale: string = "zh-TW") {
  const isEn = locale === "en";
  const root = path.resolve(
    process.cwd(),
    "data/changelog",
    isEn ? "en" : "zh"
  );

  if (!fs.existsSync(root)) return [];

  const files = fs
    .readdirSync(root)
    .filter((file) => file.endsWith(".md"))
    .map((file) => path.join(root, file));

  const logs = [];

  for (const filePath of files) {
    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      logs.push({
        version: String(data.version || path.basename(filePath, ".md")),
        date: String(data.date || new Date().toISOString().split("T")[0]),
        type: String(data.type || "patch"),
        content: renderMarkdown(content.trim()),
      });
    } catch (err) {
      console.error(`Error parsing Changelog file ${filePath}:`, err);
    }
  }

  logs.sort(
    (a, b) =>
      b.date.localeCompare(a.date) ||
      b.version.localeCompare(a.version, undefined, { numeric: true })
  );
  return logs;
}
