import { NpcCharacter, ResourceItem, KingdomStats, PlayerState, JobOpportunity, GameEvent, MarketPrice, SocialRank } from '../types/game';

export const RESOURCES: Record<string, ResourceItem> = {
  water: {
    id: 'water',
    name: 'Fresh Spring Water',
    category: 'Water',
    icon: 'Droplets',
    description: 'Crisp glacial water piped from the mountain springs. Essential for hydration and hygiene.',
    sourceNpcId: 'mira',
    sourceFacility: 'Mountain Spring Aqueduct',
    basePrice: 2, // 2 Copper per jug
    unit: 'jugs',
  },
  grain: {
    id: 'grain',
    name: 'Barley & Wheat Grain',
    category: 'Food',
    icon: 'Wheat',
    description: 'Raw harvested golden grain. Ground into flour or fed to livestock.',
    sourceNpcId: 'caren',
    sourceFacility: 'Sunmill Farmlands',
    basePrice: 5, // 5 Copper
    unit: 'sacks',
  },
  bread: {
    id: 'bread',
    name: 'Hearth Hearthbread',
    category: 'Food',
    icon: 'Utensils',
    description: 'Warm crusty loaf baked in communal ovens. Restores energy and quells hunger.',
    sourceNpcId: 'caren',
    sourceFacility: 'Communal Bakery',
    basePrice: 8,
    unit: 'loaves',
  },
  fish: {
    id: 'fish',
    name: 'Silver River Trout',
    category: 'Food',
    icon: 'Fish',
    description: 'Freshly caught river fish rich in oils and vitality. Kept on ice at the docks.',
    sourceNpcId: 'bran',
    sourceFacility: 'Whistling Docks',
    basePrice: 9,
    unit: 'crates',
  },
  fruits: {
    id: 'fruits',
    name: 'Suncrest Orchard Apples',
    category: 'Food',
    icon: 'Apple',
    description: 'Sweet, crisp red apples and sweet berries that stave off scurvy and fatigue.',
    sourceNpcId: 'lyra',
    sourceFacility: 'Royal Orchards',
    basePrice: 7,
    unit: 'baskets',
  },
  clothing: {
    id: 'clothing',
    name: 'Warm Woolen Cloak',
    category: 'Material',
    icon: 'Shirt',
    description: 'Durable woven garments that protect against harsh frost and illness.',
    sourceNpcId: 'sylvie',
    sourceFacility: 'The Loom House',
    basePrice: 25,
    unit: 'tunics',
  },
  iron_ore: {
    id: 'iron_ore',
    name: 'Raw Bog Iron',
    category: 'Material',
    icon: 'Layers',
    description: 'Heavy reddish ore smelted into ingots for blacksmithing.',
    sourceNpcId: 'torvin',
    sourceFacility: 'Deep Iron Mine',
    basePrice: 15,
    unit: 'ingots',
  },
  tools: {
    id: 'tools',
    name: 'Forged Iron Tools',
    category: 'Equipment',
    icon: 'Hammer',
    description: 'Tempered scythes, sickles, and pickaxes that boost manual productivity.',
    sourceNpcId: 'torvin',
    sourceFacility: 'The Grand Forge',
    basePrice: 45,
    unit: 'sets',
  },
  herbs: {
    id: 'herbs',
    name: 'Wild Healing Herbs',
    category: 'Medicine',
    icon: 'Leaf',
    description: 'Fragrant sage, feverfew, and starwort plucked from untamed glens.',
    sourceNpcId: 'lyra',
    sourceFacility: 'Whispering Glade',
    basePrice: 12,
    unit: 'pouches',
  },
  medicine: {
    id: 'medicine',
    name: 'Elixir of Vigor',
    category: 'Medicine',
    icon: 'Sparkles',
    description: 'A purified alchemical salve that rapidly cures fevers, infections, and wounds.',
    sourceNpcId: 'elena',
    sourceFacility: 'Royal Herbarium',
    basePrice: 50,
    unit: 'vials',
  },
  contraband: {
    id: 'contraband',
    name: 'Shadow Contraband',
    category: 'Luxury',
    icon: 'Key',
    description: 'Stolen royal tax receipts, exotic narcotics, and forbidden foreign silks.',
    sourceNpcId: 'vesper',
    sourceFacility: 'The Catacombs',
    basePrice: 120,
    unit: 'bundles',
  }
};

export const INITIAL_NPCS: NpcCharacter[] = [
  {
    id: 'mira',
    name: 'Mira',
    title: 'The Springtender',
    role: 'Wellkeeper & Aqueduct Overseer',
    district: 'Upper Mountain Springs',
    facility: 'The Grand Aqueduct',
    avatarSeed: 'mira_aqueduct',
    avatarUrl: '/characters/justia_paladin.png',
    portraitUrl: '/characters/justia_paladin.png',
    backgroundUrl: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80',
    themeColor: '#38bdf8', // sky blue
    hairColor: '#67e8f9', // cyan-teal anime hair
    eyeColor: '#0284c7',
    personality: 'Diligent, soft-spoken, constantly inspecting reservoir valves',
    health: 92,
    maxHealth: 100,
    energy: 85,
    status: 'Healthy',
    loyalty: 15,
    affection: 20,
    managedResource: 'water',
    baseProductionPerDay: 120, // 120 jugs clean water
    efficiencyModifier: 1.0,
    backstory: 'Mira was born by the mountain waterfalls. She understands the ancient Roman-style aqueducts better than any engineer.',
    greetings: [
      "The reservoirs are flowing clear today! Did you drink some fresh water?",
      "Be careful near the sluice gates, traveler. The current runs treacherous.",
      "Water is the kingdom's lifeblood. If the pumps freeze, everything perishes."
    ],
    dialogueTopics: {
      workStatus: "The main cistern is at 88% capacity. The lower valves need grease, but my hands are full.",
      personal: "Sometimes I watch the stars reflect in the deep reservoir at midnight. It brings peace.",
      rumor: "I spotted shadowy figures creeping near the aqueduct intake yesterday... could someone be plotting poison?",
      pleaForHelp: "My cough is worsening... I feel chills in my bones. If I collapse, who will manage the clean water filters?"
    },
    favoriteGifts: ['fruits', 'herbs', 'bread'],
    canBeAssisted: true,
    requiredMedicine: 'medicine'
  },
  {
    id: 'caren',
    name: 'Caren',
    title: 'Lady of the Harvest',
    role: 'Head Farmer & Granary Overseer',
    district: 'Sunmill Farmlands',
    facility: 'Sunmill Estate & Silos',
    avatarSeed: 'caren_farmer',
    avatarUrl: '/characters/rubia_assassin.png',
    portraitUrl: '/characters/rubia_assassin.png',
    backgroundUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
    themeColor: '#eab308', // golden amber
    hairColor: '#fde047', // warm strawberry blonde
    eyeColor: '#854d0e',
    personality: 'Warmhearted, hardworking, protective of hungry refugee children',
    health: 88,
    maxHealth: 100,
    energy: 78,
    status: 'Healthy',
    loyalty: 25,
    affection: 30,
    managedResource: 'grain',
    baseProductionPerDay: 95, // 95 grain sacks
    efficiencyModifier: 1.0,
    backstory: 'Caren took over the harvest when her parents fell to the fever. Under her care, the golden fields yielded record harvests.',
    greetings: [
      "Good morning, traveler! Have you had your morning bread yet?",
      "The wheat is bowing its golden head today. Harvest season calls for strong arms!",
      "Welcome to the farmstead. Hard work here always earns a warm meal."
    ],
    dialogueTopics: {
      workStatus: "The threshing floor is bustling, but our iron scythes are dulling. We need Torvin's tools.",
      personal: "I bake an extra loaf each dawn for the refugee camp. No child should sleep hungry.",
      rumor: "Garrison scouts saw wolves prowling the perimeter fences. I worry for our field hands.",
      pleaForHelp: "A wolf tore into my arm while defending the granary! The wound is festering... please, I need alchemical salve!"
    },
    favoriteGifts: ['tools', 'water', 'clothing'],
    canBeAssisted: true,
    requiredMedicine: 'medicine'
  },
  {
    id: 'bran',
    name: 'Old Bran',
    title: 'The Netmaster',
    role: 'Harbor Master & Chief Fisherman',
    district: 'Whistling Docks',
    facility: 'The Fisherman Basin',
    avatarSeed: 'bran_fisher',
    avatarUrl: '/characters/silas_olstein.png',
    portraitUrl: '/characters/silas_olstein.png',
    backgroundUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    themeColor: '#0ea5e9',
    hairColor: '#94a3b8',
    eyeColor: '#0369a1',
    personality: 'Gruff, weather-beaten, loves sea shanties and strong ale',
    health: 85,
    maxHealth: 100,
    energy: 70,
    status: 'Healthy',
    loyalty: 10,
    affection: 15,
    managedResource: 'fish',
    baseProductionPerDay: 75,
    efficiencyModifier: 1.0,
    backstory: 'A sea veteran who survived thirty storms. He now commands the river fleet that feeds Valenreach with silver trout.',
    greetings: [
      "Smell that salt and river wind? That's the aroma of an honest living, lad.",
      "Tides wait for no man, and neither do the shoals of river trout.",
      "Watch your footing on the wet timber, unless ye fancy an icy bath!"
    ],
    dialogueTopics: {
      workStatus: "River nets pulled in forty crates of trout at sunrise. The fishmongers are smiling.",
      personal: "My old joints ache when rain approaches. But the water still calls to me.",
      rumor: "Pirate skiffs have been spotted downstream. If they choke the river mouth, fresh food stops.",
      pleaForHelp: "Scurvy and river rot are gnawing at my skin! I need fresh orchard fruit or elixirs immediately!"
    },
    favoriteGifts: ['bread', 'fruits', 'tools'],
    canBeAssisted: true,
    requiredMedicine: 'fruits'
  },
  {
    id: 'lyra',
    name: 'Lyra',
    title: 'The Forest Herbalist',
    role: 'Botanist & Royal Orchardist',
    district: 'Suncrest Orchards',
    facility: 'The Whispering Glasshouse',
    avatarSeed: 'lyra_botanist',
    avatarUrl: '/characters/elena_scheherazade.png',
    portraitUrl: '/characters/elena_scheherazade.png',
    backgroundUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80',
    themeColor: '#22c55e', // emerald green
    hairColor: '#4ade80', // vibrant leafy anime green
    eyeColor: '#15803d',
    personality: 'Curious, scholarly, talks affectionately to rare medicinal flora',
    health: 95,
    maxHealth: 100,
    energy: 90,
    status: 'Healthy',
    loyalty: 20,
    affection: 25,
    managedResource: 'fruits',
    baseProductionPerDay: 60,
    efficiencyModifier: 1.0,
    backstory: 'Apprenticed in the royal greenhouse, Lyra cross-bred resilient sweet apples that can endure harsh mountain frosts.',
    greetings: [
      "Careful! Don't step on the moonflower seedlings—they only bloom under moonlight!",
      "A sweet apple a day keeps the apothecary away... though Elena might dispute that!",
      "The forest whispers when you listen with quiet patience."
    ],
    dialogueTopics: {
      workStatus: "The red apples are ripening beautifully. I've gathered three crates of healing feverfew.",
      personal: "I'm cataloging wild mushrooms from the deep crags. Some can heal, others cause hallucinations!",
      rumor: "Certain rare herbs in the royal forest are being poached at night by cloaked smugglers.",
      pleaForHelp: "I accidentally pricked my thumb on a poisonous thorn blossom! My vision is blurring..."
    },
    favoriteGifts: ['water', 'tools', 'bread'],
    canBeAssisted: true,
    requiredMedicine: 'medicine'
  },
  {
    id: 'sylvie',
    name: 'Madam Sylvie',
    title: 'The Weaver of Sol',
    role: 'Guildmistress of Textiles & Tailoring',
    district: 'The Loom Quarter',
    facility: 'The Velvet Loom House',
    avatarSeed: 'sylvie_weaver',
    avatarUrl: '/characters/beatrix_teresse.png',
    portraitUrl: '/characters/beatrix_teresse.png',
    backgroundUrl: 'https://images.unsplash.com/photo-1528458876861-544fd1761a91?auto=format&fit=crop&w=600&q=80',
    themeColor: '#a855f7', // royal violet
    hairColor: '#c084fc', // pastel lilac anime hair
    eyeColor: '#7e22ce',
    personality: 'Refined, elegant, has a keen eye for fashion and social status',
    health: 90,
    maxHealth: 100,
    energy: 80,
    status: 'Healthy',
    loyalty: 15,
    affection: 18,
    managedResource: 'clothing',
    baseProductionPerDay: 40,
    efficiencyModifier: 1.0,
    backstory: 'Sylvie tailored garments for foreign royalty before opening her famed atelier in Valenreach. She outfits everyone from farm hands to knights.',
    greetings: [
      "Clothes make the man, darling. A ragged cloak will keep you a beggar forever.",
      "The spinning wheels sing such soothing melodies, don't you think?",
      "Mind your posture! Good cloth looks twice as noble on a straight spine."
    ],
    dialogueTopics: {
      workStatus: "We are weaving hundred-pound wool mantles for the coming winter. We need more raw fleece.",
      personal: "I dream of designing the coronation robes for the next sovereign of this realm.",
      rumor: "Noble houses are discreetly buying dark silk cloaks... rumors of secret meetings in the crypts.",
      pleaForHelp: "My lungs are choked from textile dust and heavy fever. I cannot operate the grand loom..."
    },
    favoriteGifts: ['herbs', 'fruits', 'contraband'],
    canBeAssisted: true,
    requiredMedicine: 'medicine'
  },
  {
    id: 'torvin',
    name: 'Master Torvin',
    title: 'The Iron Sovereign',
    role: 'Grand Blacksmith & Foundry Master',
    district: 'The Artisan Quarter',
    facility: 'The Great Molten Forge',
    avatarSeed: 'torvin_blacksmith',
    avatarUrl: '/characters/valerius_lathel.png',
    portraitUrl: '/characters/valerius_lathel.png',
    backgroundUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
    themeColor: '#f97316', // molten orange
    hairColor: '#ea580c', // fiery amber hair
    eyeColor: '#7c2d12',
    personality: 'Thunderous, uncompromising on steel quality, respects raw grit',
    health: 94,
    maxHealth: 100,
    energy: 88,
    status: 'Healthy',
    loyalty: 18,
    affection: 12,
    managedResource: 'tools',
    baseProductionPerDay: 35,
    efficiencyModifier: 1.0,
    backstory: 'Forged his first broadsword at age twelve. He believes kingdom prosperity is hammered into shape with iron and sweat.',
    greetings: [
      "Clang! Listen to that rhythm—that is the beating heart of Valenreach!",
      "If you want flimsy iron, buy from foreign merchants. If you want steel that cleaves stone, stay here.",
      "Grab a leather apron or step back! Molten sparks have no manners."
    ],
    dialogueTopics: {
      workStatus: "Caren needs thirty scythes and Valerius wants reinforced halberds. The bellows never sleep!",
      personal: "My father told me: fire purifies everything. Weak men break, true steel hardens.",
      rumor: "The iron ore coming from Mine #3 had sulfur traces. The miners whisper of strange cave-ins.",
      pleaForHelp: "A molten crucible tipped and scalded my chest! I'm burning with fever—bring Elena's burn balm!"
    },
    favoriteGifts: ['fish', 'bread', 'water'],
    canBeAssisted: true,
    requiredMedicine: 'medicine'
  },
  {
    id: 'elena',
    name: 'Elena',
    title: 'The Sage of Elixirs',
    role: 'Chief Apothecary & Alchemist',
    district: 'Cathedral Courtyard',
    facility: 'The Royal Herbarium & Lab',
    avatarSeed: 'elena_alchemist',
    avatarUrl: '/characters/elena_scheherazade.png',
    portraitUrl: '/characters/elena_scheherazade.png',
    backgroundUrl: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=600&q=80',
    themeColor: '#ec4899', // alchemical pink
    hairColor: '#f472b6', // magenta-pink anime twin-tails
    eyeColor: '#9d174d',
    personality: 'Fastidious, slightly eccentric genius, obsessed with potion purity',
    health: 90,
    maxHealth: 100,
    energy: 92,
    status: 'Healthy',
    loyalty: 22,
    affection: 28,
    managedResource: 'medicine',
    baseProductionPerDay: 30,
    efficiencyModifier: 1.0,
    backstory: 'Graduated summa cum laude from the Sunspire Academy. Her tinctures have stopped two cholera epidemics in their tracks.',
    greetings: [
      "Do NOT sneeze near that alembic! That distillation took three days!",
      "Ah, welcome! Need something for headache, wound healing, or perhaps a truth serum?",
      "Alchemy is not magic; it is the poetry of natural elements."
    ],
    dialogueTopics: {
      workStatus: "I've brewed forty bottles of fever-breaker, but Lyra's herb shipments are lagging behind.",
      personal: "I rarely sleep when brewing. The bubbling cauldron is better company than pompous lords.",
      rumor: "I tested a water sample from the lower fountains—arsenic traces! Someone is testing poisons!",
      pleaForHelp: "I inhaled toxic fumes while brewing antitoxins! My lungs are on fire... please bring pure spring water and sage!"
    },
    favoriteGifts: ['herbs', 'water', 'fruits'],
    canBeAssisted: true,
    requiredMedicine: 'herbs'
  },
  {
    id: 'valerius',
    name: 'Commander Valerius',
    title: 'The Shield of the Realm',
    role: 'Captain of the City Guard & Garrison',
    district: 'High Citadel Garrison',
    facility: 'The Iron Bastion',
    avatarSeed: 'valerius_commander',
    avatarUrl: '/characters/valerius_sylvia.png',
    portraitUrl: '/characters/valerius_sylvia.png',
    backgroundUrl: 'https://images.unsplash.com/photo-1533158307587-828f0a76ef46?auto=format&fit=crop&w=600&q=80',
    themeColor: '#6366f1', // navy indigo
    hairColor: '#3b82f6', // sleek blue anime knight locks
    eyeColor: '#1e3a8a',
    personality: 'Honorable, stern, fiercely devoted to kingdom order and citizen safety',
    health: 98,
    maxHealth: 100,
    energy: 95,
    status: 'Healthy',
    loyalty: 10,
    affection: 10,
    managedResource: 'security',
    baseProductionPerDay: 50,
    efficiencyModifier: 1.0,
    backstory: 'Rose from an enlisted recruit to Commander through fearless tactical victories against mountain warlords.',
    greetings: [
      "Stand tall, citizen. Under my watch, no bandit breaches the outer curtain wall.",
      "Report your business in the citadel. The law is equal for peasants and peers alike.",
      "Peace is maintained through vigilance and a sharp sword."
    ],
    dialogueTopics: {
      workStatus: "Night patrols have been doubled along the merchant road. Bandit skirmishes dropped by 40%.",
      personal: "A commander does not have the luxury of sleep when thousands rest under his aegis.",
      rumor: "Vesper's underground syndicate has been moving contraband through the storm drains. My guards are closing in.",
      pleaForHelp: "I took a poisoned crossbow bolt during an ambush at the South Gate! My men cannot know... bring medicine quietly!"
    },
    favoriteGifts: ['tools', 'bread', 'fish'],
    canBeAssisted: true,
    requiredMedicine: 'medicine'
  },
  {
    id: 'beatrix',
    name: 'High Priestess Beatrix',
    title: 'Voice of the Dawn Sun',
    role: 'Matriarch of the Cathedral of Sol',
    district: 'Cathedral of Sol',
    facility: 'The Golden Altar',
    avatarSeed: 'beatrix_priestess',
    avatarUrl: '/characters/beatrix_teresse.png',
    portraitUrl: '/characters/beatrix_teresse.png',
    backgroundUrl: 'https://images.unsplash.com/photo-1548625361-195fe5795df5?auto=format&fit=crop&w=600&q=80',
    themeColor: '#f59e0b', // holy gold
    hairColor: '#e0e7ff', // ethereal platinum-silver hair
    eyeColor: '#d97706',
    personality: 'Serene, compassionate, politically astute with deep spiritual gravity',
    health: 96,
    maxHealth: 100,
    energy: 85,
    status: 'Healthy',
    loyalty: 20,
    affection: 22,
    managedResource: 'piety',
    baseProductionPerDay: 45,
    efficiencyModifier: 1.0,
    backstory: 'Believed to have been blessed by the Dawn Goddess in childhood. She governs the realm\'s spiritual faith and poor relief.',
    greetings: [
      "May the sacred light illuminate your path through the darkness, child.",
      "The cathedral doors are forever open to those who seek solace and redemption.",
      "True nobility is measured by how one treats the humblest among us."
    ],
    dialogueTopics: {
      workStatus: "The cathedral soup kitchen served over three hundred bowls to weary refugees today.",
      personal: "In silent prayer, one learns that all kingdom titles are temporary; the soul is eternal.",
      rumor: "A faction among the high nobles seeks to cut our cathedral tithes to fund foreign mercenaries.",
      pleaForHelp: "A deadly plague struck our orphan hospice, and I have contracted the contagion while tending the sick..."
    },
    favoriteGifts: ['bread', 'herbs', 'clothing'],
    canBeAssisted: true,
    requiredMedicine: 'medicine'
  },
  {
    id: 'silas',
    name: 'Guildmaster Silas',
    title: 'The Golden Scales',
    role: 'President of the Merchant Consortium',
    district: 'The Grand Bazaar',
    facility: 'The Merchant Exchange',
    avatarSeed: 'silas_merchant',
    avatarUrl: '/characters/silas_olstein.png',
    portraitUrl: '/characters/silas_olstein.png',
    backgroundUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
    themeColor: '#10b981', // emerald coin green
    hairColor: '#f59e0b', // slick golden blonde hair
    eyeColor: '#047857',
    personality: 'Charismatic, shrewd negotiator, believes every man and throne has a price',
    health: 89,
    maxHealth: 100,
    energy: 82,
    status: 'Healthy',
    loyalty: 12,
    affection: 15,
    managedResource: 'prosperity',
    baseProductionPerDay: 80,
    efficiencyModifier: 1.0,
    backstory: 'Started with a single handcart selling spiced wine. Now controls twenty-four foreign trade caravans and merchant caravels.',
    greetings: [
      "Gold makes the world turn, my friend! What brings your purse to my exchange?",
      "Every coin not working for you is a coin wasting away. Let's make an investment!",
      "A contract signed in ink is stronger than an oath sworn in blood."
    ],
    dialogueTopics: {
      workStatus: "The Eastern Caravan just arrived with silks and rare salt. Market turnover is up 18%.",
      personal: "People call me greedy, but without my ships, this land would starve in winter.",
      rumor: "Foreign empires are preparing trade sanctions if our kingdom's border instability continues.",
      pleaForHelp: "Bandits ambushed my gold caravan and shot me in the shoulder! If I bleed out, the trade lines collapse!"
    },
    favoriteGifts: ['contraband', 'clothing', 'fruits'],
    canBeAssisted: true,
    requiredMedicine: 'medicine'
  },
  {
    id: 'vesper',
    name: 'Vesper',
    title: 'The Shadow Mirage',
    role: 'Underboss of the Nightshade Syndicate',
    district: 'The Catacombs & Undercity',
    facility: 'The Velvet Dagger Den',
    avatarSeed: 'vesper_rogue',
    avatarUrl: '/characters/vesper_eclipse.png',
    portraitUrl: '/characters/vesper_eclipse.png',
    backgroundUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    themeColor: '#8b5cf6', // dark neon amethyst
    hairColor: '#312e81', // midnight indigo hair with purple streak
    eyeColor: '#c084fc',
    personality: 'Playful, deadly, cynical about kingdom morals, intensely loyal to her crew',
    health: 93,
    maxHealth: 100,
    energy: 96,
    status: 'Healthy',
    loyalty: 5,
    affection: 12,
    managedResource: 'contraband',
    baseProductionPerDay: 25,
    efficiencyModifier: 1.0,
    backstory: 'Orphaned in the slums, she built an underground network that knows the deepest secrets of every lord in the castle.',
    greetings: [
      "Keep your voice down, stray cat. In the dark, walls have ears and knives have teeth.",
      "Looking for something the honest shops won't sell you? You came to the right place.",
      "The law is just a story the nobles tell to keep their gold safe. Care to rewrite it?"
    ],
    dialogueTopics: {
      workStatus: "The undercity pipelines are clear. Smuggled elixirs and forged papers are flowing nicely.",
      personal: "I could have been a lady in a silk gown. But I prefer the freedom of shadows and cold steel.",
      rumor: "Lord Moros in the Royal Council is secretly laundering treasury funds through phantom grain ships.",
      pleaForHelp: "Valerius's inquisitors set an ambush in our sewer safehouse! I took a poisoned blade... help me!"
    },
    favoriteGifts: ['tools', 'fish', 'contraband'],
    canBeAssisted: true,
    requiredMedicine: 'medicine'
  }
];

export const INITIAL_KINGDOM_STATS: KingdomStats = {
  population: 5200,
  granary: 76,
  cleanWater: 88,
  publicHealth: 82,
  security: 70,
  piety: 74,
  treasuryGold: 2450,
  unrest: 18,
  prosperity: 64,
};

export const INITIAL_PLAYER: PlayerState = {
  name: 'Aron',
  title: 'Wandering Exile',
  gender: 'male',
  rank: 'Refugee',
  rankProgress: 10,
  copper: 45, // 45 copper
  energy: 85,
  maxEnergy: 100,
  hunger: 40,
  health: 90,
  stats: {
    level: 1,
    exp: 25,
    maxExp: 100,
    might: 14,
    cunning: 16,
    authority: 12,
    piety: 10,
  },
  reputation: {
    peasantry: 10,
    clergy: 5,
    military: 0,
    nobility: -15,
    underworld: 15,
  },
  crimeBounty: 0,
  inventory: {
    water: 2,
    bread: 1,
    fruits: 1,
  },
  ownedBusinesses: [],
  deeds: [],
  completedBondSceneIds: [],
  activePerks: [],
};

export const INITIAL_MARKET_PRICES: MarketPrice[] = Object.values(RESOURCES).map(r => ({
  resourceId: r.id,
  basePrice: r.basePrice,
  currentPrice: r.basePrice,
  supplyLevel: 'Normal',
  trend: 'steady',
}));

export const JOB_OPPORTUNITIES: JobOpportunity[] = [
  // Refugee tier jobs
  {
    id: 'haul_water',
    title: 'Haul Water Buckets for Mira',
    minRank: 'Refugee',
    facility: 'Mountain Aqueduct',
    supervisorNpcId: 'mira',
    energyCost: 20,
    staminaCost: 15,
    copperReward: 12,
    rewardItem: { itemId: 'water', amount: 1 },
    kingdomImpact: { statKey: 'cleanWater', delta: 2 },
    npcRelationshipBonus: 4,
    description: 'Carry heavy wooden pails from the mountain springs to the lower district cisterns.',
  },
  {
    id: 'scavenge_docks',
    title: 'Scavenge & Mend River Nets',
    minRank: 'Refugee',
    facility: 'Whistling Docks',
    supervisorNpcId: 'bran',
    energyCost: 18,
    staminaCost: 12,
    copperReward: 10,
    rewardItem: { itemId: 'fish', amount: 1 },
    kingdomImpact: { statKey: 'granary', delta: 1 },
    npcRelationshipBonus: 3,
    description: 'Help Old Bran untangle barbed nets and haul in fresh trout under the morning spray.',
  },
  {
    id: 'weed_farms',
    title: 'Weed Thistle from Golden Fields',
    minRank: 'Refugee',
    facility: 'Sunmill Farmlands',
    supervisorNpcId: 'caren',
    energyCost: 25,
    staminaCost: 20,
    copperReward: 14,
    rewardItem: { itemId: 'grain', amount: 1 },
    kingdomImpact: { statKey: 'granary', delta: 2 },
    npcRelationshipBonus: 5,
    description: 'Clear invasive thistles choking the young rye under the watchful, gentle eyes of Caren.',
  },
  {
    id: 'gather_herbs',
    title: 'Forage Wild Forest Herbs',
    minRank: 'Refugee',
    facility: 'Whispering Glade',
    supervisorNpcId: 'lyra',
    energyCost: 20,
    staminaCost: 10,
    copperReward: 16,
    rewardItem: { itemId: 'herbs', amount: 1 },
    kingdomImpact: { statKey: 'publicHealth', delta: 2 },
    npcRelationshipBonus: 5,
    description: 'Hike into misty glades to identify medicinal feverfew and sage for Botanist Lyra.',
  },

  // Peasant tier jobs
  {
    id: 'reap_wheat',
    title: 'Scythe Wheat with Farm Hands',
    minRank: 'Peasant',
    facility: 'Sunmill Farmlands',
    supervisorNpcId: 'caren',
    energyCost: 30,
    staminaCost: 25,
    copperReward: 28,
    rewardItem: { itemId: 'bread', amount: 2 },
    kingdomImpact: { statKey: 'granary', delta: 4 },
    npcRelationshipBonus: 6,
    description: 'Work alongside the peasant reapers swinging heavy iron scythes during peak harvest.',
  },
  {
    id: 'haul_iron_ore',
    title: 'Cart Iron Ore to the Great Forge',
    minRank: 'Peasant',
    facility: 'The Artisan Quarter',
    supervisorNpcId: 'torvin',
    energyCost: 35,
    staminaCost: 30,
    copperReward: 35,
    rewardItem: { itemId: 'iron_ore', amount: 1 },
    kingdomImpact: { statKey: 'prosperity', delta: 3 },
    npcRelationshipBonus: 5,
    description: 'Push heavy ore carts into the roaring foundry. Master Torvin respects honest sweat.',
  },
  {
    id: 'operate_looms',
    title: 'Operate Wool Spindles for Sylvie',
    minRank: 'Peasant',
    facility: 'The Loom House',
    supervisorNpcId: 'sylvie',
    energyCost: 24,
    staminaCost: 15,
    copperReward: 30,
    rewardItem: { itemId: 'clothing', amount: 1 },
    kingdomImpact: { statKey: 'publicHealth', delta: 3 },
    npcRelationshipBonus: 6,
    description: 'Spin sheep wool and weave warm winter blankets to keep the commoners healthy.',
  },

  // Villager / Artisan tier
  {
    id: 'forge_tools',
    title: 'Hammer Steel Tools at the Anvil',
    minRank: 'Villager',
    facility: 'The Grand Forge',
    supervisorNpcId: 'torvin',
    energyCost: 35,
    staminaCost: 30,
    copperReward: 65,
    rewardItem: { itemId: 'tools', amount: 1 },
    kingdomImpact: { statKey: 'prosperity', delta: 5 },
    npcRelationshipBonus: 7,
    description: 'Smelt bog iron into high-grade sickles, axes, and plowshares for the kingdom.',
  },
  {
    id: 'distill_medicine',
    title: 'Distill Alchemical Tinctures with Elena',
    minRank: 'Villager',
    facility: 'Royal Herbarium',
    supervisorNpcId: 'elena',
    energyCost: 28,
    staminaCost: 15,
    copperReward: 70,
    rewardItem: { itemId: 'medicine', amount: 1 },
    kingdomImpact: { statKey: 'publicHealth', delta: 6 },
    npcRelationshipBonus: 8,
    description: 'Precisely measure sulfur, silverleaf, and spring water in Elena’s bubbling glassware.',
  },
  {
    id: 'bazaar_broker',
    title: 'Manage Caravan Goods at Exchange',
    minRank: 'Villager',
    facility: 'The Grand Bazaar',
    supervisorNpcId: 'silas',
    energyCost: 25,
    staminaCost: 10,
    copperReward: 85,
    kingdomImpact: { statKey: 'treasuryGold', delta: 15 },
    npcRelationshipBonus: 6,
    description: 'Audit exotic trade ledgers and inspect silk bales with Guildmaster Silas.',
  },

  // Priest / Knight tier
  {
    id: 'patrol_walls',
    title: 'Lead Fortress Rampart Patrol',
    minRank: 'Knight',
    facility: 'The Iron Bastion',
    supervisorNpcId: 'valerius',
    energyCost: 40,
    staminaCost: 35,
    copperReward: 140,
    kingdomImpact: { statKey: 'security', delta: 8 },
    npcRelationshipBonus: 8,
    description: 'Don chainmail and patrol outer battlements with Commander Valerius to deter bandits.',
  },
  {
    id: 'bless_congregation',
    title: 'Conduct Morning Devotions & Sol Bread',
    minRank: 'Priest',
    facility: 'Cathedral of Sol',
    supervisorNpcId: 'beatrix',
    energyCost: 30,
    staminaCost: 20,
    copperReward: 120,
    kingdomImpact: { statKey: 'piety', delta: 8 },
    npcRelationshipBonus: 9,
    description: 'Chant sacred hymns beside High Priestess Beatrix and distribute blessed bread to orphans.',
  },

  // Noble / King tier
  {
    id: 'convene_council',
    title: 'Preside Over Kingdom High Council',
    minRank: 'Noble',
    facility: 'Royal Throne Room',
    supervisorNpcId: 'valerius',
    energyCost: 45,
    staminaCost: 30,
    copperReward: 350,
    kingdomImpact: { statKey: 'unrest', delta: -8 },
    npcRelationshipBonus: 10,
    description: 'Deliberate royal tax allocations, hear guild petitions, and stabilize kingdom unrest.',
  },
  {
    id: 'royal_decree',
    title: 'Issue Crown Edicts & National Works',
    minRank: 'King',
    facility: 'Imperial Palace',
    supervisorNpcId: 'beatrix',
    energyCost: 50,
    staminaCost: 40,
    copperReward: 800,
    kingdomImpact: { statKey: 'prosperity', delta: 12 },
    npcRelationshipBonus: 12,
    description: 'Rule as sovereign: command grand granary expansions and sign treaties with foreign crowns.',
  }
];

export const RANDOM_EVENTS: GameEvent[] = [
  {
    id: 'aqueduct_sabotage',
    title: 'Poisonous Silt in the Mountain Springs',
    speakerNpcId: 'mira',
    description: 'Mira arrives pale and drenched in cold sweat. "Someone poured sulfur and rotting offal into the reservoir intake! The clean water pumps are clogging—if we don\'t flush the filters immediately, half the city will contract dysentery!"',
    illustrationType: 'warning',
    choices: [
      {
        text: 'Dive into the cistern with Mira and manually scrub the intake valves (Costs 35 Energy)',
        consequenceText: 'You plunge into the frigid mountain runoff, scraping away the toxic muck alongside Mira. The city water is saved, and Mira looks at you with heartfelt devotion!',
        energyCost: 35,
        statImpact: { cleanWater: 15, publicHealth: 10 },
        reputationImpact: { peasantry: 15 },
        npcImpact: { npcId: 'mira', loyaltyDelta: 25, healthDelta: -5 }
      },
      {
        text: 'Procure 2 vials of Elena\'s purified Medicine to neutralize the cistern water',
        consequenceText: 'Elena\'s alchemical reagents dissolve the contaminant into harmless vapor. The water remains crystal clear, and Mira weeps in relief.',
        itemRequirement: { itemId: 'medicine', amount: 2 },
        statImpact: { cleanWater: 20, publicHealth: 15 },
        npcImpact: { npcId: 'mira', loyaltyDelta: 30 }
      },
      {
        text: 'Lock down the lower aqueduct gates and ration contaminated water to save costs',
        consequenceText: 'Water supplies plunge, and several dozen slum dwellers fall ill. Mira collapses from overwork and grief.',
        statImpact: { cleanWater: -25, publicHealth: -20, unrest: 15 },
        npcImpact: { npcId: 'mira', loyaltyDelta: -30, status: 'Sick', healthDelta: -30 }
      }
    ]
  },
  {
    id: 'famine_crisis',
    title: 'Locust Swarm & Scorched Fields',
    speakerNpcId: 'caren',
    description: 'A cloud of locusts descended upon the Golden Farmlands, chewing through ripe rye. Caren stands before the smoldering fields with soot on her cheeks. "The granary reserves are dwindling... without emergency grain, the winter bread rations will fail!"',
    illustrationType: 'disaster',
    choices: [
      {
        text: 'Rally volunteer harvesters to salvage unburnt wheat ears day and night (Costs 30 Energy, 50 Copper)',
        consequenceText: 'Working tirelessly under the sun, you and Caren salvage half the harvest. The kingdom granary holds!',
        energyCost: 30,
        copperCost: 50,
        statImpact: { granary: 15, unrest: -10 },
        reputationImpact: { peasantry: 20 },
        npcImpact: { npcId: 'caren', loyaltyDelta: 25 }
      },
      {
        text: 'Commission Guildmaster Silas to import foreign emergency grain shipments (Costs 250 Copper)',
        consequenceText: 'Silas\'s trade fleet docks within days laden with foreign barley. The citizens celebrate the abundance!',
        copperCost: 250,
        statImpact: { granary: 25, prosperity: 5 },
        npcImpact: { npcId: 'silas', loyaltyDelta: 15 }
      },
      {
        text: 'Cut bread rations for refugees and commoners to safeguard royal stores',
        consequenceText: 'Riots erupt in the lower quarters. Caren confronts you in tears, condemning the cruelty.',
        statImpact: { granary: 5, unrest: 25, publicHealth: -15 },
        reputationImpact: { peasantry: -25, nobility: 10 },
        npcImpact: { npcId: 'caren', loyaltyDelta: -35 }
      }
    ]
  },
  {
    id: 'bandit_siege',
    title: 'Iron Fangs Bandits at the River Gate',
    speakerNpcId: 'valerius',
    description: 'War horns blare across the parapets! Commander Valerius draws his broadsword as scouts report two hundred armed bandits demanding fifty bags of silver and granary stores, threatening to torch the docks!',
    illustrationType: 'warning',
    choices: [
      {
        text: 'Fight on the front lines alongside Commander Valerius (Costs 40 Energy, 10 Health)',
        consequenceText: 'Your valor turns the tide! Standing shoulder to shoulder with Valerius, you shatter the bandit chieftain\'s shield. Valerius hails you as a true warrior of the realm!',
        energyCost: 40,
        playerImpact: { health: -10, copper: 120 },
        statImpact: { security: 20, unrest: -15 },
        reputationImpact: { military: 25, peasantry: 15 },
        npcImpact: { npcId: 'valerius', loyaltyDelta: 30 }
      },
      {
        text: 'Donate 2 sets of Master Torvin\'s Forged Tools & Weapons to equip the peasant militia',
        consequenceText: 'The newly armed militia ambushes the raiders in the olive groves. The city celebrates an overwhelming victory!',
        itemRequirement: { itemId: 'tools', amount: 2 },
        statImpact: { security: 18, unrest: -10 },
        reputationImpact: { peasantry: 20, military: 15 },
        npcImpact: { npcId: 'valerius', loyaltyDelta: 20, healthDelta: 5 }
      },
      {
        text: 'Hire Shadow Broker Vesper\'s assassins to poison the bandit camp\'s water supply (Costs 150 Copper)',
        consequenceText: 'By midnight, screams echo from the woods. The bandit army scatters in agony. Vesper winks at you from the shadows.',
        copperCost: 150,
        statImpact: { security: 15 },
        reputationImpact: { underworld: 20, clergy: -10 },
        npcImpact: { npcId: 'vesper', loyaltyDelta: 25 }
      }
    ]
  },
  {
    id: 'plague_in_the_slums',
    title: 'The Purple Ague Strikes the Poor Quarter',
    speakerNpcId: 'beatrix',
    description: 'High Priestess Beatrix kneels in prayer beside rows of shivering patients in the cathedral nave. "The Purple Ague is spreading fast. Apothecary Elena needs wild herbs, and we need clean spring water, or the sickness will engulf the citadel!"',
    illustrationType: 'disaster',
    choices: [
      {
        text: 'Deliver 3 bunches of Herbs and 3 jugs of Water to the Cathedral Hospice',
        consequenceText: 'Beatrix and Elena brew potent curative broths. The fever breaks, and the dying recover their strength. Beatrix gives you a saintly holy blessing!',
        itemRequirement: { itemId: 'herbs', amount: 3 },
        statImpact: { publicHealth: 25, piety: 15, unrest: -10 },
        reputationImpact: { clergy: 25, peasantry: 20 },
        npcImpact: { npcId: 'beatrix', loyaltyDelta: 30 },
        playerImpact: { energy: 20 }
      },
      {
        text: 'Pay Elena 180 Copper to mass-produce fever-breaking elixirs immediately',
        consequenceText: 'Bottles of glowing pink tincture are distributed across the city. The epidemic is squashed within 48 hours!',
        copperCost: 180,
        statImpact: { publicHealth: 30 },
        npcImpact: { npcId: 'elena', loyaltyDelta: 25 }
      },
      {
        text: 'Wards the slum gates shut with soldiers and let the disease run its course',
        consequenceText: 'The slums become a graveyard. Thousands perish, and the wails of grief echo through the stone streets.',
        statImpact: { publicHealth: -35, unrest: 30, population: -400 },
        reputationImpact: { peasantry: -40, clergy: -25 },
        npcImpact: { npcId: 'beatrix', loyaltyDelta: -40 }
      }
    ]
  },
  {
    id: 'noble_conspiracy',
    title: 'Whispers in the Crypts: Treason against the Crown',
    speakerNpcId: 'vesper',
    description: 'Vesper materializes beside you in a dark alley, leaning close with a wicked smirk. "I stole letters from Lord Moros\'s courier. He\'s bribing foreign mercenaries to depose the royal council and seize the granaries for private profit. What\'s your move, honey?"',
    illustrationType: 'intrigue',
    choices: [
      {
        text: 'Deliver the treasonous letters directly to Commander Valerius',
        consequenceText: 'Garrison soldiers storm Moros\'s manor at dawn, arresting the conspirators. Valerius commends your loyalty to the realm!',
        statImpact: { security: 15, unrest: -15 },
        reputationImpact: { military: 25, nobility: -10 },
        npcImpact: { npcId: 'valerius', loyaltyDelta: 25 },
        playerImpact: { copper: 150 }
      },
      {
        text: 'Blackmail Lord Moros together with Vesper for a massive cut of gold (Gain 300 Copper)',
        consequenceText: 'Moros pays a hefty chest of gold to silence you. You and Vesper split the loot, laughing into the night.',
        playerImpact: { copper: 300, bounty: 15 },
        reputationImpact: { underworld: 25, nobility: 5 },
        npcImpact: { npcId: 'vesper', loyaltyDelta: 30 }
      },
      {
        text: 'Publicly leak the scandal at the Cathedral of Sol to awaken the citizenry',
        consequenceText: 'Outraged citizens protest outside the council chambers, demanding justice and fair bread distribution.',
        statImpact: { piety: 15, unrest: 10 },
        reputationImpact: { peasantry: 25, nobility: -25 },
        npcImpact: { npcId: 'beatrix', loyaltyDelta: 15 }
      }
    ]
  }
];

export const RANK_LADDER: { rank: SocialRank; title: string; requiredProgress: number; copperCost: number; perk: string }[] = [
  {
    rank: 'Refugee',
    title: 'The Nameless Exile',
    requiredProgress: 0,
    copperCost: 0,
    perk: 'Can scavenge and beg. Low reputation with nobility.',
  },
  {
    rank: 'Peasant',
    title: 'Free Tenant Farmer',
    requiredProgress: 100,
    copperCost: 60,
    perk: 'Allowed to lease farmland, sell harvest directly, and sleep in honest cottages.',
  },
  {
    rank: 'Villager',
    title: 'Burgher & Master Craftsman',
    requiredProgress: 250,
    copperCost: 200,
    perk: 'Can open permanent workshops, hire assistants, and trade at the Grand Bazaar.',
  },
  {
    rank: 'Priest',
    title: 'Ordained Cleric of the Dawn',
    requiredProgress: 500,
    copperCost: 500,
    perk: 'Command cathedral donations, grant pardons for crime, and conduct mass blessings.',
  },
  {
    rank: 'Knight',
    title: 'Banneret of the Citadel',
    requiredProgress: 500,
    copperCost: 500,
    perk: 'Lead garrison platoons, hold fiefs, levy levies, and challenge rogue nobles.',
  },
  {
    rank: 'Noble',
    title: 'High Councillor of Valenreach',
    requiredProgress: 1000,
    copperCost: 1500,
    perk: 'Vote in royal decisions, tax merchant caravans, and own estate manors.',
  },
  {
    rank: 'King',
    title: 'Sovereign Monarch of the Realm',
    requiredProgress: 2500,
    copperCost: 5000,
    perk: 'Absolute rule over Valenreach: decree laws, wage wars, and shape the eternal legacy.',
  }
];
