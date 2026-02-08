const fs = require('fs');
const path = require('path');

// Read current solutions
const solutionsPath = path.join(__dirname, 'solutions_from_wiki.json');
const solutions = JSON.parse(fs.readFileSync(solutionsPath, 'utf8'));

// New data from subagent - batch 2
const newData = {
  "Anvil F7A Hornet Mk II": {
    "turretWeapon": {
      "0": "Omnisky IX Cannon"
    },
    "shield": {
      "0": "AllStop"
    },
    "cooler": {
      "0": "Bracer",
      "1": "Bracer"
    },
    "powerPlant": "Maelstrom"
  },
  "Aegis Vanguard Warden": {
    "pilotWeapon": {
      "0": "Deadbolt V Cannon"
    },
    "turretWeapon": {
      "0": "SW16BR2 Sawbuck Repeater"
    },
    "shield": {
      "0": "FullStop",
      "1": "FullStop"
    },
    "cooler": {
      "0": "Arctic",
      "1": "Arctic"
    },
    "powerPlant": "Maelstrom"
  },
  "Aegis Vanguard Harbinger": {
    "pilotWeapon": {
      "0": "Deadbolt V Cannon"
    },
    "turretWeapon": {
      "0": "Jericho XL"
    },
    "shield": {
      "0": "SecureShield",
      "1": "SecureShield"
    },
    "cooler": {
      "0": "Permafrost",
      "1": "Permafrost"
    },
    "powerPlant": "TurboDrive"
  },
  "Aegis Vanguard Sentinel": {
    "pilotWeapon": {
      "0": "Attrition-5 Repeater"
    },
    "turretWeapon": {
      "0": "Suckerpunch-L Cannon"
    },
    "shield": {
      "0": "Sheut",
      "1": "Sheut"
    },
    "cooler": {
      "0": "HeatSink",
      "1": "HeatSink"
    },
    "powerPlant": "GammaMax"
  },
  "Drake Freelancer": {
    "turretWeapon": {
      "0": "CF-337 Panther Repeater",
      "1": "CF-337 Panther Repeater"
    },
    "shield": {
      "0": "5MA Chimalli",
      "1": "5MA Chimalli",
      "2": "5MA Chimalli"
    },
    "cooler": {
      "0": "Frost-Star EX",
      "1": "Frost-Star EX"
    },
    "powerPlant": "DayBreak"
  },
  "Crusader A1 Spirit": {
    "pilotWeapon": {
      "0": "M5A Cannon",
      "1": "M5A Cannon"
    },
    "turretWeapon": {
      "0": "CF-227 Badger Repeater"
    },
    "shield": {
      "0": "FullStop"
    },
    "cooler": {
      "0": "Boreal"
    },
    "powerPlant": "UltraFlux"
  },
  "Crusader C1 Spirit": {
    "pilotWeapon": {
      "0": "M5A Cannon",
      "1": "M5A Cannon"
    },
    "turretWeapon": {
      "0": "M5A Cannon"
    },
    "shield": {
      "0": "FullStop"
    },
    "cooler": {
      "0": "Boreal"
    },
    "powerPlant": "UltraFlux"
  },
  "RSI Polaris": {
    "turretWeapon": {
      "0": "CF-337 Panther Repeater"
    },
    "shield": {
      "0": "Glacis"
    },
    "cooler": {
      "0": "Serac"
    },
    "powerPlant": "Stellate"
  }
};

// Merge new data into existing solutions
let addedCount = 0;
let updatedCount = 0;

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
console.log(`📊 Total ships in solutions: ${Object.keys(solutions.solutions).length}`);
