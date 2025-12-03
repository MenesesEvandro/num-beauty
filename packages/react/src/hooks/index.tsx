import { useMemo, useCallback } from 'react';
import {
  beautify,
  formatCurrency,
  formatBytes,
  formatPercentage,
  type NumBeautyOptions,
} from 'num-beauty';
import { beautifyToParts, type NumberPart, type BeautifyToPartsOptions } from 'num-beauty';
import { useNumBeautyContext } from '../context/index.js';

/**
 * Extended options for React hooks (includes all formatting types)
 */
export interface UseNumBeautyOptions extends NumBeautyOptions {
  /**
   * Currency code for currency formatting (e.g., 'USD', 'EUR')
   */
  currency?: string;
  /**
   * Format as percentage
   */
  percentage?: boolean;
  /**
   * Multiply by 100 when formatting percentage
   * @default true
   */
  percentageMultiply?: boolean;
  /**
   * Format as bytes
   */
  bytes?: boolean;
  /**
   * Use binary (1024) or decimal (1000) for bytes
   * @default true (binary)
   */
  bytesBinary?: boolean;
}

/**
 * Result of useNumBeauty hook
 */
export interface UseNumBeautyResult {
  /**
   * Formatted number string
   */
  formatted: string;
  /**
   * Array of number parts for granular rendering
   */
  parts: NumberPart[];
  /**
   * Function to reformat with different options
   */
  reformat: (newOptions?: Partial<UseNumBeautyOptions>) => string;
}

/**
 * React hook for formatting numbers with automatic context integration
 *
 * This hook merges context configuration with local options and reacts to context changes.
 *
 * @param value - The number to format
 * @param options - Formatting options (overrides context defaults)
 * @returns Object with formatted string, parts array, and reformat function
 *
 * @example
 * ```tsx
 * import { useNumBeauty } from '@num-beauty/react/hooks';
 *
 * function PriceDisplay({ price }: { price: number }) {
 *   const { formatted } = useNumBeauty(price, { currency: 'USD' });
 *   return <span>${formatted}</span>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With context defaults
 * function App() {
 *   return (
 *     <NumBeautyProvider config={{ locale: 'pt-BR', decimals: 2 }}>
 *       <ProductPrice price={1234.56} /> // Uses pt-BR from context
 *     </NumBeautyProvider>
 *   );
 * }
 *
 * function ProductPrice({ price }: { price: number }) {
 *   const { formatted } = useNumBeauty(price); // Inherits locale from context
 *   return <div>{formatted}</div>; // "1.234,56"
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Styled parts rendering
 * function StyledNumber({ value }: { value: number }) {
 *   const { parts } = useNumBeauty(value);
 *   return (
 *     <span>
 *       {parts.map((part, i) => (
 *         <span key={i} className={`num-${part.type}`}>
 *           {part.value}
 *         </span>
 *       ))}
 *     </span>
 *   );
 * }
 * ```
 */
export function useNumBeauty(value: number, options: UseNumBeautyOptions = {}): UseNumBeautyResult {
  // Try to get context (will be undefined if used outside provider)
  let context;
  try {
    context = useNumBeautyContext();
  } catch {
    // Context not available, use options only
    context = undefined;
  }

  // Merge context config with local options (local options take precedence)
  const mergedOptions = useMemo(() => {
    if (!context) return options;
    return {
      locale: options.locale || context.locale,
      decimals: options.decimals !== undefined ? options.decimals : context.decimals,
      currency: options.currency || context.currency,
      stripZeros: options.stripZeros !== undefined ? options.stripZeros : context.stripZeros,
      ...options,
    };
  }, [context, options]);

  const formatted = useMemo(() => {
    // Handle special formatting types
    if (mergedOptions.currency) {
      return formatCurrency(value, mergedOptions.locale || 'en-US', {
        currency: mergedOptions.currency,
        decimals: mergedOptions.decimals,
        stripZeros: mergedOptions.stripZeros,
      });
    }
    if (mergedOptions.bytes) {
      return formatBytes(value, {
        locale: mergedOptions.locale || 'en-US',
        binary: mergedOptions.bytesBinary,
        decimals: mergedOptions.decimals,
      });
    }
    if (mergedOptions.percentage) {
      return formatPercentage(value, {
        locale: mergedOptions.locale || 'en-US',
        decimals: mergedOptions.decimals,
        multiply: mergedOptions.percentageMultiply,
        stripZeros: mergedOptions.stripZeros,
      });
    }
    // Standard number formatting
    return beautify(value, mergedOptions);
  }, [value, mergedOptions]);

  const parts = useMemo(
    () => beautifyToParts(value, mergedOptions as BeautifyToPartsOptions),
    [value, mergedOptions]
  );

  const reformat = useCallback(
    (newOptions?: Partial<UseNumBeautyOptions>) => {
      const finalOptions = { ...mergedOptions, ...newOptions };
      return beautify(value, finalOptions);
    },
    [value, mergedOptions]
  );

  return { formatted, parts, reformat };
}

/**
 * Hook for formatting currency (convenience wrapper)
 *
 * @param value - The number to format as currency
 * @param currency - Currency code (e.g., 'USD', 'EUR', 'BRL')
 * @param options - Additional formatting options
 * @returns Formatted currency string
 *
 * @example
 * ```tsx
 * import { useCurrency } from '@num-beauty/react/hooks';
 *
 * function ProductPrice({ price }: { price: number }) {
 *   const formatted = useCurrency(price, 'USD');
 *   return <span className="price">{formatted}</span>; // "$1,234.56"
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With context locale
 * function App() {
 *   return (
 *     <NumBeautyProvider config={{ locale: 'pt-BR' }}>
 *       <ProductPrice price={1234.56} /> // "R$ 1.234,56"
 *     </NumBeautyProvider>
 *   );
 * }
 *
 * function ProductPrice({ price }: { price: number }) {
 *   const formatted = useCurrency(price, 'BRL');
 *   return <div>{formatted}</div>;
 * }
 * ```
 */
export function useCurrency(
  value: number,
  currency: string,
  options: Omit<UseNumBeautyOptions, 'currency'> = {}
): string {
  const { formatted } = useNumBeauty(value, { ...options, currency });
  return formatted;
}

/**
 * Hook for formatting percentages (convenience wrapper)
 *
 * @param value - The number to format as percentage (0-1 range or 0-100 depending on multiply option)
 * @param options - Additional formatting options
 * @returns Formatted percentage string
 *
 * @example
 * ```tsx
 * import { usePercentage } from '@num-beauty/react/hooks';
 *
 * function ProgressBar({ progress }: { progress: number }) {
 *   const formatted = usePercentage(progress); // 0.5 -> "50.00%"
 *   return <div className="progress-label">{formatted}</div>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Already in 0-100 range
 * function Score({ score }: { score: number }) {
 *   const formatted = usePercentage(score, { percentageMultiply: false });
 *   return <span>{formatted}</span>; // 85 -> "85.00%"
 * }
 * ```
 */
export function usePercentage(
  value: number,
  options: Omit<UseNumBeautyOptions, 'percentage'> = {}
): string {
  const { formatted } = useNumBeauty(value, { ...options, percentage: true });
  return formatted;
}

/**
 * Hook for formatting bytes (convenience wrapper)
 *
 * @param value - The number of bytes
 * @param options - Additional formatting options
 * @returns Formatted bytes string
 *
 * @example
 * ```tsx
 * import { useBytes } from '@num-beauty/react/hooks';
 *
 * function FileSize({ bytes }: { bytes: number }) {
 *   const formatted = useBytes(bytes); // 1048576 -> "1.00 MiB"
 *   return <span className="file-size">{formatted}</span>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Decimal (SI) units
 * function BandwidthDisplay({ bps }: { bps: number }) {
 *   const formatted = useBytes(bps, { bytesBinary: false });
 *   return <div>{formatted}/s</div>; // 1000000 -> "1.00 MB/s"
 * }
 * ```
 */
export function useBytes(value: number, options: Omit<UseNumBeautyOptions, 'bytes'> = {}): string {
  const { formatted } = useNumBeauty(value, { ...options, bytes: true });
  return formatted;
}

/**
 * Hook for formatting abbreviated numbers (convenience wrapper)
 *
 * @param value - The number to abbreviate
 * @param options - Additional formatting options
 * @returns Formatted abbreviated string
 *
 * @example
 * ```tsx
 * import { useAbbreviated } from '@num-beauty/react/hooks';
 *
 * function ViewCount({ views }: { views: number }) {
 *   const formatted = useAbbreviated(views); // 1500 -> "1.50k"
 *   return <span className="views">{formatted} views</span>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With context locale
 * function FollowerCount({ followers }: { followers: number }) {
 *   const formatted = useAbbreviated(followers);
 *   return <div>{formatted}</div>; // Uses locale-specific abbreviations
 * }
 * ```
 */
export function useAbbreviated(
  value: number,
  options: Omit<UseNumBeautyOptions, 'abbreviated'> = {}
): string {
  const { formatted } = useNumBeauty(value, { ...options, abbreviated: true });
  return formatted;
}
