import { beautify, type NumBeautyOptions } from '../index.js';

/**
 * Creates a callback function for Chart.js `ticks.callback`.
 *
 * @param options - Formatting options
 * @returns A function that formats the tick value
 *
 * @example
 * ```javascript
 * const chartOptions = {
 *   scales: {
 *     y: {
 *       ticks: {
 *         callback: getChartJsCallback({ currency: 'USD', abbreviated: true })
 *       }
 *     }
 *   }
 * }
 * ```
 */
export function getChartJsCallback(
  options: NumBeautyOptions = {}
): (value: number | string, index: number, values: unknown[]) => string | null {
  return (value: number | string) => {
    // Chart.js might pass the value as a number or string.
    // If it's a string, we try to parse it, or if it's already formatted, we might return it.
    // Usually ticks are numbers.
    const num = typeof value === 'string' ? parseFloat(value) : value;

    if (typeof num !== 'number' || isNaN(num)) {
      return String(value);
    }

    return beautify(num, options);
  };
}

/**
 * Creates a formatter function for Recharts `tickFormatter`.
 *
 * @param options - Formatting options
 * @returns A function that formats the tick value
 *
 * @example
 * ```jsx
 * <YAxis tickFormatter={getRechartsFormatter({ abbreviated: true })} />
 * ```
 */
export function getRechartsFormatter(options: NumBeautyOptions = {}): (value: number) => string {
  return (value: number) => {
    return beautify(value, options);
  };
}
