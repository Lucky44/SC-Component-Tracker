#!/usr/bin/env node
/**
 * Fix ship name mismatches in data.js
 * Renames ships to match ships.json naming conventions
 */

const fs = require('fs');
const path = require('path');

const dataJsPath = path.join(__dirname, '..', 'data.js');

// Ship name mappings: old name -> new name
const NAME_FIXES = {
    // Ares fighters
    'Crusader Ares Inferno': 'Crusader Ares Star Fighter Inferno',
    'Crusader Ares Ion': 'Crusader Ares Star Fighter Ion',

    // Spirit ships (word order)
    'Crusader Spirit A1': 'Crusader A1 Spirit',
    'Crusader Spirit C1': 'Crusader C1 Spirit',

    // Kruger ships (missing manufacturer prefix)
    'L-21 Wolf': 'Kruger L-21 Wolf',
    'L-22 Alpha Wolf': 'Kruger L-22 Alpha Wolf',
    'P-52 Merlin': 'Kruger P-52 Merlin',
    'P-72 Archimedes': 'Kruger P-72 Archimedes',

    // Origin M50
    'Origin M50': 'Origin M50 Interceptor',
};

console.log('Ship Name Fixer\n');
console.log('Mappings to apply:');
Object.entries(NAME_FIXES).forEach(([old, newName]) => {
    console.log(`  "${old}" -> "${newName}"`);
});

// Read data.js
let content = fs.readFileSync(dataJsPath, 'utf8');

let fixCount = 0;

// Apply fixes
Object.entries(NAME_FIXES).forEach(([oldName, newName]) => {
    // Fix in ships array (name: "...")
    const shipPattern = new RegExp(`name:\\s*"${oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g');
    const shipMatches = content.match(shipPattern);
    if (shipMatches) {
        content = content.replace(shipPattern, `name: "${newName}"`);
        console.log(`\n✓ Fixed ship spec: "${oldName}" (${shipMatches.length} occurrence(s))`);
        fixCount += shipMatches.length;
    }

    // Fix in stockLoadouts (as key)
    const loadoutPattern = new RegExp(`"${oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"\\s*:`, 'g');
    const loadoutMatches = content.match(loadoutPattern);
    if (loadoutMatches) {
        content = content.replace(loadoutPattern, `"${newName}":`);
        console.log(`✓ Fixed stock loadout key: "${oldName}" (${loadoutMatches.length} occurrence(s))`);
        fixCount += loadoutMatches.length;
    }
});

if (fixCount > 0) {
    // Write updated content
    fs.writeFileSync(dataJsPath, content);
    console.log(`\n✓ Applied ${fixCount} fixes to data.js`);
} else {
    console.log('\nNo fixes needed - all names already correct');
}

// Verify
console.log('\nVerifying fixes...');
const verifyContent = fs.readFileSync(dataJsPath, 'utf8');
let remaining = 0;
Object.keys(NAME_FIXES).forEach(oldName => {
    if (verifyContent.includes(`"${oldName}"`)) {
        console.log(`  ✗ Still found: "${oldName}"`);
        remaining++;
    }
});

if (remaining === 0) {
    console.log('  ✓ All old names have been replaced');
}
