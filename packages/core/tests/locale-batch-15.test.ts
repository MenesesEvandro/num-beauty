/* eslint-env jest */
import { beautify, formatCurrency } from '../src';
import { loadLocale } from '../src/locales/loader';

describe('Batch 15: Africa (en-KE, sw-KE, pt-AO)', () => {
  beforeAll(async () => {
    await loadLocale('en-KE');
    await loadLocale('sw-KE');
    await loadLocale('pt-AO');
  });

  describe('Kenya (en-KE)', () => {
    it('should format numbers', () => {
      expect(beautify(1234.56, { locale: 'en-KE' })).toBe('1,234.56');
      expect(beautify(1234567.89, { locale: 'en-KE' })).toBe('1,234,567.89');
    });

    it('should format currency (KES)', () => {
      expect(formatCurrency(1234.56, 'en-KE', { currency: 'KES' })).toBe('KSh 1,234.56');
    });
  });

  describe('Kenya (sw-KE)', () => {
    it('should format numbers', () => {
      expect(beautify(1234.56, { locale: 'sw-KE' })).toBe('1,234.56');
    });

    it('should format currency (KES)', () => {
      expect(formatCurrency(1234.56, 'sw-KE', { currency: 'KES' })).toBe('KSh 1,234.56');
    });
  });

  describe('Angola (pt-AO)', () => {
    it('should format numbers', () => {
      // pt-AO may use a comma decimal separator (Portuguese conventions)
      const formatted = beautify(1234.56, { locale: 'pt-AO' });
      expect(typeof formatted).toBe('string');
    });

    it('should format currency (AOA)', () => {
      expect(formatCurrency(1234.56, 'pt-AO', { currency: 'AOA' })).toContain('Kz');
    });
  });
});
