/**
 * Web Audio API Sound Engine
 * Synthesizes high-fidelity audio feedback without external MP3 files.
 * Emil Kowalski tactile clicks + Ambient Luis Miguel synthesizer chords.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgmGain: GainNode | null = null;
  private bgmInterval: number | null = null;
  private isPlayingBgm: boolean = false;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.bgmGain) {
      this.bgmGain.gain.setValueAtTime(0, this.ctx?.currentTime || 0);
    } else if (!muted && this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    }
  }

  public getMuted() {
    return this.isMuted;
  }

  /**
   * Emil Kowalski Tactile Button Click
   * Ultra-short 15ms sine pulse at 880Hz -> 440Hz with fast decay
   */
  public playClick() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.015);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.015);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.018);
    } catch {
      // Audio might be blocked by browser autoplay policy before gesture
    }
  }

  /**
   * Telemetry Confirmation Beep
   */
  public playTelemetry() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1046.5, this.ctx.currentTime); // C6
      osc.frequency.setValueAtTime(1318.5, this.ctx.currentTime + 0.03); // E6

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Silent catch
    }
  }

  /**
   * Gaming HUD / Command Palette Opening Swish
   */
  public playCommandOpen() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.07);
    } catch {
      // Silent catch
    }
  }

  /**
   * Algorithmic Synthesized Chords - Ambient Luis Miguel Style
   * Progressions reminiscent of Latin Pop / Sophisti-pop ballads (e.g. Fmaj7 - Em7 - Dm7 - Cmaj7)
   */
  public toggleBgm(onTrackStateChange?: (isPlaying: boolean) => void) {
    this.initCtx();
    if (!this.ctx) return;

    if (this.isPlayingBgm) {
      this.stopBgm();
      onTrackStateChange?.(false);
    } else {
      this.startBgm();
      onTrackStateChange?.(true);
    }
  }

  public isBgmPlaying(): boolean {
    return this.isPlayingBgm;
  }

  private startBgm() {
    if (!this.ctx) return;
    this.isPlayingBgm = true;

    // Master gain for ambient track
    this.bgmGain = this.ctx.createGain();
    this.bgmGain.gain.setValueAtTime(this.isMuted ? 0 : 0.06, this.ctx.currentTime);
    this.bgmGain.connect(this.ctx.destination);

    // Chords: Fmaj9 -> Em9 -> Dm9 -> Cmaj7 (Luis Miguel Ballad / Bossa aesthetic)
    const chords = [
      [174.61, 220.00, 261.63, 329.63, 392.00], // Fmaj9 (F, A, C, E, G)
      [164.81, 196.00, 246.94, 293.66, 369.99], // Em9  (E, G, B, D, F#)
      [146.83, 174.61, 220.00, 261.63, 329.63], // Dm9  (D, F, A, C, E)
      [130.81, 164.81, 196.00, 246.94, 293.66], // Cmaj9 (C, E, G, B, D)
    ];

    let chordIndex = 0;

    const playChordStep = () => {
      if (!this.isPlayingBgm || !this.ctx || !this.bgmGain) return;

      const freqs = chords[chordIndex % chords.length];
      chordIndex++;

      freqs.forEach((freq, idx) => {
        if (!this.ctx || !this.bgmGain) return;
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();

        // Warm electric piano timbre (soft sine + triangle)
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        const duration = 2.4;
        noteGain.gain.setValueAtTime(0, this.ctx.currentTime);
        noteGain.gain.linearRampToValueAtTime(0.04 / freqs.length, this.ctx.currentTime + 0.3);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(noteGain);
        noteGain.connect(this.bgmGain);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      });
    };

    // Play first chord immediately, then every 2.4 seconds
    playChordStep();
    this.bgmInterval = window.setInterval(playChordStep, 2400);
  }

  private stopBgm() {
    this.isPlayingBgm = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.4);
      setTimeout(() => {
        this.bgmGain?.disconnect();
        this.bgmGain = null;
      }, 500);
    }
  }
}

export const sound = new SoundEngine();
