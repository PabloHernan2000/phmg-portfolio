import React, { useState, useEffect, useRef } from 'react';
import { CURATED_TRACKS, PlayableTrack } from '../data/playlistTracks';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Disc3, 
  ExternalLink, 
  ListMusic
} from 'lucide-react';
import { sound } from '../utils/audio';

interface FloatingMusicPlayerProps {
  isBgmPlaying: boolean;
  onToggleBgm: () => void;
  isAudioMuted: boolean;
  onToggleMute: () => void;
}

export const FloatingMusicPlayer: React.FC<FloatingMusicPlayerProps> = ({
  isBgmPlaying,
  onToggleBgm,
  isAudioMuted,
  onToggleMute,
}) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaylistDrawerOpen, setIsPlaylistDrawerOpen] = useState<boolean>(false);

  const currentTrack: PlayableTrack = CURATED_TRACKS[currentTrackIndex];
  const timerRef = useRef<number | null>(null);

  // Advance playback timer when playing
  useEffect(() => {
    if (isBgmPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentTrack.duration) {
            // Auto advance to next track
            handleNextTrack();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isBgmPlaying, currentTrack.duration, currentTrackIndex]);

  const handleNextTrack = () => {
    sound.playClick();
    setCurrentTrackIndex((prev) => (prev + 1) % CURATED_TRACKS.length);
    setCurrentTime(0);
    if (!isBgmPlaying) onToggleBgm();
  };

  const handlePrevTrack = () => {
    sound.playClick();
    setCurrentTrackIndex((prev) => (prev - 1 + CURATED_TRACKS.length) % CURATED_TRACKS.length);
    setCurrentTime(0);
    if (!isBgmPlaying) onToggleBgm();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl">
      
      {/* Playlist Drawer (Collapsible) */}
      {isPlaylistDrawerOpen && (
        <div className="mb-2 p-4 rounded-2xl bg-[#0d0f15]/95 backdrop-blur-xl border border-white/[0.12] shadow-2xl max-h-60 overflow-y-auto space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.08] text-xs font-mono">
            <span className="text-white font-semibold flex items-center gap-2">
              <ListMusic className="w-4 h-4 text-emerald-400" />
              PLAYLIST CURADA // LUIS MIGUEL ESSENTIALS
            </span>
            <span className="text-slate-400 text-[11px]">{CURATED_TRACKS.length} canciones</span>
          </div>

          <div className="space-y-1">
            {CURATED_TRACKS.map((t, idx) => {
              const isSelected = idx === currentTrackIndex;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    sound.playClick();
                    setCurrentTrackIndex(idx);
                    setCurrentTime(0);
                    if (!isBgmPlaying) onToggleBgm();
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs font-mono transition-colors ${
                    isSelected
                      ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                      : 'hover:bg-white/[0.05] text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] text-slate-500 w-4">{idx + 1}</span>
                    <span className="font-semibold text-white truncate max-w-[200px] sm:max-w-xs">{t.title}</span>
                    <span className="text-[11px] text-slate-500 hidden sm:inline">• {t.album}</span>
                  </div>
                  <span className="text-[11px] text-slate-400">{formatTime(t.duration)}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Persistent Floating Player Bar */}
      <div className="relative rounded-2xl bg-[#090b10]/95 backdrop-blur-xl border border-white/[0.12] shadow-[0_10px_35px_rgba(0,0,0,0.7)] p-3 sm:p-4 text-white">
        
        {/* Subtle Top Progress Border Line */}
        <div 
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-emerald-500 to-teal-400 transition-all rounded-t-2xl duration-300"
          style={{ width: `${(currentTime / currentTrack.duration) * 100}%` }}
        />

        <div className="flex items-center justify-between gap-3">
          
          {/* Left: Track Thumbnail & Info */}
          <div className="flex items-center gap-3 min-w-0 flex-1 sm:flex-initial">
            {/* Spinning Vinyl Cover Art */}
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-black shrink-0 border border-white/10 shadow-md">
              <img
                src={currentTrack.coverUrl}
                alt={currentTrack.title}
                className="w-full h-full object-cover"
              />
              {/* Vinyl Badge */}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Disc3 className={`w-6 h-6 text-emerald-400 ${isBgmPlaying ? 'animate-spin' : 'opacity-70'}`} />
              </div>
            </div>

            {/* Title & Artist */}
            <div className="min-w-0 pr-2">
              <div className="text-xs sm:text-sm font-bold text-white tracking-tight truncate flex items-center gap-2">
                <span>{currentTrack.title}</span>
                {isBgmPlaying && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse hidden sm:inline-block shrink-0" />
                )}
              </div>
              <div className="text-[11px] font-mono text-slate-400 truncate">
                {currentTrack.artist} <span className="text-slate-600 hidden md:inline">• {currentTrack.album}</span>
              </div>
            </div>
          </div>

          {/* Center: Playback Controls & Progress Bar */}
          <div className="flex-1 max-w-md hidden md:flex flex-col items-center gap-1.5 px-4">
            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Prev */}
              <button
                onClick={handlePrevTrack}
                title="Canción anterior"
                className="tactile-btn p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              {/* Play / Pause */}
              <button
                onClick={() => {
                  sound.playClick();
                  onToggleBgm();
                }}
                title={isBgmPlaying ? "Pausar" : "Reproducir"}
                className="tactile-btn w-9 h-9 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
              >
                {isBgmPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
              </button>

              {/* Next */}
              <button
                onClick={handleNextTrack}
                title="Siguiente canción"
                className="tactile-btn p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Scrub / Seek Bar */}
            <div className="w-full flex items-center gap-2 text-[10px] font-mono text-slate-400">
              <span className="w-8 text-right">{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={currentTrack.duration}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400 hover:accent-emerald-300 transition-colors"
              />
              <span className="w-8">{formatTime(currentTrack.duration)}</span>
            </div>
          </div>

          {/* Right Controls: Volume, Spotify Direct Link, Playlist Drawer & Mobile Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Mobile Play / Next Controls */}
            <div className="flex md:hidden items-center gap-1">
              <button
                onClick={() => {
                  sound.playClick();
                  onToggleBgm();
                }}
                className="tactile-btn p-2 rounded-full bg-emerald-500 text-black shadow-md"
              >
                {isBgmPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
              </button>

              <button
                onClick={handleNextTrack}
                className="tactile-btn p-2 rounded-lg text-slate-400 hover:text-white"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Open in Spotify App Link */}
            <a
              href={currentTrack.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              title="Escuchar completa en Spotify"
              className="tactile-btn hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#1DB954]/15 hover:bg-[#1DB954]/25 border border-[#1DB954]/30 text-[#1DB954] text-xs font-mono transition-colors"
            >
              <span>Spotify</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* Playlist Drawer Toggle */}
            <button
              onClick={() => {
                sound.playClick();
                setIsPlaylistDrawerOpen(prev => !prev);
              }}
              title="Ver lista de canciones"
              className={`tactile-btn p-2 rounded-lg border text-xs font-mono transition-colors ${
                isPlaylistDrawerOpen
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-white/[0.04] border-white/[0.08] text-slate-300 hover:text-white'
              }`}
            >
              <ListMusic className="w-4 h-4" />
            </button>

            {/* Mute Button */}
            <button
              onClick={() => {
                sound.playClick();
                onToggleMute();
              }}
              title={isAudioMuted ? "Activar sonido" : "Silenciar"}
              className="tactile-btn hidden sm:block p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-400 hover:text-white transition-colors"
            >
              {isAudioMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
