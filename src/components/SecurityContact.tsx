import React, { useState } from 'react';
import { Mail, Copy, Check, ExternalLink, FileText, Download, UserCheck, MapPin } from 'lucide-react';
import { sound } from '../utils/audio';

export const SecurityContact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const email = 'phernanmg@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    sound.playTelemetry();
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-20 border-t border-white/[0.08] bg-[#07080b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
            <UserCheck className="w-3.5 h-3.5" />
            CONTACTO DIRECTO & DISPONIBILIDAD
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            ¿Hablamos de Sistemas o Nuevos Retos?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            Disponible para roles de ingeniería de software senior, arquitectura de sistemas distribuidos y desarrollo de plataformas de misión crítica.
          </p>
        </div>

        {/* 3 Balanced Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Direct Email */}
          <div className="p-6 rounded-2xl bg-[#0d0f15] border border-white/[0.08] flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                  COMUNICACIÓN DIRECTA
                </span>
                <Mail className="w-5 h-5 text-emerald-400" />
              </div>

              <h3 className="text-base font-bold text-white tracking-tight">
                Correo Electrónico
              </h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Respuesta en menos de 24 horas para propuestas técnicas, contrataciones y consultas.
              </p>
              
              <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/[0.06] text-xs font-mono font-medium text-slate-200 break-all select-all">
                {email}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handleCopyEmail}
                className="tactile-btn flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-mono transition-colors"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? '¡COPIADO!' : 'COPIAR CORREO'}</span>
              </button>

              <a
                href={`mailto:${email}`}
                onClick={() => sound.playClick()}
                className="tactile-btn p-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white transition-colors"
                title="Abrir en tu app de correo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 2: CV PDF Download */}
          <div className="p-6 rounded-2xl bg-[#0d0f15] border border-white/[0.08] flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold">
                  DOCUMENTO OFICIAL
                </span>
                <FileText className="w-5 h-5 text-blue-400" />
              </div>

              <h3 className="text-base font-bold text-white tracking-tight">
                Curriculum Vitae (PDF)
              </h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Resumen ejecutivo con detalle de stack (React, Node.js, SQL/PostgreSQL), experiencia gubernamental y maestría.
              </p>

              <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/[0.06] text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>FORMATO: PDF</span>
                <span className="text-emerald-400 font-semibold">ACTUALIZADO</span>
              </div>
            </div>

            <a
              href="/CV_Pablo_Hernan_Munoz_Garcia.pdf"
              download="CV_Pablo_Hernan_Munoz_Garcia.pdf"
              onClick={() => sound.playTelemetry()}
              className="tactile-btn w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs font-mono shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all"
            >
              <Download className="w-4 h-4" />
              <span>DESCARGAR CV COMPLETO</span>
            </a>
          </div>

          {/* Card 3: Social & Location */}
          <div className="p-6 rounded-2xl bg-[#0d0f15] border border-white/[0.08] flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-semibold">
                  REDES & CÓDIGO
                </span>
                <ExternalLink className="w-5 h-5 text-purple-400" />
              </div>

              <h3 className="text-base font-bold text-white tracking-tight">
                Presencia Profesional
              </h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Revisa mis contribuciones de código abierto y conecta en redes profesionales.
              </p>

              <div className="mt-4 space-y-2">
                <a
                  href="https://github.com/PabloHernan2000"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="tactile-card p-3 rounded-xl bg-black/40 border border-white/[0.06] hover:border-white/[0.2] transition-all flex items-center justify-between text-xs font-mono text-slate-300 hover:text-white"
                >
                  <span className="font-semibold">GitHub: PabloHernan2000</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="tactile-card p-3 rounded-xl bg-black/40 border border-white/[0.06] hover:border-white/[0.2] transition-all flex items-center justify-between text-xs font-mono text-slate-300 hover:text-white"
                >
                  <span className="font-semibold">LinkedIn: Pablo Muñoz</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 pt-2 border-t border-white/[0.06]">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Pachuca de Soto, Hidalgo, México</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
