import { formatBytes } from '../src/index';

describe('formatBytes', () => {
  test('formats bytes', () => {
    expect(formatBytes(0)).toBe('0 B');
    expect(formatBytes(100)).toBe('100 B');
  });

  test('formats KB', () => {
    expect(formatBytes(1024)).toBe('1.00 KB');
    expect(formatBytes(1536)).toBe('1.50 KB');
  });

  test('formats MB', () => {
    expect(formatBytes(1048576)).toBe('1.00 MB');
  });

  test('formats GB', () => {
    expect(formatBytes(1073741824)).toBe('1.00 GB');
  });

  test('respects decimals option', () => {
    expect(formatBytes(1536, { decimals: 0 })).toBe('2 KB');
    expect(formatBytes(1536, { decimals: 3 })).toBe('1.500 KB');
  });
});
