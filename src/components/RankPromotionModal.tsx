import React from 'react';
import { PlayerState, SocialRank } from '../types/game';
import { RANK_LADDER } from '../data/initialData';
import { sound } from '../utils/audio';
import { X, Crown, CheckCircle2, Lock, Sparkles, ChevronRight, Award } from 'lucide-react';

interface RankPromotionModalProps {
  player: PlayerState;
  onClose: () => void;
  onPromoteRank: () => void;
}

export const RankPromotionModal: React.FC<RankPromotionModalProps> = ({
  player,
  onClose,
  onPromoteRank,
}) => {
  const currentRankIdx = RANK_LADDER.findIndex((r) => r.rank === player.rank);
  const nextRank = RANK_LADDER[currentRankIdx + 1];

  const canPromote =
    nextRank &&
    player.rankProgress >= nextRank.requiredProgress &&
    player.copper >= nextRank.copperCost;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-black border-2 border-amber-500/50 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 px-4 py-2.5 border-b border-amber-500/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-black uppercase tracking-wider text-amber-300">
              Feudal Station & Royal Ascension
            </span>
          </div>
          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="p-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-3.5 max-h-[85vh] overflow-y-auto">
          {/* RPG Sovereign Attribute Card */}
          <div className="rounded-2xl bg-slate-950/90 border border-amber-500/30 p-3 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-300">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Lord Sovereign Profile</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                Level {player.stats?.level || 1} • {player.rank}
              </span>
            </div>

            {/* RPG 4 Core Attributes */}
            <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono mb-2">
              <div className="bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
                <span className="text-rose-400 block font-black text-xs">
                  {player.stats?.might || 14}
                </span>
                <span className="text-slate-400 text-[9px]">⚔️ Might</span>
              </div>
              <div className="bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
                <span className="text-purple-400 block font-black text-xs">
                  {player.stats?.cunning || 16}
                </span>
                <span className="text-slate-400 text-[9px]">🧠 Cunning</span>
              </div>
              <div className="bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
                <span className="text-amber-400 block font-black text-xs">
                  {player.stats?.authority || 12}
                </span>
                <span className="text-slate-400 text-[9px]">👑 Authority</span>
              </div>
              <div className="bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
                <span className="text-sky-400 block font-black text-xs">
                  {player.stats?.piety || 10}
                </span>
                <span className="text-slate-400 text-[9px]">✨ Piety</span>
              </div>
            </div>

            {/* Faction Standing Ticker */}
            <div className="pt-2 border-t border-slate-800 text-[9px] text-slate-400 flex items-center justify-between">
              <span>Peasantry: <strong className="text-amber-300">{player.reputation.peasantry}</strong></span>
              <span>Clergy: <strong className="text-sky-300">{player.reputation.clergy}</strong></span>
              <span>Military: <strong className="text-rose-300">{player.reputation.military}</strong></span>
              <span>Underworld: <strong className="text-purple-300">{player.reputation.underworld}</strong></span>
            </div>
          </div>

          {/* Next Rank CTA */}
          {nextRank ? (
            <div className="rounded-2xl bg-gradient-to-r from-amber-950/70 via-slate-900 to-indigo-950/70 p-3.5 border border-amber-500/40">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                    Next Royal Station
                  </span>
                  <h3 className="text-base font-black text-white">{nextRank.rank}</h3>
                  <p className="text-[11px] text-slate-300">"{nextRank.title}"</p>
                </div>

                <button
                  onClick={() => {
                    if (canPromote) {
                      sound.playLevelUp();
                      onPromoteRank();
                    } else {
                      sound.playAlert();
                      alert(
                        `You need ${nextRank.requiredProgress} Experience and ${nextRank.copperCost} Copper coins to ascend!`
                      );
                    }
                  }}
                  disabled={!canPromote}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black shadow-lg transition-all flex items-center gap-1.5 ${
                    canPromote
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 animate-bounce'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Take Royal Oath</span>
                </button>
              </div>

              <div className="mt-3 text-[11px] text-slate-300 space-y-1 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <div className="flex justify-between">
                  <span>Experience:</span>
                  <strong className={player.rankProgress >= nextRank.requiredProgress ? 'text-emerald-400' : 'text-amber-400'}>
                    {player.rankProgress} / {nextRank.requiredProgress} XP
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>Elevation Tithe:</span>
                  <strong className={player.copper >= nextRank.copperCost ? 'text-emerald-400' : 'text-amber-400'}>
                    {player.copper} / {nextRank.copperCost} Copper
                  </strong>
                </div>
                <div className="mt-1 pt-1 border-t border-slate-800 text-[10px] text-amber-200">
                  Perk unlocked: {nextRank.perk}
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-amber-950/40 p-4 border border-amber-500 text-center">
              <Crown className="w-8 h-8 text-amber-400 mx-auto mb-1" />
              <h3 className="text-base font-black text-amber-300">You Are Sovereign King/Queen!</h3>
              <p className="text-xs text-slate-300 mt-1">
                You have reached the pinnacle of feudal society. The realm bows before your majesty.
              </p>
            </div>
          )}

          {/* Complete Ladder View */}
          <div className="space-y-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
              The Seven Rungs of Valenreach:
            </span>

            {RANK_LADDER.map((ladderItem, idx) => {
              const isCurrent = ladderItem.rank === player.rank;
              const isPast = idx < currentRankIdx;
              const isFuture = idx > currentRankIdx;

              return (
                <div
                  key={ladderItem.rank}
                  className={`p-3 rounded-2xl border transition-all text-xs flex items-center justify-between gap-3 ${
                    isCurrent
                      ? 'bg-gradient-to-r from-amber-950/60 to-slate-900 border-amber-500 text-white shadow-md'
                      : isPast
                      ? 'bg-slate-900/60 border-slate-800 text-slate-400'
                      : 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        isCurrent
                          ? 'bg-amber-500 text-slate-950 font-black'
                          : isPast
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {isPast ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>

                    <div className="truncate">
                      <div className="flex items-center gap-1.5">
                        <h4 className={`font-black text-xs ${isCurrent ? 'text-amber-300' : 'text-white'}`}>
                          {ladderItem.rank}
                        </h4>
                        <span className="text-[10px] text-slate-400">"{ladderItem.title}"</span>
                      </div>
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">{ladderItem.perk}</p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right text-[10px] font-mono">
                    {isCurrent ? (
                      <span className="bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-md border border-amber-500/40">
                        Current
                      </span>
                    ) : isPast ? (
                      <span className="text-emerald-400 font-bold">Achieved</span>
                    ) : (
                      <span className="text-slate-500 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> {ladderItem.requiredProgress} XP
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
