import React from 'react';
import { PlayerState, NpcCharacter } from '../types/game';
import { AnimeAvatar } from './AnimeAvatar';
import { sound } from '../utils/audio';
import { 
  Skull, 
  Eye, 
  Lock, 
  Coins, 
  AlertTriangle, 
  ShieldAlert, 
  Zap, 
  Flame,
  Key
} from 'lucide-react';

interface CrimeIntrigueViewProps {
  player: PlayerState;
  npcs: NpcCharacter[];
  onCommitCrime: (crime: {
    id: string;
    title: string;
    energyCost: number;
    successRate: number;
    copperReward: number;
    bountyRisk: number;
    description: string;
    rewardItem?: { itemId: string; amount: number };
    targetNpcId?: string;
  }) => void;
  onPayBounty: () => void;
}

export const CrimeIntrigueView: React.FC<CrimeIntrigueViewProps> = ({
  player,
  npcs,
  onCommitCrime,
  onPayBounty,
}) => {
  const vesper = npcs.find((n) => n.id === 'vesper');

  const crimes = [
    {
      id: 'pickpocket',
      title: 'Pickpocket Drunken Merchants in Alley',
      energyCost: 15,
      successRate: 80,
      copperReward: 25,
      bountyRisk: 10,
      description: 'Slip through the shadows of the Tavern Quarter and lift heavy purses off inebriated traders.',
    },
    {
      id: 'poach_stag',
      title: 'Poach Royal Stag in the King’s Woods',
      energyCost: 25,
      successRate: 65,
      copperReward: 60,
      bountyRisk: 25,
      rewardItem: { itemId: 'fish', amount: 2 }, // meat
      description: 'Fell a protected beast under cover of night. High meat value, but rangers patrol frequently.',
    },
    {
      id: 'smuggle_contraband',
      title: 'Smuggle Black Market Narcotics & Silks',
      energyCost: 35,
      successRate: 55,
      copperReward: 140,
      bountyRisk: 45,
      rewardItem: { itemId: 'contraband', amount: 1 },
      description: 'Transport sealed crates through the storm sewers beneath Commander Valerius’s sentries.',
    },
    {
      id: 'sabotage_cistern',
      title: 'Sabotage Upper Aqueduct Sluice Gate',
      energyCost: 30,
      successRate: 70,
      copperReward: 90,
      bountyRisk: 35,
      targetNpcId: 'mira',
      description: 'Clog the water valves to create an artificial shortage, driving up water prices at the Bazaar.',
    },
    {
      id: 'frame_noble',
      title: 'Plant Forged Treason Papers in Noble Manor',
      energyCost: 45,
      successRate: 45,
      copperReward: 350,
      bountyRisk: 80,
      description: 'Execute high-level political espionage. If successful, shifts royal council favor to your faction.',
    }
  ];

  return (
    <div className="space-y-3 pb-20">
      {/* Vesper Shadow Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 p-3.5 border border-purple-500/40 shadow-xl">
        <div className="flex items-center gap-3">
          {vesper && (
            <div className="shrink-0">
              <AnimeAvatar
                seed={vesper.avatarSeed}
                name={vesper.name}
                status={vesper.status}
                size="lg"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-black text-purple-300 uppercase tracking-wide flex items-center gap-1.5">
              <Skull className="w-4 h-4 text-purple-400" />
              The Undercity Catacombs
            </h2>
            <p className="text-[11px] text-slate-300">
              Presided over by Shadow Broker Vesper. High risk operations yield fast wealth and illicit leverage, but watchful guards will place a price on your head.
            </p>
          </div>
        </div>

        {/* Bounty & Suspicion Meter */}
        <div className="mt-3 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              Garrison Bounty on Your Head
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span className="font-mono font-black text-rose-300 text-sm">
                {player.crimeBounty} Copper Bounty
              </span>
            </div>
          </div>

          {player.crimeBounty > 0 && (
            <button
              onClick={() => {
                sound.playCoins();
                onPayBounty();
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold border border-slate-700 text-[11px] transition-colors"
            >
              Bribe Bailiff ({player.crimeBounty} C)
            </button>
          )}
        </div>
      </div>

      {/* Crime Operations Grid */}
      <div className="space-y-2">
        {crimes.map((crime) => {
          const hasEnergy = player.energy >= crime.energyCost;

          return (
            <div
              key={crime.id}
              className="rounded-2xl bg-slate-900/90 p-3 border border-purple-950/80 hover:border-purple-500/40 transition-all text-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-black text-white text-xs flex items-center gap-1.5">
                    {crime.title}
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">{crime.description}</p>
                </div>

                <span className="inline-flex items-center gap-0.5 font-mono text-[11px] font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-lg border border-amber-500/30 shrink-0">
                  <Zap className="w-3 h-3 text-amber-400" />
                  -{crime.energyCost}
                </span>
              </div>

              {/* Stats Bar */}
              <div className="mt-2.5 flex items-center justify-between text-[11px] bg-slate-950/70 p-2 rounded-xl border border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-emerald-400">
                    +{crime.copperReward} C
                  </span>
                  <span className="text-purple-300 font-bold">
                    Success: {crime.successRate}%
                  </span>
                </div>

                <div className="text-rose-400 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-rose-400" />
                  <span>+{crime.bountyRisk} Bounty Risk</span>
                </div>
              </div>

              {/* Execute Crime Button */}
              <button
                onClick={() => {
                  if (hasEnergy) {
                    onCommitCrime(crime);
                  } else {
                    sound.playAlert();
                    alert("Not enough energy! Rest to recover stamina.");
                  }
                }}
                disabled={!hasEnergy}
                className={`mt-2.5 w-full py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                  hasEnergy
                    ? 'bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white hover:brightness-110 active:scale-95 shadow-md shadow-purple-950/50'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Skull className="w-3.5 h-3.5" />
                <span>Execute Infiltration</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
