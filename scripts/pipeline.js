#!/usr/bin/env node
/**
 * Unified data update pipeline
 * Orchestrates: extract → sync → validate in a single command
 *
 * Usage:
 *   node scripts/pipeline.js              # Preview mode (dry run)
 *   node scripts/pipeline.js --apply      # Apply changes
 *   node scripts/pipeline.js --validate   # Run validation only
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const apply = args.includes('--apply');
const validateOnly = args.includes('--validate');

const root = path.join(__dirname, '..');
const shipsJsonPath = path.join(root, 'ships.json');

function run(cmd, label) {
    console.log(`\n${'─'.repeat(50)}`);
    console.log(`▶ ${label}`);
    console.log('─'.repeat(50));
    try {
        const output = execSync(cmd, {
            encoding: 'utf8',
            cwd: root,
            stdio: ['pipe', 'pipe', 'pipe']
        });
        console.log(output);
        return { success: true, output };
    } catch (e) {
        console.error(e.stdout || '');
        console.error(e.stderr || '');
        return { success: false, output: e.stdout || e.message };
    }
}

console.log('╔══════════════════════════════════════════════════╗');
console.log('║       SC Component Tracker - Data Pipeline      ║');
console.log('╠══════════════════════════════════════════════════╣');
console.log(`║  Mode: ${(apply ? 'APPLY' : validateOnly ? 'VALIDATE ONLY' : 'PREVIEW (dry run)').padEnd(41)}║`);
console.log('╚══════════════════════════════════════════════════╝');

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

    // Step 3: Extract loadouts
    const r2 = run('node scripts/extract-loadouts.js', 'Step 2/4: Extracting stock loadouts');
    results.push({ step: 'extract-loadouts', ...r2 });
    if (!r2.success) {
        console.error('\n✗ Loadout extraction failed. Aborting pipeline.');
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

// Step 5: Validate
const stepLabel = validateOnly ? 'Validation' : 'Step 4/4: Validating data integrity';
const r4 = run('node validate.js', stepLabel);
results.push({ step: 'validate', ...r4 });

// Parse validation results
const issueMatch = r4.output.match(/TOTAL ISSUES:\s+(\d+)/);
const issueCount = issueMatch ? parseInt(issueMatch[1]) : -1;

// Summary
console.log('\n╔══════════════════════════════════════════════════╗');
console.log('║                 Pipeline Summary                 ║');
console.log('╠══════════════════════════════════════════════════╣');
results.forEach(r => {
    const status = r.success ? '✓' : '✗';
    console.log(`║  ${status} ${r.step.padEnd(46)}║`);
});
if (issueCount >= 0) {
    console.log(`║  Validation issues: ${String(issueCount).padEnd(28)}║`);
}
console.log('╚══════════════════════════════════════════════════╝');

if (!apply && !validateOnly) {
    console.log('\nThis was a preview. Run with --apply to write changes.');
}

process.exit(results.every(r => r.success) ? 0 : 1);
