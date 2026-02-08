#!/usr/bin/env node
/**
 * End-to-end test for the ship data update pipeline
 * Simulates running the full update process and validates results
 *
 * Run with: node --test scripts/test-update-pipeline.js
 */

const { describe, it, before } = require('node:test');
const assert = require('node:assert/strict');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function run(cmd) {
    try {
        return execSync(cmd, { encoding: 'utf8', cwd: path.join(__dirname, '..') });
    } catch (e) {
        return e.stdout || e.message;
    }
}

describe('Update Pipeline', () => {
    describe('extract-ships.js', () => {
        let shipOutput;

        before(() => {
            shipOutput = run('node scripts/extract-ships.js');
        });

        it('script completes successfully', () => {
            assert.ok(shipOutput.includes('Processed') && shipOutput.includes('ships'),
                `Output: ${shipOutput.slice(0, 200)}`);
        });

        it('output file created', () => {
            assert.ok(fs.existsSync(path.join(__dirname, 'extracted-ships.js')),
                'extracted-ships.js not found');
        });

        it('ships array has more than 200 entries', () => {
            const ships = require('./extracted-ships.js');
            assert.ok(ships.length > 200, `Got: ${ships.length}`);
        });

        it('ships have required fields', () => {
            const ships = require('./extracted-ships.js');
            assert.ok(ships[0].name, 'Missing name field');
            assert.ok(ships[0].manufacturer, 'Missing manufacturer field');
            assert.ok(ships[0].pilotWeapons, 'Missing pilotWeapons field');
        });
    });

    describe('extract-loadouts.js', () => {
        let loadoutOutput;

        before(() => {
            loadoutOutput = run('node scripts/extract-loadouts.js');
        });

        it('script completes successfully', () => {
            assert.ok(loadoutOutput.includes('Processed') && loadoutOutput.includes('loadout'),
                `Output: ${loadoutOutput.slice(0, 200)}`);
        });

        it('output file created', () => {
            assert.ok(fs.existsSync(path.join(__dirname, 'extracted-loadouts.js')),
                'extracted-loadouts.js not found');
        });

        it('loadouts object has more than 200 entries', () => {
            delete require.cache[require.resolve('./extracted-loadouts.js')];
            const loadouts = require('./extracted-loadouts.js');
            const count = Object.keys(loadouts).length;
            assert.ok(count > 200, `Got: ${count}`);
        });

        it('loadouts have required fields', () => {
            const loadouts = require('./extracted-loadouts.js');
            assert.ok(loadouts['Aegis Gladius']?.pilotWeapons, 'Missing pilotWeapons for Gladius');
            assert.ok(loadouts['Aegis Gladius']?.shields, 'Missing shields for Gladius');
        });
    });

    describe('Spec-Loadout consistency', () => {
        let ships;
        let loadouts;

        before(() => {
            ships = require('./extracted-ships.js');
            delete require.cache[require.resolve('./extracted-loadouts.js')];
            loadouts = require('./extracted-loadouts.js');
        });

        function getShip(name) {
            return ships.find(s => s.name === name);
        }

        const testShips = [
            { name: 'Aegis Gladius' },
            { name: 'Anvil Asgard' },
            { name: 'Kruger P-52 Merlin' },
            { name: 'Drake Cutlass Black' },
        ];

        for (const { name } of testShips) {
            it(`${name} pilot weapons match between spec and stock`, () => {
                const spec = getShip(name);
                const loadout = loadouts[name];
                assert.ok(spec, `${name} not found in specs`);
                assert.ok(loadout, `${name} not found in loadouts`);

                const specPilot = spec.pilotWeapons.length;
                const stockPilot = loadout.pilotWeapons.length;
                assert.ok(specPilot === stockPilot || stockPilot <= specPilot,
                    `spec ${specPilot} vs stock ${stockPilot}`);
            });

            it(`${name} turret weapons reasonable between spec and stock`, () => {
                const spec = getShip(name);
                const loadout = loadouts[name];
                assert.ok(spec, `${name} not found in specs`);
                assert.ok(loadout, `${name} not found in loadouts`);

                const specTurretGuns = spec.turrets.reduce((sum, t) => sum + t.guns, 0);
                const stockTurret = loadout.turretWeapons.length;
                // Turret weapons should roughly match (stock may have more due to PDC)
                assert.ok(stockTurret >= specTurretGuns * 0.8 && stockTurret <= specTurretGuns * 2,
                    `spec turret guns ${specTurretGuns}, stock ${stockTurret}`);
            });
        }
    });

    describe('Data integrity', () => {
        let ships;

        before(() => {
            ships = require('./extracted-ships.js');
        });

        it('duplicate count within expected range', () => {
            const shipNames = ships.map(s => s.name);
            const uniqueNames = new Set(shipNames);
            const dupeCount = shipNames.length - uniqueNames.size;
            // Some duplicates expected (e.g., Eclipse, Idris-P have multiple entries in scunpacked)
            assert.ok(dupeCount <= 25,
                `Total: ${shipNames.length}, Unique: ${uniqueNames.size}, Dupes: ${dupeCount}`);
        });
    });

    describe('Weapon size sanity checks', () => {
        let ships;

        before(() => {
            ships = require('./extracted-ships.js');
        });

        it('all weapon sizes in valid range (0-10)', () => {
            const invalidSizes = ships.filter(s =>
                s.pilotWeapons.some(w => w.size < 0 || w.size > 10) ||
                s.turrets.some(t => t.size < 0 || t.size > 10)
            );
            assert.equal(invalidSizes.length, 0,
                `Ships with invalid sizes: ${invalidSizes.map(s => s.name).join(', ')}`);
        });
    });

    describe('Component count checks', () => {
        let ships;

        before(() => {
            ships = require('./extracted-ships.js');
        });

        it('most ships have components', () => {
            const shipsWithComponents = ships.filter(s =>
                s.shields.count > 0 || s.powerPlants.count > 0 || s.coolers.count > 0
            );
            assert.ok(shipsWithComponents.length > ships.length * 0.9,
                `Ships with components: ${shipsWithComponents.length}/${ships.length}`);
        });
    });

    describe('Validation script', () => {
        let validationOutput;

        before(() => {
            validationOutput = run('node validate.js');
        });

        it('validation completes and parses issue count', () => {
            const issueMatch = validationOutput.match(/TOTAL ISSUES:\s+(\d+)/);
            assert.ok(issueMatch, 'Could not parse validation output');
            const totalIssues = parseInt(issueMatch[1]);
            assert.ok(totalIssues >= 0, `Unexpected issue count: ${totalIssues}`);
        });
    });
});
