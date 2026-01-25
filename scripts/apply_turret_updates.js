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
            const nextChar = line[j + 1];
            
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

console.log('Parsed records:');
records.forEach(record => {
    console.log(record);
});

// Process each record
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
    
    console.log(`\nShip: ${shipName}`);
    console.log(`Type: ${componentType}`);
    console.log(`Components: ${JSON.stringify(components)}`);
    
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

console.log('\n\nFinal updates object:');
console.log(JSON.stringify(updates, null, 2));
