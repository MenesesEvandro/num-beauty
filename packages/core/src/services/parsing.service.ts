import { type SupportedLocale, locales } from '../locales/index.js';

export interface UnbeautifyOptions {
  /**
   * Locale for parsing number format
   * @default 'en-US'
   */
  locale?: SupportedLocale;
}

/**
 * Parses a formatted string back into a number
 *
 * Supports various formats:
 * - Basic numbers: '1234.56', '1.234,56'
 * - Abbreviated: '1.5k', '2.3M', '1.2B', '5.7T'
 * - Currency: 'R$ 1.234,56', '$1,234.56', '1.234,56 €'
 * - Percentage: '45.5%', '45,5 %'
 * - Negative: '-1.234,56', '(1,234.56)'
 * - Bytes: '1.5 KB', '2.3 MB', '1.2 GB'
 *
 * @param input - Formatted string to parse
 * @param options - Parsing options
 * @returns Parsed number
 *
 * @example
 * ```typescript
 * // Basic numbers
 * unbeautify('1,234.56') // 1234.56
 * unbeautify('1.234,56', { locale: 'pt-BR' }) // 1234.56
 *
 * // Abbreviated numbers
 * unbeautify('1.5k') // 1500
 * unbeautify('2.3M') // 2300000
 *
 * // Currency
 * unbeautify('R$ 1.234,56', { locale: 'pt-BR' }) // 1234.56
 * unbeautify('$1,234.56') // 1234.56
 *
 * // Percentage
 * unbeautify('45.5%') // 0.455
 * unbeautify('45,5%', { locale: 'pt-BR' }) // 0.455
 *
 * // Negative
 * unbeautify('-1,234.56') // -1234.56
 * unbeautify('(1,234.56)') // -1234.56
 * ```
 */
export function unbeautify(input: string, options: UnbeautifyOptions = {}): number {
  const locale: SupportedLocale = options.locale || 'en-US';
  const loc = locales[locale];

  // Clean input
  let str = String(input).trim();

  if (!str || str === '') {
    return 0;
  }

  // Detect and handle percentage FIRST (it can appear at the end)
  let isPercentage = false;
  if (str.includes('%')) {
    isPercentage = true;
    str = str.replace('%', '').trim();
  }

  // Detect negative (both '-' prefix and '()' accounting format)
  // Must be done AFTER removing %, so (45%) → (45) → detect parentheses
  let isNegative = false;
  if (str.startsWith('(') && str.endsWith(')')) {
    isNegative = true;
    str = str.slice(1, -1).trim();
  }

  // Check for minus sign (can be after removing parentheses, e.g., "(-45)" → "-45")
  if (str.startsWith('-')) {
    isNegative = true;
    str = str.slice(1).trim();
  }

  // Remove currency symbols and codes
  // Remove all known currency symbols
  const allCurrencies = { ...loc.currencies };
  for (const currencyCode in allCurrencies) {
    const currency = allCurrencies[currencyCode];
    if (currency && currency.symbol) {
      str = str.replace(currency.symbol, '').trim();
    }
    // Also remove currency codes (USD, EUR, BRL, etc.)
    str = str.replace(new RegExp(`\\b${currencyCode}\\b`, 'gi'), '').trim();
  }

  // Detect and handle abbreviations (k, M, B, T, etc.)
  let multiplier = 1;
  const units = loc.units || [];

  // Check for byte units FIRST (KB, MB, GB, TB, etc.) - they are more specific
  const byteUnits: Record<string, number> = {
    tib: 1024 ** 4,
    gib: 1024 ** 3,
    mib: 1024 ** 2,
    kib: 1024,
    tb: 1024 ** 4,
    gb: 1024 ** 3,
    mb: 1024 ** 2,
    kb: 1024,
  };

  const lowerStr = str.toLowerCase();
  for (const [suffix, mult] of Object.entries(byteUnits)) {
    if (lowerStr.endsWith(suffix)) {
      multiplier = mult;
      str = str.slice(0, -suffix.length).trim();
      break;
    }
  }

  // Check for locale-specific units
  if (multiplier === 1) {
    for (let i = units.length - 1; i >= 0; i--) {
      const unitVariants = units[i];
      if (unitVariants) {
        for (const unit of unitVariants) {
          if (unit && str.toLowerCase().endsWith(unit.toLowerCase())) {
            multiplier = Math.pow(1000, i);
            str = str.slice(0, -unit.length).trim();
            break;
          }
        }
        if (multiplier !== 1) break;
      }
    }
  }

  // If no locale-specific unit found, check for generic abbreviations (single letter)
  if (multiplier === 1) {
    const genericUnits: Record<string, number> = {
      t: 1e12, // trillion
      b: 1e9, // billion
      m: 1e6, // million
      k: 1e3, // thousand
    };

    const lastChar = str.slice(-1).toLowerCase();
    // Only apply if it's a single letter abbreviation (not part of a longer word)
    // AND not preceded by a decimal separator (avoid "1.2M" in locales where . is decimal)
    const charBeforeLast = str.slice(-2, -1);
    if (
      genericUnits[lastChar] &&
      /[\d\s]/.test(charBeforeLast || ' ') &&
      charBeforeLast !== '.' &&
      charBeforeLast !== ','
    ) {
      multiplier = genericUnits[lastChar];
      str = str.slice(0, -1).trim();
    }
  }

  // Remove any remaining non-numeric characters except decimal/thousand separators
  // Get decimal separator for this locale
  const decimalSeparator = new Intl.NumberFormat(locale).format(1.1).charAt(1);
  const thousandSeparator = new Intl.NumberFormat(locale).format(1000).charAt(1);

  // Remove thousand separators
  if (thousandSeparator && thousandSeparator !== '.') {
    str = str.replace(new RegExp(`\\${thousandSeparator}`, 'g'), '');
  } else if (thousandSeparator === '.') {
    // Special case: if thousand separator is '.', we need to be careful
    // Only remove dots that are NOT the decimal separator
    // Strategy: replace decimal separator temporarily, remove dots, restore decimal
    if (decimalSeparator !== '.') {
      str = str.replace(decimalSeparator, 'DECIMAL_PLACEHOLDER');
      str = str.replace(/\./g, '');
      str = str.replace('DECIMAL_PLACEHOLDER', '.');
    }
  }

  // Replace locale decimal separator with '.'
  if (decimalSeparator !== '.') {
    str = str.replace(decimalSeparator, '.');
  }

  // Remove any remaining non-numeric characters except '.', '-', and digits
  str = str.replace(/[^\d.-]/g, '');

  // Parse to number
  let result = parseFloat(str);

  // Handle invalid parsing
  if (isNaN(result)) {
    return 0;
  }

  // Apply multiplier
  result *= multiplier;

  // Apply percentage conversion (divide by 100)
  if (isPercentage) {
    result /= 100;
  }

  // Apply negative
  if (isNegative) {
    result = -result;
  }

  return result;
}
