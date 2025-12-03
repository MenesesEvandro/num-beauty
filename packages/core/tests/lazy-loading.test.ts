/**
 * Tests for Lazy Loading of Locales
 *
 * Validates dynamic import functionality and ensures locales
 * are loaded correctly on-demand.
 */

import {
  loadLocale,
  isLocaleLoaded,
  getAvailableLocales,
  preloadLocales,
  registerLocaleLoader,
} from '../src/locales/loader';
import { beautify, formatCurrency } from '../src/index';
import { hasLocale } from '../src/locales/index';

describe('Lazy Loading: Locale Loader', () => {
  describe('loadLocale()', () => {
    it('should load pt-BR locale dynamically', async () => {
      await loadLocale('pt-BR');
      expect(hasLocale('pt-BR')).toBe(true);
      expect(isLocaleLoaded('pt-BR')).toBe(true);
    });

    it('should load en-US locale dynamically', async () => {
      await loadLocale('en-US');
      expect(hasLocale('en-US')).toBe(true);
      expect(isLocaleLoaded('en-US')).toBe(true);
    });

    it('should load es-ES locale dynamically', async () => {
      await loadLocale('es-ES');
      expect(hasLocale('es-ES')).toBe(true);
      expect(isLocaleLoaded('es-ES')).toBe(true);
    });

    it('should load de-DE locale dynamically', async () => {
      await loadLocale('de-DE');
      expect(hasLocale('de-DE')).toBe(true);
      expect(isLocaleLoaded('de-DE')).toBe(true);
    });

    it('should load fr-FR locale dynamically', async () => {
      await loadLocale('fr-FR');
      expect(hasLocale('fr-FR')).toBe(true);
      expect(isLocaleLoaded('fr-FR')).toBe(true);
    });

    it('should throw error for unsupported locale', async () => {
      await expect(loadLocale('invalid-LOCALE')).rejects.toThrow(
        'Locale "invalid-LOCALE" is not supported'
      );
    });

    it('should load locale only once (caching)', async () => {
      await loadLocale('fr-FR');
      expect(isLocaleLoaded('fr-FR')).toBe(true);

      // Second load should use cache (no error = success)
      await loadLocale('fr-FR');
      expect(isLocaleLoaded('fr-FR')).toBe(true);
    });

    it('should not reload already loaded locale', async () => {
      await loadLocale('pt-BR');
      const firstLoad = isLocaleLoaded('pt-BR');

      // Load again (should be cached)
      await loadLocale('pt-BR');
      const secondLoad = isLocaleLoaded('pt-BR');

      expect(firstLoad).toBe(true);
      expect(secondLoad).toBe(true);
    });

    it('should allow using locale after loading', async () => {
      await loadLocale('pt-BR');
      const result = beautify(1234.56, { locale: 'pt-BR' });
      expect(result).toBe('1.234,56');
    });

    it('should support currency formatting after loading', async () => {
      await loadLocale('en-US');
      const result = formatCurrency(1234.56, 'en-US', { currency: 'USD' });
      expect(result).toBe('$1,234.56');
    });
  });

  describe('isLocaleLoaded()', () => {
    it('should return false for unloaded locale', () => {
      expect(isLocaleLoaded('ja-JP')).toBe(false);
    });

    it('should return true for loaded locale', async () => {
      await loadLocale('en-US');
      expect(isLocaleLoaded('en-US')).toBe(true);
    });
  });

  describe('getAvailableLocales()', () => {
    it('should return list of available locales', () => {
      const locales = getAvailableLocales();
      expect(locales).toContain('pt-BR');
      expect(locales).toContain('en-US');
      expect(locales).toContain('es-ES');
      expect(locales).toContain('de-DE');
      expect(locales).toContain('fr-FR');
      expect(locales.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('preloadLocales()', () => {
    it('should load multiple locales in parallel', async () => {
      await preloadLocales(['pt-BR', 'en-US', 'es-ES']);

      expect(isLocaleLoaded('pt-BR')).toBe(true);
      expect(isLocaleLoaded('en-US')).toBe(true);
      expect(isLocaleLoaded('es-ES')).toBe(true);
    });

    it('should handle empty array', async () => {
      await expect(preloadLocales([])).resolves.not.toThrow();
    });

    it('should allow using all preloaded locales', async () => {
      await preloadLocales(['pt-BR', 'en-US']);

      const ptBR = beautify(1234.56, { locale: 'pt-BR' });
      const enUS = beautify(1234.56, { locale: 'en-US' });

      expect(ptBR).toBe('1.234,56');
      expect(enUS).toBe('1,234.56');
    });
  });

  describe('registerLocaleLoader()', () => {
    it('should allow registering custom locale loader', async () => {
      // Register custom Italian locale
      registerLocaleLoader('it-IT', async () => ({
        locale: {
          masks: {},
          currencies: {
            EUR: { symbol: '€', position: 'after' },
          },
          units: [
            ['mila', 'mila'], // thousands (k)
            ['milioni', 'milioni'], // millions (M)
            ['miliardi', 'miliardi'], // billions (b)
            ['bilioni', 'bilioni'], // trillions (t)
          ],
        },
      }));

      // Load it
      await loadLocale('it-IT');

      // Verify it's loaded
      expect(hasLocale('it-IT')).toBe(true);
      expect(isLocaleLoaded('it-IT')).toBe(true);
    });

    it('should allow using custom registered locale', async () => {
      // Register Japanese locale
      registerLocaleLoader('ja-JP', async () => ({
        locale: {
          masks: {},
          currencies: {
            JPY: { symbol: '¥', position: 'before' },
          },
          units: [
            ['千', '千'], // sen (thousands)
            ['万', '万'], // man (ten thousands)
            ['億', '億'], // oku (hundred millions)
            ['兆', '兆'], // chou (trillions)
          ],
        },
      }));

      await loadLocale('ja-JP');

      const result = formatCurrency(1234, 'ja-JP', { currency: 'JPY' });
      expect(result).toContain('¥');
      expect(result).toContain('1,234');
    });

    it('should override existing locale loader', async () => {
      const { registerLocale } = await import('../src/index.js');

      // Override en-US with custom config
      registerLocale('en-US', {
        masks: {},
        currencies: {
          USD: { symbol: '$$$', position: 'before' }, // Custom symbol
        },
        units: [
          ['k', 'k'],
          ['M', 'M'],
          ['B', 'B'],
          ['T', 'T'],
        ],
      });

      const result = formatCurrency(100, 'en-US', { currency: 'USD' });
      expect(result).toContain('$$$');
    });
  });

  describe('Error Handling', () => {
    it('should provide helpful error for invalid locale', async () => {
      await expect(loadLocale('xx-XX')).rejects.toThrow(/Available locales:/);
      await expect(loadLocale('xx-XX')).rejects.toThrow(/pt-BR/);
      await expect(loadLocale('xx-XX')).rejects.toThrow(/en-US/);
    });

    it('should handle loader failures gracefully', async () => {
      registerLocaleLoader('broken-LOCALE', async () => {
        throw new Error('Network error');
      });

      await expect(loadLocale('broken-LOCALE')).rejects.toThrow(
        'Failed to load locale "broken-LOCALE": Network error'
      );
    });
  });
});
