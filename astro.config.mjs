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
    sitemap()
  ],

  output: 'static',
  compressHTML: true,

  build: {
    inlineStylesheets: 'auto'
  }
});