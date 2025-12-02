# num-beauty

An ultra lightweight module for formatting numbers into human-friendly strings. Features:

- ✨ Basic number formatting with thousands and decimal separators
- 🌎 Internationalization (41+ locales — full list below)
- 📏 Custom decimal precision
- 🔄 Multiple rounding modes
- 🎭 Predefined and custom masks per locale
- 🔤 Large number abbreviation (1,234,567 → 1.23M)
- 💾 Data size formatting (1024 → 1 KiB, 1048576 → 1 MiB)
- 📊 Percentage formatting (0.5 → 50%, with locale-aware spacing)
- 🔗 Fluent API with method chaining for elegant formatting
- 🎯 Tree-shaking support for optimal bundle sizes
- 🌐 Dynamic locale registration at runtime
- ♿ Accessibility: conversion to screen-reader friendly speech
- 🔄 Reverse parsing: convert formatted strings back to numbers (unbeautify)
- 📋 Structured formatting: decompose numbers into parts for granular CSS styling (beautifyToParts)
- ⚛️ React integration: hooks and components for declarative number formatting

![NPM Version](https://img.shields.io/npm/v/num-beauty) ![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/num-beauty) ![npm bundle size](https://img.shields.io/bundlephobia/min/num-beauty)
 ![Crates.io License](https://img.shields.io/crates/l/mit) ![GitHub last commit](https://img.shields.io/github/last-commit/menesesevandro/num-beauty)

## Installation

```bash
# npm
npm install num-beauty

# yarn
yarn add num-beauty

# pnpm
pnpm add num-beauty
```

## Documentation

Full documentation is available at [num-beauty.js.org](https://num-beauty.js.org).

## Carregamento de Locales

- Padrão: `en-US` está disponível automaticamente.
- Outros idiomas: carregue ou registre o locale antes de usar.

Exemplo:

```typescript
import { beautify } from 'num-beauty';
import { loadLocale } from 'num-beauty/locales/loader';

// en-US já funciona sem configuração extra
console.log(beautify(1234.56)); // "1,234.56"

// Para usar pt-BR, carregue antes do uso
(async () => {
  await loadLocale('pt-BR');
  console.log(beautify(1234.56, { locale: 'pt-BR' })); // "1.234,56"
})();
```

## Supported Locales

This project supports a wide set of locales across regions. Load a locale dynamically with `loadLocale(code)` or register your own.

- Core (original): `en-US`, `pt-BR`, `es-ES`
- Europe: `de-DE`, `fr-FR`, `it-IT`, `nl-NL`, `pl-PL`, `tr-TR`, `sv-SE`, `da-DK`, `nb-NO`, `fi-FI`, `cs-CZ`, `hu-HU`, `ro-RO`, `sk-SK`, `bg-BG`, `hr-HR`, `el-GR`, `uk-UA`, `sl-SI`, `lt-LT`, `lv-LV`, `et-EE`, `sr-RS`, `pt-PT`, `ca-ES`, `is-IS`, `ga-IE`
- Asia & Middle East: `ja-JP`, `zh-CN`, `ko-KR`, `hi-IN`, `ar-SA`, `ru-RU`, `vi-VN`, `th-TH`, `id-ID`, `ms-MY`, `he-IL`, `ar-EG`
- Africa & Oceania: `en-ZA`, `en-NG`, `en-AU`, `en-NZ`, `mi-NZ`, `en-KE`, `sw-KE`, `pt-AO`

If you need a locale that isn't bundled, use `registerLocale` or `registerLocaleLoader` to add it at runtime.

## Tree-Shaking Support

`num-beauty` is fully optimized for tree-shaking. You can import specific functions to reduce your bundle size:

```typescript
// Import specific modules for better tree-shaking
import { round } from 'num-beauty/round';
import { formatCurrency } from 'num-beauty/currency';
import { formatNumber } from 'num-beauty/format';
import { abbreviateNumber } from 'num-beauty/abbreviate';
import { applyMask } from 'num-beauty/mask';
import { formatBytes } from 'num-beauty/bytes';
import { formatPercentage } from 'num-beauty/percentage';

// Example usage
console.log(round(1.235, 2, 'HALF_UP')); // "1.24"
console.log(formatCurrency(1234.56, 'en-US', { currency: 'USD' })); // "$1,234.56"
console.log(formatBytes(1048576)); // "1.00 MiB"
console.log(formatPercentage(0.5)); // "50.00%"
```

This approach ensures you only include the code you actually use, resulting in smaller bundle sizes.

## Quick Guide

```typescript
import { beautify } from 'num-beauty';

// Basic formatting
console.log(beautify(1234.5678)); // "1,234.57"

// Large numbers
console.log(beautify(1234567.89)); // "1,234,567.89"
console.log(beautify(1234567.89, { abbreviated: true })); // "1.23M"

// Different locales (load before use)
(async () => {
  await loadLocale('pt-BR');
  console.log(beautify(1234567.89, { locale: 'pt-BR' })); // "1.234.567,89"
  console.log(beautify(1234567.89, { locale: 'pt-BR', abbreviated: true })); // "1,23 mi"
})();

// Custom decimal precision
console.log(beautify(1234.56789, { decimals: 4 })); // "1,234.5679"
console.log(beautify(1234.56700, { decimals: 4, stripZeros: true })); // "1,234.567"

// Negative numbers
console.log(beautify(-1234567.89)); // "-1,234,567.89"
console.log(beautify(-1234567.89, { abbreviated: true })); // "-1.23M"

// Small numbers
console.log(beautify(0.00123456, { decimals: 4 })); // "0.0012"

// Scientific notation (automatically converted)
console.log(beautify(1.23e7)); // "12,300,000.00"
console.log(beautify(1.23e7, { abbreviated: true })); // "12.30M"

// Stripping unnecessary zeros
console.log(beautify(1234.50000, { stripZeros: true })); // "1,234.5"

// Different rounding modes
console.log(beautify(1.235, { decimals: 2, roundingMode: 'UP' })); // "1.24"
console.log(beautify(1.235, { decimals: 2, roundingMode: 'DOWN' })); // "1.23"
console.log(beautify(1.235, { decimals: 2, roundingMode: 'CEIL' })); // "1.24"
console.log(beautify(1.235, { decimals: 2, roundingMode: 'FLOOR' })); // "1.23"
console.log(beautify(1.235, { decimals: 2, roundingMode: 'HALF_UP' })); // "1.24"
console.log(beautify(1.225, { decimals: 2, roundingMode: 'HALF_DOWN' })); // "1.22"
console.log(beautify(1.225, { decimals: 2, roundingMode: 'HALF_EVEN' })); // "1.22"

// Accessibility (screen-reader friendly)
import { toAccessibleString } from 'num-beauty';
console.log(toAccessibleString('1.2M', { locale: 'pt-BR' })); // "um ponto dois milhões"
console.log(toAccessibleString('R$ 12M', { locale: 'pt-BR' })); // "doze milhões de reais"
console.log(toAccessibleString('$1.5k', { locale: 'en-US' })); // "one point five thousand dollars"

// Reverse parsing (unbeautify) - convert formatted strings back to numbers
import { unbeautify } from 'num-beauty';
console.log(unbeautify('$1,234.56')); // 1234.56
console.log(unbeautify('R$ 1.234,56', { locale: 'pt-BR' })); // 1234.56
console.log(unbeautify('1.5k')); // 1500
console.log(unbeautify('2.3M')); // 2300000
console.log(unbeautify('45.5%')); // 0.455
console.log(unbeautify('1.5 KB')); // 1536
console.log(unbeautify('(1,234.56)')); // -1234.56 (accounting format)

// Structured formatting (beautifyToParts) - decompose numbers into parts for granular styling
import { beautifyToParts } from 'num-beauty';
console.log(beautifyToParts(1234.56, { locale: 'en-US' }));
// [
//   { type: 'integer', value: '1,234' },
//   { type: 'decimal', value: '.' },
//   { type: 'fraction', value: '56' }
// ]

console.log(beautifyToParts(1234.56, { locale: 'pt-BR', currency: 'BRL' }));
// [
//   { type: 'currency', value: 'R$' },
//   { type: 'integer', value: '1.234' },
//   { type: 'decimal', value: ',' },
//   { type: 'fraction', value: '56' }
// ]
```

## Fluent API (Builder Pattern)

`num-beauty` provides a fluent API for method chaining, making it easy to build complex formatting operations:

```typescript
import { Num, num } from 'num-beauty';

// Basic formatting
num(1234.56).locale('pt-BR').format(); // "1.234,56"
num(1234.56789).decimals(3).format(); // "1,234.568"
num(1234.50).stripZeros().format(); // "1,234.5"

// Currency formatting
num(1234.56).locale('en-US').currency('USD').format(); // "$1,234.56"
num(1234.56).locale('pt-BR').currency('BRL').format(); // "R$ 1.234,56"
num(1234.56).currency('USD').showCode().format(); // "USD 1,234.56"
num(1234.56).currency('USD').hideSymbol().format(); // "1,234.56"

// Bytes formatting
num(1048576).bytes().format(); // "1.00 MiB"
num(1000000).bytes(false).format(); // "1.00 MB"
num(1048576).bytes().bytesLongFormat().format(); // "1.00 Mebibyte"
num(1536).bytes().decimals(1).stripZeros().format(); // "1.5 KiB"

// Percentage formatting
num(0.5).percentage().format(); // "50.00%"
num(50).percentage(false).format(); // "50.00%"
num(0.5).percentage().percentageSpace().format(); // "50.00 %"
num(0.12345).percentage().decimals(3).format(); // "12.345%"

// Abbreviated numbers
num(1234).locale('en-US').abbreviated().format(); // "1.23k"
num(1234567).locale('pt-BR').decimals(2).abbreviated().format(); // "1,23 mi"
num(1000).locale('en-US').decimals(2).abbreviated().stripZeros().format(); // "1k"

// Mask formatting
num(12345678).mask('##.###.###').format(); // "12.345.678"
num(12345678901).locale('pt-BR').mask('cpf').format(); // "123.456.789-01"
num(12345678000190).locale('pt-BR').mask('cnpj').format(); // "12.345.678/0001-90"

// Complex method chaining
num(1234.5678)
  .locale('pt-BR')
  .decimals(3)
  .stripZeros()
  .format(); // "1.234,568"

num(1234.56)
  .locale('pt-BR')
  .currency('EUR')
  .decimals(3)
  .format(); // "1.234,560 €"

num(0.12345)
  .locale('pt-BR')
  .percentage()
  .decimals(1)
  .percentageSpace()
  .format(); // "12,3 %"

// Accessibility - screen reader friendly text
num(1200000).locale('pt-BR').decimals(1).abbreviated().toAccessible(); // "um ponto dois milhões"
num(1234).locale('pt-BR').currency('BRL').decimals(0).toAccessible(); // "mil duzentos e trinta e quatro de reais"
num(1500).locale('en-US').decimals(1).abbreviated().toAccessible(); // "one point five thousand"

// Parsing (reverse of formatting) - convert formatted strings back to numbers
Num.parse('$1,234.56'); // 1234.56
Num.parse('R$ 1.234,56', 'pt-BR'); // 1234.56
Num.parse('1.5k'); // 1500
Num.parse('2.3M'); // 2300000
Num.parse('45.5%'); // 0.455
Num.parse('1.5 KB'); // 1536

// Structured formatting (parts) - decompose formatted numbers for granular CSS styling
num(1234.56).locale('pt-BR').toParts();
// [
//   { type: 'integer', value: '1.234' },
//   { type: 'decimal', value: ',' },
//   { type: 'fraction', value: '56' }
// ]

num(1234.56).currency('USD').toParts();
// [
//   { type: 'currency', value: '$' },
//   { type: 'integer', value: '1,234' },
//   { type: 'decimal', value: '.' },
//   { type: 'fraction', value: '56' }
// ]

num(1500).abbreviated().toParts();
// [
//   { type: 'integer', value: '1' },
//   { type: 'decimal', value: '.' },
//   { type: 'fraction', value: '5' },
//   { type: 'unit', value: 'k' }
// ]

// Using constructor
new Num(1234.56).locale('pt-BR').format(); // "1.234,56"

// toString and valueOf
const numInstance = num(1234.56).locale('pt-BR');
numInstance.toString(); // "1.234,56"
numInstance.valueOf(); // 1234.56
String(numInstance); // "1.234,56"
Number(numInstance); // 1234.56
```

## Plugin System

`Num.extend()` enables third parties to bolt custom behavior onto the fluent API (wrappers, experimental formatters, telemetry hooks, etc.) without forking core.

- Register once per process: `Num.extend(plugin)` is idempotent.
- Plugins receive a safe context with helpers to read or patch the internal state, reuse the built-in services (`formatCurrency`, `round`, etc.) and spawn fresh instances via `createInstance`.
- TypeScript users can augment the `Num` interface to describe new chainable methods.

```ts
import { Num, num, type NumPlugin } from 'num-beauty';
import type { SupportedLocale } from 'num-beauty/locales';

declare module 'num-beauty' {
  interface Num {
    double(): this;
    forceLocale(locale: SupportedLocale, decimals?: number): this;
  }
}

const doublePlugin: NumPlugin = ({ Num, getState, patchState }) => {
  Num.prototype.double = function (this: Num) {
    const { value } = getState(this);
    patchState(this, { value: value * 2 });
    return this;
  };
};

const forceLocalePlugin: NumPlugin = ({ Num, patchState }) => {
  Num.prototype.forceLocale = function (this: Num, locale: SupportedLocale, decimals = 2) {
    patchState(this, { locale, decimals });
    return this;
  };
};

Num.extend(doublePlugin);
Num.extend(forceLocalePlugin);

num(21).double().valueOf(); // 42
num(1234.56).forceLocale('pt-BR', 3).format(); // "1.234,560"
```

`NumPluginContext` exposes:

- `Num`: the class/prototype you can augment.
- `createInstance(value)`: same behavior as `num(value)`.
- `services`: references such as `round`, `formatNumber`, `formatCurrency`, etc.
- `getState(instance)`: read-only snapshot of the fluent state (value, locale, decimals...).
- `patchState(instance, patch)`: atomically update the internal state without touching private fields.

Wrappers (React, Solid, server-side renderers) can now bundle their own helpers as small plugins instead of re-implementing the fluent internals.

## React Integration

`num-beauty` provides first-class React support with hooks and components for declarative number formatting:

```bash
# React is an optional peer dependency
npm install num-beauty react
```

### useNumBeauty Hook

```tsx
import { useNumBeauty } from 'num-beauty/react';

function PriceDisplay({ price }: { price: number }) {
  const { formatted, parts } = useNumBeauty(price, {
    locale: 'en-US',
    currency: 'USD',
  });
  
  return <span className="price">{formatted}</span>;
  // Output: $1,234.56
}

// With parts for granular styling
function StyledNumber({ value }: { value: number }) {
  const { parts } = useNumBeauty(value, { locale: 'pt-BR' });
  
  return (
    <span>
      {parts.map((part, i) => (
        <span key={i} className={`num-${part.type}`}>
          {part.value}
        </span>
      ))}
    </span>
  );
}
```

### NumDisplay Component

```tsx
import { NumDisplay } from 'num-beauty/react';

// Basic usage
<NumDisplay value={1234.56} locale="pt-BR" />
// Output: 1.234,56

// Currency formatting
<NumDisplay value={1234.56} currency="USD" />
// Output: $1,234.56

// Styled parts for CSS customization
<NumDisplay 
  value={1234.56} 
  currency="USD" 
  styled 
  className="price"
/>
// Output:
// <span class="price" role="text">
//   <span class="num-currency">$</span>
//   <span class="num-integer">1,234</span>
//   <span class="num-decimal">.</span>
//   <span class="num-fraction">56</span>
// </span>

// Custom rendering with renderPart
<NumDisplay
  value={1234.56}
  currency="EUR"
  styled
  renderPart={(part, i) => (
    <span
      key={i}
      className={`custom-${part.type}`}
      style={{
        color: part.type === 'currency' ? 'green' : 'inherit',
        fontWeight: part.type === 'integer' ? 'bold' : 'normal'
      }}
    >
      {part.value}
    </span>
  )}
/>

// Bytes, percentage, abbreviated
<NumDisplay value={1048576} bytes />
<NumDisplay value={0.5} percentage />
<NumDisplay value={1234567} abbreviated locale="pt-BR" />
```

### NumParts Component (Render Props)

```tsx
import { NumParts } from 'num-beauty/react';

<NumParts value={1234.56} currency="USD">
  {(part, index) => (
    <span 
      key={index} 
      className={`part-${part.type}`}
      style={{ 
        color: part.type === 'currency' ? 'green' : 'black' 
      }}
    >
      {part.value}
    </span>
  )}
</NumParts>

// With Framer Motion for animations
<NumParts value={count} abbreviated>
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
```

### Available Methods

- **`locale(code)`** - Set the locale for formatting
- **`decimals(n)`** - Set the number of decimal places
- **`abbreviated()`** - Enable number abbreviation (k, M, B, T)
- **`stripZeros()`** - Remove trailing zeros from decimals
- **`rounding(mode)`** - Set the rounding mode (UP, DOWN, CEIL, FLOOR, HALF_UP, HALF_DOWN, HALF_EVEN)
- **`mask(pattern)`** - Apply a mask pattern
- **`currency(code)`** - Format as currency
- **`hideSymbol()`** - Hide currency symbol
- **`showCode()`** - Show currency code instead of symbol
- **`bytes(binary)`** - Format as bytes (binary=true for 1024, false for 1000)
- **`bytesLongFormat()`** - Use long format for bytes (Megabytes instead of MB)
- **`percentage(multiply)`** - Format as percentage (multiply=true to multiply by 100)
- **`percentageSpace(addSpace)`** - Add space before % symbol
- **`toAccessible()`** - Convert formatted number to screen-reader friendly text
- **`format()`** - Execute formatting and return string
- **`toString()`** - Alias for format()
- **`valueOf()`** - Return the original numeric value
- **`Num.parse(input, locale)`** - Static method to parse formatted strings back to numbers

```typescript
// Predefined masks
console.log(beautify(123456789, { locale: 'en-US', mask: 'ssn' })); // "123-45-6789"
console.log(beautify(123456789, { locale: 'en-US', mask: 'ein' })); // "12-3456789"
console.log(beautify(12345, { locale: 'en-US', mask: 'zip' })); // "12345"
console.log(beautify(2345678901, { locale: 'en-US', mask: 'phone' })); // "+1 (234) 567-8901"

// Custom masks
console.log(beautify(123456, { mask: '##-##-##' })); // "12-34-56"
```

## Usage Examples

### Currency Formatting

```typescript
// US Dollar
beautify(1234.56, { locale: 'en-US', currency: 'USD' }) // "$1,234.56"

// Euro
beautify(1234.56, { locale: 'es-ES', currency: 'EUR' }) // "1.234,56 €"

// Brazilian Real
beautify(1234.56, { locale: 'pt-BR', currency: 'BRL' }) // "R$ 1.234,56"
```

### Bytes Formatting

```typescript
import { formatBytes } from 'num-beauty';

// Binary base (default - 1024)
formatBytes(1024) // "1.00 KiB"
formatBytes(1048576) // "1.00 MiB"
formatBytes(1073741824) // "1.00 GiB"

// Decimal base (1000)
formatBytes(1000, { binary: false }) // "1.00 KB"
formatBytes(1000000, { binary: false }) // "1.00 MB"

// Custom precision
formatBytes(1536, { decimals: 1 }) // "1.5 KiB"
formatBytes(1536, { decimals: 0 }) // "2 KiB"

// Strip zeros
formatBytes(2048, { stripZeros: true }) // "2 KiB"

// Long format
formatBytes(1024, { longFormat: true }) // "1.00 Kibibyte"
formatBytes(2048, { longFormat: true }) // "2.00 Kibibytes"

// Different locales
formatBytes(1536, { locale: 'pt-BR' }) // "1,50 KiB"
formatBytes(1536, { locale: 'es-ES' }) // "1,50 KiB"

// Real world examples
formatBytes(524288) // "512.00 KiB" (image file)
formatBytes(157286400, { decimals: 1 }) // "150.0 MiB" (video file)
formatBytes(5368709120, { decimals: 1 }) // "5.0 GiB" (large database)
```

### Percentage Formatting

```typescript
import { formatPercentage } from 'num-beauty';

// Basic formatting (multiplies by 100 by default)
formatPercentage(0.5) // "50.00%"
formatPercentage(0.25) // "25.00%"
formatPercentage(0.12345, { decimals: 1 }) // "12.3%"

// Without multiplication
formatPercentage(50, { multiply: false }) // "50.00%"
formatPercentage(12.5, { multiply: false }) // "12.50%"

// Custom precision
formatPercentage(0.5, { decimals: 0 }) // "50%"
formatPercentage(0.12345, { decimals: 3 }) // "12.345%"

// Strip zeros
formatPercentage(0.5, { stripZeros: true }) // "50%"
formatPercentage(0.125, { stripZeros: true }) // "12.5%"

// Different locales
formatPercentage(0.5, { locale: 'en-US' }) // "50.00%"
formatPercentage(0.5, { locale: 'pt-BR' }) // "50,00 %"
formatPercentage(0.5, { locale: 'es-ES' }) // "50,00 %"

// Custom spacing
formatPercentage(0.5, { addSpace: true }) // "50.00 %"
formatPercentage(0.5, { locale: 'pt-BR', addSpace: false }) // "50,00%"

// Real world examples
formatPercentage(0.0525, { decimals: 2 }) // "5.25%" (interest rate)
formatPercentage(0.15, { decimals: 0 }) // "15%" (tax rate)
formatPercentage(0.30, { stripZeros: true }) // "30%" (discount)
formatPercentage(-0.05, { decimals: 1 }) // "-5.0%" (loss)
```

### Dynamic Locale Registration

You can register custom locales or override existing ones at runtime:

```typescript
import { registerLocale, hasLocale, getRegisteredLocales, beautify } from 'num-beauty';

// Check if a locale exists
hasLocale('ja-JP') // false

// Register Japanese locale
registerLocale('ja-JP', {
  masks: {
    phone: '###-####-####',
    postal: '###-####'
  },
  currencies: {
    JPY: { symbol: '¥', position: 'before' }
  },
  units: [
    ['', ''],
    ['千', '千'],  // thousand
    ['万', '万'],  // ten thousand
    ['億', '億']   // hundred million
  ]
});

// Use the registered locale
beautify(1234567, { locale: 'ja-JP' }) // "1,234,567"
formatCurrency(50000, 'ja-JP', { currency: 'JPY' }) // "¥ 50,000.00"
beautify(1000000, { locale: 'ja-JP', abbreviated: true }) // "1 万"

// Override existing locale
registerLocale('en-US', {
  units: [
    ['', ''],
    ['thousand', 'thousand'],
    ['million', 'million'],
    ['billion', 'billion']
  ]
});

beautify(1000, { locale: 'en-US', abbreviated: true }) // "1thousand"

// List all registered locales
getRegisteredLocales() // ['en-US', 'pt-BR', 'es-ES', 'de-DE', 'fr-FR', 'ja-JP']
### Lazy Loading (On-Demand Locales)

By default, all built-in locales are registered at initialization for backward compatibility. For applications that need to optimize initial bundle size or load locales on-demand (e.g., based on user preferences), `num-beauty` provides a lazy loading system:

```typescript
import { loadLocale, isLocaleLoaded, preloadLocales, registerLocaleLoader } from 'num-beauty/locales/loader';
import { formatCurrency } from 'num-beauty';

// Check if a locale is loaded
isLocaleLoaded('pt-BR') // true (built-in locales are pre-registered)

// Load a locale dynamically (useful for custom locales)
await loadLocale('pt-BR');
formatCurrency(1234.56, 'pt-BR', { currency: 'BRL' }) // "R$ 1.234,56"

// Preload multiple locales in parallel
await preloadLocales(['es-ES', 'de-DE', 'fr-FR']);

// Register a custom locale loader
registerLocaleLoader('it-IT', async () => ({
  locale: {
    masks: {},
    currencies: {
      EUR: { symbol: '€', position: 'after' }
    },
    units: [
      ['k', 'k'],
      ['M', 'M'],
      ['mld', 'mld'], // billions in Italian
      ['bln', 'bln']  // trillions in Italian
    ]
  }
}));

// Load and use the custom locale
await loadLocale('it-IT');
formatCurrency(1234.56, 'it-IT', { currency: 'EUR' }) // "1.234,56 €"
```

**Benefits of Lazy Loading:**

- **Reduced Initial Bundle**: Only core functionality is bundled initially (~6.67 KB gzipped for full library)
- **On-Demand Loading**: Locales loaded only when needed (366-483 B gzipped per locale)
- **Custom Locales**: Register and load locales from external sources without bundling
- **React Integration**: Works seamlessly with React components and hooks


**React Example:**

```typescript
import { loadLocale } from 'num-beauty/locales/loader';
import { useNumBeauty } from 'num-beauty/react';
import { useEffect, useState } from 'react';

function CurrencyDisplay({ amount }: { amount: number }) {
  const [locale, setLocale] = useState('en-US');
  const { formatCurrency } = useNumBeauty();
  
  // Load locale when user changes preference
  useEffect(() => {
    loadLocale(locale).catch(console.error);
  }, [locale]);
  
  return (
    <div>
      <select onChange={(e) => setLocale(e.target.value)}>
        <option value="en-US">English (US)</option>
        <option value="pt-BR">Português (BR)</option>
        <option value="es-ES">Español</option>
      </select>
      <p>{formatCurrency(amount, locale, { currency: 'USD' })}</p>
    </div>
  );
}
```

### Abbreviations by Locale

```typescript
const number = 1234567.89;

// en-US
beautify(number, { locale: 'en-US', abbreviated: true }) // "1.23M"

// pt-BR
beautify(number, { locale: 'pt-BR', abbreviated: true }) // "1,23 mi"

// es-ES
beautify(number, { locale: 'es-ES', abbreviated: true }) // "1,23M"

// de-DE
beautify(number, { locale: 'de-DE', abbreviated: true }) // "1,23 Mio."

// fr-FR
beautify(number, { locale: 'fr-FR', abbreviated: true }) // "1,23 M"
```

### Advanced Masks

```typescript
// Custom mask with prefix
beautify(123456, { mask: 'ID: ###-###' }) // "ID: 123-456"

// Credit card with masking
beautify(1234567890123456, { mask: '**** **** **** ####' }) // "**** **** **** 3456"

// Product code formatting
beautify(123456789, { mask: 'PRD-####-####-#' }) // "PRD-1234-5678-9"
```

### Special Cases

```typescript
// Very small numbers
beautify(0.00001234, { decimals: 6 }) // "0.000012"

// Scientific notation
beautify(1.23e7, { abbreviated: true }) // "12.30M"

// Zero padding
beautify(1.2, { decimals: 3, stripZeros: false }) // "1.200"
```

## Options

- `locale`: String (default: 'en-US') - The locale to use for formatting
- `decimals`: Number (default: 2) - Number of decimal places
- `abbreviated`: Boolean (default: false) - Whether to use abbreviated format
- `stripZeros`: Boolean (default: false) - Remove unnecessary zeros from decimal part
- `roundingMode`: String (default: 'HALF_UP') - Rounding mode to use
- `mask`: String | PredefinedMask - Formatting mask to apply

### Predefined Masks by Locale (examples)

#### American English (en-US)

- `ssn` - Social Security Number: ###-##-####
- `ein` - Employer ID Number: ##-#######
- `zip` - ZIP Code: #####
- `phone` - Phone: (###) ###-####
- `tax-id` - Tax ID (SSN): ###-##-####

#### Brazilian Portuguese (pt-BR)

- `cpf` - CPF: ###.###.###-##
- `cnpj` - CNPJ: ##.###.###/####-##
- `cep` - CEP: #####-###
- `phone` - Phone: (##) #####-####
- `tax-id` - Tax ID (CPF): ###.###.###-##

#### Spanish (es-ES)

- `nif` - NIF: ########-#
- `nie` - NIE: #-########
- `phone` - Phone: (###) ### ###

You can also create custom masks using the `#` character as a digit placeholder.

### Rounding Modes

- `UP` - Rounds away from zero
- `DOWN` - Rounds toward zero
- `CEIL` - Rounds toward positive infinity
- `FLOOR` - Rounds toward negative infinity
- `HALF_UP` - Rounds to nearest, ties away from zero
- `HALF_DOWN` - Rounds to nearest, ties toward zero
- `HALF_EVEN` - Rounds to nearest, ties to even neighbor

## Formats by Locale

### American English (en-US) — formats

- **Separators:**
  - Decimal: period (.)
  - Thousands: comma (,)
- **Abbreviations:** k, m, b, t
- **Masks:**
  - SSN: `123-45-6789`
  - EIN: `12-3456789`
  - ZIP: `12345`
  - Phone: `+1 (234) 567-8901`
  - Credit Card: `1234 5678 9012 3456`

### Brazilian Portuguese (pt-BR) — formats

- **Separators:**
  - Decimal: comma (,)
  - Thousands: period (.)
- **Abbreviations:** mil, mi, bi, tri
- **Masks:**
  - CPF: `123.456.789-01`
  - CNPJ: `12.345.678/0001-99`
  - CEP: `12345-678`
  - Phone: `(11) 99999-8888`
  - Credit Card: `1234 5678 9012 3456`

### Spanish (es-ES) — formats

- **Separators:**
  - Decimal: comma (,)
  - Thousands: period (.)
- **Abbreviations:** mil, M, MM, B

## Runtime Compatibility

`num-beauty` is tested and guaranteed to work across multiple JavaScript runtimes:

| Runtime | Versions | Status |
|---------|----------|--------|
| Node.js | 18.x, 20.x, 22.x | ✅ Fully Supported |
| Deno | 1.x, 2.x | ✅ Fully Supported |
| Bun | latest | ✅ Fully Supported |
| Browsers | Modern (ES2020+) | ✅ Fully Supported |

### Testing Locally

```bash
# Test with Node.js
npm run test:runtime

# Test with all runtimes (requires Deno and Bun installed)
npm run test:runtime:all

# Test with Deno
deno run --allow-read tests/runtime/test-runtime.mjs

# Test with Bun
bun tests/runtime/test-runtime.mjs
```

See [tests/runtime/README.md](tests/runtime/README.md) for more details.

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/MyFeature`)
3. Commit your changes (`git commit -am 'Adding a feature'`)
4. Push to the branch (`git push origin feature/MyFeature`)
5. Create a Pull Request

## License

MIT
