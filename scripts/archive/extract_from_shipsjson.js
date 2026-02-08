const fs = require('fs');
const path = require('path');

const shipsPath = path.join(__dirname, '..', 'ships.json');
const ships = JSON.parse(fs.readFileSync(shipsPath, 'utf8'));

function analyze(name) {
  const ship = ships.find(s => s.Name === name || s.Name === name.replace(/Aegis |Anvil /, ''));
  if (!ship) { console.log('Ship not found in ships.json:', name); return; }
  console.log('Found ship:', ship.Name);
  const loadout = ship.Loadout || [];
  const results = {
    pilotWeapons: [],
    turretWeapons: [],
    shields: [],
    powerPlants: [],
    coolers: [],
    quantumDrives: []
  };

  function collectByItemTypes(pattern) {
    return loadout
      .filter(i => i.ItemTypes && i.ItemTypes.some(t => pattern.test(t.Type)))
      .map(i => i.Name)
      .filter(n => n && n !== '<= PLACEHOLDER =>');
  }

  results.pilotWeapons = collectByItemTypes(/Weapon|Gun|Rifle|WeaponGun|WeaponMining/i);
  results.turretWeapons = collectByItemTypes(/Turret|TurretWeapon|TurretGun|TurretMount/i);
  results.shields = collectByItemTypes(/Shield/i);
  results.powerPlants = collectByItemTypes(/PowerPlant|Power/i);
  results.coolers = collectByItemTypes(/Cooler/i);
  results.quantumDrives = collectByItemTypes(/QuantumDrive|Quantum/i);

  console.log(JSON.stringify(results, null, 2));
}

analyze('Aegis Reclaimer');
console.log('---');
analyze('Anvil F7A Hornet Mk II');
