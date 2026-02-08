const fs = require('fs');
const path = require('path');

// Read the solutions file
const solutionsPath = path.join(__dirname, 'solutions_from_wiki.json');
const solutions = JSON.parse(fs.readFileSync(solutionsPath, 'utf8'));

// Read data.js
const dataPath = path.join(__dirname, '..', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

console.log(`Loaded solutions for ${Object.keys(solutions.solutions).length} ships\n`);

let shipsUpdated = 0;
let totalSlotsFilled = 0;

// Apply fixes using direct string replacement for each ship
for (const [shipName, fixes] of Object.entries(solutions.solutions)) {
    // Find the ship's entry - need to be careful with regex
    // Look for: "ShipName": { ... }
    // This could span multiple lines
    
    // First, let's find the start of this ship's entry
    const escapedName = shipName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const shipStartPattern = new RegExp(`"${escapedName}":\\s*\\{`, 'm');
    
    const startMatch = shipStartPattern.exec(dataContent);
    if (!startMatch) {
        console.log(`⚠️  Ship not found: ${shipName}`);
        continue;
    }
    
    const startPos = startMatch.index;
    
    // Find the closing brace for this ship
    // We need to match braces carefully
    let braceCount = 0;
    let endPos = startPos + startMatch[0].length;
    let inString = false;
    let stringChar = '';
    
    for (let i = endPos; i < dataContent.length; i++) {
        const char = dataContent[i];
        const prevChar = i > 0 ? dataContent[i-1] : '';
        
        // Handle strings
        if ((char === '"' || char === "'") && prevChar !== '\\') {
            if (!inString) {
                inString = true;
                stringChar = char;
            } else if (char === stringChar) {
                inString = false;
            }
        }
        
        if (!inString) {
            if (char === '{') braceCount++;
            if (char === '}') {
                if (braceCount === 0) {
                    endPos = i + 1;
                    break;
                }
                braceCount--;
            }
        }
    }
    
    const originalEntry = dataContent.substring(startPos, endPos);
    
    // Parse the current values from the original entry
    const newArrays = {
        quantumDrives: [],
        powerPlants: [],
        coolers: [],
        shields: [],
        pilotWeapons: [],
        turretWeapons: []
    };
    
    // Extract existing arrays
    for (const key of Object.keys(newArrays)) {
        const arrPattern = new RegExp(`${key}:\\s*\\[([^\\]]*)\\]`, 's');
        const arrMatch = originalEntry.match(arrPattern);
        if (arrMatch) {
            const items = arrMatch[1]
                .split(',')
                .map(s => s.trim().replace(/^["']|["']$/g, ''))
                .filter(s => s);
            newArrays[key] = items;
        }
    }
    
    let shipSlotsFilled = 0;
    
    // Apply fixes from solutions
    if (fixes.pilotWeapon) {
        // Find max index to determine array size
        const maxIndex = Math.max(...Object.keys(fixes.pilotWeapon).map(k => parseInt(k)));
        const targetSize = Math.max(newArrays.pilotWeapons.length, maxIndex + 1);
        
        // Ensure array is the right size
        while (newArrays.pilotWeapons.length < targetSize) {
            newArrays.pilotWeapons.push("");
        }
        
        for (const [index, weapon] of Object.entries(fixes.pilotWeapon)) {
            newArrays.pilotWeapons[parseInt(index)] = weapon;
            shipSlotsFilled++;
        }
    }
    
    if (fixes.turretWeapon) {
        // Find max index to determine array size
        const maxIndex = Math.max(...Object.keys(fixes.turretWeapon).map(k => parseInt(k)));
        const targetSize = Math.max(newArrays.turretWeapons.length, maxIndex + 1);
        
        // Ensure array is the right size
        while (newArrays.turretWeapons.length < targetSize) {
            newArrays.turretWeapons.push("");
        }
        
        for (const [index, weapon] of Object.entries(fixes.turretWeapon)) {
            newArrays.turretWeapons[parseInt(index)] = weapon;
            shipSlotsFilled++;
        }
    }
    
    for (const componentType of ['shields', 'coolers', 'powerPlants', 'quantumDrives']) {
        if (fixes[componentType]) {
            const maxIndex = Math.max(...Object.keys(fixes[componentType]).map(k => parseInt(k)));
            const targetSize = Math.max(newArrays[componentType].length, maxIndex + 1);
            
            // Ensure array is the right size
            while (newArrays[componentType].length < targetSize) {
                newArrays[componentType].push("");
            }
            
            for (const [index, component] of Object.entries(fixes[componentType])) {
                newArrays[componentType][parseInt(index)] = component;
                shipSlotsFilled++;
            }
        }
    }
    
    if (shipSlotsFilled === 0) continue;
    
    // Build new entry string matching the original format
    const lines = [];
    lines.push(`    "${shipName}": {`);
    
    for (const [key, arr] of Object.entries(newArrays)) {
        const formattedArray = arr.map(item => item === "" ? '""' : `"${item}"`).join(",");
        lines.push(`        ${key}: [${formattedArray}],`);
    }
    
    // Remove trailing comma from last line
    lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, '');
    lines.push('    }');
    
    const newEntry = lines.join('\n');
    
    // Replace in dataContent
    dataContent = dataContent.substring(0, startPos) + newEntry + dataContent.substring(endPos);
    
    shipsUpdated++;
    totalSlotsFilled += shipSlotsFilled;
    console.log(`✓ ${shipName}: ${shipSlotsFilled} slots filled`);
}

// Write back to file
fs.writeFileSync(dataPath, dataContent, 'utf8');

console.log(`\nShips updated: ${shipsUpdated}`);
console.log(`Total slots filled: ${totalSlotsFilled}`);
console.log('✅ Updated data.js successfully!');
