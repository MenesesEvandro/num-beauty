---
'@num-beauty/react': minor
'num-beauty': patch
---

# React Integration Package

Created `@num-beauty/react` - Official React integration for num-beauty with full TypeScript support and tree-shaking.

## Features

- **Context API** (`NumBeautyProvider`) - Global locale and formatting configuration with reactive updates
- **Reactive Hooks** - `useNumBeauty`, `useCurrency`, `usePercentage`, `useBytes`, `useAbbreviated`
- **Components** - `<NumDisplay>` and `<NumParts>` with styled rendering support
- **Tree-Shakeable** - Granular exports (`/hooks`, `/components`, `/context`)
- **Zero Config** - Works standalone or with Context Provider
- **Full TypeScript** - Complete type definitions and intellisense

## Core Changes

- Export `SupportedLocale` type from main index for external packages

## Example

```tsx
import { NumBeautyProvider, useNumBeauty, NumDisplay } from '@num-beauty/react';

function App() {
  return (
    <NumBeautyProvider config={{ locale: 'pt-BR' }}>
      <ProductPrice price={1234.56} />
    </NumBeautyProvider>
  );
}

function ProductPrice({ price }) {
  const { formatted } = useNumBeauty(price, { currency: 'BRL' });
  return <span>{formatted}</span>; // R$ 1.234,56
}
```
