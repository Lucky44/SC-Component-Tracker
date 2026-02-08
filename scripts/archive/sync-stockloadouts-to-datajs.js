#!/usr/bin/env node
/**
 * Sync stock loadouts from new-stockloadouts.js into data.js
 * Replaces the entire stockLoadouts section with the new data
 */

const fs = require('fs');
const path = require('path');

// Paths
const dataJsPath = path.join(__dirname, '..', 'data.js');
const newLoadoutsPath = path.join(__dirname, 'new-stockloadouts.js');

// Read files
let dataJsContent = fs.readFileSync(dataJsPath, 'utf8');
const newLoadoutsContent = fs.readFileSync(newLoadoutsPath, 'utf8');

// Extract the stockLoadouts object from new-stockloadouts.js
// It starts with "SC_DATA.stockLoadouts = {" and ends with "};"
const loadoutsMatch = newLoadoutsContent.match(/SC_DATA\.stockLoadouts\s*=\s*(\{[\s\S]*\});?\s*$/);
if (!loadoutsMatch) {
    console.error('Could not parse new-stockloadouts.js');
    process.exit(1);
}

const newLoadoutsObj = loadoutsMatch[1];

// Find the stockLoadouts section in data.js
// Pattern: SC_DATA.stockLoadouts = { ... };
const stockLoadoutsStart = dataJsContent.indexOf('SC_DATA.stockLoadouts');
if (stockLoadoutsStart === -1) {
    console.error('Could not find SC_DATA.stockLoadouts in data.js');
    process.exit(1);
}

// Find the end of the stockLoadouts object
// We need to match balanced braces
let braceCount = 0;
let inObject = false;
let endPos = stockLoadoutsStart;

for (let i = stockLoadoutsStart; i < dataJsContent.length; i++) {
    const char = dataJsContent[i];
    if (char === '{') {
        braceCount++;
        inObject = true;
    } else if (char === '}') {
        braceCount--;
        if (inObject && braceCount === 0) {
            endPos = i + 1;
            // Include trailing semicolon if present
            if (dataJsContent[i + 1] === ';') {
                endPos = i + 2;
            }
            break;
        }
    }
}

// Count loadouts in old vs new
const oldLoadoutsSection = dataJsContent.slice(stockLoadoutsStart, endPos);
const oldCount = (oldLoadoutsSection.match(/"[^"]+"\s*:\s*\{/g) || []).length;
const newCount = (newLoadoutsObj.match(/"[^"]+"\s*:\s*\{/g) || []).length;

console.log(`Old stockLoadouts entries: ${oldCount}`);
console.log(`New stockLoadouts entries: ${newCount}`);

// Replace the stockLoadouts section
const newSection = `SC_DATA.stockLoadouts = ${newLoadoutsObj};`;
dataJsContent = dataJsContent.slice(0, stockLoadoutsStart) +
    newSection +
    dataJsContent.slice(endPos);

// Write the updated file
fs.writeFileSync(dataJsPath, dataJsContent);
console.log('\ndata.js updated with new stockLoadouts!');

// Verify a few key ships
const testShips = ['Anvil Hurricane', 'RSI Hammerhead', 'Drake Caterpillar'];
console.log('\nVerification (turretWeapons counts):');
for (const ship of testShips) {
    const pattern = new RegExp(`"${ship}"[\\s\\S]*?turretWeapons:\\s*\\[([^\\]]*?)\\]`);
    const match = dataJsContent.match(pattern);
    if (match) {
        const weapons = match[1].split(',').filter(w => w.trim()).length;
        console.log(`  ${ship}: ${weapons} turret weapons`);
    }
}
