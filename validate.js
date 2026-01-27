const fs = require('fs');
const vm = require('vm');

function loadSCData(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const sandbox = { window: {}, console };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox.window.SC_DATA || sandbox.SC_DATA;
}

function normalize(s) {
  return (s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function makeIndexByName(arr) {
  const map = new Map();
  (arr || []).forEach(item => {
    if (item && item.name) map.set(item.name.toLowerCase(), item);
  });
  return map;
}

function findWeaponSizeByName(SC_DATA, name) {
  if (!name) return null;
  for (const key of Object.keys(SC_DATA.weapons)) {
    const sz = parseInt(key, 10);
    const list = SC_DATA.weapons[sz] || [];
    if (list.find(w => w.name && w.name.toLowerCase() === name.toLowerCase())) return sz;
  }
  return null;
}

function validate() {
  const SC_DATA = loadSCData('data.js');
  const issues = [];

  const shieldsByName = makeIndexByName(SC_DATA.shields);
  const coolersByName = makeIndexByName(SC_DATA.coolers);
  const ppsByName = makeIndexByName(SC_DATA.powerPlants);
  const qdByName = makeIndexByName(SC_DATA.quantumDrives);

  const ships = SC_DATA.ships || [];
  const shipByNorm = new Map();
  ships.forEach(s => shipByNorm.set(normalize(s.name), s));

  const stock = SC_DATA.stockLoadouts || {};

  // Helper to push an issue
  function addIssue(type, ship, detail) {
    issues.push({ type, ship, detail });
  }

  // Validate each stock loadout entry against catalogs and (if matched) ship specs
  for (const [shipName, loadout] of Object.entries(stock)) {
    const spec = shipByNorm.get(normalize(shipName)) || null;

    // Pilot weapons existence and size checks
    const pws = Array.isArray(loadout.pilotWeapons) ? loadout.pilotWeapons : [];
    pws.forEach((wName, i) => {
      if (wName === 'Empty') return; // Skip intentionally empty hardpoints
      const size = findWeaponSizeByName(SC_DATA, wName);
      if (wName && size == null) addIssue('unknown-weapon', shipName, `pilotWeapons[${i}] '${wName}' not found`);
      if (spec && spec.pilotWeapons && spec.pilotWeapons[i]) {
        const mount = spec.pilotWeapons[i].size;
        if (size != null && size > mount) addIssue('oversized-weapon', shipName, `pilotWeapons[${i}] '${wName}' size ${size} > mount S${mount}`);
      }
    });
    if (spec && spec.pilotWeapons) {
      if (pws.length > spec.pilotWeapons.length) {
        addIssue('A-hardpoint-spec-missing', shipName, `pilot: stock has ${pws.length}, spec has ${spec.pilotWeapons.length}`);
        addIssue('too-many-pilot-weapons', shipName, `stock has ${pws.length}, spec has ${spec.pilotWeapons.length}`);
      }
      // Missing stock entries for existing mounts (empty or too few)
      for (let i = 0; i < spec.pilotWeapons.length; i++) {
        const name = pws[i];
        if (!name || name === 'Empty') continue; // Skip empty or 'Empty' placeholder
        // If we reach here, there's an actual weapon name but it might be missing
      }
      // Check for genuinely missing entries (not 'Empty', just undefined)
      for (let i = 0; i < spec.pilotWeapons.length; i++) {
        const name = pws[i];
        if (name === undefined) addIssue('B-missing-stock-pilot', shipName, `pilot mount ${i} has no stock weapon`);
      }
    }

    // Turret weapons existence and size checks
    const tws = Array.isArray(loadout.turretWeapons) ? loadout.turretWeapons : [];
    if (tws.length > 0) {
      tws.forEach((wName, i) => {
        if (wName === 'Empty') return; // Skip intentionally empty hardpoints
        const size = findWeaponSizeByName(SC_DATA, wName);
        if (wName && size == null) addIssue('unknown-weapon', shipName, `turretWeapons[${i}] '${wName}' not found`);
      });
      if (spec && spec.turrets && spec.turrets.length) {
        const totalGuns = spec.turrets.reduce((a, t) => a + Math.max(1, t.guns || 1), 0);
        const perTurret = spec.turrets.length;
        if (![totalGuns, perTurret].includes(tws.length)) {
          addIssue('turret-length-mismatch', shipName, `turretWeapons has ${tws.length}, expected ${totalGuns} (per-gun) or ${perTurret} (per-turret)`);
          if (tws.length > Math.max(totalGuns, perTurret)) {
            addIssue('A-hardpoint-spec-missing', shipName, `turrets: stock lists ${tws.length} > spec mounts (guns=${totalGuns}, turrets=${perTurret})`);
          } else {
            addIssue('B-missing-stock-turret', shipName, `turrets: stock lists ${tws.length} < spec expectation (guns=${totalGuns}, turrets=${perTurret})`);
          }
        }
        // Check sizes assuming per-gun list when lengths match, else treat as per-turret representative
        if (tws.length === totalGuns) {
          let idx = 0;
          spec.turrets.forEach((t, ti) => {
            const want = Math.max(1, t.guns || 1);
            for (let j = 0; j < want; j++) {
              const name = tws[idx++];
              const size = findWeaponSizeByName(SC_DATA, name);
              if (name && size != null && size > t.size) addIssue('oversized-weapon', shipName, `turret ${ti} gun ${j} '${name}' size ${size} > mount S${t.size}`);
              if (!name) addIssue('B-missing-stock-turret', shipName, `turret ${ti} gun ${j} has no stock weapon`);
            }
          });
        } else if (tws.length === perTurret) {
          spec.turrets.forEach((t, ti) => {
            const name = tws[ti];
            const size = findWeaponSizeByName(SC_DATA, name);
            if (name && size != null && size > t.size) addIssue('oversized-weapon', shipName, `turret ${ti} '${name}' size ${size} > mount S${t.size}`);
            if (!name) addIssue('B-missing-stock-turret', shipName, `turret ${ti} has no stock weapon`);
          });
        }
      }
    }
    // If stock lists turrets but spec has none
    if (tws.length > 0 && spec && (!spec.turrets || spec.turrets.length === 0)) {
      addIssue('A-hardpoint-spec-missing', shipName, `turrets present in stock but spec has none`);
    }

    // Shields, power plants, coolers, quantum drives — existence and size
    const checkList = [
      ['shields', shieldsByName],
      ['powerPlants', ppsByName],
      ['coolers', coolersByName],
      ['quantumDrives', qdByName],
    ];
    checkList.forEach(([key, idx]) => {
      const arr = Array.isArray(loadout[key]) ? loadout[key] : [];
      arr.forEach((name, i) => {
        if (!name) return;
        const found = idx.get(name.toLowerCase());
        if (!found) addIssue('unknown-component', shipName, `${key}[${i}] '${name}' not found`);
        if (spec && spec[key === 'quantumDrives' ? 'quantumDrive' : key.slice(0, -1)]) {
          // Determine slot size
          let slotSize = null;
          if (key === 'quantumDrives') slotSize = spec.quantumDrive.size;
          else slotSize = spec[key.slice(0, -1)].size; // e.g., shields.size
          if (found && found.size != null && slotSize != null && found.size !== slotSize) {
            addIssue('size-mismatch', shipName, `${key}[${i}] '${name}' size ${found.size} != slot S${slotSize}`);
          }
        }
      });
    });
  }

  // Print results
  if (issues.length === 0) {
    console.log('No issues found.');
    return 0;
  }
  // Group by ship
  const byShip = new Map();
  for (const it of issues) {
    if (!byShip.has(it.ship)) byShip.set(it.ship, []);
    byShip.get(it.ship).push(it);
  }
  for (const [ship, arr] of byShip.entries()) {
    console.log(`\n=== ${ship} ===`);
    arr.forEach(x => console.log(`- ${x.type}: ${x.detail}`));
  }
  console.log(`\nTotal issues: ${issues.length}`);
  return issues.length;
}

process.exitCode = validate();
