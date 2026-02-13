#!/usr/bin/env node
/**
 * 批量将 .md 文件重命名为 .mdx
 * 完全兼容现有内容，无需修改任何 Markdown 语法
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const MD_DATA_DIR = path.join(ROOT, "md_data");

let converted = 0;
let errors = 0;

function convertDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      convertDirectory(fullPath);
    } else if (entry.name.endsWith(".md")) {
      const newPath = fullPath.replace(/\.md$/, ".mdx");
      try {
        fs.renameSync(fullPath, newPath);
        converted++;
        if (converted % 50 === 0) {
          console.log(`✓ Converted ${converted} files...`);
        }
      } catch (e) {
        console.error(`✗ Failed to convert ${fullPath}: ${e.message}`);
        errors++;
      }
    }
  }
}

console.log("🚀 Starting .md → .mdx conversion...");
console.log(`📁 Target directory: ${MD_DATA_DIR}\n`);

try {
  convertDirectory(MD_DATA_DIR);
  console.log(`\n✅ Conversion complete!`);
  console.log(`   Converted: ${converted} files`);
  console.log(`   Errors: ${errors} files`);
} catch (e) {
  console.error(`\n❌ Fatal error: ${e.message}`);
  process.exit(1);
}
