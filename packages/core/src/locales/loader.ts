/**
 * Lazy Loading for Locales
 *
 * This module provides dynamic import functionality to load locale configurations
 * on-demand, reducing the initial bundle size significantly.
 *
 * Instead of importing all locales upfront:
 * ```typescript
 * import { locales } from 'num-beauty'; // Loads ALL locales (~3KB)
 * ```
 *
 * You can load only what you need:
 * ```typescript
 * import { loadLocale } from 'num-beauty/locales/loader';
 * await loadLocale('pt-BR'); // Loads only pt-BR (~500B)
 * ```
 *
 * @module locales/loader
 */

import { registerLocale } from './index.js';
import type { LocaleConfig } from './index.js';

/**
 * Locale loader function type
 * Returns a promise that resolves to a locale configuration
 * Allows partial config for custom loaders (code and name are optional)
 */
type LocaleLoader = () => Promise<{
  locale: Partial<LocaleConfig> & {
    masks: Record<string, string>;
    currencies: Record<string, { symbol: string; position: 'before' | 'after' }>;
    units: ReadonlyArray<readonly [string, string]>;
  };
}>;

/**
 * Registry of available locale loaders
 * Maps locale codes to dynamic import functions
 */
const localeLoaders: Record<string, LocaleLoader> = {
  'pt-BR': () => import('./pt-BR.js'),
  'en-US': () => import('./en-US.js'),
  'es-ES': () => import('./es-ES.js'),
  'de-DE': () => import('./de-DE.js'),
  'fr-FR': () => import('./fr-FR.js'),
  // Batch 1: Asian languages
  'ja-JP': () => import('./ja-JP.js'),
  'zh-CN': () => import('./zh-CN.js'),
  'ko-KR': () => import('./ko-KR.js'),
  // Batch 2: South Asian, Middle Eastern, Eastern European
  'hi-IN': () => import('./hi-IN.js'),
  'ar-SA': () => import('./ar-SA.js'),
  'ru-RU': () => import('./ru-RU.js'),
  // Batch 3: Western European
  'it-IT': () => import('./it-IT.js'),
  'nl-NL': () => import('./nl-NL.js'),
  'pl-PL': () => import('./pl-PL.js'),
  // Batch 4: Nordic and Turkish
  'tr-TR': () => import('./tr-TR.js'),
  'sv-SE': () => import('./sv-SE.js'),
  'da-DK': () => import('./da-DK.js'),
  // Batch 5: Nordic and Central European
  'nb-NO': () => import('./nb-NO.js'),
  'fi-FI': () => import('./fi-FI.js'),
  'cs-CZ': () => import('./cs-CZ.js'),
  // Batch 6: Central and Eastern European
  'hu-HU': () => import('./hu-HU.js'),
  'ro-RO': () => import('./ro-RO.js'),
  'sk-SK': () => import('./sk-SK.js'),
  // Batch 7: Balkan and Greek
  'bg-BG': () => import('./bg-BG.js'),
  'hr-HR': () => import('./hr-HR.js'),
  'el-GR': () => import('./el-GR.js'),
  // Batch 8: Eastern European
  'uk-UA': () => import('./uk-UA.js'),
  'sl-SI': () => import('./sl-SI.js'),
  'lt-LT': () => import('./lt-LT.js'),
  // Batch 9: Baltic and Balkan
  'lv-LV': () => import('./lv-LV.js'),
  'et-EE': () => import('./et-EE.js'),
  'sr-RS': () => import('./sr-RS.js'),
  // Batch 10: Southeast Asian
  'vi-VN': () => import('./vi-VN.js'),
  'th-TH': () => import('./th-TH.js'),
  'id-ID': () => import('./id-ID.js'),
  // Batch 11: Additional European and Southeast Asian
  'ms-MY': () => import('./ms-MY.js'),
  'pt-PT': () => import('./pt-PT.js'),
  'ca-ES': () => import('./ca-ES.js'),
  // Batch 12: Final set
  'is-IS': () => import('./is-IS.js'),
  'he-IL': () => import('./he-IL.js'),
  'ga-IE': () => import('./ga-IE.js'),
  // Batch 13: Africa & Oceania
  'en-ZA': () => import('./en-ZA.js'),
  'en-NG': () => import('./en-NG.js'),
  'en-AU': () => import('./en-AU.js'),
  // Batch 14: Africa & Oceania (phase 2)
  'en-NZ': () => import('./en-NZ.js'),
  'mi-NZ': () => import('./mi-NZ.js'),
  'ar-EG': () => import('./ar-EG.js'),
  // Batch 15: Africa
  'en-KE': () => import('./en-KE.js'),
  'sw-KE': () => import('./sw-KE.js'),
  'pt-AO': () => import('./pt-AO.js'),
};

/**
 * Cache of loaded locales to avoid re-fetching
 */
const loadedLocales = new Set<string>();

/**
 * Loads a locale configuration dynamically
 *
 * This function uses dynamic imports to fetch locale data only when needed,
 * significantly reducing the initial bundle size. The locale is automatically
 * registered after loading.
 *
 * @param locale - Locale code (e.g., 'pt-BR', 'en-US')
 * @returns Promise that resolves when locale is loaded and registered
 * @throws Error if locale is not supported or fails to load
 *
 * @example
 * ```typescript
 * // Load Brazilian Portuguese locale
 * await loadLocale('pt-BR');
 *
 * // Now you can use it
 * beautify(1234.56, { locale: 'pt-BR' }); // "1.234,56"
 * ```
 *
 * @example
 * ```typescript
 * // Load multiple locales
 * await Promise.all([
 *   loadLocale('pt-BR'),
 *   loadLocale('en-US'),
 *   loadLocale('es-ES')
 * ]);
 * ```
 *
 * @example
 * ```typescript
 * // Load locale on-demand in React
 * function App() {
 *   const [locale, setLocale] = useState('en-US');
 *
 *   useEffect(() => {
 *     loadLocale(locale).catch(console.error);
 *   }, [locale]);
 *
 *   return <div>{beautify(1234.56, { locale })}</div>;
 * }
 * ```
 */
export async function loadLocale(locale: string): Promise<void> {
  // Already loaded? Skip
  if (loadedLocales.has(locale)) {
    return;
  }

  // Check if loader exists
  const loader = localeLoaders[locale];
  if (!loader) {
    throw new Error(
      `Locale "${locale}" is not supported. Available locales: ${Object.keys(localeLoaders).join(
        ', '
      )}`
    );
  }

  try {
    // Dynamic import
    const module = await loader();

    // Register the locale
    registerLocale(locale, module.locale);

    // Mark as loaded
    loadedLocales.add(locale);
  } catch (error) {
    throw new Error(
      `Failed to load locale "${locale}": ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

/**
 * Checks if a locale is already loaded
 *
 * @param locale - Locale code to check
 * @returns true if locale is loaded, false otherwise
 *
 * @example
 * ```typescript
 * if (!isLocaleLoaded('pt-BR')) {
 *   await loadLocale('pt-BR');
 * }
 * ```
 */
export function isLocaleLoaded(locale: string): boolean {
  return loadedLocales.has(locale);
}

/**
 * Gets list of available locales that can be loaded
 *
 * @returns Array of locale codes
 *
 * @example
 * ```typescript
 * const available = getAvailableLocales();
 * console.log(available); // ['pt-BR', 'en-US', 'es-ES', 'de-DE', 'fr-FR']
 * ```
 */
export function getAvailableLocales(): string[] {
  return Object.keys(localeLoaders);
}

/**
 * Preloads multiple locales in parallel
 * Useful for warming up cache or loading all locales for offline use
 *
 * @param locales - Array of locale codes to preload
 * @returns Promise that resolves when all locales are loaded
 *
 * @example
 * ```typescript
 * // Preload common locales on app startup
 * await preloadLocales(['en-US', 'pt-BR', 'es-ES']);
 * ```
 */
export async function preloadLocales(locales: string[]): Promise<void> {
  await Promise.all(locales.map((locale) => loadLocale(locale)));
}

/**
 * Registers a custom locale loader
 * Allows extending the library with custom locales without modifying source code
 *
 * @param locale - Locale code
 * @param loader - Function that returns locale configuration
 *
 * @example
 * ```typescript
 * // Register custom Italian locale
 * registerLocaleLoader('it-IT', async () => {
 *   const response = await fetch('/locales/it-IT.json');
 *   const locale = await response.json();
 *   return { locale };
 * });
 *
 * // Now you can load it
 * await loadLocale('it-IT');
 * ```
 */
export function registerLocaleLoader(locale: string, loader: LocaleLoader): void {
  localeLoaders[locale] = loader;
}
