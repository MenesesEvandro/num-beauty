/* eslint-env jest */
import { beautify, formatCurrency } from '../src';
import { loadLocale } from '../src/locales/loader';

describe('Batch 4: Nordic and Turkish Locales', () => {
  beforeAll(async () => {
    await loadLocale('tr-TR');
    await loadLocale('sv-SE');
    await loadLocale('da-DK');
  });

  describe('Turkish (tr-TR)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'tr-TR' })).toBe('1.234,56');
      expect(beautify(1234567.89, { locale: 'tr-TR' })).toBe('1.234.567,89');
    });

    it('deve usar separadores turcos (ponto e vírgula)', () => {
      expect(beautify(1000000, { locale: 'tr-TR' })).toBe('1.000.000,00');
    });

    it('deve abreviar números em turco', () => {
      expect(beautify(1000, { locale: 'tr-TR', abbreviated: true })).toBe('1 K');
      expect(beautify(1000000, { locale: 'tr-TR', abbreviated: true })).toBe('1 M');
      expect(beautify(1000000000, { locale: 'tr-TR', abbreviated: true })).toBe('1 B');
    });

    it('deve formatar moeda turca (TRY)', () => {
      expect(formatCurrency(1234.56, 'tr-TR', { currency: 'TRY' })).toBe('₺ 1.234,56');
      expect(formatCurrency(10000, 'tr-TR', { currency: 'TRY' })).toBe('₺ 10.000,00');
    });
  });

  describe('Swedish (sv-SE)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'sv-SE' })).toBe('1\u00a0234,56');
      expect(beautify(1234567.89, { locale: 'sv-SE' })).toBe('1\u00a0234\u00a0567,89');
    });

    it('deve usar separadores suecos (espaço e vírgula)', () => {
      expect(beautify(1000000, { locale: 'sv-SE' })).toBe('1\u00a0000\u00a0000,00');
    });

    it('deve abreviar números em sueco', () => {
      expect(beautify(1000, { locale: 'sv-SE', abbreviated: true })).toBe('1 K');
      expect(beautify(1000000, { locale: 'sv-SE', abbreviated: true })).toBe('1 M');
      expect(beautify(1000000000, { locale: 'sv-SE', abbreviated: true })).toBe('1 B');
    });

    it('deve formatar moeda sueca (SEK)', () => {
      expect(formatCurrency(1234.56, 'sv-SE', { currency: 'SEK' })).toBe('1\u00a0234,56 kr');
      expect(formatCurrency(10000, 'sv-SE', { currency: 'SEK' })).toBe('10\u00a0000,00 kr');
    });
  });

  describe('Danish (da-DK)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'da-DK' })).toBe('1.234,56');
      expect(beautify(1234567.89, { locale: 'da-DK' })).toBe('1.234.567,89');
    });

    it('deve usar separadores dinamarqueses (ponto e vírgula)', () => {
      expect(beautify(1000000, { locale: 'da-DK' })).toBe('1.000.000,00');
    });

    it('deve abreviar números em dinamarquês', () => {
      expect(beautify(1000, { locale: 'da-DK', abbreviated: true })).toBe('1 K');
      expect(beautify(1000000, { locale: 'da-DK', abbreviated: true })).toBe('1 M');
      expect(beautify(1000000000, { locale: 'da-DK', abbreviated: true })).toBe('1 B');
    });

    it('deve formatar moeda dinamarquesa (DKK)', () => {
      expect(formatCurrency(1234.56, 'da-DK', { currency: 'DKK' })).toBe('1.234,56 kr');
      expect(formatCurrency(10000, 'da-DK', { currency: 'DKK' })).toBe('10.000,00 kr');
    });
  });

  describe('Edge cases for Batch 4 locales', () => {
    it('deve lidar com zero', () => {
      expect(beautify(0, { locale: 'tr-TR' })).toBe('0,00');
      expect(beautify(0, { locale: 'sv-SE' })).toBe('0,00');
      expect(beautify(0, { locale: 'da-DK' })).toBe('0,00');
    });

    it('deve lidar com números negativos', () => {
      expect(beautify(-1234.56, { locale: 'tr-TR' })).toBe('-1.234,56');
      expect(beautify(-1234.56, { locale: 'sv-SE' })).toBe('-1\u00a0234,56');
      expect(beautify(-1234.56, { locale: 'da-DK' })).toBe('-1.234,56');
    });

    it('deve lidar com stripZeros', () => {
      expect(beautify(1234.5, { locale: 'tr-TR', stripZeros: true })).toBe('1.234,5');
      expect(beautify(1234.5, { locale: 'sv-SE', stripZeros: true })).toBe('1\u00a0234,5');
      expect(beautify(1234.5, { locale: 'da-DK', stripZeros: true })).toBe('1.234,5');
    });
  });
});
