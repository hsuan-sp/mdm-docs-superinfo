const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../docs/data');
const guideDir = path.join(__dirname, '../docs/guide');
const glossaryFile = path.join(__dirname, '../docs/glossary.md');

// Map of Q&A TS filename to MD filename
const qaMap = {
    '01-account.ts': '01-account.md',
    '02-enrollment.ts': '02-enrollment.md',
    '03-apps.ts': '03-apps.md',
    '04-classroom.ts': '04-classroom.md',
    '05-digital-learning.ts': '05-digital-learning.md',
    '06-hardware.ts': '06-hardware.md',
    '07-mac.ts': '07-mac.md',
    '08-qa-education.ts': '08-education.md'
};

function updateFileIndex(mdPath, keywords) {
    if (!fs.existsSync(mdPath)) {
        console.warn(`Warning: Markdown file not found at ${mdPath}`);
        return;
    }

    let mdContent = fs.readFileSync(mdPath, 'utf-8');
    
    // Remove existing hidden index if any
    mdContent = mdContent.replace(/<!-- SEARCH_INDEX_START -->[\s\S]*<!-- SEARCH_INDEX_END -->/, '');
    
    // Append new hidden index
    // Using a hidden div ensures VitePress search (MiniSearch) indexes the text content
    const injection = `\n<!-- SEARCH_INDEX_START -->\n<div style="display: none">\n${keywords}\n</div>\n<!-- SEARCH_INDEX_END -->`;
    
    fs.writeFileSync(mdPath, mdContent + injection);
    console.log(`Updated search index for: ${path.basename(mdPath)}`);
}

function processQA() {
    console.log('--- Processing Q&A ---');
    Object.keys(qaMap).forEach(tsFile => {
        const tsPath = path.join(dataDir, tsFile);
        if (!fs.existsSync(tsPath)) return;

        const content = fs.readFileSync(tsPath, 'utf-8');
        
        // Extract questions and answers using regex
        // Note: This regex assumes standard formatting in the TS files
        const questions = [];
        const answers = [];
        const tags = [];
        
        const qMatches = content.matchAll(/question:\s*["'`](.*?)["'`]/g);
        for (const m of qMatches) questions.push(m[1]);
        
        const aMatches = content.matchAll(/answer:\s*["'`]((?:.|[\r\n])*?)["'`]\s*(?:,|})/g);
        for (const m of aMatches) answers.push(m[1]);

        const tMatches = content.matchAll(/tags:\s*\[(.*?)\]/g);
        for (const m of tMatches) tags.push(m[1].replace(/['"]/g, ''));

        // Combine all text for indexing
        const keywords = [
            ...questions, 
            ...answers, 
            ...tags
        ].join(' ')
         .replace(/[\r\n]+/g, ' ') // Remove newlines
         .replace(/\s+/g, ' ');     // Collapse spaces

        updateFileIndex(path.join(guideDir, qaMap[tsFile]), keywords);
    });
}

function processGlossary() {
    console.log('--- Processing Glossary ---');
    const tsPath = path.join(dataDir, 'glossary.ts');
    if (!fs.existsSync(tsPath)) {
        console.error('Glossary data file not found!');
        return;
    }

    const content = fs.readFileSync(tsPath, 'utf-8');
    
    const terms = [];
    const definitions = [];
    const analogies = [];

    // Simple regex extraction for glossary structure
    const termMatches = content.matchAll(/term:\s*['"`](.*?)['"`]/g);
    for (const m of termMatches) terms.push(m[1]);

    const defMatches = content.matchAll(/definition:\s*['"`](.*?)['"`]/g);
    for (const m of defMatches) definitions.push(m[1]);

    const analogyMatches = content.matchAll(/analogy:\s*['"`](.*?)['"`]/g);
    for (const m of analogyMatches) analogies.push(m[1]);

    const keywords = [
        ...terms,
        ...definitions,
        ...analogies
    ].join(' ')
     .replace(/[\r\n]+/g, ' ')
     .replace(/\s+/g, ' ');

    updateFileIndex(glossaryFile, keywords);
}

// Main execution
try {
    processQA();
    processGlossary();
    console.log('Search index update complete.');
} catch (error) {
    console.error('Error updating search index:', error);
    process.exit(1);
}
