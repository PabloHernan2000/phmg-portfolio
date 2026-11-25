import React, { useState } from 'react';
import { Mail, Copy, Check, ExternalLink, Lock, Send, FileText, Download } from 'lucide-react';
import { sound } from '../utils/audio';

export const SecurityContact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const email = 'phernanmg@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    sound.playTelemetry();
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playTelemetry();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 border-t border-white/[0.08] bg-[#07080b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
            <Lock className="w-3.5 h-3.5" />
            CANAL DE CONTACTO PROFESIONAL
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Contacto & Oportunidades
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
            Disponible para roles de ingeniería de software senior, arquitectura de sistemas distribuidos y desarrollo de software de misión crítica.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Quick Connect & CV Channels */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card with 1-Click Copy */}
            <div className="p-6 rounded-xl bg-[#0d0f15] border border-white/[0.08]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400">CORREO DIRECTO</span>
                <Mail className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-base font-mono font-semibold text-white mb-3">
                {email}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyEmail}
                  className="tactile-btn flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-mono transition-colors"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? '¡CORREO COPIADO!' : 'COPIAR CORREO'}</span>
                </button>

                <a
                  href={`mailto:${email}`}
                  onClick={() => sound.playClick()}
                  className="tactile-btn p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white transition-colors"
                  title="Abrir cliente de correo"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Curriculum Vitae Download Card */}
            <div className="p-6 rounded-xl bg-[#0d0f15] border border-white/[0.08]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400">CURRICULUM VITAE</span>
                <FileText className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-sm font-bold text-white mb-1">
                CV Oficial en PDF (Actualizado)
              </div>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Descarga mi resumen profesional completo con detalle de stack, experiencia en gobierno y formación académica.
              </p>

              <a
                href="/CV_Pablo_Hernan_Munoz_Garcia.pdf"
                download="CV_Pablo_Hernan_Munoz_Garcia.pdf"
                onClick={() => sound.playTelemetry()}
                className="tactile-btn w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs font-mono shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DESCARGAR CV EN PDF</span>
              </a>
            </div>

            {/* Social & GitHub Links */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://github.com/PabloHernan2000"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="tactile-card p-4 rounded-xl bg-[#0d0f15] border border-white/[0.08] hover:border-white/[0.2] transition-all flex items-center justify-between text-xs font-mono text-slate-300 hover:text-white"
              >
                <span>GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="tactile-card p-4 rounded-xl bg-[#0d0f15] border border-white/[0.08] hover:border-white/[0.2] transition-all flex items-center justify-between text-xs font-mono text-slate-300 hover:text-white"
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>
            </div>

          </div>

          {/* Contact Message Terminal */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0d0f15] border border-white/[0.08]">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-6 flex items-center justify-between">
                <span>TERMINAL DE TRANSMISIÓN DIRECTA</span>
                <span className="text-emerald-400 font-semibold">PROTOCOLO: SECURE_POST</span>
              </div>

              {formSubmitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Transmisión Exitosa</h4>
                  <p className="text-xs text-slate-400 max-w-sm">
                    El mensaje ha sido registrado y procesado. Recibirás respuesta técnica a la brevedad.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">
                        NOMBRE / IDENTIDAD
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Ing. Carlos Mendoza"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/[0.1] text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/60 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">
                        CORREO ELECTRÓNICO
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="contacto@organizacion.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/[0.1] text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/60 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      MENSAJE / PROPUESTA TÉCNICA
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Describa el alcance del proyecto, requerimientos de escalabilidad o perfil del rol..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/[0.1] text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/60 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="tactile-btn w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs font-mono shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>ENVIAR TRANSMISIÓN SANITIZADA</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
