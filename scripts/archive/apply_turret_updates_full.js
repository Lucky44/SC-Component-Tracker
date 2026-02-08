const fs = require('fs');
const path = require('path');

// Read the CSV file
const csvPath = path.join(__dirname, '..', 'Missing_TurretWeapons.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Simple CSV parser
function parseCSV(content) {
    const lines = content.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    const records = [];
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;
        
        // Handle quoted fields
        const values = [];
        let current = '';
        let inQuotes = false;
        
        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        values.push(current.trim());
        
        const record = {};
        headers.forEach((header, idx) => {
            record[header] = values[idx] || '';
        });
        records.push(record);
    }
    
    return records;
}

const records = parseCSV(csvContent);

// Process each record to build updates
const updates = {};

for (const record of records) {
    const shipName = record['SHIP NAME'].trim();
    const componentType = record['COMPONENT TYPE'].trim();
    const componentNames = record['COMPONENT NAMES'].trim();
    
    // Remove outer triple quotes if they exist
    let componentsStr = componentNames;
    if (componentsStr.startsWith('"""')) {
        componentsStr = componentsStr.slice(3);
    }
    if (componentsStr.endsWith('"""')) {
        componentsStr = componentsStr.slice(0, -3);
    }
    
    // Parse the array format [item1],[item2],[item3]
    const components = componentsStr
        .match(/\[([^\]]+)\]/g)
        .map(item => item.slice(1, -1).trim());
    
    if (!updates[shipName]) {
        updates[shipName] = {};
    }
    
    // If the ship already has entries for this component type, append to it
    if (updates[shipName][componentType]) {
        updates[shipName][componentType] = updates[shipName][componentType].concat(components);
    } else {
        updates[shipName][componentType] = components;
    }
}

console.log('Updates to apply:');
Object.entries(updates).forEach(([ship, components]) => {
    console.log(`\n${ship}:`);
    Object.entries(components).forEach(([type, values]) => {
        console.log(`  ${type}: [${values.map(v => `"${v}"`).join(', ')}]`);
    });
});

// Now read data.js and apply updates
const dataPath = path.join(__dirname, '..', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf-8');

// For each ship that needs updating
for (const [shipName, componentMap] of Object.entries(updates)) {
    for (const [componentType, components] of Object.entries(componentMap)) {
        // Create the new array string
        const newArray = `[${components.map(c => `"${c}"`).join(',')}]`;
        
        // Find and replace the turretWeapons line for this ship
        // Pattern: "Ship Name": { ... turretWeapons: [...], ...}
        
        // Create a pattern that captures the turretWeapons array for this specific ship
        const pattern = new RegExp(
            `("${shipName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}": \\{[^}]*?turretWeapons: )\\[[^\\]]*\\]`,
            'g'
        );
        
        console.log(`\nReplacing turretWeapons for ${shipName} with ${newArray}`);
        
        const before = dataContent;
        dataContent = dataContent.replace(pattern, `$1${newArray}`);
        
        if (before !== dataContent) {
            console.log(`✓ Updated ${shipName}`);
        } else {
            console.log(`✗ Failed to update ${shipName} (pattern not found)`);
        }
    }
}

// Write back to data.js
fs.writeFileSync(dataPath, dataContent, 'utf-8');
console.log('\n\ndata.js has been updated!');
