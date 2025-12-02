import { unbeautify } from '../src/services/parsing.service';
import { beautify } from '../src/index';

describe('unbeautify', () => {
  describe('Basic numbers', () => {
    test('should parse integer without formatting', () => {
      expect(unbeautify('1234')).toBe(1234);
      expect(unbeautify('0')).toBe(0);
      expect(unbeautify('999999')).toBe(999999);
    });

    test('should parse decimal numbers (en-US)', () => {
      expect(unbeautify('1234.56')).toBe(1234.56);
      expect(unbeautify('0.5')).toBe(0.5);
      expect(unbeautify('999.999')).toBe(999.999);
    });

    test('should parse decimal numbers (pt-BR)', () => {
      expect(unbeautify('1234,56', { locale: 'pt-BR' })).toBe(1234.56);
      expect(unbeautify('0,5', { locale: 'pt-BR' })).toBe(0.5);
      expect(unbeautify('999,999', { locale: 'pt-BR' })).toBe(999.999);
    });

    test('should parse numbers with thousand separators (en-US)', () => {
      expect(unbeautify('1,234')).toBe(1234);
      expect(unbeautify('1,234,567')).toBe(1234567);
      expect(unbeautify('1,234.56')).toBe(1234.56);
      expect(unbeautify('1,234,567.89')).toBe(1234567.89);
    });

    test('should parse numbers with thousand separators (pt-BR)', () => {
      expect(unbeautify('1.234', { locale: 'pt-BR' })).toBe(1234);
      expect(unbeautify('1.234.567', { locale: 'pt-BR' })).toBe(1234567);
      expect(unbeautify('1.234,56', { locale: 'pt-BR' })).toBe(1234.56);
      expect(unbeautify('1.234.567,89', { locale: 'pt-BR' })).toBe(1234567.89);
    });

    test('should parse numbers with thousand separators (de-DE)', () => {
      expect(unbeautify('1.234', { locale: 'de-DE' })).toBe(1234);
      expect(unbeautify('1.234.567', { locale: 'de-DE' })).toBe(1234567);
      expect(unbeautify('1.234,56', { locale: 'de-DE' })).toBe(1234.56);
    });

    test('should parse numbers with thousand separators (fr-FR)', () => {
      expect(unbeautify('1 234', { locale: 'fr-FR' })).toBe(1234);
      expect(unbeautify('1 234 567', { locale: 'fr-FR' })).toBe(1234567);
      expect(unbeautify('1 234,56', { locale: 'fr-FR' })).toBe(1234.56);
    });
  });

  describe('Negative numbers', () => {
    test('should parse negative numbers with minus sign', () => {
      expect(unbeautify('-1234')).toBe(-1234);
      expect(unbeautify('-1234.56')).toBe(-1234.56);
      expect(unbeautify('-1,234.56')).toBe(-1234.56);
    });

    test('should parse negative numbers in accounting format (parentheses)', () => {
      expect(unbeautify('(1234)')).toBe(-1234);
      expect(unbeautify('(1234.56)')).toBe(-1234.56);
      expect(unbeautify('(1,234.56)')).toBe(-1234.56);
    });

    test('should parse negative numbers (pt-BR)', () => {
      expect(unbeautify('-1.234,56', { locale: 'pt-BR' })).toBe(-1234.56);
      expect(unbeautify('(1.234,56)', { locale: 'pt-BR' })).toBe(-1234.56);
    });
  });

  describe('Abbreviated numbers', () => {
    test('should parse numbers with k suffix', () => {
      expect(unbeautify('1k')).toBe(1000);
      expect(unbeautify('1.5k')).toBe(1500);
      expect(unbeautify('2.3k')).toBe(2300);
      expect(unbeautify('999k')).toBe(999000);
    });

    test('should parse numbers with M suffix', () => {
      expect(unbeautify('1M')).toBe(1000000);
      expect(unbeautify('1.5M')).toBe(1500000);
      expect(unbeautify('2.3M')).toBe(2300000);
      expect(unbeautify('999M')).toBe(999000000);
    });

    test('should parse numbers with B suffix', () => {
      expect(unbeautify('1B')).toBe(1000000000);
      expect(unbeautify('1.5B')).toBe(1500000000);
      expect(unbeautify('2.3B')).toBe(2300000000);
    });

    test('should parse numbers with T suffix', () => {
      expect(unbeautify('1T')).toBe(1000000000000);
      expect(unbeautify('1.5T')).toBe(1500000000000);
      expect(unbeautify('2.3T')).toBe(2300000000000);
    });

    test('should parse abbreviated numbers with locale formatting (pt-BR)', () => {
      expect(unbeautify('1,5k', { locale: 'pt-BR' })).toBe(1500);
      expect(unbeautify('2,3M', { locale: 'pt-BR' })).toBe(2300000);
      expect(unbeautify('1,2B', { locale: 'pt-BR' })).toBe(1200000000);
    });

    test('should parse locale-specific abbreviations (pt-BR)', () => {
      expect(unbeautify('1,5 mil', { locale: 'pt-BR' })).toBe(1500);
      expect(unbeautify('2,3 mi', { locale: 'pt-BR' })).toBe(2300000);
      expect(unbeautify('1,2 bi', { locale: 'pt-BR' })).toBe(1200000000);
    });

    test('should parse locale-specific abbreviations (es-ES)', () => {
      expect(unbeautify('1,5 mil', { locale: 'es-ES' })).toBe(1500);
      expect(unbeautify('2,3 M', { locale: 'es-ES' })).toBe(2300000);
    });
  });

  describe('Currency', () => {
    test('should parse USD currency (en-US)', () => {
      expect(unbeautify('$1234')).toBe(1234);
      expect(unbeautify('$1234.56')).toBe(1234.56);
      expect(unbeautify('$1,234.56')).toBe(1234.56);
      expect(unbeautify('$ 1,234.56')).toBe(1234.56);
    });

    test('should parse BRL currency (pt-BR)', () => {
      expect(unbeautify('R$ 1234', { locale: 'pt-BR' })).toBe(1234);
      expect(unbeautify('R$ 1234,56', { locale: 'pt-BR' })).toBe(1234.56);
      expect(unbeautify('R$ 1.234,56', { locale: 'pt-BR' })).toBe(1234.56);
    });

    test('should parse EUR currency', () => {
      expect(unbeautify('€1234')).toBe(1234);
      expect(unbeautify('€1234.56')).toBe(1234.56);
      expect(unbeautify('1234.56 €')).toBe(1234.56);
      expect(unbeautify('1.234,56 €', { locale: 'de-DE' })).toBe(1234.56);
    });

    test('should parse GBP currency', () => {
      expect(unbeautify('£1234')).toBe(1234);
      expect(unbeautify('£1234.56')).toBe(1234.56);
      expect(unbeautify('£1,234.56')).toBe(1234.56);
    });

    test('should parse currency with abbreviations', () => {
      expect(unbeautify('$1.5k')).toBe(1500);
      expect(unbeautify('R$ 2,3 mi', { locale: 'pt-BR' })).toBe(2300000);
      // In de-DE, comma is decimal separator, so use comma for decimals with abbreviations
      expect(unbeautify('€1,2M', { locale: 'de-DE' })).toBe(1200000);
    });

    test('should parse negative currency', () => {
      expect(unbeautify('-$1,234.56')).toBe(-1234.56);
      expect(unbeautify('($1,234.56)')).toBe(-1234.56);
      expect(unbeautify('-R$ 1.234,56', { locale: 'pt-BR' })).toBe(-1234.56);
    });
  });

  describe('Percentage', () => {
    test('should parse percentage and convert to decimal', () => {
      expect(unbeautify('50%')).toBe(0.5);
      expect(unbeautify('45.5%')).toBe(0.455);
      expect(unbeautify('100%')).toBe(1);
      expect(unbeautify('0%')).toBe(0);
    });

    test('should parse percentage with locale formatting (pt-BR)', () => {
      expect(unbeautify('45,5%', { locale: 'pt-BR' })).toBe(0.455);
      expect(unbeautify('45,5 %', { locale: 'pt-BR' })).toBe(0.455);
    });

    test('should parse negative percentage', () => {
      expect(unbeautify('-45.5%')).toBe(-0.455);
      expect(unbeautify('(-45.5%)')).toBe(-0.455);
    });
  });

  describe('Bytes', () => {
    test('should parse byte units (binary)', () => {
      expect(unbeautify('1 KB')).toBe(1024);
      expect(unbeautify('1.5 KB')).toBe(1536);
      expect(unbeautify('1 MB')).toBe(1048576);
      expect(unbeautify('2.5 MB')).toBe(2621440);
      expect(unbeautify('1 GB')).toBe(1073741824);
      expect(unbeautify('1 TB')).toBe(1099511627776);
    });

    test('should parse byte units with locale formatting (pt-BR)', () => {
      expect(unbeautify('1,5 KB', { locale: 'pt-BR' })).toBe(1536);
      expect(unbeautify('2,5 MB', { locale: 'pt-BR' })).toBe(2621440);
    });

    test('should parse IEC binary units', () => {
      expect(unbeautify('1 KiB')).toBe(1024);
      expect(unbeautify('1 MiB')).toBe(1048576);
      expect(unbeautify('1 GiB')).toBe(1073741824);
      expect(unbeautify('1 TiB')).toBe(1099511627776);
    });
  });

  describe('Edge cases', () => {
    test('should handle empty string', () => {
      expect(unbeautify('')).toBe(0);
      expect(unbeautify('   ')).toBe(0);
    });

    test('should handle zero', () => {
      expect(unbeautify('0')).toBe(0);
      expect(unbeautify('0.0')).toBe(0);
      expect(unbeautify('0,0', { locale: 'pt-BR' })).toBe(0);
    });

    test('should handle very large numbers', () => {
      expect(unbeautify('999,999,999.99')).toBe(999999999.99);
      expect(unbeautify('1,000,000,000')).toBe(1000000000);
    });

    test('should handle very small decimals', () => {
      expect(unbeautify('0.001')).toBe(0.001);
      expect(unbeautify('0.000001')).toBe(0.000001);
      expect(unbeautify('0,001', { locale: 'pt-BR' })).toBe(0.001);
    });

    test('should handle mixed formats gracefully', () => {
      expect(unbeautify('$ 1,234.56 USD')).toBe(1234.56);
      expect(unbeautify('R$ 1.234,56 BRL', { locale: 'pt-BR' })).toBe(1234.56);
    });

    test('should handle strings with extra whitespace', () => {
      expect(unbeautify('  1234  ')).toBe(1234);
      expect(unbeautify('  $ 1,234.56  ')).toBe(1234.56);
      expect(unbeautify('  1.5 k  ')).toBe(1500);
    });
  });

  describe('Round-trip consistency', () => {
    test('should parse beautified numbers back to original', () => {
      // Basic numbers
      expect(unbeautify(beautify(1234.56))).toBeCloseTo(1234.56, 2);
      expect(unbeautify(beautify(1234.56, { locale: 'pt-BR' }), { locale: 'pt-BR' })).toBeCloseTo(
        1234.56,
        2
      );

      // Abbreviated
      const abbreviated = beautify(1500000, { abbreviated: true });
      expect(unbeautify(abbreviated)).toBeCloseTo(1500000, -2); // Allow some rounding
    });
  });
});
