import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_ROOT = path.resolve(__dirname, '../../docs/content');

function walk(dir, callback) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(f => {
        const dirPath = path.join(dir, f);
        const isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(dirPath);
    });
}

function fixSpacing(content) {
    // Separate frontmatter and body
    let frontmatter = '';
    let body = content;
    
    if (content.startsWith('---')) {
        const parts = content.split('---');
        if (parts.length >= 3) {
            frontmatter = '---' + parts[1] + '---';
            body = parts.slice(2).join('---');
        }
    }

    // Body fixing logic
    // 1. Ensure blank lines before and after headers
    // Using a more controlled approach: split by lines
    const lines = body.split('\n');
    const newLines = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        const nextLine = lines[i + 1] !== undefined ? lines[i + 1].trim() : null;

        // Add the line
        newLines.push(line);

        // Header check: if current line is header, add blank line after if not already there
        if (/^#{1,6}\s+/.test(trimmed)) {
            if (nextLine !== '' && nextLine !== null) {
                newLines.push('');
            }
        }
        
        // If next line is a header and current is not empty, add blank line before
        if (nextLine !== null && /^#{1,6}\s+/.test(nextLine)) {
            if (trimmed !== '') {
                newLines.push('');
            }
        }

        // Paragraph check: text followed by text without blank line
        if (trimmed && nextLine !== null && nextLine !== '') {
            const isCurrentSpecial = /^([\#\-\*\|\>]|\d+\.)/.test(trimmed);
            const isNextSpecial = /^([\#\-\*\|\>]|\d+\.)/.test(nextLine);
            
            if (!isCurrentSpecial && !isNextSpecial) {
                // Both are plain text lines, force a blank line to create separate paragraphs
                newLines.push('');
            }
        }
        
        // List check: text followed by list
        if (trimmed && nextLine !== null && /^([\-\*\d])/.test(nextLine)) {
             const isCurrentSpecial = /^([\#\-\*\|\>]|\d+\.)/.test(trimmed);
             if (!isCurrentSpecial && trimmed !== '') {
                 newLines.push('');
             }
        }
        
        // List followed by text
        if (trimmed && nextLine !== null && /^([\-\*\d])/.test(trimmed)) {
             const isNextSpecial = /^([\#\-\*\|\>]|\d+\.)/.test(nextLine);
             if (!isNextSpecial && nextLine !== '') {
                 newLines.push('');
             }
        }
    }

    let fixedBody = newLines.join('\n');
    // Cleanup multiple blank lines
    fixedBody = fixedBody.replace(/\n{3,}/g, '\n\n');
    
    return (frontmatter + fixedBody).trim() + '\n';
}

console.log('🧹 Standardizing Markdown Spacing (Improved)...');

walk(CONTENT_ROOT, (filePath) => {
    if (!filePath.endsWith('.md')) return;
    
    const original = fs.readFileSync(filePath, 'utf-8');
    const fixed = fixSpacing(original);
    
    if (original !== fixed) {
        fs.writeFileSync(filePath, fixed);
        console.log(`✅ Fixed: ${path.relative(CONTENT_ROOT, filePath)}`);
    }
});

console.log('✨ Markdown Spacing Standardized.');
