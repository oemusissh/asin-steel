import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://oemusissh.github.io',
  base: '/asin-steel',

  devToolbar: {
    enabled: false
  },

  integrations: [tailwind()],
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  }
});
