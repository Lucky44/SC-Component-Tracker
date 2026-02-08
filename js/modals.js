// ============ Modal System ============

import { state } from './state.js';
import { getShipById, getShipSpec, deleteShip } from './ship-crud.js';
import { clearAllSlots, populateSlotsForShip } from './slots.js';
import { filterShipDropdown } from './dropdowns.js';
import { deleteStorageItem } from './storage.js';
import { renderShips, renderStorage } from './render.js';

export function openModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}

export function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

export function mergeDefaultsInto(existing, defaults) {
    if (!defaults) return existing || {};
    existing = existing || {};

    const SC_DATA = window.SC_DATA;

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
            out[i] = { ...(s || {}), ...(d || {}) };
            if (!out[i].name && s && s.name) out[i].name = s.name;
            if (!out[i].weapon && s && s.weapon) out[i].weapon = s.weapon;
            if (!out[i].size && s && s.size) out[i].size = s.size;

            if (key === 'turrets') {
                const mountSize = out[i].size || s.size || d.size || null;
                const savedWeapon = out[i].weapon || '';
                const savedSize = getWeaponSizeByName(savedWeapon);
                if (savedSize && mountSize && savedSize > mountSize) {
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

export function openShipModal(shipId = null) {
    const SC_DATA = window.SC_DATA;
    const title = document.getElementById('shipModalTitle');
    const form = document.getElementById('shipForm');

    form.reset();
    document.getElementById('shipId').value = '';
    document.getElementById('shipSearch').value = '';
    filterShipDropdown();
    state.currentShipSpec = null;
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

            state.currentShipSpec = getShipSpec(ship.name);
            if (state.currentShipSpec) {
                const defaults = SC_DATA.getDefaultComponents(state.currentShipSpec);
                ship.components = mergeDefaultsInto(ship.components, defaults);
                populateSlotsForShip(state.currentShipSpec, ship.components);
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

export function onShipSelectionChange(e) {
    const SC_DATA = window.SC_DATA;
    const shipName = e.target.value;
    state.currentShipSpec = getShipSpec(shipName);

    const defaults = SC_DATA.getDefaultComponents(state.currentShipSpec);
    console.debug('SC Debug: defaults for', shipName, defaults);
    populateSlotsForShip(state.currentShipSpec, defaults);
}

export function openStorageModal(index = null) {
    const title = document.getElementById('storageModalTitle');
    const form = document.getElementById('storageForm');

    form.reset();
    document.getElementById('storageIndex').value = '';
    document.getElementById('storageQuantity').value = '1';
    document.getElementById('storageComponent').innerHTML = '<option value="">Select a component...</option>';
    document.getElementById('storageSizeGroup').classList.add('hidden');
    document.getElementById('storageComponentGroup').classList.remove('hidden');

    if (index !== null && state.appData.storage[index]) {
        const item = state.appData.storage[index];
        title.textContent = 'Edit Component';
        document.getElementById('storageIndex').value = index;
        document.getElementById('storageType').value = item.type;
        document.getElementById('storageQuantity').value = item.quantity;

        populateStorageComponentsForType(item.type, item.name);
    } else {
        title.textContent = 'Add Component to Storage';
        document.getElementById('storageComponentGroup').classList.add('hidden');
    }

    openModal('storageModal');
}

export function populateStorageComponentsForType(type, selectedValue = null) {
    const SC_DATA = window.SC_DATA;
    const select = document.getElementById('storageComponent');
    const componentGroup = document.getElementById('storageComponentGroup');
    select.innerHTML = '<option value="">Select a component...</option>';

    if (!type) {
        componentGroup.classList.add('hidden');
        return;
    }

    let components = [];

    if (type === 'weapons') {
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

let pendingDelete = null;

export function confirmDeleteShip(shipId) {
    const ship = getShipById(shipId);
    if (ship) {
        const shipDisplayName = getShipSpec(ship.name) ? 
            (function() {
                const spec = getShipSpec(ship.name);
                const mfr = spec.manufacturer;
                let displayName = ship.name;
                if (mfr === "Consolidated Outland") {
                    displayName = displayName.replace(/^C\.O\.\s+/, '');
                } else if (mfr === "Kruger Intergalatic" && displayName.startsWith("Kruger ")) {
                    displayName = displayName.substring(7);
                } else {
                    const prefix = mfr + ' ';
                    if (displayName.startsWith(prefix)) {
                        displayName = displayName.substring(prefix.length);
                    }
                }
                return displayName;
            })() : ship.name;
            
        document.getElementById('deleteMessage').textContent =
            `Are you sure you want to delete "${shipDisplayName}"${ship.nickname ? ` (${ship.nickname})` : ''}?`;
        pendingDelete = { type: 'ship', id: shipId };
        openModal('deleteModal');
    }
}

export function confirmDeleteStorage(index) {
    const item = state.appData.storage[index];
    if (item) {
        document.getElementById('deleteMessage').textContent =
            `Are you sure you want to delete "${item.name}" (x${item.quantity}) from storage?`;
        pendingDelete = { type: 'storage', index };
        openModal('deleteModal');
    }
}

export function executeDelete() {
    if (!pendingDelete) return;

    if (pendingDelete.type === 'ship') {
        deleteShip(pendingDelete.id);
        renderShips();
    } else if (pendingDelete.type === 'storage') {
        deleteStorageItem(pendingDelete.index);
        renderStorage();
    }

    pendingDelete = null;
    closeModal('deleteModal');
}
