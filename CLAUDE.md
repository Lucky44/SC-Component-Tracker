# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SC-Component-Tracker is a browser-based Star Citizen ship component management app. It's a static site (vanilla JS, HTML5, CSS3) with no build step or framework dependencies. Hosted on GitHub Pages.

## Development Commands

```bash
# Local development server
python3 -m http.server 8000

# Update ship data from scunpacked source
node scripts/update-from-scunpacked.js

# Validate ship data for inconsistencies
node scripts/validate.js
```

**Important**: After editing `data.js` or `app.js`, hard refresh (`Ctrl+Shift+R`) is required due to browser caching. Cache-busting version tokens are used in production (e.g., `styles.css?v=67`).

## Architecture

### Core Files

| File | Purpose |
|------|---------|
| `app.js` | Main application logic (~1800 lines) - CRUD, search, modals, data sync |
| `data.js` | Bundled ship/component database (fallback data) |
| `processed-data.json` | Latest ship data fetched from GitHub for in-app updates |
| `styles.css` | Responsive sci-fi orange HUD theme |

### Data Flow

1. `app.js` loads user data from localStorage (`STORAGE_KEY: 'sc-component-tracker-data'`)
2. Ship database loaded from `data.js` (bundled) or `processed-data.json` (fetched)
3. UI renders via vanilla DOM manipulation
4. User changes persist to localStorage immediately

### Key Globals

- `SC_DATA` - Ship/component database
- `appData` - User's ships and storage inventory
- `APP_VERSION` - Current version string (update on release)
- `PROCESSED_DATA_URL` - GitHub raw URL for update checks

### Modal System

Modals use `openModal(id)`/`closeModal(id)` pattern. Key modals: `shipModal`, `storageListModal`, `updateModal`, `importModal`, `deleteConfirmModal`.

## Scripts Directory

The `scripts/` folder contains ~45 Node.js utilities for data processing:

### Key Extraction Scripts

| Script | Purpose |
|--------|---------|
| `extract-ships.js` | Extracts ship specs (hardpoints, components) from ships.json |
| `extract-loadouts.js` | Extracts stock loadouts (weapons, components) from ships.json |
| `update-from-scunpacked.js` | Main update script - combines extraction, cleaning, deduplication |
| `sync-ships-to-datajs.js` | Adds new ships from processed-data.json to data.js (doesn't update existing) |
| `sync-stockloadouts-to-datajs.js` | Replaces stockLoadouts section in data.js from new-stockloadouts.js |
| `fix-component-sizes.js` | Updates component sizes in data.js from extracted-ships.js |

### Utility Scripts

- `validate.js` - Data consistency checking
- `audit_problem_slots.js` - Find incomplete hardpoints
- `apply_wiki_solutions_v2.js` - Batch data fixes

### Data Pipeline

1. Download latest `ships.json` from scunpacked
2. Run `extract-ships.js` → generates `extracted-ships.js`
3. Run `extract-loadouts.js` → generates `extracted-loadouts.js`
4. Run `update-from-scunpacked.js` → generates `processed-data.json`
5. Run sync scripts to update `data.js`

### Known Data Quirks

- **Component sizes**: scunpacked sometimes has `MaxSize: 0` even for valid components. The extraction scripts fall back to parsing size from `ClassName` (e.g., `_S01_` = size 1)
- **Ship name prefixes**: "Kruger" prefix is stripped from ship names (L-21 Wolf, P-52 Merlin, etc.)
- **Snub ships**: MPUV ships legitimately have size 0 powerPlants/coolers; snubs have size 0 quantumDrive

## Releasing a New Version

1. **Update `APP_VERSION`** in `app.js:5`
   ```js
   const APP_VERSION = '0.68';
   ```

2. **Update cache-bust params** in `index.html` (3 places):
   - Line 7: `styles.css?v=68`
   - Line 252: `data.js?v=68`
   - Line 253: `app.js?v=68`

3. **Update `CHANGELOG.md`** with version notes

4. **Commit and push to `main`** - GitHub Pages auto-deploys from main branch
