const fs = require('fs');
global.window = {};
eval(fs.readFileSync('data.js', 'utf8'));
const SC_DATA = global.window.SC_DATA;

const fixes = [];

// Analyze and collect fixes for weapon size mismatches
SC_DATA.ships.forEach(ship => {
  const stock = SC_DATA.stockLoadouts[ship.name];
  if (!stock || !stock.pilotWeapons || !ship.pilotWeapons) return;
  
  ship.pilotWeapons.forEach((mount, i) => {
    const weaponName = stock.pilotWeapons[i];
    if (!weaponName || weaponName === 'Unknown') return;
    
    let foundSize = null;
    for (let size = 1; size <= 7; size++) {
      const weapon = (SC_DATA.weapons[size] || []).find(w => w.name === weaponName);
      if (weapon) {
        foundSize = size;
        break;
      }
    }
    
    if (foundSize && foundSize !== mount.size) {
      fixes.push({
        ship: ship.name,
        type: 'weapon',
        slot: i,
        component: weaponName,
        mountSize: mount.size,
        componentSize: foundSize
      });
    }
  });
});

// Analyze and collect fixes for cooler size mismatches
SC_DATA.ships.forEach(ship => {
  const stock = SC_DATA.stockLoadouts[ship.name];
  if (!stock || !ship.coolers || !stock.coolers) return;
  
  stock.coolers.forEach((coolerName, i) => {
    if (!coolerName || coolerName === 'Unknown') return;
    const cooler = SC_DATA.coolers.find(c => c.name === coolerName);
    if (cooler && cooler.size !== ship.coolers.size) {
      fixes.push({
        ship: ship.name,
        type: 'cooler',
        slot: i,
        component: coolerName,
        mountSize: ship.coolers.size,
        componentSize: cooler.size
      });
    }
  });
});

// Analyze and collect fixes for power plant size mismatches
SC_DATA.ships.forEach(ship => {
  const stock = SC_DATA.stockLoadouts[ship.name];
  if (!stock || !ship.powerPlants || !stock.powerPlants) return;
  
  stock.powerPlants.forEach((ppName, i) => {
    if (!ppName || ppName === 'Unknown') return;
    const pp = SC_DATA.powerPlants.find(p => p.name === ppName);
    if (pp && pp.size !== ship.powerPlants.size) {
      fixes.push({
        ship: ship.name,
        type: 'powerPlant',
        slot: i,
        component: ppName,
        mountSize: ship.powerPlants.size,
        componentSize: pp.size
      });
    }
  });
});

// Analyze and collect fixes for quantum drive size mismatches
SC_DATA.ships.forEach(ship => {
  const stock = SC_DATA.stockLoadouts[ship.name];
  if (!stock || !ship.quantumDrive || !stock.quantumDrives || !stock.quantumDrives[0]) return;
  
  const qdName = stock.quantumDrives[0];
  if (!qdName || qdName === 'Unknown') return;
  const qd = SC_DATA.quantumDrives.find(q => q.name === qdName);
  if (qd && qd.size !== ship.quantumDrive.size) {
    fixes.push({
      ship: ship.name,
      type: 'quantumDrive',
      slot: 0,
      component: qdName,
      mountSize: ship.quantumDrive.size,
      componentSize: qd.size
    });
  }
});

console.log(`Found ${fixes.length} size mismatches to fix.\n`);

if (fixes.length === 0) {
  console.log('No fixes needed!');
  process.exit(0);
}

// Group fixes by type
const grouped = {};
fixes.forEach(fix => {
  if (!grouped[fix.type]) grouped[fix.type] = [];
  grouped[fix.type].push(fix);
});

Object.keys(grouped).forEach(type => {
  console.log(`${type}: ${grouped[type].length} issues`);
});
console.log('');

// Apply fixes to data.js
let dataText = fs.readFileSync('data.js', 'utf8');
let changedShips = new Set();

fixes.forEach(fix => {
  changedShips.add(fix.ship);
  
  // Find the stock loadout block for this ship
  const shipKey = `"${fix.ship}": {`;
  const idx = dataText.indexOf(shipKey);
  if (idx === -1) {
    console.log(`WARNING: Could not find stockLoadout for "${fix.ship}"`);
    return;
  }
  
  // Build the search pattern based on component type
  let searchPattern, replacement;
  
  if (fix.type === 'weapon') {
    // For weapons, we need to find the exact pilotWeapons array and replace the specific index
    const stock = SC_DATA.stockLoadouts[fix.ship];
    const oldArray = JSON.stringify(stock.pilotWeapons);
    const newArray = [...stock.pilotWeapons];
    newArray[fix.slot] = 'Unknown';
    
    searchPattern = `pilotWeapons: ${oldArray}`;
    replacement = `pilotWeapons: ${JSON.stringify(newArray)}`;
  } else if (fix.type === 'cooler') {
    const stock = SC_DATA.stockLoadouts[fix.ship];
    const oldArray = JSON.stringify(stock.coolers);
    const newArray = [...stock.coolers];
    newArray[fix.slot] = 'Unknown';
    
    searchPattern = `coolers: ${oldArray}`;
    replacement = `coolers: ${JSON.stringify(newArray)}`;
  } else if (fix.type === 'powerPlant') {
    const stock = SC_DATA.stockLoadouts[fix.ship];
    const oldArray = JSON.stringify(stock.powerPlants);
    const newArray = [...stock.powerPlants];
    newArray[fix.slot] = 'Unknown';
    
    searchPattern = `powerPlants: ${oldArray}`;
    replacement = `powerPlants: ${JSON.stringify(newArray)}`;
  } else if (fix.type === 'quantumDrive') {
    const stock = SC_DATA.stockLoadouts[fix.ship];
    const oldArray = JSON.stringify(stock.quantumDrives);
    
    searchPattern = `quantumDrives: ${oldArray}`;
    replacement = `quantumDrives: ["Unknown"]`;
  }
  
  if (dataText.includes(searchPattern)) {
    dataText = dataText.replace(searchPattern, replacement);
    console.log(`✓ Fixed ${fix.ship}: ${fix.type} ${fix.component} (S${fix.componentSize}→S${fix.mountSize})`);
  }
});

// Write the modified data back
fs.writeFileSync('data.js', dataText, 'utf8');

console.log(`\nFixed ${fixes.length} mismatches across ${changedShips.size} ships.`);
console.log('Replaced mismatched components with "Unknown".');
