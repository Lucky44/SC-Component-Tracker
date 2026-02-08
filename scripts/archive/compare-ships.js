#!/usr/bin/env node
/**
 * Compare ships in data.js vs processed-data.json
 */

const fs = require('fs');
const path = require('path');

// Load data.js
const dataJsPath = path.join(__dirname, '..', 'data.js');
const dataJsContent = fs.readFileSync(dataJsPath, 'utf8');

// Extract ship names from data.js - look for ship objects with name/manufacturer pattern
const shipNames = [];

// Find the ships array section
const shipsStart = dataJsContent.indexOf('ships: [');
if (shipsStart === -1) {
    console.error('Could not find ships array in data.js');
    process.exit(1);
}

// Extract ship objects - they have both name and manufacturer at the same indent level
// Match pattern: name: "...", followed by manufacturer: "..." on next line
// Handle names with apostrophes by matching double-quoted strings specifically
const shipsSection = dataJsContent.slice(shipsStart);
const shipObjRegex = /name:\s*"([^"]+)",\s*\n\s*manufacturer:/g;
let match;
while ((match = shipObjRegex.exec(shipsSection)) !== null) {
    shipNames.push(match[1]);
}

console.log(`Ships in data.js: ${shipNames.length}`);

// Load processed-data.json
const processedPath = path.join(__dirname, '..', 'processed-data.json');
const processedData = JSON.parse(fs.readFileSync(processedPath, 'utf8'));
const processedShipNames = processedData.ships.map(s => s.name);

console.log(`Ships in processed-data.json: ${processedShipNames.length}`);

// Sort for easier comparison
shipNames.sort();
processedShipNames.sort();

// Find differences
const inDataJsOnly = shipNames.filter(n => !processedShipNames.includes(n));
const inProcessedOnly = processedShipNames.filter(n => !shipNames.includes(n));

console.log('\n--- Ships in data.js but NOT in processed-data.json ---');
if (inDataJsOnly.length === 0) {
    console.log('(none)');
} else {
    inDataJsOnly.forEach(n => console.log(`  - ${n}`));
}

console.log('\n--- Ships in processed-data.json but NOT in data.js ---');
if (inProcessedOnly.length === 0) {
    console.log('(none)');
} else {
    inProcessedOnly.forEach(n => console.log(`  - ${n}`));
}

console.log('\n--- Summary ---');
if (inDataJsOnly.length === 0 && inProcessedOnly.length === 0) {
    console.log('The ship lists match exactly!');
} else {
    console.log(`Differences found: ${inDataJsOnly.length} only in data.js, ${inProcessedOnly.length} only in processed-data.json`);
}
