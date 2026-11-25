import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SystemTopology } from './components/SystemTopology';
import { WarStories } from './components/WarStories';
import { PassionLab } from './components/PassionLab';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { SecurityContact } from './components/SecurityContact';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { FloatingMusicPlayer } from './components/FloatingMusicPlayer';
import { sound } from './utils/audio';

export function App() {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isBgmPlaying, setIsBgmPlaying] = useState(false);
  const [isScanlinesActive, setIsScanlinesActive] = useState(false);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        sound.playCommandOpen();
        setIsCommandOpen(prev => !prev);
      }
      // 'm' toggle mute
      if (e.key === 'm' && !isCommandOpen && (e.target as HTMLElement).tagName !== 'INPUT' && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
        const nextMuted = !isAudioMuted;
        setIsAudioMuted(nextMuted);
        sound.setMuted(nextMuted);
      }
      // 'c' toggle CRT
      if (e.key === 'c' && !isCommandOpen && (e.target as HTMLElement).tagName !== 'INPUT' && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
        setIsScanlinesActive(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandOpen, isAudioMuted]);

  const handleToggleMute = () => {
    const nextMuted = !isAudioMuted;
    setIsAudioMuted(nextMuted);
    sound.setMuted(nextMuted);
  };

  const handleToggleBgm = () => {
    sound.toggleBgm((playing) => {
      setIsBgmPlaying(playing);
    });
  };

  const handleToggleScanlines = () => {
    setIsScanlinesActive(prev => !prev);
  };

  return (
    <div className="relative min-h-screen bg-[#07080b] text-[#94a3b8]">
      {/* CRT Scanline Overlay when active */}
      {isScanlinesActive && (
        <div className="fixed inset-0 z-50 scanlines-overlay pointer-events-none" />
      )}

      {/* Main Navigation */}
      <Navbar
        onOpenCommand={() => setIsCommandOpen(true)}
        isAudioMuted={isAudioMuted}
        onToggleMute={handleToggleMute}
        isBgmPlaying={isBgmPlaying}
        onToggleBgm={handleToggleBgm}
        isScanlinesActive={isScanlinesActive}
        onToggleScanlines={handleToggleScanlines}
      />

      {/* Page Content */}
      <main className="pb-24">
        <Hero />
        <SystemTopology />
        <WarStories />
        <PassionLab
          isBgmPlaying={isBgmPlaying}
          onToggleBgm={handleToggleBgm}
          isScanlinesActive={isScanlinesActive}
          onToggleScanlines={handleToggleScanlines}
          onOpenCommand={() => setIsCommandOpen(true)}
        />
        <ExperienceTimeline />
        <SecurityContact />
      </main>

      <Footer />

      {/* Persistent Floating Media Player */}
      <FloatingMusicPlayer
        isBgmPlaying={isBgmPlaying}
        onToggleBgm={handleToggleBgm}
        isAudioMuted={isAudioMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        isScanlinesActive={isScanlinesActive}
        onToggleScanlines={handleToggleScanlines}
        isBgmPlaying={isBgmPlaying}
        onToggleBgm={handleToggleBgm}
        onToggleMute={handleToggleMute}
      />
    </div>
  );
}

export default App;
