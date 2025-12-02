# Lazy Loading - On-Demand Locale Loading

## Overview

The `num-beauty` library supports lazy loading of locales to optimize initial bundle size. While all built-in locales (en-US, pt-BR, es-ES, de-DE, fr-FR) are pre-registered for backward compatibility, the lazy loading system provides advanced features for custom locales and on-demand loading.

## Installation

The lazy loading module is included in `num-beauty`:

```bash
npm install num-beauty
```

## API Reference

### `loadLocale(locale: string): Promise<void>`

Dynamically loads a locale. If the locale is already loaded, this is a no-op.

```typescript
import { loadLocale } from 'num-beauty/locales/loader';

await loadLocale('pt-BR');
```

**Throws:** Error if locale is not registered or supported

### `isLocaleLoaded(locale: string): boolean`

Checks if a locale has been loaded.

```typescript
import { isLocaleLoaded } from 'num-beauty/locales/loader';

if (!isLocaleLoaded('de-DE')) {
  await loadLocale('de-DE');
}
```

### `getAvailableLocales(): string[]`

Returns list of built-in locales available for loading.

```typescript
import { getAvailableLocales } from 'num-beauty/locales/loader';

const locales = getAvailableLocales();
// ['pt-BR', 'en-US', 'es-ES', 'de-DE', 'fr-FR']
```

### `preloadLocales(locales: string[]): Promise<void>`

Loads multiple locales in parallel.

```typescript
import { preloadLocales } from 'num-beauty/locales/loader';

await preloadLocales(['es-ES', 'de-DE', 'fr-FR']);
```

### `registerLocaleLoader(locale: string, loader: LocaleLoader): void`

Registers a custom locale loader function.

```typescript
import { registerLocaleLoader, loadLocale } from 'num-beauty/locales/loader';

registerLocaleLoader('it-IT', async () => ({
  locale: {
    masks: {},
    currencies: {
      EUR: { symbol: '€', position: 'after' }
    },
    units: [
      ['k', 'k'],
      ['M', 'M'],
      ['mld', 'mld'], // billions
      ['bln', 'bln']  // trillions
    ]
  }
}));

await loadLocale('it-IT');
```

**Type Definition:**
```typescript
type LocaleLoader = () => Promise<{
  locale: Partial<LocaleConfig> & {
    masks: Record<string, string>;
    currencies: Record<string, { symbol: string; position: 'before' | 'after' }>;
    units: Array<[string, string]>;
  };
}>;
```

## Bundle Size Optimization

### Before (All Locales Bundled)
```
Core + 5 Locales: ~6.67 KB gzipped
```

### After (Lazy Loading)
```
Initial Bundle: ~6.67 KB gzipped (locales pre-registered but tree-shakeable)
Per Locale (on-demand): 366-483 B gzipped each

Locale Sizes:
- en-US: 366 B gzipped
- pt-BR: 481 B gzipped  
- es-ES: 428 B gzipped
- de-DE: 469 B gzipped
- fr-FR: 483 B gzipped
```

### Future Optimization
When adding 36+ locales (planned), lazy loading will prevent bundle bloat:
- Without lazy loading: ~20 KB initial (41 locales × ~483 B)
- With lazy loading: ~6.67 KB initial + on-demand loading

## React Integration

### Basic Usage

```typescript
import { loadLocale } from 'num-beauty/locales/loader';
import { useNumBeauty } from 'num-beauty/react';
import { useEffect, useState } from 'react';

function CurrencyDisplay({ amount }: { amount: number }) {
  const [locale, setLocale] = useState('en-US');
  const { formatCurrency } = useNumBeauty();
  
  useEffect(() => {
    loadLocale(locale).catch(console.error);
  }, [locale]);
  
  return (
    <div>
      <select onChange={(e) => setLocale(e.target.value)}>
        <option value="en-US">English</option>
        <option value="pt-BR">Português</option>
        <option value="es-ES">Español</option>
      </select>
      <p>{formatCurrency(amount, locale, { currency: 'USD' })}</p>
    </div>
  );
}
```

### Preloading on App Init

```typescript
import { preloadLocales } from 'num-beauty/locales/loader';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Preload commonly used locales
    preloadLocales(['en-US', 'pt-BR', 'es-ES'])
      .catch(console.error);
  }, []);
  
  return <YourApp />;
}
```

### User-Triggered Loading

```typescript
import { registerLocaleLoader, loadLocale } from 'num-beauty/locales/loader';

// Register custom Japanese locale
registerLocaleLoader('ja-JP', async () => {
  // Could fetch from server, load from file, etc.
  const response = await fetch('/locales/ja-JP.json');
  return response.json();
});

// Load when user selects Japanese
async function handleLanguageChange(lang: string) {
  if (lang === 'ja-JP') {
    await loadLocale('ja-JP');
  }
}
```

## Custom Locale Loading

### From External Source

```typescript
import { registerLocaleLoader, loadLocale } from 'num-beauty/locales/loader';

registerLocaleLoader('ar-SA', async () => {
  const response = await fetch('/api/locales/ar-SA');
  const data = await response.json();
  
  return {
    locale: {
      masks: data.masks,
      currencies: data.currencies,
      units: data.units
    }
  };
});

await loadLocale('ar-SA');
```

### From npm Package

```typescript
import { registerLocaleLoader, loadLocale } from 'num-beauty/locales/loader';

registerLocaleLoader('ko-KR', async () => {
  // Lazy import from separate package
  const { koKR } = await import('@my-org/num-beauty-locales-ko');
  return { locale: koKR };
});

await loadLocale('ko-KR');
```

## Performance Considerations

### Caching
- **Automatic**: Locales are cached after first load
- **No Re-fetch**: Subsequent `loadLocale()` calls are instant
- **Memory**: Minimal overhead (~400-500 B per locale)

### Parallel Loading
- Use `preloadLocales(['locale1', 'locale2'])` for parallel loading
- Faster than sequential `loadLocale()` calls
- Recommended for app initialization

### Tree-Shaking
- Built-in locales are pre-registered but tree-shakeable
- Future enhancement: Fully opt-in locale loading
- Current: Compatible with existing synchronous API

## Testing

The lazy loading system includes comprehensive tests:

```bash
npm test -- lazy-loading.test.ts
```

**Test Coverage:**
- ✅ Dynamic loading of all built-in locales
- ✅ Error handling for unsupported locales
- ✅ Cache behavior validation
- ✅ Parallel preloading
- ✅ Custom locale registration
- ✅ Performance characteristics

**Results:** 21 tests passing, 1 skipped (eager loading test - locales pre-registered)

## Migration Guide

### From Static Imports

**Before:**
```typescript
import { formatCurrency } from 'num-beauty';

// All locales bundled
formatCurrency(1234.56, 'pt-BR', { currency: 'BRL' });
```

**After (Optional Optimization):**
```typescript
import { loadLocale } from 'num-beauty/locales/loader';
import { formatCurrency } from 'num-beauty';

// Load on-demand
await loadLocale('pt-BR');
formatCurrency(1234.56, 'pt-BR', { currency: 'BRL' });
```

**Note:** Both approaches work identically. Lazy loading is optional for optimization.

### From Dynamic Registration

**Before:**
```typescript
import { registerLocale } from 'num-beauty';

registerLocale('it-IT', {
  masks: {},
  currencies: { EUR: { symbol: '€', position: 'after' } },
  units: [['k', 'k'], ['M', 'M'], ['mld', 'mld'], ['bln', 'bln']]
});
```

**After:**
```typescript
import { registerLocaleLoader, loadLocale } from 'num-beauty/locales/loader';

registerLocaleLoader('it-IT', async () => ({
  locale: {
    masks: {},
    currencies: { EUR: { symbol: '€', position: 'after' } },
    units: [['k', 'k'], ['M', 'M'], ['mld', 'mld'], ['bln', 'bln']]
  }
}));

await loadLocale('it-IT');
```

**Benefits:**
- Async loading from external sources
- Deferred execution (not bundled)
- Better code splitting

## Limitations

- **Pre-Registration**: Built-in locales still pre-registered (backward compatibility)
- **Async Only**: `loadLocale()` returns Promise (use `await` or `.then()`)
- **Server-Side**: Requires dynamic import support (Node 14+, modern bundlers)

## Future Enhancements

- [ ] Fully opt-in locale system (no pre-registration)
- [ ] Locale bundle splitting per framework (Webpack, Vite)
- [ ] CDN-hosted locale loading
- [ ] Locale version management
- [ ] Locale hot-reloading for development

## Documentation

- [Main README](../README.md)
- [API Documentation](https://num-beauty.js.org)
- [Migration Guide](../CHANGELOG.md)

## License

MIT - See [LICENSE](../LICENSE) for details.
