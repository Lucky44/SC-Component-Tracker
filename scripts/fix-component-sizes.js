#!/usr/bin/env node
/**
 * Fix component sizes in data.js by updating from extracted-ships.js
 * Only updates shields, powerPlants, coolers, and quantumDrive sizes
 */

const fs = require('fs');
const path = require('path');

// Load extracted ships
const extractedPath = path.join(__dirname, 'extracted-ships.js');
const extractedContent = fs.readFileSync(extractedPath, 'utf8');

// Parse EXTRACTED_SHIPS array
const match = extractedContent.match(/const EXTRACTED_SHIPS = (\[[\s\S]*?\]);/);
if (!match) {
    console.error('Could not parse extracted-ships.js');
    process.exit(1);
}

const extractedShips = eval(match[1]);
console.log(`Loaded ${extractedShips.length} ships from extracted-ships.js`);

// Create a map by name for quick lookup
const extractedMap = new Map();
for (const ship of extractedShips) {
    extractedMap.set(ship.name, ship);
}

// Load data.js
const dataJsPath = path.join(__dirname, '..', 'data.js');
let dataJsContent = fs.readFileSync(dataJsPath, 'utf8');

let fixedCount = 0;
let notFoundCount = 0;

// Find all ship entries in data.js and update their component sizes
// Pattern matches ship objects in the ships array
const shipPattern = /(\s+\{\s*\n\s+name:\s*"([^"]+)",[\s\S]*?quantumDrive:\s*\{\s*size:\s*)(\d+)(\s*\}[\s\n]*\})/g;

dataJsContent = dataJsContent.replace(shipPattern, (match, prefix, shipName, qdSize, suffix) => {
    const extracted = extractedMap.get(shipName);
    if (!extracted) {
        // Try without manufacturer prefix
        const shortName = shipName.replace(/^(Aegis|Anvil|Aopoa|Argo|Banu|CNOU|Crusader|Drake|Esperia|Gatac|Greycat|Kruger|MISC|Mirai|Origin|RSI|Tumbril|Vanduul)\s+/, '');
        if (!extractedMap.has(shortName)) {
            notFoundCount++;
            return match;
        }
    }

    const ship = extracted || extractedMap.get(shipName.replace(/^(Aegis|Anvil|Aopoa|Argo|Banu|CNOU|Crusader|Drake|Esperia|Gatac|Greycat|Kruger|MISC|Mirai|Origin|RSI|Tumbril|Vanduul)\s+/, ''));
    if (!ship) return match;

    // Check if any sizes need fixing
    let updated = match;

    // Update shields size
    const shieldsMatch = updated.match(/shields:\s*\{\s*count:\s*(\d+),\s*size:\s*(\d+)\s*\}/);
    if (shieldsMatch && parseInt(shieldsMatch[2]) === 0 && ship.shields.size > 0) {
        updated = updated.replace(
            /shields:\s*\{\s*count:\s*(\d+),\s*size:\s*0\s*\}/,
            `shields: { count: ${shieldsMatch[1]}, size: ${ship.shields.size} }`
        );
        fixedCount++;
    }

    // Update powerPlants size
    const powerMatch = updated.match(/powerPlants:\s*\{\s*count:\s*(\d+),\s*size:\s*(\d+)\s*\}/);
    if (powerMatch && parseInt(powerMatch[2]) === 0 && ship.powerPlants.size > 0) {
        updated = updated.replace(
            /powerPlants:\s*\{\s*count:\s*(\d+),\s*size:\s*0\s*\}/,
            `powerPlants: { count: ${powerMatch[1]}, size: ${ship.powerPlants.size} }`
        );
        fixedCount++;
    }

    // Update coolers size
    const coolersMatch = updated.match(/coolers:\s*\{\s*count:\s*(\d+),\s*size:\s*(\d+)\s*\}/);
    if (coolersMatch && parseInt(coolersMatch[2]) === 0 && ship.coolers.size > 0) {
        updated = updated.replace(
            /coolers:\s*\{\s*count:\s*(\d+),\s*size:\s*0\s*\}/,
            `coolers: { count: ${coolersMatch[1]}, size: ${ship.coolers.size} }`
        );
        fixedCount++;
    }

    // Update quantumDrive size
    const qdMatch = updated.match(/quantumDrive:\s*\{\s*size:\s*(\d+)\s*\}/);
    if (qdMatch && parseInt(qdMatch[1]) === 0 && ship.quantumDrive.size > 0) {
        updated = updated.replace(
            /quantumDrive:\s*\{\s*size:\s*0\s*\}/,
            `quantumDrive: { size: ${ship.quantumDrive.size} }`
        );
        fixedCount++;
    }

    return updated;
});

// Write updated file
fs.writeFileSync(dataJsPath, dataJsContent);

console.log(`\nFixed ${fixedCount} component size entries`);
console.log(`Ships not found in extracted data: ${notFoundCount}`);

// Verify specific ships
console.log('\nVerification:');
const testShips = ['L-21 Wolf', 'L-22 Alpha Wolf', 'RSI Perseus', 'RSI Polaris'];
for (const name of testShips) {
    const pattern = new RegExp(`name:\\s*"[^"]*${name}[^"]*"[\\s\\S]*?quantumDrive:\\s*\\{\\s*size:\\s*(\\d+)`);
    const match = dataJsContent.match(pattern);
    if (match) {
        // Get full ship block for display
        const fullPattern = new RegExp(`name:\\s*"([^"]*${name}[^"]*)"[\\s\\S]*?shields:\\s*\\{[^}]+\\}[\\s\\S]*?powerPlants:\\s*\\{[^}]+\\}[\\s\\S]*?coolers:\\s*\\{[^}]+\\}`);
        const fullMatch = dataJsContent.match(fullPattern);
        if (fullMatch) {
            console.log(`  ${fullMatch[1]}: found (QD size: ${match[1]})`);
        }
    }
}
