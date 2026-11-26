import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://raphael-brard-datascience.github.io',
  build: { inlineStylesheets: 'never' }, // pas de CSS/JS inline imposé par Astro
  // Depuis Astro 7, le réglage par défaut ('jsx') supprime les espaces autour des balises en fin de ligne
  // (ex. « en écrivant à<e-mail> »). true = compression sans perte, comme avec Astro 5.
  compressHTML: true,
});
