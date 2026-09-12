import { KingdomStats, MarketPrice, NpcCharacter, PlayerState, Season } from '../../types/game';

export interface DailySimulationInput {
  day: number;
  player: PlayerState;
  kingdom: KingdomStats;
  npcs: NpcCharacter[];
  marketPrices: MarketPrice[];
}

export interface DailySimulationResult {
  day: number;
  season: Season;
  player: PlayerState;
  kingdom: KingdomStats;
  npcs: NpcCharacter[];
  marketPrices: MarketPrice[];
  shouldTriggerEvent: boolean;
  eventIndex: number;
}

export type RandomSource = () => number;

const SEASONS: Season[] = ['Spring', 'Summer', 'Autumn', 'Winter'];

/** Resolve the season from the new day. Day 1 starts Spring; every 30 days advances a season. */
export function getSeasonForDay(day: number): Season {
  const normalizedDay = Math.max(1, Math.floor(day));
  return SEASONS[Math.floor(((normalizedDay - 1) % 120) / 30)];
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Pure daily world simulation. It has no React/localStorage side effects and accepts a
 * random source so tests/replays can supply a deterministic sequence.
 */
export function simulateDay(input: DailySimulationInput, random: RandomSource = Math.random): DailySimulationResult {
  const nextDay = input.day + 1;
  const season = getSeasonForDay(nextDay);

  const player: PlayerState = {
    ...input.player,
    energy: Math.min(input.player.maxEnergy, input.player.energy + 65),
    health: clamp(input.player.health + 10, 1, 100),
    hunger: clamp(input.player.hunger + 15, 0, 100),
  };

  const npcs = input.npcs.map((npc) => {
    let health = npc.health;
    let status = npc.status;
    let efficiencyModifier = npc.efficiencyModifier;

    if (status === 'Sick' || status === 'Injured' || status === 'Critical') {
      health = Math.max(10, health - 8);
      efficiencyModifier = 0.25;
      if (health < 25) status = 'Critical';
    } else {
      efficiencyModifier = 1;
      if (random() < 0.04) {
        status = 'Sick';
        health = 60;
        efficiencyModifier = 0.3;
      }
    }

    return { ...npc, health, status, efficiencyModifier };
  });

  const findNpc = (id: string) => input.npcs.find((npc) => npc.id === id);
  const mira = findNpc('mira');
  const caren = findNpc('caren');
  const valerius = findNpc('valerius');
  const elena = findNpc('elena');

  const granary = clamp(input.kingdom.granary + (caren?.status === 'Healthy' ? 3 : -7), 5, 100);
  const cleanWater = clamp(input.kingdom.cleanWater + (mira?.status === 'Healthy' ? 4 : -8), 5, 100);
  const security = clamp(input.kingdom.security + (valerius?.status === 'Healthy' ? 2 : -6), 5, 100);
  const publicHealth = clamp(input.kingdom.publicHealth + (elena?.status === 'Healthy' ? 2 : -5), 5, 100);
  const unrest = granary < 25 || cleanWater < 25
    ? clamp(input.kingdom.unrest + 8, 5, 100)
    : clamp(input.kingdom.unrest - 3, 5, 100);

  const kingdom: KingdomStats = {
    ...input.kingdom,
    granary,
    cleanWater,
    security,
    publicHealth,
    unrest,
    treasuryGold: input.kingdom.treasuryGold + 25,
  };

  const marketPrices = input.marketPrices.map((marketPrice) => {
    const delta = (random() - 0.5) * 4;
    const currentPrice = Math.max(1, Math.round(marketPrice.basePrice + delta));
    return {
      ...marketPrice,
      currentPrice,
      trend: currentPrice > marketPrice.currentPrice ? 'up' : currentPrice < marketPrice.currentPrice ? 'down' : 'steady',
    };
  });

  const eventRoll = random();
  const shouldTriggerEvent = nextDay % 3 === 0 || eventRoll < 0.35;
  const eventIndex = shouldTriggerEvent ? Math.max(0, Math.floor(random() * 1000000)) : -1;

  return { day: nextDay, season, player, kingdom, npcs, marketPrices, shouldTriggerEvent, eventIndex };
}
