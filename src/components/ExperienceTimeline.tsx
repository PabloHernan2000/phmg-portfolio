import React from 'react';
import { WORK_EXPERIENCE, EDUCATION } from '../data/portfolioData';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audio';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-20 border-t border-white/[0.08] bg-[#07080b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            HISTORIAL PROFESIONAL & FORMACIÓN
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Trayectoria en Producción & Ciberseguridad
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
            Más de 3 años diseñando, desplegando y rescatando sistemas en el sector público y académico.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Work Experience Column */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="text-sm font-mono text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              EXPERIENCIA LABORAL
            </h3>

            <div className="space-y-6 relative border-l border-white/[0.1] pl-6 ml-3">
              {WORK_EXPERIENCE.map((exp) => (
                <div
                  key={exp.id}
                  onClick={() => sound.playClick()}
                  className="p-6 rounded-xl bg-[#0d0f15] border border-white/[0.08] hover:border-white/[0.2] transition-all relative group"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] top-6 w-3 h-3 rounded-full bg-blue-500 border-2 border-[#07080b] group-hover:scale-125 transition-transform" />

                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono text-blue-400 font-semibold">
                      {exp.role}
                    </span>
                    {exp.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                        {exp.badge}
                      </span>
                    )}
                  </div>

                  <h4 className="text-lg font-bold text-white tracking-tight">
                    {exp.company}
                  </h4>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 mt-1 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>

                  {/* Achievements */}
                  <ul className="space-y-2 text-xs text-slate-300 leading-relaxed mb-4">
                    {exp.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack pills */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/[0.06]">
                    {exp.technologies.map((t, idx) => (
                      <span key={idx} className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Credentials Column */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-sm font-mono text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              EDUCACIÓN Y GRADOS
            </h3>

            <div className="space-y-4">
              {EDUCATION.map((edu, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-[#0d0f15] border border-white/[0.08]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-semibold">
                      {edu.period}
                    </span>
                    <GraduationCap className="w-4 h-4 text-purple-400" />
                  </div>
                  <h4 className="text-base font-bold text-white tracking-tight">
                    {edu.degree}
                  </h4>
                  <div className="text-xs font-mono text-slate-400 mt-0.5">
                    {edu.institution}
                  </div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {edu.focus}
                  </p>
                </div>
              ))}

              {/* Languages Card */}
              <div className="p-5 rounded-xl bg-[#0d0f15] border border-white/[0.08]">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                  COMPETENCIA LINGÜÍSTICA
                </h4>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between p-2 rounded bg-black/30">
                    <span className="text-white">Español</span>
                    <span className="text-emerald-400">Nativo</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-black/30">
                    <span className="text-white">Inglés</span>
                    <span className="text-blue-400">B1 — Intermedio Técnico</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
