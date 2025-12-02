import { beautify, type NumBeautyOptions } from 'num-beauty';

/**
 * Formats a number using num-beauty.
 *
 * @param {number} value The number to format.
 * @param {string} [locale] The locale (e.g., "en-US", "pt-BR").
 * @param {string} [currency] The currency code (e.g., "USD", "BRL").
 * @param {number} [decimals] The number of decimal places.
 * @param {boolean} [abbreviated] Whether to abbreviate the number (e.g., 1M).
 * @return {string} The formatted number.
 * @customfunction
 */
function BEAUTIFY(value: any, locale?: string, currency?: string, decimals?: number, abbreviated?: boolean): string {
    if (value === null || value === undefined || value === '') {
        return '';
    }

    const num = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(num)) {
        return value; // Return original if not a number
    }

    const options: NumBeautyOptions = {};

    if (locale) options.locale = locale as any;
    if (currency) options.currency = currency;
    if (decimals !== undefined && decimals !== null) options.decimals = decimals;
    if (abbreviated) options.abbreviated = true;

    try {
        return beautify(num, options);
    } catch (e: any) {
        return `Error: ${e.message}`;
    }
}

// Expose to global scope for Apps Script
(globalThis as any).BEAUTIFY = BEAUTIFY;
