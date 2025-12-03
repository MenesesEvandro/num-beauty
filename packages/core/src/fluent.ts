import { type SupportedLocale } from './locales/index.js';
import { type RoundingMode, round } from './services/rounding.service.js';
import { formatNumber } from './services/formatting.service.js';
import { formatCurrency } from './services/currency.service.js';
import { formatBytes } from './services/bytes.service.js';
import { formatPercentage } from './services/percentage.service.js';
import { applyMask, getMask } from './services/mask.service.js';
import { abbreviateNumber } from './services/abbreviation.service.js';
import { toAccessibleString } from './services/accessibility.service.js';
import { unbeautify } from './services/parsing.service.js';
import { beautifyToParts, type NumberPart } from './services/parts.service.js';

const pluginServices = {
  round,
  formatNumber,
  formatCurrency,
  formatBytes,
  formatPercentage,
  applyMask,
  getMask,
  abbreviateNumber,
  toAccessibleString,
  unbeautify,
  beautifyToParts,
} as const;

/**
 * Fluent API for number formatting with method chaining
 *
 * @example
 * ```typescript
 * import { Num } from 'num-beauty';
 *
 * // Basic formatting
 * Num(1234.56).locale('pt-BR').format() // "1.234,56"
 *
 * // Currency formatting
 * Num(1234.56).locale('en-US').currency('USD').format() // "$1,234.56"
 *
 * // Abbreviated numbers
 * Num(1234567).locale('pt-BR').abbreviated().format() // "1,23 mi"
 *
 * // Percentage formatting
 * Num(0.5).percentage().format() // "50.00%"
 *
 * // Bytes formatting
 * Num(1048576).bytes().format() // "1.00 MiB"
 *
 * // Accessibility (screen readers)
 * Num(1200000).locale('pt-BR').abbreviated().toAccessible() // "um ponto dois milhões"
 *
 * // Method chaining
 * Num(1234.5678)
 *   .locale('pt-BR')
 *   .decimals(3)
 *   .stripZeros()
 *   .format() // "1.234,568"
 * ```
 */
export class Num {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static appliedPlugins = new Set<NumPlugin<any>>();

  private value: number;
  private _locale: SupportedLocale = 'en-US';
  private _decimals = 2;
  private _abbreviated = false;
  private _stripZeros = false;
  private _roundingMode: RoundingMode = 'HALF_UP';
  private _mask?: string;
  private _currency?: string;
  private _showSymbol = true;
  private _showCode = false;
  private _bytes = false;
  private _bytesBinary = true;
  private _bytesLongFormat = false;
  private _percentage = false;
  private _percentageMultiply = true;
  private _percentageAddSpace?: boolean;

  static extend<TOptions = void>(plugin: NumPlugin<TOptions>, options?: TOptions): typeof Num {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (Num.appliedPlugins.has(plugin as any)) {
      return Num;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Num.appliedPlugins.add(plugin as any);

    const context: NumPluginContext = {
      Num,
      createInstance: num,
      services: pluginServices,
      getState(instance) {
        return Num.createStateSnapshot(instance);
      },
      patchState(instance, patch) {
        Num.applyStatePatch(instance, patch);
      },
    };

    plugin(context, options);

    return Num;
  }

  private static createStateSnapshot(instance: Num): NumState {
    return {
      value: instance.value,
      locale: instance._locale,
      decimals: instance._decimals,
      abbreviated: instance._abbreviated,
      stripZeros: instance._stripZeros,
      roundingMode: instance._roundingMode,
      mask: instance._mask,
      currency: instance._currency,
      showSymbol: instance._showSymbol,
      showCode: instance._showCode,
      bytes: instance._bytes,
      bytesBinary: instance._bytesBinary,
      bytesLongFormat: instance._bytesLongFormat,
      percentage: instance._percentage,
      percentageMultiply: instance._percentageMultiply,
      percentageAddSpace: instance._percentageAddSpace,
    };
  }

  private static applyStatePatch(instance: Num, patch: Partial<NumState>): void {
    if (patch.value !== undefined) {
      instance.value = patch.value;
    }
    if (patch.locale !== undefined) {
      instance._locale = patch.locale;
    }
    if (patch.decimals !== undefined) {
      instance._decimals = patch.decimals;
    }
    if (patch.abbreviated !== undefined) {
      instance._abbreviated = patch.abbreviated;
    }
    if (patch.stripZeros !== undefined) {
      instance._stripZeros = patch.stripZeros;
    }
    if (patch.roundingMode !== undefined) {
      instance._roundingMode = patch.roundingMode;
    }
    if (patch.mask !== undefined) {
      instance._mask = patch.mask;
    }
    if (patch.currency !== undefined) {
      instance._currency = patch.currency;
    }
    if (patch.showSymbol !== undefined) {
      instance._showSymbol = patch.showSymbol;
    }
    if (patch.showCode !== undefined) {
      instance._showCode = patch.showCode;
    }
    if (patch.bytes !== undefined) {
      instance._bytes = patch.bytes;
    }
    if (patch.bytesBinary !== undefined) {
      instance._bytesBinary = patch.bytesBinary;
    }
    if (patch.bytesLongFormat !== undefined) {
      instance._bytesLongFormat = patch.bytesLongFormat;
    }
    if (patch.percentage !== undefined) {
      instance._percentage = patch.percentage;
    }
    if (patch.percentageMultiply !== undefined) {
      instance._percentageMultiply = patch.percentageMultiply;
    }
    if (patch.percentageAddSpace !== undefined) {
      instance._percentageAddSpace = patch.percentageAddSpace;
    }
  }

  /**
   * Creates a new Num instance
   * @param value - The number to format
   */
  constructor(value: number) {
    this.value = value;
  }

  /**
   * Parse a formatted string back to a number (reverse of formatting)
   * @param input - Formatted string to parse
   * @param locale - Optional locale for parsing (defaults to 'en-US')
   * @returns The parsed number
   *
   * @example
   * ```typescript
   * Num.parse('$1,234.56') // 1234.56
   * Num.parse('R$ 1.234,56', 'pt-BR') // 1234.56
   * Num.parse('1.5k') // 1500
   * Num.parse('45.5%') // 0.455
   * ```
   */
  static parse(input: string, locale: SupportedLocale = 'en-US'): number {
    return unbeautify(input, { locale });
  }

  /**
   * Set the locale for formatting
   * @param locale - Locale code (e.g., 'en-US', 'pt-BR', 'es-ES')
   * @returns This instance for chaining
   */
  locale(locale: SupportedLocale): this {
    this._locale = locale;
    return this;
  }

  /**
   * Set the number of decimal places
   * @param decimals - Number of decimal places
   * @returns This instance for chaining
   */
  decimals(decimals: number): this {
    this._decimals = decimals;
    return this;
  }

  /**
   * Enable number abbreviation (e.g., 1k, 1M)
   * @returns This instance for chaining
   */
  abbreviated(): this {
    this._abbreviated = true;
    return this;
  }

  /**
   * Enable stripping of trailing zeros
   * @returns This instance for chaining
   */
  stripZeros(): this {
    this._stripZeros = true;
    return this;
  }

  /**
   * Set the rounding mode
   * @param mode - Rounding mode
   * @returns This instance for chaining
   */
  rounding(mode: RoundingMode): this {
    this._roundingMode = mode;
    return this;
  }

  /**
   * Apply a mask to the number
   * @param mask - Mask pattern or predefined mask name
   * @returns This instance for chaining
   */
  mask(mask: string): this {
    this._mask = mask;
    return this;
  }

  /**
   * Format as currency
   * @param code - Currency code (e.g., 'USD', 'EUR', 'BRL')
   * @returns This instance for chaining
   */
  currency(code: string): this {
    this._currency = code;
    return this;
  }

  /**
   * Hide currency symbol
   * @returns This instance for chaining
   */
  hideSymbol(): this {
    this._showSymbol = false;
    return this;
  }

  /**
   * Show currency code instead of symbol
   * @returns This instance for chaining
   */
  showCode(): this {
    this._showCode = true;
    return this;
  }

  /**
   * Format as bytes (e.g., KiB, MiB, GiB)
   * @param binary - Use binary base (1024) instead of decimal (1000)
   * @returns This instance for chaining
   */
  bytes(binary = true): this {
    this._bytes = true;
    this._bytesBinary = binary;
    return this;
  }

  /**
   * Use long format for bytes (e.g., "Megabytes" instead of "MB")
   * @returns This instance for chaining
   */
  bytesLongFormat(): this {
    this._bytesLongFormat = true;
    return this;
  }

  /**
   * Format as percentage
   * @param multiply - Automatically multiply by 100
   * @returns This instance for chaining
   */
  percentage(multiply = true): this {
    this._percentage = true;
    this._percentageMultiply = multiply;
    return this;
  }

  /**
   * Add space before percentage symbol
   * @param addSpace - Whether to add space
   * @returns This instance for chaining
   */
  percentageSpace(addSpace = true): this {
    this._percentageAddSpace = addSpace;
    return this;
  }

  /**
   * Format the number according to the configured options
   * @returns Formatted string
   */
  format(): string {
    // Currency formatting
    if (this._currency) {
      return formatCurrency(this.value, this._locale, {
        currency: this._currency,
        decimals: this._decimals,
        showSymbol: this._showSymbol,
        showCode: this._showCode,
        stripZeros: this._stripZeros,
      });
    }

    // Bytes formatting
    if (this._bytes) {
      return formatBytes(this.value, {
        binary: this._bytesBinary,
        decimals: this._decimals,
        stripZeros: this._stripZeros,
        locale: this._locale,
        longFormat: this._bytesLongFormat,
      });
    }

    // Percentage formatting
    if (this._percentage) {
      return formatPercentage(this.value, {
        multiply: this._percentageMultiply,
        decimals: this._decimals,
        stripZeros: this._stripZeros,
        locale: this._locale,
        addSpace: this._percentageAddSpace,
      });
    }

    // Mask formatting
    if (this._mask) {
      let maskPattern: string;
      if (this._mask.includes('#')) {
        maskPattern = this._mask;
      } else {
        maskPattern = getMask(this._locale, this._mask) || this._mask;
      }
      return applyMask(this.value, maskPattern);
    }

    // Regular number formatting with optional abbreviation
    const roundedNum = round(this.value, this._decimals, this._roundingMode);
    const formattedNum = formatNumber(roundedNum, this._decimals, this._locale, this._stripZeros);

    if (this._abbreviated) {
      return abbreviateNumber(this.value, formattedNum, this._locale);
    }

    return formattedNum;
  }

  /**
   * Alias for format() - returns formatted string
   * @returns Formatted string
   */
  toString(): string {
    return this.format();
  }

  /**
   * Returns the original numeric value
   * @returns The numeric value
   */
  valueOf(): number {
    return this.value;
  }

  /**
   * Convert the formatted number to screen-reader friendly text
   * @returns Accessible string representation
   *
   * @example
   * ```typescript
   * Num(1200000).locale('pt-BR').abbreviated().toAccessible()
   * // "um ponto dois milhões"
   *
   * Num(12000000).locale('pt-BR').currency('BRL').abbreviated().toAccessible()
   * // "doze milhões de reais"
   *
   * Num(1500).locale('en-US').abbreviated().toAccessible()
   * // "one point five thousand"
   * ```
   */
  toAccessible(): string {
    const formatted = this.format();
    return toAccessibleString(formatted, { locale: this._locale });
  }

  /**
   * Format the number as an array of parts for granular styling
   * @returns Array of number parts with types and values
   *
   * @example
   * ```typescript
   * // Basic number formatting
   * Num(1234.56).locale('pt-BR').toParts()
   * // [
   * //   { type: 'integer', value: '1.234' },
   * //   { type: 'decimal', value: ',' },
   * //   { type: 'fraction', value: '56' }
   * // ]
   *
   * // Currency formatting
   * Num(1234.56).currency('USD').toParts()
   * // [
   * //   { type: 'currency', value: '$' },
   * //   { type: 'integer', value: '1,234' },
   * //   { type: 'decimal', value: '.' },
   * //   { type: 'fraction', value: '56' }
   * // ]
   *
   * // Abbreviated numbers
   * Num(1500).abbreviated().toParts()
   * // [
   * //   { type: 'integer', value: '1' },
   * //   { type: 'decimal', value: '.' },
   * //   { type: 'fraction', value: '5' },
   * //   { type: 'unit', value: 'k' }
   * // ]
   *
   * // Bytes formatting
   * Num(1536).bytes().toParts()
   * // [
   * //   { type: 'integer', value: '1' },
   * //   { type: 'decimal', value: '.' },
   * //   { type: 'fraction', value: '50' },
   * //   { type: 'unit', value: 'KiB' }
   * // ]
   *
   * // Percentage formatting
   * Num(0.5).percentage().toParts()
   * // [
   * //   { type: 'integer', value: '50' },
   * //   { type: 'decimal', value: '.' },
   * //   { type: 'fraction', value: '00' },
   * //   { type: 'percentSign', value: '%' }
   * // ]
   */
  toParts(): NumberPart[] {
    return beautifyToParts(this.value, {
      locale: this._locale,
      decimals: this._decimals,
      stripZeros: this._stripZeros,
      roundingMode: this._roundingMode,
      currency: this._currency,
      showSymbol: this._showSymbol,
      showCode: this._showCode,
      percentage: this._percentage,
      percentageMultiply: this._percentageMultiply,
      bytes: this._bytes,
      bytesBinary: this._bytesBinary,
      bytesLongFormat: this._bytesLongFormat,
      abbreviated: this._abbreviated,
    });
  }
}

/**
 * Create a new Num instance for fluent formatting
 * @param value - The number to format
 * @returns A new Num instance
 *
 * @example
 * ```typescript
 * import { Num } from 'num-beauty';
 *
 * Num(1234.56).locale('pt-BR').format() // "1.234,56"
 * Num(1234.56).currency('USD').format() // "$1,234.56"
 * Num(0.5).percentage().format() // "50.00%"
 * ```
 */
export function num(value: number): Num {
  return new Num(value);
}

export interface NumState {
  value: number;
  locale: SupportedLocale;
  decimals: number;
  abbreviated: boolean;
  stripZeros: boolean;
  roundingMode: RoundingMode;
  mask?: string;
  currency?: string;
  showSymbol: boolean;
  showCode: boolean;
  bytes: boolean;
  bytesBinary: boolean;
  bytesLongFormat: boolean;
  percentage: boolean;
  percentageMultiply: boolean;
  percentageAddSpace?: boolean;
}

export type NumPluginServices = typeof pluginServices;

export interface NumPluginContext {
  Num: typeof Num;
  createInstance: (value: number) => Num;
  services: NumPluginServices;
  getState(instance: Num): Readonly<NumState>;
  patchState(instance: Num, patch: Partial<NumState>): void;
}

export type NumPlugin<TOptions = void> = (context: NumPluginContext, options?: TOptions) => void;
