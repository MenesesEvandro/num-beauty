/* eslint-env jest */
import { beautify, round } from '../src';

describe('Rounding', () => {
  describe('Validations', () => {
    it('should throw an error for an invalid number', () => {
      expect(() => round(NaN, 2)).toThrow('Number must be a valid numeric value');
      expect(() => round(undefined as any, 2)).toThrow('Number must be a valid numeric value');
    });

    it('should throw an error for invalid decimals', () => {
      expect(() => round(1.23, -1)).toThrow(
        'Number of decimal places must be a non-negative integer'
      );
      expect(() => round(1.23, 1.5)).toThrow(
        'Number of decimal places must be a non-negative integer'
      );
    });

    it('should use HALF_UP as the default mode', () => {
      expect(round(1.235, 2)).toBe(round(1.235, 2, 'HALF_UP'));
    });
  });

  const testCases = [
    {
      value: 1.235,
      expected: {
        UP: '1,24',
        DOWN: '1,23',
        CEIL: '1,24',
        FLOOR: '1,23',
        HALF_UP: '1,24',
        HALF_DOWN: '1,23',
        HALF_EVEN: '1,24',
      },
    },
    {
      value: -1.235,
      expected: {
        UP: '-1,24',
        DOWN: '-1,23',
        CEIL: '-1,23',
        FLOOR: '-1,24',
        HALF_UP: '-1,24',
        HALF_DOWN: '-1,23',
        HALF_EVEN: '-1,24',
      },
    },
    {
      value: 1.225,
      expected: {
        UP: '1,23',
        DOWN: '1,22',
        CEIL: '1,23',
        FLOOR: '1,22',
        HALF_UP: '1,23',
        HALF_DOWN: '1,22',
        HALF_EVEN: '1,22',
      },
    },
    {
      value: 1.5,
      decimals: 0,
      expected: {
        UP: '2',
        DOWN: '1',
        CEIL: '2',
        FLOOR: '1',
        HALF_UP: '2',
        HALF_DOWN: '1',
        HALF_EVEN: '2',
      },
    },
    {
      value: 2.5,
      decimals: 0,
      expected: {
        UP: '3',
        DOWN: '2',
        CEIL: '3',
        FLOOR: '2',
        HALF_UP: '3',
        HALF_DOWN: '2',
        HALF_EVEN: '2',
      },
    },
  ];

  testCases.forEach(({ value, decimals = 2, expected }) => {
    describe(`Number: ${value}`, () => {
      Object.entries(expected).forEach(([mode, result]) => {
        it(`should round correctly with mode ${mode}`, () => {
          expect(beautify(value, { locale: 'pt-BR', decimals, roundingMode: mode as any })).toBe(
            result
          );
        });
      });
    });
  });

  describe('Edge cases', () => {
    it('should handle very large numbers', () => {
      expect(() => beautify(Number.MAX_SAFE_INTEGER)).not.toThrow();
      expect(() => beautify(Number.MIN_SAFE_INTEGER)).not.toThrow();
    });

    it('should handle very small numbers', () => {
      expect(beautify(0.000000123, { decimals: 10 })).toMatch(/0\.000000123/);
    });

    it('should handle Infinity and -Infinity', () => {
      expect(() => beautify(Infinity)).not.toThrow();
      expect(() => beautify(-Infinity)).not.toThrow();
    });

    it('should handle NaN gracefully', () => {
      expect(() => beautify(NaN)).toThrow();
    });

    it('should handle null and undefined gracefully', () => {
      expect(() => beautify(null as any)).toThrow();
      expect(() => beautify(undefined as any)).toThrow();
    });
  });
});
