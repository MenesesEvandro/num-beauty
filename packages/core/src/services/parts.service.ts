import { type SupportedLocale, locales } from '../locales/index.js';
import { type RoundingMode, round } from './rounding.service.js';
import { formatNumber } from './formatting.service.js';
import { abbreviateNumber } from './abbreviation.service.js';
import { formatCurrency } from './currency.service.js';
import { formatBytes } from './bytes.service.js';
import { formatPercentage } from './percentage.service.js';

/**
 * Represents a part of a formatted number
 */
export interface NumberPart {
  type:
    | 'integer'
    | 'decimal'
    | 'fraction'
    | 'group'
    | 'currency'
    | 'percentSign'
    | 'unit'
    | 'minusSign'
    | 'plusSign'
    | 'literal';
  value: string;
}

export interface BeautifyToPartsOptions {
  locale?: SupportedLocale;
  decimals?: number;
  abbreviated?: boolean;
  stripZeros?: boolean;
  roundingMode?: RoundingMode;
  currency?: string;
  showSymbol?: boolean;
  showCode?: boolean;
  bytes?: boolean;
  bytesBinary?: boolean;
  bytesLongFormat?: boolean;
  percentage?: boolean;
  percentageMultiply?: boolean;
  percentageAddSpace?: boolean;
}

/**
 * Formats a number and returns its parts as an array of objects
 *
 * Similar to Intl.NumberFormat.formatToParts(), this function breaks down
 * a formatted number into its constituent parts for granular styling with CSS.
 *
 * @param number - The number to format
 * @param options - Formatting options
 * @returns Array of parts with type and value
 *
 * @example
 * ```typescript
 * // Basic number
 * beautifyToParts(1234.56)
 * // [
 * //   { type: 'integer', value: '1,234' },
 * //   { type: 'decimal', value: '.' },
 * //   { type: 'fraction', value: '56' }
 * // ]
 *
 * // Currency
 * beautifyToParts(1234.56, { locale: 'pt-BR', currency: 'BRL' })
 * // [
 * //   { type: 'currency', value: 'R$' },
 * //   { type: 'literal', value: ' ' },
 * //   { type: 'integer', value: '1.234' },
 * //   { type: 'decimal', value: ',' },
 * //   { type: 'fraction', value: '56' }
 * // ]
 *
 * // Abbreviated with unit
 * beautifyToParts(1234567, { locale: 'pt-BR', abbreviated: true })
 * // [
 * //   { type: 'integer', value: '1' },
 * //   { type: 'decimal', value: ',' },
 * //   { type: 'fraction', value: '23' },
 * //   { type: 'literal', value: ' ' },
 * //   { type: 'unit', value: 'mi' }
 * // ]
 *
 * // Percentage
 * beautifyToParts(0.5, { percentage: true })
 * // [
 * //   { type: 'integer', value: '50' },
 * //   { type: 'decimal', value: '.' },
 * //   { type: 'fraction', value: '00' },
 * //   { type: 'percentSign', value: '%' }
 * // ]
 * ```
 */
export function beautifyToParts(
  number: number,
  options: BeautifyToPartsOptions = {}
): NumberPart[] {
  const {
    locale = 'en-US',
    decimals = 2,
    abbreviated = false,
    stripZeros = false,
    roundingMode = 'HALF_UP',
    currency,
    showSymbol = true,
    showCode = false,
    bytes = false,
    bytesBinary = true,
    bytesLongFormat = false,
    percentage = false,
    percentageMultiply = true,
    percentageAddSpace,
  } = options;

  let formatted: string;

  // Handle different formatting types
  if (currency) {
    formatted = formatCurrency(number, locale, {
      currency,
      decimals,
      showSymbol,
      showCode,
      stripZeros,
    });
  } else if (bytes) {
    formatted = formatBytes(number, {
      binary: bytesBinary,
      decimals,
      stripZeros,
      locale,
      longFormat: bytesLongFormat,
    });
  } else if (percentage) {
    formatted = formatPercentage(number, {
      multiply: percentageMultiply,
      decimals,
      stripZeros,
      locale,
      addSpace: percentageAddSpace,
    });
  } else {
    const roundedNum = round(number, decimals, roundingMode);
    formatted = formatNumber(roundedNum, decimals, locale, stripZeros);

    if (abbreviated) {
      formatted = abbreviateNumber(number, formatted, locale);
    }
  }

  // Parse the formatted string into parts
  return parseFormattedString(formatted, locale, {
    hasCurrency: !!currency,
    hasPercentage: percentage,
    hasUnit: abbreviated || bytes,
  });
}

/**
 * Parse a formatted string into its constituent parts
 */
function parseFormattedString(
  formatted: string,
  locale: SupportedLocale,
  context: {
    hasCurrency: boolean;
    hasPercentage: boolean;
    hasUnit: boolean;
  }
): NumberPart[] {
  const parts: NumberPart[] = [];
  const loc = locales[locale];

  // Get locale-specific separators
  const decimalSeparator = new Intl.NumberFormat(locale).format(1.1).charAt(1);
  const thousandSeparator = new Intl.NumberFormat(locale).format(1000).charAt(1);

  let remaining = formatted.trim();

  // Handle negative sign at the beginning
  if (remaining.startsWith('-')) {
    parts.push({ type: 'minusSign', value: '-' });
    remaining = remaining.slice(1).trim();
  } else if (remaining.startsWith('+')) {
    parts.push({ type: 'plusSign', value: '+' });
    remaining = remaining.slice(1).trim();
  }

  // Extract currency symbol/code at the beginning
  if (context.hasCurrency) {
    const allCurrencies = { ...loc.currencies };
    for (const currencyCode in allCurrencies) {
      const curr = allCurrencies[currencyCode];
      if (curr && curr.symbol && remaining.startsWith(curr.symbol)) {
        parts.push({ type: 'currency', value: curr.symbol });
        remaining = remaining.slice(curr.symbol.length).trim();
        break;
      }
      // Check for currency code
      if (remaining.startsWith(currencyCode)) {
        parts.push({ type: 'currency', value: currencyCode });
        remaining = remaining.slice(currencyCode.length).trim();
        break;
      }
    }
  }

  // Extract the main number part (integer + decimal + fraction)
  let numberMatch = remaining.match(
    new RegExp(
      `^([\\d${
        thousandSeparator === '.' ? '\\.' : thousandSeparator
      }]+)(${decimalSeparator}([\\d]+))?`
    )
  );

  if (numberMatch) {
    const integerPart = numberMatch[1];
    const decimalPart = numberMatch[3];

    // Add integer part
    parts.push({ type: 'integer', value: integerPart });

    // Add decimal separator and fraction if present
    if (numberMatch[2]) {
      parts.push({ type: 'decimal', value: decimalSeparator });
      parts.push({ type: 'fraction', value: decimalPart });
    }

    remaining = remaining.slice(numberMatch[0].length).trim();
  }

  // Extract unit (for abbreviated numbers or bytes)
  if (context.hasUnit && remaining) {
    // Check for byte units first (more specific)
    const byteUnitsPattern =
      /^(B|KB|MB|GB|TB|PB|EB|KiB|MiB|GiB|TiB|PiB|EiB|Bytes?|Kilobytes?|Megabytes?|Gigabytes?|Terabytes?|Petabytes?|Exabytes?|Kibibytes?|Mebibytes?|Gibibytes?|Tebibytes?|Pebibytes?|Exbibytes?)/i;
    const byteMatch = remaining.match(byteUnitsPattern);

    if (byteMatch) {
      parts.push({ type: 'unit', value: byteMatch[1] });
      remaining = remaining.slice(byteMatch[0].length).trim();
    } else {
      // Check for locale-specific or generic abbreviation units
      const units = loc.units || [];
      let unitFound = false;

      for (let i = units.length - 1; i >= 0; i--) {
        const unitVariants = units[i];
        if (unitVariants) {
          for (const unit of unitVariants) {
            if (unit && remaining.toLowerCase().startsWith(unit.toLowerCase())) {
              parts.push({ type: 'unit', value: unit });
              remaining = remaining.slice(unit.length).trim();
              unitFound = true;
              break;
            }
          }
          if (unitFound) break;
        }
      }

      // Fallback to generic single-letter units (k, M, B, T)
      if (!unitFound && /^[kMBT]/.test(remaining)) {
        const unitChar = remaining.charAt(0);
        parts.push({ type: 'unit', value: unitChar });
        remaining = remaining.slice(1).trim();
      }
    }
  }

  // Extract percentage sign
  if (context.hasPercentage && remaining.includes('%')) {
    // Check for space before %
    if (remaining.startsWith(' ')) {
      parts.push({ type: 'literal', value: ' ' });
      remaining = remaining.slice(1);
    }
    parts.push({ type: 'percentSign', value: '%' });
    remaining = remaining.replace('%', '').trim();
  }

  // Extract currency at the end (for some locales like EUR)
  if (context.hasCurrency && remaining) {
    const allCurrencies = { ...loc.currencies };
    for (const currencyCode in allCurrencies) {
      const curr = allCurrencies[currencyCode];
      if (curr && curr.symbol && remaining.includes(curr.symbol)) {
        parts.push({ type: 'literal', value: ' ' });
        parts.push({ type: 'currency', value: curr.symbol });
        remaining = remaining.replace(curr.symbol, '').trim();
        break;
      }
    }
  }

  // Any remaining text as literals
  if (remaining) {
    parts.push({ type: 'literal', value: remaining });
  }

  return parts;
}
