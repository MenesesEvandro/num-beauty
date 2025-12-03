import { preloadLocales } from '../src/locales/loader.js';

beforeAll(async () => {
  try {
    // Preload non-default locales for test environment only
    await preloadLocales(['pt-BR', 'es-ES', 'de-DE', 'fr-FR']);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('Warning: Failed to preload test locales:', err);
  }
});
