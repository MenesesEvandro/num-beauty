# @num-beauty/react

React integration for [num-beauty](https://github.com/MenesesEvandro/num-beauty) with Context API, reactive hooks, and components.

## Features

- ✅ **Context API** - Global locale and formatting configuration
- ✅ **Reactive Hooks** - Automatic re-rendering on context changes
- ✅ **Tree-Shakeable** - Import only what you need
- ✅ **TypeScript** - Full type safety
- ✅ **Zero Config** - Works standalone or with Context
- ✅ **Flexible** - Hooks, components, and render props patterns

## Installation

```bash
npm install @num-beauty/react num-beauty
# or
pnpm add @num-beauty/react num-beauty
# or
yarn add @num-beauty/react num-beauty
```

## Quick Start

### Basic Usage (without Context)

```tsx
import { useNumBeauty, NumDisplay } from '@num-beauty/react';

function ProductPrice({ price }: { price: number }) {
  const { formatted } = useNumBeauty(price, { 
    locale: 'en-US',
    currency: 'USD' 
  });
  
  return <span className="price">{formatted}</span>;
  // Output: $1,234.56
}

// Or use the component
function SimplePrice({ price }: { price: number }) {
  return <NumDisplay value={price} currency="USD" />;
}
```

### With Context (Recommended)

```tsx
import { NumBeautyProvider, useNumBeauty } from '@num-beauty/react';

function App() {
  return (
    <NumBeautyProvider config={{ locale: 'pt-BR', decimals: 2 }}>
      <YourApp />
    </NumBeautyProvider>
  );
}

function ProductPrice({ price }: { price: number }) {
  // Automatically uses 'pt-BR' from context
  const { formatted } = useNumBeauty(price, { currency: 'BRL' });
  return <span>{formatted}</span>;
  // Output: R$ 1.234,56
}
```

## API Reference

### Context API

#### `<NumBeautyProvider>`

Provider component for global configuration.

```tsx
interface NumBeautyConfig {
  locale?: SupportedLocale;    // Default: 'en-US'
  decimals?: number;            // Default: 2
  currency?: string;            // e.g., 'USD', 'EUR'
  stripZeros?: boolean;         // Default: false
}

<NumBeautyProvider config={{ locale: 'pt-BR', decimals: 2 }}>
  <App />
</NumBeautyProvider>
```

#### `useNumBeautyContext()`

Access and update context configuration.

```tsx
function LocaleSwitcher() {
  const { locale, setLocale } = useNumBeautyContext();
  
  return (
    <select value={locale} onChange={e => setLocale(e.target.value)}>
      <option value="en-US">English</option>
      <option value="pt-BR">Português</option>
      <option value="es-ES">Español</option>
    </select>
  );
}
```

### Hooks

#### `useNumBeauty(value, options)`

Main hook for number formatting. Merges context config with local options.

```tsx
function Example() {
  const { formatted, parts, reformat } = useNumBeauty(1234.56, {
    locale: 'pt-BR',
    decimals: 2,
    currency: 'BRL'
  });
  
  return <div>{formatted}</div>; // R$ 1.234,56
}
```

**Returns:**

- `formatted` - Formatted string
- `parts` - Array of number parts for custom rendering
- `reformat(newOptions)` - Function to reformat with different options

#### Convenience Hooks

```tsx
// Currency formatting
const formatted = useCurrency(price, 'USD', { decimals: 2 });

// Percentage formatting
const formatted = usePercentage(0.5); // "50.00%"

// Bytes formatting
const formatted = useBytes(1048576); // "1.00 MiB"

// Abbreviated numbers
const formatted = useAbbreviated(1500000); // "1.50M"
```

### Components

#### `<NumDisplay>`

Declarative component for number formatting.

```tsx
// Basic usage
<NumDisplay value={1234.56} locale="pt-BR" />

// Currency
<NumDisplay value={price} currency="USD" />

// Styled parts (with CSS classes)
<NumDisplay 
  value={1234.56} 
  currency="USD"
  styled
  className="price"
/>
// Output:
// <span class="price">
//   <span class="num-currency">$</span>
//   <span class="num-integer">1,234</span>
//   <span class="num-decimal">.</span>
//   <span class="num-fraction">56</span>
// </span>

// Custom part rendering
<NumDisplay
  value={1234.56}
  currency="USD"
  styled
  renderPart={(part, i) => (
    <span key={i} className={`custom-${part.type}`}>
      {part.value}
    </span>
  )}
/>
```

#### `<NumParts>`

Render props pattern for full control over part rendering.

```tsx
<NumParts value={1234.56} currency="USD">
  {(part, index) => (
    <span
      key={index}
      style={{ 
        color: part.type === 'currency' ? 'green' : 'black',
        fontWeight: part.type === 'integer' ? 'bold' : 'normal'
      }}
    >
      {part.value}
    </span>
  )}
</NumParts>
```

## Advanced Examples

### Dynamic Locale Switching

```tsx
function App() {
  const [locale, setLocale] = useState<SupportedLocale>('en-US');
  
  return (
    <NumBeautyProvider config={{ locale }}>
      <LocaleSwitcher locale={locale} onChange={setLocale} />
      <ProductList /> {/* All components react to locale change */}
    </NumBeautyProvider>
  );
}
```

### Styled Number Parts (for animations, etc.)

```tsx
import { motion } from 'framer-motion';

function AnimatedPrice({ price }: { price: number }) {
  return (
    <NumParts value={price} currency="USD">
      {(part, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {part.value}
        </motion.span>
      )}
    </NumParts>
  );
}
```

### Conditional Formatting

```tsx
function SmartPrice({ price, showCents = true }: Props) {
  const { formatted } = useNumBeauty(price, {
    currency: 'USD',
    decimals: showCents ? 2 : 0,
    stripZeros: !showCents
  });
  
  return <span className="price">{formatted}</span>;
}
```

## Tree-Shaking Support

Import only what you need for optimal bundle size:

```tsx
// Import specific modules
import { useNumBeauty } from '@num-beauty/react/hooks';
import { NumDisplay } from '@num-beauty/react/components';
import { NumBeautyProvider } from '@num-beauty/react/context';

// Or import from main entry
import { useNumBeauty, NumDisplay } from '@num-beauty/react';
```

## TypeScript Support

Full TypeScript support with exported types:

```tsx
import type {
  NumBeautyConfig,
  NumBeautyContextValue,
  UseNumBeautyOptions,
  UseNumBeautyResult,
  NumDisplayProps,
  NumPartsProps
} from '@num-beauty/react';
```

## License

MIT © Evandro Meneses

## Related Packages

- [num-beauty](https://github.com/MenesesEvandro/num-beauty) - Core library
- `@num-beauty/vue` - Vue integration
- `@num-beauty/svelte` - Svelte integration
