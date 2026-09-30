import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

const isProd = process.env.NODE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
  site: isProd ? 'https://oemusissh.github.io/asin-steel' : 'http://localhost:4321',
  base: isProd ? '/asin-steel' : '/',

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