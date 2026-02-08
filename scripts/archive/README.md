# Archived Scripts

This directory contains legacy and one-off Node.js scripts that were used during
early development of the SC Component Tracker data pipeline. They have been
archived because they are no longer part of the active workflow.

## Why archived?

These scripts were created for specific one-time tasks such as:
- Batch-fixing component data from wiki sources
- Merging ship data in incremental batches
- Analyzing and debugging data issues during initial development
- Early versions of extraction/sync logic that have since been replaced

## Active scripts

The active data pipeline scripts remain in the parent `scripts/` directory:
- `extract-ships.js` - Extract ship specs from ships.json
- `extract-loadouts.js` - Extract stock loadouts from ships.json
- `sync-all-data.js` - Main sync script to update data.js
- `update-from-scunpacked.js` - Generate processed-data.json
- `debug-ship.js` - Debug weapon hardpoints for a specific ship
- `test-extraction.js` - Unit tests for extraction logic
- `test-update-pipeline.js` - Integration tests for the update pipeline
