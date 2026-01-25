// Star Citizen Ships and Components Database
// Component data extracted from game files (ship-items.json)
// Weapon sizes: 1-7 (S1-S7)
// Component sizes: 1=Small, 2=Medium, 3=Large

const SC_DATA = {
// ============ WEAPONS BY SIZE ============
weapons: {
    1: [ // Size 1
        { name: "'WEAK' Repeater", manufacturer: "Vanduul", type: "Gun" },
        { name: "9-Series Longsword Cannon", manufacturer: "KnightBridge Arms", type: "Gun" },
        { name: "Ardor-1 Salvaged Repeater", manufacturer: "Hurston Dynamics", type: "Gun" },
        { name: "Attrition-1 Repeater", manufacturer: "Hurston Dynamics", type: "Gun" },
        { name: "CF-117 Bulldog Repeater", manufacturer: "Klaus & Werner", type: "Gun" },
        { name: "Deadbolt I Cannon", manufacturer: "Esperia", type: "Gun" },
        { name: "Dominance-1 Scattergun", manufacturer: "Hurston Dynamics", type: "Gun" },
        { name: "DR Model-XJ1 Repeater", manufacturer: "PH Associated Science and Development", type: "Gun" },
        { name: "FL-11 Cannon", manufacturer: "Kroneg", type: "Gun" },
        { name: "Havoc Scattergun", manufacturer: "Apocalypse Arms", type: "Gun" },
        { name: "Havoc Scattergun Sharkmouth Edition", manufacturer: "Apocalypse Arms", type: "Gun" },
        { name: "Jericho", manufacturer: "Hurston Dynamics", type: "Rocket" },
        { name: "Liberator", manufacturer: "Thermyte Concern", type: "Rocket" },
        { name: "Lightstrike I Cannon", manufacturer: "Esperia", type: "Gun" },
        { name: "M2C \"Swarm\"", manufacturer: "Behring", type: "Gun" },
        { name: "M3A Cannon", manufacturer: "Behring", type: "Gun" },
        { name: "MRX \"Torrent\"", manufacturer: "Behring", type: "Gun" },
        { name: "NDB-26 Repeater", manufacturer: "Aegis Dynamics", type: "Gun" },
        { name: "NN-13 Cannon", manufacturer: "Aegis Dynamics", type: "Gun" },
        { name: "Omnisky III Cannon", manufacturer: "Amon & Reese Co.", type: "Gun" },
        { name: "Singe Cannon (S1)", manufacturer: "Banu", type: "Gun" },
        { name: "Sledge I Mass Driver Cannon", manufacturer: "Klaus & Werner", type: "Gun" },
        { name: "Suckerpunch Cannon", manufacturer: "Joker Engineering", type: "Gun" },
        { name: "SW16BR1 “Buzzsaw” Repeater", manufacturer: "Behring", type: "Gun" },
        { name: "Tarantula GT-870 Mark 1 Cannon", manufacturer: "Gallenson Tactical Systems", type: "Gun" },
        { name: "Yebira I", manufacturer: "Aegis Dynamics", type: "Rocket" },
        { name: "YellowJacket GT-210 Gatling", manufacturer: "Gallenson Tactical Systems", type: "Gun" },
    ],
    2: [ // Size 2
        { name: "'WASP' Repeater", manufacturer: "Vanduul", type: "Gun" },
        { name: "'WHIP' Cannon", manufacturer: "Vanduul", type: "Gun" },
        { name: "10-Series Greatsword Cannon", manufacturer: "KnightBridge Arms", type: "Gun" },
        { name: "Ardor-2 Salvaged Repeater", manufacturer: "Hurston Dynamics", type: "Gun" },
        { name: "Attrition-2 Repeater", manufacturer: "Hurston Dynamics", type: "Gun" },
        { name: "ATVS Repeater", manufacturer: "Behring", type: "Gun" },
        { name: "BRVS Repeater", manufacturer: "Behring", type: "Gun" },
        { name: "CF-227 Badger Repeater", manufacturer: "Banu", type: "Gun" },
        { name: "CVSA Cannon", manufacturer: "Behring", type: "Gun" },
        { name: "Deadbolt II Cannon", manufacturer: "Esperia", type: "Gun" },
        { name: "Dominance-2 Scattergun", manufacturer: "Hurston Dynamics", type: "Gun" },
        { name: "DR Model-XJ2 Repeater", manufacturer: "PH Associated Science and Development", type: "Gun" },
        { name: "EVSD Cannon", manufacturer: "Behring", type: "Gun" },
        { name: "FL-22 Cannon", manufacturer: "Kroneg", type: "Gun" },
        { name: "GVSR Repeater", manufacturer: "Behring", type: "Gun" },
        { name: "Hellion Scattergun", manufacturer: "Apocalypse Arms", type: "Gun" },
        { name: "Hellion Scattergun Sharkmouth Edition", manufacturer: "Apocalypse Arms", type: "Gun" },
        { name: "Jericho X", manufacturer: "Hurston Dynamics", type: "Rocket" },
        { name: "Liberator Prime", manufacturer: "Thermyte Concern", type: "Rocket" },
        { name: "Lightstrike II Cannon", manufacturer: "Esperia", type: "Gun" },
        { name: "M4A Cannon", manufacturer: "Behring", type: "Gun" },
        { name: "MVSA Cannon", manufacturer: "Behring", type: "Gun" },
        { name: "NDB-28 Repeater", manufacturer: "Aegis Dynamics", type: "Gun" },
        { name: "NN-14 Cannon", manufacturer: "Aegis Dynamics", type: "Gun" },
        { name: "Omnisky VI Cannon", manufacturer: "Amon & Reese Co.", type: "Gun" },
        { name: "Scorpion GT-215 Gatling", manufacturer: "Gallenson Tactical Systems", type: "Gun" },
        { name: "Singe Cannon (S2)", manufacturer: "Banu", type: "Gun" },
        { name: "Sledge II Mass Driver Cannon", manufacturer: "Klaus & Werner", type: "Gun" },
        { name: "Strife Mass Driver Cannon", manufacturer: "Apocalypse Arms", type: "Gun" },
        { name: "Suckerpunch-L Cannon", manufacturer: "Joker Engineering", type: "Gun" },
        { name: "SureGrip TH2 Tractor Beam", manufacturer: "Greycat Industrial", type: "Gun" },
        { name: "SW16BR2 “Sawbuck” Repeater", manufacturer: "Behring", type: "Gun" },
        { name: "Tarantula GT-870 Mark 2 Cannon", manufacturer: "Gallenson Tactical Systems", type: "Gun" },
        { name: "Thlilye Laser Gatling", manufacturer: "Aopoa", type: "Gun" },
        { name: "Tigerstrike T-19P", manufacturer: "Kruger Intergalatic", type: "NoseMounted" },
        { name: "Yebira II", manufacturer: "Aegis Dynamics", type: "Rocket" },
    ],
    3: [ // Size 3
        { name: "'WARLORD' Cannon", manufacturer: "Vanduul", type: "Gun" },
        { name: "11-Series Broadsword Cannon", manufacturer: "KnightBridge Arms", type: "Gun" },
        { name: "Ardor-3 Salvaged Repeater", manufacturer: "Hurston Dynamics", type: "Gun" },
        { name: "Attrition-3 Repeater", manufacturer: "Hurston Dynamics", type: "Gun" },
        { name: "CF-337 Panther Repeater", manufacturer: "Klaus & Werner", type: "Gun" },
        { name: "Deadbolt III Cannon", manufacturer: "Esperia", type: "Gun" },
        { name: "Dominance-3 Scattergun", manufacturer: "Hurston Dynamics", type: "Gun" },
        { name: "DR Model-XJ3 Repeater", manufacturer: "PH Associated Science and Development", type: "Gun" },
        { name: "FL-33 Cannon", manufacturer: "Kroneg", type: "Gun" },
        { name: "Jericho XL", manufacturer: "Hurston Dynamics", type: "Rocket" },
        { name: "Liberator Ultra", manufacturer: "Thermyte Concern", type: "Rocket" },
        { name: "Lightstrike III Cannon", manufacturer: "Esperia", type: "Gun" },
        { name: "M5A Cannon", manufacturer: "Behring", type: "Gun" },
        { name: "Mantis GT-220 Gatling", manufacturer: "Gallenson Tactical Systems", type: "Gun" },
        { name: "NDB-30 Repeater", manufacturer: "Aegis Dynamics", type: "Gun" },
        { name: "NN-14 Cannon", manufacturer: "Aegis Dynamics", type: "Gun" },
        { name: "Omnisky IX Cannon", manufacturer: "Amon & Reese Co.", type: "Gun" },
        { name: "Predator Scattergun", manufacturer: "Apocalypse Arms", type: "Gun" },
        { name: "Predator Scattergun Sharkmouth Edition", manufacturer: "Apocalypse Arms", type: "Gun" },
        { name: "PyroBurst Scattergun", manufacturer: "Amon & Reese Co.", type: "Gun" },
        { name: "Quarreler Cannon", manufacturer: "Kruger Intergalatic", type: "Gun" },
        { name: "Reign-3 Repeater", manufacturer: "Hurston Dynamics", type: "Gun" },
        { name: "Revenant Gatling", manufacturer: "Anvil Aerospace", type: "Gun" },
        { name: "Singe Cannon (S3)", manufacturer: "Banu", type: "Gun" },
        { name: "Sledge III Mass Driver Cannon", manufacturer: "Klaus & Werner", type: "Gun" },
        { name: "Suckerpunch-XL Cannon", manufacturer: "Joker Engineering", type: "Gun" },
        { name: "SW16BR3 “Shredder” Repeater", manufacturer: "Behring", type: "Gun" },
        { name: "Tarantula GT-870 Mark 3 Cannon", manufacturer: "Gallenson Tactical Systems", type: "Gun" },
        { name: "Tigerstrike T-21 Gatling", manufacturer: "Kruger Intergalatic", type: "Gun" },
        { name: "Tormenter S3 Repeater", manufacturer: "Grey's Market", type: "Gun" },
        { name: "Yeng’tu Repeater", manufacturer: "Aopoa", type: "Gun" },
    ],
    4: [ // Size 4
        { name: "AD4B Ballistic Gatling", manufacturer: "Behring", type: "Gun" },
        { name: "Attrition-4 Repeater", manufacturer: "Hurston Dynamics", type: "Gun" },
        { name: "Axiom L-22 Repeater", manufacturer: "Kruger Intergalatic", type: "Gun" },
        { name: "Breakneck S4 Gatling", manufacturer: "Grey's Market", type: "Gun" },
        { name: "C-788 Cannon", manufacturer: "Behring", type: "Gun" },
        { name: "CF-447 Rhino Repeater", manufacturer: "Klaus & Werner", type: "Gun" },
        { name: "Deadbolt IV Cannon", manufacturer: "Esperia", type: "Gun" },
        { name: "Lightstrike IV Cannon", manufacturer: "Esperia", type: "Gun" },
        { name: "M6A Cannon", manufacturer: "Behring", type: "Gun" },
        { name: "Omnisky XII Cannon", manufacturer: "Amon & Reese Co.", type: "Gun" },
        { name: "Relentless L-21 Gatling", manufacturer: "Kruger Intergalatic", type: "Gun" },
        { name: "Revenant Gatling", manufacturer: "Apocalypse Arms", type: "Gun" },
        { name: "Salvation Distortion Scattergun", manufacturer: "Aegis Dynamics", type: "Gun" },
        { name: "TMSB-5 Gatling", manufacturer: "Behring", type: "Gun" },
    ],
    5: [ // Size 5
        { name: "'WAR' Cannon", manufacturer: "Vanduul", type: "Gun" },
        { name: "'WRATH' Cannon", manufacturer: "Vanduul", type: "Gun" },
        { name: "Absolution Distortion Scattergun", manufacturer: "Aegis Dynamics", type: "Gun" },
        { name: "AD5B Ballistic Gatling", manufacturer: "Behring", type: "Gun" },
        { name: "Attrition-5 Repeater", manufacturer: "Hurston Dynamics", type: "Gun" },
        { name: "CF-557 Galdereen Repeater", manufacturer: "Klaus & Werner", type: "Gun" },
        { name: "Deadbolt V Cannon", manufacturer: "Esperia", type: "Gun" },
        { name: "Leonids Cannon", manufacturer: "Roberts Space Industries", type: "Gun" },
        { name: "Lightstrike V Cannon", manufacturer: "Esperia", type: "Gun" },
        { name: "M7A Cannon", manufacturer: "Behring", type: "Gun" },
        { name: "NV57 Ballistic Gatling", manufacturer: "Behring", type: "Gun" },
        { name: "Omnisky XV Cannon", manufacturer: "Amon & Reese Co.", type: "Gun" },
        { name: "Slayer Cannon", manufacturer: "Hurston Dynamics", type: "Gun" },
    ],
    6: [ // Size 6
        { name: "AD6B Ballistic Gatling", manufacturer: "Behring", type: "Gun" },
        { name: "Attrition-6 Repeater", manufacturer: "Hurston Dynamics", type: "Gun" },
        { name: "CF-667 Mammoth Repeater", manufacturer: "Klaus & Werner", type: "Gun" },
        { name: "Condemnation Distortion Scattergun", manufacturer: "Aegis Dynamics", type: "Gun" },
        { name: "Deadbolt VI Cannon", manufacturer: "Esperia", type: "Gun" },
        { name: "Draugar Gatling", manufacturer: "Apocalypse Arms", type: "Gun" },
        { name: "Lightstrike VI Cannon", manufacturer: "Esperia", type: "Gun" },
        { name: "M8A Cannon", manufacturer: "Behring", type: "Gun" },
        { name: "Maris Cannon", manufacturer: "Roberts Space Industries", type: "Gun" },
        { name: "Omnisky XVIII Cannon", manufacturer: "Amon & Reese Co.", type: "Gun" },
        { name: "Revenant Gatling", manufacturer: "Behring", type: "Gun" },
    ],
    7: [ // Size 7
        { name: "Conqueror-7", manufacturer: "Behring", type: "Gun" },
        { name: "M9A Cannon", manufacturer: "Behring", type: "Gun" },
        { name: "SF7B Gatling", manufacturer: "Behring", type: "Gun" },
        { name: "SF7E Cannon", manufacturer: "Behring", type: "Gun" },
        { name: "Tarantula GT-870 Mark 3 Cannon", manufacturer: "Gallenson Tactical Systems", type: "Gun" },
    ],
    8: [ // Size 8
        { name: "M9A Cannon", manufacturer: "Behring", type: "Gun" },
        { name: "RSI Medusa Cannon", manufacturer: "Roberts Space Industries", type: "Gun" },
        { name: "Tarantula GT-870 Mark 3 Cannon", manufacturer: "Gallenson Tactical Systems", type: "Gun" },
    ],
    9: [ // Size 9
        { name: "M9A Cannon", manufacturer: "Behring", type: "Gun" },
    ],
    10: [ // Size 10
        { name: "Destroyer Mass Driver Cannon", manufacturer: "Klaus & Werner", type: "Gun" },
        { name: "Exodus-10 Laser Beam", manufacturer: "Hurston Dynamics", type: "Gun" },
        { name: "GVSR Repeater", manufacturer: "Behring", type: "Gun" },
    ],
    12: [ // Size 12
        { name: "M9A Cannon", manufacturer: "Behring", type: "Gun" },
    ],
},

// ============ SHIELDS ============
shields: [
    // Size 0
    { name: "Castra", manufacturer: "Basilisk", size: 0, grade: "C" },
    { name: "PIN", manufacturer: "Seal Corporation", size: 0, grade: "C" },
    // Size 1
    { name: "5SA 'Rhada'", manufacturer: "Behring", size: 1, grade: "C" },
    { name: "6SA 'Arbiter'", manufacturer: "Behring", size: 1, grade: "B" },
    { name: "7SA 'Concord'", manufacturer: "Behring", size: 1, grade: "A" },
    { name: "AllStop", manufacturer: "Gorgon Defender Industries", size: 1, grade: "C" },
    { name: "Bulwark", manufacturer: "Basilisk", size: 1, grade: "C" },
    { name: "Cloak", manufacturer: "Ascension Astro", size: 1, grade: "D" },
    { name: "Falco", manufacturer: "Yorm", size: 1, grade: "D" },
    { name: "ForceWall", manufacturer: "Gorgon Defender Industries", size: 1, grade: "B" },
    { name: "FR-66", manufacturer: "Gorgon Defender Industries", size: 1, grade: "A" },
    { name: "Guardian", manufacturer: "Basilisk", size: 1, grade: "B" },
    { name: "HEX", manufacturer: "Seal Corporation", size: 1, grade: "B" },
    { name: "INK", manufacturer: "Seal Corporation", size: 1, grade: "D" },
    { name: "Jaghte", manufacturer: "Yorm", size: 1, grade: "B" },
    { name: "Mirage", manufacturer: "Ascension Astro", size: 1, grade: "A" },
    { name: "Palisade", manufacturer: "Basilisk", size: 1, grade: "A" },
    { name: "SecureHyde", manufacturer: "Gorgon Defender Industries", size: 1, grade: "D" },
    { name: "Shimmer", manufacturer: "Ascension Astro", size: 1, grade: "C" },
    { name: "Steward", manufacturer: "Basilisk", size: 1, grade: "D" },
    { name: "Suldrath", manufacturer: "Banu", size: 1, grade: "C" },
    { name: "Targa", manufacturer: "Yorm", size: 1, grade: "C" },
    { name: "Veil", manufacturer: "Ascension Astro", size: 1, grade: "B" },
    { name: "WEB", manufacturer: "Seal Corporation", size: 1, grade: "C" },
    // Size 2
    { name: "5MA 'Chimalli'", manufacturer: "Behring", size: 2, grade: "C" },
    { name: "6MA 'Kozane'", manufacturer: "Behring", size: 2, grade: "B" },
    { name: "7MA 'Lorica'", manufacturer: "Behring", size: 2, grade: "A" },
    { name: "Armada", manufacturer: "Basilisk", size: 2, grade: "D" },
    { name: "Aspis", manufacturer: "Basilisk", size: 2, grade: "C" },
    { name: "Bamoty", manufacturer: "Yorm", size: 2, grade: "D" },
    { name: "BLOC", manufacturer: "Seal Corporation", size: 2, grade: "B" },
    { name: "Citadel", manufacturer: "Basilisk", size: 2, grade: "B" },
    { name: "CoverAll", manufacturer: "Gorgon Defender Industries", size: 2, grade: "B" },
    { name: "FR-76", manufacturer: "Gorgon Defender Industries", size: 2, grade: "A" },
    { name: "FullStop", manufacturer: "Gorgon Defender Industries", size: 2, grade: "C" },
    { name: "Haltur", manufacturer: "Yorm", size: 2, grade: "B" },
    { name: "Obscura", manufacturer: "Ascension Astro", size: 2, grade: "C" },
    { name: "Rampart", manufacturer: "Basilisk", size: 2, grade: "A" },
    { name: "RPEL", manufacturer: "Seal Corporation", size: 2, grade: "D" },
    { name: "SecureShield", manufacturer: "Gorgon Defender Industries", size: 2, grade: "D" },
    { name: "Sheut", manufacturer: "Ascension Astro", size: 2, grade: "B" },
    { name: "Shroud", manufacturer: "Ascension Astro", size: 2, grade: "D" },
    { name: "STOP", manufacturer: "Seal Corporation", size: 2, grade: "C" },
    { name: "Sukoran", manufacturer: "Banu", size: 2, grade: "C" },
    { name: "Trenta", manufacturer: "Yorm", size: 2, grade: "C" },
    { name: "Umbra", manufacturer: "Ascension Astro", size: 2, grade: "A" },
    // Size 3
    { name: "5CA 'Akura'", manufacturer: "Behring", size: 3, grade: "C" },
    { name: "6CA 'Bila'", manufacturer: "Behring", size: 3, grade: "B" },
    { name: "7CA 'Nargun'", manufacturer: "Behring", size: 3, grade: "A" },
    { name: "ARMOR", manufacturer: "Seal Corporation", size: 3, grade: "B" },
    { name: "Barbican", manufacturer: "Basilisk", size: 3, grade: "B" },
    { name: "FR-86", manufacturer: "Gorgon Defender Industries", size: 3, grade: "A" },
    { name: "FullBlock", manufacturer: "Gorgon Defender Industries", size: 3, grade: "B" },
    { name: "GUARD", manufacturer: "Seal Corporation", size: 3, grade: "C" },
    { name: "HAVEN", manufacturer: "Seal Corporation", size: 3, grade: "D" },
    { name: "Parapet", manufacturer: "Basilisk", size: 3, grade: "A" },
    { name: "SecureScreen", manufacturer: "Gorgon Defender Industries", size: 3, grade: "D" },
    { name: "Stronghold", manufacturer: "Basilisk", size: 3, grade: "C" },
    { name: "SureStop", manufacturer: "Gorgon Defender Industries", size: 3, grade: "C" },
    { name: "Ward", manufacturer: "Basilisk", size: 3, grade: "D" },
    // Size 4
    { name: "Glacis", manufacturer: "Roberts Space Industries", size: 4, grade: "A" },
    { name: "Holdstrong", manufacturer: "Gorgon Defender Industries", size: 4, grade: "A" },
    { name: "RS-Barrier", manufacturer: "Unknown Manufacturer", size: 4, grade: "A" },
],

// ============ COOLERS ============
coolers: [
    // Size 0
    { name: "Cryo-Star SL", manufacturer: "J-Span", size: 0, grade: "B" },
    { name: "Fridan", manufacturer: "Wen/Cassel Propulsion", size: 0, grade: "C" },
    { name: "Frost-Star SL", manufacturer: "J-Span", size: 0, grade: "C" },
    { name: "Kelvid", manufacturer: "Wen/Cassel Propulsion", size: 0, grade: "B" },
    { name: "Tepilo", manufacturer: "Wen/Cassel Propulsion", size: 0, grade: "A" },
    { name: "Winter-Star SL", manufacturer: "J-Span", size: 0, grade: "D" },
    // Size 1
    { name: "ArcticStorm", manufacturer: "Lightning Power Ltd.", size: 1, grade: "C" },
    { name: "Berian", manufacturer: "Wen/Cassel Propulsion", size: 1, grade: "C" },
    { name: "BlastChill", manufacturer: "Lightning Power Ltd.", size: 1, grade: "D" },
    { name: "Bracer", manufacturer: "Aegis Dynamics", size: 1, grade: "C" },
    { name: "Cryo-Star", manufacturer: "J-Span", size: 1, grade: "B" },
    { name: "Eco-Flow", manufacturer: "Juno Starwerk", size: 1, grade: "B" },
    { name: "Endo", manufacturer: "Wen/Cassel Propulsion", size: 1, grade: "B" },
    { name: "FlashFreeze", manufacturer: "Lightning Power Ltd.", size: 1, grade: "B" },
    { name: "Frost-Star", manufacturer: "J-Span", size: 1, grade: "C" },
    { name: "Gelid", manufacturer: "Wen/Cassel Propulsion", size: 1, grade: "A" },
    { name: "Glacier", manufacturer: "Aegis Dynamics", size: 1, grade: "A" },
    { name: "HeatSafe", manufacturer: "Tyler Design & Tech", size: 1, grade: "C" },
    { name: "Hydrocel", manufacturer: "Juno Starwerk", size: 1, grade: "D" },
    { name: "IcePlunge", manufacturer: "ACOM", size: 1, grade: "C" },
    { name: "Polar", manufacturer: "Aegis Dynamics", size: 1, grade: "B" },
    { name: "QuikCool", manufacturer: "ACOM", size: 1, grade: "D" },
    { name: "SnowBlind", manufacturer: "Tyler Design & Tech", size: 1, grade: "A" },
    { name: "Thermax", manufacturer: "Juno Starwerk", size: 1, grade: "C" },
    { name: "Tundra", manufacturer: "Aegis Dynamics", size: 1, grade: "D" },
    { name: "Ultra-Flow", manufacturer: "Juno Starwerk", size: 1, grade: "A" },
    { name: "VaporBlock", manufacturer: "Tyler Design & Tech", size: 1, grade: "B" },
    { name: "Winter-Star", manufacturer: "J-Span", size: 1, grade: "D" },
    { name: "ZeroRush", manufacturer: "ACOM", size: 1, grade: "B" },
    // Size 2
    { name: "AbsoluteZero", manufacturer: "ACOM", size: 2, grade: "B" },
    { name: "Arctic", manufacturer: "Aegis Dynamics", size: 2, grade: "C" },
    { name: "Aufeis", manufacturer: "Wen/Cassel Propulsion", size: 2, grade: "A" },
    { name: "Avalanche", manufacturer: "Aegis Dynamics", size: 2, grade: "A" },
    { name: "Boreal", manufacturer: "Aegis Dynamics", size: 2, grade: "D" },
    { name: "ColdSnap", manufacturer: "Lightning Power Ltd.", size: 2, grade: "C" },
    { name: "CoolCore", manufacturer: "Juno Starwerk", size: 2, grade: "C" },
    { name: "Cryo-Star EX", manufacturer: "J-Span", size: 2, grade: "B" },
    { name: "Frost-Star EX", manufacturer: "J-Span", size: 2, grade: "C" },
    { name: "FullFrost", manufacturer: "Lightning Power Ltd.", size: 2, grade: "B" },
    { name: "Graupel", manufacturer: "Wen/Cassel Propulsion", size: 2, grade: "C" },
    { name: "HeatSink", manufacturer: "Tyler Design & Tech", size: 2, grade: "C" },
    { name: "HydroJet", manufacturer: "Juno Starwerk", size: 2, grade: "D" },
    { name: "IceBox", manufacturer: "Tyler Design & Tech", size: 2, grade: "B" },
    { name: "IceDive", manufacturer: "ACOM", size: 2, grade: "C" },
    { name: "NightFall", manufacturer: "Tyler Design & Tech", size: 2, grade: "A" },
    { name: "Permafrost", manufacturer: "Aegis Dynamics", size: 2, grade: "B" },
    { name: "RapidCool", manufacturer: "ACOM", size: 2, grade: "D" },
    { name: "Snowfall", manufacturer: "Juno Starwerk", size: 2, grade: "B" },
    { name: "Snowpack", manufacturer: "Juno Starwerk", size: 2, grade: "A" },
    { name: "Taiga", manufacturer: "Wen/Cassel Propulsion", size: 2, grade: "B" },
    { name: "WhiteOut", manufacturer: "Lightning Power Ltd.", size: 2, grade: "D" },
    { name: "Winter-Star EX", manufacturer: "J-Span", size: 2, grade: "D" },
    // Size 3
    { name: "Blizzard", manufacturer: "Aegis Dynamics", size: 3, grade: "A" },
    { name: "Chill-Max", manufacturer: "Juno Starwerk", size: 3, grade: "A" },
    { name: "ColdSurge", manufacturer: "Lightning Power Ltd.", size: 3, grade: "D" },
    { name: "Cryo-Star XL", manufacturer: "J-Span", size: 3, grade: "B" },
    { name: "Draug", manufacturer: "Wen/Cassel Propulsion", size: 3, grade: "A" },
    { name: "Elsen", manufacturer: "Aegis Dynamics", size: 3, grade: "A" },
    { name: "Frost-Star XL", manufacturer: "J-Span", size: 3, grade: "C" },
    { name: "FrostBite", manufacturer: "Lightning Power Ltd.", size: 3, grade: "B" },
    { name: "FrostBurn", manufacturer: "Lightning Power Ltd.", size: 3, grade: "C" },
    { name: "Galinstan", manufacturer: "Aegis Dynamics", size: 3, grade: "D" },
    { name: "Hydropulse", manufacturer: "Juno Starwerk", size: 3, grade: "D" },
    { name: "Ice-Flush", manufacturer: "Juno Starwerk", size: 3, grade: "B" },
    { name: "Kragen", manufacturer: "Wen/Cassel Propulsion", size: 3, grade: "A" },
    { name: "Mercury", manufacturer: "Aegis Dynamics", size: 3, grade: "C" },
    { name: "Tempest", manufacturer: "Aegis Dynamics", size: 3, grade: "B" },
    { name: "ThermalCore", manufacturer: "Juno Starwerk", size: 3, grade: "C" },
    { name: "Winter-Star XL", manufacturer: "J-Span", size: 3, grade: "D" },
    // Size 4
    { name: "Algid", manufacturer: "Unknown Manufacturer", size: 4, grade: "A" },
    { name: "Exotherm", manufacturer: "Unknown Manufacturer", size: 4, grade: "A" },
    { name: "Serac", manufacturer: "Roberts Space Industries", size: 4, grade: "A" },
],

// ============ POWER PLANTS ============
powerPlants: [
    // Size 0
    { name: "Defiant", manufacturer: "Juno Starwerk", size: 0, grade: "B" },
    { name: "DuraJet", manufacturer: "Lightning Power Ltd.", size: 0, grade: "D" },
    { name: "IonWave", manufacturer: "Lightning Power Ltd.", size: 0, grade: "B" },
    { name: "Jennet", manufacturer: "Juno Starwerk", size: 0, grade: "D" },
    { name: "Radix", manufacturer: "Unknown Manufacturer", size: 0, grade: "C" },
    { name: "Steadfast", manufacturer: "Juno Starwerk", size: 0, grade: "C" },
    // Size 1
    { name: "Breton", manufacturer: "Juno Starwerk", size: 1, grade: "A" },
    { name: "Charger", manufacturer: "Aegis Dynamics", size: 1, grade: "D" },
    { name: "DeltaMax", manufacturer: "Tyler Design & Tech", size: 1, grade: "B" },
    { name: "DynaFlux", manufacturer: "Amon & Reese Co.", size: 1, grade: "B" },
    { name: "Endurance", manufacturer: "Juno Starwerk", size: 1, grade: "B" },
    { name: "Fierell Cascade", manufacturer: "Aegis Dynamics", size: 1, grade: "B" },
    { name: "Fortitude", manufacturer: "Juno Starwerk", size: 1, grade: "C" },
    { name: "HyperGen", manufacturer: "Amon & Reese Co.", size: 1, grade: "D" },
    { name: "IonBurst", manufacturer: "Lightning Power Ltd.", size: 1, grade: "B" },
    { name: "JS-300", manufacturer: "Amon & Reese Co.", size: 1, grade: "A" },
    { name: "LightBlossom", manufacturer: "Sakura Sun", size: 1, grade: "C" },
    { name: "LumaCore", manufacturer: "ACOM", size: 1, grade: "A" },
    { name: "MagnaBloom", manufacturer: "Sakura Sun", size: 1, grade: "B" },
    { name: "OverDrive", manufacturer: "Amon & Reese Co.", size: 1, grade: "C" },
    { name: "PowerBolt", manufacturer: "Lightning Power Ltd.", size: 1, grade: "C" },
    { name: "QuadraCell", manufacturer: "Aegis Dynamics", size: 1, grade: "A" },
    { name: "Regulus", manufacturer: "Aegis Dynamics", size: 1, grade: "C" },
    { name: "Roughneck", manufacturer: "Juno Starwerk", size: 1, grade: "D" },
    { name: "Slipstream", manufacturer: "Tyler Design & Tech", size: 1, grade: "A" },
    { name: "SonicLite", manufacturer: "Tyler Design & Tech", size: 1, grade: "C" },
    { name: "StarHeart", manufacturer: "ACOM", size: 1, grade: "B" },
    { name: "SunFlare", manufacturer: "ACOM", size: 1, grade: "C" },
    { name: "WhiteRose", manufacturer: "Sakura Sun", size: 1, grade: "A" },
    { name: "ZapJet", manufacturer: "Lightning Power Ltd.", size: 1, grade: "D" },
    // Size 2
    { name: "Bolide", manufacturer: "Aegis Dynamics", size: 2, grade: "B" },
    { name: "Cirrus", manufacturer: "Tyler Design & Tech", size: 2, grade: "C" },
    { name: "DayBreak", manufacturer: "Sakura Sun", size: 2, grade: "C" },
    { name: "Diligence", manufacturer: "Juno Starwerk", size: 2, grade: "C" },
    { name: "Eclipse", manufacturer: "Tyler Design & Tech", size: 2, grade: "A" },
    { name: "ExoGen", manufacturer: "Amon & Reese Co.", size: 2, grade: "D" },
    { name: "FullForce", manufacturer: "Lightning Power Ltd.", size: 2, grade: "C" },
    { name: "GammaMax", manufacturer: "Tyler Design & Tech", size: 2, grade: "B" },
    { name: "Genoa", manufacturer: "Juno Starwerk", size: 2, grade: "A" },
    { name: "IonSurge", manufacturer: "Lightning Power Ltd.", size: 2, grade: "B" },
    { name: "JS-400", manufacturer: "Amon & Reese Co.", size: 2, grade: "A" },
    { name: "Lotus", manufacturer: "Sakura Sun", size: 2, grade: "A" },
    { name: "LuxCore", manufacturer: "ACOM", size: 2, grade: "A" },
    { name: "Maelstrom", manufacturer: "Aegis Dynamics", size: 2, grade: "C" },
    { name: "QuadraCell MT", manufacturer: "Aegis Dynamics", size: 2, grade: "A" },
    { name: "Radiance", manufacturer: "Sakura Sun", size: 2, grade: "B" },
    { name: "Sedulity", manufacturer: "Juno Starwerk", size: 2, grade: "B" },
    { name: "SolarFlare", manufacturer: "ACOM", size: 2, grade: "C" },
    { name: "SparkJet", manufacturer: "Lightning Power Ltd.", size: 2, grade: "D" },
    { name: "StarBurn", manufacturer: "ACOM", size: 2, grade: "B" },
    { name: "Trommel", manufacturer: "Juno Starwerk", size: 2, grade: "D" },
    { name: "TurboDrive", manufacturer: "Amon & Reese Co.", size: 2, grade: "C" },
    { name: "UltraFlux", manufacturer: "Amon & Reese Co.", size: 2, grade: "B" },
    { name: "Vortex", manufacturer: "Aegis Dynamics", size: 2, grade: "D" },
    // Size 3
    { name: "Celestial", manufacturer: "Sakura Sun", size: 3, grade: "B" },
    { name: "Centurion", manufacturer: "Aegis Dynamics", size: 3, grade: "C" },
    { name: "Drassik", manufacturer: "Aegis Dynamics", size: 3, grade: "D" },
    { name: "Durango", manufacturer: "Juno Starwerk", size: 3, grade: "A" },
    { name: "Fulgur", manufacturer: "Aegis Dynamics", size: 3, grade: "B" },
    { name: "FullForce Pro", manufacturer: "Lightning Power Ltd.", size: 3, grade: "C" },
    { name: "Ginzel", manufacturer: "Juno Starwerk", size: 3, grade: "C" },
    { name: "IonSurge Pro", manufacturer: "Lightning Power Ltd.", size: 3, grade: "B" },
    { name: "JS-500", manufacturer: "Amon & Reese Co.", size: 3, grade: "A" },
    { name: "MegaFlux", manufacturer: "Amon & Reese Co.", size: 3, grade: "B" },
    { name: "NewDawn", manufacturer: "Sakura Sun", size: 3, grade: "C" },
    { name: "QuadraCell MX", manufacturer: "Aegis Dynamics", size: 3, grade: "A" },
    { name: "Reliance", manufacturer: "Juno Starwerk", size: 3, grade: "B" },
    { name: "SmartGen", manufacturer: "Amon & Reese Co.", size: 3, grade: "D" },
    { name: "SparkJet Pro", manufacturer: "Lightning Power Ltd.", size: 3, grade: "D" },
    { name: "SuperDrive", manufacturer: "Amon & Reese Co.", size: 3, grade: "C" },
    { name: "TigerLilly", manufacturer: "Sakura Sun", size: 3, grade: "A" },
    // Size 4
    { name: "Main Powerplant", manufacturer: "Unknown Manufacturer", size: 4, grade: "A" },
    { name: "Stellate", manufacturer: "Roberts Space Industries", size: 4, grade: "A" },
],

// ============ QUANTUM DRIVES ============
quantumDrives: [
    // Size 1
    { name: "Atlas", manufacturer: "Roberts Space Industries", size: 1, grade: "A" },
    { name: "Beacon", manufacturer: "Wei-Tek", size: 1, grade: "C" },
    { name: "Burst", manufacturer: "ArcCorp", size: 1, grade: "B" },
    { name: "Colossus", manufacturer: "Juno Starwerk", size: 1, grade: "B" },
    { name: "Drift", manufacturer: "RAMP Corporation", size: 1, grade: "C" },
    { name: "Eos", manufacturer: "Roberts Space Industries", size: 1, grade: "C" },
    { name: "Expedition", manufacturer: "Tarsus", size: 1, grade: "C" },
    { name: "Flood", manufacturer: "ArcCorp", size: 1, grade: "D" },
    { name: "FoxFire", manufacturer: "Ace Astrogation", size: 1, grade: "B" },
    { name: "Goliath", manufacturer: "Juno Starwerk", size: 1, grade: "C" },
    { name: "Hyperion", manufacturer: "Roberts Space Industries", size: 1, grade: "B" },
    { name: "LightFire", manufacturer: "Ace Astrogation", size: 1, grade: "C" },
    { name: "Rush", manufacturer: "ArcCorp", size: 1, grade: "C" },
    { name: "Siren", manufacturer: "Wei-Tek", size: 1, grade: "B" },
    { name: "Spectre", manufacturer: "RAMP Corporation", size: 1, grade: "A" },
    { name: "VK-00", manufacturer: "Wei-Tek", size: 1, grade: "A" },
    { name: "Voyage", manufacturer: "Tarsus", size: 1, grade: "B" },
    { name: "Vulcan", manufacturer: "Juno Starwerk", size: 1, grade: "D" },
    { name: "Wayfare", manufacturer: "Tarsus", size: 1, grade: "D" },
    { name: "Zephyr", manufacturer: "RAMP Corporation", size: 1, grade: "B" },
    // Size 2
    { name: "Aither", manufacturer: "Roberts Space Industries", size: 2, grade: "B" },
    { name: "Bolon", manufacturer: "Juno Starwerk", size: 2, grade: "C" },
    { name: "Bolt", manufacturer: "RAMP Corporation", size: 2, grade: "B" },
    { name: "Cascade", manufacturer: "ArcCorp", size: 2, grade: "D" },
    { name: "Crossfield", manufacturer: "Wei-Tek", size: 2, grade: "C" },
    { name: "Flash", manufacturer: "ArcCorp", size: 2, grade: "B" },
    { name: "Hemera", manufacturer: "Roberts Space Industries", size: 2, grade: "A" },
    { name: "Huracan", manufacturer: "Juno Starwerk", size: 2, grade: "B" },
    { name: "Khaos", manufacturer: "Roberts Space Industries", size: 2, grade: "C" },
    { name: "Nova", manufacturer: "RAMP Corporation", size: 2, grade: "C" },
    { name: "Odyssey", manufacturer: "Tarsus", size: 2, grade: "C" },
    { name: "Quest", manufacturer: "Tarsus", size: 2, grade: "D" },
    { name: "Sojourn", manufacturer: "Tarsus", size: 2, grade: "B" },
    { name: "SparkFire", manufacturer: "Ace Astrogation", size: 2, grade: "C" },
    { name: "Spicule", manufacturer: "RAMP Corporation", size: 2, grade: "A" },
    { name: "SunFire", manufacturer: "Ace Astrogation", size: 2, grade: "B" },
    { name: "Torrent", manufacturer: "ArcCorp", size: 2, grade: "C" },
    { name: "XL-1", manufacturer: "Wei-Tek", size: 2, grade: "A" },
    { name: "Yaluk", manufacturer: "Juno Starwerk", size: 2, grade: "D" },
    { name: "Yeager", manufacturer: "Wei-Tek", size: 2, grade: "B" },
    // Size 3
    { name: "Agni", manufacturer: "Juno Starwerk", size: 3, grade: "B" },
    { name: "Balandin", manufacturer: "Wei-Tek", size: 3, grade: "B" },
    { name: "Drifter", manufacturer: "Tarsus", size: 3, grade: "D" },
    { name: "Echo", manufacturer: "ArcCorp", size: 3, grade: "D" },
    { name: "Erebos", manufacturer: "Roberts Space Industries", size: 3, grade: "A" },
    { name: "Fissure", manufacturer: "ArcCorp", size: 3, grade: "C" },
    { name: "Impulse", manufacturer: "ArcCorp", size: 3, grade: "B" },
    { name: "Kama", manufacturer: "Juno Starwerk", size: 3, grade: "C" },
    { name: "Metis", manufacturer: "Roberts Space Industries", size: 3, grade: "C" },
    { name: "Pontes", manufacturer: "Wei-Tek", size: 3, grade: "C" },
    { name: "Ranger", manufacturer: "Tarsus", size: 3, grade: "B" },
    { name: "TS-2", manufacturer: "Wei-Tek", size: 3, grade: "A" },
    { name: "Tyche", manufacturer: "Roberts Space Industries", size: 3, grade: "B" },
    { name: "Vesta", manufacturer: "Juno Starwerk", size: 3, grade: "D" },
    { name: "Wanderer", manufacturer: "Tarsus", size: 3, grade: "C" },
    // Size 4
    { name: "Allegro", manufacturer: "Unknown Manufacturer", size: 4, grade: "A" },
    { name: "Frontline", manufacturer: "Unknown Manufacturer", size: 4, grade: "A" },
],


        ships: [
        // ===== AEGIS =====
        {
            name: "Aegis Avenger Stalker",
            manufacturer: "Aegis",
            size: "Small",
            pilotWeapons: [{ size: 3 }, { size: 2 }, { size: 2 }],
            turrets: [],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Aegis Avenger Titan",
            manufacturer: "Aegis",
            size: "Small",
            pilotWeapons: [{ size: 3 }, { size: 2 }, { size: 2 }],
            turrets: [],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Aegis Avenger Warlock",
            manufacturer: "Aegis",
            size: "Small",
            pilotWeapons: [{ size: 3 }, { size: 2 }, { size: 2 }],
            turrets: [],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Aegis Eclipse",
            manufacturer: "Aegis",
            size: "Medium",
            pilotWeapons: [{ size: 2 }, { size: 2 }],
            turrets: [],
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
            pilotWeapons: [{ size: 3 }, { size: 3 }, { size: 3 }],
            turrets: [],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Aegis Hammerhead",
            manufacturer: "Aegis",
            size: "Large",
            pilotWeapons: [],
            turrets: [
                { type: "manned", guns: 4, size: 4 },
                { type: "manned", guns: 4, size: 4 },
                { type: "manned", guns: 4, size: 4 },
                { type: "manned", guns: 4, size: 4 },
                { type: "manned", guns: 4, size: 4 },
                { type: "manned", guns: 4, size: 4 }
            ],
            shields: { count: 2, size: 3 },
            powerPlants: { count: 2, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "Aegis Reclaimer",
            manufacturer: "Aegis",
            size: "Large",
            pilotWeapons: [],
            turrets: [
                { type: "manned", guns: 1, size: 5 },
                { type: "remote", guns: 1, size: 5 },
                { type: "remote", guns: 1, size: 5 },
                { type: "remote", guns: 1, size: 4 },
                { type: "remote", guns: 1, size: 4 },
                { type: "remote", guns: 1, size: 4 },
                { type: "remote", guns: 1, size: 4 },
                { type: "remote", guns: 1, size: 4 },
                { type: "remote", guns: 1, size: 4 },
                // Point defense turrets
                { type: "remote", guns: 1, size: 1 },
                { type: "remote", guns: 1, size: 1 },
                { type: "remote", guns: 1, size: 1 },
                { type: "remote", guns: 1, size: 1 },
                { type: "remote", guns: 1, size: 1 },
                { type: "remote", guns: 1, size: 1 },
                { type: "remote", guns: 1, size: 1 }
            ],
            shields: { count: 1, size: 4 },
            powerPlants: { count: 1, size: 4 },
            coolers: { count: 1, size: 4 },
            quantumDrive: { size: 3 }
        },
        {
            name: "Aegis Redeemer",
            manufacturer: "Aegis",
            size: "Large",
            pilotWeapons: [{ size: 3 }, { size: 3 }],
            turrets: [
                { type: "manned", guns: 2, size: 5 },
                { type: "manned", guns: 2, size: 5 },
                { type: "remote", guns: 2, size: 3 }
            ],
            shields: { count: 6, size: 2 },
            powerPlants: { count: 2, size: 4 },
            coolers: { count: 1, size: 3 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Aegis Retaliator Bomber",
            manufacturer: "Aegis",
            size: "Large",
            pilotWeapons: [],
            turrets: [
                { type: "manned", guns: 2, size: 2 },
                { type: "manned", guns: 2, size: 2 },
                { type: "manned", guns: 2, size: 2 },
                { type: "manned", guns: 2, size: 2 },
                { type: "manned", guns: 2, size: 2 }
            ],
            shields: { count: 6, size: 2 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Aegis Sabre",
            manufacturer: "Aegis",
            size: "Medium",
            pilotWeapons: [{ size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            turrets: [],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 2, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Aegis Vanguard Harbinger",
            manufacturer: "Aegis",
            size: "Large",
            pilotWeapons: [{ size: 2 }, { size: 2 }],
            turrets: [
                { type: "remote", guns: 4, size: 2 },
                { type: "manned", guns: 2, size: 2 }
            ],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Aegis Vanguard Sentinel",
            manufacturer: "Aegis",
            size: "Large",
            pilotWeapons: [{ size: 2 }, { size: 2 }],
            turrets: [
                { type: "remote", guns: 4, size: 2 },
                { type: "manned", guns: 2, size: 2 }
            ],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Aegis Vanguard Warden",
            manufacturer: "Aegis",
            size: "Large",
            pilotWeapons: [{ size: 2 }, { size: 2 }],
            turrets: [
                { type: "remote", guns: 4, size: 2 },
                { type: "manned", guns: 2, size: 2 }
            ],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Aegis Vanguard Hoplite",
            manufacturer: "Aegis",
            size: "Large",
            pilotWeapons: [{ size: 2 }, { size: 2 }],
            turrets: [
                { type: "remote", guns: 4, size: 2 },
                { type: "manned", guns: 2, size: 2 }
            ],
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
            pilotWeapons: [{ size: 3 }, { size: 3 }, { size: 1 }],
            turrets: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Anvil C8 Pisces",
            manufacturer: "Anvil",
            size: "Small",
            pilotWeapons: [{ size: 1 }, { size: 1 }],
            turrets: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Anvil C8R Pisces Rescue",
            manufacturer: "Anvil",
            size: "Small",
            pilotWeapons: [{ size: 1 }, { size: 1 }],
            turrets: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Anvil C8X Pisces Expedition",
            manufacturer: "Anvil",
            size: "Small",
            pilotWeapons: [{ size: 2 }, { size: 2 }, { size: 1 }, { size: 1 }],
            turrets: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Anvil Carrack",
            manufacturer: "Anvil",
            size: "Large",
            pilotWeapons: [],
            turrets: [
                { type: "manned", guns: 2, size: 4 },
                { type: "manned", guns: 2, size: 4 }
            ],
            shields: { count: 2, size: 3 },
            powerPlants: { count: 2, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "Anvil F7C Hornet Mk I",
            manufacturer: "Anvil",
            size: "Medium",
            pilotWeapons: [{ size: 3 }, { size: 2 }, { size: 2 }, { size: 3 }],
            turrets: [],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Anvil F7C Hornet Mk II",
            manufacturer: "Anvil",
            size: "Medium",
            pilotWeapons: [{ size: 4 }, { size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            turrets: [],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 2, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Anvil F7C-M Super Hornet",
            manufacturer: "Anvil",
            size: "Medium",
            pilotWeapons: [{ size: 3 }, { size: 3 }, { size: 2 }, { size: 2 }],
            turrets: [
                { type: "manned", guns: 1, size: 4 }
            ],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Anvil F7A Hornet Mk II",
            manufacturer: "Anvil",
            size: "Medium",
            pilotWeapons: [{ size: 4 }, { size: 4 }, { size: 3 }, { size: 3 }],
            turrets: [
                { type: "manned", guns: 2, size: 3 }
            ],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Anvil F8A Lightning",
            manufacturer: "Anvil",
            size: "Medium",
            pilotWeapons: [{ size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }, { size: 2 }, { size: 2 }, { size: 2 }, { size: 2 }],
            turrets: [],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Anvil F8C Lightning",
            manufacturer: "Anvil",
            size: "Medium",
            pilotWeapons: [{ size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }, { size: 2 }, { size: 2 }, { size: 2 }, { size: 2 }],
            turrets: [],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Anvil Gladiator",
            manufacturer: "Anvil",
            size: "Medium",
            pilotWeapons: [{ size: 3 }, { size: 3 }],
            turrets: [
                { type: "manned", guns: 1, size: 3 }
            ],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Anvil Hawk",
            manufacturer: "Anvil",
            size: "Small",
            pilotWeapons: [{ size: 2 }, { size: 2 }, { size: 2 }, { size: 2 }, { size: 2 }, { size: 2 }],
            turrets: [],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Anvil Hurricane",
            manufacturer: "Anvil",
            size: "Medium",
            pilotWeapons: [{ size: 4 }, { size: 4 }],
            turrets: [
                { type: "manned", guns: 2, size: 4 }
            ],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 2, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Anvil Terrapin",
            manufacturer: "Anvil",
            size: "Medium",
            pilotWeapons: [],
            turrets: [
                { type: "remote", guns: 2, size: 2 }
            ],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Anvil Valkyrie",
            manufacturer: "Anvil",
            size: "Large",
            pilotWeapons: [],
            turrets: [
                { type: "remote", guns: 2, size: 4 },
                { type: "manned", guns: 1, size: 3 },
                { type: "manned", guns: 1, size: 3 },
                { type: "manned", guns: 1, size: 3 },
                { type: "manned", guns: 1, size: 3 }
            ],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },

        // ===== AOPOA =====
        {
            name: "Aopoa Khartu-al",
            manufacturer: "Aopoa",
            size: "Medium",
            pilotWeapons: [{ size: 2 }, { size: 2 }],
            turrets: [],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },

        // ===== ARGO =====
        {
            name: "ARGO MOLE",
            manufacturer: "ARGO",
            size: "Large",
            pilotWeapons: [],
            turrets: [],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "ARGO RAFT",
            manufacturer: "ARGO",
            size: "Medium",
            pilotWeapons: [],
            turrets: [],
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
            pilotWeapons: [{ size: 3 }, { size: 3 }, { size: 3 }, { size: 3 }],
            turrets: [],
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
            pilotWeapons: [{ size: 1 }, { size: 1 }, { size: 1 }, { size: 1 }],
            turrets: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "C.O. Mustang Delta",
            manufacturer: "Consolidated Outland",
            size: "Small",
            pilotWeapons: [{ size: 2 }, { size: 2 }, { size: 1 }, { size: 1 }],
            turrets: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "C.O. Mustang Beta",
            manufacturer: "Consolidated Outland",
            size: "Small",
            pilotWeapons: [{ size: 1 }, { size: 1 }, { size: 1 }, { size: 1 }],
            turrets: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "C.O. Mustang Gamma",
            manufacturer: "Consolidated Outland",
            size: "Small",
            pilotWeapons: [{ size: 1 }, { size: 1 }, { size: 1 }, { size: 1 }],
            turrets: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "C.O. Mustang Omega",
            manufacturer: "Consolidated Outland",
            size: "Small",
            pilotWeapons: [{ size: 1 }, { size: 1 }, { size: 1 }, { size: 1 }],
            turrets: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "C.O. Nomad",
            manufacturer: "Consolidated Outland",
            size: "Small",
            pilotWeapons: [{ size: 3 }, { size: 2 }, { size: 2 }],
            turrets: [],
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
            pilotWeapons: [],
            turrets: [
                { type: "remote", guns: 2, size: 5 },
                { type: "remote", guns: 2, size: 4 }
            ],
            shields: { count: 2, size: 3 },
            powerPlants: { count: 2, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "Crusader Ares Inferno",
            manufacturer: "Crusader",
            size: "Medium",
            pilotWeapons: [{ size: 7 }],
            turrets: [],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Crusader Ares Ion",
            manufacturer: "Crusader",
            size: "Medium",
            pilotWeapons: [{ size: 7 }],
            turrets: [],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Crusader C2 Hercules Starlifter",
            manufacturer: "Crusader",
            size: "Large",
            pilotWeapons: [],
            turrets: [
                { type: "remote", guns: 2, size: 4 }
            ],
            shields: { count: 2, size: 3 },
            powerPlants: { count: 2, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "Crusader M2 Hercules Starlifter",
            manufacturer: "Crusader",
            size: "Large",
            pilotWeapons: [],
            turrets: [
                { type: "remote", guns: 2, size: 5 },
                { type: "remote", guns: 2, size: 4 }
            ],
            shields: { count: 2, size: 3 },
            powerPlants: { count: 2, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "Crusader Mercury Star Runner",
            manufacturer: "Crusader",
            size: "Large",
            pilotWeapons: [{ size: 3 }, { size: 3 }],
            turrets: [
                { type: "remote", guns: 2, size: 3 },
                { type: "remote", guns: 2, size: 3 }
            ],
            shields: { count: 1, size: 3 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Crusader Spirit A1",
            manufacturer: "Crusader",
            size: "Medium",
            pilotWeapons: [{ size: 4 }, { size: 4 }],
            turrets: [
                { type: "remote", guns: 2, size: 2 }
            ],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Crusader Spirit C1",
            manufacturer: "Crusader",
            size: "Medium",
            pilotWeapons: [],
            turrets: [
                { type: "remote", guns: 2, size: 3 }
            ],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Crusader Spirit E1",
            manufacturer: "Crusader",
            size: "Medium",
            pilotWeapons: [],
            turrets: [
                { type: "remote", guns: 2, size: 3 }
            ],
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
            pilotWeapons: [{ size: 4 }, { size: 3 }, { size: 3 }, { size: 1 }, { size: 1 }],
            turrets: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Drake Caterpillar",
            manufacturer: "Drake",
            size: "Large",
            pilotWeapons: [],
            turrets: [
                { type: "manned", guns: 2, size: 2 },
                { type: "manned", guns: 2, size: 2 }
            ],
            shields: { count: 3, size: 3 },
            powerPlants: { count: 2, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "Drake Corsair",
            manufacturer: "Drake",
            size: "Large",
            pilotWeapons: [{ size: 5 }, { size: 5 }],
            turrets: [
                { type: "manned", guns: 2, size: 4 },
                { type: "manned", guns: 2, size: 3 }
            ],
            shields: { count: 1, size: 3 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Drake Cutter",
            manufacturer: "Drake",
            size: "Small",
            pilotWeapons: [{ size: 1 }, { size: 1 }],
            turrets: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Drake Cutlass Black",
            manufacturer: "Drake",
            size: "Medium",
            pilotWeapons: [{ size: 3 }, { size: 3 }],
            turrets: [
                { type: "manned", guns: 2, size: 3 }
            ],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Drake Cutlass Blue",
            manufacturer: "Drake",
            size: "Medium",
            pilotWeapons: [{ size: 3 }, { size: 3 }],
            turrets: [
                { type: "manned", guns: 2, size: 3 }
            ],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Drake Cutlass Red",
            manufacturer: "Drake",
            size: "Medium",
            pilotWeapons: [{ size: 3 }, { size: 3 }],
            turrets: [],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Drake Cutlass Steel",
            manufacturer: "Drake",
            size: "Medium",
            pilotWeapons: [{ size: 3 }, { size: 3 }],
            turrets: [
                { type: "manned", guns: 2, size: 3 }
            ],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Drake Herald",
            manufacturer: "Drake",
            size: "Small",
            pilotWeapons: [{ size: 2 }, { size: 2 }],
            turrets: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Drake Vulture",
            manufacturer: "Drake",
            size: "Medium",
            pilotWeapons: [],
            turrets: [],
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
            pilotWeapons: [{ size: 4 }, { size: 3 }, { size: 3 }],
            turrets: [],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Esperia Glaive",
            manufacturer: "Esperia",
            size: "Medium",
            pilotWeapons: [{ size: 5 }, { size: 5 }, { size: 3 }, { size: 3 }],
            turrets: [],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Esperia Prowler",
            manufacturer: "Esperia",
            size: "Medium",
            pilotWeapons: [],
            turrets: [
                { type: "remote", guns: 2, size: 5 },
                { type: "manned", guns: 2, size: 3 }
            ],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Esperia Talon",
            manufacturer: "Esperia",
            size: "Small",
            pilotWeapons: [{ size: 3 }, { size: 3 }],
            turrets: [],
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
            pilotWeapons: [],
            turrets: [
                { type: "manned", guns: 2, size: 3 },
                { type: "manned", guns: 2, size: 3 }
            ],
            shields: { count: 2, size: 2 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Gatac Syulen",
            manufacturer: "Gatac",
            size: "Small",
            pilotWeapons: [{ size: 2 }, { size: 2 }],
            turrets: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },

        // ===== KRUGER =====
        {
            name: "Kruger P-52 Merlin",
            manufacturer: "Kruger",
            size: "Small",
            pilotWeapons: [{ size: 1 }, { size: 1 }, { size: 2 }],
            turrets: [],
            shields: { count: 1, size: 0 },
            powerPlants: { count: 1, size: 0 },
            coolers: { count: 1, size: 0 },
            quantumDrive: null
        },
        {
            name: "Kruger P-72 Archimedes",
            manufacturer: "Kruger",
            size: "Small",
            pilotWeapons: [{ size: 1 }, { size: 1 }],
            turrets: [],
            shields: { count: 1, size: 0 },
            powerPlants: { count: 1, size: 0 },
            coolers: { count: 1, size: 0 },
            quantumDrive: null
        },

        // ===== MISC =====
        {
            name: "MISC Freelancer",
            manufacturer: "MISC",
            size: "Medium",
            pilotWeapons: [{ size: 3 }, { size: 3 }],
            turrets: [
                { type: "manned", guns: 2, size: 3 }
            ],
            shields: { count: 3, size: 2 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "MISC Freelancer DUR",
            manufacturer: "MISC",
            size: "Medium",
            pilotWeapons: [{ size: 3 }, { size: 3 }],
            turrets: [
                { type: "manned", guns: 2, size: 3 }
            ],
            shields: { count: 3, size: 2 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "MISC Freelancer MAX",
            manufacturer: "MISC",
            size: "Medium",
            pilotWeapons: [{ size: 3 }, { size: 3 }],
            turrets: [
                { type: "manned", guns: 2, size: 3 }
            ],
            shields: { count: 3, size: 2 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "MISC Freelancer MIS",
            manufacturer: "MISC",
            size: "Medium",
            pilotWeapons: [{ size: 3 }, { size: 3 }],
            turrets: [
                { type: "manned", guns: 2, size: 3 }
            ],
            shields: { count: 3, size: 2 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "MISC Hull A",
            manufacturer: "MISC",
            size: "Small",
            pilotWeapons: [{ size: 2 }, { size: 2 }],
            turrets: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "MISC Hull C",
            manufacturer: "MISC",
            size: "Large",
            pilotWeapons: [],
            turrets: [
                { type: "manned", guns: 2, size: 4 },
                { type: "manned", guns: 2, size: 4 },
                { type: "manned", guns: 2, size: 4 }
            ],
            shields: { count: 2, size: 3 },
            powerPlants: { count: 2, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "MISC Prospector",
            manufacturer: "MISC",
            size: "Small",
            pilotWeapons: [{ size: 1 }],
            turrets: [],
            shields: { count: 3, size: 1 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 1 }
        },
        {
            name: "MISC Razor",
            manufacturer: "MISC",
            size: "Small",
            pilotWeapons: [{ size: 2 }, { size: 2 }],
            turrets: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "MISC Reliant Kore",
            manufacturer: "MISC",
            size: "Small",
            pilotWeapons: [{ size: 2 }, { size: 2 }],
            turrets: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "MISC Reliant Tana",
            manufacturer: "MISC",
            size: "Small",
            pilotWeapons: [{ size: 2 }, { size: 2 }],
            turrets: [
                { type: "manned", guns: 2, size: 2 }
            ],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "MISC Reliant Mako",
            manufacturer: "MISC",
            size: "Small",
            pilotWeapons: [{ size: 2 }, { size: 2 }],
            turrets: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "MISC Reliant Sen",
            manufacturer: "MISC",
            size: "Small",
            pilotWeapons: [{ size: 2 }, { size: 2 }],
            turrets: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "MISC Starfarer",
            manufacturer: "MISC",
            size: "Large",
            pilotWeapons: [],
            turrets: [
                { type: "manned", guns: 2, size: 4 },
                { type: "manned", guns: 2, size: 3 }
            ],
            shields: { count: 2, size: 3 },
            powerPlants: { count: 2, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "MISC Starfarer Gemini",
            manufacturer: "MISC",
            size: "Large",
            pilotWeapons: [],
            turrets: [
                { type: "manned", guns: 2, size: 5 },
                { type: "manned", guns: 2, size: 3 }
            ],
            shields: { count: 2, size: 3 },
            powerPlants: { count: 2, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },

        // ===== MIRAI =====
        {
            name: "Mirai Fury",
            manufacturer: "Mirai",
            size: "Small",
            pilotWeapons: [{ size: 1 }, { size: 1 }],
            turrets: [],
            shields: { count: 1, size: 0 },
            powerPlants: { count: 1, size: 0 },
            coolers: { count: 1, size: 0 },
            quantumDrive: null
        },
        {
            name: "Mirai Guardian",
            manufacturer: "Mirai",
            size: "Small",
            pilotWeapons: [{ size: 1 }, { size: 1 }],
            turrets: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Mirai Razor",
            manufacturer: "Mirai",
            size: "Small",
            pilotWeapons: [{ size: 2 }, { size: 2 }],
            turrets: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },

        // ===== ORIGIN =====
        {
            name: "Origin 100i",
            manufacturer: "Origin",
            size: "Small",
            pilotWeapons: [{ size: 2 }],
            turrets: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Origin 125a",
            manufacturer: "Origin",
            size: "Small",
            pilotWeapons: [{ size: 2 }, { size: 1 }, { size: 1 }],
            turrets: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Origin 135c",
            manufacturer: "Origin",
            size: "Small",
            pilotWeapons: [{ size: 2 }],
            turrets: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Origin 300i",
            manufacturer: "Origin",
            size: "Small",
            pilotWeapons: [{ size: 3 }, { size: 2 }, { size: 2 }],
            turrets: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Origin 315p",
            manufacturer: "Origin",
            size: "Small",
            pilotWeapons: [{ size: 3 }, { size: 2 }, { size: 2 }],
            turrets: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Origin 325a",
            manufacturer: "Origin",
            size: "Small",
            pilotWeapons: [{ size: 4 }, { size: 3 }, { size: 3 }],
            turrets: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Origin 350r",
            manufacturer: "Origin",
            size: "Small",
            pilotWeapons: [{ size: 3 }, { size: 2 }, { size: 2 }],
            turrets: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "Origin 400i",
            manufacturer: "Origin",
            size: "Medium",
            pilotWeapons: [{ size: 4 }],
            turrets: [
                { type: "remote", guns: 2, size: 3 }
            ],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "Origin 600i",
            manufacturer: "Origin",
            size: "Large",
            pilotWeapons: [],
            turrets: [
                { type: "remote", guns: 2, size: 5 },
                { type: "remote", guns: 2, size: 4 }
            ],
            shields: { count: 2, size: 3 },
            powerPlants: { count: 1, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "Origin 600i Explorer",
            manufacturer: "Origin",
            size: "Large",
            pilotWeapons: [],
            turrets: [
                { type: "remote", guns: 2, size: 5 },
                { type: "remote", guns: 2, size: 4 }
            ],
            shields: { count: 2, size: 3 },
            powerPlants: { count: 1, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "Origin 600i Touring",
            manufacturer: "Origin",
            size: "Large",
            pilotWeapons: [],
            turrets: [
                { type: "remote", guns: 2, size: 5 },
                { type: "remote", guns: 2, size: 4 }
            ],
            shields: { count: 2, size: 3 },
            powerPlants: { count: 1, size: 3 },
            coolers: { count: 2, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "Origin 890 Jump",
            manufacturer: "Origin",
            size: "Capital",
            pilotWeapons: [],
            turrets: [
                { type: "manned", guns: 2, size: 5 },
                { type: "manned", guns: 2, size: 4 },
                { type: "manned", guns: 2, size: 4 }
            ],
            shields: { count: 2, size: 4 },
            powerPlants: { count: 1, size: 4 },
            coolers: { count: 2, size: 4 },
            quantumDrive: { size: 4 }
        },
        {
            name: "Origin M50",
            manufacturer: "Origin",
            size: "Small",
            pilotWeapons: [{ size: 2 }, { size: 2 }],
            turrets: [],
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
            pilotWeapons: [{ size: 2 }, { size: 1 }, { size: 1 }],
            turrets: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "RSI Aurora ES",
            manufacturer: "RSI",
            size: "Small",
            pilotWeapons: [{ size: 2 }],
            turrets: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "RSI Aurora LN",
            manufacturer: "RSI",
            size: "Small",
            pilotWeapons: [{ size: 2 }, { size: 2 }, { size: 1 }, { size: 1 }],
            turrets: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "RSI Aurora LX",
            manufacturer: "RSI",
            size: "Small",
            pilotWeapons: [{ size: 2 }, { size: 1 }, { size: 1 }],
            turrets: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "RSI Aurora MR",
            manufacturer: "RSI",
            size: "Small",
            pilotWeapons: [{ size: 2 }, { size: 1 }, { size: 1 }],
            turrets: [],
            shields: { count: 1, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 1, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "RSI Constellation Andromeda",
            manufacturer: "RSI",
            size: "Large",
            pilotWeapons: [{ size: 4 }, { size: 4 }],
            turrets: [
                { type: "manned", guns: 2, size: 5 }
            ],
            shields: { count: 1, size: 3 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "RSI Constellation Aquila",
            manufacturer: "RSI",
            size: "Large",
            pilotWeapons: [{ size: 4 }, { size: 4 }],
            turrets: [
                { type: "manned", guns: 2, size: 5 }
            ],
            shields: { count: 1, size: 3 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "RSI Constellation Phoenix",
            manufacturer: "RSI",
            size: "Large",
            pilotWeapons: [{ size: 4 }, { size: 4 }],
            turrets: [
                { type: "manned", guns: 2, size: 5 }
            ],
            shields: { count: 1, size: 3 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "RSI Constellation Taurus",
            manufacturer: "RSI",
            size: "Large",
            pilotWeapons: [{ size: 4 }, { size: 4 }],
            turrets: [
                { type: "manned", guns: 2, size: 5 }
            ],
            shields: { count: 1, size: 3 },
            powerPlants: { count: 2, size: 2 },
            coolers: { count: 2, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "RSI Mantis",
            manufacturer: "RSI",
            size: "Medium",
            pilotWeapons: [{ size: 3 }, { size: 3 }],
            turrets: [],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "RSI Meteor",
            manufacturer: "RSI",
            size: "Medium",
            pilotWeapons: [{ size: 5 }, { size: 5 }, { size: 3 }, { size: 3 }],
            turrets: [],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "RSI Meteor PYAM Exec",
            manufacturer: "RSI",
            size: "Medium",
            pilotWeapons: [{ size: 5 }, { size: 5 }, { size: 3 }, { size: 3 }],
            turrets: [],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "RSI Meteor Wikelo Sneak Special",
            manufacturer: "RSI",
            size: "Medium",
            pilotWeapons: [{ size: 5 }, { size: 5 }, { size: 3 }, { size: 3 }],
            turrets: [],
            shields: { count: 2, size: 1 },
            powerPlants: { count: 1, size: 1 },
            coolers: { count: 2, size: 1 },
            quantumDrive: { size: 1 }
        },
        {
            name: "RSI Perseus",
            manufacturer: "RSI",
            size: "Large",
            pilotWeapons: [],
            turrets: [
                { type: "manned", guns: 1, size: 8 },
                { type: "manned", guns: 1, size: 8 },
                { type: "manned", guns: 2, size: 3 },
                { type: "manned", guns: 2, size: 3 },
                { type: "remote", guns: 2, size: 1 }
            ],
            shields: { count: 1, size: 3 },
            powerPlants: { count: 1, size: 3 },
            coolers: { count: 1, size: 3 },
            quantumDrive: { size: 3 }
        },
        {
            name: "RSI Scorpius",
            manufacturer: "RSI",
            size: "Medium",
            pilotWeapons: [{ size: 3 }, { size: 3 }],
            turrets: [
                { type: "manned", guns: 2, size: 4 }
            ],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "RSI Zeus Mk II CL",
            manufacturer: "RSI",
            size: "Medium",
            pilotWeapons: [{ size: 3 }, { size: 3 }],
            turrets: [
                { type: "remote", guns: 2, size: 3 }
            ],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "RSI Zeus Mk II ES",
            manufacturer: "RSI",
            size: "Medium",
            pilotWeapons: [{ size: 3 }, { size: 3 }],
            turrets: [
                { type: "remote", guns: 2, size: 3 }
            ],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
        {
            name: "RSI Zeus Mk II MR",
            manufacturer: "RSI",
            size: "Medium",
            pilotWeapons: [{ size: 3 }, { size: 3 }],
            turrets: [
                { type: "remote", guns: 2, size: 3 }
            ],
            shields: { count: 1, size: 2 },
            powerPlants: { count: 1, size: 2 },
            coolers: { count: 1, size: 2 },
            quantumDrive: { size: 2 }
        },
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
        pilotWeapons: ["Revenant Gatling","Omnisky IX Cannon"],
        turretWeapons: []
    },
    "Aegis Avenger Titan": {
        quantumDrives: ["Expedition"],
        powerPlants: ["Endurance"],
        coolers: ["Bracer"],
        shields: ["Bulwark"],
        pilotWeapons: ["Revenant Gatling","Omnisky IX Cannon"],
        turretWeapons: []
    },
    "Aegis Avenger Titan Renegade": {
        quantumDrives: ["Expedition"],
        powerPlants: ["Endurance"],
        coolers: ["Bracer"],
        shields: ["Bulwark"],
        pilotWeapons: ["11-Series Broadsword Cannon","Omnisky IX Cannon"],
        turretWeapons: []
    },
    "Aegis Avenger Warlock": {
        quantumDrives: ["Expedition"],
        powerPlants: ["Regulus"],
        coolers: ["Bracer"],
        shields: ["Shimmer"],
        pilotWeapons: ["Revenant Gatling","Omnisky IX Cannon"],
        turretWeapons: []
    },
    "Aegis Eclipse": {
        quantumDrives: ["Drift"],
        powerPlants: ["DeltaMax"],
        coolers: ["VaporBlock"],
        shields: ["Veil"],
        pilotWeapons: ["CF-227 Badger Repeater"],
        turretWeapons: []
    },
    "Aegis Gladius": {
        quantumDrives: ["Beacon"],
        powerPlants: ["Regulus"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        pilotWeapons: ["CF-337 Panther Repeater","Mantis GT-220 Gatling"],
        turretWeapons: []
    },
    "Aegis Gladius Dunlevy": {
        quantumDrives: ["Beacon"],
        powerPlants: ["QuadraCell"],
        coolers: ["Glacier"],
        shields: ["FR-66"],
        pilotWeapons: ["CF-337 Panther Repeater","Mantis GT-220 Gatling"],
        turretWeapons: []
    },
    "Aegis Gladius Pirate": {
        quantumDrives: ["Expedition"],
        powerPlants: ["Charger"],
        coolers: ["Polar"],
        shields: ["SecureHyde"],
        pilotWeapons: ["CF-337 Panther Repeater","Mantis GT-220 Gatling"],
        turretWeapons: []
    },
    "Aegis Gladius Valiant": {
        quantumDrives: ["Beacon"],
        powerPlants: ["Regulus"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        pilotWeapons: ["Omnisky IX Cannon","CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "Aegis Hammerhead": {
        quantumDrives: ["Kama"],
        powerPlants: ["SuperDrive"],
        coolers: ["Mercury"],
        shields: ["Stronghold"],
        pilotWeapons: [],
        turretWeapons: ["CF-447 Rhino Repeater"]
    },
    "Aegis Hammerhead 2949 Best In Show Edition": {
        quantumDrives: ["Kama"],
        powerPlants: ["SuperDrive"],
        coolers: ["Mercury"],
        shields: ["Stronghold"],
        pilotWeapons: [],
        turretWeapons: ["CF-447 Rhino Repeater"]
    },
    "Aegis Idris-M": {
        quantumDrives: ["Frontline"],
        powerPlants: ["Main Powerplant"],
        coolers: ["Exotherm"],
        shields: ["Holdstrong"],
        pilotWeapons: ["Revenant Gatling","CF-557 Galdereen Repeater","M9A Cannon","Destroyer Mass Driver Cannon","M2C \"Swarm\""],
        turretWeapons: []
    },
    "Aegis Idris-P": {
        quantumDrives: ["Frontline"],
        powerPlants: ["Main Powerplant"],
        coolers: ["Exotherm"],
        shields: ["Holdstrong"],
        pilotWeapons: ["Revenant Gatling","CF-557 Galdereen Repeater","M7A Cannon","M2C \"Swarm\""],
        turretWeapons: []
    },
    "Aegis Idris-P Wikelo War Special": {
        quantumDrives: ["Frontline"],
        powerPlants: ["Main Powerplant"],
        coolers: ["Exotherm"],
        shields: ["Holdstrong"],
        pilotWeapons: ["Revenant Gatling","Attrition-5 Repeater","M2C \"Swarm\""],
        turretWeapons: []
    },
    "Aegis Javelin": {
        quantumDrives: [],
        powerPlants: ["Main Powerplant"],
        coolers: [],
        shields: [],
        pilotWeapons: ["M9A Cannon"],
        turretWeapons: []
    },
    "Aegis Reclaimer": {
        quantumDrives: ["Kama"],
        powerPlants: ["Main Powerplant"],
        coolers: ["Algid"],
        shields: ["RS-Barrier"],
        pilotWeapons: [],
        turretWeapons: ["M2C \"Swarm\""]
    },
    "Aegis Reclaimer 2949 Best In Show Edition": {
        quantumDrives: ["Kama"],
        powerPlants: ["Main Powerplant"],
        coolers: ["Algid"],
        shields: ["RS-Barrier"],
        pilotWeapons: [],
        turretWeapons: []
    },
    "Aegis Reclaimer Teach's Special": {
        quantumDrives: ["Kama"],
        powerPlants: ["Main Powerplant"],
        coolers: ["Algid"],
        shields: ["RS-Barrier"],
        pilotWeapons: [],
        turretWeapons: []
    },
    "Aegis Redeemer": {
        quantumDrives: ["Crossfield"],
        powerPlants: ["Centurion"],
        coolers: ["Blizzard"],
        shields: ["FullStop"],
        pilotWeapons: ["AD4B Ballistic Gatling","M5A Cannon","C-788 Cannon"],
        turretWeapons: []
    },
    "Aegis Retaliator": {
        quantumDrives: ["Crossfield"],
        powerPlants: ["Maelstrom"],
        coolers: ["Arctic"],
        shields: ["FullStop"],
        pilotWeapons: ["CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "Aegis Retaliator Bomber": {
        quantumDrives: ["Crossfield"],
        powerPlants: ["Maelstrom"],
        coolers: ["Arctic"],
        shields: ["FullStop"],
        pilotWeapons: [],
        turretWeapons: ["CF-337 Panther Repeater"]
    },
    "Aegis Sabre": {
        quantumDrives: ["Drift"],
        powerPlants: ["SonicLite"],
        coolers: ["Bracer"],
        shields: ["Shimmer"],
        pilotWeapons: ["CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "Aegis Sabre Comet": {
        quantumDrives: ["Drift"],
        powerPlants: ["SonicLite"],
        coolers: ["Bracer"],
        shields: ["Shimmer"],
        pilotWeapons: ["Omnisky IX Cannon","PyroBurst Scattergun"],
        turretWeapons: []
    },
    "Aegis Sabre Firebird": {
        quantumDrives: ["Drift"],
        powerPlants: ["SonicLite","Charger"],
        coolers: ["Bracer"],
        shields: ["Shimmer"],
        pilotWeapons: ["Mantis GT-220 Gatling"],
        turretWeapons: []
    },
    "Aegis Sabre Firebird Wikelo War Special": {
        quantumDrives: ["VK-00"],
        powerPlants: ["QuadraCell"],
        coolers: ["Glacier"],
        shields: ["FR-66"],
        pilotWeapons: ["Mantis GT-220 Gatling"],
        turretWeapons: []
    },
    "Aegis Sabre Peregrine": {
        quantumDrives: ["Drift"],
        powerPlants: ["SonicLite","Charger"],
        coolers: ["Bracer"],
        shields: ["Shimmer"],
        pilotWeapons: [],
        turretWeapons: []
    },
    "Aegis Sabre Peregrine Wikelo Speedy Special": {
        quantumDrives: ["FoxFire"],
        powerPlants: ["LumaCore"],
        coolers: ["ZeroRush"],
        shields: ["Jaghte"],
        pilotWeapons: [],
        turretWeapons: []
    },
    "Aegis Sabre Raven": {
        quantumDrives: ["Drift"],
        powerPlants: ["SonicLite","Charger"],
        coolers: ["Bracer"],
        shields: ["Shimmer"],
        pilotWeapons: ["Quarreler Cannon"],
        turretWeapons: []
    },
    "Aegis Vanguard Harbinger": {
        quantumDrives: ["Yeager"],
        powerPlants: ["TurboDrive"],
        coolers: ["Permafrost"],
        shields: ["SecureShield"],
        pilotWeapons: ["Deadbolt V Cannon","CVSA Cannon","Jericho XL"],
        turretWeapons: []
    },
    "Aegis Vanguard Hoplite": {
        quantumDrives: ["Crossfield"],
        powerPlants: ["Maelstrom"],
        coolers: ["Arctic"],
        shields: ["FullStop"],
        pilotWeapons: ["Deadbolt V Cannon","BRVS Repeater","SW16BR2 “Sawbuck” Repeater"],
        turretWeapons: []
    },
    "Aegis Vanguard Sentinel": {
        quantumDrives: ["Nova"],
        powerPlants: ["GammaMax"],
        coolers: ["HeatSink"],
        shields: ["Sheut"],
        pilotWeapons: ["Attrition-5 Repeater","ATVS Repeater","Suckerpunch-L Cannon"],
        turretWeapons: []
    },
    "Aegis Vanguard Warden": {
        quantumDrives: ["Crossfield"],
        powerPlants: ["Maelstrom"],
        coolers: ["Arctic"],
        shields: ["FullStop"],
        pilotWeapons: ["Deadbolt V Cannon","MVSA Cannon","SW16BR2 “Sawbuck” Repeater"],
        turretWeapons: []
    },
    "Anvil Arrow": {
        quantumDrives: ["Beacon"],
        powerPlants: ["Regulus"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        pilotWeapons: ["CF-337 Panther Repeater","CF-337 Panther Repeater","YellowJacket GT-210 Gatling"],
        turretWeapons: []
    },
    "Anvil Asgard": {
        quantumDrives: ["Odyssey"],
        powerPlants: ["Maelstrom"],
        coolers: ["Arctic"],
        shields: ["FullStop"],
        pilotWeapons: ["CF-447 Rhino Repeater","CF-337 Panther Repeater","YellowJacket GT-210 Gatling"],
        turretWeapons: []
    },
    "Anvil Asgard Wikelo War Special": {
        quantumDrives: ["Yeager"],
        powerPlants: ["Bolide"],
        coolers: ["Permafrost"],
        shields: ["CoverAll"],
        pilotWeapons: ["CF-447 Rhino Repeater","CF-337 Panther Repeater","Attrition-3 Repeater","YellowJacket GT-210 Gatling"],
        turretWeapons: []
    },
    "Anvil Ballista": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        pilotWeapons: ["Scorpion GT-215 Gatling"],
        turretWeapons: []
    },
    "Anvil Ballista Dunestalker": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        pilotWeapons: ["Scorpion GT-215 Gatling"],
        turretWeapons: []
    },
    "Anvil Ballista Snowblind": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        pilotWeapons: ["Scorpion GT-215 Gatling"],
        turretWeapons: []
    },
    "Anvil C8 Pisces": {
        quantumDrives: ["Expedition"],
        powerPlants: ["Regulus"],
        coolers: ["Bracer"],
        shields: ["Shimmer"],
        pilotWeapons: ["CF-117 Bulldog Repeater"],
        turretWeapons: []
    },
    "Anvil C8R Pisces Rescue": {
        quantumDrives: ["Expedition"],
        powerPlants: ["Regulus"],
        coolers: ["Bracer"],
        shields: ["Shimmer"],
        pilotWeapons: ["CF-117 Bulldog Repeater"],
        turretWeapons: []
    },
    "Anvil C8X Pisces Expedition": {
        quantumDrives: ["Expedition"],
        powerPlants: ["Regulus"],
        coolers: ["Bracer"],
        shields: ["Shimmer"],
        pilotWeapons: ["CF-117 Bulldog Repeater","FL-11 Cannon"],
        turretWeapons: []
    },
    "Anvil Carrack": {
        quantumDrives: ["Kama"],
        powerPlants: ["Reliance"],
        coolers: ["Ice-Flush"],
        shields: ["Barbican"],
        pilotWeapons: [],
        turretWeapons: ["CF-447 Rhino Repeater"]
    },
    "Anvil Carrack Expedition": {
        quantumDrives: ["Kama"],
        powerPlants: ["Reliance"],
        coolers: ["Ice-Flush"],
        shields: ["Barbican"],
        pilotWeapons: [],
        turretWeapons: ["CF-447 Rhino Repeater"]
    },
    "Anvil Centurion": {
        quantumDrives: [],
        powerPlants: ["OverDrive","Defiant"],
        coolers: ["Cryo-Star SL","Frost-Star"],
        shields: ["Castra"],
        pilotWeapons: ["Attrition-3 Repeater","CF-447 Rhino Repeater"],
        turretWeapons: []
    },
    "Anvil F7 Hornet Mk Wikelo": {
        quantumDrives: ["VK-00"],
        powerPlants: ["JS-400"],
        coolers: ["Glacier"],
        shields: ["FR-66","AllStop"],
        pilotWeapons: ["Revenant Gatling","CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "Anvil F7A Hornet Mk I": {
        quantumDrives: ["Eos"],
        powerPlants: ["TurboDrive"],
        coolers: ["ArcticStorm"],
        shields: ["WEB"],
        pilotWeapons: ["CF-337 Panther Repeater","CF-227 Badger Repeater","AD4B Ballistic Gatling"],
        turretWeapons: []
    },
    "Anvil F7A Hornet Mk II": {
        quantumDrives: ["Eos"],
        powerPlants: ["Maelstrom"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        pilotWeapons: ["Revenant Gatling","Revenant Gatling","Omnisky IX Cannon","Omnisky IX Cannon"],
        turretWeapons: ["Omnisky IX Cannon"]
    },
    "Anvil F7C Hornet Mk I": {
        quantumDrives: ["Eos"],
        powerPlants: ["PowerBolt"],
        coolers: ["ArcticStorm"],
        shields: ["WEB"],
        pilotWeapons: ["CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "Anvil F7C Hornet Mk II": {
        quantumDrives: ["Eos"],
        powerPlants: ["Regulus"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        pilotWeapons: ["Revenant Gatling"],
        turretWeapons: []
    },
    "Anvil F7C Hornet Wildfire Mk I": {
        quantumDrives: ["Eos"],
        powerPlants: ["Roughneck"],
        coolers: ["ArcticStorm"],
        shields: ["WEB"],
        pilotWeapons: ["Revenant Gatling","Tarantula GT-870 Mark 3 Cannon"],
        turretWeapons: []
    },
    "Anvil F7C-M Hornet Heartseeker Mk I": {
        quantumDrives: ["Eos"],
        powerPlants: ["OverDrive"],
        coolers: ["Polar"],
        shields: ["ForceWall"],
        pilotWeapons: ["Mantis GT-220 Gatling","CF-117 Bulldog Repeater","M6A Cannon"],
        turretWeapons: []
    },
    "Anvil F7C-M Hornet Heartseeker Mk II": {
        quantumDrives: ["Eos"],
        powerPlants: ["Maelstrom"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        pilotWeapons: ["Revenant Gatling","TMSB-5 Gatling","CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "Anvil F7C-M Super Hornet Mk I": {
        quantumDrives: ["Eos"],
        powerPlants: ["Regulus"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        pilotWeapons: ["Mantis GT-220 Gatling","CF-117 Bulldog Repeater","CF-227 Badger Repeater"],
        turretWeapons: []
    },
    "Anvil F7C-M Super Hornet Mk II": {
        quantumDrives: ["Eos"],
        powerPlants: ["Maelstrom"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        pilotWeapons: ["Revenant Gatling","CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "Anvil F7C-M Super Hornet": {
        quantumDrives: ["Eos"],
        powerPlants: ["Regulus"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        pilotWeapons: ["Mantis GT-220 Gatling","CF-117 Bulldog Repeater","CF-227 Badger Repeater"],
        turretWeapons: []
    },
    "Anvil F7C-R Hornet Tracker Mk I": {
        quantumDrives: ["Eos"],
        powerPlants: ["LumaCore"],
        coolers: ["IcePlunge"],
        shields: ["Targa"],
        pilotWeapons: ["CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "Anvil F7C-R Hornet Tracker Mk II": {
        quantumDrives: ["Eos"],
        powerPlants: ["Regulus"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        pilotWeapons: ["Revenant Gatling"],
        turretWeapons: []
    },
    "Anvil F7C-S Hornet Ghost Mk I": {
        quantumDrives: ["Eos"],
        powerPlants: ["Slipstream"],
        coolers: ["HeatSafe"],
        shields: ["Shimmer"],
        pilotWeapons: ["Omnisky IX Cannon"],
        turretWeapons: []
    },
    "Anvil F7C-S Hornet Ghost Mk II": {
        quantumDrives: ["Drift"],
        powerPlants: ["SonicLite"],
        coolers: ["HeatSafe"],
        shields: ["Shimmer"],
        pilotWeapons: ["Revenant Gatling"],
        turretWeapons: []
    },
    "Anvil F8A Lightning": {
        quantumDrives: ["Expedition"],
        powerPlants: ["Maelstrom"],
        coolers: ["Polar"],
        shields: ["Sheut"],
        pilotWeapons: ["M5A Cannon","M6A Cannon","CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "Anvil F8C Lightning": {
        quantumDrives: ["Crossfield"],
        powerPlants: ["Maelstrom"],
        coolers: ["Polar","Polar"],
        shields: ["Sheut"],
        pilotWeapons: ["CF-337 Panther Repeater","CF-337 Panther Repeater","Tarantula GT-870 Mark 3 Cannon","Tarantula GT-870 Mark 3 Cannon","CF-227 Badger Repeater","CF-227 Badger Repeater","Tarantula GT-870 Mark 2 Cannon","Tarantula GT-870 Mark 2 Cannon"],
        turretWeapons: []
    },
    "Anvil F8C Lightning Executive Edition": {
        quantumDrives: ["Expedition"],
        powerPlants: ["Maelstrom"],
        coolers: ["Polar"],
        shields: ["Sheut"],
        pilotWeapons: ["Tarantula GT-870 Mark 2 Cannon","Tarantula GT-870 Mark 3 Cannon","CF-337 Panther Repeater","CF-227 Badger Repeater"],
        turretWeapons: []
    },
    "Anvil F8C Lightning Wikelo Sneak Special": {
        quantumDrives: ["Colossus"],
        powerPlants: ["Eclipse"],
        coolers: ["SnowBlind"],
        shields: ["Umbra"],
        pilotWeapons: ["Tarantula GT-870 Mark 2 Cannon","Tarantula GT-870 Mark 3 Cannon","CF-337 Panther Repeater","CF-227 Badger Repeater"],
        turretWeapons: []
    },
    "Anvil F8C Lightning Wikelo War Special": {
        quantumDrives: ["Colossus"],
        powerPlants: ["LuxCore"],
        coolers: ["Glacier"],
        shields: ["FR-76"],
        pilotWeapons: ["Tarantula GT-870 Mark 2 Cannon","Tarantula GT-870 Mark 3 Cannon","CF-337 Panther Repeater","CF-227 Badger Repeater"],
        turretWeapons: []
    },
    "Anvil Gladiator": {
        quantumDrives: ["Beacon"],
        powerPlants: ["Maelstrom"],
        coolers: ["Bracer"],
        shields: ["FullStop"],
        pilotWeapons: ["CF-447 Rhino Repeater","CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "Anvil Hawk": {
        quantumDrives: ["Rush"],
        powerPlants: ["Regulus"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        pilotWeapons: ["CF-227 Badger Repeater","Suckerpunch Cannon"],
        turretWeapons: []
    },
    "Anvil Hurricane": {
        quantumDrives: ["Expedition"],
        powerPlants: ["Regulus"],
        coolers: ["Bracer"],
        shields: ["FullStop"],
        pilotWeapons: ["CF-447 Rhino Repeater","CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "Anvil Paladin": {
        quantumDrives: ["SparkFire"],
        powerPlants: ["Maelstrom"],
        coolers: ["Arctic"],
        shields: ["Stronghold"],
        pilotWeapons: ["CF-447 Rhino Repeater","CF-557 Galdereen Repeater"],
        turretWeapons: []
    },
    "Anvil Spartan": {
        quantumDrives: [],
        powerPlants: ["Defiant"],
        coolers: ["Cryo-Star SL"],
        shields: ["Castra"],
        pilotWeapons: ["Scorpion GT-215 Gatling"],
        turretWeapons: []
    },
    "Anvil Terrapin": {
        quantumDrives: ["Eos"],
        powerPlants: ["DayBreak"],
        coolers: ["Polar"],
        shields: ["5MA 'Chimalli'"],
        pilotWeapons: [],
        turretWeapons: ["CF-227 Badger Repeater"]
    },
    "Anvil Terrapin Medic": {
        quantumDrives: ["Eos"],
        powerPlants: ["DayBreak"],
        coolers: ["Polar"],
        shields: ["5MA 'Chimalli'"],
        pilotWeapons: [],
        turretWeapons: ["CF-227 Badger Repeater"]
    },
    "Anvil Terrapin Medic Wikelo Savior Special": {
        quantumDrives: ["Hyperion"],
        powerPlants: ["IonSurge"],
        coolers: ["Gelid"],
        shields: ["BLOC"],
        pilotWeapons: [],
        turretWeapons: ["CF-227 Badger Repeater"]
    },
    "Anvil Valkyrie": {
        quantumDrives: ["Odyssey"],
        powerPlants: ["Maelstrom"],
        coolers: ["Arctic"],
        shields: ["FullStop"],
        pilotWeapons: [],
        turretWeapons: ["CF-337 Panther Repeater","CF-447 Rhino Repeater","YellowJacket GT-210 Gatling"]
    },
    "Aopoa Khartu-al": {
        quantumDrives: ["Eos"],
        powerPlants: ["DynaFlux"],
        coolers: ["Polar"],
        shields: ["ForceWall"],
        pilotWeapons: ["CF-447 Rhino Repeater"],
        turretWeapons: []
    },
    "Aopoa San'tok.yāi": {
        quantumDrives: ["Beacon"],
        powerPlants: ["DynaFlux"],
        coolers: ["Polar"],
        shields: ["FullStop"],
        pilotWeapons: ["Yeng’tu Repeater"],
        turretWeapons: []
    },
    "Argo CSV-SM\n": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        pilotWeapons: [],
        turretWeapons: []
    },
    "Argo MOLE": {
        quantumDrives: ["Huracan"],
        powerPlants: ["Ginzel"],
        coolers: ["ThermalCore"],
        shields: ["5CA 'Akura'"],
        pilotWeapons: ["CF-227 Badger Repeater"],
        turretWeapons: []
    },
    "Argo MOLE Carbon": {
        quantumDrives: ["Huracan"],
        powerPlants: ["Ginzel"],
        coolers: ["ThermalCore"],
        shields: ["5CA 'Akura'"],
        pilotWeapons: ["CF-227 Badger Repeater"],
        turretWeapons: []
    },
    "Argo MOLE Talus": {
        quantumDrives: ["Huracan"],
        powerPlants: ["Ginzel"],
        coolers: ["ThermalCore"],
        shields: ["5CA 'Akura'"],
        pilotWeapons: ["CF-227 Badger Repeater"],
        turretWeapons: []
    },
    "Argo MOLE Teach's Special": {
        quantumDrives: ["Huracan"],
        powerPlants: ["Ginzel"],
        coolers: ["ThermalCore"],
        shields: ["5CA 'Akura'"],
        pilotWeapons: ["CF-227 Badger Repeater"],
        turretWeapons: []
    },
    "Argo MPUV Cargo": {
        quantumDrives: [],
        powerPlants: ["IonWave"],
        coolers: ["Frost-Star SL"],
        shields: ["Bulwark"],
        pilotWeapons: [],
        turretWeapons: []
    },
    "Argo MPUV Personnel": {
        quantumDrives: [],
        powerPlants: ["IonWave"],
        coolers: ["Frost-Star SL"],
        shields: ["Bulwark"],
        pilotWeapons: [],
        turretWeapons: []
    },
    "Argo MPUV Tractor": {
        quantumDrives: [],
        powerPlants: ["IonWave"],
        coolers: ["Frost-Star SL"],
        shields: ["Bulwark"],
        pilotWeapons: [],
        turretWeapons: []
    },
    "Argo RAFT": {
        quantumDrives: ["Bolon"],
        powerPlants: ["Diligence"],
        coolers: ["CoolCore"],
        shields: ["Aspis"],
        pilotWeapons: ["M5A Cannon"],
        turretWeapons: []
    },
    "ARGO MOLE": {
        quantumDrives: ["Huracan"],
        powerPlants: ["Ginzel"],
        coolers: ["ThermalCore"],
        shields: ["5CA 'Akura'"],
        pilotWeapons: [],
        turretWeapons: []
    },
    "ARGO RAFT": {
        quantumDrives: ["Bolon"],
        powerPlants: ["Diligence"],
        coolers: ["CoolCore"],
        shields: ["Aspis"],
        pilotWeapons: [],
        turretWeapons: []
    },
    "Argo RAFT Wikelo Work Special": {
        quantumDrives: ["Huracan"],
        powerPlants: ["Sedulity"],
        coolers: ["Snowfall"],
        shields: ["Citadel"],
        pilotWeapons: ["Attrition-3 Repeater"],
        turretWeapons: []
    },
    "Argo SRV": {
        quantumDrives: ["Huracan"],
        powerPlants: ["Diligence"],
        coolers: ["CoolCore"],
        shields: ["5MA 'Chimalli'"],
        pilotWeapons: [],
        turretWeapons: []
    },
    "Banu Defender": {
        quantumDrives: ["Beacon"],
        powerPlants: ["IonBurst"],
        coolers: ["Polar"],
        shields: ["Sukoran"],
        pilotWeapons: ["Singe Cannon (S3)"],
        turretWeapons: []
    },
    "C.O. Mustang Alpha": {
        quantumDrives: ["Rush"],
        powerPlants: ["ZapJet"],
        coolers: ["Winter-Star"],
        shields: ["INK"],
        pilotWeapons: ["CF-227 Badger Repeater"],
        turretWeapons: []
    },
    "C.O. Mustang Beta": {
        quantumDrives: ["Rush"],
        powerPlants: ["Roughneck"],
        coolers: ["Hydrocel"],
        shields: ["INK"],
        pilotWeapons: ["CF-227 Badger Repeater"],
        turretWeapons: []
    },
    "C.O. Mustang CitizenCon 2948 Edition": {
        quantumDrives: ["Rush"],
        powerPlants: ["ZapJet"],
        coolers: ["Winter-Star"],
        shields: ["INK"],
        pilotWeapons: ["CF-227 Badger Repeater"],
        turretWeapons: []
    },
    "C.O. Mustang Delta": {
        quantumDrives: ["Rush"],
        powerPlants: ["OverDrive"],
        coolers: ["Winter-Star"],
        shields: ["SecureHyde"],
        pilotWeapons: ["CF-227 Badger Repeater","Jericho XL"],
        turretWeapons: []
    },
    "C.O. Mustang Gamma": {
        quantumDrives: ["Rush"],
        powerPlants: ["LumaCore"],
        coolers: ["QuikCool"],
        shields: ["Falco"],
        pilotWeapons: ["CF-117 Bulldog Repeater"],
        turretWeapons: []
    },
    "C.O. Mustang Omega": {
        quantumDrives: ["Rush"],
        powerPlants: ["LumaCore"],
        coolers: ["QuikCool"],
        shields: ["Falco"],
        pilotWeapons: ["CF-117 Bulldog Repeater"],
        turretWeapons: []
    },
    "C.O. Nomad": {
        quantumDrives: ["Expedition"],
        powerPlants: ["IonBurst"],
        coolers: ["Ultra-Flow"],
        shields: ["WEB"],
        pilotWeapons: ["CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "C.O. Nomad Teach's Special": {
        quantumDrives: ["Expedition"],
        powerPlants: ["Fortitude"],
        coolers: ["Ultra-Flow"],
        shields: ["Bulwark"],
        pilotWeapons: ["CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "Corsair PYAM Exec": {
        quantumDrives: ["Huracan"],
        powerPlants: ["Eclipse"],
        coolers: ["NightFall"],
        shields: ["Parapet"],
        pilotWeapons: ["CF-227 Badger Repeater","M6A Cannon","NDB-28 Repeater","M7A Cannon"],
        turretWeapons: []
    },
    "Crusader A1 Spirit": {
        quantumDrives: ["Yeager"],
        powerPlants: ["UltraFlux"],
        coolers: ["Boreal"],
        shields: ["FullStop"],
        pilotWeapons: ["M5A Cannon","CF-227 Badger Repeater"],
        turretWeapons: []
    },
    "Crusader A2 Hercules Starlifter": {
        quantumDrives: ["Pontes"],
        powerPlants: ["SuperDrive"],
        coolers: ["Mercury"],
        shields: ["FullBlock"],
        pilotWeapons: [],
        turretWeapons: ["Omnisky XV Cannon","M7A Cannon","CF-557 Galdereen Repeater","M6A Cannon","CF-447 Rhino Repeater"]
    },
    "Crusader A2 Hercules Starlifter Wikelo War Special": {
        quantumDrives: ["Balandin"],
        powerPlants: ["JS-500"],
        coolers: ["Mercury"],
        shields: ["FR-86"],
        pilotWeapons: [],
        turretWeapons: ["M7A Cannon","Attrition-5 Repeater","Attrition-4 Repeater"]
    },
    "Crusader Ares Star Fighter Inferno": {
        quantumDrives: ["Crossfield"],
        powerPlants: ["Maelstrom"],
        coolers: ["Arctic"],
        shields: ["FullStop"],
        pilotWeapons: ["SF7B Gatling"],
        turretWeapons: []
    },
    "Crusader Ares Star Fighter Inferno Wikelo War Special": {
        quantumDrives: ["Yeager"],
        powerPlants: ["Bolide"],
        coolers: ["Permafrost"],
        shields: ["CoverAll"],
        pilotWeapons: ["SF7B Gatling"],
        turretWeapons: []
    },
    "Crusader Ares Star Fighter Ion": {
        quantumDrives: ["Crossfield"],
        powerPlants: ["Maelstrom"],
        coolers: ["Arctic"],
        shields: ["FullStop"],
        pilotWeapons: ["SF7E Cannon"],
        turretWeapons: []
    },
    "Crusader Ares Star Fighter Ion Wikelo Sneak Special": {
        quantumDrives: ["Bolt"],
        powerPlants: ["GammaMax"],
        coolers: ["IceBox"],
        shields: ["Sheut"],
        pilotWeapons: ["SF7E Cannon"],
        turretWeapons: []
    },
    "Crusader Ares Inferno": {
        quantumDrives: ["Crossfield"],
        powerPlants: ["Maelstrom"],
        coolers: ["Arctic"],
        shields: ["FullStop"],
        pilotWeapons: ["SF7B Gatling"],
        turretWeapons: []
    },
    "Crusader Ares Ion": {
        quantumDrives: ["Crossfield"],
        powerPlants: ["Maelstrom"],
        coolers: ["Arctic"],
        shields: ["FullStop"],
        pilotWeapons: ["SF7E Cannon"],
        turretWeapons: []
    },
    "Crusader C1 Spirit": {
        quantumDrives: ["Yeager"],
        powerPlants: ["UltraFlux"],
        coolers: ["Boreal"],
        shields: ["FullStop"],
        pilotWeapons: ["M5A Cannon"],
        turretWeapons: []
    },
    "Crusader C1 Spirit Wikelo Special": {
        quantumDrives: ["Hemera"],
        powerPlants: ["Lotus"],
        coolers: ["Aufeis"],
        shields: ["7MA 'Lorica'"],
        pilotWeapons: ["M5A Cannon"],
        turretWeapons: []
    },
    "Crusader Spirit A1": {
        quantumDrives: ["Yeager"],
        powerPlants: ["UltraFlux"],
        coolers: ["Boreal"],
        shields: ["FullStop"],
        pilotWeapons: ["M5A Cannon","CF-227 Badger Repeater"],
        turretWeapons: []
    },
    "Crusader Spirit C1": {
        quantumDrives: ["Yeager"],
        powerPlants: ["UltraFlux"],
        coolers: ["Boreal"],
        shields: ["FullStop"],
        pilotWeapons: [],
        turretWeapons: ["M5A Cannon"]
    },
    "Crusader Spirit E1": {
        quantumDrives: ["Yeager"],
        powerPlants: ["UltraFlux"],
        coolers: ["Boreal"],
        shields: ["FullStop"],
        pilotWeapons: [],
        turretWeapons: ["M5A Cannon"]
    },
    "Crusader C2 Hercules Starlifter": {
        quantumDrives: ["Kama"],
        powerPlants: ["Ginzel"],
        coolers: ["ThermalCore"],
        shields: ["Stronghold"],
        pilotWeapons: [],
        turretWeapons: ["M7A Cannon","M6A Cannon","CF-447 Rhino Repeater"]
    },
    "Crusader Intrepid": {
        quantumDrives: ["FoxFire"],
        powerPlants: ["LightBlossom"],
        coolers: ["BlastChill"],
        shields: ["HEX"],
        pilotWeapons: ["CF-447 Rhino Repeater"],
        turretWeapons: []
    },
    "Crusader Intrepid Wikelo Work Special": {
        quantumDrives: ["Atlas"],
        powerPlants: ["WhiteRose"],
        coolers: ["Ultra-Flow"],
        shields: ["Palisade"],
        pilotWeapons: ["CF-447 Rhino Repeater"],
        turretWeapons: []
    },
    "Crusader M2 Hercules Starlifter": {
        quantumDrives: ["Pontes"],
        powerPlants: ["SuperDrive"],
        coolers: ["Mercury"],
        shields: ["FullBlock"],
        pilotWeapons: [],
        turretWeapons: ["M7A Cannon","M6A Cannon","CF-447 Rhino Repeater"]
    },
    "Crusader Mercury Star Runner": {
        quantumDrives: ["Bolon"],
        powerPlants: ["Diligence"],
        coolers: ["CoolCore"],
        shields: ["Stronghold"],
        pilotWeapons: ["CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "Cutlass Black PYAM Exec": {
        quantumDrives: ["Odyssey"],
        powerPlants: ["Eclipse"],
        coolers: ["NightFall"],
        shields: ["Umbra"],
        pilotWeapons: ["CF-337 Panther Repeater","NDB-30 Repeater"],
        turretWeapons: []
    },
    "Drake Buccaneer": {
        quantumDrives: ["Rush"],
        powerPlants: ["JS-300"],
        coolers: ["Polar"],
        shields: ["WEB"],
        pilotWeapons: ["YellowJacket GT-210 Gatling","Revenant Gatling","CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "Drake Caterpillar": {
        quantumDrives: ["Pontes"],
        powerPlants: ["Ginzel"],
        coolers: ["ThermalCore"],
        shields: ["Stronghold"],
        pilotWeapons: [],
        turretWeapons: ["CF-447 Rhino Repeater","M5A Cannon","CF-337 Panther Repeater"]
    },
    "Drake Caterpillar Pirate": {
        quantumDrives: ["Pontes"],
        powerPlants: ["Ginzel"],
        coolers: ["ThermalCore"],
        shields: ["Stronghold"],
        pilotWeapons: [],
        turretWeapons: ["CF-447 Rhino Repeater","M5A Cannon","CF-337 Panther Repeater"]
    },
    "Drake Clipper": {
        quantumDrives: ["Flood"],
        powerPlants: ["ZapJet"],
        coolers: ["BlastChill"],
        shields: ["INK"],
        pilotWeapons: ["Mantis GT-220 Gatling","Omnisky IX Cannon"],
        turretWeapons: []
    },
    "Drake Corsair": {
        quantumDrives: ["Torrent"],
        powerPlants: ["DayBreak"],
        coolers: ["Frost-Star EX"],
        shields: ["5CA 'Akura'"],
        pilotWeapons: ["CF-227 Badger Repeater","M6A Cannon","M7A Cannon"],
        turretWeapons: []
    },
    "Drake Cutlass Black": {
        quantumDrives: ["Odyssey"],
        powerPlants: ["DayBreak"],
        coolers: ["ColdSnap"],
        shields: ["STOP"],
        pilotWeapons: ["CF-337 Panther Repeater","Mantis GT-220 Gatling"],
        turretWeapons: []
    },
    "Drake Cutlass Blue": {
        quantumDrives: ["Bolon"],
        powerPlants: ["TurboDrive"],
        coolers: ["Graupel"],
        shields: ["Aspis"],
        pilotWeapons: ["DR Model-XJ3 Repeater","Mantis GT-220 Gatling","CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "Drake Cutlass Red": {
        quantumDrives: ["Bolon"],
        powerPlants: ["Diligence"],
        coolers: ["CoolCore"],
        shields: ["Aspis"],
        pilotWeapons: ["CF-337 Panther Repeater","Mantis GT-220 Gatling"],
        turretWeapons: []
    },
    "Drake Cutlass Steel": {
        quantumDrives: ["Crossfield"],
        powerPlants: ["TurboDrive"],
        coolers: ["Arctic"],
        shields: ["FullStop"],
        pilotWeapons: ["CF-337 Panther Repeater","Mantis GT-220 Gatling","CF-227 Badger Repeater","YellowJacket GT-210 Gatling"],
        turretWeapons: []
    },
    "Drake Cutter": {
        quantumDrives: ["FoxFire"],
        powerPlants: ["LightBlossom"],
        coolers: ["BlastChill"],
        shields: ["HEX"],
        pilotWeapons: ["CF-227 Badger Repeater"],
        turretWeapons: []
    },
    "Drake Cutter Rambler": {
        quantumDrives: ["FoxFire"],
        powerPlants: ["LightBlossom"],
        coolers: ["BlastChill"],
        shields: ["HEX"],
        pilotWeapons: ["CF-227 Badger Repeater"],
        turretWeapons: []
    },
    "Drake Cutter Scout": {
        quantumDrives: ["FoxFire"],
        powerPlants: ["ExoGen"],
        coolers: ["Boreal"],
        shields: ["HEX"],
        pilotWeapons: ["CF-227 Badger Repeater"],
        turretWeapons: []
    },
    "Drake Golem": {
        quantumDrives: ["Goliath"],
        powerPlants: ["Fortitude"],
        coolers: ["Thermax"],
        shields: ["Bulwark"],
        pilotWeapons: ["CF-117 Bulldog Repeater"],
        turretWeapons: []
    },
    "Drake Golem OX": {
        quantumDrives: ["Goliath"],
        powerPlants: ["Fortitude"],
        coolers: ["Thermax"],
        shields: ["Bulwark"],
        pilotWeapons: ["CF-117 Bulldog Repeater"],
        turretWeapons: []
    },
    "Drake Golem Teach's Special": {
        quantumDrives: ["Atlas"],
        powerPlants: ["Endurance"],
        coolers: ["Thermax"],
        shields: ["Guardian"],
        pilotWeapons: ["CF-117 Bulldog Repeater"],
        turretWeapons: []
    },
    "Drake Golem Wikelo Work Special": {
        quantumDrives: ["Goliath"],
        powerPlants: ["Fortitude"],
        coolers: ["Thermax"],
        shields: ["Bulwark"],
        pilotWeapons: ["NN-13 Cannon"],
        turretWeapons: []
    },
    "Drake Herald": {
        quantumDrives: ["Expedition"],
        powerPlants: ["Slipstream"],
        coolers: ["HeatSafe"],
        shields: ["Shimmer"],
        pilotWeapons: ["Mantis GT-220 Gatling","CF-227 Badger Repeater"],
        turretWeapons: []
    },
    "Drake Mule": {
        quantumDrives: [],
        powerPlants: ["Steadfast"],
        coolers: ["Winter-Star SL"],
        shields: [],
        pilotWeapons: [],
        turretWeapons: []
    },
    "Drake Vulture": {
        quantumDrives: ["Goliath"],
        powerPlants: ["Fortitude"],
        coolers: ["Thermax"],
        shields: ["Bulwark"],
        pilotWeapons: ["CF-117 Bulldog Repeater"],
        turretWeapons: []
    },
    "Drake Vulture Teach's Special": {
        quantumDrives: ["Goliath"],
        powerPlants: ["Fortitude"],
        coolers: ["Thermax"],
        shields: ["Bulwark"],
        pilotWeapons: ["CF-117 Bulldog Repeater"],
        turretWeapons: []
    },
    "Esperia Blade": {
        quantumDrives: ["Rush"],
        powerPlants: ["Charger"],
        coolers: ["IcePlunge"],
        shields: ["AllStop"],
        pilotWeapons: ["'WARLORD' Cannon","'WHIP' Cannon"],
        turretWeapons: []
    },
    "Esperia Glaive": {
        quantumDrives: ["Beacon"],
        powerPlants: ["Fierell Cascade"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        pilotWeapons: ["'WRATH' Cannon","'WEAK' Repeater"],
        turretWeapons: []
    },
    "Esperia Prowler": {
        quantumDrives: ["Nova"],
        powerPlants: ["Eclipse"],
        coolers: ["HeatSink"],
        shields: ["Obscura"],
        pilotWeapons: [],
        turretWeapons: ["Lightstrike III Cannon","Deadbolt V Cannon"]
    },
    "Esperia Prowler Utility": {
        quantumDrives: ["Nova"],
        powerPlants: ["Eclipse"],
        coolers: ["HeatSink"],
        shields: ["Obscura"],
        pilotWeapons: [],
        turretWeapons: ["Deadbolt III Cannon","Lightstrike IV Cannon"]
    },
    "Esperia Prowler Utility Wikelo Work Special": {
        quantumDrives: ["Huracan"],
        powerPlants: ["Eclipse"],
        coolers: ["Snowfall"],
        shields: ["Citadel"],
        pilotWeapons: [],
        turretWeapons: ["Deadbolt III Cannon","Omnisky XII Cannon"]
    },
    "Esperia Stinger": {
        quantumDrives: ["Bolon"],
        powerPlants: ["Fortitude"],
        coolers: ["Eco-Flow"],
        shields: ["FullStop"],
        pilotWeapons: ["'WRATH' Cannon","Lightstrike II Cannon","Lightstrike IV Cannon"],
        turretWeapons: []
    },
    "Esperia Talon": {
        quantumDrives: ["Drift"],
        powerPlants: ["Slipstream"],
        coolers: ["VaporBlock"],
        shields: ["Shimmer"],
        pilotWeapons: ["Lightstrike IV Cannon"],
        turretWeapons: []
    },
    "Esperia Talon Shrike": {
        quantumDrives: ["Drift"],
        powerPlants: ["Slipstream"],
        coolers: ["VaporBlock"],
        shields: ["Shimmer"],
        pilotWeapons: ["Lightstrike II Cannon"],
        turretWeapons: []
    },
    "F8C Lightning PYAM Exec": {
        quantumDrives: ["Colossus"],
        powerPlants: ["Maelstrom"],
        coolers: ["Glacier"],
        shields: ["FR-76"],
        pilotWeapons: ["NDB-28 Repeater","NDB-30 Repeater"],
        turretWeapons: []
    },
    "Gatac Syulen": {
        quantumDrives: ["FoxFire"],
        powerPlants: ["LightBlossom"],
        coolers: ["BlastChill"],
        shields: ["HEX"],
        pilotWeapons: ["CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "Gatac Railen": {
        quantumDrives: ["Crossfield"],
        powerPlants: ["Maelstrom"],
        coolers: ["Arctic"],
        shields: ["FullStop"],
        pilotWeapons: [],
        turretWeapons: ["CF-337 Panther Repeater"]
    },
    "Grey's Shiv": {
        quantumDrives: ["Odyssey"],
        powerPlants: ["DayBreak"],
        coolers: ["ColdSnap"],
        shields: ["STOP"],
        pilotWeapons: ["Breakneck S4 Gatling","Tormenter S3 Repeater"],
        turretWeapons: []
    },
    "Greycat ROC": {
        quantumDrives: [],
        powerPlants: ["Steadfast"],
        coolers: ["Frost-Star SL"],
        shields: [],
        pilotWeapons: [],
        turretWeapons: []
    },
    "Greycat ROC-DS": {
        quantumDrives: [],
        powerPlants: ["Steadfast"],
        coolers: ["Frost-Star SL"],
        shields: [],
        pilotWeapons: [],
        turretWeapons: []
    },
    "Hornet F7A Mk II PYAM Exec": {
        quantumDrives: ["Colossus"],
        powerPlants: ["LuxCore"],
        coolers: ["Glacier"],
        shields: ["FR-66"],
        pilotWeapons: ["Revenant Gatling","NDB-30 Repeater"],
        turretWeapons: []
    },
    "Kruger L-21 Wolf": {
        quantumDrives: ["FoxFire"],
        powerPlants: ["LightBlossom"],
        coolers: ["BlastChill"],
        shields: ["HEX"],
        pilotWeapons: ["Relentless L-21 Gatling"],
        turretWeapons: []
    },
    "Kruger L-21 Wolf Wikelo Sneak Special": {
        quantumDrives: ["Zephyr"],
        powerPlants: ["DeltaMax"],
        coolers: ["VaporBlock"],
        shields: ["Veil"],
        pilotWeapons: ["Relentless L-21 Gatling"],
        turretWeapons: []
    },
    "Kruger L-21 Wolf Wikelo War Special": {
        quantumDrives: ["VK-00"],
        powerPlants: ["JS-300"],
        coolers: ["Glacier"],
        shields: ["FR-66"],
        pilotWeapons: ["Relentless L-21 Gatling"],
        turretWeapons: []
    },
    "Kruger L-22 Alpha Wolf": {
        quantumDrives: ["VK-00"],
        powerPlants: ["LightBlossom"],
        coolers: ["BlastChill"],
        shields: ["HEX"],
        pilotWeapons: ["Axiom L-22 Repeater"],
        turretWeapons: []
    },
    "Kruger P-52 Merlin": {
        quantumDrives: [],
        powerPlants: ["LightBlossom"],
        coolers: ["Frost-Star"],
        shields: ["SecureHyde"],
        pilotWeapons: ["Tigerstrike T-19P","CF-117 Bulldog Repeater"],
        turretWeapons: []
    },
    "Kruger P-72 Archimedes": {
        quantumDrives: [],
        powerPlants: ["Charger"],
        coolers: ["Bracer"],
        shields: ["Targa"],
        pilotWeapons: ["CF-117 Bulldog Repeater"],
        turretWeapons: []
    },
    "Kruger P-72 Archimedes Emerald": {
        quantumDrives: [],
        powerPlants: ["Charger"],
        coolers: ["Bracer"],
        shields: ["Targa"],
        pilotWeapons: ["CF-117 Bulldog Repeater"],
        turretWeapons: []
    },
    "Mirai Fury": {
        quantumDrives: [],
        powerPlants: ["Roughneck"],
        coolers: ["Hydrocel"],
        shields: ["Cloak"],
        pilotWeapons: ["CF-227 Badger Repeater"],
        turretWeapons: []
    },
    "Mirai Fury LX": {
        quantumDrives: [],
        powerPlants: ["Roughneck"],
        coolers: ["IcePlunge"],
        shields: ["Falco"],
        pilotWeapons: [],
        turretWeapons: []
    },
    "Mirai Fury MX": {
        quantumDrives: [],
        powerPlants: ["Roughneck"],
        coolers: ["Hydrocel"],
        shields: ["Cloak"],
        pilotWeapons: [],
        turretWeapons: []
    },
    "Mirai Guardian": {
        quantumDrives: ["Crossfield"],
        powerPlants: ["OverDrive"],
        coolers: ["Arctic"],
        shields: ["FullStop"],
        pilotWeapons: ["M7A Cannon"],
        turretWeapons: []
    },
    "Mirai Guardian MX": {
        quantumDrives: ["Crossfield"],
        powerPlants: ["Maelstrom"],
        coolers: ["Bracer","Arctic"],
        shields: ["FullStop"],
        pilotWeapons: ["CF-447 Rhino Repeater"],
        turretWeapons: []
    },
    "Mirai Guardian MX Wikelo War Special": {
        quantumDrives: ["XL-1"],
        powerPlants: ["Bolide"],
        coolers: ["Polar","Permafrost"],
        shields: ["CoverAll"],
        pilotWeapons: ["Attrition-4 Repeater"],
        turretWeapons: []
    },
    "Mirai Guardian QI": {
        quantumDrives: ["Crossfield"],
        powerPlants: ["Regulus"],
        coolers: ["Arctic"],
        shields: ["FullStop"],
        pilotWeapons: ["M7A Cannon"],
        turretWeapons: []
    },
    "Mirai Guardian QI Wikelo Special": {
        quantumDrives: ["SunFire"],
        powerPlants: ["LumaCore"],
        coolers: ["AbsoluteZero"],
        shields: ["Haltur"],
        pilotWeapons: ["M7A Cannon"],
        turretWeapons: []
    },
    "Mirai Guardian Wikelo War Special": {
        quantumDrives: ["VK-00"],
        powerPlants: ["QuadraCell"],
        coolers: ["Glacier"],
        shields: ["FR-76"],
        pilotWeapons: ["M7A Cannon"],
        turretWeapons: []
    },
    "Mirai Razor": {
        quantumDrives: ["LightFire"],
        powerPlants: ["StarHeart"],
        coolers: ["IcePlunge"],
        shields: ["Targa"],
        pilotWeapons: ["CF-227 Badger Repeater"],
        turretWeapons: []
    },
    "Mirai Razor EX": {
        quantumDrives: ["LightFire"],
        powerPlants: ["StarHeart"],
        coolers: ["IcePlunge"],
        shields: ["Targa"],
        pilotWeapons: ["Hellion Scattergun"],
        turretWeapons: []
    },
    "Mirai Razor LX": {
        quantumDrives: ["LightFire"],
        powerPlants: ["StarHeart"],
        coolers: ["IcePlunge"],
        shields: ["Targa"],
        pilotWeapons: ["CF-227 Badger Repeater"],
        turretWeapons: []
    },
    "MISC Razor": {
        quantumDrives: ["LightFire"],
        powerPlants: ["StarHeart"],
        coolers: ["IcePlunge"],
        shields: ["Targa"],
        pilotWeapons: ["CF-227 Badger Repeater"],
        turretWeapons: []
    },
    "MISC Fortune": {
        quantumDrives: ["Goliath"],
        powerPlants: ["Trommel"],
        coolers: ["Snowfall"],
        shields: ["Bulwark"],
        pilotWeapons: ["CF-117 Bulldog Repeater"],
        turretWeapons: []
    },
    "MISC Fortune Teach's Special": {
        quantumDrives: ["Goliath"],
        powerPlants: ["Trommel"],
        coolers: ["Snowfall"],
        shields: ["Bulwark"],
        pilotWeapons: ["CF-117 Bulldog Repeater"],
        turretWeapons: []
    },
    "MISC Fortune Wikelo Special": {
        quantumDrives: ["Atlas"],
        powerPlants: ["Lotus"],
        coolers: ["Aufeis"],
        shields: ["7SA 'Concord'"],
        pilotWeapons: ["CF-117 Bulldog Repeater"],
        turretWeapons: []
    },
    "MISC Freelancer": {
        quantumDrives: ["Odyssey"],
        powerPlants: ["DayBreak"],
        coolers: ["Frost-Star EX"],
        shields: ["5MA 'Chimalli'"],
        pilotWeapons: ["M5A Cannon","CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "MISC Freelancer DUR": {
        quantumDrives: ["Odyssey"],
        powerPlants: ["DayBreak"],
        coolers: ["Frost-Star EX"],
        shields: ["5MA 'Chimalli'"],
        pilotWeapons: ["CF-337 Panther Repeater","Attrition-3 Repeater"],
        turretWeapons: []
    },
    "MISC Freelancer MAX": {
        quantumDrives: ["Odyssey"],
        powerPlants: ["DayBreak"],
        coolers: ["Frost-Star EX"],
        shields: ["5MA 'Chimalli'"],
        pilotWeapons: ["Omnisky IX Cannon","CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "MISC Freelancer MIS": {
        quantumDrives: ["Crossfield"],
        powerPlants: ["Maelstrom"],
        coolers: ["Arctic"],
        shields: ["FullStop"],
        pilotWeapons: ["CF-337 Panther Repeater","M5A Cannon"],
        turretWeapons: []
    },
    "MISC Hull A": {
        quantumDrives: ["Goliath"],
        powerPlants: ["IonBurst"],
        coolers: ["ArcticStorm"],
        shields: ["Armada"],
        pilotWeapons: ["CF-117 Bulldog Repeater"],
        turretWeapons: []
    },
    "MISC Hull C": {
        quantumDrives: ["Kama"],
        powerPlants: ["Centurion"],
        coolers: ["Blizzard"],
        shields: ["Stronghold"],
        pilotWeapons: [],
        turretWeapons: ["CF-337 Panther Repeater"]
    },
    "MISC Prospector": {
        quantumDrives: ["Goliath"],
        powerPlants: ["Trommel"],
        coolers: ["Snowfall"],
        shields: ["Bulwark"],
        pilotWeapons: ["CF-117 Bulldog Repeater"],
        turretWeapons: []
    },
    "MISC Prospector Wikelo Work Special": {
        quantumDrives: ["Colossus"],
        powerPlants: ["Sedulity"],
        coolers: ["Snowpack"],
        shields: ["Guardian"],
        pilotWeapons: ["NDB-26 Repeater"],
        turretWeapons: []
    },
    "MISC Reliant Kore": {
        quantumDrives: ["Rush"],
        powerPlants: ["IonBurst"],
        coolers: ["ArcticStorm"],
        shields: ["WEB"],
        pilotWeapons: ["CF-227 Badger Repeater"],
        turretWeapons: []
    },
    "MISC Reliant Mako": {
        quantumDrives: ["Drift"],
        powerPlants: ["IonBurst"],
        coolers: ["HeatSafe"],
        shields: ["Shimmer"],
        pilotWeapons: ["CF-227 Badger Repeater"],
        turretWeapons: []
    },
    "MISC Reliant Sen": {
        quantumDrives: ["Goliath"],
        powerPlants: ["IonBurst"],
        coolers: ["Thermax"],
        shields: ["Bulwark"],
        pilotWeapons: ["CF-227 Badger Repeater"],
        turretWeapons: []
    },
    "MISC Reliant Tana": {
        quantumDrives: ["Beacon"],
        powerPlants: ["IonBurst"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        pilotWeapons: ["CF-227 Badger Repeater","CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "MISC Starfarer": {
        quantumDrives: ["Kama"],
        powerPlants: ["Ginzel","SuperDrive"],
        coolers: ["ThermalCore"],
        shields: ["Stronghold"],
        pilotWeapons: [],
        turretWeapons: ["M6A Cannon","CF-447 Rhino Repeater","CF-337 Panther Repeater"]
    },
    "MISC Starfarer Gemini": {
        quantumDrives: ["Pontes"],
        powerPlants: ["SuperDrive"],
        coolers: ["Mercury"],
        shields: ["Stronghold"],
        pilotWeapons: [],
        turretWeapons: ["M6A Cannon","CF-557 Galdereen Repeater","CF-337 Panther Repeater"]
    },
    "MISC Starfarer Teach's Special": {
        quantumDrives: ["Kama"],
        powerPlants: ["Ginzel","SuperDrive"],
        coolers: ["ThermalCore"],
        shields: ["Stronghold"],
        pilotWeapons: [],
        turretWeapons: ["M6A Cannon","CF-447 Rhino Repeater","CF-337 Panther Repeater"]
    },
    "MISC Starlancer MAX": {
        quantumDrives: ["SparkFire"],
        powerPlants: ["LuxCore"],
        coolers: ["AbsoluteZero"],
        shields: ["Stronghold"],
        pilotWeapons: ["CF-447 Rhino Repeater","M6A Cannon"],
        turretWeapons: []
    },
    "MISC Starlancer MAX Wikelo Work Special": {
        quantumDrives: ["Hemera"],
        powerPlants: ["Lotus"],
        coolers: ["Aufeis"],
        shields: ["Parapet"],
        pilotWeapons: ["CF-447 Rhino Repeater","M6A Cannon"],
        turretWeapons: []
    },
    "MISC Starlancer TAC": {
        quantumDrives: ["SparkFire"],
        powerPlants: ["Centurion"],
        coolers: ["Blizzard"],
        shields: ["Stronghold"],
        pilotWeapons: ["CF-447 Rhino Repeater","M6A Cannon","CF-557 Galdereen Repeater","YellowJacket GT-210 Gatling"],
        turretWeapons: []
    },
    "MISC Starlancer TAC Wikelo War Special": {
        quantumDrives: ["Yeager"],
        powerPlants: ["Durango"],
        coolers: ["Blizzard"],
        shields: ["FullBlock"],
        pilotWeapons: ["Omnisky XII Cannon","Attrition-4 Repeater","M7A Cannon","YellowJacket GT-210 Gatling"],
        turretWeapons: []
    },
    "Origin 100i": {
        quantumDrives: ["Expedition"],
        powerPlants: ["PowerBolt"],
        coolers: ["ArcticStorm"],
        shields: ["WEB"],
        pilotWeapons: ["CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "Origin 125a": {
        quantumDrives: ["Expedition"],
        powerPlants: ["Regulus"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        pilotWeapons: ["CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "Origin 135c": {
        quantumDrives: ["Expedition"],
        powerPlants: ["Fortitude"],
        coolers: ["Thermax"],
        shields: ["Bulwark"],
        pilotWeapons: ["CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "Origin 300i": {
        quantumDrives: ["Expedition"],
        powerPlants: ["PowerBolt"],
        coolers: ["ArcticStorm"],
        shields: ["WEB"],
        pilotWeapons: ["SW16BR3 “Shredder” Repeater","M5A Cannon"],
        turretWeapons: []
    },
    "Origin 315p": {
        quantumDrives: ["Goliath"],
        powerPlants: ["SonicLite"],
        coolers: ["HeatSafe"],
        shields: ["Shimmer"],
        pilotWeapons: ["SW16BR3 “Shredder” Repeater"],
        turretWeapons: []
    },
    "Origin 325a": {
        quantumDrives: ["Beacon"],
        powerPlants: ["Regulus"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        pilotWeapons: ["SW16BR3 “Shredder” Repeater","M6A Cannon"],
        turretWeapons: []
    },
    "Origin 350r": {
        quantumDrives: ["Eos"],
        powerPlants: ["SunFlare"],
        coolers: ["QuikCool"],
        shields: ["Targa"],
        pilotWeapons: ["M5A Cannon","CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "Origin 400i": {
        quantumDrives: ["Torrent"],
        powerPlants: ["Sedulity"],
        coolers: ["Snowfall"],
        shields: ["GUARD"],
        pilotWeapons: ["CF-337 Panther Repeater","CF-447 Rhino Repeater"],
        turretWeapons: []
    },
    "Origin 600i": {
        quantumDrives: ["Odyssey"],
        powerPlants: ["Durango"],
        coolers: ["FrostBurn"],
        shields: ["Stronghold"],
        pilotWeapons: ["M7A Cannon","CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "Origin 600i 2951 BIS": {
        quantumDrives: ["Odyssey"],
        powerPlants: ["Durango"],
        coolers: ["FrostBurn"],
        shields: ["Stronghold"],
        pilotWeapons: ["M7A Cannon","CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "Origin 600i Executive Edition": {
        quantumDrives: ["Odyssey"],
        powerPlants: ["Durango"],
        coolers: ["FrostBurn"],
        shields: ["Stronghold"],
        pilotWeapons: ["M7A Cannon","CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "Origin 600i Touring": {
        quantumDrives: ["Odyssey"],
        powerPlants: ["Durango"],
        coolers: ["FrostBurn"],
        shields: ["Stronghold"],
        pilotWeapons: [],
        turretWeapons: ["M7A Cannon","CF-337 Panther Repeater"]
    },
    "Origin 85X Limited": {
        quantumDrives: ["Beacon"],
        powerPlants: ["PowerBolt"],
        coolers: ["IcePlunge"],
        shields: ["Targa"],
        pilotWeapons: ["CF-117 Bulldog Repeater","CF-227 Badger Repeater"],
        turretWeapons: []
    },
    "Origin 600i Explorer": {
        quantumDrives: ["Odyssey"],
        powerPlants: ["Durango"],
        coolers: ["FrostBurn"],
        shields: ["Stronghold"],
        pilotWeapons: [],
        turretWeapons: ["M7A Cannon","CF-337 Panther Repeater"]
    },
    "Origin M50": {
        quantumDrives: ["Beacon"],
        powerPlants: ["PowerBolt"],
        coolers: ["IcePlunge"],
        shields: ["Targa"],
        pilotWeapons: ["CF-227 Badger Repeater"],
        turretWeapons: []
    },
    "Origin 890 Jump": {
        quantumDrives: ["Allegro"],
        powerPlants: ["Stellate"],
        coolers: ["Serac","Serac"],
        shields: ["Glacis","Glacis"],
        pilotWeapons: [],
        turretWeapons: ["M6A Cannon","CF-337 Panther Repeater","M2C \"Swarm\""]
    },
    "Origin M50 Interceptor": {
        quantumDrives: ["LightFire"],
        powerPlants: ["LumaCore"],
        coolers: ["IcePlunge"],
        shields: ["Targa"],
        pilotWeapons: ["CF-227 Badger Repeater"],
        turretWeapons: []
    },
    "RSI Apollo Medivac": {
        quantumDrives: ["Odyssey"],
        powerPlants: ["FullForce"],
        coolers: ["ColdSnap"],
        shields: ["STOP"],
        pilotWeapons: ["Mantis GT-220 Gatling","CF-447 Rhino Repeater"],
        turretWeapons: []
    },
    "RSI Apollo Triage": {
        quantumDrives: ["Odyssey"],
        powerPlants: ["FullForce"],
        coolers: ["ColdSnap"],
        shields: ["STOP"],
        pilotWeapons: ["M5A Cannon","CF-447 Rhino Repeater"],
        turretWeapons: []
    },
    "RSI Aurora CL": {
        quantumDrives: ["Eos"],
        powerPlants: ["Roughneck"],
        coolers: ["Hydrocel"],
        shields: ["Bulwark"],
        pilotWeapons: ["CF-117 Bulldog Repeater"],
        turretWeapons: []
    },
    "RSI Aurora ES": {
        quantumDrives: ["Eos"],
        powerPlants: ["ZapJet"],
        coolers: ["BlastChill"],
        shields: ["INK"],
        pilotWeapons: ["9-Series Longsword Cannon"],
        turretWeapons: []
    },
    "RSI Aurora LN": {
        quantumDrives: ["Eos"],
        powerPlants: ["Charger"],
        coolers: ["Bracer"],
        shields: ["SecureHyde"],
        pilotWeapons: ["CF-117 Bulldog Repeater"],
        turretWeapons: []
    },
    "RSI Aurora LX": {
        quantumDrives: ["Eos"],
        powerPlants: ["LumaCore"],
        coolers: ["QuikCool"],
        shields: ["Targa"],
        pilotWeapons: ["CF-117 Bulldog Repeater"],
        turretWeapons: []
    },
    "RSI Aurora MR": {
        quantumDrives: ["Eos"],
        powerPlants: ["Roughneck"],
        coolers: ["Hydrocel"],
        shields: ["Bulwark"],
        pilotWeapons: ["CF-117 Bulldog Repeater"],
        turretWeapons: []
    },
    "RSI Constellation Andromeda": {
        quantumDrives: ["Bolon"],
        powerPlants: ["DayBreak"],
        coolers: ["Frost-Star EX"],
        shields: ["5CA 'Akura'"],
        pilotWeapons: ["CF-337 Panther Repeater","CF-557 Galdereen Repeater"],
        turretWeapons: []
    },
    "RSI Constellation Aquila": {
        quantumDrives: ["Bolon"],
        powerPlants: ["DayBreak"],
        coolers: ["Frost-Star EX"],
        shields: ["5CA 'Akura'"],
        pilotWeapons: ["CF-337 Panther Repeater","M7A Cannon"],
        turretWeapons: []
    },
    "RSI Constellation Phoenix": {
        quantumDrives: ["Bolon"],
        powerPlants: ["DayBreak"],
        coolers: ["Frost-Star EX"],
        shields: ["5CA 'Akura'"],
        pilotWeapons: ["CF-337 Panther Repeater","Omnisky XV Cannon","M2C \"Swarm\""],
        turretWeapons: []
    },
    "RSI Constellation Phoenix Emerald": {
        quantumDrives: ["Bolon"],
        powerPlants: ["DayBreak"],
        coolers: ["Frost-Star EX"],
        shields: ["5CA 'Akura'"],
        pilotWeapons: ["CF-337 Panther Repeater","Omnisky XV Cannon","M2C \"Swarm\""],
        turretWeapons: []
    },
    "RSI Constellation Taurus": {
        quantumDrives: ["Bolon"],
        powerPlants: ["Diligence"],
        coolers: ["CoolCore"],
        shields: ["Stronghold"],
        pilotWeapons: ["CF-337 Panther Repeater","CF-557 Galdereen Repeater"],
        turretWeapons: []
    },
    "RSI Constellation Taurus Wikelo War Special": {
        quantumDrives: ["XL-1"],
        powerPlants: ["QuadraCell MT"],
        coolers: ["Avalanche"],
        shields: ["FR-86"],
        pilotWeapons: ["CF-337 Panther Repeater","CF-557 Galdereen Repeater"],
        turretWeapons: []
    },
    "RSI Lynx": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        pilotWeapons: ["M3A Cannon"],
        turretWeapons: []
    },
    "RSI Mantis": {
        quantumDrives: ["Beacon"],
        powerPlants: ["Regulus"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        pilotWeapons: ["FL-33 Cannon"],
        turretWeapons: []
    },
    "RSI Meteor": {
        quantumDrives: ["Beacon"],
        powerPlants: ["Regulus"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        pilotWeapons: ["Leonids Cannon","Leonids Cannon","FL-33 Cannon","FL-33 Cannon"],
        turretWeapons: []
    },
    "RSI Meteor PYAM Exec": {
        quantumDrives: ["Siren"],
        powerPlants: ["Charger"],
        coolers: ["Polar"],
        shields: ["ForceWall"],
        pilotWeapons: ["Leonids Cannon","Leonids Cannon","M5A Cannon","M5A Cannon"],
        turretWeapons: []
    },
    "RSI Meteor Wikelo Sneak Special": {
        quantumDrives: ["Zephyr"],
        powerPlants: ["Slipstream"],
        coolers: ["VaporBlock"],
        shields: ["Mirage"],
        pilotWeapons: ["Leonids Cannon","Leonids Cannon","Omnisky IX Cannon","Omnisky IX Cannon"],
        turretWeapons: []
    },
    "RSI Perseus": {
        quantumDrives: ["Pontes"],
        powerPlants: ["Centurion"],
        coolers: ["Mercury"],
        shields: ["SureStop"],
        pilotWeapons: [],
        turretWeapons: ["RSI Medusa Cannon","RSI Medusa Cannon","Mantis GT-220 Gatling","Mantis GT-220 Gatling","Mantis GT-220 Gatling","Mantis GT-220 Gatling","M2C \"Swarm\"","M2C \"Swarm\""]
    },
    "RSI Polaris": {
        quantumDrives: ["Erebos"],
        powerPlants: ["Stellate"],
        coolers: ["Serac"],
        shields: ["Glacis"],
        pilotWeapons: ["CF-337 Panther Repeater","Omnisky XII Cannon","Maris Cannon","M2C \"Swarm\""],
        turretWeapons: []
    },
    "RSI Salvation": {
        quantumDrives: ["Colossus"],
        powerPlants: ["Fortitude"],
        coolers: ["Eco-Flow"],
        shields: ["Bulwark"],
        pilotWeapons: ["CF-117 Bulldog Repeater"],
        turretWeapons: []
    },
    "RSI Scorpius": {
        quantumDrives: ["Eos"],
        powerPlants: ["Regulus"],
        coolers: ["Polar"],
        shields: ["FullStop"],
        pilotWeapons: ["CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "RSI Scorpius Antares": {
        quantumDrives: ["Eos"],
        powerPlants: ["Regulus"],
        coolers: ["Polar"],
        shields: ["FullStop"],
        pilotWeapons: ["CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "RSI Scorpius Wikelo Sneak Special": {
        quantumDrives: ["Spectre"],
        powerPlants: ["Slipstream"],
        coolers: ["SnowBlind"],
        shields: ["Umbra"],
        pilotWeapons: ["CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "RSI Ursa": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        pilotWeapons: ["CF-117 Bulldog Repeater"],
        turretWeapons: []
    },
    "RSI Ursa Fortuna": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        pilotWeapons: ["CF-117 Bulldog Repeater"],
        turretWeapons: []
    },
    "RSI Ursa Medivac": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        pilotWeapons: ["CF-117 Bulldog Repeater"],
        turretWeapons: []
    },
    "RSI Ursa Medivac Wikelo Special": {
        quantumDrives: [],
        powerPlants: ["MagnaBloom"],
        coolers: ["Kelvid"],
        shields: ["Castra"],
        pilotWeapons: ["CF-117 Bulldog Repeater"],
        turretWeapons: []
    },
    "RSI Zeus Mk II CL": {
        quantumDrives: ["Hemera"],
        powerPlants: ["Genoa"],
        coolers: ["Snowpack"],
        shields: ["Rampart"],
        pilotWeapons: ["Omnisky XII Cannon","CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "RSI Zeus Mk II ES": {
        quantumDrives: ["Khaos"],
        powerPlants: ["FullForce"],
        coolers: ["ColdSnap"],
        shields: ["5MA 'Chimalli'"],
        pilotWeapons: ["Omnisky XII Cannon","CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "RSI Zeus Mk II ES Wikelo Work Special": {
        quantumDrives: ["Hemera"],
        powerPlants: ["Genoa"],
        coolers: ["Snowpack"],
        shields: ["Rampart"],
        pilotWeapons: ["Omnisky XII Cannon","CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "RSI Zeus Mk II MR": {
        quantumDrives: ["Hemera"],
        powerPlants: ["Genoa"],
        coolers: ["Snowpack"],
        shields: ["Rampart"],
        pilotWeapons: ["Omnisky XII Cannon","CF-337 Panther Repeater"],
        turretWeapons: []
    },
    "Syulen PYAM Exec": {
        quantumDrives: ["Colossus"],
        powerPlants: ["Slipstream"],
        coolers: ["Glacier"],
        shields: ["FR-66"],
        pilotWeapons: ["NDB-30 Repeater"],
        turretWeapons: []
    },
    "Tumbril Cyclone": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        pilotWeapons: [],
        turretWeapons: []
    },
    "Tumbril Cyclone AA": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        pilotWeapons: [],
        turretWeapons: []
    },
    "Tumbril Cyclone MT": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        pilotWeapons: ["9-Series Longsword Cannon"],
        turretWeapons: []
    },
    "Tumbril Cyclone RC": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        pilotWeapons: [],
        turretWeapons: []
    },
    "Tumbril Cyclone RN": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        pilotWeapons: [],
        turretWeapons: []
    },
    "Tumbril Cyclone TR": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        pilotWeapons: ["YellowJacket GT-210 Gatling"],
        turretWeapons: []
    },
    "Tumbril Nova": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        pilotWeapons: ["Slayer Cannon","CF-227 Badger Repeater"],
        turretWeapons: []
    },
    "Tumbril Storm": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        pilotWeapons: ["Reign-3 Repeater"],
        turretWeapons: []
    },
    "Tumbril Storm AA": {
        quantumDrives: [],
        powerPlants: ["Radix"],
        coolers: ["Frost-Star SL"],
        shields: ["PIN"],
        pilotWeapons: [],
        turretWeapons: []
    },
    "Vanduul Scythe": {
        quantumDrives: ["Beacon"],
        powerPlants: ["Fierell Cascade"],
        coolers: ["Bracer"],
        shields: ["AllStop"],
        pilotWeapons: ["'WAR' Cannon","'WRATH' Cannon","'WEAK' Repeater"],
        turretWeapons: []
    },
};


// Generate default loadout for a ship using actual stock components from game data
SC_DATA.getDefaultComponents = function(shipSpec) {
    if (!shipSpec) return null;

    const defaults = {
        pilotWeapons: [],
        turrets: [],
        shields: [],
        coolers: [],
        powerPlants: [],
        quantumDrives: []
    };

    // Look up stock loadout by ship name (with fallbacks)
    let stockLoadout = SC_DATA.stockLoadouts[shipSpec.name];
    if (!stockLoadout) {
        // Fuzzy match keys in stockLoadouts using normalized Levenshtein similarity.
        const normalize = n => (n || '').toString().toLowerCase().replace(/[^a-z0-9]+/g, '');
        const targetRaw = (shipSpec.name || '').toString();
        const target = normalize(targetRaw);

        // Levenshtein distance
        function levenshtein(a, b) {
            if (!a || !b) return (a || b) ? Math.max((a||'').length, (b||'').length) : 0;
            const m = a.length, n = b.length;
            const dp = Array.from({ length: m + 1 }, () => new Array(n + 1));
            for (let i = 0; i <= m; i++) dp[i][0] = i;
            for (let j = 0; j <= n; j++) dp[0][j] = j;
            for (let i = 1; i <= m; i++) {
                for (let j = 1; j <= n; j++) {
                    const cost = a[i - 1] === b[j - 1] ? 0 : 1;
                    dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
                }
            }
            return dp[m][n];
        }

        function similarity(a, b) {
            const maxLen = Math.max(a.length, b.length) || 1;
            const dist = levenshtein(a, b);
            return 1 - dist / maxLen;
        }

        let bestKey = null;
        let bestScore = -1;
        const scores = [];
        for (const key of Object.keys(SC_DATA.stockLoadouts)) {
            const keyNorm = normalize(key);
            const score = similarity(target, keyNorm);
            scores.push({ key, score });
            if (score > bestScore) {
                bestScore = score;
                bestKey = key;
            }
        }

        // If bestScore is reasonably high, use it; otherwise leave undefined and allow Loadout extraction fallback.
        const THRESH = 0.6;
        if (bestScore >= THRESH) {
            stockLoadout = SC_DATA.stockLoadouts[bestKey];
            // warn if there are other close matches
            const close = scores.filter(s => s.score >= bestScore - 0.05 && s.key !== bestKey).map(s => `${s.key}(${s.score.toFixed(2)})`);
            if (close.length > 0) {
                console.warn(`Ambiguous stockLoadout match for ship '${targetRaw}': selected '${bestKey}' (score=${bestScore.toFixed(2)}), close: ${close.join(', ')}`);
            }
        } else {
            // Log for developer inspection — these will try Loadout extraction later
            console.warn(`No good stockLoadout match for ship '${targetRaw}' (best='${bestKey}' score=${bestScore.toFixed(2)}). Will attempt Loadout extraction.`);
        }
    }

    // Populate pilot weapons from stock or leave empty
    if (shipSpec.pilotWeapons && shipSpec.pilotWeapons.length > 0) {
        defaults.pilotWeapons = shipSpec.pilotWeapons.map((w, i) => ({
            name: stockLoadout?.pilotWeapons?.[i] || stockLoadout?.pilotWeapons?.[0] || "",
            size: w.size
        }));
    }

    // Populate turrets with stock weapons. Only apply stock loadout mapping when it provides
    // a weapon per turret; otherwise leave weapons blank so Loadout extraction/grouping can run.
    if (shipSpec.turrets && shipSpec.turrets.length > 0) {
        if (stockLoadout && Array.isArray(stockLoadout.turretWeapons) && stockLoadout.turretWeapons.length === shipSpec.turrets.length) {
            defaults.turrets = shipSpec.turrets.map((t, i) => ({
                type: t.type,
                guns: t.guns,
                size: t.size,
                weapon: stockLoadout.turretWeapons[i] || ""
            }));
        } else {
            // create turret stubs without weapon names to allow better extraction/grouping later
            defaults.turrets = shipSpec.turrets.map(t => ({ type: t.type, guns: t.guns, size: t.size, weapon: '' }));
        }
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

    // Validate defaults: if a stock name exists but doesn't match the expected size
    // attempt to find a same-manufacturer component with the desired size.
    function findByNameInCollection(collection, name) {
        if (!name) return null;
        return (collection || []).find(c => c.name && c.name.toLowerCase() === name.toLowerCase()) || null;
    }

    function findSameManufacturerOfSize(collection, manufacturer, size) {
        if (!manufacturer) return null;
        return (collection || []).find(c => c.manufacturer === manufacturer && c.size === size) || null;
    }

    // Validate powerPlants
    if (defaults.powerPlants && defaults.powerPlants.length > 0) {
        for (let i = 0; i < defaults.powerPlants.length; i++) {
            const entry = defaults.powerPlants[i];
            if (!entry || !entry.name) continue;
            const found = findByNameInCollection(SC_DATA.powerPlants, entry.name);
            if (found && found.size !== entry.size) {
                // Keep the named component even if the recorded size doesn't match the slot.
                // UI will show it as a mismatched option so the user sees the actual stock item.
                entry.name = found.name;
            } else if (!found) {
                // name not found at all — clear
                entry.name = '';
            }
        }
    }

    // Validate coolers
    if (defaults.coolers && defaults.coolers.length > 0) {
        for (let i = 0; i < defaults.coolers.length; i++) {
            const entry = defaults.coolers[i];
            if (!entry || !entry.name) continue;
            const found = findByNameInCollection(SC_DATA.coolers, entry.name);
            if (found && found.size !== entry.size) {
                // keep the original cooler name even if sizes differ
                entry.name = found.name;
            } else if (!found) {
                entry.name = '';
            }
        }
    }

    // Validate shields
    if (defaults.shields && defaults.shields.length > 0) {
        for (let i = 0; i < defaults.shields.length; i++) {
            const entry = defaults.shields[i];
            if (!entry || !entry.name) continue;
            const found = findByNameInCollection(SC_DATA.shields, entry.name);
            if (found && found.size !== entry.size) {
                // keep the original shield name even if sizes differ
                entry.name = found.name;
            } else if (!found) {
                entry.name = '';
            }
        }
    }

    // Validate turrets: if stockLoadout provided no turretWeapons but shipSpec has turrets, try Loadout extraction
    if (shipSpec.turrets && shipSpec.turrets.length > 0) {
        const hasAnyWeapon = defaults.turrets && defaults.turrets.some(t => t && t.weapon);
        if (!hasAnyWeapon && shipSpec.Loadout && shipSpec.Loadout.length > 0) {
            const weaponCandidates = shipSpec.Loadout
                .filter(i => i.ItemTypes && i.ItemTypes.some(t => /Weapon|Gun|Rifle|Turret/i.test(t.Type)))
                .map(i => i.Name)
                .filter(n => n && n !== "<= PLACEHOLDER =>");

            // Group weapon candidates into turret slots by aggregating per-turret gun counts
            function findWeaponSizeByName(name) {
                if (!name) return null;
                for (const key of Object.keys(SC_DATA.weapons)) {
                    const size = parseInt(key, 10);
                    const list = SC_DATA.weapons[size] || [];
                    if (list.find(w => w.name && w.name.toLowerCase() === name.toLowerCase())) return size;
                }
                return null;
            }

            function groupWeaponsForTurrets(turrets, candidates) {
                const result = [];
                let idx = 0;
                for (const t of turrets) {
                    const want = Math.max(1, t.guns || 1);
                    const slice = candidates.slice(idx, idx + want);
                    idx += slice.length;
                    let chosen = '';
                    if (slice.length === 0) {
                        chosen = candidates[0] || '';
                    } else {
                        // Choose candidate whose weapon size best fits the turret mount: prefer largest size <= mount size
                        const unique = Array.from(new Set(slice));
                        let best = null;
                        let bestSize = -1;
                        for (const name of unique) {
                            const wSize = findWeaponSizeByName(name) || -1;
                            if (wSize > bestSize && wSize <= (t.size || Infinity)) {
                                best = name;
                                bestSize = wSize;
                            }
                        }
                        if (!best) {
                            // fallback: pick most frequent in slice
                            const counts = {};
                            slice.forEach(n => { counts[n] = (counts[n] || 0) + 1; });
                            const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
                            best = entries.length > 0 ? entries[0][0] : slice[0];
                        }
                        chosen = best;
                    }
                    result.push({ type: t.type, guns: t.guns, size: t.size, weapon: chosen });
                }
                return result;
            }

            if (weaponCandidates.length > 0) {
                defaults.turrets = groupWeaponsForTurrets(shipSpec.turrets, weaponCandidates);
            }
        }

        // Ensure turret weapon names match available weapons sizes; if mismatch, clear name
        if (defaults.turrets && defaults.turrets.length > 0) {
            for (let i = 0; i < defaults.turrets.length; i++) {
                const t = defaults.turrets[i];
                if (!t || !t.weapon) continue;
                const weaponsOfSize = SC_DATA.weapons[t.size] || [];
                const found = weaponsOfSize.find(w => w.name && w.name.toLowerCase() === t.weapon.toLowerCase());
                if (!found) {
                    const anyFound = Object.values(SC_DATA.weapons).flat().find(w => w.name && w.name.toLowerCase() === t.weapon.toLowerCase());
                    if (anyFound) {
                        t.weapon = anyFound.name;
                    } else {
                        t.weapon = '';
                    }
                }
            }
        }
    }

    // Collapse many 1-gun turret entries into grouped turret mounts where appropriate.
    // Compute total gun instances and pack into mounts of ~2 guns each (common real-world mount layout).
    if (defaults.turrets && defaults.turrets.length > 0) {
        const totalGuns = defaults.turrets.reduce((s, t) => s + (t.guns || 0), 0);
        const targetMounts = Math.max(1, Math.round(totalGuns / 2));
        if (defaults.turrets.length > targetMounts) {
            const collapsed = [];
            let remaining = totalGuns;
            let srcIdx = 0;
            // flatten turret entries into sequence of single-gun items with metadata
            const flat = [];
            defaults.turrets.forEach(t => {
                const n = Math.max(1, t.guns || 1);
                for (let k = 0; k < n; k++) {
                    flat.push({ type: t.type, size: t.size, weapon: t.weapon });
                }
            });
            const perMount = 2;
            while (srcIdx < flat.length) {
                const slice = flat.slice(srcIdx, srcIdx + perMount);
                srcIdx += slice.length;
                const guns = slice.length;
                // choose most common size and type in slice
                const sizeCounts = {};
                const typeCounts = {};
                const weaponCounts = {};
                slice.forEach(s => {
                    sizeCounts[s.size] = (sizeCounts[s.size] || 0) + 1;
                    typeCounts[s.type] = (typeCounts[s.type] || 0) + 1;
                    if (s.weapon) weaponCounts[s.weapon] = (weaponCounts[s.weapon] || 0) + 1;
                });
                const pickMost = obj => Object.entries(obj).sort((a,b)=>b[1]-a[1])[0]?.[0] || null;
                const chosenSize = parseInt(pickMost(sizeCounts), 10) || slice[0].size || 1;
                const chosenType = pickMost(typeCounts) || slice[0].type || 'remote';
                const chosenWeapon = pickMost(weaponCounts) || slice[0].weapon || '';
                collapsed.push({ type: chosenType, guns: guns, size: chosenSize, weapon: chosenWeapon });
            }
            defaults.turrets = collapsed;
        }
    }

    // Ensure each collapsed turret has a sensible representative weapon name if empty
    if (defaults.turrets && defaults.turrets.length > 0) {
        for (let i = 0; i < defaults.turrets.length; i++) {
            const t = defaults.turrets[i];
            if (!t) continue;
            if (!t.weapon) {
                const weaponsOfSize = SC_DATA.weapons[t.size] || [];
                if (weaponsOfSize && weaponsOfSize.length > 0) {
                    t.weapon = weaponsOfSize[0].name;
                } else {
                    // fallback: find any weapon whose size <= mount size
                    const anyMatch = Object.keys(SC_DATA.weapons).map(k => parseInt(k,10)).sort((a,b)=>a-b)
                        .reverse()
                        .find(sz => (SC_DATA.weapons[sz]||[]).length > 0 && sz <= (t.size || Infinity));
                    if (anyMatch) {
                        t.weapon = SC_DATA.weapons[anyMatch][0].name;
                    }
                }
            }
    
    // Ship-specific override: Aegis Reclaimer weapon turrets
    // Use explicit, known stock weapons for the Reclaimer's primary turrets.
    try {
        const shipName = (shipSpec && shipSpec.name) || '';
        if (/reclaimer/i.test(shipName)) {
            // Primary weapon turrets: 1x manned S5 with 2x CF-557, and 4x remote S5 mounts each with 2x CF-337
            defaults.turrets = [
                { type: 'manned', guns: 2, size: 5, weapon: 'CF-557 Galdereen Repeater' },
                { type: 'remote', guns: 2, size: 5, weapon: 'CF-337 Panther Repeater' },
                { type: 'remote', guns: 2, size: 5, weapon: 'CF-337 Panther Repeater' },
                { type: 'remote', guns: 2, size: 5, weapon: 'CF-337 Panther Repeater' },
                { type: 'remote', guns: 2, size: 5, weapon: 'CF-337 Panther Repeater' }
            ];
        }
    } catch (e) {
        // ignore
    }
        }
    }

    return defaults;
};

// (Enhancement) If no stockLoadout found, we attempt to extract meaningful names
// from the shipSpec.Loadout entries where available.
SC_DATA.getDefaultComponents = (function(orig) {
    return function(shipSpec) {
        const defaults = orig.call(this, shipSpec);
        if (!shipSpec) return defaults;
        // If a stockLoadout existed, orig already filled defaults; if not, try Loadout extraction
        const hasMeaningful = arr => arr && arr.some(i => i && i.name && i.name !== "<= PLACEHOLDER =>");
        if (defaults && shipSpec.Loadout && shipSpec.Loadout.length > 0) {
            const loadout = shipSpec.Loadout;
            const weaponCandidates = loadout
                .filter(i => i.ItemTypes && i.ItemTypes.some(t => /Weapon|Gun|Rifle|TractorBeam|WeaponGun|WeaponMining/i.test(t.Type)))
                .map(i => i.Name)
                .filter(n => n && n !== "<= PLACEHOLDER =>");

            if (weaponCandidates.length > 0 && defaults.pilotWeapons && defaults.pilotWeapons.length > 0) {
                defaults.pilotWeapons = defaults.pilotWeapons.map((w, i) => ({
                    name: w.name || weaponCandidates[i] || weaponCandidates[0] || "",
                    size: w.size
                }));
            }

            const findByType = (re) => loadout
                .filter(i => i.ItemTypes && i.ItemTypes.some(t => re.test(t.Type)))
                .map(i => i.Name)
                .filter(n => n && n !== "<= PLACEHOLDER =>");

            if (shipSpec.shields) {
                const sNames = findByType(/Shield/i);
                for (let i = 0; i < shipSpec.shields.count; i++) {
                    defaults.shields[i].name = defaults.shields[i].name || sNames[i] || sNames[0] || defaults.shields[i].name;
                }
            }
            if (shipSpec.coolers) {
                const cNames = findByType(/Cooler/i);
                for (let i = 0; i < shipSpec.coolers.count; i++) {
                    defaults.coolers[i].name = defaults.coolers[i].name || cNames[i] || cNames[0] || defaults.coolers[i].name;
                }
            }
            if (shipSpec.powerPlants) {
                const pNames = findByType(/PowerPlant|Power/i);
                for (let i = 0; i < shipSpec.powerPlants.count; i++) {
                    defaults.powerPlants[i].name = defaults.powerPlants[i].name || pNames[i] || pNames[0] || defaults.powerPlants[i].name;
                }
            }
            if (shipSpec.quantumDrive) {
                const qNames = findByType(/QuantumDrive|Quantum/i);
                defaults.quantumDrives[0].name = defaults.quantumDrives[0].name || qNames[0] || defaults.quantumDrives[0].name;
            }
        }
        return defaults;
    };
})(SC_DATA.getDefaultComponents);

window.SC_DATA = SC_DATA;
