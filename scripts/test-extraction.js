#!/usr/bin/env node
/**
 * Test script for ship extraction pipeline
 * Validates that extract-ships.js and extract-loadouts.js produce correct results
 *
 * Run with: node --test scripts/test-extraction.js
 */

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');

const extractedShips = require('./extracted-ships.js');
const extractedLoadouts = require('./extracted-loadouts.js');

function getShip(name) {
    return extractedShips.find(s => s.name === name);
}

function getLoadout(name) {
    return extractedLoadouts[name];
}

describe('Ship Extraction', () => {
    describe('Snub ships QD size', () => {
        const snubs = [
            'Kruger P-52 Merlin',
            'Kruger P-72 Archimedes',
            'Mirai Fury',
            'Mirai Fury MX',
            'Mirai Fury LX',
            'Argo MPUV Cargo',
            'Argo MPUV Personnel',
            'Argo MPUV Tractor'
        ];
        for (const name of snubs) {
            it(`${name} has QD size 0`, () => {
                const ship = getShip(name);
                assert.ok(ship, `${name} not found`);
                assert.equal(ship.quantumDrive.size, 0);
            });
        }
    });

    describe('Merlin pilot weapons (NoseMounted fix)', () => {
        it('has 3 pilot weapons', () => {
            const merlin = getShip('Kruger P-52 Merlin');
            assert.ok(merlin, 'Merlin not found');
            assert.equal(merlin.pilotWeapons.length, 3);
        });
        it('has S2 nose gun', () => {
            const merlin = getShip('Kruger P-52 Merlin');
            assert.ok(merlin, 'Merlin not found');
            assert.ok(merlin.pilotWeapons.some(w => w.size === 2),
                `Sizes: ${merlin.pilotWeapons.map(w => w.size).join(', ')}`);
        });
        it('has 2x S1 wing guns', () => {
            const merlin = getShip('Kruger P-52 Merlin');
            assert.ok(merlin, 'Merlin not found');
            assert.equal(merlin.pilotWeapons.filter(w => w.size === 1).length, 2);
        });
    });

    describe('Asgard weapon classification', () => {
        it('has 6 pilot weapons', () => {
            const ship = getShip('Anvil Asgard');
            assert.ok(ship, 'Asgard not found');
            assert.equal(ship.pilotWeapons.length, 6);
        });
        it('pilot weapons are all S3', () => {
            const ship = getShip('Anvil Asgard');
            assert.ok(ship, 'Asgard not found');
            assert.ok(ship.pilotWeapons.every(w => w.size === 3),
                `Sizes: ${ship.pilotWeapons.map(w => w.size).join(', ')}`);
        });
        it('has 1 manned turret', () => {
            const ship = getShip('Anvil Asgard');
            assert.ok(ship, 'Asgard not found');
            assert.equal(ship.turrets.length, 1);
        });
        it('turret is 2x S4', () => {
            const ship = getShip('Anvil Asgard');
            assert.ok(ship, 'Asgard not found');
            assert.equal(ship.turrets[0].guns, 2);
            assert.equal(ship.turrets[0].size, 4);
        });
    });

    describe('Reclaimer turret classification', () => {
        it('has 0 pilot weapons', () => {
            const ship = getShip('Aegis Reclaimer');
            assert.ok(ship, 'Reclaimer not found');
            assert.equal(ship.pilotWeapons.length, 0);
        });
        it('has 7 turrets total', () => {
            const ship = getShip('Aegis Reclaimer');
            assert.ok(ship, 'Reclaimer not found');
            assert.equal(ship.turrets.length, 7);
        });
        it('has 1 manned turret', () => {
            const ship = getShip('Aegis Reclaimer');
            assert.ok(ship, 'Reclaimer not found');
            assert.equal(ship.turrets.filter(t => t.type === 'manned').length, 1);
        });
        it('has 6 remote turrets', () => {
            const ship = getShip('Aegis Reclaimer');
            assert.ok(ship, 'Reclaimer not found');
            assert.equal(ship.turrets.filter(t => t.type === 'remote').length, 6);
        });
    });

    describe('Redeemer turret classification', () => {
        it('has 2 pilot weapons', () => {
            const ship = getShip('Aegis Redeemer');
            assert.ok(ship, 'Redeemer not found');
            assert.equal(ship.pilotWeapons.length, 2);
        });
        it('has 4 turrets total', () => {
            const ship = getShip('Aegis Redeemer');
            assert.ok(ship, 'Redeemer not found');
            assert.equal(ship.turrets.length, 4);
        });
        it('has 2 manned turrets', () => {
            const ship = getShip('Aegis Redeemer');
            assert.ok(ship, 'Redeemer not found');
            assert.equal(ship.turrets.filter(t => t.type === 'manned').length, 2);
        });
        it('has 2 remote turrets', () => {
            const ship = getShip('Aegis Redeemer');
            assert.ok(ship, 'Redeemer not found');
            assert.equal(ship.turrets.filter(t => t.type === 'remote').length, 2);
        });
    });

    describe('Standard ships', () => {
        it('Gladius has 3 pilot weapons', () => {
            const ship = getShip('Aegis Gladius');
            assert.ok(ship, 'Gladius not found');
            assert.equal(ship.pilotWeapons.length, 3);
        });
        it('Gladius has no turrets', () => {
            const ship = getShip('Aegis Gladius');
            assert.ok(ship, 'Gladius not found');
            assert.equal(ship.turrets.length, 0);
        });
        it('Hammerhead has 0 pilot weapons', () => {
            const ship = getShip('Aegis Hammerhead');
            assert.ok(ship, 'Hammerhead not found');
            assert.equal(ship.pilotWeapons.length, 0);
        });
        it('Hammerhead has 6 turrets', () => {
            const ship = getShip('Aegis Hammerhead');
            assert.ok(ship, 'Hammerhead not found');
            assert.equal(ship.turrets.length, 6);
        });
    });
});

describe('Stock Loadout', () => {
    describe('Asgard loadout', () => {
        it('has 6 pilot weapons in stock', () => {
            const loadout = getLoadout('Anvil Asgard');
            assert.ok(loadout, 'Asgard loadout not found');
            assert.equal(loadout.pilotWeapons.length, 6);
        });
        it('has 2 turret weapons in stock', () => {
            const loadout = getLoadout('Anvil Asgard');
            assert.ok(loadout, 'Asgard loadout not found');
            assert.equal(loadout.turretWeapons.length, 2);
        });
        it('excludes door guns (no YellowJacket in pilot weapons)', () => {
            const loadout = getLoadout('Anvil Asgard');
            assert.ok(loadout, 'Asgard loadout not found');
            assert.ok(!loadout.pilotWeapons.some(w => w.includes('YellowJacket')),
                `Found YellowJacket: ${loadout.pilotWeapons.filter(w => w.includes('YellowJacket'))}`);
        });
    });

    describe('Merlin loadout', () => {
        it('has 3 pilot weapons in stock', () => {
            const loadout = getLoadout('Kruger P-52 Merlin');
            assert.ok(loadout, 'Merlin loadout not found');
            assert.equal(loadout.pilotWeapons.length, 3);
        });
        it('has 0 turret weapons', () => {
            const loadout = getLoadout('Kruger P-52 Merlin');
            assert.ok(loadout, 'Merlin loadout not found');
            assert.equal(loadout.turretWeapons.length, 0);
        });
    });

    describe('Reclaimer loadout', () => {
        it('has 0 pilot weapons in stock', () => {
            const loadout = getLoadout('Aegis Reclaimer');
            assert.ok(loadout, 'Reclaimer loadout not found');
            assert.equal(loadout.pilotWeapons.length, 0);
        });
        it('has 21 turret weapons (includes PDC)', () => {
            const loadout = getLoadout('Aegis Reclaimer');
            assert.ok(loadout, 'Reclaimer loadout not found');
            // 7 turrets x 2 guns = 14 + 7 PDC turrets x 1 gun = 21 total turret weapons
            // PDC weapons are included in stock but PDC turrets aren't in spec (non-swappable)
            assert.equal(loadout.turretWeapons.length, 21);
        });
    });

    describe('Snub loadouts have no QD', () => {
        const snubsToCheck = ['Kruger P-52 Merlin', 'Kruger P-72 Archimedes', 'Mirai Fury'];
        for (const name of snubsToCheck) {
            it(`${name} has 0 quantum drives in stock`, () => {
                const loadout = getLoadout(name);
                assert.ok(loadout, `${name} loadout not found`);
                assert.equal(loadout.quantumDrives.length, 0);
            });
        }
    });
});
