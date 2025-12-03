import { type SupportedLocale } from '../locales/index.js';

export interface BytesOptions {
  /**
   * Use binary base (1024) instead of decimal base (1000)
   * @default true
   */
  binary?: boolean;

  /**
   * Number of decimal places
   * @default 2
   */
  decimals?: number;

  /**
   * Strip trailing zeros from decimal part
   * @default false
   */
  stripZeros?: boolean;

  /**
   * Locale for number formatting
   * @default 'en-US'
   */
  locale?: SupportedLocale;

  /**
   * Use long format (e.g., "Megabytes" instead of "MB")
   * @default false
   */
  longFormat?: boolean;
}

const UNITS_SHORT_BINARY = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB'];
const UNITS_SHORT_DECIMAL = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
const UNITS_LONG_BINARY = [
  'Bytes',
  'Kibibytes',
  'Mebibytes',
  'Gibibytes',
  'Tebibytes',
  'Pebibytes',
  'Exbibytes',
];
const UNITS_LONG_DECIMAL = [
  'Bytes',
  'Kilobytes',
  'Megabytes',
  'Gigabytes',
  'Terabytes',
  'Petabytes',
  'Exabytes',
];

/**
 * Formats a number as a data size (bytes)
 *
 * @param bytes - Size in bytes to be formatted
 * @param options - Formatting options
 *
 * @returns Formatted string with appropriate unit
 *
 * @example
 * formatBytes(1024) // "1 KiB"
 * formatBytes(1024, { binary: false }) // "1.02 KB"
 * formatBytes(1536, { decimals: 1 }) // "1.5 KiB"
 * formatBytes(1048576) // "1 MiB"
 * formatBytes(1048576, { longFormat: true }) // "1 Mebibyte"
 * formatBytes(0) // "0 B"
 */
export function formatBytes(bytes: number, options: BytesOptions = {}): string {
  const {
    binary = true,
    decimals = 2,
    stripZeros = false,
    locale = 'en-US',
    longFormat = false,
  } = options;

  // Handle zero and negative values
  if (bytes === 0) {
    return longFormat ? '0 Bytes' : '0 B';
  }

  const isNegative = bytes < 0;
  const absBytes = Math.abs(bytes);

  // Select base and units
  const base = binary ? 1024 : 1000;
  const units = longFormat
    ? binary
      ? UNITS_LONG_BINARY
      : UNITS_LONG_DECIMAL
    : binary
    ? UNITS_SHORT_BINARY
    : UNITS_SHORT_DECIMAL;

  // Calculate the appropriate unit
  const exponent = Math.floor(Math.log(absBytes) / Math.log(base));
  const unitIndex = Math.min(exponent, units.length - 1);
  const value = absBytes / Math.pow(base, unitIndex);

  // Format the number using Intl.NumberFormat
  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: stripZeros ? 0 : decimals,
    maximumFractionDigits: decimals,
  });

  const formattedValue = formatter.format(value);
  const unit = units[unitIndex];

  // Handle pluralization for long format
  let finalUnit = unit;
  if (longFormat && value !== 1 && unitIndex === 0) {
    // "Bytes" is already plural
    finalUnit = unit;
  } else if (longFormat && value === 1 && unitIndex > 0) {
    // Singular form: remove the 's' at the end
    finalUnit = unit.slice(0, -1);
  }

  const result = `${formattedValue} ${finalUnit}`;
  return isNegative ? `-${result}` : result;
}
