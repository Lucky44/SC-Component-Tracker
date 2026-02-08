const fs = require('fs');
const path = require('path');

// Read current solutions
const solutionsPath = path.join(__dirname, 'solutions_from_wiki.json');
const solutions = JSON.parse(fs.readFileSync(solutionsPath, 'utf8'));

// New data from subagent
const newData = {
  "Drake Buccaneer": {
    "pilotWeapon": {
      "0": "Revenant Gatling",
      "1": "CF-337 Panther Repeater",
      "2": "CF-337 Panther Repeater"
    }
  },
  "Drake Caterpillar": {
    "turretWeapon": {
      "3": "CF-447 Rhino Repeater"
    }
  },
  "Drake Corsair": {
    "pilotWeapon": {
      "0": "M7A Cannon",
      "1": "M7A Cannon",
      "2": "M6A Cannon",
      "3": "M6A Cannon"
    },
    "turretWeapon": {
      "0": "CF-227 Badger Repeater",
      "1": "CF-227 Badger Repeater",
      "2": "CF-227 Badger Repeater",
      "3": "CF-227 Badger Repeater"
    }
  },
  "Drake Cutter": {
    "pilotWeapon": {
      "1": "CF-227 Badger Repeater"
    }
  },
  "Esperia Talon": {
    "pilotWeapon": {
      "0": "Lightstrike IV Cannon",
      "1": "Lightstrike IV Cannon"
    }
  },
  "Esperia Talon Shrike": {
    "pilotWeapon": {
      "0": "Lightstrike II Cannon",
      "1": "Lightstrike II Cannon"
    }
  },
  "Esperia Prowler": {
    "pilotWeapon": {
      "0": "Deadbolt V Cannon",
      "1": "Deadbolt V Cannon"
    },
    "turretWeapon": {
      "2": "Lightstrike III Cannon",
      "3": "Lightstrike III Cannon"
    }
  },
  "Gatac Syulen": {
    "pilotWeapon": {
      "1": "CF-337 Panther Repeater"
    }
  },
  "Gatac Railen": {
    "turretWeapon": {
      "0": "S4 Weapon",
      "1": "S4 Weapon",
      "2": "S4 Weapon",
      "3": "S4 Weapon"
    }
  },
  "Mustang Omega": {
    "pilotWeapon": {
      "0": "CF-117 Bulldog Repeater",
      "1": "CF-117 Bulldog Repeater"
    }
  }
};

// Merge new data into existing solutions
let addedCount = 0;
for (const [shipName, fixes] of Object.entries(newData)) {
  if (!solutions.solutions[shipName]) {
    solutions.solutions[shipName] = {};
    addedCount++;
  }
  
  // Merge in fixes
  for (const [category, items] of Object.entries(fixes)) {
    if (!solutions.solutions[shipName][category]) {
      solutions.solutions[shipName][category] = {};
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

console.log(`✅ Merged ${Object.keys(newData).length} ships`);
console.log(`📊 New ships added: ${addedCount}`);
console.log(`📊 Total ships in solutions: ${Object.keys(solutions.solutions).length}`);
