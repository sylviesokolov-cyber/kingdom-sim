import { KingdomStats, MarketPrice, NpcCharacter, PlayerState, Season } from '../../types/game';
import { simulateEconomy } from '../economy/simulationEconomy';

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

export function getSeasonForDay(day: number): Season {
  const normalizedDay = Math.max(1, Math.floor(day));
  return SEASONS[Math.floor(((normalizedDay - 1) % 120) / 30)];
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

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
    let daysSick = npc.daysSick || 0;

    if (status === 'Sick' || status === 'Injured' || status === 'Critical') {
      health = Math.max(10, health - 8);
      efficiencyModifier = 0.25;
      daysSick += 1;
      if (health < 25) status = 'Critical';
    } else {
      efficiencyModifier = 1;
      daysSick = 0;
      if (random() < 0.04) {
        status = 'Sick';
        health = 60;
        efficiencyModifier = 0.3;
        daysSick = 1;
      }
    }

    return { ...npc, health, status, efficiencyModifier, daysSick };
  });

  const economy = simulateEconomy(npcs, input.marketPrices, season, random);
  const productionTotal = Object.values(economy.production).reduce((sum, value) => sum + value, 0);
  const findNpc = (id: string) => npcs.find((npc) => npc.id === id);
  const mira = findNpc('mira');
  const caren = findNpc('caren');
  const valerius = findNpc('valerius');
  const elena = findNpc('elena');

  const granary = clamp(input.kingdom.granary + (caren?.status === 'Healthy' ? 3 : -7) + Math.min(3, productionTotal * 0.05), 5, 100);
  const cleanWater = clamp(input.kingdom.cleanWater + (mira?.status === 'Healthy' ? 4 : -8), 5, 100);
  const security = clamp(input.kingdom.security + (valerius?.status === 'Healthy' ? 2 : -6), 5, 100);
  const publicHealth = clamp(input.kingdom.publicHealth + (elena?.status === 'Healthy' ? 2 : -5), 5, 100);
  const shortage = granary < 25 || cleanWater < 25;
  const unrest = shortage
    ? clamp(input.kingdom.unrest + 8, 5, 100)
    : clamp(input.kingdom.unrest - 3, 5, 100);
  const prosperity = clamp(
    input.kingdom.prosperity + (productionTotal > 0 ? 1 : -1) - (unrest > 60 ? 2 : 0),
    0,
    100,
  );

  const kingdom: KingdomStats = {
    ...input.kingdom,
    granary,
    cleanWater,
    security,
    publicHealth,
    unrest,
    prosperity,
    treasuryGold: input.kingdom.treasuryGold + 25,
  };

  const eventRoll = random();
  const shouldTriggerEvent = nextDay % 3 === 0 || eventRoll < 0.35;
  const eventIndex = shouldTriggerEvent ? Math.max(0, Math.floor(random() * 1000000)) : -1;

  return {
    day: nextDay,
    season,
    player,
    kingdom,
    npcs,
    marketPrices: economy.marketPrices,
    shouldTriggerEvent,
    eventIndex,
  };
}
