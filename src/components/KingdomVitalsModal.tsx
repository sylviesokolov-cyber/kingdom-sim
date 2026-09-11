import React from 'react';
import { KingdomStats, NpcCharacter } from '../types/game';
import { sound } from '../utils/audio';
import { 
  X, 
  HeartPulse, 
  Wheat, 
  Droplets, 
  Sparkles, 
  Shield, 
  AlertTriangle, 
  Coins, 
  TrendingUp,
  Users
} from 'lucide-react';

interface KingdomVitalsModalProps {
  kingdom: KingdomStats;
  npcs: NpcCharacter[];
  onClose: () => void;
  onNavigateToNpc: (npc: NpcCharacter) => void;
}

export const KingdomVitalsModal: React.FC<KingdomVitalsModalProps> = ({
  kingdom,
  npcs,
  onClose,
  onNavigateToNpc,
}) => {
  const sickNpcs = npcs.filter(n => n.status === 'Sick' || n.status === 'Injured' || n.status === 'Critical');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-black border-2 border-amber-500/50 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 px-4 py-2.5 border-b border-amber-500/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-rose-400" />
            <span className="text-xs font-black uppercase tracking-wider text-amber-300">
              State of the Realm: Kingdom Vitals
            </span>
          </div>
          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="p-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-4 max-h-[85vh] overflow-y-auto text-xs">
          {/* Top Population & Prosperity Banner */}
          <div className="grid grid-cols-2 gap-2 bg-slate-900/90 p-3 rounded-2xl border border-slate-800">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                Total Kingdom Population
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Users className="w-4 h-4 text-sky-400" />
                <span className="font-mono font-black text-white text-base">
                  {kingdom.population.toLocaleString()}
                </span>
              </div>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                Kingdom Prosperity Index
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="font-mono font-black text-emerald-400 text-base">
                  {kingdom.prosperity}% Grade
                </span>
              </div>
            </div>
          </div>

          {/* Active Crises & Sick Officials */}
          {sickNpcs.length > 0 && (
            <div className="rounded-2xl bg-rose-950/60 border border-rose-500/50 p-3 space-y-2">
              <div className="flex items-center gap-2 text-rose-300 font-black text-xs uppercase tracking-wide">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Active Crises: {sickNpcs.length} Officials Incapacitated</span>
              </div>
              <p className="text-[11px] text-rose-200">
                When an official is sick or injured, their managed facilities lose up to 80% output! Visit them and administer alchemical cures.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {sickNpcs.map((npc) => (
                  <button
                    key={npc.id}
                    onClick={() => {
                      onClose();
                      onNavigateToNpc(npc);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-rose-900/80 hover:bg-rose-800 text-white font-bold text-[10px] flex items-center gap-1 border border-rose-400 transition-colors"
                  >
                    <span>{npc.name} ({npc.status}) → Treat</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Detailed 5 Vitals Breakdown */}
          <div className="space-y-2.5">
            {/* Granary */}
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Wheat className="w-4 h-4 text-amber-400" /> Food & Granary Reserves
                </span>
                <span className="font-mono font-bold text-white">{kingdom.granary}%</span>
              </div>
              <p className="text-[10px] text-slate-400 mb-1.5">
                Overseen by Caren. Supplies wheat to the bakeries. If below 25%, famine strikes and unrest escalates rapidly.
              </p>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${kingdom.granary < 30 ? 'bg-rose-500' : 'bg-amber-400'}`}
                  style={{ width: `${kingdom.granary}%` }}
                />
              </div>
            </div>

            {/* Clean Water */}
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-cyan-400" /> Clean Mountain Aqueduct
                </span>
                <span className="font-mono font-bold text-white">{kingdom.cleanWater}%</span>
              </div>
              <p className="text-[10px] text-slate-400 mb-1.5">
                Overseen by Mira. Channels spring water into public fountains. If compromised, dysentery and fever spread.
              </p>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${kingdom.cleanWater < 30 ? 'bg-rose-500' : 'bg-cyan-400'}`}
                  style={{ width: `${kingdom.cleanWater}%` }}
                />
              </div>
            </div>

            {/* Public Health */}
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-pink-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-pink-400" /> Public Health & Sanitation
                </span>
                <span className="font-mono font-bold text-white">{kingdom.publicHealth}%</span>
              </div>
              <p className="text-[10px] text-slate-400 mb-1.5">
                Overseen by Elena. Supported by herbal harvests. Prevents plagues and keeps mortality rates low.
              </p>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${kingdom.publicHealth < 30 ? 'bg-rose-500' : 'bg-pink-400'}`}
                  style={{ width: `${kingdom.publicHealth}%` }}
                />
              </div>
            </div>

            {/* Security */}
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-indigo-400" /> Citadel Defense & Law
                </span>
                <span className="font-mono font-bold text-white">{kingdom.security}%</span>
              </div>
              <p className="text-[10px] text-slate-400 mb-1.5">
                Overseen by Commander Valerius. Garrison watches deter bandit raids, poachers, and civil insurrections.
              </p>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${kingdom.security < 30 ? 'bg-rose-500' : 'bg-indigo-400'}`}
                  style={{ width: `${kingdom.security}%` }}
                />
              </div>
            </div>

            {/* Piety & Morale */}
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-yellow-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-yellow-400" /> Cathedral Faith & Morale
                </span>
                <span className="font-mono font-bold text-white">{kingdom.piety}%</span>
              </div>
              <p className="text-[10px] text-slate-400 mb-1.5">
                Overseen by High Priestess Beatrix. Distributes blessed bread, cares for orphans, and keeps civil unrest low.
              </p>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400"
                  style={{ width: `${kingdom.piety}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
