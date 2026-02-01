# Ship Data Sync Notes (2026-02-01)

## Current State
- **data.js**: 114 ships (bundled fallback)
- **processed-data.json**: 142 ships (on GitHub)
- **Difference**: 28 ships need to be added to data.js

## Ships to Add (from processed-data.json not in data.js)
These 37 ships exist in processed-data.json but not in data.js:

### Anvil (12 ships)
- Anvil F7 Hornet Mk Wikelo
- Anvil F7A Hornet Mk I
- Anvil F7C Hornet Wildfire Mk I
- Anvil F7C-M Hornet Heartseeker Mk I
- Anvil F7C-M Hornet Heartseeker Mk II
- Anvil F7C-M Super Hornet Mk II
- Anvil F7C-R Hornet Tracker Mk I
- Anvil F7C-R Hornet Tracker Mk II
- Anvil F7C-S Hornet Ghost Mk I
- Anvil F7C-S Hornet Ghost Mk II
- F8C Lightning PYAM Exec
- Hornet F7A Mk II PYAM Exec

### Aopoa (1 ship)
- Aopoa San'tok.yāi

### Argo (4 ships)
- Argo MPUV Cargo
- Argo MPUV Personnel
- Argo MPUV Tractor
- Argo SRV

### Consolidated Outland (1 ship)
- C.O. Mustang CitizenCon 2948 Edition

### Crusader (1 ship)
- Crusader Intrepid

### Drake (4 ships)
- Corsair PYAM Exec
- Cutlass Black PYAM Exec
- Drake Clipper
- Drake Golem

### Esperia (1 ship)
- Vanduul Scythe

### Gatac (1 ship)
- Syulen PYAM Exec

### Grey's Market (1 ship) - NEW SECTION NEEDED
- Grey's Shiv

### Kruger (2 ships) - NEW SECTION NEEDED
- Kruger L-21 Wolf
- Kruger L-22 Alpha Wolf

### MISC (3 ships)
- MISC Fortune
- MISC Starlancer MAX
- MISC Starlancer TAC

### Origin (1 ship)
- Origin 85X Limited

### RSI (4 ships)
- RSI Apollo Medivac
- RSI Apollo Triage
- RSI Hermes
- RSI Salvation

### Vanduul (1 ship) - NEW SECTION NEEDED
- Esperia Stinger

## How to Add Ships

Run this command to generate the ship entries:
```bash
node scripts/merge-ships.js
```

This outputs JavaScript code that can be copied into data.js at the appropriate manufacturer sections.

## Naming Fixes Already Applied
- ARGO MOLE → Argo MOLE
- ARGO RAFT → Argo RAFT
- Aegis Retaliator Bomber → Aegis Retaliator
- Origin 600i Explorer → Origin 600i
- Anvil F7C-M Super Hornet → Anvil F7C-M Super Hornet Mk I
- RSI Zeus Mk II MR → RSI Zeus Mk II CL

## Files Modified This Session
- app.js - v0.65, improved update check logic
- data.js - naming fixes applied
- processed-data.json - 142 ships, cleaned and deduplicated
- scripts/update-from-scunpacked.js - added name normalization and exclusions
- scripts/compare-ships.js - utility to compare ship lists

## To Complete the Sync
1. Run `node scripts/merge-ships.js` to get ship entries
2. Manually add each ship to the appropriate section in data.js
3. Verify with `node -c data.js` (syntax check)
4. Run `node scripts/compare-ships.js` to verify sync
5. Commit and push

## Alternative: Use processed-data.json ships array
Instead of manually adding, you could:
1. Extract the ships array from processed-data.json
2. Replace the ships array in data.js entirely
3. This is riskier but faster

The ships array in processed-data.json is already cleaned and sorted.
