import { formatTabular } from '../src/index';

describe('Tabular Alignment', () => {
  test('aligns decimal points', () => {
    const values = [10, 1000.5, 2.34];
    const formatted = formatTabular(values, { locale: 'en-US' });
    // Default decimals is 2.
    // 10 -> "10.00"
    // 1000.5 -> "1,000.50"
    // 2.34 -> "2.34"
    // Max integer width: "1,000" (5 chars).
    // "10" (2 chars) -> pad 3 spaces -> "   10"
    // "2" (1 char) -> pad 4 spaces -> "    2"
    expect(formatted).toEqual(['   10.00', '1,000.50', '    2.34']);
  });

  test('handles mixed integers and floats with stripZeros', () => {
    const values = [10, 1000.5, 2.34];
    const formatted = formatTabular(values, { locale: 'en-US', stripZeros: true });
    // 10 -> "10"
    // 1000.5 -> "1,000.5"
    // 2.34 -> "2.34"
    // Max integer width: 5.
    expect(formatted).toEqual(['   10', '1,000.5', '    2.34']);
  });

  test('handles different locales (comma)', () => {
    const values = [10.5, 1000];
    const formatted = formatTabular(values, { locale: 'pt-BR' });
    // 10.5 -> "10,50"
    // 1000 -> "1.000,00"
    // Max integer width: "1.000" (5 chars).
    // "10" (2 chars) -> pad 3 spaces.
    expect(formatted).toEqual(['   10,50', '1.000,00']);
  });

  test('handles negative numbers', () => {
    const values = [-10, 100];
    const formatted = formatTabular(values, { locale: 'en-US' });
    // -10 -> "-10.00"
    // 100 -> "100.00"
    // Max integer width: "-10" (3 chars), "100" (3 chars).
    // Both 3 chars.
    expect(formatted).toEqual(['-10.00', '100.00']);
  });

  test('handles negative numbers with different lengths', () => {
    const values = [-5, 100];
    const formatted = formatTabular(values, { locale: 'en-US' });
    // -5 -> "-5.00" (integer part "-5", len 2)
    // 100 -> "100.00" (integer part "100", len 3)
    // Max width 3.
    // "-5" -> pad 1 space -> " -5"
    expect(formatted).toEqual([' -5.00', '100.00']);
  });
});
