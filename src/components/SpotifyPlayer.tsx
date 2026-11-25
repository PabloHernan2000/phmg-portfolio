import React, { useState, useEffect } from 'react';
import { getSpotifyNowPlaying, SpotifyTrackData } from '../services/spotify';
import { ExternalLink, Radio, Disc3, Info, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { sound } from '../utils/audio';

export const SpotifyPlayer: React.FC = () => {
  const [track, setTrack] = useState<SpotifyTrackData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showSetup, setShowSetup] = useState<boolean>(false);

  const fetchTrack = async () => {
    const data = await getSpotifyNowPlaying();
    if (data) {
      setTrack(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTrack();
    // Poll every 15 seconds for real-time live playback changes
    const interval = setInterval(fetchTrack, 15000);
    return () => clearInterval(interval);
  }, []);

  const progressPercent = track?.progressMs && track?.durationMs
    ? Math.min(100, Math.round((track.progressMs / track.durationMs) * 100))
    : 0;

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-[#0d0f15] border border-white/[0.08] relative overflow-hidden">
      
      {/* Background Ambient Glow matching Spotify Green */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#1DB954]/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Album Artwork & Rotating Disc */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative group">
            
            {/* Spinning Vinyl behind Album Art */}
            <div className={`absolute -right-6 top-1/2 -translate-y-1/2 w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-[#111] border-4 border-[#222] shadow-2xl flex items-center justify-center transition-all ${
              track?.isPlaying ? 'spin-slow opacity-100' : 'opacity-40'
            }`}>
              <div className="w-16 h-16 rounded-full bg-[#1DB954]/20 border border-[#1DB954]/40 flex items-center justify-center">
                <Disc3 className={`w-8 h-8 text-[#1DB954] ${track?.isPlaying ? 'animate-spin' : ''}`} />
              </div>
            </div>

            {/* Album Cover Card */}
            <div className="relative z-10 w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border border-white/[0.15] shadow-2xl bg-black">
              {track?.albumImageUrl ? (
                <img
                  src={track.albumImageUrl}
                  alt={track.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-600">
                  <Disc3 className="w-16 h-16 animate-pulse" />
                </div>
              )}

              {/* Status Badge Over Image */}
              <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${track?.isPlaying ? 'bg-[#1DB954] animate-pulse' : 'bg-slate-500'}`} />
                  <span className="text-[10px] font-mono text-white font-medium uppercase">
                    {track?.isPlaying ? 'EN VIVO' : 'OFFLINE'}
                  </span>
                </div>
                {track?.isPlaying && (
                  <div className="flex items-end gap-0.5 h-3">
                    <span className="w-1 bg-[#1DB954] h-full animate-bounce rounded-full" />
                    <span className="w-1 bg-[#1DB954] h-2/3 animate-pulse rounded-full" />
                    <span className="w-1 bg-[#1DB954] h-4/5 animate-bounce rounded-full" />
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Track Details & Controls */}
        <div className="lg:col-span-7 space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-[#1DB954]/10 text-[#1DB954] border border-[#1DB954]/25 font-semibold flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5" />
                SPOTIFY REALTIME TELEMETRY
              </span>
              {!track?.isConfigured && (
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                  Modo Demo / Fallback
                </span>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {loading ? 'Sincronizando con Spotify...' : track?.title || 'Suave'}
            </h3>
            
            <p className="text-base text-slate-300 font-medium mt-1">
              {track?.artist || 'Luis Miguel'}
            </p>

            <p className="text-xs font-mono text-slate-500 mt-0.5">
              Álbum: <span className="text-slate-400">{track?.album || 'Aries'}</span>
            </p>
          </div>

          {/* Progress Bar (if playing) */}
          {track?.isPlaying && progressPercent > 0 && (
            <div className="space-y-1.5">
              <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/[0.06]">
                <div
                  className="h-full bg-[#1DB954] transition-all duration-1000 rounded-full shadow-[0_0_8px_#1DB954]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>{Math.floor((track.progressMs || 0) / 60000)}:{String(Math.floor(((track.progressMs || 0) % 60000) / 1000)).padStart(2, '0')}</span>
                <span>{Math.floor((track.durationMs || 0) / 60000)}:{String(Math.floor(((track.durationMs || 0) % 60000) / 1000)).padStart(2, '0')}</span>
              </div>
            </div>
          )}

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={track?.songUrl || 'https://open.spotify.com'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="tactile-btn inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold text-xs font-mono shadow-[0_0_15px_rgba(29,185,84,0.3)] transition-all"
            >
              <span>ABRIR EN SPOTIFY</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => {
                sound.playClick();
                setShowSetup(prev => !prev);
              }}
              className="tactile-btn inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 text-xs font-mono transition-colors"
            >
              <Info className="w-3.5 h-3.5 text-blue-400" />
              <span>{showSetup ? 'Ocultar Guía de Conexión' : '¿Cómo conectar tu cuenta?'}</span>
              {showSetup ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Quick Setup Instructions Accordion */}
          {showSetup && (
            <div className="p-4 rounded-xl bg-black/60 border border-white/[0.1] text-xs font-mono space-y-2.5 text-slate-300">
              <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                PASOS PARA VINCULAR TU SPOTIFY DEVELOPER:
              </div>
              <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-slate-400 leading-relaxed">
                <li>Ve a <a href="https://developer.spotify.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-[#1DB954] underline">developer.spotify.com/dashboard</a> y crea una App.</li>
                <li>En <em>Settings → Redirect URIs</em>, agrega: <code className="text-white bg-black px-1 py-0.5 rounded">http://127.0.0.1:8888/callback</code>.</li>
                <li>Ejecuta en tu terminal el generador automático:
                  <div className="mt-1 p-2 rounded bg-black text-emerald-300 text-[11px] select-all">
                    node scripts/get-spotify-token.js TU_CLIENT_ID TU_CLIENT_SECRET
                  </div>
                </li>
                <li>Pega las 3 variables que te imprima en tu archivo <code className="text-white">.env</code>. ¡Y listo! Tu portafolio mostrará en vivo todo lo que reproduzcas.</li>
              </ol>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
