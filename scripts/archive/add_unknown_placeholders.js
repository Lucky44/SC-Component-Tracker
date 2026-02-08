const fs = require('fs');

// Read problem slots
const problems = JSON.parse(fs.readFileSync('./scripts/problem_slots.json', 'utf8'));
const solutions = JSON.parse(fs.readFileSync('./scripts/solutions_from_wiki.json', 'utf8'));

let totalAdded = 0;
let shipsUpdated = 0;

// For each ship with problems
for (const [shipName, slots] of Object.entries(problems)) {
    if (!solutions.solutions[shipName]) {
        solutions.solutions[shipName] = {};
    }
    
    // For each problem slot
    for (const problem of slots) {
        const slotName = problem.slot.replace(/ \(.*\)/, ''); // Remove parenthetical
        const arrayMatch = slotName.match(/^(\w+)\[(\d+)\]$/);
        
        if (!arrayMatch) continue;
        
        const arrayType = arrayMatch[1];
        const index = arrayMatch[2];
        
        // Ensure the category exists
        if (!solutions.solutions[shipName][arrayType]) {
            solutions.solutions[shipName][arrayType] = {};
        }
        
        // Add 'Unknown' if not already there
        if (!solutions.solutions[shipName][arrayType][index]) {
            solutions.solutions[shipName][arrayType][index] = 'Unknown';
            totalAdded++;
        }
    }
    
    if (slots.length > 0) {
        shipsUpdated++;
    }
}

fs.writeFileSync('./scripts/solutions_from_wiki.json', JSON.stringify(solutions, null, 2), 'utf8');

console.log(`✅ Added 'Unknown' placeholders`);
console.log(`📊 Slots added: ${totalAdded}`);
console.log(`📊 Ships updated: ${shipsUpdated}`);
