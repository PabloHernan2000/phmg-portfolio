import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'spotify-api-middleware',
        configureServer(server) {
          server.middlewares.use('/api/spotify', async (_req, res) => {
            res.setHeader('Content-Type', 'application/json');

            const clientId = env.SPOTIFY_CLIENT_ID || process.env.SPOTIFY_CLIENT_ID;
            const clientSecret = env.SPOTIFY_CLIENT_SECRET || process.env.SPOTIFY_CLIENT_SECRET;
            const refreshToken = env.SPOTIFY_REFRESH_TOKEN || process.env.SPOTIFY_REFRESH_TOKEN;

            // Fallback if not configured yet
            if (!clientId || !clientSecret || !refreshToken) {
              res.end(
                JSON.stringify({
                  isConfigured: false,
                  isPlaying: false,
                  title: 'Suave',
                  artist: 'Luis Miguel',
                  album: 'Aries (1993)',
                  albumImageUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&auto=format&fit=crop&q=80',
                  songUrl: 'https://open.spotify.com/search/Luis%20Miguel%20Suave',
                  progressMs: 65000,
                  durationMs: 287000,
                })
              );
              return;
            }

            try {
              // 1. Get access token from refresh token
              const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
              const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                  Authorization: `Basic ${basic}`,
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                  grant_type: 'refresh_token',
                  refresh_token: refreshToken,
                }),
              });

              interface SpotifyTokenResponse {
                access_token?: string;
                error?: string;
                error_description?: string;
              }

              const tokenData = (await tokenResponse.json()) as SpotifyTokenResponse;
              const accessToken = tokenData.access_token;

              if (!accessToken) {
                throw new Error('Could not obtain access token from Spotify');
              }

              // 2. Query currently playing track
              const playerRes = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              });

              interface SpotifyCurrentlyPlaying {
                is_playing: boolean;
                progress_ms: number;
                item: {
                  name: string;
                  duration_ms: number;
                  artists: { name: string }[];
                  album: {
                    name: string;
                    images: { url: string }[];
                  };
                  external_urls: {
                    spotify: string;
                  };
                };
              }

              if (playerRes.status === 200) {
                const song = (await playerRes.json()) as SpotifyCurrentlyPlaying;
                if (song && song.item) {
                  res.end(
                    JSON.stringify({
                      isConfigured: true,
                      isPlaying: song.is_playing,
                      title: song.item.name,
                      artist: song.item.artists.map((a) => a.name).join(', '),
                      album: song.item.album.name,
                      albumImageUrl: song.item.album.images[0]?.url || '',
                      songUrl: song.item.external_urls.spotify,
                      progressMs: song.progress_ms,
                      durationMs: song.item.duration_ms,
                    })
                  );
                  return;
                }
              }

              // 3. If nothing currently playing, fetch recently played track
              const recentRes = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              });

              interface SpotifyRecentlyPlayed {
                items?: {
                  played_at: string;
                  track: {
                    name: string;
                    artists: { name: string }[];
                    album: {
                      name: string;
                      images: { url: string }[];
                    };
                    external_urls: {
                      spotify: string;
                    };
                  };
                }[];
              }

              if (recentRes.status === 200) {
                const recentData = (await recentRes.json()) as SpotifyRecentlyPlayed;
                const lastTrack = recentData.items?.[0]?.track;
                if (lastTrack) {
                  res.end(
                    JSON.stringify({
                      isConfigured: true,
                      isPlaying: false,
                      title: lastTrack.name,
                      artist: lastTrack.artists.map((a) => a.name).join(', '),
                      album: lastTrack.album.name,
                      albumImageUrl: lastTrack.album.images[0]?.url || '',
                      songUrl: lastTrack.external_urls.spotify,
                      playedAt: recentData.items?.[0]?.played_at,
                    })
                  );
                  return;
                }
              }

              // Default fallback
              res.end(
                JSON.stringify({
                  isConfigured: true,
                  isPlaying: false,
                  title: 'La Incondicional',
                  artist: 'Luis Miguel',
                  album: 'Busca una Mujer',
                  albumImageUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&auto=format&fit=crop&q=80',
                  songUrl: 'https://open.spotify.com/search/Luis%20Miguel',
                })
              );
            } catch (err: unknown) {
              const errorMessage = err instanceof Error ? err.message : 'Unknown error';
              res.statusCode = 500;
              res.end(JSON.stringify({ error: errorMessage }));
            }
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
