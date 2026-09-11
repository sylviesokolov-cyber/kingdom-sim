import React from 'react';
import { PlayerState, KingdomStats, Season } from '../types/game';
import { sound } from '../utils/audio';
import { Heart, Coins, Crown, Volume2, VolumeX, Settings, UserRound, Maximize2, Minimize2 } from 'lucide-react';

interface HeaderHUDProps {
  player: PlayerState; kingdom: KingdomStats; day: number; season: Season;
  onAdvanceDay: () => void; onOpenKingdomVitals: () => void; onOpenRankModal: () => void;
  isAudioMuted: boolean; onToggleMute: () => void; activeSickNpcCount: number;
  isFullScreen?: boolean; onToggleFullScreen?: () => void; onResetGame?: () => void; onOpenAndroidModal?: () => void;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  player, day, season, onAdvanceDay, onOpenKingdomVitals, onOpenRankModal,
  isAudioMuted, onToggleMute, isFullScreen = false, onToggleFullScreen,
}) => {
  const level = player.stats?.level || 1;
  const xp = player.stats?.exp || 0;
  const maxXp = player.stats?.maxExp || 100;
  const xpPct = Math.min(100, (xp / Math.max(1, maxXp)) * 100);
  return (
    <header className="ks-header sticky top-0 z-50 w-full select-none">
      <div className="ks-header-inner">
        <button className="ks-player-card" onClick={() => { sound.playClick(); onOpenRankModal(); }} aria-label="Player profile">
          <div className="ks-player-avatar"><Crown /></div>
          <div className="ks-player-info">
            <div className="ks-player-name">Syl</div>
            <div className="ks-player-rank">Lv. {level} <span>·</span> {player.rank}</div>
            <div className="ks-xp"><span style={{ width: `${xpPct}%` }} /></div>
            <div className="ks-next-rank">Next Rank: {Math.max(0, 100 - player.rankProgress)} Rep / 100 Copper</div>
          </div>
        </button>

        <div className="ks-resource-bar" aria-label="Resources">
          <div><Coins className="gold" /><b>{player.copper}</b></div>
          <div><Crown className="amber" /><b>{player.rankProgress}</b></div>
          <div><span className="ks-crystal">◆</span><b>4,110</b></div>
          <div><Heart className="heart" /><b>{player.health}</b></div>
        </div>

        <div className="ks-header-actions">
          <button className="ks-day-card" onClick={() => { sound.playClick(); onAdvanceDay(); }}>
            <span className="ks-day-icon">☼</span>
            <span><b>Day {day}</b><small>{season}</small></span>
            <span className="ks-chevron">›</span>
          </button>
          <button className="ks-icon-btn" onClick={onOpenKingdomVitals} aria-label="Settings"><Settings /></button>
          <button className="ks-icon-btn" onClick={onOpenRankModal} aria-label="Profile"><UserRound /></button>
          <button className="ks-icon-btn" onClick={() => { onToggleMute(); sound.playClick(); }} aria-label="Audio">
            {isAudioMuted ? <VolumeX /> : <Volume2 />}
          </button>
          {onToggleFullScreen && <button className="ks-icon-btn ks-fullscreen" onClick={onToggleFullScreen} aria-label="Fullscreen">{isFullScreen ? <Minimize2 /> : <Maximize2 />}</button>}
        </div>
      </div>
    </header>
  );
};
