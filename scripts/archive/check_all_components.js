const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dataPath = path.join(__dirname, '..', 'data.js');
const dataContent = fs.readFileSync(dataPath, 'utf8');

// Evaluate data.js in a sandbox to get SC_DATA
const context = { window: {}, module: { exports: {} }, exports: {} };
vm.createContext(context);
vm.runInContext(dataContent + '\nmodule.exports = SC_DATA;', context, { filename: 'data.js' });
const SC_DATA = context.module.exports;

const ships = SC_DATA.ships;
const stockLoadouts = SC_DATA.stockLoadouts;

// Get ships to check (exclude ground vehicles and variants)
const groundVehicles = ['Greycat', 'Tumbril', 'Mirai', 'MPUV', 'Mule', 'Argo'];
const shipsToCheck = ships.filter(ship => {
  const name = ship.name.toLowerCase();
  // Exclude ground vehicles
  if (groundVehicles.some(v => name.includes(v.toLowerCase()))) return false;
  // Exclude variants
  if (/wikelo|best in show|executive|teach|pyam|sharkmouth|renegade|pirate|expedition|carbon|talus/i.test(name)) return false;
  return true;
});

console.log(`Checking ${shipsToCheck.length} ships for missing components...\n`);

const issues = [];

shipsToCheck.forEach(ship => {
  const stock = stockLoadouts[ship.name];
  
  if (!stock) {
    issues.push({
      ship: ship.name,
      problems: ['Missing entire stockLoadout']
    });
    return;
  }
  
  const problems = [];
  
  // Check pilot weapons
  if (ship.pilotWeapons && ship.pilotWeapons.length > 0) {
    if (stock.pilotWeapons < ship.pilotWeapons.length) {
      problems.push(`pilotWeapons: spec has ${ship.pilotWeapons.length}, stock has ${stock.pilotWeapons}`);
    }
  }
  
  // Check turret weapons
  if (ship.turrets && ship.turrets.length > 0) {
    if (stock.turretWeapons < ship.turrets.length) {
      problems.push(`turretWeapons: spec has ${ship.turrets.length}, stock has ${stock.turretWeapons}`);
    }
  }
  
  // Check coolers
  if (ship.coolers && ship.coolers.count > 0) {
    if (stock.coolers < ship.coolers.count) {
      problems.push(`coolers: spec needs ${ship.coolers.count}, stock has ${stock.coolers}`);
    }
  }
  
  // Check shields
  if (ship.shields && ship.shields.count > 0) {
    if (stock.shields < ship.shields.count) {
      problems.push(`shields: spec needs ${ship.shields.count}, stock has ${stock.shields}`);
    }
  }
  
  // Check power plants
  if (ship.powerPlants && ship.powerPlants.count > 0) {
    if (stock.powerPlants < ship.powerPlants.count) {
      problems.push(`powerPlants: spec needs ${ship.powerPlants.count}, stock has ${stock.powerPlants}`);
    }
  }
  
  // Check quantum drives
  if (ship.quantumDrive) {
    if (stock.quantumDrives < 1) {
      problems.push(`quantumDrives: spec needs 1, stock has ${stock.quantumDrives}`);
    }
  }
  
  if (problems.length > 0) {
    issues.push({
      ship: ship.name,
      problems
    });
  }
});

if (issues.length === 0) {
  console.log('✓ All ships have complete stockLoadouts!');
} else {
  console.log(`Found ${issues.length} ships with missing components:\n`);
  issues.forEach((item, index) => {
    console.log(`${index + 1}. ${item.ship}`);
    item.problems.forEach(p => {
      console.log(`   - ${p}`);
    });
  });
}
