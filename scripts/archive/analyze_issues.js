const fs = require('fs');
global.window = {};
eval(fs.readFileSync('data.js', 'utf8'));
const SC_DATA = global.window.SC_DATA;

const issues = [];

// Check for ships with missing stock loadouts
SC_DATA.ships.forEach(ship => {
  const stock = SC_DATA.stockLoadouts[ship.name];
  if (!stock) {
    issues.push({type: 'Missing Stock Loadout', ship: ship.name});
  }
});

// Check for weapon size mismatches
SC_DATA.ships.forEach(ship => {
  const stock = SC_DATA.stockLoadouts[ship.name];
  if (!stock || !stock.pilotWeapons || !ship.pilotWeapons) return;
  
  ship.pilotWeapons.forEach((mount, i) => {
    const weaponName = stock.pilotWeapons[i];
    if (!weaponName || weaponName === 'Unknown') return;
    
    // Find weapon in all size categories
    let foundWeapon = null;
    let foundSize = null;
    for (let size = 1; size <= 7; size++) {
      const weapon = (SC_DATA.weapons[size] || []).find(w => w.name === weaponName);
      if (weapon) {
        foundWeapon = weapon;
        foundSize = size;
        break;
      }
    }
    
    if (foundWeapon && foundSize !== mount.size) {
      issues.push({
        type: 'Weapon Size Mismatch',
        ship: ship.name,
        slot: i,
        weapon: weaponName,
        mountSize: mount.size,
        weaponSize: foundSize
      });
    } else if (!foundWeapon && weaponName !== '') {
      issues.push({
        type: 'Weapon Not Found',
        ship: ship.name,
        slot: i,
        weapon: weaponName
      });
    }
  });
});

// Check for component mismatches (coolers, powerPlants, QD)
SC_DATA.ships.forEach(ship => {
  const stock = SC_DATA.stockLoadouts[ship.name];
  if (!stock) return;
  
  // Check coolers
  if (ship.coolers && stock.coolers) {
    stock.coolers.forEach((coolerName, i) => {
      if (!coolerName || coolerName === 'Unknown') return;
      const cooler = SC_DATA.coolers.find(c => c.name === coolerName);
      if (cooler && cooler.size !== ship.coolers.size) {
        issues.push({
          type: 'Cooler Size Mismatch',
          ship: ship.name,
          slot: i,
          component: coolerName,
          mountSize: ship.coolers.size,
          componentSize: cooler.size
        });
      } else if (!cooler && coolerName !== '') {
        issues.push({
          type: 'Cooler Not Found',
          ship: ship.name,
          component: coolerName
        });
      }
    });
  }
  
  // Check power plants
  if (ship.powerPlants && stock.powerPlants) {
    stock.powerPlants.forEach((ppName, i) => {
      if (!ppName || ppName === 'Unknown') return;
      const pp = SC_DATA.powerPlants.find(p => p.name === ppName);
      if (pp && pp.size !== ship.powerPlants.size) {
        issues.push({
          type: 'PowerPlant Size Mismatch',
          ship: ship.name,
          slot: i,
          component: ppName,
          mountSize: ship.powerPlants.size,
          componentSize: pp.size
        });
      } else if (!pp && ppName !== '') {
        issues.push({
          type: 'PowerPlant Not Found',
          ship: ship.name,
          component: ppName
        });
      }
    });
  }
  
  // Check quantum drives
  if (ship.quantumDrive && stock.quantumDrives && stock.quantumDrives[0]) {
    const qdName = stock.quantumDrives[0];
    if (qdName && qdName !== 'Unknown') {
      const qd = SC_DATA.quantumDrives.find(q => q.name === qdName);
      if (qd && qd.size !== ship.quantumDrive.size) {
        issues.push({
          type: 'QuantumDrive Size Mismatch',
          ship: ship.name,
          component: qdName,
          mountSize: ship.quantumDrive.size,
          componentSize: qd.size
        });
      } else if (!qd && qdName !== '') {
        issues.push({
          type: 'QuantumDrive Not Found',
          ship: ship.name,
          component: qdName
        });
      }
    }
  }
});

// Group and display issues
const grouped = {};
issues.forEach(issue => {
  if (!grouped[issue.type]) grouped[issue.type] = [];
  grouped[issue.type].push(issue);
});

console.log('=== COMPONENT/WEAPON ISSUES SUMMARY ===\n');
Object.keys(grouped).sort().forEach(type => {
  console.log(`${type}: ${grouped[type].length} issues`);
  grouped[type].slice(0, 10).forEach(issue => {
    if (issue.mountSize && issue.weaponSize) {
      console.log(`  - ${issue.ship}: ${issue.weapon} (mount S${issue.mountSize}, weapon S${issue.weaponSize})`);
    } else if (issue.mountSize && issue.componentSize) {
      console.log(`  - ${issue.ship}: ${issue.component} (mount S${issue.mountSize}, component S${issue.componentSize})`);
    } else if (issue.weapon) {
      console.log(`  - ${issue.ship}: ${issue.weapon} not found in weapons database`);
    } else if (issue.component) {
      console.log(`  - ${issue.ship}: ${issue.component} not found`);
    } else {
      console.log(`  - ${issue.ship}`);
    }
  });
  if (grouped[type].length > 10) {
    console.log(`  ... and ${grouped[type].length - 10} more`);
  }
  console.log('');
});

console.log(`Total Issues: ${issues.length}\n`);
