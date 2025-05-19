/* eslint-env jest */
import { formatCurrency } from '../src/services/currency.service';

describe('CurrencyService', () => {
  it('deve formatar valores em BRL corretamente', () => {
    expect(formatCurrency(1234.56, 'pt-BR', { currency: 'BRL' })).toBe('R$ 1.234,56');
    expect(formatCurrency(1234.56, 'pt-BR', { currency: 'BRL', showSymbol: false })).toBe(
      '1.234,56'
    );
    expect(formatCurrency(1234.56, 'pt-BR', { currency: 'BRL', showCode: true })).toBe(
      'BRL 1.234,56'
    );
  });

  it('deve formatar valores em USD corretamente', () => {
    expect(formatCurrency(1234.56, 'en-US', { currency: 'USD' })).toBe('$1,234.56');
    expect(formatCurrency(1234.56, 'en-US', { currency: 'USD', decimals: 3 })).toBe('$1,234.560');
  });

  it('deve formatar valores em EUR corretamente', () => {
    expect(formatCurrency(1234.56, 'es-ES', { currency: 'EUR' })).toBe('1.234,56 €');
    expect(formatCurrency(1234.56, 'es-ES', { currency: 'EUR', showCode: true })).toBe(
      'EUR 1.234,56'
    );
  });

  it('deve lançar erro para moedas não suportadas', () => {
    expect(() => {
      formatCurrency(1234.56, 'pt-BR', { currency: 'JPY' });
    }).toThrow();
  });

  it('deve formatar valores negativos corretamente', () => {
    expect(formatCurrency(-1234.56, 'pt-BR', { currency: 'BRL' })).toBe('-R$ 1.234,56');
    expect(formatCurrency(-1234.56, 'en-US', { currency: 'USD' })).toBe('-$1,234.56');
    expect(formatCurrency(-1234.56, 'es-ES', { currency: 'EUR' })).toBe('-1.234,56 €');
  });

  it('deve formatar valores com diferentes números de decimais', () => {
    expect(
      formatCurrency(1234.567, 'pt-BR', {
        currency: 'BRL',
        decimals: 2,
      })
    ).toBe('R$ 1.234,57');

    expect(
      formatCurrency(1234.567, 'pt-BR', {
        currency: 'BRL',
        decimals: 3,
      })
    ).toBe('R$ 1.234,567');
  });

  it('deve formatar valores com opções personalizadas', () => {
    const options = {
      currency: 'BRL',
      decimals: 2,
      showSymbol: true,
      showCode: true,
      stripZeros: true,
    };
    expect(formatCurrency(1234.5, 'pt-BR', options)).toBe('BRL 1.234,5');
  });
});
