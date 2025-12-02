import { beautify, type NumBeautyOptions } from '../index.js';

/**
 * Formats a list of numbers such that their decimal points are vertically aligned.
 * Useful for CLI output and monospaced reports.
 *
 * @param values - Array of numbers to format
 * @param options - Formatting options
 * @returns Array of formatted strings with padding
 *
 * @example
 * formatTabular([10, 1000.5, 2.34], { locale: 'en-US' })
 * // Returns:
 * // [
 * //   "   10.00",
 * //   "1,000.50",
 * //   "    2.34"
 * // ]
 */
export function formatTabular(values: number[], options: NumBeautyOptions = {}): string[] {
  if (values.length === 0) {
    return [];
  }

  const { locale = 'en-US' } = options;

  // Determine decimal separator for the locale
  // We can infer it by formatting 1.1
  const decimalSeparator = new Intl.NumberFormat(locale).format(1.1).charAt(1);

  // Format all numbers first
  const formattedValues = values.map((v) => beautify(v, options));

  // Split into integer and decimal parts
  const parts = formattedValues.map((v) => {
    const separatorIndex = v.indexOf(decimalSeparator);
    if (separatorIndex === -1) {
      // No decimal separator found
      return { integer: v, decimal: '', hasSeparator: false };
    }
    return {
      integer: v.slice(0, separatorIndex),
      decimal: v.slice(separatorIndex + 1),
      hasSeparator: true,
    };
  });

  // Calculate max widths
  const maxIntegerWidth = Math.max(...parts.map((p) => p.integer.length));
  // const maxDecimalWidth = Math.max(...parts.map(p => p.decimal.length)); // Not strictly needed for alignment, but good for right padding if desired.
  // Usually tabular alignment aligns the decimal point. Trailing decimals might vary if decimals option is not fixed.
  // If decimals option IS fixed (default 2), then decimal width is constant.
  // Let's assume we align the decimal point.

  // Reconstruct with padding
  return parts.map((p) => {
    const integerPadded = p.integer.padStart(maxIntegerWidth, ' ');
    if (p.hasSeparator) {
      return `${integerPadded}${decimalSeparator}${p.decimal}`;
    } else {
      // If no separator, it's an integer.
      // If others have separator, we might want to pad with spaces where the decimal part would be?
      // Or just align the integer part to the right?
      // Standard tabular alignment usually aligns the implied decimal point.
      // So "10" should align with "10."
      // If we have mixed integers and floats, and floats have decimals, integers should probably sit to the left of the decimal column.
      // But if we don't add the separator, it looks like this:
      //    10
      // 1,000.50
      // Which is correct alignment for the integer part.
      return integerPadded;
    }
  });
}
