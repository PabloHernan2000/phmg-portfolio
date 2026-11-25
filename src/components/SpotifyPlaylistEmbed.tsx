import React, { useState } from 'react';
import { SPOTIFY_PLAYLIST_CONFIG } from '../data/portfolioData';
import { extractSpotifyPlaylistId } from '../utils/spotifyHelper';
import { ExternalLink, Disc3, Radio, Edit3, Check, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';

export const SpotifyPlaylistEmbed: React.FC = () => {
  const [playlistInput, setPlaylistInput] = useState<string>(SPOTIFY_PLAYLIST_CONFIG.playlistUrlOrId);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tempInput, setTempInput] = useState<string>(playlistInput);

  const playlistId = extractSpotifyPlaylistId(playlistInput);
  const spotifyEmbedUrl = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;
  const spotifyDirectUrl = `https://open.spotify.com/playlist/${playlistId}`;

  const handleSavePlaylist = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playTelemetry();
    setPlaylistInput(tempInput);
    setIsEditing(false);
  };

  const handleResetDefault = () => {
    sound.playClick();
    setTempInput(SPOTIFY_PLAYLIST_CONFIG.playlistUrlOrId);
    setPlaylistInput(SPOTIFY_PLAYLIST_CONFIG.playlistUrlOrId);
    setIsEditing(false);
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-[#0d0f15] border border-white/[0.08] relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#1DB954]/5 blur-[120px] pointer-events-none rounded-full" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-[#1DB954]/10 text-[#1DB954] border border-[#1DB954]/25 font-semibold flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5" />
              SPOTIFY OFICIAL // PLAYLIST DEL PORTAFOLIO
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            {SPOTIFY_PLAYLIST_CONFIG.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {SPOTIFY_PLAYLIST_CONFIG.description}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              sound.playClick();
              setIsEditing(prev => !prev);
            }}
            title="Cambiar enlace de la playlist"
            className="tactile-btn flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-slate-300 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-blue-400" />
            <span>{isEditing ? 'Cancelar' : 'Cambiar Playlist'}</span>
          </button>

          <a
            href={spotifyDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="tactile-btn flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold text-xs font-mono shadow-[0_0_12px_rgba(29,185,84,0.25)] transition-all"
          >
            <span>ABRIR EN SPOTIFY</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Optional Interactive Playlist URL input */}
      {isEditing && (
        <form onSubmit={handleSavePlaylist} className="mb-6 p-4 rounded-xl bg-black/60 border border-white/[0.1] space-y-3">
          <div className="text-xs font-mono text-slate-300 font-semibold flex items-center justify-between">
            <span>PEGA EL ENLACE DE TU NUEVA PLAYLIST:</span>
            <button
              type="button"
              onClick={handleResetDefault}
              className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Restablecer muestra
            </button>
          </div>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={tempInput}
              onChange={(e) => setTempInput(e.target.value)}
              placeholder="https://open.spotify.com/playlist/tu_playlist_id..."
              className="flex-1 px-3 py-2 rounded-lg bg-black/80 border border-white/[0.15] text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-[#1DB954] transition-colors"
            />
            <button
              type="submit"
              className="tactile-btn px-4 py-2 rounded-lg bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold text-xs font-mono flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>APLICAR</span>
            </button>
          </div>
          <p className="text-[11px] font-mono text-slate-500">
            También puedes fijarla de forma permanente en tu código editando el archivo <code className="text-slate-300">src/data/portfolioData.ts</code> en <code className="text-slate-300">SPOTIFY_PLAYLIST_CONFIG</code>.
          </p>
        </form>
      )}

      {/* The Official Spotify Interactive Player IFrame */}
      <div className="relative rounded-2xl overflow-hidden border border-white/[0.1] bg-black shadow-2xl">
        <iframe
          src={spotifyEmbedUrl}
          width="100%"
          height="380"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-2xl w-full"
          title="Spotify Playlist Embed"
        />
      </div>

      {/* Bottom Telemetry Note */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-500">
        <span className="flex items-center gap-1.5">
          <Disc3 className="w-3.5 h-3.5 text-[#1DB954]" />
          Reproductor Oficial Spotify Web • Sin límites para usuarios con cuenta
        </span>
        <span className="text-slate-400">
          ID: {playlistId}
        </span>
      </div>

    </div>
  );
};
