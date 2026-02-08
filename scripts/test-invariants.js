#!/usr/bin/env node
// Property-based invariant tests for ship extraction data
// Tests verify properties that MUST hold for ALL ships

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const EXTRACTED_SHIPS = require('./extracted-ships.js');
const EXTRACTED_LOADOUTS = require('./extracted-loadouts.js');

// Known manufacturers from the Star Citizen universe
// Sourced from extracted-ships.js. Note: "Kruger Intergalatic" is a known
// misspelling in the source data (missing 'c' in Intergalactic).
// Note: "Grey's Market" contains an apostrophe — handle with care in string comparisons.
const KNOWN_MANUFACTURERS = [
  'Aegis', 'Anvil', 'Aopoa', 'Argo', 'Banu', 'Consolidated Outland',
  'Crusader', 'Drake', 'Esperia', 'Gatac', "Grey's Market",
  'Kruger Intergalatic', 'MISC', 'Mirai', 'Origin', 'RSI', 'Vanduul'
];

const VALID_SIZE_CATEGORIES = ['Snub', 'Small', 'Medium', 'Large', 'Capital'];
const VALID_TURRET_TYPES = ['manned', 'remote'];

// Placeholder names that should NOT appear in loadout data.
// WARNING: Short strings like 'HEAT' and 'POWER' could potentially collide
// with real component names. Uses exact matching, not substring matching.
const PLACEHOLDER_NAMES = [
  '<= PLACEHOLDER =>',
  'HEAT',
  'SHIELDS',
  'POWER',
  'Access'
];

describe('Ship Spec Invariants', () => {

  it('should have at least 100 ships in dataset', () => {
    assert.ok(EXTRACTED_SHIPS.length >= 100,
      `Expected at least 100 ships, got ${EXTRACTED_SHIPS.length}`);
  });

  it('every ship should have non-empty name', () => {
    EXTRACTED_SHIPS.forEach(ship => {
      assert.ok(ship.name, `Ship missing name: ${JSON.stringify(ship)}`);
      assert.ok(ship.name.length > 0, `Ship has empty name: ${JSON.stringify(ship)}`);
      assert.strictEqual(typeof ship.name, 'string',
        `Ship name is not a string: ${ship.name}`);
    });
  });

  it('every ship should have known manufacturer', () => {
    EXTRACTED_SHIPS.forEach(ship => {
      assert.ok(ship.manufacturer,
        `Ship "${ship.name}" missing manufacturer`);
      assert.ok(KNOWN_MANUFACTURERS.includes(ship.manufacturer),
        `Ship "${ship.name}" has unknown manufacturer: ${ship.manufacturer}`);
    });
  });

  it('every ship should have valid size category', () => {
    EXTRACTED_SHIPS.forEach(ship => {
      assert.ok(ship.size, `Ship "${ship.name}" missing size`);
      assert.ok(VALID_SIZE_CATEGORIES.includes(ship.size),
        `Ship "${ship.name}" has invalid size category: ${ship.size}`);
    });
  });

  // Max weapon size in data is 10 (capital ships like Idris-M).
  // data.js documents S1-S7 for standard ships, but capital ships exceed this.
  it('pilot weapon sizes should be in range 0-10', () => {
    EXTRACTED_SHIPS.forEach(ship => {
      assert.ok(Array.isArray(ship.pilotWeapons),
        `Ship "${ship.name}" pilotWeapons is not an array`);

      ship.pilotWeapons.forEach((weapon, idx) => {
        assert.ok(typeof weapon.size === 'number',
          `Ship "${ship.name}" pilot weapon ${idx} size is not a number`);
        assert.ok(weapon.size >= 0 && weapon.size <= 10,
          `Ship "${ship.name}" pilot weapon ${idx} has size ${weapon.size} (expected 0-10)`);
      });
    });
  });

  // Max turret size in data is 8 (capital ships).
  it('turret sizes should be in range 0-10 and gun counts positive', () => {
    EXTRACTED_SHIPS.forEach(ship => {
      assert.ok(Array.isArray(ship.turrets),
        `Ship "${ship.name}" turrets is not an array`);

      ship.turrets.forEach((turret, idx) => {
        assert.ok(typeof turret.size === 'number',
          `Ship "${ship.name}" turret ${idx} size is not a number`);
        assert.ok(turret.size >= 0 && turret.size <= 10,
          `Ship "${ship.name}" turret ${idx} has size ${turret.size} (expected 0-10)`);

        assert.ok(typeof turret.guns === 'number',
          `Ship "${ship.name}" turret ${idx} guns is not a number`);
        assert.ok(turret.guns > 0,
          `Ship "${ship.name}" turret ${idx} has ${turret.guns} guns (expected > 0)`);
      });
    });
  });

  it('turret types should be "manned" or "remote"', () => {
    EXTRACTED_SHIPS.forEach(ship => {
      ship.turrets.forEach((turret, idx) => {
        assert.ok(turret.type,
          `Ship "${ship.name}" turret ${idx} missing type`);
        assert.ok(VALID_TURRET_TYPES.includes(turret.type),
          `Ship "${ship.name}" turret ${idx} has invalid type: ${turret.type}`);
      });
    });
  });

  it('component counts and sizes should be non-negative', () => {
    // shields, powerPlants, coolers have {count, size}; quantumDrive has {size} only
    const componentsWithCount = ['shields', 'powerPlants', 'coolers'];

    EXTRACTED_SHIPS.forEach(ship => {
      componentsWithCount.forEach(comp => {
        assert.ok(ship[comp],
          `Ship "${ship.name}" missing ${comp}`);
        assert.ok(typeof ship[comp].count === 'number',
          `Ship "${ship.name}" ${comp}.count is not a number`);
        assert.ok(typeof ship[comp].size === 'number',
          `Ship "${ship.name}" ${comp}.size is not a number`);
        assert.ok(ship[comp].count >= 0,
          `Ship "${ship.name}" ${comp}.count is ${ship[comp].count} (expected >= 0)`);
        assert.ok(ship[comp].size >= 0,
          `Ship "${ship.name}" ${comp}.size is ${ship[comp].size} (expected >= 0)`);
      });

      // quantumDrive has {size} only
      assert.ok(ship.quantumDrive,
        `Ship "${ship.name}" missing quantumDrive`);
      assert.ok(typeof ship.quantumDrive.size === 'number',
        `Ship "${ship.name}" quantumDrive.size is not a number`);
      assert.ok(ship.quantumDrive.size >= 0,
        `Ship "${ship.name}" quantumDrive.size is ${ship.quantumDrive.size} (expected >= 0)`);
    });
  });

  it('snub ships should have quantum drive size 0', () => {
    const snubShips = EXTRACTED_SHIPS.filter(ship => ship.size === 'Snub');

    // Snub ships may not be present in extracted data (only in data.js)
    if (snubShips.length === 0) return;

    snubShips.forEach(ship => {
      assert.strictEqual(ship.quantumDrive.size, 0,
        `Snub ship "${ship.name}" has QD size ${ship.quantumDrive.size} (expected 0)`);
    });
  });

  it('capital ships should have component sizes >= 3', () => {
    const capitalShips = EXTRACTED_SHIPS.filter(ship => ship.size === 'Capital');

    if (capitalShips.length > 0) {
      const components = ['shields', 'powerPlants', 'coolers'];

      capitalShips.forEach(ship => {
        components.forEach(comp => {
          if (ship[comp].count > 0) {
            assert.ok(ship[comp].size >= 3,
              `Capital ship "${ship.name}" has ${comp} size ${ship[comp].size} (expected >= 3)`);
          }
        });
      });
    }
  });

  it('no ship should have more than 20 pilot weapons', () => {
    EXTRACTED_SHIPS.forEach(ship => {
      assert.ok(ship.pilotWeapons.length <= 20,
        `Ship "${ship.name}" has ${ship.pilotWeapons.length} pilot weapons (expected <= 20)`);
    });
  });

  it('no ship should have more than 15 turrets', () => {
    EXTRACTED_SHIPS.forEach(ship => {
      assert.ok(ship.turrets.length <= 15,
        `Ship "${ship.name}" has ${ship.turrets.length} turrets (expected <= 15)`);
    });
  });
});

describe('Loadout Invariants', () => {

  it('should have at least 100 loadouts in dataset', () => {
    const loadoutCount = Object.keys(EXTRACTED_LOADOUTS).length;
    assert.ok(loadoutCount >= 100,
      `Expected at least 100 loadouts, got ${loadoutCount}`);
  });

  it('every loadout should have required arrays', () => {
    const requiredArrays = [
      'pilotWeapons',
      'turretWeapons',
      'shields',
      'powerPlants',
      'coolers',
      'quantumDrives'
    ];

    Object.entries(EXTRACTED_LOADOUTS).forEach(([shipName, loadout]) => {
      requiredArrays.forEach(arrayName => {
        assert.ok(loadout[arrayName] !== undefined,
          `Loadout "${shipName}" missing ${arrayName}`);
        assert.ok(Array.isArray(loadout[arrayName]),
          `Loadout "${shipName}" ${arrayName} is not an array`);
      });
    });
  });

  it('weapon names should be non-empty strings', () => {
    Object.entries(EXTRACTED_LOADOUTS).forEach(([shipName, loadout]) => {
      loadout.pilotWeapons.forEach((weapon, idx) => {
        assert.strictEqual(typeof weapon, 'string',
          `Loadout "${shipName}" pilot weapon ${idx} is not a string`);
        assert.ok(weapon.length > 0,
          `Loadout "${shipName}" pilot weapon ${idx} is empty string`);
      });

      loadout.turretWeapons.forEach((weapon, idx) => {
        assert.strictEqual(typeof weapon, 'string',
          `Loadout "${shipName}" turret weapon ${idx} is not a string`);
        assert.ok(weapon.length > 0,
          `Loadout "${shipName}" turret weapon ${idx} is empty string`);
      });
    });
  });

  it('component names should be non-empty strings', () => {
    const components = ['shields', 'powerPlants', 'coolers', 'quantumDrives'];

    Object.entries(EXTRACTED_LOADOUTS).forEach(([shipName, loadout]) => {
      components.forEach(comp => {
        loadout[comp].forEach((item, idx) => {
          assert.strictEqual(typeof item, 'string',
            `Loadout "${shipName}" ${comp} ${idx} is not a string`);
          assert.ok(item.length > 0,
            `Loadout "${shipName}" ${comp} ${idx} is empty string`);
        });
      });
    });
  });

  it('should not contain placeholder names', () => {
    Object.entries(EXTRACTED_LOADOUTS).forEach(([shipName, loadout]) => {
      const allItems = [
        ...loadout.pilotWeapons,
        ...loadout.turretWeapons,
        ...loadout.shields,
        ...loadout.powerPlants,
        ...loadout.coolers,
        ...loadout.quantumDrives
      ];

      allItems.forEach(item => {
        assert.ok(!PLACEHOLDER_NAMES.includes(item),
          `Loadout "${shipName}" contains placeholder: ${item}`);
      });
    });
  });
});

describe('Cross-validation Invariants', () => {

  it('most specs (>90%) should have matching loadouts', () => {
    const specsWithLoadouts = EXTRACTED_SHIPS.filter(ship =>
      EXTRACTED_LOADOUTS[ship.name] !== undefined
    );

    const matchRate = specsWithLoadouts.length / EXTRACTED_SHIPS.length;

    assert.ok(matchRate > 0.90,
      `Only ${(matchRate * 100).toFixed(1)}% of specs have loadouts (expected > 90%)`);
  });

  // Threshold of 10 allows for known discrepancies: some ships have turret
  // weapons misclassified as pilot weapons in the source data.
  it('loadout pilot weapon count should be <= spec pilot weapon count (with tolerance)', () => {
    const violations = [];

    EXTRACTED_SHIPS.forEach(ship => {
      const loadout = EXTRACTED_LOADOUTS[ship.name];
      if (!loadout) return;

      const specCount = ship.pilotWeapons.length;
      const loadoutCount = loadout.pilotWeapons.length;

      if (loadoutCount > specCount) {
        violations.push({
          ship: ship.name,
          specCount,
          loadoutCount
        });
      }
    });

    assert.ok(violations.length <= 10,
      `Too many pilot weapon count violations (${violations.length}): ${JSON.stringify(violations.slice(0, 5))}`);
  });

  it('ships with QD size 0 should have 0 quantum drives in loadout', () => {
    const violations = [];

    EXTRACTED_SHIPS.forEach(ship => {
      const loadout = EXTRACTED_LOADOUTS[ship.name];
      if (!loadout) return;

      if (ship.quantumDrive.size === 0 && loadout.quantumDrives.length > 0) {
        violations.push({
          ship: ship.name,
          qdSize: ship.quantumDrive.size,
          loadoutQD: loadout.quantumDrives.length
        });
      }
    });

    assert.strictEqual(violations.length, 0,
      `Ships with QD size 0 have quantum drives in loadout: ${JSON.stringify(violations)}`);
  });

  // Tolerance: allows loadout count to differ from spec by up to specCount
  // (i.e., up to 2x the spec). This is generous because spec shows max slots
  // while loadout shows only equipped items.
  it('loadout component counts should match spec counts (with tolerance)', () => {
    const components = ['shields', 'powerPlants', 'coolers'];
    const violations = [];

    EXTRACTED_SHIPS.forEach(ship => {
      const loadout = EXTRACTED_LOADOUTS[ship.name];
      if (!loadout) return;

      components.forEach(comp => {
        const specCount = ship[comp].count;
        const loadoutCount = loadout[comp].length;

        // Allow some tolerance for spec showing max slots vs equipped
        if (Math.abs(specCount - loadoutCount) > specCount) {
          violations.push({
            ship: ship.name,
            component: comp,
            specCount,
            loadoutCount
          });
        }
      });
    });

    // Assert with a threshold — too many mismatches indicates a data issue
    assert.ok(violations.length <= 20,
      `Too many component count mismatches (${violations.length}): ${JSON.stringify(violations.slice(0, 5))}`);
  });
});

describe('Data Quality Metrics', () => {

  it('should report dataset statistics', () => {
    const stats = {
      totalShips: EXTRACTED_SHIPS.length,
      totalLoadouts: Object.keys(EXTRACTED_LOADOUTS).length,
      matchRate: `${((EXTRACTED_SHIPS.filter(s => EXTRACTED_LOADOUTS[s.name]).length / EXTRACTED_SHIPS.length) * 100).toFixed(1)}%`,
      sizeDistribution: {},
      manufacturerDistribution: {}
    };

    EXTRACTED_SHIPS.forEach(ship => {
      stats.sizeDistribution[ship.size] = (stats.sizeDistribution[ship.size] || 0) + 1;
      stats.manufacturerDistribution[ship.manufacturer] =
        (stats.manufacturerDistribution[ship.manufacturer] || 0) + 1;
    });

    console.log('\nDataset Statistics:');
    console.log(JSON.stringify(stats, null, 2));

    // Verify distributions are non-empty
    assert.ok(Object.keys(stats.sizeDistribution).length > 0, 'Size distribution is empty');
    assert.ok(Object.keys(stats.manufacturerDistribution).length > 0, 'Manufacturer distribution is empty');
  });
});
