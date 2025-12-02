[**num-beauty v1.0.0**](../README.md)

***

[num-beauty](../globals.md) / Num

# Class: Num

Defined in: fluent.ts:44

Fluent API for number formatting with method chaining

## Example

```typescript
import { Num } from 'num-beauty';

// Basic formatting
Num(1234.56).locale('pt-BR').format() // "1.234,56"

// Currency formatting
Num(1234.56).locale('en-US').currency('USD').format() // "$1,234.56"

// Abbreviated numbers
Num(1234567).locale('pt-BR').abbreviated().format() // "1,23 mi"

// Percentage formatting
Num(0.5).percentage().format() // "50.00%"

// Bytes formatting
Num(1048576).bytes().format() // "1.00 MiB"

// Accessibility (screen readers)
Num(1200000).locale('pt-BR').abbreviated().toAccessible() // "um ponto dois milhões"

// Method chaining
Num(1234.5678)
  .locale('pt-BR')
  .decimals(3)
  .stripZeros()
  .format() // "1.234,568"
```

## Constructors

### Constructor

> **new Num**(`value`): `Num`

Defined in: fluent.ts:66

Creates a new Num instance

#### Parameters

##### value

`number`

The number to format

#### Returns

`Num`

## Methods

### abbreviated()

> **abbreviated**(): `this`

Defined in: fluent.ts:94

Enable number abbreviation (e.g., 1k, 1M)

#### Returns

`this`

This instance for chaining

***

### bytes()

> **bytes**(`binary`): `this`

Defined in: fluent.ts:161

Format as bytes (e.g., KiB, MiB, GiB)

#### Parameters

##### binary

`boolean` = `true`

Use binary base (1024) instead of decimal (1000)

#### Returns

`this`

This instance for chaining

***

### bytesLongFormat()

> **bytesLongFormat**(): `this`

Defined in: fluent.ts:171

Use long format for bytes (e.g., "Megabytes" instead of "MB")

#### Returns

`this`

This instance for chaining

***

### currency()

> **currency**(`code`): `this`

Defined in: fluent.ts:133

Format as currency

#### Parameters

##### code

`string`

Currency code (e.g., 'USD', 'EUR', 'BRL')

#### Returns

`this`

This instance for chaining

***

### decimals()

> **decimals**(`decimals`): `this`

Defined in: fluent.ts:85

Set the number of decimal places

#### Parameters

##### decimals

`number`

Number of decimal places

#### Returns

`this`

This instance for chaining

***

### format()

> **format**(): `string`

Defined in: fluent.ts:201

Format the number according to the configured options

#### Returns

`string`

Formatted string

***

### hideSymbol()

> **hideSymbol**(): `this`

Defined in: fluent.ts:142

Hide currency symbol

#### Returns

`this`

This instance for chaining

***

### locale()

> **locale**(`locale`): `this`

Defined in: fluent.ts:75

Set the locale for formatting

#### Parameters

##### locale

`string`

Locale code (e.g., 'en-US', 'pt-BR', 'es-ES')

#### Returns

`this`

This instance for chaining

***

### mask()

> **mask**(`mask`): `this`

Defined in: fluent.ts:123

Apply a mask to the number

#### Parameters

##### mask

`string`

Mask pattern or predefined mask name

#### Returns

`this`

This instance for chaining

***

### percentage()

> **percentage**(`multiply`): `this`

Defined in: fluent.ts:181

Format as percentage

#### Parameters

##### multiply

`boolean` = `true`

Automatically multiply by 100

#### Returns

`this`

This instance for chaining

***

### percentageSpace()

> **percentageSpace**(`addSpace`): `this`

Defined in: fluent.ts:192

Add space before percentage symbol

#### Parameters

##### addSpace

`boolean` = `true`

Whether to add space

#### Returns

`this`

This instance for chaining

***

### rounding()

> **rounding**(`mode`): `this`

Defined in: fluent.ts:113

Set the rounding mode

#### Parameters

##### mode

[`RoundingMode`](../type-aliases/RoundingMode.md)

Rounding mode

#### Returns

`this`

This instance for chaining

***

### showCode()

> **showCode**(): `this`

Defined in: fluent.ts:151

Show currency code instead of symbol

#### Returns

`this`

This instance for chaining

***

### stripZeros()

> **stripZeros**(): `this`

Defined in: fluent.ts:103

Enable stripping of trailing zeros

#### Returns

`this`

This instance for chaining

***

### toAccessible()

> **toAccessible**(): `string`

Defined in: fluent.ts:289

Convert the formatted number to screen-reader friendly text

#### Returns

`string`

Accessible string representation

#### Example

```typescript
Num(1200000).locale('pt-BR').abbreviated().toAccessible()
// "um ponto dois milhões"

Num(12000000).locale('pt-BR').currency('BRL').abbreviated().toAccessible()
// "doze milhões de reais"

Num(1500).locale('en-US').abbreviated().toAccessible()
// "one point five thousand"
```

***

### toString()

> **toString**(): `string`

Defined in: fluent.ts:261

Alias for format() - returns formatted string

#### Returns

`string`

Formatted string

***

### valueOf()

> **valueOf**(): `number`

Defined in: fluent.ts:269

Returns the original numeric value

#### Returns

`number`

The numeric value
