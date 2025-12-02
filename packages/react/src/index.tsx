/**
 * @num-beauty/react
 *
 * React integration for num-beauty with Context API, reactive hooks, and components.
 *
 * @example
 * ```tsx
 * import { NumBeautyProvider, useNumBeauty, NumDisplay } from '@num-beauty/react';
 *
 * function App() {
 *   return (
 *     <NumBeautyProvider config={{ locale: 'pt-BR', decimals: 2 }}>
 *       <YourApp />
 *     </NumBeautyProvider>
 *   );
 * }
 *
 * function ProductPrice({ price }: { price: number }) {
 *   const { formatted } = useNumBeauty(price, { currency: 'BRL' });
 *   return <span>{formatted}</span>;
 * }
 *
 * function SimplePrice({ price }: { price: number }) {
 *   return <NumDisplay value={price} currency="USD" />;
 * }
 * ```
 *
 * @packageDocumentation
 */

// Context API
export {
  NumBeautyProvider,
  useNumBeautyContext,
  useNumBeautyLocale,
  type NumBeautyConfig,
  type NumBeautyContextValue,
  type NumBeautyProviderProps,
} from './context/index.js';

// Hooks
export {
  useNumBeauty,
  useCurrency,
  usePercentage,
  useBytes,
  useAbbreviated,
  type UseNumBeautyOptions,
  type UseNumBeautyResult,
} from './hooks/index.js';

// Components
export {
  NumDisplay,
  NumParts,
  type NumDisplayProps,
  type NumPartsProps,
} from './components/index.js';

// Re-export types from num-beauty core
export type { NumberPart } from 'num-beauty';
