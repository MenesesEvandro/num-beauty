/* eslint-env jest */
import { beautify, formatCurrency } from '../src';
import { loadLocale } from '../src/locales/loader';

describe('Batch 7: Balkan and Greek Locales', () => {
  beforeAll(async () => {
    await loadLocale('bg-BG');
    await loadLocale('hr-HR');
    await loadLocale('el-GR');
  });

  describe('Bulgarian (bg-BG)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'bg-BG' })).toBe('1\u00a0234,56');
      expect(beautify(1234567.89, { locale: 'bg-BG' })).toBe('1\u00a0234\u00a0567,89');
    });

    it('deve usar separadores búlgaros (espaço e vírgula)', () => {
      expect(beautify(1000000, { locale: 'bg-BG' })).toBe('1\u00a0000\u00a0000,00');
    });

    it('deve abreviar números em búlgaro', () => {
      expect(beautify(1000, { locale: 'bg-BG', abbreviated: true })).toBe('1 K');
      expect(beautify(1000000, { locale: 'bg-BG', abbreviated: true })).toBe('1 M');
      expect(beautify(1000000000, { locale: 'bg-BG', abbreviated: true })).toBe('1 B');
    });

    it('deve formatar moeda búlgara (BGN)', () => {
      expect(formatCurrency(1234.56, 'bg-BG', { currency: 'BGN' })).toBe('1\u00a0234,56 лв');
      expect(formatCurrency(10000, 'bg-BG', { currency: 'BGN' })).toBe('10\u00a0000,00 лв');
    });
  });

  describe('Croatian (hr-HR)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'hr-HR' })).toBe('1.234,56');
      expect(beautify(1234567.89, { locale: 'hr-HR' })).toBe('1.234.567,89');
    });

    it('deve usar separadores croatas (ponto e vírgula)', () => {
      expect(beautify(1000000, { locale: 'hr-HR' })).toBe('1.000.000,00');
    });

    it('deve abreviar números em croata', () => {
      expect(beautify(1000, { locale: 'hr-HR', abbreviated: true })).toBe('1 K');
      expect(beautify(1000000, { locale: 'hr-HR', abbreviated: true })).toBe('1 M');
      expect(beautify(1000000000, { locale: 'hr-HR', abbreviated: true })).toBe('1 B');
    });

    it('deve formatar moeda euro (EUR)', () => {
      expect(formatCurrency(1234.56, 'hr-HR', { currency: 'EUR' })).toBe('1.234,56 €');
      expect(formatCurrency(10000, 'hr-HR', { currency: 'EUR' })).toBe('10.000,00 €');
    });
  });

  describe('Greek (el-GR)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'el-GR' })).toBe('1.234,56');
      expect(beautify(1234567.89, { locale: 'el-GR' })).toBe('1.234.567,89');
    });

    it('deve usar separadores gregos (ponto e vírgula)', () => {
      expect(beautify(1000000, { locale: 'el-GR' })).toBe('1.000.000,00');
    });

    it('deve abreviar números em grego', () => {
      expect(beautify(1000, { locale: 'el-GR', abbreviated: true })).toBe('1 K');
      expect(beautify(1000000, { locale: 'el-GR', abbreviated: true })).toBe('1 M');
      expect(beautify(1000000000, { locale: 'el-GR', abbreviated: true })).toBe('1 B');
    });

    it('deve formatar moeda euro (EUR)', () => {
      expect(formatCurrency(1234.56, 'el-GR', { currency: 'EUR' })).toBe('1.234,56 €');
      expect(formatCurrency(10000, 'el-GR', { currency: 'EUR' })).toBe('10.000,00 €');
    });
  });

  describe('Edge cases for Batch 7 locales', () => {
    it('deve lidar com zero', () => {
      expect(beautify(0, { locale: 'bg-BG' })).toBe('0,00');
      expect(beautify(0, { locale: 'hr-HR' })).toBe('0,00');
      expect(beautify(0, { locale: 'el-GR' })).toBe('0,00');
    });

    it('deve lidar com números negativos', () => {
      expect(beautify(-1234.56, { locale: 'bg-BG' })).toBe('-1\u00a0234,56');
      expect(beautify(-1234.56, { locale: 'hr-HR' })).toBe('-1.234,56');
      expect(beautify(-1234.56, { locale: 'el-GR' })).toBe('-1.234,56');
    });

    it('deve lidar com stripZeros', () => {
      expect(beautify(1234.5, { locale: 'bg-BG', stripZeros: true })).toBe('1\u00a0234,5');
      expect(beautify(1234.5, { locale: 'hr-HR', stripZeros: true })).toBe('1.234,5');
      expect(beautify(1234.5, { locale: 'el-GR', stripZeros: true })).toBe('1.234,5');
    });
  });
});
