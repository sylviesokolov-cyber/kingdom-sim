import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'icon.svg', 'pwa-192x192.png', 'pwa-512x512.png'],
      manifest: {
        id: '/',
        name: 'Kingdom Simulator',
        short_name: 'KingdomSim',
        description: 'A mobile kingdom simulation game where you rise from refugee peasant through work, trade, crime, faith, and politics to the royal throne.',
        theme_color: '#020617',
        background_color: '#020617',
        display: 'fullscreen',
        orientation: 'landscape',
        start_url: '/',
        scope: '/',
        lang: 'en',
        categories: ['games', 'simulation', 'roleplaying'],
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        screenshots: [
          {
            src: '/screenshot-landscape.png',
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
