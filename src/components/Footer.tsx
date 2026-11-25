import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#050608] py-8 text-xs font-mono text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-200 font-semibold tracking-tight">Pablo Hernán Muñoz García</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">Pachuca de Soto, Hidalgo, México</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[11px]">
          <a
            href="mailto:phernanmg@gmail.com"
            className="text-slate-400 hover:text-white transition-colors"
          >
            phernanmg@gmail.com
          </a>
          <span className="text-slate-600">•</span>
          <a
            href="https://github.com/PabloHernan2000"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            GitHub
          </a>
          <span className="text-slate-600">•</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};
