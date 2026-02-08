const fs = require('fs');
const path = require('path');

// Read current solutions
const solutionsPath = path.join(__dirname, 'solutions_from_wiki.json');
const solutions = JSON.parse(fs.readFileSync(solutionsPath, 'utf8'));

// New data from subagent - converted to proper names
const newData = {
  "Anvil F7C-M Super Hornet Mk I": {
    "pilotWeapon": {
      "0": "Mantis GT-220 Gatling",
      "1": "Mantis GT-220 Gatling"
    },
    "turretWeapon": {
      "0": "CF-117 Bulldog Repeater",
      "1": "CF-117 Bulldog Repeater"
    }
  },
  "Banu Defender": {
    "turretWeapon": {
      "0": "Singe Cannon",
      "1": "Singe Cannon",
      "2": "Singe Cannon",
      "3": "Singe Cannon"
    }
  },
  "Banu Merchantman": {
    "pilotWeapon": {
      "0": "S8 Weapon",
      "1": "S8 Weapon"
    },
    "turretWeapon": {
      "0": "S6 Turret",
      "1": "S5 Turret",
      "2": "S5 Turret",
      "3": "S4 Turret",
      "4": "S4 Turret",
      "5": "S4 Turret",
      "6": "S4 Turret"
    }
  },
  "MISC Reliant Kore": {
    "pilotWeapon": {
      "0": "CF-227 Badger Repeater",
      "1": "CF-227 Badger Repeater"
    },
    "turretWeapon": {
      "0": "CF-227 Badger Repeater",
      "1": "CF-227 Badger Repeater"
    }
  },
  "MISC Reliant Tana": {
    "pilotWeapon": {
      "0": "CF-227 Badger Repeater",
      "1": "CF-227 Badger Repeater"
    },
    "turretWeapon": {
      "0": "CF-337 Panther Repeater",
      "1": "CF-337 Panther Repeater"
    }
  },
  "Consolidated Outland Nomad": {
    "pilotWeapon": {
      "0": "CF-337 Panther Repeater",
      "1": "CF-337 Panther Repeater",
      "2": "CF-337 Panther Repeater"
    },
    "turretWeapon": {
      "0": "SureGrip S1 Tractor"
    }
  }
};

// Merge new data into existing solutions
let addedCount = 0;
let updatedCount = 0;
let totalSlots = 0;

for (const [shipName, fixes] of Object.entries(newData)) {
  if (!solutions.solutions[shipName]) {
    solutions.solutions[shipName] = {};
    addedCount++;
  } else {
    updatedCount++;
  }
  
  // Merge in fixes
  for (const [category, items] of Object.entries(fixes)) {
    if (typeof items === 'object') {
      if (!solutions.solutions[shipName][category]) {
        solutions.solutions[shipName][category] = {};
      }
      
      // Count slots
      totalSlots += Object.keys(items).length;
      
      // Merge items
      solutions.solutions[shipName][category] = {
        ...solutions.solutions[shipName][category],
        ...items
      };
    }
  }
}

// Write back
fs.writeFileSync(solutionsPath, JSON.stringify(solutions, null, 2), 'utf8');

console.log(`✅ Processed ${Object.keys(newData).length} ships`);
console.log(`📊 New ships added: ${addedCount}`);
console.log(`📊 Ships updated: ${updatedCount}`);
console.log(`📊 Total slots in this batch: ${totalSlots}`);
console.log(`📊 Total ships in solutions: ${Object.keys(solutions.solutions).length}`);
