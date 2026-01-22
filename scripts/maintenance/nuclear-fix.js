#!/usr/bin/env node

/**
 * Antigravity MDM Formatter Engine - Version 4.0 (The Nuclear Option)
 * 
 * 任務：徹底強制全站清單與粗體格式達到完美對稱。
 * 規則：任何以 * 開頭的行，如果帶有粗體，強制格式化為 "* **內容**"。
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

class NuclearReformatter {
    static process(content) {
        let lines = content.split('\n');
        let processed = lines.map(line => {
            let p = line;
            
            // 1. 強力修復清單 + 粗體組合的各種變體 (***, * **, * *, ** **)
            // 目標：統一轉化為 "* **內容**"
            p = p.replace(/^(\s*)\*[\s\*]{2,}\s*([^\*\n]+)\*\*(\s*)$/g, '$1* **$2**$3');
            p = p.replace(/^(\s*)\*{3,}\s*([^\*\n]+)\*\*(\s*)$/g, '$1* **$2**$3');
            
            // 2. 處理普通的加倍星號 (確保對稱)
            // 如果一行只有一組粗體，且星號數量不對，進行補齊
            const stars = (p.match(/\*/g) || []).length;
            if (stars === 3 && p.startsWith('* ')) {
                // 可能是 * **Text* 這種
                p = p.replace(/^(\s*)\*\s+\*\*([^\*\n]+)\*$/, '$1* **$2**');
                p = p.replace(/^(\s*)\*\s+\*([^\*\n]+)\*\*$/, '$1* **$2**');
            }
            
            // 3. Emoji 呼吸感
            p = p.replace(/([\uD83C-\uDBFF\uDC00-\uDFFF\u2600-\u26FF\u2700-\u27BF])([^\s，。？！：；、）\]\x20\*])/g, '$1 $2');
            p = p.replace(/([^\s，。？！：；、（\[\x20\*])([\uD83C-\uDBFF\uDC00-\uDFFF\u2600-\u26FF\u2700-\u27BF])/g, '$1 $2');

            // 4. 清除粗體內部的幽靈空格
            p = p.replace(/(\*{2})\s+([^\n]+?)\s+\1/g, '$1$2$1');

            return p;
        });
        return processed.join('\n');
    }
}

function main() {
    console.log('☢️  Antigravity 4.0 核能修復模式啟動...');
    const walk = (d) => {
        fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
            const p = path.join(d, e.name);
            if (e.isDirectory()) walk(p);
            else if (e.name.endsWith('.md')) {
                const raw = fs.readFileSync(p, 'utf-8');
                const { data, content } = matter(raw);
                const optimized = NuclearReformatter.process(content);
                
                const final = matter.stringify(optimized, data);
                if (final.trimEnd() + '\n' !== raw) {
                    fs.writeFileSync(p, final.trimEnd() + '\n');
                }
            }
        });
    };
    TARGET_DIRS.forEach(walk);
    console.log('✨ 結構自癒完成。');
}

main();
