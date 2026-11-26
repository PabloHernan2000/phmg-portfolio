import React, { useState } from 'react';
import { 
  Trophy, 
  Gamepad2, 
  Sparkles, 
  ShieldAlert, 
  Award,
  Zap
} from 'lucide-react';
import { sound } from '../utils/audio';

interface PassionLabProps {
  isScanlinesActive: boolean;
  onToggleScanlines: () => void;
  onOpenCommand: () => void;
}

export const PassionLab: React.FC<PassionLabProps> = ({
  onToggleScanlines,
  onOpenCommand,
  isScanlinesActive,
}) => {
  const [activeTab, setActiveTab] = useState<'football' | 'gaming'>('football');
  const [selectedPlayer, setSelectedPlayer] = useState<string>('POR');

  const TACTICAL_LINEUP = [
    { pos: 'DC', role: 'Delantero Centro', module: 'Metrotransit Mobile', desc: 'Presión alta: experiencia de cara al usuario final y códigos QR dinámicos.', stat: '70k Pasajeros' },
    { pos: 'EI', role: 'Extremo Izquierdo', module: 'Transit Ops Portal', desc: 'Apertura de cancha: dashboards en tiempo real y matrices de riesgo.', stat: '500ms Sync' },
    { pos: 'ED', role: 'Extremo Derecho', module: 'Vite Admin Control', desc: 'Desborde y precisión: reportes automatizados en PDF y Excel.', stat: '100% Automatizado' },
    { pos: 'MC', role: 'Mediocampo Creador', module: 'Urban Transit REST API', desc: 'Distribución y ritmo de juego: inyección de dependencias modular.', stat: '1,450 RPS' },
    { pos: 'MCD', role: 'Pivote Defensivo', module: 'Redis Distributed Cache', desc: 'Intercepta todo antes de que toque la defensa: latencia de 4ms.', stat: '94.2% Hit Rate' },
    { pos: 'DFC', role: 'Defensa Central', module: 'PostgreSQL & SQL Server', desc: 'Persistencia férrea: integridad transaccional ACID indiscutible.', stat: 'Zero Corrupción' },
    { pos: 'POR', role: 'Portero Imbatido', module: 'Biometric Enrollment Shield', desc: 'Guante de oro de ciberseguridad: cero vulnerabilidades concedidas.', stat: 'Clean Sheet 100%' },
  ];

  const ACHIEVEMENTS = [
    { title: 'Arquitecto de Estado', desc: 'Operó plataforma estatal de transporte con 70,000+ pasajeros.', icon: <Award className="w-4 h-4 text-emerald-400" />, unlocked: true },
    { title: 'Cazador de Legacy', desc: 'Modernizó código PHP 3 y revirtió binarios .NET sin código fuente.', icon: <Zap className="w-4 h-4 text-amber-400" />, unlocked: true },
    { title: 'Portería Imbatida', desc: 'Candidato a Maestría en Ciberseguridad con enfoque Zero-Trust.', icon: <ShieldAlert className="w-4 h-4 text-blue-400" />, unlocked: true },
    { title: 'El Sol de Pachuca', desc: 'Escucha Luis Miguel mientras diseña APIs con tipado estricto.', icon: <Sparkles className="w-4 h-4 text-yellow-400" />, unlocked: true },
  ];

  return (
    <section id="passion-lab" className="py-20 border-t border-white/[0.08] bg-[#07080b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              THE PASSION LAB // FÚTBOL, GAMING & LUIS MIGUEL
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Ingeniería con Alma: Táctica, Videojuegos y Buena Música
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
              Donde la rigurosidad técnica se encuentra con las pasiones personales. Cómo el fútbol explica mi arquitectura y la música acompaña el código.
            </p>
          </div>

          {/* Sub-Tabs Selector */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0d0f15] border border-white/[0.08]">
            <button
              onClick={() => {
                setActiveTab('football');
                sound.playClick();
              }}
              className={`tactile-btn flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeTab === 'football'
                  ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>FÚTBOL TÁCTICO</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('gaming');
                sound.playClick();
              }}
              className={`tactile-btn flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeTab === 'gaming'
                  ? 'bg-blue-500/20 border border-blue-500/40 text-blue-300'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>VIDEOJUEGOS & HUD</span>
            </button>
          </div>
        </div>

        {/* TAB 1: FÚTBOL TÁCTICO 4-3-3 */}
        {activeTab === 'football' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 rounded-2xl bg-[#0d0f15] border border-white/[0.08]">
            
            {/* The Pitch (Canvas 2D Táctico) */}
            <div className="lg:col-span-7 rounded-xl bg-gradient-to-b from-[#0e2a1b] to-[#0a1e13] border-2 border-emerald-500/30 p-6 relative min-h-[380px] flex flex-col justify-between overflow-hidden shadow-inner">
              {/* Pitch Markings */}
              <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-[1px] bg-white/20 pointer-events-none" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border border-white/20 pointer-events-none" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/40 pointer-events-none" />
              {/* Penalty Boxes */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2 w-48 h-20 border-b border-x border-white/20 pointer-events-none" />
              <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-48 h-20 border-t border-x border-white/20 pointer-events-none" />

              {/* Delantera (Ataque / Frontend) */}
              <div className="flex justify-around relative z-10">
                {['EI', 'DC', 'ED'].map((pos) => {
                  const p = TACTICAL_LINEUP.find(l => l.pos === pos)!;
                  const isCurrent = selectedPlayer === pos;
                  return (
                    <button
                      key={pos}
                      onClick={() => {
                        setSelectedPlayer(pos);
                        sound.playClick();
                      }}
                      className={`tactile-btn flex flex-col items-center group cursor-pointer`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                        isCurrent
                          ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(251,191,36,0.6)] scale-110'
                          : 'bg-emerald-600/90 hover:bg-emerald-500 text-white border border-white/20'
                      }`}>
                        {pos}
                      </div>
                      <span className="text-[10px] font-mono text-white/80 mt-1 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm">
                        {p.module.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Mediocampo (Distribución / APIs & Redis) */}
              <div className="flex justify-around px-8 relative z-10">
                {['MC', 'MCD'].map((pos) => {
                  const p = TACTICAL_LINEUP.find(l => l.pos === pos)!;
                  const isCurrent = selectedPlayer === pos;
                  return (
                    <button
                      key={pos}
                      onClick={() => {
                        setSelectedPlayer(pos);
                        sound.playClick();
                      }}
                      className={`tactile-btn flex flex-col items-center group cursor-pointer`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                        isCurrent
                          ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(251,191,36,0.6)] scale-110'
                          : 'bg-blue-600/90 hover:bg-blue-500 text-white border border-white/20'
                      }`}>
                        {pos}
                      </div>
                      <span className="text-[10px] font-mono text-white/80 mt-1 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm">
                        {p.module.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Defensa y Portero (Seguridad & Base de Datos) */}
              <div className="flex justify-around items-end px-12 relative z-10">
                {['DFC', 'POR'].map((pos) => {
                  const p = TACTICAL_LINEUP.find(l => l.pos === pos)!;
                  const isCurrent = selectedPlayer === pos;
                  return (
                    <button
                      key={pos}
                      onClick={() => {
                        setSelectedPlayer(pos);
                        sound.playClick();
                      }}
                      className={`tactile-btn flex flex-col items-center group cursor-pointer`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                        isCurrent
                          ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(251,191,36,0.6)] scale-110'
                          : 'bg-rose-700/90 hover:bg-rose-600 text-white border border-white/20'
                      }`}>
                        {pos}
                      </div>
                      <span className="text-[10px] font-mono text-white/80 mt-1 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm">
                        {p.module.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tactical Inspector & Stats */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              {(() => {
                const player = TACTICAL_LINEUP.find(l => l.pos === selectedPlayer)!;
                return (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                        POSICIÓN // {player.pos}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{player.role}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      {player.module}
                    </h3>
                    <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                      {player.desc}
                    </p>

                    <div className="mt-4 p-4 rounded-xl bg-black/40 border border-white/[0.08]">
                      <div className="text-xs font-mono text-slate-400">ESTADÍSTICA CLAVE DE JUEGO</div>
                      <div className="text-xl font-mono font-bold text-emerald-400 mt-0.5">
                        {player.stat}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Match Highlights */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-[11px] font-mono text-slate-400">PORTERÍA IMBATIDA</div>
                  <div className="text-lg font-mono font-bold text-white mt-0.5">100% Clean Sheet</div>
                  <div className="text-[10px] text-slate-500 mt-1">Cero brechas en biometría</div>
                </div>

                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-[11px] font-mono text-slate-400">EFICACIA DE PASES</div>
                  <div className="text-lg font-mono font-bold text-white mt-0.5">94.2% Cache Hit</div>
                  <div className="text-[10px] text-slate-500 mt-1">Redis asistiendo a Postgres</div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: VIDEOJUEGOS & HUD */}
        {activeTab === 'gaming' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0d0f15] border border-white/[0.08] space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-blue-400" />
                  Terminal Táctica & Logros Desbloqueados
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Atajos rápidos estilo Vim/Raycast, filtros CRT de monitor retro y medallas de ingeniería.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    sound.playClick();
                    onToggleScanlines();
                  }}
                  className={`tactile-btn px-4 py-2 rounded-lg border text-xs font-mono transition-all ${
                    isScanlinesActive
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                      : 'bg-white/[0.04] border-white/[0.1] text-slate-300'
                  }`}
                >
                  FILTRO CRT RETRO: {isScanlinesActive ? 'ON' : 'OFF'}
                </button>

                <button
                  onClick={() => {
                    sound.playCommandOpen();
                    onOpenCommand();
                  }}
                  className="tactile-btn px-4 py-2 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-300 text-xs font-mono flex items-center gap-2"
                >
                  <span>ABRIR CONSOLA (⌘K)</span>
                </button>
              </div>
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ACHIEVEMENTS.map((ach, idx) => (
                <div
                  key={idx}
                  onClick={() => sound.playTelemetry()}
                  className="p-4 rounded-xl bg-black/40 border border-white/[0.08] hover:border-blue-500/30 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-lg bg-white/[0.05] border border-white/[0.05]">
                      {ach.icon}
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                      DESBLOQUEADO
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                    {ach.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    {ach.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Keybind Reference */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
              <span className="text-slate-300 font-semibold">ATAJOS GLOBALES ACTIVOS:</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-black border border-white/10 text-white">⌘K</kbd> Consola de comandos</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-black border border-white/10 text-white">M</kbd> Silenciar audio</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-black border border-white/10 text-white">C</kbd> Modo CRT</span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
