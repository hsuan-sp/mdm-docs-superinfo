#!/usr/bin/env node

/**
 * MDM Support Site - Professional Markdown Reformatter
 * Version: 2026.1.0
 * 
 * This tool enforces a strict set of rules based on:
 * - Chinese Copywriting Guidelines (中英文混排規範)
 * - Microsoft Writing Style Guide (Technical Terminology)
 * - CommonMark & Markdownlint (MD001-MD047)
 * - Project-specific ID & Sequential Logic
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

// --- 📍 海量專有名詞字典 (Case-Sensitive Dictionary) ---

const PROPER_NOUNS = {
  // Apple Ecosystem
  'apple': 'Apple', 'ipad': 'iPad', 'iphone': 'iPhone', 'ipod': 'iPod', 'macbook pro': 'MacBook Pro',
  'macbook air': 'MacBook Air', 'imac': 'iMac', 'mac mini': 'Mac mini', 'mac pro': 'Mac Pro',
  'mac studio': 'Mac Studio', 'apple watch': 'Apple Watch', 'apple tv': 'Apple TV',
  'apple pencil': 'Apple Pencil', 'airpods': 'AirPods', 'airtag': 'AirTag',
  'ios': 'iOS', 'ipados': 'iPadOS', 'macos': 'macOS', 'watchos': 'watchOS', 'tvos': 'tvOS',
  'visionos': 'visionOS', 'icloud': 'iCloud', 'app store': 'App Store', 'apple id': 'Apple ID',
  'apple pay': 'Apple Pay', 'facetime': 'FaceTime', 'imessage': 'iMessage', 'siri': 'Siri',
  'airdrop': 'AirDrop', 'airplay': 'AirPlay', 'airprint': 'AirPrint', 'finder': 'Finder',
  'safari': 'Safari', 'xcode': 'Xcode', 'swiftui': 'SwiftUI', 'objective-c': 'Objective-C',
  'apple silcon': 'Apple Silicon', 'rosetta 2': 'Rosetta 2', 'filevault': 'FileVault',
  'gatekeeper': 'Gatekeeper', 'testflight': 'TestFlight', 'applecare': 'AppleCare+',
  'apple intelligence': 'Apple Intelligence', 'writing tools': 'Writing Tools',
  'image playground': 'Image Playground', 'genmoji': 'Genmoji',
  
  // MDM & Enterprise
  'mdm': 'MDM', 'mam': 'MAM', 'uem': 'UEM', 'asm': 'ASM', 'abm': 'ABM', 'ade': 'ADE',
  'dep': 'DEP', 'vpp': 'VPP', 'apns': 'APNs', 'jamf': 'Jamf', 'jamf pro': 'Jamf Pro',
  'jamf school': 'Jamf School', 'jamf now': 'Jamf Now', 'jamf connect': 'Jamf Connect',
  'jamf protect': 'Jamf Protect', 'prestage': 'PreStage', 'self service': 'Self Service',
  'configurator': 'Configurator', 'automator': 'Automator', 'mdm profile': 'MDM Profile',
  'enrollment': 'Enrollment', 'psso': 'PSSO', 'sso': 'SSO', 'laps': 'LAPS', 
  'managed apple account': 'Managed Apple Account', 'return to service': 'Return to Service',
  'declarative': 'Declarative', 'ddm': 'DDM', 'bootstrap token': 'Bootstrap Token',
  
  // Networking & Protocols
  'wi-fi': 'Wi-Fi', 'wifi': 'Wi-Fi', 'ethernet': 'Ethernet', 'bluetooth': 'Bluetooth',
  'usb-c': 'USB-C', 'usbc': 'USB-C', 'lightning': 'Lightning', 'thunderbolt': 'Thunderbolt',
  'hdmi': 'HDMI', 'nfc': 'NFC', 'rfid': 'RFID', 'api': 'API', 'sdk': 'SDK',
  'xml': 'XML', 'json': 'JSON', 'http': 'HTTP', 'https': 'HTTPS', 'ssl': 'SSL',
  'tls': 'TLS', 'vpn': 'VPN', 'dns': 'DNS', 'dhcp': 'DHCP', 'ssh': 'SSH',
  'sftp': 'SFTP', 'ldap': 'LDAP', 'saml': 'SAML', 'oidc': 'OIDC', 'scim': 'SCIM',
  '802.1x': '802.1X', 'wpa3': 'WPA3', 'radius': 'RADIUS', 'ssid': 'SSID', 'bssid': 'BSSID',
  
  // Security & Hardware
  't2 chip': 'T2 Chip', 'm1': 'M1', 'm2': 'M2', 'm3': 'M3', 'm4': 'M4', 'm5': 'M5',
  'cpu': 'CPU', 'gpu': 'GPU', 'npu': 'NPU', 'ram': 'RAM', 'ssd': 'SSD',
  'uuid': 'UUID', 'udid': 'UDID', 'imei': 'IMEI', 'iccid': 'ICCID', 'seid': 'SEID',
  'md5': 'MD5', 'sha256': 'SHA-256', 'aes': 'AES', 'rsa': 'RSA', 'csr': 'CSR',
  'ca': 'CA', 'pki': 'PKI', 'scep': 'SCEP', 'acme': 'ACME'
};

const STATS = { total: 0, modified: 0, errors: 0, files: [] };

// --- 🛠️ 輔助工具引擎 ---

class TypographyEngine {
    static hasCJK(text) {
        return /[\u4e00-\u9fa5]/.test(text);
    }

    /**
     * MD044: 專有名詞校正
     */
    static normalizeProperNouns(text) {
        let result = text;
        Object.entries(PROPER_NOUNS).forEach(([lower, correct]) => {
            // 使用 Word Boundary (\b) 確保不會誤傷單字內部的部分 (如 jamf -> Jamf, 但 jamfpro 需另外處理)
            const regex = new RegExp(`(?<![a-zA-Z0-9])${lower}(?![a-zA-Z0-9])`, 'gi');
            result = result.replace(regex, correct);
        });
        return result;
    }

    /**
     * 盤古規則：中英文/數字間距
     */
    static applyPangu(text) {
        if (!this.hasCJK(text)) return text;
        let content = text;
        // 中英
        content = content.replace(/([\u4e00-\u9fa5])([a-zA-Z])/g, '$1 $2');
        content = content.replace(/([a-zA-Z])([\u4e00-\u9fa5])/g, '$1 $2');
        // 中數
        content = content.replace(/([\u4e00-\u9fa5])(\d)/g, '$1 $2');
        content = content.replace(/(\d)([\u4e00-\u9fa5])/g, '$1 $2');
        // 標記字元
        content = content.replace(/([\u4e00-\u9fa5])([`\*\_\~\$])/g, '$1 $2');
        content = content.replace(/([`\*\_\~\$])([\u4e00-\u9fa5])/g, '$1 $2');
        return content;
    }

    /**
     * MD011/MD034: 連結與路徑修復
     */
    static fixLinks(text) {
        let result = text;
        // 修復 (Text)[URL] 為 [Text](URL)
        result = result.replace(/\(([^\)]+)\)\[([^\]]+)\]/g, '[$1]($2)');
        // 封裝裸網址 MD034
        result = result.replace(/(?<![<"']) (https?:\/\/[^\s\)]+)(?![>"'])/g, ' <$1>');
        return result;
    }

    /**
     * MD037/038/039: 語法內部空格清理
     */
    static cleanSyntaxSpaces(text) {
        let result = text;
        // 強調符號內部空格: ** text ** -> **text**
        result = result.replace(/(\*{1,2}|_{1,2}) +(.+?) +\1/g, '$1$2$1');
        // 代碼內部空格: ` code ` -> `code`
        result = result.replace(/(`) +(.+?) +\1/g, '$1$2$1');
        // 連結文字內部空格: [ text ] -> [text]
        result = result.replace(/\[ +(.+?) +\]/g, '[$1]');
        return result;
    }
}

// --- 🏗️ Markdown 格式化核心類別 ---

class MarkdownFormatter {
    constructor(filePath) {
        this.filePath = filePath;
        this.lang = filePath.includes('/en/') ? 'en' : 'zh';
        this.rawContent = fs.readFileSync(filePath, 'utf-8');
        this.processedLines = [];
        this.state = {
            inCodeBlock: false,
            inTable: false,
            inBlockquote: false,
            currentListIndex: 0,
            isFirstLineOfList: false
        };
    }

    /**
     * 執行完整格式化流程
     */
    format() {
        const file = matter(this.rawContent);
        let { data: frontmatter, content } = file;
        
        // 穩定化 Frontmatter 鍵值排序
        const sortedFrontmatter = {};
        Object.keys(frontmatter).sort().forEach(key => {
            sortedFrontmatter[key] = frontmatter[key];
        });

        let workingContent = content.trimStart();
        const lines = workingContent.split('\n');

        for (let i = 0; i < lines.length; i++) {
            this.processLine(lines[i]);
        }

        // 最終合成
        let result = this.processedLines.join('\n');
        
        // --- 全域清理規則 ---
        // MD012: 合併過多空行
        result = result.replace(/\n{3,}/g, '\n\n');
        // MD009: 每一行去除末尾空格
        result = result.split('\n').map(l => l.trimEnd()).join('\n');
        // MD047: 文件末尾單換行
        result = result.trimEnd() + '\n';

        // 冪等性檢查 (Idempotency Check)
        const finalOutput = matter.stringify(result, sortedFrontmatter);
        
        // 額外清理以確保完全穩定 (預防 matter.stringify 的細微差異)
        const normalizedOutput = finalOutput.trimEnd() + '\n';
        
        if (normalizedOutput === this.rawContent) {
            return false; // 無任何變動，跳過寫入
        }

        fs.writeFileSync(this.filePath, normalizedOutput, 'utf-8');
        return true;
    }

    /**
     * 逐行處理邏輯
     */
    processLine(line) {
        const prevLine = this.processedLines.length > 0 ? this.processedLines[this.processedLines.length - 1] : null;

        // 1. 代碼塊攔截 (Priority Level 1)
        if (line.trim().startsWith('```')) {
            this.state.inCodeBlock = !this.state.inCodeBlock;
            // MD031: 代碼塊前後必須有空行
            if (this.state.inCodeBlock && prevLine && prevLine.trim() !== '') {
                this.processedLines.push('');
            }
            this.processedLines.push(line);
            if (!this.state.inCodeBlock) this.processedLines.push('');
            return;
        }

        if (this.state.inCodeBlock) {
            this.processedLines.push(line);
            return;
        }

        // 2. 空行處理 (MD012)
        if (line.trim() === '' && prevLine !== null && prevLine.trim() === '') {
            return;
        }

        // 3. 文字優化規則
        let processed = line;
        processed = TypographyEngine.normalizeProperNouns(processed);
        processed = TypographyEngine.cleanSyntaxSpaces(processed);
        processed = TypographyEngine.fixLinks(processed);
        if (TypographyEngine.hasCJK(processed)) {
            processed = TypographyEngine.applyPangu(processed);
        }

        // 4. 結構判定：標題 (MD001 / MD025)
        const headingMatch = processed.match(/^(#{1,6}) (.*)/);
        if (headingMatch) {
            this.resetListContext();
            const level = headingMatch[1].length;
            const text = headingMatch[2].trim();
            // 統一標題為 ## (本專案規範)
            const finalLevel = (level === 1 || level >= 3) ? 2 : level;
            
            // 標題前空行隔離
            if (prevLine && prevLine.trim() !== '' && prevLine.trim() !== '>') {
                this.processedLines.push(processed.startsWith('>') ? '>' : '');
            }
            
            this.processedLines.push(`${'#'.repeat(finalLevel)} ${text}`);
            this.processedLines.push(processed.startsWith('>') ? '>' : '');
            return;
        }

        // 5. 結構判定：列表系統 (MD004 / MD007 / MD029)
        let bqPrefix = '';
        let listBody = processed;
        const bqMatch = processed.match(/^((?:>\s*)+)(.*)$/);
        if (bqMatch) {
            bqPrefix = bqMatch[1].replace(/ {2,}/g, ' '); // MD027: 去除 Blockquote 後多餘空格
            listBody = bqMatch[2];
        }

        const listMatch = listBody.match(/^(\s*)([*+-]|(\d+)\.) (.*)$/);
        if (listMatch) {
            this.handleListLogic(bqPrefix, listMatch, prevLine);
            return;
        }

        // 6. 結構判定：大段落頂格文字 (觸發編號重置)
        if (processed.trim() !== '' && processed.trim() !== '>' && !processed.startsWith(' ') && !processed.startsWith('>')) {
            this.resetListContext();
        }

        // 7. 結構判定：表格優化 (MD060)
        if (processed.trim().startsWith('|') && processed.includes('|')) {
            processed = processed.replace(/([^ |])\|/g, '$1 |');
            processed = processed.replace(/\|([^ |:-])/g, '| $1');
        }

        this.processedLines.push(processed);
    }

    /**
     * 處理智慧編號與縮排校正
     */
    handleListLogic(bqPrefix, match, prevLine) {
        let indentStr = match[1];
        const isOrdered = !!match[3];
        const restContent = match[4];
        let finalizedListLine = '';

        // 智慧編號校準
        if (isOrdered && indentStr.length === 0) {
            this.state.currentListIndex++;
            finalizedListLine = `${this.state.currentListIndex}. ${restContent}`;
        } else if (!isOrdered) {
            finalizedListLine = `* ${restContent}`; // 統一無序符號為 *
        } else {
            finalizedListLine = `${match[2]} ${restContent}`; // 保持次級清單原有數字
        }

        // MD032: 列表前後空行
        const isPrevInList = prevLine && prevLine.match(/^(?:(?:>\s*)+)?(\s*)([*+-]|\d+\.) /);
        const isPrevInHeader = prevLine && prevLine.match(/^(?:(?:>\s*)+)?#{1,6} /);
        const isPrevEmpty = !prevLine || prevLine.trim() === '' || prevLine.trim() === '>';

        if (!isPrevInList && !isPrevInHeader && !isPrevEmpty) {
            this.processedLines.push(bqPrefix.trim());
        }

        // MD007: 巢狀縮排標準化 (強制 2 空格)
        if (indentStr.length > 0) {
            const level = Math.ceil(indentStr.length / 2);
            indentStr = '  '.repeat(level);
        }

        this.processedLines.push(bqPrefix + indentStr + finalizedListLine);
    }

    resetListContext() {
        this.state.currentListIndex = 0;
    }
}

// --- 🌐 主入口程序 ---

async function run() {
    console.log('\x1b[32m%s\x1b[0m', '� Antigravity MDM Formatter Engine starting...');
    console.log('--------------------------------------------------');

    const markdownFiles = [];
    const walk = (d) => {
        if (!fs.existsSync(d)) return;
        fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
            const p = path.join(d, e.name);
            if (e.isDirectory()) walk(p);
            else if (e.name.endsWith('.md')) markdownFiles.push(p);
        });
    };
    
    TARGET_DIRS.forEach(dir => walk(dir));
    STATS.total = markdownFiles.length;

    markdownFiles.forEach(file => {
        try {
            const formatter = new MarkdownFormatter(file);
            if (formatter.format()) {
                STATS.modified++;
            }
        } catch (err) {
            console.error(`\x1b[31m[ERROR]\x1b[0m ${file}:`, err.message);
            STATS.errors++;
        }
    });

    console.log('--------------------------------------------------');
    console.log('\x1b[36m%s\x1b[0m', `📊 Execution Summary:`);
    console.log(`   - Total Scanned: ${STATS.total}`);
    console.log(`   - Files Modified: ${STATS.modified}`);
    console.log(`   - Errors Occurred: ${STATS.errors}`);
    console.log(`   - Perfect Files: ${STATS.total - STATS.modified - STATS.errors}`);
    
    if (STATS.modified > 0) {
        console.log('\x1b[33m%s\x1b[0m', '✅ Infrastructure optimized successfully.');
    } else {
        console.log('\x1b[32m%s\x1b[0m', '✨ Nothing to fix. Codebase is in perfect shape.');
    }
}

run();
