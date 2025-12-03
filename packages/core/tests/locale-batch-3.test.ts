/* eslint-env jest */
import { beautify, formatCurrency } from '../src';
import { loadLocale } from '../src/locales/loader';

describe('Batch 3: Western European Locales', () => {
  beforeAll(async () => {
    await loadLocale('it-IT');
    await loadLocale('nl-NL');
    await loadLocale('pl-PL');
  });

  describe('Italian (it-IT)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'it-IT' })).toBe('1.234,56');
      expect(beautify(1234567.89, { locale: 'it-IT' })).toBe('1.234.567,89');
    });

    it('deve usar separadores italianos (ponto e vírgula)', () => {
      expect(beautify(1000000, { locale: 'it-IT' })).toBe('1.000.000,00');
    });

    it('deve abreviar números em italiano', () => {
      expect(beautify(1000, { locale: 'it-IT', abbreviated: true })).toBe('1 K');
      expect(beautify(1000000, { locale: 'it-IT', abbreviated: true })).toBe('1 M');
      expect(beautify(1000000000, { locale: 'it-IT', abbreviated: true })).toBe('1 B');
    });

    it('deve formatar moeda euro (EUR)', () => {
      expect(formatCurrency(1234.56, 'it-IT', { currency: 'EUR' })).toBe('1.234,56 €');
      expect(formatCurrency(10000, 'it-IT', { currency: 'EUR' })).toBe('10.000,00 €');
    });
  });

  describe('Dutch (nl-NL)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'nl-NL' })).toBe('1.234,56');
      expect(beautify(1234567.89, { locale: 'nl-NL' })).toBe('1.234.567,89');
    });

    it('deve usar separadores holandeses (ponto e vírgula)', () => {
      expect(beautify(1000000, { locale: 'nl-NL' })).toBe('1.000.000,00');
    });

    it('deve abreviar números em holandês', () => {
      expect(beautify(1000, { locale: 'nl-NL', abbreviated: true })).toBe('1 K');
      expect(beautify(1000000, { locale: 'nl-NL', abbreviated: true })).toBe('1 M');
      expect(beautify(1000000000, { locale: 'nl-NL', abbreviated: true })).toBe('1 B');
    });

    it('deve formatar moeda euro (EUR)', () => {
      expect(formatCurrency(1234.56, 'nl-NL', { currency: 'EUR' })).toBe('€ 1.234,56');
      expect(formatCurrency(10000, 'nl-NL', { currency: 'EUR' })).toBe('€ 10.000,00');
    });
  });

  describe('Polish (pl-PL)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'pl-PL' })).toBe('1\u00a0234,56');
      expect(beautify(1234567.89, { locale: 'pl-PL' })).toBe('1\u00a0234\u00a0567,89');
    });

    it('deve usar separadores poloneses (espaço e vírgula)', () => {
      expect(beautify(1000000, { locale: 'pl-PL' })).toBe('1\u00a0000\u00a0000,00');
    });

    it('deve abreviar números em polonês', () => {
      expect(beautify(1000, { locale: 'pl-PL', abbreviated: true })).toBe('1 K');
      expect(beautify(1000000, { locale: 'pl-PL', abbreviated: true })).toBe('1 M');
      expect(beautify(1000000000, { locale: 'pl-PL', abbreviated: true })).toBe('1 B');
    });

    it('deve formatar moeda polonesa (PLN)', () => {
      expect(formatCurrency(1234.56, 'pl-PL', { currency: 'PLN' })).toBe('1\u00a0234,56 zł');
      expect(formatCurrency(10000, 'pl-PL', { currency: 'PLN' })).toBe('10\u00a0000,00 zł');
    });
  });

  describe('Edge cases for Batch 3 locales', () => {
    it('deve lidar com zero', () => {
      expect(beautify(0, { locale: 'it-IT' })).toBe('0,00');
      expect(beautify(0, { locale: 'nl-NL' })).toBe('0,00');
      expect(beautify(0, { locale: 'pl-PL' })).toBe('0,00');
    });

    it('deve lidar com números negativos', () => {
      expect(beautify(-1234.56, { locale: 'it-IT' })).toBe('-1.234,56');
      expect(beautify(-1234.56, { locale: 'nl-NL' })).toBe('-1.234,56');
      expect(beautify(-1234.56, { locale: 'pl-PL' })).toBe('-1\u00a0234,56');
    });

    it('deve lidar com stripZeros', () => {
      expect(beautify(1234.5, { locale: 'it-IT', stripZeros: true })).toBe('1.234,5');
      expect(beautify(1234.5, { locale: 'nl-NL', stripZeros: true })).toBe('1.234,5');
      expect(beautify(1234.5, { locale: 'pl-PL', stripZeros: true })).toBe('1\u00a0234,5');
    });
  });
});
