import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 適應新結構: md_data 位於路徑根目錄
const CONTENT_DIR = path.join(__dirname, "../../md_data");
const BUNDLE_DIR = path.join(__dirname, "../../_generated/bundles");

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

function generateQABundles(lang) {
  const root = path.join(CONTENT_DIR, lang, "qa");
  if (!fs.existsSync(root)) {
    console.warn(`[Bundle] Warning: QA Root ${root} does not exist.`);
    return;
  }

  QA_ORDER.forEach((slug) => {
    const dir = path.join(root, slug);
    if (!fs.existsSync(dir)) {
      console.warn(`[Bundle] Warning: Directory ${dir} does not exist.`);
      return;
    }

    const files = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".md"))
      .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)?.[0] || 0);
        const numB = parseInt(b.match(/\d+/)?.[0] || 0);
        if (numA !== numB) return numA - numB;
        return a.localeCompare(b);
      });

    let bundleContent = "\n\n";
    files.forEach((file) => {
      const content = fs.readFileSync(path.join(dir, file), "utf-8");
      bundleContent += `---\nFile: ${file}\n---\n\n${content}\n\n`;
    });

    const bundlePath = path.join(BUNDLE_DIR, `${lang}_${slug}_bundle.md`);
    fs.writeFileSync(bundlePath, bundleContent);
    console.log(`✅ Generated ${lang} ${slug} bundle`);
  });
}

function generateGlossaryBundles(lang) {
  const dir = path.join(CONTENT_DIR, lang, "glossary");
  if (!fs.existsSync(dir)) {
    console.warn(`[Bundle] Warning: Directory ${dir} does not exist.`);
    return;
  }

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort();

  // 每 50 個文件打一個包，或者按比例分 3 包
  const chunkSize = Math.ceil(files.length / 3);

  for (let i = 0; i < 3; i++) {
    const chunk = files.slice(i * chunkSize, (i + 1) * chunkSize);
    if (chunk.length === 0) continue;

    let bundleContent = "\n\n";
    chunk.forEach((file) => {
      const content = fs.readFileSync(path.join(dir, file), "utf-8");
      bundleContent += `---\nFile: ${file}\n---\n\n${content}\n\n`;
    });
    const bundlePath = path.join(
      BUNDLE_DIR,
      `${lang}_glossary_bundle_v${i + 1}.md`
    );
    fs.writeFileSync(bundlePath, bundleContent);
    console.log(`✅ Generated ${lang} glossary bundle v${i + 1}`);
  }
}

console.log("📦 Generating Bundles...");
if (!fs.existsSync(BUNDLE_DIR)) {
  fs.mkdirSync(BUNDLE_DIR, { recursive: true });
}

generateQABundles("zh");
generateQABundles("en");
generateGlossaryBundles("zh");
generateGlossaryBundles("en");
console.log("✨ Bundles Completed.");
