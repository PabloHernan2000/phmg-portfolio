export interface PlayableTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  duration: number; // in seconds
  // Preview audio URL or Web Audio synthesis preset
  audioUrl?: string;
  spotifyUrl: string;
}

export const CURATED_TRACKS: PlayableTrack[] = [
  {
    id: 'track-suave',
    title: 'Suave',
    artist: 'Luis Miguel',
    album: 'Aries (1993)',
    coverUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&auto=format&fit=crop&q=80',
    duration: 287,
    spotifyUrl: 'https://open.spotify.com/track/4bhsKaDVQ17478vV117t5W',
  },
  {
    id: 'track-incondicional',
    title: 'La Incondicional',
    artist: 'Luis Miguel',
    album: 'Busca una Mujer (1988)',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80',
    duration: 256,
    spotifyUrl: 'https://open.spotify.com/track/6U71K7vQv06F2gGv6yXQcK',
  },
  {
    id: 'track-hasta-que-me-olvides',
    title: 'Hasta Que Me Olvides',
    artist: 'Luis Miguel',
    album: 'Aries (1993)',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80',
    duration: 280,
    spotifyUrl: 'https://open.spotify.com/track/7lQWRAjy7L1Wz79mY4i21S',
  },
  {
    id: 'track-culpable',
    title: 'Culpable o No (Miénteme Como Siempre)',
    artist: 'Luis Miguel',
    album: 'Busca una Mujer (1988)',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80',
    duration: 236,
    spotifyUrl: 'https://open.spotify.com/track/0XyZqFvjYy7F5i1j4k6L7N',
  },
  {
    id: 'track-fria',
    title: 'Fría Como El Viento',
    artist: 'Luis Miguel',
    album: 'Busca una Mujer (1988)',
    coverUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&auto=format&fit=crop&q=80',
    duration: 235,
    spotifyUrl: 'https://open.spotify.com/track/1a2b3c4d5e6f7g8h9i0j',
  },
];
