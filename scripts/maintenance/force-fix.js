#!/usr/bin/env node

/**
 * Antigravity MDM Formatter Engine - Version 4.1 (Force Prefix Reformatter)
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

class ForceReformatter {
    static process(content) {
        let lines = content.split('\n');
        let processed = lines.map(line => {
            let p = line;
            
            // 1. 強制規範清單前綴：不論後面是什麼，只要開頭是破碎標記就修正
            // 修正 * *** 或 * * * 或 * ** * 為 * **
            p = p.replace(/^(\s*)\*[\s\*]{2,}/, '$1* **');
            
            // 2. 確保粗體對稱性 (如果有開頭沒結尾)
            // 由於行首已經被我們強制加上了 **，這裡我們要找第一個對稱的 ** 之後的部分
            // 如果只有開頭 **，且中間沒有結束 **，我們在適當位置(如冒號或句號)補上
            if (p.match(/^(\s*)\* \*\*([^\*]+)$/)) {
                 // 嘗試在冒號處切換，或直接補在結尾
                 if (p.includes('：')) p = p.replace('：', '**：');
                 else if (p.includes(':')) p = p.replace(':', '**:');
                 else p += '**';
            }

            return p;
        });
        return processed.join('\n');
    }
}

function main() {
    console.log('🚀 啟動 4.1 版原子級前綴修正...');
    const walk = (d) => {
        fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
            const p = path.join(d, e.name);
            if (e.isDirectory()) walk(p);
            else if (e.name.endsWith('.md')) {
                const raw = fs.readFileSync(p, 'utf-8');
                const { data, content } = matter(raw);
                const optimized = ForceReformatter.process(content);
                const final = matter.stringify(optimized, data);
                fs.writeFileSync(p, final.trimEnd() + '\n');
            }
        });
    };
    TARGET_DIRS.forEach(walk);
    console.log('✨ 前綴規範化完成。');
}

main();
