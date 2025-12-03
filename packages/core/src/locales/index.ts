import { commonConfig } from './common.js';
import * as enUS from './en-US.js';

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
  // speech: optional locale-specific words used by accessibility helpers
  speech?: {
    small?: readonly string[]; // 0-19 words
    tens?: readonly string[]; // 20..90
    units?: ReadonlyArray<readonly [string, string]>; // spoken names for abbreviated units
    point?: string; // decimal separator spoken word
    minus?: string; // negative word
    // Currency names (singular, plural) for screen readers
    currency?: Record<string, readonly [string, string]>;
    // Joiner between number phrase and currency (e.g., ' de ' for pt-BR)
    currencyJoiner?: string;
    // Optional rules and words to drive generic number-to-words
    rules?: {
      tensHyphenate?: boolean; // e.g., en-US: true => twenty-one
      tensJoiner?: string; // used when tensHyphenate is false (e.g., pt-BR: ' e ')
      hundredsJoiner?: string; // joiner between hundreds and remainder (e.g., pt-BR: ' e ')
      hundredSuffix?: string; // default suffix for hundreds when hundredsWords is not provided (e.g., en-US: 'hundred')
    };
    hundredsWords?: readonly string[]; // index 0..9, ex: ['','cento','duzentos',...]
    hundredOneExact?: string; // exact word for 100 (e.g., pt-BR: 'cem')
  };
}

// Built-in supported locales
export type BuiltInLocale = 'en-US' | 'pt-BR' | 'es-ES' | 'de-DE' | 'fr-FR';

// Allows any string for custom locales
export type SupportedLocale = BuiltInLocale | string;

// Internal locale registry (mutable for dynamic registration)
const localeRegistry = new Map<
  string,
  {
    masks: Record<string, string>;
    currencies: Record<string, CurrencyConfig>;
    units: ReadonlyArray<readonly [string, string]>;
    speech?: {
      small?: readonly string[];
      tens?: readonly string[];
      units?: ReadonlyArray<readonly [string, string]>;
      point?: string;
      minus?: string;
      currency?: Record<string, readonly [string, string]>;
      currencyJoiner?: string;
      rules?: {
        tensHyphenate?: boolean;
        tensJoiner?: string;
        hundredsJoiner?: string;
        hundredSuffix?: string;
      };
      hundredsWords?: readonly string[];
      hundredOneExact?: string;
    };
  }
>();

import * as ptBR from './pt-BR.js';

// Register only en-US and pt-BR at initialization (preloaded)
localeRegistry.set('en-US', {
  masks: { ...commonConfig.masks, ...enUS.locale.masks },
  currencies: { ...commonConfig.currencies, ...enUS.locale.currencies },
  units: enUS.locale.units,
  speech: enUS.locale.speech,
});

localeRegistry.set('pt-BR', {
  masks: { ...commonConfig.masks, ...ptBR.locale.masks },
  currencies: { ...commonConfig.currencies, ...ptBR.locale.currencies },
  units: ptBR.locale.units,
  speech: ptBR.locale.speech,
});

/**
 * Register a custom locale or override an existing one
 *
 * @param code - Locale code (e.g., 'ja-JP', 'zh-CN')
 * @param config - Locale configuration
 *
 * @example
 * ```typescript
 * import { registerLocale } from 'num-beauty';
 *
 * // Register Japanese locale
 * registerLocale('ja-JP', {
 *   masks: {
 *     phone: '###-####-####',
 *     postal: '###-####'
 *   },
 *   currencies: {
 *     JPY: { symbol: '¥', position: 'before' }
 *   },
 *   units: [
 *     ['', ''],
 *     ['千', '千'],
 *     ['万', '万'],
 *     ['億', '億']
 *   ]
 * });
 *
 * // Use the registered locale
 * beautify(1234.56, { locale: 'ja-JP' });
 * ```
 */
export function registerLocale(
  code: string,
  config: {
    masks?: Record<string, string>;
    currencies?: Record<string, CurrencyConfig>;
    units?: ReadonlyArray<readonly [string, string]>;
    speech?: {
      small?: readonly string[];
      tens?: readonly string[];
      units?: ReadonlyArray<readonly [string, string]>;
      point?: string;
      minus?: string;
      currency?: Record<string, readonly [string, string]>;
      currencyJoiner?: string;
      rules?: {
        tensHyphenate?: boolean;
        tensJoiner?: string;
        hundredsJoiner?: string;
        hundredSuffix?: string;
      };
      hundredsWords?: readonly string[];
      hundredOneExact?: string;
    };
  }
): void {
  localeRegistry.set(code, {
    masks: { ...commonConfig.masks, ...(config.masks || {}) },
    currencies: { ...commonConfig.currencies, ...(config.currencies || {}) },
    units: config.units || [
      ['', ''],
      ['k', 'k'],
      ['M', 'M'],
      ['B', 'B'],
      ['T', 'T'],
    ],
    speech: config.speech,
  });
}

/**
 * Check if a locale is registered
 *
 * @param code - Locale code to check
 * @returns True if the locale is registered
 *
 * @example
 * ```typescript
 * if (!hasLocale('ja-JP')) {
 *   registerLocale('ja-JP', { ... });
 * }
 * ```
 */
export function hasLocale(code: string): boolean {
  return localeRegistry.has(code);
}

/**
 * Get a registered locale configuration
 *
 * @param code - Locale code
 * @returns Locale configuration or undefined if not found
 */
export function getLocale(code: string):
  | {
      masks: Record<string, string>;
      currencies: Record<string, CurrencyConfig>;
      units: ReadonlyArray<readonly [string, string]>;
      speech?: {
        small?: readonly string[];
        tens?: readonly string[];
        units?: ReadonlyArray<readonly [string, string]>;
        point?: string;
        minus?: string;
        currency?: Record<string, readonly [string, string]>;
        currencyJoiner?: string;
        rules?: {
          tensHyphenate?: boolean;
          tensJoiner?: string;
          hundredsJoiner?: string;
          hundredSuffix?: string;
        };
        hundredsWords?: readonly string[];
        hundredOneExact?: string;
      };
    }
  | undefined {
  return localeRegistry.get(code);
}

/**
 * Get all registered locale codes
 *
 * @returns Array of registered locale codes
 */
export function getRegisteredLocales(): string[] {
  return Array.from(localeRegistry.keys());
}

// Backward compatibility: expose locales as a Proxy
export const locales = new Proxy(
  {} as Record<
    string,
    {
      masks: Record<string, string>;
      currencies: Record<string, CurrencyConfig>;
      units: ReadonlyArray<readonly [string, string]>;
      speech?: {
        small?: readonly string[];
        tens?: readonly string[];
        units?: ReadonlyArray<readonly [string, string]>;
        point?: string;
        minus?: string;
        currency?: Record<string, readonly [string, string]>;
        currencyJoiner?: string;
        rules?: {
          tensHyphenate?: boolean;
          tensJoiner?: string;
          hundredsJoiner?: string;
          hundredSuffix?: string;
        };
        hundredsWords?: readonly string[];
        hundredOneExact?: string;
      };
    }
  >,
  {
    get(target, prop: string) {
      const locale = localeRegistry.get(prop);
      if (!locale) {
        throw new Error(
          `Locale '${prop}' not found. Available locales: ${Array.from(localeRegistry.keys()).join(
            ', '
          )}`
        );
      }
      return locale;
    },
    has(target, prop: string) {
      return localeRegistry.has(prop);
    },
    ownKeys() {
      return Array.from(localeRegistry.keys());
    },
    getOwnPropertyDescriptor(target, prop: string) {
      if (localeRegistry.has(prop)) {
        return {
          enumerable: true,
          configurable: true,
        };
      }
      return undefined;
    },
  }
);

// Lista todos os idiomas suportados com seus nomes
export const supportedLocales = [
  { code: 'en-US', name: 'English (US)' },
  { code: 'pt-BR', name: 'Português (Brasil)' },
  { code: 'es-ES', name: 'Español (ES)' },
  { code: 'de-DE', name: 'Deutsch (DE)' },
  { code: 'fr-FR', name: 'Français (FR)' },
  // Batch 1: Asian languages
  { code: 'ja-JP', name: '日本語 (Japanese)' },
  { code: 'zh-CN', name: '中文 (简体)' },
  { code: 'ko-KR', name: '한국어 (Korean)' },
  // Batch 2: South Asian, Middle Eastern, Eastern European
  { code: 'hi-IN', name: 'हिन्दी (Hindi)' },
  { code: 'ar-SA', name: 'العربية (Arabic)' },
  { code: 'ru-RU', name: 'Русский (Russian)' },
  // Batch 3: Western European
  { code: 'it-IT', name: 'Italiano (Italian)' },
  { code: 'nl-NL', name: 'Nederlands (Dutch)' },
  { code: 'pl-PL', name: 'Polski (Polish)' },
  // Batch 4: Nordic and Turkish
  { code: 'tr-TR', name: 'Türkçe (Turkish)' },
  { code: 'sv-SE', name: 'Svenska (Swedish)' },
  { code: 'da-DK', name: 'Dansk (Danish)' },
  // Batch 5: Nordic and Central European
  { code: 'nb-NO', name: 'Norsk bokmål (Norwegian)' },
  { code: 'fi-FI', name: 'Suomi (Finnish)' },
  { code: 'cs-CZ', name: 'Čeština (Czech)' },
  // Batch 6: Central and Eastern European
  { code: 'hu-HU', name: 'Magyar (Hungarian)' },
  { code: 'ro-RO', name: 'Română (Romanian)' },
  { code: 'sk-SK', name: 'Slovenčina (Slovak)' },
  // Batch 7: Balkan and Greek
  { code: 'bg-BG', name: 'Български (Bulgarian)' },
  { code: 'hr-HR', name: 'Hrvatski (Croatian)' },
  { code: 'el-GR', name: 'Ελληνικά (Greek)' },
  { code: 'uk-UA', name: 'Українська (Ukrainian)' },
  { code: 'sl-SI', name: 'Slovenščina (Slovenian)' },
  { code: 'lt-LT', name: 'Lietuvių (Lithuanian)' },
  { code: 'lv-LV', name: 'Latviešu (Latvian)' },
  { code: 'et-EE', name: 'Eesti (Estonian)' },
  { code: 'sr-RS', name: 'Српски (Serbian)' },
  { code: 'vi-VN', name: 'Tiếng Việt (Vietnamese)' },
  { code: 'th-TH', name: 'ไทย (Thai)' },
  { code: 'id-ID', name: 'Bahasa Indonesia (Indonesian)' },
  { code: 'ms-MY', name: 'Bahasa Melayu (Malay)' },
  { code: 'pt-PT', name: 'Português (Portugal)' },
  { code: 'ca-ES', name: 'Català (Catalan)' },
  // Batch 12: Final set
  { code: 'is-IS', name: 'Íslenska (Icelandic)' },
  { code: 'he-IL', name: 'עברית (Hebrew)' },
  { code: 'ga-IE', name: 'Gaeilge (Irish)' },
  // Batch 13: Africa & Oceania
  { code: 'en-ZA', name: 'English (South Africa)' },
  { code: 'en-NG', name: 'English (Nigeria)' },
  { code: 'en-AU', name: 'English (Australia)' },
  // Batch 14: Africa & Oceania (phase 2)
  { code: 'en-NZ', name: 'English (New Zealand)' },
  { code: 'mi-NZ', name: 'Māori (New Zealand)' },
  { code: 'ar-EG', name: 'العربية (Egypt)' },
  // Batch 15: Africa
  { code: 'en-KE', name: 'English (Kenya)' },
  { code: 'sw-KE', name: 'Kiswahili (Kenya)' },
  { code: 'pt-AO', name: 'Português (Angola)' },
];
