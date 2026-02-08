// ============ SC Component Tracker - Main Application Entry Point ============

import { APP_VERSION, showToast } from './state.js';
import { populateShipDropdown, initShipSearch } from './dropdowns.js';
import { renderShips, renderStorage, renderSearchResults, toggleViewMode } from './render.js';
import { openModal, openShipModal, openStorageModal, onShipSelectionChange, confirmDeleteShip, confirmDeleteStorage, executeDelete, closeModal, populateStorageComponentsForType } from './modals.js';
import { handleShipSubmit, handleStorageSubmit } from './forms.js';
import { searchComponents } from './search.js';
import { exportData, importData, executeImport } from './import-export.js';
import { loadCachedShipData, checkForUpdate, applyUpdate } from './update-check.js';

// Set app version badge
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

function triggerFileInput() {
    document.getElementById('importFileInput').click();
}

// Make functions available globally for onclick handlers
window.openShipModal = openShipModal;
window.openStorageModal = openStorageModal;
window.confirmDeleteShip = confirmDeleteShip;
window.confirmDeleteStorage = confirmDeleteStorage;
window.toggleViewMode = toggleViewMode;

// ============ Event Listeners ============

document.addEventListener('DOMContentLoaded', () => {
    loadCachedShipData();
    populateShipDropdown();
    initShipSearch();

    renderShips();
    renderStorage();

    document.getElementById('shipName').addEventListener('change', onShipSelectionChange);

    document.getElementById('addShipBtn').addEventListener('click', () => openShipModal());

    document.getElementById('openStorageListBtn').addEventListener('click', () => {
        renderStorage();
        openModal('storageListModal');
    });

    document.getElementById('addStorageBtn').addEventListener('click', () => openStorageModal());

    document.getElementById('exportBtn').addEventListener('click', exportData);

    document.getElementById('importBtn').addEventListener('click', triggerFileInput);

    document.getElementById('importFileInput').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            importData(file);
            e.target.value = '';
        }
    });

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

    document.getElementById('shipForm').addEventListener('submit', handleShipSubmit);

    document.getElementById('saveShipTopBtn').addEventListener('click', () => {
        document.getElementById('shipForm').requestSubmit();
    });

    document.getElementById('storageForm').addEventListener('submit', handleStorageSubmit);

    document.getElementById('storageType').addEventListener('change', (e) => {
        populateStorageComponentsForType(e.target.value);
    });

    document.getElementById('confirmDeleteBtn').addEventListener('click', executeDelete);

    document.querySelectorAll('.modal-close, [data-modal]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modalId = e.target.dataset.modal;
            if (modalId) {
                closeModal(modalId);
            }
        });
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    const searchInput = document.getElementById('searchInput');
    let searchTimeout;

    setAppVersionBadge();

    const checkUpdateBtn = document.getElementById('checkUpdateBtn');
    if (checkUpdateBtn) {
        checkUpdateBtn.addEventListener('click', checkForUpdate);
    }

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
