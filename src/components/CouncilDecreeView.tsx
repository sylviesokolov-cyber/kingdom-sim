import React from 'react';
import { PlayerState, KingdomStats, NpcCharacter } from '../types/game';
import { AnimeAvatar } from './AnimeAvatar';
import { sound } from '../utils/audio';
import { 
  Crown, 
  Scroll, 
  Landmark, 
  Coins, 
  ShieldCheck, 
  HeartHandshake, 
  Sparkles, 
  Flame, 
  CheckCircle2,
  Lock
} from 'lucide-react';

interface CouncilDecreeViewProps {
  player: PlayerState;
  kingdom: KingdomStats;
  npcs: NpcCharacter[];
  onIssueDecree: (decree: {
    id: string;
    title: string;
    costGold: number;
    statImpact: Partial<KingdomStats>;
    description: string;
  }) => void;
}

export const CouncilDecreeView: React.FC<CouncilDecreeViewProps> = ({
  player,
  kingdom,
  npcs,
  onIssueDecree,
}) => {
  const isEligible = ['Priest', 'Knight', 'Noble', 'King'].includes(player.rank);
  const isMonarch = player.rank === 'King';

  const decrees = [
    {
      id: 'famine_relief',
      title: 'Royal Famine Relief & Bread Distribution',
      costGold: 120,
      statImpact: { granary: -15, publicHealth: 15, unrest: -20 },
      description: 'Open emergency crown silos to bake hundred-pound loaves for commoners and refugee families.',
    },
    {
      id: 'cathedral_jubilee',
      title: 'Dawn Sun Solstice Jubilee & Hymns',
      costGold: 150,
      statImpact: { piety: 25, unrest: -15, publicHealth: 10 },
      description: 'Fund grand cathedral processions with High Priestess Beatrix, giving holy grace across Valenreach.',
    },
    {
      id: 'militia_levy',
      title: 'Citadel Rampart Garrison Reinforcement',
      costGold: 200,
      statImpact: { security: 25, unrest: -10 },
      description: 'Equip fifty new halberdiers under Commander Valerius to hunt down mountain bandits.',
    },
    {
      id: 'merchant_charter',
      title: 'Caravan Free-Trade Royal Charter',
      costGold: 180,
      statImpact: { prosperity: 25, treasuryGold: 50 },
      description: 'Grant tax concessions to eastern caravans, turning Valenreach into a continental commercial hub.',
    },
    {
      id: 'grand_tourney',
      title: 'The Sovereign’s Grand Joust & Tourney',
      costGold: 350,
      statImpact: { prosperity: 15, security: 10, unrest: -25 },
      description: 'Assemble knights from across the seven realms for grand melee, boosting kingdom prestige.',
    }
  ];

  return (
    <div className="space-y-3 pb-20">
      {/* Throne Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 p-3.5 border border-amber-500/40 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 text-slate-950 shadow-md shrink-0">
            <Crown className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
              High Council & Realm Governance
            </span>
            <h2 className="text-base font-black text-white">The Royal Hall of Valenreach</h2>
            <p className="text-[11px] text-slate-300">
              High officials, knights, and nobility deliberate crown edicts that reshape kingdom fate.
            </p>
          </div>
        </div>

        {!isEligible && (
          <div className="mt-3 rounded-xl bg-slate-950/80 p-2.5 border border-amber-500/30 text-xs flex items-center gap-2 text-amber-300">
            <Lock className="w-4 h-4 shrink-0 text-amber-400" />
            <span>
              You currently hold the station of <strong>{player.rank}</strong>. Elevate to <strong>Priest, Knight, Noble, or King</strong> to exercise council votes and royal decrees!
            </span>
          </div>
        )}
      </div>

      {/* State Treasury Info */}
      <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
        <div>
          <span className="text-[10px] text-slate-400 block uppercase tracking-wider">
            National Crown Treasury
          </span>
          <span className="font-mono font-black text-amber-300 text-sm">
            {kingdom.treasuryGold.toLocaleString()} Gold Coins
          </span>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-slate-400 block uppercase tracking-wider">
            Realm Prosperity
          </span>
          <span className="font-mono font-bold text-emerald-400 text-sm">
            {kingdom.prosperity}% Grade
          </span>
        </div>
      </div>

      {/* Decrees Grid */}
      <div className="space-y-2">
        {decrees.map((decree) => {
          const hasGold = kingdom.treasuryGold >= decree.costGold;

          return (
            <div
              key={decree.id}
              className={`rounded-2xl bg-slate-900/90 p-3 border transition-all text-xs ${
                !isEligible
                  ? 'border-slate-800 opacity-60'
                  : 'border-slate-800 hover:border-amber-400/50'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-black text-white text-xs flex items-center gap-1.5">
                    <Scroll className="w-3.5 h-3.5 text-amber-400" />
                    {decree.title}
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">{decree.description}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-mono font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-lg border border-amber-500/30 text-[11px]">
                    {decree.costGold} Gold
                  </span>
                </div>
              </div>

              {/* Stat Impacts */}
              <div className="mt-2.5 flex items-center gap-2 text-[10px] bg-slate-950/70 p-2 rounded-xl border border-slate-800">
                {Object.entries(decree.statImpact).map(([key, val]) => (
                  <span
                    key={key}
                    className={`font-semibold ${Number(val) > 0 ? 'text-emerald-400' : 'text-rose-400'}`}
                  >
                    {Number(val) > 0 ? `+${val}` : val} {key}
                  </span>
                ))}
              </div>

              {/* Enact Button */}
              {isEligible && (
                <button
                  onClick={() => {
                    if (hasGold) {
                      sound.playHolyChime();
                      onIssueDecree(decree);
                    } else {
                      sound.playAlert();
                      alert("The Crown Treasury lacks sufficient gold reserves!");
                    }
                  }}
                  disabled={!hasGold}
                  className={`mt-2.5 w-full py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                    hasGold
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 hover:brightness-110 active:scale-95 shadow-md shadow-amber-500/30'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Crown className="w-3.5 h-3.5" />
                  <span>Enact Royal Decree</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
