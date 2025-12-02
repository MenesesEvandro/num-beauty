/* eslint-env jest */
import { beautify, formatCurrency } from '../src';
import { loadLocale } from '../src/locales/loader';

describe('Batch 11: Additional European and Southeast Asian Locales', () => {
  beforeAll(async () => {
    await loadLocale('ms-MY');
    await loadLocale('pt-PT');
    await loadLocale('ca-ES');
  });

  describe('Malay (ms-MY)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'ms-MY' })).toBe('1,234.56');
      expect(beautify(1234567.89, { locale: 'ms-MY' })).toBe('1,234,567.89');
    });

    it('deve usar separadores malaios (vírgula e ponto)', () => {
      expect(beautify(1000000, { locale: 'ms-MY' })).toBe('1,000,000.00');
    });

    it('deve abreviar números em malaio', () => {
      expect(beautify(1000, { locale: 'ms-MY', abbreviated: true })).toBe('1 K');
      expect(beautify(1000000, { locale: 'ms-MY', abbreviated: true })).toBe('1 M');
      expect(beautify(1000000000, { locale: 'ms-MY', abbreviated: true })).toBe('1 B');
    });

    it('deve formatar moeda malaia (MYR)', () => {
      expect(formatCurrency(1234.56, 'ms-MY', { currency: 'MYR' })).toBe('RM 1,234.56');
      expect(formatCurrency(10000, 'ms-MY', { currency: 'MYR' })).toBe('RM 10,000.00');
    });
  });

  describe('Portuguese Portugal (pt-PT)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'pt-PT' })).toBe('1\u00a0234,56');
      expect(beautify(1234567.89, { locale: 'pt-PT' })).toBe('1\u00a0234\u00a0567,89');
    });

    it('deve usar separadores portugueses (espaço e vírgula)', () => {
      expect(beautify(1000000, { locale: 'pt-PT' })).toBe('1\u00a0000\u00a0000,00');
    });

    it('deve abreviar números em português', () => {
      expect(beautify(1000, { locale: 'pt-PT', abbreviated: true })).toBe('1 K');
      expect(beautify(1000000, { locale: 'pt-PT', abbreviated: true })).toBe('1 M');
      expect(beautify(1000000000, { locale: 'pt-PT', abbreviated: true })).toBe('1 B');
    });

    it('deve formatar moeda euro (EUR)', () => {
      expect(formatCurrency(1234.56, 'pt-PT', { currency: 'EUR' })).toBe('1\u00a0234,56 €');
      expect(formatCurrency(10000, 'pt-PT', { currency: 'EUR' })).toBe('10\u00a0000,00 €');
    });
  });

  describe('Catalan (ca-ES)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'ca-ES' })).toBe('1.234,56');
      expect(beautify(1234567.89, { locale: 'ca-ES' })).toBe('1.234.567,89');
    });

    it('deve usar separadores catalães (ponto e vírgula)', () => {
      expect(beautify(1000000, { locale: 'ca-ES' })).toBe('1.000.000,00');
    });

    it('deve abreviar números em catalão', () => {
      expect(beautify(1000, { locale: 'ca-ES', abbreviated: true })).toBe('1 K');
      expect(beautify(1000000, { locale: 'ca-ES', abbreviated: true })).toBe('1 M');
      expect(beautify(1000000000, { locale: 'ca-ES', abbreviated: true })).toBe('1 B');
    });

    it('deve formatar moeda euro (EUR)', () => {
      expect(formatCurrency(1234.56, 'ca-ES', { currency: 'EUR' })).toBe('1.234,56 €');
      expect(formatCurrency(10000, 'ca-ES', { currency: 'EUR' })).toBe('10.000,00 €');
    });
  });

  describe('Edge cases for Batch 11 locales', () => {
    it('deve lidar com zero', () => {
      expect(beautify(0, { locale: 'ms-MY' })).toBe('0.00');
      expect(beautify(0, { locale: 'pt-PT' })).toBe('0,00');
      expect(beautify(0, { locale: 'ca-ES' })).toBe('0,00');
    });

    it('deve lidar com números negativos', () => {
      expect(beautify(-1234.56, { locale: 'ms-MY' })).toBe('-1,234.56');
      expect(beautify(-1234.56, { locale: 'pt-PT' })).toBe('-1\u00a0234,56');
      expect(beautify(-1234.56, { locale: 'ca-ES' })).toBe('-1.234,56');
    });

    it('deve lidar com stripZeros', () => {
      expect(beautify(1234.5, { locale: 'ms-MY', stripZeros: true })).toBe('1,234.5');
      expect(beautify(1234.5, { locale: 'pt-PT', stripZeros: true })).toBe('1\u00a0234,5');
      expect(beautify(1234.5, { locale: 'ca-ES', stripZeros: true })).toBe('1.234,5');
    });
  });
});
