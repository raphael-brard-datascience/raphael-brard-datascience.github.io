import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://raphael-brard-datascience.github.io',
  build: { inlineStylesheets: 'never' }, // pas de CSS/JS inline imposé par Astro
});
