import React, { useEffect, useMemo, useState } from 'react';
import {
  Award, Backpack, Bell, CalendarDays, Castle, ChevronRight, Coins, Crown, Gift, Gem, Heart,
  Mail, Map, MessageCircle, ScrollText, Search, Scale, ShoppingBag, Sparkles, Swords,
  UserRound, Users, Volume2, X,
} from 'lucide-react';
import { BondScene, KingdomStats, NpcCharacter, PlayerState, Season } from '../types/game';
import { getNextAvailableBondScene } from '../data/bondScenesData';
import { sound } from '../utils/audio';
import { CONCEPT_BG } from '../data/themeAssets';

interface GachaThroneStageProps {
  npcs: NpcCharacter[]; activeNpcId: string; onSelectActiveNpc: (id: string) => void;
  kingdom: KingdomStats; player: PlayerState; day: number; season: Season;
  onAdvanceDay: () => void; onOpenNpcDetail: (npc: NpcCharacter) => void;
  onOpenVitals: () => void; onTreatNpc: (npcId: string, medicineType: string) => void;
  onNavigateTab: (tab: any) => void;
  onConverse?: (npcId: string, choiceType: 'rumor' | 'admin' | 'praise') => void;
  onOpenBondScene?: (scene: BondScene) => void;
}

const FALLBACK_ART = '/characters/vesper_eclipse.png';
const rankObjective = (rank: string) => rank === 'Refugee'
  ? 'Earn 100 Rank Progress and 100 Copper to gain citizenship.'
  : rank === 'Peasant' ? 'Build wealth and reputation to secure land and a merchant permit.'
  : rank === 'Villager' ? 'Grow your influence across Valenreach and enter the court.'
  : 'Increase authority, allies and reputation on the road to the throne.';

export const GachaThroneStage: React.FC<GachaThroneStageProps> = ({
  npcs, activeNpcId, onSelectActiveNpc, kingdom, player, day, season,
  onAdvanceDay, onOpenNpcDetail, onOpenVitals, onNavigateTab, onConverse, onOpenBondScene,
}) => {
  const [speechText, setSpeechText] = useState('');
  const [showRetinue, setShowRetinue] = useState(false);
  const [heartBurst, setHeartBurst] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Home');
  const [feedback, setFeedback] = useState('');
  const companion = npcs.find(n => n.id === activeNpcId) || npcs[0];
  const bondScene = companion ? getNextAvailableBondScene(companion, player.completedBondSceneIds || []) : null;
  const objective = useMemo(() => rankObjective(player.rank), [player.rank]);

  useEffect(() => { if (companion?.greetings?.length) setSpeechText(companion.greetings[0]); }, [companion?.id]);
  if (!companion) return null;

  const notify = (text: string) => { setFeedback(text); window.setTimeout(() => setFeedback(''), 2200); };
  const talk = (choice: 'rumor' | 'admin' | 'praise' = 'praise') => {
    sound.playClick(); onConverse?.(companion.id, choice);
    const text = choice === 'rumor' ? companion.dialogueTopics?.rumor : choice === 'admin' ? companion.dialogueTopics?.workStatus : companion.dialogueTopics?.personal;
    setSpeechText(text || companion.greetings?.[0] || 'The court awaits your command.');
    setHeartBurst(choice === 'praise');
    if (choice === 'praise') window.setTimeout(() => setHeartBurst(false), 700);
    notify(choice === 'praise' ? '+5 Affection  •  +1 Loyalty' : '+10 EXP  •  Information gained');
  };
  const selectTab = (label: string, tab?: string) => { sound.playClick(); setActiveMenu(label); if (tab) onNavigateTab(tab); else notify(`${label} system ready`); };

  return (
    <section className="ks-home relative h-full min-h-0 overflow-hidden text-white">
      <div className="ks-home-bg" style={{ backgroundImage: `url(${CONCEPT_BG})` }} />
      <div className="ks-home-vignette" />
      <aside className="ks-side-rail">
        <button onClick={() => notify('No new mail')}><Mail /><span>Mail</span><i /></button>
        <button onClick={() => selectTab('Quests')}><ScrollText /><span>Quests</span></button>
        <button onClick={() => selectTab('Events')}><Sparkles /><span>Events</span><i /></button>
        <button onClick={() => selectTab('Notice')}><Bell /><span>Notice</span></button>
      </aside>

      <div className="ks-home-content">
        <div className="ks-location-label">VALENREACH <span>•</span> SPRING <span>•</span> DAY {day}</div>
        <div className="ks-hero-character">
          <div className="ks-character-aura" />
          <button className="ks-character-button" onClick={() => { sound.playClick(); setHeartBurst(true); setSpeechText(companion.greetings?.[Math.floor(Math.random() * (companion.greetings?.length || 1))] || 'Welcome back.'); window.setTimeout(() => setHeartBurst(false), 700); }} aria-label={`Talk to ${companion.name}`}>
            {heartBurst && <Heart className="ks-heart-burst" />}
            <img src={companion.portraitUrl || companion.avatarUrl || FALLBACK_ART} alt={companion.name} onError={(e) => { e.currentTarget.src = FALLBACK_ART; }} />
          </button>
          <div className="ks-dialogue-box"><div className="ks-dialogue-name">{companion.name}<span>✦</span></div><p>“{speechText}”</p></div>
        </div>

        <div className="ks-fate-card"><div className="ks-fate-image"><img src={companion.portraitUrl || FALLBACK_ART} alt="" /></div><div><b>Fateful Encounters</b><small>SSR Rate Up</small><em>Until 2026/09/30</em></div></div>
        <div className="ks-matters-card"><div className="ks-card-title">Today's Matters <ChevronRight /></div><p>• Grain prices are rising.</p><p>• A visitor awaits at the council.</p><p>• {companion.name} is waiting in the throne room.</p></div>

        <aside className="ks-companion-panel">
          <div className="ks-companion-head"><div className="ks-companion-avatar"><img src={companion.avatarUrl || companion.portraitUrl || FALLBACK_ART} alt="" /><span /></div><div><small>ACTIVE COMPANION</small><h2>{companion.name}</h2><p>{companion.title}</p></div><button onClick={() => onOpenNpcDetail(companion)}><ChevronRight /></button></div>
          <div className="ks-affection-row"><Heart /><b>{companion.affection || 0}</b><span><i style={{ width: `${Math.min(100, companion.affection || 0)}%` }} /></span><small>{companion.affection || 0}/100</small></div>
          <div className="ks-tags"><span>Noble</span><span>Gentle</span><span>Devoted</span></div>
          <div className="ks-quote">“As long as you are here...<br />I can endure anything.”</div>
          <div className="ks-companion-actions"><button onClick={() => talk('praise')}><MessageCircle />Talk</button><button onClick={() => notify('Gift selection opened')}><Gift />Gift</button><button className="active" onClick={() => bondScene ? onOpenBondScene?.(bondScene) : talk('praise')}><Heart />Bond</button></div>
          <div className="ks-profile-links"><button onClick={() => onOpenNpcDetail(companion)}><UserRound /> Profile</button><button onClick={() => notify('Outfits are being prepared')}><Sparkles /> Outfits</button><button onClick={() => bondScene ? onOpenBondScene?.(bondScene) : notify('No bond story ready')}><Heart /> Bond Story</button><button onClick={() => notify('Voice line played')}><Volume2 /> Voice</button><button onClick={() => notify('More character options')}><Search /> More</button></div>
          <div className="ks-retinue-head"><span>Retinue</span><b>{npcs.findIndex(n => n.id === companion.id) + 1}/{npcs.length}</b></div>
          <div className="ks-retinue-strip">{npcs.slice(0, 5).map(npc => <button key={npc.id} className={npc.id === companion.id ? 'selected' : ''} onClick={() => { sound.playClick(); onSelectActiveNpc(npc.id); }}><img src={npc.avatarUrl || npc.portraitUrl || FALLBACK_ART} alt={npc.name} /></button>)}<button className="retinue-next" onClick={() => setShowRetinue(true)}><ChevronRight /></button></div>
        </aside>
      </div>

      <nav className="ks-bottom-dock">
        <div className="ks-bottom-tabs">
          {([['Home', Castle], ['Kingdom', Map], ['Characters', Users], ['Work', Swords], ['Market', ShoppingBag], ['Council', Scale], ['Summon', Gem], ['Inventory', Backpack]] as const).map(([label, Icon]) => (
            <button key={label} className={activeMenu === label ? 'selected' : ''} onClick={() => selectTab(label, label === 'Home' ? 'throne' : label === 'Kingdom' ? 'kingdom' : label === 'Characters' ? 'npcs' : label === 'Work' ? 'work' : label === 'Market' ? 'market' : label === 'Council' ? 'council' : undefined)}><Icon /><span>{label}</span>{label === 'Characters' && <i />}</button>
          ))}
        </div>
        <button className="ks-next-day" onClick={() => { sound.playTurnEnd(); onAdvanceDay(); }}><CalendarDays /><span>Next Day</span></button>
      </nav>

      <div className="ks-ambition-strip"><Award /><span>Current Ambition</span><b>{objective}</b></div>
      <button className="ks-retinue-button" onClick={() => setShowRetinue(true)}><Users /> Retinue <b>{npcs.length}</b></button>
      {feedback && <div className="ks-feedback">{feedback}</div>}

      {showRetinue && <div className="ks-modal-backdrop" onClick={() => setShowRetinue(false)}><div className="ks-retinue-modal" onClick={e => e.stopPropagation()}><header><div><small>ROYAL RETINUE</small><h3>Choose Companion</h3></div><button onClick={() => setShowRetinue(false)}><X /></button></header><div className="ks-retinue-grid">{npcs.map(npc => <button key={npc.id} onClick={() => { onSelectActiveNpc(npc.id); setShowRetinue(false); }} className={npc.id === companion.id ? 'selected' : ''}><img src={npc.avatarUrl || npc.portraitUrl || FALLBACK_ART} alt="" /><b>{npc.name}</b><small>{npc.role}</small></button>)}</div></div></div>}
    </section>
  );
};
