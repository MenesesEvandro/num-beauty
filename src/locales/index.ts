import { commonConfig } from './common';
import * as ptBR from './pt-BR';
import * as enUS from './en-US';
import * as esES from './es-ES';

/**
 * Currency configuration for a specific locale
 *
 * @interface CurrencyConfig
 *
 * @property {string} symbol - Currency symbol (e.g., '$', '€', '£')
 * @property {'before' | 'after'} position - Position of the symbol relative to the number
 *
 * @example
 * ```typescript
 * // US Dollar configuration
 * const USD: CurrencyConfig = {
 *   symbol: '$',
 *   position: 'before'  // $1,234.56
 * }
 *
 * // Euro configuration
 * const EUR: CurrencyConfig = {
 *   symbol: '€',
 *   position: 'after'   // 1.234,56 €
 * }
 * ```
 */
export interface CurrencyConfig {
  symbol: string;
  position: 'before' | 'after';
}

/**
 * Complete locale configuration
 *
 * @interface LocaleConfig
 *
 * @property {string} code - Locale code (e.g., 'en-US', 'pt-BR')
 * @property {string} name - Locale name (e.g., 'English (US)')
 * @property {Record<string, string>} masks - Available mask mappings
 * @property {Record<string, CurrencyConfig>} currencies - Supported currency configurations
 * @property {ReadonlyArray<readonly [string, string]>} units - Units for number abbreviation
 *   Each entry is a [singular, plural] pair (e.g., ['thousand', 'thousand'], ['million', 'millions'])
 *
 * @example
 * ```typescript
 * const enUS: LocaleConfig = {
 *   code: 'en-US',
 *   name: 'English (US)',
 *   masks: {
 *     ssn: '###-##-####',
 *     phone: '(###) ###-####'
 *   },
 *   currencies: {
 *     USD: { symbol: '$', position: 'before' }
 *   },
 *   units: [
 *     ['', ''],
 *     ['k', 'k'],
 *     ['M', 'M']
 *   ]
 * }
 * ```
 */
export interface LocaleConfig {
  code: string;
  name: string;
  masks: Record<string, string>;
  currencies: Record<string, CurrencyConfig>;
  units: ReadonlyArray<readonly [string, string]>;
}

// Supported locales definition
export type SupportedLocale = 'en-US' | 'pt-BR' | 'es-ES';

// Locale mappings
export const locales: Record<
  SupportedLocale,
  {
    masks: Record<string, string>;
    currencies: Record<string, CurrencyConfig>;
    units: ReadonlyArray<readonly [string, string]>;
  }
> = {
  'pt-BR': {
    masks: { ...commonConfig.masks, ...ptBR.locale.masks },
    currencies: { ...commonConfig.currencies, ...ptBR.locale.currencies },
    units: ptBR.locale.units,
  },
  'en-US': {
    masks: { ...commonConfig.masks, ...enUS.locale.masks },
    currencies: { ...commonConfig.currencies, ...enUS.locale.currencies },
    units: enUS.locale.units,
  },
  'es-ES': {
    masks: { ...commonConfig.masks, ...esES.locale.masks },
    currencies: { ...commonConfig.currencies, ...esES.locale.currencies },
    units: esES.locale.units,
  },
};

// Lista todos os idiomas suportados com seus nomes
export const supportedLocales = [
  { code: ptBR.locale.code, name: ptBR.locale.name },
  { code: enUS.locale.code, name: enUS.locale.name },
  { code: esES.locale.code, name: esES.locale.name },
];
