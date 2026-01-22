#!/usr/bin/env node

/**
 * MDM Support Site - Markdown Quality Inspector
 * 
 * 任務：掃描所有潛在的排版破碎問題，並提供精確的行號報告，供手動修補。
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_DIRS = [
  path.join(__dirname, '../../docs/content/zh'),
  path.join(__dirname, '../../docs/content/en'),
];

const ISSUES = [];

class Inspector {
    static inspect(file) {
        const raw = fs.readFileSync(file, 'utf-8');
        const { content } = matter(raw);
        const lines = content.split('\n');

        lines.forEach((line, i) => {
            const lineNum = i + 1;
            const text = line.trim();

            // 1. 真正破碎的清單符號: ** ** 或 * * (正確應為 * **)
            if (line.match(/^(\s*)\*{2}\s+\*{2}/) || line.match(/^(\s*)\*\s+\*(?!\*)/) || line.match(/^(\s*)\*{3}/)) {
                this.report(file, lineNum, '破碎清單組合 (Broken List Marker)', line);
            }

            // 2. 偵測不對稱粗體: 統計星號，排除清單符號
            const contentOnly = line.replace(/^(\s*)\* /, '');
            const starCount = (contentOnly.match(/\*/g) || []).length;
            if (starCount % 2 !== 0 && !line.includes('```') && contentOnly.includes('**')) {
                this.report(file, lineNum, '星號不對稱 (Unbalanced Asterisks)', line);
            }

            // 3. 偵測 Emoji 粘連: ⚠️** 或 ⚠️文字
            if (line.match(/[\uD83C-\uDBFF\uDC00-\uDFFF\u2600-\u26FF\u2700-\u27BF](?=[^\s，。？！：；、）\]\x20])/) ||
                line.match(/[^\s，。？！：；、（\[\x20](?=[\uD83C-\uDBFF\uDC00-\uDFFF\u2600-\u26FF\u2700-\u27BF])/) ) {
                this.report(file, lineNum, 'Emoji 粘連 (Emoji Glue Issue)', line);
            }

            // 4. 偵測 URL 誤殺遺毒: 協定大寫
            if (line.includes('HTTPS://') || line.includes('HTTP://')) {
                this.report(file, lineNum, 'URL 大寫遺毒 (Case Sensitivity in Protocol)', line);
            }

            // 5. 偵測代碼塊後方粘連
            if (line.includes('`') && line.match(/[\u4e00-\u9fa5]`|`[\u4e00-\u9fa5]/)) {
                this.report(file, lineNum, '代碼塊粘連 (Inline Code Glue)', line);
            }
        });
    }

    static report(file, line, type, content) {
        ISSUES.push({ file: path.relative(process.cwd(), file), line, type, content: content.trim() });
    }
}

function main() {
    console.log('🔍 開始全站排版檢驗...');
    const walk = (d) => {
        fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
            const p = path.join(d, e.name);
            if (e.isDirectory()) walk(p);
            else if (e.name.endsWith('.md')) Inspector.inspect(p);
        });
    };
    TARGET_DIRS.forEach(walk);

    if (ISSUES.length === 0) {
        console.log('✅ 完美！全站未偵測到結構性毛病。');
        return;
    }

    console.log(`\n❌ 偵測到 ${ISSUES.length} 處潛在排版毛病：\n`);
    
    // 按檔案排序
    ISSUES.sort((a, b) => a.file.localeCompare(b.file)).forEach(issue => {
        console.log(`📍 \x1b[36m${issue.file}:${issue.line}\x1b[0m [${issue.type}]`);
        console.log(`   > ${issue.content}\n`);
    });

    console.log('--------------------------------------------------');
    console.log(`📊 掃描報告：共 ${ISSUES.length} 個警示。請根據路徑手動修復。`);
}

main();
