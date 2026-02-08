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

# Validate ship data for inconsistencies (run after any data import!)
node validate.js
```

### Data Validation

The `validate.js` script performs comprehensive data integrity checks:

| Check | Description |
|-------|-------------|
| Orphaned loadouts | Stock loadout exists but no ship spec |
| Orphaned specs | Ship spec exists but no stock loadout |
| Count mismatches | Weapon/component counts differ between spec and loadout |
| Unknown items | Weapons or components not in database |
| Oversized items | Item size exceeds slot size |
| Source discrepancies | Ships not found in ships.json |

**Always run validation after importing new data:**
```bash
node validate.js
```

Output includes a summary and detailed report saved to `validation_report.txt`.

**Important**: After editing `data.js` or `app.js`, hard refresh (`Ctrl+Shift+R`) is required due to browser caching. Cache-busting version tokens are used in production (e.g., `styles.css?v=86`).

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

The `scripts/` folder contains active Node.js utilities for data processing. Legacy and one-off scripts have been moved to `scripts/archive/`.

### Key Extraction Scripts

| Script | Purpose |
|--------|---------|
| `extract-ships.js` | Extracts ship specs (hardpoints, components) from ships.json |
| `extract-loadouts.js` | Extracts stock loadouts (weapons, components) from ships.json |
| `sync-all-data.js` | **Main sync script** - updates specs and loadouts in data.js |
| `test-extraction.js` | 37 unit tests for extraction logic |
| `test-update-pipeline.js` | 21 integration tests for full pipeline |

### Data Update Workflow

```bash
# 1. Download new ships.json from scunpacked (replace existing)

# 2. Extract specs and loadouts
node scripts/extract-ships.js
node scripts/extract-loadouts.js

# 3. Preview changes
node scripts/sync-all-data.js

# 4. Apply changes
node scripts/sync-all-data.js --apply

# 5. Validate
node validate.js
```

### Utility Scripts

- `validate.js` - Data consistency checking (run after updates)
- `debug-ship.js "Ship Name"` - Debug weapon hardpoints for a specific ship
- `scripts/archive/fix-ship-names.js` - Fix naming mismatches between spec/loadout (archived)

### Known Data Quirks

- **Component undersizing**: The app allows smaller components to be installed in larger slots (e.g., S1 cooler in S2 slot). This matches in-game behavior. The filtering uses `<=` comparison, not exact match.
- **Component sizes**: scunpacked sometimes has `MaxSize: 0` even for valid components. The extraction scripts fall back to parsing size from `ClassName` (e.g., `_S01_` = size 1)
- **Ship naming**: Ship names are kept exactly as they appear in ships.json for consistency between specs and stock loadouts
- **Snub ships**: MPUV ships legitimately have size 0 powerPlants/coolers; snubs have size 0 quantumDrive
- **Turret types**: Multiple turret types exist in scunpacked data:
  - `TurretBase.MannedTurret` - crew-operated turrets
  - `TurretBase.RemoteTurret` - remote/automated turrets
  - `Turret.BallTurret` - pilot-controlled but swappable (treated as remote)
  - `Turret.TopTurret` - pilot-controlled tail/top turrets (treated as remote)
  - `Turret.CanardTurret` - fixed nose turrets (weapons count as pilot weapons)
- **Weapon types**: `WeaponGun.Gun` and `WeaponGun.Rocket` are both valid weapon types. Rockets can be swapped for guns so both are included in weapon counts.

## Data Update Pipeline (v0.86)

The update pipeline is complete and working. Run when new ships.json is available from scunpacked.

### SKIP_SHIPS (manually verified, excluded from auto-update)
- Anvil F7A Hornet Mk II (both variants) - turret S4 for TMSB-5
- Esperia Stinger - manually corrected weapons/components
- C.O. Mustang Delta - MaxSize inconsistent in ships.json
- Drake Cutlass Steel - turret config needs verification

### Validation Issues (expected)
- **Count mismatches (~120)**: Normal - spec shows all hardpoints, stock shows equipped weapons only
- **Oversized items (~11)**: scunpacked data issues where stock loadout has weapons larger than hardpoint size
- These don't affect the app - count mismatches show as empty slots, oversized items display normally

### Extraction Logic
- Gimbal mounts: Size parsed from class name (`Mount_Gimbal_S4` = S4) not MaxSize
- Remote turrets: Detected by hardpoint name (`turret_remote`, `remote_turret`) or class name (`*_Remote_Turret`)
- Ball/Top turrets: Treated as remote (swappable)
- PDC turrets: Skipped (non-swappable)
- Door guns (`WeaponMount.WeaponControl`): Skipped (crew-operated)

## Releasing a New Version

1. **Update `APP_VERSION`** in `app.js:5`
   ```js
   const APP_VERSION = '0.86';
   ```

2. **Update cache-bust params** in `index.html` (3 places):
   - Line 7: `styles.css?v=86`
   - Line 253: `data.js?v=86`
   - Line 254: `app.js?v=86`

3. **Update `CHANGELOG.md`** with version notes

4. **Commit and push to `main`** - GitHub Pages auto-deploys from main branch
