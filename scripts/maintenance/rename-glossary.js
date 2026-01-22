
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GLOSSARY_ZH_DIR = path.join(__dirname, '../docs/data/items/glossary');
// const GLOSSARY_EN_DIR = path.join(__dirname, '../docs/data/items-en/glossary'); // English names seem fine already

function renameFiles(dir) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  
  files.forEach(file => {
    // Logic: Identify files mixed with Chinese characters
    // Pattern: [english-kebab]-[chinese].md
    // We want to keep [english-kebab].md
    
    // Check if file contains Chinese characters
    if (!/[\u4e00-\u9fa5]/.test(file)) {
        return; // Skip pure English filenames
    }

    const nameWithoutExt = file.replace('.md', '');
    
    // Strategy: Find the transition from ASCII to non-ASCII (or specific separator)
    // Most files look like: "accessibility-features-輔助使用功能.md"
    // We want "accessibility-features.md"
    
    // Regex: Capture everything up to the hyphen that precedes Chinese characters
    // This is tricky because "non-ascii" might be at the end.
    // Let's use a simpler approach: Split by '-' and reconstruct provided they are ASCII parts.
    
    const parts = nameWithoutExt.split('-');
    const englishParts = [];
    
    for (const part of parts) {
        // If part contains Chinese, stop or ignore?
        // Usually the structure is strict: eng-eng-eng-CNCN
        if (/[\u4e00-\u9fa5]/.test(part)) {
            // Once we hit Chinese, we assume the rest is suffix or this is the suffix
            break; 
        }
        englishParts.push(part);
    }
    
    if (englishParts.length === 0) {
        console.warn(`⚠️  Skipping: ${file} (No English parts found)`);
        return;
    }
    
    const newName = englishParts.join('-') + '.md';
    
    if (newName === file) return; // No change
    
    const oldPath = path.join(dir, file);
    const newPath = path.join(dir, newName);
    
    if (fs.existsSync(newPath)) {
        console.warn(`⚠️  Conflict: ${newName} already exists. Keeping original names to avoid overwrite.`);
    } else {
        fs.renameSync(oldPath, newPath);
        console.log(`✅ Renamed: ${file} -> ${newName}`);
    }
  });
}

console.log('🚀 Starting Glossary Renaming ...');
renameFiles(GLOSSARY_ZH_DIR);
console.log('✨ Done.');
