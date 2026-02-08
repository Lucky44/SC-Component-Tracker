# Validator Oddities & Problem Ships

**Current Status**: 102 validation issues across 55 ships  
**Last Updated**: 2026-01-26 after turret spec fixes (115 → 102)

---

## Ships with Unknown Weapons (Cannot Auto-Fix)

These ships have `Unknown` weapon entries or weapon names not found in the database. These require manual verification or game client inspection to resolve.

### Aegis Vanguard (2 ships)
- **Aegis Vanguard Hoplite** & **Warden**: turretWeapons contain "SW16BR2 Sawbuck Repeater" (not in database)
- Issue: unknown-weapon (2 entries per ship)

### Anvil Hornet & Super Hornet (3 ships)
- **Anvil F7C Hornet Mk I**: pilotWeapons[3] = "Unknown"; turretWeapons contain "Anvil Noise Launcher" & "Anvil Decoy Launcher" (not in database)
- **Anvil F7C-M Super Hornet**: pilotWeapons[3] = "Unknown"; turretWeapons[0] = "CF-227 Badger" (incomplete name?)
- **Anvil F8A Lightning**: pilotWeapons[6-7] = "Unknown"

### Mustang Family (5 ships)
- **C.O. Mustang Gamma** & **Omega**: pilotWeapons[2-3] = "Unknown"
- **C.O. Mustang Alpha** & **Beta**: Also have "Unknown" in turretWeapons (should be empty per current spec)
- **C.O. Mustang Delta**: Has turretWeapons "Unknown" (spec has none)

### Drake Family (5 ships)
- **Drake Buccaneer**: pilotWeapons[3-4] = "Unknown"
- **Drake Cutlass Black**, **Blue**, **Steel**: turretWeapons all "Unknown" (expected per scunpacked)
- **Drake Cutter**: No unknowns but oversized S2 Badger on S1 spec

### Crusader Spirits (3 ships)
- **Crusader Spirit A1**, **C1**, **E1**: turretWeapons contain "Unknown" entries

### Esperia (2 ships)
- **Esperia Blade** & **Glaive**: pilotWeapons[2] = "Unknown" (tail gun slot)

### MISC & Mirai (7 ships)
- **MISC Freelancer** & variants (DUR, MAX, MIS): turretWeapons all "Unknown"
- **MISC Hull A**: pilotWeapons[1] = "Unknown"
- **MISC Razor**: pilotWeapons[1] = "Unknown"
- **MISC Reliant Mako** & **Sen**: pilotWeapons[1] = "Unknown"
- **Mirai Razor**: pilotWeapons[1] = "Unknown"
- **Mirai Guardian**: pilotWeapons[0] = "M7A Cannon" (S5 on S1 - oversized); pilotWeapons[1] = "Unknown"

### Other (2 ships)
- **Gatac Railen**: turretWeapons all "S4 Weapon" (generic placeholder, not in database)
- **Kruger P-72 Archimedes**: pilotWeapons[1] = "Unknown"

---

## Ships with Oversized Weapons (Remaining)

These have weapons larger than their mount specs. Can be fixed by either:
1. Increasing mount spec size, or
2. Downgrading stock weapons

### S3 Oversized on S2 Mounts
- **Origin 100i**, **125a**, **135c**, **350r**: S3 Panther Repeater on S2 mounts
  - **Fix**: Increase mounts to S3, or downgrade to S2 weapons

### S4 Oversized on S3 Mounts
- **Origin 325a**: M6A Cannon (S4) on S3 mount
  - **Fix**: Increase second mount to S4

### S3 Oversized on S1 Mounts
- **Origin 300i**: M5A Cannon (S3) on second S2 mount (already S3)
  - Issue: Already S3 but validator complains? May be stock/spec mismatch

### Turret Oversized
- **Drake Caterpillar**: CF-447 Rhino (S4) & M5A (S3) on S2 turret mounts
  - **Fix**: Increase turret mounts from S2 to S4

### Pilot & Turret Mix
- **Mirai Guardian**: M7A (S5) on S1 mount (extreme oversizing)
  - **Fix**: Likely stock error; should be smaller weapon or larger mount

---

## Ships Missing Stock Weapons

These have spec-defined hardpoints but no stock weapons assigned.

### Pilot Weapons Missing (8 ships)
- **Argo MOLE**: spec has 2 S2 hardpoints, stock has 1 weapon
- **Argo RAFT**: spec has 2 S1 hardpoints, stock has 0 weapons
- **Drake Vulture**: spec has 4 S1 hardpoints, stock has 1 weapon
- **Origin 600i**: spec has 1 S3 remote turret (pilot area), stock missing mount 2
- **RSI Constellation Phoenix**: spec has 4 S5 pilot mounts, stock only has 3 weapons (mount 3 missing)

### Turret Stock Mismatches
- **Aegis Reclaimer**: turretWeapons mismatch spec (16 guns × 8 turrets = 16 weapons expected, currently matching)
- **Aegis Redeemer**: turretWeapons reduced to 3 per-gun approach (matches 3 turrets: 2+2+2 guns)

### Spec-Present but Empty Turrets
- **MISC Reliant Kore**: spec shows no turrets, but stock turretWeapons array exists
- **Banu Defender**: spec shows no turrets, but stock has 4 "Singe Cannon" entries

---

## Ships with Unknown Weapon Names (Database Gap)

These weapons need to be added to the weapons database:

### Aegis/Anvil
- **SW16BR2 Sawbuck Repeater** (Vanguard turrets)
- **Anvil Noise Launcher**, **Anvil Decoy Launcher** (Hornet turrets)
- **CF-227 Badger** (incomplete entry for Super Hornet)

### Shredder Series (Origin)
- **SW16BR3 Shredder Repeater** (appears in Origin 300i, 315p, 325a) - 3+ ships

### Banu
- **Singe Cannon** (Defender turrets & pilot weapons) - appears as "Singe Cannon (S3)" in stock
  - Likely S3 weapon; Defender spec shows no turrets but stock has 4 turret entries

### Crusader
- Multiple **Unknown** entries in Spirit A1, C1, E1 turrets

### MISC/Drake
- **SureGrip S1 Tractor** (Nomad turret) - utility weapon, not combat

### Generic
- **S4 Weapon** (Gatac Railen turrets) - placeholder, need actual weapon names

---

## Summary by Fix Type

| Type | Count | Ships | Priority |
|------|-------|-------|----------|
| Unknown weapons | 30 issues | 21 ships | Low (requires game data) |
| Oversized mounts | 22 issues | 10 ships | Medium (fixable) |
| Missing stock | 20 issues | 8 ships | Medium (mostly minor) |
| Turret/spec mismatch | 20 issues | 6 ships | High (already partially fixed) |
| **Spec-present empty turrets** | 10 issues | 2 ships | Low (intentional?) |

---

## Recommendations

1. **Immediate** (High-value fixes):
   - Add missing weapons to database: Shredder Repeater, Sawbuck Repeater, Singe Cannon, Noise/Decoy launchers
   - Fix remaining oversized mounts (Caterpillar, Mirai Guardian, remaining Origin variants)

2. **Medium-term**:
   - Complete ARGO MOLE/RAFT stock weapon assignments
   - Resolve Drake Vulture missing stock (likely 4 small weapons, not 1)
   - Verify Constellation Phoenix mount 3 stock

3. **Investigation needed**:
   - **MISC Freelancer turrets**: All marked "Unknown" - verify if intentional (no turrets in 3.x?)
   - **Banu Defender spec vs stock**: Spec shows no turrets but stock has 4 entries
   - **MISC Reliant Kore**: Spec inconsistency (turrets shown in stock, not in spec)
   - **Mirai Guardian**: S5 M7A on S1 mount is suspicious - likely stock data error

---

## Notes

- **Validator Status**: 102 issues from 146 initial (30% reduction in one session)
- **Branch**: `version/2026-01-26-corsair-validation`
- **Commits**: Multiple batches covering Corsair, Avenger, Hornet, F8A, Constellation, Zeus, Redeemer, Retaliator, Hurricane, A2, MSR fixes
