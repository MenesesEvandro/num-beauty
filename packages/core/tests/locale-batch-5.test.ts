/* eslint-env jest */
import { beautify, formatCurrency } from '../src';
import { loadLocale } from '../src/locales/loader';

describe('Batch 5: Nordic and Central European Locales', () => {
  beforeAll(async () => {
    await loadLocale('nb-NO');
    await loadLocale('fi-FI');
    await loadLocale('cs-CZ');
  });

  describe('Norwegian Bokmål (nb-NO)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'nb-NO' })).toBe('1\u00a0234,56');
      expect(beautify(1234567.89, { locale: 'nb-NO' })).toBe('1\u00a0234\u00a0567,89');
    });

    it('deve usar separadores noruegueses (espaço e vírgula)', () => {
      expect(beautify(1000000, { locale: 'nb-NO' })).toBe('1\u00a0000\u00a0000,00');
    });

    it('deve abreviar números em norueguês', () => {
      expect(beautify(1000, { locale: 'nb-NO', abbreviated: true })).toBe('1 K');
      expect(beautify(1000000, { locale: 'nb-NO', abbreviated: true })).toBe('1 M');
      expect(beautify(1000000000, { locale: 'nb-NO', abbreviated: true })).toBe('1 B');
    });

    it('deve formatar moeda norueguesa (NOK)', () => {
      expect(formatCurrency(1234.56, 'nb-NO', { currency: 'NOK' })).toBe('1\u00a0234,56 kr');
      expect(formatCurrency(10000, 'nb-NO', { currency: 'NOK' })).toBe('10\u00a0000,00 kr');
    });
  });

  describe('Finnish (fi-FI)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'fi-FI' })).toBe('1\u00a0234,56');
      expect(beautify(1234567.89, { locale: 'fi-FI' })).toBe('1\u00a0234\u00a0567,89');
    });

    it('deve usar separadores finlandeses (espaço e vírgula)', () => {
      expect(beautify(1000000, { locale: 'fi-FI' })).toBe('1\u00a0000\u00a0000,00');
    });

    it('deve abreviar números em finlandês', () => {
      expect(beautify(1000, { locale: 'fi-FI', abbreviated: true })).toBe('1 K');
      expect(beautify(1000000, { locale: 'fi-FI', abbreviated: true })).toBe('1 M');
      expect(beautify(1000000000, { locale: 'fi-FI', abbreviated: true })).toBe('1 B');
    });

    it('deve formatar moeda euro (EUR)', () => {
      expect(formatCurrency(1234.56, 'fi-FI', { currency: 'EUR' })).toBe('1\u00a0234,56 €');
      expect(formatCurrency(10000, 'fi-FI', { currency: 'EUR' })).toBe('10\u00a0000,00 €');
    });
  });

  describe('Czech (cs-CZ)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'cs-CZ' })).toBe('1\u00a0234,56');
      expect(beautify(1234567.89, { locale: 'cs-CZ' })).toBe('1\u00a0234\u00a0567,89');
    });

    it('deve usar separadores tchecos (espaço e vírgula)', () => {
      expect(beautify(1000000, { locale: 'cs-CZ' })).toBe('1\u00a0000\u00a0000,00');
    });

    it('deve abreviar números em tcheco', () => {
      expect(beautify(1000, { locale: 'cs-CZ', abbreviated: true })).toBe('1 K');
      expect(beautify(1000000, { locale: 'cs-CZ', abbreviated: true })).toBe('1 M');
      expect(beautify(1000000000, { locale: 'cs-CZ', abbreviated: true })).toBe('1 B');
    });

    it('deve formatar moeda tcheca (CZK)', () => {
      expect(formatCurrency(1234.56, 'cs-CZ', { currency: 'CZK' })).toBe('1\u00a0234,56 Kč');
      expect(formatCurrency(10000, 'cs-CZ', { currency: 'CZK' })).toBe('10\u00a0000,00 Kč');
    });
  });

  describe('Edge cases for Batch 5 locales', () => {
    it('deve lidar com zero', () => {
      expect(beautify(0, { locale: 'nb-NO' })).toBe('0,00');
      expect(beautify(0, { locale: 'fi-FI' })).toBe('0,00');
      expect(beautify(0, { locale: 'cs-CZ' })).toBe('0,00');
    });

    it('deve lidar com números negativos', () => {
      expect(beautify(-1234.56, { locale: 'nb-NO' })).toBe('-1\u00a0234,56');
      expect(beautify(-1234.56, { locale: 'fi-FI' })).toBe('-1\u00a0234,56');
      expect(beautify(-1234.56, { locale: 'cs-CZ' })).toBe('-1\u00a0234,56');
    });

    it('deve lidar com stripZeros', () => {
      expect(beautify(1234.5, { locale: 'nb-NO', stripZeros: true })).toBe('1\u00a0234,5');
      expect(beautify(1234.5, { locale: 'fi-FI', stripZeros: true })).toBe('1\u00a0234,5');
      expect(beautify(1234.5, { locale: 'cs-CZ', stripZeros: true })).toBe('1\u00a0234,5');
    });
  });
});
