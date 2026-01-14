
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const ITEMS_DIR = path.join(ROOT, 'docs', 'data', 'items');
const OUTPUT_FILE = path.join(ROOT, 'docs', 'data', 'MAINTENANCE_INDEX.md');

function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---\n/);
    if (!match) return {};
    const rawFm = match[1];
    const data = {};
    rawFm.split('\n').forEach(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
            data[parts[0].trim()] = parts.slice(1).join(':').trim().replace(/^"(.*)"$/, '$1');
        }
    });
    return data;
}

function generateIndex() {
    let output = `# 維護索引 (Maintenance Index)\n\n`;
    output += `> 此文件由腳本自動生成。用於讓維護人員（或 AI）快速確認目前已存在的內容，避免重複新增。\n\n`;
    output += `最後更新時間：${new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })}\n\n`;

    // 1. Glossary
    output += `## 術語表 (Glossary)\n\n`;
    const glossaryDir = path.join(ITEMS_DIR, 'glossary');
    if (fs.existsSync(glossaryDir)) {
        const files = fs.readdirSync(glossaryDir).filter(f => f.endsWith('.md')).sort();
        output += `目前共有 **${files.length}** 個術語：\n\n`;
        files.forEach(file => {
            const content = fs.readFileSync(path.join(glossaryDir, file), 'utf-8');
            const data = parseFrontmatter(content);
            output += `- **${data.term || file}** (\`${file}\`)\n`;
        });
    }
    output += `\n---\n\n`;

    // 2. Q&A
    output += `## 問答集 (Q&A)\n\n`;
    const qaOrder = ['account', 'enrollment', 'apps', 'classroom', 'digital-learning', 'hardware', 'mac', 'qa-education'];
    const titles = {
        'account': '帳號與伺服器',
        'enrollment': '裝置註冊',
        'apps': 'App 管理',
        'classroom': '課堂管理',
        'digital-learning': '數位精進',
        'hardware': '硬體排除',
        'mac': 'Mac 管理',
        'qa-education': '教育實戰'
    };

    qaOrder.forEach(category => {
        const categoryDir = path.join(ITEMS_DIR, 'qa', category);
        if (fs.existsSync(categoryDir)) {
            output += `### ${titles[category] || category} (\`qa/${category}\`)\n\n`;
            const files = fs.readdirSync(categoryDir).filter(f => f.endsWith('.md')).sort((a, b) => {
                return a.localeCompare(b, undefined, { numeric: true });
            });
            files.forEach(file => {
                const content = fs.readFileSync(path.join(categoryDir, file), 'utf-8');
                const data = parseFrontmatter(content);
                output += `- [\`${data.id || 'N/A'}\`] ${data.title || file}\n`;
            });
            output += `\n`;
        }
    });

    fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');
    console.log(`[Index Generator] Index updated at ${OUTPUT_FILE}`);
}

generateIndex();
