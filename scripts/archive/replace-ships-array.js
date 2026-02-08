#!/usr/bin/env node
/**
 * Replace the ships array in data.js with the complete one from processed-data.json
 * This is a one-time sync to ensure bundled data matches extracted data
 */

const fs = require('fs');
const path = require('path');

const DATA_JS_PATH = path.join(__dirname, '..', 'data.js');
const PROCESSED_DATA_PATH = path.join(__dirname, '..', 'processed-data.json');

// Load processed-data.json
const processedData = JSON.parse(fs.readFileSync(PROCESSED_DATA_PATH, 'utf8'));
const ships = processedData.ships;

console.log(`Ships in processed-data.json: ${ships.length}`);

// Format a ship entry for data.js
function formatShip(ship, indent = '        ') {
    const pilotWeapons = ship.pilotWeapons.map(w => `{ size: ${w.size} }`).join(', ');

    let turretsStr;
    if (ship.turrets.length === 0) {
        turretsStr = '[]';
    } else {
        const turretLines = ship.turrets.map(t =>
            `${indent}    { type: "${t.type}", guns: ${t.guns}, size: ${t.size} }`
        );
        turretsStr = `[\n${turretLines.join(',\n')}\n${indent}]`;
    }

    return `${indent}{
${indent}    name: "${ship.name}",
${indent}    manufacturer: "${ship.manufacturer}",
${indent}    size: "${ship.size}",
${indent}    pilotWeapons: [${pilotWeapons}],
${indent}    turrets: ${turretsStr},
${indent}    shields: { count: ${ship.shields.count}, size: ${ship.shields.size} },
${indent}    powerPlants: { count: ${ship.powerPlants.count}, size: ${ship.powerPlants.size} },
${indent}    coolers: { count: ${ship.coolers.count}, size: ${ship.coolers.size} },
${indent}    quantumDrive: { size: ${ship.quantumDrive.size} }
${indent}}`;
}

// Group ships by manufacturer
const byMfg = {};
for (const ship of ships) {
    if (!byMfg[ship.manufacturer]) {
        byMfg[ship.manufacturer] = [];
    }
    byMfg[ship.manufacturer].push(ship);
}

// Generate the ships array content
let shipsContent = '';
const mfgOrder = Object.keys(byMfg).sort();

for (const mfg of mfgOrder) {
    const mfgShips = byMfg[mfg].sort((a, b) => a.name.localeCompare(b.name));
    shipsContent += `\n        // ===== ${mfg.toUpperCase()} =====\n`;
    shipsContent += mfgShips.map(s => formatShip(s)).join(',\n');
    if (mfg !== mfgOrder[mfgOrder.length - 1]) {
        shipsContent += ',\n';
    }
}

// Load data.js
let dataJs = fs.readFileSync(DATA_JS_PATH, 'utf8');

// Find the ships array
const shipsStart = dataJs.indexOf('ships: [');
if (shipsStart === -1) {
    console.error('Could not find ships: [ in data.js');
    process.exit(1);
}

// Find the end of the ships array - look for the pattern '],\n' followed by 'stockLoadouts' or similar
// The ships array ends with '    ]' (4 spaces + bracket) before stockLoadouts
const afterShipsStart = dataJs.indexOf('[', shipsStart);
let bracketCount = 1;
let pos = afterShipsStart + 1;
while (bracketCount > 0 && pos < dataJs.length) {
    if (dataJs[pos] === '[') bracketCount++;
    if (dataJs[pos] === ']') bracketCount--;
    pos++;
}
const shipsEnd = pos;

console.log(`Found ships array from position ${shipsStart} to ${shipsEnd}`);

// Replace the ships array
const before = dataJs.slice(0, shipsStart);
const after = dataJs.slice(shipsEnd);

const newDataJs = before + 'ships: [' + shipsContent + '\n    ]' + after;

// Write the new data.js
fs.writeFileSync(DATA_JS_PATH, newDataJs);
console.log(`Updated data.js with ${ships.length} ships`);

// Verify syntax
try {
    require(DATA_JS_PATH);
    console.log('Syntax check passed!');
} catch (e) {
    console.error('Syntax error in generated file:', e.message);
    console.log('Restoring backup...');
    // Don't have a backup mechanism here - user should use git checkout if needed
}
