import React, { useState } from 'react';
import { NpcCharacter, PlayerState, ResourceItem, BondScene } from '../types/game';
import { getNextAvailableBondScene } from '../data/bondScenesData';
import { AnimeAvatar } from './AnimeAvatar';
import { sound } from '../utils/audio';
import { 
  Heart, 
  Activity, 
  Sparkles, 
  Gift, 
  AlertTriangle, 
  CheckCircle2, 
  MessageSquare,
  Shield,
  Search,
  Droplets,
  Wheat,
  Fish,
  Apple,
  Shirt,
  Hammer,
  ChevronRight,
  Play
} from 'lucide-react';

interface NpcManagementViewProps {
  npcs: NpcCharacter[];
  resources: Record<string, ResourceItem>;
  player: PlayerState;
  onSelectNpc: (npc: NpcCharacter) => void;
  onTreatNpc: (npcId: string, medicineType: string) => void;
  onAssistNpc: (npcId: string) => void;
  onOpenBondScene?: (scene: BondScene) => void;
}

export const NpcManagementView: React.FC<NpcManagementViewProps> = ({
  npcs,
  resources,
  player,
  onSelectNpc,
  onTreatNpc,
  onAssistNpc,
  onOpenBondScene,
}) => {
  const [filter, setFilter] = useState<'all' | 'distress' | 'production' | 'council'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Resource Icon mapper
  const getResourceIcon = (resId: string) => {
    switch (resId) {
      case 'water': return <Droplets className="w-4 h-4 text-cyan-400" />;
      case 'grain': return <Wheat className="w-4 h-4 text-amber-400" />;
      case 'fish': return <Fish className="w-4 h-4 text-sky-400" />;
      case 'fruits': return <Apple className="w-4 h-4 text-emerald-400" />;
      case 'clothing': return <Shirt className="w-4 h-4 text-purple-400" />;
      case 'tools': return <Hammer className="w-4 h-4 text-orange-400" />;
      case 'medicine': return <Sparkles className="w-4 h-4 text-pink-400" />;
      case 'security': return <Shield className="w-4 h-4 text-indigo-400" />;
      default: return <Activity className="w-4 h-4 text-amber-400" />;
    }
  };

  // Filtered NPCs
  const filteredNpcs = npcs.filter(npc => {
    const matchesSearch = 
      npc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      npc.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      npc.district.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (filter === 'distress') {
      return npc.status === 'Sick' || npc.status === 'Injured' || npc.status === 'Critical';
    }
    if (filter === 'production') {
      return ['water', 'grain', 'fish', 'fruits', 'clothing', 'tools', 'medicine'].includes(npc.managedResource);
    }
    if (filter === 'council') {
      return ['security', 'piety', 'prosperity', 'contraband'].includes(npc.managedResource);
    }
    return true;
  });

  const sickNpcCount = npcs.filter(n => n.status === 'Sick' || n.status === 'Injured' || n.status === 'Critical').length;

  return (
    <div className="space-y-3 pb-20">
      {/* Overview Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-3.5 border border-amber-500/30 shadow-lg">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-black text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-amber-400" />
              Kingdom Officials & Production Line
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Each official oversees a vital kingdom supply source. If an official falls ill or is injured, their production collapses!
            </p>
          </div>
          {sickNpcCount > 0 && (
            <div className="shrink-0 flex items-center gap-1 bg-rose-950/80 border border-rose-500 text-rose-300 px-2.5 py-1 rounded-xl text-xs font-bold animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{sickNpcCount} in Distress</span>
            </div>
          )}
        </div>

        {/* Filter Pills */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => { setFilter('all'); sound.playClick(); }}
            className={`px-3 py-1 rounded-lg font-bold transition-all whitespace-nowrap ${
              filter === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All Officials ({npcs.length})
          </button>
          <button
            onClick={() => { setFilter('distress'); sound.playClick(); }}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg font-bold transition-all whitespace-nowrap ${
              filter === 'distress'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'bg-slate-800 text-rose-300 hover:bg-slate-700'
            }`}
          >
            Distressed ({sickNpcCount})
          </button>
          <button
            onClick={() => { setFilter('production'); sound.playClick(); }}
            className={`px-3 py-1 rounded-lg font-bold transition-all whitespace-nowrap ${
              filter === 'production'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Supply Chains (Food & Craft)
          </button>
          <button
            onClick={() => { setFilter('council'); sound.playClick(); }}
            className={`px-3 py-1 rounded-lg font-bold transition-all whitespace-nowrap ${
              filter === 'council'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Citadel & High Council
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, role, or district..."
          className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
        />
      </div>

      {/* NPC Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {filteredNpcs.map((npc) => {
          const res = resources[npc.managedResource];
          const isSick = npc.status === 'Sick' || npc.status === 'Critical';
          const isInjured = npc.status === 'Injured';
          const isDistressed = isSick || isInjured;
          const actualOutput = Math.round(npc.baseProductionPerDay * npc.efficiencyModifier);
          const hasMedicine = (player.inventory['medicine'] || 0) > 0;
          const hasHerbs = (player.inventory['herbs'] || 0) > 0;
          const readyBondScene = getNextAvailableBondScene(npc, player.completedBondSceneIds || []);

          return (
            <div
              key={npc.id}
              className={`relative rounded-2xl p-3 border transition-all duration-200 ${
                isDistressed
                  ? 'bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-950 border-rose-500/50 shadow-md shadow-rose-950/30'
                  : 'bg-gradient-to-br from-slate-900/90 via-slate-900 to-indigo-950/30 border-slate-800 hover:border-amber-500/40'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Anime Avatar with Live2D & Gacha Aesthetic */}
                <div 
                  className="cursor-pointer shrink-0 transition-transform active:scale-95" 
                  onClick={() => { sound.playClick(); onSelectNpc(npc); }}
                >
                  <AnimeAvatar
                    seed={npc.avatarSeed}
                    name={npc.name}
                    avatarUrl={npc.avatarUrl}
                    portraitUrl={npc.portraitUrl}
                    backgroundUrl={npc.backgroundUrl}
                    status={npc.status}
                    size="lg"
                    showAura={isDistressed}
                  />
                </div>

                {/* Info Column */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <div className="truncate">
                      <h3 className="text-sm font-extrabold text-white flex items-center gap-1.5 truncate">
                        {npc.name}
                        <span className="text-[11px] font-normal text-amber-300 truncate">
                          "{npc.title}"
                        </span>
                      </h3>
                      <p className="text-[11px] text-slate-400 truncate">{npc.role}</p>
                    </div>

                    {/* Affection Heart */}
                    <div 
                      onClick={() => {
                        if (readyBondScene && onOpenBondScene) {
                          sound.playHolyChime();
                          onOpenBondScene(readyBondScene);
                        }
                      }}
                      className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold shrink-0 transition-all ${
                        readyBondScene
                          ? 'bg-rose-600 text-white border border-rose-400 cursor-pointer animate-pulse shadow-md shadow-rose-900/40'
                          : 'bg-rose-950/50 border border-rose-500/30 text-rose-300'
                      }`}
                      title={readyBondScene ? '❤️ Bond Story Ready! Click to experience.' : 'Affection Level'}
                    >
                      <Heart className={`w-3 h-3 ${readyBondScene ? 'fill-white text-white' : 'text-rose-400 fill-rose-500/40'}`} />
                      <span>{npc.affection}%</span>
                      {readyBondScene && <span className="text-[9px] font-black tracking-tight">STORY</span>}
                    </div>
                  </div>

                  {/* Health Bar & Efficiency Gauge */}
                  <div className="mt-2 space-y-1 text-[10px]">
                    <div className="flex justify-between text-slate-300">
                      <span>Condition: <strong className={isDistressed ? 'text-rose-400 font-bold' : 'text-emerald-400'}>{npc.status}</strong></span>
                      <span className="font-mono">{npc.health}/{npc.maxHealth} HP</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isDistressed ? 'bg-gradient-to-r from-rose-600 to-amber-500' : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                        }`}
                        style={{ width: `${(npc.health / npc.maxHealth) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Managed Supply Line Info */}
                  <div className="mt-2 rounded-lg bg-slate-950/70 p-2 border border-slate-800/80 text-[11px] flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {getResourceIcon(npc.managedResource)}
                      <div>
                        <span className="text-slate-300 font-semibold block leading-tight">
                          {res ? res.name : npc.managedResource.toUpperCase()}
                        </span>
                        <span className="text-[9px] text-slate-400">{npc.facility}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`font-mono font-black ${isDistressed ? 'text-rose-400' : 'text-amber-300'}`}>
                        +{actualOutput} {res?.unit || '/day'}
                      </span>
                      <span className="block text-[9px] text-slate-400">
                        ({Math.round(npc.efficiencyModifier * 100)}% output)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Distress Warning Banner */}
              {isDistressed && (
                <div className="mt-2.5 rounded-lg bg-rose-950/60 border border-rose-500/40 p-2 flex items-start gap-2 text-[11px] text-rose-200">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <strong className="block text-rose-300">
                      Crisis: {npc.name} is {npc.status}!
                    </strong>
                    <span>
                      Daily supply reduced by {100 - Math.round(npc.efficiencyModifier * 100)}%. Provide alchemical treatment or assist their shift to prevent kingdom shortages!
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons Row */}
              <div className="mt-2.5 flex items-center gap-1.5 text-xs">
                {/* Talk / Inspect */}
                <button
                  onClick={() => { sound.playClick(); onSelectNpc(npc); }}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                  <span>Converse</span>
                </button>

                {/* Bond Story Ready Button */}
                {readyBondScene && (
                  <button
                    onClick={() => {
                      sound.playHolyChime();
                      if (onOpenBondScene) onOpenBondScene(readyBondScene);
                    }}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-black border border-rose-400 shadow-md shadow-rose-950/40 animate-pulse transition-all"
                    title={`Bond Chapter Ready: ${readyBondScene.title}`}
                  >
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    <span>Story (Act {readyBondScene.episodeNumber})</span>
                  </button>
                )}

                {/* If Sick/Injured, Cure Button */}
                {isDistressed && (
                  <button
                    onClick={() => {
                      if (hasMedicine) {
                        sound.playPotion();
                        onTreatNpc(npc.id, 'medicine');
                      } else if (hasHerbs) {
                        sound.playPotion();
                        onTreatNpc(npc.id, 'herbs');
                      } else {
                        sound.playAlert();
                        alert(`You need Elixir of Vigor or Wild Herbs to treat ${npc.name}! Purchase them at the Bazaar or Apothecary.`);
                      }
                    }}
                    className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg font-bold border transition-all ${
                      hasMedicine || hasHerbs
                        ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white border-pink-400 shadow-md shadow-rose-900/40 hover:scale-[1.02]'
                        : 'bg-slate-800 text-slate-400 border-slate-700 opacity-70'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-pink-200" />
                    <span>Treat {hasMedicine ? '(Elixir)' : hasHerbs ? '(Herbs)' : '(No Meds)'}</span>
                  </button>
                )}

                {/* Assist Work Shift */}
                <button
                  onClick={() => {
                    sound.playWork();
                    onAssistNpc(npc.id);
                  }}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold border border-amber-500/40 transition-colors"
                  title="Spend 15 Energy to boost their facility's yield today"
                >
                  <Hammer className="w-3.5 h-3.5 text-amber-400" />
                  <span>Assist Shift</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
