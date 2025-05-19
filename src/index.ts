import { type SupportedLocale } from './locales';
import { type RoundingMode, round } from './services/rounding.service';
import { applyMask, getMask } from './services/mask.service';
import { abbreviateNumber } from './services/abbreviation.service';
import { formatNumber } from './services/formatting.service';
import { formatCurrency } from './services/currency.service';

/**
 * Formatting options for the beautify function
 *
 * @interface NumBeautyOptions
 *
 * @property {SupportedLocale} [locale] - The locale to use for formatting (e.g., 'en-US', 'pt-BR', 'es-ES').
 * Default: 'en-US'
 *
 * @property {number} [decimals] - Number of decimal places to display.
 * Default: 2
 *
 * @property {boolean} [abbreviated] - If true, abbreviates large numbers (e.g., 1k, 1M).
 * Default: false
 *
 * @property {boolean} [stripZeros] - If true, removes trailing zeros from decimal part.
 * Default: false
 *
 * @property {RoundingMode} [roundingMode] - Rounding mode to use ('UP', 'DOWN', 'CEIL', 'FLOOR', 'HALF_UP', 'HALF_DOWN', 'HALF_EVEN').
 * Default: 'HALF_EVEN'
 *
 * @property {string} [mask] - Mask to apply (e.g., 'ssn', 'phone', 'credit-card').
 * Available masks depend on the selected locale.
 *
 * @example
 * ```typescript
 * // Basic formatting
 * beautify(1234.5678) // '1,234.57'
 *
 * // Different locale
 * beautify(1234.5678, { locale: 'pt-BR' }) // '1.234,57'
 *
 * // Abbreviated number
 * beautify(1234567, { abbreviated: true }) // '1.23M'
 *
 * // With mask
 * beautify(123456789, { mask: 'ssn' }) // '123-45-6789'
 * ```
 */
interface NumBeautyOptions {
  locale?: SupportedLocale;
  decimals?: number;
  abbreviated?: boolean;
  stripZeros?: boolean;
  roundingMode?: RoundingMode;
  mask?: string;
}

/**
 * Formats a number according to the specified locale's standards
 *
 * @param {number} number - The number to format
 * @param {NumBeautyOptions} [options={}] - Formatting options
 * @returns {string} The formatted number as a string
 *
 * @throws {Error} If the specified mask doesn't exist for the locale
 * @throws {Error} If the specified currency is not supported for the locale
 *
 * @example
 * ```typescript
 * // Basic formatting
 * beautify(1234.5678) // '1,234.57'
 *
 * // With custom options
 * beautify(1234.5678, {
 *   locale: 'pt-BR',
 *   decimals: 3,
 *   stripZeros: true
 * }) // '1.234,568'
 * ```
 */
export function beautify(number: number, options: NumBeautyOptions = {}): string {
  const {
    locale = 'en-US',
    decimals = 2,
    abbreviated = false,
    stripZeros = false,
    roundingMode = 'HALF_UP',
    mask,
  } = options;

  // If a mask is provided, apply it first
  if (mask) {
    let maskPattern: string;
    if (mask.includes('#')) {
      // It's a custom mask
      maskPattern = mask;
    } else {
      // It's a predefined mask
      maskPattern = getMask(locale, mask) || mask;
    }
    return applyMask(number, maskPattern);
  }

  // Apply rounding before formatting
  const roundedNum = round(number, decimals, roundingMode);
  const formattedNum = formatNumber(roundedNum, decimals, locale, stripZeros);

  // Apply abbreviation if needed
  if (abbreviated) {
    return abbreviateNumber(number, formattedNum, locale);
  }

  return formattedNum;
}

export { RoundingMode, round, applyMask, formatNumber, abbreviateNumber, formatCurrency };
