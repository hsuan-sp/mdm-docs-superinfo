#!/usr/bin/env node

/**
 * Antigravity MDM Formatter Engine - Version 3.2.2 (Surgical Strike Edition)
 * 
 * 專門針對 5000+ 掃描警告進行的高精度自動修復。
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

class TypographyTools {
    static isCJK(text) { return /[\u4e00-\u9fa5]/.test(text); }
    
    static fixEmojiSpacing(text) {
        let res = text;
        // Emoji 補位 (更精確的邊界判定)
        res = res.replace(/([\uD83C-\uDBFF\uDC00-\uDFFF\u2600-\u26FF\u2700-\u27BF])([^\s，。？！：；、）\]\x20\*])/g, '$1 $2');
        res = res.replace(/([^\s，。？！：；、（\[\x20\*])([\uD83C-\uDBFF\uDC00-\uDFFF\u2600-\u26FF\u2700-\u27BF])/g, '$1 $2');
        return res;
    }

    static tightenSyntax(text) {
        let res = text;
        
        // 1. 強力修復破碎清單 (外科手術式修復)
        // ** ** 這種奇怪的組合轉為 * **
        res = res.replace(/^(\s*)\*{2}\s+\*{2}/g, '$1* **');
        // * * 這種不帶空格的轉為 * **
        res = res.replace(/^(\s*)\*\s+\*([^\*\n]+)\*\*/g, '$1* **$2**');
        // *** 組合轉為 * **
        res = res.replace(/^(\s*)\*{3}/g, '$1* **');

        // 2. 補齊不對稱粗體
        const stars = (res.replace(/^(\s*)\* /, '').match(/\*/g) || []).length;
        if (stars % 2 !== 0 && res.includes('**')) {
            if (res.endsWith('*')) res += '*';
            else res = res.replace(/\*$/, '**');
        }

        // 3. 壓縮內部空格
        res = res.replace(/(\*{2})\s+([^\n]+?)\s+\1/g, '$1$2$1');
        res = res.replace(/(`)\s+([^\n]+?)\s+\1/g, '$1$2$1');
        
        return res;
    }

    static refine(line) {
        let p = line;
        // 1. 盤古 (中英數字間距)
        if (this.isCJK(p)) {
            p = p.replace(/([\u4e00-\u9fa5])([a-zA-Z0-9])/g, '$1 $2');
            p = p.replace(/([a-zA-Z0-9])([\u4e00-\u9fa5])/g, '$1 $2');
        }
        // 2. Emoji
        p = this.fixEmojiSpacing(p);
        // 3. 語法燙平
        p = this.tightenSyntax(p);
        return p;
    }
}

class MarkdownEngine {
    constructor(filePath) {
        this.path = filePath;
        this.raw = fs.readFileSync(filePath, 'utf-8');
        this.processed = [];
        this.state = { inCode: false };
    }

    run() {
        const file = matter(this.raw);
        const { data: frontmatter, content } = file;

        const sortedFM = {};
        Object.keys(frontmatter).sort().forEach(k => sortedFM[k] = frontmatter[k]);

        // URL 保護
        const urls = [];
        const protectedContent = content.replace(/(\[.*?\]\(.*?\)|<https?:\/\/[^>]+>|https?:\/\/[^\s\)\>\]]+)/g, (m) => {
            const id = `__URL_LOCK_${urls.length}__`;
            urls.push(m);
            return id;
        });

        const lines = protectedContent.split('\n');
        for (let i = 0; i < lines.length; i++) {
            this.processLine(lines[i]);
        }

        let result = this.processed.join('\n');
        urls.forEach((u, i) => result = result.replace(`__URL_LOCK_${i}__`, u));

        // 清理並格式化
        result = result.replace(/HTTPS:\/\//gi, 'https://');
        result = result.replace(/\n{3,}/g, '\n\n');
        result = result.trimEnd() + '\n';

        const final = matter.stringify(result, sortedFM).trimEnd() + '\n';
        if (final === this.raw) return false;
        
        fs.writeFileSync(this.path, final, 'utf-8');
        return true;
    }

    processLine(line) {
        const prev = this.processed.length > 0 ? this.processed[this.processed.length - 1] : null;

        if (line.trim().startsWith('```')) {
            this.state.inCode = !this.state.inCode;
            if (this.state.inCode && prev && prev.trim() !== '') this.processed.push('');
            this.processed.push(line);
            if (!this.state.inCode) this.processed.push('');
            return;
        }
        if (this.state.inCode) { this.processed.push(line); return; }

        let p = line;
        
        // 排版優化 (外科手術式修復)
        p = TypographyTools.refine(p);

        // 段落拼接: 修正破碎的縮排文字行 (使其與上一行連貫，避免渲染出誤)
        if (p.startsWith(' ') && prev && prev.trim() !== '' && !prev.startsWith('#') && !prev.startsWith('*') && !prev.startsWith(' ')) {
             const lastIdx = this.processed.length - 1;
             this.processed[lastIdx] = this.processed[lastIdx].trimEnd() + ' ' + p.trim();
             return;
        }

        this.processed.push(p);
    }
}

// --- 🌐 全速掃航 ---
const files = [];
const walk = (d) => {
    if (!fs.existsSync(d)) return;
    fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
        const f = path.join(d, e.name);
        if (e.isDirectory()) walk(f);
        else if (e.name.endsWith('.md')) files.push(f);
    });
};
TARGET_DIRS.forEach(walk);

let mod = 0;
files.forEach(f => {
    try { if (new MarkdownEngine(f).run()) mod++; }
    catch (e) { console.error(`❌ ${f}:`, e); }
});

console.log('--------------------------------------------------');
console.log(`📊 報告：處理 ${files.length} | 已修正 ${mod}`);
console.log('✨ Surgical Strike Optimization Completed.');
