import React, { useMemo } from 'react';
import { type SupportedLocale } from '../locales';
import { type RoundingMode } from '../services/rounding.service';
import { beautify, type NumBeautyOptions } from '../index';
import {
  beautifyToParts,
  type NumberPart,
  type BeautifyToPartsOptions,
} from '../services/parts.service';

/**
 * Options for React number formatting
 */
export interface UseNumBeautyOptions extends BeautifyToPartsOptions {
  // All formatting options from beautifyToParts are included
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
}

/**
 * React hook for formatting numbers with memoization
 *
 * @param value - The number to format
 * @param options - Formatting options
 * @returns Object with formatted string and parts array
 *
 * @example
 * ```tsx
 * function PriceDisplay({ price }: { price: number }) {
 *   const { formatted } = useNumBeauty(price, {
 *     locale: 'en-US',
 *     currency: 'USD'
 *   });
 *   return <span>${formatted}</span>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * function StyledNumber({ value }: { value: number }) {
 *   const { parts } = useNumBeauty(value, { locale: 'pt-BR' });
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
export function useNumBeauty(
  value: number,
  options: UseNumBeautyOptions = {}
): UseNumBeautyResult {
  const formatted = useMemo(() => {
    // Use the same logic as beautifyToParts to format the string
    const partsArray = beautifyToParts(value, options);
    return partsArray.map(p => p.value).join('');
  }, [value, options]);

  const parts = useMemo(() => beautifyToParts(value, options), [value, options]);

  return { formatted, parts };
}

/**
 * Props for NumDisplay component
 */
export interface NumDisplayProps extends UseNumBeautyOptions {
  /**
   * The number to display
   */
  value: number;
  /**
   * CSS class name for the container
   */
  className?: string;
  /**
   * Inline styles for the container
   */
  style?: React.CSSProperties;
  /**
   * If true, renders number parts with individual spans for styling
   * @default false
   */
  styled?: boolean;
  /**
   * Custom render function for number parts (requires styled=true)
   */
  renderPart?: (part: NumberPart, index: number) => React.ReactNode;
  /**
   * Accessibility label (overrides automatic screen-reader text)
   */
  ariaLabel?: string;
  /**
   * HTML tag to use for the container
   * @default 'span'
   */
  as?: React.ElementType;
}

/**
 * React component for declarative number formatting
 *
 * @example
 * ```tsx
 * // Basic usage
 * <NumDisplay value={1234.56} locale="pt-BR" />
 * // Output: 1.234,56
 *
 * // Currency formatting
 * <NumDisplay
 *   value={1234.56}
 *   locale="en-US"
 *   currency="USD"
 * />
 * // Output: $1,234.56
 *
 * // Styled parts for CSS customization
 * <NumDisplay
 *   value={1234.56}
 *   currency="USD"
 *   styled
 *   className="price"
 * />
 * // Output:
 * // <span class="price">
 * //   <span class="num-currency">$</span>
 * //   <span class="num-integer">1,234</span>
 * //   <span class="num-decimal">.</span>
 * //   <span class="num-fraction">56</span>
 * // </span>
 *
 * // Custom part rendering
 * <NumDisplay
 *   value={1234.56}
 *   currency="USD"
 *   styled
 *   renderPart={(part, i) => (
 *     <span key={i} className={`custom-${part.type}`}>
 *       {part.value}
 *     </span>
 *   )}
 * />
 *
 * // Abbreviated with accessibility
 * <NumDisplay
 *   value={1234567}
 *   locale="pt-BR"
 *   abbreviated
 *   ariaLabel="um ponto dois três milhões"
 * />
 *
 * // Bytes formatting
 * <NumDisplay value={1048576} bytes />
 * // Output: 1.00 MiB
 *
 * // Percentage
 * <NumDisplay value={0.5} percentage />
 * // Output: 50.00%
 * ```
 */
export function NumDisplay({
  value,
  className,
  style,
  styled = false,
  renderPart,
  ariaLabel,
  as: Component = 'span',
  ...options
}: NumDisplayProps): React.ReactElement {
  const { formatted, parts } = useNumBeauty(value, options);

  // If styled mode is enabled, render parts individually
  if (styled) {
    return (
      <Component
        className={className}
        style={style}
        aria-label={ariaLabel}
        role="text"
      >
        {parts.map((part, index) =>
          renderPart ? (
            renderPart(part, index)
          ) : (
            <span key={index} className={`num-${part.type}`}>
              {part.value}
            </span>
          )
        )}
      </Component>
    );
  }

  // Simple mode: render formatted string
  return (
    <Component
      className={className}
      style={style}
      aria-label={ariaLabel}
    >
      {formatted}
    </Component>
  );
}

/**
 * Props for NumParts component
 */
export interface NumPartsProps extends UseNumBeautyOptions {
  /**
   * The number to display
   */
  value: number;
  /**
   * Custom render function for each part
   */
  children: (part: NumberPart, index: number) => React.ReactNode;
  /**
   * CSS class name for the container
   */
  className?: string;
  /**
   * Inline styles for the container
   */
  style?: React.CSSProperties;
  /**
   * HTML tag to use for the container
   * @default 'span'
   */
  as?: React.ElementType;
}

/**
 * React component for rendering number parts with custom render function (render props pattern)
 *
 * @example
 * ```tsx
 * <NumParts value={1234.56} currency="USD">
 *   {(part, index) => (
 *     <span
 *       key={index}
 *       className={`part-${part.type}`}
 *       style={{ color: part.type === 'currency' ? 'green' : 'black' }}
 *     >
 *       {part.value}
 *     </span>
 *   )}
 * </NumParts>
 * ```
 *
 * @example
 * ```tsx
 * // Animated parts
 * <NumParts value={count} abbreviated>
 *   {(part, index) => (
 *     <motion.span
 *       key={index}
 *       initial={{ opacity: 0, y: -10 }}
 *       animate={{ opacity: 1, y: 0 }}
 *       transition={{ delay: index * 0.1 }}
 *     >
 *       {part.value}
 *     </motion.span>
 *   )}
 * </NumParts>
 * ```
 */
export function NumParts({
  value,
  children,
  className,
  style,
  as: Component = 'span',
  ...options
}: NumPartsProps): React.ReactElement {
  const { parts } = useNumBeauty(value, options);

  return (
    <Component className={className} style={style} role="text">
      {parts.map((part, index) => children(part, index))}
    </Component>
  );
}

// Export types for consumers
export type { NumberPart, NumBeautyOptions, SupportedLocale, RoundingMode };
