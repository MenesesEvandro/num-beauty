/* eslint-env jest */
import { beautify, formatCurrency } from '../src';
import { loadLocale } from '../src/locales/loader';

describe('Batch 8: Eastern European Locales', () => {
  beforeAll(async () => {
    await loadLocale('uk-UA');
    await loadLocale('sl-SI');
    await loadLocale('lt-LT');
  });

  describe('Ukrainian (uk-UA)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'uk-UA' })).toBe('1\u00a0234,56');
      expect(beautify(1234567.89, { locale: 'uk-UA' })).toBe('1\u00a0234\u00a0567,89');
    });

    it('deve usar separadores ucranianos (espaço e vírgula)', () => {
      expect(beautify(1000000, { locale: 'uk-UA' })).toBe('1\u00a0000\u00a0000,00');
    });

    it('deve abreviar números em ucraniano', () => {
      expect(beautify(1000, { locale: 'uk-UA', abbreviated: true })).toBe('1 K');
      expect(beautify(1000000, { locale: 'uk-UA', abbreviated: true })).toBe('1 M');
      expect(beautify(1000000000, { locale: 'uk-UA', abbreviated: true })).toBe('1 B');
    });

    it('deve formatar moeda ucraniana (UAH)', () => {
      expect(formatCurrency(1234.56, 'uk-UA', { currency: 'UAH' })).toBe('1\u00a0234,56 ₴');
      expect(formatCurrency(10000, 'uk-UA', { currency: 'UAH' })).toBe('10\u00a0000,00 ₴');
    });
  });

  describe('Slovenian (sl-SI)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'sl-SI' })).toBe('1.234,56');
      expect(beautify(1234567.89, { locale: 'sl-SI' })).toBe('1.234.567,89');
    });

    it('deve usar separadores eslovenos (ponto e vírgula)', () => {
      expect(beautify(1000000, { locale: 'sl-SI' })).toBe('1.000.000,00');
    });

    it('deve abreviar números em esloveno', () => {
      expect(beautify(1000, { locale: 'sl-SI', abbreviated: true })).toBe('1 K');
      expect(beautify(1000000, { locale: 'sl-SI', abbreviated: true })).toBe('1 M');
      expect(beautify(1000000000, { locale: 'sl-SI', abbreviated: true })).toBe('1 B');
    });

    it('deve formatar moeda euro (EUR)', () => {
      expect(formatCurrency(1234.56, 'sl-SI', { currency: 'EUR' })).toBe('1.234,56 €');
      expect(formatCurrency(10000, 'sl-SI', { currency: 'EUR' })).toBe('10.000,00 €');
    });
  });

  describe('Lithuanian (lt-LT)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'lt-LT' })).toBe('1\u00a0234,56');
      expect(beautify(1234567.89, { locale: 'lt-LT' })).toBe('1\u00a0234\u00a0567,89');
    });

    it('deve usar separadores lituanos (espaço e vírgula)', () => {
      expect(beautify(1000000, { locale: 'lt-LT' })).toBe('1\u00a0000\u00a0000,00');
    });

    it('deve abreviar números em lituano', () => {
      expect(beautify(1000, { locale: 'lt-LT', abbreviated: true })).toBe('1 K');
      expect(beautify(1000000, { locale: 'lt-LT', abbreviated: true })).toBe('1 M');
      expect(beautify(1000000000, { locale: 'lt-LT', abbreviated: true })).toBe('1 B');
    });

    it('deve formatar moeda euro (EUR)', () => {
      expect(formatCurrency(1234.56, 'lt-LT', { currency: 'EUR' })).toBe('1\u00a0234,56 €');
      expect(formatCurrency(10000, 'lt-LT', { currency: 'EUR' })).toBe('10\u00a0000,00 €');
    });
  });

  describe('Edge cases for Batch 8 locales', () => {
    it('deve lidar com zero', () => {
      expect(beautify(0, { locale: 'uk-UA' })).toBe('0,00');
      expect(beautify(0, { locale: 'sl-SI' })).toBe('0,00');
      expect(beautify(0, { locale: 'lt-LT' })).toBe('0,00');
    });

    it('deve lidar com números negativos', () => {
      expect(beautify(-1234.56, { locale: 'uk-UA' })).toBe('-1\u00a0234,56');
      expect(beautify(-1234.56, { locale: 'sl-SI' })).toBe('-1.234,56');
      expect(beautify(-1234.56, { locale: 'lt-LT' })).toBe('-1\u00a0234,56');
    });

    it('deve lidar com stripZeros', () => {
      expect(beautify(1234.5, { locale: 'uk-UA', stripZeros: true })).toBe('1\u00a0234,5');
      expect(beautify(1234.5, { locale: 'sl-SI', stripZeros: true })).toBe('1.234,5');
      expect(beautify(1234.5, { locale: 'lt-LT', stripZeros: true })).toBe('1\u00a0234,5');
    });
  });
});
