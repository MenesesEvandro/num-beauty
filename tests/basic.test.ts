/* eslint-env jest */
import { beautify } from '../src';

describe('Formatação básica', () => {
  describe('Português (pt-BR)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1000, { locale: 'pt-BR', abbreviated: true })).toBe('1 mil');
      expect(beautify(2000, { locale: 'pt-BR', abbreviated: true })).toBe('2 mil');
      expect(beautify(1000000, { locale: 'pt-BR', abbreviated: true })).toBe('1 mi');
      expect(beautify(2000000, { locale: 'pt-BR', abbreviated: true })).toBe('2 mi');
      expect(beautify(1000000000, { locale: 'pt-BR', abbreviated: true })).toBe('1 bi');
    });
  });

  describe('Inglês (en-US)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1000, { locale: 'en-US', abbreviated: true })).toBe('1k');
      expect(beautify(2000, { locale: 'en-US', abbreviated: true })).toBe('2k');
      expect(beautify(1000000, { locale: 'en-US', abbreviated: true })).toBe('1m');
      expect(beautify(2000000, { locale: 'en-US', abbreviated: true })).toBe('2m');
      expect(beautify(1000000000, { locale: 'en-US', abbreviated: true })).toBe('1b');
    });
  });

  describe('Espanhol (es-ES)', () => {
    it('deve formatar números corretamente', () => {
      expect(beautify(1000, { locale: 'es-ES', abbreviated: true })).toBe('1 mil');
      expect(beautify(2000, { locale: 'es-ES', abbreviated: true })).toBe('2 mil');
      expect(beautify(1000000, { locale: 'es-ES', abbreviated: true })).toBe('1 M');
      expect(beautify(2000000, { locale: 'es-ES', abbreviated: true })).toBe('2 M');
      expect(beautify(1000000000, { locale: 'es-ES', abbreviated: true })).toBe('1 MM');
    });
  });
});
