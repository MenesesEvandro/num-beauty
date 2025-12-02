import { beautify } from '../src';
import { formatCurrency } from '../src/services/currency.service';
import { formatPercentage } from '../src/services/percentage.service';
import { formatBytes } from '../src/services/bytes.service';

describe('German (de-DE) Locale', () => {
  describe('Number Formatting', () => {
    it('should format numbers with German conventions (dot as thousands, comma as decimal)', () => {
      expect(beautify(1234.56, { locale: 'de-DE' })).toBe('1.234,56');
      expect(beautify(1000000, { locale: 'de-DE', decimals: 0 })).toBe('1.000.000');
      expect(beautify(0.1234, { locale: 'de-DE', decimals: 4 })).toBe('0,1234');
    });

    it('should format negative numbers', () => {
      expect(beautify(-1234.56, { locale: 'de-DE' })).toBe('-1.234,56');
    });
  });

  describe('Currency Formatting', () => {
    it('should format EUR with symbol after and space', () => {
      expect(formatCurrency(1234.56, 'de-DE', { currency: 'EUR' })).toBe('1.234,56 €');
    });

    it('should format USD with symbol before', () => {
      expect(formatCurrency(1234.56, 'de-DE', { currency: 'USD' })).toBe('$1.234,56');
    });

    it('should format CHF (Swiss Franc)', () => {
      expect(formatCurrency(1234.56, 'de-DE', { currency: 'CHF' })).toBe('1.234,56 CHF');
    });
  });

  describe('Percentage Formatting', () => {
    it('should format percentages with space (German convention)', () => {
      expect(formatPercentage(0.5, { locale: 'de-DE', stripZeros: true })).toBe('50 %');
      expect(formatPercentage(0.751, { locale: 'de-DE', decimals: 1 })).toBe('75,1 %');
    });
  });

  describe('Bytes Formatting', () => {
    it('should format bytes with German number conventions', () => {
      expect(formatBytes(1024, { locale: 'de-DE', decimals: 0 })).toBe('1 KiB');
      expect(formatBytes(1536, { locale: 'de-DE', decimals: 1 })).toBe('1,5 KiB');
      expect(formatBytes(1048576, { locale: 'de-DE', decimals: 0 })).toBe('1 MiB');
    });
  });

  describe('Number Abbreviation', () => {
    it('should abbreviate with German units', () => {
      expect(beautify(1000, { locale: 'de-DE', abbreviated: true })).toBe('1 Tsd.');
      expect(beautify(1000000, { locale: 'de-DE', abbreviated: true })).toBe('1 Mio.');
      expect(beautify(1000000000, { locale: 'de-DE', abbreviated: true })).toBe('1 Mrd.');
      expect(beautify(1500000, { locale: 'de-DE', abbreviated: true, decimals: 1 })).toBe(
        '1,5 Mio.'
      );
    });
  });

  describe('Masks', () => {
    it('should apply German tax ID mask', () => {
      expect(beautify(12345678901, { locale: 'de-DE', mask: 'tax-id' })).toBe('12 345 678 901');
    });

    it('should apply German postal code mask', () => {
      expect(beautify(12345, { locale: 'de-DE', mask: 'plz' })).toBe('12345');
    });

    it('should apply German phone mask', () => {
      expect(beautify(30123456789, { locale: 'de-DE', mask: 'phone' })).toBe('3012 3456789');
    });
  });
});

describe('French (fr-FR) Locale', () => {
  describe('Number Formatting', () => {
    it('should format numbers with French conventions (space as thousands, comma as decimal)', () => {
      const result1 = beautify(1234.56, { locale: 'fr-FR' });
      expect(result1.replace(/\s/g, ' ')).toBe('1 234,56');

      const result2 = beautify(1000000, { locale: 'fr-FR', decimals: 0 });
      expect(result2.replace(/\s/g, ' ')).toBe('1 000 000');

      expect(beautify(0.1234, { locale: 'fr-FR', decimals: 4 })).toBe('0,1234');
    });

    it('should format negative numbers', () => {
      const result = beautify(-1234.56, { locale: 'fr-FR' });
      expect(result.replace(/\s/g, ' ')).toBe('-1 234,56');
    });
  });

  describe('Currency Formatting', () => {
    it('should format EUR with symbol after and space', () => {
      const result = formatCurrency(1234.56, 'fr-FR', { currency: 'EUR' });
      expect(result.replace(/\s/g, ' ')).toBe('1 234,56 €');
    });

    it('should format USD with symbol before', () => {
      const result = formatCurrency(1234.56, 'fr-FR', { currency: 'USD' });
      expect(result.replace(/\s/g, ' ')).toBe('$1 234,56');
    });

    it('should format GBP with symbol before', () => {
      const result = formatCurrency(1234.56, 'fr-FR', { currency: 'GBP' });
      expect(result.replace(/\s/g, ' ')).toBe('£ 1 234,56');
    });

    it('should format CHF (Swiss Franc)', () => {
      const result = formatCurrency(1234.56, 'fr-FR', { currency: 'CHF' });
      expect(result.replace(/\s/g, ' ')).toBe('1 234,56 CHF');
    });
  });

  describe('Percentage Formatting', () => {
    it('should format percentages with space (French convention)', () => {
      expect(formatPercentage(0.5, { locale: 'fr-FR', stripZeros: true })).toBe('50 %');
      expect(formatPercentage(0.751, { locale: 'fr-FR', decimals: 1 })).toBe('75,1 %');
    });
  });

  describe('Bytes Formatting', () => {
    it('should format bytes with French number conventions', () => {
      expect(formatBytes(1024, { locale: 'fr-FR', decimals: 0 })).toBe('1 KiB');
      expect(formatBytes(1536, { locale: 'fr-FR', decimals: 1 })).toBe('1,5 KiB');
      expect(formatBytes(1048576, { locale: 'fr-FR', decimals: 0 })).toBe('1 MiB');
    });
  });

  describe('Number Abbreviation', () => {
    it('should abbreviate with French units', () => {
      expect(beautify(1000, { locale: 'fr-FR', abbreviated: true })).toBe('1 k');
      expect(beautify(1000000, { locale: 'fr-FR', abbreviated: true })).toBe('1 M');
      expect(beautify(1000000000, { locale: 'fr-FR', abbreviated: true })).toBe('1 Mrd');
      expect(beautify(1500000, { locale: 'fr-FR', abbreviated: true, decimals: 1 })).toBe('1,5 M');
    });
  });

  describe('Masks', () => {
    it('should apply French tax ID mask', () => {
      expect(beautify(123456789, { locale: 'fr-FR', mask: 'tax-id' })).toBe('123 456 789');
    });

    it('should apply French postal code mask', () => {
      expect(beautify(75001, { locale: 'fr-FR', mask: 'code-postal' })).toBe('75001');
    });

    it('should apply French phone mask', () => {
      expect(beautify(123456789, { locale: 'fr-FR', mask: 'phone' })).toBe('12 34 56 78 9');
    });

    it('should apply SIREN mask', () => {
      expect(beautify(123456789, { locale: 'fr-FR', mask: 'siren' })).toBe('123 456 789');
    });

    it('should apply SIRET mask', () => {
      expect(beautify(12345678901234, { locale: 'fr-FR', mask: 'siret' })).toBe(
        '123 456 789 01234'
      );
    });
  });
});
