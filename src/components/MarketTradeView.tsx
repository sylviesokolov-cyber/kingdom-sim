import React, { useState } from 'react';
import { PlayerState, ResourceItem, MarketPrice, NpcCharacter } from '../types/game';
import { AnimeAvatar } from './AnimeAvatar';
import { sound } from '../utils/audio';
import { 
  Coins, 
  ShoppingBag, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Utensils, 
  Sparkles, 
  Heart, 
  AlertCircle,
  Package,
  Droplets,
  Wheat,
  Fish,
  Apple,
  Shirt,
  Hammer,
  Layers,
  Leaf
} from 'lucide-react';

interface MarketTradeViewProps {
  player: PlayerState;
  resources: Record<string, ResourceItem>;
  marketPrices: MarketPrice[];
  npcs: NpcCharacter[];
  onBuyItem: (itemId: string, quantity: number) => void;
  onSellItem: (itemId: string, quantity: number) => void;
  onConsumeItem: (itemId: string) => void;
}

export const MarketTradeView: React.FC<MarketTradeViewProps> = ({
  player,
  resources,
  marketPrices,
  npcs,
  onBuyItem,
  onSellItem,
  onConsumeItem,
}) => {
  const [tab, setTab] = useState<'bazaar' | 'inventory'>('bazaar');
  const silas = npcs.find((n) => n.id === 'silas');

  const getItemIcon = (resId: string) => {
    switch (resId) {
      case 'water': return <Droplets className="w-4 h-4 text-cyan-400" />;
      case 'grain': return <Wheat className="w-4 h-4 text-amber-400" />;
      case 'bread': return <Utensils className="w-4 h-4 text-amber-300" />;
      case 'fish': return <Fish className="w-4 h-4 text-sky-400" />;
      case 'fruits': return <Apple className="w-4 h-4 text-emerald-400" />;
      case 'clothing': return <Shirt className="w-4 h-4 text-purple-400" />;
      case 'iron_ore': return <Layers className="w-4 h-4 text-stone-400" />;
      case 'tools': return <Hammer className="w-4 h-4 text-orange-400" />;
      case 'herbs': return <Leaf className="w-4 h-4 text-emerald-400" />;
      case 'medicine': return <Sparkles className="w-4 h-4 text-pink-400" />;
      default: return <Package className="w-4 h-4 text-amber-400" />;
    }
  };

  const isConsumable = (itemId: string) => {
    return ['water', 'bread', 'fish', 'fruits', 'medicine'].includes(itemId);
  };

  return (
    <div className="space-y-3 pb-20">
      {/* Silas Bazaar Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 p-3.5 border border-amber-500/30 shadow-xl">
        <div className="flex items-center gap-3">
          {silas && (
            <div className="shrink-0">
              <AnimeAvatar
                seed={silas.avatarSeed}
                name={silas.name}
                status={silas.status}
                size="lg"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-black text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-emerald-400" />
              The Grand Bazaar of Valenreach
            </h2>
            <p className="text-[11px] text-slate-300">
              Overseen by Guildmaster Silas. Commodity prices fluctuate based on NPC production, harvest yields, and kingdom shortages.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-3 flex items-center gap-1.5 text-xs">
          <button
            onClick={() => { setTab('bazaar'); sound.playClick(); }}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1 ${
              tab === 'bazaar'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Commodity Exchange</span>
          </button>
          <button
            onClick={() => { setTab('inventory'); sound.playClick(); }}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1 ${
              tab === 'inventory'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>My Satchel / Eat Food</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Commodity Exchange */}
      {tab === 'bazaar' && (
        <div className="space-y-2">
          {marketPrices.map((mp) => {
            const res = resources[mp.resourceId];
            if (!res) return null;
            const playerQty = player.inventory[res.id] || 0;
            const canAfford = player.copper >= mp.currentPrice;
            const canSell = playerQty > 0;
            const overseer = npcs.find((n) => n.id === res.sourceNpcId);

            return (
              <div
                key={res.id}
                className="rounded-2xl bg-slate-900/90 p-3 border border-slate-800 hover:border-amber-500/30 transition-all text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
                      {getItemIcon(res.id)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-extrabold text-white text-xs">{res.name}</h4>
                        <span className="text-[10px] text-slate-400">({res.unit})</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Source: {res.sourceFacility} ({overseer ? overseer.name : 'Unknown'})
                      </p>
                    </div>
                  </div>

                  {/* Price & Trend */}
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1 font-mono font-black text-amber-300 text-xs">
                      <span>{mp.currentPrice} C</span>
                      {mp.trend === 'up' && <TrendingUp className="w-3 h-3 text-rose-400" />}
                      {mp.trend === 'down' && <TrendingDown className="w-3 h-3 text-emerald-400" />}
                    </div>
                    <span
                      className={`text-[9px] font-bold block ${
                        mp.supplyLevel === 'Critically Scarce'
                          ? 'text-rose-400'
                          : mp.supplyLevel === 'Scarce'
                          ? 'text-amber-400'
                          : 'text-slate-400'
                      }`}
                    >
                      {mp.supplyLevel}
                    </span>
                  </div>
                </div>

                {/* You Have in Satchel */}
                <div className="mt-2 flex items-center justify-between text-[11px] bg-slate-950/70 px-2.5 py-1 rounded-lg border border-slate-800/80">
                  <span className="text-slate-400">In Satchel:</span>
                  <span className="font-mono font-bold text-white">
                    {playerQty} {res.unit}
                  </span>
                </div>

                {/* Buy & Sell Actions */}
                <div className="mt-2.5 flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      if (canAfford) {
                        sound.playCoins();
                        onBuyItem(res.id, 1);
                      } else {
                        sound.playAlert();
                        alert("Not enough copper coins!");
                      }
                    }}
                    disabled={!canAfford}
                    className={`flex-1 py-1.5 rounded-xl font-bold flex items-center justify-center gap-1 transition-all ${
                      canAfford
                        ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 active:scale-95'
                        : 'bg-slate-800/50 text-slate-500 cursor-not-allowed border border-slate-800'
                    }`}
                  >
                    <span>Buy 1 ({mp.currentPrice}C)</span>
                  </button>

                  <button
                    onClick={() => {
                      if (canSell) {
                        sound.playCoins();
                        onSellItem(res.id, 1);
                      }
                    }}
                    disabled={!canSell}
                    className={`flex-1 py-1.5 rounded-xl font-bold flex items-center justify-center gap-1 transition-all ${
                      canSell
                        ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 active:scale-95'
                        : 'bg-slate-800/50 text-slate-500 cursor-not-allowed border border-slate-800'
                    }`}
                  >
                    <span>Sell 1 (+{Math.round(mp.currentPrice * 0.85)}C)</span>
                  </button>

                  {/* Quick Consume for food/drink */}
                  {isConsumable(res.id) && playerQty > 0 && (
                    <button
                      onClick={() => {
                        sound.playPotion();
                        onConsumeItem(res.id);
                      }}
                      className="py-1.5 px-2.5 rounded-xl font-bold bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/40 active:scale-95 flex items-center gap-1"
                      title="Consume to restore Energy, Hunger, or Health"
                    >
                      <Utensils className="w-3 h-3 text-pink-400" />
                      <span>Use</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Mode 2: Player Satchel & Direct Consumption */}
      {tab === 'inventory' && (
        <div className="space-y-2">
          <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 text-xs">
            <h3 className="font-black text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
              <Package className="w-4 h-4 text-amber-400" />
              Player Inventory & Sustenance
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Consume food and elixirs to replenish your energy and stay alive.
            </p>
          </div>

          {Object.entries(player.inventory).filter(([_, qty]) => Number(qty) > 0).length === 0 ? (
            <div className="rounded-2xl bg-slate-900/60 p-8 text-center text-slate-400 border border-slate-800 text-xs">
              Your satchel is empty! Buy provisions at the Bazaar or work farm shifts to earn food.
            </div>
          ) : (
            Object.entries(player.inventory)
              .filter(([_, qty]) => Number(qty) > 0)
              .map(([itemId, qty]) => {
                const res = resources[itemId];
                if (!res) return null;
                const consumable = isConsumable(itemId);

                return (
                  <div
                    key={itemId}
                    className="rounded-2xl bg-slate-900/90 p-3 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                        {getItemIcon(itemId)}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-white text-xs">{res.name}</h4>
                        <span className="text-[11px] text-amber-300 font-mono font-bold">
                          Quantity: {qty} {res.unit}
                        </span>
                      </div>
                    </div>

                    {consumable && (
                      <button
                        onClick={() => {
                          sound.playPotion();
                          onConsumeItem(itemId);
                        }}
                        className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold shadow-md shadow-rose-950/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-1"
                      >
                        <Utensils className="w-3.5 h-3.5" />
                        <span>Consume</span>
                      </button>
                    )}
                  </div>
                );
              })
          )}
        </div>
      )}
    </div>
  );
};
