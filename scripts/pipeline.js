#!/usr/bin/env node
/**
 * Unified data update pipeline
 * Orchestrates: extract → sync → validate in a single command
 *
 * Usage:
 *   node scripts/pipeline.js              # Preview mode (dry run)
 *   node scripts/pipeline.js --apply      # Apply changes
 *   node scripts/pipeline.js --validate   # Run validation only
 *   node scripts/pipeline.js --help       # Show this help
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const apply = args.includes('--apply');
const validateOnly = args.includes('--validate');

if (args.includes('--help') || args.includes('-h')) {
    console.log(`SC Component Tracker - Data Pipeline

Usage:
  node scripts/pipeline.js              Preview mode (dry run)
  node scripts/pipeline.js --apply      Apply changes to data.js
  node scripts/pipeline.js --validate   Run validation only
  node scripts/pipeline.js --help       Show this help

Workflow:
  1. Checks for ships.json in project root
  2. Extracts ship specs from ships.json
  3. Extracts stock loadouts from ships.json
  4. Syncs extracted data into data.js (preview or apply)
  5. Validates data integrity (~131 issues are expected)`);
    process.exit(0);
}

const root = path.join(__dirname, '..');
const shipsJsonPath = path.join(root, 'ships.json');

const BOX_WIDTH = 52;
const INNER_WIDTH = BOX_WIDTH - 4; // account for "║  " and "║"

function run(cmd, label, { allowNonZero = false } = {}) {
    console.log(`\n${'─'.repeat(BOX_WIDTH)}`);
    console.log(`▶ ${label}`);
    console.log('─'.repeat(BOX_WIDTH));
    try {
        const output = execSync(cmd, {
            encoding: 'utf8',
            cwd: root,
            stdio: ['pipe', 'pipe', 'pipe']
        });
        console.log(output);
        return { success: true, output };
    } catch (e) {
        const output = e.stdout || e.message;
        if (allowNonZero && e.stdout) {
            // Non-zero exit is expected (e.g., validate.js exits with issue count)
            console.log(e.stdout);
            if (e.stderr) console.error(e.stderr);
            return { success: true, output };
        }
        console.error(e.stdout || '');
        console.error(e.stderr || '');
        return { success: false, output };
    }
}

console.log(`╔${'═'.repeat(BOX_WIDTH - 2)}╗`);
console.log(`║${' SC Component Tracker - Data Pipeline '.padStart(Math.floor((BOX_WIDTH - 2 + 38) / 2)).padEnd(BOX_WIDTH - 2)}║`);
console.log(`╠${'═'.repeat(BOX_WIDTH - 2)}╣`);
console.log(`║  Mode: ${(apply ? 'APPLY' : validateOnly ? 'VALIDATE ONLY' : 'PREVIEW (dry run)').padEnd(INNER_WIDTH - 5)}║`);
console.log(`╚${'═'.repeat(BOX_WIDTH - 2)}╝`);

const results = [];

if (!validateOnly) {
    // Step 1: Check for ships.json
    if (!fs.existsSync(shipsJsonPath)) {
        console.error('\n✗ ships.json not found in project root.');
        console.error('  Download it from scunpacked and place it in the project root.');
        process.exit(1);
    }
    const stats = fs.statSync(shipsJsonPath);
    console.log(`\nships.json found (${(stats.size / 1024 / 1024).toFixed(1)} MB, modified ${stats.mtime.toISOString().split('T')[0]})`);

    // Step 2: Extract ships
    const r1 = run('node scripts/extract-ships.js', 'Step 1/4: Extracting ship specs');
    results.push({ step: 'extract-ships', ...r1 });
    if (!r1.success) {
        console.error('\n✗ Ship extraction failed. Aborting pipeline.');
        process.exit(1);
    }
    // Verify extraction output exists
    const extractedShipsPath = path.join(root, 'scripts', 'extracted-ships.js');
    if (!fs.existsSync(extractedShipsPath)) {
        console.error('\n✗ extracted-ships.js not found after extraction. Aborting pipeline.');
        process.exit(1);
    }

    // Step 3: Extract loadouts
    const r2 = run('node scripts/extract-loadouts.js', 'Step 2/4: Extracting stock loadouts');
    results.push({ step: 'extract-loadouts', ...r2 });
    if (!r2.success) {
        console.error('\n✗ Loadout extraction failed. Aborting pipeline.');
        process.exit(1);
    }
    // Verify extraction output exists
    const extractedLoadoutsPath = path.join(root, 'scripts', 'extracted-loadouts.js');
    if (!fs.existsSync(extractedLoadoutsPath)) {
        console.error('\n✗ extracted-loadouts.js not found after extraction. Aborting pipeline.');
        process.exit(1);
    }

    // Step 4: Sync
    const syncCmd = apply
        ? 'node scripts/sync-all-data.js --apply'
        : 'node scripts/sync-all-data.js';
    const r3 = run(syncCmd, `Step 3/4: Syncing data${apply ? ' (APPLYING)' : ' (preview)'}`);
    results.push({ step: 'sync', ...r3 });
    if (!r3.success) {
        console.error('\n✗ Sync failed. Aborting pipeline.');
        process.exit(1);
    }
}

// Step 5: Validate (allowNonZero because validate.js exits with issue count)
const stepLabel = validateOnly ? 'Validation' : 'Step 4/4: Validating data integrity';
const r4 = run('node validate.js', stepLabel, { allowNonZero: true });
results.push({ step: 'validate', ...r4 });

// Parse validation results
const issueMatch = r4.output.match(/TOTAL ISSUES:\s+(\d+)/);
const issueCount = issueMatch ? parseInt(issueMatch[1]) : -1;

// Parse category breakdown for validate-only mode
if (validateOnly && r4.output) {
    const categories = [
        'Orphaned loadouts', 'Orphaned specs', 'Count mismatches',
        'Unknown items', 'Oversized items', 'Source discrepancies'
    ];
    const breakdown = [];
    for (const cat of categories) {
        const m = r4.output.match(new RegExp(`${cat}:\\s+(\\d+)`));
        if (m && parseInt(m[1]) > 0) breakdown.push(`${cat}: ${m[1]}`);
    }
    if (breakdown.length) {
        console.log('\nBreakdown:');
        breakdown.forEach(b => console.log(`  ${b}`));
    }
}

// Summary
console.log(`\n╔${'═'.repeat(BOX_WIDTH - 2)}╗`);
console.log(`║${'Pipeline Summary'.padStart(Math.floor((BOX_WIDTH - 2 + 16) / 2)).padEnd(BOX_WIDTH - 2)}║`);
console.log(`╠${'═'.repeat(BOX_WIDTH - 2)}╣`);
results.forEach(r => {
    const status = r.success ? '✓' : '✗';
    console.log(`║  ${status} ${r.step.padEnd(INNER_WIDTH - 1)}║`);
});
if (issueCount >= 0) {
    console.log(`║  Validation issues: ${String(issueCount).padEnd(INNER_WIDTH - 19)}║`);
}
console.log(`╚${'═'.repeat(BOX_WIDTH - 2)}╝`);

if (!apply && !validateOnly) {
    console.log('\nThis was a preview. Run with --apply to write changes.');
}

process.exit(results.every(r => r.success) ? 0 : 1);
