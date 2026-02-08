// Polyfill window for Node.js
global.window = {};

const data = require('../data.js');
const SC_DATA = data.SC_DATA;

// Get all ships from the spec
const allShips = SC_DATA.ships;

// Ships to check (exclude ground vehicles and variants)
const groundVehicles = ['Greycat', 'Tumbril', 'Mirai'];
const shipsToCheck = allShips.filter(ship => {
  const name = ship.name.toLowerCase();
  // Exclude ground vehicles
  if (groundVehicles.some(v => name.includes(v.toLowerCase()))) return false;
  // Exclude variants (Wikelo, Best In Show, Executive, Teach's, PYAM Exec, etc.)
  if (/wikelo|best in show|executive|teach|pyam|sharkmouth/i.test(name)) return false;
  return true;
});

console.log('Checking', shipsToCheck.length, 'ships for missing stockLoadouts and turret weapons...\n');

const issues = [];

shipsToCheck.forEach(ship => {
  const stock = SC_DATA.stockLoadouts[ship.name];
  
  // Check if stockLoadout exists
  if (!stock) {
    issues.push({
      ship: ship.name,
      issue: 'Missing stockLoadout'
    });
    return;
  }
  
  // Check if turrets have enough weapons
  if (ship.turrets && ship.turrets.length > 0) {
    const turretCount = ship.turrets.length;
    const weaponCount = stock.turretWeapons ? stock.turretWeapons.length : 0;
    
    if (weaponCount !== turretCount) {
      issues.push({
        ship: ship.name,
        issue: `Turrets: spec has ${turretCount}, stockLoadout has ${weaponCount} weapons`
      });
    }
  }
});

if (issues.length === 0) {
  console.log('✓ All ships have complete stockLoadouts with correct turret weapons!');
} else {
  console.log('Issues found:\n');
  issues.forEach(item => {
    console.log(`  ${item.ship}: ${item.issue}`);
  });
}
