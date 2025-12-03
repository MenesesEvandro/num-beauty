import { formatDuration } from '../src/index';

describe('formatDuration', () => {
  test('formats milliseconds', () => {
    expect(formatDuration(500)).toBe('500ms');
  });

  test('formats seconds', () => {
    expect(formatDuration(1000)).toBe('1s');
    expect(formatDuration(1500)).toBe('1s');
  });

  test('formats minutes', () => {
    expect(formatDuration(60000)).toBe('1m');
    expect(formatDuration(61000)).toBe('1m 1s');
  });

  test('formats hours', () => {
    expect(formatDuration(3600000)).toBe('1h');
    expect(formatDuration(3661000)).toBe('1h 1m 1s');
  });

  test('formats days', () => {
    expect(formatDuration(86400000)).toBe('1d');
    expect(formatDuration(90061000)).toBe('1d 1h 1m 1s');
  });

  test('respects long format', () => {
    expect(formatDuration(3661000, { format: 'long' })).toBe('1 hour 1 minute 1 second');
  });

  test('handles plurals in long format', () => {
    expect(formatDuration(7322000, { format: 'long' })).toBe('2 hours 2 minutes 2 seconds');
  });
});
