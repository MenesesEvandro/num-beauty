/* eslint-env jest */
import { beautify, formatCurrency } from '../src';
import { loadLocale } from '../src/locales/loader';

describe('Batch 14: Africa & Oceania (en-NZ, mi-NZ, ar-EG)', () => {
  beforeAll(async () => {
    await loadLocale('en-NZ');
    await loadLocale('mi-NZ');
    await loadLocale('ar-EG');
  });

  describe('New Zealand (en-NZ)', () => {
    it('should format numbers', () => {
      expect(beautify(1234.56, { locale: 'en-NZ' })).toBe('1,234.56');
      expect(beautify(1234567.89, { locale: 'en-NZ' })).toBe('1,234,567.89');
    });

    it('should format currency (NZD)', () => {
      expect(formatCurrency(1234.56, 'en-NZ', { currency: 'NZD' })).toBe('NZ$ 1,234.56');
    });
  });

  describe('Māori (mi-NZ)', () => {
    it('should format numbers similar to en-NZ', () => {
      expect(beautify(1234.56, { locale: 'mi-NZ' })).toBe('1,234.56');
    });

    it('should format currency (NZD)', () => {
      expect(formatCurrency(1234.56, 'mi-NZ', { currency: 'NZD' })).toBe('NZ$ 1,234.56');
    });
  });

  describe('Egypt (ar-EG)', () => {
    it('should format numbers (Arabic digits)', () => {
      // Expect Arabic-Indic grouping and Arabic decimal separator; decimal fraction may still be Latin digits
      expect(beautify(1234.56, { locale: 'ar-EG' })).toBe('١٬٢٣٤٫56');
      expect(beautify(1234567.89, { locale: 'ar-EG' })).toBe('١٬٢٣٤٬٥٦٧٫89');
    });

    it('should format currency (EGP)', () => {
      // Intl may render fraction digits in Arabic-Indic numerals for this locale
      expect(formatCurrency(1234.56, 'ar-EG', { currency: 'EGP' })).toBe('١٬٢٣٤٫٥٦ ج.م');
    });
  });
});
