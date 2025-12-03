/* eslint-env jest */
import { beautify, formatCurrency } from '../src';
import { loadLocale } from '../src/locales/loader';

describe('Batch 10: Southeast Asian Locales', () => {
  beforeAll(async () => {
    await loadLocale('vi-VN');
    await loadLocale('th-TH');
    await loadLocale('id-ID');
  });

  describe('Vietnamese (vi-VN)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'vi-VN' })).toBe('1.234,56');
      expect(beautify(1234567.89, { locale: 'vi-VN' })).toBe('1.234.567,89');
    });

    it('deve usar separadores vietnamitas (ponto e vírgula)', () => {
      expect(beautify(1000000, { locale: 'vi-VN' })).toBe('1.000.000,00');
    });

    it('deve abreviar números em vietnamita', () => {
      expect(beautify(1000, { locale: 'vi-VN', abbreviated: true })).toBe('1 K');
      expect(beautify(1000000, { locale: 'vi-VN', abbreviated: true })).toBe('1 M');
      expect(beautify(1000000000, { locale: 'vi-VN', abbreviated: true })).toBe('1 B');
    });

    it('deve formatar moeda vietnamita (VND)', () => {
      expect(formatCurrency(1234.56, 'vi-VN', { currency: 'VND' })).toBe('1.234,56 ₫');
      expect(formatCurrency(10000, 'vi-VN', { currency: 'VND' })).toBe('10.000,00 ₫');
    });
  });

  describe('Thai (th-TH)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'th-TH' })).toBe('1,234.56');
      expect(beautify(1234567.89, { locale: 'th-TH' })).toBe('1,234,567.89');
    });

    it('deve usar separadores tailandeses (vírgula e ponto)', () => {
      expect(beautify(1000000, { locale: 'th-TH' })).toBe('1,000,000.00');
    });

    it('deve abreviar números em tailandês', () => {
      expect(beautify(1000, { locale: 'th-TH', abbreviated: true })).toBe('1 K');
      expect(beautify(1000000, { locale: 'th-TH', abbreviated: true })).toBe('1 M');
      expect(beautify(1000000000, { locale: 'th-TH', abbreviated: true })).toBe('1 B');
    });

    it('deve formatar moeda tailandesa (THB)', () => {
      expect(formatCurrency(1234.56, 'th-TH', { currency: 'THB' })).toBe('฿ 1,234.56');
      expect(formatCurrency(10000, 'th-TH', { currency: 'THB' })).toBe('฿ 10,000.00');
    });
  });

  describe('Indonesian (id-ID)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'id-ID' })).toBe('1.234,56');
      expect(beautify(1234567.89, { locale: 'id-ID' })).toBe('1.234.567,89');
    });

    it('deve usar separadores indonésios (ponto e vírgula)', () => {
      expect(beautify(1000000, { locale: 'id-ID' })).toBe('1.000.000,00');
    });

    it('deve abreviar números em indonésio', () => {
      expect(beautify(1000, { locale: 'id-ID', abbreviated: true })).toBe('1 K');
      expect(beautify(1000000, { locale: 'id-ID', abbreviated: true })).toBe('1 M');
      expect(beautify(1000000000, { locale: 'id-ID', abbreviated: true })).toBe('1 B');
    });

    it('deve formatar moeda indonésia (IDR)', () => {
      expect(formatCurrency(1234.56, 'id-ID', { currency: 'IDR' })).toBe('Rp 1.234,56');
      expect(formatCurrency(10000, 'id-ID', { currency: 'IDR' })).toBe('Rp 10.000,00');
    });
  });

  describe('Edge cases for Batch 10 locales', () => {
    it('deve lidar com zero', () => {
      expect(beautify(0, { locale: 'vi-VN' })).toBe('0,00');
      expect(beautify(0, { locale: 'th-TH' })).toBe('0.00');
      expect(beautify(0, { locale: 'id-ID' })).toBe('0,00');
    });

    it('deve lidar com números negativos', () => {
      expect(beautify(-1234.56, { locale: 'vi-VN' })).toBe('-1.234,56');
      expect(beautify(-1234.56, { locale: 'th-TH' })).toBe('-1,234.56');
      expect(beautify(-1234.56, { locale: 'id-ID' })).toBe('-1.234,56');
    });

    it('deve lidar com stripZeros', () => {
      expect(beautify(1234.5, { locale: 'vi-VN', stripZeros: true })).toBe('1.234,5');
      expect(beautify(1234.5, { locale: 'th-TH', stripZeros: true })).toBe('1,234.5');
      expect(beautify(1234.5, { locale: 'id-ID', stripZeros: true })).toBe('1.234,5');
    });
  });
});
