/* eslint-env jest */
import { beautify, formatCurrency } from '../src';
import { loadLocale } from '../src/locales/loader';

describe('Batch 9: Baltic and Balkan Locales', () => {
  beforeAll(async () => {
    await loadLocale('lv-LV');
    await loadLocale('et-EE');
    await loadLocale('sr-RS');
  });

  describe('Latvian (lv-LV)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'lv-LV' })).toBe('1\u00a0234,56');
      expect(beautify(1234567.89, { locale: 'lv-LV' })).toBe('1\u00a0234\u00a0567,89');
    });

    it('deve usar separadores letões (espaço e vírgula)', () => {
      expect(beautify(1000000, { locale: 'lv-LV' })).toBe('1\u00a0000\u00a0000,00');
    });

    it('deve abreviar números em letão', () => {
      expect(beautify(1000, { locale: 'lv-LV', abbreviated: true })).toBe('1 K');
      expect(beautify(1000000, { locale: 'lv-LV', abbreviated: true })).toBe('1 M');
      expect(beautify(1000000000, { locale: 'lv-LV', abbreviated: true })).toBe('1 B');
    });

    it('deve formatar moeda euro (EUR)', () => {
      expect(formatCurrency(1234.56, 'lv-LV', { currency: 'EUR' })).toBe('1\u00a0234,56 €');
      expect(formatCurrency(10000, 'lv-LV', { currency: 'EUR' })).toBe('10\u00a0000,00 €');
    });
  });

  describe('Estonian (et-EE)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'et-EE' })).toBe('1\u00a0234,56');
      expect(beautify(1234567.89, { locale: 'et-EE' })).toBe('1\u00a0234\u00a0567,89');
    });

    it('deve usar separadores estonianos (espaço e vírgula)', () => {
      expect(beautify(1000000, { locale: 'et-EE' })).toBe('1\u00a0000\u00a0000,00');
    });

    it('deve abreviar números em estoniano', () => {
      expect(beautify(1000, { locale: 'et-EE', abbreviated: true })).toBe('1 K');
      expect(beautify(1000000, { locale: 'et-EE', abbreviated: true })).toBe('1 M');
      expect(beautify(1000000000, { locale: 'et-EE', abbreviated: true })).toBe('1 B');
    });

    it('deve formatar moeda euro (EUR)', () => {
      expect(formatCurrency(1234.56, 'et-EE', { currency: 'EUR' })).toBe('1\u00a0234,56 €');
      expect(formatCurrency(10000, 'et-EE', { currency: 'EUR' })).toBe('10\u00a0000,00 €');
    });
  });

  describe('Serbian (sr-RS)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'sr-RS' })).toBe('1.234,56');
      expect(beautify(1234567.89, { locale: 'sr-RS' })).toBe('1.234.567,89');
    });

    it('deve usar separadores sérvios (ponto e vírgula)', () => {
      expect(beautify(1000000, { locale: 'sr-RS' })).toBe('1.000.000,00');
    });

    it('deve abreviar números em sérvio', () => {
      expect(beautify(1000, { locale: 'sr-RS', abbreviated: true })).toBe('1 K');
      expect(beautify(1000000, { locale: 'sr-RS', abbreviated: true })).toBe('1 M');
      expect(beautify(1000000000, { locale: 'sr-RS', abbreviated: true })).toBe('1 B');
    });

    it('deve formatar moeda sérvia (RSD)', () => {
      expect(formatCurrency(1234.56, 'sr-RS', { currency: 'RSD' })).toBe('1.234,56 дин');
      expect(formatCurrency(10000, 'sr-RS', { currency: 'RSD' })).toBe('10.000,00 дин');
    });
  });

  describe('Edge cases for Batch 9 locales', () => {
    it('deve lidar com zero', () => {
      expect(beautify(0, { locale: 'lv-LV' })).toBe('0,00');
      expect(beautify(0, { locale: 'et-EE' })).toBe('0,00');
      expect(beautify(0, { locale: 'sr-RS' })).toBe('0,00');
    });

    it('deve lidar com números negativos', () => {
      expect(beautify(-1234.56, { locale: 'lv-LV' })).toBe('-1\u00a0234,56');
      expect(beautify(-1234.56, { locale: 'et-EE' })).toBe('-1\u00a0234,56');
      expect(beautify(-1234.56, { locale: 'sr-RS' })).toBe('-1.234,56');
    });

    it('deve lidar com stripZeros', () => {
      expect(beautify(1234.5, { locale: 'lv-LV', stripZeros: true })).toBe('1\u00a0234,5');
      expect(beautify(1234.5, { locale: 'et-EE', stripZeros: true })).toBe('1\u00a0234,5');
      expect(beautify(1234.5, { locale: 'sr-RS', stripZeros: true })).toBe('1.234,5');
    });
  });
});
