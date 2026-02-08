const fs = require('fs');

// Read component fixes
const fixes = JSON.parse(fs.readFileSync('./scripts/component_fixes.json', 'utf-8'));

// Read data.js
let dataFile = fs.readFileSync('./data.js', 'utf-8');

// Find the stockLoadouts section
const stockLoadoutsStart = dataFile.indexOf('SC_DATA.stockLoadouts = {');
const stockLoadoutsEnd = dataFile.indexOf('};', stockLoadoutsStart) + 2;
const stockLoadoutsSection = dataFile.substring(stockLoadoutsStart, stockLoadoutsEnd);

// Parse the stockLoadouts object (extract the object literal)
const objStart = stockLoadoutsSection.indexOf('{');
const objEnd = stockLoadoutsSection.lastIndexOf('}');
const objCode = stockLoadoutsSection.substring(objStart, objEnd + 1);

// Use eval to parse (carefully - we control this file)
let stockLoadouts = {};
try {
  stockLoadouts = eval('(' + objCode + ')');
} catch (e) {
  console.error('Failed to parse stockLoadouts:', e.message);
  process.exit(1);
}

// Apply the fixes
let changesCount = 0;
for (const shipName in fixes) {
  const fix = fixes[shipName];
  
  if (!stockLoadouts[shipName]) {
    console.log(`Warning: Ship "${shipName}" not found in stockLoadouts`);
    continue;
  }
  
  // Apply shield fixes
  if (fix.shields && Array.isArray(fix.shields)) {
    stockLoadouts[shipName].shields = fix.shields;
    console.log(`  ${shipName}: shields fixed`);
    changesCount++;
  }
  
  // Apply cooler fixes
  if (fix.coolers && Array.isArray(fix.coolers)) {
    stockLoadouts[shipName].coolers = fix.coolers;
    console.log(`  ${shipName}: coolers fixed`);
    changesCount++;
  }
  
  // Apply powerPlant fixes
  if (fix.powerPlants && Array.isArray(fix.powerPlants)) {
    stockLoadouts[shipName].powerPlants = fix.powerPlants;
    console.log(`  ${shipName}: powerPlants fixed`);
    changesCount++;
  }
  
  // Apply quantumDrive fixes
  if (fix.quantumDrives && Array.isArray(fix.quantumDrives)) {
    stockLoadouts[shipName].quantumDrives = fix.quantumDrives;
    console.log(`  ${shipName}: quantumDrives fixed`);
    changesCount++;
  }
  
  // Apply turretWeapons fixes
  if (fix.turretWeapons && Array.isArray(fix.turretWeapons)) {
    stockLoadouts[shipName].turretWeapons = fix.turretWeapons;
    console.log(`  ${shipName}: turretWeapons fixed`);
    changesCount++;
  }
}

console.log(`\nTotal changes applied: ${changesCount}`);

// Rebuild the stockLoadouts section with proper formatting
function formatValue(val, indent) {
  if (val === null || val === undefined) {
    return 'null';
  }
  if (Array.isArray(val)) {
    if (val.length === 0) {
      return '[]';
    }
    const items = val.map(v => `"${v}"`).join(', ');
    return `[${items}]`;
  }
  if (typeof val === 'object') {
    const props = [];
    for (const key in val) {
      props.push(`${indent}  ${key}: ${formatValue(val[key], indent + '  ')}`);
    }
    return `{\n${props.join(',\n')}\n${indent}}`;
  }
  return JSON.stringify(val);
}

let newSection = 'SC_DATA.stockLoadouts = {\n';
const shipNames = Object.keys(stockLoadouts);
for (let i = 0; i < shipNames.length; i++) {
  const shipName = shipNames[i];
  const loadout = stockLoadouts[shipName];
  
  newSection += `  "${shipName}": {\n`;
  newSection += `    pilotWeapons: ${formatValue(loadout.pilotWeapons, '    ')},\n`;
  newSection += `    turretWeapons: ${formatValue(loadout.turretWeapons, '    ')},\n`;
  newSection += `    shields: ${formatValue(loadout.shields, '    ')},\n`;
  newSection += `    coolers: ${formatValue(loadout.coolers, '    ')},\n`;
  newSection += `    powerPlants: ${formatValue(loadout.powerPlants, '    ')},\n`;
  newSection += `    quantumDrives: ${formatValue(loadout.quantumDrives, '    ')}\n`;
  newSection += `  }${i < shipNames.length - 1 ? ',' : ''}\n`;
}
newSection += '};';

// Replace the stockLoadouts section
const newDataFile = dataFile.substring(0, stockLoadoutsStart) + newSection + dataFile.substring(stockLoadoutsEnd);

// Write back
fs.writeFileSync('./data.js', newDataFile, 'utf-8');
console.log('\ndata.js updated successfully!');
