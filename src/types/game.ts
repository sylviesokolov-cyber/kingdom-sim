export type SocialRank = 
  | 'Refugee'
  | 'Peasant'
  | 'Villager'
  | 'Priest'
  | 'Knight'
  | 'Noble'
  | 'King';

export type Season = 'Spring' | 'Summer' | 'Autumn' | 'Winter';

export type NpcStatus = 'Healthy' | 'Fatigued' | 'Sick' | 'Injured' | 'Critical' | 'In Dungeon' | 'Deceased';

export interface ResourceItem {
  id: string;
  name: string;
  category: 'Food' | 'Water' | 'Material' | 'Medicine' | 'Luxury' | 'Equipment';
  icon: string;
  description: string;
  sourceNpcId: string;
  sourceFacility: string;
  basePrice: number; // in Copper coins (100 Copper = 1 Silver, 10 Silver = 1 Gold)
  unit: string;
}

export interface NpcCharacter {
  id: string;
  name: string;
  title: string;
  role: string;
  district: string;
  facility: string;
  avatarSeed: string; // for custom anime rendering fallback
  avatarUrl?: string; // authentic gacha character avatar headshot
  portraitUrl?: string; // authentic gacha character full standing portrait
  backgroundUrl?: string; // scenic district / facility background
  rarity?: 'SSR' | 'SR' | 'R'; // optional internal tier
  themeColor: string;
  hairColor: string;
  eyeColor: string;
  personality: string;
  health: number; // 0 - 100
  maxHealth: number;
  energy: number; // 0 - 100
  status: NpcStatus;
  illnessName?: string;
  daysSick?: number;
  loyalty: number; // -100 to 100 towards player
  affection: number; // 0 to 100
  managedResource: string; // resource ID
  baseProductionPerDay: number;
  efficiencyModifier: number; // 0.0 to 1.5 based on health/mood
  backstory: string;
  greetings: string[];
  dialogueTopics: {
    workStatus: string;
    personal: string;
    rumor: string;
    pleaForHelp?: string;
  };
  favoriteGifts: string[];
  canBeAssisted: boolean;
  requiredMedicine?: string;
}

export interface KingdomStats {
  population: number;
  granary: number; // 0 - 100%
  cleanWater: number; // 0 - 100%
  publicHealth: number; // 0 - 100%
  security: number; // 0 - 100%
  piety: number; // 0 - 100%
  treasuryGold: number; // total state gold
  unrest: number; // 0 - 100%
  prosperity: number; // 0 - 100%
}

export interface PlayerRpgStats {
  level: number;
  exp: number;
  maxExp: number;
  might: number; // Combat / Physical strength
  cunning: number; // Intrigue / Shadow network
  authority: number; // Leadership / Decrees & Petitions
  piety: number; // Devotion / Cathedral & Miracles
}

export interface PlayerInventory {
  [resourceId: string]: number;
}

export interface PlayerState {
  name: string;
  title: string;
  gender: 'male' | 'female';
  rank: SocialRank;
  rankProgress: number; // 0 to 100% to next tier
  copper: number; // 1 Gold = 1000 Copper, 1 Silver = 100 Copper
  energy: number; // current energy (0 - 100)
  maxEnergy: number;
  hunger: number; // 0 (stuffed) to 100 (starving)
  health: number; // 0 - 100
  stats?: PlayerRpgStats;
  reputation: {
    peasantry: number; // -100 to 100
    clergy: number;
    military: number;
    nobility: number;
    underworld: number;
  };
  crimeBounty: number;
  inventory: PlayerInventory;
  ownedBusinesses: string[];
  deeds: string[];
  completedBondSceneIds?: string[];
  activePerks?: string[];
}

export interface GameEventChoice {
  text: string;
  consequenceText: string;
  energyCost?: number;
  copperCost?: number;
  itemRequirement?: { itemId: string; amount: number };
  statImpact?: Partial<KingdomStats>;
  reputationImpact?: Partial<PlayerState['reputation']>;
  playerImpact?: {
    copper?: number;
    energy?: number;
    health?: number;
    bounty?: number;
    gainItem?: { itemId: string; amount: number };
  };
  npcImpact?: {
    npcId: string;
    healthDelta?: number;
    status?: NpcStatus;
    loyaltyDelta?: number;
  };
}

export interface GameEvent {
  id: string;
  title: string;
  speakerNpcId?: string;
  customSpeakerName?: string;
  description: string;
  illustrationType: 'warning' | 'celebration' | 'intrigue' | 'disaster' | 'romance';
  choices: GameEventChoice[];
}

export interface JobOpportunity {
  id: string;
  title: string;
  minRank: SocialRank;
  facility: string;
  supervisorNpcId: string;
  energyCost: number;
  staminaCost: number;
  copperReward: number;
  rewardItem?: { itemId: string; amount: number };
  kingdomImpact: {
    statKey: keyof KingdomStats;
    delta: number;
  };
  npcRelationshipBonus?: number;
  description: string;
}

export interface MarketPrice {
  resourceId: string;
  currentPrice: number;
  basePrice: number;
  supplyLevel: 'Critically Scarce' | 'Scarce' | 'Normal' | 'Abundant' | 'Surplus';
  trend: 'up' | 'down' | 'steady';
}

export interface BondDialogueChoice {
  id: string;
  text: string;
  response: string;
  affectionGain?: number;
  rpgStatGain?: { stat: 'might' | 'cunning' | 'authority' | 'piety'; value: number };
  reactionEmotion?: 'normal' | 'happy' | 'blush' | 'serious' | 'tender' | 'thoughtful';
}

export interface BondDialogueStep {
  id: string;
  speaker: string; // NPC name, player name, or 'Narrator'
  isNarrator?: boolean;
  text: string;
  emotion?: 'normal' | 'happy' | 'blush' | 'serious' | 'tender' | 'thoughtful';
  choices?: BondDialogueChoice[];
}

export interface BondScene {
  id: string;
  npcId: string;
  title: string;
  episodeNumber: number; // 1, 2, 3, etc.
  requiredAffection: number; // e.g. 25, 50, 75
  synopsis: string;
  location: string;
  scenicBackgroundUrl?: string;
  reward: {
    title: string;
    description: string;
    perkId: string;
    maxEnergyBonus?: number;
    copperBonus?: number;
    statBonus?: { stat: 'might' | 'cunning' | 'authority' | 'piety'; value: number };
  };
  script: BondDialogueStep[];
}

