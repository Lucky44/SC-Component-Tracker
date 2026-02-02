#!/usr/bin/env node
/**
 * Update Ship Data from SCUnpacked
 *
 * Downloads latest ships.json from scunpacked.com, extracts ship specs
 * and loadouts, updates data.js, and runs validation.
 *
 * Usage: node scripts/update-from-scunpacked.js
 *
 * Requirements: Node.js 18+ (for native fetch) or install node-fetch
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
// Use GitHub raw URL for reliable access to ships.json
const SCUNPACKED_URL = 'https://raw.githubusercontent.com/StarCitizenWiki/scunpacked-data/master/ships.json';
const SHIPS_JSON_PATH = path.join(__dirname, '..', 'ships.json');
const BACKUP_PATH = path.join(__dirname, '..', 'ships.json.backup');
const PROCESSED_DATA_PATH = path.join(__dirname, '..', 'processed-data.json');

// ANSI colors for terminal output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
    console.log(`${colors.cyan}[${step}]${colors.reset} ${message}`);
}

/**
 * Download file using https
 */
function downloadFile(url) {
    return new Promise((resolve, reject) => {
        logStep('DOWNLOAD', `Fetching from ${url}`);

        https.get(url, (response) => {
            // Handle redirects
            if (response.statusCode === 301 || response.statusCode === 302) {
                const redirectUrl = response.headers.location;
                log(`  Redirecting to: ${redirectUrl}`, 'yellow');
                return downloadFile(redirectUrl).then(resolve).catch(reject);
            }

            if (response.statusCode !== 200) {
                reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
                return;
            }

            let data = '';
            response.on('data', chunk => { data += chunk; });
            response.on('end', () => {
                log(`  Downloaded ${(data.length / 1024 / 1024).toFixed(2)} MB`, 'green');
                resolve(data);
            });
        }).on('error', reject);
    });
}

/**
 * Run a script and capture output
 */
function runScript(scriptPath, description) {
    return new Promise((resolve, reject) => {
        logStep('RUN', description);

        const { spawn } = require('child_process');
        const proc = spawn('node', [scriptPath], {
            cwd: path.join(__dirname, '..'),
            stdio: ['inherit', 'pipe', 'pipe']
        });

        let stdout = '';
        let stderr = '';

        proc.stdout.on('data', data => {
            stdout += data;
            // Print key lines
            const line = data.toString().trim();
            if (line.includes('ships') || line.includes('Ships') ||
                line.includes('issues') || line.includes('Output')) {
                console.log(`  ${line}`);
            }
        });

        proc.stderr.on('data', data => { stderr += data; });

        proc.on('close', code => {
            if (code !== 0) {
                reject(new Error(`Script failed with code ${code}: ${stderr}`));
            } else {
                resolve(stdout);
            }
        });
    });
}

/**
 * Load extracted data from generated JS files
 */
function loadExtracted(filePath, varName) {
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(new RegExp(`const ${varName} = ([\\s\\S]*?);\\s*\\/\\/ Export`));
    if (!match) {
        throw new Error(`Could not find ${varName} in ${filePath}`);
    }
    return JSON.parse(match[1]);
}

/**
 * Ships/entries to exclude from the final data
 */
const EXCLUDED_SHIPS = new Set([
    'Aegis Javelin',           // Capital ship - not player-ownable in normal gameplay
    'ATLS',                    // Not a ship
    'RSI ATLS',                // Not a ship
    'Aegis Idris-M',           // Military capital - not available
    'Aegis Idris-P',           // Capital ship
    'Anvil Asgard',            // Capital ship
]);

/**
 * Name mappings from scunpacked names to preferred display names
 * This ensures consistency with existing data and user expectations
 */
const NAME_NORMALIZATIONS = {
    'Crusader A1 Spirit': 'Crusader Spirit A1',
    'Crusader C1 Spirit': 'Crusader Spirit C1',
    'Crusader E1 Spirit': 'Crusader Spirit E1',
    'Crusader Ares Star Fighter Inferno': 'Crusader Ares Inferno',
    'Crusader Ares Star Fighter Ion': 'Crusader Ares Ion',
    'Origin M50 Interceptor': 'Origin M50',
};

/**
 * Ships that are ground vehicles or gravlev (should already be filtered by IsSpaceship)
 */
const GROUND_VEHICLE_KEYWORDS = [
    'Cyclone', 'Ursa', 'Nova', 'Ballista', 'Spartan', 'Centurion',
    'PTV', 'Mule', 'Lynx', 'ROC', 'STV',
    'Dragonfly', 'Nox', 'HoverQuad', 'X1'  // Gravlev
];

/**
 * Clean up ship name for consistency
 * - Proper capitalization for "MOLE", "RAFT", "SRV" etc.
 * - Apply name normalizations for consistency with existing data
 */
function cleanShipName(name) {
    // These should stay uppercase
    const uppercaseWords = ['MOLE', 'RAFT', 'SRV', 'MPUV', 'ROC', 'PTV', 'STV', 'ATLS', 'DUR', 'MAX', 'MIS', 'TAC', 'MR'];

    // Split and process
    let words = name.split(' ');
    words = words.map(word => {
        if (uppercaseWords.includes(word.toUpperCase())) {
            return word.toUpperCase();
        }
        return word;
    });

    let cleanName = words.join(' ');

    // Strip manufacturer prefixes that shouldn't be in the display name
    const stripPrefixes = ['Kruger '];
    for (const prefix of stripPrefixes) {
        if (cleanName.startsWith(prefix)) {
            cleanName = cleanName.slice(prefix.length);
            break;
        }
    }

    // Apply name normalizations
    if (NAME_NORMALIZATIONS[cleanName]) {
        cleanName = NAME_NORMALIZATIONS[cleanName];
    }

    return cleanName;
}

/**
 * Check if a ship should be excluded
 */
function shouldExcludeShip(name) {
    if (EXCLUDED_SHIPS.has(name)) return true;

    // Check for ground vehicle keywords
    for (const keyword of GROUND_VEHICLE_KEYWORDS) {
        if (name.includes(keyword)) return true;
    }

    return false;
}

/**
 * Generate processed-data.json for browser-based updates
 */
async function generateProcessedData() {
    const shipsPath = path.join(__dirname, 'extracted-ships.js');
    const loadoutsPath = path.join(__dirname, 'extracted-loadouts.js');

    let ships = loadExtracted(shipsPath, 'EXTRACTED_SHIPS');
    let stockLoadouts = loadExtracted(loadoutsPath, 'EXTRACTED_LOADOUTS');

    // Clean up ships array
    const seenShipNames = new Set();
    const cleanedShips = [];
    let duplicateCount = 0;
    let excludedCount = 0;

    for (const ship of ships) {
        const cleanName = cleanShipName(ship.name);

        // Skip excluded ships
        if (shouldExcludeShip(cleanName)) {
            excludedCount++;
            continue;
        }

        // Skip duplicates
        if (seenShipNames.has(cleanName)) {
            duplicateCount++;
            continue;
        }

        seenShipNames.add(cleanName);
        cleanedShips.push({
            ...ship,
            name: cleanName
        });
    }

    // Clean up stockLoadouts - remove duplicates and excluded ships
    const cleanedLoadouts = {};
    for (const [shipName, loadout] of Object.entries(stockLoadouts)) {
        const cleanName = cleanShipName(shipName);

        if (shouldExcludeShip(cleanName)) continue;
        if (cleanedLoadouts[cleanName]) continue; // Skip duplicate

        cleanedLoadouts[cleanName] = loadout;
    }

    // Sort ships by manufacturer then name
    cleanedShips.sort((a, b) => {
        const mfgCompare = a.manufacturer.localeCompare(b.manufacturer);
        if (mfgCompare !== 0) return mfgCompare;
        return a.name.localeCompare(b.name);
    });

    const processedData = {
        version: new Date().toISOString(),
        lastUpdated: new Date().toISOString().split('T')[0],
        ships: cleanedShips,
        stockLoadouts: cleanedLoadouts
    };

    fs.writeFileSync(PROCESSED_DATA_PATH, JSON.stringify(processedData, null, 2));

    const fileSizeKB = (fs.statSync(PROCESSED_DATA_PATH).size / 1024).toFixed(1);
    log(`  Generated processed-data.json (${fileSizeKB} KB)`, 'green');
    log(`  Ships: ${cleanedShips.length} (removed ${duplicateCount} duplicates, ${excludedCount} excluded)`, 'green');
    log(`  Loadouts: ${Object.keys(cleanedLoadouts).length}`, 'green');
}

/**
 * Main update function
 */
async function main() {
    log('\n=== SC Component Tracker - Data Update ===\n', 'bright');

    try {
        // Step 1: Download ships.json
        const shipsData = await downloadFile(SCUNPACKED_URL);

        // Validate JSON
        let ships;
        try {
            ships = JSON.parse(shipsData);
            log(`  Parsed ${ships.length} ship entries`, 'green');
        } catch (e) {
            throw new Error(`Invalid JSON: ${e.message}`);
        }

        // Step 2: Backup existing ships.json
        if (fs.existsSync(SHIPS_JSON_PATH)) {
            logStep('BACKUP', 'Backing up existing ships.json');
            fs.copyFileSync(SHIPS_JSON_PATH, BACKUP_PATH);
            log(`  Saved to ships.json.backup`, 'green');
        }

        // Step 3: Save new ships.json
        logStep('SAVE', 'Writing new ships.json');
        fs.writeFileSync(SHIPS_JSON_PATH, JSON.stringify(ships, null, 2));
        log(`  Saved ${ships.length} ships`, 'green');

        // Step 4: Run extraction scripts
        await runScript(
            path.join(__dirname, 'extract-ships.js'),
            'Extracting ship hardpoint specs'
        );

        await runScript(
            path.join(__dirname, 'extract-loadouts.js'),
            'Extracting stock loadouts'
        );

        // Step 5: Run validation
        log('\n--- Validation Results ---\n', 'bright');
        await runScript(
            path.join(__dirname, 'validate-extraction.js'),
            'Validating extracted data'
        );

        // Step 6: Generate processed-data.json for browser updates
        logStep('GENERATE', 'Creating processed-data.json for browser updates');
        await generateProcessedData();

        log('\n=== Update Complete ===\n', 'green');
        log('Next steps:', 'bright');
        log('1. Test the app in browser to verify changes');
        log('2. Review any validation issues above');
        log('3. Commit changes when satisfied');

    } catch (error) {
        log(`\nError: ${error.message}`, 'red');

        // Restore backup if available
        if (fs.existsSync(BACKUP_PATH)) {
            log('Restoring backup...', 'yellow');
            fs.copyFileSync(BACKUP_PATH, SHIPS_JSON_PATH);
            log('Backup restored', 'green');
        }

        process.exit(1);
    }
}

// Run
main();
