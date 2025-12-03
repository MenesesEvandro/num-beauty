import React from 'react';
import { useNumBeauty, type UseNumBeautyOptions } from '../hooks/index.js';
import type { NumberPart } from 'num-beauty';

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
 * React component for declarative number formatting with context support
 *
 * @example
 * ```tsx
 * // Basic usage (uses context locale if available)
 * <NumDisplay value={1234.56} />
 *
 * // Currency formatting
 * <NumDisplay value={1234.56} currency="USD" />
 *
 * // Styled parts for CSS customization
 * <NumDisplay
 *   value={1234.56}
 *   currency="USD"
 *   styled
 *   className="price"
 * />
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
      <Component className={className} style={style} aria-label={ariaLabel} role="text">
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
    <Component className={className} style={style} aria-label={ariaLabel}>
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
