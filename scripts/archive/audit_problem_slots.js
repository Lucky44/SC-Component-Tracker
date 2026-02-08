const fs = require('fs');

// Mock window object for Node.js environment
global.window = {};

// Load data
const dataContent = fs.readFileSync('./data.js', 'utf8');
eval(dataContent);

const SC_DATA = global.window.SC_DATA;
const ships = SC_DATA.ships;
const stockLoadouts = SC_DATA.stockLoadouts;

console.log('=== COMPREHENSIVE COMPONENT AUDIT ===\n');

const problemSlots = {};

ships.forEach(ship => {
  const shipName = ship.name;
  const stock = stockLoadouts[shipName];
  
  if (!stock) {
    problemSlots[shipName] = [{ type: 'ERROR', slot: 'ENTIRE_SHIP', issue: 'No stock loadout found' }];
    return;
  }

  const issues = [];

  // Check pilot weapons
  if (ship.pilotWeapons && ship.pilotWeapons.length > 0) {
    const stockPilot = stock.pilotWeapons || [];
    for (let i = 0; i < ship.pilotWeapons.length; i++) {
      const size = ship.pilotWeapons[i].size;
      if (!stockPilot[i] || stockPilot[i].trim() === '') {
        issues.push({ type: 'WEAPON', slot: `pilotWeapon[${i}]`, size, issue: 'MISSING', current: stockPilot[i] || '' });
      }
    }
  }

  // Check turret weapons
  if (ship.turrets && ship.turrets.length > 0) {
    const stockTurrets = stock.turretWeapons || [];
    let gunIndex = 0;
    
    ship.turrets.forEach((turret, turretIdx) => {
      const turretName = turret.name || `Turret[${turretIdx}]`;
      const gunCount = turret.guns || 1;
      const size = turret.size;
      
      for (let i = 0; i < gunCount; i++) {
        if (!stockTurrets[gunIndex] || stockTurrets[gunIndex].trim() === '') {
          issues.push({ type: 'WEAPON', slot: `turretWeapon[${gunIndex}] (${turretName})`, size, issue: 'MISSING', current: stockTurrets[gunIndex] || '' });
        }
        gunIndex++;
      }
    });
  }

  // Check shields
  if (ship.shields && ship.shields.count > 0) {
    const stockShields = stock.shields || [];
    if (stockShields.length === 0 || !stockShields[0] || stockShields[0].trim() === '') {
      issues.push({ type: 'SHIELD', slot: `shield[0]`, count: ship.shields.count, size: ship.shields.size, issue: 'MISSING', current: stockShields[0] || '' });
    }
  }

  // Check coolers
  if (ship.coolers && ship.coolers.count > 0) {
    const stockCoolers = stock.coolers || [];
    if (stockCoolers.length === 0 || !stockCoolers[0] || stockCoolers[0].trim() === '') {
      issues.push({ type: 'COOLER', slot: `cooler[0]`, count: ship.coolers.count, size: ship.coolers.size, issue: 'MISSING', current: stockCoolers[0] || '' });
    }
  }

  // Check powerPlants
  if (ship.powerPlants && ship.powerPlants.count > 0) {
    const stockPower = stock.powerPlants || [];
    if (stockPower.length === 0 || !stockPower[0] || stockPower[0].trim() === '') {
      issues.push({ type: 'POWERPLANT', slot: `powerPlant[0]`, count: ship.powerPlants.count, size: ship.powerPlants.size, issue: 'MISSING', current: stockPower[0] || '' });
    }
  }

  // Check quantum drives
  if (ship.quantumDrive && ship.quantumDrive.size > 0) {
    const stockQD = stock.quantumDrives || [];
    if (stockQD.length === 0 || !stockQD[0] || stockQD[0].trim() === '') {
      issues.push({ type: 'QUANTUM_DRIVE', slot: `quantumDrive`, size: ship.quantumDrive.size, issue: 'MISSING', current: stockQD[0] || '' });
    }
  }

  if (issues.length > 0) {
    problemSlots[shipName] = issues;
  }
});

// Generate human-readable problem slots file
let output = '=== PROBLEM SLOTS - ALL SHIPS WITH MISSING COMPONENTS ===\n\n';
output += `Generated: ${new Date().toISOString()}\n`;
output += `Total ships checked: ${ships.length}\n`;
output += `Ships with problems: ${Object.keys(problemSlots).length}\n\n`;
output += '========================================\n\n';

const shipNames = Object.keys(problemSlots).sort();
shipNames.forEach(shipName => {
  const issues = problemSlots[shipName];
  output += `${shipName}:\n`;
  issues.forEach(issue => {
    output += `  [${issue.type}] ${issue.slot}`;
    if (issue.size) output += ` (S${issue.size})`;
    if (issue.count) output += ` [count: ${issue.count}]`;
    output += ` - ${issue.issue}`;
    if (issue.current) output += ` (current: "${issue.current}")`;
    output += '\n';
  });
  output += '\n';
});

output += '\n========================================\n';
output += 'SUMMARY BY COMPONENT TYPE:\n\n';

const summaryByType = {};
shipNames.forEach(shipName => {
  problemSlots[shipName].forEach(issue => {
    if (!summaryByType[issue.type]) summaryByType[issue.type] = [];
    summaryByType[issue.type].push(shipName);
  });
});

Object.keys(summaryByType).sort().forEach(type => {
  const uniqueShips = [...new Set(summaryByType[type])];
  output += `${type}: ${uniqueShips.length} ships\n`;
});

// Save to file
fs.writeFileSync('/tmp/problem_slots.txt', output, 'utf-8');
console.log('✓ Problem slots saved to /tmp/problem_slots.txt');
console.log(`\nTotal ships with problems: ${shipNames.length}`);
console.log(`Total problem slots: ${shipNames.reduce((sum, ship) => sum + problemSlots[ship].length, 0)}`);

// Also save as JSON for programmatic access
fs.writeFileSync('./scripts/problem_slots.json', JSON.stringify(problemSlots, null, 2), 'utf-8');
console.log('✓ Problem slots JSON saved to scripts/problem_slots.json');
