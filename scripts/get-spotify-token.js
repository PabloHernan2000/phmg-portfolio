#!/usr/bin/env node
/**
 * Spotify Refresh Token Generator
 * Run: node scripts/get-spotify-token.js <CLIENT_ID> <CLIENT_SECRET>
 */

import http from 'http';
import { URL } from 'url';

const clientId = process.argv[2] || process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.argv[3] || process.env.SPOTIFY_CLIENT_SECRET;
const port = 8888;
const redirectUri = `http://127.0.0.1:${port}/callback`;

if (!clientId || !clientSecret) {
  console.log('\n❌ Faltan credenciales de Spotify.\n');
  console.log('Uso:');
  console.log('  node scripts/get-spotify-token.js <CLIENT_ID> <CLIENT_SECRET>\n');
  console.log('Instrucciones:');
  console.log('1. Entra a https://developer.spotify.com/dashboard y abre tu App.');
  console.log('2. En "Edit Settings" -> "Redirect URIs", añade exactamente:');
  console.log(`   ${redirectUri}`);
  console.log('3. Guarda los cambios y ejecuta este script con tu Client ID y Client Secret.\n');
  process.exit(1);
}

const scopes = [
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-read-playback-state'
].join(' ');

const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
  redirectUri
)}&scope=${encodeURIComponent(scopes)}`;

const server = http.createServer(async (req, res) => {
  try {
    const reqUrl = new URL(req.url, `http://127.0.0.1:${port}`);
    if (reqUrl.pathname === '/callback') {
      const code = reqUrl.searchParams.get('code');
      if (!code) {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end('<h1>Error: No se recibió código de autorización</h1>');
        return;
      }

      // Exchange code for tokens
      const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${basic}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectUri,
        }),
      });

      const data = await response.json();

      if (data.error) {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end(`<h1>Error: ${data.error_description || data.error}</h1>`);
        return;
      }

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 40px auto; padding: 24px; border: 1px solid #10b981; border-radius: 12px; background: #07080b; color: #f8fafc;">
          <h1 style="color: #10b981; margin-top: 0;">✓ ¡Autorización de Spotify Exitosa!</h1>
          <p>Tu <strong>SPOTIFY_REFRESH_TOKEN</strong> se ha generado correctamente.</p>
          <p>Revisa la terminal donde ejecutaste el script para copiar tu token a tu archivo <code>.env</code>.</p>
          <p style="color: #94a3b8; font-size: 13px;">Ya puedes cerrar esta ventana.</p>
        </div>
      `);

      console.log('\n======================================================');
      console.log('🎉 ¡TOKEN DE SPOTIFY GENERADO CON ÉXITO!');
      console.log('======================================================\n');
      console.log('Copia estas 3 variables a tu archivo .env:\n');
      console.log(`SPOTIFY_CLIENT_ID=${clientId}`);
      console.log(`SPOTIFY_CLIENT_SECRET=${clientSecret}`);
      console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`);
      console.log('======================================================\n');

      server.close(() => process.exit(0));
    }
  } catch (err) {
    console.error('Error procesando callback:', err);
    res.writeHead(500);
    res.end('Internal Server Error');
  }
});

server.listen(port, () => {
  console.log('\n======================================================');
  console.log('🎵 SPOTIFY AUTHENTICATION SETUP');
  console.log('======================================================\n');
  console.log(`Abre este enlace en tu navegador para autorizar tu cuenta:\n`);
  console.log(`👉  ${authUrl}\n`);
  console.log(`Esperando autorización en http://127.0.0.1:${port}/callback ...\n`);
});
