import React from 'react';
import { PlayerState, JobOpportunity, SocialRank, NpcCharacter } from '../types/game';
import { RANK_LADDER } from '../data/initialData';
import { sound } from '../utils/audio';
import { AnimeAvatar } from './AnimeAvatar';
import { 
  Briefcase, 
  Zap, 
  Coins, 
  Crown, 
  ChevronRight, 
  CheckCircle2, 
  Lock, 
  TrendingUp,
  Sparkles,
  Award
} from 'lucide-react';

interface CareerWorkViewProps {
  player: PlayerState;
  jobs: JobOpportunity[];
  npcs: NpcCharacter[];
  onExecuteJob: (job: JobOpportunity) => void;
  onPromoteRank: () => void;
}

export const CareerWorkView: React.FC<CareerWorkViewProps> = ({
  player,
  jobs,
  npcs,
  onExecuteJob,
  onPromoteRank,
}) => {
  const currentRankIndex = RANK_LADDER.findIndex((r) => r.rank === player.rank);
  const currentRankData = RANK_LADDER[currentRankIndex] || RANK_LADDER[0];
  const nextRankData = RANK_LADDER[currentRankIndex + 1];

  const canPromote =
    nextRankData &&
    player.rankProgress >= nextRankData.requiredProgress &&
    player.copper >= nextRankData.copperCost;

  // Rank hierarchy weights for checking unlock
  const rankWeight: Record<SocialRank, number> = {
    Refugee: 0,
    Peasant: 1,
    Villager: 2,
    Priest: 3,
    Knight: 3,
    Noble: 4,
    King: 5,
  };

  return (
    <div className="space-y-3 pb-20">
      {/* Current Social Rank & Ascension Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-950/80 via-slate-900 to-indigo-950/80 p-3.5 border border-amber-500/40 shadow-xl">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 text-slate-950 shadow-md">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
                Feudal Station
              </span>
              <h2 className="text-base font-black text-white">{player.rank}</h2>
              <p className="text-[11px] text-slate-300">"{player.title}"</p>
            </div>
          </div>

          {/* Promotion CTA */}
          {nextRankData ? (
            <button
              id="promote-rank-btn"
              onClick={() => {
                if (canPromote) {
                  sound.playLevelUp();
                  onPromoteRank();
                } else {
                  sound.playAlert();
                  alert(
                    `To ascend to ${nextRankData.rank}, you require ${nextRankData.requiredProgress}% Experience and ${nextRankData.copperCost} Copper coins.`
                  );
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black shadow-lg transition-all ${
                canPromote
                  ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 animate-bounce shadow-amber-500/40'
                  : 'bg-slate-800 text-slate-400 border border-slate-700 opacity-80'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Promote to {nextRankData.rank}</span>
            </button>
          ) : (
            <span className="text-xs font-bold text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-500/40">
              Supreme Monarch
            </span>
          )}
        </div>

        {/* Progress to Next Tier */}
        {nextRankData && (
          <div className="mt-3 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 text-xs">
            <div className="flex justify-between text-[11px] text-slate-300 mb-1">
              <span>Station Progress:</span>
              <span className="font-mono font-bold text-amber-300">
                {player.rankProgress} / {nextRankData.requiredProgress} XP
              </span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 transition-all duration-300"
                style={{
                  width: `${Math.min(100, (player.rankProgress / nextRankData.requiredProgress) * 100)}%`,
                }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-[10px] text-slate-400">
              <span>Required Tithe / Fee: {nextRankData.copperCost} Copper</span>
              <span>Next Perk: {nextRankData.perk}</span>
            </div>
          </div>
        )}
      </div>

      {/* Available Labor & Employment Section */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
          <Briefcase className="w-4 h-4 text-amber-400" />
          Labor Opportunities & Royal Duties
        </h3>
        <span className="text-xs text-slate-400">
          Remaining Energy: <strong className="text-amber-300 font-mono">{player.energy}</strong>
        </span>
      </div>

      {/* Job Cards */}
      <div className="space-y-2">
        {jobs.map((job) => {
          const isUnlocked = rankWeight[player.rank] >= rankWeight[job.minRank];
          const supervisor = npcs.find((n) => n.id === job.supervisorNpcId);
          const hasEnergy = player.energy >= job.energyCost;

          return (
            <div
              key={job.id}
              className={`rounded-2xl p-3 border transition-all ${
                !isUnlocked
                  ? 'bg-slate-950/40 border-slate-800/50 opacity-60'
                  : hasEnergy
                  ? 'bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/30 border-slate-800 hover:border-amber-400/50'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  {supervisor ? (
                    <div className="shrink-0 mt-0.5">
                      <AnimeAvatar
                        seed={supervisor.avatarSeed}
                        name={supervisor.name}
                        avatarUrl={supervisor.avatarUrl}
                        portraitUrl={supervisor.portraitUrl}
                        backgroundUrl={supervisor.backgroundUrl}
                        status={supervisor.status}
                        size="sm"
                      />
                    </div>
                  ) : (
                    <div className="p-2 rounded-xl bg-slate-800 text-amber-400 shrink-0">
                      <Briefcase className="w-4 h-4" />
                    </div>
                  )}

                  <div>
                    <h4 className="text-xs font-black text-white flex items-center gap-1.5">
                      {job.title}
                      {!isUnlocked && (
                        <span className="flex items-center gap-0.5 text-[9px] font-bold bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded-md">
                          <Lock className="w-2.5 h-2.5" /> Requires {job.minRank}
                        </span>
                      )}
                    </h4>
                    <p className="text-[10px] text-slate-400">{job.description}</p>
                    <span className="text-[9px] text-amber-300/80 block mt-0.5">
                      📍 {job.facility} • Overseer: {supervisor ? supervisor.name : 'Royal Steward'}
                    </span>
                  </div>
                </div>

                {/* Energy Cost Pill */}
                <div className="shrink-0 text-right">
                  <span className="inline-flex items-center gap-0.5 font-mono text-[11px] font-bold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded-lg">
                    <Zap className="w-3 h-3 text-amber-400" />
                    -{job.energyCost}
                  </span>
                </div>
              </div>

              {/* Rewards & Impacts Row */}
              <div className="mt-2 flex items-center justify-between gap-1 text-[11px] bg-slate-950/80 rounded-xl p-2 border border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 font-mono font-bold text-amber-300">
                    <Coins className="w-3 h-3 text-amber-400" /> +{job.copperReward} C
                  </span>
                  {job.rewardItem && (
                    <span className="text-emerald-300 font-semibold text-[10px]">
                      + {job.rewardItem.amount} {job.rewardItem.itemId}
                    </span>
                  )}
                </div>

                <div className="text-right text-[10px] text-slate-400">
                  <span className="text-indigo-300 font-semibold">
                    +{job.kingdomImpact.delta} {String(job.kingdomImpact.statKey)}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              {isUnlocked && (
                <button
                  onClick={() => {
                    if (hasEnergy) {
                      sound.playWork();
                      onExecuteJob(job);
                    } else {
                      sound.playAlert();
                      alert("You are exhausted! Sleep / Advance to the next day to replenish energy.");
                    }
                  }}
                  disabled={!hasEnergy}
                  className={`mt-2.5 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-black transition-all ${
                    hasEnergy
                      ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 text-slate-950 hover:brightness-110 active:scale-95 shadow-md shadow-amber-600/20'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>{hasEnergy ? 'Perform Shift & Earn' : 'Exhausted (Rest to Work)'}</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
