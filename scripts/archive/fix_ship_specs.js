const fs = require('fs');
global.window = {};
eval(fs.readFileSync('data.js', 'utf8'));
const SC_DATA = global.window.SC_DATA;

const fixes = [];

// Analyze ships and determine correct spec sizes based on stock components
SC_DATA.ships.forEach(ship => {
  const stock = SC_DATA.stockLoadouts[ship.name];
  if (!stock) return;
  
  // Check coolers
  if (ship.coolers && stock.coolers && stock.coolers.length > 0) {
    const firstCooler = stock.coolers[0];
    if (firstCooler && firstCooler !== 'Unknown') {
      const cooler = SC_DATA.coolers.find(c => c.name === firstCooler);
      if (cooler && cooler.size !== ship.coolers.size) {
        fixes.push({
          ship: ship.name,
          type: 'cooler',
          component: firstCooler,
          currentSize: ship.coolers.size,
          correctSize: cooler.size,
          count: ship.coolers.count
        });
      }
    }
  }
  
  // Check power plants
  if (ship.powerPlants && stock.powerPlants && stock.powerPlants.length > 0) {
    const firstPP = stock.powerPlants[0];
    if (firstPP && firstPP !== 'Unknown') {
      const pp = SC_DATA.powerPlants.find(p => p.name === firstPP);
      if (pp && pp.size !== ship.powerPlants.size) {
        fixes.push({
          ship: ship.name,
          type: 'powerPlant',
          component: firstPP,
          currentSize: ship.powerPlants.size,
          correctSize: pp.size,
          count: ship.powerPlants.count
        });
      }
    }
  }
  
  // Check quantum drives
  if (ship.quantumDrive && stock.quantumDrives && stock.quantumDrives[0]) {
    const qdName = stock.quantumDrives[0];
    if (qdName && qdName !== 'Unknown') {
      const qd = SC_DATA.quantumDrives.find(q => q.name === qdName);
      if (qd && qd.size !== ship.quantumDrive.size) {
        fixes.push({
          ship: ship.name,
          type: 'quantumDrive',
          component: qdName,
          currentSize: ship.quantumDrive.size,
          correctSize: qd.size
        });
      }
    }
  }
});

console.log(`Found ${fixes.length} ship spec corrections needed.\n`);

if (fixes.length === 0) {
  console.log('No fixes needed!');
  process.exit(0);
}

// Group by type
const grouped = {};
fixes.forEach(fix => {
  if (!grouped[fix.type]) grouped[fix.type] = [];
  grouped[fix.type].push(fix);
});

Object.keys(grouped).forEach(type => {
  console.log(`${type}: ${grouped[type].length} ships`);
});
console.log('');

// Apply fixes
let dataText = fs.readFileSync('data.js', 'utf8');

fixes.forEach(fix => {
  // Build search and replace patterns based on type
  if (fix.type === 'cooler') {
    const oldPattern = `coolers: { count: ${fix.count}, size: ${fix.currentSize} }`;
    const newPattern = `coolers: { count: ${fix.count}, size: ${fix.correctSize} }`;
    
    // Find ship block and replace within it
    const shipIndex = dataText.indexOf(`name: "${fix.ship}"`);
    if (shipIndex === -1) {
      console.log(`WARNING: Could not find ship "${fix.ship}"`);
      return;
    }
    
    // Search in next 500 chars after ship name
    const segment = dataText.substring(shipIndex, shipIndex + 500);
    if (segment.includes(oldPattern)) {
      // Replace only the first occurrence after this ship name
      const before = dataText.substring(0, shipIndex);
      const after = dataText.substring(shipIndex);
      const afterFixed = after.replace(oldPattern, newPattern);
      dataText = before + afterFixed;
      console.log(`✓ ${fix.ship}: coolers S${fix.currentSize}→S${fix.correctSize} (${fix.component})`);
    }
  } else if (fix.type === 'powerPlant') {
    const oldPattern = `powerPlants: { count: ${fix.count}, size: ${fix.currentSize} }`;
    const newPattern = `powerPlants: { count: ${fix.count}, size: ${fix.correctSize} }`;
    
    const shipIndex = dataText.indexOf(`name: "${fix.ship}"`);
    if (shipIndex === -1) {
      console.log(`WARNING: Could not find ship "${fix.ship}"`);
      return;
    }
    
    const segment = dataText.substring(shipIndex, shipIndex + 500);
    if (segment.includes(oldPattern)) {
      const before = dataText.substring(0, shipIndex);
      const after = dataText.substring(shipIndex);
      const afterFixed = after.replace(oldPattern, newPattern);
      dataText = before + afterFixed;
      console.log(`✓ ${fix.ship}: powerPlants S${fix.currentSize}→S${fix.correctSize} (${fix.component})`);
    }
  } else if (fix.type === 'quantumDrive') {
    const oldPattern = `quantumDrive: { size: ${fix.currentSize} }`;
    const newPattern = `quantumDrive: { size: ${fix.correctSize} }`;
    
    const shipIndex = dataText.indexOf(`name: "${fix.ship}"`);
    if (shipIndex === -1) {
      console.log(`WARNING: Could not find ship "${fix.ship}"`);
      return;
    }
    
    const segment = dataText.substring(shipIndex, shipIndex + 500);
    if (segment.includes(oldPattern)) {
      const before = dataText.substring(0, shipIndex);
      const after = dataText.substring(shipIndex);
      const afterFixed = after.replace(oldPattern, newPattern);
      dataText = before + afterFixed;
      console.log(`✓ ${fix.ship}: quantumDrive S${fix.currentSize}→S${fix.correctSize} (${fix.component})`);
    }
  }
});

// Write back
fs.writeFileSync('data.js', dataText, 'utf8');
console.log(`\nFixed ${fixes.length} ship specs to match stock components.`);
