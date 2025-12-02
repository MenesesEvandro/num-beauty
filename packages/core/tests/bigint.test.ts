import { beautify, formatCurrency } from '../src/index';

describe('BigInt Support', () => {
  test('formats huge integers correctly', () => {
    const huge = 123456789012345678901234567890n;
    // Intl.NumberFormat should handle this
    const formatted = beautify(huge, { locale: 'en-US' });
    expect(formatted).toBe('123,456,789,012,345,678,901,234,567,890');
  });

  test('formats currency with BigInt', () => {
    const price = 1000000000000000n;
    const formatted = formatCurrency(price, 'en-US', { currency: 'USD' });
    expect(formatted).toBe('$1,000,000,000,000,000');
  });

  test('abbreviates BigInt (approximation)', () => {
    const huge = 1500000000000000000n; // 1.5 Qi (Quintillion)
    // 10^18 is Quintillion (Qi) in some systems or just E notation?
    // Our abbreviation service uses standard suffixes.
    // 10^3 = k, 10^6 = M, 10^9 = B, 10^12 = T, 10^15 = Qa, 10^18 = Qi
    const formatted = beautify(huge, { abbreviated: true, locale: 'en-US' });
    // Note: Precision might vary slightly due to Number conversion, but 1.5 Qi should be close.
    // Let's check what our units are.
    // Assuming standard short scale.
    expect(formatted).toMatch(/1\.50?\s?qi/);
  });

  test('handles negative BigInt', () => {
    const negative = -12345678901234567890n;
    const formatted = beautify(negative, { locale: 'en-US' });
    expect(formatted).toBe('-12,345,678,901,234,567,890');
  });
});
