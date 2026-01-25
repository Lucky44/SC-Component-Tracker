#!/usr/bin/env node

/**
 * Fetch stock loadouts from starcitizen.tools for all ships with missing slots
 * Reads problem_slots.json and creates solutions.json with extracted loadout data
 */

const fs = require('fs');
const path = require('path');

// Ship name mapping: our names → wiki page names
const shipNameMapping = {
  '600i Executive Edition': '600i',
  '600i Explorer': '600i',
  '600i Touring': '600i',
  '890 Jump': '890_Jump',
  'A2 Hercules': 'Hercules_Starlifter#A2_Hercules',
  'Ares Inferno': 'Ares',
  'Ares Ion': 'Ares',
  'Avenger Stalker': 'Avenger',
  'Avenger Titan': 'Avenger',
  'Avenger Titan Renegade': 'Avenger',
  'Avenger Warlock': 'Avenger',
  'C2 Hercules': 'Hercules_Starlifter#C2_Hercules',
  'C8 Pisces': 'Pisces',
  'C8R Pisces': 'Pisces',
  'C8X Pisces Expedition': 'Pisces',
  'Carrack Expedition': 'Carrack',
  'Constellation Andromeda': 'Constellation_Andromeda',
  'Constellation Aquila': 'Constellation_Aquila',
  'Constellation Phoenix': 'Constellation_Phoenix',
  'Constellation Taurus': 'Constellation_Taurus',
  'Cutlass Black': 'Cutlass_Black',
  'Cutlass Blue': 'Cutlass_Blue',
  'Cutlass Red': 'Cutlass_Red',
  'Freelancer DUR': 'Freelancer',
  'Freelancer MAX': 'Freelancer',
  'Freelancer MIS': 'Freelancer',
  'Gladius Valiant': 'Gladius',
  'Hammerhead': 'Hammerhead',
  'Hornet F7A': 'F7A_Hornet',
  'Hornet F7A Mk II': 'F7A_Hornet',
  'Hornet F7C': 'F7C_Hornet',
  'Hornet F7C Wildfire': 'F7C_Hornet',
  'Hornet F7C-M Super Hornet': 'F7C-M_Super_Hornet',
  'Hornet F7C-M Heartseeker': 'F7C-M_Super_Hornet',
  'Hornet F7C-R Tracker': 'F7C-R_Hornet_Tracker',
  'Hornet F7C-S Ghost': 'F7C-S_Hornet_Ghost',
  'M2 Hercules': 'Hercules_Starlifter#M2_Hercules',
  'Mercury Star Runner': 'Mercury_Star_Runner',
  'Mustang Alpha': 'Mustang#Mustang_Alpha',
  'Mustang Beta': 'Mustang#Mustang_Beta',
  'Mustang Delta': 'Mustang#Mustang_Delta',
  'Mustang Gamma': 'Mustang#Mustang_Gamma',
  'Mustang Omega': 'Mustang#Mustang_Omega',
  'Origin 100i': '100i',
  'Origin 125a': '125a',
  'Origin 135c': '135c',
  'Origin 300i': '300i',
  'Origin 315p': '315p',
  'Origin 325a': '325a',
  'Origin 350r': '350r',
  'Reclaimer': 'Reclaimer',
  'Reliant Kore': 'Reliant_Kore',
  'Reliant Mako': 'Reliant_Mako',
  'Reliant Sen': 'Reliant_Sen',
  'Reliant Tana': 'Reliant_Tana',
  'RSI Aurora CL': 'Aurora#Aurora_CL',
  'RSI Aurora ES': 'Aurora#Aurora_ES',
  'RSI Aurora LN': 'Aurora#Aurora_LN',
  'RSI Aurora LX': 'Aurora#Aurora_LX',
  'RSI Aurora MR': 'Aurora#Aurora_MR',
  'Sabre': 'Sabre',
  'Sabre Comet': 'Sabre',
  'Sabre Raven': 'Sabre_Raven',
  'Vanguard Harbinger': 'Vanguard',
  'Vanguard Hoplite': 'Vanguard',
  'Vanguard Sentinel': 'Vanguard',
  'Vanguard Warden': 'Vanguard'
};

console.log('This script requires manual execution with fetch_webpage tool.');
console.log('Reading problem_slots.json to identify ships needing loadout data...\n');

// Read problem slots
const problemSlotsPath = path.join(__dirname, 'problem_slots.json');
const problemSlots = JSON.parse(fs.readFileSync(problemSlotsPath, 'utf8'));

// Get unique ship names
const shipsNeedingData = Object.keys(problemSlots).sort();

console.log(`Found ${shipsNeedingData.length} ships with missing data:\n`);

// Group ships by wiki page
const wikiPages = {};
shipsNeedingData.forEach(shipName => {
  const wikiName = shipNameMapping[shipName] || shipName.replace(/ /g, '_');
  if (!wikiPages[wikiName]) {
    wikiPages[wikiName] = [];
  }
  wikiPages[wikiName].push(shipName);
});

console.log(`This will require fetching ${Object.keys(wikiPages).length} wiki pages:\n`);

Object.entries(wikiPages).forEach(([wikiName, ships]) => {
  console.log(`  - https://starcitizen.tools/${wikiName}`);
  console.log(`    For ships: ${ships.join(', ')}\n`);
});

console.log('\nNext steps:');
console.log('1. Use fetch_webpage tool to retrieve each wiki page');
console.log('2. Extract weapon and component data from Specifications section');
console.log('3. Create solutions.json with extracted loadout data');
console.log('4. Apply solutions to data.js stockLoadouts');
