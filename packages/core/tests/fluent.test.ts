import { Num, num } from '../src/fluent';

describe('Fluent API', () => {
  describe('Constructor and Factory', () => {
    it('should create instance using new Num()', () => {
      const result = new Num(1234.56);
      expect(result).toBeInstanceOf(Num);
    });

    it('should create instance using num() factory', () => {
      const result = num(1234.56);
      expect(result).toBeInstanceOf(Num);
    });

    it('should preserve numeric value', () => {
      const result = new Num(1234.56);
      expect(result.valueOf()).toBe(1234.56);
    });
  });

  describe('Basic Number Formatting', () => {
    it('should format number with default locale', () => {
      const result = num(1234.56).format();
      expect(result).toBe('1,234.56');
    });

    it('should format number with pt-BR locale', () => {
      const result = num(1234.56).locale('pt-BR').format();
      expect(result).toBe('1.234,56');
    });

    it('should format number with es-ES locale', () => {
      const result = num(1234.56).locale('es-ES').format();
      expect(result).toBe('1.234,56');
    });

    it('should format number with custom decimals', () => {
      const result = num(1234.56789).decimals(3).format();
      expect(result).toBe('1,234.568');
    });

    it('should strip trailing zeros', () => {
      const result = num(1234.5).stripZeros().format();
      expect(result).toBe('1,234.5');
    });

    it('should apply different rounding modes', () => {
      expect(num(1.5).decimals(0).rounding('HALF_UP').format()).toBe('2');
      expect(num(1.5).decimals(0).rounding('HALF_DOWN').format()).toBe('1');
      expect(num(1.5).decimals(0).rounding('FLOOR').format()).toBe('1');
      expect(num(1.5).decimals(0).rounding('CEIL').format()).toBe('2');
    });
  });

  describe('Currency Formatting', () => {
    it('should format as currency with symbol', () => {
      const result = num(1234.56).locale('en-US').currency('USD').format();
      expect(result).toBe('$1,234.56');
    });

    it('should format as currency in pt-BR', () => {
      const result = num(1234.56).locale('pt-BR').currency('BRL').format();
      expect(result).toBe('R$ 1.234,56');
    });

    it('should hide currency symbol', () => {
      const result = num(1234.56).locale('en-US').currency('USD').hideSymbol().format();
      expect(result).toBe('1,234.56');
    });

    it('should show currency code', () => {
      const result = num(1234.56).locale('en-US').currency('USD').showCode().format();
      expect(result).toBe('USD 1,234.56');
    });

    it('should format currency with custom decimals', () => {
      const result = num(1234.5).locale('en-US').currency('USD').decimals(0).format();
      expect(result).toBe('$1,235');
    });
  });

  describe('Bytes Formatting', () => {
    it('should format bytes in binary (default)', () => {
      const result = num(1048576).bytes().format();
      expect(result).toBe('1.00 MiB');
    });

    it('should format bytes in decimal', () => {
      const result = num(1000000).bytes(false).format();
      expect(result).toBe('1.00 MB');
    });

    it('should format bytes with long format', () => {
      const result = num(1048576).bytes().bytesLongFormat().format();
      expect(result).toBe('1.00 Mebibyte');
    });

    it('should format bytes with custom decimals', () => {
      const result = num(1536).bytes().decimals(3).format();
      expect(result).toBe('1.500 KiB');
    });

    it('should format bytes with strip zeros', () => {
      const result = num(1024).bytes().decimals(2).stripZeros().format();
      expect(result).toBe('1 KiB');
    });

    it('should format bytes with pt-BR locale', () => {
      const result = num(1048576).locale('pt-BR').bytes().format();
      expect(result).toBe('1,00 MiB');
    });
  });

  describe('Percentage Formatting', () => {
    it('should format as percentage with multiplication', () => {
      const result = num(0.5).percentage().format();
      expect(result).toBe('50.00%');
    });

    it('should format as percentage without multiplication', () => {
      const result = num(50).percentage(false).format();
      expect(result).toBe('50.00%');
    });

    it('should format percentage with space', () => {
      const result = num(0.5).percentage().percentageSpace().format();
      expect(result).toBe('50.00 %');
    });

    it('should format percentage with custom decimals', () => {
      const result = num(0.12345).percentage().decimals(3).format();
      expect(result).toBe('12.345%');
    });

    it('should format percentage with strip zeros', () => {
      const result = num(0.5).percentage().stripZeros().format();
      expect(result).toBe('50%');
    });

    it('should format percentage with pt-BR locale', () => {
      const result = num(0.5).locale('pt-BR').percentage().format();
      expect(result).toBe('50,00 %');
    });
  });

  describe('Abbreviated Numbers', () => {
    it('should abbreviate thousands in en-US', () => {
      const result = num(1234).locale('en-US').abbreviated().format();
      expect(result).toBe('1.23k');
    });

    it('should abbreviate millions in pt-BR', () => {
      const result = num(1234567).locale('pt-BR').decimals(2).abbreviated().format();
      expect(result).toBe('1,23 mi');
    });

    it('should abbreviate billions in es-ES', () => {
      const result = num(1234567890).locale('es-ES').decimals(2).abbreviated().format();
      expect(result).toBe('1,23 MM');
    });

    it('should abbreviate with strip zeros', () => {
      const result = num(1000).locale('en-US').decimals(2).abbreviated().stripZeros().format();
      expect(result).toBe('1k');
    });
  });

  describe('Mask Formatting', () => {
    it('should apply custom mask', () => {
      const result = num(12345678).mask('##.###.###').format();
      expect(result).toBe('12.345.678');
    });

    it('should apply predefined mask (cpf)', () => {
      const result = num(12345678901).locale('pt-BR').mask('cpf').format();
      expect(result).toBe('123.456.789-01');
    });

    it('should apply predefined mask (cnpj)', () => {
      const result = num(12345678000190).locale('pt-BR').mask('cnpj').format();
      expect(result).toBe('12.345.678/0001-90');
    });

    it('should apply predefined mask (phone)', () => {
      const result = num(11987654321).locale('pt-BR').mask('phone').format();
      expect(result).toBe('(11) 98765-4321');
    });

    it('should apply predefined mask (cep)', () => {
      const result = num(12345678).locale('pt-BR').mask('cep').format();
      expect(result).toBe('12345-678');
    });
  });

  describe('Method Chaining', () => {
    it('should chain multiple methods', () => {
      const result = num(1234.5678).locale('pt-BR').decimals(3).stripZeros().format();
      expect(result).toBe('1.234,568');
    });

    it('should chain currency methods', () => {
      const result = num(1234.56).locale('pt-BR').currency('EUR').decimals(3).format();
      expect(result).toBe('1.234,560 €');
    });

    it('should chain bytes methods', () => {
      const result = num(1536).locale('pt-BR').bytes().decimals(1).stripZeros().format();
      expect(result).toBe('1,5 KiB');
    });

    it('should chain percentage methods', () => {
      const result = num(0.12345)
        .locale('pt-BR')
        .percentage()
        .decimals(1)
        .percentageSpace()
        .format();
      expect(result).toBe('12,3 %');
    });

    it('should chain abbreviated methods', () => {
      const result = num(1234567).locale('en-US').decimals(1).abbreviated().stripZeros().format();
      expect(result).toBe('1.23m');
    });
  });

  describe('toString and valueOf', () => {
    it('should convert to string using toString()', () => {
      const result = num(1234.56).locale('pt-BR').toString();
      expect(result).toBe('1.234,56');
    });

    it('should return numeric value using valueOf()', () => {
      const result = num(1234.56).valueOf();
      expect(result).toBe(1234.56);
    });

    it('should work with implicit string conversion', () => {
      const formatted = String(num(1234.56).locale('pt-BR'));
      expect(formatted).toBe('1.234,56');
    });

    it('should work with implicit numeric conversion', () => {
      const value = Number(num(1234.56));
      expect(value).toBe(1234.56);
    });
  });

  describe('Complex Scenarios', () => {
    it('should format currency with all options', () => {
      const result = num(1234.567)
        .locale('pt-BR')
        .currency('USD')
        .decimals(3)
        .stripZeros()
        .format();
      expect(result).toBe('$1.234,567');
    });

    it('should format bytes with locale and options', () => {
      const result = num(1536000).locale('es-ES').bytes().decimals(1).stripZeros().format();
      expect(result).toBe('1,5 MiB');
    });

    it('should format percentage with locale and space', () => {
      const result = num(0.9876)
        .locale('de-DE')
        .percentage()
        .decimals(1)
        .percentageSpace()
        .format();
      expect(result).toBe('98,8 %');
    });

    it('should abbreviate with rounding', () => {
      const result = num(1999999)
        .locale('en-US')
        .decimals(1)
        .abbreviated()
        .rounding('CEIL')
        .format();
      expect(result).toBe('2m');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero', () => {
      expect(num(0).format()).toBe('0.00');
      expect(num(0).currency('USD').format()).toBe('$0.00');
      expect(num(0).percentage().format()).toBe('0.00%');
      expect(num(0).bytes().format()).toBe('0 B');
    });

    it('should handle negative numbers', () => {
      expect(num(-1234.56).locale('pt-BR').format()).toBe('-1.234,56');
      expect(num(-1234.56).currency('USD').format()).toBe('-$1,234.56');
      expect(num(-0.5).percentage().format()).toBe('-50.00%');
    });

    it('should handle very large numbers', () => {
      const result = num(1234567890123).abbreviated().format();
      expect(result).toContain('t');
    });

    it('should handle very small numbers', () => {
      const result = num(0.00001234).decimals(8).format();
      expect(result).toBe('0.00001234');
    });
  });

  describe('Accessibility (toAccessible)', () => {
    it('should convert abbreviated number to accessible text (pt-BR)', () => {
      const result = num(1200000).locale('pt-BR').decimals(1).abbreviated().toAccessible();
      expect(result).toBe('um ponto dois milhões');
    });

    it('should convert currency to accessible text (pt-BR)', () => {
      // Currency formatting does not use abbreviation, formats full number
      // For values >= 1000, pt-BR uses "de" joiner
      const result = num(1234).locale('pt-BR').currency('BRL').decimals(0).toAccessible();
      expect(result).toBe('mil duzentos e trinta e quatro de reais');
    });

    it('should convert abbreviated number to accessible text (en-US)', () => {
      const result = num(1500).locale('en-US').decimals(1).abbreviated().toAccessible();
      expect(result).toBe('one point five thousand');
    });

    it('should convert currency to accessible text (en-US)', () => {
      // Currency formatting does not use abbreviation, formats full number
      const result = num(1234).locale('en-US').currency('USD').decimals(0).toAccessible();
      expect(result).toBe('one thousand two hundred thirty four dollars');
    });

    it('should convert regular formatted number to accessible text', () => {
      const result = num(1234).locale('pt-BR').decimals(0).toAccessible();
      expect(result).toBe('mil duzentos e trinta e quatro');
    });

    it('should handle zero in accessible format', () => {
      const result = num(0).locale('pt-BR').decimals(0).toAccessible();
      expect(result).toBe('zero');
    });

    it('should handle negative numbers in accessible format', () => {
      const result = num(-2500000).locale('pt-BR').decimals(1).abbreviated().toAccessible();
      expect(result).toBe('menos dois ponto cinco milhões');
    });

    it('should convert percentage to accessible text', () => {
      const result = num(0.5).locale('en-US').percentage().decimals(0).toAccessible();
      // formatPercentage returns "50%", should convert to accessible
      expect(result).toContain('fifty');
    });

    it('should work with method chaining for abbreviated numbers', () => {
      const result = num(123000000).locale('pt-BR').decimals(0).abbreviated().toAccessible();
      expect(result).toContain('milhões');
    });

    it('should convert bytes to accessible format', () => {
      const result = num(1536).locale('en-US').bytes().decimals(1).stripZeros().toAccessible();
      // formatBytes returns "1.5 KiB"
      expect(result).toContain('one');
      expect(result).toContain('five');
    });
  });

  describe('Parsing (Num.parse)', () => {
    it('should parse basic formatted numbers', () => {
      expect(Num.parse('1,234.56')).toBe(1234.56);
      expect(Num.parse('1.234,56', 'pt-BR')).toBe(1234.56);
    });

    it('should parse currency strings', () => {
      expect(Num.parse('$1,234.56')).toBe(1234.56);
      expect(Num.parse('R$ 1.234,56', 'pt-BR')).toBe(1234.56);
      expect(Num.parse('€1,234.56')).toBe(1234.56);
    });

    it('should parse abbreviated numbers', () => {
      expect(Num.parse('1.5k')).toBe(1500);
      expect(Num.parse('2.3M')).toBe(2300000);
      expect(Num.parse('1.2B')).toBe(1200000000);
    });

    it('should parse percentage strings', () => {
      expect(Num.parse('45.5%')).toBe(0.455);
      expect(Num.parse('100%')).toBe(1);
    });

    it('should parse byte strings', () => {
      expect(Num.parse('1.5 KB')).toBe(1536);
      expect(Num.parse('2 MB')).toBe(2097152);
    });

    it('should parse negative numbers', () => {
      expect(Num.parse('-1,234.56')).toBe(-1234.56);
      expect(Num.parse('(1,234.56)')).toBe(-1234.56);
    });

    it('should handle round-trip with format/parse', () => {
      const original = 1234.56;
      const formatted = num(original).locale('en-US').format();
      const parsed = Num.parse(formatted, 'en-US');
      expect(parsed).toBe(original);
    });

    it('should handle round-trip with pt-BR locale', () => {
      const original = 1234567.89;
      const formatted = num(original).locale('pt-BR').format();
      const parsed = Num.parse(formatted, 'pt-BR');
      expect(parsed).toBe(original);
    });
  });

  describe('toParts()', () => {
    it('should format basic numbers to parts', () => {
      const parts = num(1234.56).toParts();
      expect(parts).toEqual([
        { type: 'integer', value: '1,234' },
        { type: 'decimal', value: '.' },
        { type: 'fraction', value: '56' },
      ]);
    });

    it('should format with pt-BR locale', () => {
      const parts = num(1234.56).locale('pt-BR').toParts();
      expect(parts).toEqual([
        { type: 'integer', value: '1.234' },
        { type: 'decimal', value: ',' },
        { type: 'fraction', value: '56' },
      ]);
    });

    it('should format currency to parts', () => {
      const parts = num(1234.56).currency('USD').toParts();
      expect(parts).toEqual([
        { type: 'currency', value: '$' },
        { type: 'integer', value: '1,234' },
        { type: 'decimal', value: '.' },
        { type: 'fraction', value: '56' },
      ]);
    });

    it('should format abbreviated numbers to parts', () => {
      const parts = num(1500).abbreviated().toParts();
      expect(parts).toEqual([
        { type: 'integer', value: '1' },
        { type: 'decimal', value: '.' },
        { type: 'fraction', value: '5' },
        { type: 'unit', value: 'k' },
      ]);
    });

    it('should format bytes to parts', () => {
      const parts = num(1536).bytes().toParts();
      expect(parts).toEqual([
        { type: 'integer', value: '1' },
        { type: 'decimal', value: '.' },
        { type: 'fraction', value: '50' },
        { type: 'unit', value: 'KiB' },
      ]);
    });

    it('should format percentage to parts', () => {
      const parts = num(0.5).percentage().toParts();
      expect(parts).toEqual([
        { type: 'integer', value: '50' },
        { type: 'decimal', value: '.' },
        { type: 'fraction', value: '00' },
        { type: 'percentSign', value: '%' },
      ]);
    });

    it('should format negative numbers to parts', () => {
      const parts = num(-1234.56).toParts();
      expect(parts).toEqual([
        { type: 'minusSign', value: '-' },
        { type: 'integer', value: '1,234' },
        { type: 'decimal', value: '.' },
        { type: 'fraction', value: '56' },
      ]);
    });

    it('should strip zeros in parts', () => {
      const parts = num(1234.5).stripZeros().toParts();
      expect(parts).toEqual([
        { type: 'integer', value: '1,234' },
        { type: 'decimal', value: '.' },
        { type: 'fraction', value: '5' },
      ]);
    });

    it('should format with custom decimals in parts', () => {
      const parts = num(1234.5).decimals(3).toParts();
      expect(parts).toEqual([
        { type: 'integer', value: '1,234' },
        { type: 'decimal', value: '.' },
        { type: 'fraction', value: '500' },
      ]);
    });

    it('should handle complex currency with abbreviated in parts', () => {
      const parts = num(1234567).locale('pt-BR').abbreviated().toParts();
      expect(parts.some((p) => p.type === 'unit')).toBe(true);
      expect(parts.some((p) => p.type === 'integer')).toBe(true);
    });
  });
});
