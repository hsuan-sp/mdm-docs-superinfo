#!/usr/bin/env node

/**
 * MDM 支援站 Markdown 終極修正工具 (All-in-One)
 * 
 * 功能總覽：
 * 1. 格式規範化：統一標題層級為 ##，處理空行與結尾換行 (MD022, MD047)
 * 2. Lint 修正：修正列表縮排、空格格式、代碼塊間距 (MD007, MD030, MD031, MD032)
 * 3. 排版優化：中英文混排空格、專有名詞大小寫統一、標點符號標準化
 * 
 * 使用方式：
 *   node scripts/fix-markdown.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 目標目錄
const DIRECTORIES = [
  path.join(__dirname, '../docs/data'),
];

// 專有名詞映射表 (大小寫敏感)
const PROPER_NOUNS = {
  // Apple 產品
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
  
  // 系統與服務
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
  
  // MDM 相關
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
  
  // 技術術語
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
        // 排除自動生成的索引檔案
        if (entry.name.includes('MAINTENANCE_INDEX')) continue;
        files.push(fullPath);
      }
    }
  }
  traverse(dir);
  return files;
}

// 判斷語言
function getLanguage(filePath) {
  return filePath.includes('items-en') ? 'en' : 'zh';
}

// 1. 排版優化：中英文空格
function optimizeSpacing(text, lang) {
  if (lang !== 'zh') return text;
  let result = text;
  // 中文與英文字母之間加空格
  result = result.replace(/([\u4e00-\u9fa5])([a-zA-Z])/g, '$1 $2');
  result = result.replace(/([a-zA-Z])([\u4e00-\u9fa5])/g, '$1 $2');
  // 中文與數字之間加空格
  result = result.replace(/([\u4e00-\u9fa5])(\d)/g, '$1 $2');
  result = result.replace(/(\d)([\u4e00-\u9fa5])/g, '$1 $2');
  // 英文與數字之間加空格 (例如 iPad 10, iOS 18)
  // 為避免破壞 A14, M1 等簡短技術代碼，僅針對 3 字元以上的英文字詞處理
  result = result.replace(/([a-zA-Z]{3,})(\d+)/g, '$1 $2');
  result = result.replace(/(\d+)([a-zA-Z]{3,})/g, '$1 $2');

  // 清理連續空格
  result = result.replace(/ +/g, ' ');
  return result;
}

// 2. 排版優化：專有名詞
function normalizeProperNouns(text) {
  let result = text;
  Object.entries(PROPER_NOUNS).forEach(([incorrect, correct]) => {
    // 使用 word boundary (\b) 避免錯誤替換 (例如 apple 替換 apple watch 中的 apple)
    // 這裡簡單處理：先不區分大小寫全域替換，但要小心別把 URL 改壞了
    // 為了安全起見，我們只針對常見的錯誤寫法進行精確匹配，或者使用正則忽略特定上下文
    const regex = new RegExp(`\\b${incorrect.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'gi');
    result = result.replace(regex, correct);
  });
  return result;
}

// 3. 處理單個文件的核心邏輯
function processFile(filePath) {
  try {
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    
    // 檢查 Frontmatter
    let frontmatter = null;
    let content = rawContent;

    if (rawContent.startsWith('---')) {
      const parts = rawContent.split('---');
      if (parts.length >= 3) {
        frontmatter = parts[1];
        content = parts.slice(2).join('---');
      }
    }
    const lang = getLanguage(filePath);

    // 移除開頭多餘空行
    content = content.replace(/^\n+/, '\n');

    const lines = content.split('\n');
    const processedLines = [];
    let inCodeBlock = false;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      const prevLine = processedLines.length > 0 ? processedLines[processedLines.length - 1] : null;
      
      // A. 代碼塊處理
      if (line.trim().startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        
        // MD031: 代碼塊前加空行
        if (inCodeBlock /* 進入時 */ && prevLine && prevLine.trim() !== '' && !prevLine.trim().startsWith('```')) {
          processedLines.push('');
        }
        
        processedLines.push(line);
        
        // MD031: 代碼塊後加空行 (在下一次循環檢查下一行太慢，我們在這裡預判並非完美，依賴後續的空行清理)
        // 這裡我們暫時只處理進入代碼塊前的空行。退出後的空行由"下一行處理邏輯"負責(比較難判斷)，
        // 或者簡單地在退出代碼塊後強制加空行(如果不也就是最後一行)
        continue;
      }

      if (inCodeBlock) {
        processedLines.push(line);
        if (!inCodeBlock /* 退出時 */) {
          processedLines.push('');
        }
        continue;
      }

      // B. 標題處理
      const headingMatch = line.match(/^(#{1,6}) (.*)/);
      if (headingMatch) {
        let level = headingMatch[1].length;
        let text = headingMatch[2];

        // 統一轉為二級標題 (##)
        // 規則：如果是一級(#)或是三級以上(###...)，全部轉為 ##
        if (level === 1 || level >= 3) {
          line = `## ${text}`;
        }

        // 優化標題文字排版
        line = normalizeProperNouns(line);
        line = optimizeSpacing(line, lang);

        // MD022: 標題前加空行
        if (prevLine !== null && prevLine.trim() !== '') {
          processedLines.push('');
        }
        
        processedLines.push(line);
        
        // MD022: 標題後加空行 (透過主動插入空行)
        // 如果下一行(在原始 lines 裡) 本來就是空行，會在下個迴圈被處理；
        // 為了確保，我們可以在這裡標記，或者讓最後的"連續空行清理"來處理重複空行
        // 簡單做法：強制推入一個空行，最後再 cleanup
        processedLines.push('');
        continue;
      }

      // C. 列表處理 (MD004, MD007, MD030, MD032)
      const listMatch = line.match(/^(\s*)([*+-]|\d+\.) /);
      const isListItem = !!listMatch;

      if (isListItem && !inCodeBlock) {
        // MD032: 列表前確保有空行 (如果前面不是列表、空行或標題)
        if (prevLine !== null && prevLine.trim() !== '' && 
            !prevLine.match(/^(\s*)([*+-]|\d+\.) /) && 
            !prevLine.match(/^#{1,6} /)) {
          processedLines.push('');
        }

        // MD004: 統一使用星號 * 作為無序列表標記
        if (line.match(/^(\s*)[-+] /)) {
          line = line.replace(/^(\s*)[-+] /, '$1* ');
        }

        // MD030: 修正列表標記後的空格 (統一為 1 個)
        if (line.match(/^(\s*)([*+]|\d+\.)\s{2,}/)) {
           line = line.replace(/^(\s*)([*+]|\d+\.)\s+/, '$1$2 ');
        }

        // MD007: 修正縮排
        if (line.match(/^[ ]{1,3}([*+]|\d+\.) /)) {
          // 如果縮排是 1~3 個空格，通常是手誤，統一改為 0 縮排
          // 除非是在巢狀情境下 (但 2 空格才是標準，1/3 都是異常)
          line = line.replace(/^[ ]+/, '');
        } else if (line.match(/^    ([*+]|\d+\.) /)) {
          // 4 個空格 -> 2 個 (統一巢狀為 2)
          line = line.replace(/^    /, '  ');
        }
      }

      // MD032: 列表前後的空行 (略微複雜，這裡主要靠最後的空行清理，或者依賴標題前後的空行規則)
      
      // D. 일반 文本排版優化
      // 排除 HTML 標籤行、鏈接定義等
      if (!line.trim().startsWith('<') && !line.trim().startsWith('[')) {
        line = normalizeProperNouns(line);
        line = optimizeSpacing(line, lang);
      }

      // E. 空行處理
      // 如果這行是空行，確認上一行是否已經是空行，避免連續空行
      if (line.trim() === '') {
        if (prevLine && prevLine.trim() === '') {
          // 跳過重複空行
          continue;
        }
      }

      processedLines.push(line);
    }

    // 重組內容
    let newMarkdown = processedLines.join('\n');

    // MD047 & 清理
    // 1. 確保最多連續兩個換行 (\n\n)
    newMarkdown = newMarkdown.replace(/\n{3,}/g, '\n\n');
    // 2. 移除所有行尾空格
    newMarkdown = newMarkdown.split('\n').map(l => l.trimEnd()).join('\n');
    // 3. 確保檔案結尾單換行
    newMarkdown = newMarkdown.replace(/\s+$/, '') + '\n';

    const finalContent = frontmatter !== null 
      ? `---${frontmatter}---${newMarkdown}` 
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

// --- 主程序 ---

function main() {
  console.log('🚀 開始執行 MDM Support Site Markdown 修正工具...');
  console.log('==================================================');

  const allFiles = [];
  DIRECTORIES.forEach(dir => {
    allFiles.push(...getAllMarkdownFiles(dir));
  });

  stats.total = allFiles.length;
  console.log(`📝 掃描到 files: ${stats.total}`);

  allFiles.forEach(file => {
    const changed = processFile(file);
    if (changed) {
      stats.modified++;
      console.log(`✅ Fixed: ${path.relative(process.cwd(), file)}`);
    }
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
