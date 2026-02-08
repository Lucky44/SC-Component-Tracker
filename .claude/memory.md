# SC-Component-Tracker Project Memory

## Quick Reference
- **Version**: 0.86 | **Ships**: 142 | **Scripts**: ~55 (10 core, rest legacy)
- **Stack**: Vanilla JS/HTML5/CSS3, no build step, GitHub Pages
- **Storage**: localStorage key `sc-component-tracker-data`

## Core Pipeline Commands
```
node scripts/extract-ships.js && node scripts/extract-loadouts.js
node scripts/sync-all-data.js          # preview
node scripts/sync-all-data.js --apply  # apply
node validate.js                       # always run after data changes
```

## SKIP_SHIPS (never auto-update these)
- Anvil F7A Hornet Mk II (both variants) - turret S4 for TMSB-5
- Esperia Stinger - manually corrected weapons/components
- C.O. Mustang Delta - MaxSize inconsistent in ships.json
- Drake Cutlass Steel - turret config needs verification

## Expected Validation "Noise"
- ~120 count mismatches: Normal (spec=all hardpoints, stock=equipped only)
- ~11 oversized items: scunpacked data bugs, display works fine
- These are NOT bugs to fix

## Turret Classification (error-prone area)
- MannedTurret → crew-operated, swappable
- RemoteTurret → automated, swappable
- BallTurret/TopTurret → pilot-controlled, treat as remote
- CanardTurret → nose turrets, weapons count as PILOT weapons
- PDCTurret → point defense, SKIP (non-swappable)

## Release Checklist (4 places to update)
1. `app.js:5` → APP_VERSION
2. `index.html:7` → styles.css?v=XX
3. `index.html:253` → data.js?v=XX
4. `index.html:254` → app.js?v=XX

## Component Undersizing
Intentional: S1 cooler in S2 slot is valid. Uses `<=` comparison. Matches in-game behavior.

## Key Gotchas
- After editing data.js or app.js: hard refresh (Ctrl+Shift+R) required
- Snub ships legitimately have size 0 QD/powerPlants/coolers
- Gimbal size: parse from ClassName (Mount_Gimbal_S4=S4), NOT MaxSize
- scunpacked MaxSize:0 is common; fallback to ClassName parsing
