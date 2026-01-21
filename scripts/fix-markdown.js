#!/usr/bin/env node

/**
 * MDM 支援站 Markdown 終極修正工具 (All-in-One)
 * 
 * 功能總覽：
 * 1. 格式規範化：統一標題層級為 ##，處理空行與結尾換行 (MD022, MD047)
 * 2. Lint 修正：修正列表縮排、空格格式、代碼塊間距 (MD007, MD030, MD031, MD032, MD060)
 * 3. 排版優化：中英文混排空格、專有名詞大小寫統一、標點符號標準化
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_DIRS = [
  path.join(__dirname, '../docs/data/items'),
  path.join(__dirname, '../docs/data/items-en'),
  path.join(__dirname, '../docs/data/items/qa'),
  path.join(__dirname, '../docs/data/items/glossary'),
];

// 專有名詞映射表 (大小寫敏感)
const PROPER_NOUNS = {
  'ipad': 'iPad',
  'iphone': 'iPhone',
  'ipod': 'iPod',
  'macbook': 'MacBook',
  'imac': 'iMac',
  'mac mini': 'Mac mini',
  'mac pro': 'Mac Pro',
  'mac studio': 'Mac Studio',
  'apple watch': 'Apple Watch',
  'apple tv': 'Apple TV',
  'apple pencil': 'Apple Pencil',
  'airpods': 'AirPods',
  'airtag': 'AirTag',
  'ios': 'iOS',
  'ipados': 'iPadOS',
  'macos': 'macOS',
  'watchos': 'watchOS',
  'tvos': 'tvOS',
  'icloud': 'iCloud',
  'app store': 'App Store',
  'apple id': 'Apple ID',
  'facetime': 'FaceTime',
  'siri': 'Siri',
  'airdrop': 'AirDrop',
  'airplay': 'AirPlay',
  'airprint': 'AirPrint',
  'apple intelligence': 'Apple Intelligence',
  'mdm': 'MDM',
  'asm': 'ASM',
  'abm': 'ABM',
  'ade': 'ADE',
  'dep': 'DEP',
  'vpp': 'VPP',
  'apns': 'APNs',
  'jamf': 'Jamf',
  'jamf pro': 'Jamf Pro',
  'jamf school': 'Jamf School',
  'jamf now': 'Jamf Now',
  'jamf protect': 'Jamf Protect',
  'jamf connect': 'Jamf Connect',
  'jamf teacher': 'Jamf Teacher',
  'jamf student': 'Jamf Student',
  'jamf parent': 'Jamf Parent',
  'wi-fi': 'Wi-Fi',
  'wifi': 'Wi-Fi',
  'usb-c': 'USB-C',
  'usbc': 'USB-C',
  'lightning': 'Lightning',
  'bluetooth': 'Bluetooth',
  'api': 'API',
  'ssl': 'SSL',
  'tls': 'TLS',
  'vpn': 'VPN',
  'dns': 'DNS',
  'dhcp': 'DHCP',
  'ssh': 'SSH',
  'uuid': 'UUID',
  'udid': 'UDID',
  'url': 'URL',
};

let stats = {
  total: 0,
  modified: 0,
  errors: 0
};

// --- 工具函數 ---

function getAllMarkdownFiles(dir) {
  const files = [];
  function traverse(currentDir) {
    if (!fs.existsSync(currentDir)) return;
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) traverse(fullPath);
      else if (entry.isFile() && entry.name.endsWith('.md')) {
        if (entry.name.includes('MAINTENANCE_INDEX')) continue;
        files.push(fullPath);
      }
    }
  }
  traverse(dir);
  return files;
}

function getLanguage(filePath) {
  return filePath.includes('items-en') ? 'en' : 'zh';
}

function optimizeSpacing(text, lang) {
  if (lang !== 'zh') return text;
  
  const match = text.match(/^([\s>]*)(.*)$/);
  const prefix = match[1] || '';
  let content = match[2] || '';
  
  if (!content) return text;

  content = content.replace(/([\u4e00-\u9fa5])([a-zA-Z])/g, '$1 $2');
  content = content.replace(/([a-zA-Z])([\u4e00-\u9fa5])/g, '$1 $2');
  content = content.replace(/([\u4e00-\u9fa5])(\d)/g, '$1 $2');
  content = content.replace(/(\d)([\u4e00-\u9fa5])/g, '$1 $2');
  content = content.replace(/([a-zA-Z]{3,})(\d+)/g, '$1 $2');
  content = content.replace(/(\d+)([a-zA-Z]{3,})/g, '$1 $2');
  
  // 僅清理內容內部的多餘空格，不影響 prefix
  content = content.replace(/ {2,}/g, ' ');
  
  return prefix + content;
}

function normalizeProperNouns(text) {
  let result = text;
  Object.entries(PROPER_NOUNS).forEach(([incorrect, correct]) => {
    const regex = new RegExp(`\\b${incorrect.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'gi');
    result = result.replace(regex, correct);
  });
  return result;
}

/**
 * Ensures bold/italic markers have spaces OUTSIDE when adjacent to CJK,
 * but NO spaces INSIDE (which breaks markdown parsing).
 */
function fixMarkdownSyntaxSpacing(text) {
  return text
    // 1. Remove spaces INSIDE bold/italic markers: ** text ** -> **text**
    .replace(/(\*\*|__)\s+(.*?)\s+(\*\*|__)/g, '$1$2$3')
    .replace(/(\*|_)\s+(.*?)\s+(\*|_)/g, '$1$2$3')
    
    // 2. Add spaces OUTSIDE bold markers if adjacent to CJK
    // CJK**bold** -> CJK **bold**
    .replace(/([\u4e00-\u9fa5])(\*\*|__)/g, '$1 $2')
    // **bold**CJK -> **bold** CJK
    .replace(/(\*\*|__)([\u4e00-\u9fa5])/g, '$1 $2')
    
    // 3. Ensure no double spaces created by above rules
    .replace(/ {2,}/g, ' ');
}

function processFile(filePath) {
  try {
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    
    let frontmatter = null;
    let content = rawContent;

    if (rawContent.startsWith('---')) {
      const parts = rawContent.split('---');
      if (parts.length >= 3) {
        frontmatter = parts[1];
        // 確保 frontmatter 結尾有換行符號
        if (!frontmatter.endsWith('\n')) frontmatter += '\n';
        content = parts.slice(2).join('---');
      }
    }
    const lang = getLanguage(filePath);
    content = content.replace(/^\n+/, '');

    const lines = content.split('\n');
    const processedLines = [];
    let inCodeBlock = false;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      const prevLine = processedLines.length > 0 ? processedLines[processedLines.length - 1] : null;

      // A. 代碼塊處理
      if (line.trim().startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        if (inCodeBlock && prevLine && prevLine.trim() !== '' && !prevLine.trim().startsWith('```')) {
          processedLines.push('');
        }
        processedLines.push(line);
        if (!inCodeBlock) {
          processedLines.push('');
        }
        continue;
      }

      if (inCodeBlock) {
        processedLines.push(line);
        continue;
      }

      // B. 標題處理
      const headingMatch = line.match(/^(#{1,6}) (.*)/);
      if (headingMatch) {
        let level = headingMatch[1].length;
        let text = headingMatch[2];
        if (level === 1 || level >= 3) {
          line = `## ${text}`;
        }
        line = normalizeProperNouns(line);
        line = optimizeSpacing(line, lang);
        if (prevLine !== null && prevLine.trim() !== '' && prevLine.trim() !== '>') {
          processedLines.push(line.startsWith('>') ? '>' : '');
        }
        processedLines.push(line);
        processedLines.push(line.startsWith('>') ? '>' : '');
        continue;
      }

      // C. 列表處理 (Blockquote 相容)
      let bqPrefix = '';
      let listPart = line;
      const bqMatch = line.match(/^((?:>\s*)+)(.*)$/);
      if (bqMatch) {
        bqPrefix = bqMatch[1];
        listPart = bqMatch[2];
      }

      const listMatch = listPart.match(/^(\s*)([*+-]|(\d+)\.) /);
      const isListItem = !!listMatch;

      if (isListItem) {
        let indent = listMatch[1];
        const isOrdered = !!listMatch[3];

        // MD032: 列表前空行
        const isPrevInList = prevLine && prevLine.match(/^(?:(?:>\s*)+)?(\s*)([*+-]|\d+\.) /);
        const isPrevInHeader = prevLine && prevLine.match(/^(?:(?:>\s*)+)?#{1,6} /);
        const isPrevEmpty = !prevLine || prevLine.trim() === '' || prevLine.trim() === '>';
        
        let shouldPrependEmpty = false;
        if (!isPrevInList && !isPrevInHeader && !isPrevEmpty) {
            shouldPrependEmpty = true;
        } else if (isPrevInList) {
            const prevMatchStr = prevLine.match(/^(?:(?:>\s*)+)?\s*([*+-]|\d+\.) /)[1];
            const prevIsOrdered = !!prevMatchStr.match(/\d+\./);
            if (prevIsOrdered !== isOrdered) {
                shouldPrependEmpty = true;
            }
        }

        if (shouldPrependEmpty) {
            processedLines.push(bqPrefix.trim());
            const newPrevLine = processedLines[processedLines.length - 1];
            const isNowEmpty = !newPrevLine || newPrevLine.trim() === '' || newPrevLine.trim() === '>';
            if (isNowEmpty) {
                listPart = listPart.replace(/^\s+/, '');
                indent = '';
            }
        }

        if (isOrdered) {
          // 不再強制統一為 1. 以支援連貫編號 (1. 2. 3.)
          // listPart = listPart.replace(/^\s*\d+\./, (m) => m.match(/^\s*/)[0] + '1.');
        } else {
          listPart = listPart.replace(/^\s*[*+-]/, (m) => m.match(/^\s*/)[0] + '*');
        }

        listPart = listPart.replace(/^(\s*)([*+]|\d+\.)\s+/, '$1$2 ');

        if (indent.length === 1 || indent.length === 3 || indent.length === 4) {
          const newIndent = (indent.length >= 3) ? '  ' : '';
          listPart = listPart.replace(/^\s+/, newIndent);
          indent = newIndent;
        }

        // Merge logic from format_glossary: Tighten lists by removing empty lines between list items
        if (isPrevEmpty && processedLines.length >= 2) {
          const prePrevLine = processedLines[processedLines.length - 2];
          const isPrePrevList = prePrevLine && prePrevLine.match(/^(?:(?:>\s*)+)?(\s*)([*+-]|\d+\.) /);
          if (isPrePrevList) {
            processedLines.pop(); // Remove the empty line to tighten the list
            // Update prevLine to the one before the removed empty line
            const newPrevLine = processedLines[processedLines.length - 1];
            // Re-evaluate previous list state
            const isPrevInListUpdated = newPrevLine && newPrevLine.match(/^(?:(?:>\s*)+)?(\s*)([*+-]|\d+\.) /);
            if (isPrevInListUpdated) {
                // If it was a list item of the same type, we don't need to do anything special here
                // as the logic below will handle indentation etc.
            }
          }
        }

        if (isPrevInList && !isOrdered && indent.length === 0 && !shouldPrependEmpty) {
            const prevMatch = prevLine.match(/^(?:(?:>\s*)+)?(\s*)([*+-]|\d+\.) /);
            const prevIndent = prevMatch[1].length;
            const isPrevOrdered = !!prevMatch[2].match(/\d+\./);
            
            if (isPrevOrdered) {
                listPart = '  ' + listPart;
            } else if (prevIndent > 0) {
                listPart = ' '.repeat(prevIndent) + listPart;
            }
        }

        line = bqPrefix + listPart;
      } else if (line.trim() !== '' && line.trim() !== '>') {
        const isPrevListItem = prevLine && prevLine.match(/^(?:(?:>\s*)+)?(\s*)([*+-]|\d+\.) /);
        if (isPrevListItem && !line.match(/^(?:(?:>\s*)+)?#{1,6} /)) {
          processedLines.push(bqPrefix.trim());
        }
      }

      // D. 表格空格優化 (MD060)
      if (line.trim().startsWith('|') && line.includes('|')) {
          // 確保 | 兩側有空格，但排除開頭與結尾，且避免破壞 :--- 對齊線
          line = line.replace(/([^ |])\|/g, '$1 |');
          line = line.replace(/\|([^ |:-])/g, '| $1');
      }

      // E. 一般文字優化
      if (!line.trim().startsWith('<') && !line.trim().startsWith('[')) {
        line = normalizeProperNouns(line);
        line = fixMarkdownSyntaxSpacing(line); // Fix markdown markers first
        line = optimizeSpacing(line, lang);
      }

      // F. 空行處理
      if (line.trim() === '' && prevLine && prevLine.trim() === '') {
        continue;
      }

      processedLines.push(line);
    }

    let newMarkdown = processedLines.join('\n');
    newMarkdown = newMarkdown.replace(/\n{3,}/g, '\n\n');
    newMarkdown = newMarkdown.split('\n').map(l => l.trimEnd()).join('\n');
    newMarkdown = newMarkdown.replace(/\s+$/, '') + '\n';

    const finalContent = frontmatter !== null 
      ? `---${frontmatter}---\n\n${newMarkdown}` 
      : newMarkdown;

    if (finalContent !== rawContent) {
      fs.writeFileSync(filePath, finalContent, 'utf-8');
      return true;
    }
    return false;
  } catch (err) {
    console.error(`❌ Error filtering ${path.relative(process.cwd(), filePath)}: ${err.message}`);
    stats.errors++;
    return false;
  }
}

function main() {
  console.log('🚀 開始執行 MDM Support Site Markdown 修正工具...');
  console.log('==================================================');
  const allFiles = [];
  TARGET_DIRS.forEach(dir => allFiles.push(...getAllMarkdownFiles(dir)));
  stats.total = allFiles.length;
  console.log(`📝 掃描到 files: ${stats.total}`);
  allFiles.forEach(file => {
    if (processFile(file)) stats.modified++;
  });
  console.log('==================================================');
  console.log('📊 執行報告:');
  console.log(`   總計掃描: ${stats.total}`);
  console.log(`   實際修正: ${stats.modified}`);
  console.log(`   發生錯誤: ${stats.errors}`);
  console.log(`   完美文件: ${stats.total - stats.modified - stats.errors}`);
  if (stats.errors > 0) process.exit(1);
}

main();

