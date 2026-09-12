import { INITIAL_KINGDOM_STATS, INITIAL_NPCS, INITIAL_PLAYER, INITIAL_MARKET_PRICES } from '../data/initialData';
import { KingdomStats, MarketPrice, NpcCharacter, PlayerState, Season } from '../types/game';

export const SAVE_VERSION = 2;
export const STORAGE_KEY = 'valenreach_save_v1';

export interface GameSaveV2 {
  version: number;
  day: number;
  season: Season;
  player: PlayerState;
  kingdom: KingdomStats;
  npcs: NpcCharacter[];
  marketPrices: MarketPrice[];
}

function isSeason(value: unknown): value is Season {
  return value === 'Spring' || value === 'Summer' || value === 'Autumn' || value === 'Winter';
}

/**
 * Convert legacy saves into the current canonical shape without discarding progress.
 * Unknown fields are intentionally ignored so old/partial saves remain loadable.
 */
export function migrateSave(raw: unknown): GameSaveV2 | null {
  if (!raw || typeof raw !== 'object') return null;
  const source = raw as Record<string, unknown>;
  const rawPlayer = source.player && typeof source.player === 'object' ? source.player as Partial<PlayerState> : {};

  const player: PlayerState = {
    ...INITIAL_PLAYER,
    ...rawPlayer,
    completedBondSceneIds: Array.isArray(rawPlayer.completedBondSceneIds) ? rawPlayer.completedBondSceneIds : [],
    activePerks: Array.isArray(rawPlayer.activePerks) ? rawPlayer.activePerks : [],
  };

  const rawKingdom = source.kingdom && typeof source.kingdom === 'object' ? source.kingdom as Partial<KingdomStats> : {};
  const kingdom: KingdomStats = { ...INITIAL_KINGDOM_STATS, ...rawKingdom };

  const rawNpcs = Array.isArray(source.npcs) ? source.npcs as Partial<NpcCharacter>[] : [];
  const npcs = INITIAL_NPCS.map((initial) => {
    const saved = rawNpcs.find((npc) => npc.id === initial.id);
    if (!saved) return initial;
    return {
      ...initial,
      health: typeof saved.health === 'number' ? saved.health : initial.health,
      energy: typeof saved.energy === 'number' ? saved.energy : initial.energy,
      status: saved.status || initial.status,
      daysSick: typeof saved.daysSick === 'number' ? saved.daysSick : initial.daysSick,
      loyalty: typeof saved.loyalty === 'number' ? saved.loyalty : initial.loyalty,
      affection: typeof saved.affection === 'number' ? saved.affection : initial.affection,
      efficiencyModifier: typeof saved.efficiencyModifier === 'number' ? saved.efficiencyModifier : initial.efficiencyModifier,
      portraitUrl: initial.portraitUrl,
      avatarUrl: initial.avatarUrl,
      backgroundUrl: initial.backgroundUrl,
    };
  });

  const marketPrices = Array.isArray(source.marketPrices)
    ? INITIAL_MARKET_PRICES.map((initial) => {
        const saved = (source.marketPrices as Partial<MarketPrice>[]).find((price) => price.resourceId === initial.resourceId);
        return saved ? { ...initial, ...saved } : initial;
      })
    : INITIAL_MARKET_PRICES;

  const day = typeof source.day === 'number' && source.day >= 1 ? Math.floor(source.day) : 1;
  const season = isSeason(source.season) ? source.season : 'Spring';

  return { version: SAVE_VERSION, day, season, player, kingdom, npcs, marketPrices };
}

export function serializeSave(save: Omit<GameSaveV2, 'version'>): string {
  return JSON.stringify({ version: SAVE_VERSION, ...save });
}
