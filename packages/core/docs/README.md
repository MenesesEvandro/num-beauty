**num-beauty v1.0.0**

***

# num-beauty

An ultra lightweight module for formatting numbers into human-friendly strings. Features:

- ✨ Basic number formatting with thousands and decimal separators
- 🌎 Internationalization (en-US, pt-BR, es-ES, de-DE, fr-FR)
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

// Different locales
console.log(beautify(1234567.89, { locale: 'pt-BR' })); // "1.234.567,89"
console.log(beautify(1234567.89, { locale: 'pt-BR', abbreviated: true })); // "1,23 mi"

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

// Using constructor
new Num(1234.56).locale('pt-BR').format(); // "1.234,56"

// toString and valueOf
const numInstance = num(1234.56).locale('pt-BR');
numInstance.toString(); // "1.234,56"
numInstance.valueOf(); // 1234.56
String(numInstance); // "1.234,56"
Number(numInstance); // 1234.56
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
- **`format()`** - Execute formatting and return string
- **`toString()`** - Alias for format()
- **`valueOf()`** - Return the original numeric value

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

### American English (en-US)
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

### Brazilian Portuguese (pt-BR)
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

### Spanish (es-ES)
- **Separators:**
  - Decimal: comma (,)
  - Thousands: period (.)
- **Abbreviations:** mil, M, MM, B

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/MyFeature`)
3. Commit your changes (`git commit -am 'Adding a feature'`)
4. Push to the branch (`git push origin feature/MyFeature`)
5. Create a Pull Request

## License

MIT
