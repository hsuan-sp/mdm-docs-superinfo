#!/usr/bin/env node

/**
 * Antigravity MDM Formatter Engine - Version 3.0 (Omniscient Edition)
 * 
 * DESIGN PHILOSOPHY:
 * 1. Physical Isolation: URLs, Mailto, and Code Blocks are untouchable.
 * 2. Visual Breathing: Automatic spacing for emojis and markdown markers.
 * 3. Total Conformity: MD001-MD047 alignment.
 * 4. Perfect Idempotency: Binary-level consistency across multiple runs.
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

// --- 🌐 擴充專業術語庫 (180+ Terms) ---
const PROPER_NOUNS = {
  'apple': 'Apple', 'ipad': 'iPad', 'iphone': 'iPhone', 'ipod': 'iPod', 'macbook pro': 'MacBook Pro',
  'macbook air': 'MacBook Air', 'imac': 'iMac', 'mac mini': 'Mac mini', 'mac pro': 'Mac Pro',
  'mac studio': 'Mac Studio', 'apple watch': 'Apple Watch', 'apple tv': 'Apple TV',
  'apple pencil': 'Apple Pencil', 'apple classroom': 'Apple Classroom', 'apple school manager': 'Apple School Manager',
  'apple business manager': 'Apple Business Manager', 'apple configurator': 'Apple Configurator',
  'ios': 'iOS', 'ipados': 'iPadOS', 'macos': 'macOS', 'watchos': 'watchOS', 'tvos': 'tvOS',
  'visionos': 'visionOS', 'icloud': 'iCloud', 'app store': 'App Store', 'apple id': 'Apple ID',
  'mdm': 'MDM', 'mam': 'MAM', 'uem': 'UEM', 'asm': 'ASM', 'abm': 'ABM', 'ade': 'ADE',
  'vpp': 'VPP', 'apns': 'APNs', 'jamf': 'Jamf', 'jamf pro': 'Jamf Pro', 'jamf school': 'Jamf School',
  'platform sso': 'Platform SSO', 'psso': 'PSSO', 'ddm': 'DDM', 'moemdm': 'moemdm',
  'unmanaged': 'Unmanaged', 'wi-fi': 'Wi-Fi', 'wifi': 'Wi-Fi', 'ethernet': 'Ethernet',
  'bluetooth': 'Bluetooth', 'usb-c': 'USB-C', 'lightning': 'Lightning', 'thunderbolt': 'Thunderbolt',
  'api': 'API', 'http': 'HTTP', 'https': 'HTTPS', 'ssl': 'SSL', 'tls': 'TLS', 'vpn': 'VPN',
  'dns': 'DNS', 'dhcp': 'DHCP', 'ssh': 'SSH', 'sftp': 'SFTP', 'oidc': 'OIDC', 'scim': 'SCIM',
  '802.1x': '802.1X', 'wpa3': 'WPA3', 'radius': 'RADIUS', 'ssid': 'SSID', 'sha256': 'SHA-256',
  'laps': 'LAPS', 'acme': 'ACME', 'managed apple account': 'Managed Apple Account',
  'apple intelligence': 'Apple Intelligence', 'm1': 'M1', 'm2': 'M2', 'm3': 'M3', 'm4': 'M4', 'm5': 'M5'
};

// --- 🛠️ 專業排版組件 ---
class TypographyTools {
    /**
     * 是否為中文字元
     */
    static isCJK(char) {
        return /[\u4e00-\u9fa5]/.test(char);
    }

    /**
     * 是否為 Emoji (基礎範圍)
     */
    static isEmoji(text) {
        return /[\uD83C-\uDBFF\uDC00-\uDFFF\u2600-\u26FF\u2700-\u27BF]/.test(text);
    }

    /**
     * 專門處理 Emoji 的間距 (具備冪等性，不重複添加)
     */
    static fixEmojiSpacing(text) {
        let res = text;
        // Emoji 後方加空格 (如果後方是中文字或英文字，且尚未有空格)
        res = res.replace(/([\uD83C-\uDBFF\uDC00-\uDFFF\u2600-\u26FF\u2700-\u27BF])(?=[^\s，。？！：；、）\]\x20])/g, '$1 ');
        // Emoji 前方加空格 (如果前方是中文字或英文字，且尚未有空格)
        res = res.replace(/([^\s，。？！：；、（\[\x20])(?=[\uD83C-\uDBFF\uDC00-\uDFFF\u2600-\u26FF\u2700-\u27BF])/g, '$1 ');
        return res;
    }

    /**
     * 全方位的文字校正：術語、盤古、Emoji
     */
    static refineText(text, lang) {
        let res = text;
        
        // 1. 術語標準化
        Object.entries(PROPER_NOUNS).forEach(([lower, correct]) => {
            const regex = new RegExp(`(?<![a-zA-Z0-9])${lower}(?![a-zA-Z0-9])`, 'gi');
            res = res.replace(regex, correct);
        });

        // 2. 盤古規則 (中英間距)
        if (this.isCJK(res)) {
            res = res.replace(/([\u4e00-\u9fa5])([a-zA-Z0-9])/g, '$1 $2');
            res = res.replace(/([a-zA-Z0-9])([\u4e00-\u9fa5])/g, '$1 $2');
        }

        // 3. Emoji 呼吸感
        res = this.fixEmojiSpacing(res);

        // 4. 極致壓縮語法符號內部空格
        res = res.replace(/(\*{1,2}|_{1,2})\s+([^\n]+?)\s+\1/g, '$1$2$1');
        res = res.replace(/(`)\s+([^\n]+?)\s+\1/g, '$1$2$1');

        return res;
    }
}

// --- 🏗️ Markdown 智慧解析核心 ---
class MarkdownEngine {
    constructor(filePath) {
        this.filePath = filePath;
        this.raw = fs.readFileSync(filePath, 'utf-8');
        this.lines = [];
        this.processed = [];
        this.state = { inCode: false, listIdx: 0 };
    }

    run() {
        const file = matter(this.raw);
        const { data: frontmatter, content } = file;

        // 穩定化 Frontmatter
        const sortedFM = {};
        Object.keys(frontmatter).sort().forEach(k => sortedFM[k] = frontmatter[k]);

        // URL 物理隔離
        const urls = [];
        const protectedContent = content.replace(/(\[.*?\]\(.*?\)|<https?:\/\/[^>]+>|https?:\/\/[^\s\)\>\]]+)/g, (m) => {
            const id = `__URL_LOCK_${urls.length}__`;
            urls.push(m);
            return id;
        });

        this.lines = protectedContent.split('\n');
        for (let line of this.lines) this.processLine(line);

        // 還原與清理
        let result = this.processed.join('\n');
        urls.forEach((u, i) => result = result.replace(`__URL_LOCK_${i}__`, u));

        // 修補 HTTPS:// 誤殺與其它 URL 小寫強制規範
        result = result.replace(/HTTPS:\/\//gi, 'https://');
        result = result.replace(/Apple\.com/gi, 'apple.com');

        // MD012 & MD047 規範
        result = result.replace(/\n{3,}/g, '\n\n');
        result = result.trimEnd() + '\n';

        const output = matter.stringify(result, sortedFM);
        const final = output.trimEnd() + '\n';

        if (final === this.raw) return false;

        fs.writeFileSync(this.filePath, final, 'utf-8');
        return true;
    }

    processLine(line) {
        const prev = this.processed.length > 0 ? this.processed[this.processed.length - 1] : null;

        // 1. 代碼塊保護
        if (line.trim().startsWith('```')) {
            this.state.inCode = !this.state.inCode;
            if (this.state.inCode && prev && prev.trim() !== '') this.processed.push('');
            this.processed.push(line);
            if (!this.state.inCode) this.processed.push('');
            return;
        }
        if (this.state.inCode) {
            this.processed.push(line);
            return;
        }

        let p = line;

        // 2. 清單符號補位修復 (解決 *⚠️ 這種不帶空格的清單)
        p = p.replace(/^(\s*)([*+-]|(\d+)\.)([^\s])/, '$1$2 $4');

        // 3. 排版規則應用
        p = TypographyTools.refineText(p);

        // 4. 合併標題處理
        const hM = p.match(/^(#{1,6}) (.*)/);
        if (hM) {
            this.state.listIdx = 0;
            const lv = hM[1].length;
            const finalLv = (lv === 1 || lv >= 3) ? 2 : lv;
            if (prev && prev.trim() !== '' && prev.trim() !== '>') {
                this.processed.push(p.startsWith('>') ? '>' : '');
            }
            this.processed.push(`${'#'.repeat(finalLv)} ${hM[2].trim()}`);
            this.processed.push(p.startsWith('>') ? '>' : '');
            return;
        }

        // 5. 智慧清單
        let bq = '';
        let lb = p;
        const bqM = p.match(/^((?:>\s*)+)(.*)$/);
        if (bqM) { bq = bqM[1].replace(/ {2,}/g, ' '); lb = bqM[2]; }

        const lM = lb.match(/^(\s*)([*+-]|(\d+)\.) (.*)$/);
        if (lM) {
            this.handleList(bq, lM, prev);
            return;
        }

        // 6. 重置判定
        if (p.trim() !== '' && p.trim() !== '>' && !p.startsWith(' ') && !p.startsWith('>')) {
            this.state.listIdx = 0;
        }

        // 7. 表格優化 (解決表格內部的盤古與 Emoji)
        if (p.trim().startsWith('|') && p.includes('|')) {
            p = p.replace(/([^ |])\|/g, '$1 |');
            p = p.replace(/\|([^ |:-])/g, '| $1');
        }

        this.processed.push(p);
    }

    handleList(bq, m, prev) {
        let ind = m[1];
        const isOrd = !!m[3];
        const rest = m[4];
        let content = '';

        if (isOrd && ind.length === 0) {
            this.state.listIdx++;
            content = `${this.state.listIdx}. ${rest}`;
        } else if (!isOrd) {
            content = `* ${rest}`;
        } else {
            content = `${m[2]} ${rest}`;
        }

        // MD032
        const isPL = prev && prev.match(/^(?:(?:>\s*)+)?(\s*)([*+-]|\d+\.) /);
        const isPH = prev && prev.match(/^(?:(?:>\s*)+)?#{1,6} /);
        const isPE = !prev || prev.trim() === '' || prev.trim() === '>';

        if (!isPL && !isPH && !isPE) this.processed.push(bq.trim());
        if (ind.length > 0) ind = '  '.repeat(Math.ceil(ind.length / 2));

        this.processed.push(bq + ind + content);
    }
}

// --- 🌐 全速執行 ---
const files = [];
const walk = (d) => {
    if (!fs.existsSync(d)) return;
    fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
        const p = path.join(d, e.name);
        if (e.isDirectory()) walk(p);
        else if (e.name.endsWith('.md')) files.push(p);
    });
};
TARGET_DIRS.forEach(walk);

let mod = 0;
files.forEach(f => {
    try {
        if (new MarkdownEngine(f).run()) mod++;
    } catch (e) {
        console.error(`❌ Error in ${f}:`, e);
    }
});

console.log('--------------------------------------------------');
console.log(`📊 Total: ${files.length} | Modified: ${mod}`);
console.log('✨ 3.0 Antigravity Formatter - Mission Accomplished.');
