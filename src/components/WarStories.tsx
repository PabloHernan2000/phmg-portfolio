import React, { useState } from 'react';
import { WAR_STORIES } from '../data/portfolioData';
import { WarStory } from '../types';
import { AlertTriangle, CheckCircle, RefreshCw, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RevealOnScroll } from './RevealOnScroll';
import { sound } from '../utils/audio';

export const WarStories: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<WarStory>(WAR_STORIES[0]);
  const [activeTab, setActiveTab] = useState<'after' | 'before'>('after');

  return (
    <section id="war-stories" className="py-20 border-t border-white/[0.08] bg-[#07080b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <RevealOnScroll>
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-3">
              <RefreshCw className="w-3.5 h-3.5" />
              EXPEDIENTES DE RESCATE & INGENIERÍA INVERSA
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              War Stories: Resolviendo lo Imposible en el Sector Público
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
              Sistemas abandonados, binarios sin código fuente y código arqueológico de más de dos décadas modernizados con éxito.
            </p>
          </div>
        </RevealOnScroll>

        {/* Case Switcher Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {WAR_STORIES.map((story, idx) => {
            const isSelected = selectedStory.id === story.id;
            return (
              <RevealOnScroll key={story.id} delay={0.1 * idx}>
                <div
                  onClick={() => {
                    setSelectedStory(story);
                    sound.playClick();
                  }}
                  className={`tactile-card cursor-pointer p-6 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                      : 'bg-[#0d0f15] border-white/[0.08] hover:border-white/[0.2]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/40 text-amber-300 border border-amber-500/20">
                      {story.category}
                    </span>
                    <span className="text-xs font-mono text-slate-500">{story.period}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-white tracking-tight mb-2">
                    {story.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {story.challenge}
                  </p>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Selected Story Detailed Case Study */}
        <RevealOnScroll delay={0.2}>
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0d0f15] border border-white/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Story Context & Impact */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <span className="text-xs font-mono text-amber-400 font-semibold uppercase">
                  {selectedStory.period}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {selectedStory.title}
                </h3>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-semibold mb-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  EL PROBLEMA Y RIESGO CRÍTICO
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedStory.challenge}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-semibold mb-1.5">
                  <Cpu className="w-4 h-4" />
                  LA SOLUCIÓN DE INGENIERÍA
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedStory.solution}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold mb-1">
                  <CheckCircle className="w-4 h-4" />
                  IMPACTO REAL EN PRODUCCIÓN
                </div>
                <p className="text-sm text-slate-200 font-medium">
                  {selectedStory.impact}
                </p>
              </div>
            </div>

            {/* Interactive Code Comparison */}
            <div className="lg:col-span-6 flex flex-col">
              {/* Tab Selector */}
              <div className="flex items-center justify-between p-1 rounded-t-xl bg-[#090b10] border border-white/[0.08] border-b-0">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setActiveTab('after');
                      sound.playClick();
                    }}
                    className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                      activeTab === 'after'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ✓ CÓDIGO REFACTORIZADO / MODERNO
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('before');
                      sound.playClick();
                    }}
                    className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                      activeTab === 'before'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ⚠ ESTADO ANTERIOR / INSEGURO
                  </button>
                </div>
                <span className="text-[10px] font-mono text-slate-500 pr-2">DIFF COMPARISON</span>
              </div>

              {/* Code Panel */}
              <div className="flex-1 p-4 rounded-b-xl bg-[#090b10] border border-white/[0.08] font-mono text-xs overflow-x-auto leading-relaxed">
                <AnimatePresence mode="wait">
                  <motion.pre
                    key={`${selectedStory.id}-${activeTab}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className={activeTab === 'after' ? 'text-emerald-300' : 'text-rose-300'}
                  >
                    <code>
                      {activeTab === 'after' ? selectedStory.after : selectedStory.before}
                    </code>
                  </motion.pre>
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </RevealOnScroll>

      </div>
    </section>
  );
};
