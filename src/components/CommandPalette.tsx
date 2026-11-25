import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Activity, 
  FileCode, 
  Trophy, 
  Disc3, 
  Mail, 
  ExternalLink, 
  X,
  Radio,
  Volume2,
  FileText
} from 'lucide-react';
import { sound } from '../utils/audio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  isScanlinesActive: boolean;
  onToggleScanlines: () => void;
  isBgmPlaying: boolean;
  onToggleBgm: () => void;
  onToggleMute: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  isScanlinesActive,
  onToggleScanlines,
  isBgmPlaying,
  onToggleBgm,
  onToggleMute,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const COMMANDS = [
    {
      id: 'topo',
      title: 'Topología de Sistemas (4 Repositorios)',
      subtitle: 'Navegar a Urban Transit API, Ops Portal, Metro Mobile y Biometría',
      icon: <Activity className="w-4 h-4 text-emerald-400" />,
      action: () => {
        window.location.hash = '#topology';
        onClose();
      }
    },
    {
      id: 'war',
      title: 'War Stories (.NET a PHP 8 sin código)',
      subtitle: 'Explorar expedientes de ingeniería inversa y modernización',
      icon: <FileCode className="w-4 h-4 text-amber-400" />,
      action: () => {
        window.location.hash = '#war-stories';
        onClose();
      }
    },
    {
      id: 'passion',
      title: 'The Passion Lab (Fútbol, Gaming & Luismi)',
      subtitle: 'Ver táctica 4-3-3 y reproductor analógico',
      icon: <Trophy className="w-4 h-4 text-yellow-400" />,
      action: () => {
        window.location.hash = '#passion-lab';
        onClose();
      }
    },
    {
      id: 'luismi',
      title: isBgmPlaying ? 'Pausar Luis Miguel Lo-Fi' : 'Reproducir Luis Miguel Lo-Fi (Suave)',
      subtitle: 'Alternar sintetizador de acordes Web Audio API',
      icon: <Disc3 className="w-4 h-4 text-amber-400" />,
      action: () => {
        onToggleBgm();
        onClose();
      }
    },
    {
      id: 'crt',
      title: isScanlinesActive ? 'Desactivar Modo CRT Retro' : 'Activar Modo CRT Retro Arcade',
      subtitle: 'Alternar simulación de monitor fósforo',
      icon: <Radio className="w-4 h-4 text-blue-400" />,
      action: () => {
        onToggleScanlines();
        onClose();
      }
    },
    {
      id: 'mute',
      title: 'Silenciar / Activar Efectos Hápticos',
      subtitle: 'Alternar micro-sonidos táctiles de Emil Kowalski',
      icon: <Volume2 className="w-4 h-4 text-purple-400" />,
      action: () => {
        onToggleMute();
        onClose();
      }
    },
    {
      id: 'cv',
      title: 'Descargar Curriculum Vitae (PDF)',
      subtitle: 'Guardar archivo oficial en PDF actualizado',
      icon: <FileText className="w-4 h-4 text-emerald-400" />,
      action: () => {
        const link = document.createElement('a');
        link.href = '/CV_Pablo_Hernan_Munoz_Garcia.pdf';
        link.download = 'CV_Pablo_Hernan_Munoz_Garcia.pdf';
        link.click();
        onClose();
      }
    },
    {
      id: 'contact',
      title: 'Contacto Profesional',
      subtitle: 'Ir a terminal de transmisión y copiar correo',
      icon: <Mail className="w-4 h-4 text-blue-400" />,
      action: () => {
        window.location.hash = '#contact';
        onClose();
      }
    },
    {
      id: 'gh',
      title: 'Abrir GitHub de Pablo Muñoz',
      subtitle: 'github.com/PabloHernan2000',
      icon: <ExternalLink className="w-4 h-4 text-slate-400" />,
      action: () => {
        window.open('https://github.com/PabloHernan2000', '_blank');
        onClose();
      }
    }
  ];

  const filtered = COMMANDS.filter(c => 
    c.title.toLowerCase().includes(query.toLowerCase()) || 
    c.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-md">
      <div 
        className="w-full max-w-2xl rounded-2xl bg-[#0d0f15] border border-white/[0.15] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/[0.08] bg-[#090b10]">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Escribe un comando, sección o acción... (ej. 'Luismi', 'API', 'CRT')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent px-3 text-sm font-mono text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filtered.length > 0 ? (
            filtered.map((cmd) => (
              <button
                key={cmd.id}
                onClick={() => {
                  sound.playClick();
                  cmd.action();
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.06] transition-colors text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-black/40 border border-white/[0.05] group-hover:border-white/[0.15] transition-colors">
                    {cmd.icon}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      {cmd.title}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {cmd.subtitle}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-300">
                  EJECUTAR ↵
                </span>
              </button>
            ))
          ) : (
            <div className="py-8 text-center text-xs font-mono text-slate-500">
              No se encontraron comandos para "{query}"
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2 bg-[#090b10] border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>NAVEGACIÓN RAYCAST // HUD OPS</span>
          <div className="flex items-center gap-2">
            <span>ESC para cerrar</span>
          </div>
        </div>
      </div>
    </div>
  );
};
