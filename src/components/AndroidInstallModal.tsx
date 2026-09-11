import React, { useState } from 'react';
import { 
  Smartphone, 
  Download, 
  X, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  Maximize2, 
  ShieldCheck, 
  Zap, 
  RotateCw, 
  Copy, 
  Check 
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { sound } from '../utils/audio';

interface AndroidInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AndroidInstallModal: React.FC<AndroidInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isAndroid, isIOS, install, requestLandscapeFullscreen } = usePWAInstall();
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [fullscreenActive, setFullscreenActive] = useState(false);

  if (!isOpen) return null;

  const currentUrl = window.location.href;

  const handleInstallClick = async () => {
    sound.playClick();
    const success = await install();
    if (success) {
      onClose();
    }
  };

  const handleFullscreenLock = async () => {
    sound.playClick();
    const success = await requestLandscapeFullscreen();
    if (success) {
      setFullscreenActive(true);
      setTimeout(() => setFullscreenActive(false), 3000);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedUrl(true);
    sound.playClick();
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-950 rounded-2xl border border-amber-500/40 shadow-2xl p-4 sm:p-5 flex flex-col max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-md">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-amber-200 uppercase tracking-wide">
                Android App & APK Options
              </h2>
              <p className="text-[11px] text-slate-400">
                Play in 100% immersive borderless landscape fullscreen
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Shared URL Status Banner */}
        <div className="mt-3 p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200">
          <div className="flex items-center gap-1.5 font-bold text-amber-300 mb-1">
            <span>⚡ How to Activate Your Public / Phone URL</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            In Google AI Studio, click the <strong className="text-white">"Share"</strong> button in the top-right bar. Once clicked, your public URL becomes active across all phones and PWABuilder without a 404 error.
          </p>
        </div>

        {/* Content Body */}
        <div className="mt-2 space-y-3.5">
          
          {/* Method 1: Instant Native Android WebAPK (Recommended) */}
          <div className="rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 p-3.5 border border-emerald-500/40 shadow-lg">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 uppercase tracking-wider">
                  Method 1 • Instant WebAPK (Recommended)
                </span>
                <h3 className="text-sm font-black text-emerald-200 mt-1">
                  1-Tap Native Android Install
                </h3>
              </div>
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            </div>

            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Modern Android automatically compiles this into a native <strong>WebAPK</strong> with its own icon in your app drawer, offline caching, and <strong>locks into borderless landscape mode</strong> without any browser URL bar.
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {isInstalled ? (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-600/50">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Already Installed on this device!</span>
                </div>
              ) : isInstallable ? (
                <button
                  onClick={handleInstallClick}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg active:scale-95 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Install App on Android</span>
                </button>
              ) : (
                <div className="text-[11px] text-amber-300 bg-amber-950/60 border border-amber-500/30 p-2 rounded-xl">
                  💡 On mobile Chrome / Samsung Internet: tap browser menu <strong className="text-white">(⋮)</strong> and select <strong className="text-white">"Install App"</strong> or <strong className="text-white">"Add to Home screen"</strong>.
                </div>
              )}

              {/* Instant Fullscreen Trigger */}
              <button
                onClick={handleFullscreenLock}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-700 hover:border-amber-400 transition-all active:scale-95"
              >
                <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                <span>{fullscreenActive ? 'Fullscreen Locked!' : 'Test Fullscreen Landscape'}</span>
              </button>
            </div>
          </div>

          {/* Method 2: Generate Standalone .APK via PWABuilder */}
          <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 p-3.5 border border-indigo-500/40 shadow-lg">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30 uppercase tracking-wider">
                  Method 2 • Standalone .APK File
                </span>
                <h3 className="text-sm font-black text-indigo-200 mt-1">
                  Download Standalone .APK for Sideloading
                </h3>
              </div>
              <Download className="w-5 h-5 text-indigo-400 shrink-0" />
            </div>

            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              If you specifically want a downloadable <strong>.apk file</strong> to install via files or distribute:
            </p>

            <ol className="text-xs text-slate-300 space-y-1.5 mt-2 pl-4 list-decimal marker:text-amber-400 marker:font-bold">
              <li>
                Open <a href="https://www.pwabuilder.com" target="_blank" rel="noreferrer" className="text-amber-400 underline font-semibold hover:text-amber-300">PWABuilder.com</a> (Microsoft's free official PWA packager).
              </li>
              <li>
                Paste this app's shared URL and tap <strong>"Start"</strong>.
              </li>
              <li>
                Click <strong>"Package for Android"</strong> ➔ It gives you a signed <strong className="text-white">.apk</strong> and Google Play <strong className="text-white">.aab</strong> package ready to install!
              </li>
            </ol>

            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={handleCopyUrl}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                <span>{copiedUrl ? 'URL Copied!' : 'Copy App URL'}</span>
              </button>

              <a
                href="https://www.pwabuilder.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md"
              >
                <span>Open PWABuilder</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Orientation Note */}
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <RotateCw className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Configured with <strong className="text-amber-300">landscape auto-lock</strong>. When launched from your phone home screen, your device will automatically rotate sideways into full handheld gaming view.
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
