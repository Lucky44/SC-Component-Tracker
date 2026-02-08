# Proposed Changes for Data Validation Fixes

**Current Issues**: 161 total validation errors  
**Goal**: Reduce to near-zero by fixing oversized weapons, missing stock entries, and spec mismatches

---

## 🔧 Category A: Weapon Size Downgrades (Oversized → Correct Size)

### **Pattern: Omnisky IX (S3) → Omnisky VI (S2)**
Ships with Omnisky IX on S2 mounts:
- **Aegis Avenger Stalker** - pilotWeapons[1]
- **Aegis Avenger Titan** - pilotWeapons[1]  
- **Aegis Avenger Warlock** - pilotWeapons[1]

**Change**: Replace `"Omnisky IX Cannon"` with `"Omnisky VI Cannon"` in stock loadouts

---

### **Pattern: CF-227 Badger (S2) → CF-117 Bulldog (S1)**
Ships with CF-227 on S1 mounts:
- **C.O. Mustang Alpha** - pilotWeapons[0]
- **C.O. Mustang Beta** - pilotWeapons[0]
- **Drake Cutter** - pilotWeapons[0]
- **Mirai Fury** - pilotWeapons[0]

**Change**: Replace `"CF-227 Badger Repeater"` with `"CF-117 Bulldog Repeater"` in stock loadouts

---

### **Pattern: CF-337 Panther (S3) → CF-227 Badger (S2)**
Ships with CF-337 on S2 mounts:
- **Origin 100i** - pilotWeapons[0]
- **Origin 125a** - pilotWeapons[0]
- **Origin 135c** - pilotWeapons[0]
- **Origin 350r** - pilotWeapons[1]
- **Gatac Syulen** - pilotWeapons[0]

**Change**: Replace `"CF-337 Panther Repeater"` with `"CF-227 Badger Repeater"` in stock loadouts

---

### **Pattern: Mantis GT-220 (S3) → Scorpion GT-215 (S2)**
Ships with Mantis on S2 mounts:
- **Anvil F7C-M Super Hornet** - pilotWeapons[2]
- **Drake Herald** - pilotWeapons[0]

**Change**: Replace `"Mantis GT-220 Gatling"` with `"Scorpion GT-215 Gatling"` in stock loadouts

---

### **Pattern: Jericho XL (S3) → Jericho X (S2)**
Ships with Jericho XL on S2 mounts:
- **C.O. Mustang Delta** - pilotWeapons[1]

**Change**: Replace `"Jericho XL"` with `"Jericho X"` in stock loadouts

---

### **Pattern: M5A Cannon (S3) → M4A Cannon (S2)**
Ships with M5A on S2 mounts:
- **Origin 300i** - pilotWeapons[1]

**Change**: Replace `"M5A Cannon"` with `"M4A Cannon"` in stock loadouts

---

### **Pattern: M6A Cannon (S4) → M5A Cannon (S3)**
Ships with M6A on S3 mounts:
- **Origin 325a** - pilotWeapons[1]

**Change**: Replace `"M6A Cannon"` with `"M5A Cannon"` in stock loadouts

---

### **Pattern: M7A Cannon (S5) → M6A Cannon (S4)**
Ships with M7A on S4 mounts:
- **RSI Constellation Aquila** - pilotWeapons[1]
- **RSI Constellation Taurus** - pilotWeapons[1] (currently CF-557, needs M6A)

**Change**: Replace oversized weapons with S4 equivalents

---

### **Pattern: Omnisky XV (S5) → Omnisky XII (S4)**
Ships with Omnisky XV on S4 mounts:
- **RSI Constellation Phoenix** - pilotWeapons[1]

**Change**: Replace `"Omnisky XV Cannon"` with `"Omnisky XII Cannon"` in stock loadouts

---

### **Pattern: Omnisky XII (S4) → Omnisky IX (S3)**
Ships with Omnisky XII on S3 mounts:
- **RSI Zeus Mk II CL** - pilotWeapons[0]
- **RSI Zeus Mk II ES** - pilotWeapons[0]
- **RSI Zeus Mk II MR** - pilotWeapons[0]

**Change**: Replace `"Omnisky XII Cannon"` with `"Omnisky IX Cannon"` in stock loadouts

---

### **Pattern: Lightstrike IV (S4) → Lightstrike III (S3)**
Ships with Lightstrike IV on S3 mounts:
- **Esperia Talon** - pilotWeapons[0]

**Change**: Replace `"Lightstrike IV Cannon"` with `"Lightstrike III Cannon"` in stock loadouts

---

### **Pattern: Deadbolt V (S5) → Deadbolt III (S3)**
Ships with Deadbolt V on S3 turret:
- **Esperia Prowler** - turret 1

**Change**: Replace `"Deadbolt V Cannon"` with `"Deadbolt III Cannon"` in turretWeapons

---

### **Unique Cases**
- **Mirai Guardian** - pilotWeapons[0]: `M7A Cannon` (S5) on S1 mount → Change to S1 weapon (suggest `CF-117 Bulldog Repeater` or leave empty)
- **Kruger P-52 Merlin** - pilotWeapons[0]: `Tigerstrike T-19P` (S2) on S1 mount → Keep as-is (nose-mounted, special case)
- **MISC Reliant Tana** - pilotWeapons[1]: `CF-337 Panther Repeater` (S3) on S2 mount → Change to `CF-227 Badger Repeater`

---

## 📝 Category B: Stock Loadout Expansions (Add Missing Entries)

### **B1: Ships with Repeating Single Weapons (Expand Arrays)**

Many ships have stock arrays with only 1 weapon listed but multiple mounts. These need expansion:

**Aegis Gladius** (has 1 stock, needs 6):
```javascript
pilotWeapons: ["CF-337 Panther Repeater"] 
// Should be: ["CF-337 Panther Repeater","CF-337 Panther Repeater","CF-337 Panther Repeater","Mantis GT-220 Gatling","CF-337 Panther Repeater","CF-337 Panther Repeater"]
```

**Aegis Sabre** (has 1 stock, needs 4):
```javascript
pilotWeapons: ["CF-337 Panther Repeater"]
// Should be: ["CF-337 Panther Repeater","CF-337 Panther Repeater","CF-337 Panther Repeater","CF-337 Panther Repeater"]
```

**Aegis Eclipse** (has 1 stock, needs 3):
```javascript
pilotWeapons: ["CF-227 Badger Repeater"]
// Should be: ["CF-227 Badger Repeater","CF-227 Badger Repeater","CF-227 Badger Repeater"]
```

**Similar Pattern For**:
- Anvil F7C Hornet Mk I/II (need full arrays)
- Anvil Hawk (need 6 weapons)
- C.O. Nomad (need 2 weapons)
- Drake Buccaneer (need 4 weapons)
- Esperia Blade (need 2 weapons)
- Esperia Glaive (need 4 weapons)
- Kruger P-72 Archimedes (need 2 weapons)
- Mirai Fury (need 2 weapons after size fix)
- Mirai Guardian (need 2 weapons)
- Mirai Razor / MISC Razor (need 3 weapons)
- MISC Hull A (need 2 weapons)
- MISC Reliant Kore/Mako/Sen (need 2 weapons)
- Origin 315p (need 3 weapons)
- Origin M50 (need 3 weapons)
- RSI Aurora CL/LX (need 4 weapons)
- RSI Aurora LN (need 6 weapons)
- RSI Aurora MR (need 4 weapons total, currently has 2)
- RSI Mantis (need 2 weapons)
- Crusader Mercury Star Runner (need 2 weapons)

**Action**: For each, duplicate the existing stock weapon to fill all pilot mount slots

---

### **B2: Ships with Partial Stock Arrays (Fill Gaps)**

**Aegis Avenger Stalker/Titan/Warlock** (have 2, need 3):
- Current: `["Revenant Gatling","Omnisky VI Cannon"]` (after size fix)
- Proposed: `["Revenant Gatling","Omnisky VI Cannon","Omnisky VI Cannon"]`

**Anvil C8X Pisces Expedition** (has 2, needs 4):
- Current: `["CF-117 Bulldog Repeater","FL-11 Cannon"]`
- Proposed: `["CF-117 Bulldog Repeater","CF-117 Bulldog Repeater","FL-11 Cannon","FL-11 Cannon"]`

**C.O. Mustang Delta** (has 2, needs 4):
- Current: `["Suckerpunch Cannon","Jericho X"]` (after size fix)
- Proposed: `["Suckerpunch Cannon","Suckerpunch Cannon","Jericho X","Jericho X"]`

**Origin 125a** (has 1, needs 3):
- Current: `["CF-227 Badger Repeater"]` (after size fix)
- Proposed: `["CF-227 Badger Repeater","CF-227 Badger Repeater","CF-227 Badger Repeater"]`

**Origin 300i/325a/350r** (have 2, need 3):
- Expand each to 3 weapons using existing pattern

**Aegis Redeemer** (has 2, needs 6):
- Current: `["C-788 Cannon","C-788 Cannon"]`
- Proposed: Add 4 more weapons (research correct stock: likely M5A or similar S3 weapons for wing mounts)

**MISC Starfarer Gemini** (has 0, needs 4):
- Currently empty pilot weapons; research correct stock loadout

---

### **B3: Turret Stock Expansions**

**Aegis Reclaimer** (has 1 turret weapon, needs 16 per-gun):
- Currently: `["M2C \"Swarm\""]`
- **SKIP**: Already has custom hardcoded turret defaults in code

**Anvil Valkyrie** (has 4, needs 6 per-gun or 5 per-turret):
- Current: `["M5A Cannon","M5A Cannon","M5A Cannon","M5A Cannon"]`
- Proposed: Add 2 more `"M5A Cannon"` entries

**Crusader A2 Hercules** (has 5, needs 4 per-gun):
- Current array is actually correct (2 turrets × 2 guns + 1 tail = 5 total)
- **ACTION**: Verify spec - may need to update ship spec to match stock

**Crusader M2 Hercules** (has 3, needs 4):
- Add 1 more turret weapon

**Drake Caterpillar** (has 3, needs 4):
- Add 1 more turret weapon

**Gatac Railen** (has 1, needs 4 per-gun or 2 per-turret):
- Current: `["Singe Cannon (S2)"]`
- Proposed: `["Singe Cannon (S2)","Singe Cannon (S2)","Singe Cannon (S2)","Singe Cannon (S2)"]`

**MISC Hull C** (has 1, needs 6 per-gun or 3 per-turret):
- Current: `["M5A Cannon"]`
- Proposed: `["M5A Cannon","M5A Cannon","M5A Cannon","M5A Cannon","M5A Cannon","M5A Cannon"]`

**MISC Starfarer** (has 3, needs 4):
- Add 1 more turret weapon

---

## 🔄 Category C: Spec Corrections (Ship Hardpoint Specs Don't Match Stock)

### **C1: Ships With Stock Pilot Weapons But Spec Shows 0**

**These ships have pilot weapons in stock but ship spec shows 0 pilot hardpoints**:

- **Anvil Valkyrie**: Stock has 2 pilot weapons, spec has 0
- **Argo MOLE**: Stock has 1 pilot weapon (mining laser), spec has 0
- **Argo RAFT**: Stock has 1 pilot weapon, spec has 0
- **Drake Vulture**: Stock has 1 pilot weapon, spec has 0
- **Origin 400i**: Stock has 2 pilot weapons, spec has 1
- **Origin 600i**: Stock has 2 pilot weapons, spec has 0

**Options**:
1. **Add pilot hardpoints to ship specs** to match stock loadouts
2. **Remove pilot weapons from stock** (if these are utility/mining tools, not combat hardpoints)

**Recommendation**: Research each ship - if weapons are turreted or utility (mining/tractor), remove from stock pilot weapons. Otherwise, add hardpoints to spec.

---

### **C2: Ships With Too Many Stock Pilot Weapons**

- **Drake Cutlass Blue**: Stock has 3, spec has 2
- **Drake Cutlass Steel**: Stock has 4, spec has 2
- **RSI Constellation Phoenix**: Stock has 3, spec has 2

**Action**: Remove excess stock entries or verify ship specs are correct

---

## 🧩 Category D: Component Size Mismatches (Non-Weapon)

### **Quantum Drive Size Mismatches**

- **Anvil Terrapin**: `Eos` (S1) in S2 slot → Change to `Crossfield` (S2)
- **Argo RAFT**: `Bolon` (S2) in S1 slot → Change to `Expedition` (S1)
- **ARGO RAFT** (duplicate): Same as above
- **Banu Defender**: `Beacon` (S1) in S2 slot → Change to `Crossfield` (S2)
- **Esperia Blade**: `Rush` (S1) in S2 slot → Change to `Crossfield` (S2)
- **Esperia Glaive**: `Beacon` (S1) in S2 slot → Change to `Crossfield` (S2)
- **Mirai Guardian**: `Crossfield` (S2) in S1 slot → Change to `Beacon` (S1)
- **Origin 600i (all variants)**: `Odyssey` (S2) in S3 slot → Change to `Kama` (S3)
- **RSI Mantis**: `Beacon` (S1) in S2 slot → Change to `Crossfield` (S2)

---

## 📊 Summary Statistics

| Category | Count | Priority |
|----------|-------|----------|
| Oversized Weapons | ~35 | HIGH |
| Missing Stock Pilot | ~80 | MEDIUM |
| Missing Stock Turret | ~10 | MEDIUM |
| Spec Mismatches (A-errors) | ~10 | LOW (needs research) |
| QD Size Mismatches | ~10 | HIGH |
| Turret Length Mismatches | ~8 | MEDIUM |

---

## 🎯 Recommended Approach

### **Phase 1: Quick Wins (Automated)** ✅
- All weapon size downgrades (Categories A patterns)
- Quantum drive size fixes
- Stock array expansions for simple repeating patterns

### **Phase 2: Manual Research Required** ⚠️
- Ships with spec vs stock conflicts (Category C)
- Aegis Redeemer pilot weapons (what are the correct wing mounts?)
- MISC Starfarer Gemini pilot weapons (empty - intentional?)
- Anvil Valkyrie / ARGO MOLE / etc. (pilot vs utility distinction)

### **Phase 3: Validation & Testing** 🔍
- Re-run validator after each phase
- Test affected ships in UI with hard refresh
- Verify turret rendering logic handles new arrays correctly

---

## ⚡ Ready to Proceed?

**Approve to start Phase 1 automated fixes** (will reduce ~100 errors to ~60 in one batch)
