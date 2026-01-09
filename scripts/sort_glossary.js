/**
 * Glossary Sorting Script
 * Automatically sorts glossary terms alphabetically and adds section comments
 */

const fs = require('fs');
const path = require('path');

const GLOSSARY_PATH = path.join(__dirname, '../docs/data/glossary.ts');

// Read the file
const content = fs.readFileSync(GLOSSARY_PATH, 'utf-8');

// Extract the header (everything before the array)
const arrayStartMatch = content.match(/export const glossaryData: Term\[\] = \[/);
if (!arrayStartMatch) {
  console.error('❌ Could not find glossaryData array start');
  process.exit(1);
}

const headerEndIndex = arrayStartMatch.index + arrayStartMatch[0].length;
const header = content.substring(0, headerEndIndex);
const footer = '\n];\n';

// Extract all term objects using a more robust approach
const termsSection = content.substring(headerEndIndex, content.lastIndexOf('];'));
const terms = [];
let currentTerm = '';
let braceCount = 0;
let inString = false;
let stringChar = null;

for (let i = 0; i < termsSection.length; i++) {
  const char = termsSection[i];
  const prevChar = i > 0 ? termsSection[i - 1] : '';
  
  // Track string state
  if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
    if (!inString) {
      inString = true;
      stringChar = char;
    } else if (char === stringChar) {
      inString = false;
      stringChar = null;
    }
  }
  
  // Track braces only outside strings
  if (!inString) {
    if (char === '{') {
      if (braceCount === 0 && currentTerm.trim() === '') {
        // Start of a new term
        currentTerm = char;
      } else {
        currentTerm += char;
      }
      braceCount++;
    } else if (char === '}') {
      currentTerm += char;
      braceCount--;
      
      if (braceCount === 0 && currentTerm.trim()) {
        // End of term object
        terms.push(currentTerm.trim());
        currentTerm = '';
      }
    } else if (braceCount > 0) {
      currentTerm += char;
    }
  } else {
    if (braceCount > 0) {
      currentTerm += char;
    }
  }
}

console.log(`📊 Found ${terms.length} terms to sort`);

// Parse each term to extract the term name for sorting
const parsedTerms = terms.map((termStr, index) => {
  const termMatch = termStr.match(/term:\s*"([^"]+)"/);
  if (!termMatch) {
    console.error(`⚠️  Could not extract term name from term #${index + 1}`);
    return { name: '', original: termStr, sortKey: '' };
  }
  
  const termName = termMatch[1];
  // Create sort key: prioritize English letters, then numbers, then Chinese/special chars
  let sortKey = termName;
  
  // Normalize for sorting (case-insensitive, treat special prefixes)
  sortKey = sortKey.toLowerCase();
  
  return {
    name: termName,
    original: termStr,
    sortKey: sortKey
  };
});

// Sort terms alphabetically
parsedTerms.sort((a, b) => {
  return a.sortKey.localeCompare(b.sortKey, 'en', { sensitivity: 'base' });
});

console.log('✅ Terms sorted alphabetically');

// Group terms by first character and add section comments
let currentSection = '';
const sortedContent = [];

parsedTerms.forEach((term, index) => {
  const firstChar = term.name[0].toUpperCase();
  
  // Determine section label
  let sectionLabel = '';
  if (/[A-Z]/.test(firstChar)) {
    sectionLabel = firstChar;
  } else if (/[0-9]/.test(firstChar)) {
    sectionLabel = term.name.match(/^\d+/)[0]; // Use the full number prefix
  } else {
    // Chinese or special characters - use the actual character or term prefix
    sectionLabel = term.name.split(' ')[0].substring(0, 3);
  }
  
  // Add section comment when section changes
  if (sectionLabel !== currentSection) {
    sortedContent.push(`\n  // --- ${sectionLabel} ---`);
    currentSection = sectionLabel;
  }
  
  // Add the term
  sortedContent.push(`  ${term.original}${index < parsedTerms.length - 1 ? ',' : ''}`);
});

// Reconstruct the file
const newContent = header + sortedContent.join('\n') + footer;

// Write back to file
fs.writeFileSync(GLOSSARY_PATH, newContent, 'utf-8');

console.log('✅ Glossary sorted and saved!');
console.log(`📝 Total terms: ${terms.length}`);
console.log(`📑 Sections created: ${new Set(parsedTerms.map(t => {
  const fc = t.name[0].toUpperCase();
  return /[A-Z]/.test(fc) ? fc : t.name.split(' ')[0].substring(0, 3);
})).size}`);
