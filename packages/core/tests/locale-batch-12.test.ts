/* eslint-env jest */
import { beautify, formatCurrency } from '../src';
import { loadLocale } from '../src/locales/loader';

describe('Batch 12: Final Locales (is-IS, he-IL, ga-IE)', () => {
  beforeAll(async () => {
    await loadLocale('is-IS');
    await loadLocale('he-IL');
    await loadLocale('ga-IE');
  });

  describe('Icelandic (is-IS)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'is-IS' })).toBe('1.234,56');
      expect(beautify(1234567.89, { locale: 'is-IS' })).toBe('1.234.567,89');
    });

    it('deve usar separadores islandeses (ponto e vírgula)', () => {
      expect(beautify(1000000, { locale: 'is-IS' })).toBe('1.000.000,00');
    });

    it('deve abreviar números em islandês', () => {
      expect(beautify(1000, { locale: 'is-IS', abbreviated: true })).toBe('1 K');
      expect(beautify(1000000, { locale: 'is-IS', abbreviated: true })).toBe('1 M');
      expect(beautify(1000000000, { locale: 'is-IS', abbreviated: true })).toBe('1 B');
    });

    it('deve formatar moeda islandesa (ISK)', () => {
      expect(formatCurrency(1234.56, 'is-IS', { currency: 'ISK' })).toBe('1.234,56 kr');
      expect(formatCurrency(10000, 'is-IS', { currency: 'ISK' })).toBe('10.000,00 kr');
    });
  });

  describe('Hebrew (he-IL)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'he-IL' })).toBe('1,234.56');
      expect(beautify(1234567.89, { locale: 'he-IL' })).toBe('1,234,567.89');
    });

    it('deve usar separadores hebraicos (vírgula e ponto)', () => {
      expect(beautify(1000000, { locale: 'he-IL' })).toBe('1,000,000.00');
    });

    it('deve abreviar números em hebraico', () => {
      expect(beautify(1000, { locale: 'he-IL', abbreviated: true })).toBe('1 K');
      expect(beautify(1000000, { locale: 'he-IL', abbreviated: true })).toBe('1 M');
      expect(beautify(1000000000, { locale: 'he-IL', abbreviated: true })).toBe('1 B');
    });

    it('deve formatar moeda israelense (ILS)', () => {
      expect(formatCurrency(1234.56, 'he-IL', { currency: 'ILS' })).toBe('₪ 1,234.56');
      expect(formatCurrency(10000, 'he-IL', { currency: 'ILS' })).toBe('₪ 10,000.00');
    });
  });

  describe('Irish (ga-IE)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'ga-IE' })).toBe('1,234.56');
      expect(beautify(1234567.89, { locale: 'ga-IE' })).toBe('1,234,567.89');
    });

    it('deve usar separadores irlandeses (vírgula e ponto)', () => {
      expect(beautify(1000000, { locale: 'ga-IE' })).toBe('1,000,000.00');
    });

    it('deve abreviar números em irlandês', () => {
      expect(beautify(1000, { locale: 'ga-IE', abbreviated: true })).toBe('1 K');
      expect(beautify(1000000, { locale: 'ga-IE', abbreviated: true })).toBe('1 M');
      expect(beautify(1000000000, { locale: 'ga-IE', abbreviated: true })).toBe('1 B');
    });

    it('deve formatar moeda euro (EUR)', () => {
      expect(formatCurrency(1234.56, 'ga-IE', { currency: 'EUR' })).toBe('€ 1,234.56');
      expect(formatCurrency(10000, 'ga-IE', { currency: 'EUR' })).toBe('€ 10,000.00');
    });
  });

  describe('Edge cases for Batch 12 locales', () => {
    it('deve lidar com zero', () => {
      expect(beautify(0, { locale: 'is-IS' })).toBe('0,00');
      expect(beautify(0, { locale: 'he-IL' })).toBe('0.00');
      expect(beautify(0, { locale: 'ga-IE' })).toBe('0.00');
    });

    it('deve lidar com números negativos', () => {
      expect(beautify(-1234.56, { locale: 'is-IS' })).toBe('-1.234,56');
      expect(beautify(-1234.56, { locale: 'he-IL' })).toBe('-1,234.56');
      expect(beautify(-1234.56, { locale: 'ga-IE' })).toBe('-1,234.56');
    });

    it('deve lidar com stripZeros', () => {
      expect(beautify(1234.5, { locale: 'is-IS', stripZeros: true })).toBe('1.234,5');
      expect(beautify(1234.5, { locale: 'he-IL', stripZeros: true })).toBe('1,234.5');
      expect(beautify(1234.5, { locale: 'ga-IE', stripZeros: true })).toBe('1,234.5');
    });
  });
});
