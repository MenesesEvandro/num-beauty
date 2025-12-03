/* eslint-env jest */
import { beautify, formatCurrency } from '../src';
import { loadLocale } from '../src/locales/loader';

describe('Batch 1: Asian Locales', () => {
  beforeAll(async () => {
    await loadLocale('ja-JP');
    await loadLocale('zh-CN');
    await loadLocale('ko-KR');
  });

  describe('Japanese (ja-JP)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'ja-JP' })).toBe('1,234.56');
      expect(beautify(1234567.89, { locale: 'ja-JP' })).toBe('1,234,567.89');
    });

    it('deve usar separadores japoneses', () => {
      expect(beautify(1000000, { locale: 'ja-JP' })).toBe('1,000,000.00');
    });

    it('deve abreviar números em japonês', () => {
      expect(beautify(1000, { locale: 'ja-JP', abbreviated: true })).toBe('1 千');
      expect(beautify(10000, { locale: 'ja-JP', abbreviated: true })).toBe('10 千');
      expect(beautify(1000000, { locale: 'ja-JP', abbreviated: true })).toBe('1 万');
      expect(beautify(100000000, { locale: 'ja-JP', abbreviated: true })).toBe('100 万');
    });

    it('deve formatar moeda japonesa (JPY)', () => {
      expect(formatCurrency(1234, 'ja-JP', { currency: 'JPY' })).toBe('¥ 1,234.00');
      expect(formatCurrency(1234.56, 'ja-JP', { currency: 'JPY', decimals: 0 })).toBe('¥ 1,235');
    });
  });

  describe('Chinese Simplified (zh-CN)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'zh-CN' })).toBe('1,234.56');
      expect(beautify(1234567.89, { locale: 'zh-CN' })).toBe('1,234,567.89');
    });

    it('deve usar separadores chineses', () => {
      expect(beautify(1000000, { locale: 'zh-CN' })).toBe('1,000,000.00');
    });

    it('deve abreviar números em chinês', () => {
      expect(beautify(1000, { locale: 'zh-CN', abbreviated: true })).toBe('1 千');
      expect(beautify(10000, { locale: 'zh-CN', abbreviated: true })).toBe('10 千');
      expect(beautify(1000000, { locale: 'zh-CN', abbreviated: true })).toBe('1 万');
      expect(beautify(100000000, { locale: 'zh-CN', abbreviated: true })).toBe('100 万');
    });

    it('deve formatar moeda chinesa (CNY)', () => {
      expect(formatCurrency(1234.56, 'zh-CN', { currency: 'CNY' })).toBe('¥ 1,234.56');
      expect(formatCurrency(10000, 'zh-CN', { currency: 'CNY' })).toBe('¥ 10,000.00');
    });
  });

  describe('Korean (ko-KR)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'ko-KR' })).toBe('1,234.56');
      expect(beautify(1234567.89, { locale: 'ko-KR' })).toBe('1,234,567.89');
    });

    it('deve usar separadores coreanos', () => {
      expect(beautify(1000000, { locale: 'ko-KR' })).toBe('1,000,000.00');
    });

    it('deve abreviar números em coreano', () => {
      expect(beautify(1000, { locale: 'ko-KR', abbreviated: true })).toBe('1 천');
      expect(beautify(10000, { locale: 'ko-KR', abbreviated: true })).toBe('10 천');
      expect(beautify(1000000, { locale: 'ko-KR', abbreviated: true })).toBe('1 만');
      expect(beautify(100000000, { locale: 'ko-KR', abbreviated: true })).toBe('100 만');
    });

    it('deve formatar moeda coreana (KRW)', () => {
      expect(formatCurrency(1234, 'ko-KR', { currency: 'KRW' })).toBe('₩ 1,234.00');
      expect(formatCurrency(1000000, 'ko-KR', { currency: 'KRW', decimals: 0 })).toBe(
        '₩ 1,000,000'
      );
    });
  });

  describe('Edge cases for Asian locales', () => {
    it('deve lidar com zero', () => {
      expect(beautify(0, { locale: 'ja-JP' })).toBe('0.00');
      expect(beautify(0, { locale: 'zh-CN' })).toBe('0.00');
      expect(beautify(0, { locale: 'ko-KR' })).toBe('0.00');
    });

    it('deve lidar com números negativos', () => {
      expect(beautify(-1234.56, { locale: 'ja-JP' })).toBe('-1,234.56');
      expect(beautify(-1234.56, { locale: 'zh-CN' })).toBe('-1,234.56');
      expect(beautify(-1234.56, { locale: 'ko-KR' })).toBe('-1,234.56');
    });

    it('deve lidar com stripZeros', () => {
      expect(beautify(1234.5, { locale: 'ja-JP', stripZeros: true })).toBe('1,234.5');
      expect(beautify(1234.5, { locale: 'zh-CN', stripZeros: true })).toBe('1,234.5');
      expect(beautify(1234.5, { locale: 'ko-KR', stripZeros: true })).toBe('1,234.5');
    });
  });
});
