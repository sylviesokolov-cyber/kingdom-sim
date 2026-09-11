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
  basePrice: number;
  unit: string;
}

export interface NpcCharacter {
  id: string;
  name: string;
  title: string;
  role: string;
  district: string;
  facility: string;
  avatarSeed: string;
  avatarUrl?: string;
  portraitUrl?: string;
  backgroundUrl?: string;
  rarity?: 'SSR' | 'SR' | 'R';
  themeColor: string;
  hairColor: string;
  eyeColor: string;
  personality: string;
  health: number;
  maxHealth: number;
  energy: number;
  status: NpcStatus;
  illnessName?: string;
  daysSick?: number;
  loyalty: number;
  affection: number;
  managedResource: string;
  baseProductionPerDay: number;
  efficiencyModifier: number;
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
  granary: number;
  cleanWater: number;
  publicHealth: number;
  security: number;
  piety: number;
  treasuryGold: number;
  unrest: number;
  prosperity: number;
}

export interface PlayerRpgStats {
  level: number;
  exp: number;
  maxExp: number;
  might: number;
  cunning: number;
  authority: number;
  piety: number;
}

export interface PlayerInventory {
  [resourceId: string]: number;
}

export interface PlayerState {
  name: string;
  title: string;
  gender: 'male' | 'female';
  rank: SocialRank;
  rankProgress: number;
  copper: number;
  energy: number;
  maxEnergy: number;
  hunger: number;
  health: number;
  stats?: PlayerRpgStats;
  reputation: {
    peasantry: number;
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

export type BondEmotion = 'normal' | 'happy' | 'blush' | 'serious' | 'tender' | 'thoughtful' | 'determined';

export interface BondDialogueChoice {
  id: string;
  text: string;
  response: string;
  affectionGain?: number;
  rpgStatGain?: { stat: 'might' | 'cunning' | 'authority' | 'piety'; value: number };
  reactionEmotion?: BondEmotion;
}

export interface BondDialogueStep {
  id: string;
  speaker: string;
  isNarrator?: boolean;
  text: string;
  emotion?: BondEmotion;
  choices?: BondDialogueChoice[];
}

export interface BondScene {
  id: string;
  npcId: string;
  title: string;
  episodeNumber: number;
  requiredAffection: number;
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
