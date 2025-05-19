# num-beauty

An ultra lightweight module for formatting numbers into human-friendly strings. Features:

- ✨ Basic number formatting with thousands and decimal separators
- 🌎 Internationalization (en-US, pt-BR, es-ES)
- 📏 Custom decimal precision
- 🔄 Multiple rounding modes
- 🎭 Predefined and custom masks per locale
- 🔤 Large number abbreviation (1,234,567 → 1.23M)

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

### Abbreviations by Locale
```typescript
const number = 1234567.89;

// en-US
beautify(number, { locale: 'en-US', abbreviated: true }) // "1.23M"

// pt-BR
beautify(number, { locale: 'pt-BR', abbreviated: true }) // "1,23 mi"

// es-ES
beautify(number, { locale: 'es-ES', abbreviated: true }) // "1,23M"
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
