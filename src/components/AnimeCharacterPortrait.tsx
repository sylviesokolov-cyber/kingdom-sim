import React from 'react';
import { NpcStatus } from '../types/game';

interface AnimeCharacterPortraitProps {
  seed: string;
  name: string;
  status?: NpcStatus;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'bust' | 'full';
  className?: string;
  showBackground?: boolean;
  showAura?: boolean;
  live2d?: boolean;
  portraitUrl?: string;
  onClick?: () => void;
}

export const AnimeCharacterPortrait: React.FC<AnimeCharacterPortraitProps> = ({
  seed,
  name,
  status = 'Healthy',
  size = 'full',
  className = '',
  showBackground = true,
  showAura = true,
  live2d = true,
  portraitUrl,
  onClick,
}) => {
  const isSick = status === 'Sick' || status === 'Critical';
  const isInjured = status === 'Injured';
  const isDead = status === 'Deceased';

  // Specific color schemes and archetypes for each character
  const getArchetype = () => {
    switch (seed) {
      case 'beatrix_priestess':
        return {
          id: 'beatrix',
          title: 'High Priestess',
          primary: '#f59e0b',
          secondary: '#fbbf24',
          accent: '#ffffff',
          hair: '#f1f5f9',
          hairShadow: '#94a3b8',
          hairHighlight: '#ffffff',
          eyes: '#d97706',
          skin: '#fff1f2',
          clothing: '#fefce8',
          bgFrom: 'from-amber-950/80',
          bgVia: 'via-slate-950',
          bgTo: 'to-amber-900/60',
          roleSymbol: '✨',
        };
      case 'valerius_commander':
        return {
          id: 'valerius',
          title: 'Grand Commander',
          primary: '#2563eb',
          secondary: '#60a5fa',
          accent: '#fbbf24',
          hair: '#1e3a8a',
          hairShadow: '#0f172a',
          hairHighlight: '#93c5fd',
          eyes: '#1d4ed8',
          skin: '#f8fafc',
          clothing: '#1e293b',
          bgFrom: 'from-blue-950/80',
          bgVia: 'via-slate-950',
          bgTo: 'to-indigo-950/60',
          roleSymbol: '⚔️',
        };
      case 'mira_aqueduct':
        return {
          id: 'mira',
          title: 'Springtender',
          primary: '#06b6d4',
          secondary: '#38bdf8',
          accent: '#a5f3fc',
          hair: '#38bdf8',
          hairShadow: '#0284c7',
          hairHighlight: '#cffafe',
          eyes: '#0284c7',
          skin: '#f0fdf4',
          clothing: '#0f172a',
          bgFrom: 'from-cyan-950/80',
          bgVia: 'via-slate-950',
          bgTo: 'to-sky-950/60',
          roleSymbol: '💧',
        };
      case 'caren_farmer':
        return {
          id: 'caren',
          title: 'Harvest Lady',
          primary: '#eab308',
          secondary: '#facc15',
          accent: '#fef08a',
          hair: '#facc15',
          hairShadow: '#ca8a04',
          hairHighlight: '#fef9c3',
          eyes: '#854d0e',
          skin: '#fffbeb',
          clothing: '#451a03',
          bgFrom: 'from-amber-950/80',
          bgVia: 'via-slate-950',
          bgTo: 'to-yellow-950/60',
          roleSymbol: '🌾',
        };
      case 'elena_alchemist':
        return {
          id: 'elena',
          title: 'Royal Alchemist',
          primary: '#ec4899',
          secondary: '#f472b6',
          accent: '#fbcfe8',
          hair: '#f43f5e',
          hairShadow: '#9f1239',
          hairHighlight: '#fecdd3',
          eyes: '#be123c',
          skin: '#fff1f2',
          clothing: '#831843',
          bgFrom: 'from-pink-950/80',
          bgVia: 'via-slate-950',
          bgTo: 'to-rose-950/60',
          roleSymbol: '⚗️',
        };
      case 'torvin_blacksmith':
        return {
          id: 'torvin',
          title: 'Forge Master',
          primary: '#ea580c',
          secondary: '#f97316',
          accent: '#fed7aa',
          hair: '#c2410c',
          hairShadow: '#7c2d12',
          hairHighlight: '#fdba74',
          eyes: '#ea580c',
          skin: '#fed7aa',
          clothing: '#292524',
          bgFrom: 'from-orange-950/80',
          bgVia: 'via-slate-950',
          bgTo: 'to-red-950/60',
          roleSymbol: '🔨',
        };
      case 'sylvie_weaver':
        return {
          id: 'sylvie',
          title: 'Master Weaver',
          primary: '#a855f7',
          secondary: '#c084fc',
          accent: '#f3e8ff',
          hair: '#c084fc',
          hairShadow: '#7e22ce',
          hairHighlight: '#f5d0fe',
          eyes: '#9333ea',
          skin: '#faf5ff',
          clothing: '#581c87',
          bgFrom: 'from-purple-950/80',
          bgVia: 'via-slate-950',
          bgTo: 'to-fuchsia-950/60',
          roleSymbol: '🧵',
        };
      case 'vesper_rogue':
        return {
          id: 'vesper',
          title: 'Shadow Underboss',
          primary: '#8b5cf6',
          secondary: '#a78bfa',
          accent: '#ddd6fe',
          hair: '#1e1b4b',
          hairShadow: '#0f172a',
          hairHighlight: '#6366f1',
          eyes: '#a855f7',
          skin: '#f5f3ff',
          clothing: '#09090b',
          bgFrom: 'from-violet-950/80',
          bgVia: 'via-slate-950',
          bgTo: 'to-zinc-950/60',
          roleSymbol: '🗡️',
        };
      case 'lyra_botanist':
        return {
          id: 'lyra',
          title: 'Orchard Botanist',
          primary: '#22c55e',
          secondary: '#4ade80',
          accent: '#bbf7d0',
          hair: '#16a34a',
          hairShadow: '#14532d',
          hairHighlight: '#86efac',
          eyes: '#15803d',
          skin: '#f0fdf4',
          clothing: '#14532d',
          bgFrom: 'from-emerald-950/80',
          bgVia: 'via-slate-950',
          bgTo: 'to-teal-950/60',
          roleSymbol: '🌿',
        };
      case 'bran_fisher':
        return {
          id: 'bran',
          title: 'Old Netmaster',
          primary: '#0284c7',
          secondary: '#38bdf8',
          accent: '#e0f2fe',
          hair: '#94a3b8',
          hairShadow: '#475569',
          hairHighlight: '#e2e8f0',
          eyes: '#0369a1',
          skin: '#ffedd5',
          clothing: '#1e293b',
          bgFrom: 'from-slate-950/80',
          bgVia: 'via-slate-950',
          bgTo: 'to-cyan-950/60',
          roleSymbol: '⚓',
        };
      case 'silas_merchant':
        return {
          id: 'silas',
          title: 'Bazaar Prince',
          primary: '#d97706',
          secondary: '#fbbf24',
          accent: '#fef08a',
          hair: '#b45309',
          hairShadow: '#78350f',
          hairHighlight: '#fde68a',
          eyes: '#059669',
          skin: '#fffbeb',
          clothing: '#064e3b',
          bgFrom: 'from-amber-950/80',
          bgVia: 'via-slate-950',
          bgTo: 'to-emerald-950/60',
          roleSymbol: '⚖️',
        };
      default: // Player
        return {
          id: 'player',
          title: 'Exiled Sovereign',
          primary: '#f59e0b',
          secondary: '#fbbf24',
          accent: '#ffffff',
          hair: '#334155',
          hairShadow: '#0f172a',
          hairHighlight: '#64748b',
          eyes: '#0284c7',
          skin: '#fafaf9',
          clothing: '#18181b',
          bgFrom: 'from-slate-950/80',
          bgVia: 'via-slate-950',
          bgTo: 'to-indigo-950/60',
          roleSymbol: '👑',
        };
    }
  };

  const arch = getArchetype();

  return (
    <div
      onClick={onClick}
      className={`relative w-full h-full overflow-hidden select-none flex items-center justify-center ${className}`}
    >
      {/* 1. Dramatic Ambient Fantasy Backdrop */}
      {showBackground && (
        <div className={`absolute inset-0 bg-gradient-to-b ${arch.bgFrom} ${arch.bgVia} ${arch.bgTo}`}>
          {/* Radial Character Aura Spotlight */}
          <div
            className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 35%, ${arch.primary} 0%, transparent 68%)`,
            }}
          />

          {/* Distant Light Rays */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

          {/* Atmospheric Sparkle Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute w-1.5 h-1.5 rounded-full bg-white/70 blur-[0.5px] animate-particle-float"
              style={{ top: '30%', left: '20%' }}
            />
            <div
              className="absolute w-2 h-2 rounded-full blur-[1px] animate-particle-float"
              style={{ top: '55%', right: '25%', backgroundColor: arch.secondary }}
            />
            <div
              className="absolute w-1 h-1 rounded-full bg-white/80 animate-particle-float"
              style={{ top: '75%', left: '70%' }}
            />
          </div>
        </div>
      )}

      {/* 2. Character Illustration (Standing Image or Detailed Vector Anime Model) */}
      <div
        className={`relative z-10 w-full h-full flex items-end justify-center transition-transform duration-300 ${
          live2d && !isDead ? 'animate-live2d-breathe' : ''
        }`}
      >
        {portraitUrl ? (
          <img
            src={portraitUrl}
            alt={name}
            referrerPolicy="no-referrer"
            className={`w-full h-full max-h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)] ${
              isDead
                ? 'grayscale opacity-50'
                : isSick
                ? 'saturate-80 brightness-95'
                : ''
            }`}
          />
        ) : (
          <svg
            viewBox="0 0 320 440"
            className={`w-full h-full max-h-full object-contain ${
              isDead
                ? 'grayscale opacity-50'
                : isSick
                ? 'saturate-80 brightness-95'
                : ''
            }`}
            xmlns="http://www.w3.org/2000/svg"
          >
          <defs>
            {/* Skin Gradient */}
            <linearGradient id={`p_skin_${seed}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isSick ? '#f1f5f9' : arch.skin} />
              <stop offset="100%" stopColor={isSick ? '#cbd5e1' : '#ffe4e6'} />
            </linearGradient>

            {/* Hair Gradient */}
            <linearGradient id={`p_hair_${seed}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={arch.hairHighlight} />
              <stop offset="35%" stopColor={arch.hair} />
              <stop offset="100%" stopColor={arch.hairShadow} />
            </linearGradient>

            {/* Eye Gradient */}
            <linearGradient id={`p_eye_${seed}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#09090b" />
              <stop offset="45%" stopColor={arch.eyes} />
              <stop offset="100%" stopColor={arch.secondary} />
            </linearGradient>

            {/* Robe / Clothing Gradient */}
            <linearGradient id={`p_cloth_${seed}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={arch.clothing} />
              <stop offset="60%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>

            {/* Golden Metallic Shimmer */}
            <linearGradient id={`p_gold_${seed}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#eab308" />
              <stop offset="70%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#854d0e" />
            </linearGradient>

            {/* Aura Halo Filter */}
            <filter id={`p_glow_${seed}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* BACK LAYER: Saintess Divine Ring or Knight Shield or Shadow Smoke */}
          {arch.id === 'beatrix' && (
            <g filter={`url(#p_glow_${seed})`} opacity="0.65">
              <circle cx="160" cy="140" r="75" fill="none" stroke={`url(#p_gold_${seed})`} strokeWidth="3.5" strokeDasharray="12,6" />
              <circle cx="160" cy="140" r="62" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.7" />
              <path d="M160,50 L160,230 M70,140 L250,140" stroke="#fef08a" strokeWidth="1.5" opacity="0.4" />
            </g>
          )}

          {arch.id === 'valerius' && (
            <g opacity="0.7">
              {/* Royal Navy Mantle / Flowing Cape */}
              <path d="M90,200 C50,230 30,340 20,440 L300,440 C290,340 270,230 230,200 Z" fill="#1e3a8a" />
              <path d="M85,210 C55,250 40,360 30,440 L70,440 C80,360 90,260 105,210 Z" fill="#172554" />
            </g>
          )}

          {arch.id === 'mira' && (
            <g filter={`url(#p_glow_${seed})`} opacity="0.5">
              {/* Swirling Water Ring */}
              <path d="M70,170 C60,250 120,320 180,310 C250,300 280,210 240,150" fill="none" stroke="#38bdf8" strokeWidth="3" />
              <circle cx="240" cy="150" r="6" fill="#cffafe" />
              <circle cx="70" cy="170" r="5" fill="#38bdf8" />
            </g>
          )}

          {arch.id === 'vesper' && (
            <g opacity="0.4" filter={`url(#p_glow_${seed})`}>
              {/* Shadow Mist Swirls */}
              <path d="M60,350 Q100,280 80,220 Q120,300 160,370" fill="none" stroke="#a855f7" strokeWidth="5" />
              <path d="M260,350 Q220,280 240,220 Q200,300 160,370" fill="none" stroke="#7e22ce" strokeWidth="4" />
            </g>
          )}

          {/* BACK HAIR FLOW */}
          {arch.id === 'elena' ? (
            /* Twin Tails */
            <g>
              <path d="M100,140 C50,150 20,220 30,320 C45,260 65,200 90,170 Z" fill={`url(#p_hair_${seed})`} />
              <path d="M220,140 C270,150 300,220 290,320 C275,260 255,200 230,170 Z" fill={`url(#p_hair_${seed})`} />
              <circle cx="95" cy="145" r="7" fill="#fb7185" />
              <circle cx="225" cy="145" r="7" fill="#fb7185" />
            </g>
          ) : arch.id === 'caren' ? (
            /* Golden Braids */
            <g>
              <path d="M95,150 C70,190 60,280 85,360 C80,300 85,220 105,170 Z" fill={`url(#p_hair_${seed})`} />
              <path d="M225,150 C250,190 260,280 235,360 C240,300 235,220 215,170 Z" fill={`url(#p_hair_${seed})`} />
            </g>
          ) : (
            /* Flowing Long Hair */
            <g>
              <path d="M80,130 C40,190 40,300 70,390 C95,310 95,220 100,160 Z" fill={`url(#p_hair_${seed})`} />
              <path d="M240,130 C280,190 280,300 250,390 C225,310 225,220 220,160 Z" fill={`url(#p_hair_${seed})`} />
            </g>
          )}

          {/* MAIN BODY / TORSO & ATTIRE */}
          <g>
            {/* Shoulders / Outer Costume Base */}
            <path
              d="M70,240 C70,200 110,185 160,185 C210,185 250,200 250,240 L280,440 L40,440 Z"
              fill={`url(#p_cloth_${seed})`}
            />

            {/* Character Specific Costume Accents */}
            {arch.id === 'beatrix' && (
              <g>
                {/* Ivory Stole with Gold Filigree */}
                <path d="M125,190 L110,440 L145,440 L140,220 Z" fill="#fffbeb" stroke={`url(#p_gold_${seed})`} strokeWidth="1.5" />
                <path d="M195,190 L210,440 L175,440 L180,220 Z" fill="#fffbeb" stroke={`url(#p_gold_${seed})`} strokeWidth="1.5" />
                {/* Gold Solar Reliquary on Breastplate */}
                <circle cx="160" cy="225" r="14" fill={`url(#p_gold_${seed})`} />
                <circle cx="160" cy="225" r="9" fill="#fef08a" />
                <circle cx="160" cy="225" r="4" fill="#b45309" />
                {/* Lace Trim */}
                <path d="M120,260 Q160,285 200,260" fill="none" stroke="#fef08a" strokeWidth="2" strokeDasharray="3,3" />
              </g>
            )}

            {arch.id === 'valerius' && (
              <g>
                {/* Silver & Cobalt Steel Cuirass */}
                <path d="M110,210 C130,205 190,205 210,210 L220,300 C190,320 130,320 100,300 Z" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
                {/* Gold Lion Pauldrons */}
                <path d="M70,215 C60,200 90,190 110,205 L105,250 C80,250 65,235 70,215 Z" fill={`url(#p_gold_${seed})`} />
                <path d="M250,215 C260,200 230,190 210,205 L215,250 C240,250 255,235 250,215 Z" fill={`url(#p_gold_${seed})`} />
                {/* Gorget Collar */}
                <path d="M130,195 Q160,215 190,195 L180,225 Q160,235 140,225 Z" fill={`url(#p_gold_${seed})`} />
                {/* Broadsword Pommel visible */}
                <rect x="235" y="270" width="10" height="70" fill="#94a3b8" rx="2" />
                <rect x="220" y="290" width="40" height="8" fill={`url(#p_gold_${seed})`} rx="2" />
                <circle cx="240" cy="265" r="9" fill={`url(#p_gold_${seed})`} />
              </g>
            )}

            {arch.id === 'elena' && (
              <g>
                {/* Alchemist Vest with Belts and Flasks */}
                <path d="M120,205 L110,310 L210,310 L200,205 Z" fill="#4c0519" />
                {/* Leather Suspenders & Brass Buckles */}
                <line x1="135" y1="205" x2="130" y2="310" stroke="#78350f" strokeWidth="4" />
                <line x1="185" y1="205" x2="190" y2="310" stroke="#78350f" strokeWidth="4" />
                <rect x="127" y="240" width="7" height="9" fill="#facc15" />
                <rect x="187" y="240" width="7" height="9" fill="#facc15" />
                {/* Glowing Potion Flask */}
                <path d="M150,270 L170,270 L180,310 L140,310 Z" fill="#fb7185" opacity="0.85" filter={`url(#p_glow_${seed})`} />
                <rect x="156" y="262" width="8" height="8" fill="#78350f" />
                <circle cx="160" cy="290" r="3" fill="#ffffff" />
              </g>
            )}

            {arch.id === 'caren' && (
              <g>
                {/* Folk Dirndl with Corset Lacing */}
                <path d="M120,210 L110,320 L210,320 L200,210 Z" fill="#854d0e" />
                <path d="M135,210 L135,320 L185,320 L185,210 Z" fill="#fef08a" />
                {/* Corset Cross Criss-Cross Ribbons */}
                <line x1="138" y1="230" x2="182" y2="250" stroke="#b91c1c" strokeWidth="2.5" />
                <line x1="182" y1="230" x2="138" y2="250" stroke="#b91c1c" strokeWidth="2.5" />
                <line x1="138" y1="260" x2="182" y2="280" stroke="#b91c1c" strokeWidth="2.5" />
                <line x1="182" y1="260" x2="138" y2="280" stroke="#b91c1c" strokeWidth="2.5" />
                {/* Harvest Apron */}
                <path d="M120,320 L110,440 L210,440 L200,320 Z" fill="#fffbeb" />
              </g>
            )}

            {arch.id === 'torvin' && (
              <g>
                {/* Heavy Studded Blacksmith Apron */}
                <path d="M110,210 L95,440 L225,440 L210,210 Z" fill="#44403c" stroke="#1c1917" strokeWidth="2" />
                <circle cx="120" cy="230" r="3.5" fill="#ca8a04" />
                <circle cx="200" cy="230" r="3.5" fill="#ca8a04" />
                <circle cx="120" cy="280" r="3.5" fill="#ca8a04" />
                <circle cx="200" cy="280" r="3.5" fill="#ca8a04" />
                {/* Forge Hammer Handle */}
                <rect x="230" y="220" width="12" height="150" fill="#78350f" transform="rotate(-15 230 220)" />
                <rect x="200" y="210" width="45" height="25" fill="#57534e" rx="3" stroke="#f97316" strokeWidth="1.5" />
              </g>
            )}
          </g>

          {/* NECK */}
          <path d="M142,160 L142,205 C150,210 170,210 178,205 L178,160 Z" fill={`url(#p_skin_${seed})`} />

          {/* FACE ANATOMY */}
          <g>
            {/* Anime Face Shape */}
            <path
              d="M105,100 C105,155 125,185 160,188 C195,185 215,155 215,100 C215,65 195,48 160,48 C125,48 105,65 105,100 Z"
              fill={`url(#p_skin_${seed})`}
            />

            {/* Cheek Blush */}
            {!isSick && !isDead && (
              <g opacity="0.55">
                <ellipse cx="125" cy="142" rx="14" ry="6.5" fill="#fb7185" />
                <ellipse cx="195" cy="142" rx="14" ry="6.5" fill="#fb7185" />
                <line x1="120" y1="140" x2="128" y2="144" stroke="#f43f5e" strokeWidth="1" />
                <line x1="192" y1="140" x2="200" y2="144" stroke="#f43f5e" strokeWidth="1" />
              </g>
            )}

            {/* Anime Nose Tip */}
            <path d="M159,138 L161,141 L158,142" stroke="#e11d48" strokeWidth="1" opacity="0.4" fill="none" />

            {/* Anime Mouth */}
            <path
              d={isSick ? "M153,158 Q160,154 167,158" : "M152,154 Q160,160 168,154"}
              stroke="#be123c"
              strokeWidth="2"
              strokeLinecap="round"
              fill={isSick ? 'none' : '#ffe4e6'}
            />

            {/* EYES */}
            {/* Left Eye */}
            <g>
              {/* Eyelid / Upper Lash */}
              <path d="M116,116 C124,107 140,107 146,119" stroke="#09090b" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M120,111 C126,106 136,106 142,112" stroke="#71717a" strokeWidth="1.2" fill="none" />
              {/* Iris */}
              <ellipse cx="132" cy="125" rx="10" ry="13" fill={`url(#p_eye_${seed})`} />
              {/* Pupil */}
              <ellipse cx="132" cy="123" rx="5" ry="7" fill="#09090b" />
              {/* Specular Catchlights */}
              <circle cx="128" cy="119" r="3.2" fill="#ffffff" />
              <circle cx="136" cy="130" r="1.8" fill="#ffffff" opacity="0.85" />
              {/* Lower Lash */}
              <path d="M124,136 Q134,138 140,135" stroke="#27272a" strokeWidth="1.5" fill="none" />
            </g>

            {/* Right Eye */}
            <g>
              {/* Eyelid / Upper Lash */}
              <path d="M174,119 C180,107 196,107 204,116" stroke="#09090b" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M178,112 C184,106 194,106 200,111" stroke="#71717a" strokeWidth="1.2" fill="none" />
              {/* Iris */}
              <ellipse cx="188" cy="125" rx="10" ry="13" fill={`url(#p_eye_${seed})`} />
              {/* Pupil */}
              <ellipse cx="188" cy="123" rx="5" ry="7" fill="#09090b" />
              {/* Specular Catchlights */}
              <circle cx="184" cy="119" r="3.2" fill="#ffffff" />
              <circle cx="192" cy="130" r="1.8" fill="#ffffff" opacity="0.85" />
              {/* Lower Lash */}
              <path d="M180,135 Q186,138 196,136" stroke="#27272a" strokeWidth="1.5" fill="none" />
            </g>

            {/* Eyebrows */}
            <path
              d={isSick ? "M118,103 Q132,106 144,101" : "M118,101 Q132,96 144,101"}
              stroke={arch.hairShadow}
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d={isSick ? "M176,101 Q188,106 202,103" : "M176,101 Q188,96 202,101"}
              stroke={arch.hairShadow}
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Distress Effects on Face */}
            {isSick && (
              <g>
                {/* Anime Sweat Drop */}
                <path d="M198,85 C198,80 205,75 205,75 C205,75 212,80 212,85 C212,89 209,92 205,92 C201,92 198,89 198,85 Z" fill="#38bdf8" opacity="0.9" />
                <line x1="120" y1="145" x2="132" y2="139" stroke="#0284c7" strokeWidth="1.5" opacity="0.7" />
                <line x1="188" y1="139" x2="200" y2="145" stroke="#0284c7" strokeWidth="1.5" opacity="0.7" />
              </g>
            )}

            {isInjured && (
              <g>
                {/* Cross Bandage on Cheek */}
                <rect x="180" y="140" width="22" height="7" rx="2" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" transform="rotate(25 180 140)" />
                <rect x="180" y="140" width="22" height="7" rx="2" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" transform="rotate(-65 180 140)" />
              </g>
            )}
          </g>

          {/* FRONT HAIR & BANGS */}
          <g>
            {/* Top Hair Volume & Crown */}
            <path
              d="M95,100 C90,45 125,25 160,25 C195,25 230,45 225,100 C215,60 190,45 160,45 C130,45 105,60 95,100 Z"
              fill={`url(#p_hair_${seed})`}
            />

            {/* Front Anime Bangs Framing the Face */}
            <path d="M110,65 Q115,105 122,115 Q125,90 135,70" fill={`url(#p_hair_${seed})`} />
            <path d="M130,60 Q145,105 152,112 Q150,85 160,60" fill={`url(#p_hair_${seed})`} />
            <path d="M158,60 Q168,105 175,112 Q172,85 185,65" fill={`url(#p_hair_${seed})`} />
            <path d="M185,65 Q195,105 208,115 Q205,90 210,70" fill={`url(#p_hair_${seed})`} />

            {/* Side Hair Strands Falling Past Shoulders */}
            <path d="M98,90 C92,140 85,200 100,240 C108,190 108,140 108,100 Z" fill={`url(#p_hair_${seed})`} />
            <path d="M222,90 C228,140 235,200 220,240 C212,190 212,140 212,100 Z" fill={`url(#p_hair_${seed})`} />

            {/* Specular Hair Sheen / Angel's Ring */}
            <path
              d="M118,65 Q160,52 202,65"
              stroke={arch.hairHighlight}
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.8"
              fill="none"
            />

            {/* Ahoge / Playful Cowlick */}
            <path
              d="M160,30 Q175,5 185,15 Q178,22 165,30"
              fill={`url(#p_hair_${seed})`}
            />

            {/* HEAD ACCESSORIES */}
            {arch.id === 'beatrix' && (
              /* Saintess Wimple & Golden Filigree Tiara */
              <g>
                <path d="M90,65 Q160,40 230,65 L225,50 Q160,25 95,50 Z" fill={`url(#p_gold_${seed})`} />
                <circle cx="160" cy="45" r="5" fill="#fef08a" />
              </g>
            )}

            {arch.id === 'elena' && (
              /* Brass Alchemist Goggles Resting on Head */
              <g>
                <ellipse cx="130" cy="48" rx="18" ry="12" fill="#78350f" stroke="#f59e0b" strokeWidth="2.5" />
                <ellipse cx="130" cy="48" rx="13" ry="8" fill="#38bdf8" opacity="0.75" />
                <ellipse cx="190" cy="48" rx="18" ry="12" fill="#78350f" stroke="#f59e0b" strokeWidth="2.5" />
                <ellipse cx="190" cy="48" rx="13" ry="8" fill="#38bdf8" opacity="0.75" />
                <line x1="148" y1="48" x2="172" y2="48" stroke="#f59e0b" strokeWidth="3" />
              </g>
            )}

            {arch.id === 'caren' && (
              /* Straw Sun Hat & Wheat Sheaf */
              <g>
                <ellipse cx="160" cy="40" rx="90" ry="18" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
                <path d="M110,40 C110,10 210,10 210,40 Z" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
                <path d="M110,40 Q160,45 210,40" stroke="#dc2626" strokeWidth="4" fill="none" />
              </g>
            )}

            {arch.id === 'mira' && (
              /* Water Droplet Tiara */
              <g>
                <path d="M130,55 Q160,40 190,55" stroke="#38bdf8" strokeWidth="2" fill="none" />
                <path d="M160,35 C155,45 165,45 160,35 Z" fill="#cffafe" filter={`url(#p_glow_${seed})`} />
              </g>
            )}

            {arch.id === 'bran' && (
              /* Rugged Sea Beard & Anchor Pendant */
              <g>
                <path d="M135,160 C135,185 185,185 185,160 C175,175 145,175 135,160 Z" fill="#94a3b8" />
              </g>
            )}
          </g>
        </svg>
        )}
      </div>

      {/* 3. Distress Overlay Icons */}
      {isSick && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-rose-950/90 border border-rose-500/60 px-2 py-0.5 rounded-full text-xs font-bold text-rose-300 shadow-lg animate-bounce">
          <span>💧 Sick</span>
        </div>
      )}

      {isInjured && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-amber-950/90 border border-amber-500/60 px-2 py-0.5 rounded-full text-xs font-bold text-amber-300 shadow-lg">
          <span>🩹 Injured</span>
        </div>
      )}

      {/* 4. Ornate Gold Filigree Corner Accents */}
      <div className="pointer-events-none absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-amber-400/80 rounded-tl-md" />
      <div className="pointer-events-none absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-amber-400/80 rounded-tr-md" />
      <div className="pointer-events-none absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-amber-400/80 rounded-bl-md" />
      <div className="pointer-events-none absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-amber-400/80 rounded-br-md" />

      {/* 5. Gacha Shimmer Sweep */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-gacha-shimmer" />
      </div>
    </div>
  );
};
