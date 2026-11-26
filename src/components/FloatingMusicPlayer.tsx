import React, { useState } from 'react';
import { SPOTIFY_PLAYLIST_CONFIG } from '../data/portfolioData';
import { extractSpotifyPlaylistId } from '../utils/spotifyHelper';
import { 
  ChevronUp, 
  ChevronDown, 
  ExternalLink, 
  Disc3
} from 'lucide-react';
import { sound } from '../utils/audio';

export const FloatingMusicPlayer: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [playlistId] = useState<string>(
    extractSpotifyPlaylistId(SPOTIFY_PLAYLIST_CONFIG.playlistUrlOrId)
  );

  const embedUrl = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;
  const spotifyDirectUrl = `https://open.spotify.com/playlist/${playlistId}`;

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl transition-all duration-300">
      <div className="rounded-2xl bg-[#090b10]/95 backdrop-blur-2xl border border-white/[0.14] shadow-[0_12px_40px_rgba(0,0,0,0.8)] overflow-hidden">
        
        {/* Top Header Dock Bar */}
        <div className="flex items-center justify-between px-3.5 py-2.5 bg-black/60 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-6 h-6 rounded-full bg-[#1DB954]/20 border border-[#1DB954]/40 flex items-center justify-center shrink-0">
              <Disc3 className="w-3.5 h-3.5 text-[#1DB954] animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-mono font-bold text-white tracking-tight truncate block">
                {SPOTIFY_PLAYLIST_CONFIG.title}
              </span>
              <span className="text-[10px] font-mono text-emerald-400 truncate block">
                ● 95 CANCIONES // LUIS MIGUEL & FOCUS PLAYLIST
              </span>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={spotifyDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              title="Abrir lista completa en la app de Spotify"
              className="tactile-btn flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold text-[11px] font-mono shadow-[0_0_10px_rgba(29,185,84,0.3)] transition-all"
            >
              <span>Spotify</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* Toggle Expand / Collapse */}
            <button
              onClick={() => {
                sound.playClick();
                setIsExpanded(prev => !prev);
              }}
              title={isExpanded ? "Minimizar reproductor a barra compacta" : "Expandir lista completa de 95 canciones"}
              className="tactile-btn p-1.5 rounded-md bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-slate-300 hover:text-white transition-colors"
            >
              {isExpanded ? (
                <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                  <span className="hidden sm:inline">Minimizar</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              ) : (
                <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                  <span className="hidden sm:inline">Ver 95 canciones</span>
                  <ChevronUp className="w-3.5 h-3.5" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* The Official Real Spotify Playlist Player IFrame */}
        <div className={`transition-all duration-300 bg-black ${isExpanded ? 'h-[352px]' : 'h-[152px]'}`}>
          <iframe
            src={embedUrl}
            width="100%"
            height={isExpanded ? "352" : "152"}
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="w-full h-full border-0"
            title="Spotify Work Playlist Player"
          />
        </div>

      </div>
    </div>
  );
};
