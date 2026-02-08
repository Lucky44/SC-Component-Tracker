const fs = require('fs');

// Mock window
global.window = {};

// Load data
const dataContent = fs.readFileSync('./data.js', 'utf8');
eval(dataContent);

const SC_DATA = global.window.SC_DATA;
const ships = SC_DATA.ships;
const stockLoadouts = SC_DATA.stockLoadouts;
const weapons = SC_DATA.weapons;
const shields = SC_DATA.shields;
const coolers = SC_DATA.coolers;
const powerPlants = SC_DATA.powerPlants;
const quantumDrives = SC_DATA.quantumDrives;

// Helper to find component by name (case insensitive)
function findComponent(collection, name) {
    if (!name) return null;
    const lowerName = name.toLowerCase();
    return collection.find(c => c.name && c.name.toLowerCase() === lowerName);
}

function findWeaponByName(name) {
    if (!name) return null;
    const lowerName = name.toLowerCase();
    for (const size in weapons) {
        const found = weapons[size].find(w => w.name && w.name.toLowerCase() === lowerName);
        if (found) return { ...found, size: parseInt(size, 10) };
    }
    return null;
}

function findWeaponBySize(size, type = "repeater") {
    const weaponsOfSize = weapons[size] || [];
    // Try to find a common default weapon for this size
    const commonDefaults = {
        1: "CF-117 Bulldog Repeater",
        2: "CF-227 Badger Repeater",
        3: "CF-337 Panther Repeater",
        4: "CF-447 Rhino Repeater",
        5: "CF-557 Galdereen Repeater"
    };
    const defaultName = commonDefaults[size];
    if (defaultName) {
        const found = weaponsOfSize.find(w => w.name === defaultName);
        if (found) return found.name;
    }
    // Fallback to first weapon of that size
    return weaponsOfSize[0]?.name || "";
}

console.log('Generating fixes...\n');

const fixes = [];

ships.forEach(ship => {
    const shipName = ship.name;
    const stock = stockLoadouts[shipName];
    
    if (!stock) return;

    const shipFixes = {
        shipName,
        pilotWeapons: null,
        turretWeapons: null,
        shields: null,
        coolers: null,
        powerPlants: null,
        quantumDrives: null
    };

    // Fix pilot weapons
    if (ship.pilotWeapons && ship.pilotWeapons.length > 0) {
        const stockPilot = stock.pilotWeapons || [];
        const fixedPilot = [];
        let needsFix = false;
        
        ship.pilotWeapons.forEach((hardpoint, i) => {
            const weaponName = stockPilot[i];
            if (weaponName) {
                const weapon = findWeaponByName(weaponName);
                if (!weapon || weapon.size !== hardpoint.size) {
                    // Find a suitable replacement
                    const replacement = findWeaponBySize(hardpoint.size);
                    fixedPilot.push(replacement);
                    needsFix = true;
                    console.log(`  ${shipName}: pilot[${i}] ${weaponName || '(empty)'} → ${replacement} (hardpoint S${hardpoint.size})`);
                } else {
                    fixedPilot.push(weaponName);
                }
            } else {
                fixedPilot.push("");
            }
        });
        
        if (needsFix) {
            shipFixes.pilotWeapons = fixedPilot;
        }
    }

    // Fix turret weapons
    if (ship.turrets && ship.turrets.length > 0) {
        const stockTurret = stock.turretWeapons || [];
        const fixedTurret = [];
        let needsFix = false;
        
        ship.turrets.forEach((turret, i) => {
            const weaponName = stockTurret[i];
            if (weaponName) {
                const weapon = findWeaponByName(weaponName);
                if (!weapon || weapon.size !== turret.size) {
                    // Find a suitable replacement
                    const replacement = findWeaponBySize(turret.size);
                    fixedTurret.push(replacement);
                    needsFix = true;
                    console.log(`  ${shipName}: turret[${i}] ${weaponName || '(empty)'} → ${replacement} (mount S${turret.size})`);
                } else {
                    fixedTurret.push(weaponName);
                }
            } else {
                fixedTurret.push("");
            }
        });
        
        if (needsFix) {
            shipFixes.turretWeapons = fixedTurret;
        }
    }

    // Check if any fixes needed
    if (Object.values(shipFixes).some(v => v !== null)) {
        fixes.push(shipFixes);
    }
});

console.log(`\nTotal ships needing fixes: ${fixes.length}`);

// Generate output that can be used to update data.js
console.log('\n=== STOCKLOADOUT FIXES ===\n');
fixes.forEach(fix => {
    console.log(`"${fix.shipName}": {`);
    if (fix.pilotWeapons) {
        console.log(`  pilotWeapons: ${JSON.stringify(fix.pilotWeapons)},`);
    }
    if (fix.turretWeapons) {
        console.log(`  turretWeapons: ${JSON.stringify(fix.turretWeapons)},`);
    }
    console.log(`},\n`);
});
