import { beautify, registerLocale, hasLocale, getLocale, getRegisteredLocales } from '../src';
import { formatCurrency } from '../src/services/currency.service';
import { locales } from '../src/locales';

describe('Dynamic Locale Registration', () => {
  describe('hasLocale', () => {
    it('should return true for built-in locales', () => {
      expect(hasLocale('en-US')).toBe(true);
      expect(hasLocale('pt-BR')).toBe(true);
      expect(hasLocale('es-ES')).toBe(true);
      expect(hasLocale('de-DE')).toBe(true);
      expect(hasLocale('fr-FR')).toBe(true);
    });

    it('should return false for non-registered locales', () => {
      expect(hasLocale('ja-JP')).toBe(false);
      expect(hasLocale('zh-CN')).toBe(false);
    });
  });

  describe('getRegisteredLocales', () => {
    it('should return all built-in locale codes', () => {
      const locales = getRegisteredLocales();
      expect(locales).toContain('en-US');
      expect(locales).toContain('pt-BR');
      expect(locales).toContain('es-ES');
      expect(locales).toContain('de-DE');
      expect(locales).toContain('fr-FR');
    });
  });

  describe('registerLocale', () => {
    beforeAll(() => {
      // Register Japanese locale for testing
      registerLocale('ja-JP', {
        masks: {
          phone: '###-####-####',
          postal: '###-####',
        },
        currencies: {
          JPY: { symbol: '¥', position: 'before' },
        },
        units: [
          ['', ''],
          ['千', '千'],
          ['万', '万'],
          ['億', '億'],
        ],
      });
    });

    it('should register a new locale', () => {
      expect(hasLocale('ja-JP')).toBe(true);
    });

    it('should include registered locale in getRegisteredLocales', () => {
      const locales = getRegisteredLocales();
      expect(locales).toContain('ja-JP');
    });

    it('should format numbers with registered locale', () => {
      const result = beautify(1234.56, { locale: 'ja-JP' });
      expect(result).toBe('1,234.56');
    });

    it('should format currency with registered locale', () => {
      const result = formatCurrency(1234.56, 'ja-JP', { currency: 'JPY' });
      // Intl.NumberFormat adds space after ¥ for ja-JP
      expect(result).toBe('¥ 1,234.56');
    });

    it('should abbreviate with custom units', () => {
      // Japanese uses base 1000 divisions like Western systems
      expect(beautify(1000, { locale: 'ja-JP', abbreviated: true })).toBe('1 千');
      expect(beautify(10000, { locale: 'ja-JP', abbreviated: true })).toBe('10 千');
      expect(beautify(1000000, { locale: 'ja-JP', abbreviated: true })).toBe('1 万');
      expect(beautify(100000000, { locale: 'ja-JP', abbreviated: true })).toBe('100 万');
    });

    it('should apply masks with registered locale', () => {
      const result = beautify(1234567890, { locale: 'ja-JP', mask: 'phone' });
      expect(result).toBe('123-4567-890');
    });

    it('should inherit common config', () => {
      const result = beautify(1234123456788901, { locale: 'ja-JP', mask: 'credit-card' });
      expect(result).toBe('1234 1234 5678 8901');
    });
  });

  describe('getLocale', () => {
    it('should return locale configuration', () => {
      const locale = getLocale('en-US');
      expect(locale).toBeDefined();
      expect(locale?.masks).toBeDefined();
      expect(locale?.currencies).toBeDefined();
      expect(locale?.units).toBeDefined();
    });

    it('should return undefined for non-existent locale', () => {
      const locale = getLocale('non-existent');
      expect(locale).toBeUndefined();
    });

    it('should return registered custom locale', () => {
      const locale = getLocale('ja-JP');
      expect(locale).toBeDefined();
      expect(locale?.currencies.JPY).toEqual({ symbol: '¥', position: 'before' });
    });
  });

  describe('Locale Override', () => {
    it('should allow overriding existing locales', () => {
      // Override en-US with custom units
      registerLocale('en-US', {
        units: [
          ['', ''],
          ['thousand', 'thousand'],
          ['million', 'million'],
          ['billion', 'billion'],
        ],
      });

      const result = beautify(1000, { locale: 'en-US', abbreviated: true });
      // en-US doesn't add space between number and unit
      expect(result).toBe('1thousand');
    });

    it('should preserve other properties when overriding', () => {
      const locale = getLocale('en-US');
      expect(locale?.masks).toBeDefined();
      expect(locale?.currencies).toBeDefined();
    });
  });

  describe('Partial Configuration', () => {
    beforeAll(() => {
      // Register zh-CN as a valid locale that Intl recognizes
      registerLocale('zh-CN', {
        currencies: {
          CNY: { symbol: '¥', position: 'before' },
        },
      });

      // Register ko-KR for masks testing
      registerLocale('ko-KR', {
        masks: {
          custom: '##-##-##',
        },
      });
    });

    it('should use default units when not provided', () => {
      const result = beautify(1000, { locale: 'zh-CN', abbreviated: true });
      // Non en-US locales add space between number and unit
      expect(result).toBe('1 k');
    });

    it('should inherit common currencies', () => {
      const result = formatCurrency(100, 'ko-KR', { currency: 'USD' });
      expect(result).toBe('$100.00');
    });

    it('should use custom mask', () => {
      const result = beautify(123456, { locale: 'ko-KR', mask: 'custom' });
      expect(result).toBe('12-34-56');
    });
  });

  describe('Error Handling', () => {
    it('should throw error when accessing non-existent locale via locales object', () => {
      // Dynamic import is handled by the locales Proxy internally
      expect(() => {
        return locales['non-existent-locale'];
      }).toThrow();
    });

    it('should provide helpful error message with available locales', () => {
      expect(() => {
        return locales['xyz'];
      }).toThrow(/Available locales:/);
    });
  });
});
