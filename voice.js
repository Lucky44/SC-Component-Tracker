/**
 * Voice Commands Module for SC Component Tracker
 * Enables voice input/output with LLM-powered natural language understanding
 */

const VoiceCommands = (function() {
    'use strict';

    // Storage key for voice settings
    const VOICE_STORAGE_KEY = 'sc-tracker-voice-settings';

    // Provider configurations
    const PROVIDERS = {
        openai: {
            name: 'OpenAI',
            model: 'gpt-4o-mini',
            endpoint: 'https://api.openai.com/v1/chat/completions',
            keyUrl: 'https://platform.openai.com/api-keys',
            cost: '~$0.01 per query'
        },
        anthropic: {
            name: 'Anthropic',
            model: 'claude-3-haiku-20240307',
            endpoint: 'https://api.anthropic.com/v1/messages',
            keyUrl: 'https://console.anthropic.com/settings/keys',
            cost: '~$0.01 per query'
        },
        google: {
            name: 'Google',
            model: 'gemini-2.5-flash',
            endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
            keyUrl: 'https://aistudio.google.com/app/apikey',
            cost: 'Free tier available (10 RPM)'
        }
    };

    // State
    let settings = {
        provider: null,
        apiKey: null,
        enabled: false
    };
    let recognition = null;
    let isListening = false;
    let synthesis = window.speechSynthesis;
    let conversationHistory = []; // Track recent exchanges for context

    // DOM elements
    let voiceBtn = null;
    let voiceModal = null;

    /**
     * Initialize voice commands module
     */
    function init() {
        // Get DOM elements
        voiceBtn = document.getElementById('voiceBtn');
        voiceModal = document.getElementById('voiceModal');

        if (!voiceBtn || !voiceModal) {
            console.warn('Voice elements not found in DOM');
            return;
        }

        // Load saved settings
        loadSettings();

        // Check browser support BEFORE setting up listeners
        const hasSpeechRecognition = ('webkitSpeechRecognition' in window) || ('SpeechRecognition' in window);

        if (!hasSpeechRecognition) {
            voiceBtn.title = 'Voice commands require Chrome or Edge browser';
            voiceBtn.style.opacity = '0.5';
            voiceBtn.addEventListener('click', () => {
                showToast('Voice commands require Chrome or Edge. Firefox is not supported.');
            });
            return;
        }

        // Initialize speech recognition
        initSpeechRecognition();

        // Set up event listeners (only if speech is available)
        setupEventListeners();

        // Update UI state
        updateButtonState();
    }

    /**
     * Load settings from localStorage
     */
    function loadSettings() {
        try {
            const saved = localStorage.getItem(VOICE_STORAGE_KEY);
            if (saved) {
                settings = JSON.parse(saved);
            }
        } catch (e) {
            console.warn('Failed to load voice settings:', e);
        }
    }

    /**
     * Save settings to localStorage
     */
    function saveSettings() {
        try {
            localStorage.setItem(VOICE_STORAGE_KEY, JSON.stringify(settings));
        } catch (e) {
            console.warn('Failed to save voice settings:', e);
        }
    }

    /**
     * Set up event listeners
     */
    function setupEventListeners() {
        // Voice button click
        voiceBtn.addEventListener('click', handleVoiceButtonClick);

        // Right-click to open settings (when voice is already enabled)
        voiceBtn.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            openModal('voiceModal');
            // Populate current settings
            const providerSelect = document.getElementById('voiceProvider');
            const apiKeyInput = document.getElementById('voiceApiKey');
            if (providerSelect && settings.provider) {
                providerSelect.value = settings.provider;
                handleProviderChange({ target: providerSelect });
            }
            if (apiKeyInput && settings.apiKey) {
                apiKeyInput.value = settings.apiKey;
            }
            updateSaveButtonState();
        });

        // Provider selection
        const providerSelect = document.getElementById('voiceProvider');
        if (providerSelect) {
            providerSelect.addEventListener('change', handleProviderChange);
            // Set initial value if saved
            if (settings.provider) {
                providerSelect.value = settings.provider;
                handleProviderChange({ target: providerSelect });
            }
        }

        // API key input
        const apiKeyInput = document.getElementById('voiceApiKey');
        if (apiKeyInput) {
            apiKeyInput.addEventListener('input', handleApiKeyInput);
            // Set initial value if saved
            if (settings.apiKey) {
                apiKeyInput.value = settings.apiKey;
            }
        }

        // Toggle API key visibility
        const toggleBtn = document.getElementById('toggleApiKeyBtn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const input = document.getElementById('voiceApiKey');
                input.type = input.type === 'password' ? 'text' : 'password';
            });
        }

        // Save settings button
        const saveBtn = document.getElementById('saveVoiceSettingsBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', handleSaveSettings);
        }

        // Modal close buttons
        const closeButtons = voiceModal.querySelectorAll('[data-modal="voiceModal"]');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => closeModal('voiceModal'));
        });

        // Update save button state
        updateSaveButtonState();
    }

    /**
     * Handle voice button click
     */
    function handleVoiceButtonClick() {
        if (!settings.enabled || !settings.apiKey) {
            // Open settings modal
            openModal('voiceModal');
        } else {
            // Toggle listening
            if (isListening) {
                stopListening();
            } else {
                startListening();
            }
        }
    }

    /**
     * Handle provider selection change
     */
    function handleProviderChange(e) {
        const provider = e.target.value;
        settings.provider = provider;

        const apiKeyGroup = document.getElementById('apiKeyGroup');
        const providerInfo = document.getElementById('voiceProviderInfo');
        const commandsHelp = document.getElementById('voiceCommandsHelp');

        if (provider && PROVIDERS[provider]) {
            const config = PROVIDERS[provider];

            // Show API key input
            apiKeyGroup.style.display = 'block';

            // Show provider info
            providerInfo.style.display = 'block';
            providerInfo.innerHTML = `
                <p><strong>${config.name}</strong> - ${config.model}</p>
                <p>Estimated cost: ${config.cost}</p>
                <p><a href="${config.keyUrl}" target="_blank">Get your API key here</a></p>
            `;

            // Show commands help
            commandsHelp.style.display = 'block';
        } else {
            apiKeyGroup.style.display = 'none';
            providerInfo.style.display = 'none';
            commandsHelp.style.display = 'none';
        }

        updateSaveButtonState();
    }

    /**
     * Handle API key input
     */
    function handleApiKeyInput(e) {
        settings.apiKey = e.target.value.trim();
        updateSaveButtonState();
    }

    /**
     * Update save button state
     */
    function updateSaveButtonState() {
        const saveBtn = document.getElementById('saveVoiceSettingsBtn');
        if (saveBtn) {
            const canSave = settings.provider && settings.apiKey && settings.apiKey.length > 10;
            saveBtn.disabled = !canSave;
            saveBtn.textContent = settings.enabled ? 'Update Settings' : 'Enable Voice';
        }
    }

    /**
     * Handle save settings
     */
    function handleSaveSettings() {
        settings.enabled = true;
        saveSettings();
        updateButtonState();
        closeModal('voiceModal');
        showToast('Voice commands enabled! Click the mic button to speak.');
    }

    /**
     * Update voice button visual state
     */
    function updateButtonState() {
        if (settings.enabled) {
            voiceBtn.classList.add('enabled');
            voiceBtn.title = 'Click to speak a command';
        } else {
            voiceBtn.classList.remove('enabled');
            voiceBtn.title = 'Voice Commands - Click to set up';
        }
    }

    /**
     * Initialize Web Speech API
     */
    function initSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            isListening = true;
            voiceBtn.classList.add('listening');
            showToast('Listening...');
        };

        recognition.onresult = (event) => {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }

            // Check if final result
            if (event.results[event.results.length - 1].isFinal) {
                processVoiceCommand(transcript);
            }
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            isListening = false;
            voiceBtn.classList.remove('listening');

            if (event.error === 'not-allowed') {
                showToast('Microphone access denied. Please allow microphone access.');
            } else if (event.error !== 'aborted') {
                showToast('Voice recognition error. Please try again.');
            }
        };

        recognition.onend = () => {
            isListening = false;
            voiceBtn.classList.remove('listening');
        };
    }

    /**
     * Start listening for voice input
     */
    function startListening() {
        if (!recognition) {
            showToast('Voice recognition failed to initialize. Try Chrome or Edge browser.');
            return;
        }

        try {
            recognition.start();
        } catch (e) {
            console.error('Failed to start recognition:', e);
        }
    }

    /**
     * Stop listening for voice input
     */
    function stopListening() {
        if (recognition && isListening) {
            recognition.stop();
        }
    }

    /**
     * Process voice command through LLM
     */
    async function processVoiceCommand(transcript) {
        showToast(`Processing: "${transcript}"`);

        try {
            // Get current app state for context
            const context = getAppContext();

            // Send to LLM
            const response = await sendToLLM(transcript, context);

            // Execute the command first
            if (response.action && response.action !== 'none') {
                executeCommand(response);
                // Clear conversation history after successful action
                conversationHistory = [];
            } else if (response.message && !response.message.includes("didn't quite catch")) {
                // Only track history for valid responses (not fallback errors)
                conversationHistory.push({
                    user: transcript,
                    assistant: response.message
                });
                // Keep only last 2 exchanges (4 items)
                if (conversationHistory.length > 4) {
                    conversationHistory.shift();
                }
            }

            // Provide default messages for actions without one
            if (!response.message && response.action) {
                switch (response.action) {
                    case 'openShip':
                        response.message = `Opening ${response.shipName || 'ship'}. What would you like to change?`;
                        break;
                    case 'addShip':
                        response.message = `Adding ${response.shipName || 'ship'} to your fleet.`;
                        break;
                    case 'removeShip':
                        response.message = `Confirm deletion of ${response.shipName || 'ship'}?`;
                        break;
                    case 'showStorage':
                        response.message = 'Here is your storage.';
                        break;
                    case 'search':
                        response.message = `Searching for ${response.query || 'items'}.`;
                        break;
                    case 'editStorage':
                        response.message = `Updating ${response.componentName || 'component'} quantity.`;
                        break;
                }
            }

            // Speak the response
            if (response.message) {
                showToast(response.message);

                // Auto-restart listening in these cases:
                // 1. LLM is asking a follow-up question (check for ? or clarification phrases)
                // 2. After opening a ship (user likely wants to set components)
                // 3. After showing storage (user might want to query items)
                // 4. After editing storage (user might want to make more changes)
                const isAskingForClarification = response.action === 'none' && (
                    response.message.includes('?') ||
                    response.message.toLowerCase().includes('please provide') ||
                    response.message.toLowerCase().includes('which ship') ||
                    response.message.toLowerCase().includes('what ship') ||
                    response.message.toLowerCase().includes('name of the ship')
                );
                const shouldAutoListen =
                    isAskingForClarification ||
                    response.action === 'openShip' ||
                    response.action === 'showStorage' ||
                    response.action === 'setComponent' ||
                    response.action === 'editStorage';

                if (shouldAutoListen) {
                    // Speak and auto-listen when TTS completes
                    speak(response.message, () => {
                        if (!isListening) {
                            showToast('Listening...');
                            startListening();
                        }
                    });
                } else {
                    // Just speak without auto-listen
                    speak(response.message);
                }
            }

        } catch (error) {
            console.error('Voice command error:', error);
            console.error('Error details:', error.message, error.stack);
            let errorMsg = 'Sorry, I had trouble processing that command.';

            // Provide more specific error messages
            if (error.message && error.message.includes('Failed to fetch') || error.message && error.message.includes('NetworkError')) {
                errorMsg = 'API connection failed. Anthropic requires server-side calls - try Google instead.';
            } else if (error.message && (error.message.includes('401') || error.message.includes('Unauthorized'))) {
                errorMsg = 'Invalid API key. Please check your key in settings.';
            } else if (error.message && error.message.includes('429')) {
                errorMsg = 'Rate limited. Please wait a moment and try again.';
            } else if (error.message && error.message.includes('CORS')) {
                errorMsg = 'Browser blocked the request. Try using Google Gemini instead.';
            } else if (error.message) {
                // Show actual error for debugging
                console.error('Actual error:', error.message);
                errorMsg = `Error: ${error.message.substring(0, 100)}`;
            }

            speak(errorMsg);
            showToast(errorMsg);
        }
    }

    /**
     * Get current app context for LLM
     */
    function getAppContext() {
        // Get user's ships
        const ships = typeof appData !== 'undefined' ? appData.ships : [];
        const storage = typeof appData !== 'undefined' ? appData.storage : [];

        // Get available ships from database
        const availableShips = typeof SC_DATA !== 'undefined' ?
            SC_DATA.ships.map(s => s.name) : [];

        // Check if ship modal is open and get current ship details
        let editingShip = null;
        const shipModal = document.getElementById('shipModal');
        const shipNameSelect = document.getElementById('shipName');
        if (shipModal && !shipModal.classList.contains('hidden') && shipNameSelect && shipNameSelect.value) {
            const shipSpec = SC_DATA.ships.find(s => s.name === shipNameSelect.value);
            if (shipSpec) {
                editingShip = {
                    name: shipSpec.name,
                    slots: {
                        coolers: shipSpec.coolers,
                        shields: shipSpec.shields,
                        powerPlants: shipSpec.powerPlants,
                        quantumDrive: shipSpec.quantumDrive,
                        pilotWeapons: shipSpec.pilotWeapons,
                        turrets: shipSpec.turrets
                    }
                };
            }
        }

        return {
            userShips: ships.map(s => ({
                name: s.name,  // Use s.name, not s.shipName
                nickname: s.nickname
            })),
            storageCount: storage.length,
            storageItems: storage, // Include full storage for queryStorage
            availableShips: availableShips.slice(0, 50), // Limit for context size
            editingShip: editingShip,
            recentExchanges: conversationHistory.slice(-4) // Last 2 exchanges
        };
    }

    /**
     * Send command to LLM API
     */
    async function sendToLLM(transcript, context) {
        const provider = PROVIDERS[settings.provider];
        if (!provider) {
            throw new Error('Invalid provider');
        }

        const systemPrompt = buildSystemPrompt(context);

        switch (settings.provider) {
            case 'openai':
                return await sendToOpenAI(transcript, systemPrompt, provider);
            case 'anthropic':
                return await sendToAnthropic(transcript, systemPrompt, provider);
            case 'google':
                return await sendToGoogle(transcript, systemPrompt, provider);
            default:
                throw new Error('Unknown provider');
        }
    }

    /**
     * Build system prompt with app context
     */
    function buildSystemPrompt(context) {
        // Format storage items for context
        const storageList = context.storageItems && context.storageItems.length > 0
            ? context.storageItems.map(item => `${item.name} (x${item.quantity || 1})`).join(', ')
            : 'empty';

        // Check if we're in the middle of an addShip conversation
        const pendingAddShip = context.recentExchanges && context.recentExchanges.some(e =>
            e.assistant && (e.assistant.includes('which ship') || e.assistant.includes('What ship') || e.assistant.includes('name of the ship'))
        );

        let prompt = `You are a voice assistant for the SC Component Tracker app. Respond with JSON only.

## EXAMPLES (follow these exactly):

User: "add a gladius" → {"action":"addShip","shipName":"gladius","message":"Adding gladius."}
User: "add F7A Mark 2" → {"action":"addShip","shipName":"F7A Mark 2","message":"Adding F7A Mark 2."}
User: "add the Hornet" → {"action":"addShip","shipName":"Hornet","message":"Adding Hornet."}
User: "F7A Hornet Mark 2" → {"action":"addShip","shipName":"F7A Hornet Mark 2","message":"Adding F7A Hornet Mark 2."}
User: "open Gladius" → {"action":"openShip","shipName":"Gladius","message":"Opening Gladius."}
User: "edit Gladius" → {"action":"openShip","shipName":"Gladius","message":"Opening Gladius."}
User: "edit 100i" → {"action":"openShip","shipName":"100i","message":"Opening 100i."}
User: "save ship" → {"action":"saveShip","message":"Saving ship."}
User: "save" → {"action":"saveShip","message":"Saving ship."}
User: "show storage" → {"action":"showStorage","message":"Here's your storage."}
User: "set arctic to 5" → {"action":"editStorage","componentName":"arctic","quantity":5,"message":"Setting arctic to 5."}
User: "close" → {"action":"close","message":"Done."}

## ACTIONS:

- addShip: {"action":"addShip","shipName":"<exact words user said>"} - Use for ANY ship name. ALWAYS include shipName.
- removeShip: {"action":"removeShip","shipName":"..."}
- openShip: {"action":"openShip","shipName":"..."} - Use when user says "open [ship]" or "edit [ship]"
- saveShip: {"action":"saveShip"} - Use when user says "save ship" or "save" (only when editing a ship)
- showStorage: {"action":"showStorage"}
- editStorage: {"action":"editStorage","componentName":"...","quantity":N}
- queryStorage: {"action":"queryStorage","componentName":"..."}
- setComponent: {"action":"setComponent","slotType":"cooler|shield|powerPlant|quantumDrive|weapon","componentName":"...","slotIndex":0}
- search: {"action":"search","query":"..."}
- close: {"action":"close"}
- none: {"action":"none","message":"..."} - ONLY for greetings or unrelated questions

## CONTEXT:

User's ships: ${JSON.stringify(context.userShips)}
Storage: ${storageList}
${context.editingShip ? `Editing: ${context.editingShip.name}` : ''}
${pendingAddShip ? '\n** USER IS RESPONDING TO "WHICH SHIP?" - Their response IS the ship name. Use addShip! **' : ''}`;

        // Add conversation history if available
        if (context.recentExchanges && context.recentExchanges.length > 0) {
            prompt += `\n\nRecent:\n`;
            context.recentExchanges.forEach(exchange => {
                prompt += `User: "${exchange.user}" → Assistant: ${exchange.assistant}\n`;
            });
        }

        prompt += `\n\n## CRITICAL RULES:
1. "edit [ship]" or "open [ship]" → use openShip (NOT addShip, NOT editStorage)
2. "add [ship]" or just "[ship name]" → use addShip with exact ship name
3. "set [component] to [number]" → use editStorage (NOT openShip)
4. NEVER ask "which ship" - just use the action with whatever ship name they said
5. The app handles fuzzy matching - pass through names exactly as spoken`;

        return prompt;
    }

    /**
     * Send to OpenAI API
     */
    async function sendToOpenAI(transcript, systemPrompt, provider) {
        const response = await fetch(provider.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${settings.apiKey}`
            },
            body: JSON.stringify({
                model: provider.model,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: transcript }
                ],
                response_format: { type: 'json_object' },
                max_tokens: 200
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'OpenAI API error');
        }

        const data = await response.json();
        return parseJsonResponse(data.choices[0].message.content);
    }

    /**
     * Send to Anthropic API
     */
    async function sendToAnthropic(transcript, systemPrompt, provider) {
        const response = await fetch(provider.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': settings.apiKey,
                'anthropic-version': '2023-06-01',
                'anthropic-dangerous-direct-browser-access': 'true'
            },
            body: JSON.stringify({
                model: provider.model,
                max_tokens: 200,
                system: systemPrompt,
                messages: [
                    { role: 'user', content: transcript + '\n\nRespond with JSON only.' }
                ]
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Anthropic API error');
        }

        const data = await response.json();
        return parseJsonResponse(data.content[0].text);
    }

    /**
     * Send to Google API
     */
    async function sendToGoogle(transcript, systemPrompt, provider) {
        const endpoint = `${provider.endpoint}?key=${settings.apiKey}`;
        console.log('Sending to Google API:', endpoint.replace(settings.apiKey, '***'));

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: systemPrompt + '\n\nUser command: ' + transcript + '\n\nRespond with JSON only.'
                    }]
                }],
                generationConfig: {
                    maxOutputTokens: 500,
                    responseMimeType: 'application/json'
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Google API error response:', response.status, errorText);

            // Check status code directly for common errors
            if (response.status === 429) {
                throw new Error('429 Rate limited');
            } else if (response.status === 401 || response.status === 403) {
                throw new Error('401 Unauthorized - check API key');
            }

            try {
                const error = JSON.parse(errorText);
                throw new Error(error.error?.message || `Google API error: ${response.status}`);
            } catch (e) {
                if (e.message.includes('429') || e.message.includes('401')) throw e;
                throw new Error(`Google API error: ${response.status} - ${errorText.substring(0, 100)}`);
            }
        }

        const data = await response.json();
        console.log('Google API response:', JSON.stringify(data).substring(0, 500));

        // Safely extract content with error checking
        if (!data.candidates || !data.candidates[0]) {
            console.error('No candidates in response:', data);
            throw new Error('No response from API - check your API key or try again');
        }

        const candidate = data.candidates[0];
        if (!candidate.content || !candidate.content.parts || !candidate.content.parts[0]) {
            console.error('Invalid candidate structure:', candidate);
            throw new Error('Invalid API response structure');
        }

        const content = candidate.content.parts[0].text;
        return parseJsonResponse(content);
    }

    /**
     * Safely parse JSON from LLM response, handling edge cases
     */
    function parseJsonResponse(content) {
        // Try direct parse first
        try {
            return JSON.parse(content);
        } catch (e) {
            // Try to extract JSON object from the text
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                try {
                    return JSON.parse(jsonMatch[0]);
                } catch (e2) {
                    // JSON is malformed, try to salvage what we can
                    console.warn('Malformed JSON from LLM:', content);
                }
            }
            // Return a safe fallback
            return {
                action: 'none',
                message: "I didn't quite catch that. Could you try again?"
            };
        }
    }

    /**
     * Execute the parsed command
     */
    function executeCommand(response) {
        switch (response.action) {
            case 'addShip':
                if (response.shipName) {
                    // Normalize ship name for matching
                    const normalizeShipName = (name) => {
                        return name.toLowerCase()
                            .replace(/\s+/g, ' ')
                            .replace(/mark\s*2/gi, 'mk ii')
                            .replace(/mark\s*ii/gi, 'mk ii')
                            .replace(/mk\s*2/gi, 'mk ii')
                            .replace(/m\s*k\s*2/gi, 'mk ii')
                            .replace(/m\s*k\s*i\s*i/gi, 'mk ii')
                            .trim();
                    };

                    const searchName = normalizeShipName(response.shipName);

                    // Find ship in database with fuzzy matching
                    const shipData = SC_DATA.ships.find(s => {
                        const dbName = normalizeShipName(s.name);
                        // Check if search matches any part of the db name or vice versa
                        return dbName.includes(searchName) || searchName.includes(dbName) ||
                               // Also check without manufacturer prefix
                               dbName.split(' ').slice(1).join(' ').includes(searchName);
                    });

                    if (shipData) {
                        // Open ship modal with pre-selected ship
                        openModal('shipModal');
                        document.getElementById('shipModalTitle').textContent = 'Add Ship';
                        document.getElementById('shipName').value = shipData.name;
                        // Trigger change event to populate slots
                        document.getElementById('shipName').dispatchEvent(new Event('change'));
                    } else {
                        response.message = `Could not find a ship matching "${response.shipName}". Try saying the full name.`;
                    }
                }
                break;

            case 'removeShip':
                if (response.shipName) {
                    // Find user's ship
                    const searchName = response.shipName.toLowerCase();
                    const userShip = appData.ships.find(s => {
                        const shipName = (s.name || '').toLowerCase();  // Use s.name, not s.shipName
                        const nickname = (s.nickname || '').toLowerCase();
                        // Check both directions: user's name includes search OR search includes user's name
                        return (shipName && (shipName.includes(searchName) || searchName.includes(shipName))) ||
                               (nickname && (nickname.includes(searchName) || searchName.includes(nickname)));
                    });
                    if (userShip) {
                        // Confirm deletion - set up the delete modal
                        window.pendingDelete = { type: 'ship', id: userShip.id };
                        document.getElementById('deleteMessage').textContent =
                            `Delete ${userShip.nickname || userShip.name}?`;
                        openModal('deleteModal');
                    } else {
                        showToast(`Ship "${response.shipName}" not found in your fleet.`);
                    }
                }
                break;

            case 'openShip':
                if (response.shipName) {
                    const searchName = response.shipName.toLowerCase();
                    console.log('openShip: searching for:', searchName);
                    console.log('openShip: user ships:', appData.ships.map(s => ({ name: s.name, nick: s.nickname })));
                    const userShip = appData.ships.find(s => {
                        const shipName = (s.name || '').toLowerCase();  // Use s.name, not s.shipName
                        const nickname = (s.nickname || '').toLowerCase();
                        // Check both directions: user's name includes search OR search includes user's name
                        const nameMatch = shipName && (shipName.includes(searchName) || searchName.includes(shipName));
                        const nickMatch = nickname && (nickname.includes(searchName) || searchName.includes(nickname));
                        console.log(`  checking "${shipName}" / "${nickname}": nameMatch=${nameMatch}, nickMatch=${nickMatch}`);
                        return nameMatch || nickMatch;
                    });
                    if (userShip && typeof window.openShipModal === 'function') {
                        console.log('openShip: found ship, opening modal for id:', userShip.id);
                        window.openShipModal(userShip.id);
                    } else if (!userShip) {
                        console.log('openShip: no ship found');
                        showToast(`Ship "${response.shipName}" not found in your fleet.`);
                    } else {
                        console.log('openShip: openShipModal function not available:', typeof window.openShipModal);
                    }
                }
                break;

            case 'search':
                if (response.query) {
                    const searchInput = document.getElementById('searchInput');
                    if (searchInput) {
                        searchInput.value = response.query;
                        searchInput.dispatchEvent(new Event('input'));
                        searchInput.focus();
                    }
                }
                break;

            case 'showStorage':
                if (typeof window.renderStorage === 'function') {
                    window.renderStorage();
                }
                openModal('storageListModal');
                break;

            case 'queryStorage':
                if (response.componentName) {
                    const result = queryStorageForComponent(response.componentName);
                    // The message from LLM should already include the count,
                    // but we can update it with accurate info
                    if (result.count === 0) {
                        response.message = `You don't have any ${response.componentName} in storage.`;
                    } else if (result.count === 1) {
                        response.message = `You have 1 ${result.items[0].name} in storage.`;
                    } else {
                        response.message = `You have ${result.count} ${response.componentName} components in storage: ${result.items.map(i => i.name + ' (x' + i.quantity + ')').join(', ')}.`;
                    }
                }
                break;

            case 'setComponent':
                handleSetComponent(response);
                break;

            case 'saveShip':
                // Save the currently edited ship by submitting the form
                const shipForm = document.getElementById('shipForm');
                const shipModal = document.getElementById('shipModal');
                if (shipModal && !shipModal.classList.contains('hidden') && shipForm) {
                    shipForm.requestSubmit();
                    response.message = 'Ship saved.';
                } else {
                    response.message = 'No ship is currently being edited.';
                }
                break;

            case 'close':
                // Close any open modal
                const openModals = document.querySelectorAll('.modal:not(.hidden)');
                openModals.forEach(modal => {
                    modal.classList.add('hidden');
                });
                if (!response.message) {
                    response.message = 'Done.';
                }
                break;

            case 'editStorage':
                if (response.componentName) {
                    const storage = typeof appData !== 'undefined' ? appData.storage : [];
                    const searchTerm = response.componentName.toLowerCase().replace(/\s+/g, '');

                    // Find matching item in storage
                    const itemIndex = storage.findIndex(item => {
                        const nameNormalized = (item.name || '').toLowerCase().replace(/\s+/g, '');
                        return nameNormalized.includes(searchTerm) || searchTerm.includes(nameNormalized);
                    });

                    if (itemIndex === -1) {
                        response.message = `Could not find ${response.componentName} in your storage.`;
                    } else {
                        const item = storage[itemIndex];
                        const newQuantity = parseInt(response.quantity, 10);

                        if (isNaN(newQuantity) || newQuantity < 0) {
                            response.message = `Invalid quantity. Please say a number like "set to 5".`;
                        } else if (newQuantity === 0) {
                            // Remove item from storage
                            storage.splice(itemIndex, 1);
                            if (typeof window.saveData === 'function') {
                                window.saveData();
                            }
                            if (typeof window.renderStorage === 'function') {
                                window.renderStorage();
                            }
                            response.message = `Removed ${item.name} from storage.`;
                        } else {
                            // Update quantity
                            const oldQuantity = item.quantity || 1;
                            item.quantity = newQuantity;
                            if (typeof window.saveData === 'function') {
                                window.saveData();
                            }
                            if (typeof window.renderStorage === 'function') {
                                window.renderStorage();
                            }
                            response.message = `Updated ${item.name} from ${oldQuantity} to ${newQuantity}.`;
                        }
                    }
                } else {
                    response.message = "Which component do you want to edit?";
                }
                break;

            case 'none':
            default:
                // No action needed, just the message
                break;
        }
    }

    /**
     * Query storage for components matching a name
     */
    function queryStorageForComponent(componentName) {
        const storage = typeof appData !== 'undefined' ? appData.storage : [];
        const searchTerm = componentName.toLowerCase();

        const matches = storage.filter(item =>
            item.name && item.name.toLowerCase().includes(searchTerm)
        );

        const totalCount = matches.reduce((sum, item) => sum + (item.quantity || 1), 0);

        return {
            count: totalCount,
            items: matches.map(item => ({
                name: item.name,
                quantity: item.quantity || 1,
                type: item.type,
                size: item.size
            }))
        };
    }

    /**
     * Handle setComponent action - validates and sets component on current ship
     */
    function handleSetComponent(response) {
        const { slotType, componentName, slotIndex = 0 } = response;

        // Check if ship modal is open
        const shipModal = document.getElementById('shipModal');
        if (!shipModal || shipModal.classList.contains('hidden')) {
            response.message = "Please open a ship first before changing components.";
            return;
        }

        // Get current ship spec
        const shipNameSelect = document.getElementById('shipName');
        if (!shipNameSelect || !shipNameSelect.value) {
            response.message = "Please select a ship first.";
            return;
        }

        const shipSpec = SC_DATA.ships.find(s => s.name === shipNameSelect.value);
        if (!shipSpec) {
            response.message = "Ship not found in database.";
            return;
        }

        // Map slot types to their selectors and size info
        // Note: weapons are organized by size in SC_DATA.weapons[size], not a flat array
        const slotMapping = {
            cooler: { selector: 'coolerSlots', spec: shipSpec.coolers, db: SC_DATA.coolers },
            shield: { selector: 'shieldSlots', spec: shipSpec.shields, db: SC_DATA.shields },
            powerPlant: { selector: 'powerPlantSlots', spec: shipSpec.powerPlants, db: SC_DATA.powerPlants },
            quantumDrive: { selector: 'quantumDriveSlots', spec: shipSpec.quantumDrive, db: SC_DATA.quantumDrives },
            weapon: { selector: 'pilotWeaponSlots', spec: shipSpec.pilotWeapons, db: null } // Handle weapons separately
        };

        const mapping = slotMapping[slotType];
        if (!mapping) {
            response.message = `Unknown slot type: ${slotType}. Try cooler, shield, powerPlant, quantumDrive, or weapon.`;
            return;
        }

        // Find the slot size
        let slotSize;
        if (slotType === 'quantumDrive') {
            slotSize = mapping.spec.size;
        } else if (slotType === 'weapon') {
            if (slotIndex >= mapping.spec.length) {
                response.message = `Invalid weapon slot. This ship has ${mapping.spec.length} pilot weapon slots.`;
                return;
            }
            slotSize = mapping.spec[slotIndex].size;
        } else {
            slotSize = mapping.spec.size;
        }

        // Find matching components in database
        // Normalize search term: remove spaces and compare case-insensitively
        const searchTerm = componentName.toLowerCase().replace(/\s+/g, '');

        let matches = [];
        let allMatches = [];

        if (slotType === 'weapon') {
            // Weapons are organized by size: SC_DATA.weapons[1], SC_DATA.weapons[2], etc.
            // Search all sizes up to and including slotSize
            for (let size = 1; size <= slotSize; size++) {
                const weaponsOfSize = SC_DATA.weapons[size] || [];
                for (const weapon of weaponsOfSize) {
                    const nameNormalized = weapon.name.toLowerCase().replace(/\s+/g, '');
                    if (nameNormalized.includes(searchTerm) || searchTerm.includes(nameNormalized)) {
                        matches.push({ ...weapon, size });
                    }
                }
            }
            // Also check larger sizes for "doesn't fit" message
            for (let size = slotSize + 1; size <= 10; size++) {
                const weaponsOfSize = SC_DATA.weapons[size] || [];
                for (const weapon of weaponsOfSize) {
                    const nameNormalized = weapon.name.toLowerCase().replace(/\s+/g, '');
                    if (nameNormalized.includes(searchTerm) || searchTerm.includes(nameNormalized)) {
                        allMatches.push({ ...weapon, size });
                    }
                }
            }
            allMatches = [...matches, ...allMatches];
        } else {
            // Other components are flat arrays with size property
            matches = mapping.db.filter(comp => {
                const nameNormalized = comp.name.toLowerCase().replace(/\s+/g, '');
                return (nameNormalized.includes(searchTerm) || searchTerm.includes(nameNormalized)) && comp.size <= slotSize;
            });
            allMatches = mapping.db.filter(comp => {
                const nameNormalized = comp.name.toLowerCase().replace(/\s+/g, '');
                return nameNormalized.includes(searchTerm) || searchTerm.includes(nameNormalized);
            });
        }

        if (matches.length === 0) {
            // Check if there are matches but they don't fit
            if (allMatches.length > 0) {
                const sizes = [...new Set(allMatches.map(c => c.size))].sort();
                response.message = `Found ${componentName} but it doesn't fit. This slot is size ${slotSize}, but ${componentName} comes in size ${sizes.join(', ')}.`;
            } else {
                response.message = `No ${slotType} found matching "${componentName}".`;
            }
            return;
        }

        if (matches.length > 1) {
            // Multiple matches - ask for clarification
            const options = matches.slice(0, 4).map(c => `${c.name} (S${c.size})`).join(', ');
            response.message = `Multiple matches found: ${options}. Which one do you want?`;
            response.action = 'none'; // Don't complete action, wait for clarification
            return;
        }

        // Single match - apply the component
        const component = matches[0];
        const slotContainer = document.getElementById(mapping.selector);
        if (!slotContainer) {
            response.message = "Could not find the slot on the form.";
            return;
        }

        // Find the select element (first one for single slots, or by index for multiple)
        const selects = slotContainer.querySelectorAll('select');
        const targetSelect = selects[slotIndex];
        if (!targetSelect) {
            response.message = `Slot ${slotIndex + 1} not found.`;
            return;
        }

        // Set the value
        targetSelect.value = component.name;
        targetSelect.dispatchEvent(new Event('change'));

        response.message = `Set ${slotType} to ${component.name}.`;
    }

    /**
     * Speak text using TTS
     * @param {string} text - Text to speak
     * @param {function} onEnd - Optional callback when speech ends
     */
    function speak(text, onEnd) {
        if (!synthesis) return;

        // Cancel any ongoing speech
        synthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        if (onEnd) {
            utterance.onend = onEnd;
        }

        synthesis.speak(utterance);
    }

    /**
     * Show toast notification (uses app's toast if available)
     */
    function showToast(message) {
        if (typeof window.showToast === 'function') {
            window.showToast(message);
        } else {
            // Fallback
            const toast = document.getElementById('toast');
            if (toast) {
                toast.textContent = message;
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 3000);
            }
        }
    }

    /**
     * Open modal (uses app's modal functions if available)
     */
    function openModal(modalId) {
        if (typeof window.openModal === 'function') {
            window.openModal(modalId);
        } else {
            const modal = document.getElementById(modalId);
            if (modal) modal.classList.remove('hidden');
        }
    }

    /**
     * Close modal
     */
    function closeModal(modalId) {
        if (typeof window.closeModal === 'function') {
            window.closeModal(modalId);
        } else {
            const modal = document.getElementById(modalId);
            if (modal) modal.classList.add('hidden');
        }
    }

    /**
     * Disable voice commands
     */
    function disable() {
        settings.enabled = false;
        settings.apiKey = null;
        saveSettings();
        updateButtonState();
        showToast('Voice commands disabled');
    }

    // Public API
    return {
        init,
        disable,
        isEnabled: () => settings.enabled,
        isListening: () => isListening
    };
})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    VoiceCommands.init();
});
