import { formatBytes } from '../src/services/bytes.service';

describe('formatBytes', () => {
  describe('Basic formatting with binary base (default)', () => {
    it('should format bytes correctly', () => {
      expect(formatBytes(0)).toBe('0 B');
      expect(formatBytes(1)).toBe('1.00 B');
      expect(formatBytes(512)).toBe('512.00 B');
      expect(formatBytes(1023)).toBe('1,023.00 B');
    });

    it('should format kibibytes correctly', () => {
      expect(formatBytes(1024)).toBe('1.00 KiB');
      expect(formatBytes(1536)).toBe('1.50 KiB');
      expect(formatBytes(2048)).toBe('2.00 KiB');
    });

    it('should format mebibytes correctly', () => {
      expect(formatBytes(1048576)).toBe('1.00 MiB'); // 1024^2
      expect(formatBytes(5242880)).toBe('5.00 MiB'); // 5 * 1024^2
    });

    it('should format gibibytes correctly', () => {
      expect(formatBytes(1073741824)).toBe('1.00 GiB'); // 1024^3
      expect(formatBytes(2147483648)).toBe('2.00 GiB'); // 2 * 1024^3
    });

    it('should format tebibytes correctly', () => {
      expect(formatBytes(1099511627776)).toBe('1.00 TiB'); // 1024^4
    });

    it('should format pebibytes correctly', () => {
      expect(formatBytes(1125899906842624)).toBe('1.00 PiB'); // 1024^5
    });
  });

  describe('Decimal base formatting', () => {
    it('should format bytes with decimal base', () => {
      expect(formatBytes(1000, { binary: false })).toBe('1.00 KB');
      expect(formatBytes(1500, { binary: false })).toBe('1.50 KB');
    });

    it('should format megabytes with decimal base', () => {
      expect(formatBytes(1000000, { binary: false })).toBe('1.00 MB');
      expect(formatBytes(5000000, { binary: false })).toBe('5.00 MB');
    });

    it('should format gigabytes with decimal base', () => {
      expect(formatBytes(1000000000, { binary: false })).toBe('1.00 GB');
    });
  });

  describe('Custom decimal precision', () => {
    it('should format with 0 decimals', () => {
      expect(formatBytes(1536, { decimals: 0 })).toBe('2 KiB');
      expect(formatBytes(1024, { decimals: 0 })).toBe('1 KiB');
    });

    it('should format with 1 decimal', () => {
      expect(formatBytes(1536, { decimals: 1 })).toBe('1.5 KiB');
    });

    it('should format with 3 decimals', () => {
      expect(formatBytes(1536, { decimals: 3 })).toBe('1.500 KiB');
    });
  });

  describe('Strip zeros option', () => {
    it('should strip trailing zeros', () => {
      expect(formatBytes(1024, { stripZeros: true })).toBe('1 KiB');
      expect(formatBytes(1536, { stripZeros: true })).toBe('1.5 KiB');
      expect(formatBytes(2048, { stripZeros: true })).toBe('2 KiB');
    });

    it('should keep zeros when stripZeros is false', () => {
      expect(formatBytes(1024, { stripZeros: false })).toBe('1.00 KiB');
      expect(formatBytes(2048, { stripZeros: false })).toBe('2.00 KiB');
    });
  });

  describe('Negative values', () => {
    it('should format negative bytes', () => {
      expect(formatBytes(-1024)).toBe('-1.00 KiB');
      expect(formatBytes(-1048576)).toBe('-1.00 MiB');
    });
  });

  describe('Locale formatting', () => {
    it('should format with pt-BR locale', () => {
      expect(formatBytes(1536, { locale: 'pt-BR' })).toBe('1,50 KiB');
      expect(formatBytes(1048576, { locale: 'pt-BR' })).toBe('1,00 MiB');
    });

    it('should format with es-ES locale', () => {
      expect(formatBytes(1536, { locale: 'es-ES' })).toBe('1,50 KiB');
    });
  });

  describe('Long format', () => {
    it('should format with long unit names (binary)', () => {
      expect(formatBytes(0, { longFormat: true })).toBe('0 Bytes');
      expect(formatBytes(1, { longFormat: true, decimals: 0 })).toBe('1 Bytes');
      expect(formatBytes(1024, { longFormat: true })).toBe('1.00 Kibibyte');
      expect(formatBytes(2048, { longFormat: true })).toBe('2.00 Kibibytes');
      expect(formatBytes(1048576, { longFormat: true })).toBe('1.00 Mebibyte');
      expect(formatBytes(1073741824, { longFormat: true })).toBe('1.00 Gibibyte');
    });

    it('should format with long unit names (decimal)', () => {
      expect(formatBytes(1000, { longFormat: true, binary: false })).toBe('1.00 Kilobyte');
      expect(formatBytes(2000, { longFormat: true, binary: false })).toBe('2.00 Kilobytes');
      expect(formatBytes(1000000, { longFormat: true, binary: false })).toBe('1.00 Megabyte');
    });
  });

  describe('Real world examples', () => {
    it('should format common file sizes', () => {
      // Small text file
      expect(formatBytes(2048, { stripZeros: true })).toBe('2 KiB');

      // Image file
      expect(formatBytes(524288, { decimals: 1 })).toBe('512.0 KiB');

      // Video file
      expect(formatBytes(157286400, { decimals: 1 })).toBe('150.0 MiB');

      // Large database
      expect(formatBytes(5368709120, { decimals: 1 })).toBe('5.0 GiB');
    });

    it('should format disk sizes', () => {
      // 256 GB SSD (decimal)
      expect(formatBytes(256000000000, { binary: false, decimals: 0 })).toBe('256 GB');

      // 1 TB HDD (decimal)
      expect(formatBytes(1000000000000, { binary: false, decimals: 0 })).toBe('1 TB');
    });
  });

  describe('Edge cases', () => {
    it('should handle very large numbers', () => {
      expect(formatBytes(1152921504606846976)).toBe('1.00 EiB'); // 1024^6
    });

    it('should handle decimal values', () => {
      expect(formatBytes(1536.5, { decimals: 1 })).toBe('1.5 KiB');
    });

    it('should handle numbers close to unit boundaries', () => {
      expect(formatBytes(1023.9, { decimals: 1 })).toBe('1,023.9 B');
      expect(formatBytes(1024.1, { decimals: 1 })).toBe('1.0 KiB');
    });
  });
});
