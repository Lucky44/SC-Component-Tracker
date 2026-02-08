#!/usr/bin/env node
/**
 * Validate Extracted Ship Data
 *
 * Checks for inconsistencies between ship specs (hardpoints) and stock loadouts.
 * Run after extract-ships.js and extract-loadouts.js to catch issues.
 *
 * Usage: node scripts/validate-extraction.js
 */

const fs = require('fs');
const path = require('path');

// Load extracted data
const SHIPS_PATH = path.join(__dirname, 'extracted-ships.js');
const LOADOUTS_PATH = path.join(__dirname, 'extracted-loadouts.js');

function loadExtracted(filePath, varName) {
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(new RegExp(`const ${varName} = ([\\s\\S]*?);\\s*\\/\\/ Export`));
    if (!match) {
        console.error(`Could not find ${varName} in ${filePath}`);
        process.exit(1);
    }
    return JSON.parse(match[1]);
}

const ships = loadExtracted(SHIPS_PATH, 'EXTRACTED_SHIPS');
const loadouts = loadExtracted(LOADOUTS_PATH, 'EXTRACTED_LOADOUTS');

console.log('=== Ship Data Validation ===\n');
console.log(`Ships with hardpoints: ${ships.length}`);
console.log(`Ships with loadouts: ${Object.keys(loadouts).length}\n`);

let issues = [];

// Check 1: Ships with pilot weapon hardpoints but no/empty stock pilot weapons
console.log('--- Checking pilot weapon consistency ---');
for (const ship of ships) {
    const loadout = loadouts[ship.name];
    if (!loadout) continue;

    const hardpointCount = ship.pilotWeapons.length;
    const stockCount = loadout.pilotWeapons?.length || 0;

    // Flag: Has hardpoints but no stock weapons
    if (hardpointCount > 0 && stockCount === 0) {
        issues.push({
            type: 'PILOT_WEAPONS_MISSING',
            ship: ship.name,
            message: `Has ${hardpointCount} pilot weapon hardpoints but 0 stock weapons`
        });
    }

    // Flag: Has stock weapons but no hardpoints (might be turret weapons miscategorized)
    if (hardpointCount === 0 && stockCount > 0) {
        issues.push({
            type: 'PILOT_WEAPONS_NO_HARDPOINTS',
            ship: ship.name,
            message: `Has ${stockCount} stock pilot weapons but 0 hardpoints - may be turret weapons`
        });
    }
}

// Check 2: Ships with turrets but no/empty stock turret weapons
console.log('--- Checking turret weapon consistency ---');
for (const ship of ships) {
    const loadout = loadouts[ship.name];
    if (!loadout) continue;

    const turretCount = ship.turrets.length;
    const expectedGuns = ship.turrets.reduce((sum, t) => sum + t.guns, 0);
    const stockCount = loadout.turretWeapons?.length || 0;

    // Flag: Has turrets but no stock turret weapons
    if (turretCount > 0 && stockCount === 0) {
        issues.push({
            type: 'TURRET_WEAPONS_MISSING',
            ship: ship.name,
            message: `Has ${turretCount} turrets (${expectedGuns} guns) but 0 stock turret weapons`
        });
    }
}

// Check 3: Ships with 0 pilot weapons AND 0 turrets (might be missing data)
console.log('--- Checking for ships with no weapons ---');
for (const ship of ships) {
    if (ship.pilotWeapons.length === 0 && ship.turrets.length === 0) {
        // This might be intentional (cargo ships, etc.) but worth flagging
        issues.push({
            type: 'NO_WEAPONS',
            ship: ship.name,
            message: `Has no pilot weapons and no turrets - verify this is correct`
        });
    }
}

// Check 4: Ships with very high weapon counts (possible double-counting)
console.log('--- Checking for unusual weapon counts ---');
for (const ship of ships) {
    const loadout = loadouts[ship.name];
    if (!loadout) continue;

    const totalHardpoints = ship.pilotWeapons.length +
        ship.turrets.reduce((sum, t) => sum + t.guns, 0);
    const totalStock = (loadout.pilotWeapons?.length || 0) +
        (loadout.turretWeapons?.length || 0);

    // Flag if stock count is way higher than hardpoints (possible duplicate extraction)
    if (totalStock > totalHardpoints * 2 && totalStock > 10) {
        issues.push({
            type: 'WEAPON_COUNT_MISMATCH',
            ship: ship.name,
            message: `Has ${totalHardpoints} hardpoints but ${totalStock} stock weapons - possible duplication`
        });
    }
}

// Check 5: Ships in loadouts but not in ships array (variants should be here)
console.log('--- Checking for variant coverage ---');
const shipNames = new Set(ships.map(s => s.name));
let variantCount = 0;
for (const name of Object.keys(loadouts)) {
    if (!shipNames.has(name)) {
        // This is a variant - check if base ship exists
        let hasBase = false;
        for (const baseName of shipNames) {
            if (name.startsWith(baseName + ' ')) {
                hasBase = true;
                break;
            }
        }
        if (!hasBase) {
            issues.push({
                type: 'NO_BASE_SHIP',
                ship: name,
                message: `In loadouts but no matching base ship found in ships array`
            });
        } else {
            variantCount++;
        }
    }
}
console.log(`Found ${variantCount} variants with base ships\n`);

// Print issues
console.log('=== Issues Found ===\n');

if (issues.length === 0) {
    console.log('No issues found! All data looks consistent.\n');
} else {
    // Group by type
    const byType = {};
    for (const issue of issues) {
        if (!byType[issue.type]) byType[issue.type] = [];
        byType[issue.type].push(issue);
    }

    for (const [type, typeIssues] of Object.entries(byType)) {
        console.log(`${type} (${typeIssues.length} issues):`);
        for (const issue of typeIssues.slice(0, 10)) {
            console.log(`  - ${issue.ship}: ${issue.message}`);
        }
        if (typeIssues.length > 10) {
            console.log(`  ... and ${typeIssues.length - 10} more`);
        }
        console.log('');
    }

    console.log(`Total issues: ${issues.length}`);
}

// Summary
console.log('\n=== Summary ===');
console.log(`Ships validated: ${ships.length}`);
console.log(`Loadouts validated: ${Object.keys(loadouts).length}`);
console.log(`Issues found: ${issues.length}`);
console.log(`Variants detected: ${variantCount}`);
