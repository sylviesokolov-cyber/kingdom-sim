import React, { useEffect, useMemo, useState } from 'react';
import {
  Award, Brain, Building2, ChevronRight, Coins, Crown, Heart, MapPin, MessageSquare,
  Shield, ShoppingBag, Skull, Sparkles, Sparkle, Swords, Users, Volume2, X, Zap,
} from 'lucide-react';
import { BondScene, KingdomStats, NpcCharacter, PlayerState, Season } from '../types/game';
import { getNextAvailableBondScene } from '../data/bondScenesData';
import { sound } from '../utils/audio';

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

const FALLBACK_ART = '/characters/vesper_eclipse.png';

const rankObjective = (rank: string) => {
  if (rank === 'Refugee') return 'Earn 100 Rank Progress and 100 Copper to gain citizenship.';
  if (rank === 'Peasant') return 'Build wealth and reputation to secure land and a merchant permit.';
  if (rank === 'Villager') return 'Grow your influence across Valenreach and enter the court.';
  return 'Increase authority, allies and reputation on the road to the throne.';
};

const statMeta = [
  { key: 'might', label: 'Might', icon: Swords, cls: 'text-rose-300' },
  { key: 'cunning', label: 'Cunning', icon: Brain, cls: 'text-violet-300' },
  { key: 'authority', label: 'Authority', icon: Crown, cls: 'text-amber-300' },
  { key: 'piety', label: 'Piety', icon: Sparkles, cls: 'text-sky-300' },
] as const;

export const GachaThroneStage: React.FC<GachaThroneStageProps> = ({
  npcs, activeNpcId, onSelectActiveNpc, kingdom, player, day, season,
  onAdvanceDay, onOpenNpcDetail, onOpenVitals, onTreatNpc, onNavigateTab,
  onConverse, onOpenBondScene,
}) => {
  const [speechText, setSpeechText] = useState('');
  const [showChoices, setShowChoices] = useState(false);
  const [showRetinue, setShowRetinue] = useState(false);
  const [heartBurst, setHeartBurst] = useState(false);
  const [advancing, setAdvancing] = useState(false);
  const [feedback, setFeedback] = useState('');

  const companion = npcs.find(n => n.id === activeNpcId) || npcs[0];
  const bondScene = companion ? getNextAvailableBondScene(companion, player.completedBondSceneIds || []) : null;
  const stats = player.stats || { level: 1, exp: 25, maxExp: 100, might: 14, cunning: 16, authority: 12, piety: 10 };
  const distressed = npcs.filter(n => ['Sick', 'Injured', 'Critical'].includes(n.status));
  const kingdomHealth = Math.round((kingdom.granary + kingdom.cleanWater + kingdom.security + kingdom.publicHealth) / 4);

  const objective = useMemo(() => rankObjective(player.rank), [player.rank]);

  useEffect(() => {
    if (companion?.greetings?.length) setSpeechText(companion.greetings[0]);
  }, [companion?.id]);

  if (!companion) return null;

  const talk = (choice?: 'rumor' | 'admin' | 'praise') => {
    sound.playClick();
    setShowChoices(false);
    setHeartBurst(choice === 'praise');
    if (choice === 'praise') setTimeout(() => setHeartBurst(false), 800);
    if (onConverse) onConverse(companion.id, choice || 'praise');

    const text = choice === 'rumor'
      ? companion.dialogueTopics?.rumor
      : choice === 'admin'
        ? companion.dialogueTopics?.workStatus
        : companion.dialogueTopics?.personal;
    setSpeechText(text || companion.greetings?.[Math.floor(Math.random() * companion.greetings.length)] || 'The court awaits your command.');
    setFeedback(choice === 'rumor' ? '+10 EXP • Rumor gathered' : choice === 'admin' ? '+10 EXP • District report' : '+5 Affection • +1 Loyalty');
    setTimeout(() => setFeedback(''), 2500);
  };

  const advance = () => {
    if (advancing) return;
    setAdvancing(true);
    sound.playTurnEnd();
    setTimeout(() => { onAdvanceDay(); setAdvancing(false); }, 350);
  };

  const tapCharacter = () => {
    sound.playClick();
    setHeartBurst(true);
    setTimeout(() => setHeartBurst(false), 800);
    const greetings = companion.greetings || [];
    if (greetings.length) setSpeechText(greetings[Math.floor(Math.random() * greetings.length)]);
  };

  return (
    <section className={`relative h-full min-h-0 overflow-hidden bg-[#090a12] text-[#f4ebdd] ${advancing ? 'opacity-75 scale-[0.995]' : ''} transition-all duration-300`}>
      {/* Cinematic environment */}
      <div className="absolute inset-0 pointer-events-none">
        {companion.backgroundUrl ? (
          <img src={companion.backgroundUrl} alt="" className="h-full w-full object-cover scale-105 opacity-55 blur-[1px] brightness-[.38]" />
        ) : <div className="h-full w-full bg-[radial-gradient(circle_at_45%_30%,#3b3156_0%,#11101b_42%,#06070c_100%)]" />}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,10,.82)_0%,rgba(5,5,10,.16)_42%,rgba(5,5,10,.22)_65%,rgba(5,5,10,.9)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,5,10,.82),transparent_42%,rgba(5,5,10,.28))]" />
        <div className="absolute left-[35%] top-0 h-full w-48 bg-amber-400/[.035] blur-3xl" />
        <div className="absolute right-[18%] top-0 h-full w-64 bg-violet-500/[.045] blur-3xl" />
      </div>

      {/* Compact quest/HUD strip */}
      <div className="relative z-20 flex h-11 items-center gap-2 px-2 sm:px-3">
        <div className="min-w-0 flex-1 rounded-xl border border-[#d9ae55]/25 bg-[#0b0c14]/80 px-2.5 py-1.5 backdrop-blur-xl shadow-lg">
          <div className="flex items-center gap-2">
            <Award className="h-3.5 w-3.5 shrink-0 text-[#f0d28a]" />
            <span className="hidden sm:inline text-[9px] font-black uppercase tracking-[.16em] text-[#d9ae55]">Current Ambition</span>
            <span className="truncate text-[10px] sm:text-[11px] text-[#f4ebdd]">{objective}</span>
          </div>
        </div>
        <button onClick={() => setShowRetinue(true)} className="flex h-9 shrink-0 items-center gap-1.5 rounded-xl border border-violet-400/30 bg-[#11101b]/85 px-2.5 text-[10px] font-bold text-violet-200 backdrop-blur-xl active:scale-95">
          <Users className="h-3.5 w-3.5" /> <span className="hidden xs:inline">Retinue</span> {npcs.length}
        </button>
      </div>

      {/* Main landscape composition */}
      <div className="relative z-10 flex min-h-0 h-[calc(100%-11rem)] gap-2 px-2 sm:px-3">
        {/* Character stage */}
        <div className="relative min-w-0 flex-1 overflow-hidden rounded-2xl border border-[#d9ae55]/20 bg-black/10">
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-1/2 h-7 w-[46%] -translate-x-1/2 rounded-[50%] border border-[#d9ae55]/30 bg-[#d9ae55]/10 blur-[1px]" />
          <div className="absolute bottom-1 left-1/2 h-5 w-[38%] -translate-x-1/2 rounded-[50%] bg-black/70 blur-md" />

          <button onClick={tapCharacter} className="group absolute inset-0 flex items-end justify-center cursor-pointer focus:outline-none" aria-label={`Talk to ${companion.name}`}>
            <div className="absolute left-1/2 top-[24%] h-[48%] w-[46%] -translate-x-1/2 rounded-full bg-violet-400/[.08] blur-3xl" />
            {heartBurst && <Heart className="absolute top-1/4 z-30 h-14 w-14 animate-ping fill-rose-500 text-rose-400" />}
            <img
              src={companion.portraitUrl || companion.avatarUrl || FALLBACK_ART}
              alt={companion.name}
              className="relative z-10 h-[96%] max-w-[78%] object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,.95)] transition-transform duration-300 group-active:scale-[.98] group-hover:scale-[1.012] animate-live2d-breathe"
              onError={(e) => { e.currentTarget.src = FALLBACK_ART; }}
            />
            <span className="absolute right-3 top-3 z-20 flex items-center gap-1 rounded-full border border-white/10 bg-black/55 px-2 py-1 text-[9px] font-bold text-white/70 opacity-0 transition-opacity group-hover:opacity-100">
              <Volume2 className="h-3 w-3" /> TAP TO TALK
            </span>
          </button>

          {/* Nameplate */}
          <div className="absolute bottom-3 left-3 z-20 max-w-[72%] rounded-xl border border-[#d9ae55]/35 bg-[#0b0c14]/88 px-3 py-2 backdrop-blur-xl shadow-xl">
            <div className="flex items-center gap-2">
              <Crown className="h-3.5 w-3.5 text-[#f0d28a]" />
              <span className="text-sm font-black text-[#f0d28a]">{companion.name}</span>
              <span className="hidden sm:inline text-[10px] text-white/50">{companion.title}</span>
            </div>
            <div className="mt-1 flex items-center gap-2 text-[9px]">
              <span className="flex items-center gap-1 text-rose-300"><Heart className="h-3 w-3 fill-current" /> {companion.affection || 0}</span>
              <span className="flex items-center gap-1 text-amber-300"><Shield className="h-3 w-3" /> {companion.loyalty || 0}</span>
              <span className="flex items-center gap-1 text-white/50"><MapPin className="h-3 w-3" /> {companion.district}</span>
            </div>
          </div>
        </div>

        {/* Right companion command card */}
        <aside className="relative flex w-[min(31vw,350px)] min-w-[235px] max-w-[350px] flex-col overflow-hidden rounded-2xl border border-[#d9ae55]/25 bg-[#11101b]/90 p-2.5 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2 border-b border-white/8 pb-2">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-[#d9ae55]/35 bg-black/30">
              <img src={companion.avatarUrl || companion.portraitUrl || FALLBACK_ART} alt="" className="h-full w-full object-cover" onError={(e) => { e.currentTarget.src = FALLBACK_ART; }} />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#11101b] bg-emerald-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[9px] uppercase tracking-[.18em] text-[#d9ae55]">Active Companion</p>
              <h2 className="truncate font-serif text-base font-bold text-[#f4ebdd]">{companion.name}</h2>
              <p className="truncate text-[9px] text-white/45">{companion.role}</p>
            </div>
            <button onClick={() => onOpenNpcDetail(companion)} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 active:scale-95" aria-label="Open character profile"><ChevronRight className="h-4 w-4" /></button>
          </div>

          <div className="mt-2 rounded-xl border border-white/7 bg-black/15 p-2">
            <p className="line-clamp-2 min-h-[28px] text-[10px] leading-4 text-white/75">“{speechText}”</p>
          </div>

          <button onClick={() => setShowChoices(v => !v)} className="mt-2 flex h-10 items-center justify-center gap-2 rounded-xl border border-[#d9ae55]/35 bg-[#d9ae55]/10 text-[10px] font-black uppercase tracking-wider text-[#f0d28a] active:scale-[.98]">
            <MessageSquare className="h-3.5 w-3.5" /> Audience
          </button>

          {showChoices && (
            <div className="mt-1 grid grid-cols-3 gap-1.5">
              <button onClick={() => talk('rumor')} className="rounded-lg border border-violet-400/20 bg-violet-400/8 px-1 py-2 text-[8px] font-bold text-violet-200 active:scale-95">Rumors</button>
              <button onClick={() => talk('admin')} className="rounded-lg border border-sky-400/20 bg-sky-400/8 px-1 py-2 text-[8px] font-bold text-sky-200 active:scale-95">Report</button>
              <button onClick={() => talk('praise')} className="rounded-lg border border-rose-400/20 bg-rose-400/8 px-1 py-2 text-[8px] font-bold text-rose-200 active:scale-95">Praise</button>
            </div>
          )}

          {feedback && <div className="mt-1 rounded-lg bg-emerald-400/10 px-2 py-1 text-center text-[8px] font-bold text-emerald-300">{feedback}</div>}

          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {statMeta.map(({ key, label, icon: Icon, cls }) => (
              <div key={key} className="rounded-lg border border-white/7 bg-white/[.025] px-2 py-1.5">
                <div className={`flex items-center gap-1 text-[8px] ${cls}`}><Icon className="h-3 w-3" /> {label}</div>
                <strong className="text-sm text-white">{stats[key]}</strong>
              </div>
            ))}
          </div>

          <div className="mt-2 rounded-xl border border-[#d9ae55]/15 bg-black/20 p-2">
            <div className="flex items-center justify-between text-[8px] uppercase tracking-wider text-white/45"><span>Level {stats.level}</span><span>{stats.exp}/{stats.maxExp} EXP</span></div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-[#d9ae55] to-[#f0d28a]" style={{ width: `${Math.min(100, (stats.exp / Math.max(1, stats.maxExp)) * 100)}%` }} /></div>
          </div>

          {bondScene && (
            <button onClick={() => onOpenBondScene?.(bondScene)} className="mt-2 flex min-h-11 items-center justify-between rounded-xl border border-rose-400/40 bg-gradient-to-r from-rose-500/15 to-violet-500/10 px-2.5 text-left active:scale-[.98]">
              <span><span className="block text-[8px] font-black uppercase tracking-wider text-rose-300">Bond Story Ready</span><span className="text-[10px] font-bold text-white">{bondScene.title}</span></span>
              <Heart className="h-4 w-4 fill-rose-400 text-rose-300" />
            </button>
          )}

          <div className="mt-auto grid grid-cols-2 gap-1.5 pt-2">
            <button onClick={onOpenVitals} className="flex min-h-10 items-center justify-center gap-1 rounded-xl border border-emerald-400/20 bg-emerald-400/8 text-[9px] font-bold text-emerald-200"><Building2 className="h-3.5 w-3.5" /> Realm {kingdomHealth}%</button>
            <button onClick={() => onNavigateTab('npcs')} className="flex min-h-10 items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/5 text-[9px] font-bold text-white/70"><Users className="h-3.5 w-3.5" /> Manage</button>
          </div>
        </aside>
      </div>

      {/* Bottom command dock */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex h-[6.9rem] items-end gap-1.5 border-t border-[#d9ae55]/20 bg-[#080912]/90 px-2 pb-2 pt-2 backdrop-blur-2xl sm:gap-2 sm:px-3">
        <div className="hidden sm:flex h-12 shrink-0 items-center gap-2 rounded-xl border border-white/8 bg-white/[.025] px-2.5">
          <div className="flex items-center gap-1 text-[9px] text-white/60"><Zap className="h-3 w-3 text-amber-300" /> {player.energy}/{player.maxEnergy}</div>
          <div className="flex items-center gap-1 text-[9px] text-white/60"><Heart className="h-3 w-3 text-rose-300" /> {player.health}</div>
          <div className="flex items-center gap-1 text-[9px] text-white/60"><Coins className="h-3 w-3 text-amber-300" /> {player.copper}</div>
        </div>
        {[
          ['kingdom', Building2, 'Realm'], ['npcs', Users, 'Heroes'], ['work', Swords, 'Career'],
          ['market', ShoppingBag, 'Market'], ['crime', Skull, 'Intrigue'], ['council', Crown, 'Council'],
        ].map(([tab, Icon, label]) => (
          <button key={tab as string} onClick={() => { sound.playClick(); onNavigateTab(tab); }} className="flex h-12 min-w-0 flex-1 flex-col items-center justify-center rounded-xl border border-white/7 bg-white/[.025] text-white/45 transition-all active:scale-95 hover:bg-white/5 hover:text-white">
            <Icon className="h-4 w-4" /> <span className="mt-0.5 truncate text-[8px] font-bold sm:text-[9px]">{label as string}</span>
          </button>
        ))}
        <button onClick={advance} disabled={advancing} className="flex h-12 min-w-[70px] shrink-0 flex-col items-center justify-center rounded-xl border border-[#d9ae55]/50 bg-gradient-to-b from-[#d9ae55]/25 to-[#d9ae55]/8 text-[#f0d28a] shadow-lg active:scale-95 disabled:opacity-60">
          <Sparkle className="h-4 w-4" /> <span className="text-[8px] font-black uppercase">{advancing ? 'Dawn…' : 'Next Day'}</span>
        </button>
      </div>

      {/* Retinue selector */}
      {showRetinue && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl border border-[#d9ae55]/30 bg-[#11101b] p-3 shadow-2xl">
            <div className="mb-2 flex items-center justify-between"><div><p className="text-[9px] uppercase tracking-[.2em] text-[#d9ae55]">Royal Retinue</p><h3 className="font-serif text-lg text-[#f4ebdd]">Choose Companion</h3></div><button onClick={() => setShowRetinue(false)} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5"><X className="h-4 w-4" /></button></div>
            <div className="grid max-h-[55vh] grid-cols-2 gap-2 overflow-auto sm:grid-cols-3">
              {npcs.map(npc => (
                <button key={npc.id} onClick={() => { sound.playClick(); onSelectActiveNpc(npc.id); setShowRetinue(false); }} className={`overflow-hidden rounded-xl border text-left transition-all active:scale-95 ${npc.id === companion.id ? 'border-[#f0d28a] bg-[#d9ae55]/10' : 'border-white/8 bg-white/[.025]'}`}>
                  <div className="relative h-24 bg-black/20"><img src={npc.avatarUrl || npc.portraitUrl || FALLBACK_ART} alt="" className="h-full w-full object-contain" onError={(e) => { e.currentTarget.src = FALLBACK_ART; }} /><span className="absolute bottom-1 left-1 rounded bg-black/70 px-1 text-[7px] text-white/70">{npc.status}</span></div>
                  <div className="p-2"><p className="truncate text-[10px] font-black text-white">{npc.name}</p><p className="truncate text-[8px] text-white/45">{npc.role}</p></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Distress alert */}
      {distressed.length > 0 && <button onClick={() => onNavigateTab('npcs')} className="absolute right-3 top-12 z-40 flex h-8 items-center gap-1 rounded-full border border-rose-400/30 bg-rose-950/75 px-2.5 text-[8px] font-black text-rose-200 backdrop-blur-xl"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400" /> {distressed.length} NEED ATTENTION</button>}

      <div className="pointer-events-none absolute left-3 top-12 z-20 hidden text-[8px] uppercase tracking-[.16em] text-white/30 sm:block">Valenreach • {season} • Day {day}</div>
    </section>
  );
};
