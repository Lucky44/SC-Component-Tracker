const fs = require('fs');
const path = require('path');
const ships = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'ships.json')));
const reclaimer = ships.find(s => s.Name === 'Aegis Reclaimer');
if (!reclaimer) { console.error('Reclaimer not found'); process.exit(1); }
const loadout = reclaimer.Loadout || [];

const turretItems = loadout.filter(i => {
  const name = (i.Name || '') + (i.ClassName || '');
  const itemTypes = (i.ItemTypes || []).map(t => t.Type).join(' ');
  return /turret|Turret|TurretWeapon|TurretGun/i.test(name) || /Turret/i.test(itemTypes) || /Weapon|Gun/i.test(itemTypes) && /(turret|hardpoint)/i.test(i.HardpointName || '');
});

const out = {
  totalLoadoutItems: loadout.length,
  turretLikeCount: turretItems.length,
  items: turretItems.map(i => ({Name: i.Name, ClassName: i.ClassName, HardpointName: i.HardpointName, ItemTypes: i.ItemTypes}))
};
require('fs').writeFileSync(require('path').join(__dirname, '..', 'tmp', 'reclaimer_turrets.json'), JSON.stringify(out, null, 2));
console.log('Wrote tmp/reclaimer_turrets.json');
