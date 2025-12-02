/* eslint-env jest */
import { beautify, formatCurrency } from '../src';
import { loadLocale } from '../src/locales/loader';

describe('Batch 6: Central and Eastern European Locales', () => {
  beforeAll(async () => {
    await loadLocale('hu-HU');
    await loadLocale('ro-RO');
    await loadLocale('sk-SK');
  });

  describe('Hungarian (hu-HU)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'hu-HU' })).toBe('1\u00a0234,56');
      expect(beautify(1234567.89, { locale: 'hu-HU' })).toBe('1\u00a0234\u00a0567,89');
    });

    it('deve usar separadores húngaros (espaço e vírgula)', () => {
      expect(beautify(1000000, { locale: 'hu-HU' })).toBe('1\u00a0000\u00a0000,00');
    });

    it('deve abreviar números em húngaro', () => {
      expect(beautify(1000, { locale: 'hu-HU', abbreviated: true })).toBe('1 K');
      expect(beautify(1000000, { locale: 'hu-HU', abbreviated: true })).toBe('1 M');
      expect(beautify(1000000000, { locale: 'hu-HU', abbreviated: true })).toBe('1 B');
    });

    it('deve formatar moeda húngara (HUF)', () => {
      expect(formatCurrency(1234.56, 'hu-HU', { currency: 'HUF' })).toBe('1\u00a0234,56 Ft');
      expect(formatCurrency(10000, 'hu-HU', { currency: 'HUF' })).toBe('10\u00a0000,00 Ft');
    });
  });

  describe('Romanian (ro-RO)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'ro-RO' })).toBe('1.234,56');
      expect(beautify(1234567.89, { locale: 'ro-RO' })).toBe('1.234.567,89');
    });

    it('deve usar separadores romenos (ponto e vírgula)', () => {
      expect(beautify(1000000, { locale: 'ro-RO' })).toBe('1.000.000,00');
    });

    it('deve abreviar números em romeno', () => {
      expect(beautify(1000, { locale: 'ro-RO', abbreviated: true })).toBe('1 K');
      expect(beautify(1000000, { locale: 'ro-RO', abbreviated: true })).toBe('1 M');
      expect(beautify(1000000000, { locale: 'ro-RO', abbreviated: true })).toBe('1 B');
    });

    it('deve formatar moeda romena (RON)', () => {
      expect(formatCurrency(1234.56, 'ro-RO', { currency: 'RON' })).toBe('1.234,56 lei');
      expect(formatCurrency(10000, 'ro-RO', { currency: 'RON' })).toBe('10.000,00 lei');
    });
  });

  describe('Slovak (sk-SK)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'sk-SK' })).toBe('1\u00a0234,56');
      expect(beautify(1234567.89, { locale: 'sk-SK' })).toBe('1\u00a0234\u00a0567,89');
    });

    it('deve usar separadores eslovacos (espaço e vírgula)', () => {
      expect(beautify(1000000, { locale: 'sk-SK' })).toBe('1\u00a0000\u00a0000,00');
    });

    it('deve abreviar números em eslovaco', () => {
      expect(beautify(1000, { locale: 'sk-SK', abbreviated: true })).toBe('1 K');
      expect(beautify(1000000, { locale: 'sk-SK', abbreviated: true })).toBe('1 M');
      expect(beautify(1000000000, { locale: 'sk-SK', abbreviated: true })).toBe('1 B');
    });

    it('deve formatar moeda euro (EUR)', () => {
      expect(formatCurrency(1234.56, 'sk-SK', { currency: 'EUR' })).toBe('1\u00a0234,56 €');
      expect(formatCurrency(10000, 'sk-SK', { currency: 'EUR' })).toBe('10\u00a0000,00 €');
    });
  });

  describe('Edge cases for Batch 6 locales', () => {
    it('deve lidar com zero', () => {
      expect(beautify(0, { locale: 'hu-HU' })).toBe('0,00');
      expect(beautify(0, { locale: 'ro-RO' })).toBe('0,00');
      expect(beautify(0, { locale: 'sk-SK' })).toBe('0,00');
    });

    it('deve lidar com números negativos', () => {
      expect(beautify(-1234.56, { locale: 'hu-HU' })).toBe('-1\u00a0234,56');
      expect(beautify(-1234.56, { locale: 'ro-RO' })).toBe('-1.234,56');
      expect(beautify(-1234.56, { locale: 'sk-SK' })).toBe('-1\u00a0234,56');
    });

    it('deve lidar com stripZeros', () => {
      expect(beautify(1234.5, { locale: 'hu-HU', stripZeros: true })).toBe('1\u00a0234,5');
      expect(beautify(1234.5, { locale: 'ro-RO', stripZeros: true })).toBe('1.234,5');
      expect(beautify(1234.5, { locale: 'sk-SK', stripZeros: true })).toBe('1\u00a0234,5');
    });
  });
});
