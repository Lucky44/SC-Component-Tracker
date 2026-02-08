.PHONY: help serve test validate extract sync sync-apply release clean

help: ## Show available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

serve: ## Start local development server on port 8000
	python3 -m http.server 8000

test: ## Run all tests (unit + integration)
	@echo "=== Unit Tests ===" && node scripts/test-extraction.js && echo "" && echo "=== Integration Tests ===" && node scripts/test-update-pipeline.js

test-unit: ## Run unit tests only
	node scripts/test-extraction.js

test-integration: ## Run integration tests only
	node scripts/test-update-pipeline.js

validate: ## Run data validation checks
	node validate.js

validate-json: ## Run data validation with JSON output
	node validate.js --json

extract: ## Extract ship specs and loadouts from ships.json
	node scripts/extract-ships.js && node scripts/extract-loadouts.js

sync: ## Preview data sync changes (dry run)
	node scripts/extract-ships.js && node scripts/extract-loadouts.js && node scripts/sync-all-data.js

sync-apply: ## Apply data sync changes and validate
	node scripts/extract-ships.js && node scripts/extract-loadouts.js && node scripts/sync-all-data.js --apply && node validate.js

debug-ship: ## Debug a specific ship (usage: make debug-ship SHIP="Ship Name")
	node scripts/debug-ship.js "$(SHIP)"

clean: ## Remove generated files
	rm -f validation_report.txt scripts/extracted-ships.js scripts/extracted-loadouts.js
