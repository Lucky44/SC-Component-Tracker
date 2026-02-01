#!/usr/bin/env node
/**
 * Extract Stock Loadouts from ships.json
 *
 * This script parses the scunpacked ships.json file and extracts
 * stock loadout information for each ship, generating data compatible
 * with SC_DATA.stockLoadouts format.
 *
 * Usage: node scripts/extract-loadouts.js
 * Output: Writes to scripts/extracted-loadouts.js
 */

const fs = require('fs');
const path = require('path');

// Paths
const SHIPS_JSON_PATH = path.join(__dirname, '..', 'ships.json');
const OUTPUT_PATH = path.join(__dirname, 'extracted-loadouts.js');

/**
 * Recursively search a loadout tree for items matching criteria
 */
function findItemsInLoadout(loadout, predicate, results = []) {
    if (!Array.isArray(loadout)) return results;

    for (const item of loadout) {
        if (predicate(item)) {
            results.push(item);
        }
        // Recursively search nested loadouts (e.g., turrets contain weapons)
        if (item.Loadout && Array.isArray(item.Loadout)) {
            findItemsInLoadout(item.Loadout, predicate, results);
        }
    }
    return results;
}

/**
 * Names to filter out (controllers, placeholders, etc.)
 */
const FILTER_NAMES = new Set([
    '<= PLACEHOLDER =>',
    'HEAT',
    'SHIELDS',
    'POWER',
    'Access',
]);

/**
 * Check if a name should be filtered out
 */
function isValidComponentName(name) {
    if (!name) return false;
    // Filter out exact placeholder and controller names
    if (FILTER_NAMES.has(name)) {
        return false;
    }
    // Filter out controller items
    if (name.includes('Controller')) {
        return false;
    }
    return true;
}

/**
 * Extract components of a specific type from a ship's loadout
 */
function extractByType(loadout, typePrefix) {
    return findItemsInLoadout(loadout, item =>
        item.Type && item.Type.startsWith(typePrefix) && isValidComponentName(item.Name)
    );
}

/**
 * Extract weapons that are pilot-controlled (not in manned turrets)
 */
function extractPilotWeapons(loadout, shipLoadout) {
    const weapons = [];

    // Find direct weapon mounts (pilot controlled)
    for (const item of shipLoadout) {
        const hpName = (item.HardpointName || '').toLowerCase();

        // Skip turrets - we'll handle those separately
        if (item.Type && item.Type.includes('TurretBase.MannedTurret')) {
            continue;
        }

        // Check if this is a weapon hardpoint
        if (item.Type && item.Type.startsWith('WeaponGun') && item.Name && item.Name !== '<= PLACEHOLDER =>') {
            weapons.push(item);
        }

        // Check for gimbal mounts with weapons inside
        if (item.Type && item.Type.includes('Turret.GunTurret') && item.Loadout) {
            // This is a gimbal mount - weapons inside are pilot controlled
            const nestedWeapons = findItemsInLoadout(item.Loadout, i =>
                i.Type && i.Type.startsWith('WeaponGun') && i.Name && i.Name !== '<= PLACEHOLDER =>'
            );
            weapons.push(...nestedWeapons);
        }

        // Check direct nested loadouts for weapons
        if (item.Loadout && !item.Type?.includes('MannedTurret')) {
            const nestedWeapons = findItemsInLoadout(item.Loadout, i =>
                i.Type && i.Type.startsWith('WeaponGun') && i.Name && i.Name !== '<= PLACEHOLDER =>'
            );
            weapons.push(...nestedWeapons);
        }
    }

    return weapons;
}

/**
 * Extract weapons from manned/remote turrets
 */
function extractTurretWeapons(shipLoadout) {
    const weapons = [];

    for (const item of shipLoadout) {
        // Find manned or remote turrets
        if (item.Type && (item.Type.includes('MannedTurret') || item.Type.includes('RemoteTurret'))) {
            if (item.Loadout) {
                const turretWeapons = findItemsInLoadout(item.Loadout, i =>
                    i.Type && i.Type.startsWith('WeaponGun') && i.Name && i.Name !== '<= PLACEHOLDER =>'
                );
                weapons.push(...turretWeapons);
            }
        }
    }

    return weapons;
}

/**
 * Process a single ship and extract its stock loadout
 */
function extractShipLoadout(ship) {
    if (!ship.Loadout || !Array.isArray(ship.Loadout)) {
        return null;
    }

    const loadout = ship.Loadout;

    // Extract components by type
    const powerPlants = extractByType(loadout, 'PowerPlant');
    const coolers = extractByType(loadout, 'Cooler');
    const shields = extractByType(loadout, 'Shield');
    const quantumDrives = extractByType(loadout, 'QuantumDrive');

    // Extract weapons - separate pilot vs turret
    const allWeapons = extractByType(loadout, 'WeaponGun');

    // For now, we'll use a simpler approach:
    // - Look at hardpoint names to determine pilot vs turret weapons
    const pilotWeapons = [];
    const turretWeapons = [];

    // Recursively process loadout to categorize weapons
    function categorizeWeapons(items, inTurret = false) {
        for (const item of items) {
            const hpName = (item.HardpointName || '').toLowerCase();
            const type = item.Type || '';

            // Detect turrets by type OR by hardpoint name
            const isMannedTurret = type.includes('MannedTurret');
            const isRemoteTurret = type.includes('RemoteTurret');
            const isPDCTurret = type.includes('PDCTurret');
            const isTurretMount = hpName.includes('turret') && type.includes('Turret');

            const isInTurret = inTurret || isMannedTurret || isRemoteTurret || isPDCTurret || isTurretMount;

            if (type.startsWith('WeaponGun') && isValidComponentName(item.Name)) {
                if (isInTurret) {
                    turretWeapons.push(item.Name);
                } else {
                    pilotWeapons.push(item.Name);
                }
            }

            if (item.Loadout && Array.isArray(item.Loadout)) {
                categorizeWeapons(item.Loadout, isInTurret);
            }
        }
    }

    categorizeWeapons(loadout);

    return {
        quantumDrives: quantumDrives.map(c => c.Name),
        powerPlants: powerPlants.map(c => c.Name),
        coolers: coolers.map(c => c.Name),
        shields: shields.map(c => c.Name),
        pilotWeapons: pilotWeapons,
        turretWeapons: turretWeapons
    };
}

/**
 * Get a clean ship name for use as a key
 */
function getShipDisplayName(ship) {
    // Use the Name field if available, otherwise construct from ClassName
    if (ship.Name && ship.Name !== '<= PLACEHOLDER =>') {
        return ship.Name;
    }
    // Fallback to ClassName with some cleanup
    return ship.ClassName.replace(/_/g, ' ');
}

/**
 * Main extraction function
 */
function main() {
    console.log('Reading ships.json...');
    const shipsData = JSON.parse(fs.readFileSync(SHIPS_JSON_PATH, 'utf8'));

    console.log(`Found ${shipsData.length} entries in ships.json`);

    const stockLoadouts = {};
    let processedCount = 0;
    let skippedCount = 0;

    for (const ship of shipsData) {
        // Skip ground vehicles, gravlev vehicles, and non-spaceships
        if (!ship.IsSpaceship) continue;

        const shipName = getShipDisplayName(ship);
        const loadout = extractShipLoadout(ship);

        if (loadout && (loadout.powerPlants.length > 0 || loadout.shields.length > 0 ||
            loadout.pilotWeapons.length > 0 || loadout.turretWeapons.length > 0)) {
            stockLoadouts[shipName] = loadout;
            processedCount++;
        } else {
            skippedCount++;
        }
    }

    console.log(`Processed ${processedCount} ships with loadout data`);
    console.log(`Skipped ${skippedCount} entries (no loadout data)`);

    // Generate output
    const output = `// Auto-generated stock loadouts from ships.json
// Generated: ${new Date().toISOString()}
// Ships with loadout data: ${processedCount}

const EXTRACTED_LOADOUTS = ${JSON.stringify(stockLoadouts, null, 2)};

// Export for Node.js (if used as module)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EXTRACTED_LOADOUTS;
}
`;

    fs.writeFileSync(OUTPUT_PATH, output);
    console.log(`\nOutput written to: ${OUTPUT_PATH}`);

    // Print a few examples for verification
    console.log('\n--- Sample Output (first 3 ships) ---');
    const sampleKeys = Object.keys(stockLoadouts).slice(0, 3);
    for (const key of sampleKeys) {
        console.log(`\n"${key}":`);
        console.log(JSON.stringify(stockLoadouts[key], null, 2));
    }

    return stockLoadouts;
}

// Run
main();
