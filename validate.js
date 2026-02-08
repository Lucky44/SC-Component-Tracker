#!/usr/bin/env node
/**
 * SC Component Tracker - Data Validation Script
 *
 * Checks for data integrity issues:
 * - Orphaned loadouts (loadout exists but no ship spec)
 * - Orphaned specs (ship spec exists but no loadout)
 * - Weapon/component count mismatches between spec and loadout
 * - Unknown weapons or components (not in database)
 * - Oversized weapons (weapon size > mount size)
 * - Component size mismatches
 * - Cross-validation against ships.json (if available)
 *
 * Usage: node validate.js [--verbose] [--fix-suggestions] [--json]
 *
 * Flags:
 *   --verbose          Show detailed per-issue output
 *   --fix-suggestions  Show suggested fixes for fixable issues
 *   --json             Output machine-readable JSON instead of human-readable text.
 *                      JSON object contains: summary, issues, metadata.
 */

const fs = require('fs');
const vm = require('vm');
const path = require('path');

const VERBOSE = process.argv.includes('--verbose');
const SHOW_FIX_SUGGESTIONS = process.argv.includes('--fix-suggestions');
const JSON_OUTPUT = process.argv.includes('--json');

/**
 * Wrapper around console.log that suppresses output in --json mode.
 * Ensures only the final JSON blob is written to stdout when --json is active.
 * @param {...*} args - Arguments forwarded to console.log
 */
function log(...args) {
  if (!JSON_OUTPUT) {
    console.log(...args);
  }
}

function loadSCData(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  // In JSON mode, provide a silent console to prevent data.js from polluting stdout
  const sandboxConsole = JSON_OUTPUT
    ? { log() {}, warn() {}, error() {}, info() {}, debug() {} }
    : console;
  const sandbox = { window: {}, console: sandboxConsole };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox.window.SC_DATA || sandbox.SC_DATA;
}

function loadShipsJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    return null;
  }
}

function normalize(s) {
  return (s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function makeIndexByName(arr) {
  const map = new Map();
  (arr || []).forEach(item => {
    if (item && item.name) map.set(item.name.toLowerCase(), item);
  });
  return map;
}

function findWeaponSizeByName(SC_DATA, name) {
  if (!name) return null;
  for (const key of Object.keys(SC_DATA.weapons)) {
    const sz = parseInt(key, 10);
    const list = SC_DATA.weapons[sz] || [];
    if (list.find(w => w.name && w.name.toLowerCase() === name.toLowerCase())) return sz;
  }
  return null;
}

function validate() {
  log('SC Component Tracker - Data Validation\n');
  log('='.repeat(50));

  const SC_DATA = loadSCData('data.js');
  const shipsJson = loadShipsJson('ships.json');
  const issues = [];

  // Summary counters
  const summary = {
    orphanedLoadouts: 0,
    orphanedSpecs: 0,
    countMismatches: 0,
    unknownItems: 0,
    oversizedItems: 0,
    sizeMismatches: 0,
    sourceDiscrepancies: 0
  };

  const shieldsByName = makeIndexByName(SC_DATA.shields);
  const coolersByName = makeIndexByName(SC_DATA.coolers);
  const ppsByName = makeIndexByName(SC_DATA.powerPlants);
  const qdByName = makeIndexByName(SC_DATA.quantumDrives);

  const ships = SC_DATA.ships || [];
  const shipByNorm = new Map();
  const shipByName = new Map();
  ships.forEach(s => {
    shipByNorm.set(normalize(s.name), s);
    shipByName.set(s.name, s);
  });

  const stock = SC_DATA.stockLoadouts || {};

  // Helper to push an issue
  function addIssue(type, ship, detail, category = 'other') {
    issues.push({ type, ship, detail, category });
    if (category === 'orphaned-loadout') summary.orphanedLoadouts++;
    else if (category === 'orphaned-spec') summary.orphanedSpecs++;
    else if (category === 'count-mismatch') summary.countMismatches++;
    else if (category === 'unknown') summary.unknownItems++;
    else if (category === 'oversized') summary.oversizedItems++;
    else if (category === 'size-mismatch') summary.sizeMismatches++;
    else if (category === 'source') summary.sourceDiscrepancies++;
  }

  // ========== CHECK 1: Orphaned Loadouts (loadout exists but no ship spec) ==========
  log('\n[1/6] Checking for orphaned loadouts...');
  for (const shipName of Object.keys(stock)) {
    const spec = shipByNorm.get(normalize(shipName));
    if (!spec) {
      addIssue('orphaned-loadout', shipName,
        `Stock loadout exists but no ship spec found`, 'orphaned-loadout');
    }
  }

  // ========== CHECK 2: Orphaned Specs (ship spec exists but no loadout) ==========
  log('[2/6] Checking for orphaned ship specs...');
  for (const ship of ships) {
    // Find matching loadout by normalized name
    let hasLoadout = false;
    for (const loadoutName of Object.keys(stock)) {
      if (normalize(loadoutName) === normalize(ship.name)) {
        hasLoadout = true;
        break;
      }
    }
    if (!hasLoadout) {
      addIssue('orphaned-spec', ship.name,
        `Ship spec exists but no stock loadout found`, 'orphaned-spec');
    }
  }

  // ========== CHECK 3: Cross-validate against ships.json ==========
  if (shipsJson) {
    log('[3/6] Cross-validating against ships.json...');
    const sourceShips = new Map();
    for (const ship of shipsJson) {
      if (ship.IsSpaceship && ship.Name) {
        sourceShips.set(ship.Name, ship);
      }
    }

    // Check if ships in data.js exist in ships.json
    for (const ship of ships) {
      if (!sourceShips.has(ship.name)) {
        // Try normalized match
        let found = false;
        for (const [srcName] of sourceShips) {
          if (normalize(srcName) === normalize(ship.name)) {
            found = true;
            break;
          }
        }
        if (!found) {
          addIssue('not-in-source', ship.name,
            `Ship not found in ships.json - may be outdated or renamed`, 'source');
        }
      }
    }
  } else {
    log('[3/6] Skipping ships.json validation (file not found)');
  }

  log('[4/6] Validating weapon references...');
  log('[5/6] Checking component counts and sizes...');

  // Validate each stock loadout entry against catalogs and (if matched) ship specs
  for (const [shipName, loadout] of Object.entries(stock)) {
    const spec = shipByNorm.get(normalize(shipName)) || null;

    // Skip orphaned loadouts for detailed checks (already flagged above)
    if (!spec) continue;

    // Pilot weapons existence and size checks
    const pws = Array.isArray(loadout.pilotWeapons) ? loadout.pilotWeapons : [];
    pws.forEach((wName, i) => {
      if (wName === 'Empty') return; // Skip intentionally empty hardpoints
      const size = findWeaponSizeByName(SC_DATA, wName);
      if (wName && size == null) addIssue('unknown-weapon', shipName, `pilotWeapons[${i}] '${wName}' not found`, 'unknown');
      if (spec && spec.pilotWeapons && spec.pilotWeapons[i]) {
        const mount = spec.pilotWeapons[i].size;
        if (size != null && size > mount) addIssue('oversized-weapon', shipName, `pilotWeapons[${i}] '${wName}' S${size} > mount S${mount}`, 'oversized');
      }
    });
    if (spec && spec.pilotWeapons) {
      if (pws.length !== spec.pilotWeapons.length) {
        addIssue('pilot-count-mismatch', shipName, `stock has ${pws.length} pilot weapons, spec has ${spec.pilotWeapons.length}`, 'count-mismatch');
      }
      // Check for genuinely missing entries (not 'Empty', just undefined)
      for (let i = 0; i < spec.pilotWeapons.length; i++) {
        const name = pws[i];
        if (name === undefined) addIssue('missing-stock-pilot', shipName, `pilot mount ${i} has no stock weapon`, 'count-mismatch');
      }
    }

    // Turret weapons existence and size checks
    const tws = Array.isArray(loadout.turretWeapons) ? loadout.turretWeapons : [];
    if (tws.length > 0) {
      tws.forEach((wName, i) => {
        if (wName === 'Empty') return; // Skip intentionally empty hardpoints
        const size = findWeaponSizeByName(SC_DATA, wName);
        if (wName && size == null) addIssue('unknown-weapon', shipName, `turretWeapons[${i}] '${wName}' not found`, 'unknown');
      });
      if (spec && spec.turrets && spec.turrets.length) {
        const totalGuns = spec.turrets.reduce((a, t) => a + Math.max(1, t.guns || 1), 0);
        const perTurret = spec.turrets.length;
        if (![totalGuns, perTurret].includes(tws.length)) {
          addIssue('turret-count-mismatch', shipName, `turretWeapons has ${tws.length}, expected ${totalGuns} (per-gun) or ${perTurret} (per-turret)`, 'count-mismatch');
        }
        // Check sizes assuming per-gun list when lengths match, else treat as per-turret representative
        if (tws.length === totalGuns) {
          let idx = 0;
          spec.turrets.forEach((t, ti) => {
            const want = Math.max(1, t.guns || 1);
            for (let j = 0; j < want; j++) {
              const name = tws[idx++];
              const size = findWeaponSizeByName(SC_DATA, name);
              if (name && size != null && size > t.size) addIssue('oversized-weapon', shipName, `turret ${ti} gun ${j} '${name}' S${size} > mount S${t.size}`, 'oversized');
            }
          });
        } else if (tws.length === perTurret) {
          spec.turrets.forEach((t, ti) => {
            const name = tws[ti];
            const size = findWeaponSizeByName(SC_DATA, name);
            if (name && size != null && size > t.size) addIssue('oversized-weapon', shipName, `turret ${ti} '${name}' S${size} > mount S${t.size}`, 'oversized');
          });
        }
      }
    }
    // If stock lists turrets but spec has none
    if (tws.length > 0 && spec && (!spec.turrets || spec.turrets.length === 0)) {
      addIssue('turret-spec-missing', shipName, `${tws.length} turret weapons in stock but spec has no turrets`, 'count-mismatch');
    }
    // If spec has turrets but stock has none
    if (tws.length === 0 && spec && spec.turrets && spec.turrets.length > 0) {
      const totalGuns = spec.turrets.reduce((a, t) => a + Math.max(1, t.guns || 1), 0);
      addIssue('turret-stock-missing', shipName, `spec has ${spec.turrets.length} turrets (${totalGuns} guns) but stock has none`, 'count-mismatch');
    }

    // Shields, power plants, coolers, quantum drives — existence, size, and count
    const checkList = [
      ['shields', shieldsByName, 'shields'],
      ['powerPlants', ppsByName, 'powerPlants'],
      ['coolers', coolersByName, 'coolers'],
      ['quantumDrives', qdByName, 'quantumDrive'],
    ];
    checkList.forEach(([key, idx, specKey]) => {
      const arr = Array.isArray(loadout[key]) ? loadout[key] : [];

      // Check each component exists and size matches
      arr.forEach((name, i) => {
        if (!name) return;
        const found = idx.get(name.toLowerCase());
        if (!found) addIssue('unknown-component', shipName, `${key}[${i}] '${name}' not found`, 'unknown');

        // Size check - component size should be <= slot size (undersizing allowed)
        const specData = spec[specKey];
        if (specData && found && found.size != null) {
          const slotSize = specData.size;
          if (slotSize != null && found.size > slotSize) {
            addIssue('oversized-component', shipName, `${key}[${i}] '${name}' S${found.size} > slot S${slotSize}`, 'oversized');
          }
        }
      });

      // Count check
      const specData = spec[specKey];
      if (specData) {
        // QD: expect 1 only if slot size > 0 (snubs have size 0 = no usable QD slot)
        const expectedCount = specKey === 'quantumDrive'
          ? (specData.size > 0 ? 1 : 0)
          : (specData.count || 0);
        if (arr.length !== expectedCount) {
          addIssue('component-count-mismatch', shipName, `${key}: stock has ${arr.length}, spec expects ${expectedCount}`, 'count-mismatch');
        }
      }
    });
  }

  // --json mode: output structured JSON and skip text report / file writing
  if (JSON_OUTPUT) {
    const output = {
      summary,
      issues,
      metadata: {
        shipsCount: ships.length,
        loadoutsCount: Object.keys(stock).length,
        generatedAt: new Date().toISOString()
      }
    };
    process.stdout.write(JSON.stringify(output, null, 2) + '\n');
    return issues.length;
  }

  log('[6/6] Generating report...');

  // Print summary
  log('\n' + '='.repeat(50));
  log('VALIDATION SUMMARY');
  log('='.repeat(50));

  log(`\nShips in data.js:     ${ships.length}`);
  log(`Stock loadouts:       ${Object.keys(stock).length}`);
  if (shipsJson) {
    const sourceCount = shipsJson.filter(s => s.IsSpaceship).length;
    log(`Ships in ships.json:  ${sourceCount}`);
  }

  log('\n--- Issue Counts by Category ---');
  log(`Orphaned loadouts (no ship spec):  ${summary.orphanedLoadouts}`);
  log(`Orphaned specs (no loadout):       ${summary.orphanedSpecs}`);
  log(`Count mismatches:                  ${summary.countMismatches}`);
  log(`Unknown items:                     ${summary.unknownItems}`);
  log(`Oversized items:                   ${summary.oversizedItems}`);
  log(`Size mismatches:                   ${summary.sizeMismatches}`);
  if (shipsJson) {
    log(`Source discrepancies:              ${summary.sourceDiscrepancies}`);
  }
  log(`${'─'.repeat(40)}`);
  log(`TOTAL ISSUES:                      ${issues.length}`);

  if (issues.length === 0) {
    log('\n✓ No issues found! Data is consistent.');
    return 0;
  }

  // Group by category for detailed output
  const byCategory = new Map();
  for (const it of issues) {
    if (!byCategory.has(it.category)) byCategory.set(it.category, []);
    byCategory.get(it.category).push(it);
  }

  // Print detailed issues by category
  const categoryOrder = ['orphaned-loadout', 'orphaned-spec', 'count-mismatch', 'unknown', 'oversized', 'size-mismatch', 'source', 'other'];
  const categoryNames = {
    'orphaned-loadout': 'ORPHANED LOADOUTS (loadout exists but no ship spec)',
    'orphaned-spec': 'ORPHANED SPECS (ship spec exists but no loadout)',
    'count-mismatch': 'COUNT MISMATCHES',
    'unknown': 'UNKNOWN ITEMS (not in component/weapon database)',
    'oversized': 'OVERSIZED ITEMS (item size > slot size)',
    'size-mismatch': 'SIZE MISMATCHES',
    'source': 'SOURCE DISCREPANCIES (ships.json comparison)',
    'other': 'OTHER ISSUES'
  };

  for (const cat of categoryOrder) {
    const catIssues = byCategory.get(cat);
    if (!catIssues || catIssues.length === 0) continue;

    log(`\n${'─'.repeat(50)}`);
    log(`${categoryNames[cat]} (${catIssues.length})`);
    log('─'.repeat(50));

    // Group by ship within category
    const byShip = new Map();
    for (const it of catIssues) {
      if (!byShip.has(it.ship)) byShip.set(it.ship, []);
      byShip.get(it.ship).push(it);
    }

    for (const [ship, arr] of byShip.entries()) {
      log(`\n  ${ship}:`);
      arr.forEach(x => log(`    - ${x.type}: ${x.detail}`));
    }
  }

  // Write detailed report to file
  const reportPath = path.join(__dirname, 'validation_report.txt');
  const reportLines = [
    'SC Component Tracker - Validation Report',
    `Generated: ${new Date().toISOString()}`,
    '',
    `Ships in data.js: ${ships.length}`,
    `Stock loadouts: ${Object.keys(stock).length}`,
    '',
    '=== SUMMARY ===',
    `Orphaned loadouts: ${summary.orphanedLoadouts}`,
    `Orphaned specs: ${summary.orphanedSpecs}`,
    `Count mismatches: ${summary.countMismatches}`,
    `Unknown items: ${summary.unknownItems}`,
    `Oversized items: ${summary.oversizedItems}`,
    `Size mismatches: ${summary.sizeMismatches}`,
    `Source discrepancies: ${summary.sourceDiscrepancies}`,
    `TOTAL: ${issues.length}`,
    '',
    '=== DETAILED ISSUES ==='
  ];

  for (const cat of categoryOrder) {
    const catIssues = byCategory.get(cat);
    if (!catIssues || catIssues.length === 0) continue;
    reportLines.push('', `--- ${categoryNames[cat]} ---`);
    for (const it of catIssues) {
      reportLines.push(`${it.ship}: ${it.type} - ${it.detail}`);
    }
  }

  fs.writeFileSync(reportPath, reportLines.join('\n'));
  log(`\n\nDetailed report written to: ${reportPath}`);

  return issues.length;
}

process.exitCode = validate();
