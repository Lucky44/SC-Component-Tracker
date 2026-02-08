const fs = require('fs');
const vm = require('vm');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data.js');
let code = fs.readFileSync(dataPath, 'utf8');
// Replace browser-only `window.SC_DATA = SC_DATA;` with module export
code = code.replace(/window\.SC_DATA\s*=\s*SC_DATA\s*;?/g, 'module.exports = SC_DATA;');

const sandbox = { console, module: { exports: {} } };
vm.createContext(sandbox);
vm.runInContext(code, sandbox);
const SC_DATA = sandbox.module.exports;

function showDefaults(name) {
  const shipSpec = SC_DATA.ships.find(s => s.name === name);
  if (!shipSpec) {
    console.log('Ship not found:', name);
    return;
  }
  const defaults = SC_DATA.getDefaultComponents(shipSpec);
  console.log('Defaults for', name, JSON.stringify(defaults, null, 2));
}

showDefaults('Aegis Reclaimer');
showDefaults('Anvil F7A Hornet Mk II');
