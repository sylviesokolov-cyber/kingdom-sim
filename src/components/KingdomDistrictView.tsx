import React, { useState } from 'react';
import { KingdomStats, NpcCharacter, ResourceItem } from '../types/game';
import { AnimeAvatar } from './AnimeAvatar';
import { sound } from '../utils/audio';
import { 
  Building2, 
  Droplets, 
  Wheat, 
  Fish, 
  Apple, 
  Hammer, 
  Sparkles, 
  Shield, 
  Coins, 
  AlertTriangle, 
  ArrowRight,
  TrendingUp,
  HeartPulse
} from 'lucide-react';

interface KingdomDistrictViewProps {
  kingdom: KingdomStats;
  npcs: NpcCharacter[];
  resources: Record<string, ResourceItem>;
  onSelectNpc: (npc: NpcCharacter) => void;
}

export const KingdomDistrictView: React.FC<KingdomDistrictViewProps> = ({
  kingdom,
  npcs,
  resources,
  onSelectNpc,
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');

  const districts = [
    {
      id: 'aqueduct',
      name: 'Upper Mountain Springs',
      subtitle: 'The Grand Aqueduct',
      npcId: 'mira',
      managedResource: 'water',
      icon: <Droplets className="w-5 h-5 text-cyan-400" />,
      color: 'from-cyan-950/80 to-slate-900 border-cyan-500/40',
      description: 'Ancient stone viaducts channel pure glacial runoff into city cisterns.',
      vitalImpact: 'Supplies 100% of urban drinking water and sanitation.',
      outputRate: '120 jugs/day',
    },
    {
      id: 'farms',
      name: 'Sunmill Farmlands',
      subtitle: 'Golden Fields & Silos',
      npcId: 'caren',
      managedResource: 'grain',
      icon: <Wheat className="w-5 h-5 text-amber-400" />,
      color: 'from-amber-950/80 to-slate-900 border-amber-500/40',
      description: 'Vast amber fields of wheat and barley that supply all kingdom bread.',
      vitalImpact: 'Fills the Royal Granary to prevent winter famines.',
      outputRate: '95 sacks/day',
    },
    {
      id: 'docks',
      name: 'Whistling Docks',
      subtitle: 'River Harbor & Basin',
      npcId: 'bran',
      managedResource: 'fish',
      icon: <Fish className="w-5 h-5 text-sky-400" />,
      color: 'from-sky-950/80 to-slate-900 border-sky-500/40',
      description: 'River cutters net silver trout daily, provisioning poor soup kitchens.',
      vitalImpact: 'Supplements staple grains with essential proteins.',
      outputRate: '75 crates/day',
    },
    {
      id: 'orchards',
      name: 'Suncrest Orchards & Glades',
      subtitle: 'Royal Greenhouses & Woods',
      npcId: 'lyra',
      managedResource: 'fruits',
      icon: <Apple className="w-5 h-5 text-emerald-400" />,
      color: 'from-emerald-950/80 to-slate-900 border-emerald-500/40',
      description: 'Terraced groves of sweet apples and wild medicinal herbs.',
      vitalImpact: 'Base ingredients for Apothecary elixirs and vitamin health.',
      outputRate: '60 baskets/day',
    },
    {
      id: 'forge',
      name: 'The Artisan Quarter',
      subtitle: 'The Great Molten Forge',
      npcId: 'torvin',
      managedResource: 'tools',
      icon: <Hammer className="w-5 h-5 text-orange-400" />,
      color: 'from-orange-950/80 to-slate-900 border-orange-500/40',
      description: 'Foundries smelt mountain bog iron into agricultural tools and plate armor.',
      vitalImpact: 'Boosts farming yields by 40% and equips garrison defenders.',
      outputRate: '35 sets/day',
    },
    {
      id: 'herbarium',
      name: 'Cathedral Courtyard',
      subtitle: 'Royal Herbarium & Lab',
      npcId: 'elena',
      managedResource: 'medicine',
      icon: <Sparkles className="w-5 h-5 text-pink-400" />,
      color: 'from-pink-950/80 to-slate-900 border-pink-500/40',
      description: 'Alchemical alembics refine rare mountain herbs into disease-halting tinctures.',
      vitalImpact: 'Critical to curing plague outbreaks and treating injured officials.',
      outputRate: '30 vials/day',
    },
    {
      id: 'citadel',
      name: 'High Citadel Garrison',
      subtitle: 'The Iron Bastion',
      npcId: 'valerius',
      managedResource: 'security',
      icon: <Shield className="w-5 h-5 text-indigo-400" />,
      color: 'from-indigo-950/80 to-slate-900 border-indigo-500/40',
      description: 'Fortress towers overlooking the mountain passes, deterring bandits and invaders.',
      vitalImpact: 'Maintains civil law, suppresses crime, and guards trade caravans.',
      outputRate: '+50 patrol strength',
    },
    {
      id: 'bazaar',
      name: 'The Grand Bazaar',
      subtitle: 'Merchant Exchange',
      npcId: 'silas',
      managedResource: 'prosperity',
      icon: <Coins className="w-5 h-5 text-emerald-400" />,
      color: 'from-teal-950/80 to-slate-900 border-teal-500/40',
      description: 'Caravans from eastern realms exchange exotic spices, gold, and timber.',
      vitalImpact: 'Generates state tax revenues for the Crown Treasury.',
      outputRate: '+80 gold revenue',
    }
  ];

  return (
    <div className="space-y-3 pb-20">
      {/* Kingdom Health Core Vitals Card */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-3.5 border border-amber-500/40 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-rose-400 animate-pulse" />
            <div>
              <h2 className="text-sm font-black text-amber-300 uppercase tracking-wider">
                Valenreach Kingdom Vitals
              </h2>
              <p className="text-[11px] text-slate-300">
                Population: <strong>{kingdom.population.toLocaleString()} citizens</strong>
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400">Crown Treasury</span>
            <div className="font-mono font-black text-amber-300 text-sm">
              {kingdom.treasuryGold.toLocaleString()} G
            </div>
          </div>
        </div>

        {/* 6 Vital Indicators Grid */}
        <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
          {/* Granary */}
          <div className="rounded-xl bg-slate-900/90 p-2 border border-slate-800">
            <div className="flex justify-between text-[10px] text-slate-300 mb-1">
              <span className="flex items-center gap-1 font-semibold">
                <Wheat className="w-3 h-3 text-amber-400" /> Granary
              </span>
              <span className={`font-mono font-bold ${kingdom.granary < 30 ? 'text-rose-400' : 'text-amber-300'}`}>
                {kingdom.granary}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${kingdom.granary < 30 ? 'bg-rose-500' : 'bg-amber-400'}`}
                style={{ width: `${kingdom.granary}%` }}
              />
            </div>
          </div>

          {/* Clean Water */}
          <div className="rounded-xl bg-slate-900/90 p-2 border border-slate-800">
            <div className="flex justify-between text-[10px] text-slate-300 mb-1">
              <span className="flex items-center gap-1 font-semibold">
                <Droplets className="w-3 h-3 text-cyan-400" /> Water
              </span>
              <span className={`font-mono font-bold ${kingdom.cleanWater < 30 ? 'text-rose-400' : 'text-cyan-300'}`}>
                {kingdom.cleanWater}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${kingdom.cleanWater < 30 ? 'bg-rose-500' : 'bg-cyan-400'}`}
                style={{ width: `${kingdom.cleanWater}%` }}
              />
            </div>
          </div>

          {/* Public Health */}
          <div className="rounded-xl bg-slate-900/90 p-2 border border-slate-800">
            <div className="flex justify-between text-[10px] text-slate-300 mb-1">
              <span className="flex items-center gap-1 font-semibold">
                <Sparkles className="w-3 h-3 text-pink-400" /> Health
              </span>
              <span className={`font-mono font-bold ${kingdom.publicHealth < 30 ? 'text-rose-400' : 'text-pink-300'}`}>
                {kingdom.publicHealth}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${kingdom.publicHealth < 30 ? 'bg-rose-500' : 'bg-pink-400'}`}
                style={{ width: `${kingdom.publicHealth}%` }}
              />
            </div>
          </div>

          {/* Security */}
          <div className="rounded-xl bg-slate-900/90 p-2 border border-slate-800">
            <div className="flex justify-between text-[10px] text-slate-300 mb-1">
              <span className="flex items-center gap-1 font-semibold">
                <Shield className="w-3 h-3 text-indigo-400" /> Order
              </span>
              <span className={`font-mono font-bold ${kingdom.security < 30 ? 'text-rose-400' : 'text-indigo-300'}`}>
                {kingdom.security}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${kingdom.security < 30 ? 'bg-rose-500' : 'bg-indigo-400'}`}
                style={{ width: `${kingdom.security}%` }}
              />
            </div>
          </div>

          {/* Piety */}
          <div className="rounded-xl bg-slate-900/90 p-2 border border-slate-800">
            <div className="flex justify-between text-[10px] text-slate-300 mb-1">
              <span className="flex items-center gap-1 font-semibold">
                <Sparkles className="w-3 h-3 text-yellow-400" /> Piety
              </span>
              <span className="font-mono font-bold text-yellow-300">
                {kingdom.piety}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 transition-all duration-300"
                style={{ width: `${kingdom.piety}%` }}
              />
            </div>
          </div>

          {/* Unrest */}
          <div className="rounded-xl bg-slate-900/90 p-2 border border-slate-800">
            <div className="flex justify-between text-[10px] text-slate-300 mb-1">
              <span className="flex items-center gap-1 font-semibold">
                <AlertTriangle className="w-3 h-3 text-rose-400" /> Unrest
              </span>
              <span className={`font-mono font-bold ${kingdom.unrest > 50 ? 'text-rose-400' : 'text-slate-300'}`}>
                {kingdom.unrest}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${kingdom.unrest > 50 ? 'bg-rose-600' : 'bg-slate-500'}`}
                style={{ width: `${kingdom.unrest}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Living Supply Chain Pipeline Visualizer */}
      <div className="rounded-2xl bg-slate-900/90 p-3.5 border border-slate-800 text-xs">
        <h3 className="font-extrabold text-amber-300 flex items-center gap-1.5 uppercase tracking-wide text-xs">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          Interactive Supply Chains
        </h3>
        <p className="text-slate-400 text-[11px] mt-0.5">
          Everything has an origin. Disruption at any stage cascades through the entire realm:
        </p>

        <div className="mt-2.5 space-y-2 text-[11px]">
          {/* Chain 1: Water to Farm to Bread */}
          <div className="rounded-xl bg-slate-950 p-2 border border-slate-800 flex items-center justify-between gap-1 overflow-x-auto">
            <span className="flex items-center gap-1 text-cyan-300 font-semibold shrink-0">
              <Droplets className="w-3.5 h-3.5 text-cyan-400" /> Aqueduct (Mira)
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="flex items-center gap-1 text-amber-300 font-semibold shrink-0">
              <Wheat className="w-3.5 h-3.5 text-amber-400" /> Grain (Caren)
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="text-emerald-300 font-bold shrink-0">
              Communal Bread & Granary
            </span>
          </div>

          {/* Chain 2: Forge to Tools to Agriculture & Defense */}
          <div className="rounded-xl bg-slate-950 p-2 border border-slate-800 flex items-center justify-between gap-1 overflow-x-auto">
            <span className="flex items-center gap-1 text-orange-300 font-semibold shrink-0">
              <Hammer className="w-3.5 h-3.5 text-orange-400" /> Iron Mine & Forge (Torvin)
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="text-amber-300 font-semibold shrink-0">
              Forged Scythes & Swords
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="text-indigo-300 font-bold shrink-0">
              Garrison Armory (Valerius)
            </span>
          </div>

          {/* Chain 3: Herbs to Apothecary to Curing NPCs */}
          <div className="rounded-xl bg-slate-950 p-2 border border-slate-800 flex items-center justify-between gap-1 overflow-x-auto">
            <span className="flex items-center gap-1 text-emerald-300 font-semibold shrink-0">
              <Apple className="w-3.5 h-3.5 text-emerald-400" /> Forest Herbs (Lyra)
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="flex items-center gap-1 text-pink-300 font-semibold shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" /> Herbarium (Elena)
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="text-rose-300 font-bold shrink-0">
              Cures Sick Officials & Citizens
            </span>
          </div>
        </div>
      </div>

      {/* Districts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {districts.map((dist) => {
          const overseer = npcs.find((n) => n.id === dist.npcId);
          const isDistressed = overseer && (overseer.status === 'Sick' || overseer.status === 'Injured');

          return (
            <div
              key={dist.id}
              className={`rounded-2xl p-3 bg-gradient-to-br ${dist.color} border transition-all duration-200 ${
                isDistressed ? 'ring-2 ring-rose-500 shadow-md shadow-rose-950/40' : 'hover:border-amber-400/50'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-slate-950/80 border border-white/10">
                    {dist.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white">{dist.name}</h4>
                    <span className="text-[11px] text-slate-300 block">{dist.subtitle}</span>
                  </div>
                </div>

                {/* Status indicator */}
                {isDistressed ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold bg-rose-600/90 text-white px-2 py-0.5 rounded-full animate-pulse">
                    <AlertTriangle className="w-3 h-3" /> Supply Disrupted
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                    {dist.outputRate}
                  </span>
                )}
              </div>

              <p className="mt-2 text-[11px] text-slate-300 leading-snug">
                {dist.description}
              </p>

              <div className="mt-2 text-[10px] text-amber-200/90 bg-slate-950/60 p-1.5 rounded-lg border border-white/5">
                <strong className="text-amber-400">Impact:</strong> {dist.vitalImpact}
              </div>

              {/* Overseer Mini Card */}
              {overseer && (
                <div
                  onClick={() => { sound.playClick(); onSelectNpc(overseer); }}
                  className="mt-2.5 flex items-center justify-between gap-2 rounded-xl bg-slate-950/80 p-2 border border-slate-800 hover:border-amber-400/50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <AnimeAvatar
                      seed={overseer.avatarSeed}
                      name={overseer.name}
                      avatarUrl={overseer.avatarUrl}
                      portraitUrl={overseer.portraitUrl}
                      backgroundUrl={overseer.backgroundUrl}
                      status={overseer.status}
                      size="sm"
                    />
                    <div className="truncate">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                          {overseer.name}
                        </span>
                        <span className="text-[9px] text-slate-400">({overseer.role})</span>
                      </div>
                      <span className={`text-[10px] block ${isDistressed ? 'text-rose-400 font-bold' : 'text-emerald-400'}`}>
                        Condition: {overseer.status} ({overseer.health} HP)
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-amber-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 shrink-0">
                    Visit & Manage →
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
