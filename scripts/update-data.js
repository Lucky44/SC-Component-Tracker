#!/usr/bin/env node
/**
 * Update data.js with extracted ship specs
 * Replaces the ships array in data.js with extracted data
 */

const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data.js');
const EXTRACTED_PATH = path.join(__dirname, 'extracted-ships.js');

// Read extracted ships
const extractedContent = fs.readFileSync(EXTRACTED_PATH, 'utf8');
const extractedMatch = extractedContent.match(/const EXTRACTED_SHIPS = (\[[\s\S]*?\]);/);
if (!extractedMatch) {
    console.error('Could not find EXTRACTED_SHIPS array');
    process.exit(1);
}

// Parse the ships array
const ships = JSON.parse(extractedMatch[1]);
console.log(`Loaded ${ships.length} ships from extracted data`);

// Format ships array for insertion (with proper indentation)
const shipsJson = JSON.stringify(ships, null, 4)
    .split('\n')
    .map((line, i) => i === 0 ? line : '        ' + line) // Indent for nested position
    .join('\n');

// Read data.js
let dataContent = fs.readFileSync(DATA_PATH, 'utf8');

// Find the ships array - it starts after "ships: [" and ends before "],"
const shipsStart = dataContent.indexOf('ships: [');
if (shipsStart === -1) {
    console.error('Could not find ships array start');
    process.exit(1);
}

// Find the closing bracket of the ships array
// We need to find the "]," that closes the ships array
// Count brackets to find the matching close
let bracketCount = 0;
let inArray = false;
let arrayEnd = -1;
for (let i = shipsStart; i < dataContent.length; i++) {
    if (dataContent[i] === '[') {
        if (!inArray) inArray = true;
        bracketCount++;
    } else if (dataContent[i] === ']') {
        bracketCount--;
        if (inArray && bracketCount === 0) {
            arrayEnd = i;
            break;
        }
    }
}

if (arrayEnd === -1) {
    console.error('Could not find ships array end');
    process.exit(1);
}

// Replace the ships array content
const before = dataContent.substring(0, shipsStart + 'ships: '.length);
const after = dataContent.substring(arrayEnd + 1);

const newDataContent = before + shipsJson + after;

// Write back
fs.writeFileSync(DATA_PATH, newDataContent);
console.log('data.js updated with extracted ship specs');

// Verify
const testContent = fs.readFileSync(DATA_PATH, 'utf8');
if (testContent.includes('EXTRACTED_SHIPS')) {
    console.error('ERROR: Unexpected EXTRACTED_SHIPS reference in output');
} else if (!testContent.includes('"name": "Aegis')) {
    console.error('ERROR: Ships data not properly inserted');
} else {
    console.log('Verification passed');
}
