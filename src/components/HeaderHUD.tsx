import React from 'react';
import { PlayerState, KingdomStats, Season } from '../types/game';
import { sound } from '../utils/audio';
import { 
  Heart, 
  Zap, 
  Coins, 
  Crown, 
  Volume2, 
  VolumeX, 
  Calendar, 
  Moon, 
  Activity,
  Droplets,
  Wheat,
  Shield,
  HeartPulse,
  Sparkles,
  Maximize2,
  Minimize2,
  RotateCcw,
  Smartphone
} from 'lucide-react';

interface HeaderHUDProps {
  player: PlayerState;
  kingdom: KingdomStats;
  day: number;
  season: Season;
  onAdvanceDay: () => void;
  onOpenKingdomVitals: () => void;
  onOpenRankModal: () => void;
  isAudioMuted: boolean;
  onToggleMute: () => void;
  activeSickNpcCount: number;
  isFullScreen?: boolean;
  onToggleFullScreen?: () => void;
  onResetGame?: () => void;
  onOpenAndroidModal?: () => void;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  player,
  kingdom,
  day,
  season,
  onAdvanceDay,
  onOpenKingdomVitals,
  onOpenRankModal,
  isAudioMuted,
  onToggleMute,
  activeSickNpcCount,
  isFullScreen = false,
  onToggleFullScreen,
  onResetGame,
  onOpenAndroidModal,
}) => {
  // Currency breakdown
  const gold = Math.floor(player.copper / 1000);
  const remainderCopper = player.copper % 1000;
  const silver = Math.floor(remainderCopper / 100);
  const copper = remainderCopper % 100;

  // Season badges
  const seasonColors = {
    Spring: 'from-emerald-600 to-teal-800 text-emerald-100 border-emerald-400/40',
    Summer: 'from-amber-600 to-orange-800 text-amber-100 border-amber-400/40',
    Autumn: 'from-orange-700 to-amber-900 text-amber-100 border-orange-400/40',
    Winter: 'from-sky-700 to-indigo-900 text-sky-100 border-sky-400/40',
  };

  const hasKingdomCrisis =
    kingdom.granary < 30 ||
    kingdom.cleanWater < 30 ||
    kingdom.publicHealth < 30 ||
    kingdom.security < 30 ||
    kingdom.unrest > 70;

  const playerLevel = player.stats?.level || 1;

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/95 backdrop-blur-xl border-b border-amber-500/30 px-2 sm:px-3 py-1 sm:py-1.5 text-white shadow-xl select-none">
      <div className="w-full flex flex-row items-center justify-between gap-1.5 sm:gap-3 overflow-x-auto scrollbar-none">
        
        {/* Left Section: Sovereign Lord Profile & Micro HP/EN */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            id="player-rank-btn"
            onClick={() => {
              sound.playClick();
              onOpenRankModal();
            }}
            className="group flex items-center gap-1.5 px-2 py-1 rounded-xl bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/40 hover:border-amber-300 transition-all shadow-md active:scale-95"
            title="Click to view Lord Progression, RPG Attributes & Promotions"
          >
            <div className="w-6 h-6 rounded-lg bg-amber-950/60 border border-amber-400/60 flex items-center justify-center shrink-0">
              <Crown className="w-3.5 h-3.5 text-amber-300" />
            </div>
            <div className="text-left leading-none">
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-black tracking-wide text-amber-300 uppercase">
                  {player.rank}
                </span>
                <span className="text-[9px] px-1 rounded bg-amber-500/20 text-amber-200 font-mono font-bold">
                  Lv.{playerLevel}
                </span>
              </div>
              <div className="w-14 sm:w-16 h-1 bg-slate-800 rounded-full overflow-hidden mt-1">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full"
                  style={{ width: `${Math.min(100, player.rankProgress)}%` }}
                />
              </div>
            </div>
          </button>

          {/* Compact HP & EN Badges */}
          <div className="flex items-center gap-1 text-[10px] font-mono">
            {/* Energy */}
            <div 
              className="flex items-center gap-1 bg-slate-900/90 px-1.5 py-0.5 rounded-lg border border-slate-800"
              title={`Energy: ${player.energy}/${player.maxEnergy}`}
            >
              <Zap className="w-3 h-3 text-amber-400 fill-amber-400/20" />
              <span className="text-amber-300 font-bold">{player.energy}</span>
            </div>

            {/* Health */}
            <div 
              className="flex items-center gap-1 bg-slate-900/90 px-1.5 py-0.5 rounded-lg border border-slate-800"
              title={`Health: ${player.health}/100`}
            >
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500/20" />
              <span className="text-rose-300 font-bold">{player.health}</span>
            </div>
          </div>
        </div>

        {/* Center Section: Compact Realm Ticker */}
        <div className="flex items-center gap-1 sm:gap-1.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-xl border border-amber-500/20 text-[10px] sm:text-[11px] shadow-inner shrink-0">
          {/* Wealth */}
          <div className="flex items-center gap-1 pr-1.5 border-r border-slate-800" title="Player Wealth">
            <Coins className="w-3 h-3 text-amber-400" />
            <span className="font-extrabold text-amber-300 font-mono">
              {gold > 0 ? `${gold}G ` : ''}{silver > 0 ? `${silver}S ` : ''}{copper}C
            </span>
          </div>

          {/* Granary Food */}
          <div className="flex items-center gap-1 pr-1.5 border-r border-slate-800" title="Granary Food Supplies">
            <Wheat className="w-3 h-3 text-amber-400" />
            <span className="font-bold text-slate-200 font-mono">{kingdom.granary}%</span>
          </div>

          {/* Clean Water */}
          <div className="flex items-center gap-1 pr-1.5 border-r border-slate-800" title="Aqueduct Water Level">
            <Droplets className="w-3 h-3 text-cyan-400" />
            <span className="font-bold text-slate-200 font-mono">{kingdom.cleanWater}%</span>
          </div>

          {/* Security */}
          <div className="flex items-center gap-1 pr-1.5 border-r border-slate-800" title="Garrison Security">
            <Shield className="w-3 h-3 text-indigo-400" />
            <span className="font-bold text-slate-200 font-mono">{kingdom.security}%</span>
          </div>

          {/* Public Health */}
          <div className="flex items-center gap-1" title="Public Health Index">
            <HeartPulse className="w-3 h-3 text-pink-400" />
            <span className="font-bold text-slate-200 font-mono">{kingdom.publicHealth}%</span>
          </div>
        </div>

        {/* Right Section: Time, Vitals & Audio */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Season & Day Capsule */}
          <div
            className={`flex items-center gap-1 rounded-lg bg-gradient-to-r ${seasonColors[season]} px-2 py-1 text-[10px] font-black shadow-sm border`}
          >
            <Calendar className="w-3 h-3" />
            <span>Day {day}</span>
            <span className="text-[9px] opacity-80 uppercase hidden sm:inline">({season})</span>
          </div>

          {/* Kingdom Vitals Sheet Modal */}
          <button
            id="kingdom-vitals-btn"
            onClick={() => {
              sound.playClick();
              onOpenKingdomVitals();
            }}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[10px] font-bold transition-all shadow-sm active:scale-95 ${
              hasKingdomCrisis || activeSickNpcCount > 0
                ? 'bg-rose-950/80 border-rose-500 text-rose-300 animate-pulse'
                : 'bg-slate-900 border-slate-700 hover:border-amber-400 text-slate-200'
            }`}
            title="Inspect Realm Vitals & Distress Reports"
          >
            <Activity className="w-3 h-3 text-amber-400" />
            <span className="hidden md:inline">Vitals</span>
            {activeSickNpcCount > 0 && (
              <span className="text-[9px] font-black bg-rose-600 text-white rounded-full px-1 py-0.1">
                {activeSickNpcCount}
              </span>
            )}
          </button>

          {/* Android App / APK button */}
          {onOpenAndroidModal && (
            <button
              id="android-apk-btn"
              onClick={() => {
                sound.playClick();
                onOpenAndroidModal();
              }}
              className="flex items-center gap-1 p-1 sm:px-2 sm:py-1 rounded-lg bg-gradient-to-r from-emerald-950/80 to-slate-900 hover:from-emerald-900 hover:to-slate-800 text-emerald-300 hover:text-emerald-200 border border-emerald-500/40 text-[10px] font-bold shadow-sm transition-all active:scale-95"
              title="Install Android App / Download APK"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">APK</span>
            </button>
          )}

          {/* Sound / Audio Toggle */}
          <button
            id="sound-toggle-btn"
            onClick={() => {
              onToggleMute();
              sound.playClick();
            }}
            className="rounded-lg bg-slate-900 p-1.5 text-slate-300 hover:text-amber-400 hover:bg-slate-800 transition-colors border border-slate-800"
            title={isAudioMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isAudioMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-rose-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
            )}
          </button>

          {/* Reset Action */}
          {onResetGame && (
            <button
              onClick={onResetGame}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors"
              title="Reset Game to Day 1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Widescreen / Compact Toggle */}
          {onToggleFullScreen && (
            <button
              onClick={onToggleFullScreen}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-300 border border-slate-800 transition-colors hidden sm:flex"
              title={isFullScreen ? 'Exit Landscape Frame' : 'Enter Landscape Frame'}
            >
              {isFullScreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          )}

          {/* End Turn Header Action */}
          <button
            id="advance-day-btn"
            onClick={() => {
              sound.playWork();
              onAdvanceDay();
            }}
            className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 px-2.5 py-1 text-[10px] sm:text-xs font-black text-slate-950 shadow-md active:scale-95 transition-all"
            title="Advance to next day"
          >
            <Moon className="w-3 h-3" />
            <span>End Day</span>
          </button>
        </div>
      </div>
    </header>
  );
};
