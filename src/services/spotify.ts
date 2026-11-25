export interface SpotifyTrackData {
  isConfigured: boolean;
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
  progressMs?: number;
  durationMs?: number;
  playedAt?: string;
}

export async function getSpotifyNowPlaying(): Promise<SpotifyTrackData | null> {
  try {
    const res = await fetch('/api/spotify');
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
