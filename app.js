// SC Component Tracker - Application Logic

// ============ Data Layer ============

const APP_VERSION = '0.87';

/**
 * @typedef {Object} ComponentSlot
 * @property {string} name - Component name
 * @property {number} size - Component size
 *
 * @typedef {Object} TurretSlot
 * @property {string} type - Turret type (e.g., "manned", "remote")
 * @property {number} guns - Number of guns in turret
 * @property {number} size - Weapon size
 * @property {string} weapon - Equipped weapon name
 *
 * @typedef {Object} ShipComponents
 * @property {ComponentSlot[]} pilotWeapons - Equipped pilot weapons
 * @property {TurretSlot[]} turrets - Equipped turret configurations
 * @property {ComponentSlot[]} shields - Equipped shields
 * @property {ComponentSlot[]} powerPlants - Equipped power plants
 * @property {ComponentSlot[]} coolers - Equipped coolers
 * @property {ComponentSlot[]} quantumDrives - Equipped quantum drives
 *
 * @typedef {Object} UserShip
 * @property {string} id - Unique identifier
 * @property {string} name - Ship name (matches ShipSpec.name)
 * @property {string} [nickname] - User-defined nickname
 * @property {ShipComponents} components - All equipped components
 *
 * @typedef {Object} StorageItem
 * @property {string} name - Component name
 * @property {string} type - Component type ("weapons", "shields", "powerPlants", "coolers", "quantumDrives")
 * @property {number} size - Component size
 * @property {number} quantity - Quantity in storage
 *
 * @typedef {Object} AppData
 * @property {UserShip[]} ships - User's ships
 * @property {StorageItem[]} storage - User's stored components
 */
const STORAGE_KEY = 'sc-component-tracker-data';
const DATA_VERSION_KEY = 'sc-component-tracker-data-version';

// GitHub raw URL for processed ship data (updated by maintainer)
const PROCESSED_DATA_URL = 'https://raw.githubusercontent.com/Lucky44/SC-Component-Tracker/main/processed-data.json';

const defaultData = {
    ships: [],
    storage: []
};

/**
 * Loads user data from localStorage
 * @returns {AppData} The loaded app data or default empty data
 */
function loadData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error('Error loading data:', e);
            return { ...defaultData };
        }
    }
    return { ...defaultData };
}

/**
 * Saves user data to localStorage
 * @param {AppData} data - The app data to save
 */
function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function generateId() {
    return 'ship-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

let appData = loadData();
let currentShipSpec = null; // Holds the selected ship's specification

// ============ Ship CRUD ============

/**
 * Adds a new ship to the user's hangar
 * @param {UserShip} ship - The ship to add (id will be auto-generated)
 */
function addShip(ship) {
    ship.id = generateId();
    appData.ships.push(ship);
    saveData(appData);
    renderShips();
}

function updateShip(id, updatedShip) {
    const index = appData.ships.findIndex(s => s.id === id);
    if (index !== -1) {
        appData.ships[index] = { ...updatedShip, id };
        saveData(appData);
        renderShips();
    }
}

function deleteShip(id) {
    appData.ships = appData.ships.filter(s => s.id !== id);
    saveData(appData);
    renderShips();
}

function getShipById(id) {
    return appData.ships.find(s => s.id === id);
}

/**
 * Retrieves ship specification from the database
 * Falls back to base ship for variants (e.g., "Aegis Gladius Pirate" -> "Aegis Gladius")
 * @param {string} shipName - The ship name to look up
 * @returns {Object|null} The ship specification or null if not found
 */
function getShipSpec(shipName) {
    // Direct match
    let spec = SC_DATA.ships.find(s => s.name === shipName);
    if (spec) return spec;

    // Try to find base ship for variants
    // Variants are typically named "Manufacturer Ship Variant" where base is "Manufacturer Ship"
    const baseShipName = findBaseShipName(shipName);
    if (baseShipName && baseShipName !== shipName) {
        spec = SC_DATA.ships.find(s => s.name === baseShipName);
        if (spec) {
            // Return a copy with the variant name for display purposes
            return { ...spec, name: shipName, isVariant: true, baseName: baseShipName };
        }
    }

    // Fallback: saved name may be missing manufacturer prefix (e.g., "P-22 Merlin" for "Kruger P-22 Merlin")
    spec = SC_DATA.ships.find(s => s.name.endsWith(' ' + shipName));
    if (spec) return { ...spec, name: shipName };

    return null;
}

// Find the base ship name for a variant
// e.g., "Aegis Gladius Pirate" -> "Aegis Gladius"
function findBaseShipName(variantName) {
    // Check each base ship to see if the variant starts with its name
    for (const ship of SC_DATA.ships) {
        if (variantName.startsWith(ship.name + ' ')) {
            return ship.name;
        }
    }
    return null;
}

// Get display name for a ship (without manufacturer prefix)
function getShipDisplayName(shipName) {
    const spec = getShipSpec(shipName);
    if (!spec) return shipName;

    const manufacturer = spec.manufacturer;

    // Special case for Consolidated Outland (uses C.O. prefix)
    if (manufacturer === "Consolidated Outland") {
        return shipName.replace(/^C\.O\.\s+/, '');
    }

    // Special case for Kruger (uses "Kruger " prefix, not full "Kruger Intergalatic ")
    if (manufacturer === "Kruger Intergalatic" && shipName.startsWith("Kruger ")) {
        return shipName.substring(7); // "Kruger ".length = 7
    }

    // Standard case: strip manufacturer prefix
    const prefix = manufacturer + ' ';
    if (shipName.startsWith(prefix)) {
        return shipName.substring(prefix.length);
    }

    return shipName;
}

// ============ Storage CRUD ============

function addStorageItem(item) {
    const existing = appData.storage.find(
        s => s.type === item.type && s.name.toLowerCase() === item.name.toLowerCase() && s.size === item.size
    );
    if (existing) {
        existing.quantity += item.quantity;
    } else {
        appData.storage.push(item);
    }
    saveData(appData);
    renderStorage();
}

function updateStorageItem(index, updatedItem) {
    if (index >= 0 && index < appData.storage.length) {
        appData.storage[index] = updatedItem;
        saveData(appData);
        renderStorage();
    }
}

function deleteStorageItem(index) {
    appData.storage.splice(index, 1);
    saveData(appData);
    renderStorage();
}

// ============ Search ============

function searchComponents(query) {
    if (!query.trim()) return null;

    const searchTerm = query.toLowerCase();
    const results = {
        installed: [],
        storage: []
    };

    appData.ships.forEach(ship => {
        const components = ship.components || {};

        // Search pilot weapons
        (components.pilotWeapons || []).forEach(weapon => {
            if (weapon.name && weapon.name.toLowerCase().includes(searchTerm)) {
                results.installed.push({
                    shipName: ship.name,
                    shipNickname: ship.nickname,
                    component: weapon.name,
                    type: 'pilot weapon'
                });
            }
        });

        // Search turret weapons
        (components.turrets || []).forEach(turret => {
            if (turret.weapon && turret.weapon.toLowerCase().includes(searchTerm)) {
                results.installed.push({
                    shipName: ship.name,
                    shipNickname: ship.nickname,
                    component: `${turret.guns}x ${turret.weapon}`,
                    type: 'turret'
                });
            }
        });

        (components.shields || []).forEach(shield => {
            if (shield.name && shield.name.toLowerCase().includes(searchTerm)) {
                results.installed.push({
                    shipName: ship.name,
                    shipNickname: ship.nickname,
                    component: shield.name,
                    type: 'shield'
                });
            }
        });

        (components.coolers || []).forEach(cooler => {
            if (cooler.name && cooler.name.toLowerCase().includes(searchTerm)) {
                results.installed.push({
                    shipName: ship.name,
                    shipNickname: ship.nickname,
                    component: cooler.name,
                    type: 'cooler'
                });
            }
        });

        (components.powerPlants || []).forEach(pp => {
            if (pp.name && pp.name.toLowerCase().includes(searchTerm)) {
                results.installed.push({
                    shipName: ship.name,
                    shipNickname: ship.nickname,
                    component: pp.name,
                    type: 'power plant'
                });
            }
        });

        (components.quantumDrives || []).forEach(qd => {
            if (qd.name && qd.name.toLowerCase().includes(searchTerm)) {
                results.installed.push({
                    shipName: ship.name,
                    shipNickname: ship.nickname,
                    component: qd.name,
                    type: 'quantum drive'
                });
            }
        });
    });

    appData.storage.forEach(item => {
        if (item.name.toLowerCase().includes(searchTerm)) {
            results.storage.push(item);
        }
    });

    return results;
}

// ============ Dropdown Population ============

function populateShipDropdown() {
    const select = document.getElementById('shipName');
    select.innerHTML = '<option value="">Select a ship...</option>';

    // Collect all ship names from both ships array and stockLoadouts
    const allShipNames = new Set();

    // Add base ships
    SC_DATA.ships.forEach(ship => allShipNames.add(ship.name));

    // Add variants from stockLoadouts (they have loadout data)
    Object.keys(SC_DATA.stockLoadouts).forEach(name => allShipNames.add(name));

    // Exclude problematic variants (Wikelo special editions, etc.)
    const isExcludedVariant = name => /wikelo|best in show|best-in-show/i.test(name || '');

    // Build flat list of ships with manufacturer info
    const shipList = [];

    allShipNames.forEach(shipName => {
        if (isExcludedVariant(shipName)) return;

        // Get spec (will fall back to base ship for variants)
        const spec = getShipSpec(shipName);
        if (!spec) return; // Skip if no spec found (no base ship)

        shipList.push({
            name: shipName,
            displayName: getShipDisplayName(shipName),
            manufacturer: spec.manufacturer
        });
    });

    // Sort alphabetically by display name
    shipList.sort((a, b) => a.displayName.localeCompare(b.displayName));

    // Build dropdown with "DisplayName (Manufacturer)" format
    shipList.forEach(ship => {
        const option = document.createElement('option');
        option.value = ship.name;
        option.textContent = `${ship.displayName} (${ship.manufacturer})`;
        select.appendChild(option);
    });
}

// Ship search/filter for the Add Ship dropdown
let _shipSearchAllOptions = [];

function cacheShipSearchOptions() {
    const select = document.getElementById('shipName');
    _shipSearchAllOptions = [];
    for (const opt of select.options) {
        _shipSearchAllOptions.push({ value: opt.value, text: opt.textContent });
    }
}

function filterShipDropdown() {
    const searchInput = document.getElementById('shipSearch');
    const select = document.getElementById('shipName');
    const query = searchInput.value.toLowerCase().trim();
    const previousValue = select.value;

    select.innerHTML = '';

    if (!query) {
        _shipSearchAllOptions.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.text;
            select.appendChild(option);
        });
        select.value = '';
        // Clear ship details if a ship was previously shown
        if (previousValue) {
            currentShipSpec = null;
            clearAllSlots();
            populateSlotsForShip(null);
        }
        return;
    }

    // Filter matching options
    const matches = _shipSearchAllOptions.filter(opt =>
        opt.value && opt.text.toLowerCase().includes(query)
    );

    // Add placeholder showing match count
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = matches.length === 0
        ? 'No matches found'
        : `${matches.length} match${matches.length === 1 ? '' : 'es'} — select below`;
    select.appendChild(placeholder);

    matches.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.text;
        select.appendChild(option);
    });

    // Auto-select if exactly one match and show its details
    if (matches.length === 1) {
        select.value = matches[0].value;
        select.dispatchEvent(new Event('change'));
    } else if (previousValue) {
        // Clear ship details when search changes away from a selection
        currentShipSpec = null;
        clearAllSlots();
        populateSlotsForShip(null);
    }
}

function initShipSearch() {
    // Cache options after dropdown is populated
    cacheShipSearchOptions();

    // Use capture-phase event delegation on the form — inline handlers and
    // addEventListener on the input element don't reliably fire in all browsers.
    const form = document.getElementById('shipForm');
    form.addEventListener('input', (e) => {
        if (e.target && e.target.id === 'shipSearch') {
            filterShipDropdown();
        }
    }, true);
    form.addEventListener('keydown', (e) => {
        if (e.target && e.target.id === 'shipSearch' && e.key === 'Enter') {
            e.preventDefault();
        }
    }, true);
}

// Create a component dropdown filtered by size
function createComponentDropdown(type, size, selectedValue = '') {
    const select = document.createElement('select');
    select.innerHTML = '<option value="">Empty</option>';

    let components;
    switch (type) {
        case 'shield':
            components = SC_DATA.shields.filter(c => c.size <= size);
            break;
        case 'powerPlant':
            components = SC_DATA.powerPlants.filter(c => c.size <= size);
            break;
        case 'cooler':
            components = SC_DATA.coolers.filter(c => c.size <= size);
            break;
        case 'quantumDrive':
            components = SC_DATA.quantumDrives.filter(c => c.size <= size);
            break;
        case 'weapon':
            components = SC_DATA.weapons[size] || [];
            break;
        default:
            components = [];
    }

    // Sort by name
    components.sort((a, b) => a.name.localeCompare(b.name));

    components.forEach(comp => {
        const option = document.createElement('option');
        option.value = comp.name;
        const isUnknownName = (comp.name || '').toLowerCase() === 'unknown';
        const isUnknownType = (comp.type || '').toLowerCase() === 'unknown';

        if (type === 'weapon') {
            // Render Unknown cleanly without parentheses
            option.textContent = isUnknownName || isUnknownType
                ? 'Unknown'
                : `${comp.name} (${comp.type})`;
        } else {
            // Non-weapon components: render Unknown cleanly
            option.textContent = isUnknownName
                ? 'Unknown'
                : `${comp.name} (${comp.manufacturer})`;
        }

        if (comp.name === selectedValue) {
            option.selected = true;
        }
        select.appendChild(option);
    });

    return select;
}

// ============ Slot Management ============

function clearAllSlots() {
    ['pilotWeaponSlots', 'turretSlots', 'shieldSlots', 'powerPlantSlots', 'coolerSlots', 'quantumDriveSlots'].forEach(id => {
        document.getElementById(id).innerHTML = '';
    });
}

function addSlot(containerId, type, size, value = '') {
    const container = document.getElementById(containerId);
    const slot = document.createElement('div');
    slot.className = 'component-slot';
    slot.dataset.size = size;

    // Size label
    const sizeLabel = document.createElement('span');
    sizeLabel.className = 'slot-size';
    sizeLabel.textContent = type === 'weapon' ? `S${size}` : SC_DATA.getComponentSizeLabel(size);
    slot.appendChild(sizeLabel);

    // Dropdown
    const select = createComponentDropdown(type, size, value);
    slot.appendChild(select);

    container.appendChild(slot);
}

// Add a turret slot with type label and weapon dropdown
function addTurretSlot(turretSpec, index, weapon = '') {
    const container = document.getElementById('turretSlots');
    const slot = document.createElement('div');
    slot.className = 'component-slot turret-slot';
    slot.dataset.size = turretSpec.size;
    slot.dataset.guns = turretSpec.guns;
    slot.dataset.type = turretSpec.type;
    slot.dataset.index = index;

    // Turret info label (e.g., "Manned 4x S4" or "Remote 2x S3")
    const typeLabel = document.createElement('span');
    typeLabel.className = 'slot-size turret-label';
    const typeText = turretSpec.type === 'manned' ? 'Manned' : 'Remote';
    typeLabel.textContent = `${typeText} ${turretSpec.guns}x S${turretSpec.size}`;
    slot.appendChild(typeLabel);

    // Determine the actual weapon size for the installed weapon (some turrets mount smaller guns)
    function getWeaponSizeByName(name) {
        if (!name) return null;
        for (const sizeKey of Object.keys(SC_DATA.weapons)) {
            const size = parseInt(sizeKey, 10);
            const list = SC_DATA.weapons[size] || [];
            if (list.find(w => w.name && w.name.toLowerCase() === name.toLowerCase())) {
                return size;
            }
        }
        return null;
    }

    // Infer weapon size when installed weapon is unknown: many turrets mount multiple smaller guns.
    function inferWeaponSizeFromMount(mountSize, guns) {
        if (!mountSize) return 1;
        if (guns >= 2) {
            if (mountSize >= 5) return 3;
            if (mountSize === 4) return 3;
            if (mountSize === 3) return 3;
            if (mountSize === 2) return 2;
        }
        return mountSize;
    }

    let weaponSize = getWeaponSizeByName(weapon) || inferWeaponSizeFromMount(turretSpec.size, turretSpec.guns) || turretSpec.size;
    // If the named weapon is larger than the mount, clamp to mount size and choose a matching weapon name
    let weaponName = weapon || '';
    if (weaponSize > turretSpec.size) {
        weaponSize = turretSpec.size;
        const candidates = (SC_DATA.weapons[weaponSize] || []).map(w => w.name);
        if (candidates && candidates.length > 0) {
            // Prefer keeping same manufacturer if possible
            const manufacturer = (weaponName.split(' ')[0] || '').toLowerCase();
            let chosen = candidates.find(n => n.toLowerCase().includes(manufacturer)) || null;
            // Special-case: CF-557 clamped to S3 should prefer CF-337 Panther Repeater
            if (!chosen && weaponSize === 3) {
                chosen = candidates.find(n => /cf-337\s+panther\s+repeater/i.test(n))
                      || candidates.find(n => /panther/i.test(n))
                      || chosen;
            }
            weaponName = chosen || candidates[0];
        } else {
            weaponName = '';
        }
    }
    const select = createComponentDropdown('weapon', weaponSize, weaponName);
    slot.appendChild(select);

    console.debug('SC Debug: turret', index, { mountSize: turretSpec.size, guns: turretSpec.guns, weapon, weaponSize });

    // Update turret label to show per-gun size and mount size when different
    if (weaponSize && weaponSize !== turretSpec.size) {
        typeLabel.textContent = `${typeText} ${turretSpec.guns}x S${weaponSize} (mount S${turretSpec.size})`;
    }

    container.appendChild(slot);
}

// Populate slots based on ship spec
function populateSlotsForShip(shipSpec, existingComponents = null) {
    clearAllSlots();

    if (!shipSpec) {
        // Reset hints
        document.getElementById('pilotWeaponsHint').textContent = 'Select a ship to see available hardpoints';
        document.getElementById('turretsHint').textContent = 'Select a ship to see available turrets';
        document.getElementById('shieldsHint').textContent = 'Select a ship to see available slots';
        document.getElementById('powerPlantsHint').textContent = 'Select a ship to see available slots';
        document.getElementById('coolersHint').textContent = 'Select a ship to see available slots';
        document.getElementById('quantumDriveHint').textContent = 'Select a ship to see available slot';
        document.getElementById('shipSlotsInfo').classList.add('hidden');
        return;
    }

    // Show slots summary
    const slotsInfo = document.getElementById('shipSlotsInfo');
    const pilotWeaponSizes = (shipSpec.pilotWeapons || []).map(w => `S${w.size}`).join(', ') || 'None';
    // We'll compute turret summary from the rendered/default turret list below (to reflect collapsed/grouped turrets)
    let turretInfo = 'None';
    const shieldInfo = shipSpec.shields ? `${shipSpec.shields.count}x Size ${shipSpec.shields.size}` : 'None';
    const ppInfo = shipSpec.powerPlants ? `${shipSpec.powerPlants.count}x Size ${shipSpec.powerPlants.size}` : 'None';
    const coolerInfo = shipSpec.coolers ? `${shipSpec.coolers.count}x Size ${shipSpec.coolers.size}` : 'None';
    const qdInfo = shipSpec.quantumDrive ? `Size ${shipSpec.quantumDrive.size}` : 'None';

    slotsInfo.innerHTML = `
        <div class="slot-summary">
            <span class="slot-item"><strong>Pilot:</strong> ${pilotWeaponSizes}</span>
            <span class="slot-item"><strong>Turrets:</strong> ${turretInfo}</span>
            <span class="slot-item"><strong>Shields:</strong> ${shieldInfo}</span>
            <span class="slot-item"><strong>Power:</strong> ${ppInfo}</span>
            <span class="slot-item"><strong>Coolers:</strong> ${coolerInfo}</span>
            <span class="slot-item"><strong>QD:</strong> ${qdInfo}</span>
        </div>
    `;
    slotsInfo.classList.remove('hidden');

    // Pilot Weapons
    const pilotWeapons = shipSpec.pilotWeapons || [];
    if (pilotWeapons.length > 0) {
        document.getElementById('pilotWeaponsHint').textContent = `${pilotWeapons.length} pilot-controlled hardpoints`;
        pilotWeapons.forEach((w, i) => {
            const value = existingComponents?.pilotWeapons?.[i]?.name || '';
            addSlot('pilotWeaponSlots', 'weapon', w.size, value);
        });
    } else {
        document.getElementById('pilotWeaponsHint').textContent = 'No pilot weapons';
    }

    // Turrets: prefer to render from provided existingComponents (defaults/collapsed) when available
    const specTurrets = shipSpec.turrets || [];
    const renderedTurrets = (existingComponents && existingComponents.turrets && existingComponents.turrets.length > 0)
        ? existingComponents.turrets
        : specTurrets;

    // Compute turret summary using per-gun weapon size when available (fall back to turret.size)
    (function computeTurretSummary() {
        if (!renderedTurrets || renderedTurrets.length === 0) {
            turretInfo = 'None';
            // update the displayed summary
            const items = slotsInfo.querySelectorAll('.slot-item');
            if (items && items[1]) items[1].innerHTML = `<strong>Turrets:</strong> ${turretInfo}`;
            return;
        }
        function findWeaponSizeByName(name) {
            if (!name) return null;
            for (const key of Object.keys(SC_DATA.weapons)) {
                const size = parseInt(key, 10);
                const list = SC_DATA.weapons[size] || [];
                if (list.find(w => w.name && w.name.toLowerCase() === name.toLowerCase())) return size;
            }
            return null;
        }

        const counts = {};
        // Count mounts (one per turret entry) using per-gun weapon size when available
        renderedTurrets.forEach(t => {
            const w = t.weapon || '';
            const perSize = findWeaponSizeByName(w) || parseInt(t.size, 10) || 0;
            if (!perSize) return;
            counts[perSize] = (counts[perSize] || 0) + 1;
        });
        // convert counts to array of strings like '1x S5'
        const entries = Object.keys(counts).map(k => ({ size: parseInt(k,10), guns: counts[k] }));
        // prefer descending size order
        entries.sort((a,b) => b.size - a.size);
        turretInfo = entries.map(e => `${e.guns}x S${e.size}`).join(', ') || 'None';
        const items = slotsInfo.querySelectorAll('.slot-item');
        if (items && items[1]) items[1].innerHTML = `<strong>Turrets:</strong> ${turretInfo}`;
    })();

    if (renderedTurrets.length > 0) {
        const mannedCount = renderedTurrets.filter(t => t.type === 'manned').length;
        const remoteCount = renderedTurrets.filter(t => t.type === 'remote').length;
        let turretHint = `${renderedTurrets.length} turrets`;
        if (mannedCount > 0 && remoteCount > 0) {
            turretHint += ` (${mannedCount} manned, ${remoteCount} remote)`;
        } else if (mannedCount > 0) {
            turretHint += ' (manned)';
        } else if (remoteCount > 0) {
            turretHint += ' (remote)';
        }
        document.getElementById('turretsHint').textContent = turretHint;

        renderedTurrets.forEach((t, i) => {
            // If renderedTurrets comes from defaults it already includes weapon/size/guns info.
            const weapon = t.weapon || (existingComponents?.turrets?.[i]?.weapon || '');
            addTurretSlot(t, i, weapon);
        });
    } else {
        document.getElementById('turretsHint').textContent = 'No turrets';
    }

    // Shields
    if (shipSpec.shields) {
        document.getElementById('shieldsHint').textContent = `${shipSpec.shields.count}x Size ${shipSpec.shields.size}`;
        for (let i = 0; i < shipSpec.shields.count; i++) {
            const value = existingComponents?.shields?.[i]?.name || '';
            addSlot('shieldSlots', 'shield', shipSpec.shields.size, value);
        }
    } else {
        document.getElementById('shieldsHint').textContent = 'No shield slots';
    }

    // Power Plants
    if (shipSpec.powerPlants) {
        document.getElementById('powerPlantsHint').textContent = `${shipSpec.powerPlants.count}x Size ${shipSpec.powerPlants.size}`;
        for (let i = 0; i < shipSpec.powerPlants.count; i++) {
            const value = existingComponents?.powerPlants?.[i]?.name || '';
            addSlot('powerPlantSlots', 'powerPlant', shipSpec.powerPlants.size, value);
        }
    } else {
        document.getElementById('powerPlantsHint').textContent = 'No power plant slots';
    }

    // Coolers
    if (shipSpec.coolers) {
        document.getElementById('coolersHint').textContent = `${shipSpec.coolers.count}x Size ${shipSpec.coolers.size}`;
        for (let i = 0; i < shipSpec.coolers.count; i++) {
            const value = existingComponents?.coolers?.[i]?.name || '';
            addSlot('coolerSlots', 'cooler', shipSpec.coolers.size, value);
        }
    } else {
        document.getElementById('coolersHint').textContent = 'No cooler slots';
    }

    // Quantum Drive
    if (shipSpec.quantumDrive) {
        document.getElementById('quantumDriveHint').textContent = `Size ${shipSpec.quantumDrive.size}`;
        const value = existingComponents?.quantumDrives?.[0]?.name || '';
        addSlot('quantumDriveSlots', 'quantumDrive', shipSpec.quantumDrive.size, value);
    } else {
        document.getElementById('quantumDriveHint').textContent = 'No quantum drive slot';
    }
}

function getSlotValues(containerId) {
    const container = document.getElementById(containerId);
    const slots = container.querySelectorAll('.component-slot');
    const values = [];
    slots.forEach(slot => {
        const select = slot.querySelector('select');
        const size = parseInt(slot.dataset.size, 10);
        if (select.value) {
            values.push({ name: select.value, size: size });
        }
    });
    return values;
}

// Get turret values with their metadata
function getTurretValues() {
    const container = document.getElementById('turretSlots');
    const slots = container.querySelectorAll('.turret-slot');
    const values = [];
    slots.forEach(slot => {
        const select = slot.querySelector('select');
        values.push({
            type: slot.dataset.type,
            guns: parseInt(slot.dataset.guns, 10),
            size: parseInt(slot.dataset.size, 10),
            weapon: select.value || ''
        });
    });
    return values;
}

// ============ UI Rendering ============

const TYPE_LABELS = {
    weapons: 'Weapons',
    shields: 'Shield Generators',
    powerPlants: 'Power Plants',
    coolers: 'Coolers',
    quantumDrives: 'Quantum Drives'
};

// Track view mode (compact vs detail)
let isCompactView = false;

function toggleViewMode() {
    isCompactView = !isCompactView;
    const shipsList = document.getElementById('shipsList');
    const toggleBtn = document.getElementById('viewToggleBtn');

    if (isCompactView) {
        shipsList.classList.add('compact-view');
        toggleBtn.textContent = 'Detail View';
    } else {
        shipsList.classList.remove('compact-view');
        toggleBtn.textContent = 'Compact View';
    }
}

function renderShips() {
    const container = document.getElementById('shipsList');
    const heading = document.getElementById('shipsHeading');

    if (heading) {
        const count = appData.ships.length;
        const viewBtnText = isCompactView ? 'Detail View' : 'Compact View';
        heading.innerHTML = `MY SHIPS: <span class="hangar-count">${count} in hangar</span> <button id="viewToggleBtn" class="view-toggle-btn" onclick="toggleViewMode()">${viewBtnText}</button>`;
    }

    // Preserve compact view state
    if (isCompactView) {
        container.classList.add('compact-view');
    }

    if (appData.ships.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>No ships added yet.</p>
                <button class="btn btn-primary" onclick="openShipModal()">Add Your First Ship</button>
            </div>
        `;
        return;
    }

    // Sort ships alphabetically by display name
    const sortedShips = [...appData.ships].sort((a, b) =>
        getShipDisplayName(a.name).localeCompare(getShipDisplayName(b.name))
    );

    container.innerHTML = sortedShips.map(ship => {
        const components = ship.components || {};
        const nickname = ship.nickname ? ` <span class="ship-nickname">"${ship.nickname}"</span>` : '';
        const spec = getShipSpec(ship.name);
        const mfr = spec?.manufacturer ? ` <span class="ship-manufacturer">(${spec.manufacturer})</span>` : '';

        return `
            <div class="ship-card" data-id="${ship.id}">
                <div class="ship-card-header">
                    <div class="ship-name">${getShipDisplayName(ship.name)}${mfr}${nickname}</div>
                    <div class="ship-actions">
                        <button class="btn btn-secondary btn-small" onclick="openShipModal('${ship.id}')">Edit</button>
                        <button class="btn btn-danger btn-small" onclick="confirmDeleteShip('${ship.id}')">Delete</button>
                    </div>
                </div>
                <div class="ship-components">
                    <div class="comp-pilot-weapons">${renderComponentList('Pilot Weapons', components.pilotWeapons)}</div>
                    <div class="comp-turrets">${renderTurretList(components.turrets)}</div>
                    <div class="comp-coolers">${renderComponentList('Coolers', components.coolers)}</div>
                    <div class="comp-power">${renderComponentList('Power', components.powerPlants)}</div>
                    <div class="comp-qt">${renderComponentList('QT Drive', components.quantumDrives)}</div>
                    <div class="comp-shields">${renderComponentList('Shields', components.shields)}</div>
                </div>
            </div>
        `;
    }).join('');
}

function renderComponentList(label, components) {
    if (!components || components.length === 0) {
        return `<div class="component-row"><span class="component-label">${label}:</span> <span class="component-empty">None</span></div>`;
    }
    const names = components.map(c => c.name).filter(n => n);
    if (names.length === 0) {
        return `<div class="component-row"><span class="component-label">${label}:</span> <span class="component-empty">None</span></div>`;
    }
    return `<div class="component-row"><span class="component-label">${label}:</span> <span class="component-value">${names.join(', ')}</span></div>`;
}

function renderTurretList(turrets) {
    if (!turrets || turrets.length === 0) {
        return `<div class="component-row"><span class="component-label">Turrets:</span> <span class="component-empty">None</span></div>`;
    }

    const turretDescriptions = turrets.map(t => {
        if (!t.weapon) return null;
        const typePrefix = t.type === 'manned' ? 'M' : 'R';
        return `${typePrefix}: ${t.guns}x ${t.weapon} (S${t.size})`;
    }).filter(Boolean);

    if (turretDescriptions.length === 0) {
        return `<div class="component-row"><span class="component-label">Turrets:</span> <span class="component-empty">None equipped</span></div>`;
    }

    return `<div class="component-row"><span class="component-label">Turrets:</span> <span class="component-value">${turretDescriptions.join(', ')}</span></div>`;
}

function renderStorage() {
    const container = document.getElementById('storageList');

    if (appData.storage.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>No components in storage.</p>
            </div>
        `;
        return;
    }

    // Group by type
    const grouped = {};
    const typeOrder = ['weapons', 'coolers', 'powerPlants', 'quantumDrives', 'shields'];

    appData.storage.forEach((item, index) => {
        if (!grouped[item.type]) {
            grouped[item.type] = [];
        }
        grouped[item.type].push({ ...item, originalIndex: index });
    });

    let html = '';
    typeOrder.forEach(type => {
        if (grouped[type] && grouped[type].length > 0) {
            // Sort by size then name
            grouped[type].sort((a, b) => {
                if (a.size !== b.size) return (a.size || 0) - (b.size || 0);
                return a.name.localeCompare(b.name);
            });

            html += `
                <div class="storage-group">
                    <div class="storage-group-header">${TYPE_LABELS[type] || type}</div>
                    <div class="storage-group-items">
                        ${grouped[type].map(item => {
                            const sizeLabel = item.size ? (type === 'weapons' ? `S${item.size}` : `Size ${item.size}`) : '';
                            return `
                                <div class="storage-item" data-index="${item.originalIndex}">
                                    <div class="storage-info">
                                        <span class="storage-name">${item.name}</span>
                                        ${sizeLabel ? `<span class="storage-type">(${sizeLabel})</span>` : ''}
                                        <span class="storage-quantity">x${item.quantity}</span>
                                    </div>
                                    <div class="storage-actions">
                                        <button class="btn btn-secondary btn-small" onclick="openStorageModal(${item.originalIndex})">Edit</button>
                                        <button class="btn btn-danger btn-small" onclick="confirmDeleteStorage(${item.originalIndex})">Delete</button>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }
    });

    container.innerHTML = html;
}

function renderSearchResults(results) {
    const container = document.getElementById('searchResults');

    if (!results) {
        container.classList.add('hidden');
        return;
    }

    const totalInstalled = results.installed.length;
    const totalStorage = results.storage.reduce((sum, item) => sum + item.quantity, 0);
    const total = totalInstalled + totalStorage;

    if (total === 0) {
        container.innerHTML = '<p>No components found.</p>';
        container.classList.remove('hidden');
        return;
    }

    let html = `<div class="search-result-count">Found ${total} total</div>`;

    if (totalInstalled > 0) {
        const byShip = {};
        results.installed.forEach(r => {
            const key = getShipDisplayName(r.shipName) + (r.shipNickname ? ` "${r.shipNickname}"` : '');
            if (!byShip[key]) byShip[key] = [];
            byShip[key].push(r.component);
        });

        Object.entries(byShip).forEach(([ship, components]) => {
            html += `<div class="search-result-item">${ship}: ${components.length} installed</div>`;
        });
    }

    if (totalStorage > 0) {
        html += `<div class="search-result-item">Storage: ${totalStorage} available</div>`;
    }

    container.innerHTML = html;
    container.classList.remove('hidden');
}

// ============ Modal Handling ============

function openModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

function openShipModal(shipId = null) {
    const title = document.getElementById('shipModalTitle');
    const form = document.getElementById('shipForm');

    form.reset();
    document.getElementById('shipId').value = '';
    document.getElementById('shipSearch').value = '';
    // Restore full dropdown (clear any search filter)
    filterShipDropdown();
    currentShipSpec = null;
    clearAllSlots();

    if (shipId) {
        const ship = getShipById(shipId);
        if (ship) {
            title.textContent = 'Edit Ship';
            document.getElementById('shipSearch').style.display = 'none';
            document.getElementById('shipName').disabled = true;
            document.getElementById('shipId').value = ship.id;
            document.getElementById('shipName').value = ship.name || '';
            document.getElementById('shipNickname').value = ship.nickname || '';

            // Get the ship spec and populate slots with existing values
            currentShipSpec = getShipSpec(ship.name);
            if (currentShipSpec) {
                // Merge defaults into the saved components without overwriting user selections.
                // This fills empty slots with up-to-date defaults (inferred turret grouping, sizes).
                function mergeDefaultsInto(existing, defaults) {
                    if (!defaults) return existing || {};
                    existing = existing || {};

                    // Helper to determine weapon size by name (local copy)
                    function getWeaponSizeByName(name) {
                        if (!name) return null;
                        for (const sizeKey of Object.keys(SC_DATA.weapons)) {
                            const size = parseInt(sizeKey, 10);
                            const list = SC_DATA.weapons[size] || [];
                            if (list.find(w => w.name && w.name.toLowerCase() === name.toLowerCase())) {
                                return size;
                            }
                        }
                        return null;
                    }

                    const mergeArray = (key) => {
                        let dst = existing[key] || [];
                        const src = defaults[key] || [];

                        // Reorder saved pilot weapons to align with spec hardpoint sizes
                        if (key === 'pilotWeapons' && dst.length > 0 && src.length > 0) {
                            const reordered = new Array(src.length).fill(null);
                            const used = new Array(dst.length).fill(false);
                            for (let i = 0; i < src.length; i++) {
                                const slotSize = src[i].size;
                                for (let j = 0; j < dst.length; j++) {
                                    if (!used[j] && dst[j] && dst[j].size === slotSize) {
                                        reordered[i] = dst[j];
                                        used[j] = true;
                                        break;
                                    }
                                }
                            }
                            const unmatched = dst.filter((_, j) => !used[j]);
                            for (let i = 0; i < reordered.length; i++) {
                                if (!reordered[i] && unmatched.length > 0) {
                                    reordered[i] = unmatched.shift();
                                }
                            }
                            dst = reordered.map(r => r || {});
                        }

                        const len = Math.max(dst.length, src.length);
                        const out = [];
                        for (let i = 0; i < len; i++) {
                            const d = dst[i] || {};
                            const s = src[i] || {};
                            // start from default, then overlay saved values so saved values win when present
                            out[i] = { ...(s || {}), ...(d || {}) };
                            if (!out[i].name && s && s.name) out[i].name = s.name;
                            if (!out[i].weapon && s && s.weapon) out[i].weapon = s.weapon;
                            if (!out[i].size && s && s.size) out[i].size = s.size;

                            // Validate turret weapon sizes: if saved weapon doesn't fit the mount, prefer default
                            if (key === 'turrets') {
                                const mountSize = out[i].size || s.size || d.size || null;
                                const savedWeapon = out[i].weapon || '';
                                const savedSize = getWeaponSizeByName(savedWeapon);
                                if (savedSize && mountSize && savedSize > mountSize) {
                                    // Replace with default weapon if available, else clear so UI infers for mount
                                    out[i].weapon = s.weapon || '';
                                }
                            }
                        }
                        existing[key] = out;
                    };

                    mergeArray('pilotWeapons');
                    mergeArray('turrets');
                    mergeArray('shields');
                    mergeArray('coolers');
                    mergeArray('powerPlants');
                    mergeArray('quantumDrives');

                    return existing;
                }

                const defaults = SC_DATA.getDefaultComponents(currentShipSpec);
                ship.components = mergeDefaultsInto(ship.components, defaults);
                populateSlotsForShip(currentShipSpec, ship.components);
            }
        }
    } else {
        title.textContent = 'Add Ship';
        document.getElementById('shipSearch').style.display = '';
        document.getElementById('shipName').disabled = false;
        populateSlotsForShip(null);
    }

    openModal('shipModal');
}

// Handle ship selection change
function onShipSelectionChange(e) {
    const shipName = e.target.value;
    currentShipSpec = getShipSpec(shipName);

    // Get default components to pre-populate the slots
    const defaults = SC_DATA.getDefaultComponents(currentShipSpec);
    console.debug('SC Debug: defaults for', shipName, defaults);
    populateSlotsForShip(currentShipSpec, defaults);
}

function openStorageModal(index = null) {
    const title = document.getElementById('storageModalTitle');
    const form = document.getElementById('storageForm');

    form.reset();
    document.getElementById('storageIndex').value = '';
    document.getElementById('storageQuantity').value = '1';
    document.getElementById('storageComponent').innerHTML = '<option value="">Select a component...</option>';
    document.getElementById('storageSizeGroup').classList.add('hidden');
    document.getElementById('storageComponentGroup').classList.remove('hidden');

    if (index !== null && appData.storage[index]) {
        const item = appData.storage[index];
        title.textContent = 'Edit Component';
        document.getElementById('storageIndex').value = index;
        document.getElementById('storageType').value = item.type;
        document.getElementById('storageQuantity').value = item.quantity;

        // Populate components for this type and select the current one
        populateStorageComponentsForType(item.type, item.name);
    } else {
        title.textContent = 'Add Component to Storage';
        document.getElementById('storageComponentGroup').classList.add('hidden');
    }

    openModal('storageModal');
}

function populateStorageComponentsForType(type, selectedValue = null) {
    const select = document.getElementById('storageComponent');
    const componentGroup = document.getElementById('storageComponentGroup');
    select.innerHTML = '<option value="">Select a component...</option>';

    if (!type) {
        componentGroup.classList.add('hidden');
        return;
    }

    let components = [];

    if (type === 'weapons') {
        // Flatten all weapon sizes into one list
        for (let i = 1; i <= 7; i++) {
            if (SC_DATA.weapons[i]) {
                components = components.concat(SC_DATA.weapons[i].map(w => ({ ...w, size: i })));
            }
        }
    } else if (type === 'shields') {
        components = SC_DATA.shields;
    } else if (type === 'powerPlants') {
        components = SC_DATA.powerPlants;
    } else if (type === 'coolers') {
        components = SC_DATA.coolers;
    } else if (type === 'quantumDrives') {
        components = SC_DATA.quantumDrives;
    }

    // Sort alphabetically by name
    components.sort((a, b) => a.name.localeCompare(b.name));

    components.forEach(comp => {
        const option = document.createElement('option');
        option.value = comp.name;
        if (type === 'weapons') {
            option.textContent = `${comp.name} (S${comp.size}, ${comp.type})`;
        } else {
            option.textContent = `${comp.name} (Size ${comp.size})`;
        }
        select.appendChild(option);
    });

    // If a selectedValue was provided but not in options, add it
    if (selectedValue && !Array.from(select.options).some(o => o.value === selectedValue)) {
        const extra = document.createElement('option');
        extra.value = selectedValue;
        extra.textContent = `${selectedValue} (stock)`;
        extra.selected = true;
        select.appendChild(extra);
    }

    if (selectedValue) {
        select.value = selectedValue;
    }

    componentGroup.classList.remove('hidden');
}

function populateStorageComponentDropdown(type, size, selectedValue = null) {
    const select = document.getElementById('storageComponent');
    select.innerHTML = '<option value="">Select a component...</option>';

    if (!type || !size) return;

    let components;
    const sizeNum = parseInt(size, 10);

    switch (type) {
        case 'weapons':
            components = SC_DATA.weapons[sizeNum] || [];
            break;
        case 'shields':
            components = SC_DATA.shields.filter(c => c.size <= sizeNum);
            break;
        case 'powerPlants':
            components = SC_DATA.powerPlants.filter(c => c.size <= sizeNum);
            break;
        case 'coolers':
            components = SC_DATA.coolers.filter(c => c.size <= sizeNum);
            break;
        case 'quantumDrives':
            components = SC_DATA.quantumDrives.filter(c => c.size <= sizeNum);
            break;
        default:
            return;
    }

    components.sort((a, b) => a.name.localeCompare(b.name));

    components.forEach(comp => {
        const option = document.createElement('option');
        option.value = comp.name;
        if (type === 'weapons') {
            option.textContent = `${comp.name} (${comp.type})`;
        } else {
            option.textContent = `${comp.name} (${comp.manufacturer})`;
        }
        select.appendChild(option);
    });

    // If a selectedValue was provided but not present in the options (size mismatch or missing),
    // add it as a selected option so the UI shows the actual stock item.
    if (selectedValue && !Array.from(select.options).some(o => o.value === selectedValue)) {
        const extra = document.createElement('option');
        extra.value = selectedValue;
        extra.textContent = `${selectedValue} (stock)`;
        extra.selected = true;
        select.appendChild(extra);
    }
}

// Delete confirmation
let pendingDelete = null;

function confirmDeleteShip(shipId) {
    const ship = getShipById(shipId);
    if (ship) {
        document.getElementById('deleteMessage').textContent =
            `Are you sure you want to delete "${getShipDisplayName(ship.name)}"${ship.nickname ? ` (${ship.nickname})` : ''}?`;
        pendingDelete = { type: 'ship', id: shipId };
        openModal('deleteModal');
    }
}

function confirmDeleteStorage(index) {
    const item = appData.storage[index];
    if (item) {
        document.getElementById('deleteMessage').textContent =
            `Are you sure you want to delete "${item.name}" (x${item.quantity}) from storage?`;
        pendingDelete = { type: 'storage', index };
        openModal('deleteModal');
    }
}

function executeDelete() {
    if (!pendingDelete) return;

    if (pendingDelete.type === 'ship') {
        deleteShip(pendingDelete.id);
    } else if (pendingDelete.type === 'storage') {
        deleteStorageItem(pendingDelete.index);
    }

    pendingDelete = null;
    closeModal('deleteModal');
}

// ============ Form Handling ============

function handleShipSubmit(e) {
    e.preventDefault();

    const shipId = document.getElementById('shipId').value;
    const shipName = document.getElementById('shipName').value;

    if (!shipName) {
        alert('Please select a ship.');
        return;
    }

    const ship = {
        name: shipName,
        nickname: document.getElementById('shipNickname').value.trim(),
        components: {
            pilotWeapons: getSlotValues('pilotWeaponSlots'),
            turrets: getTurretValues(),
            shields: getSlotValues('shieldSlots'),
            powerPlants: getSlotValues('powerPlantSlots'),
            coolers: getSlotValues('coolerSlots'),
            quantumDrives: getSlotValues('quantumDriveSlots')
        }
    };

    if (shipId) {
        updateShip(shipId, ship);
    } else {
        addShip(ship);
    }

    closeModal('shipModal');
}

function getComponentSize(type, name) {
    if (type === 'weapons') {
        for (let i = 1; i <= 7; i++) {
            if (SC_DATA.weapons[i]) {
                const found = SC_DATA.weapons[i].find(w => w.name === name);
                if (found) return i;
            }
        }
    } else if (type === 'shields') {
        const found = SC_DATA.shields.find(c => c.name === name);
        if (found) return found.size;
    } else if (type === 'powerPlants') {
        const found = SC_DATA.powerPlants.find(c => c.name === name);
        if (found) return found.size;
    } else if (type === 'coolers') {
        const found = SC_DATA.coolers.find(c => c.name === name);
        if (found) return found.size;
    } else if (type === 'quantumDrives') {
        const found = SC_DATA.quantumDrives.find(c => c.name === name);
        if (found) return found.size;
    }
    return null;
}

function handleStorageSubmit(e) {
    e.preventDefault();

    const indexStr = document.getElementById('storageIndex').value;
    const type = document.getElementById('storageType').value;
    const name = document.getElementById('storageComponent').value;

    if (!name) {
        alert('Please select a component.');
        return;
    }

    const size = getComponentSize(type, name);

    const item = {
        type: type,
        name: name,
        size: size,
        quantity: parseInt(document.getElementById('storageQuantity').value, 10) || 1
    };

    if (indexStr !== '') {
        updateStorageItem(parseInt(indexStr, 10), item);
    } else {
        addStorageItem(item);
    }

    closeModal('storageModal');
}

// ============ UI Enhancements ============

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('toast-visible');

    if (toast._hideTimeout) {
        clearTimeout(toast._hideTimeout);
    }
    toast._hideTimeout = setTimeout(() => {
        toast.classList.remove('toast-visible');
    }, 2000);
}

function setAppVersionBadge() {
    const versionEl = document.getElementById('appVersion');
    if (!versionEl) return;

    const defaultTooltip = 'Click to copy version';
    const badgeText = `v${APP_VERSION}`;

    versionEl.textContent = badgeText;
    versionEl.dataset.tooltip = defaultTooltip;

    const showTooltip = (message) => {
        versionEl.dataset.tooltip = message;
        versionEl.classList.add('tooltip-visible');
        if (versionEl._tooltipTimeout) {
            clearTimeout(versionEl._tooltipTimeout);
        }
        versionEl._tooltipTimeout = setTimeout(() => {
            versionEl.dataset.tooltip = defaultTooltip;
            versionEl.classList.remove('tooltip-visible');
        }, 1200);
    };

    const copyVersion = async () => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(APP_VERSION);
            } else {
                const tempInput = document.createElement('textarea');
                tempInput.value = APP_VERSION;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
            }
            showTooltip('Copied!');
            showToast(`Copied version v${APP_VERSION}`);
        } catch (err) {
            console.error('Failed to copy version:', err);
            showTooltip('Copy failed');
            showToast('Copy failed');
        }
    };

    versionEl.addEventListener('click', copyVersion);
}

// ============ Export/Import ============

function exportData() {
    const exportPayload = {
        formatVersion: "1.0",
        appVersion: APP_VERSION,
        exportDate: new Date().toISOString(),
        data: {
            ships: appData.ships,
            storage: appData.storage
        }
    };

    const jsonString = JSON.stringify(exportPayload, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Generate filename with date
    const dateStr = new Date().toISOString().split('T')[0];
    const filename = `sc-tracker-backup-${dateStr}.json`;

    // Create temporary download link
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast(`Exported ${appData.ships.length} ships and ${appData.storage.length} storage items`);
}

function triggerFileInput() {
    document.getElementById('importFileInput').click();
}

function importData(file) {
    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            const validationResult = validateImportData(imported);

            if (!validationResult.valid) {
                showToast('Import failed: ' + validationResult.error);
                return;
            }

            showImportConfirmModal(imported, validationResult.summary);
        } catch (err) {
            console.error('Import parse error:', err);
            showToast('Import failed: Invalid JSON file');
        }
    };

    reader.onerror = function() {
        showToast('Import failed: Could not read file');
    };

    reader.readAsText(file);
}

function validateImportData(imported) {
    if (!imported || typeof imported !== 'object') {
        return { valid: false, error: 'Invalid file format' };
    }

    // Handle both new format (with metadata) and legacy format (direct data)
    let data = imported.data || imported;

    if (!data.ships || !Array.isArray(data.ships)) {
        return { valid: false, error: 'Missing or invalid ships data' };
    }

    if (!data.storage || !Array.isArray(data.storage)) {
        return { valid: false, error: 'Missing or invalid storage data' };
    }

    // Validate each ship has required fields
    for (let i = 0; i < data.ships.length; i++) {
        const ship = data.ships[i];
        if (!ship.name || typeof ship.name !== 'string') {
            return { valid: false, error: `Ship at index ${i} missing valid name` };
        }
        if (ship.components && typeof ship.components !== 'object') {
            return { valid: false, error: `Ship "${ship.name}" has invalid components` };
        }
    }

    // Validate each storage item
    for (let i = 0; i < data.storage.length; i++) {
        const item = data.storage[i];
        if (!item.name || !item.type) {
            return { valid: false, error: `Storage item at index ${i} missing name or type` };
        }
        if (typeof item.quantity !== 'number' || item.quantity < 1) {
            return { valid: false, error: `Storage item "${item.name}" has invalid quantity` };
        }
    }

    return {
        valid: true,
        summary: {
            formatVersion: imported.formatVersion || 'legacy',
            appVersion: imported.appVersion || 'unknown',
            exportDate: imported.exportDate || null,
            shipCount: data.ships.length,
            storageCount: data.storage.length,
            data: data
        }
    };
}

function showImportConfirmModal(imported, summary) {
    const message = document.getElementById('importMessage');

    let html = `<div class="import-summary">`;
    html += `<p><strong>File Info:</strong></p>`;
    html += `<ul>`;
    html += `<li>Format: ${summary.formatVersion}</li>`;
    html += `<li>App Version: ${summary.appVersion}</li>`;
    if (summary.exportDate) {
        html += `<li>Export Date: ${new Date(summary.exportDate).toLocaleString()}</li>`;
    }
    html += `</ul>`;
    html += `<p><strong>File contains:</strong></p>`;
    html += `<ul>`;
    html += `<li>${summary.shipCount} ship(s)</li>`;
    html += `<li>${summary.storageCount} storage item(s)</li>`;
    html += `</ul>`;
    html += `<p><strong>Your current data:</strong></p>`;
    html += `<ul>`;
    html += `<li>${appData.ships.length} ship(s)</li>`;
    html += `<li>${appData.storage.length} storage item(s)</li>`;
    html += `</ul>`;
    html += `</div>`;

    message.innerHTML = html;

    // Store the data for when user clicks a button
    window._pendingImport = summary.data;

    openModal('importConfirmModal');
}

function executeImport(importedData, mode) {
    if (mode === 'replace') {
        appData.ships = importedData.ships.map(ship => ({
            ...ship,
            id: ship.id || generateId()
        }));
        appData.storage = importedData.storage;
    } else if (mode === 'merge') {
        // Add ships that don't exist (by name + nickname combo)
        importedData.ships.forEach(importedShip => {
            const exists = appData.ships.some(s =>
                s.name === importedShip.name &&
                (s.nickname || '') === (importedShip.nickname || '')
            );
            if (!exists) {
                appData.ships.push({
                    ...importedShip,
                    id: generateId()
                });
            }
        });

        // Merge storage: add quantities for matching items, add new items
        importedData.storage.forEach(importedItem => {
            const existing = appData.storage.find(s =>
                s.type === importedItem.type &&
                s.name.toLowerCase() === importedItem.name.toLowerCase() &&
                s.size === importedItem.size
            );
            if (existing) {
                existing.quantity += importedItem.quantity;
            } else {
                appData.storage.push({ ...importedItem });
            }
        });
    }

    saveData(appData);
    renderShips();
    renderStorage();
    closeModal('importConfirmModal');

    const action = mode === 'replace' ? 'Replaced with' : 'Merged';
    showToast(`${action} ${importedData.ships.length} ships, ${importedData.storage.length} storage items`);
}

// ============ Ship Data Updates ============

// Get currently stored data version
function getStoredDataVersion() {
    return localStorage.getItem(DATA_VERSION_KEY) || null;
}

// Save data version
function setStoredDataVersion(version) {
    localStorage.setItem(DATA_VERSION_KEY, version);
}

// Check for ship data updates
async function checkForUpdate() {
    const btn = document.getElementById('checkUpdateBtn');
    if (!btn) return;

    btn.classList.add('checking');
    btn.textContent = 'Checking...';

    try {
        // Fetch with cache-busting to get latest version info
        const response = await fetch(PROCESSED_DATA_URL + '?t=' + Date.now(), {
            method: 'GET',
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        const remoteVersion = data.version || data.lastUpdated;
        const localVersion = getStoredDataVersion();

        btn.classList.remove('checking');
        btn.textContent = 'Check for Update';

        // Determine if an update is actually available
        const remoteShipCount = data.ships ? data.ships.length : 0;
        const localShipCount = SC_DATA.ships ? SC_DATA.ships.length : 0;
        const remoteLoadoutCount = data.stockLoadouts ? Object.keys(data.stockLoadouts).length : 0;
        const localLoadoutCount = SC_DATA.stockLoadouts ? Object.keys(SC_DATA.stockLoadouts).length : 0;

        // Update is available if:
        // 1. Remote has a newer version than stored version, OR
        // 2. Remote has more ships/loadouts than currently loaded
        const hasNewerVersion = localVersion && remoteVersion > localVersion;
        const hasMoreData = remoteShipCount > localShipCount || remoteLoadoutCount > localLoadoutCount;

        console.log('Update check:', {
            localShipCount, remoteShipCount,
            localLoadoutCount, remoteLoadoutCount,
            hasNewerVersion, hasMoreData
        });

        if (hasNewerVersion || hasMoreData) {
            showUpdateModal(data, localVersion, remoteVersion);
            btn.classList.add('has-update');
        } else {
            // Data is current - store the version so future checks work properly
            if (!localVersion) {
                setStoredDataVersion(remoteVersion);
            }
            console.log('Showing toast: Ship data is up to date');
            showToast('Ship data is up to date');
        }
    } catch (error) {
        console.error('Update check failed:', error);
        btn.classList.remove('checking');
        btn.textContent = 'Check for Update';
        showToast('Update check failed: ' + error.message);
    }
}

// Show update confirmation modal
function showUpdateModal(newData, localVersion, remoteVersion) {
    const message = document.getElementById('updateMessage');
    const actions = document.getElementById('updateActions');

    const remoteDate = new Date(remoteVersion).toLocaleDateString();
    const newShipCount = newData.ships ? newData.ships.length : 0;
    const newLoadoutCount = newData.stockLoadouts ? Object.keys(newData.stockLoadouts).length : 0;
    const currentShipCount = SC_DATA.ships ? SC_DATA.ships.length : 0;
    const currentLoadoutCount = SC_DATA.stockLoadouts ? Object.keys(SC_DATA.stockLoadouts).length : 0;

    const shipDiff = newShipCount - currentShipCount;
    const loadoutDiff = newLoadoutCount - currentLoadoutCount;

    let changes = [];
    if (shipDiff > 0) {
        changes.push(`+${shipDiff} new ships with hardpoints`);
    }
    if (loadoutDiff > 0) {
        changes.push(`+${loadoutDiff} new stock loadouts`);
    }
    if (changes.length === 0) {
        changes.push('Updated ship specifications');
    }

    message.innerHTML = `
        <div class="update-info">
            <p><strong>Update available</strong> (${remoteDate})</p>
            <p><strong>Changes:</strong></p>
            <ul>
                ${changes.map(c => `<li>${c}</li>`).join('')}
            </ul>
            <p class="update-summary">Current: ${currentShipCount} ships → New: ${newShipCount} ships</p>
        </div>
    `;

    // Store pending update data
    window._pendingUpdate = newData;

    openModal('updateModal');
}

// Apply the update
function applyUpdate() {
    const data = window._pendingUpdate;
    if (!data) return;

    try {
        // Update SC_DATA with new ships and loadouts
        if (data.ships && Array.isArray(data.ships)) {
            SC_DATA.ships = data.ships;
        }
        if (data.stockLoadouts && typeof data.stockLoadouts === 'object') {
            SC_DATA.stockLoadouts = data.stockLoadouts;
        }

        // Store the version
        setStoredDataVersion(data.version || data.lastUpdated);

        // Store the data in localStorage for persistence
        localStorage.setItem('sc-ships-data', JSON.stringify(data));

        // Refresh UI
        populateShipDropdown();
        renderShips();

        // Clear pending update
        window._pendingUpdate = null;

        // Update button state
        const btn = document.getElementById('checkUpdateBtn');
        if (btn) {
            btn.classList.remove('has-update');
        }

        closeModal('updateModal');
        showToast('Ship data updated successfully');
    } catch (error) {
        console.error('Failed to apply update:', error);
        showToast('Update failed: ' + error.message);
    }
}

// Load cached ship data from localStorage on startup
function loadCachedShipData() {
    try {
        const cached = localStorage.getItem('sc-ships-data');
        if (cached) {
            const data = JSON.parse(cached);
            if (data.ships && Array.isArray(data.ships)) {
                SC_DATA.ships = data.ships;
            }
            if (data.stockLoadouts && typeof data.stockLoadouts === 'object') {
                SC_DATA.stockLoadouts = data.stockLoadouts;
            }
            console.log('Loaded cached ship data:', data.version || 'unknown version');
        }
    } catch (error) {
        console.error('Failed to load cached ship data:', error);
    }
}

// ============ Event Listeners ============

document.addEventListener('DOMContentLoaded', () => {
    // Load any cached ship data updates
    loadCachedShipData();
    // Populate ship dropdown and search
    populateShipDropdown();
    initShipSearch();

    // Initial render
    renderShips();
    renderStorage();

    // Ship selection change
    document.getElementById('shipName').addEventListener('change', onShipSelectionChange);

    // Add ship button
    document.getElementById('addShipBtn').addEventListener('click', () => openShipModal());

    // Open storage list button
    document.getElementById('openStorageListBtn').addEventListener('click', () => {
        renderStorage();
        openModal('storageListModal');
    });

    // Add storage button (inside storage list modal)
    document.getElementById('addStorageBtn').addEventListener('click', () => openStorageModal());

    // Export button
    document.getElementById('exportBtn').addEventListener('click', exportData);

    // Import button - triggers file input
    document.getElementById('importBtn').addEventListener('click', triggerFileInput);

    // File input change - handles selected file
    document.getElementById('importFileInput').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            importData(file);
            e.target.value = ''; // Reset so same file can be selected again
        }
    });

    // Import modal buttons
    document.getElementById('importReplaceBtn').addEventListener('click', () => {
        if (window._pendingImport) {
            executeImport(window._pendingImport, 'replace');
            window._pendingImport = null;
        }
    });

    document.getElementById('importMergeBtn').addEventListener('click', () => {
        if (window._pendingImport) {
            executeImport(window._pendingImport, 'merge');
            window._pendingImport = null;
        }
    });

    // Ship form submit
    document.getElementById('shipForm').addEventListener('submit', handleShipSubmit);

    // Save Ship button in header (triggers form submit)
    document.getElementById('saveShipTopBtn').addEventListener('click', () => {
        document.getElementById('shipForm').requestSubmit();
    });

    // Storage form submit
    document.getElementById('storageForm').addEventListener('submit', handleStorageSubmit);

    // Storage type change - populate components directly
    document.getElementById('storageType').addEventListener('change', (e) => {
        populateStorageComponentsForType(e.target.value);
    });

    // Confirm delete button
    document.getElementById('confirmDeleteBtn').addEventListener('click', executeDelete);

    // Modal close buttons
    document.querySelectorAll('.modal-close, [data-modal]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modalId = e.target.dataset.modal;
            if (modalId) {
                closeModal(modalId);
            }
        });
    });

    // Close modal on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // Search input
    const searchInput = document.getElementById('searchInput');
    let searchTimeout;

    // Version badge
    setAppVersionBadge();

    // Check for Update button
    const checkUpdateBtn = document.getElementById('checkUpdateBtn');
    if (checkUpdateBtn) {
        checkUpdateBtn.addEventListener('click', checkForUpdate);
    }

    // Confirm update button
    const confirmUpdateBtn = document.getElementById('confirmUpdateBtn');
    if (confirmUpdateBtn) {
        confirmUpdateBtn.addEventListener('click', applyUpdate);
    }

    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = e.target.value;
            const results = searchComponents(query);
            renderSearchResults(results);
        }, 200);
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            document.getElementById('searchResults').classList.add('hidden');
        }
    });

    searchInput.addEventListener('focus', () => {
        const query = searchInput.value;
        if (query.trim()) {
            const results = searchComponents(query);
            renderSearchResults(results);
        }
    });
});

// Make functions available globally for onclick handlers
window.openShipModal = openShipModal;
window.openStorageModal = openStorageModal;
window.confirmDeleteShip = confirmDeleteShip;
window.confirmDeleteStorage = confirmDeleteStorage;
window.exportData = exportData;
window.importData = importData;
