
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GLOSSARY_ZH_DIR = path.join(__dirname, '../docs/data/items/glossary');
const GLOSSARY_EN_DIR = path.join(__dirname, '../docs/data/items-en/glossary');

// Helper to slugify content
function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start
        .replace(/-+$/, '');            // Trim - from end
}

function getFrontmatterTerm(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const match = content.match(/^---\n([\s\S]*?)\n---/);
        if (!match) return null;
        
        const lines = match[1].split('\n');
        for (const line of lines) {
            if (line.trim().startsWith('term:')) {
                let val = line.split(':')[1].trim();
                if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                    val = val.slice(1, -1);
                }
                // Handle "Start (End)" -> "Start"
                // Actually usually terms are "802.1X" or "ABM (Apple Business Manager)"
                // We want to match terms.
                return val;
            }
        }
    } catch (e) {}
    return null;
}

function main() {
    console.log('🚀 Synchronizing Glossary Filenames...');
    
    const zhFiles = fs.readdirSync(GLOSSARY_ZH_DIR).filter(f => f.endsWith('.md'));
    const enFiles = fs.readdirSync(GLOSSARY_EN_DIR).filter(f => f.endsWith('.md'));

    const termMap = new Map();

    // 1. Build map from ZH files
    zhFiles.forEach(f => {
        const term = getFrontmatterTerm(path.join(GLOSSARY_ZH_DIR, f));
        if (term) {
            if (!termMap.has(term)) termMap.set(term, {});
            termMap.get(term).zh = f;
        }
    });

    // 2. Build map from EN files
    enFiles.forEach(f => {
        const term = getFrontmatterTerm(path.join(GLOSSARY_EN_DIR, f));
        if (term) {
            // Note: Terms might differ slightly (e.g. "AirDrop" vs "AirDrop Codes")
            // But usually the glossary is 1:1.
            // If strictly 1:1, we match by Term string.
            if (!termMap.has(term)) termMap.set(term, {});
            termMap.get(term).en = f;
        }
    });

    // 3. Analyze and Rename
    let renamedCount = 0;
    
    for (const [term, files] of termMap.entries()) {
        const { zh, en } = files;
        
        if (zh && en) {
            // Both exist. Check if filenames match.
            if (zh !== en) {
                console.log(`Mismatch for [${term}]: ZH=${zh}, EN=${en}`);
                
                // Decide which one to keep
                // Logic: Prefer the one that looks like a slug of the term, or just pick ZH (since we cleaned it)
                // Actually, ensure we pick the one that is cleaner (shorter is often better if meaningful)
                // Let's assume slug of term is best.
                
                // Let's generate a canonical name from the term itself?
                // Or just adopt ZH name (since we processed it recently)?
                // User asked to "Uniform".
                // Let's adopt ZH name for EN file, unless EN name is significantly 'better' (subjective).
                // Let's stick to ZH name as master since we processed it.
                
                const targetName = zh;
                const oldEnPath = path.join(GLOSSARY_EN_DIR, en);
                const newEnPath = path.join(GLOSSARY_EN_DIR, targetName);
                
                if (fs.existsSync(newEnPath)) {
                    // Collision?
                    console.warn(`  ⚠️ Cannot rename EN ${en} to ${targetName} - file exists.`);
                } else {
                    fs.renameSync(oldEnPath, newEnPath);
                    console.log(`  ✅ Renamed EN: ${en} -> ${targetName}`);
                    renamedCount++;
                }
            }
        }
    }
    
    console.log(`✨ Synchronization complete. Renamed ${renamedCount} files.`);
}

main();
