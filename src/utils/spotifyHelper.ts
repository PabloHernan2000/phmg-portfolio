/**
 * Extrae el ID de una playlist de Spotify a partir de:
 * - URL completa: https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M?si=xyz
 * - URI: spotify:playlist:37i9dQZF1DXcBWIGoYBM5M
 * - ID directo: 37i9dQZF1DXcBWIGoYBM5M
 */
export function extractSpotifyPlaylistId(input: string): string {
  if (!input) return '37i9dQZF1DXcBWIGoYBM5M'; // Fallback: This Is Luis Miguel

  const trimmed = input.trim();

  // Si ya es un ID limpio (alfanumérico de ~22 caracteres)
  if (/^[a-zA-Z0-9]{22}$/.test(trimmed)) {
    return trimmed;
  }

  // Extraer de URL https://open.spotify.com/playlist/{id}
  const urlMatch = trimmed.match(/playlist\/([a-zA-Z0-9]+)/);
  if (urlMatch && urlMatch[1]) {
    return urlMatch[1];
  }

  // Extraer de URI spotify:playlist:{id}
  const uriMatch = trimmed.match(/spotify:playlist:([a-zA-Z0-9]+)/);
  if (uriMatch && uriMatch[1]) {
    return uriMatch[1];
  }

  return trimmed;
}
