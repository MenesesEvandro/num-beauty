import { type SupportedLocale, locales } from '../locales/index.js';

export interface CurrencyOptions {
  /**
   * Currency code (e.g., USD, EUR)
   */
  currency: string;

  /**
   * Number of decimal places
   * @default 2
   */
  decimals?: number;

  /**
   * Show currency symbol
   * @default true
   */
  showSymbol?: boolean;

  /**
   * Show currency code instead of symbol
   * @default false
   */
  showCode?: boolean;

  /**
   * Strip trailing zeros from decimal part
   * @default false
   */
  stripZeros?: boolean;
}

/**
 * Formats a number as a currency value
 * @param value - Value to be formatted
 * @param locale - Locale to use
 * @param options - Formatting options
 *
 * @example
 * formatCurrency(1234.56, 'pt-BR', { currency: 'BRL' }) // 'R$ 1.234,56'
 * formatCurrency(1234.56, 'en-US', { currency: 'USD' }) // '$1,234.56'
 * formatCurrency(1234.56, 'es-ES', { currency: 'EUR' }) // '1.234,56 €'
 */
export function formatCurrency(
  value: number | bigint,
  locale: SupportedLocale,
  options: CurrencyOptions
): string {
  const {
    currency,
    decimals = 2,
    showSymbol = true,
    showCode = false,
    stripZeros = false,
  } = options;

  // Get currency info from locale
  const currencyInfo = locales[locale]?.currencies[currency];

  // Check if currency is supported
  if (!currencyInfo && showSymbol) {
    throw new Error(`Currency ${currency} not supported for locale ${locale}`);
  }

  const isBigInt = typeof value === 'bigint';
  const absValue = isBigInt ? (value < 0n ? -value : value) : Math.abs(value as number);
  const isNegative = value < 0 || (isBigInt && value < 0n);

  let number: string;

  if (isBigInt) {
    // For BigInt, we use Intl.NumberFormat directly
    // We ignore decimals for BigInt as it's an integer
    number = new Intl.NumberFormat(locale, {
      useGrouping: true,
      maximumFractionDigits: 0,
    }).format(absValue as bigint);
  } else {
    // Format the number using Intl.NumberFormat with explicit options
    const numberFormatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: stripZeros ? 0 : decimals,
      maximumFractionDigits: decimals,
      useGrouping: true,
    });
    number = numberFormatter.format(absValue as number);
  }

  let result: string;

  // If no symbol or code needed, return just the number
  if (!showSymbol && !showCode) {
    result = number;
  }
  // If code is needed, return in "USD 1,234.56" format
  else if (showCode) {
    result = `${currency} ${number}`;
  }
  // If we have currencyInfo, use the symbol and position defined in locale
  else if (currencyInfo) {
    // Ensure the number has proper thousands separators
    result =
      currencyInfo.position === 'before'
        ? currencyInfo.symbol + (currencyInfo.symbol === '$' ? '' : ' ') + number
        : number + ' ' + currencyInfo.symbol;
  }
  // Otherwise, use Intl default
  else {
    if (isBigInt) {
      // Intl.NumberFormat supports BigInt for currency style
      const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        maximumFractionDigits: 0, // Force integer for BigInt
      });
      // We need to format the absolute value and handle sign manually if we want consistent behavior with our custom logic
      // But here we are falling back to Intl completely.
      // Let's just use the number string we already formatted and wrap it if possible, or use Intl.
      // Using Intl directly for currency might be safer here.
      result = formatter.format(absValue as bigint);
      // Remove the negative sign if Intl added it (we handle it manually at the end)
      // Actually, if we use Intl for currency, it might put the sign in specific places (e.g. ($100)).
      // But our function contract seems to append '-' at the start.
      // Let's stick to our manual composition using `number` string for consistency with the other branches.
      // Wait, this branch is "Otherwise, use Intl default".
      // If we are here, it means we don't have `currencyInfo` but `showSymbol` is true (or we skipped the check?).
      // Actually the check `if (!currencyInfo && showSymbol)` throws error earlier.
      // So we only reach here if `showSymbol` is false? No, if `showSymbol` is false we return `number`.
      // So we only reach here if `currencyInfo` is missing AND `showSymbol` is false?
      // No, if `showSymbol` is false, we enter the first if block.
      // BUT we throw error in that case!
      // So this `else` block is actually unreachable unless `locales` is missing data but we didn't throw?
      // Ah, `locales[locale]?.currencies[currency]` might be undefined if the currency is not in our manual map.
      // But we throw error if it's not in our map.
      // So this block is indeed unreachable given the current logic.
      // However, to be safe and support standard currencies not in our map (if we removed the throw), we    if (isBigInt) {
      // Intl.NumberFormat supports BigInt for currency style
      const bigIntFormatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        maximumFractionDigits: 0, // Force integer for BigInt
      });
      // Intl handles negative values correctly for currency (e.g. -$1.00 or ($1.00))
      // But our function returns `isNegative ? '-' + result : result`.
      // This implies we want to control the sign.
      // If we use Intl here, we should return its result directly and NOT prepend '-' again.
      return bigIntFormatter.format(value as number | bigint);
    } else {
      const numberFormatterFallback = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
      });
      return numberFormatterFallback.format(value as number);
    }
  }

  // Add negative sign at the beginning
  return isNegative ? '-' + result : result;
}
