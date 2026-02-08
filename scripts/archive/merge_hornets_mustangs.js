const fs = require('fs');
const path = require('path');

// Read current solutions
const solutionsPath = path.join(__dirname, 'solutions_from_wiki.json');
const solutions = JSON.parse(fs.readFileSync(solutionsPath, 'utf8'));

// New data from subagent - Hornets and Mustangs detailed
const newData = {
  "Anvil F7C Hornet Mk I": {
    "pilotWeapon": {
      "0": "CF-337 Panther Repeater",
      "1": "CF-337 Panther Repeater"
    },
    "turretWeapon": {
      "0": "Anvil Noise Launcher",
      "1": "Anvil Decoy Launcher"
    }
  },
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
  "Anvil F7A Hornet Mk II": {
    "pilotWeapon": {
      "0": "Revenant Gatling",
      "1": "Revenant Gatling"
    },
    "turretWeapon": {
      "0": "Omnisky IX Cannon",
      "1": "Omnisky IX Cannon"
    }
  },
  "Anvil F8A Lightning": {
    "pilotWeapon": {
      "0": "M6A Cannon",
      "1": "M6A Cannon",
      "2": "M5A Cannon",
      "3": "M5A Cannon",
      "4": "M5A Cannon",
      "5": "M5A Cannon"
    }
  },
  "C.O. Mustang Alpha": {
    "pilotWeapon": {
      "0": "CF-227 Badger Repeater",
      "1": "CF-227 Badger Repeater"
    },
    "turretWeapon": {
      "0": "CF-227 Badger Repeater",
      "1": "CF-227 Badger Repeater"
    }
  },
  "C.O. Mustang Beta": {
    "pilotWeapon": {
      "0": "CF-227 Badger Repeater",
      "1": "CF-227 Badger Repeater"
    },
    "turretWeapon": {
      "0": "CF-227 Badger Repeater",
      "1": "CF-227 Badger Repeater"
    }
  },
  "C.O. Mustang Delta": {
    "pilotWeapon": {
      "0": "Jericho XL",
      "1": "Jericho XL",
      "2": "CF-227 Badger Repeater",
      "3": "CF-227 Badger Repeater"
    },
    "turretWeapon": {
      "0": "CF-227 Badger Repeater",
      "1": "CF-227 Badger Repeater"
    }
  },
  "C.O. Mustang Gamma": {
    "pilotWeapon": {
      "0": "CF-117 Bulldog Repeater",
      "1": "CF-117 Bulldog Repeater"
    }
  },
  "C.O. Mustang Omega": {
    "pilotWeapon": {
      "0": "CF-117 Bulldog Repeater",
      "1": "CF-117 Bulldog Repeater"
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
    if (!solutions.solutions[shipName][category]) {
      solutions.solutions[shipName][category] = {};
    }
    
    // Count slots
    if (typeof items === 'object') {
      totalSlots += Object.keys(items).length;
    }
    
    // Merge items
    solutions.solutions[shipName][category] = {
      ...solutions.solutions[shipName][category],
      ...items
    };
  }
}

// Write back
fs.writeFileSync(solutionsPath, JSON.stringify(solutions, null, 2), 'utf8');

console.log(`✅ Processed ${Object.keys(newData).length} ships`);
console.log(`📊 New ships added: ${addedCount}`);
console.log(`📊 Ships updated: ${updatedCount}`);
console.log(`📊 Total slots in this batch: ${totalSlots}`);
console.log(`📊 Total ships in solutions: ${Object.keys(solutions.solutions).length}`);
