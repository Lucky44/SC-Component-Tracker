const fs = require('fs');

// Load the fixes
const fixes = JSON.parse(fs.readFileSync('./scripts/weapon_fixes.json', 'utf8'));

// Load data.js
let dataContent = fs.readFileSync('./data.js', 'utf8');

// Function to escape special regex characters
function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Function to safely create JSON array string
function jsonArray(arr) {
    return '[' + arr.map(item => JSON.stringify(item)).join(',') + ']';
}

console.log(`Applying fixes to ${Object.keys(fixes).length} ships...\n`);

let totalChanges = 0;

// Apply each fix
for (const [shipName, shipFixes] of Object.entries(fixes)) {
    // Find the ship's stockLoadout section
    const escapedShipName = escapeRegex(shipName);
    const regex = new RegExp(
        `("${escapedShipName}":\\s*\\{[^}]*?)(pilotWeapons:\\s*\\[[^\\]]*?\\]|turretWeapons:\\s*\\[[^\\]]*?\\])([^}]*?\\})`,
        'g'
    );
    
    // This approach is too fragile. Let me use a line-by-line approach instead.
}

// Better approach: Parse and rebuild the stockLoadouts section
const stockLoadoutsStart = dataContent.indexOf('SC_DATA.stockLoadouts = {');
const stockLoadoutsEnd = dataContent.indexOf('};', stockLoadoutsStart) + 2;

const beforeStockLoadouts = dataContent.substring(0, stockLoadoutsStart);
const afterStockLoadouts = dataContent.substring(stockLoadoutsEnd);

// Extract and parse stockLoadouts
const stockLoadoutsText = dataContent.substring(stockLoadoutsStart, stockLoadoutsEnd);

// Mock window for eval
global.window = {};
eval(beforeStockLoadouts + stockLoadoutsText + '\nwindow.SC_DATA = SC_DATA;');
const stockLoadouts = global.window.SC_DATA.stockLoadouts;

// Apply fixes
for (const [shipName, shipFixes] of Object.entries(fixes)) {
    if (!stockLoadouts[shipName]) {
        console.log(`Warning: Ship "${shipName}" not found in stockLoadouts`);
        continue;
    }
    
    if (shipFixes.pilotWeapons) {
        stockLoadouts[shipName].pilotWeapons = shipFixes.pilotWeapons;
        console.log(`  Fixed ${shipName}: pilotWeapons`);
        totalChanges++;
    }
    
    if (shipFixes.turretWeapons) {
        stockLoadouts[shipName].turretWeapons = shipFixes.turretWeapons;
        console.log(`  Fixed ${shipName}: turretWeapons`);
        totalChanges++;
    }
}

// Rebuild stockLoadouts section
let newStockLoadouts = 'SC_DATA.stockLoadouts = {\n';
const shipNames = Object.keys(stockLoadouts);
shipNames.forEach((shipName, index) => {
    const stock = stockLoadouts[shipName];
    newStockLoadouts += `    "${shipName}": {\n`;
    
    if (stock.quantumDrives) newStockLoadouts += `        quantumDrives: ${JSON.stringify(stock.quantumDrives)},\n`;
    if (stock.powerPlants) newStockLoadouts += `        powerPlants: ${JSON.stringify(stock.powerPlants)},\n`;
    if (stock.coolers) newStockLoadouts += `        coolers: ${JSON.stringify(stock.coolers)},\n`;
    if (stock.shields) newStockLoadouts += `        shields: ${JSON.stringify(stock.shields)},\n`;
    if (stock.pilotWeapons) newStockLoadouts += `        pilotWeapons: ${JSON.stringify(stock.pilotWeapons)},\n`;
    if (stock.turretWeapons) {
        // Special handling for turretWeapons - can be array
        if (Array.isArray(stock.turretWeapons) && stock.turretWeapons.length > 4) {
            // Multi-line for readability
            newStockLoadouts += `        turretWeapons: [\n`;
            stock.turretWeapons.forEach((weapon, i) => {
                newStockLoadouts += `            ${JSON.stringify(weapon)}`;
                if (i < stock.turretWeapons.length - 1) newStockLoadouts += ',';
                newStockLoadouts += '\n';
            });
            newStockLoadouts += `        ]\n`;
        } else {
            newStockLoadouts += `        turretWeapons: ${JSON.stringify(stock.turretWeapons)}\n`;
        }
    } else {
        // Remove trailing comma from last property
        newStockLoadouts = newStockLoadouts.replace(/,\n$/, '\n');
    }
    
    newStockLoadouts += `    }`;
    if (index < shipNames.length - 1) newStockLoadouts += ',';
    newStockLoadouts += '\n';
});
newStockLoadouts += '};\n';

// Rebuild the file
const newContent = beforeStockLoadouts + newStockLoadouts + afterStockLoadouts;

// Write back
fs.writeFileSync('./data.js', newContent, 'utf8');

console.log(`\n✅ Applied ${totalChanges} changes to data.js`);
console.log(`Updated ${Object.keys(fixes).length} ships`);
