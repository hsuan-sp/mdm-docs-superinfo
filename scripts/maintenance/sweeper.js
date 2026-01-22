#!/usr/bin/env node

/**
 * Antigravity MDM Formatter Engine - Version 4.2 (The Sweeper)
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

class Sweeper {
    static process(content) {
        let res = content;

        // 1. 修復 **✅** 粘連 (強力版)
        res = res.replace(/(\*\*[\uD83C-\uDBFF\uDC00-\uDFFF\u2600-\u26FF\u2700-\u27BF]+\*\*)\s*([^\s，。？！：；、）\]\x20\*])/g, '$1 $2');
        res = res.replace(/([^\s，。？！：；、（\[\x20\*])\s*(\*\*[\uD83C-\uDBFF\uDC00-\uDFFF\u2600-\u26FF\u2700-\u27BF]+\*\*)/g, '$1 $2');

        // 2. 修復代碼塊與中文標點粘連
        res = res.replace(/(`)([\u4e00-\u9fa5])/g, '$1 $2');
        res = res.replace(/([\u4e00-\u9fa5])(`)/g, '$1 $2');
        
        // 3. 修復常用的 ⚠️ 語法
        res = res.replace(/\*\s+\*\*⚠️/g, '* **⚠️');
        res = res.replace(/\*\*⚠️/g, '**⚠️ ');

        return res;
    }
}

function main() {
    console.log('🧹 執行掃尾計畫...');
    const walk = (d) => {
        fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
            const p = path.join(d, e.name);
            if (e.isDirectory()) walk(p);
            else if (e.name.endsWith('.md')) {
                const raw = fs.readFileSync(p, 'utf-8');
                const { data, content } = matter(raw);
                const optimized = Sweeper.process(content);
                const final = matter.stringify(optimized, data);
                if (final.trimEnd() + '\n' !== raw) {
                    fs.writeFileSync(p, final.trimEnd() + '\n');
                    console.log(`✅ Swept: ${path.relative(process.cwd(), p)}`);
                }
            }
        });
    };
    TARGET_DIRS.forEach(walk);
}

main();
