const fs = require('fs');
const path = require('path');

// Load SC_DATA from data.js by stubbing window
global.window = {};
require(path.join(__dirname, '..', 'data.js'));
const SC_DATA = global.window.SC_DATA;

// Helper: find weapon size by name
function findWeaponSizeByName(name) {
  if (!name) return null;
  for (const sizeKey of Object.keys(SC_DATA.weapons)) {
    const size = parseInt(sizeKey, 10);
    const list = SC_DATA.weapons[size] || [];
    if (list.find(w => w.name && w.name.toLowerCase() === name.toLowerCase())) {
      return size;
    }
  }
  return null;
}

// Build fixes: any pilot weapon named M6A Cannon on non-S4 mounts -> Unknown
const fixesByShip = {};
SC_DATA.ships.forEach(spec => {
  const shipName = spec.name;
  const stock = SC_DATA.stockLoadouts[shipName];
  if (!stock || !Array.isArray(stock.pilotWeapons)) return;

  const pilotSizes = (spec.pilotWeapons || []).map(w => w.size);
  const updated = {};
  let changed = 0;
  stock.pilotWeapons.forEach((name, i) => {
    const slotSize = pilotSizes[i];
    if (typeof name !== 'string' || !slotSize) return;
    const weaponSize = findWeaponSizeByName(name);
    if (weaponSize && weaponSize !== slotSize) {
      // Only fix M6A specifically per user request
      if (name.toLowerCase() === 'm6a cannon') {
        updated[i] = 'Unknown';
        changed++;
      }
    }
  });

  if (changed > 0) {
    fixesByShip[shipName] = { pilotWeapon: updated };
  }
});

const shipsToFix = Object.keys(fixesByShip);
if (shipsToFix.length === 0) {
  console.log('No M6A mismatches found to fix.');
  process.exit(0);
}

// Read data.js content for patching
const dataPath = path.join(__dirname, '..', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

function updateShipEntry(shipName, updater) {
  const escapedName = shipName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const shipStartPattern = new RegExp(`"${escapedName}":\\s*\\{`, 'm');
  const startMatch = shipStartPattern.exec(dataContent);
  if (!startMatch) return false;
  const startPos = startMatch.index;
  // find end brace of this object
  let braceCount = 0;
  let endPos = startPos + startMatch[0].length;
  let inString = false;
  let stringChar = '';
  for (let i = endPos; i < dataContent.length; i++) {
    const ch = dataContent[i];
    const prev = i > 0 ? dataContent[i-1] : '';
    if ((ch === '"' || ch === '\'') && prev !== '\\') {
      if (!inString) { inString = true; stringChar = ch; }
      else if (ch === stringChar) { inString = false; }
    }
    if (!inString) {
      if (ch === '{') braceCount++;
      if (ch === '}') {
        if (braceCount === 0) { endPos = i + 1; break; }
        braceCount--;
      }
    }
  }
  const originalEntry = dataContent.substring(startPos, endPos);

  // Extract arrays
  function extractArray(key) {
    const m = originalEntry.match(new RegExp(`${key}:\\s*\\[([^\\]]*)\\]`, 's'));
    if (!m) return [];
    return m[1]
      .split(',')
      .map(s => s.trim().replace(/^['\"]|['\"]$/g, ''))
      .filter(Boolean);
  }
  const arrays = {
    quantumDrives: extractArray('quantumDrives'),
    powerPlants: extractArray('powerPlants'),
    coolers: extractArray('coolers'),
    shields: extractArray('shields'),
    pilotWeapons: extractArray('pilotWeapons'),
    turretWeapons: extractArray('turretWeapons'),
  };

  const newArrays = updater(arrays);
  if (!newArrays) return false;

  const lines = [];
  lines.push(`    "${shipName}": {`);
  for (const [key, arr] of Object.entries(newArrays)) {
    const formatted = (arr || []).map(item => item === '' ? '""' : `"${item}"`).join(',');
    lines.push(`        ${key}: [${formatted}],`);
  }
  lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, '');
  lines.push('    }');
  const newEntry = lines.join('\n');
  dataContent = dataContent.substring(0, startPos) + newEntry + dataContent.substring(endPos);
  return true;
}

let fixedCount = 0;
shipsToFix.forEach(shipName => {
  const fix = fixesByShip[shipName];
  const ok = updateShipEntry(shipName, arrays => {
    const out = { ...arrays };
    const idxMap = fix.pilotWeapon || {};
    Object.keys(idxMap).forEach(k => {
      const i = parseInt(k, 10);
      out.pilotWeapons[i] = idxMap[k];
    });
    return out;
  });
  if (ok) fixedCount++;
});

if (fixedCount > 0) {
  fs.writeFileSync(dataPath, dataContent, 'utf8');
  console.log(`Fixed ${fixedCount} ships with M6A mismatches.`);
} else {
  console.log('No entries updated.');
}
