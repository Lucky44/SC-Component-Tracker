const fs = require('fs');

// Mock window object for Node.js environment
global.window = {};

// Load data
const dataContent = fs.readFileSync('./data.js', 'utf8');
eval(dataContent);

const SC_DATA = global.window.SC_DATA;

const ships = SC_DATA.ships;
const stockLoadouts = SC_DATA.stockLoadouts;

let issuesFound = 0;

ships.forEach(ship => {
  const shipName = ship.name;
  const stock = stockLoadouts[shipName];
  
  if (!stock) {
    console.log(`⚠️  ${shipName}: No stock loadout found`);
    issuesFound++;
    return;
  }

  // Check pilot weapons
  if (ship.pilotWeapons && ship.pilotWeapons.length > 0) {
    const stockPilot = stock.pilotWeapons || [];
    
    // Check for empty strings or missing weapons
    for (let i = 0; i < ship.pilotWeapons.length; i++) {
      if (!stockPilot[i] || stockPilot[i].trim() === '') {
        console.log(`❌ ${shipName}: Pilot weapon ${i+1}/${ship.pilotWeapons.length} is EMPTY`);
        issuesFound++;
      }
    }
  }

  // Check turret weapons
  if (ship.turrets && ship.turrets.length > 0) {
    const stockTurrets = stock.turretWeapons || [];
    let totalTurretGuns = 0;
    const turretNames = [];
    
    // Count total guns across all turrets
    ship.turrets.forEach((turret, idx) => {
      turretNames.push(turret.name || `Turret ${idx+1}`);
      totalTurretGuns += turret.guns || 1;
    });
    
    // Check if we have enough stock weapons for all turret guns
    for (let i = 0; i < totalTurretGuns; i++) {
      if (!stockTurrets[i] || stockTurrets[i].trim() === '') {
        const turretIdx = ship.turrets.findIndex((t, idx) => {
          const gunsBefore = ship.turrets.slice(0, idx).reduce((sum, t) => sum + (t.guns || 1), 0);
          return i < gunsBefore + (t.guns || 1);
        });
        const turretName = turretNames[turretIdx] || `Turret ${turretIdx+1}`;
        console.log(`❌ ${shipName}: Turret weapon ${i+1}/${totalTurretGuns} (${turretName}) is EMPTY`);
        issuesFound++;
      }
    }
  }

  // Check shields
  if (ship.shields && ship.shields.count > 0) {
    const stockShields = stock.shields || [];
    if (stockShields.length === 0 || !stockShields[0] || stockShields[0].trim() === '') {
      console.log(`❌ ${shipName}: Shield slot is EMPTY`);
      issuesFound++;
    }
  }

  // Check coolers
  if (ship.coolers && ship.coolers.count > 0) {
    const stockCoolers = stock.coolers || [];
    if (stockCoolers.length === 0 || !stockCoolers[0] || stockCoolers[0].trim() === '') {
      console.log(`❌ ${shipName}: Cooler slot is EMPTY`);
      issuesFound++;
    }
  }

  // Check powerPlants
  if (ship.powerPlants && ship.powerPlants.count > 0) {
    const stockPower = stock.powerPlants || [];
    if (stockPower.length === 0 || !stockPower[0] || stockPower[0].trim() === '') {
      console.log(`❌ ${shipName}: PowerPlant slot is EMPTY`);
      issuesFound++;
    }
  }

  // Check quantum drives
  if (ship.quantumDrive && ship.quantumDrive.size > 0) {
    const stockQD = stock.quantumDrives || [];
    if (stockQD.length === 0 || !stockQD[0] || stockQD[0].trim() === '') {
      console.log(`❌ ${shipName}: Quantum Drive slot is EMPTY`);
      issuesFound++;
    }
  }
});

console.log(`\n=== SUMMARY ===`);
console.log(`Total empty slots found: ${issuesFound}`);
