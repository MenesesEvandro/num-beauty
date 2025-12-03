/* eslint-env jest */
import { beautify } from '../src';

describe('Máscaras por locale', () => {
  describe('Identificadores fiscais', () => {
    it('deve formatar identificadores fiscais corretamente', () => {
      expect(beautify(12345678901, { locale: 'pt-BR', mask: 'tax-id' })).toBe('123.456.789-01');
      expect(beautify(123456789, { locale: 'en-US', mask: 'tax-id' })).toBe('123-45-6789');
    });
  });

  describe('Códigos postais', () => {
    it('deve formatar códigos postais corretamente', () => {
      expect(beautify(12345678, { locale: 'pt-BR', mask: 'cep' })).toBe('12345-678');
      expect(beautify(12345, { locale: 'en-US', mask: 'zip' })).toBe('12345');
    });
  });

  describe('Telefones', () => {
    it('deve formatar telefones corretamente', () => {
      expect(beautify(11999998888, { locale: 'pt-BR', mask: 'phone' })).toBe('(11) 99999-8888');
      expect(beautify(1234567890, { locale: 'en-US', mask: 'phone' })).toBe('(123) 456-7890');
    });
  });

  describe('Documentos específicos', () => {
    it('deve formatar CPF e CNPJ corretamente (BR)', () => {
      expect(beautify(12345678901, { locale: 'pt-BR', mask: 'cpf' })).toBe('123.456.789-01');
      expect(beautify(12345678000199, { locale: 'pt-BR', mask: 'cnpj' })).toBe(
        '12.345.678/0001-99'
      );
    });

    it('deve formatar SSN e EIN corretamente (US)', () => {
      expect(beautify(123456789, { locale: 'en-US', mask: 'ssn' })).toBe('123-45-6789');
      expect(beautify(123456789, { locale: 'en-US', mask: 'ein' })).toBe('12-3456789');
    });
  });
});
