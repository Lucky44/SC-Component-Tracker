#!/usr/bin/env node

/**
 * Apply solutions from wiki data to stockLoadouts in data.js
 * This reads solutions_from_wiki.json and updates data.js
 */

const fs = require('fs');
const path = require('path');

// Read solutions
const solutionsPath = path.join(__dirname, 'solutions_from_wiki.json');
const solutions = JSON.parse(fs.readFileSync(solutionsPath, 'utf8'));

// Read data.js and extract stockLoadouts section
const dataPath = path.join(__dirname, '..', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

// Find stockLoadouts section (lines 1948-3991)
const lines = dataContent.split('\n');
const stockLoadoutsStart = 1947; // 0-indexed, so line 1948
const stockLoadoutsEnd = 3990; // 0-indexed, so line 3991

// Extract and parse stockLoadouts
const stockLoadoutsLines = lines.slice(stockLoadoutsStart + 1, stockLoadoutsEnd); // Skip "SC_DATA.stockLoadouts = {" and closing "};"
const stockLoadoutsCode = '({' + stockLoadoutsLines.join('\n') + '})';
const stockLoadouts = eval(stockLoadoutsCode);

console.log(`Loaded ${Object.keys(stockLoadouts).length} stockLoadouts\n`);

let updatesApplied = 0;
let shipsUpdated = 0;

// Apply solutions for each ship
Object.entries(solutions.solutions).forEach(([shipName, solution]) => {
  console.log(`\nProcessing: ${shipName}`);
  
  if (!stockLoadouts[shipName]) {
    console.log(`  ❌ Ship not found in stockLoadouts: ${shipName}`);
    return;
  }
  
  const loadout = stockLoadouts[shipName];
  let shipUpdates = 0;
  
  // Apply pilot weapons
  if (solution.pilotWeapon) {
    if (!loadout.pilotWeapons) loadout.pilotWeapons = [];
    Object.entries(solution.pilotWeapon).forEach(([slot, weapon]) => {
      const slotNum = parseInt(slot);
      if (!loadout.pilotWeapons[slotNum] || loadout.pilotWeapons[slotNum] === '') {
        loadout.pilotWeapons[slotNum] = weapon;
        shipUpdates++;
        console.log(`  ✓ Set pilotWeapon[${slot}] = "${weapon}"`);
      }
    });
  }
  
  // Apply turret weapons
  if (solution.turretWeapon) {
    if (!loadout.turretWeapons) loadout.turretWeapons = [];
    Object.entries(solution.turretWeapon).forEach(([slot, weapon]) => {
      const slotNum = parseInt(slot);
      if (!loadout.turretWeapons[slotNum] || loadout.turretWeapons[slotNum] === '') {
        loadout.turretWeapons[slotNum] = weapon;
        shipUpdates++;
        console.log(`  ✓ Set turretWeapon[${slot}] = "${weapon}"`);
      }
    });
  }
  
  // Apply shields
  if (solution.shields) {
    Object.entries(solution.shields).forEach(([slot, shield]) => {
      const slotNum = parseInt(slot);
      if (!loadout.shields[slotNum] || loadout.shields[slotNum] === '') {
        loadout.shields[slotNum] = shield;
        shipUpdates++;
        console.log(`  ✓ Set shield[${slot}] = "${shield}"`);
      }
    });
  }
  
  // Apply coolers
  if (solution.coolers) {
    Object.entries(solution.coolers).forEach(([slot, cooler]) => {
      const slotNum = parseInt(slot);
      if (!loadout.coolers[slotNum] || loadout.coolers[slotNum] === '') {
        loadout.coolers[slotNum] = cooler;
        shipUpdates++;
        console.log(`  ✓ Set cooler[${slot}] = "${cooler}"`);
      }
    });
  }
  
  // Apply power plants
  if (solution.powerPlants) {
    Object.entries(solution.powerPlants).forEach(([slot, pp]) => {
      const slotNum = parseInt(slot);
      if (!loadout.powerPlants[slotNum] || loadout.powerPlants[slotNum] === '') {
        loadout.powerPlants[slotNum] = pp;
        shipUpdates++;
        console.log(`  ✓ Set powerPlant[${slot}] = "${pp}"`);
      }
    });
  }
  
  // Apply quantum drives
  if (solution.quantumDrives) {
    Object.entries(solution.quantumDrives).forEach(([slot, qd]) => {
      const slotNum = parseInt(slot);
      if (!loadout.quantumDrives[slotNum] || loadout.quantumDrives[slotNum] === '') {
        loadout.quantumDrives[slotNum] = qd;
        shipUpdates++;
        console.log(`  ✓ Set quantumDrive[${slot}] = "${qd}"`);
      }
    });
  }
  
  if (shipUpdates > 0) {
    updatesApplied += shipUpdates;
    shipsUpdated++;
  }
});

console.log(`\n\n=== Summary ===`);
console.log(`Ships updated: ${shipsUpdated}`);
console.log(`Total slots filled: ${updatesApplied}`);

// Convert updated stockLoadouts back to JavaScript and write to file
const updatedLoadoutsJson = JSON.stringify(stockLoadouts, null, 4);

// Rebuild the file with updated stockLoadouts
const beforeLoadouts = lines.slice(0, stockLoadoutsStart + 1).join('\n'); // Everything before and including "SC_DATA.stockLoadouts = {"
const afterLoadouts = lines.slice(stockLoadoutsEnd).join('\n'); // Everything from "};" onwards

// Format the loadouts nicely (convert JSON to JS object literal)
const formattedLoadouts = updatedLoadoutsJson
  .replace(/^{/, '') // Remove opening brace
  .replace(/}$/, '') // Remove closing brace
  .split('\n')
  .map(line => line.length > 0 ? '    ' + line : line) // Indent each line
  .join('\n');

const newDataContent = beforeLoadouts + '\n' + formattedLoadouts + '\n};\n' + afterLoadouts;

// Write updated data.js
fs.writeFileSync(dataPath, newDataContent, 'utf8');
console.log(`\n✅ Updated data.js successfully!`);
