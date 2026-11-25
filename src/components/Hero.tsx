import React, { useState, useEffect } from 'react';
import { ShieldCheck, Activity, Database, Server, ArrowDown, MapPin, ExternalLink, FileCode } from 'lucide-react';
import { SYSTEM_METRICS } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const Hero: React.FC = () => {
  const [localTime, setLocalTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      // Pachuca de Soto timezone (America/Mexico_City)
      const now = new Date();
      const formatted = now.toLocaleTimeString('es-MX', {
        timeZone: 'America/Mexico_City',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setLocalTime(formatted);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Subtle Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[400px] h-[250px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Tag & Security Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            GOBIERNO DEL ESTADO DE HIDALGO // SISTEMAS DE MISIÓN CRÍTICA
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              Pachuca de Soto, Hgo
            </span>
            <span className="hidden sm:inline-block text-slate-600">•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400/80" />
              HORA SISTEMA: <span className="text-slate-200 font-semibold">{localTime || '16:00:00'}</span> (UTC-6)
            </span>
          </div>
        </div>

        {/* Hero Title & Authoritative Pitch */}
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
            Pablo Hernán Muñoz García
          </h1>
          <p className="mt-3 text-lg sm:text-xl font-mono text-blue-400 tracking-tight">
            Full-Stack Software Engineer & Candidato a Maestro en Ciberseguridad
          </p>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Especializado en la arquitectura y operación de plataformas donde el fallo no es una opción. 
            Responsable del desarrollo del sistema de transporte urbano estatal con más de{' '}
            <strong className="text-white font-semibold underline decoration-emerald-500 decoration-2 underline-offset-4">
              70,000 usuarios activos
            </strong>, APIs modulares de alto rendimiento con Redis, autenticación biométrica de confianza cero y rescate de sistemas heredados de misión crítica.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#topology"
            onClick={() => sound.playClick()}
            className="tactile-btn px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all"
          >
            <Activity className="w-4 h-4" />
            Explorar Topología de Sistemas
          </a>

          <a
            href="#war-stories"
            onClick={() => sound.playClick()}
            className="tactile-btn px-5 py-2.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-white font-medium text-sm flex items-center gap-2 transition-all"
          >
            <FileCode className="w-4 h-4 text-blue-400" />
            Ver Rescate de Sistemas (.NET y PHP 3)
          </a>

          <a
            href="https://github.com/PabloHernan2000"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="tactile-btn px-4 py-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] text-slate-300 hover:text-white font-mono text-xs flex items-center gap-1.5 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            GitHub
          </a>
        </div>

        {/* 4 Telemetry Metrics Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SYSTEM_METRICS.map((metric, i) => (
            <div
              key={i}
              onClick={() => sound.playTelemetry()}
              className="tactile-card group cursor-pointer relative p-5 rounded-xl bg-[#0d0f15]/80 border border-white/[0.08] hover:border-emerald-500/40 transition-all backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/[0.05]">
                  {metric.badge}
                </span>
                {i === 0 && <Activity className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />}
                {i === 1 && <Database className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />}
                {i === 2 && <ShieldCheck className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />}
                {i === 3 && <Server className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />}
              </div>

              <div className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                {metric.value}
              </div>

              <div className="mt-1 text-xs font-medium text-slate-300">
                {metric.label}
              </div>

              <div className="mt-2 text-[11px] font-mono text-slate-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
                {metric.delta}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 flex items-center justify-center">
          <a
            href="#topology"
            onClick={() => sound.playClick()}
            className="flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors"
          >
            <span>BAJAR AL FLUJO ARQUITECTÓNICO</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>

      </div>
    </section>
  );
};
