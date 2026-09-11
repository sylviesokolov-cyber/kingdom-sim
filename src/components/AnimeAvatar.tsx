import React, { useState } from 'react';
import { NpcStatus } from '../types/game';
import { AnimeCharacterPortrait } from './AnimeCharacterPortrait';

interface AnimeAvatarProps {
  seed: string;
  name: string;
  avatarUrl?: string;
  portraitUrl?: string;
  backgroundUrl?: string;
  rarity?: 'SSR' | 'SR' | 'R';
  status?: NpcStatus;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'bust';
  className?: string;
  showBadge?: boolean;
  showAura?: boolean;
  showRarity?: boolean;
  live2d?: boolean;
}

export const AnimeAvatar: React.FC<AnimeAvatarProps> = ({
  seed,
  name,
  avatarUrl,
  portraitUrl,
  backgroundUrl,
  rarity,
  status = 'Healthy',
  size = 'md',
  className = '',
  showBadge = true,
  showAura = false,
  showRarity = false,
  live2d = true,
}) => {
  const [imgFailed, setImgFailed] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Dimensions
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
    bust: 'w-64 h-80 sm:w-72 sm:h-96',
  };

  // Color & character archetype theme based on seed
  const getTheme = () => {
    switch (seed) {
      case 'mira_aqueduct':
        return {
          bgGrad: 'from-cyan-900 via-sky-800 to-slate-900',
          hair: '#38bdf8',
          hairHighlight: '#bae6fd',
          hairShadow: '#0284c7',
          skin: '#fef2f2',
          eyes: '#0284c7',
          eyeGlint: '#e0f2fe',
          clothing: '#0369a1',
          accent: '#7dd3fc',
          roleIcon: '💧',
          style: 'aqueduct_maiden',
        };
      case 'caren_farmer':
        return {
          bgGrad: 'from-amber-950 via-yellow-900 to-stone-900',
          hair: '#fbbf24',
          hairHighlight: '#fef08a',
          hairShadow: '#b45309',
          skin: '#fffbeb',
          eyes: '#78350f',
          eyeGlint: '#fef3c7',
          clothing: '#d97706',
          accent: '#fef08a',
          roleIcon: '🌾',
          style: 'harvest_heroine',
        };
      case 'bran_fisher':
        return {
          bgGrad: 'from-slate-950 via-teal-950 to-slate-900',
          hair: '#94a3b8',
          hairHighlight: '#cbd5e1',
          hairShadow: '#475569',
          skin: '#fed7aa',
          eyes: '#0e7490',
          eyeGlint: '#cffafe',
          clothing: '#1e293b',
          accent: '#38bdf8',
          roleIcon: '🐟',
          style: 'rugged_sailor',
        };
      case 'lyra_botanist':
        return {
          bgGrad: 'from-emerald-950 via-teal-900 to-slate-950',
          hair: '#22c55e',
          hairHighlight: '#86efac',
          hairShadow: '#15803d',
          skin: '#f0fdf4',
          eyes: '#166534',
          eyeGlint: '#dcfce7',
          clothing: '#15803d',
          accent: '#4ade80',
          roleIcon: '🌿',
          style: 'forest_scholar',
        };
      case 'sylvie_weaver':
        return {
          bgGrad: 'from-purple-950 via-fuchsia-950 to-slate-950',
          hair: '#c084fc',
          hairHighlight: '#f5d0fe',
          hairShadow: '#7e22ce',
          skin: '#faf5ff',
          eyes: '#9333ea',
          eyeGlint: '#fae8ff',
          clothing: '#6b21a8',
          accent: '#e879f9',
          roleIcon: '🧵',
          style: 'aristocrat_tailor',
        };
      case 'torvin_blacksmith':
        return {
          bgGrad: 'from-stone-950 via-orange-950 to-stone-900',
          hair: '#ea580c',
          hairHighlight: '#fed7aa',
          hairShadow: '#9a3412',
          skin: '#fed7aa',
          eyes: '#c2410c',
          eyeGlint: '#ffedd5',
          clothing: '#44403c',
          accent: '#f97316',
          roleIcon: '🔨',
          style: 'molten_smith',
        };
      case 'elena_alchemist':
        return {
          bgGrad: 'from-pink-950 via-rose-950 to-slate-950',
          hair: '#f472b6',
          hairHighlight: '#fbcfe8',
          hairShadow: '#be185d',
          skin: '#fff1f2',
          eyes: '#be185d',
          eyeGlint: '#ffe4e6',
          clothing: '#831843',
          accent: '#fb7185',
          roleIcon: '⚗️',
          style: 'alchemist_genius',
        };
      case 'valerius_commander':
        return {
          bgGrad: 'from-blue-950 via-indigo-950 to-slate-950',
          hair: '#3b82f6',
          hairHighlight: '#93c5fd',
          hairShadow: '#1d4ed8',
          skin: '#f8fafc',
          eyes: '#1e40af',
          eyeGlint: '#dbeafe',
          clothing: '#334155',
          accent: '#fbbf24',
          roleIcon: '🛡️',
          style: 'knight_commander',
        };
      case 'beatrix_priestess':
        return {
          bgGrad: 'from-amber-950 via-indigo-950 to-slate-950',
          hair: '#e2e8f0',
          hairHighlight: '#ffffff',
          hairShadow: '#94a3b8',
          skin: '#fdf4ff',
          eyes: '#d97706',
          eyeGlint: '#fef3c7',
          clothing: '#ffffff',
          accent: '#fbbf24',
          roleIcon: '✨',
          style: 'dawn_saintess',
        };
      case 'silas_merchant':
        return {
          bgGrad: 'from-emerald-950 via-amber-950 to-slate-950',
          hair: '#d97706',
          hairHighlight: '#fef08a',
          hairShadow: '#92400e',
          skin: '#fffbeb',
          eyes: '#059669',
          eyeGlint: '#d1fae5',
          clothing: '#065f46',
          accent: '#fbbf24',
          roleIcon: '⚖️',
          style: 'merchant_prince',
        };
      case 'vesper_rogue':
        return {
          bgGrad: 'from-violet-950 via-purple-950 to-slate-950',
          hair: '#1e1b4b',
          hairHighlight: '#a855f7',
          hairShadow: '#0f172a',
          skin: '#f5f3ff',
          eyes: '#c084fc',
          eyeGlint: '#fae8ff',
          clothing: '#18181b',
          accent: '#c084fc',
          roleIcon: '🗡️',
          style: 'shadow_infiltrator',
        };
      default: // Player or generic
        return {
          bgGrad: 'from-slate-900 via-indigo-950 to-stone-900',
          hair: '#78716c',
          hairHighlight: '#d6d3d1',
          hairShadow: '#44403c',
          skin: '#fafaf9',
          eyes: '#0284c7',
          eyeGlint: '#e0f2fe',
          clothing: '#292524',
          accent: '#eab308',
          roleIcon: '👑',
          style: 'exile_hero',
        };
    }
  };

  const theme = getTheme();
  const isSick = status === 'Sick' || status === 'Critical';
  const isInjured = status === 'Injured';
  const isDead = status === 'Deceased';
  const inDungeon = status === 'In Dungeon';
  const isBustOrPortrait = size === 'bust';
  const targetImage = isBustOrPortrait ? (portraitUrl || avatarUrl) : (avatarUrl || portraitUrl);
  const hasImage = Boolean(targetImage && !imgFailed);

  return (
    <div
      className={`relative inline-block select-none overflow-hidden rounded-2xl border-2 shadow-lg transition-all duration-300 ${
        isDead
          ? 'border-zinc-700 grayscale'
          : isSick
          ? 'border-rose-500/70 shadow-rose-950/40'
          : isInjured
          ? 'border-amber-500/70 shadow-amber-950/40'
          : 'border-amber-500/40 hover:border-amber-400 hover:shadow-amber-500/20'
      } bg-gradient-to-b ${theme.bgGrad} ${sizeMap[size]} ${className}`}
    >
      {/* Layer 1: Scenic Background Image or Gradient */}
      {backgroundUrl ? (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src={backgroundUrl}
            alt=""
            className="w-full h-full object-cover scale-110 blur-[1px] brightness-75 contrast-110 opacity-70"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        </div>
      ) : null}

      {/* Layer 2: Live2D Ambient Rune / Sparkle Flare */}
      {(showAura || isSick || isInjured || hasImage) && (
        <div
          className="absolute inset-0 opacity-40 mix-blend-screen animate-pulse pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 35%, ${theme.accent}, transparent 65%)`,
          }}
        />
      )}

      {/* Layer 3: Thematic Live2D Floating Light Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
        <div
          className="absolute w-1.5 h-1.5 rounded-full blur-[0.5px] animate-particle-float"
          style={{
            backgroundColor: theme.accent,
            top: '60%',
            left: '25%',
            animationDelay: '0s',
          }}
        />
        <div
          className="absolute w-1 h-1 rounded-full blur-[0.5px] animate-particle-float"
          style={{
            backgroundColor: '#ffffff',
            top: '75%',
            left: '70%',
            animationDelay: '1.2s',
          }}
        />
        <div
          className="absolute w-2 h-2 rounded-full blur-[1px] animate-particle-float"
          style={{
            backgroundColor: theme.hair,
            top: '40%',
            left: '80%',
            animationDelay: '2.1s',
          }}
        />
      </div>

      {/* Layer 4: Character Portrait (High-Res Image with Live2D breathing, or SVG fallback) */}
      {hasImage ? (
        <div className="relative w-full h-full flex items-end justify-center overflow-hidden">
          <img
            src={targetImage}
            alt={name}
            onError={() => setImgFailed(true)}
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full ${
              isBustOrPortrait
                ? 'object-contain object-bottom'
                : 'object-cover object-top scale-125 origin-top'
            } transition-transform duration-500 ${
              live2d && !isDead ? 'animate-live2d-breathe' : ''
            } ${
              isDead
                ? 'grayscale opacity-60'
                : isSick
                ? 'saturate-75 brightness-90'
                : 'hover:scale-110'
            }`}
            loading="lazy"
          />

          {/* Distress Overlays on Top of Image */}
          {isSick && (
            <div className="absolute inset-0 bg-rose-950/25 pointer-events-none flex items-center justify-center">
              {/* Anime Distress Sweat Beads */}
              <div className="absolute top-2 right-3 flex flex-col items-center gap-0.5 opacity-90 animate-bounce">
                <span className="text-[10px]">💧</span>
              </div>
            </div>
          )}

          {isInjured && (
            <div className="absolute inset-0 pointer-events-none">
              {/* Anime Cheek Cross Bandage */}
              <div className="absolute top-3 right-3 bg-amber-200/90 border border-amber-600/80 px-1 py-0.2 rounded-sm rotate-12 text-[8px] font-bold text-amber-900 shadow-sm">
                🩹
              </div>
            </div>
          )}

          {inDungeon && (
            <div className="absolute inset-0 pointer-events-none flex justify-around px-2 bg-black/40">
              <div className="w-1.5 h-full bg-slate-500 shadow-lg border-x border-slate-700" />
              <div className="w-1.5 h-full bg-slate-500 shadow-lg border-x border-slate-700" />
              <div className="w-1.5 h-full bg-slate-500 shadow-lg border-x border-slate-700" />
            </div>
          )}
        </div>
      ) : (
        /* Custom High-Fantasy Anime Character Artwork */
        <AnimeCharacterPortrait
          seed={seed}
          name={name}
          status={status}
          size={isBustOrPortrait ? 'bust' : 'sm'}
          showBackground={false}
          showAura={showAura}
          live2d={live2d}
          className="w-full h-full"
        />
      )}
      {/* Layer 5: Gacha Light Shimmer Sweep */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-gacha-shimmer" />
      </div>

      {/* Status Badge Tag */}
      {showBadge && (
        <div className="absolute bottom-1 right-1 flex items-center gap-1 rounded-full bg-black/75 px-1.5 py-0.5 text-[10px] font-bold backdrop-blur-sm border border-white/20">
          <span className="text-xs">{theme.roleIcon}</span>
          <span
            className={`capitalize ${
              isDead
                ? 'text-zinc-400'
                : isSick
                ? 'text-rose-400'
                : isInjured
                ? 'text-amber-400'
                : inDungeon
                ? 'text-slate-300'
                : 'text-emerald-400'
            }`}
          >
            {status}
          </span>
        </div>
      )}

      {/* Gold Frame Ornate Corners (Anime RPG HUD style) */}
      <div className="pointer-events-none absolute inset-0 border border-amber-400/20 rounded-2xl" />
      <div className="pointer-events-none absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-amber-400/80 rounded-tl-xl" />
      <div className="pointer-events-none absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-amber-400/80 rounded-tr-xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-amber-400/80 rounded-bl-xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-amber-400/80 rounded-br-xl" />
    </div>
  );
};
