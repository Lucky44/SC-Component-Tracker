// ============ Slot Management ============

function createComponentDropdown(type, size, selectedValue = '') {
    const SC_DATA = window.SC_DATA;
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

    components.sort((a, b) => a.name.localeCompare(b.name));

    components.forEach(comp => {
        const option = document.createElement('option');
        option.value = comp.name;
        const isUnknownName = (comp.name || '').toLowerCase() === 'unknown';
        const isUnknownType = (comp.type || '').toLowerCase() === 'unknown';

        if (type === 'weapon') {
            option.textContent = isUnknownName || isUnknownType
                ? 'Unknown'
                : `${comp.name} (${comp.type})`;
        } else {
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

export function clearAllSlots() {
    ['pilotWeaponSlots', 'turretSlots', 'shieldSlots', 'powerPlantSlots', 'coolerSlots', 'quantumDriveSlots'].forEach(id => {
        document.getElementById(id).innerHTML = '';
    });
}

export function addSlot(containerId, type, size, value = '') {
    const container = document.getElementById(containerId);
    const slot = document.createElement('div');
    slot.className = 'component-slot';
    slot.dataset.size = size;

    const SC_DATA = window.SC_DATA;

    const sizeLabel = document.createElement('span');
    sizeLabel.className = 'slot-size';
    sizeLabel.textContent = type === 'weapon' ? `S${size}` : SC_DATA.getComponentSizeLabel(size);
    slot.appendChild(sizeLabel);

    const select = createComponentDropdown(type, size, value);
    slot.appendChild(select);

    container.appendChild(slot);
}

export function addTurretSlot(turretSpec, index, weapon = '') {
    const SC_DATA = window.SC_DATA;
    const container = document.getElementById('turretSlots');
    const slot = document.createElement('div');
    slot.className = 'component-slot turret-slot';
    slot.dataset.size = turretSpec.size;
    slot.dataset.guns = turretSpec.guns;
    slot.dataset.type = turretSpec.type;
    slot.dataset.index = index;

    const typeLabel = document.createElement('span');
    typeLabel.className = 'slot-size turret-label';
    const typeText = turretSpec.type === 'manned' ? 'Manned' : 'Remote';
    typeLabel.textContent = `${typeText} ${turretSpec.guns}x S${turretSpec.size}`;
    slot.appendChild(typeLabel);

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
    let weaponName = weapon || '';
    
    if (weaponSize > turretSpec.size) {
        weaponSize = turretSpec.size;
        const candidates = (SC_DATA.weapons[weaponSize] || []).map(w => w.name);
        if (candidates && candidates.length > 0) {
            const manufacturer = (weaponName.split(' ')[0] || '').toLowerCase();
            let chosen = candidates.find(n => n.toLowerCase().includes(manufacturer)) || null;
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

    if (weaponSize && weaponSize !== turretSpec.size) {
        typeLabel.textContent = `${typeText} ${turretSpec.guns}x S${weaponSize} (mount S${turretSpec.size})`;
    }

    container.appendChild(slot);
}

export function populateSlotsForShip(shipSpec, existingComponents = null) {
    const SC_DATA = window.SC_DATA;
    clearAllSlots();

    if (!shipSpec) {
        document.getElementById('pilotWeaponsHint').textContent = 'Select a ship to see available hardpoints';
        document.getElementById('turretsHint').textContent = 'Select a ship to see available turrets';
        document.getElementById('shieldsHint').textContent = 'Select a ship to see available slots';
        document.getElementById('powerPlantsHint').textContent = 'Select a ship to see available slots';
        document.getElementById('coolersHint').textContent = 'Select a ship to see available slots';
        document.getElementById('quantumDriveHint').textContent = 'Select a ship to see available slot';
        document.getElementById('shipSlotsInfo').classList.add('hidden');
        return;
    }

    const slotsInfo = document.getElementById('shipSlotsInfo');
    const pilotWeaponSizes = (shipSpec.pilotWeapons || []).map(w => `S${w.size}`).join(', ') || 'None';
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

    const specTurrets = shipSpec.turrets || [];
    const renderedTurrets = (existingComponents && existingComponents.turrets && existingComponents.turrets.length > 0)
        ? existingComponents.turrets
        : specTurrets;

    (function computeTurretSummary() {
        if (!renderedTurrets || renderedTurrets.length === 0) {
            turretInfo = 'None';
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
        renderedTurrets.forEach(t => {
            const w = t.weapon || '';
            const perSize = findWeaponSizeByName(w) || parseInt(t.size, 10) || 0;
            if (!perSize) return;
            counts[perSize] = (counts[perSize] || 0) + 1;
        });
        
        const entries = Object.keys(counts).map(k => ({ size: parseInt(k,10), guns: counts[k] }));
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
            const weapon = t.weapon || (existingComponents?.turrets?.[i]?.weapon || '');
            addTurretSlot(t, i, weapon);
        });
    } else {
        document.getElementById('turretsHint').textContent = 'No turrets';
    }

    if (shipSpec.shields) {
        document.getElementById('shieldsHint').textContent = `${shipSpec.shields.count}x Size ${shipSpec.shields.size}`;
        for (let i = 0; i < shipSpec.shields.count; i++) {
            const value = existingComponents?.shields?.[i]?.name || '';
            addSlot('shieldSlots', 'shield', shipSpec.shields.size, value);
        }
    } else {
        document.getElementById('shieldsHint').textContent = 'No shield slots';
    }

    if (shipSpec.powerPlants) {
        document.getElementById('powerPlantsHint').textContent = `${shipSpec.powerPlants.count}x Size ${shipSpec.powerPlants.size}`;
        for (let i = 0; i < shipSpec.powerPlants.count; i++) {
            const value = existingComponents?.powerPlants?.[i]?.name || '';
            addSlot('powerPlantSlots', 'powerPlant', shipSpec.powerPlants.size, value);
        }
    } else {
        document.getElementById('powerPlantsHint').textContent = 'No power plant slots';
    }

    if (shipSpec.coolers) {
        document.getElementById('coolersHint').textContent = `${shipSpec.coolers.count}x Size ${shipSpec.coolers.size}`;
        for (let i = 0; i < shipSpec.coolers.count; i++) {
            const value = existingComponents?.coolers?.[i]?.name || '';
            addSlot('coolerSlots', 'cooler', shipSpec.coolers.size, value);
        }
    } else {
        document.getElementById('coolersHint').textContent = 'No cooler slots';
    }

    if (shipSpec.quantumDrive) {
        document.getElementById('quantumDriveHint').textContent = `Size ${shipSpec.quantumDrive.size}`;
        const value = existingComponents?.quantumDrives?.[0]?.name || '';
        addSlot('quantumDriveSlots', 'quantumDrive', shipSpec.quantumDrive.size, value);
    } else {
        document.getElementById('quantumDriveHint').textContent = 'No quantum drive slot';
    }
}

export function getSlotValues(containerId) {
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

export function getTurretValues() {
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
