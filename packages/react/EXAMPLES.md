# @num-beauty/react - Usage Examples

## Installation

```bash
pnpm add @num-beauty/react num-beauty
```

## Example 1: Basic Hook Usage (No Context)

```tsx
import { useNumBeauty } from '@num-beauty/react';

function ProductCard({ product }) {
  const { formatted } = useNumBeauty(product.price, {
    locale: 'en-US',
    currency: 'USD',
    decimals: 2
  });
  
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p className="price">{formatted}</p>
    </div>
  );
}
```

## Example 2: With Context Provider

```tsx
import { NumBeautyProvider, useNumBeauty } from '@num-beauty/react';

// Root component
function App() {
  const [locale, setLocale] = useState('en-US');
  
  return (
    <NumBeautyProvider config={{ locale, decimals: 2 }}>
      <Header onLocaleChange={setLocale} />
      <ProductList />
    </NumBeautyProvider>
  );
}

// Child component automatically uses context
function ProductPrice({ price }) {
  const { formatted } = useNumBeauty(price, { currency: 'USD' });
  return <span>{formatted}</span>;
}
```

## Example 3: Component-Based Rendering

```tsx
import { NumDisplay } from '@num-beauty/react';

function PriceDisplay({ amount }) {
  return (
    <div>
      <NumDisplay value={amount} currency="USD" className="price" />
    </div>
  );
}
```

## Example 4: Styled Parts for Custom Styling

```tsx
import { NumDisplay } from '@num-beauty/react';

function StyledPrice({ price }) {
  return (
    <NumDisplay
      value={price}
      currency="USD"
      styled
      renderPart={(part, index) => {
        const className = `price-${part.type}`;
        return (
          <span key={index} className={className}>
            {part.value}
          </span>
        );
      }}
    />
  );
}

// CSS
// .price-currency { color: green; font-weight: bold; }
// .price-integer { font-size: 2em; }
// .price-fraction { font-size: 1.2em; opacity: 0.7; }
```

## Example 5: Convenience Hooks

```tsx
import { useCurrency, usePercentage, useBytes } from '@num-beauty/react/hooks';

function Dashboard({ data }) {
  const revenue = useCurrency(data.revenue, 'USD');
  const growth = usePercentage(data.growth);
  const bandwidth = useBytes(data.bandwidth);
  
  return (
    <div>
      <div>Revenue: {revenue}</div>
      <div>Growth: {growth}</div>
      <div>Bandwidth: {bandwidth}</div>
    </div>
  );
}
```

## Example 6: Dynamic Locale Switching

```tsx
import { NumBeautyProvider, useNumBeautyContext } from '@num-beauty/react';

function LocaleSwitcher() {
  const { locale, setLocale } = useNumBeautyContext();
  
  return (
    <select value={locale} onChange={e => setLocale(e.target.value)}>
      <option value="en-US">🇺🇸 English</option>
      <option value="pt-BR">🇧🇷 Português</option>
      <option value="es-ES">🇪🇸 Español</option>
      <option value="de-DE">🇩🇪 Deutsch</option>
    </select>
  );
}

function App() {
  return (
    <NumBeautyProvider config={{ locale: 'en-US' }}>
      <LocaleSwitcher />
      <ProductList /> {/* Re-renders automatically on locale change */}
    </NumBeautyProvider>
  );
}
```

## Example 7: Render Props Pattern

```tsx
import { NumParts } from '@num-beauty/react';

function AnimatedNumber({ value }) {
  return (
    <NumParts value={value} currency="USD">
      {(part, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`num-${part.type}`}
        >
          {part.value}
        </motion.span>
      )}
    </NumParts>
  );
}
```

## Example 8: Tree-Shaking (Importing Only What You Need)

```tsx
// Import specific modules for smaller bundle
import { useNumBeauty } from '@num-beauty/react/hooks';
import { NumDisplay } from '@num-beauty/react/components';
import { NumBeautyProvider } from '@num-beauty/react/context';

// Bundle will only include imported modules
```

## TypeScript Examples

```tsx
import type {
  NumBeautyConfig,
  UseNumBeautyOptions,
  NumDisplayProps
} from '@num-beauty/react';

const config: NumBeautyConfig = {
  locale: 'pt-BR',
  decimals: 2,
  stripZeros: true
};

function TypedComponent({ value }: { value: number }) {
  const options: UseNumBeautyOptions = {
    currency: 'BRL',
    decimals: 2
  };
  
  const { formatted } = useNumBeauty(value, options);
  return <div>{formatted}</div>;
}
```
