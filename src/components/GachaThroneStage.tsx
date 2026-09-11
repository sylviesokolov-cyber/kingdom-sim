import React, { useState, useEffect } from 'react';
import { NpcCharacter, KingdomStats, PlayerState, Season } from '../types/game';
import { sound } from '../utils/audio';
import {
  Heart,
  Zap,
  Sparkles,
  MessageSquare,
  Shield,
  Briefcase,
  AlertTriangle,
  ChevronRight,
  Flame,
  Clock,
  Coins,
  Crown,
  MapPin,
  TrendingUp,
  Volume2,
  Users,
  Building2,
  ShoppingBag,
  Skull,
  ScrollText,
  Swords,
  Brain,
  Award,
  Sparkle,
  X,
  CheckCircle2,
  Smile,
  Play
} from 'lucide-react';
import { BondScene } from '../types/game';
import { getNextAvailableBondScene } from '../data/bondScenesData';

interface GachaThroneStageProps {
  npcs: NpcCharacter[];
  activeNpcId: string;
  onSelectActiveNpc: (id: string) => void;
  kingdom: KingdomStats;
  player: PlayerState;
  day: number;
  season: Season;
  onAdvanceDay: () => void;
  onOpenNpcDetail: (npc: NpcCharacter) => void;
  onOpenVitals: () => void;
  onTreatNpc: (npcId: string, medicineType: string) => void;
  onNavigateTab: (tab: any) => void;
  onConverse?: (npcId: string, choiceType: 'rumor' | 'admin' | 'praise') => void;
  onOpenBondScene?: (scene: BondScene) => void;
}

export const GachaThroneStage: React.FC<GachaThroneStageProps> = ({
  npcs,
  activeNpcId,
  onSelectActiveNpc,
  kingdom,
  player,
  day,
  season,
  onAdvanceDay,
  onOpenNpcDetail,
  onOpenVitals,
  onTreatNpc,
  onNavigateTab,
  onConverse,
  onOpenBondScene,
}) => {
  const [speechText, setSpeechText] = useState<string>('');
  const [isTalking, setIsTalking] = useState(false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [showAudienceChoices, setShowAudienceChoices] = useState(false);
  const [showRetinueModal, setShowRetinueModal] = useState(false);
  const [audienceFeedback, setAudienceFeedback] = useState<string | null>(null);

  // Active Companion
  const companion = npcs.find((n) => n.id === activeNpcId) || npcs[0];
  const availableBondScene = companion ? getNextAvailableBondScene(companion, player.completedBondSceneIds || []) : null;

  // Set default initial greeting
  useEffect(() => {
    if (companion && companion.greetings?.length > 0) {
      setSpeechText(companion.greetings[0]);
    }
    setShowAudienceChoices(false);
    setAudienceFeedback(null);
  }, [companion?.id]);

  // Tap Companion Interaction
  const handleTapCompanion = () => {
    sound.playClick();
    setShowHeartBurst(true);
    setTimeout(() => setShowHeartBurst(false), 900);

    if (companion.greetings && companion.greetings.length > 0) {
      setIsTalking(true);
      const randomIndex = Math.floor(Math.random() * companion.greetings.length);
      setSpeechText(companion.greetings[randomIndex]);
      setTimeout(() => setIsTalking(false), 500);
    }
  };

  // Advance Day with animation
  const handleAdvance = () => {
    setIsAdvancing(true);
    sound.playTurnEnd();
    setTimeout(() => {
      onAdvanceDay();
      setIsAdvancing(false);
    }, 450);
  };

  // Handle Conversational Choice in Visual Novel style
  const handleDialogueChoice = (choice: 'rumor' | 'admin' | 'praise') => {
    sound.playClick();
    setShowAudienceChoices(false);
    setIsTalking(true);

    if (onConverse) {
      onConverse(companion.id, choice);
    }

    if (choice === 'rumor') {
      const rumor = companion.dialogueTopics?.rumor || `Whispers say unrest brews along the outer border, but with proper coin, even silence has a price.`;
      setSpeechText(rumor);
      setAudienceFeedback(`+10 Cunning EXP • Learned local rumors from ${companion.name}`);
    } else if (choice === 'admin') {
      const work = companion.dialogueTopics?.workStatus || `Our production quotas in the ${companion.district} are holding steady, Sovereign. Maintain supply lines.`;
      setSpeechText(work);
      setAudienceFeedback(`+10 Authority EXP • Received district administrative report`);
    } else {
      setShowHeartBurst(true);
      setTimeout(() => setShowHeartBurst(false), 900);
      const personal = companion.dialogueTopics?.personal || `Your words honor me, Lord. I shall devote my steel and spirit to your ascendance.`;
      setSpeechText(personal);
      setAudienceFeedback(`+5 Affection • +1 Loyalty with ${companion.name}`);
    }

    setTimeout(() => setIsTalking(false), 500);
    setTimeout(() => setAudienceFeedback(null), 4000);
  };

  // Sick/Injured NPCs count
  const distressedNpcs = npcs.filter(
    (n) => n.status === 'Sick' || n.status === 'Injured' || n.status === 'Critical'
  );

  const rpgStats = player.stats || {
    level: 1,
    exp: 25,
    maxExp: 100,
    might: 14,
    cunning: 16,
    authority: 12,
    piety: 10,
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden select-none bg-radial from-slate-900 via-slate-950 to-black">
      {/* Background Atmosphere: Visual Novel Scene Setting */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        {companion?.backgroundUrl ? (
          <img
            src={companion.backgroundUrl}
            alt=""
            className="w-full h-full object-cover scale-105 blur-[1px] brightness-40 contrast-125"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-indigo-950/40 via-slate-950 to-black" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-transparent to-slate-950/90" />
        
        {/* Subtle Ambient Light Pillars & Dust */}
        <div className="absolute -top-20 left-1/4 w-96 h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-20 right-1/4 w-96 h-[500px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Top Banner: RPG Ambition & Realm Quick Ticker */}
      <div className="relative z-20 px-3 pt-1.5 pb-1 flex items-center justify-between gap-2">
        {/* RPG Ambition / Quest Pill */}
        <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-xl border border-amber-500/30 text-[11px] shadow-lg">
          <div className="flex items-center gap-1 text-amber-400 font-black">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline uppercase tracking-wider text-[10px]">Ambition:</span>
          </div>
          <span className="text-slate-200 font-medium truncate max-w-[200px] sm:max-w-[320px]">
            {player.rank === 'Refugee'
              ? 'Rise to Peasant Citizenship (Requires 100C & 100% Rank)'
              : player.rank === 'Peasant'
              ? 'Acquire Land & Merchant Permit to become Villager'
              : `Ascend Sovereign Authority towards the Royal Throne`}
          </span>
          <div className="hidden md:flex items-center gap-1 pl-2 border-l border-slate-800 text-[10px] text-amber-300 font-mono">
            <span>EXP</span>
            <span>{rpgStats.exp}/{rpgStats.maxExp}</span>
          </div>
        </div>

        {/* RPG Attribute Mini-Ribbon */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-800 text-[10px] shadow-md font-mono">
          <div className="flex items-center gap-1 text-rose-400" title="Might (Combat & Physical trial)">
            <Swords className="w-3 h-3" />
            <span>{rpgStats.might}</span>
          </div>
          <div className="flex items-center gap-1 text-purple-400" title="Cunning (Intrigue & Bargaining)">
            <Brain className="w-3 h-3" />
            <span>{rpgStats.cunning}</span>
          </div>
          <div className="flex items-center gap-1 text-amber-400" title="Authority (Royal Decrees & Obedience)">
            <Crown className="w-3 h-3" />
            <span>{rpgStats.authority}</span>
          </div>
          <div className="flex items-center gap-1 text-sky-400" title="Piety (Temple favors & Grace)">
            <Sparkles className="w-3 h-3" />
            <span>{rpgStats.piety}</span>
          </div>
        </div>

        {/* Retinue Quick-Call Button (No messy permanent roster bar!) */}
        <button
          onClick={() => {
            sound.playClick();
            setShowRetinueModal(true);
          }}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-gradient-to-r from-indigo-950 to-slate-900 hover:from-indigo-900 hover:to-slate-800 border border-indigo-400/40 text-indigo-200 text-xs font-bold shadow-md transition-all active:scale-95 shrink-0"
          title="Switch Attendant / View Council Retinue"
        >
          <Users className="w-3.5 h-3.5 text-indigo-300" />
          <span>Retinue ({npcs.length})</span>
        </button>
      </div>

      {/* Main Center Stage: Visual Novel Layout with Character & Sim Action Palette */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-between px-3 sm:px-6 py-1 gap-2 min-h-[300px]">
        
        {/* Left / Center-Left: Visual Novel Standing Character Stage */}
        <div className="relative flex-1 flex flex-col items-center justify-end h-full min-h-[260px] sm:min-h-[340px] md:min-h-[380px] w-full max-w-md">
          
          {/* Heart burst animation on tap */}
          {showHeartBurst && (
            <div className="absolute top-1/4 z-40 flex items-center justify-center pointer-events-none animate-ping duration-700">
              <Heart className="w-16 h-16 text-rose-500 fill-rose-500 opacity-90 drop-shadow-[0_0_15px_rgba(244,63,94,0.8)]" />
            </div>
          )}

          {/* Standing Character Illustration */}
          <div
            onClick={handleTapCompanion}
            className="group relative cursor-pointer flex items-end justify-center h-[240px] sm:h-[320px] md:h-[370px] w-full transition-transform duration-300 active:scale-98"
            title="Click to interact and hear companion voice"
          >
            {/* Dais Shadow & Ambient Arc */}
            <div className="absolute bottom-0 w-60 sm:w-72 h-8 sm:h-10 bg-black/80 rounded-full blur-md" />
            <div className="absolute bottom-1 w-64 sm:w-80 h-6 sm:h-8 rounded-full border border-amber-500/40 bg-amber-500/10 blur-[1px] animate-pulse" />

            {/* Standing Art Image with Live2D breathing */}
            <img
              src={companion.portraitUrl || companion.avatarUrl || '/characters/vesper_eclipse.png'}
              alt={companion.name}
              className={`relative z-10 h-full max-h-[370px] w-auto object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] transition-all duration-500 ${
                isTalking ? 'scale-105' : 'animate-live2d-breathe'
              }`}
            />

            {/* Click to interact floating indicator */}
            <div className="absolute top-2 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-full border border-amber-400/40 text-[9px] text-amber-300 font-bold flex items-center gap-1 shadow-lg pointer-events-none">
              <Volume2 className="w-2.5 h-2.5 text-amber-400" />
              <span>Tap to talk</span>
            </div>
          </div>

          {/* Companion Nameplate & Bond Ribbon */}
          <div className="relative z-20 -mt-2 mb-1 flex items-center gap-2 bg-slate-950/90 backdrop-blur-md px-3 py-1 rounded-2xl border border-amber-500/35 shadow-xl text-xs">
            <div className="flex items-center gap-1.5 pr-2 border-r border-slate-800">
              <span className="font-black text-amber-300 tracking-wide text-[11px] sm:text-xs">
                {companion.name}
              </span>
              <span className="text-[10px] text-slate-400 hidden sm:inline">
                ({companion.title})
              </span>
            </div>

            {/* Affection meter */}
            <div 
              onClick={() => {
                if (availableBondScene && onOpenBondScene) {
                  sound.playHolyChime();
                  onOpenBondScene(availableBondScene);
                }
              }}
              className={`flex items-center gap-1 text-[11px] font-bold pr-2 border-r border-slate-800 transition-colors ${
                availableBondScene ? 'text-rose-300 cursor-pointer animate-pulse' : 'text-rose-400'
              }`}
              title={availableBondScene ? '❤️ Bond Story Ready! Click to experience.' : 'Affection Level'}
            >
              <Heart className={`w-3 h-3 fill-rose-500 text-rose-500 ${availableBondScene ? 'animate-bounce' : ''}`} />
              <span>{companion.affection || 20}/100</span>
              {availableBondScene && (
                <span className="text-[9px] px-1 rounded bg-rose-600 text-white font-black ml-0.5">
                  EVENT
                </span>
              )}
            </div>

            {/* Loyalty badge */}
            <div className="flex items-center gap-1 text-[10px] text-amber-300 pr-1.5 border-r border-slate-800">
              <Shield className="w-3 h-3 text-amber-400" />
              <span>Loyalty: {companion.loyalty > 0 ? `+${companion.loyalty}` : companion.loyalty}</span>
            </div>

            {/* Switch Companion Button */}
            <button
              onClick={() => {
                sound.playClick();
                setShowRetinueModal(true);
              }}
              className="px-1.5 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-amber-300 text-[10px] font-bold border border-amber-500/30 transition-colors"
              title="Call a different lieutenant"
            >
              ⇄ Switch
            </button>
          </div>
        </div>

        {/* Right / Center-Right: Normal Sim Game Action Commands Panel */}
        <div className="relative z-20 flex flex-col gap-2 w-full md:w-80 shrink-0">
          
          {/* Action Command Box (Visual Novel / Sim Game Style) */}
          <div className="bg-slate-950/85 backdrop-blur-xl rounded-2xl border border-amber-500/30 p-2.5 shadow-2xl flex flex-col gap-2">
            <div className="flex items-center justify-between pb-1 border-b border-slate-800/80">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-300">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>Sovereign Actions</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 font-mono">
                EN: {player.energy}/{player.maxEnergy}
              </span>
            </div>

            {/* Bond Event Special Banner (When unlocked) */}
            {availableBondScene && (
              <button
                onClick={() => {
                  sound.playHolyChime();
                  if (onOpenBondScene) onOpenBondScene(availableBondScene);
                }}
                className="w-full p-2.5 rounded-xl bg-gradient-to-r from-rose-950 via-pink-950/90 to-slate-900 hover:from-rose-900 hover:to-pink-900 border-2 border-rose-500 text-white shadow-lg shadow-rose-950/50 transition-all flex items-center justify-between group active:scale-98 animate-pulse"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-rose-500/30 text-rose-300">
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-300" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-black uppercase tracking-wider text-rose-300 block">
                      ❤️ Soulbound Story Ready • Act {availableBondScene.episodeNumber}
                    </span>
                    <span className="text-xs font-bold text-amber-200 group-hover:text-white line-clamp-1">
                      "{availableBondScene.title}"
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-black px-2 py-1 rounded-lg bg-rose-500 text-white shadow">
                  <Play className="w-3 h-3 fill-current" />
                  <span>Play</span>
                </div>
              </button>
            )}

            {/* Primary Action Buttons Grid */}
            <div className="grid grid-cols-2 gap-1.5">
              
              {/* Action 1: Converse / Audience with Companion */}
              <button
                id="audience-btn"
                onClick={() => {
                  sound.playClick();
                  setShowAudienceChoices(!showAudienceChoices);
                }}
                disabled={player.energy < 5}
                className={`p-2 rounded-xl text-left transition-all border flex flex-col gap-0.5 ${
                  showAudienceChoices
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200 ring-1 ring-amber-400/50'
                    : 'bg-slate-900/90 hover:bg-slate-800/90 border-slate-800 hover:border-amber-500/40 text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                    <span>Audience</span>
                  </div>
                  <span className="text-[9px] px-1 rounded bg-amber-500/20 text-amber-300 font-mono font-bold">-5 EN</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Converse with {companion.name} for rumors & loyalty
                </p>
              </button>

              {/* Action 2: Care / Gifts / Treat */}
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenNpcDetail(companion);
                }}
                className="p-2 rounded-xl text-left bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-rose-500/40 text-slate-200 transition-all flex flex-col gap-0.5"
              >
                <div className="flex items-center justify-between text-xs font-bold text-rose-300">
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-rose-400" />
                    <span>Gift & Care</span>
                  </div>
                  {companion.status !== 'Healthy' && (
                    <span className="text-[9px] px-1 rounded bg-rose-500 text-white font-bold animate-pulse">Sick</span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Bestow medicine, wine, or inspect dossier
                </p>
              </button>

              {/* Action 3: Inspect Districts */}
              <button
                onClick={() => {
                  sound.playClick();
                  onNavigateTab('kingdom');
                }}
                className="p-2 rounded-xl text-left bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-indigo-500/40 text-slate-200 transition-all flex flex-col gap-0.5"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
                  <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Districts</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Slums, Docks, High Ward & Cathedral
                </p>
              </button>

              {/* Action 4: Royal Decrees & Council */}
              <button
                onClick={() => {
                  sound.playClick();
                  onNavigateTab('council');
                }}
                className="p-2 rounded-xl text-left bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/40 text-slate-200 transition-all flex flex-col gap-0.5"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                  <ScrollText className="w-3.5 h-3.5 text-amber-400" />
                  <span>Decrees</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Enact laws, food rations & tax codes
                </p>
              </button>

              {/* Action 5: Royal Bazaar & Trade */}
              <button
                onClick={() => {
                  sound.playClick();
                  onNavigateTab('market');
                }}
                className="p-2 rounded-xl text-left bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/40 text-slate-200 transition-all flex flex-col gap-0.5"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                  <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                  <span>Bazaar</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Commodity prices & supply market
                </p>
              </button>

              {/* Action 6: Shadow Intrigue */}
              <button
                onClick={() => {
                  sound.playClick();
                  onNavigateTab('crime');
                }}
                className="p-2 rounded-xl text-left bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-purple-500/40 text-slate-200 transition-all flex flex-col gap-0.5"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300">
                  <Skull className="w-3.5 h-3.5 text-purple-400" />
                  <span>Intrigue</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Espionage, smuggling & security sweeps
                </p>
              </button>
            </div>

            {/* Big Action: End Day / Next Cycle Turn Engine */}
            <div className="pt-1 border-t border-slate-800/80">
              <button
                id="advance-day-action-btn"
                onClick={handleAdvance}
                disabled={isAdvancing}
                className={`w-full py-2.5 px-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-xl flex items-center justify-between border ${
                  isAdvancing
                    ? 'bg-amber-600 text-slate-950 scale-98 animate-pulse'
                    : 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 border-amber-300 shadow-amber-500/30 active:scale-95'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 fill-slate-950 text-slate-950" />
                  <span>Rest & Advance Turn</span>
                </div>
                <span className="text-[10px] font-mono font-bold bg-slate-950/20 px-1.5 py-0.5 rounded">
                  Day {day} ➔ {day + 1}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Novel Dialogue Box & Interactive Choice Options */}
      <div className="relative z-30 px-3 sm:px-6 pb-2 pt-0 w-full max-w-4xl mx-auto">
        
        {/* Audience Interactive Choices (Opens when player clicks Audience) */}
        {showAudienceChoices && (
          <div className="mb-2 p-2 rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-amber-500/50 shadow-2xl flex flex-col gap-1.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between px-1 text-[11px] font-black text-amber-300 uppercase tracking-wide">
              <span>Audience with {companion.name}: Choose Topic</span>
              <button
                onClick={() => setShowAudienceChoices(false)}
                className="text-slate-400 hover:text-white p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
              {/* Option 1: Rumor */}
              <button
                onClick={() => handleDialogueChoice('rumor')}
                className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/60 hover:border-purple-400 text-left transition-all group"
              >
                <div className="text-xs font-bold text-purple-300 flex items-center gap-1">
                  <Skull className="w-3 h-3" />
                  <span>Inquire on Rumors</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                  +10 Cunning EXP • Whispers & threats
                </p>
              </button>

              {/* Option 2: District Work */}
              <button
                onClick={() => handleDialogueChoice('admin')}
                className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-400 text-left transition-all group"
              >
                <div className="text-xs font-bold text-amber-300 flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  <span>Consult on Realm</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                  +10 Authority EXP • District advice
                </p>
              </button>

              {/* Option 3: Praise / Bond */}
              <button
                onClick={() => handleDialogueChoice('praise')}
                className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/60 hover:border-rose-400 text-left transition-all group"
              >
                <div className="text-xs font-bold text-rose-300 flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  <span>Bestow Favor</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                  +5 Affection • +1 Loyalty
                </p>
              </button>
            </div>
          </div>
        )}

        {/* Feedback Alert Pill */}
        {audienceFeedback && (
          <div className="mb-1 text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-bold shadow-lg animate-bounce">
              {audienceFeedback}
            </span>
          </div>
        )}

        {/* Visual Novel Dialogue Frame */}
        <div
          onClick={handleTapCompanion}
          className="cursor-pointer group relative p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-slate-950/95 via-slate-900/95 to-slate-950/95 backdrop-blur-xl border border-amber-500/40 shadow-2xl transition-all duration-300 hover:border-amber-400 active:scale-[0.99]"
        >
          {/* Speaker Badge */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-lg bg-amber-500/20 border border-amber-400/50 text-amber-300 font-black text-xs uppercase tracking-wider">
                {companion.name}
              </span>
              <span className="text-slate-400 text-xs font-medium">
                {companion.title} • {companion.district}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="hidden sm:inline italic text-slate-500 group-hover:text-amber-300/70 transition-colors">
                (Click to converse)
              </span>
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
            </div>
          </div>

          {/* Dialogue Text */}
          <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed italic pl-1">
            "{speechText || companion.greetings?.[0] || 'My blade and counsel are yours, Sovereign.'}"
          </p>
        </div>
      </div>

      {/* Retinue Selection Modal (Replaces the clunky horizontal roster selector) */}
      {showRetinueModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-slate-950 rounded-2xl border border-amber-500/40 shadow-2xl p-4 flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm sm:text-base font-black text-amber-200 uppercase tracking-wide">
                  Summon Council Attendant to Throne
                </h3>
              </div>
              <button
                onClick={() => setShowRetinueModal(false)}
                className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400 my-2">
              Select an appointed lieutenant to attend you in the Throne Chamber for private audience, advice, and counsel.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 overflow-y-auto py-1 pr-1">
              {npcs.map((npc) => {
                const isSelected = npc.id === companion.id;
                const isSick = npc.status === 'Sick' || npc.status === 'Injured' || npc.status === 'Critical';
                return (
                  <div
                    key={npc.id}
                    onClick={() => {
                      sound.playClick();
                      onSelectActiveNpc(npc.id);
                      setShowRetinueModal(false);
                    }}
                    className={`cursor-pointer group p-2 rounded-xl border transition-all flex items-center gap-2.5 ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 shadow-lg ring-1 ring-amber-400'
                        : 'bg-slate-900/80 hover:bg-slate-800/80 border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-700 shrink-0 relative">
                      <img
                        src={npc.portraitUrl || npc.avatarUrl}
                        alt={npc.name}
                        className="w-full h-full object-cover object-top"
                      />
                      {isSick && (
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 absolute top-0.5 right-0.5 ring-1 ring-black animate-ping" />
                      )}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-slate-200 group-hover:text-amber-300 truncate">
                        {npc.name}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">{npc.title}</p>
                      <div className="flex items-center gap-1.5 mt-0.5 text-[9px] text-rose-300">
                        <Heart className="w-2.5 h-2.5 fill-rose-500" />
                        <span>{npc.affection || 20}%</span>
                        <span className="text-slate-500">•</span>
                        <span className={isSick ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                          {npc.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
