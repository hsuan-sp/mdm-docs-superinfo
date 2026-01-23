import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
});

function renderMarkdown(text: string) {
  if (!text) return "";
  const processed = text
    .replace(/([^\n])\n(\s*[-*+])/g, "$1\n\n$2")
    .replace(/([^\n])\n(\s*\d+\.)/g, "$1\n\n$2");
  return md.render(processed);
}

export default {
  watch: ["./logs/items/*.md", "./logs/items-en/*.md"], // Relative to docs/data/changelog.data.ts
  async load() {
    const { fileURLToPath } = await import("node:url");
    const path = await import("node:path");
    const fs = await import("node:fs");
    const matter = await import("gray-matter");

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    // Path from data/ -> data/logs/items
    const ZH_ROOT = path.resolve(__dirname, "logs/items");
    const EN_ROOT = path.resolve(__dirname, "logs/items-en");

    const getFiles = (dir: string): string[] => {
      if (!fs.existsSync(dir)) return [];
      return fs
        .readdirSync(dir)
        .filter((file) => file.endsWith(".md"))
        .map((file) => path.join(dir, file));
    };

    const loadLogs = (dir: string) => {
      const files = getFiles(dir);
      const items = [];

      for (const filePath of files) {
        try {
          const fileContent = fs.readFileSync(filePath, "utf-8");
          // Use gray-matter for robust parsing
          const { data, content } = matter.default(fileContent);

          items.push({
            version: String(data.version || path.basename(filePath, ".md")),
            date: String(data.date || new Date().toISOString().split("T")[0]),
            type: String(data.type || "patch"),
            content: renderMarkdown(content.trim()),
          });
        } catch (err) {
          console.error(
            `[Changelog Loader] Error parsing log file ${filePath}:`,
            err
          );
        }
      }

      // Sort by version (SemVer mostly works with localeCompare for simple cases, or date)
      // Let's sort by date descending
      items.sort(
        (a, b) =>
          b.date.localeCompare(a.date) ||
          b.version.localeCompare(a.version, undefined, { numeric: true })
      );
      return items;
    };

    return {
      zh: loadLogs(ZH_ROOT),
      en: loadLogs(EN_ROOT),
    };
  },
};
