import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import type { SupportedLocale } from 'num-beauty';

/**
 * Configuration for NumBeauty Context
 */
export interface NumBeautyConfig {
  /**
   * Default locale for all number formatting
   * @default 'en-US'
   */
  locale: SupportedLocale;
  /**
   * Default number of decimal places
   * @default 2
   */
  decimals?: number;
  /**
   * Default currency code (e.g., 'USD', 'EUR')
   */
  currency?: string;
  /**
   * Whether to strip trailing zeros
   * @default false
   */
  stripZeros?: boolean;
}

/**
 * Context value with configuration and setters
 */
export interface NumBeautyContextValue extends NumBeautyConfig {
  /**
   * Update the locale
   */
  setLocale: (locale: SupportedLocale) => void;
  /**
   * Update the decimals
   */
  setDecimals: (decimals: number) => void;
  /**
   * Update the currency
   */
  setCurrency: (currency: string) => void;
  /**
   * Update stripZeros flag
   */
  setStripZeros: (stripZeros: boolean) => void;
  /**
   * Update multiple config values at once
   */
  updateConfig: (config: Partial<NumBeautyConfig>) => void;
}

// Create context with undefined default (will throw if used without provider)
const NumBeautyContext = createContext<NumBeautyContextValue | undefined>(undefined);

/**
 * Props for NumBeautyProvider
 */
export interface NumBeautyProviderProps {
  /**
   * Initial configuration
   */
  config?: Partial<NumBeautyConfig>;
  /**
   * Child components
   */
  children: ReactNode;
}

/**
 * Provider component for global NumBeauty configuration
 *
 * @example
 * ```tsx
 * import { NumBeautyProvider } from '@num-beauty/react';
 *
 * function App() {
 *   return (
 *     <NumBeautyProvider config={{ locale: 'pt-BR', decimals: 2 }}>
 *       <YourApp />
 *     </NumBeautyProvider>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Dynamic locale switching
 * function App() {
 *   const [locale, setLocale] = useState<SupportedLocale>('en-US');
 *
 *   return (
 *     <NumBeautyProvider config={{ locale }}>
 *       <select value={locale} onChange={e => setLocale(e.target.value as SupportedLocale)}>
 *         <option value="en-US">English (US)</option>
 *         <option value="pt-BR">Português (BR)</option>
 *         <option value="es-ES">Español (ES)</option>
 *       </select>
 *       <YourApp />
 *     </NumBeautyProvider>
 *   );
 * }
 * ```
 */
export function NumBeautyProvider({
  config = {},
  children,
}: NumBeautyProviderProps): React.ReactElement {
  const [locale, setLocale] = useState<SupportedLocale>(config.locale || 'en-US');
  const [decimals, setDecimals] = useState<number | undefined>(config.decimals);
  const [currency, setCurrency] = useState<string | undefined>(config.currency);
  const [stripZeros, setStripZeros] = useState<boolean | undefined>(config.stripZeros);

  const updateConfig = useCallback((newConfig: Partial<NumBeautyConfig>) => {
    if (newConfig.locale !== undefined) setLocale(newConfig.locale);
    if (newConfig.decimals !== undefined) setDecimals(newConfig.decimals);
    if (newConfig.currency !== undefined) setCurrency(newConfig.currency);
    if (newConfig.stripZeros !== undefined) setStripZeros(newConfig.stripZeros);
  }, []);

  const value = useMemo<NumBeautyContextValue>(
    () => ({
      locale,
      decimals,
      currency,
      stripZeros,
      setLocale,
      setDecimals,
      setCurrency,
      setStripZeros,
      updateConfig,
    }),
    [locale, decimals, currency, stripZeros, updateConfig]
  );

  return <NumBeautyContext.Provider value={value}>{children}</NumBeautyContext.Provider>;
}

/**
 * Hook to access NumBeauty context
 *
 * @throws Error if used outside NumBeautyProvider
 * @returns NumBeauty context value
 *
 * @example
 * ```tsx
 * import { useNumBeautyContext } from '@num-beauty/react/context';
 *
 * function LocaleSwitcher() {
 *   const { locale, setLocale } = useNumBeautyContext();
 *
 *   return (
 *     <select value={locale} onChange={e => setLocale(e.target.value as SupportedLocale)}>
 *       <option value="en-US">English</option>
 *       <option value="pt-BR">Português</option>
 *       <option value="es-ES">Español</option>
 *     </select>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Update multiple values
 * function SettingsPanel() {
 *   const { updateConfig } = useNumBeautyContext();
 *
 *   return (
 *     <button onClick={() => updateConfig({ locale: 'pt-BR', decimals: 3, stripZeros: true })}>
 *       Apply Brazilian Settings
 *     </button>
 *   );
 * }
 * ```
 */
export function useNumBeautyContext(): NumBeautyContextValue {
  const context = useContext(NumBeautyContext);
  if (!context) {
    throw new Error('useNumBeautyContext must be used within a NumBeautyProvider');
  }
  return context;
}

/**
 * Hook to access only the locale from context (optimized)
 *
 * @throws Error if used outside NumBeautyProvider
 * @returns Current locale
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const locale = useNumBeautyLocale();
 *   return <div>Current locale: {locale}</div>;
 * }
 * ```
 */
export function useNumBeautyLocale(): SupportedLocale {
  const { locale } = useNumBeautyContext();
  return locale;
}
