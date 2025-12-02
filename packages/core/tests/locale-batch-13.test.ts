/* eslint-env jest */
import { beautify, formatCurrency } from '../src';
import { loadLocale } from '../src/locales/loader';

describe('Batch 13: Africa & Oceania (en-ZA, en-NG, en-AU)', () => {
  beforeAll(async () => {
    await loadLocale('en-ZA');
    await loadLocale('en-NG');
    await loadLocale('en-AU');
  });

  describe('South Africa (en-ZA)', () => {
    it('should format numbers', () => {
      // en-ZA uses non-breaking spaces (U+00A0) as thousands sep and comma as decimal
      expect(beautify(1234.56, { locale: 'en-ZA' })).toBe('1\u00a0234,56');
      expect(beautify(1234567.89, { locale: 'en-ZA' })).toBe('1\u00a0234\u00a0567,89');
    });

    it('should format currency (ZAR)', () => {
      expect(formatCurrency(1234.56, 'en-ZA', { currency: 'ZAR' })).toBe('R 1\u00a0234,56');
    });
  });

  describe('Nigeria (en-NG)', () => {
    it('should format numbers', () => {
      expect(beautify(1234.56, { locale: 'en-NG' })).toBe('1,234.56');
      expect(beautify(1234567.89, { locale: 'en-NG' })).toBe('1,234,567.89');
    });

    it('should format currency (NGN)', () => {
      expect(formatCurrency(1234.56, 'en-NG', { currency: 'NGN' })).toBe('₦ 1,234.56');
    });
  });

  describe('Australia (en-AU)', () => {
    it('should format numbers', () => {
      expect(beautify(1234.56, { locale: 'en-AU' })).toBe('1,234.56');
      expect(beautify(1234567.89, { locale: 'en-AU' })).toBe('1,234,567.89');
    });

    it('should format currency (AUD)', () => {
      expect(formatCurrency(1234.56, 'en-AU', { currency: 'AUD' })).toBe('A$ 1,234.56');
    });
  });
});
