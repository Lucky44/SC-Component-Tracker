# Changelog

All notable changes to this project are documented here.

## 2026-02-08 — v0.87

**Project Cleanup & Tooling**

- Root directory cleanup:
  - Moved 8 dev note files to `docs/` (PROGRESS_SUMMARY, SYNC_NOTES, PROPOSED_CHANGES, etc.)
  - Removed generated validation reports, old backups, and superseded assets
  - Removed `tmp/` debug directory
  - Updated `.gitignore` to exclude `validation_report.txt`, `changelog_*.txt`, and `tmp/`

- Merged community PRs (from timfallmk):
  - PR #7: Added `--json` flag to `validate.js` for machine-readable output
  - PR #8: Archived 43 legacy utility scripts to `scripts/archive/`
  - PR #9: Added property-based invariant tests (`test-invariants.js`, 47 test cases)
  - PR #10: Added GitHub Actions CI workflow for automated testing
  - PR #12: Unified test framework to Node.js native `node:test` module
  - PR #15: Added JSDoc type annotations to `app.js` and `data.js`

## 2026-02-07 — v0.86

- Version bump to 0.86
- No functional changes from v0.85

## 2026-02-06 — v0.85

- Fix: Edit modal pilot weapons showing "Empty" when saved weapon order doesn't match spec hardpoint order
  - Added size-aware reordering in `mergeDefaultsInto` to align saved weapons with hardpoint sizes before populating dropdowns
  - Affected ships like Drake Buccaneer where stock loadout order differs from spec order
- Add Ship: search/filter box to quickly find ships by typing part of the name
  - Shows match count and auto-selects single matches
  - Hidden in Edit mode (ship already selected)
- Fix: Esperia Stinger manufacturer corrected from "Vanduul" to "Esperia" (consistent with other Esperia ships)
- Removed voice commands feature (reverted to pre-voice codebase)
- Version bump to 0.85

## 2026-02-05 — v0.77

- Robust data update pipeline:
  - Created `sync-all-data.js` script to update ship specs and stock loadouts from extracted data
  - Supports preview mode (dry run) and `--apply` flag for actual updates
  - Automatically adds new ships and updates existing specs
  - SKIP_SHIPS list for manually verified ships (F7A variants, Stinger, Mustang Delta, Cutlass Steel)
- Ship extraction improvements:
  - Fixed gimbal mount size parsing (uses class name like `Mount_Gimbal_S4` instead of MaxSize)
  - Fixed remote turret detection for `turret_remote` naming pattern and class names
  - Correctly classifies Redeemer as 2 pilot weapons + 4 turrets (2 manned, 2 remote)
  - Correctly classifies Spirit ships with ball turrets and remote turrets
- Capital ships added:
  - Aegis Idris-M, Aegis Idris-P, Aegis Javelin
- Test suite:
  - `test-extraction.js`: 37 unit tests for extraction logic
  - `test-update-pipeline.js`: 21 integration tests for full pipeline
- Ship display names:
  - Manufacturer prefix removed from dropdown display (shows "Gladius" not "Aegis Gladius")

## 2026-02-04

- Component undersizing support:
  - Shields, power plants, coolers, and quantum drives now allow smaller components in larger slots (e.g., S1 Bracer cooler can be selected for S2 cooler slots).
  - Changed filtering from exact size match to `<=` comparison in both ship modal and storage dropdowns.
- Component size labels:
  - Changed display from letters (S, M, L) to numeric format (S1, S2, S3) for consistency with weapon sizing.
- Esperia Stinger fixes:
  - Corrected pilotWeapons from 8 incorrect entries to 7 correct ones (1× S5, 4× S4, 2× S2).
  - Fixed powerPlants size (3→1), coolers size (2→1), quantumDrive size (1→2).
- F8C Lightning variants:
  - Added missing ship specs for Executive Edition, Wikelo Sneak Special, and Wikelo War Special.
- F7A Hornet Mk II ball turret:
  - Updated turret gun size from S3 to S4 for both base and PYAM Exec variants.
  - Allows S4 weapon selection when using TMSB-5 turret; S3 weapons still selectable via undersizing.
- Ship data extraction improvements:
  - Removed variant exclusion from extract-ships.js to include all ship variants.
  - Removed Kruger prefix stripping to keep names consistent with ships.json.
  - Removed NAME_NORMALIZATIONS that caused spec/loadout mismatches.
  - Added 70+ new ship variants to data.js.
- Data cleanup:
  - Deleted 7 orphaned Kruger ship specs (old naming without prefix).
  - Renamed 5 ships to match ships.json names (Crusader Spirit/Ares, Origin M50).
  - Orphaned specs reduced from 12 to 0.

## 2026-01-26 — v-2026-01-26-corsair-validation

- Drake Corsair corrections:
  - Ship spec: pilotWeapons updated to 4× S4 + 2× S5; turrets set to two manned turrets (2× S2 each).
  - Stock loadout: pilot 4× M6A + 2× M7A; turrets 4× CF-227.
- Data integrity tools:
  - Added `validate.js` to systematically scan SC_DATA for mismatches (unknown names, size > mount, turret list length issues). Output captured in `validation_report.txt`.
  - Initial validation results summary: 51 oversized weapons, 66 unknown weapons, 6 turret length mismatches, 11 ships with too many pilot weapons. See `validation_report.txt` for details.
- Data mapping fixes in `data.js`:
  - Repaired `getDefaultComponents` turret mapping (per-gun → per-turret representative) and added `findWeaponSizeByName` helper.
  - Guarded mapping when stock arrays are missing; removed corrupted stray lines.
- Frontend/cache:
  - Bumped `index.html` script versions to ensure cache busting (v=14).
- Versioning for rollback:
  - Created branch `version/2026-01-26-corsair-validation` and tag `v-2026-01-26-corsair-validation` capturing these changes.

## 2026-01-25

- Starfarer Gemini:
  - Turrets set to S5, S3, S3; stock turret weapons aligned to 2× CF-557 (S5) + 4× CF-337 (S3). UI clamps oversized selections and prefers CF-337 on S3.
- RSI Constellation Andromeda:
  - Pilot 4× S5; turrets 2× S3. Stock: pilot CF-557; turrets CF-337.
- Anvil Scorpius:
  - Pilot 4× S3; turret 4× S3, stock CF-337.
- RSI Aurora MR:
  - Pilot 4× S1; stock intentionally 2× CF-117 with two empty hardpoints.
- Mirai Fury:
  - Corrected shield size to S1; pilot weapons corrected to S1 mounts.
- UI logic improvements (`app.js`):
  - Clamp oversized turret weapons to mount size in display and selection; improve turret labels to reflect per-gun size vs mount; prefer CF-337 when clamping S5→S3 where applicable.

