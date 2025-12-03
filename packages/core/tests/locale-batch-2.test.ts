/* eslint-env jest */
import { beautify, formatCurrency } from '../src';
import { loadLocale } from '../src/locales/loader';

describe('Batch 2: South Asian, Middle Eastern, Eastern European Locales', () => {
  beforeAll(async () => {
    await loadLocale('hi-IN');
    await loadLocale('ar-SA');
    await loadLocale('ru-RU');
  });

  describe('Hindi (hi-IN)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'hi-IN' })).toBe('1,234.56');
      expect(beautify(1234567.89, { locale: 'hi-IN' })).toBe('12,34,567.89');
    });

    it('deve usar separadores indianos', () => {
      expect(beautify(100000, { locale: 'hi-IN' })).toBe('1,00,000.00');
    });

    it('deve abreviar números em hindi', () => {
      expect(beautify(1000, { locale: 'hi-IN', abbreviated: true })).toBe('1 हज़ार');
      expect(beautify(100000, { locale: 'hi-IN', abbreviated: true })).toBe('100 हज़ार');
      expect(beautify(1000000, { locale: 'hi-IN', abbreviated: true })).toBe('1 लाख');
    });

    it('deve formatar moeda indiana (INR)', () => {
      expect(formatCurrency(1234.56, 'hi-IN', { currency: 'INR' })).toBe('₹ 1,234.56');
      expect(formatCurrency(100000, 'hi-IN', { currency: 'INR' })).toBe('₹ 1,00,000.00');
    });
  });

  describe('Arabic (ar-SA)', () => {
    it('deve formatar números corretamente (numerais árabes)', () => {
      expect(beautify(1234.56, { locale: 'ar-SA' })).toBe('١٬٢٣٤٫56');
      expect(beautify(1234567.89, { locale: 'ar-SA' })).toBe('١٬٢٣٤٬٥٦٧٫89');
    });

    it('deve usar separadores árabes', () => {
      expect(beautify(1000000, { locale: 'ar-SA' })).toBe('١٬٠٠٠٬٠٠٠٫00');
    });

    it('deve abreviar números em árabe', () => {
      expect(beautify(1000, { locale: 'ar-SA', abbreviated: true })).toBe('١ ألف');
      expect(beautify(1000000, { locale: 'ar-SA', abbreviated: true })).toBe('١ مليون');
      expect(beautify(1000000000, { locale: 'ar-SA', abbreviated: true })).toBe('١ مليار');
    });

    it('deve formatar moeda saudita (SAR)', () => {
      expect(formatCurrency(1234.56, 'ar-SA', { currency: 'SAR' })).toBe('١٬٢٣٤٫٥٦ ر.س');
      expect(formatCurrency(10000, 'ar-SA', { currency: 'SAR' })).toBe('١٠٬٠٠٠٫٠٠ ر.س');
    });

    it('deve formatar dirham (AED)', () => {
      expect(formatCurrency(1234.56, 'ar-SA', { currency: 'AED' })).toBe('١٬٢٣٤٫٥٦ د.إ');
    });
  });

  describe('Russian (ru-RU)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1234.56, { locale: 'ru-RU' })).toBe('1\u00a0234,56');
      expect(beautify(1234567.89, { locale: 'ru-RU' })).toBe('1\u00a0234\u00a0567,89');
    });

    it('deve usar separadores russos (espaço + vírgula)', () => {
      expect(beautify(1000000, { locale: 'ru-RU' })).toBe('1\u00a0000\u00a0000,00');
    });

    it('deve abreviar números em russo', () => {
      expect(beautify(1000, { locale: 'ru-RU', abbreviated: true })).toBe('1 тыс.');
      expect(beautify(1000000, { locale: 'ru-RU', abbreviated: true })).toBe('1 млн');
      expect(beautify(1000000000, { locale: 'ru-RU', abbreviated: true })).toBe('1 млрд');
    });

    it('deve formatar moeda russa (RUB)', () => {
      expect(formatCurrency(1234.56, 'ru-RU', { currency: 'RUB' })).toBe('1\u00a0234,56 ₽');
      expect(formatCurrency(1000000, 'ru-RU', { currency: 'RUB' })).toBe(
        '1\u00a0000\u00a0000,00 ₽'
      );
    });
  });

  describe('Edge cases for Batch 2 locales', () => {
    it('deve lidar com zero', () => {
      expect(beautify(0, { locale: 'hi-IN' })).toBe('0.00');
      expect(beautify(0, { locale: 'ar-SA' })).toBe('٠٫00');
      expect(beautify(0, { locale: 'ru-RU' })).toBe('0,00');
    });

    it('deve lidar com números negativos', () => {
      expect(beautify(-1234.56, { locale: 'hi-IN' })).toBe('-1,234.56');
      expect(beautify(-1234.56, { locale: 'ar-SA' })).toBe('-١٬٢٣٤٫56');
      expect(beautify(-1234.56, { locale: 'ru-RU' })).toBe('-1\u00a0234,56');
    });

    it('deve lidar com stripZeros', () => {
      expect(beautify(1234.5, { locale: 'hi-IN', stripZeros: true })).toBe('1,234.5');
      expect(beautify(1234.5, { locale: 'ar-SA', stripZeros: true })).toBe('١٬٢٣٤٫5');
      expect(beautify(1234.5, { locale: 'ru-RU', stripZeros: true })).toBe('1\u00a0234,5');
    });
  });
});
