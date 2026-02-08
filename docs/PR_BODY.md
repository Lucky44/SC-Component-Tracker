# Corsair fixes, validator, and data mapping improvements

## Summary
- Update Drake Corsair ship spec and stock loadout to authoritative values.
- Add `validate.js` to systematically detect data issues (size/name/length mismatches) and include an initial `validation_report.txt`.
- Repair turret stock mapping logic in `data.js` and improve cache-busting + docs.

## Changes
- Drake Corsair (spec in `data.js`):
  - Pilot hardpoints: 4× S4 + 2× S5.
  - Turrets: two manned turrets, 2× S2 each.
- Drake Corsair (stock in `SC_DATA.stockLoadouts`):
  - Pilot: 4× M6A + 2× M7A.
  - Turrets: CF-227 ×4.
- Turret mapping and defaults (`data.js`):
  - Added `findWeaponSizeByName` helper and mapped per-gun stock arrays to a representative per-turret weapon with size clamping.
  - Guarded mapping when stock arrays are missing.
  - Removed stray/corrupted lines that caused syntax issues.
- Frontend/cache:
  - Bumped script versions in `index.html` to force cache refresh (v=14).
- Tooling and docs:
  - Added `validate.js` and captured first run in `validation_report.txt`.
  - Created `CHANGELOG.md` and linked it from `README.md`.

## Validation results
- Script: `node validate.js | tee validation_report.txt`.
- Summary (current data state):
  - Oversized weapons: 51
  - Unknown weapons: 66
  - Turret length mismatches: 6
  - Too many pilot weapons: 11
- Full details: see [validation_report.txt](validation_report.txt).

## Rollback
- Version branch: `version/2026-01-26-corsair-validation`.
- Tag: `v-2026-01-26-corsair-validation`.
- To revert: checkout the tag or reset `main` to the previous commit if needed.

## Notes / follow-ups
- Consider auto-fixing common oversized pairs (e.g., CF-337→CF-227 for S2 mounts) and normalizing turret arrays to per-gun counts across affected ships.
- Optionally add a "Reset to Defaults" control in the ship editor to clear per-ship localStorage overrides.

## Checklist
- [x] Data compiles (`node -c data.js` / runtime syntax check).
- [x] Manual spot checks in UI (Corsair shows correct mounts and defaults).
- [x] Validator run attached.
