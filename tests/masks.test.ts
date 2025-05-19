/* eslint-env jest */
import { beautify } from '../src';

describe('Máscaras', () => {
  describe('CPF', () => {
    it('deve formatar CPF corretamente', () => {
      expect(beautify(12345678901, { locale: 'pt-BR', mask: 'cpf' })).toBe('123.456.789-01');
    });
  });

  describe('CNPJ', () => {
    it('deve formatar CNPJ corretamente', () => {
      expect(beautify(12345678000199, { locale: 'pt-BR', mask: 'cnpj' })).toBe(
        '12.345.678/0001-99'
      );
    });
  });

  describe('CEP', () => {
    it('deve formatar CEP corretamente', () => {
      expect(beautify(12345678, { locale: 'pt-BR', mask: 'cep' })).toBe('12345-678');
    });
  });

  describe('Telefone', () => {
    it('deve formatar telefone corretamente', () => {
      expect(beautify(11999998888, { locale: 'pt-BR', mask: 'phone' })).toBe('(11) 99999-8888');
    });
  });

  describe('Cartão de Crédito', () => {
    it('deve formatar cartão de crédito corretamente', () => {
      expect(beautify(4532123456788901, { mask: 'credit-card' })).toBe('4532 1234 5678 8901');
    });
  });

  describe('Máscara personalizada', () => {
    it('deve formatar com máscara personalizada corretamente', () => {
      expect(beautify(123456, { mask: '##-##-##' })).toBe('12-34-56');
    });
  });
});
