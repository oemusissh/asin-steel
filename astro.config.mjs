import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://asinsteel.com',

  devToolbar: {
    enabled: false
  },

  integrations: [
    tailwind(),
    sitemap({
      filter: (page) =>
      !/\/(account|admin|cart|checkout|wishlist|login|register|track-order)(\/|$)|\/products\/detail\/?$|\/news\/?$|\/news\/industry\/([0-9a-f]{12}|page\/)/.test(page),
    }),
  ],

  output: 'static',
  compressHTML: true,

  build: {
    inlineStylesheets: 'auto'
  }
});