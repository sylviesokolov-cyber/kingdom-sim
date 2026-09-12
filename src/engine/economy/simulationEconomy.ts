import { MarketPrice, NpcCharacter, Season } from '../../types/game';

export interface EconomySimulationResult {
  production: Record<string, number>;
  marketPrices: MarketPrice[];
}

/** Seasonal production modifier: winter is hardest, spring is the baseline. */
export function getSeasonProductionModifier(season: Season): number {
  switch (season) {
    case 'Summer': return 1.08;
    case 'Autumn': return 1.12;
    case 'Winter': return 0.78;
    default: return 1;
  }
}

/** Convert kingdom-facing supply into a stable market band. */
function supplyBand(value: number): MarketPrice['supplyLevel'] {
  if (value < 20) return 'Critically Scarce';
  if (value < 40) return 'Scarce';
  if (value < 65) return 'Normal';
  if (value < 85) return 'Abundant';
  return 'Surplus';
}

/**
 * Resolve NPC output and move market prices toward supply/demand pressure.
 * This is deterministic when the supplied random function is deterministic.
 */
export function simulateEconomy(
  npcs: NpcCharacter[],
  marketPrices: MarketPrice[],
  season: Season,
  random: () => number = Math.random,
): EconomySimulationResult {
  const modifier = getSeasonProductionModifier(season);
  const production: Record<string, number> = {};

  for (const npc of npcs) {
    if (npc.status === 'Deceased' || npc.status === 'In Dungeon') continue;
    const output = Math.max(0, Math.round(npc.baseProductionPerDay * npc.efficiencyModifier * modifier));
    production[npc.managedResource] = (production[npc.managedResource] || 0) + output;
  }

  const nextPrices = marketPrices.map((market) => {
    const output = production[market.resourceId] || 0;
    const normalizedOutput = Math.min(100, output * 4);
    const pressure = 50 - normalizedOutput;
    const drift = pressure * 0.06;
    const noise = (random() - 0.5) * 1.5;
    const currentPrice = Math.max(1, Math.round(market.currentPrice + drift + noise));
    const supplyValue = Math.max(0, Math.min(100, market.supplyLevel === 'Critically Scarce' ? 10 : market.supplyLevel === 'Scarce' ? 30 : market.supplyLevel === 'Normal' ? 50 : market.supplyLevel === 'Abundant' ? 75 : 95) + normalizedOutput * 0.35 - 50 * 0.1);
    const supplyLevel = supplyBand(supplyValue);

    return {
      ...market,
      currentPrice,
      supplyLevel,
      trend: currentPrice > market.currentPrice ? 'up' : currentPrice < market.currentPrice ? 'down' : 'steady',
    };
  });

  return { production, marketPrices: nextPrices };
}
