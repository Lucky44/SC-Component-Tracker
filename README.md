# SC Component Tracker by Tripp Robbins

A browser-based component management application for Star Citizen. Track your ships and their loadouts including weapons, shields, coolers, power plants, and quantum drives with a full inventory system.

**[Use the App](https://lucky44.github.io/SC-Component-Tracker/)** — Runs in your browser.

**Version:** 0.87

## Features

### Ship Management
- Add ships from a catalog of 142 Star Citizen ships; no ground vehicles included
- Assign custom nicknames to your ships
- Ships displayed in a responsive grid layout
- Ships organized by manufacturer for easy navigation
- **Compact View** - Toggle between detailed and compact display modes

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

### Data Management
- **Export/Import** - Backup your data to JSON files and restore on any device
- **Auto-Update** - Click "Check for Update" to fetch the latest ship data from GitHub
  - Compares your current data version with the latest available
  - Shows what's new (ships added, removed, or modified)
  - Apply updates with one click without losing your hangar or storage
- **LocalStorage** - All data persists in your browser across sessions

### Voice Commands (Chrome/Edge only)
- **Hands-free control** - Manage ships and components using natural language
- **Multi-LLM support** - Choose from OpenAI (gpt-4o-mini), Anthropic (claude-3-haiku), or Google (gemini-2.5-flash)
- **BYOK (Bring Your Own Key)** - Use your own API key for privacy and control
- **Supported commands:**
  - Ship management: "add Gladius", "open F7A Mark 2"
  - Component swapping: "set cooler to Atlas", "set shield to FR-76"
  - Storage: "set Arctic to 5", "show storage", "how many shields"
  - Navigation: "search for coolers", "close"
- **Auto-listen** - Automatically resumes listening after responses for multi-step workflows

## Tech Stack

- **Frontend:** Vanilla JavaScript (ES6+)
- **Styling:** Custom CSS3 with sci-fi Orange HUD theme
- **Fonts:** Orbitron (headings), Rajdhani (body)
- **Storage:** Browser LocalStorage (no backend required)
- **Data Updates:** GitHub raw URL for ship data updates

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

### Basic Workflow
1. **Add a Ship** - Click "+ Add Ship" and select from the dropdown organized by manufacturer
2. **Configure Components** - Use the dropdowns to select weapons, shields, power plants, coolers, and quantum drives
3. **Manage Storage** - Click "My Stored Components" to view and manage your spare components inventory
4. **Search Components** - Use the search bar to find components across all ships and storage
5. **Export/Import** - Use the Export/Import buttons to backup or restore your data

All data is automatically saved to your browser's local storage.

### Updating Ship Data
When new ships or components are added to Star Citizen:
1. Click the **"Check for Update"** button in the header
2. The app fetches the latest data from GitHub and compares it with your current version
3. Review the changes (ships added, removed, or modified)
4. Click **"Apply Update"** to update your database
5. Your hangar and storage inventory remain unchanged

### Using Voice Commands (Optional)
Voice commands require Chrome or Edge browser and an API key from OpenAI, Anthropic, or Google.

1. Click the **microphone icon** in the header
2. Select your preferred LLM provider and enter your API key
3. Click **"Enable Voice"** and then the microphone icon to start listening
4. Speak naturally:
   - "Add Gladius" - Adds ship to hangar
   - "Open Gladius" - Opens ship edit modal
   - "Set cooler to Atlas" - Swaps component on open ship
   - "Show storage" - Opens storage inventory
   - "How many shields do I have" - Queries storage

The system auto-listens after responses, so you can chain multiple commands without clicking.

## Project Structure

```
SC-Component-Tracker/
├── index.html          # Main HTML structure with modals
├── app.js              # Application logic and event handlers
├── voice.js            # Voice commands feature (Chrome/Edge)
├── styles.css          # Responsive styling with sci-fi theme
├── data.js             # Bundled ship and component database (fallback)
├── processed-data.json # Latest ship data for browser updates
├── validate.js         # Data validation script
├── docs/               # Archived development notes
└── scripts/            # Data processing and test scripts
    ├── extract-ships.js           # Extract ship specs from ships.json
    ├── extract-loadouts.js        # Extract stock loadouts from ships.json
    ├── sync-all-data.js           # Main sync script - updates data.js
    ├── update-from-scunpacked.js  # Generate processed-data.json
    ├── test-extraction.js         # Unit tests for extraction logic
    ├── test-update-pipeline.js    # Integration tests for pipeline
    └── archive/                   # Legacy one-off utility scripts
```

## Updating Ship Data

Ship data is extracted from [scunpacked](https://github.com/AlistairHavelin/scunpacked) and processed for this app.

To update ship data:
1. Download latest `ships.json` from scunpacked
2. Run `node scripts/update-from-scunpacked.js`
3. Commit and push `processed-data.json`
4. Users can then click "Check for Update" in the app

## Browser Support

- **Chrome** (recommended - full feature support including voice commands)
- **Edge** (full feature support including voice commands)
- **Firefox** (core features only - no voice commands support)
- **Safari** (core features only - voice commands not tested)

**Note:** Voice commands require the Web Speech API, which is only available in Chrome and Edge browsers.

## Contributing

Contributions are welcome! Please ensure any data changes are tested before submitting.

## License

This fan-made project is for personal use and is not affiliated with Cloud Imperium Games Corporation.

---

*Star Citizen is a trademark of Cloud Imperium Games Corporation.*
