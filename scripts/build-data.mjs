// scripts/build-data.mjs
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    breaks: false,
});

function enhanceTypography(text) {
    if (!text) return "";
    return text
        .split("\n")
        .map((line) => {
            const trimmed = line.trim();
            if (
                trimmed.startsWith("|") || trimmed.startsWith("#") || trimmed.startsWith(">") ||
                trimmed.startsWith("- ") || trimmed.startsWith("* ") || /^\d+\. /.test(trimmed) ||
                trimmed.startsWith("**") || trimmed.startsWith("___") || trimmed.startsWith("```")
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
const PUBLIC_DIR = path.join(CWD, 'lib', 'shards');
const LOG_FILE = path.join(CWD, 'maintenance', 'build.log');
const LOCALES = ['zh', 'en'];
const QA_ORDER = [
    "account", "enrollment", "apps", "classroom", "digital-learning",
    "hardware", "mac", "qa-education"
];

const logs_buffer = [];
function logger(msg, type = 'INFO') {
    const time = new Date().toISOString();
    const line = `[${time}] [${type}] ${msg}`;
    console.log(line);
    logs_buffer.push(line);
}

const SOURCE_TITLE_MAP = {
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

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function generate() {
    logger('🚀 開始生成分片靜態資料...');
    ensureDir(PUBLIC_DIR);

    const manifest = {
        qa: { zh: [], en: [] },
        glossary: { zh: { total: 0, pages: 0 }, en: { total: 0, pages: 0 } },
        changelog: { zh: 0, en: 0 },
        updatedAt: new Date().toISOString()
    };

    try {
        LOCALES.forEach(locale => {
            const rootDir = path.join(CWD, 'md_data', locale === 'en' ? 'en' : 'zh');
            const changelogDir = path.join(rootDir, 'changelog');

            // 1. 處理 Glossary
            const glossaryDir = path.join(rootDir, 'glossary');
            if (fs.existsSync(glossaryDir)) {
                const files = fs.readdirSync(glossaryDir).filter(f => f.endsWith('.md'));
                const terms = files.map(file => {
                    try {
                        const content = fs.readFileSync(path.join(glossaryDir, file), 'utf-8');
                        const { data, content: mdBody } = matter(content);
                        
                        // Validation
                        if (!data.term) logger(`Missing 'term' in ${file}`, 'WARN');

                        const analogyMarker = locale === 'zh' ? "## 白話文比喻" : "## Analogy";
                        const definitionMarker = locale === 'zh' ? "## 術語定義" : "## Term Definition";
                        const parts = mdBody.split(analogyMarker);
                        const definition = parts[0].replace(definitionMarker, "").trim();
                        const analogy = parts[1] ? parts[1].trim() : "";

                        return {
                            term: String(data.term || path.basename(file, ".md")),
                            definition: renderMarkdown(definition),
                            analogy: renderMarkdown(analogy),
                            category: data.category || [],
                            tags: Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : []),
                        };
                    } catch (e) {
                        logger(`Error parsing glossary file ${file}: ${e.message}`, 'ERROR');
                        return null;
                    }
                }).filter(Boolean).sort((a, b) => a.term.localeCompare(b.term));

                manifest.glossary[locale].total = terms.length;
                const PAGE_SIZE = 50;
                const pageCount = Math.ceil(terms.length / PAGE_SIZE);
                manifest.glossary[locale].pages = pageCount;

                for (let i = 0; i < pageCount; i++) {
                    const pageData = terms.slice(i * PAGE_SIZE, (i + 1) * PAGE_SIZE);
                    fs.writeFileSync(
                        path.join(PUBLIC_DIR, `glossary-${locale}-${i}.json`),
                        JSON.stringify(pageData, null, 0)
                    );
                }
                logger(`Synced ${terms.length} glossary terms for [${locale}]`);
            }

            // 2. 處理 QA
            QA_ORDER.forEach(slug => {
                const dir = path.join(rootDir, 'qa', slug);
                if (fs.existsSync(dir)) {
                    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
                    if (files.length === 0) return;

                    const items = files.map(file => {
                        try {
                            const content = fs.readFileSync(path.join(dir, file), 'utf-8');
                            const { data, content: mdBody } = matter(content);
                            return {
                                id: String(data.id || path.basename(file, ".md")),
                                question: String(data.title || path.basename(file, ".md")),
                                answer: renderMarkdown(mdBody.trim()),
                                important: Boolean(data.important),
                                tags: Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : []),
                                category: data.category || SOURCE_TITLE_MAP[locale][slug],
                            };
                        } catch (e) {
                            logger(`Error parsing QA file ${file}: ${e.message}`, 'ERROR');
                            return null;
                        }
                    }).filter(Boolean).sort((a, b) => (a.id || "").localeCompare(b.id || "", undefined, { numeric: true }));

                    const section = {
                        source: SOURCE_TITLE_MAP[locale][slug] || slug,
                        sections: [{ title: items[0]?.category, items: items }]
                    };

                    manifest.qa[locale].push(slug);
                    fs.writeFileSync(
                        path.join(PUBLIC_DIR, `qa-${locale}-${slug}.json`),
                        JSON.stringify(section, null, 0)
                    );
                }
            });
            logger(`Synced QA chapters for [${locale}]`);

            // 3. 處理 Changelog
            if (fs.existsSync(changelogDir)) {
                const files = fs.readdirSync(changelogDir).filter(f => f.endsWith('.md'));
                const logs = files.map(file => {
                    try {
                        const content = fs.readFileSync(path.join(changelogDir, file), 'utf-8');
                        const { data, content: mdBody } = matter(content);
                        return {
                            version: String(data.version || path.basename(file, ".md")),
                            date: String(data.date || new Date().toISOString().split("T")[0]),
                            type: String(data.type || "patch"),
                            content: renderMarkdown(mdBody.trim()),
                        };
                    } catch (e) {
                        logger(`Error parsing changelog file ${file}: ${e.message}`, 'ERROR');
                        return null;
                    }
                }).filter(Boolean).sort((a, b) => b.date.localeCompare(a.date));
                
                manifest.changelog[locale] = logs.length;
                fs.writeFileSync(
                    path.join(PUBLIC_DIR, `changelog-${locale}.json`),
                    JSON.stringify(logs, null, 0)
                );
                logger(`Synced ${logs.length} changelogs for [${locale}]`);
            }
        });

        fs.writeFileSync(path.join(PUBLIC_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));
        logger(`✅ 所有分片已生成於: ${PUBLIC_DIR}`);
    } catch (globalError) {
        logger(`CRITICAL BUILD ERROR: ${globalError.message}`, 'ERROR');
    } finally {
        fs.writeFileSync(LOG_FILE, logs_buffer.join('\n'));
    }
}

generate();