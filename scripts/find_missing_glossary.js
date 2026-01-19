import fs from 'fs';
import path from 'path';

const twDir = './docs/data/items/glossary/';
const enDir = './docs/data/items-en/glossary/';

const twFiles = fs.readdirSync(twDir).filter(f => f.endsWith('.md'));
const enFiles = fs.readdirSync(enDir).filter(f => f.endsWith('.md'));

const getTerm = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const match = content.match(/term:\s*"(.*)"/);
    if (!match) return null;
    let term = match[1].toLowerCase();
    // Remove both half-width and full-width parentheses and their contents
    term = term.replace(/\s*[\(\（].*[\)\）]/g, '').trim();
    // Standardize separators
    term = term.replace(/[\/\s-]+/g, ' ');
    return term;
};

const twTerms = twFiles.map(f => ({ file: f, term: getTerm(path.join(twDir, f)) }));
const enTerms = enFiles.map(f => ({ file: f, term: getTerm(path.join(enDir, f)) }));

const missing = twTerms.filter(tw => !enTerms.some(en => en.term === tw.term));

console.log('Missing Terms:', missing.map(m => m.file));
console.log('Total Missing:', missing.length);
