import React, { useState } from 'react';
import { NpcCharacter, PlayerState, ResourceItem, BondScene } from '../types/game';
import { sound } from '../utils/audio';
import { getBondScenesForNpc, hasAvailableBondScene } from '../data/bondScenesData';
import { AnimeCharacterPortrait } from './AnimeCharacterPortrait';
import { 
  X, 
  Heart, 
  MessageSquare, 
  Gift, 
  Sparkles, 
  Hammer, 
  AlertTriangle, 
  Shield, 
  CheckCircle2,
  Leaf,
  Maximize2,
  BookOpen,
  Activity,
  Play,
  Award,
  ChevronRight
} from 'lucide-react';

interface NpcDetailModalProps {
  npc: NpcCharacter;
  player: PlayerState;
  resources: Record<string, ResourceItem>;
  onClose: () => void;
  onTreatNpc: (npcId: string, medicineType: string) => void;
  onGiveGift: (npcId: string, itemId: string) => void;
  onAssistNpc: (npcId: string) => void;
  onOpenBondScene?: (scene: BondScene) => void;
}

export const NpcDetailModal: React.FC<NpcDetailModalProps> = ({
  npc,
  player,
  resources,
  onClose,
  onTreatNpc,
  onGiveGift,
  onAssistNpc,
  onOpenBondScene,
}) => {
  const [activeTab, setActiveTab] = useState<'dialogue' | 'care' | 'gift' | 'assist' | 'bond' | 'lore'>('dialogue');
  const [selectedDialogue, setSelectedDialogue] = useState<string>(npc.greetings[0]);
  const [isFullPortraitView, setIsFullPortraitView] = useState(false);
  const [voiceTapCount, setVoiceTapCount] = useState(0);

  const isDistressed = npc.status === 'Sick' || npc.status === 'Injured' || npc.status === 'Critical';
  const completedBondIds = player.completedBondSceneIds || [];
  const npcBondScenes = getBondScenesForNpc(npc.id);
  const hasBondReady = hasAvailableBondScene(npc, completedBondIds);

  const hasMedicine = (player.inventory['medicine'] || 0) > 0;
  const hasHerbs = (player.inventory['herbs'] || 0) > 0;

  const handlePortraitTap = () => {
    sound.playClick();
    const quotes = [npc.dialogueTopics.personal, ...npc.greetings];
    const nextQuote = quotes[(voiceTapCount + 1) % quotes.length];
    setSelectedDialogue(nextQuote);
    setVoiceTapCount((prev) => prev + 1);
  };

  const standingArtUrl = npc.portraitUrl || npc.avatarUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Optional Lightbox Full-screen Portrait View */}
      {isFullPortraitView && (
        <div 
          className="fixed inset-0 z-60 bg-black/95 flex flex-col items-center justify-center p-4 cursor-pointer animate-in zoom-in-95 duration-200"
          onClick={() => setIsFullPortraitView(false)}
        >
          <button 
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 text-white hover:bg-slate-700"
            onClick={() => setIsFullPortraitView(false)}
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative w-full max-w-xl h-[82vh] flex items-center justify-center">
            <AnimeCharacterPortrait
              seed={npc.avatarSeed}
              name={npc.name}
              status={npc.status}
              size="full"
              showBackground={true}
              showAura={true}
              live2d={true}
              portraitUrl={npc.portraitUrl}
              className="w-full h-full rounded-3xl border-2 border-amber-500/40 shadow-2xl"
            />
          </div>
          <div className="mt-3 text-center">
            <h3 className="text-xl font-black text-amber-300">{npc.name}</h3>
            <p className="text-xs text-slate-400">"{npc.title}" • Tap anywhere to return</p>
          </div>
        </div>
      )}

      <div className="relative w-full max-w-5xl rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-black border-2 border-amber-500/50 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 px-4 py-2.5 border-b border-amber-500/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-300">
              Kingdom Audience
            </span>
            <span className="text-[10px] text-slate-400">• {npc.district}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => { sound.playClick(); setIsFullPortraitView(true); }}
              title="Expand full standing portrait"
              className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => { sound.playClick(); onClose(); }}
              className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body: Left Standing Portrait + Right Dossier */}
        <div className="p-3 sm:p-4 overflow-y-auto flex-1 flex flex-col md:flex-row gap-5 items-stretch">
          {/* Left Column: Enlarged Full Standing Gacha Portrait Showcase */}
          <div className="w-full md:w-80 lg:w-96 shrink-0 flex flex-col items-center">
            <div 
              className="relative w-full h-84 sm:h-[480px] md:h-[560px] rounded-2xl overflow-hidden border-2 border-amber-500/40 bg-gradient-to-b from-slate-900 via-slate-950 to-indigo-950/40 shadow-2xl cursor-pointer select-none group"
              onClick={handlePortraitTap}
              title="Tap portrait for voice line"
            >
              {/* Layer 1: Scenic District Backdrop (if available) */}
              {npc.backgroundUrl && (
                <div className="absolute inset-0 pointer-events-none">
                  <img
                    src={npc.backgroundUrl}
                    alt=""
                    className="w-full h-full object-cover scale-110 blur-[1.5px] brightness-40 contrast-110 opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/80" />
                </div>
              )}

              {/* Layer 2: Custom High-Fantasy Anime Character Artwork */}
              <AnimeCharacterPortrait
                seed={npc.avatarSeed}
                name={npc.name}
                status={npc.status}
                size="full"
                showBackground={!npc.backgroundUrl}
                showAura={true}
                live2d={true}
                portraitUrl={npc.portraitUrl}
                className="w-full h-full group-hover:scale-105 transition-transform duration-500"
              />

              {/* Tap Prompt Overlay */}
              <div className="absolute top-3 left-3 z-30 flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-amber-500/40 text-[10px] font-bold text-amber-300 shadow-md">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Tap for Dialogue</span>
              </div>

              {/* Status Badge Tag at bottom */}
              <div className="absolute bottom-2 left-2 right-2 z-30 flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-amber-500/30 text-[11px]">
                <span className="text-slate-300 font-medium truncate">{npc.facility}</span>
                <span className={`font-bold shrink-0 ${isDistressed ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {npc.status}
                </span>
              </div>
            </div>

            <button
              onClick={() => { sound.playClick(); setIsFullPortraitView(true); }}
              className="mt-2.5 text-xs text-amber-400/90 hover:text-amber-300 font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Inspect Full Standing Art</span>
            </button>
          </div>

          {/* Right Column: Character Dossier, Dialogue & Tabs */}
          <div className="flex-1 min-w-0 flex flex-col space-y-3">
            {/* Header: Name, Title, Affection & Health */}
            <div className="bg-slate-900/90 p-3 rounded-2xl border border-amber-500/20">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-black text-white leading-tight">
                    {npc.name}
                  </h3>
                  <span className="text-xs text-amber-300 font-medium block">
                    "{npc.title}" • {npc.role}
                  </span>
                </div>

                {/* Affection Badge */}
                <div className="flex items-center gap-1 text-[11px] font-bold text-rose-400 bg-rose-950/60 px-2.5 py-1 rounded-full border border-rose-500/30 shrink-0">
                  <Heart className="w-3.5 h-3.5 fill-rose-400" />
                  <span>{npc.affection}% Bond</span>
                </div>
              </div>

              {/* Status Bars: Health & Loyalty */}
              <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <div className="flex justify-between text-slate-400 text-[10px] mb-0.5">
                    <span>Health</span>
                    <span className={isDistressed ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                      {npc.health}/100 HP
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        isDistressed ? 'bg-rose-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.max(0, Math.min(100, npc.health))}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 text-[10px] mb-0.5">
                    <span>Efficiency</span>
                    <span className="text-amber-300 font-bold">
                      {Math.round(npc.efficiencyModifier * 100)}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(0, Math.min(100, npc.efficiencyModifier * 100))}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Speech Bubble: Spoken Dialogue */}
            <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950/50 p-3.5 border border-amber-500/30 text-xs text-amber-100 italic leading-relaxed shadow-inner">
              <div className="absolute -top-1.5 left-8 w-3 h-3 bg-slate-900 border-t border-l border-amber-500/30 rotate-45" />
              "{selectedDialogue}"
            </div>

            {/* Bond Event Quick Banner */}
            {hasBondReady && (
              <div 
                onClick={() => {
                  const scene = npcBondScenes.find((s) => !completedBondIds.includes(s.id) && npc.affection >= s.requiredAffection);
                  if (scene && onOpenBondScene) {
                    sound.playHolyChime();
                    onOpenBondScene(scene);
                  } else {
                    setActiveTab('bond');
                  }
                }}
                className="cursor-pointer rounded-2xl bg-gradient-to-r from-rose-950/80 via-pink-950/60 to-slate-900 border border-rose-500/60 p-2.5 flex items-center justify-between shadow-lg shadow-rose-950/40 hover:border-rose-400 transition-all group"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-xl bg-rose-500/20 text-rose-400">
                    <Heart className="w-4 h-4 fill-rose-500 animate-pulse" />
                  </div>
                  <div>
                    <span className="font-black text-rose-200 text-xs block group-hover:text-rose-100">
                      ❤️ Soulbound Story Available!
                    </span>
                    <span className="text-[10px] text-slate-300">
                      Affection threshold reached. Tap to experience visual novel story.
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-black text-rose-300 bg-rose-900/60 px-2.5 py-1 rounded-xl border border-rose-500/40 group-hover:scale-105 transition-transform">
                  <Play className="w-3 h-3 fill-rose-300" />
                  <span>Play</span>
                </div>
              </div>
            )}

            {/* Action Navigation Tabs */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => { setActiveTab('dialogue'); sound.playClick(); }}
                className={`flex-1 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1 ${
                  activeTab === 'dialogue'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-3 h-3" />
                <span>Talk</span>
              </button>
              <button
                onClick={() => { setActiveTab('care'); sound.playClick(); }}
                className={`flex-1 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1 ${
                  activeTab === 'care'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : isDistressed
                    ? 'text-rose-400 font-extrabold animate-pulse'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Leaf className="w-3 h-3" />
                <span>Cure {isDistressed && '(!)'}</span>
              </button>
              <button
                onClick={() => { setActiveTab('gift'); sound.playClick(); }}
                className={`flex-1 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1 ${
                  activeTab === 'gift'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Gift className="w-3 h-3" />
                <span>Gift</span>
              </button>
              <button
                onClick={() => { setActiveTab('assist'); sound.playClick(); }}
                className={`flex-1 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1 ${
                  activeTab === 'assist'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Hammer className="w-3 h-3" />
                <span>Assist</span>
              </button>
              <button
                onClick={() => { setActiveTab('bond'); sound.playClick(); }}
                className={`relative flex-1 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1 ${
                  activeTab === 'bond'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : hasBondReady
                    ? 'text-rose-300 font-black animate-pulse bg-rose-950/40 border border-rose-500/50'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Heart className={`w-3 h-3 ${hasBondReady ? 'fill-rose-500 text-rose-400' : ''}`} />
                <span>Bond {hasBondReady && '(!)'}</span>
              </button>
              <button
                onClick={() => { setActiveTab('lore'); sound.playClick(); }}
                className={`flex-1 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1 ${
                  activeTab === 'lore'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-3 h-3" />
                <span>Lore</span>
              </button>
            </div>

            {/* Tab 1: Talk & Dialogue Topics */}
            {activeTab === 'dialogue' && (
              <div className="space-y-1.5 text-xs">
                <button
                  onClick={() => {
                    sound.playClick();
                    setSelectedDialogue(npc.dialogueTopics.workStatus);
                  }}
                  className="w-full text-left p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-amber-400/40 transition-colors flex items-center justify-between"
                >
                  <span>"How is your production and facility running?"</span>
                  <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setSelectedDialogue(npc.dialogueTopics.personal);
                  }}
                  className="w-full text-left p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-amber-400/40 transition-colors flex items-center justify-between"
                >
                  <span>"Tell me about yourself..."</span>
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setSelectedDialogue(npc.dialogueTopics.rumor);
                  }}
                  className="w-full text-left p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-amber-400/40 transition-colors flex items-center justify-between"
                >
                  <span>"Heard any rumors or intrigues in the kingdom?"</span>
                  <Shield className="w-3.5 h-3.5 text-indigo-400" />
                </button>

                {npc.dialogueTopics.pleaForHelp && isDistressed && (
                  <button
                    onClick={() => {
                      sound.playAlert();
                      setSelectedDialogue(npc.dialogueTopics.pleaForHelp!);
                    }}
                    className="w-full text-left p-2.5 rounded-xl bg-rose-950/70 hover:bg-rose-900/70 text-rose-200 border border-rose-500/50 transition-colors flex items-center justify-between font-bold"
                  >
                    <span>"Are you in pain? What ails you?!"</span>
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  </button>
                )}
              </div>
            )}

            {/* Tab 2: Medical Care */}
            {activeTab === 'care' && (
              <div className="space-y-2.5 text-xs">
                <div className="rounded-xl bg-slate-900 p-3 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Diagnosis & Health Condition
                  </span>
                  <p className="text-xs text-white mt-1">
                    Current Status: <strong className={isDistressed ? 'text-rose-400' : 'text-emerald-400'}>{npc.status}</strong>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {isDistressed
                      ? `${npc.name} is incapacitated or suffering from illness. Output is reduced to ${Math.round(npc.efficiencyModifier * 100)}%. Treating them immediately restores production to 100% and strengthens kingdom stability.`
                      : `${npc.name} is in peak physical health! No treatment is currently needed.`}
                  </p>
                </div>

                {isDistressed && (
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        if (hasMedicine) {
                          sound.playPotion();
                          onTreatNpc(npc.id, 'medicine');
                        } else {
                          sound.playAlert();
                          alert("You have no Elixirs of Vigor! Purchase at the Bazaar or brew with Elena.");
                        }
                      }}
                      disabled={!hasMedicine}
                      className={`w-full p-3 rounded-xl font-bold flex items-center justify-between transition-all ${
                        hasMedicine
                          ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md hover:scale-[1.01]'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        <span>Administer Elixir of Vigor</span>
                      </div>
                      <span className="text-[10px] font-mono">
                        In Bag: {player.inventory['medicine'] || 0}
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        if (hasHerbs) {
                          sound.playPotion();
                          onTreatNpc(npc.id, 'herbs');
                        } else {
                          sound.playAlert();
                          alert("You have no Wild Herbs! Forage with Lyra or buy at the Bazaar.");
                        }
                      }}
                      disabled={!hasHerbs}
                      className={`w-full p-3 rounded-xl font-bold flex items-center justify-between transition-all ${
                        hasHerbs
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md hover:scale-[1.01]'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Leaf className="w-4 h-4" />
                        <span>Apply Wild Herbal Poultice</span>
                      </div>
                      <span className="text-[10px] font-mono">
                        In Bag: {player.inventory['herbs'] || 0}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Gift Giving */}
            {activeTab === 'gift' && (
              <div className="space-y-2 text-xs">
                <p className="text-[11px] text-slate-400">
                  {npc.name}'s favorite gifts:{' '}
                  <strong className="text-amber-300">{npc.favoriteGifts.join(', ')}</strong>.
                  Presenting a gift raises affection and boosts loyalty.
                </p>

                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {Object.entries(player.inventory)
                    .filter(([_, qty]) => Number(qty) > 0)
                    .map(([itemId, qty]) => {
                      const isFav = npc.favoriteGifts.includes(itemId);

                      return (
                        <button
                          key={itemId}
                          onClick={() => {
                            sound.playCoins();
                            onGiveGift(npc.id, itemId);
                          }}
                          className={`p-2 rounded-xl text-left border flex items-center justify-between transition-all ${
                            isFav
                              ? 'bg-amber-950/50 border-amber-500 text-amber-200 hover:bg-amber-900/60'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <div>
                            <span className="font-bold text-xs capitalize block">{itemId}</span>
                            <span className="text-[10px] text-slate-400">Have: {qty}</span>
                          </div>
                          {isFav && <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
                        </button>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Tab 4: Assist Shift */}
            {activeTab === 'assist' && (
              <div className="space-y-2 text-xs">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <h4 className="font-bold text-white text-xs">Work Shift Alongside {npc.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Spend 20 Energy to work together at {npc.facility}. This yields +30% kingdom output today and strengthens your bond by +5 Affection.
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (player.energy >= 20) {
                      sound.playWork();
                      onAssistNpc(npc.id);
                    } else {
                      sound.playAlert();
                      alert("You need at least 20 Energy to assist this shift!");
                    }
                  }}
                  disabled={player.energy < 20}
                  className={`w-full py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
                    player.energy >= 20
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 hover:scale-[1.01]'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Hammer className="w-3.5 h-3.5" />
                  <span>Assist Shift (Costs 20 Energy)</span>
                </button>
              </div>
            )}

            {/* Tab 5: Bond Scenes (Visual Novel Chapters) */}
            {activeTab === 'bond' && (
              <div className="space-y-3 text-xs">
                {/* Overview Header */}
                <div className="bg-gradient-to-r from-rose-950/60 to-slate-900 p-3 rounded-2xl border border-rose-500/30">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-rose-200">
                      <Heart className="w-4 h-4 fill-rose-500 text-rose-400" />
                      <span>Soulbound Covenant & Chapters</span>
                    </div>
                    <span className="font-mono text-[11px] font-black text-rose-300">
                      {npc.affection || 0}/100 Affection
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
                    Deepen your connection with {npc.name} through gifting, holding royal audience, and assisting work shifts to unlock intimate visual novel stories and permanent sovereign blessings.
                  </p>

                  {/* Affection Milestones Bar */}
                  <div className="relative h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-rose-500 to-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(0, Math.min(100, npc.affection || 0))}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-1">
                    <span>Act I (20)</span>
                    <span>Act II (45)</span>
                    <span>Act III (75)</span>
                    <span>Oath (100)</span>
                  </div>
                </div>

                {/* Bond Episodes List */}
                <div className="space-y-2">
                  <h4 className="font-extrabold text-amber-300 text-xs flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Story Chapters</span>
                  </h4>

                  {npcBondScenes.length === 0 ? (
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center text-slate-400 text-xs">
                      <Heart className="w-6 h-6 text-slate-600 mx-auto mb-1.5" />
                      <span>No bond stories recorded for {npc.name} yet. Deepen their affection to strengthen kingdom ties!</span>
                    </div>
                  ) : (
                    npcBondScenes.map((scene) => {
                      const isDone = completedBondIds.includes(scene.id);
                      const isUnlocked = npc.affection >= scene.requiredAffection;

                      return (
                        <div
                          key={scene.id}
                          className={`p-3 rounded-2xl border transition-all ${
                            isDone
                              ? 'bg-slate-900/70 border-emerald-500/40 text-slate-200'
                              : isUnlocked
                              ? 'bg-gradient-to-r from-rose-950/70 via-slate-900 to-amber-950/40 border-rose-500/70 shadow-lg shadow-rose-950/40'
                              : 'bg-slate-950/60 border-slate-800/80 opacity-70 text-slate-400'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                                  isDone 
                                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                                    : isUnlocked
                                    ? 'bg-rose-900 text-rose-200 border border-rose-400'
                                    : 'bg-slate-800 text-slate-400'
                                }`}>
                                  Act {scene.episodeNumber}
                                </span>
                                <h5 className="font-extrabold text-white text-xs">
                                  {scene.title}
                                </h5>
                              </div>
                              <span className="text-[10px] text-slate-400 block mt-0.5">
                                📍 {scene.location}
                              </span>
                            </div>

                            {/* Action Button */}
                            {isUnlocked ? (
                              <button
                                onClick={() => {
                                  sound.playHolyChime();
                                  if (onOpenBondScene) onOpenBondScene(scene);
                                }}
                                className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1 transition-all shadow-md active:scale-95 ${
                                  isDone
                                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600'
                                    : 'bg-gradient-to-r from-rose-500 to-amber-400 hover:from-rose-400 hover:to-amber-300 text-slate-950 shadow-rose-900/40 animate-pulse'
                                }`}
                              >
                                <Play className="w-3 h-3 fill-current" />
                                <span>{isDone ? 'Replay' : 'Play Story'}</span>
                              </button>
                            ) : (
                              <div className="text-right">
                                <span className="text-[10px] text-rose-400 font-bold block">
                                  Requires {scene.requiredAffection} Affection
                                </span>
                                <span className="text-[9px] text-slate-500">
                                  (Need {scene.requiredAffection - (npc.affection || 0)} more)
                                </span>
                              </div>
                            )}
                          </div>

                          <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
                            {scene.synopsis}
                          </p>

                          {/* Reward Line */}
                          <div className="pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[10px] text-amber-300/90">
                            <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>
                              <strong>Reward:</strong> {scene.reward.title} — {scene.reward.description}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* Tab 6: Lore & Kingdom Role */}
            {activeTab === 'lore' && (
              <div className="space-y-2.5 text-xs bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                <div>
                  <h4 className="font-bold text-amber-300 text-xs flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    <span>Backstory & Heritage</span>
                  </h4>
                  <p className="text-slate-300 text-[11px] leading-relaxed mt-1">
                    {npc.backstory}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[11px] space-y-1">
                  <p className="text-slate-400">
                    Personality: <strong className="text-slate-200 font-normal">{npc.personality}</strong>
                  </p>
                  <p className="text-slate-400">
                    Managed Facility: <strong className="text-slate-200">{npc.facility}</strong> in <strong className="text-amber-300">{npc.district}</strong>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
