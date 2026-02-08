const fs = require('fs');

// Mock window object for Node.js environment
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

// Helper to find component by name
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

console.log('=== AUDITING ALL SHIP DEFAULTS ===\n');

const issues = [];

ships.forEach(ship => {
    const shipName = ship.name;
    const stock = stockLoadouts[shipName];
    
    if (!stock) {
        console.log(`⚠️  ${shipName}: No stock loadout found`);
        return;
    }

    const shipIssues = [];

    // Check pilot weapons
    if (ship.pilotWeapons && ship.pilotWeapons.length > 0) {
        const stockPilot = stock.pilotWeapons || [];
        ship.pilotWeapons.forEach((hardpoint, i) => {
            const weaponName = stockPilot[i];
            if (weaponName) {
                const weapon = findWeaponByName(weaponName);
                if (!weapon) {
                    shipIssues.push(`  Pilot weapon '${weaponName}' not found in catalog`);
                } else if (weapon.size !== hardpoint.size) {
                    shipIssues.push(`  Pilot weapon '${weaponName}' is S${weapon.size} but hardpoint ${i} is S${hardpoint.size}`);
                }
            }
        });
    }

    // Check turret weapons
    if (ship.turrets && ship.turrets.length > 0) {
        const stockTurret = stock.turretWeapons || [];
        ship.turrets.forEach((turret, i) => {
            const weaponName = stockTurret[i];
            if (weaponName) {
                const weapon = findWeaponByName(weaponName);
                if (!weapon) {
                    shipIssues.push(`  Turret ${i} weapon '${weaponName}' not found in catalog`);
                } else if (weapon.size !== turret.size) {
                    shipIssues.push(`  Turret ${i} weapon '${weaponName}' is S${weapon.size} but mount is S${turret.size}`);
                }
            }
        });
    }

    // Check shields
    if (ship.shields) {
        const stockShields = stock.shields || [];
        for (let i = 0; i < ship.shields.count; i++) {
            const shieldName = stockShields[i];
            if (shieldName) {
                const shield = findComponent(shields, shieldName);
                if (!shield) {
                    shipIssues.push(`  Shield '${shieldName}' not found in catalog`);
                } else if (shield.size !== ship.shields.size) {
                    shipIssues.push(`  Shield '${shieldName}' is S${shield.size} but slot is S${ship.shields.size}`);
                }
            }
        }
    }

    // Check coolers
    if (ship.coolers) {
        const stockCoolers = stock.coolers || [];
        for (let i = 0; i < ship.coolers.count; i++) {
            const coolerName = stockCoolers[i];
            if (coolerName) {
                const cooler = findComponent(coolers, coolerName);
                if (!cooler) {
                    shipIssues.push(`  Cooler '${coolerName}' not found in catalog`);
                } else if (cooler.size !== ship.coolers.size) {
                    shipIssues.push(`  Cooler '${coolerName}' is S${cooler.size} but slot is S${ship.coolers.size}`);
                }
            }
        }
    }

    // Check power plants
    if (ship.powerPlants) {
        const stockPower = stock.powerPlants || [];
        for (let i = 0; i < ship.powerPlants.count; i++) {
            const powerName = stockPower[i];
            if (powerName) {
                const power = findComponent(powerPlants, powerName);
                if (!power) {
                    shipIssues.push(`  PowerPlant '${powerName}' not found in catalog`);
                } else if (power.size !== ship.powerPlants.size) {
                    shipIssues.push(`  PowerPlant '${powerName}' is S${power.size} but slot is S${ship.powerPlants.size}`);
                }
            }
        }
    }

    // Check quantum drives
    if (ship.quantumDrive) {
        const stockQD = stock.quantumDrives || [];
        const qdName = stockQD[0];
        if (qdName) {
            const qd = findComponent(quantumDrives, qdName);
            if (!qd) {
                shipIssues.push(`  QuantumDrive '${qdName}' not found in catalog`);
            } else if (qd.size !== ship.quantumDrive.size) {
                shipIssues.push(`  QuantumDrive '${qdName}' is S${qd.size} but slot is S${ship.quantumDrive.size}`);
            }
        }
    }

    if (shipIssues.length > 0) {
        console.log(`❌ ${shipName}:`);
        shipIssues.forEach(issue => console.log(issue));
        console.log('');
        issues.push({ ship: shipName, issues: shipIssues });
    }
});

console.log(`\n=== SUMMARY ===`);
console.log(`Total ships with issues: ${issues.length}`);
console.log(`Total ships checked: ${ships.length}`);
