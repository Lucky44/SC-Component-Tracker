const fs = require('fs');
const path = require('path');

// Read data.js raw
const dataPath = path.join(__dirname, '..', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

// Extract all ship names from data.js
const shipNameMatches = dataContent.match(/"[^"]*":\s*\{[^}]*pilotWeapon|turretWeapon/g) || [];
const dataJsShips = new Set();

const lines = dataContent.split('\n');
for (const line of lines) {
  const match = line.match(/"([^"]+)":\s*\{/);
  if (match) {
    dataJsShips.add(match[1]);
  }
}

// Problem ships - try to find matches
const problemShips = [
  'Anvil F7C Hornet Mk I',
  'Anvil F7C-M Super Hornet',
  'Anvil F8A Lightning',
  'C.O. Mustang Alpha',
  'C.O. Mustang Beta',
  'C.O. Mustang Gamma',
  'C.O. Mustang Omega',
  'Crusader Spirit A1',
  'Crusader Spirit C1',
  'Crusader Spirit E1',
  'Drake Buccaneer',
  'Drake Cutlass Black',
  'Drake Cutlass Blue',
  'Drake Cutlass Steel',
  'Esperia Blade'
];

console.log('=== Ship Name Mapping ===\n');
console.log('Ships in data.js (partial list):');
[...dataJsShips].sort().slice(0, 30).forEach(s => console.log('  ' + s));

console.log('\n\nProblematic ships to match:');
problemShips.forEach(problem => {
  const matches = [...dataJsShips].filter(s => s.includes(problem.split(' ')[0]) && s.includes(problem.split(' ').slice(-1)[0]));
  console.log(`${problem} -> ${matches.length ? matches[0] : 'NOT FOUND'}`);
});
