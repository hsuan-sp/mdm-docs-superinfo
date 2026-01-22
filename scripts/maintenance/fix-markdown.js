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
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_DIRS = [
  path.join(__dirname, '../../docs/content/zh'),
  path.join(__dirname, '../../docs/content/en'),
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
  'radius': 'RADIUS',
  'ssid': 'SSID',
  'eap': 'EAP',
  'peap': 'PEAP',
  'ttls': 'TTLS',
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
 * and removes spaces INSIDE (standardizes ** text ** to **text**).
 */
function fixMarkdownSyntaxSpacing(text) {
  // Regex to find **...** or __...__ blocks
  // Captures:
  // 1. Prefix char (to check for CJK)
  // 2. Marker (** or __)
  // 3. Content (non-greedy, no newlines)
  // 4. Closing Marker (must match #2)
  // 5. Suffix char (to check for CJK)
  return text.replace(/(^|[\s\S])(\*{2}|_{2})([^\r\n]+?)(\2)([\s\S]|$)/g, (match, prefix, marker, content, closeMarker, suffix) => {
    // 1. Clean spaces inside the markers
    const cleanedContent = content.trim();
    
    // Ignore empty content or content that looks like a horizontal rule (e.g. ***)
    if (!cleanedContent || cleanedContent === '*' || cleanedContent === '_') {
        return match;
    }

    // 2. Ensure spacing with CJK
    
    // Check Preceding CJK
    // We only add space if the prefix is CJK. 
    // If prefix is space, it's not CJK, so we leave it (space preserved).
    if (prefix && /[\u4e00-\u9fa5]$/.test(prefix)) {
      prefix += ' ';
    }
    
    // Check Following CJK
    // We only add space if the suffix is CJK.
    if (suffix && /^[\u4e00-\u9fa5]/.test(suffix)) {
      suffix = ' ' + suffix;
    }
    
    return prefix + marker + cleanedContent + closeMarker + suffix;
  });
}

function processFile(filePath) {
  try {
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    
    let frontmatter = null;
    let content = rawContent;

    // Use gray-matter to parse frontmatter safely
    const fileObj = matter(rawContent);
    let frontmatterData = fileObj.data;
    content = fileObj.content;

    // REMOVE tags field from frontmatter ONLY for glossary files
    if (filePath.includes('/glossary/')) {
        if (frontmatterData.tags) {
            delete frontmatterData.tags;
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

      // REPAIR: Fix broken bold from previous run (* *Text -> **Text)
      line = line.replace(/^(\s*)\* \*([^*])/, '$1**$2');

      // Pre-process: Fix bullet points missing space
      // Skipped if it looks like a horizontal rule (strong strict check)
      if (!line.trim().match(/^([*+-])\1{2,}$/)) {
         // 1. ***Text -> * **Text (Bullet + Bold)
         if (line.match(/^\s*\*{3}[^*]/)) {
           line = line.replace(/^(\s*)\*{3}([^*])/, '$1* **$2');
         }
         // 2. *Text -> * Text (Only if Text doesn't start with *)
         // Prevents touching **Bold
         else if (line.match(/^\s*\*(?=[^*])/)) {
           line = line.replace(/^(\s*)\*([^*])/, '$1* $2');
         }
         // 3. -Text / +Text
         else if (line.match(/^\s*[-+](?=[^\s])/)) {
           line = line.replace(/^(\s*)([-+])([^\s])/, '$1$2 $3');
         }
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
            const prePrevMatchStr = isPrePrevList[2];
            const prePrevIsOrdered = !!prePrevMatchStr.match(/\d+\./);
            
            // Only tighten if types match to avoid conflict with separation logic
            // Also allow tightening if it looks like a sublist (indent increased)
            const prePrevIndent = isPrePrevList[1].length;
            const currIndent = indent.length;
            
            if (prePrevIsOrdered === isOrdered || currIndent > prePrevIndent) {
                processedLines.pop(); // Remove the empty line to tighten the list
                // Update prevLine to the one before the removed empty line
                const newPrevLine = processedLines[processedLines.length - 1];
                // Re-evaluate previous list state
                const isPrevInListUpdated = newPrevLine && newPrevLine.match(/^(?:(?:>\s*)+)?(\s*)([*+-]|\d+\.) /);
                if (isPrevInListUpdated) {
                    // Update indent context if needed (optional, logic below mostly uses local loop vars)
                }
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

    // Reconstruct file content using gray-matter safely
    // Note: matter.stringify(content, data) handles the --- fences automatically
    const finalContent = matter.stringify(newMarkdown, frontmatterData);

    if (finalContent !== rawContent) {
      fs.writeFileSync(filePath, finalContent, 'utf-8');
      console.log(`✅ Fixed: ${path.relative(process.cwd(), filePath)}`);
      // stats.modified++; // Handled in main loop
      // modifiedParams.files.push(path.relative(process.cwd(), filePath)); // removed
      return true;
    } else {
       // console.log(`✨ Perfect: ${path.relative(process.cwd(), filePath)}`);
       return false;
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error);
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

