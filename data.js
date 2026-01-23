// Star Citizen Ships and Components Database
// Component sizes: 1=Small, 2=Medium, 3=Large, 4=Capital
// Weapon sizes: 1-7 (S1-S7)

const SC_DATA = {
    // ============ WEAPONS BY SIZE ============
    weapons: {
        1: [ // Size 1
            { name: "CF-117 Bulldog", manufacturer: "Klaus & Werner", type: "Repeater" },
            { name: "DR Model-XJ1", manufacturer: "Joker Engineering", type: "Distortion Repeater" },
            { name: "Dominance-1", manufacturer: "Hurston Dynamics", type: "Scattergun" },
            { name: "Strife Mass Driver", manufacturer: "Apocalypse Arms", type: "Mass Driver" },
            { name: "SW16BR2 Sawbuck", manufacturer: "Behring", type: "Ballistic Repeater" },
            { name: "Suckerpunch", manufacturer: "Joker Engineering", type: "Distortion Cannon" },
            { name: "NN-13 Neutron Cannon", manufacturer: "MaxOx", type: "Neutron Cannon" },
            { name: "M3A Laser Cannon", manufacturer: "Behring", type: "Laser Cannon" },
            { name: "Omnisky III", manufacturer: "Amon & Reese", type: "Laser Cannon" },
            { name: "9-Series Longsword", manufacturer: "Behring", type: "Ballistic Cannon" },
            { name: "YellowJacket GT-210", manufacturer: "Gallenson Tactical", type: "Gatling" },
        ],
        2: [ // Size 2
            { name: "CF-227 Badger", manufacturer: "Klaus & Werner", type: "Repeater" },
            { name: "DR Model-XJ2", manufacturer: "Joker Engineering", type: "Distortion Repeater" },
            { name: "Dominance-2", manufacturer: "Hurston Dynamics", type: "Scattergun" },
            { name: "NDB-28 Neutron", manufacturer: "MaxOx", type: "Neutron Repeater" },
            { name: "M4A Laser Cannon", manufacturer: "Behring", type: "Laser Cannon" },
            { name: "Omnisky VI", manufacturer: "Amon & Reese", type: "Laser Cannon" },
            { name: "Scorpion GT-215", manufacturer: "Gallenson Tactical", type: "Gatling" },
            { name: "SW16BR3 Sawbuck", manufacturer: "Behring", type: "Ballistic Repeater" },
            { name: "Suckerpunch-2", manufacturer: "Joker Engineering", type: "Distortion Cannon" },
            { name: "Attrition-2", manufacturer: "Hurston Dynamics", type: "Repeater" },
            { name: "11-Series Broadsword", manufacturer: "Behring", type: "Ballistic Cannon" },
            { name: "Quarreler", manufacturer: "Esperia", type: "Laser Cannon" },
        ],
        3: [ // Size 3
            { name: "CF-337 Panther", manufacturer: "Klaus & Werner", type: "Repeater" },
            { name: "DR Model-XJ3", manufacturer: "Joker Engineering", type: "Distortion Repeater" },
            { name: "Dominance-3", manufacturer: "Hurston Dynamics", type: "Scattergun" },
            { name: "GT-870 Tarantula", manufacturer: "Gallenson Tactical", type: "Ballistic Cannon" },
            { name: "M5A Laser Cannon", manufacturer: "Behring", type: "Laser Cannon" },
            { name: "Omnisky IX", manufacturer: "Amon & Reese", type: "Laser Cannon" },
            { name: "NDB-30 Neutron", manufacturer: "MaxOx", type: "Neutron Repeater" },
            { name: "Mantis GT-220", manufacturer: "Gallenson Tactical", type: "Gatling" },
            { name: "Attrition-3", manufacturer: "Hurston Dynamics", type: "Repeater" },
            { name: "Predator", manufacturer: "KRIG", type: "Ballistic Gatling" },
            { name: "C-788 Combine", manufacturer: "KRIG", type: "Ballistic Cannon" },
            { name: "Tigerstrike T-19P", manufacturer: "Kruger", type: "Gatling" },
            { name: "Deadbolt III", manufacturer: "Apocalypse Arms", type: "Ballistic Cannon" },
            { name: "Suckerpunch-3", manufacturer: "Joker Engineering", type: "Distortion Cannon" },
        ],
        4: [ // Size 4
            { name: "CF-447 Rhino", manufacturer: "Klaus & Werner", type: "Repeater" },
            { name: "M6A Laser Cannon", manufacturer: "Behring", type: "Laser Cannon" },
            { name: "Omnisky XII", manufacturer: "Amon & Reese", type: "Laser Cannon" },
            { name: "Revenant Gatling", manufacturer: "Apocalypse Arms", type: "Gatling" },
            { name: "GT-870 Tarantula Mk2", manufacturer: "Gallenson Tactical", type: "Ballistic Cannon" },
            { name: "Attrition-4", manufacturer: "Hurston Dynamics", type: "Repeater" },
            { name: "Dominance-4", manufacturer: "Hurston Dynamics", type: "Scattergun" },
            { name: "Tigerstrike T-21", manufacturer: "Kruger", type: "Gatling" },
            { name: "S4 Laser Repeater", manufacturer: "BEHR", type: "Repeater" },
            { name: "Deadbolt IV", manufacturer: "Apocalypse Arms", type: "Ballistic Cannon" },
            { name: "Suckerpunch-4", manufacturer: "Joker Engineering", type: "Distortion Cannon" },
        ],
        5: [ // Size 5
            { name: "M7A Laser Cannon", manufacturer: "Behring", type: "Laser Cannon" },
            { name: "Omnisky XV", manufacturer: "Amon & Reese", type: "Laser Cannon" },
            { name: "AD5B Ballistic Gatling", manufacturer: "Apocalypse Arms", type: "Gatling" },
            { name: "CF-557 Galdereen", manufacturer: "Klaus & Werner", type: "Repeater" },
            { name: "Attrition-5", manufacturer: "Hurston Dynamics", type: "Repeater" },
            { name: "Deadbolt V", manufacturer: "Apocalypse Arms", type: "Ballistic Cannon" },
            { name: "C-788 Ballistic Cannon", manufacturer: "KRIG", type: "Ballistic Cannon" },
            { name: "SF7E Laser Cannon", manufacturer: "Kruger", type: "Laser Cannon" },
            { name: "Absolution Distortion", manufacturer: "Joker Engineering", type: "Distortion Cannon" },
        ],
        6: [ // Size 6
            { name: "CF-667 Mammoth", manufacturer: "Klaus & Werner", type: "Repeater" },
            { name: "M8A Laser Cannon", manufacturer: "Behring", type: "Laser Cannon" },
            { name: "Omnisky XVIII", manufacturer: "Amon & Reese", type: "Laser Cannon" },
            { name: "Attrition-6", manufacturer: "Hurston Dynamics", type: "Repeater" },
            { name: "AD6B Ballistic Gatling", manufacturer: "Apocalypse Arms", type: "Gatling" },
            { name: "S6 Laser Repeater", manufacturer: "Behring", type: "Repeater" },
            { name: "Revanent Ballistic Gatling", manufacturer: "Apocalypse Arms", type: "Gatling" },
        ],
        7: [ // Size 7
            { name: "SF7B Ballistic Gatling", manufacturer: "Ares", type: "Gatling" },
            { name: "SF7E Laser Cannon", manufacturer: "Ares", type: "Laser Cannon" },
            { name: "A03 Sledge Mass Driver", manufacturer: "Klaus & Werner", type: "Mass Driver" },
        ],
    },

    // ============ SHIPS WITH COMPONENT SLOTS ============
    // shields/powerPlants/coolers: { count: N, size: 1|2|3 } where 1=S, 2=M, 3=L
    // quantumDrive: { size: 1|2|3 }
    // weapons: array of { size: N } for each hardpoint
    ships: [
        // ===== AEGIS =====
        {
            name: "Aegis Avenger Stalker",
            manufacturer: "Aegis",
            size: "Small",
            weapons: [{ size: 3 }, { size: 2 }, { size: 2 }],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Aegis Avenger Titan",
            manufacturer: "Aegis",
            size: "Small",
            weapons: [{ size: 3 }, { size: 2 }, { size: 2 }],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Aegis Avenger Warlock",
            manufacturer: "Aegis",
            size: "Small",
            weapons: [{ size: 3 }, { size: 2 }, { size: 2 }],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Aegis Eclipse",
            manufacturer: "Aegis",
            size: "Medium",
            weapons: [{ size: 2 }, { size: 2 }],
            missiles: 3,
            shields: { count: 2, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Aegis Gladius",
            manufacturer: "Aegis",
            size: "Small",
            weapons: [{ size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Aegis Hammerhead",
            manufacturer: "Aegis",
            size: "Large",
            weapons: [{ size: 4 }, { size: 4 }, { size: 4 }, { size: 4 }, { size: 4 }, { size: 4 }],
            shields: { count: 2, size: 3 },
            powerPlants: { count: 2, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "Aegis Reclaimer",
            manufacturer: "Aegis",
            size: "Large",
            weapons: [{ size: 5 }],
            shields: { count: 2, size: 3 },
            powerPlants: { count: 2, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "Aegis Redeemer",
            manufacturer: "Aegis",
            size: "Large",
            weapons: [{ size: 3 }, { size: 3 }, { size: 5 }, { size: 5 }, { size: 3 }, { size: 3 }],
            shields: { count: 6, size: 2 },
            powerPlants: { count: 2, size: 4 },
            coolers: { count: 1, size: 3 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Aegis Retaliator Bomber",
            manufacturer: "Aegis",
            size: "Large",
            weapons: [{ size: 2 }, { size: 2 }, { size: 2 }, { size: 2 }, { size: 2 }, { size: 2 }],
            shields: { count: 6, size: 2 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Aegis Sabre",
            manufacturer: "Aegis",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 2, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Aegis Vanguard Harbinger",
            manufacturer: "Aegis",
            size: "Large",
            weapons: [{ size: 5 }, { size: 2 }, { size: 2 }, { size: 2 }, { size: 2 }],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Aegis Vanguard Sentinel",
            manufacturer: "Aegis",
            size: "Large",
            weapons: [{ size: 5 }, { size: 2 }, { size: 2 }, { size: 2 }, { size: 2 }],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Aegis Vanguard Warden",
            manufacturer: "Aegis",
            size: "Large",
            weapons: [{ size: 5 }, { size: 2 }, { size: 2 }, { size: 2 }, { size: 2 }],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },

        // ===== ANVIL =====
        {
            name: "Anvil Arrow",
            manufacturer: "Anvil",
            size: "Small",
            weapons: [{ size: 3 }, { size: 3 }, { size: 2 }, { size: 2 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Anvil C8 Pisces",
            manufacturer: "Anvil",
            size: "Small",
            weapons: [{ size: 1 }, { size: 1 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Anvil C8X Pisces Expedition",
            manufacturer: "Anvil",
            size: "Small",
            weapons: [{ size: 2 }, { size: 2 }, { size: 1 }, { size: 1 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Anvil Carrack",
            manufacturer: "Anvil",
            size: "Large",
            weapons: [{ size: 4 }, { size: 4 }, { size: 4 }, { size: 4 }],
            shields: { count: 2, size: 3 },
            powerPlants: { count: 2, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "Anvil F7C Hornet Mk I",
            manufacturer: "Anvil",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 2 }, { size: 2 }, { size: 3 }],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Anvil F7C Hornet Mk II",
            manufacturer: "Anvil",
            size: "Medium",
            weapons: [{ size: 4 }, { size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 2, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Anvil F7C-M Super Hornet",
            manufacturer: "Anvil",
            size: "Medium",
            weapons: [{ size: 4 }, { size: 3 }, { size: 3 }, { size: 2 }, { size: 2 }],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Anvil F7A Hornet Mk II",
            manufacturer: "Anvil",
            size: "Medium",
            weapons: [{ size: 4 }, { size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 2, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Anvil F8C Lightning",
            manufacturer: "Anvil",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }, { size: 2 }, { size: 2 }, { size: 2 }, { size: 2 }],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Anvil Hawk",
            manufacturer: "Anvil",
            size: "Small",
            weapons: [{ size: 2 }, { size: 2 }, { size: 2 }, { size: 2 }, { size: 2 }, { size: 2 }],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Anvil Hurricane",
            manufacturer: "Anvil",
            size: "Medium",
            weapons: [{ size: 4 }, { size: 4 }, { size: 4 }, { size: 4 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 2, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Anvil Terrapin",
            manufacturer: "Anvil",
            size: "Medium",
            weapons: [{ size: 2 }, { size: 2 }],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Anvil Valkyrie",
            manufacturer: "Anvil",
            size: "Large",
            weapons: [{ size: 4 }, { size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },

        // ===== ARGO =====
        {
            name: "ARGO MOLE",
            manufacturer: "ARGO",
            size: "Large",
            weapons: [],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "ARGO RAFT",
            manufacturer: "ARGO",
            size: "Medium",
            weapons: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },

        // ===== BANU =====
        {
            name: "Banu Defender",
            manufacturer: "Banu",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 2, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 2 }
        },

        // ===== CONSOLIDATED OUTLAND =====
        {
            name: "C.O. Mustang Alpha",
            manufacturer: "Consolidated Outland",
            size: "Small",
            weapons: [{ size: 1 }, { size: 1 }, { size: 1 }, { size: 1 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "C.O. Mustang Delta",
            manufacturer: "Consolidated Outland",
            size: "Small",
            weapons: [{ size: 2 }, { size: 2 }, { size: 1 }, { size: 1 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "C.O. Nomad",
            manufacturer: "Consolidated Outland",
            size: "Small",
            weapons: [{ size: 3 }, { size: 2 }, { size: 2 }],
            shields: { count: 3, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },

        // ===== CRUSADER =====
        {
            name: "Crusader A2 Hercules Starlifter",
            manufacturer: "Crusader",
            size: "Large",
            weapons: [{ size: 5 }, { size: 5 }, { size: 4 }, { size: 4 }],
            shields: { count: 2, size: 3 },
            powerPlants: { count: 2, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "Crusader Ares Inferno",
            manufacturer: "Crusader",
            size: "Medium",
            weapons: [{ size: 7 }],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Crusader Ares Ion",
            manufacturer: "Crusader",
            size: "Medium",
            weapons: [{ size: 7 }],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Crusader C2 Hercules Starlifter",
            manufacturer: "Crusader",
            size: "Large",
            weapons: [{ size: 4 }, { size: 4 }],
            shields: { count: 2, size: 3 },
            powerPlants: { count: 2, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "Crusader M2 Hercules Starlifter",
            manufacturer: "Crusader",
            size: "Large",
            weapons: [{ size: 5 }, { size: 5 }, { size: 4 }, { size: 4 }],
            shields: { count: 2, size: 3 },
            powerPlants: { count: 2, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "Crusader Mercury Star Runner",
            manufacturer: "Crusader",
            size: "Large",
            weapons: [{ size: 3 }, { size: 3 }, { size: 2 }, { size: 2 }],
            shields: { count: 1, size: 3 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Crusader Spirit A1",
            manufacturer: "Crusader",
            size: "Medium",
            weapons: [{ size: 4 }, { size: 4 }, { size: 2 }, { size: 2 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Crusader Spirit C1",
            manufacturer: "Crusader",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Crusader Spirit E1",
            manufacturer: "Crusader",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },

        // ===== DRAKE =====
        {
            name: "Drake Buccaneer",
            manufacturer: "Drake",
            size: "Small",
            weapons: [{ size: 4 }, { size: 3 }, { size: 3 }, { size: 1 }, { size: 1 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Drake Caterpillar",
            manufacturer: "Drake",
            size: "Large",
            weapons: [{ size: 2 }, { size: 2 }, { size: 2 }, { size: 2 }],
            shields: { count: 3, size: 3 },
            powerPlants: { count: 2, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "Drake Corsair",
            manufacturer: "Drake",
            size: "Large",
            weapons: [{ size: 5 }, { size: 5 }, { size: 4 }, { size: 4 }, { size: 3 }, { size: 3 }],
            shields: { count: 1, size: 3 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Drake Cutter",
            manufacturer: "Drake",
            size: "Small",
            weapons: [{ size: 1 }, { size: 1 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Drake Cutlass Black",
            manufacturer: "Drake",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Drake Cutlass Blue",
            manufacturer: "Drake",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Drake Cutlass Red",
            manufacturer: "Drake",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Drake Cutlass Steel",
            manufacturer: "Drake",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Drake Herald",
            manufacturer: "Drake",
            size: "Small",
            weapons: [{ size: 2 }, { size: 2 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Drake Vulture",
            manufacturer: "Drake",
            size: "Medium",
            weapons: [],
            shields: { count: 3, size: 1 },
            powerPlants: { count: 2, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },

        // ===== ESPERIA =====
        {
            name: "Esperia Blade",
            manufacturer: "Esperia",
            size: "Medium",
            weapons: [{ size: 4 }, { size: 3 }, { size: 3 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Esperia Glaive",
            manufacturer: "Esperia",
            size: "Medium",
            weapons: [{ size: 5 }, { size: 5 }, { size: 3 }, { size: 3 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Esperia Prowler",
            manufacturer: "Esperia",
            size: "Medium",
            weapons: [{ size: 5 }, { size: 5 }, { size: 3 }, { size: 3 }],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Esperia Talon",
            manufacturer: "Esperia",
            size: "Small",
            weapons: [{ size: 3 }, { size: 3 }],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },

        // ===== GATAC =====
        {
            name: "Gatac Railen",
            manufacturer: "Gatac",
            size: "Large",
            weapons: [{ size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Gatac Syulen",
            manufacturer: "Gatac",
            size: "Small",
            weapons: [{ size: 2 }, { size: 2 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },

        // ===== MISC =====
        {
            name: "MISC Freelancer",
            manufacturer: "MISC",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 3, size: 2 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "MISC Freelancer DUR",
            manufacturer: "MISC",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 3, size: 2 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "MISC Freelancer MAX",
            manufacturer: "MISC",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 3, size: 2 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "MISC Freelancer MIS",
            manufacturer: "MISC",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 3, size: 2 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "MISC Hull A",
            manufacturer: "MISC",
            size: "Small",
            weapons: [{ size: 2 }, { size: 2 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "MISC Hull C",
            manufacturer: "MISC",
            size: "Large",
            weapons: [{ size: 4 }, { size: 4 }, { size: 4 }, { size: 4 }, { size: 4 }, { size: 4 }],
            shields: { count: 2, size: 3 },
            powerPlants: { count: 2, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "MISC Prospector",
            manufacturer: "MISC",
            size: "Small",
            weapons: [{ size: 1 }],
            shields: { count: 3, size: 1 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 1 }
        },
        {
            name: "MISC Razor",
            manufacturer: "MISC",
            size: "Small",
            weapons: [{ size: 2 }, { size: 2 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "MISC Reliant Kore",
            manufacturer: "MISC",
            size: "Small",
            weapons: [{ size: 2 }, { size: 2 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "MISC Reliant Tana",
            manufacturer: "MISC",
            size: "Small",
            weapons: [{ size: 2 }, { size: 2 }, { size: 2 }, { size: 2 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "MISC Starfarer",
            manufacturer: "MISC",
            size: "Large",
            weapons: [{ size: 4 }, { size: 4 }, { size: 3 }, { size: 3 }],
            shields: { count: 2, size: 3 },
            powerPlants: { count: 2, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "MISC Starfarer Gemini",
            manufacturer: "MISC",
            size: "Large",
            weapons: [{ size: 5 }, { size: 5 }, { size: 3 }, { size: 3 }],
            shields: { count: 2, size: 3 },
            powerPlants: { count: 2, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },

        // ===== ORIGIN =====
        {
            name: "Origin 100i",
            manufacturer: "Origin",
            size: "Small",
            weapons: [{ size: 2 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Origin 125a",
            manufacturer: "Origin",
            size: "Small",
            weapons: [{ size: 2 }, { size: 1 }, { size: 1 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Origin 135c",
            manufacturer: "Origin",
            size: "Small",
            weapons: [{ size: 2 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Origin 300i",
            manufacturer: "Origin",
            size: "Small",
            weapons: [{ size: 3 }, { size: 2 }, { size: 2 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Origin 315p",
            manufacturer: "Origin",
            size: "Small",
            weapons: [{ size: 3 }, { size: 2 }, { size: 2 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Origin 325a",
            manufacturer: "Origin",
            size: "Small",
            weapons: [{ size: 4 }, { size: 3 }, { size: 3 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Origin 350r",
            manufacturer: "Origin",
            size: "Small",
            weapons: [{ size: 3 }, { size: 2 }, { size: 2 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Origin 400i",
            manufacturer: "Origin",
            size: "Medium",
            weapons: [{ size: 4 }, { size: 3 }, { size: 3 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Origin 600i Explorer",
            manufacturer: "Origin",
            size: "Large",
            weapons: [{ size: 5 }, { size: 4 }, { size: 4 }],
            shields: { count: 2, size: 3 },
            powerPlants: { count: 1, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "Origin 600i Touring",
            manufacturer: "Origin",
            size: "Large",
            weapons: [{ size: 5 }, { size: 4 }, { size: 4 }],
            shields: { count: 2, size: 3 },
            powerPlants: { count: 1, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "Origin 890 Jump",
            manufacturer: "Origin",
            size: "Capital",
            weapons: [{ size: 5 }, { size: 5 }, { size: 4 }, { size: 4 }, { size: 4 }, { size: 4 }],
            shields: { count: 3, size: 3 },
            powerPlants: { count: 3, size: 3 },
            coolers: { count: 3, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "Origin M50",
            manufacturer: "Origin",
            size: "Small",
            weapons: [{ size: 2 }, { size: 2 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },

        // ===== RSI =====
        {
            name: "RSI Aurora CL",
            manufacturer: "RSI",
            size: "Small",
            weapons: [{ size: 2 }, { size: 1 }, { size: 1 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "RSI Aurora ES",
            manufacturer: "RSI",
            size: "Small",
            weapons: [{ size: 2 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "RSI Aurora LN",
            manufacturer: "RSI",
            size: "Small",
            weapons: [{ size: 2 }, { size: 2 }, { size: 1 }, { size: 1 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "RSI Aurora LX",
            manufacturer: "RSI",
            size: "Small",
            weapons: [{ size: 2 }, { size: 1 }, { size: 1 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "RSI Aurora MR",
            manufacturer: "RSI",
            size: "Small",
            weapons: [{ size: 2 }, { size: 1 }, { size: 1 }],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "RSI Constellation Andromeda",
            manufacturer: "RSI",
            size: "Large",
            weapons: [{ size: 5 }, { size: 5 }, { size: 4 }, { size: 4 }],
            shields: { count: 1, size: 3 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "RSI Constellation Aquila",
            manufacturer: "RSI",
            size: "Large",
            weapons: [{ size: 5 }, { size: 5 }, { size: 4 }, { size: 4 }],
            shields: { count: 1, size: 3 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "RSI Constellation Phoenix",
            manufacturer: "RSI",
            size: "Large",
            weapons: [{ size: 5 }, { size: 5 }, { size: 4 }, { size: 4 }],
            shields: { count: 1, size: 3 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "RSI Constellation Taurus",
            manufacturer: "RSI",
            size: "Large",
            weapons: [{ size: 5 }, { size: 5 }, { size: 4 }, { size: 4 }],
            shields: { count: 1, size: 3 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "RSI Mantis",
            manufacturer: "RSI",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "RSI Scorpius",
            manufacturer: "RSI",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }, { size: 4 }, { size: 4 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "RSI Zeus Mk II CL",
            manufacturer: "RSI",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "RSI Zeus Mk II ES",
            manufacturer: "RSI",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "RSI Zeus Mk II MR",
            manufacturer: "RSI",
            size: "Medium",
            weapons: [{ size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
    ],

    // ============ COMPONENTS ============
    // size: 1=Small, 2=Medium, 3=Large

    shields: [
        // Size 1 (Small) - verified from starcitizen.tools
        { name: "AllStop", manufacturer: "Gorgon Defender", size: 1, grade: "C" },
        { name: "Bulwark", manufacturer: "Basilisk", size: 1, grade: "B" },
        { name: "FR-66", manufacturer: "Gorgon Defender", size: 1, grade: "B" },
        { name: "ForceWall", manufacturer: "Gorgon Defender", size: 1, grade: "D" },
        { name: "Guardian", manufacturer: "Gorgon Defender", size: 1, grade: "C" },
        { name: "INK", manufacturer: "Seal Corp", size: 1, grade: "C" },
        { name: "Mirage", manufacturer: "Gorgon Defender", size: 1, grade: "B" },
        { name: "Palisade", manufacturer: "Basilisk", size: 1, grade: "A" },
        { name: "SecureHyde", manufacturer: "Seal Corp", size: 1, grade: "C" },
        { name: "Shimmer", manufacturer: "Seal Corp", size: 1, grade: "D" },
        { name: "Targa", manufacturer: "Targa", size: 1, grade: "C" },
        { name: "Veil", manufacturer: "Gorgon Defender", size: 1, grade: "B" },
        { name: "WEB", manufacturer: "Yorm", size: 1, grade: "C" },

        // Size 2 (Medium) - verified from starcitizen.tools
        { name: "Aspis", manufacturer: "Gorgon Defender", size: 2, grade: "C" },
        { name: "5MA 'Chimalli'", manufacturer: "Imperial Starwerks", size: 2, grade: "C" },
        { name: "FR-76", manufacturer: "Gorgon Defender", size: 2, grade: "A" },
        { name: "FullStop", manufacturer: "Gorgon Defender", size: 2, grade: "B" },
        { name: "Rampart", manufacturer: "Basilisk", size: 2, grade: "A" },
        { name: "STOP", manufacturer: "Gorgon Defender", size: 2, grade: "C" },
        { name: "Sukoran", manufacturer: "Banu Souli", size: 2, grade: "C" },
        { name: "Umbra", manufacturer: "Seal Corp", size: 2, grade: "D" },
        { name: "Citadel", manufacturer: "Basilisk", size: 2, grade: "A" },
        { name: "Shroud", manufacturer: "Seal Corp", size: 2, grade: "B" },

        // Size 3 (Large) - verified from starcitizen.tools
        { name: "5CA 'Akura'", manufacturer: "Imperial Starwerks", size: 3, grade: "C" },
        { name: "Stronghold", manufacturer: "Basilisk", size: 3, grade: "A" },
        { name: "Barbican", manufacturer: "Basilisk", size: 3, grade: "B" },
        { name: "FR-86", manufacturer: "Gorgon Defender", size: 3, grade: "A" },
        { name: "FullBlock", manufacturer: "Gorgon Defender", size: 3, grade: "B" },
        { name: "GUARD", manufacturer: "Gorgon Defender", size: 3, grade: "C" },
        { name: "Parapet", manufacturer: "Basilisk", size: 3, grade: "B" },
        { name: "Ward", manufacturer: "Gorgon Defender", size: 3, grade: "C" },
    ],

    coolers: [
        // Size 1 (Small) - verified from starcitizen.tools
        { name: "ArcticStorm", manufacturer: "J-Span", size: 1, grade: "A" },
        { name: "Bracer", manufacturer: "Wen/Cassel", size: 1, grade: "C" },
        { name: "Endo", manufacturer: "Lightning Power", size: 1, grade: "C" },
        { name: "Frost-Star", manufacturer: "Tyler Design", size: 1, grade: "C" },
        { name: "HeatSafe", manufacturer: "Wen/Cassel", size: 1, grade: "D" },
        { name: "Polar", manufacturer: "J-Span", size: 1, grade: "C" },
        { name: "Ultra-Flow", manufacturer: "J-Span", size: 1, grade: "B" },
        { name: "VaporBlock", manufacturer: "J-Span", size: 1, grade: "B" },
        { name: "Winter-Star", manufacturer: "Tyler Design", size: 1, grade: "A" },
        { name: "ZeroRush", manufacturer: "Wen/Cassel", size: 1, grade: "A" },
        { name: "Thermax", manufacturer: "Lightning Power", size: 1, grade: "B" },
        { name: "SnowBlind", manufacturer: "Tyler Design", size: 1, grade: "A" },

        // Size 2 (Medium) - verified from starcitizen.tools
        { name: "Avalanche", manufacturer: "J-Span", size: 2, grade: "B" },
        { name: "ColdSnap", manufacturer: "J-Span", size: 2, grade: "C" },
        { name: "CoolCore", manufacturer: "J-Span", size: 2, grade: "D" },
        { name: "Frost-Star EX", manufacturer: "Tyler Design", size: 2, grade: "C" },
        { name: "Graupel", manufacturer: "J-Span", size: 2, grade: "C" },
        { name: "Snowfall", manufacturer: "Tyler Design", size: 2, grade: "B" },
        { name: "Snowpack", manufacturer: "Tyler Design", size: 2, grade: "A" },
        { name: "Winter-Star EX", manufacturer: "Tyler Design", size: 2, grade: "A" },
        { name: "Arctic", manufacturer: "J-Span", size: 2, grade: "B" },
        { name: "IceBox", manufacturer: "J-Span", size: 2, grade: "C" },

        // Size 3 (Large) - common large coolers
        { name: "Ice-Flush", manufacturer: "J-Span", size: 3, grade: "B" },
        { name: "Mercury", manufacturer: "J-Span", size: 3, grade: "C" },
        { name: "ThermalCore", manufacturer: "Lightning Power", size: 3, grade: "C" },
        { name: "Cryo-Star XL", manufacturer: "Tyler Design", size: 3, grade: "A" },
    ],

    powerPlants: [
        // Size 1 (Small) - verified from starcitizen.tools
        { name: "DeltaMax", manufacturer: "Lightning Power", size: 1, grade: "B" },
        { name: "Endurance", manufacturer: "Amon & Reese", size: 1, grade: "B" },
        { name: "Fierell Cascade", manufacturer: "Lightning Power", size: 1, grade: "A" },
        { name: "Fortitude", manufacturer: "Amon & Reese", size: 1, grade: "B" },
        { name: "IonBurst", manufacturer: "Lightning Power", size: 1, grade: "B" },
        { name: "JS-300", manufacturer: "J-Span", size: 1, grade: "C" },
        { name: "LumaCore", manufacturer: "Lightning Power", size: 1, grade: "A" },
        { name: "OverDrive", manufacturer: "J-Span", size: 1, grade: "D" },
        { name: "PowerBolt", manufacturer: "Lightning Power", size: 1, grade: "B" },
        { name: "QuadraCell", manufacturer: "Lightning Power", size: 1, grade: "C" },
        { name: "Regulus", manufacturer: "ACOM", size: 1, grade: "A" },
        { name: "Roughneck", manufacturer: "Sakura Sun", size: 1, grade: "C" },
        { name: "Slipstream", manufacturer: "Lightning Power", size: 1, grade: "A" },
        { name: "SonicLite", manufacturer: "Lightning Power", size: 1, grade: "B" },

        // Size 2 (Medium) - verified from starcitizen.tools
        { name: "Bolide", manufacturer: "Lightning Power", size: 2, grade: "D" },
        { name: "DayBreak", manufacturer: "ACOM", size: 2, grade: "A" },
        { name: "Diligence", manufacturer: "ACOM", size: 2, grade: "B" },
        { name: "Genoa", manufacturer: "ACOM", size: 2, grade: "C" },
        { name: "JS-400", manufacturer: "J-Span", size: 2, grade: "B" },
        { name: "Lotus", manufacturer: "Tyler Design", size: 2, grade: "B" },
        { name: "Maelstrom", manufacturer: "Lightning Power", size: 2, grade: "A" },
        { name: "Sedulity", manufacturer: "Sakura Sun", size: 2, grade: "A" },
        { name: "Trommel", manufacturer: "Amon & Reese", size: 2, grade: "D" },
        { name: "TurboDrive", manufacturer: "J-Span", size: 2, grade: "B" },

        // Size 3 (Large) - common large power plants
        { name: "Durable-Series", manufacturer: "Sakura Sun", size: 3, grade: "C" },
        { name: "Reliance", manufacturer: "Amon & Reese", size: 3, grade: "B" },
        { name: "Ginzel", manufacturer: "Amon & Reese", size: 3, grade: "C" },
        { name: "JS-500", manufacturer: "J-Span", size: 3, grade: "B" },
        { name: "SuperDrive", manufacturer: "J-Span", size: 3, grade: "C" },
        { name: "Durango", manufacturer: "ACOM", size: 3, grade: "A" },
    ],

    quantumDrives: [
        // Size 1 (Small) - verified from starcitizen.tools
        { name: "Atlas", manufacturer: "Tarsus", size: 1, grade: "B" },
        { name: "Beacon", manufacturer: "Tarsus", size: 1, grade: "D" },
        { name: "Colossus", manufacturer: "Roberts", size: 1, grade: "A" },
        { name: "Drift", manufacturer: "Roberts", size: 1, grade: "D" },
        { name: "Eos", manufacturer: "Roberts", size: 1, grade: "A" },
        { name: "Expedition", manufacturer: "Wei-Tek", size: 1, grade: "B" },
        { name: "FoxFire", manufacturer: "Tarsus", size: 1, grade: "C" },
        { name: "Goliath", manufacturer: "Roberts", size: 1, grade: "A" },
        { name: "Rush", manufacturer: "Wei-Tek", size: 1, grade: "A" },
        { name: "Siren", manufacturer: "Roberts", size: 1, grade: "C" },
        { name: "Spectre", manufacturer: "Roberts", size: 1, grade: "B" },
        { name: "VK-00", manufacturer: "Tarsus", size: 1, grade: "C" },
        { name: "Voyage", manufacturer: "Wei-Tek", size: 1, grade: "C" },
        { name: "Vulcan", manufacturer: "RAMP", size: 1, grade: "A" },

        // Size 2 (Medium) - verified from starcitizen.tools
        { name: "Hemera", manufacturer: "Roberts", size: 2, grade: "B" },
        { name: "Huracan", manufacturer: "RAMP", size: 2, grade: "A" },
        { name: "Odyssey", manufacturer: "Wei-Tek", size: 2, grade: "C" },
        { name: "XL-1", manufacturer: "Tarsus", size: 2, grade: "C" },
        { name: "Yeager", manufacturer: "RAMP", size: 2, grade: "B" },
        { name: "Crossfield", manufacturer: "Roberts", size: 2, grade: "B" },
        { name: "Bolt", manufacturer: "Tarsus", size: 2, grade: "C" },
        { name: "Cascade", manufacturer: "RAMP", size: 2, grade: "A" },
        { name: "Nova", manufacturer: "Roberts", size: 2, grade: "A" },
        { name: "Quest", manufacturer: "Wei-Tek", size: 2, grade: "B" },

        // Size 3 (Large) - common large quantum drives
        { name: "Erebos", manufacturer: "Roberts", size: 3, grade: "C" },
        { name: "TS-2", manufacturer: "Tarsus", size: 3, grade: "B" },
        { name: "Vortex", manufacturer: "RAMP", size: 3, grade: "A" },
        { name: "Pontes", manufacturer: "RAMP", size: 3, grade: "C" },
        { name: "Kama", manufacturer: "ArcCorp", size: 3, grade: "C" },
    ],
};

// Helper to get size label
SC_DATA.getSizeLabel = function(size) {
    const labels = { 1: 'Small (S1)', 2: 'Medium (S2)', 3: 'Large (S3)', 4: 'Capital' };
    return labels[size] || `Size ${size}`;
};

SC_DATA.getComponentSizeLabel = function(size) {
    const labels = { 1: 'S', 2: 'M', 3: 'L' };
    return labels[size] || `S${size}`;
};

// Stock loadouts extracted from game data (ships.json)
SC_DATA.stockLoadouts = {
    "Aegis Avenger Stalker": {
        quantumDrives: ["Expedition"],
        powerPlants: ["PowerBolt"],
        coolers: ["Bracer"],
        shields: ["Shimmer"],
        weapons: ["Revenant Gatling","Omnisky IX Cannon"]
    },
    "Aegis Avenger Titan": {
        quantumDrives: ["Expedition"],
        powerPlants: ["Endurance"],
        coolers: ["Bracer"],
        shields: ["Bulwark"],
        weapons: ["Revenant Gatling","Omnisky IX Cannon"]
    },
    "Aegis Avenger Titan Renegade": {
        quantumDrives: ["Expedition"],
        powerPlants: ["Endurance"],
        coolers: ["Bracer"],
        shields: ["Bulwark"],
        weapons: ["11-Series Broadsword Cannon","Omnisky IX Cannon"]
    },
    "Aegis Avenger Warlock": {
        quantumDrives: ["Expedition"],
        powerPlants: ["Regulus"],
        coolers: ["Bracer"],
        shields: ["Shimmer"],
        weapons: ["Revenant Gatling","Omnisky IX Cannon"]
    },
    "Aegis Eclipse": {
        quantumDrives: ["Drift"],
        powerPlants: ["DeltaMax"],
        coolers: ["VaporBlock"],
        shields: ["Veil"],
        weapons: ["CF-227 Badger Repeater"]
    },
    "Aegis Gladius": {
        quantumDrives: ["Beacon"],
        powerPlants: ["Regulus"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        weapons: ["CF-337 Panther Repeater","Mantis GT-220 Gatling"]
    },
    "Aegis Gladius Dunlevy": {
        quantumDrives: ["Beacon"],
        powerPlants: ["QuadraCell"],
        coolers: ["Glacier"],
        shields: ["FR-66"],
        weapons: ["CF-337 Panther Repeater","Mantis GT-220 Gatling"]
    },
    "Aegis Gladius Pirate": {
        quantumDrives: ["Expedition"],
        powerPlants: ["Charger"],
        coolers: ["Polar"],
        shields: ["SecureHyde"],
        weapons: ["CF-337 Panther Repeater","Mantis GT-220 Gatling"]
    },
    "Aegis Gladius Valiant": {
        quantumDrives: ["Beacon"],
        powerPlants: ["Regulus"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        weapons: ["Omnisky IX Cannon","CF-337 Panther Repeater"]
    },
    "Aegis Hammerhead": {
        quantumDrives: ["Kama"],
        powerPlants: ["SuperDrive"],
        coolers: ["Mercury"],
        shields: ["Stronghold"],
        weapons: ["CF-447 Rhino Repeater"]
    },
    "Aegis Hammerhead 2949 Best In Show Edition": {
        quantumDrives: ["Kama"],
        powerPlants: ["SuperDrive"],
        coolers: ["Mercury"],
        shields: ["Stronghold"],
        weapons: ["CF-447 Rhino Repeater"]
    },
    "Aegis Idris-M": {
        quantumDrives: ["Frontline"],
        powerPlants: ["Main Powerplant"],
        coolers: ["Exotherm"],
        shields: ["Holdstrong"],
        weapons: ["Revenant Gatling","CF-557 Galdereen Repeater","M9A Cannon","Destroyer Mass Driver Cannon","M2C \"Swarm\""]
    },
    "Aegis Idris-P": {
        quantumDrives: ["Frontline"],
        powerPlants: ["Main Powerplant"],
        coolers: ["Exotherm"],
        shields: ["Holdstrong"],
        weapons: ["Revenant Gatling","CF-557 Galdereen Repeater","M7A Cannon","M2C \"Swarm\""]
    },
    "Aegis Idris-P Wikelo War Special": {
        quantumDrives: ["Frontline"],
        powerPlants: ["Main Powerplant"],
        coolers: ["Exotherm"],
        shields: ["Holdstrong"],
        weapons: ["Revenant Gatling","Attrition-5 Repeater","M2C \"Swarm\""]
    },
    "Aegis Javelin": {
        quantumDrives: [],
        powerPlants: ["Main Powerplant"],
        coolers: [],
        shields: [],
        weapons: ["M9A Cannon"]
    },
    "Aegis Reclaimer": {
        quantumDrives: ["Kama"],
        powerPlants: ["Main Powerplant"],
        coolers: ["Algid"],
        shields: ["RS-Barrier"],
        weapons: ["CF-557 Galdereen Repeater","CF-337 Panther Repeater","M2C \"Swarm\""]
    },
    "Aegis Reclaimer 2949 Best In Show Edition": {
        quantumDrives: ["Kama"],
        powerPlants: ["Main Powerplant"],
        coolers: ["Algid"],
        shields: ["RS-Barrier"],
        weapons: ["CF-557 Galdereen Repeater","CF-337 Panther Repeater","M2C \"Swarm\""]
    },
    "Aegis Reclaimer Teach's Special": {
        quantumDrives: ["Kama"],
        powerPlants: ["Main Powerplant"],
        coolers: ["Algid"],
        shields: ["RS-Barrier"],
        weapons: ["CF-557 Galdereen Repeater","CF-337 Panther Repeater","M2C \"Swarm\""]
    },
    "Aegis Redeemer": {
        quantumDrives: ["Crossfield"],
        powerPlants: ["Centurion"],
        coolers: ["Blizzard"],
        shields: ["FullStop"],
        weapons: ["AD4B Ballistic Gatling","M5A Cannon","C-788 Cannon"]
    },
    "Aegis Retaliator": {
        quantumDrives: ["Crossfield"],
        powerPlants: ["Maelstrom"],
        coolers: ["Arctic"],
        shields: ["FullStop"],
        weapons: ["CF-337 Panther Repeater"]
    },
    "Aegis Sabre": {
        quantumDrives: ["Drift"],
        powerPlants: ["SonicLite"],
        coolers: ["Bracer"],
        shields: ["Shimmer"],
        weapons: ["CF-337 Panther Repeater"]
    },
    "Aegis Sabre Comet": {
        quantumDrives: ["Drift"],
        powerPlants: ["SonicLite"],
        coolers: ["Bracer"],
        shields: ["Shimmer"],
        weapons: ["Omnisky IX Cannon","PyroBurst Scattergun"]
    },
    "Aegis Sabre Firebird": {
        quantumDrives: ["Drift"],
        powerPlants: ["SonicLite","Charger"],
        coolers: ["Bracer"],
        shields: ["Shimmer"],
        weapons: ["Mantis GT-220 Gatling"]
    },
    "Aegis Sabre Firebird Wikelo War Special": {
        quantumDrives: ["VK-00"],
        powerPlants: ["QuadraCell"],
        coolers: ["Glacier"],
        shields: ["FR-66"],
        weapons: ["Mantis GT-220 Gatling"]
    },
    "Aegis Sabre Peregrine": {
        quantumDrives: ["Drift"],
        powerPlants: ["SonicLite","Charger"],
        coolers: ["Bracer"],
        shields: ["Shimmer"],
        weapons: []
    },
    "Aegis Sabre Peregrine Wikelo Speedy Special": {
        quantumDrives: ["FoxFire"],
        powerPlants: ["LumaCore"],
        coolers: ["ZeroRush"],
        shields: ["Jaghte"],
        weapons: []
    },
    "Aegis Sabre Raven": {
        quantumDrives: ["Drift"],
        powerPlants: ["SonicLite","Charger"],
        coolers: ["Bracer"],
        shields: ["Shimmer"],
        weapons: ["Quarreler Cannon"]
    },
    "Aegis Vanguard Harbinger": {
        quantumDrives: ["Yeager"],
        powerPlants: ["TurboDrive"],
        coolers: ["Permafrost"],
        shields: ["SecureShield"],
        weapons: ["Deadbolt V Cannon","CVSA Cannon","Jericho XL"]
    },
    "Aegis Vanguard Hoplite": {
        quantumDrives: ["Crossfield"],
        powerPlants: ["Maelstrom"],
        coolers: ["Arctic"],
        shields: ["FullStop"],
        weapons: ["Deadbolt V Cannon","BRVS Repeater","SW16BR2 “Sawbuck” Repeater"]
    },
    "Aegis Vanguard Sentinel": {
        quantumDrives: ["Nova"],
        powerPlants: ["GammaMax"],
        coolers: ["HeatSink"],
        shields: ["Sheut"],
        weapons: ["Attrition-5 Repeater","ATVS Repeater","Suckerpunch-L Cannon"]
    },
    "Aegis Vanguard Warden": {
        quantumDrives: ["Crossfield"],
        powerPlants: ["Maelstrom"],
        coolers: ["Arctic"],
        shields: ["FullStop"],
        weapons: ["Deadbolt V Cannon","MVSA Cannon","SW16BR2 “Sawbuck” Repeater"]
    },
    "Anvil Arrow": {
        quantumDrives: ["Beacon"],
        powerPlants: ["Regulus"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        weapons: ["YellowJacket GT-210 Gatling","CF-337 Panther Repeater"]
    },
    "Anvil Asgard": {
        quantumDrives: ["Odyssey"],
        powerPlants: ["Maelstrom"],
        coolers: ["Arctic"],
        shields: ["FullStop"],
        weapons: ["CF-447 Rhino Repeater","CF-337 Panther Repeater","YellowJacket GT-210 Gatling"]
    },
    "Anvil Asgard Wikelo War Special": {
        quantumDrives: ["Yeager"],
        powerPlants: ["Bolide"],
        coolers: ["Permafrost"],
        shields: ["CoverAll"],
        weapons: ["CF-447 Rhino Repeater","CF-337 Panther Repeater","Attrition-3 Repeater","YellowJacket GT-210 Gatling"]
    },
    "Anvil Ballista": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        weapons: ["Scorpion GT-215 Gatling"]
    },
    "Anvil Ballista Dunestalker": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        weapons: ["Scorpion GT-215 Gatling"]
    },
    "Anvil Ballista Snowblind": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        weapons: ["Scorpion GT-215 Gatling"]
    },
    "Anvil C8 Pisces": {
        quantumDrives: ["Expedition"],
        powerPlants: ["Regulus"],
        coolers: ["Bracer"],
        shields: ["Shimmer"],
        weapons: ["CF-117 Bulldog Repeater"]
    },
    "Anvil C8R Pisces Rescue": {
        quantumDrives: ["Expedition"],
        powerPlants: ["Regulus"],
        coolers: ["Bracer"],
        shields: ["Shimmer"],
        weapons: ["CF-117 Bulldog Repeater"]
    },
    "Anvil C8X Pisces Expedition": {
        quantumDrives: ["Expedition"],
        powerPlants: ["Regulus"],
        coolers: ["Bracer"],
        shields: ["Shimmer"],
        weapons: ["CF-117 Bulldog Repeater","FL-11 Cannon"]
    },
    "Anvil Carrack": {
        quantumDrives: ["Kama"],
        powerPlants: ["Reliance"],
        coolers: ["Ice-Flush"],
        shields: ["Barbican"],
        weapons: ["CF-447 Rhino Repeater"]
    },
    "Anvil Carrack Expedition": {
        quantumDrives: ["Kama"],
        powerPlants: ["Reliance"],
        coolers: ["Ice-Flush"],
        shields: ["Barbican"],
        weapons: ["CF-447 Rhino Repeater"]
    },
    "Anvil Centurion": {
        quantumDrives: [],
        powerPlants: ["OverDrive","Defiant"],
        coolers: ["Cryo-Star SL","Frost-Star"],
        shields: ["Castra"],
        weapons: ["Attrition-3 Repeater","CF-447 Rhino Repeater"]
    },
    "Anvil F7 Hornet Mk Wikelo": {
        quantumDrives: ["VK-00"],
        powerPlants: ["JS-400"],
        coolers: ["Glacier"],
        shields: ["FR-66","AllStop"],
        weapons: ["Revenant Gatling","CF-337 Panther Repeater"]
    },
    "Anvil F7A Hornet Mk I": {
        quantumDrives: ["Eos"],
        powerPlants: ["TurboDrive"],
        coolers: ["ArcticStorm"],
        shields: ["WEB"],
        weapons: ["CF-337 Panther Repeater","CF-227 Badger Repeater","AD4B Ballistic Gatling"]
    },
    "Anvil F7A Hornet Mk II": {
        quantumDrives: ["Eos"],
        powerPlants: ["Maelstrom"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        weapons: ["Revenant Gatling","Omnisky IX Cannon"]
    },
    "Anvil F7C Hornet Mk I": {
        quantumDrives: ["Eos"],
        powerPlants: ["PowerBolt"],
        coolers: ["ArcticStorm"],
        shields: ["WEB"],
        weapons: ["CF-337 Panther Repeater"]
    },
    "Anvil F7C Hornet Mk II": {
        quantumDrives: ["Eos"],
        powerPlants: ["Regulus"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        weapons: ["Revenant Gatling"]
    },
    "Anvil F7C Hornet Wildfire Mk I": {
        quantumDrives: ["Eos"],
        powerPlants: ["Roughneck"],
        coolers: ["ArcticStorm"],
        shields: ["WEB"],
        weapons: ["Revenant Gatling","Tarantula GT-870 Mark 3 Cannon"]
    },
    "Anvil F7C-M Hornet Heartseeker Mk I": {
        quantumDrives: ["Eos"],
        powerPlants: ["OverDrive"],
        coolers: ["Polar"],
        shields: ["ForceWall"],
        weapons: ["Mantis GT-220 Gatling","CF-117 Bulldog Repeater","M6A Cannon"]
    },
    "Anvil F7C-M Hornet Heartseeker Mk II": {
        quantumDrives: ["Eos"],
        powerPlants: ["Maelstrom"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        weapons: ["Revenant Gatling","TMSB-5 Gatling","CF-337 Panther Repeater"]
    },
    "Anvil F7C-M Super Hornet Mk I": {
        quantumDrives: ["Eos"],
        powerPlants: ["Regulus"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        weapons: ["Mantis GT-220 Gatling","CF-117 Bulldog Repeater","CF-227 Badger Repeater"]
    },
    "Anvil F7C-M Super Hornet Mk II": {
        quantumDrives: ["Eos"],
        powerPlants: ["Maelstrom"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        weapons: ["Revenant Gatling","CF-337 Panther Repeater"]
    },
    "Anvil F7C-R Hornet Tracker Mk I": {
        quantumDrives: ["Eos"],
        powerPlants: ["LumaCore"],
        coolers: ["IcePlunge"],
        shields: ["Targa"],
        weapons: ["CF-337 Panther Repeater"]
    },
    "Anvil F7C-R Hornet Tracker Mk II": {
        quantumDrives: ["Eos"],
        powerPlants: ["Regulus"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        weapons: ["Revenant Gatling"]
    },
    "Anvil F7C-S Hornet Ghost Mk I": {
        quantumDrives: ["Eos"],
        powerPlants: ["Slipstream"],
        coolers: ["HeatSafe"],
        shields: ["Shimmer"],
        weapons: ["Omnisky IX Cannon"]
    },
    "Anvil F7C-S Hornet Ghost Mk II": {
        quantumDrives: ["Drift"],
        powerPlants: ["SonicLite"],
        coolers: ["HeatSafe"],
        shields: ["Shimmer"],
        weapons: ["Revenant Gatling"]
    },
    "Anvil F8A Lightning": {
        quantumDrives: ["Expedition"],
        powerPlants: ["Maelstrom"],
        coolers: ["Polar"],
        shields: ["Sheut"],
        weapons: ["M5A Cannon","M6A Cannon","CF-337 Panther Repeater"]
    },
    "Anvil F8C Lightning": {
        quantumDrives: ["Expedition"],
        powerPlants: ["Maelstrom"],
        coolers: ["Polar"],
        shields: ["Sheut"],
        weapons: ["Tarantula GT-870 Mark 2 Cannon","Tarantula GT-870 Mark 3 Cannon","CF-337 Panther Repeater","CF-227 Badger Repeater"]
    },
    "Anvil F8C Lightning Executive Edition": {
        quantumDrives: ["Expedition"],
        powerPlants: ["Maelstrom"],
        coolers: ["Polar"],
        shields: ["Sheut"],
        weapons: ["Tarantula GT-870 Mark 2 Cannon","Tarantula GT-870 Mark 3 Cannon","CF-337 Panther Repeater","CF-227 Badger Repeater"]
    },
    "Anvil F8C Lightning Wikelo Sneak Special": {
        quantumDrives: ["Colossus"],
        powerPlants: ["Eclipse"],
        coolers: ["SnowBlind"],
        shields: ["Umbra"],
        weapons: ["Tarantula GT-870 Mark 2 Cannon","Tarantula GT-870 Mark 3 Cannon","CF-337 Panther Repeater","CF-227 Badger Repeater"]
    },
    "Anvil F8C Lightning Wikelo War Special": {
        quantumDrives: ["Colossus"],
        powerPlants: ["LuxCore"],
        coolers: ["Glacier"],
        shields: ["FR-76"],
        weapons: ["Tarantula GT-870 Mark 2 Cannon","Tarantula GT-870 Mark 3 Cannon","CF-337 Panther Repeater","CF-227 Badger Repeater"]
    },
    "Anvil Gladiator": {
        quantumDrives: ["Beacon"],
        powerPlants: ["Maelstrom"],
        coolers: ["Bracer"],
        shields: ["FullStop"],
        weapons: ["CF-447 Rhino Repeater","CF-337 Panther Repeater"]
    },
    "Anvil Hawk": {
        quantumDrives: ["Rush"],
        powerPlants: ["Regulus"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        weapons: ["CF-227 Badger Repeater","Suckerpunch Cannon"]
    },
    "Anvil Hurricane": {
        quantumDrives: ["Expedition"],
        powerPlants: ["Regulus"],
        coolers: ["Bracer"],
        shields: ["FullStop"],
        weapons: ["CF-447 Rhino Repeater","CF-337 Panther Repeater"]
    },
    "Anvil Paladin": {
        quantumDrives: ["SparkFire"],
        powerPlants: ["Maelstrom"],
        coolers: ["Arctic"],
        shields: ["Stronghold"],
        weapons: ["CF-447 Rhino Repeater","CF-557 Galdereen Repeater"]
    },
    "Anvil Spartan": {
        quantumDrives: [],
        powerPlants: ["Defiant"],
        coolers: ["Cryo-Star SL"],
        shields: ["Castra"],
        weapons: ["Scorpion GT-215 Gatling"]
    },
    "Anvil Terrapin": {
        quantumDrives: ["Eos"],
        powerPlants: ["DayBreak"],
        coolers: ["Polar"],
        shields: ["5MA 'Chimalli'"],
        weapons: ["CF-227 Badger Repeater"]
    },
    "Anvil Terrapin Medic": {
        quantumDrives: ["Eos"],
        powerPlants: ["DayBreak"],
        coolers: ["Polar"],
        shields: ["5MA 'Chimalli'"],
        weapons: ["CF-227 Badger Repeater"]
    },
    "Anvil Terrapin Medic Wikelo Savior Special": {
        quantumDrives: ["Hyperion"],
        powerPlants: ["IonSurge"],
        coolers: ["Gelid"],
        shields: ["BLOC"],
        weapons: ["CF-227 Badger Repeater"]
    },
    "Anvil Valkyrie": {
        quantumDrives: ["Odyssey"],
        powerPlants: ["Maelstrom"],
        coolers: ["Arctic"],
        shields: ["FullStop"],
        weapons: ["CF-337 Panther Repeater","CF-447 Rhino Repeater","YellowJacket GT-210 Gatling"]
    },
    "Aopoa Khartu-al": {
        quantumDrives: ["Eos"],
        powerPlants: ["DynaFlux"],
        coolers: ["Polar"],
        shields: ["ForceWall"],
        weapons: ["CF-447 Rhino Repeater"]
    },
    "Aopoa San'tok.yāi": {
        quantumDrives: ["Beacon"],
        powerPlants: ["DynaFlux"],
        coolers: ["Polar"],
        shields: ["FullStop"],
        weapons: ["Yeng’tu Repeater"]
    },
    "Argo CSV-SM\n": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        weapons: []
    },
    "Argo MOLE": {
        quantumDrives: ["Huracan"],
        powerPlants: ["Ginzel"],
        coolers: ["ThermalCore"],
        shields: ["5CA 'Akura'"],
        weapons: ["CF-227 Badger Repeater"]
    },
    "Argo MOLE Carbon": {
        quantumDrives: ["Huracan"],
        powerPlants: ["Ginzel"],
        coolers: ["ThermalCore"],
        shields: ["5CA 'Akura'"],
        weapons: ["CF-227 Badger Repeater"]
    },
    "Argo MOLE Talus": {
        quantumDrives: ["Huracan"],
        powerPlants: ["Ginzel"],
        coolers: ["ThermalCore"],
        shields: ["5CA 'Akura'"],
        weapons: ["CF-227 Badger Repeater"]
    },
    "Argo MOLE Teach's Special": {
        quantumDrives: ["Huracan"],
        powerPlants: ["Ginzel"],
        coolers: ["ThermalCore"],
        shields: ["5CA 'Akura'"],
        weapons: ["CF-227 Badger Repeater"]
    },
    "Argo MPUV Cargo": {
        quantumDrives: [],
        powerPlants: ["IonWave"],
        coolers: ["Frost-Star SL"],
        shields: ["Bulwark"],
        weapons: []
    },
    "Argo MPUV Personnel": {
        quantumDrives: [],
        powerPlants: ["IonWave"],
        coolers: ["Frost-Star SL"],
        shields: ["Bulwark"],
        weapons: []
    },
    "Argo MPUV Tractor": {
        quantumDrives: [],
        powerPlants: ["IonWave"],
        coolers: ["Frost-Star SL"],
        shields: ["Bulwark"],
        weapons: []
    },
    "Argo RAFT": {
        quantumDrives: ["Bolon"],
        powerPlants: ["Diligence"],
        coolers: ["CoolCore"],
        shields: ["Aspis"],
        weapons: ["M5A Cannon"]
    },
    "Argo RAFT Wikelo Work Special": {
        quantumDrives: ["Huracan"],
        powerPlants: ["Sedulity"],
        coolers: ["Snowfall"],
        shields: ["Citadel"],
        weapons: ["Attrition-3 Repeater"]
    },
    "Argo SRV": {
        quantumDrives: ["Huracan"],
        powerPlants: ["Diligence"],
        coolers: ["CoolCore"],
        shields: ["5MA 'Chimalli'"],
        weapons: []
    },
    "Banu Defender": {
        quantumDrives: ["Beacon"],
        powerPlants: ["IonBurst"],
        coolers: ["Polar"],
        shields: ["Sukoran"],
        weapons: ["Singe Cannon (S3)"]
    },
    "C.O. Mustang Alpha": {
        quantumDrives: ["Rush"],
        powerPlants: ["ZapJet"],
        coolers: ["Winter-Star"],
        shields: ["INK"],
        weapons: ["CF-227 Badger Repeater"]
    },
    "C.O. Mustang Beta": {
        quantumDrives: ["Rush"],
        powerPlants: ["Roughneck"],
        coolers: ["Hydrocel"],
        shields: ["INK"],
        weapons: ["CF-227 Badger Repeater"]
    },
    "C.O. Mustang CitizenCon 2948 Edition": {
        quantumDrives: ["Rush"],
        powerPlants: ["ZapJet"],
        coolers: ["Winter-Star"],
        shields: ["INK"],
        weapons: ["CF-227 Badger Repeater"]
    },
    "C.O. Mustang Delta": {
        quantumDrives: ["Rush"],
        powerPlants: ["OverDrive"],
        coolers: ["Winter-Star"],
        shields: ["SecureHyde"],
        weapons: ["CF-227 Badger Repeater","Jericho XL"]
    },
    "C.O. Mustang Gamma": {
        quantumDrives: ["Rush"],
        powerPlants: ["LumaCore"],
        coolers: ["QuikCool"],
        shields: ["Falco"],
        weapons: ["CF-117 Bulldog Repeater"]
    },
    "C.O. Mustang Omega": {
        quantumDrives: ["Rush"],
        powerPlants: ["LumaCore"],
        coolers: ["QuikCool"],
        shields: ["Falco"],
        weapons: ["CF-117 Bulldog Repeater"]
    },
    "C.O. Nomad": {
        quantumDrives: ["Expedition"],
        powerPlants: ["IonBurst"],
        coolers: ["Ultra-Flow"],
        shields: ["WEB"],
        weapons: ["CF-337 Panther Repeater"]
    },
    "C.O. Nomad Teach's Special": {
        quantumDrives: ["Expedition"],
        powerPlants: ["Fortitude"],
        coolers: ["Ultra-Flow"],
        shields: ["Bulwark"],
        weapons: ["CF-337 Panther Repeater"]
    },
    "Corsair PYAM Exec": {
        quantumDrives: ["Huracan"],
        powerPlants: ["Eclipse"],
        coolers: ["NightFall"],
        shields: ["Parapet"],
        weapons: ["CF-227 Badger Repeater","M6A Cannon","NDB-28 Repeater","M7A Cannon"]
    },
    "Crusader A1 Spirit": {
        quantumDrives: ["Yeager"],
        powerPlants: ["UltraFlux"],
        coolers: ["Boreal"],
        shields: ["FullStop"],
        weapons: ["M5A Cannon","CF-227 Badger Repeater"]
    },
    "Crusader A2 Hercules Starlifter": {
        quantumDrives: ["Pontes"],
        powerPlants: ["SuperDrive"],
        coolers: ["Mercury"],
        shields: ["FullBlock"],
        weapons: ["Omnisky XV Cannon","M7A Cannon","CF-557 Galdereen Repeater","M6A Cannon","CF-447 Rhino Repeater"]
    },
    "Crusader A2 Hercules Starlifter Wikelo War Special": {
        quantumDrives: ["Balandin"],
        powerPlants: ["JS-500"],
        coolers: ["Mercury"],
        shields: ["FR-86"],
        weapons: ["M7A Cannon","Attrition-5 Repeater","Attrition-4 Repeater"]
    },
    "Crusader Ares Star Fighter Inferno": {
        quantumDrives: ["Crossfield"],
        powerPlants: ["Maelstrom"],
        coolers: ["Arctic"],
        shields: ["FullStop"],
        weapons: ["SF7B Gatling"]
    },
    "Crusader Ares Star Fighter Inferno Wikelo War Special": {
        quantumDrives: ["Yeager"],
        powerPlants: ["Bolide"],
        coolers: ["Permafrost"],
        shields: ["CoverAll"],
        weapons: ["SF7B Gatling"]
    },
    "Crusader Ares Star Fighter Ion": {
        quantumDrives: ["Crossfield"],
        powerPlants: ["Maelstrom"],
        coolers: ["Arctic"],
        shields: ["FullStop"],
        weapons: ["SF7E Cannon"]
    },
    "Crusader Ares Star Fighter Ion Wikelo Sneak Special": {
        quantumDrives: ["Bolt"],
        powerPlants: ["GammaMax"],
        coolers: ["IceBox"],
        shields: ["Sheut"],
        weapons: ["SF7E Cannon"]
    },
    "Crusader C1 Spirit": {
        quantumDrives: ["Yeager"],
        powerPlants: ["UltraFlux"],
        coolers: ["Boreal"],
        shields: ["FullStop"],
        weapons: ["M5A Cannon"]
    },
    "Crusader C1 Spirit Wikelo Special": {
        quantumDrives: ["Hemera"],
        powerPlants: ["Lotus"],
        coolers: ["Aufeis"],
        shields: ["7MA 'Lorica'"],
        weapons: ["M5A Cannon"]
    },
    "Crusader C2 Hercules Starlifter": {
        quantumDrives: ["Kama"],
        powerPlants: ["Ginzel"],
        coolers: ["ThermalCore"],
        shields: ["Stronghold"],
        weapons: ["M7A Cannon","M6A Cannon","CF-447 Rhino Repeater"]
    },
    "Crusader Intrepid": {
        quantumDrives: ["FoxFire"],
        powerPlants: ["LightBlossom"],
        coolers: ["BlastChill"],
        shields: ["HEX"],
        weapons: ["CF-447 Rhino Repeater"]
    },
    "Crusader Intrepid Wikelo Work Special": {
        quantumDrives: ["Atlas"],
        powerPlants: ["WhiteRose"],
        coolers: ["Ultra-Flow"],
        shields: ["Palisade"],
        weapons: ["CF-447 Rhino Repeater"]
    },
    "Crusader M2 Hercules Starlifter": {
        quantumDrives: ["Pontes"],
        powerPlants: ["SuperDrive"],
        coolers: ["Mercury"],
        shields: ["FullBlock"],
        weapons: ["M7A Cannon","M6A Cannon","CF-447 Rhino Repeater"]
    },
    "Crusader Mercury Star Runner": {
        quantumDrives: ["Bolon"],
        powerPlants: ["Diligence"],
        coolers: ["CoolCore"],
        shields: ["Stronghold"],
        weapons: ["CF-337 Panther Repeater"]
    },
    "Cutlass Black PYAM Exec": {
        quantumDrives: ["Odyssey"],
        powerPlants: ["Eclipse"],
        coolers: ["NightFall"],
        shields: ["Umbra"],
        weapons: ["CF-337 Panther Repeater","NDB-30 Repeater"]
    },
    "Drake Buccaneer": {
        quantumDrives: ["Rush"],
        powerPlants: ["JS-300"],
        coolers: ["Polar"],
        shields: ["WEB"],
        weapons: ["YellowJacket GT-210 Gatling","Revenant Gatling","CF-337 Panther Repeater"]
    },
    "Drake Caterpillar": {
        quantumDrives: ["Pontes"],
        powerPlants: ["Ginzel"],
        coolers: ["ThermalCore"],
        shields: ["Stronghold"],
        weapons: ["CF-447 Rhino Repeater","M5A Cannon","CF-337 Panther Repeater"]
    },
    "Drake Caterpillar Pirate": {
        quantumDrives: ["Pontes"],
        powerPlants: ["Ginzel"],
        coolers: ["ThermalCore"],
        shields: ["Stronghold"],
        weapons: ["CF-447 Rhino Repeater","M5A Cannon","CF-337 Panther Repeater"]
    },
    "Drake Clipper": {
        quantumDrives: ["Flood"],
        powerPlants: ["ZapJet"],
        coolers: ["BlastChill"],
        shields: ["INK"],
        weapons: ["Mantis GT-220 Gatling","Omnisky IX Cannon"]
    },
    "Drake Corsair": {
        quantumDrives: ["Torrent"],
        powerPlants: ["DayBreak"],
        coolers: ["Frost-Star EX"],
        shields: ["5CA 'Akura'"],
        weapons: ["CF-227 Badger Repeater","M6A Cannon","M7A Cannon"]
    },
    "Drake Cutlass Black": {
        quantumDrives: ["Odyssey"],
        powerPlants: ["DayBreak"],
        coolers: ["ColdSnap"],
        shields: ["STOP"],
        weapons: ["CF-337 Panther Repeater","Mantis GT-220 Gatling"]
    },
    "Drake Cutlass Blue": {
        quantumDrives: ["Bolon"],
        powerPlants: ["TurboDrive"],
        coolers: ["Graupel"],
        shields: ["Aspis"],
        weapons: ["DR Model-XJ3 Repeater","Mantis GT-220 Gatling","CF-337 Panther Repeater"]
    },
    "Drake Cutlass Red": {
        quantumDrives: ["Bolon"],
        powerPlants: ["Diligence"],
        coolers: ["CoolCore"],
        shields: ["Aspis"],
        weapons: ["CF-337 Panther Repeater","Mantis GT-220 Gatling"]
    },
    "Drake Cutlass Steel": {
        quantumDrives: ["Crossfield"],
        powerPlants: ["TurboDrive"],
        coolers: ["Arctic"],
        shields: ["FullStop"],
        weapons: ["CF-337 Panther Repeater","Mantis GT-220 Gatling","CF-227 Badger Repeater","YellowJacket GT-210 Gatling"]
    },
    "Drake Cutter": {
        quantumDrives: ["FoxFire"],
        powerPlants: ["LightBlossom"],
        coolers: ["BlastChill"],
        shields: ["HEX"],
        weapons: ["CF-227 Badger Repeater"]
    },
    "Drake Cutter Rambler": {
        quantumDrives: ["FoxFire"],
        powerPlants: ["LightBlossom"],
        coolers: ["BlastChill"],
        shields: ["HEX"],
        weapons: ["CF-227 Badger Repeater"]
    },
    "Drake Cutter Scout": {
        quantumDrives: ["FoxFire"],
        powerPlants: ["ExoGen"],
        coolers: ["Boreal"],
        shields: ["HEX"],
        weapons: ["CF-227 Badger Repeater"]
    },
    "Drake Golem": {
        quantumDrives: ["Goliath"],
        powerPlants: ["Fortitude"],
        coolers: ["Thermax"],
        shields: ["Bulwark"],
        weapons: ["CF-117 Bulldog Repeater"]
    },
    "Drake Golem OX": {
        quantumDrives: ["Goliath"],
        powerPlants: ["Fortitude"],
        coolers: ["Thermax"],
        shields: ["Bulwark"],
        weapons: ["CF-117 Bulldog Repeater"]
    },
    "Drake Golem Teach's Special": {
        quantumDrives: ["Atlas"],
        powerPlants: ["Endurance"],
        coolers: ["Thermax"],
        shields: ["Guardian"],
        weapons: ["CF-117 Bulldog Repeater"]
    },
    "Drake Golem Wikelo Work Special": {
        quantumDrives: ["Goliath"],
        powerPlants: ["Fortitude"],
        coolers: ["Thermax"],
        shields: ["Bulwark"],
        weapons: ["NN-13 Cannon"]
    },
    "Drake Herald": {
        quantumDrives: ["Expedition"],
        powerPlants: ["Slipstream"],
        coolers: ["HeatSafe"],
        shields: ["Shimmer"],
        weapons: ["Mantis GT-220 Gatling","CF-227 Badger Repeater"]
    },
    "Drake Mule": {
        quantumDrives: [],
        powerPlants: ["Steadfast"],
        coolers: ["Winter-Star SL"],
        shields: [],
        weapons: []
    },
    "Drake Vulture": {
        quantumDrives: ["Goliath"],
        powerPlants: ["Fortitude"],
        coolers: ["Thermax"],
        shields: ["Bulwark"],
        weapons: ["CF-117 Bulldog Repeater"]
    },
    "Drake Vulture Teach's Special": {
        quantumDrives: ["Goliath"],
        powerPlants: ["Fortitude"],
        coolers: ["Thermax"],
        shields: ["Bulwark"],
        weapons: ["CF-117 Bulldog Repeater"]
    },
    "Esperia Blade": {
        quantumDrives: ["Rush"],
        powerPlants: ["Charger"],
        coolers: ["IcePlunge"],
        shields: ["AllStop"],
        weapons: ["'WARLORD' Cannon","'WHIP' Cannon"]
    },
    "Esperia Glaive": {
        quantumDrives: ["Beacon"],
        powerPlants: ["Fierell Cascade"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        weapons: ["'WRATH' Cannon","'WEAK' Repeater"]
    },
    "Esperia Prowler": {
        quantumDrives: ["Nova"],
        powerPlants: ["Eclipse"],
        coolers: ["HeatSink"],
        shields: ["Obscura"],
        weapons: ["Lightstrike III Cannon","Deadbolt V Cannon"]
    },
    "Esperia Prowler Utility": {
        quantumDrives: ["Nova"],
        powerPlants: ["Eclipse"],
        coolers: ["HeatSink"],
        shields: ["Obscura"],
        weapons: ["Deadbolt III Cannon","Lightstrike IV Cannon"]
    },
    "Esperia Prowler Utility Wikelo Work Special": {
        quantumDrives: ["Huracan"],
        powerPlants: ["Eclipse"],
        coolers: ["Snowfall"],
        shields: ["Citadel"],
        weapons: ["Deadbolt III Cannon","Omnisky XII Cannon"]
    },
    "Esperia Stinger": {
        quantumDrives: ["Bolon"],
        powerPlants: ["Fortitude"],
        coolers: ["Eco-Flow"],
        shields: ["FullStop"],
        weapons: ["'WRATH' Cannon","Lightstrike II Cannon","Lightstrike IV Cannon"]
    },
    "Esperia Talon": {
        quantumDrives: ["Drift"],
        powerPlants: ["Slipstream"],
        coolers: ["VaporBlock"],
        shields: ["Shimmer"],
        weapons: ["Lightstrike IV Cannon"]
    },
    "Esperia Talon Shrike": {
        quantumDrives: ["Drift"],
        powerPlants: ["Slipstream"],
        coolers: ["VaporBlock"],
        shields: ["Shimmer"],
        weapons: ["Lightstrike II Cannon"]
    },
    "F8C Lightning PYAM Exec": {
        quantumDrives: ["Colossus"],
        powerPlants: ["Maelstrom"],
        coolers: ["Glacier"],
        shields: ["FR-76"],
        weapons: ["NDB-28 Repeater","NDB-30 Repeater"]
    },
    "Gatac Syulen": {
        quantumDrives: ["FoxFire"],
        powerPlants: ["LightBlossom"],
        coolers: ["BlastChill"],
        shields: ["HEX"],
        weapons: ["CF-337 Panther Repeater"]
    },
    "Grey's Shiv": {
        quantumDrives: ["Odyssey"],
        powerPlants: ["DayBreak"],
        coolers: ["ColdSnap"],
        shields: ["STOP"],
        weapons: ["Breakneck S4 Gatling","Tormenter S3 Repeater"]
    },
    "Greycat ROC": {
        quantumDrives: [],
        powerPlants: ["Steadfast"],
        coolers: ["Frost-Star SL"],
        shields: [],
        weapons: []
    },
    "Greycat ROC-DS": {
        quantumDrives: [],
        powerPlants: ["Steadfast"],
        coolers: ["Frost-Star SL"],
        shields: [],
        weapons: []
    },
    "Hornet F7A Mk II PYAM Exec": {
        quantumDrives: ["Colossus"],
        powerPlants: ["LuxCore"],
        coolers: ["Glacier"],
        shields: ["FR-66"],
        weapons: ["Revenant Gatling","NDB-30 Repeater"]
    },
    "Kruger L-21 Wolf": {
        quantumDrives: ["FoxFire"],
        powerPlants: ["LightBlossom"],
        coolers: ["BlastChill"],
        shields: ["HEX"],
        weapons: ["Relentless L-21 Gatling"]
    },
    "Kruger L-21 Wolf Wikelo Sneak Special": {
        quantumDrives: ["Zephyr"],
        powerPlants: ["DeltaMax"],
        coolers: ["VaporBlock"],
        shields: ["Veil"],
        weapons: ["Relentless L-21 Gatling"]
    },
    "Kruger L-21 Wolf Wikelo War Special": {
        quantumDrives: ["VK-00"],
        powerPlants: ["JS-300"],
        coolers: ["Glacier"],
        shields: ["FR-66"],
        weapons: ["Relentless L-21 Gatling"]
    },
    "Kruger L-22 Alpha Wolf": {
        quantumDrives: ["VK-00"],
        powerPlants: ["LightBlossom"],
        coolers: ["BlastChill"],
        shields: ["HEX"],
        weapons: ["Axiom L-22 Repeater"]
    },
    "Kruger P-52 Merlin": {
        quantumDrives: [],
        powerPlants: ["LightBlossom"],
        coolers: ["Frost-Star"],
        shields: ["SecureHyde"],
        weapons: ["Tigerstrike T-19P","CF-117 Bulldog Repeater"]
    },
    "Kruger P-72 Archimedes": {
        quantumDrives: [],
        powerPlants: ["Charger"],
        coolers: ["Bracer"],
        shields: ["Targa"],
        weapons: ["CF-117 Bulldog Repeater"]
    },
    "Kruger P-72 Archimedes Emerald": {
        quantumDrives: [],
        powerPlants: ["Charger"],
        coolers: ["Bracer"],
        shields: ["Targa"],
        weapons: ["CF-117 Bulldog Repeater"]
    },
    "Mirai Fury": {
        quantumDrives: [],
        powerPlants: ["Roughneck"],
        coolers: ["Hydrocel"],
        shields: ["Cloak"],
        weapons: ["CF-227 Badger Repeater"]
    },
    "Mirai Fury LX": {
        quantumDrives: [],
        powerPlants: ["Roughneck"],
        coolers: ["IcePlunge"],
        shields: ["Falco"],
        weapons: []
    },
    "Mirai Fury MX": {
        quantumDrives: [],
        powerPlants: ["Roughneck"],
        coolers: ["Hydrocel"],
        shields: ["Cloak"],
        weapons: []
    },
    "Mirai Guardian": {
        quantumDrives: ["Crossfield"],
        powerPlants: ["OverDrive"],
        coolers: ["Arctic"],
        shields: ["FullStop"],
        weapons: ["M7A Cannon"]
    },
    "Mirai Guardian MX": {
        quantumDrives: ["Crossfield"],
        powerPlants: ["Maelstrom"],
        coolers: ["Bracer","Arctic"],
        shields: ["FullStop"],
        weapons: ["CF-447 Rhino Repeater"]
    },
    "Mirai Guardian MX Wikelo War Special": {
        quantumDrives: ["XL-1"],
        powerPlants: ["Bolide"],
        coolers: ["Polar","Permafrost"],
        shields: ["CoverAll"],
        weapons: ["Attrition-4 Repeater"]
    },
    "Mirai Guardian QI": {
        quantumDrives: ["Crossfield"],
        powerPlants: ["Regulus"],
        coolers: ["Arctic"],
        shields: ["FullStop"],
        weapons: ["M7A Cannon"]
    },
    "Mirai Guardian QI Wikelo Special": {
        quantumDrives: ["SunFire"],
        powerPlants: ["LumaCore"],
        coolers: ["AbsoluteZero"],
        shields: ["Haltur"],
        weapons: ["M7A Cannon"]
    },
    "Mirai Guardian Wikelo War Special": {
        quantumDrives: ["VK-00"],
        powerPlants: ["QuadraCell"],
        coolers: ["Glacier"],
        shields: ["FR-76"],
        weapons: ["M7A Cannon"]
    },
    "Mirai Razor": {
        quantumDrives: ["LightFire"],
        powerPlants: ["StarHeart"],
        coolers: ["IcePlunge"],
        shields: ["Targa"],
        weapons: ["CF-227 Badger Repeater"]
    },
    "Mirai Razor EX": {
        quantumDrives: ["LightFire"],
        powerPlants: ["StarHeart"],
        coolers: ["IcePlunge"],
        shields: ["Targa"],
        weapons: ["Hellion Scattergun"]
    },
    "Mirai Razor LX": {
        quantumDrives: ["LightFire"],
        powerPlants: ["StarHeart"],
        coolers: ["IcePlunge"],
        shields: ["Targa"],
        weapons: ["CF-227 Badger Repeater"]
    },
    "MISC Fortune": {
        quantumDrives: ["Goliath"],
        powerPlants: ["Trommel"],
        coolers: ["Snowfall"],
        shields: ["Bulwark"],
        weapons: ["CF-117 Bulldog Repeater"]
    },
    "MISC Fortune Teach's Special": {
        quantumDrives: ["Goliath"],
        powerPlants: ["Trommel"],
        coolers: ["Snowfall"],
        shields: ["Bulwark"],
        weapons: ["CF-117 Bulldog Repeater"]
    },
    "MISC Fortune Wikelo Special": {
        quantumDrives: ["Atlas"],
        powerPlants: ["Lotus"],
        coolers: ["Aufeis"],
        shields: ["7SA 'Concord'"],
        weapons: ["CF-117 Bulldog Repeater"]
    },
    "MISC Freelancer": {
        quantumDrives: ["Odyssey"],
        powerPlants: ["DayBreak"],
        coolers: ["Frost-Star EX"],
        shields: ["5MA 'Chimalli'"],
        weapons: ["M5A Cannon","CF-337 Panther Repeater"]
    },
    "MISC Freelancer DUR": {
        quantumDrives: ["Odyssey"],
        powerPlants: ["DayBreak"],
        coolers: ["Frost-Star EX"],
        shields: ["5MA 'Chimalli'"],
        weapons: ["CF-337 Panther Repeater","Attrition-3 Repeater"]
    },
    "MISC Freelancer MAX": {
        quantumDrives: ["Odyssey"],
        powerPlants: ["DayBreak"],
        coolers: ["Frost-Star EX"],
        shields: ["5MA 'Chimalli'"],
        weapons: ["Omnisky IX Cannon","CF-337 Panther Repeater"]
    },
    "MISC Freelancer MIS": {
        quantumDrives: ["Crossfield"],
        powerPlants: ["Maelstrom"],
        coolers: ["Arctic"],
        shields: ["FullStop"],
        weapons: ["CF-337 Panther Repeater","M5A Cannon"]
    },
    "MISC Hull A": {
        quantumDrives: ["Goliath"],
        powerPlants: ["IonBurst"],
        coolers: ["ArcticStorm"],
        shields: ["Armada"],
        weapons: ["CF-117 Bulldog Repeater"]
    },
    "MISC Hull C": {
        quantumDrives: ["Kama"],
        powerPlants: ["Centurion"],
        coolers: ["Blizzard"],
        shields: ["Stronghold"],
        weapons: ["CF-337 Panther Repeater"]
    },
    "MISC Prospector": {
        quantumDrives: ["Goliath"],
        powerPlants: ["Trommel"],
        coolers: ["Snowfall"],
        shields: ["Bulwark"],
        weapons: ["CF-117 Bulldog Repeater"]
    },
    "MISC Prospector Wikelo Work Special": {
        quantumDrives: ["Colossus"],
        powerPlants: ["Sedulity"],
        coolers: ["Snowpack"],
        shields: ["Guardian"],
        weapons: ["NDB-26 Repeater"]
    },
    "MISC Reliant Kore": {
        quantumDrives: ["Rush"],
        powerPlants: ["IonBurst"],
        coolers: ["ArcticStorm"],
        shields: ["WEB"],
        weapons: ["CF-227 Badger Repeater"]
    },
    "MISC Reliant Mako": {
        quantumDrives: ["Drift"],
        powerPlants: ["IonBurst"],
        coolers: ["HeatSafe"],
        shields: ["Shimmer"],
        weapons: ["CF-227 Badger Repeater"]
    },
    "MISC Reliant Sen": {
        quantumDrives: ["Goliath"],
        powerPlants: ["IonBurst"],
        coolers: ["Thermax"],
        shields: ["Bulwark"],
        weapons: ["CF-227 Badger Repeater"]
    },
    "MISC Reliant Tana": {
        quantumDrives: ["Beacon"],
        powerPlants: ["IonBurst"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        weapons: ["CF-227 Badger Repeater","CF-337 Panther Repeater"]
    },
    "MISC Starfarer": {
        quantumDrives: ["Kama"],
        powerPlants: ["Ginzel","SuperDrive"],
        coolers: ["ThermalCore"],
        shields: ["Stronghold"],
        weapons: ["M6A Cannon","CF-447 Rhino Repeater","CF-337 Panther Repeater"]
    },
    "MISC Starfarer Gemini": {
        quantumDrives: ["Pontes"],
        powerPlants: ["SuperDrive"],
        coolers: ["Mercury"],
        shields: ["Stronghold"],
        weapons: ["M6A Cannon","CF-557 Galdereen Repeater","CF-337 Panther Repeater"]
    },
    "MISC Starfarer Teach's Special": {
        quantumDrives: ["Kama"],
        powerPlants: ["Ginzel","SuperDrive"],
        coolers: ["ThermalCore"],
        shields: ["Stronghold"],
        weapons: ["M6A Cannon","CF-447 Rhino Repeater","CF-337 Panther Repeater"]
    },
    "MISC Starlancer MAX": {
        quantumDrives: ["SparkFire"],
        powerPlants: ["LuxCore"],
        coolers: ["AbsoluteZero"],
        shields: ["Stronghold"],
        weapons: ["CF-447 Rhino Repeater","M6A Cannon"]
    },
    "MISC Starlancer MAX Wikelo Work Special": {
        quantumDrives: ["Hemera"],
        powerPlants: ["Lotus"],
        coolers: ["Aufeis"],
        shields: ["Parapet"],
        weapons: ["CF-447 Rhino Repeater","M6A Cannon"]
    },
    "MISC Starlancer TAC": {
        quantumDrives: ["SparkFire"],
        powerPlants: ["Centurion"],
        coolers: ["Blizzard"],
        shields: ["Stronghold"],
        weapons: ["CF-447 Rhino Repeater","M6A Cannon","CF-557 Galdereen Repeater","YellowJacket GT-210 Gatling"]
    },
    "MISC Starlancer TAC Wikelo War Special": {
        quantumDrives: ["Yeager"],
        powerPlants: ["Durango"],
        coolers: ["Blizzard"],
        shields: ["FullBlock"],
        weapons: ["Omnisky XII Cannon","Attrition-4 Repeater","M7A Cannon","YellowJacket GT-210 Gatling"]
    },
    "Origin 100i": {
        quantumDrives: ["Expedition"],
        powerPlants: ["PowerBolt"],
        coolers: ["ArcticStorm"],
        shields: ["WEB"],
        weapons: ["CF-337 Panther Repeater"]
    },
    "Origin 125a": {
        quantumDrives: ["Expedition"],
        powerPlants: ["Regulus"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        weapons: ["CF-337 Panther Repeater"]
    },
    "Origin 135c": {
        quantumDrives: ["Expedition"],
        powerPlants: ["Fortitude"],
        coolers: ["Thermax"],
        shields: ["Bulwark"],
        weapons: ["CF-337 Panther Repeater"]
    },
    "Origin 300i": {
        quantumDrives: ["Expedition"],
        powerPlants: ["PowerBolt"],
        coolers: ["ArcticStorm"],
        shields: ["WEB"],
        weapons: ["SW16BR3 “Shredder” Repeater","M5A Cannon"]
    },
    "Origin 315p": {
        quantumDrives: ["Goliath"],
        powerPlants: ["SonicLite"],
        coolers: ["HeatSafe"],
        shields: ["Shimmer"],
        weapons: ["SW16BR3 “Shredder” Repeater"]
    },
    "Origin 325a": {
        quantumDrives: ["Beacon"],
        powerPlants: ["Regulus"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        weapons: ["SW16BR3 “Shredder” Repeater","M6A Cannon"]
    },
    "Origin 350r": {
        quantumDrives: ["Eos"],
        powerPlants: ["SunFlare"],
        coolers: ["QuikCool"],
        shields: ["Targa"],
        weapons: ["M5A Cannon","CF-337 Panther Repeater"]
    },
    "Origin 400i": {
        quantumDrives: ["Torrent"],
        powerPlants: ["Sedulity"],
        coolers: ["Snowfall"],
        shields: ["GUARD"],
        weapons: ["CF-337 Panther Repeater","CF-447 Rhino Repeater"]
    },
    "Origin 600i": {
        quantumDrives: ["Odyssey"],
        powerPlants: ["Durango"],
        coolers: ["FrostBurn"],
        shields: ["Stronghold"],
        weapons: ["M7A Cannon","CF-337 Panther Repeater"]
    },
    "Origin 600i 2951 BIS": {
        quantumDrives: ["Odyssey"],
        powerPlants: ["Durango"],
        coolers: ["FrostBurn"],
        shields: ["Stronghold"],
        weapons: ["M7A Cannon","CF-337 Panther Repeater"]
    },
    "Origin 600i Executive Edition": {
        quantumDrives: ["Odyssey"],
        powerPlants: ["Durango"],
        coolers: ["FrostBurn"],
        shields: ["Stronghold"],
        weapons: ["M7A Cannon","CF-337 Panther Repeater"]
    },
    "Origin 600i Touring": {
        quantumDrives: ["Odyssey"],
        powerPlants: ["Durango"],
        coolers: ["FrostBurn"],
        shields: ["Stronghold"],
        weapons: ["M7A Cannon","CF-337 Panther Repeater"]
    },
    "Origin 85X Limited": {
        quantumDrives: ["Beacon"],
        powerPlants: ["PowerBolt"],
        coolers: ["IcePlunge"],
        shields: ["Targa"],
        weapons: ["CF-117 Bulldog Repeater","CF-227 Badger Repeater"]
    },
    "Origin 890 Jump": {
        quantumDrives: ["Allegro"],
        powerPlants: ["Stellate"],
        coolers: ["Serac"],
        shields: ["Glacis"],
        weapons: ["M6A Cannon","CF-337 Panther Repeater","M2C \"Swarm\""]
    },
    "Origin M50 Interceptor": {
        quantumDrives: ["LightFire"],
        powerPlants: ["LumaCore"],
        coolers: ["IcePlunge"],
        shields: ["Targa"],
        weapons: ["CF-227 Badger Repeater"]
    },
    "RSI Apollo Medivac": {
        quantumDrives: ["Odyssey"],
        powerPlants: ["FullForce"],
        coolers: ["ColdSnap"],
        shields: ["STOP"],
        weapons: ["Mantis GT-220 Gatling","CF-447 Rhino Repeater"]
    },
    "RSI Apollo Triage": {
        quantumDrives: ["Odyssey"],
        powerPlants: ["FullForce"],
        coolers: ["ColdSnap"],
        shields: ["STOP"],
        weapons: ["M5A Cannon","CF-447 Rhino Repeater"]
    },
    "RSI Aurora CL": {
        quantumDrives: ["Eos"],
        powerPlants: ["Roughneck"],
        coolers: ["Hydrocel"],
        shields: ["Bulwark"],
        weapons: ["CF-117 Bulldog Repeater"]
    },
    "RSI Aurora ES": {
        quantumDrives: ["Eos"],
        powerPlants: ["ZapJet"],
        coolers: ["BlastChill"],
        shields: ["INK"],
        weapons: ["9-Series Longsword Cannon"]
    },
    "RSI Aurora LN": {
        quantumDrives: ["Eos"],
        powerPlants: ["Charger"],
        coolers: ["Bracer"],
        shields: ["SecureHyde"],
        weapons: ["CF-117 Bulldog Repeater"]
    },
    "RSI Aurora LX": {
        quantumDrives: ["Eos"],
        powerPlants: ["LumaCore"],
        coolers: ["QuikCool"],
        shields: ["Targa"],
        weapons: ["CF-117 Bulldog Repeater"]
    },
    "RSI Aurora MR": {
        quantumDrives: ["Eos"],
        powerPlants: ["Roughneck"],
        coolers: ["Hydrocel"],
        shields: ["Bulwark"],
        weapons: ["CF-117 Bulldog Repeater"]
    },
    "RSI Constellation Andromeda": {
        quantumDrives: ["Bolon"],
        powerPlants: ["DayBreak"],
        coolers: ["Frost-Star EX"],
        shields: ["5CA 'Akura'"],
        weapons: ["CF-337 Panther Repeater","CF-557 Galdereen Repeater"]
    },
    "RSI Constellation Aquila": {
        quantumDrives: ["Bolon"],
        powerPlants: ["DayBreak"],
        coolers: ["Frost-Star EX"],
        shields: ["5CA 'Akura'"],
        weapons: ["CF-337 Panther Repeater","M7A Cannon"]
    },
    "RSI Constellation Phoenix": {
        quantumDrives: ["Bolon"],
        powerPlants: ["DayBreak"],
        coolers: ["Frost-Star EX"],
        shields: ["5CA 'Akura'"],
        weapons: ["CF-337 Panther Repeater","Omnisky XV Cannon","M2C \"Swarm\""]
    },
    "RSI Constellation Phoenix Emerald": {
        quantumDrives: ["Bolon"],
        powerPlants: ["DayBreak"],
        coolers: ["Frost-Star EX"],
        shields: ["5CA 'Akura'"],
        weapons: ["CF-337 Panther Repeater","Omnisky XV Cannon","M2C \"Swarm\""]
    },
    "RSI Constellation Taurus": {
        quantumDrives: ["Bolon"],
        powerPlants: ["Diligence"],
        coolers: ["CoolCore"],
        shields: ["Stronghold"],
        weapons: ["CF-337 Panther Repeater","CF-557 Galdereen Repeater"]
    },
    "RSI Constellation Taurus Wikelo War Special": {
        quantumDrives: ["XL-1"],
        powerPlants: ["QuadraCell MT"],
        coolers: ["Avalanche"],
        shields: ["FR-86"],
        weapons: ["CF-337 Panther Repeater","CF-557 Galdereen Repeater"]
    },
    "RSI Lynx": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        weapons: ["M3A Cannon"]
    },
    "RSI Mantis": {
        quantumDrives: ["Beacon"],
        powerPlants: ["Regulus"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        weapons: ["FL-33 Cannon"]
    },
    "RSI Meteor": {
        quantumDrives: ["Beacon"],
        powerPlants: ["Regulus"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        weapons: ["FL-33 Cannon","Leonids Cannon"]
    },
    "RSI Meteor PYAM Exec": {
        quantumDrives: ["Siren"],
        powerPlants: ["Charger"],
        coolers: ["Polar"],
        shields: ["ForceWall"],
        weapons: ["M5A Cannon","Leonids Cannon"]
    },
    "RSI Meteor Wikelo Sneak Special": {
        quantumDrives: ["Zephyr"],
        powerPlants: ["Slipstream"],
        coolers: ["VaporBlock"],
        shields: ["Mirage"],
        weapons: ["Omnisky IX Cannon","Leonids Cannon"]
    },
    "RSI Perseus": {
        quantumDrives: ["Pontes"],
        powerPlants: ["Centurion"],
        coolers: ["Mercury"],
        shields: ["SureStop"],
        weapons: ["RSI Medusa Cannon","Mantis GT-220 Gatling","M2C \"Swarm\""]
    },
    "RSI Polaris": {
        quantumDrives: ["Erebos"],
        powerPlants: ["Stellate"],
        coolers: ["Serac"],
        shields: ["Glacis"],
        weapons: ["CF-337 Panther Repeater","Omnisky XII Cannon","Maris Cannon","M2C \"Swarm\""]
    },
    "RSI Salvation": {
        quantumDrives: ["Colossus"],
        powerPlants: ["Fortitude"],
        coolers: ["Eco-Flow"],
        shields: ["Bulwark"],
        weapons: ["CF-117 Bulldog Repeater"]
    },
    "RSI Scorpius": {
        quantumDrives: ["Eos"],
        powerPlants: ["Regulus"],
        coolers: ["Polar"],
        shields: ["FullStop"],
        weapons: ["CF-337 Panther Repeater"]
    },
    "RSI Scorpius Antares": {
        quantumDrives: ["Eos"],
        powerPlants: ["Regulus"],
        coolers: ["Polar"],
        shields: ["FullStop"],
        weapons: ["CF-337 Panther Repeater"]
    },
    "RSI Scorpius Wikelo Sneak Special": {
        quantumDrives: ["Spectre"],
        powerPlants: ["Slipstream"],
        coolers: ["SnowBlind"],
        shields: ["Umbra"],
        weapons: ["CF-337 Panther Repeater"]
    },
    "RSI Ursa": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        weapons: ["CF-117 Bulldog Repeater"]
    },
    "RSI Ursa Fortuna": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        weapons: ["CF-117 Bulldog Repeater"]
    },
    "RSI Ursa Medivac": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        weapons: ["CF-117 Bulldog Repeater"]
    },
    "RSI Ursa Medivac Wikelo Special": {
        quantumDrives: [],
        powerPlants: ["MagnaBloom"],
        coolers: ["Kelvid"],
        shields: ["Castra"],
        weapons: ["CF-117 Bulldog Repeater"]
    },
    "RSI Zeus Mk II CL": {
        quantumDrives: ["Hemera"],
        powerPlants: ["Genoa"],
        coolers: ["Snowpack"],
        shields: ["Rampart"],
        weapons: ["Omnisky XII Cannon","CF-337 Panther Repeater"]
    },
    "RSI Zeus Mk II ES": {
        quantumDrives: ["Khaos"],
        powerPlants: ["FullForce"],
        coolers: ["ColdSnap"],
        shields: ["5MA 'Chimalli'"],
        weapons: ["Omnisky XII Cannon","CF-337 Panther Repeater"]
    },
    "RSI Zeus Mk II ES Wikelo Work Special": {
        quantumDrives: ["Hemera"],
        powerPlants: ["Genoa"],
        coolers: ["Snowpack"],
        shields: ["Rampart"],
        weapons: ["Omnisky XII Cannon","CF-337 Panther Repeater"]
    },
    "Syulen PYAM Exec": {
        quantumDrives: ["Colossus"],
        powerPlants: ["Slipstream"],
        coolers: ["Glacier"],
        shields: ["FR-66"],
        weapons: ["NDB-30 Repeater"]
    },
    "Tumbril Cyclone": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        weapons: []
    },
    "Tumbril Cyclone AA": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        weapons: []
    },
    "Tumbril Cyclone MT": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        weapons: ["9-Series Longsword Cannon"]
    },
    "Tumbril Cyclone RC": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        weapons: []
    },
    "Tumbril Cyclone RN": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        weapons: []
    },
    "Tumbril Cyclone TR": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        weapons: ["YellowJacket GT-210 Gatling"]
    },
    "Tumbril Nova": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        weapons: ["Slayer Cannon","CF-227 Badger Repeater"]
    },
    "Tumbril Storm": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        weapons: ["Reign-3 Repeater"]
    },
    "Tumbril Storm AA": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        weapons: []
    },
    "Vanduul Scythe": {
        quantumDrives: ["Beacon"],
        powerPlants: ["Fierell Cascade"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        weapons: ["'WAR' Cannon","'WRATH' Cannon","'WEAK' Repeater"]
    },
};


// Generate default loadout for a ship using actual stock components from game data
SC_DATA.getDefaultComponents = function(shipSpec) {
    if (!shipSpec) return null;

    const defaults = {
        weapons: [],
        shields: [],
        coolers: [],
        powerPlants: [],
        quantumDrives: []
    };

    // Look up stock loadout by ship name
    const stockLoadout = SC_DATA.stockLoadouts[shipSpec.name];

    // Populate weapons from stock or leave empty
    if (shipSpec.weapons && shipSpec.weapons.length > 0) {
        defaults.weapons = shipSpec.weapons.map((w, i) => ({
            name: stockLoadout?.weapons?.[i] || "",
            size: w.size
        }));
    }

    // Populate shields from stock or leave empty
    if (shipSpec.shields) {
        for (let i = 0; i < shipSpec.shields.count; i++) {
            defaults.shields.push({
                name: stockLoadout?.shields?.[i] || stockLoadout?.shields?.[0] || "",
                size: shipSpec.shields.size
            });
        }
    }

    // Populate coolers from stock or leave empty
    if (shipSpec.coolers) {
        for (let i = 0; i < shipSpec.coolers.count; i++) {
            defaults.coolers.push({
                name: stockLoadout?.coolers?.[i] || stockLoadout?.coolers?.[0] || "",
                size: shipSpec.coolers.size
            });
        }
    }

    // Populate power plants from stock or leave empty
    if (shipSpec.powerPlants) {
        for (let i = 0; i < shipSpec.powerPlants.count; i++) {
            defaults.powerPlants.push({
                name: stockLoadout?.powerPlants?.[i] || stockLoadout?.powerPlants?.[0] || "",
                size: shipSpec.powerPlants.size
            });
        }
    }

    // Populate quantum drive from stock or leave empty
    if (shipSpec.quantumDrive) {
        defaults.quantumDrives.push({
            name: stockLoadout?.quantumDrives?.[0] || "",
            size: shipSpec.quantumDrive.size
        });
    }

    return defaults;
};

window.SC_DATA = SC_DATA;
