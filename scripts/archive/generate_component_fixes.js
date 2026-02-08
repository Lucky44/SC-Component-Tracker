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

// Helper functions
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

function findComponentBySize(collection, size) {
    return collection.find(c => c.size === size);
}

console.log('Generating component fixes...\n');

const fixes = {};

ships.forEach(ship => {
    const shipName = ship.name;
    const stock = stockLoadouts[shipName];
    
    if (!stock) return;

    let shipNeedsFix = false;
    const shipFixes = {
        shields: null,
        coolers: null,
        powerPlants: null,
        quantumDrives: null,
        turretWeapons: null
    };

    // Fix remaining turret weapon size mismatches
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
            
            const weapon = findWeaponByName(weaponName);
            if (weapon && weapon.size !== turret.size) {
                // Find correct size weapon
                const commonDefaults = {
                    1: "CF-117 Bulldog Repeater",
                    2: "CF-227 Badger Repeater",
                    3: "CF-337 Panther Repeater",
                    4: "CF-447 Rhino Repeater",
                    5: "CF-557 Galdereen Repeater"
                };
                const replacement = commonDefaults[turret.size] || "";
                console.log(`  ${shipName}: turret[${i}] "${weaponName}" S${weapon.size}→S${turret.size} = "${replacement}"`);
                fixedTurret.push(replacement);
                needsFix = true;
            } else {
                fixedTurret.push(weaponName);
            }
        });
        
        if (needsFix) {
            shipFixes.turretWeapons = fixedTurret;
            shipNeedsFix = true;
        }
    }

    // Fix shields - replace with correct size or remove
    if (ship.shields) {
        const stockShields = stock.shields || [];
        const fixedShields = [];
        let needsFix = false;
        
        for (let i = 0; i < ship.shields.count; i++) {
            const shieldName = stockShields[i];
            if (shieldName) {
                const shield = findComponent(shields, shieldName);
                if (shield && shield.size !== ship.shields.size) {
                    // Try to find a shield of the correct size from same manufacturer
                    const correctSize = shields.find(s => 
                        s.size === ship.shields.size && 
                        s.manufacturer === shield.manufacturer
                    );
                    if (correctSize) {
                        fixedShields.push(correctSize.name);
                        console.log(`  ${shipName}: shield[${i}] "${shieldName}" S${shield.size}→S${ship.shields.size} = "${correctSize.name}"`);
                    } else {
                        // Just pick any shield of the correct size
                        const anyCorrect = findComponentBySize(shields, ship.shields.size);
                        fixedShields.push(anyCorrect ? anyCorrect.name : "");
                        console.log(`  ${shipName}: shield[${i}] "${shieldName}" S${shield.size}→S${ship.shields.size} = "${anyCorrect?.name || '(removed)'}"`);
                    }
                    needsFix = true;
                } else {
                    fixedShields.push(shieldName);
                }
            } else {
                fixedShields.push("");
            }
        }
        
        if (needsFix) {
            shipFixes.shields = fixedShields;
            shipNeedsFix = true;
        }
    }

    // Fix coolers
    if (ship.coolers) {
        const stockCoolers = stock.coolers || [];
        const fixedCoolers = [];
        let needsFix = false;
        
        for (let i = 0; i < ship.coolers.count; i++) {
            const coolerName = stockCoolers[i];
            if (coolerName) {
                const cooler = findComponent(coolers, coolerName);
                if (cooler && cooler.size !== ship.coolers.size) {
                    const correctSize = coolers.find(c => 
                        c.size === ship.coolers.size && 
                        c.manufacturer === cooler.manufacturer
                    );
                    if (correctSize) {
                        fixedCoolers.push(correctSize.name);
                        console.log(`  ${shipName}: cooler[${i}] "${coolerName}" S${cooler.size}→S${ship.coolers.size} = "${correctSize.name}"`);
                    } else {
                        const anyCorrect = findComponentBySize(coolers, ship.coolers.size);
                        fixedCoolers.push(anyCorrect ? anyCorrect.name : "");
                        console.log(`  ${shipName}: cooler[${i}] "${coolerName}" S${cooler.size}→S${ship.coolers.size} = "${anyCorrect?.name || '(removed)'}"`);
                    }
                    needsFix = true;
                } else {
                    fixedCoolers.push(coolerName);
                }
            } else {
                fixedCoolers.push("");
            }
        }
        
        if (needsFix) {
            shipFixes.coolers = fixedCoolers;
            shipNeedsFix = true;
        }
    }

    // Fix power plants
    if (ship.powerPlants) {
        const stockPower = stock.powerPlants || [];
        const fixedPower = [];
        let needsFix = false;
        
        for (let i = 0; i < ship.powerPlants.count; i++) {
            const powerName = stockPower[i];
            if (powerName) {
                const power = findComponent(powerPlants, powerName);
                if (power && power.size !== ship.powerPlants.size) {
                    const correctSize = powerPlants.find(p => 
                        p.size === ship.powerPlants.size && 
                        p.manufacturer === power.manufacturer
                    );
                    if (correctSize) {
                        fixedPower.push(correctSize.name);
                        console.log(`  ${shipName}: powerPlant[${i}] "${powerName}" S${power.size}→S${ship.powerPlants.size} = "${correctSize.name}"`);
                    } else {
                        const anyCorrect = findComponentBySize(powerPlants, ship.powerPlants.size);
                        fixedPower.push(anyCorrect ? anyCorrect.name : "");
                        console.log(`  ${shipName}: powerPlant[${i}] "${powerName}" S${power.size}→S${ship.powerPlants.size} = "${anyCorrect?.name || '(removed)'}"`);
                    }
                    needsFix = true;
                } else {
                    fixedPower.push(powerName);
                }
            } else {
                fixedPower.push("");
            }
        }
        
        if (needsFix) {
            shipFixes.powerPlants = fixedPower;
            shipNeedsFix = true;
        }
    }

    // Fix quantum drives
    if (ship.quantumDrive) {
        const stockQD = stock.quantumDrives || [];
        const qdName = stockQD[0];
        if (qdName) {
            const qd = findComponent(quantumDrives, qdName);
            if (qd && qd.size !== ship.quantumDrive.size) {
                const correctSize = quantumDrives.find(q => 
                    q.size === ship.quantumDrive.size && 
                    q.manufacturer === qd.manufacturer
                );
                if (correctSize) {
                    shipFixes.quantumDrives = [correctSize.name];
                    console.log(`  ${shipName}: quantumDrive "${qdName}" S${qd.size}→S${ship.quantumDrive.size} = "${correctSize.name}"`);
                } else {
                    const anyCorrect = findComponentBySize(quantumDrives, ship.quantumDrive.size);
                    shipFixes.quantumDrives = anyCorrect ? [anyCorrect.name] : [""];
                    console.log(`  ${shipName}: quantumDrive "${qdName}" S${qd.size}→S${ship.quantumDrive.size} = "${anyCorrect?.name || '(removed)'}"`);
                }
                shipNeedsFix = true;
            }
        }
    }

    if (shipNeedsFix) {
        fixes[shipName] = shipFixes;
    }
});

console.log(`\n\nTotal ships needing component fixes: ${Object.keys(fixes).length}\n`);

// Write fixes to JSON file
fs.writeFileSync('./scripts/component_fixes.json', JSON.stringify(fixes, null, 2));
console.log('Fixes written to scripts/component_fixes.json');
