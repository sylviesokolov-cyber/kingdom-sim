import React from 'react';
import { GameEvent, GameEventChoice, NpcCharacter, PlayerState } from '../types/game';
import { AnimeCharacterPortrait } from './AnimeCharacterPortrait';
import { sound } from '../utils/audio';
import { 
  AlertTriangle, 
  Sparkles, 
  Flame, 
  Zap, 
  Coins, 
  ChevronRight,
  Shield,
  Heart
} from 'lucide-react';

interface EventModalProps {
  event: GameEvent;
  speakerNpc?: NpcCharacter;
  player: PlayerState;
  onSelectChoice: (choice: GameEventChoice) => void;
}

export const EventModal: React.FC<EventModalProps> = ({
  event,
  speakerNpc,
  player,
  onSelectChoice,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-xl sm:max-w-2xl rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-black border-2 border-amber-500/60 shadow-2xl overflow-hidden">
        {/* Top Gold Trim & Ornate Header */}
        <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 px-4 py-2.5 border-b border-amber-500/40 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Kingdom Chronicle Event
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Valenreach Urgent Dispatch</span>
        </div>

        <div className="p-4 sm:p-5 space-y-4 max-h-[85vh] overflow-y-auto">
          {/* Anime Character Bust & Dialogue Box */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            {speakerNpc && (
              <div className="shrink-0 w-36 h-48 sm:w-44 sm:h-56 rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-xl bg-slate-950">
                <AnimeCharacterPortrait
                  seed={speakerNpc.avatarSeed}
                  name={speakerNpc.name}
                  status={speakerNpc.status}
                  size="bust"
                  showBackground={true}
                  showAura={true}
                  live2d={true}
                  portraitUrl={speakerNpc.portraitUrl}
                  className="w-full h-full"
                />
              </div>
            )}

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-base font-black text-white leading-tight">
                {event.title}
              </h2>
              {speakerNpc && (
                <span className="inline-block mt-0.5 text-xs font-bold text-amber-300">
                  {speakerNpc.name} • {speakerNpc.title}
                </span>
              )}

              {/* Story Description */}
              <div className="mt-2.5 rounded-2xl bg-slate-900/90 p-3 border border-slate-800 text-xs text-slate-200 leading-relaxed shadow-inner">
                "{event.description}"
              </div>
            </div>
          </div>

          {/* Interactive Choices Header */}
          <div className="pt-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-2">
              Select Your Decree & Action:
            </span>

            {/* Choice Options */}
            <div className="space-y-2">
              {event.choices.map((choice, idx) => {
                const canAffordEnergy = !choice.energyCost || player.energy >= choice.energyCost;
                const canAffordCopper = !choice.copperCost || player.copper >= choice.copperCost;
                const canAffordItem =
                  !choice.itemRequirement ||
                  (player.inventory[choice.itemRequirement.itemId] || 0) >= choice.itemRequirement.amount;

                const isEligible = canAffordEnergy && canAffordCopper && canAffordItem;

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (isEligible) {
                        sound.playClick();
                        onSelectChoice(choice);
                      } else {
                        sound.playAlert();
                      }
                    }}
                    disabled={!isEligible}
                    className={`w-full text-left p-3 rounded-2xl border transition-all text-xs flex flex-col gap-1.5 ${
                      isEligible
                        ? 'bg-gradient-to-r from-slate-900 to-indigo-950/40 border-slate-700 hover:border-amber-400 hover:scale-[1.01] active:scale-[0.99] text-white shadow-md'
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-extrabold text-xs text-amber-200">
                        {idx + 1}. {choice.text}
                      </span>
                      <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    </div>

                    {/* Requirements / Costs badge */}
                    <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                      {choice.energyCost && (
                        <span className={`flex items-center gap-0.5 px-2 py-0.5 rounded-md font-mono ${canAffordEnergy ? 'bg-amber-950/70 text-amber-300' : 'bg-rose-950/70 text-rose-300 font-bold'}`}>
                          <Zap className="w-3 h-3" /> -{choice.energyCost} Energy
                        </span>
                      )}
                      {choice.copperCost && (
                        <span className={`flex items-center gap-0.5 px-2 py-0.5 rounded-md font-mono ${canAffordCopper ? 'bg-amber-950/70 text-amber-300' : 'bg-rose-950/70 text-rose-300 font-bold'}`}>
                          <Coins className="w-3 h-3" /> -{choice.copperCost} Copper
                        </span>
                      )}
                      {choice.itemRequirement && (
                        <span className={`flex items-center gap-0.5 px-2 py-0.5 rounded-md ${canAffordItem ? 'bg-emerald-950/70 text-emerald-300' : 'bg-rose-950/70 text-rose-300 font-bold'}`}>
                          Requires {choice.itemRequirement.amount} {choice.itemRequirement.itemId}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
