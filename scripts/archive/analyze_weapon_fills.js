const fs = require('fs');

// Mock window object for Node.js environment
global.window = {};

// Load data
const dataContent = fs.readFileSync('./data.js', 'utf8');
eval(dataContent);

const SC_DATA = global.window.SC_DATA;
const ships = SC_DATA.ships;
const stockLoadouts = SC_DATA.stockLoadouts;
const weaponsBySize = SC_DATA.weapons; // Already organized by size (1-5)

function extractWeaponSize(name) {
  // Try to determine size from weapon name patterns
  // S1 weapons typically: CF-117, Sledge II, Strife, Suckerpunch-L, etc.
  // S2 weapons: CF-227, Jericho, etc.
  // S3 weapons: CF-337, Mantis GT-220, etc.
  // S4 weapons: CF-447, M6A, etc.
  // S5 weapons: M7A, Deadbolt V, Omnisky XV, etc.
  
  if (name.includes('CF-117')) return '1';
  if (name.includes('CF-227')) return '2';
  if (name.includes('CF-337')) return '3';
  if (name.includes('CF-447')) return '4';
  if (name.includes('CF-557')) return '5';
  if (name.includes('M2C') || name.includes('M2A')) return '1';
  if (name.includes('M3A') || name.includes('M3C')) return '2';
  if (name.includes('M4A') || name.includes('M4C')) return '3';
  if (name.includes('M5A') || name.includes('M5C')) return '3';
  if (name.includes('M6A') || name.includes('M6C')) return '4';
  if (name.includes('M7A') || name.includes('M7C')) return '5';
  if (name.includes('M9A')) return '5';
  if (name.includes('Bulldog')) return '1';
  if (name.includes('Badger')) return '2';
  if (name.includes('Panther')) return '3';
  if (name.includes('Rhino')) return '4';
  if (name.includes('Galdereen')) return '5';
  
  return null;
}

console.log('=== AUTO-FILL WEAPON ANALYSIS ===\n');

const fillPlans = {};
const ambiguousCases = [];

ships.forEach(ship => {
  const shipName = ship.name;
  const stock = stockLoadouts[shipName];
  
  if (!stock) return;

  // Determine what pilot weapons are needed
  let needPilotWeapons = 0;
  const pilotSizes = [];
  if (ship.pilotWeapons && ship.pilotWeapons.length > 0) {
    needPilotWeapons = ship.pilotWeapons.length;
    ship.pilotWeapons.forEach(pw => pilotSizes.push(pw.size));
  }

  // Determine what turret weapons are needed
  let needTurretWeapons = 0;
  const turretSizes = [];
  if (ship.turrets && ship.turrets.length > 0) {
    ship.turrets.forEach(t => {
      const gunCount = t.guns || 1;
      for (let i = 0; i < gunCount; i++) {
        needTurretWeapons++;
        turretSizes.push(t.size);
      }
    });
  }

  const totalNeeded = needPilotWeapons + needTurretWeapons;
  const currentPilot = stock.pilotWeapons ? stock.pilotWeapons.filter(w => w && w.trim()) : [];
  const currentTurret = stock.turretWeapons ? stock.turretWeapons.filter(w => w && w.trim()) : [];
  const totalCurrent = currentPilot.length + currentTurret.length;

  if (totalCurrent < totalNeeded) {
    const plan = {
      shipName,
      pilotNeeded: needPilotWeapons,
      pilotHave: currentPilot.length,
      turretNeeded: needTurretWeapons,
      turretHave: currentTurret.length,
      pilotSizes,
      turretSizes,
      proposedFixes: []
    };

    // Analyze pilot weapons
    for (let i = currentPilot.length; i < needPilotWeapons; i++) {
      const neededSize = pilotSizes[i];
      // Try to find a matching size weapon from existing loadout
      let matchingWeapon = null;
      
      // First try to match from existing weapons in this ship
      if (currentPilot.length > 0) {
        const existingSize = extractWeaponSize(currentPilot[0]);
        if (existingSize === neededSize.toString()) {
          matchingWeapon = currentPilot[0]; // Duplicate the existing weapon
        }
      }
      
      if (!matchingWeapon) {
        // Try to find ANY weapon of the right size from the ship's loadout
        for (let w of currentPilot) {
          const wSize = extractWeaponSize(w);
          if (wSize === neededSize.toString()) {
            matchingWeapon = w;
            break;
          }
        }
      }

      if (matchingWeapon) {
        plan.proposedFixes.push(`Pilot[${i}]: Add "${matchingWeapon}" (S${neededSize})`);
      } else {
        plan.proposedFixes.push(`Pilot[${i}]: AMBIGUOUS - Need S${neededSize} weapon, no reference in this ship`);
        ambiguousCases.push({ ship: shipName, slot: `Pilot[${i}]`, size: neededSize, reason: 'No existing S' + neededSize + ' weapon in loadout' });
      }
    }

    // Analyze turret weapons
    for (let i = currentTurret.length; i < needTurretWeapons; i++) {
      const neededSize = turretSizes[i];
      let matchingWeapon = null;
      
      // Try to find a matching size weapon from existing turret weapons
      if (currentTurret.length > 0) {
        const existingSize = extractWeaponSize(currentTurret[0]);
        if (existingSize === neededSize.toString()) {
          matchingWeapon = currentTurret[0];
        }
      }
      
      if (!matchingWeapon && currentTurret.length > 0) {
        for (let w of currentTurret) {
          const wSize = extractWeaponSize(w);
          if (wSize === neededSize.toString()) {
            matchingWeapon = w;
            break;
          }
        }
      }

      if (matchingWeapon) {
        plan.proposedFixes.push(`Turret[${i}]: Add "${matchingWeapon}" (S${neededSize})`);
      } else {
        plan.proposedFixes.push(`Turret[${i}]: AMBIGUOUS - Need S${neededSize} weapon, no reference in this ship`);
        ambiguousCases.push({ ship: shipName, slot: `Turret[${i}]`, size: neededSize, reason: 'No existing S' + neededSize + ' weapon in loadout' });
      }
    }

    fillPlans[shipName] = plan;
  }
});

// Display results
const ambiguousShips = new Set(ambiguousCases.map(a => a.ship));
const clearShips = Object.keys(fillPlans).filter(s => !ambiguousShips.has(s));

console.log(`Ships with clear fill patterns (${clearShips.length}):`);
clearShips.slice(0, 10).forEach(ship => {
  const plan = fillPlans[ship];
  console.log(`\n  ${ship}:`);
  console.log(`    Pilot: need ${plan.pilotNeeded}, have ${plan.pilotHave}`);
  console.log(`    Turret: need ${plan.turretNeeded}, have ${plan.turretHave}`);
  plan.proposedFixes.forEach(fix => {
    if (!fix.includes('AMBIGUOUS')) console.log(`      → ${fix}`);
  });
});

console.log(`\n\nShips with ambiguous slots (need your input): ${ambiguousShips.size}`);
ambiguousCases.slice(0, 20).forEach(a => {
  console.log(`  ${a.ship}: ${a.slot} needs S${a.size}`);
});

console.log(`\n=== SUMMARY ===`);
console.log(`Ships needing fixes: ${Object.keys(fillPlans).length}`);
console.log(`Clear cases (can auto-fill): ${clearShips.length}`);
console.log(`Ambiguous cases (need input): ${ambiguousCases.length}`);

if (ambiguousCases.length > 0) {
  console.log(`\nPlease provide weapon information for the ambiguous cases.`);
  console.log(`You can check SCUnpacked for the correct stock weapons for each ship.`);
}
