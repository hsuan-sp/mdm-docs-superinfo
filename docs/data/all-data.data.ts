// 附註：此檔案為 VitePress 的 Data Loader (資料載入器)。
// 它在建置階段於 Node.js 環境運行，但檔案本身會被使用者端代碼匯入。
// 為避免 Rollup/Vite 嘗試為瀏覽器封裝 Node.js 內建模組，
// 我們必須避免在最外層 (Top-level) 使用 'node:*' 的匯入語法。

/**
 * Q&A 章節顯示順序定義
 */
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
 * 原始 slug 與顯示名稱的映射表
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
 * 輕量化 Frontmatter 解析程式
 * 從 Markdown 檔案中提取 YAML 屬性與正文。
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
            // 使用 any 以相容字串、布林與物件等不同類型的解析結果
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
    // 監看項目目錄下的 Markdown 變動，實現自動重新整理
    watch: ['./items/**/*.md'],
    async load() {
        // 透過動態匯入確保 Node.js 專屬模組不會進入前端使用者端套件
        const { fileURLToPath } = await import('node:url');
        const path = await import('node:path');
        const fs = await import('node:fs');

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const DATA_ROOT = path.resolve(__dirname, 'items');

        console.log(`[資料載入器] 已定位資料根路徑: ${DATA_ROOT}`);

        /**
         * 遞迴取得目錄下的 Markdown 檔案清單
         */
        const getFiles = (dir: string): string[] => {
            if (!fs.existsSync(dir)) {
                console.warn(`[資料載入器] 目錄不存在: ${dir}`);
                return [];
            }
            return fs.readdirSync(dir)
                .filter(file => file.endsWith('.md'))
                .map(file => path.join(dir, file));
        };

        /**
         * 載入並重組 Q&A 核心資料
         */
        const loadQAData = async () => {
            const sections = [];

            for (const slug of QA_ORDER) {
                const dir = path.join(DATA_ROOT, 'qa', slug);
                const files = getFiles(dir);
                const items = [];

                for (const filePath of files) {
                    const fileContent = fs.readFileSync(filePath, 'utf-8');
                    const { data, content } = parseFrontmatter(fileContent);

                    items.push({
                        id: String(data.id || ''),
                        question: String(data.title || ''),
                        answer: content.trim(),
                        important: Boolean(data.important),
                        tags: Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : []),
                        category: data.category
                    });
                }

                // 依據 ID 進行自然序排序
                items.sort((a, b) => {
                    const idA = a.id || '';
                    const idB = b.id || '';
                    return idA.localeCompare(idB, undefined, { numeric: true });
                });

                if (items.length > 0) {
                    sections.push({
                        source: SOURCE_TITLE_MAP[slug] || slug,
                        sections: [{
                            title: items[0].category || SOURCE_TITLE_MAP[slug],
                            items: items
                        }]
                    });
                }
            }
            return sections;
        };

        /**
         * 載入並解析術語庫資料
         */
        const loadGlossaryData = async () => {
            const dir = path.join(DATA_ROOT, 'glossary');
            const files = getFiles(dir);
            const terms = [];

            for (const filePath of files) {
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                const { data, content } = parseFrontmatter(fileContent);

                // 拆解術語結構：定義與白話比喻
                const parts = content.split('# 白話文比喻');
                const definition = parts[0].replace('# 術語定義', '').trim();
                const analogy = parts[1] ? parts[1].trim() : '';

                terms.push({
                    term: String(data.term || ''),
                    definition,
                    analogy,
                    category: data.category || [],
                    tags: Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : [])
                });
            }

            // 依術語名稱進行排序
            terms.sort((a, b) => (a.term || '').localeCompare(b.term || ''));
            return terms;
        };

        const [allQAData, glossaryData] = await Promise.all([
            loadQAData(),
            loadGlossaryData()
        ]);

        return { allQAData, glossaryData };
    }
}
