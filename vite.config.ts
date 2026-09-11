import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

const base = '/kingdom-sim/';

// Character data currently stores asset paths as `/characters/...`.
// GitHub Pages serves this app from `/kingdom-sim/`, so rewrite those
// paths during the Vite transform instead of breaking local data files.
const characterAssetPathPlugin = {
  name: 'kingdom-sim-character-asset-paths',
  transform(code: string, id: string) {
    if (!/\.[cm]?[jt]sx?$/.test(id) || id.includes('node_modules')) return null;
    const rewritten = code.replaceAll("'/characters/", "'/kingdom-sim/characters/");
    return rewritten === code ? null : { code: rewritten, map: null };
  },
};

export default defineConfig({
  base,
  plugins: [
    characterAssetPathPlugin,
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'icon.svg', 'pwa-192x192.png', 'pwa-512x512.png'],
      manifest: {
        id: base,
        name: 'Kingdom Simulator',
        short_name: 'KingdomSim',
        description: 'A mobile kingdom simulation game where you rise from refugee peasant through work, trade, crime, faith, and politics to the royal throne.',
        theme_color: '#020617',
        background_color: '#020617',
        display: 'fullscreen',
        orientation: 'landscape',
        start_url: base,
        scope: base,
        lang: 'en',
        categories: ['games', 'simulation', 'roleplaying'],
        icons: [
          { src: `${base}pwa-192x192.png`, sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: `${base}pwa-512x512.png`, sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          { src: `${base}pwa-maskable-512x512.png`, sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
        screenshots: [
          {
            src: `${base}screenshot-landscape.png`,
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Valenreach Kingdom Simulator Gameplay',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
      },
      devOptions: {
        enabled: true,
        type: 'module',
      },
    }),
  ],
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});
