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

// Find weapon by name (case insensitive)
function findWeaponByName(name) {
    if (!name) return null;
    const lowerName = name.toLowerCase();
    for (const size in weapons) {
        const found = weapons[size].find(w => w.name && w.name.toLowerCase() === lowerName);
        if (found) return { ...found, size: parseInt(size, 10) };
    }
    return null;
}

// Find suitable weapon for size
function findWeaponForSize(size) {
    const commonDefaults = {
        1: "CF-117 Bulldog Repeater",
        2: "CF-227 Badger Repeater",
        3: "CF-337 Panther Repeater",
        4: "CF-447 Rhino Repeater",
        5: "CF-557 Galdereen Repeater"
    };
    return commonDefaults[size] || (weapons[size] && weapons[size][0]?.name) || "";
}

// Try to fix weapon name
function fixWeaponName(weaponName, requiredSize) {
    if (!weaponName) return null;
    
    // Try exact match first
    const exact = findWeaponByName(weaponName);
    if (exact && exact.size === requiredSize) return weaponName;
    if (exact && exact.size !== requiredSize) return null; // Size mismatch, needs replacement
    
    // Try adding " Repeater"
    const withRepeater = findWeaponByName(weaponName + " Repeater");
    if (withRepeater && withRepeater.size === requiredSize) return weaponName + " Repeater";
    
    // Try adding " Cannon"
    const withCannon = findWeaponByName(weaponName + " Cannon");
    if (withCannon && withCannon.size === requiredSize) return weaponName + " Cannon";
    
    // Try adding " Ballistic Gatling"
    const withGatling = findWeaponByName(weaponName + " Ballistic Gatling");
    if (withGatling && withGatling.size === requiredSize) return weaponName + " Ballistic Gatling";
    
    return null;
}

console.log('Generating all fixes...\n');

const allFixes = {};

ships.forEach(ship => {
    const shipName = ship.name;
    const stock = stockLoadouts[shipName];
    
    if (!stock) return;

    let shipNeedsFix = false;
    const fixes = {
        pilotWeapons: null,
        turretWeapons: null
    };

    // Fix pilot weapons
    if (ship.pilotWeapons && ship.pilotWeapons.length > 0) {
        const stockPilot = stock.pilotWeapons || [];
        const fixedPilot = [];
        let needsFix = false;
        
        ship.pilotWeapons.forEach((hardpoint, i) => {
            const weaponName = stockPilot[i];
            if (!weaponName) {
                fixedPilot.push("");
                return;
            }
            
            const fixed = fixWeaponName(weaponName, hardpoint.size);
            if (fixed) {
                fixedPilot.push(fixed);
                if (fixed !== weaponName) {
                    console.log(`  ${shipName}: pilot[${i}] "${weaponName}" → "${fixed}"`);
                    needsFix = true;
                }
            } else {
                // Need to replace with correct size weapon
                const weapon = findWeaponByName(weaponName);
                if (!weapon) {
                    const replacement = findWeaponForSize(hardpoint.size);
                    console.log(`  ${shipName}: pilot[${i}] "${weaponName}" NOT FOUND → "${replacement}" (S${hardpoint.size})`);
                    fixedPilot.push(replacement);
                    needsFix = true;
                } else {
                    const replacement = findWeaponForSize(hardpoint.size);
                    console.log(`  ${shipName}: pilot[${i}] "${weaponName}" SIZE MISMATCH (S${weapon.size}→S${hardpoint.size}) → "${replacement}"`);
                    fixedPilot.push(replacement);
                    needsFix = true;
                }
            }
        });
        
        if (needsFix) {
            fixes.pilotWeapons = fixedPilot;
            shipNeedsFix = true;
        }
    }

    // Fix turret weapons
    if (ship.turrets && ship.turrets.length > 0) {
        const stockTurret = stock.turretWeapons || [];
        const fixedTurret = [];
        let needsFix = false;
        
        ship.turrets.forEach((turret, i) => {
            const weaponName = stockTurret[i];
            if (!weaponName) {
                fixedTurret.push("");
                return;
            }
            
            const fixed = fixWeaponName(weaponName, turret.size);
            if (fixed) {
                fixedTurret.push(fixed);
                if (fixed !== weaponName) {
                    console.log(`  ${shipName}: turret[${i}] "${weaponName}" → "${fixed}"`);
                    needsFix = true;
                }
            } else {
                // Need to replace with correct size weapon
                const weapon = findWeaponByName(weaponName);
                if (!weapon) {
                    const replacement = findWeaponForSize(turret.size);
                    console.log(`  ${shipName}: turret[${i}] "${weaponName}" NOT FOUND → "${replacement}" (S${turret.size})`);
                    fixedTurret.push(replacement);
                    needsFix = true;
                } else {
                    const replacement = findWeaponForSize(turret.size);
                    console.log(`  ${shipName}: turret[${i}] "${weaponName}" SIZE MISMATCH (S${weapon.size}→S${turret.size}) → "${replacement}"`);
                    fixedTurret.push(replacement);
                    needsFix = true;
                }
            }
        });
        
        if (needsFix) {
            fixes.turretWeapons = fixedTurret;
            shipNeedsFix = true;
        }
    }

    if (shipNeedsFix) {
        allFixes[shipName] = fixes;
    }
});

console.log(`\n\nTotal ships needing fixes: ${Object.keys(allFixes).length}\n`);

// Write fixes to JSON file for easy application
fs.writeFileSync('./scripts/weapon_fixes.json', JSON.stringify(allFixes, null, 2));
console.log('Fixes written to scripts/weapon_fixes.json');
