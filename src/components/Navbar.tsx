import React from 'react';
import { Terminal, Shield, Volume2, VolumeX, Disc3, Radio } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  onOpenCommand: () => void;
  isAudioMuted: boolean;
  onToggleMute: () => void;
  isBgmPlaying: boolean;
  onToggleBgm: () => void;
  isScanlinesActive: boolean;
  onToggleScanlines: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommand,
  isAudioMuted,
  onToggleMute,
  isBgmPlaying,
  onToggleBgm,
  isScanlinesActive,
  onToggleScanlines,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#07080b]/85 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Callout */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#hero"
            onClick={() => sound.playClick()}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400 transition-colors">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-semibold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                PHMG<span className="text-emerald-500 font-mono">.sys</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/[0.05] text-slate-400 border border-white/[0.05]">
                Ops v2.4
              </span>
            </div>
          </a>

          {/* Telemetry Live Badge (No-wrap and compact) */}
          <div className="hidden xl:flex items-center gap-2 pl-3 border-l border-white/[0.08] shrink-0 whitespace-nowrap">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono text-slate-400 whitespace-nowrap">
              <span className="text-white font-medium">70,000+</span> En Línea
            </span>
          </div>
        </div>

        {/* Navigation Anchors */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-mono shrink-0">
          <a
            href="#topology"
            onClick={() => sound.playClick()}
            className="text-slate-400 hover:text-white transition-colors whitespace-nowrap"
          >
            Topología
          </a>
          <a
            href="#war-stories"
            onClick={() => sound.playClick()}
            className="text-slate-400 hover:text-white transition-colors whitespace-nowrap"
          >
            War Stories
          </a>
          <a
            href="#passion-lab"
            onClick={() => sound.playClick()}
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            Passion Lab
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
          </a>
          <a
            href="#experience"
            onClick={() => sound.playClick()}
            className="text-slate-400 hover:text-white transition-colors whitespace-nowrap"
          >
            Trayectoria
          </a>
        </nav>

        {/* Controls Bar */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Luismi Vinyl Button */}
          <button
            onClick={() => {
              sound.playClick();
              onToggleBgm();
            }}
            title={isBgmPlaying ? "Pausar música (Luis Miguel Lo-Fi)" : "Reproducir música (Luis Miguel Lo-Fi)"}
            className={`tactile-btn flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs font-mono transition-all ${
              isBgmPlaying
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                : 'bg-white/[0.03] border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            <Disc3 className={`w-3.5 h-3.5 ${isBgmPlaying ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Luismi.audio</span>
          </button>

          {/* Mute SFX Toggle */}
          <button
            onClick={() => {
              onToggleMute();
              sound.playClick();
            }}
            title={isAudioMuted ? "Activar sonido háptico" : "Silenciar efectos hápticos"}
            className="tactile-btn p-1.5 rounded-md border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors"
          >
            {isAudioMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

          {/* CRT Gaming Mode */}
          <button
            onClick={() => {
              sound.playClick();
              onToggleScanlines();
            }}
            title="Activar/desactivar filtro HUD Arcade CRT"
            className={`tactile-btn hidden md:flex items-center gap-1 px-2 py-1.5 rounded-md border text-xs font-mono transition-colors ${
              isScanlinesActive
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                : 'bg-white/[0.03] border-white/[0.08] text-slate-400 hover:text-white'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span className="text-[11px]">CRT</span>
          </button>

          {/* Command Palette Button */}
          <button
            onClick={() => {
              sound.playCommandOpen();
              onOpenCommand();
            }}
            className="tactile-btn flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-mono text-slate-200 transition-all shadow-sm"
          >
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Cmd</span>
            <kbd className="px-1.5 py-0.5 text-[10px] bg-black/40 border border-white/10 rounded text-slate-400">⌘K</kbd>
          </button>

          {/* Direct Security Contact CTA */}
          <a
            href="#contact"
            onClick={() => sound.playClick()}
            className="tactile-btn hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-medium transition-colors"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Contacto Seguro</span>
          </a>
        </div>

      </div>
    </header>
  );
};
