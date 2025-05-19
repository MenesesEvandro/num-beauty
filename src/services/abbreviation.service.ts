import { type SupportedLocale, locales } from '../locales';
import { formatNumber } from './formatting.service';

export function abbreviateNumber(
  number: number,
  formattedNum: string,
  locale: SupportedLocale
): string {
  const units = locales[locale].units;
  const order = Math.floor(Math.log10(Math.abs(number)) / 3);

  if (order < units.length) {
    const unit = units[order][Math.abs(number) === 1 ? 0 : 1];
    if (order === 0) {
      return formattedNum;
    }

    // Divide the number by the corresponding power of 1000
    const abbreviated = number / Math.pow(10, order * 3);

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
