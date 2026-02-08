const fs = require('fs');
const path = require('path');

// Read problem slots
const problemSlotsPath = path.join(__dirname, 'problem_slots.json');
const problemSlots = JSON.parse(fs.readFileSync(problemSlotsPath, 'utf8'));

// Read data.js
const dataPath = path.join(__dirname, '..', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

let totalUpdated = 0;
let shipsUpdated = 0;
const shipsModified = new Set();

// For each ship with problems
for (const [shipName, slots] of Object.entries(problemSlots)) {
    // Find the ship's entry in data.js
    const escapedName = shipName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const shipStartPattern = new RegExp(`"${escapedName}":\\s*\\{`, 'm');
    
    const startMatch = shipStartPattern.exec(dataContent);
    if (!startMatch) {
        console.log(`⚠️  Ship not found: ${shipName}`);
        continue;
    }
    
    const startPos = startMatch.index;
    
    // Find the closing brace for this ship
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
    
    // Extract the ship object
    let shipObject = dataContent.substring(startPos, endPos);
    const originalShip = shipObject;
    
    // For each problem slot
    for (const problem of slots) {
        const slotName = problem.slot.replace(/ \(.*\)/, ''); // Remove parenthetical info
        const arrayMatch = slotName.match(/^(\w+)\[(\d+)\]$/);
        
        if (!arrayMatch) continue;
        
        const arrayType = arrayMatch[1];
        const index = parseInt(arrayMatch[2]);
        
        // Replace the slot value with "Unknown"
        const slotPattern = new RegExp(`("${arrayType}"\\s*:\\s*\\[(?:[^\\[\\]]*,\\s*)*)"(\\s*)"(\\s*)(,|\\])`);
        
        // Try to find and replace the specific index
        // This is tricky - we need to find the array and insert "Unknown" at the right position
        
        // Simpler approach: look for empty string at that index and replace it
        const indexRegex = new RegExp(`("${arrayType}"\\s*:\\s*\\[)([^\\]]*)`);
        const match = shipObject.match(indexRegex);
        
        if (match) {
            // Count commas to find the right position
            const beforeArray = match[1];
            const arrayContent = match[2];
            const arrayItems = arrayContent.split(',');
            
            if (index < arrayItems.length) {
                arrayItems[index] = arrayItems[index].replace(/^\s*""\s*$/, '"Unknown"');
                const newArrayContent = arrayItems.join(',');
                const newShip = shipObject.replace(
                    new RegExp(`("${arrayType}"\\s*:\\s*\\[)([^\\]]*)`),
                    `$1${newArrayContent}`
                );
                if (newShip !== shipObject) {
                    shipObject = newShip;
                    totalUpdated++;
                }
            }
        }
    }
    
    // If we made changes, update data.js
    if (shipObject !== originalShip) {
        dataContent = dataContent.substring(0, startPos) + shipObject + dataContent.substring(endPos);
        shipsModified.add(shipName);
        shipsUpdated++;
    }
}

// Write back
fs.writeFileSync(dataPath, dataContent, 'utf8');

console.log(`✅ Filled missing slots with "Unknown"`);
console.log(`📊 Slots updated: ${totalUpdated}`);
console.log(`📊 Ships modified: ${shipsUpdated}`);
console.log(`Ships: ${Array.from(shipsModified).slice(0, 10).join(', ')}${shipsModified.size > 10 ? '...' : ''}`);
