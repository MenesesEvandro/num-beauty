import { formatPercentage } from '../src/services/percentage.service';

describe('formatPercentage', () => {
  describe('Basic formatting with multiplication (default)', () => {
    it('should format decimal values as percentages', () => {
      expect(formatPercentage(0.5)).toBe('50.00%');
      expect(formatPercentage(0.25)).toBe('25.00%');
      expect(formatPercentage(0.75)).toBe('75.00%');
      expect(formatPercentage(1)).toBe('100.00%');
    });

    it('should format small decimal values', () => {
      expect(formatPercentage(0.01)).toBe('1.00%');
      expect(formatPercentage(0.001)).toBe('0.10%');
      expect(formatPercentage(0.0001)).toBe('0.01%');
    });

    it('should format values greater than 1', () => {
      expect(formatPercentage(1.5)).toBe('150.00%');
      expect(formatPercentage(2)).toBe('200.00%');
      expect(formatPercentage(10)).toBe('1,000.00%');
    });

    it('should format zero correctly', () => {
      expect(formatPercentage(0)).toBe('0.00%');
    });
  });

  describe('Without multiplication', () => {
    it('should format values without multiplying by 100', () => {
      expect(formatPercentage(50, { multiply: false })).toBe('50.00%');
      expect(formatPercentage(25, { multiply: false })).toBe('25.00%');
      expect(formatPercentage(100, { multiply: false })).toBe('100.00%');
    });

    it('should format decimal values without multiplication', () => {
      expect(formatPercentage(12.5, { multiply: false })).toBe('12.50%');
      expect(formatPercentage(99.99, { multiply: false })).toBe('99.99%');
    });
  });

  describe('Custom decimal precision', () => {
    it('should format with 0 decimals', () => {
      expect(formatPercentage(0.5, { decimals: 0 })).toBe('50%');
      expect(formatPercentage(0.12345, { decimals: 0 })).toBe('12%');
      expect(formatPercentage(0.99, { decimals: 0 })).toBe('99%');
    });

    it('should format with 1 decimal', () => {
      expect(formatPercentage(0.5, { decimals: 1 })).toBe('50.0%');
      expect(formatPercentage(0.12345, { decimals: 1 })).toBe('12.3%');
    });

    it('should format with 3 decimals', () => {
      expect(formatPercentage(0.12345, { decimals: 3 })).toBe('12.345%');
      expect(formatPercentage(0.123456, { decimals: 3 })).toBe('12.346%');
    });

    it('should format with 4 decimals', () => {
      expect(formatPercentage(0.123456, { decimals: 4 })).toBe('12.3456%');
    });
  });

  describe('Strip zeros option', () => {
    it('should strip trailing zeros', () => {
      expect(formatPercentage(0.5, { stripZeros: true })).toBe('50%');
      expect(formatPercentage(0.25, { stripZeros: true })).toBe('25%');
      expect(formatPercentage(0.125, { stripZeros: true })).toBe('12.5%');
      expect(formatPercentage(0.1234, { stripZeros: true })).toBe('12.34%');
    });

    it('should keep zeros when stripZeros is false', () => {
      expect(formatPercentage(0.5, { stripZeros: false })).toBe('50.00%');
      expect(formatPercentage(0.25, { stripZeros: false })).toBe('25.00%');
    });
  });

  describe('Negative values', () => {
    it('should format negative percentages', () => {
      expect(formatPercentage(-0.5)).toBe('-50.00%');
      expect(formatPercentage(-0.25)).toBe('-25.00%');
      expect(formatPercentage(-1)).toBe('-100.00%');
    });

    it('should format negative values without multiplication', () => {
      expect(formatPercentage(-50, { multiply: false })).toBe('-50.00%');
      expect(formatPercentage(-12.5, { multiply: false })).toBe('-12.50%');
    });
  });

  describe('Locale formatting', () => {
    it('should format with en-US locale (default)', () => {
      expect(formatPercentage(0.5, { locale: 'en-US' })).toBe('50.00%');
      expect(formatPercentage(0.12345, { locale: 'en-US', decimals: 3 })).toBe('12.345%');
    });

    it('should format with pt-BR locale', () => {
      expect(formatPercentage(0.5, { locale: 'pt-BR' })).toBe('50,00 %');
      expect(formatPercentage(0.12345, { locale: 'pt-BR', decimals: 3 })).toBe('12,345 %');
    });

    it('should format with es-ES locale', () => {
      expect(formatPercentage(0.5, { locale: 'es-ES' })).toBe('50,00 %');
      expect(formatPercentage(0.12345, { locale: 'es-ES', decimals: 3 })).toBe('12,345 %');
    });
  });

  describe('Space customization', () => {
    it('should add space when explicitly requested', () => {
      expect(formatPercentage(0.5, { locale: 'en-US', addSpace: true })).toBe('50.00 %');
      expect(formatPercentage(0.25, { addSpace: true })).toBe('25.00 %');
    });

    it('should not add space when explicitly disabled', () => {
      expect(formatPercentage(0.5, { locale: 'pt-BR', addSpace: false })).toBe('50,00%');
      expect(formatPercentage(0.5, { locale: 'es-ES', addSpace: false })).toBe('50,00%');
    });

    it('should use default spacing based on locale', () => {
      // en-US: no space by default
      expect(formatPercentage(0.5, { locale: 'en-US' })).toBe('50.00%');

      // pt-BR: space by default
      expect(formatPercentage(0.5, { locale: 'pt-BR' })).toBe('50,00 %');

      // es-ES: space by default
      expect(formatPercentage(0.5, { locale: 'es-ES' })).toBe('50,00 %');
    });
  });

  describe('Real world examples', () => {
    it('should format common percentages', () => {
      // Interest rates
      expect(formatPercentage(0.0525, { decimals: 2 })).toBe('5.25%');

      // Tax rates
      expect(formatPercentage(0.15, { decimals: 0 })).toBe('15%');

      // Discount
      expect(formatPercentage(0.3, { stripZeros: true })).toBe('30%');

      // Growth rate
      expect(formatPercentage(0.1234, { decimals: 1 })).toBe('12.3%');
    });

    it('should format statistical percentages', () => {
      // Probability
      expect(formatPercentage(0.6789, { decimals: 1 })).toBe('67.9%');

      // Completion rate
      expect(formatPercentage(0.856, { decimals: 1 })).toBe('85.6%');

      // Error rate
      expect(formatPercentage(0.0023, { decimals: 2 })).toBe('0.23%');
    });

    it('should format business metrics', () => {
      // Revenue growth
      expect(formatPercentage(0.248, { decimals: 1, locale: 'en-US' })).toBe('24.8%');

      // Market share
      expect(formatPercentage(0.3456, { decimals: 2 })).toBe('34.56%');

      // Profit margin
      expect(formatPercentage(0.1234, { decimals: 2, locale: 'pt-BR' })).toBe('12,34 %');
    });
  });

  describe('Edge cases', () => {
    it('should handle very small values', () => {
      expect(formatPercentage(0.00001, { decimals: 3 })).toBe('0.001%');
      expect(formatPercentage(0.000001, { decimals: 4 })).toBe('0.0001%');
    });

    it('should handle very large values', () => {
      expect(formatPercentage(100, { multiply: true })).toBe('10,000.00%');
      expect(formatPercentage(1000, { multiply: false, decimals: 0 })).toBe('1,000%');
    });

    it('should handle values close to rounding boundaries', () => {
      expect(formatPercentage(0.12345, { decimals: 2 })).toBe('12.35%');
      expect(formatPercentage(0.12344, { decimals: 2 })).toBe('12.34%');
    });
  });

  describe('Combined options', () => {
    it('should combine multiple options correctly', () => {
      expect(
        formatPercentage(0.5, {
          locale: 'pt-BR',
          decimals: 1,
          stripZeros: true,
        })
      ).toBe('50 %');

      expect(
        formatPercentage(50, {
          multiply: false,
          locale: 'en-US',
          decimals: 0,
        })
      ).toBe('50%');

      expect(
        formatPercentage(0.12345, {
          decimals: 3,
          locale: 'es-ES',
          addSpace: false,
        })
      ).toBe('12,345%');
    });
  });
});
