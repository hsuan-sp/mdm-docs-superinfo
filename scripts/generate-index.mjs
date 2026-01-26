import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Modernized Index Generator for MDM Support Site
 * Generates both Markdown and JSON indices.
 */

const CWD = process.cwd();
const MD_DATA_DIR = path.join(CWD, "md_data");
const MAINTENANCE_DIR = path.join(CWD, "maintenance");
const LOCALES = ["zh", "en"];

const SOURCE_MAP = {
    zh: {
        account: "帳號與伺服器", enrollment: "裝置註冊", apps: "App 管理",
        classroom: "課堂管理", "digital-learning": "數位精進", hardware: "硬體排除",
        mac: "Mac 管理", "qa-education": "教育實戰",
    },
    en: {
        account: "Account & Server Management", enrollment: "Enrollment & Device Setup",
        apps: "App & Content Distribution", classroom: "Apple Classroom & Teaching Tools",
        "digital-learning": "Campus Digital Initiatives", hardware: "Hardware & Maintenance",
        mac: "Advanced Mac Management", "qa-education": "Education Scenarios & FAQ",
    }
};

function getFiles(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).filter(f => f.endsWith(".md")).sort();
}

function parseFile(filePath) {
    const content = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(content);
    return data;
}

function generate() {
    console.log("🚀 Starting Index Generation...");
    if (!fs.existsSync(MAINTENANCE_DIR)) fs.mkdirSync(MAINTENANCE_DIR, { recursive: true });

    const fullIndex = {
        updatedAt: new Date().toISOString(),
        locales: {}
    };

    LOCALES.forEach(locale => {
        const root = path.join(MD_DATA_DIR, locale);
        const glossaryDir = path.join(root, "glossary");
        const qaRootDir = path.join(root, "qa");
        const changelogDir = path.join(root, "changelog");

        const localeData = {
            glossary: [],
            qa: {},
            changelog: []
        };

        // 1. Glossary
        const glossaryFiles = getFiles(glossaryDir);
        localeData.glossary = glossaryFiles.map(f => {
            const data = parseFile(path.join(glossaryDir, f));
            return { term: data.term || f.replace(".md", ""), file: f };
        });

        // 2. QA
        const categories = Object.keys(SOURCE_MAP[locale]);
        categories.forEach(cat => {
            const catDir = path.join(qaRootDir, cat);
            const files = getFiles(catDir);
            if (files.length > 0) {
                localeData.qa[cat] = {
                    title: SOURCE_MAP[locale][cat],
                    items: files.map(f => {
                        const data = parseFile(path.join(catDir, f));
                        return { id: data.id, title: data.title || f, file: f };
                    })
                };
            }
        });

        // 3. Changelog
        const changelogFiles = getFiles(changelogDir);
        localeData.changelog = changelogFiles.map(f => {
            const data = parseFile(path.join(changelogDir, f));
            return { version: data.version, date: data.date, file: f };
        }).sort((a,b) => b.date.localeCompare(a.date));

        fullIndex.locales[locale] = localeData;

        // Generate Markdown
        let md = `# Maintenance Index (${locale.toUpperCase()})\n\n`;
        md += `> Automatically generated at ${new Date().toLocaleString()}\n\n`;

        md += `## Glossary (${localeData.glossary.length})\n\n`;
        localeData.glossary.forEach(t => md += `- **${t.term}** (\`${t.file}\`)\n`);

        md += `\n## Q&A Categories\n\n`;
        Object.entries(localeData.qa).forEach(([key, val]) => {
            md += `### ${val.title} (${val.items.length})\n`;
            val.items.forEach(i => md += `- [\`${i.id}\`] ${i.title} (\`${i.file}\`)\n`);
            md += "\n";
        });

        md += `## Changelog\n\n`;
        localeData.changelog.forEach(l => md += `- **v${l.version}** (${l.date})\n`);

        fs.writeFileSync(path.join(MAINTENANCE_DIR, `INDEX_${locale.toUpperCase()}.md`), md);
        console.log(`✅ Generated INDEX_${locale.toUpperCase()}.md`);
    });

    // Generate JSON
    fs.writeFileSync(path.join(MAINTENANCE_DIR, "INDEX.json"), JSON.stringify(fullIndex, null, 2));
    console.log("✅ Generated INDEX.json");
    console.log("✨ Done.");
}

generate();
