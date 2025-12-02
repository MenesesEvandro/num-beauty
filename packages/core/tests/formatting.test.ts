/* eslint-env jest */
import { formatNumber } from '../src';

describe('FormattingService', () => {
  describe('Formatação de números', () => {
    it('deve formatar números inteiros corretamente', () => {
      expect(formatNumber(1234, 0, 'pt-BR')).toBe('1.234');
      expect(formatNumber(-1234, 0, 'pt-BR')).toBe('-1.234');
      expect(formatNumber(1234567, 0, 'pt-BR')).toBe('1.234.567');
    });

    it('deve formatar números decimais corretamente', () => {
      expect(formatNumber(1234.5678, 2, 'pt-BR')).toBe('1.234,57');
      expect(formatNumber(-1234.5678, 2, 'pt-BR')).toBe('-1.234,57');
      expect(formatNumber(0.5678, 2, 'pt-BR')).toBe('0,57');
    });

    it('deve formatar com stripZeros=true corretamente', () => {
      expect(formatNumber(1234.5, 2, 'pt-BR', true)).toBe('1.234,5');
      expect(formatNumber(1234.0, 2, 'pt-BR', true)).toBe('1.234');
      expect(formatNumber(-1234.5, 2, 'pt-BR', true)).toBe('-1.234,5');
    });

    it('deve formatar números muito grandes corretamente', () => {
      expect(formatNumber(1234567890.12345, 2, 'pt-BR')).toBe('1.234.567.890,12');
      expect(formatNumber(-1234567890.12345, 2, 'pt-BR')).toBe('-1.234.567.890,12');
    });

    it('deve formatar números muito pequenos corretamente', () => {
      expect(formatNumber(0.00001234, 6, 'pt-BR')).toBe('0,000012');
      expect(formatNumber(-0.00001234, 6, 'pt-BR')).toBe('-0,000012');
    });

    it('deve formatar com diferentes locales', () => {
      const num = 1234567.89;
      expect(formatNumber(num, 2, 'pt-BR')).toBe('1.234.567,89');
      expect(formatNumber(num, 2, 'en-US')).toBe('1,234,567.89');
      expect(formatNumber(num, 2, 'es-ES')).toBe('1.234.567,89');
    });

    it('deve tratar zero corretamente', () => {
      expect(formatNumber(0, 2, 'pt-BR')).toBe('0,00');
      expect(formatNumber(0, 2, 'pt-BR', true)).toBe('0');
      expect(formatNumber(-0, 2, 'pt-BR')).toBe('0,00');
    });

    it('deve tratar número de casas decimais corretamente', () => {
      const num = 1.23456789;
      expect(formatNumber(num, 0, 'pt-BR')).toBe('1');
      expect(formatNumber(num, 1, 'pt-BR')).toBe('1,2');
      expect(formatNumber(num, 3, 'pt-BR')).toBe('1,235');
      expect(formatNumber(num, 5, 'pt-BR')).toBe('1,23457');
    });
  });
});
