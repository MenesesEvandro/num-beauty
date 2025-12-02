import { type SupportedLocale } from '../locales/index.js';

export interface PercentageOptions {
  /**
   * Multiply the value by 100 before formatting
   * @default true
   * @example
   * formatPercentage(0.5, { multiply: true }) // "50%"
   * formatPercentage(50, { multiply: false }) // "50%"
   */
  multiply?: boolean;

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
   * Add space between number and percentage symbol
   * @default false for en-US, true for pt-BR and es-ES
   */
  addSpace?: boolean;
}

/**
 * Formats a number as a percentage
 *
 * @param value - Value to be formatted
 * @param options - Formatting options
 *
 * @returns Formatted percentage string
 *
 * @example
 * formatPercentage(0.5) // "50.00%"
 * formatPercentage(0.5, { decimals: 0 }) // "50%"
 * formatPercentage(50, { multiply: false }) // "50.00%"
 * formatPercentage(0.12345, { decimals: 1 }) // "12.3%"
 * formatPercentage(0.5, { locale: 'pt-BR' }) // "50,00%"
 * formatPercentage(0.5, { locale: 'pt-BR', addSpace: true }) // "50,00 %"
 */
export function formatPercentage(value: number, options: PercentageOptions = {}): string {
  const { multiply = true, decimals = 2, stripZeros = false, locale = 'en-US', addSpace } = options;

  // Calculate the percentage value
  const percentValue = multiply ? value * 100 : value;

  // Format the number using Intl.NumberFormat
  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: stripZeros ? 0 : decimals,
    maximumFractionDigits: decimals,
    useGrouping: true,
  });

  const formattedNumber = formatter.format(percentValue);

  // Determine if space should be added
  // By default: no space for en-US, space for pt-BR, es-ES, de-DE, and fr-FR
  const shouldAddSpace =
    addSpace !== undefined
      ? addSpace
      : locale === 'pt-BR' || locale === 'es-ES' || locale === 'de-DE' || locale === 'fr-FR';

  const separator = shouldAddSpace ? ' ' : '';

  return `${formattedNumber}${separator}%`;
}
