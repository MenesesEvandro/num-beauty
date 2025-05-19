import { type SupportedLocale, locales } from '../locales';

interface CurrencyOptions {
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
  value: number,
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

  // Format the number using Intl.NumberFormat with explicit options
  const numberFormatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: stripZeros ? 0 : decimals,
    maximumFractionDigits: decimals,
    useGrouping: true,
  });

  const absValue = Math.abs(value);
  const number = numberFormatter.format(absValue);
  const isNegative = value < 0;
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
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    });
    result = formatter.format(absValue);
  }

  // Add negative sign at the beginning
  return isNegative ? '-' + result : result;
}
