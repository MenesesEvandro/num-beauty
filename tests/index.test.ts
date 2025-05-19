/* eslint-env jest */
import { beautify, round, applyMask, formatNumber, abbreviateNumber, formatCurrency } from '../src';
import { type SupportedLocale } from '../src/locales';

describe('Beautify', () => {
  describe('Opções padrão', () => {
    it('deve usar valores padrão quando não fornecidos', () => {
      expect(beautify(1234.5678)).toBe('1,234.57');
    });

    it('deve aceitar opções parciais', () => {
      expect(beautify(1234.5678, { locale: 'pt-BR', decimals: 3 })).toBe('1.234,568');
      expect(beautify(1234.5678, { locale: 'pt-BR', stripZeros: true })).toBe('1.234,57');
      expect(beautify(1234.5678, { locale: 'en-US' })).toBe('1,234.57');
    });
  });

  describe('Máscaras', () => {
    it('deve aceitar máscara personalizada', () => {
      expect(beautify(1234567890, { mask: '## ## ## ## ##' })).toBe('12 34 56 78 90');
    });

    it('deve aceitar máscara predefinida', () => {
      expect(beautify(12345678901, { locale: 'pt-BR', mask: 'cpf' })).toBe('123.456.789-01');
    });

    it('deve usar a máscara como padrão se não encontrar predefinida', () => {
      expect(beautify(123456, { mask: '##-##-##' })).toBe('12-34-56');
    });
  });

  describe('Abreviação', () => {
    it('deve abreviar números quando solicitado', () => {
      const tests = [
        { input: 1234, expected: '1,23 mil' },
        { input: 1234567, expected: '1,23 mi' },
        { input: 1234567890, expected: '1,23 bi' },
      ];

      tests.forEach(({ input, expected }) => {
        expect(
          beautify(input, {
            abbreviated: true,
            locale: 'pt-BR',
            decimals: 2,
          })
        ).toBe(expected);
      });
    });

    it('deve abreviar números em diferentes locales', () => {
      const number = 1234567;
      expect(beautify(number, { abbreviated: true, locale: 'pt-BR' })).toBe('1,23 mi');
      expect(beautify(number, { abbreviated: true, locale: 'en-US' })).toBe('1.23m');
      expect(beautify(number, { abbreviated: true, locale: 'es-ES' })).toBe('1,23 M');
    });
  });

  describe('Arredondamento', () => {
    it('deve aplicar diferentes modos de arredondamento', () => {
      const number = 1.235;
      expect(beautify(number, { roundingMode: 'UP' })).toBe('1.24');
      expect(beautify(number, { roundingMode: 'DOWN' })).toBe('1.23');
      expect(beautify(number, { roundingMode: 'HALF_UP' })).toBe('1.24');
      expect(beautify(number, { roundingMode: 'HALF_DOWN' })).toBe('1.23');
      expect(beautify(number, { roundingMode: 'HALF_EVEN' })).toBe('1.24');
    });
  });
});

describe('Funções Exportadas', () => {
  describe('round', () => {
    it('deve arredondar números corretamente', () => {
      // HALF_UP arredonda para cima quando o dígito é >= 5
      expect(round(1.235, 2, 'HALF_UP')).toBe(1.24);

      // HALF_EVEN arredonda para o par mais próximo quando está no meio
      expect(round(1.225, 2, 'HALF_EVEN')).toBe(1.22);

      // UP sempre arredonda na direção positiva
      expect(round(-1.235, 2, 'UP')).toBe(-1.24);
    });
  });

  describe('applyMask', () => {
    it('deve aplicar máscaras corretamente', () => {
      expect(applyMask(12345678901, '###.###.###-##')).toBe('123.456.789-01');
      expect(applyMask(12345678, '#####-###')).toBe('12345-678');
      expect(applyMask(1234567890, '(##) ####-####')).toBe('(12) 3456-7890');
    });
  });

  describe('formatNumber', () => {
    it('deve formatar números corretamente', () => {
      expect(formatNumber(1234.567, 2, 'pt-BR', false)).toBe('1.234,57');
      expect(formatNumber(1234.567, 2, 'en-US', false)).toBe('1,234.57');
      expect(formatNumber(1234.5, 2, 'pt-BR', true)).toBe('1.234,5');
    });
  });

  describe('abbreviateNumber', () => {
    it('deve abreviar números corretamente', () => {
      const locales: Array<[SupportedLocale, string, string, string]> = [
        ['pt-BR', '1 mil', '1,23 mi', '1,23 bi'],
        ['en-US', '1k', '1.23m', '1.23b'],
        ['es-ES', '1 mil', '1,23 M', '1,23 MM'],
      ];

      const numbers = [1000, 1234567, 1234567890];
      locales.forEach(([locale, mil, mi, bi]) => {
        expect(abbreviateNumber(numbers[0], '1.000', locale)).toBe(mil);
        expect(abbreviateNumber(numbers[1], '1.234.567', locale)).toBe(mi);
        expect(abbreviateNumber(numbers[2], '1.234.567.890', locale)).toBe(bi);
      });
    });
  });

  describe('formatCurrency', () => {
    it('deve formatar moedas corretamente', () => {
      const currencies: Array<[SupportedLocale, string, string]> = [
        ['pt-BR', 'BRL', 'R$ 1.234,56'],
        ['en-US', 'USD', '$1,234.56'],
        ['es-ES', 'EUR', '1.234,56 €'],
      ];

      currencies.forEach(([locale, currency, expected]) => {
        expect(formatCurrency(1234.56, locale, { currency })).toBe(expected);
      });

      // Testando com opções adicionais
      expect(
        formatCurrency(1234.56, 'pt-BR', {
          currency: 'BRL',
          showSymbol: false,
        })
      ).toBe('1.234,56');

      expect(
        formatCurrency(1234.56, 'en-US', {
          currency: 'USD',
          showCode: true,
        })
      ).toBe('USD 1,234.56');

      expect(
        formatCurrency(1234.5, 'es-ES', {
          currency: 'EUR',
          stripZeros: true,
        })
      ).toBe('1.234,5 €');
    });
  });
});
