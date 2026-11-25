import React from 'react';
import { Terminal, Shield, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#050608] py-12 text-xs font-mono text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
          {/* Identity */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
              P
            </div>
            <div>
              <span className="text-sm font-semibold text-white">
                Pablo Hernán Muñoz García
              </span>
              <p className="text-[11px] text-slate-500">
                Pachuca de Soto, Hidalgo, México • phernanmg@gmail.com
              </p>
            </div>
          </div>

          {/* Standards & Badges */}
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Shield className="w-3.5 h-3.5" />
              OWASP Top 10 Hardened
            </span>
            <span className="flex items-center gap-1.5 text-blue-400">
              <Cpu className="w-3.5 h-3.5" />
              TypeScript Strict Mode
            </span>
            <span className="flex items-center gap-1.5 text-purple-400">
              <Terminal className="w-3.5 h-3.5" />
              120 FPS Motion Craft
            </span>
          </div>
        </div>

        {/* Bottom Credits & Build Hash */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © {new Date().getFullYear()} Pablo Muñoz. Diseñado bajo principios de Emil Kowalski, UI-UX Mastery & Ciberseguridad.
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-400">BUILD: v2.4.0-STABLE // LATENCIA P99: 4ms</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
