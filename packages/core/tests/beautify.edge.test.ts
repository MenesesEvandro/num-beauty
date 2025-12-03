/* eslint-env jest */
import { beautify } from '../src';

describe('Beautify additional edge cases', () => {
  it('should handle negative zero', () => {
    expect(beautify(-0)).toBe('0.00');
  });

  it('should handle numbers with many decimals', () => {
    expect(beautify(1.123456789012345, { decimals: 12 })).toMatch(/1\.123456789012/);
  });

  it('should handle numbers close to rounding boundaries', () => {
    expect(beautify(2.4999999999, { decimals: 0, roundingMode: 'HALF_UP' })).toBe('2');
    expect(beautify(2.5, { decimals: 0, roundingMode: 'HALF_UP' })).toBe('3');
  });

  it('should handle string input gracefully', () => {
    expect(() => beautify('123' as any)).toThrow();
  });

  it('should handle objects as input gracefully', () => {
    expect(() => beautify({} as any)).toThrow();
  });
});
