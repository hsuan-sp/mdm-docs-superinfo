// 附註：此檔案為 VitePress 的 Data Loader (資料載入器)。
// 它在建置階段於 Node.js 環境運行，但檔案本身會被使用者端代碼匯入。
// 為避免 Rollup/Vite 嘗試為瀏覽器封裝 Node.js 內建模組，
// 我們必須避免在最外層 (Top-level) 使用 'node:*' 的匯入語法。

/**
 * Q&A 章節顯示順序定義
 */
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true
});

/**
 * 預渲染 Markdown 到 HTML
 */
function renderMarkdown(text: string) {
    if (!text) return "";
    // 修正 VitePress 資料傳遞中常見的清單換行遺失問題
    const processed = text
        .replace(/([^\n])\n(\s*[-*+])/g, '$1\n\n$2')
        .replace(/([^\n])\n(\s*\d+\.)/g, '$1\n\n$2');
    return md.render(processed);
}

const QA_ORDER = [
    'account',
    'enrollment',
    'apps',
    'classroom',
    'digital-learning',
    'hardware',
    'mac',
    'qa-education'
];

/**
 * 原始 slug 與顯示名稱的映射表 (中文)
 */
const SOURCE_TITLE_MAP: Record<string, string> = {
    'account': '帳號與伺服器',
    'enrollment': '裝置註冊',
    'apps': 'App 管理',
    'classroom': '課堂管理',
    'digital-learning': '數位精進',
    'hardware': '硬體排除',
    'mac': 'Mac 管理',
    'qa-education': '教育實戰'
};

/**
 * 原始 slug 與顯示名稱的映射表 (英文)
 */
const EN_SOURCE_TITLE_MAP: Record<string, string> = {
    'account': 'Account & Server Management',
    'enrollment': 'Enrollment & Device Setup',
    'apps': 'App & Content Distribution',
    'classroom': 'Apple Classroom & Teaching Tools',
    'digital-learning': 'Campus Digital Initiatives',
    'hardware': 'Hardware & Maintenance',
    'mac': 'Advanced Mac Management',
    'qa-education': 'Education Scenarios & FAQ'
};

/**
 * 輕量化 Frontmatter 解析程式
 */
function parseFrontmatter(content: string) {
    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) {
        return { data: {}, content: content };
    }

    const rawFm = match[1];
    const markdownBody = match[2];
    const data: Record<string, any> = {};

    rawFm.split('\n').forEach(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            let value: any = parts.slice(1).join(':').trim();

            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1).replace(/\\"/g, '"');
            } else if (value.startsWith('[') || value.startsWith('{')) {
                try { value = JSON.parse(value); } catch (e) { }
            } else if (value === 'true') value = true;
            else if (value === 'false') value = false;

            data[key] = value;
        }
    });

    return { data, content: markdownBody };
}

export default {
    watch: ['./items/**/*.md', './items-en/**/*.md'],
    async load() {
        const { fileURLToPath } = await import('node:url');
        const path = await import('node:path');
        const fs = await import('node:fs');

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const ZH_ROOT = path.resolve(__dirname, 'items');
        const EN_ROOT = path.resolve(__dirname, 'items-en');

        const getFiles = (dir: string): string[] => {
            if (!fs.existsSync(dir)) return [];
            return fs.readdirSync(dir)
                .filter(file => file.endsWith('.md'))
                .map(file => path.join(dir, file));
        };

        const loadQAData = async (root: string, titleMap: Record<string, string>) => {
            const sections = [];
            for (const slug of QA_ORDER) {
                const dir = path.join(root, 'qa', slug);
                const files = getFiles(dir);
                const items = [];

                for (const filePath of files) {
                    const fileContent = fs.readFileSync(filePath, 'utf-8');
                    const { data, content } = parseFrontmatter(fileContent);

                    items.push({
                        id: String(data.id || ''),
                        question: String(data.title || ''),
                        answer: renderMarkdown(content.trim()),
                        important: Boolean(data.important),
                        tags: Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : []),
                        category: data.category
                    });
                }

                items.sort((a, b) => (a.id || '').localeCompare(b.id || '', undefined, { numeric: true }));

                if (items.length > 0) {
                    sections.push({
                        source: titleMap[slug] || slug,
                        sections: [{
                            title: items[0].category || titleMap[slug],
                            items: items
                        }]
                    });
                }
            }
            return sections;
        };

        const loadGlossaryData = async (root: string, lang: 'zh' | 'en') => {
            const dir = path.join(root, 'glossary');
            const files = getFiles(dir);
            const terms = [];

            const analogyMarker = lang === 'zh' ? '## 白話文比喻' : '## Analogy';
            const definitionMarker = lang === 'zh' ? '## 術語定義' : '## Term Definition';

            for (const filePath of files) {
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                const { data, content } = parseFrontmatter(fileContent);

                const parts = content.split(analogyMarker);
                const definition = parts[0].replace(definitionMarker, '').trim();
                const analogy = parts[1] ? parts[1].trim() : '';

                terms.push({
                    term: String(data.term || ''),
                    definition: renderMarkdown(definition),
                    analogy: renderMarkdown(analogy),
                    category: data.category || [],
                    tags: Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : [])
                });
            }

            terms.sort((a, b) => (a.term || '').localeCompare(b.term || ''));
            return terms;
        };

        const [zhQA, zhGlossary, enQA, enGlossary] = await Promise.all([
            loadQAData(ZH_ROOT, SOURCE_TITLE_MAP),
            loadGlossaryData(ZH_ROOT, 'zh'),
            loadQAData(EN_ROOT, EN_SOURCE_TITLE_MAP),
            loadGlossaryData(EN_ROOT, 'en')
        ]);

        return {
            zh: { allQAData: zhQA, glossaryData: zhGlossary },
            en: { allQAData: enQA, glossaryData: enGlossary }
        };
    }
}

