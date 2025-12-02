import { getChartJsCallback, getRechartsFormatter } from '../src/index';

describe('Chart Adapters', () => {
  describe('Chart.js', () => {
    test('formats numbers correctly', () => {
      const callback = getChartJsCallback({ locale: 'en-US', currency: 'USD' });
      // Chart.js passes value, index, values
      const result = callback(1000, 0, []);
      expect(result).toBe('$1,000.00');
    });

    test('handles string inputs (if parsable)', () => {
      const callback = getChartJsCallback({ locale: 'en-US' });
      const result = callback('1000', 0, []);
      expect(result).toBe('1,000.00');
    });

    test('returns original string if not a number', () => {
      const callback = getChartJsCallback();
      const result = callback('foo', 0, []);
      expect(result).toBe('foo');
    });
  });

  describe('Recharts', () => {
    test('formats numbers correctly', () => {
      const formatter = getRechartsFormatter({ locale: 'en-US', abbreviated: true });
      const result = formatter(1500);
      expect(result).toBe('1.5k');
    });
  });
});
