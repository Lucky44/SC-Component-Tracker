# SC Component Tracker by Tripp Robbins

A browser-based component management application for Star Citizen. Track your ships and their loadouts including weapons, shields, coolers, power plants, and quantum drives with a full inventory system.

**[Use the App](https://lucky44.github.io/SC-Component-Tracker/)** — No download required, runs in your browser.

**Version:** 0.52

## Features

### Ship Management
- Add ships from an expandable catalog of 90+ Star Citizen vessels
- Assign custom nicknames to your ships
- Ships displayed in a responsive 4-column grid layout
- Ships organized by manufacturer for easy navigation

### Component Configuration
- **Pilot Weapons** - Up to 8 hardpoints per ship (sizes S1-S7)
- **Turret Weapons** - Manned and remote turret types with multi-gun configurations
- **Shield Generators** - Sizes 1-4
- **Power Plants** - Sizes 0-4
- **Coolers** - Sizes 0-4
- **Quantum Drives** - Various sizes

### Component Storage
- Store unused components in your inventory
- Track component quantities
- Type-based organization
- Add, edit, and delete stored components

### Search
- Real-time component search across all installed weapons and storage
- Results show ship name, component type, and location

### Stock Loadouts
- Pre-configured default loadouts for each ship
- Auto-fill functionality when adding new ships

## Tech Stack

- **Frontend:** Vanilla JavaScript (ES6+)
- **Styling:** Custom CSS3 with sci-fi Orange HUD theme
- **Fonts:** Orbitron (headings), Rajdhani (body)
- **Storage:** Browser LocalStorage (no backend required)
- **Validation:** Node.js scripts for data integrity

## Getting Started

### Use Online

Just visit **https://lucky44.github.io/SC-Component-Tracker/** — no installation needed. Your data is saved in your browser's local storage.

### Run Locally (for development)

1. Clone the repository:
   ```bash
   git clone https://github.com/Lucky44/SC-Component-Tracker.git
   cd SC-Component-Tracker
   ```

2. Start a local web server:
   ```bash
   python3 -m http.server 8000
   ```

3. Open http://127.0.0.1:8000 in your browser.

4. If you edit `data.js` or `app.js`, hard refresh with `Ctrl+Shift+R`.

## Usage

1. **Add a Ship** - Click "Add Ship" and select from the dropdown organized by manufacturer
2. **Configure Components** - Use the dropdowns to select weapons, shields, power plants, coolers, and quantum drives
3. **Manage Storage** - Click "Storage" to view and manage your spare components inventory
4. **Search Components** - Use the search bar to find components across all ships and storage

All data is automatically saved to your browser's local storage.

## Project Structure

```
SC-Component-Tracker/
├── index.html          # Main HTML structure with modals
├── app.js              # Application logic and event handlers
├── styles.css          # Responsive styling with sci-fi theme
├── data.js             # Ship and component database
├── validate.js         # Data integrity validation tool
├── CHANGELOG.md        # Version history
├── FUTURE_UPDATES_PLAN.txt  # Data maintenance guide
└── scripts/            # Utility scripts for data management
    ├── apply_wiki_solutions_v2.js
    ├── audit_problem_slots.js
    └── ...
```

## Validation

Run the validation script to check data integrity:

```bash
node validate.js | tee validation_report.txt
```

This checks for:
- Unknown weapon names
- Oversized weapons vs mount sizes
- Turret configuration mismatches
- Missing stock loadout entries

Review [validation_report.txt](validation_report.txt) for details.

## Updating Ship Data

See [FUTURE_UPDATES_PLAN.txt](FUTURE_UPDATES_PLAN.txt) for the complete guide on maintaining and updating ship specifications.

Quick process:
1. Find data from [starcitizen.tools](https://starcitizen.tools) wiki
2. Add to `scripts/solutions_from_wiki.json`
3. Run `node scripts/apply_wiki_solutions_v2.js`
4. Verify with `node scripts/audit_problem_slots.js`

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for recent updates.

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

Contributions are welcome! Please ensure any data changes pass validation before submitting.

## License

This fan-made project is for personal use and is not affiliated with Cloud Imperium Games Corporation.

---

*Star Citizen is a trademark of Cloud Imperium Games Corporation.*
