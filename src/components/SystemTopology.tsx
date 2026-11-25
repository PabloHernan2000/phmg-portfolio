import React, { useState } from 'react';
import { CORE_PROJECTS } from '../data/portfolioData';
import { ProjectSystem } from '../types';
import { 
  Network, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2, 
  Cpu, 
  Smartphone, 
  Radio, 
  Fingerprint, 
  ArrowRight,
  Play
} from 'lucide-react';
import { sound } from '../utils/audio';

export const SystemTopology: React.FC = () => {
  const [activeProject, setActiveProject] = useState<ProjectSystem>(CORE_PROJECTS[0]);
  const [simulationStep, setSimulationStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationStep(1);
    sound.playTelemetry();

    setTimeout(() => {
      setSimulationStep(2);
      sound.playClick();
    }, 900);

    setTimeout(() => {
      setSimulationStep(3);
      sound.playTelemetry();
    }, 1800);

    setTimeout(() => {
      setSimulationStep(4);
      sound.playClick();
    }, 2700);

    setTimeout(() => {
      setSimulationStep(0);
      setIsSimulating(false);
      sound.playTelemetry();
    }, 3800);
  };

  const getLayerIcon = (layer: ProjectSystem['layer']) => {
    switch (layer) {
      case 'Core API': return <Cpu className="w-4 h-4 text-blue-400" />;
      case 'Central Ops': return <Radio className="w-4 h-4 text-emerald-400" />;
      case 'Mobile Edge': return <Smartphone className="w-4 h-4 text-amber-400" />;
      case 'Security Shield': return <Fingerprint className="w-4 h-4 text-rose-400" />;
    }
  };

  return (
    <section id="topology" className="py-20 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-3">
              <Network className="w-3.5 h-3.5" />
              SISTEMA INTEGRADO DE TRANSPORTE ESTATAL
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Topología de Sistemas & Servicios Críticos
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
              Arquitectura distribuida en producción para más de 70,000 usuarios. Explora los 4 módulos de software y su orquestación en tiempo real.
            </p>
          </div>

          {/* Interactive Simulation Trigger */}
          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className={`tactile-btn flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-mono transition-all ${
              isSimulating
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                : 'bg-white/[0.04] border-white/[0.1] text-slate-300 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            <Play className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin text-emerald-400' : 'text-emerald-400'}`} />
            <span>{isSimulating ? 'SIMULANDO TRÁFICO END-TO-END...' : 'SIMULAR FLUJO DE PASAJERO'}</span>
          </button>
        </div>

        {/* Live Topology Flow Visualizer */}
        <div className="mb-8 p-4 sm:p-6 rounded-xl bg-[#090b10] border border-white/[0.08] relative overflow-hidden">
          <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>MAPA DE FLUJO DISTRIBUIDO (PACHUCA - RED ESTATAL)</span>
            <span className="text-emerald-400 font-semibold">{isSimulating ? 'ESTADO: TRANSMITIENDO PAQUETES' : 'ESTADO: LATENCIA NOMINAL'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {CORE_PROJECTS.map((proj, idx) => {
              const isSelected = activeProject.id === proj.id;
              const isActiveInSimulation = simulationStep === idx + 1;

              return (
                <div
                  key={proj.id}
                  onClick={() => {
                    setActiveProject(proj);
                    sound.playClick();
                  }}
                  className={`cursor-pointer p-4 rounded-lg border transition-all relative ${
                    isActiveInSimulation
                      ? 'bg-emerald-500/15 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : isSelected
                      ? 'bg-blue-500/10 border-blue-400/50 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                      : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.15]'
                  }`}
                >
                  {/* Step Sequence Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/50 text-slate-400 border border-white/5">
                      NODE 0{idx + 1}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {getLayerIcon(proj.layer)}
                      <span className="text-[11px] font-mono text-slate-300 font-medium">{proj.layer}</span>
                    </div>
                  </div>

                  <h3 className="text-sm font-semibold text-white tracking-tight mb-1">
                    {proj.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {proj.tagline}
                  </p>

                  {/* Flow Arrow for desktop */}
                  {idx < 3 && (
                    <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-slate-600">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Project In-Depth Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 rounded-2xl bg-[#0d0f15] border border-white/[0.08] shadow-2xl">
          
          {/* Left Info Column */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
                  {activeProject.layer}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  {activeProject.architecture}
                </span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {activeProject.name}
              </h3>
              <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
                {activeProject.description}
              </p>
            </div>

            {/* Metrics Chips */}
            <div className="grid grid-cols-3 gap-3">
              {activeProject.metrics.map((m, i) => (
                <div key={i} className="p-3 rounded-lg bg-black/30 border border-white/[0.06]">
                  <div className="text-[11px] font-mono text-slate-400">{m.label}</div>
                  <div className="text-lg font-mono font-bold text-white mt-0.5">{m.value}</div>
                </div>
              ))}
            </div>

            {/* Security Highlights */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold mb-3">
                <ShieldCheck className="w-4 h-4" />
                CIBERSEGURIDAD & DEFENSA EN PROFUNDIDAD
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {activeProject.securityHighlights.map((sh, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{sh}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stack Tags & GitHub Link */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap items-center gap-1.5">
                {activeProject.stack.map((tech, i) => (
                  <span key={i} className="text-xs font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-300 border border-white/[0.06]">
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href={activeProject.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="tactile-btn inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-mono transition-colors"
              >
                <span>Ver Repositorio GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Code Column */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center justify-between px-4 py-2.5 rounded-t-xl bg-[#090b10] border border-white/[0.08] border-b-0 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                <span className="ml-2 text-slate-300">{activeProject.codeSnippet.filename}</span>
              </div>
              <span className="text-[10px] uppercase text-slate-500">{activeProject.codeSnippet.language}</span>
            </div>

            <div className="flex-1 p-4 rounded-b-xl bg-[#090b10] border border-white/[0.08] overflow-x-auto font-mono text-xs text-slate-300 leading-relaxed">
              <pre>
                <code>{activeProject.codeSnippet.code}</code>
              </pre>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
