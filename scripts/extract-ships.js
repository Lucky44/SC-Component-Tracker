#!/usr/bin/env node
/**
 * Extract Ship Specs from ships.json
 *
 * This script parses the scunpacked ships.json file and extracts
 * ship hardpoint configurations (weapon mounts, component slots).
 * Variants are excluded - they use base ship hardpoints.
 *
 * Usage: node scripts/extract-ships.js
 * Output: Writes to scripts/extracted-ships.js
 */

const fs = require('fs');
const path = require('path');

// Paths
const SHIPS_JSON_PATH = path.join(__dirname, '..', 'ships.json');
const OUTPUT_PATH = path.join(__dirname, 'extracted-ships.js');

// Size mapping: game Size value to display string
const SIZE_MAP = {
    0: 'Vehicle',
    1: 'Small',
    2: 'Small',
    3: 'Medium',
    4: 'Medium',
    5: 'Large',
    6: 'Large',
    7: 'Capital',
    8: 'Capital'
};

// Manufacturer name cleanup
const MANUFACTURER_MAP = {
    'Aegis Dynamics': 'Aegis',
    'Anvil Aerospace': 'Anvil',
    'Aopoa': 'Aopoa',
    'Argo Astronautics': 'Argo',
    'Banu': 'Banu',
    'Consolidated Outland': 'Consolidated Outland',
    'Crusader Industries': 'Crusader',
    'Drake Interplanetary': 'Drake',
    'Esperia': 'Esperia',
    'Gatac Manufacture': 'Gatac',
    'Greycat Industrial': 'Greycat',
    'Kruger Intergalactic': 'Kruger',
    'MISC': 'MISC',
    'Musashi Industrial & Starflight Concern': 'MISC',
    'Origin Jumpworks': 'Origin',
    'Roberts Space Industries': 'RSI',
    'Tumbril Land Systems': 'Tumbril',
    'Vanduul': 'Vanduul',
    "Grey's Market": "Grey's Market",
    'Mirai': 'Mirai'
};

/**
 * Check if a ship is a variant (not a base ship)
 * Variants have suffixes like Pirate, Valiant, Special, Edition, etc.
 */
function isVariant(shipName, allShipNames) {
    // Check if any other ship name is a prefix of this one
    for (const otherName of allShipNames) {
        if (otherName !== shipName && shipName.startsWith(otherName + ' ')) {
            return true;
        }
    }
    return false;
}

/**
 * Recursively find items in loadout matching a predicate
 */
function findInLoadout(loadout, predicate, results = []) {
    if (!Array.isArray(loadout)) return results;

    for (const item of loadout) {
        if (predicate(item)) {
            results.push(item);
        }
        if (item.Loadout && Array.isArray(item.Loadout)) {
            findInLoadout(item.Loadout, predicate, results);
        }
    }
    return results;
}

/**
 * Extract pilot weapon hardpoints (not in manned/remote turrets)
 * Only counts actual gun hardpoints (hardpoint_gun_*, hardpoint_class_*, etc.)
 * Gimbals (Turret.GunTurret) at the top level are pilot weapons
 */
function extractPilotWeapons(loadout) {
    const weapons = [];

    function processItems(items, inMannedOrRemoteTurret = false) {
        for (const item of items) {
            const isMannedTurret = item.Type && item.Type.includes('TurretBase.MannedTurret');
            const isRemoteTurret = item.Type && item.Type.includes('TurretBase.RemoteTurret');

            // Skip manned/remote turrets (processed separately)
            if (isMannedTurret || isRemoteTurret) continue;

            const hpName = (item.HardpointName || '').toLowerCase();
            const type = item.Type || '';

            // Check if this is a gun hardpoint (gimbal mount or direct weapon)
            // Must have "hardpoint_gun" in name, or be a Turret.GunTurret at top level
            const isGunHardpoint = hpName.startsWith('hardpoint_gun') ||
                                   hpName.startsWith('hardpoint_class');
            const isGimbalMount = type === 'Turret.GunTurret';

            if (!inMannedOrRemoteTurret && (isGunHardpoint || isGimbalMount) && item.MaxSize > 0) {
                // This is a pilot weapon hardpoint
                weapons.push({ size: item.MaxSize });
                // Don't recurse into this - we've counted the mount
                continue;
            }

            // Recurse into nested loadout (but skip already-counted gimbals)
            if (item.Loadout && Array.isArray(item.Loadout)) {
                processItems(item.Loadout, inMannedOrRemoteTurret);
            }
        }
    }

    if (loadout) processItems(loadout);
    return weapons;
}

/**
 * Extract turret information (manned and remote turrets)
 */
function extractTurrets(loadout) {
    const turrets = [];

    function countWeaponHardpoints(items) {
        let count = 0;
        let maxSize = 0;
        for (const item of items) {
            const hpName = (item.HardpointName || '').toLowerCase();
            // Count gimbal mounts or weapon hardpoints inside the turret
            if ((hpName.includes('weapon') || hpName.includes('gun') ||
                 item.Type === 'Turret.GunTurret') && item.MaxSize > 0) {
                count++;
                maxSize = Math.max(maxSize, item.MaxSize);
            }
            // Recurse
            if (item.Loadout) {
                const sub = countWeaponHardpoints(item.Loadout);
                count += sub.count;
                maxSize = Math.max(maxSize, sub.maxSize);
            }
        }
        return { count, maxSize };
    }

    function processItems(items) {
        for (const item of items) {
            const isMannedTurret = item.Type && item.Type.includes('TurretBase.MannedTurret');
            const isRemoteTurret = item.Type && item.Type.includes('TurretBase.RemoteTurret');

            if (isMannedTurret || isRemoteTurret) {
                // Count weapon hardpoints in this turret
                const { count, maxSize } = item.Loadout ?
                    countWeaponHardpoints(item.Loadout) : { count: 0, maxSize: 0 };

                if (count > 0 && maxSize > 0) {
                    turrets.push({
                        type: isMannedTurret ? 'manned' : 'remote',
                        guns: count,
                        size: maxSize
                    });
                }
            } else if (item.Loadout) {
                // Recurse for non-turret items
                processItems(item.Loadout);
            }
        }
    }

    if (loadout) processItems(loadout);
    return turrets;
}

/**
 * Extract size from ClassName (e.g., "QDRV_JUST_S03_Kama_SCItem" -> 3)
 * Used as fallback when MaxSize is 0 or undefined
 */
function getSizeFromClassName(className) {
    if (!className) return 0;
    const match = className.match(/_S0?(\d)/);
    return match ? parseInt(match[1]) : 0;
}

/**
 * Extract component slots (shields, coolers, power plants, quantum drive)
 * Uses MaxSize from hardpoint definitions, with ClassName fallback for QD
 */
function extractComponents(loadout) {
    const components = {
        shields: { count: 0, size: 0 },
        coolers: { count: 0, size: 0 },
        powerPlants: { count: 0, size: 0 },
        quantumDrive: { size: 0 }
    };

    const shields = findInLoadout(loadout, i =>
        i.Type && i.Type.startsWith('Shield.') && !i.Type.includes('Controller')
    );
    const coolers = findInLoadout(loadout, i =>
        i.Type && i.Type.startsWith('Cooler') && !i.Type.includes('Controller')
    );
    const powerPlants = findInLoadout(loadout, i =>
        i.Type && i.Type.startsWith('PowerPlant')
    );
    const qDrives = findInLoadout(loadout, i =>
        i.Type && i.Type.startsWith('QuantumDrive')
    );

    if (shields.length > 0) {
        components.shields.count = shields.length;
        components.shields.size = Math.max(...shields.map(s => s.MaxSize || s.Size || 0));
    }

    if (coolers.length > 0) {
        components.coolers.count = coolers.length;
        components.coolers.size = Math.max(...coolers.map(c => c.MaxSize || c.Size || 0));
    }

    if (powerPlants.length > 0) {
        components.powerPlants.count = powerPlants.length;
        components.powerPlants.size = Math.max(...powerPlants.map(p => p.MaxSize || p.Size || 0));
    }

    if (qDrives.length > 0) {
        // Try MaxSize first, then Size, then parse from ClassName as fallback
        components.quantumDrive.size = Math.max(...qDrives.map(q =>
            q.MaxSize || q.Size || getSizeFromClassName(q.ClassName) || 0
        ));
    }

    return components;
}

/**
 * Process a single ship
 */
function processShip(ship) {
    const manufacturerName = ship.Manufacturer?.Name || 'Unknown';
    const manufacturer = MANUFACTURER_MAP[manufacturerName] || manufacturerName;
    const size = SIZE_MAP[ship.Size] || 'Unknown';

    const pilotWeapons = extractPilotWeapons(ship.Loadout);
    const turrets = extractTurrets(ship.Loadout);
    const components = extractComponents(ship.Loadout);

    return {
        name: ship.Name,
        manufacturer,
        size,
        pilotWeapons,
        turrets,
        shields: components.shields,
        powerPlants: components.powerPlants,
        coolers: components.coolers,
        quantumDrive: components.quantumDrive
    };
}

/**
 * Main extraction function
 */
function main() {
    console.log('Reading ships.json...');
    const shipsData = JSON.parse(fs.readFileSync(SHIPS_JSON_PATH, 'utf8'));

    console.log(`Found ${shipsData.length} entries in ships.json`);

    // Get all ship names for variant detection
    const allShipNames = shipsData
        .filter(s => s.Name && s.IsSpaceship)
        .map(s => s.Name);

    // Filter to spaceships only, exclude variants
    const baseShips = shipsData.filter(ship => {
        if (!ship.Name) return false;
        if (!ship.IsSpaceship) return false;
        if (isVariant(ship.Name, allShipNames)) return false;
        return true;
    });

    console.log(`Base ships (excluding variants): ${baseShips.length}`);

    const ships = [];

    for (const ship of baseShips) {
        const processed = processShip(ship);

        // Only include ships with some meaningful data
        if (processed.pilotWeapons.length > 0 ||
            processed.turrets.length > 0 ||
            processed.shields.count > 0 ||
            processed.quantumDrive.size > 0) {
            ships.push(processed);
        }
    }

    // Sort by manufacturer then name
    ships.sort((a, b) => {
        const mfgCompare = a.manufacturer.localeCompare(b.manufacturer);
        if (mfgCompare !== 0) return mfgCompare;
        return a.name.localeCompare(b.name);
    });

    console.log(`Processed ${ships.length} ships with hardpoint data`);

    // Generate output
    const output = `// Auto-generated ship specs from ships.json
// Generated: ${new Date().toISOString()}
// Ships with hardpoint data: ${ships.length}

const EXTRACTED_SHIPS = ${JSON.stringify(ships, null, 4)};

// Export for Node.js (if used as module)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EXTRACTED_SHIPS;
}
`;

    fs.writeFileSync(OUTPUT_PATH, output);
    console.log(`\nOutput written to: ${OUTPUT_PATH}`);

    // Print a few examples for verification
    console.log('\n--- Sample Output ---');
    const samples = ['Aegis Gladius', 'Aegis Hammerhead', "Grey's Shiv"];
    for (const name of samples) {
        const ship = ships.find(s => s.name === name);
        if (ship) {
            console.log(`\n${name}:`);
            console.log(`  Pilot weapons: ${ship.pilotWeapons.length} (sizes: ${ship.pilotWeapons.map(w => w.size).join(', ') || 'none'})`);
            console.log(`  Turrets: ${ship.turrets.length}`);
            console.log(`  Shields: ${ship.shields.count}x S${ship.shields.size}`);
            console.log(`  Power Plants: ${ship.powerPlants.count}x S${ship.powerPlants.size}`);
            console.log(`  Coolers: ${ship.coolers.count}x S${ship.coolers.size}`);
            console.log(`  Quantum Drive: S${ship.quantumDrive.size}`);
        }
    }

    return ships;
}

// Run
main();
