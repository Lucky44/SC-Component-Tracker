# Ship Data Sync Notes (2026-02-01)

## Current State - SYNCED
- **data.js**: 142 ships (bundled fallback) - SYNCED with processed-data.json
- **processed-data.json**: 142 ships (on GitHub)
- **App Version**: 0.66

## Session Summary (2026-02-01)

### Completed Tasks
1. **Synced data.js with processed-data.json** using `scripts/replace-ships-array.js`
   - Both now have 142 ships with matching names

2. **Fixed "Check for Update" button**
   - Button now compares ship counts (not just version strings)
   - Shows "Ship data is up to date" toast when current
   - Shows update modal with diff when new data available

3. **Improved toast notifications**
   - Position: top center (was bottom right)
   - Duration: 2 seconds (was 1.4 seconds)
   - Size: doubled (font-size 1.8rem, padding 20px 28px)

4. **Cache-busting updated to v=66** for all assets

### Files Modified
- `app.js` - v0.66, improved update check logic, toast duration 2000ms
- `data.js` - 142 ships synced from processed-data.json
- `styles.css` - toast positioned top-center, doubled size
- `index.html` - cache-busting v=66 for CSS and JS
- `scripts/replace-ships-array.js` - utility to sync ships array
- `scripts/compare-ships.js` - utility to compare ship lists

### Naming Fixes Applied
- ARGO MOLE -> Argo MOLE
- ARGO RAFT -> Argo RAFT
- Aegis Retaliator Bomber -> Aegis Retaliator
- Origin 600i Explorer -> Origin 600i
- Anvil F7C-M Super Hornet -> Anvil F7C-M Super Hornet Mk I
- RSI Zeus Mk II MR -> RSI Zeus Mk II CL

## Update System

### How It Works
1. User clicks "Check for Update" button
2. App fetches processed-data.json from GitHub (cache-busted)
3. Compares local ship count vs remote ship count
4. If remote has more ships: shows update modal with diff
5. If data is current: shows "Ship data is up to date" toast
6. User can apply update to store in localStorage

### Key URLs and Storage
- GitHub URL: `https://raw.githubusercontent.com/Lucky44/SC-Component-Tracker/main/processed-data.json`
- localStorage keys:
  - `sc-ships-data` - Full ship data cache
  - `sc-component-tracker-data-version` - Version timestamp

### Testing Updates
To test the update system:
1. Run `node scripts/update-from-scunpacked.js` to regenerate processed-data.json
2. Commit and push processed-data.json
3. Users can then click "Check for Update" to pull the new data

## Utility Scripts
- `node scripts/compare-ships.js` - Compare ships between data.js and processed-data.json
- `node scripts/replace-ships-array.js` - Sync ships from processed-data.json to data.js
- `node scripts/update-from-scunpacked.js` - Generate processed-data.json from scunpacked data
