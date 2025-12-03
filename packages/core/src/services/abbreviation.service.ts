import { type SupportedLocale, locales } from '../locales/index.js';
import { formatNumber } from './formatting.service.js';

export function abbreviateNumber(
  number: number | bigint,
  formattedNum: string,
  locale: SupportedLocale
): string {
  // Handle zero case
  if (number === 0 || number === 0n) {
    return formattedNum;
  }

  // Convert BigInt to Number for approximation of magnitude
  // Precision loss is acceptable here as we only need the first few digits and the magnitude
  const numVal = typeof number === 'bigint' ? Number(number) : number;
  const absNum = Math.abs(numVal);

  const units = locales[locale].units;
  const order = Math.floor(Math.log10(absNum) / 3);

  if (order < units.length) {
    const unit = units[order][absNum === 1 ? 0 : 1];
    if (order === 0) {
      return formattedNum;
    }

    // Divide the number by the corresponding power of 1000
    const abbreviated = numVal / Math.pow(10, order * 3);

    // Format the abbreviated number with 2 decimal places
    const simplified = formatNumber(abbreviated, 2, locale, true);

    // For en-US locale, don't add space between number and unit
    if (locale === 'en-US') {
      return unit ? `${simplified}${unit}` : simplified;
    }

    return unit ? `${simplified} ${unit}` : simplified;
  }

  return formattedNum;
}
