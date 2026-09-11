import React, { useState, useEffect } from 'react';
import { BondScene, BondDialogueStep, BondDialogueChoice, NpcCharacter, PlayerState } from '../types/game';
import { sound } from '../utils/audio';
import { 
  Heart, 
  Sparkles, 
  ChevronRight, 
  X, 
  BookOpen, 
  Award, 
  RotateCcw, 
  Crown, 
  Shield, 
  Zap, 
  Coins, 
  Brain,
  CheckCircle2,
  Volume2
} from 'lucide-react';

interface BondSceneModalProps {
  scene: BondScene;
  npc: NpcCharacter;
  player: PlayerState;
  onComplete: (scene: BondScene, earnedAffection: number, statGains?: { stat: 'might' | 'cunning' | 'authority' | 'piety'; value: number }) => void;
  onClose: () => void;
}

export const BondSceneModal: React.FC<BondSceneModalProps> = ({
  scene,
  npc,
  player,
  onComplete,
  onClose,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedChoiceResponse, setSelectedChoiceResponse] = useState<string | null>(null);
  const [currentEmotion, setCurrentEmotion] = useState<string>('normal');
  const [totalAffectionGained, setTotalAffectionGained] = useState(0);
  const [totalStatGains, setTotalStatGains] = useState<{ might: number; cunning: number; authority: number; piety: number }>({
    might: 0,
    cunning: 0,
    authority: 0,
    piety: 0,
  });
  const [showHeartParticle, setShowHeartParticle] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [historyLog, setHistoryLog] = useState<{ speaker: string; text: string }[]>([]);

  const currentStep: BondDialogueStep | undefined = scene.script[currentStepIndex];

  // Initialize history with current step on index change
  useEffect(() => {
    if (currentStep) {
      setHistoryLog((prev) => {
        const last = prev[prev.length - 1];
        if (last && last.speaker === currentStep.speaker && last.text === currentStep.text) {
          return prev;
        }
        return [...prev, { speaker: currentStep.speaker, text: currentStep.text }];
      });

      if (currentStep.emotion) {
        setCurrentEmotion(currentStep.emotion);
      }
    }
  }, [currentStepIndex, currentStep]);

  // Handle advancing to the next step
  const handleNextStep = () => {
    sound.playClick();
    if (selectedChoiceResponse) {
      setSelectedChoiceResponse(null);
    }

    if (currentStepIndex + 1 < scene.script.length) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      // Scene concluded!
      sound.playLevelUp();
      setIsCompleted(true);
    }
  };

  // Handle choosing an interactive dialogue option
  const handleSelectChoice = (choice: BondDialogueChoice) => {
    sound.playHolyChime();
    setShowHeartParticle(true);
    setTimeout(() => setShowHeartParticle(false), 1200);

    const affGain = choice.affectionGain || 5;
    setTotalAffectionGained((prev) => prev + affGain);

    if (choice.rpgStatGain) {
      setTotalStatGains((prev) => ({
        ...prev,
        [choice.rpgStatGain!.stat]: prev[choice.rpgStatGain!.stat] + choice.rpgStatGain!.value,
      }));
    }

    if (choice.reactionEmotion) {
      setCurrentEmotion(choice.reactionEmotion);
    }

    // Add choice to history log
    setHistoryLog((prev) => [
      ...prev,
      { speaker: player.name || 'You', text: choice.text },
      { speaker: npc.name, text: choice.response },
    ]);

    setSelectedChoiceResponse(choice.response);
  };

  // Claim final bond rewards
  const handleClaimReward = () => {
    sound.playCoins();
    // Consolidate any earned stat gains
    const primaryStat = Object.entries(totalStatGains).find(([_, val]) => val > 0);
    const statGainObj = primaryStat 
      ? { stat: primaryStat[0] as 'might' | 'cunning' | 'authority' | 'piety', value: primaryStat[1] } 
      : undefined;

    onComplete(scene, totalAffectionGained, statGainObj);
  };

  // Scenic background
  const bgImage = scene.scenicBackgroundUrl || npc.backgroundUrl || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80';
  const standingArt = npc.portraitUrl || npc.avatarUrl || '/characters/justia_paladin.png';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Background Ambience / Scene Stage */}
      <div className="relative w-full max-w-5xl h-[95vh] rounded-3xl overflow-hidden border-2 border-amber-500/50 shadow-2xl flex flex-col bg-slate-950">
        
        {/* Scenic Background Layer with Vignette */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src={bgImage}
            alt=""
            className="w-full h-full object-cover brightness-50 contrast-110 scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />
          <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        </div>

        {/* Top Cinematic Bar */}
        <div className="relative z-20 flex items-center justify-between px-4 py-2.5 bg-slate-950/80 backdrop-blur-md border-b border-amber-500/30 shrink-0">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-950/80 border border-rose-500/60 text-rose-300 text-xs font-black uppercase tracking-wider shadow-sm">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-400" />
              <span>Bond Story • Act {scene.episodeNumber}</span>
            </span>
            <span className="text-xs font-bold text-amber-200 truncate hidden sm:inline">
              "{scene.title}"
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Dialogue Log Button */}
            <button
              onClick={() => { sound.playClick(); setShowLog(!showLog); }}
              className={`p-1.5 rounded-lg border text-xs font-bold flex items-center gap-1 transition-all ${
                showLog 
                  ? 'bg-amber-500 text-slate-950 border-amber-400' 
                  : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:text-white'
              }`}
              title="Review Dialogue Backlog"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Backlog</span>
            </button>

            {/* Close Button */}
            <button
              onClick={() => { sound.playClick(); onClose(); }}
              className="p-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Leave Scene"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Backlog Overlay */}
        {showLog && (
          <div className="absolute inset-0 top-12 z-40 bg-slate-950/95 backdrop-blur-xl p-4 sm:p-6 overflow-y-auto flex flex-col gap-3 text-xs animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h4 className="font-extrabold text-amber-300 text-sm flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Dialogue Backlog</span>
              </h4>
              <button
                onClick={() => setShowLog(false)}
                className="p-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 flex-1">
              {historyLog.map((entry, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 leading-relaxed">
                  <span className={`font-bold block text-[11px] mb-0.5 ${
                    entry.speaker === npc.name 
                      ? 'text-amber-300' 
                      : entry.speaker === 'Narrator' 
                      ? 'text-indigo-300 italic' 
                      : 'text-sky-300'
                  }`}>
                    {entry.speaker}
                  </span>
                  <p className="text-slate-200 text-xs">{entry.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Stage: Character Visual Novel Art & Dialogue Box */}
        <div className="relative z-10 flex-1 flex flex-col justify-end p-2 sm:p-5 overflow-hidden">
          
          {/* Floating Heart Particle on Affection Boost */}
          {showHeartParticle && (
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 z-40 pointer-events-none flex flex-col items-center animate-bounce">
              <div className="p-3 rounded-full bg-rose-500/30 border-2 border-rose-400 backdrop-blur-md shadow-2xl shadow-rose-500/50">
                <Heart className="w-12 h-12 text-rose-400 fill-rose-500 drop-shadow-[0_0_12px_rgba(244,63,94,0.9)]" />
              </div>
              <span className="mt-1 font-black text-rose-300 text-sm drop-shadow-md">
                +Affection Raised!
              </span>
            </div>
          )}

          {/* Center Standing Anime Character Sprite */}
          {!isCompleted && (
            <div className="relative w-full flex-1 flex items-end justify-center min-h-[180px] sm:min-h-[280px] pointer-events-none">
              
              {/* Emotion Aura & Glow */}
              {currentEmotion === 'blush' && (
                <div className="absolute bottom-20 w-48 h-48 rounded-full bg-rose-500/20 blur-2xl animate-pulse" />
              )}
              {currentEmotion === 'tender' && (
                <div className="absolute bottom-20 w-48 h-48 rounded-full bg-amber-400/20 blur-2xl animate-pulse" />
              )}
              {currentEmotion === 'happy' && (
                <div className="absolute bottom-20 w-48 h-48 rounded-full bg-emerald-400/20 blur-2xl animate-pulse" />
              )}

              {/* Character Standing Sprite */}
              <div className="relative max-h-[380px] sm:max-h-[460px] flex items-end">
                <img
                  src={standingArt}
                  alt={npc.name}
                  className={`h-[240px] sm:h-[380px] md:h-[440px] w-auto object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] transition-all duration-300 ${
                    currentEmotion === 'blush' ? 'filter brightness-105 hue-rotate-5' : ''
                  }`}
                />

                {/* Emotion Badge Floating Near Character Head */}
                <div className="absolute top-4 right-0 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-amber-400/40 text-[10px] text-amber-300 font-black shadow-lg flex items-center gap-1">
                  {currentEmotion === 'blush' && <span>🌸 Flustered</span>}
                  {currentEmotion === 'tender' && <span>❤️ Fond & Gentle</span>}
                  {currentEmotion === 'happy' && <span>✨ Smiling Warmly</span>}
                  {currentEmotion === 'serious' && <span>⚔️ Resolute</span>}
                  {currentEmotion === 'thoughtful' && <span>🌙 Contemplative</span>}
                  {currentEmotion === 'normal' && <span>💬 Speaking</span>}
                </div>
              </div>
            </div>
          )}

          {/* SCENE COMPLETE VICTORY REWARD CARD */}
          {isCompleted ? (
            <div className="relative z-30 max-w-xl mx-auto w-full p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-slate-900/95 via-slate-950/95 to-black border-2 border-amber-500 shadow-2xl text-center animate-in zoom-in-95 duration-300">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 p-0.5 shadow-xl shadow-amber-500/20 mb-3 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Award className="w-7 h-7 text-amber-400 animate-pulse" />
                </div>
              </div>

              <span className="text-[11px] font-black uppercase tracking-widest text-rose-400 block mb-1">
                Episode Complete • Soulbound Covenant
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-amber-300 mb-1">
                Bond Forged with {npc.name}!
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto mb-4 leading-relaxed">
                Your shared moments beneath the starlit sky have deepened {npc.name}'s loyalty and affection permanently.
              </p>

              {/* Reward Highlights */}
              <div className="rounded-2xl bg-slate-900/90 border border-amber-500/30 p-3.5 text-left mb-5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-extrabold text-amber-300">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Unlocked Privilege: {scene.reward.title}</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed pl-6">
                  {scene.reward.description}
                </p>

                <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2 text-[11px] pl-6">
                  {totalAffectionGained > 0 && (
                    <span className="flex items-center gap-1 text-rose-400 font-bold">
                      <Heart className="w-3 h-3 fill-rose-500" />
                      +{totalAffectionGained} Affection
                    </span>
                  )}
                  {scene.reward.maxEnergyBonus && (
                    <span className="flex items-center gap-1 text-amber-300 font-bold">
                      <Zap className="w-3 h-3 text-amber-400" />
                      +{scene.reward.maxEnergyBonus} Max Energy
                    </span>
                  )}
                  {scene.reward.statBonus && (
                    <span className="flex items-center gap-1 text-sky-300 font-bold">
                      <Crown className="w-3 h-3 text-sky-400" />
                      +{scene.reward.statBonus.value} {scene.reward.statBonus.stat.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={handleClaimReward}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/30 transition-all active:scale-98 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Claim Bond Blessings</span>
              </button>
            </div>
          ) : (
            /* Visual Novel Dialogue Box */
            <div className="relative z-30 w-full rounded-2xl bg-slate-950/90 backdrop-blur-xl border border-amber-500/40 p-3.5 sm:p-4 shadow-2xl flex flex-col gap-2.5">
              
              {/* Speaker Nameplate */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`px-3 py-1 rounded-xl text-xs font-black tracking-wide shadow-md ${
                    currentStep?.isNarrator 
                      ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/50' 
                      : currentStep?.speaker === 'Player'
                      ? 'bg-sky-950 text-sky-200 border border-sky-500/50'
                      : 'bg-gradient-to-r from-amber-950 to-slate-900 text-amber-300 border border-amber-500/50'
                  }`}>
                    {currentStep?.speaker === 'Player' ? (player.name || 'You') : currentStep?.speaker}
                  </div>
                  {!currentStep?.isNarrator && currentStep?.speaker !== 'Player' && (
                    <span className="text-[10px] text-slate-400 hidden sm:inline">
                      "{npc.title}"
                    </span>
                  )}
                </div>

                {/* Progress pill */}
                <span className="text-[10px] font-mono text-slate-400">
                  {currentStepIndex + 1} / {scene.script.length}
                </span>
              </div>

              {/* Dialogue Text Content */}
              <div className="min-h-[56px] text-xs sm:text-sm text-slate-100 leading-relaxed font-sans select-none">
                {selectedChoiceResponse ? (
                  <div className="animate-in fade-in duration-200">
                    <p className="text-amber-200 italic mb-1 text-xs">
                      {npc.name}'s Response:
                    </p>
                    <p className="font-semibold text-white">
                      "{selectedChoiceResponse}"
                    </p>
                  </div>
                ) : (
                  <p className={currentStep?.isNarrator ? 'italic text-indigo-200' : 'text-slate-100'}>
                    {currentStep?.isNarrator ? currentStep.text : `"${currentStep?.text}"`}
                  </p>
                )}
              </div>

              {/* Branching Player Dialogue Choices (if current step has choices and none selected yet) */}
              {currentStep?.choices && !selectedChoiceResponse ? (
                <div className="mt-1 space-y-2 pt-2 border-t border-slate-800">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                    Choose Your Response:
                  </span>
                  <div className="grid grid-cols-1 gap-1.5">
                    {currentStep.choices.map((choice) => (
                      <button
                        key={choice.id}
                        onClick={() => handleSelectChoice(choice)}
                        className="w-full text-left p-2.5 rounded-xl bg-gradient-to-r from-slate-900 to-indigo-950/60 hover:from-amber-950/60 hover:to-slate-900 border border-slate-700/80 hover:border-amber-400/60 text-xs text-slate-200 hover:text-white transition-all duration-150 flex items-center justify-between group shadow-sm active:scale-[0.99]"
                      >
                        <span className="font-medium group-hover:text-amber-200">
                          {choice.text}
                        </span>
                        <div className="flex items-center gap-1 shrink-0 ml-2">
                          <Heart className="w-3 h-3 text-rose-400 opacity-60 group-hover:opacity-100 group-hover:fill-rose-500" />
                          <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Next Step Continue Button */
                <div className="flex justify-end pt-1">
                  <button
                    onClick={handleNextStep}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs shadow-md transition-all active:scale-95"
                  >
                    <span>{currentStepIndex + 1 === scene.script.length ? 'Conclude Bond Scene' : 'Next'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
