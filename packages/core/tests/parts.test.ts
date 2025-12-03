import { beautifyToParts } from '../src/services/parts.service';

describe('beautifyToParts', () => {
  describe('Basic numbers', () => {
    test('should format integer without decimals', () => {
      const parts = beautifyToParts(1234, { decimals: 0 });
      expect(parts).toEqual([{ type: 'integer', value: '1,234' }]);
    });

    test('should format number with decimals (en-US)', () => {
      const parts = beautifyToParts(1234.56);
      expect(parts).toEqual([
        { type: 'integer', value: '1,234' },
        { type: 'decimal', value: '.' },
        { type: 'fraction', value: '56' },
      ]);
    });

    test('should format number with decimals (pt-BR)', () => {
      const parts = beautifyToParts(1234.56, { locale: 'pt-BR' });
      expect(parts).toEqual([
        { type: 'integer', value: '1.234' },
        { type: 'decimal', value: ',' },
        { type: 'fraction', value: '56' },
      ]);
    });

    test('should format number with decimals (de-DE)', () => {
      const parts = beautifyToParts(1234.56, { locale: 'de-DE' });
      expect(parts).toEqual([
        { type: 'integer', value: '1.234' },
        { type: 'decimal', value: ',' },
        { type: 'fraction', value: '56' },
      ]);
    });

    test('should format number with decimals (fr-FR)', () => {
      const parts = beautifyToParts(1234.56, { locale: 'fr-FR' });
      // French locale formatting may use different space characters
      expect(parts.length).toBe(3);
      expect(parts[0].type).toBe('integer');
      expect(parts[0].value).toContain('1');
      expect(parts[0].value).toContain('234');
      expect(parts[1]).toEqual({ type: 'decimal', value: ',' });
      expect(parts[2]).toEqual({ type: 'fraction', value: '56' });
    });

    test('should strip trailing zeros', () => {
      const parts = beautifyToParts(1234.5, { stripZeros: true });
      expect(parts).toEqual([
        { type: 'integer', value: '1,234' },
        { type: 'decimal', value: '.' },
        { type: 'fraction', value: '5' },
      ]);
    });

    test('should handle zero', () => {
      const parts = beautifyToParts(0);
      expect(parts).toEqual([
        { type: 'integer', value: '0' },
        { type: 'decimal', value: '.' },
        { type: 'fraction', value: '00' },
      ]);
    });
  });

  describe('Negative numbers', () => {
    test('should format negative numbers', () => {
      const parts = beautifyToParts(-1234.56);
      expect(parts).toEqual([
        { type: 'minusSign', value: '-' },
        { type: 'integer', value: '1,234' },
        { type: 'decimal', value: '.' },
        { type: 'fraction', value: '56' },
      ]);
    });

    test('should format negative numbers (pt-BR)', () => {
      const parts = beautifyToParts(-1234.56, { locale: 'pt-BR' });
      expect(parts).toEqual([
        { type: 'minusSign', value: '-' },
        { type: 'integer', value: '1.234' },
        { type: 'decimal', value: ',' },
        { type: 'fraction', value: '56' },
      ]);
    });
  });

  describe('Currency', () => {
    test('should format USD currency (symbol before)', () => {
      const parts = beautifyToParts(1234.56, {
        locale: 'en-US',
        currency: 'USD',
      });
      expect(parts).toEqual([
        { type: 'currency', value: '$' },
        { type: 'integer', value: '1,234' },
        { type: 'decimal', value: '.' },
        { type: 'fraction', value: '56' },
      ]);
    });

    test('should format BRL currency (pt-BR)', () => {
      const parts = beautifyToParts(1234.56, {
        locale: 'pt-BR',
        currency: 'BRL',
      });
      expect(parts).toEqual([
        { type: 'currency', value: 'R$' },
        { type: 'integer', value: '1.234' },
        { type: 'decimal', value: ',' },
        { type: 'fraction', value: '56' },
      ]);
    });

    test('should format EUR currency (symbol after)', () => {
      const parts = beautifyToParts(1234.56, {
        locale: 'de-DE',
        currency: 'EUR',
      });
      expect(parts).toEqual([
        { type: 'integer', value: '1.234' },
        { type: 'decimal', value: ',' },
        { type: 'fraction', value: '56' },
        { type: 'literal', value: ' ' },
        { type: 'currency', value: '€' },
      ]);
    });

    test('should format currency with code instead of symbol', () => {
      const parts = beautifyToParts(1234.56, {
        locale: 'en-US',
        currency: 'USD',
        showCode: true,
        showSymbol: false,
      });
      expect(parts).toEqual([
        { type: 'currency', value: 'USD' },
        { type: 'integer', value: '1,234' },
        { type: 'decimal', value: '.' },
        { type: 'fraction', value: '56' },
      ]);
    });

    test('should format negative currency', () => {
      const parts = beautifyToParts(-1234.56, {
        locale: 'en-US',
        currency: 'USD',
      });
      expect(parts).toEqual([
        { type: 'minusSign', value: '-' },
        { type: 'currency', value: '$' },
        { type: 'integer', value: '1,234' },
        { type: 'decimal', value: '.' },
        { type: 'fraction', value: '56' },
      ]);
    });
  });

  describe('Percentage', () => {
    test('should format percentage (en-US)', () => {
      const parts = beautifyToParts(0.5, { percentage: true });
      expect(parts).toEqual([
        { type: 'integer', value: '50' },
        { type: 'decimal', value: '.' },
        { type: 'fraction', value: '00' },
        { type: 'percentSign', value: '%' },
      ]);
    });

    test('should format percentage (pt-BR)', () => {
      const parts = beautifyToParts(0.5, {
        locale: 'pt-BR',
        percentage: true,
      });
      expect(parts).toEqual([
        { type: 'integer', value: '50' },
        { type: 'decimal', value: ',' },
        { type: 'fraction', value: '00' },
        { type: 'percentSign', value: '%' },
      ]);
    });

    test('should format percentage without multiplying', () => {
      const parts = beautifyToParts(50, {
        percentage: true,
        percentageMultiply: false,
      });
      expect(parts).toEqual([
        { type: 'integer', value: '50' },
        { type: 'decimal', value: '.' },
        { type: 'fraction', value: '00' },
        { type: 'percentSign', value: '%' },
      ]);
    });

    test('should format percentage with custom decimals', () => {
      const parts = beautifyToParts(0.12345, {
        percentage: true,
        decimals: 3,
      });
      expect(parts).toEqual([
        { type: 'integer', value: '12' },
        { type: 'decimal', value: '.' },
        { type: 'fraction', value: '345' },
        { type: 'percentSign', value: '%' },
      ]);
    });
  });

  describe('Abbreviated numbers', () => {
    test('should format abbreviated thousands (en-US)', () => {
      const parts = beautifyToParts(1500, {
        locale: 'en-US',
        abbreviated: true,
      });
      expect(parts).toEqual([
        { type: 'integer', value: '1' },
        { type: 'decimal', value: '.' },
        { type: 'fraction', value: '5' },
        { type: 'unit', value: 'k' },
      ]);
    });

    test('should format abbreviated millions (pt-BR)', () => {
      const parts = beautifyToParts(1234567, {
        locale: 'pt-BR',
        abbreviated: true,
      });
      expect(parts).toEqual([
        { type: 'integer', value: '1' },
        { type: 'decimal', value: ',' },
        { type: 'fraction', value: '23' },
        { type: 'unit', value: 'mi' },
      ]);
    });

    test('should format abbreviated billions (es-ES)', () => {
      const parts = beautifyToParts(1234567890, {
        locale: 'es-ES',
        abbreviated: true,
      });
      expect(parts).toEqual([
        { type: 'integer', value: '1' },
        { type: 'decimal', value: ',' },
        { type: 'fraction', value: '23' },
        { type: 'unit', value: 'MM' },
      ]);
    });

    test('should format abbreviated with strip zeros', () => {
      const parts = beautifyToParts(1000, {
        locale: 'en-US',
        abbreviated: true,
        stripZeros: true,
      });
      expect(parts).toEqual([
        { type: 'integer', value: '1' },
        { type: 'unit', value: 'k' },
      ]);
    });
  });

  describe('Bytes', () => {
    test('should format bytes (binary)', () => {
      const parts = beautifyToParts(1536, { bytes: true });
      expect(parts).toEqual([
        { type: 'integer', value: '1' },
        { type: 'decimal', value: '.' },
        { type: 'fraction', value: '50' },
        { type: 'unit', value: 'KiB' },
      ]);
    });

    test('should format bytes (decimal)', () => {
      const parts = beautifyToParts(1500, {
        bytes: true,
        bytesBinary: false,
      });
      expect(parts).toEqual([
        { type: 'integer', value: '1' },
        { type: 'decimal', value: '.' },
        { type: 'fraction', value: '50' },
        { type: 'unit', value: 'KB' },
      ]);
    });

    test('should format bytes with long format', () => {
      const parts = beautifyToParts(1048576, {
        bytes: true,
        bytesLongFormat: true,
      });
      expect(parts).toEqual([
        { type: 'integer', value: '1' },
        { type: 'decimal', value: '.' },
        { type: 'fraction', value: '00' },
        { type: 'unit', value: 'Mebibyte' },
      ]);
    });

    test('should format bytes with custom decimals', () => {
      const parts = beautifyToParts(1536, {
        bytes: true,
        decimals: 1,
        stripZeros: true,
      });
      expect(parts).toEqual([
        { type: 'integer', value: '1' },
        { type: 'decimal', value: '.' },
        { type: 'fraction', value: '5' },
        { type: 'unit', value: 'KiB' },
      ]);
    });

    test('should format bytes (pt-BR locale)', () => {
      const parts = beautifyToParts(1536, {
        bytes: true,
        locale: 'pt-BR',
      });
      expect(parts).toEqual([
        { type: 'integer', value: '1' },
        { type: 'decimal', value: ',' },
        { type: 'fraction', value: '50' },
        { type: 'unit', value: 'KiB' },
      ]);
    });
  });

  describe('Complex scenarios', () => {
    test('should format abbreviated numbers with currency context', () => {
      const parts = beautifyToParts(1234567, {
        locale: 'pt-BR',
        abbreviated: true,
        decimals: 1,
      });
      // Abbreviated formatting
      expect(parts.some((p) => p.type === 'unit')).toBe(true);
      expect(parts).toContainEqual(expect.objectContaining({ type: 'integer' }));
    });

    test('should handle very large numbers', () => {
      const parts = beautifyToParts(999999999.99);
      expect(parts).toEqual([
        { type: 'integer', value: '999,999,999' },
        { type: 'decimal', value: '.' },
        { type: 'fraction', value: '99' },
      ]);
    });

    test('should handle very small decimals', () => {
      const parts = beautifyToParts(0.001, { decimals: 3 });
      expect(parts).toEqual([
        { type: 'integer', value: '0' },
        { type: 'decimal', value: '.' },
        { type: 'fraction', value: '001' },
      ]);
    });
  });

  describe('Edge cases', () => {
    test('should handle integer with no decimals', () => {
      const parts = beautifyToParts(1234, { decimals: 0 });
      expect(parts).toEqual([{ type: 'integer', value: '1,234' }]);
    });

    test('should handle custom rounding modes', () => {
      const parts = beautifyToParts(1.235, {
        decimals: 2,
        roundingMode: 'UP',
      });
      expect(parts).toEqual([
        { type: 'integer', value: '1' },
        { type: 'decimal', value: '.' },
        { type: 'fraction', value: '24' },
      ]);
    });
  });

  describe('Type checking', () => {
    test('should return array of NumberPart objects', () => {
      const parts = beautifyToParts(1234.56);
      expect(Array.isArray(parts)).toBe(true);
      parts.forEach((part) => {
        expect(part).toHaveProperty('type');
        expect(part).toHaveProperty('value');
        expect(typeof part.type).toBe('string');
        expect(typeof part.value).toBe('string');
      });
    });

    test('should have valid part types', () => {
      const validTypes = [
        'integer',
        'decimal',
        'fraction',
        'group',
        'currency',
        'percentSign',
        'unit',
        'minusSign',
        'plusSign',
        'literal',
      ];

      const parts = beautifyToParts(-1234.56, {
        locale: 'pt-BR',
        currency: 'BRL',
      });

      parts.forEach((part) => {
        expect(validTypes).toContain(part.type);
      });
    });
  });
});
