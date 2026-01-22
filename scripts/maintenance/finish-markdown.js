#!/usr/bin/env node

/**
 * Antigravity MDM Formatter Engine - Version 3.3 (The Finisher)
 * 
 * 針對最後 90 個頑固格式問題進行專項修復：
 * 1. 修正 * * (清單+斜體/粗體) 為標準格式
 * 2. 修正 Emoji 與加粗標誌的粘連
 * 3. 修正代碼塊與中文的粘連
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

class FinalOptimizer {
    static process(text) {
        let res = text;

        // 1. 修復 * * 斜體/粗體清單組合
        // 將 * * 內容 * -> * *內容*
        res = res.replace(/^(\s*)\*\s+\*\s*(.+?)\s*\*(?!\*)/gm, '$1* *$2*');
        // 將 * * 內容 ** -> * **內容**
        res = res.replace(/^(\s*)\*\s+\*\s*(.+?)\s*\*\*/gm, '$1* **$2**');

        // 2. 修復 Emoji 粘連
        // **✅**Text -> **✅** Text
        res = res.replace(/(\*\*[✅❌⚠️💡]\*\*)([^\s])/g, '$1 $2');
        // Text**✅** -> Text **✅**
        res = res.replace(/([^\s])(\*\*[✅❌⚠️💡]\*\*)/g, '$1 $2');

        // 3. 修復代碼塊與中文字元粘連
        // `code`或 -> `code` 或
        res = res.replace(/(`[a-zA-Z0-9\._\-]+`)([\u4e00-\u9fa5])/g, '$1 $2');
        // 或`code` -> 或 `code`
        res = res.replace(/([\u4e00-\u9fa5])(`[a-zA-Z0-9\._\-]+`)/g, '$1 $2');

        return res;
    }
}

function main() {
    console.log('🏁 開始最後的格式衝刺...');
    const walk = (d) => {
        fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
            const p = path.join(d, e.name);
            if (e.isDirectory()) walk(p);
            else if (e.name.endsWith('.md')) {
                const raw = fs.readFileSync(p, 'utf-8');
                const { data, content } = matter(raw);
                const optimized = FinalOptimizer.process(content);
                
                const final = matter.stringify(optimized, data);
                if (final.trimEnd() + '\n' !== raw) {
                    fs.writeFileSync(p, final.trimEnd() + '\n');
                    console.log(`✅ Fixed: ${path.relative(process.cwd(), p)}`);
                }
            }
        });
    };
    TARGET_DIRS.forEach(walk);
    console.log('✨ 衝刺完成。');
}

main();
