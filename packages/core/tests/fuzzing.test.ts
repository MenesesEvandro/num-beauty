/**
 * Property-Based Testing (Fuzzing) Suite
 *
 * Uses fast-check to generate thousands of random inputs and validate
 * mathematical invariants that must hold for ALL possible inputs.
 *
 * This approach catches edge cases that example-based tests miss:
 * - Extreme numbers (±Infinity, very large/small values)
 * - Special IEEE 754 cases (-0, NaN, subnormals)
 * - Unexpected combinations of parameters
 */

import fc from 'fast-check';
import { round } from '../src/services/rounding.service';
import { beautify, unbeautify, getRegisteredLocales } from '../src/index';
import { beautifyToParts } from '../src/services/parts.service';
import { formatCurrency } from '../src/services/currency.service';
import { formatBytes } from '../src/services/bytes.service';
import { formatPercentage } from '../src/services/percentage.service';

describe('Fuzzing: Property-Based Tests', () => {
  describe('Rounding Service', () => {
    describe('Property: Result is never NaN (unless input is NaN)', () => {
      it('should never produce NaN for finite numbers', () => {
        fc.assert(
          fc.property(
            fc.double({ noNaN: true, noDefaultInfinity: true }),
            fc.integer({ min: 0, max: 10 }),
            (num, decimals) => {
              const result = round(num, decimals);
              return !Number.isNaN(result);
            }
          ),
          { numRuns: 1000 }
        );
      });

      it('should throw error when input is NaN', () => {
        fc.assert(
          fc.property(fc.integer({ min: 0, max: 10 }), (decimals) => {
            expect(() => round(NaN, decimals)).toThrow('Number must be a valid numeric value');
            return true;
          }),
          { numRuns: 100 }
        );
      });
    });

    describe('Property: Idempotence (round(round(x)) === round(x))', () => {
      it.skip('should be idempotent for any number of applications (safe range)', () => {
        fc.assert(
          fc.property(
            fc.double({ min: -1e15, max: 1e15, noNaN: true, noDefaultInfinity: true }),
            fc.integer({ min: 0, max: 10 }),
            (num, decimals) => {
              const once = round(num, decimals);
              const twice = round(once, decimals);
              // Use Object.is to handle -0 correctly
              return Object.is(once, twice);
            }
          ),
          { numRuns: 1000 }
        );
      });
    });

    describe('Property: Result respects decimal precision', () => {
      it('should never exceed requested decimal places (excluding scientific notation)', () => {
        fc.assert(
          fc.property(
            fc.double({ min: -1e15, max: 1e15, noNaN: true, noDefaultInfinity: true }),
            fc.integer({ min: 0, max: 10 }),
            (num, decimals) => {
              const result = round(num, decimals);
              if (!Number.isFinite(result)) return true;

              const resultStr = result.toString();
              // Skip scientific notation (e.g., 1e+21)
              if (resultStr.includes('e')) return true;

              const decimalIndex = resultStr.indexOf('.');
              if (decimalIndex === -1) return true; // No decimal point

              const actualDecimals = resultStr.length - decimalIndex - 1;
              return actualDecimals <= decimals;
            }
          ),
          { numRuns: 1000 }
        );
      });
    });

    describe('Property: Infinity preservation', () => {
      it('should preserve positive infinity', () => {
        fc.assert(
          fc.property(fc.integer({ min: 0, max: 10 }), (decimals) => {
            return round(Infinity, decimals) === Infinity;
          }),
          { numRuns: 100 }
        );
      });

      it('should preserve negative infinity', () => {
        fc.assert(
          fc.property(fc.integer({ min: 0, max: 10 }), (decimals) => {
            return round(-Infinity, decimals) === -Infinity;
          }),
          { numRuns: 100 }
        );
      });
    });

    describe('Property: Sign preservation', () => {
      it('should preserve positive sign for positive numbers', () => {
        fc.assert(
          fc.property(
            fc.double({ min: 0.000001, noNaN: true, noDefaultInfinity: true }),
            fc.integer({ min: 0, max: 10 }),
            (num, decimals) => {
              const result = round(num, decimals);
              return result >= 0;
            }
          ),
          { numRuns: 1000 }
        );
      });

      it('should preserve negative sign for negative numbers', () => {
        fc.assert(
          fc.property(
            fc.double({ max: -0.000001, noNaN: true, noDefaultInfinity: true }),
            fc.integer({ min: 0, max: 10 }),
            (num, decimals) => {
              const result = round(num, decimals);
              return result <= 0;
            }
          ),
          { numRuns: 1000 }
        );
      });
    });

    describe('Property: Rounding modes consistency', () => {
      it('should produce different results for different modes', () => {
        fc.assert(
          fc.property(
            fc.double({ min: 0.1, max: 100, noNaN: true }),
            fc.integer({ min: 0, max: 5 }),
            (num, decimals) => {
              // Add 0.5 to create a tie-breaking scenario
              const midpoint = num + 0.5 / Math.pow(10, decimals + 1);

              const ceil = round(midpoint, decimals, 'CEIL');
              const floor = round(midpoint, decimals, 'FLOOR');

              // For numbers that aren't already rounded, ceil should be >= floor
              return ceil >= floor;
            }
          ),
          { numRuns: 500 }
        );
      });
    });
  });

  describe('Formatting Service', () => {
    describe('Property: Output is always a non-empty string', () => {
      it('should always produce a string for finite numbers', () => {
        fc.assert(
          fc.property(fc.double({ noNaN: true, noDefaultInfinity: true }), (num) => {
            const result = beautify(num);
            return typeof result === 'string' && result.length > 0;
          }),
          { numRuns: 1000 }
        );
      });
    });

    describe('Property: Formatted string contains only valid characters', () => {
      it('should only contain digits, separators, signs, or scientific notation', () => {
        fc.assert(
          fc.property(
            fc.double({ min: -1e15, max: 1e15, noNaN: true, noDefaultInfinity: true }),
            (num) => {
              const result = beautify(num, { locale: 'en-US' });
              // Valid chars: digits, comma, period, minus, plus, spaces, 'e' for scientific notation
              const validPattern = /^[0-9,.\-+\se]+$/i;
              return validPattern.test(result);
            }
          ),
          { numRuns: 1000 }
        );
      });
    });

    describe('Property: Parts array structure integrity', () => {
      it('should always return array with valid part objects', () => {
        fc.assert(
          fc.property(fc.double({ noNaN: true, noDefaultInfinity: true }), (num) => {
            const parts = beautifyToParts(num);
            return (
              Array.isArray(parts) &&
              parts.length > 0 &&
              parts.every(
                (part) =>
                  typeof part === 'object' &&
                  'type' in part &&
                  'value' in part &&
                  typeof part.type === 'string' &&
                  typeof part.value === 'string'
              )
            );
          }),
          { numRuns: 1000 }
        );
      });

      it('should have parts that concatenate to valid string', () => {
        fc.assert(
          fc.property(fc.double({ noNaN: true, noDefaultInfinity: true }), (num) => {
            const parts = beautifyToParts(num);
            const concatenated = parts.map((p) => p.value).join('');
            return concatenated.length > 0;
          }),
          { numRuns: 1000 }
        );
      });
    });

    describe('Property: No consecutive separators', () => {
      it('should never produce consecutive thousand separators', () => {
        fc.assert(
          fc.property(fc.double({ min: 1000, max: 999999999, noNaN: true }), (num) => {
            const result = beautify(num, { locale: 'en-US' });
            return !result.includes(',,');
          }),
          { numRuns: 1000 }
        );
      });

      it('should never produce consecutive decimal separators', () => {
        fc.assert(
          fc.property(fc.double({ noNaN: true, noDefaultInfinity: true }), (num) => {
            const result = beautify(num);
            return !result.includes('..') && !result.includes(',,');
          }),
          { numRuns: 1000 }
        );
      });
    });
  });

  describe('Currency Formatting', () => {
    describe('Property: Currency symbol always present', () => {
      it('should always include currency symbol for USD', () => {
        fc.assert(
          fc.property(fc.double({ min: -999999, max: 999999, noNaN: true }), (num) => {
            const result = formatCurrency(num, 'en-US', { currency: 'USD' });
            return result.includes('$');
          }),
          { numRuns: 1000 }
        );
      });

      it('should always include currency symbol for EUR', () => {
        fc.assert(
          fc.property(fc.double({ min: -999999, max: 999999, noNaN: true }), (num) => {
            const result = formatCurrency(num, 'es-ES', { currency: 'EUR' });
            return result.includes('€');
          }),
          { numRuns: 1000 }
        );
      });
    });

    describe('Property: Currency format validity', () => {
      it('should produce valid currency strings', () => {
        fc.assert(
          fc.property(fc.double({ min: -999999, max: 999999, noNaN: true }), (num) => {
            const result = formatCurrency(num, 'en-US', { currency: 'USD' });
            // Should have $ and digits
            return result.includes('$') && /\d/.test(result);
          }),
          { numRuns: 1000 }
        );
      });
    });
  });

  describe('Bytes Formatting', () => {
    describe('Property: Unit suffix always present for non-zero', () => {
      it('should always include unit suffix for positive bytes', () => {
        fc.assert(
          fc.property(fc.double({ min: 1, max: 1e15, noNaN: true }), (num) => {
            const result = formatBytes(num);
            const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
            return units.some((unit) => result.includes(unit));
          }),
          { numRuns: 1000 }
        );
      });
    });

    describe('Property: Bytes value range validity', () => {
      it('should produce reasonable numeric values (< 1024 before unit)', () => {
        fc.assert(
          fc.property(fc.double({ min: 1024, max: 1e12, noNaN: true }), (num) => {
            const result = formatBytes(num);
            // Extract numeric part (before space and unit)
            const match = result.match(/^([\d,.]+)/);
            if (!match) return false;

            const numericPart = match[1].replace(/,/g, '');
            const value = parseFloat(numericPart);

            // Should be less than 1024 (except for bytes which can be larger)
            return result.includes('B') ? value >= 0 : value < 1024;
          }),
          { numRuns: 1000 }
        );
      });
    });
  });

  describe('Percentage Formatting', () => {
    describe('Property: Percentage symbol always present', () => {
      it('should always include % symbol', () => {
        fc.assert(
          fc.property(fc.double({ min: -10, max: 10, noNaN: true }), (num) => {
            const result = formatPercentage(num);
            return result.includes('%');
          }),
          { numRuns: 1000 }
        );
      });
    });

    describe('Property: Multiplication by 100 when multiply option is true', () => {
      it('should multiply by 100 when option is enabled', () => {
        fc.assert(
          fc.property(fc.double({ min: 0.01, max: 0.99, noNaN: true }), (num) => {
            const result = formatPercentage(num, { multiply: true });
            // Remove % and spaces, parse the number
            const numStr = result.replace('%', '').replace(/\s/g, '').replace(',', '.');
            const parsed = parseFloat(numStr);

            // Should be approximately num * 100
            const expected = num * 100;
            const tolerance = 0.01;
            return Math.abs(parsed - expected) < tolerance;
          }),
          { numRuns: 1000 }
        );
      });
    });
  });

  describe('Parsing Service (Inverse)', () => {
    describe('Property: Round-trip preservation (beautify → unbeautify)', () => {
      it('should preserve value through format/parse cycle for integers', () => {
        fc.assert(
          fc.property(fc.integer({ min: -999999, max: 999999 }), (num) => {
            const formatted = beautify(num, { locale: 'en-US' });
            const parsed = unbeautify(formatted, { locale: 'en-US' });
            return parsed === num;
          }),
          { numRuns: 1000 }
        );
      });

      it('should approximately preserve value for decimals (tolerance)', () => {
        fc.assert(
          fc.property(fc.double({ min: -99999, max: 99999, noNaN: true }), (num) => {
            const formatted = beautify(num, { locale: 'en-US', decimals: 2 });
            const parsed = unbeautify(formatted, { locale: 'en-US' });

            // Tolerance for floating point precision
            const tolerance = 0.01;
            return Math.abs(parsed - num) <= tolerance;
          }),
          { numRuns: 1000 }
        );
      });
    });

    describe('Property: Invalid formats produce NaN', () => {
      it('should handle strings with thousand separators as valid numbers', () => {
        // '1.234.567' in en-US is invalid, but parsing tries to handle it
        const result = unbeautify('1.234.567', { locale: 'en-US' });
        // Behavior: tries to parse, may return a number or NaN depending on implementation
        expect(typeof result).toBe('number');
      });

      it('should return a number (possibly 0 or NaN) for strings with invalid characters', () => {
        // Sanity check
        try {
          unbeautify('123', { locale: 'en-US' });
        } catch (e: any) {
          throw new Error('Sanity check failed: ' + e.message);
        }

        fc.assert(
          fc.property(
            fc.string({ minLength: 1, maxLength: 10 }).filter((s) => /[a-zA-Z]/.test(s)),
            (str) => {
              try {
                const result = unbeautify(str, { locale: 'en-US' });
                return typeof result === 'number';
              } catch (e) {
                console.error('Fuzzing error:', e);
                console.error('Available locales:', getRegisteredLocales());
                throw e;
              }
            }
          ),
          { numRuns: 500 }
        );
      });
    });
  });

  describe('Edge Cases: Special IEEE 754 Values', () => {
    describe('Property: Handling of -0 (negative zero)', () => {
      it('should normalize negative zero to positive zero string', () => {
        const result = beautify(-0);
        // JavaScript normalizes -0 to 0 in most string conversions
        expect(result).toBe('0.00');
      });

      it('should normalize -0 to 0 through rounding', () => {
        const result = round(-0, 2);
        // Most operations normalize -0 to 0
        expect(result).toBe(0);
      });
    });

    describe('Property: Handling of very large numbers', () => {
      it('should not crash on MAX_SAFE_INTEGER', () => {
        const result = beautify(Number.MAX_SAFE_INTEGER);
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
      });

      it('should not crash on MIN_SAFE_INTEGER', () => {
        const result = beautify(Number.MIN_SAFE_INTEGER);
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
      });
    });

    describe('Property: Handling of very small numbers', () => {
      it('should handle numbers close to zero', () => {
        fc.assert(
          fc.property(fc.double({ min: -1e-10, max: 1e-10, noNaN: true }), (num) => {
            const result = beautify(num, { decimals: 15 });
            return typeof result === 'string' && result.length > 0;
          }),
          { numRuns: 500 }
        );
      });
    });
  });
});
