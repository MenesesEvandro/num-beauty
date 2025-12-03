[**num-beauty v1.0.0**](../README.md)

***

[num-beauty](../globals.md) / NumBeautyOptions

# Interface: NumBeautyOptions

Defined in: [index.ts:57](https://github.com/MenesesEvandro/num-beauty/blob/9ca3f685ba4c93d005c9079de2408bd2b22182ce/src/index.ts#L57)

Formatting options for the beautify function

 NumBeautyOptions

## Example

```typescript
// Basic formatting
beautify(1234.5678) // '1,234.57'

// Different locale
beautify(1234.5678, { locale: 'pt-BR' }) // '1.234,57'

// Abbreviated number
beautify(1234567, { abbreviated: true }) // '1.23M'

// With mask
beautify(123456789, { mask: 'ssn' }) // '123-45-6789'
```

## Properties

### abbreviated?

> `optional` **abbreviated**: `boolean`

Defined in: [index.ts:60](https://github.com/MenesesEvandro/num-beauty/blob/9ca3f685ba4c93d005c9079de2408bd2b22182ce/src/index.ts#L60)

If true, abbreviates large numbers (e.g., 1k, 1M).
Default: false

***

### decimals?

> `optional` **decimals**: `number`

Defined in: [index.ts:59](https://github.com/MenesesEvandro/num-beauty/blob/9ca3f685ba4c93d005c9079de2408bd2b22182ce/src/index.ts#L59)

Number of decimal places to display.
Default: 2

***

### locale?

> `optional` **locale**: `string`

Defined in: [index.ts:58](https://github.com/MenesesEvandro/num-beauty/blob/9ca3f685ba4c93d005c9079de2408bd2b22182ce/src/index.ts#L58)

The locale to use for formatting (e.g., 'en-US', 'pt-BR', 'es-ES').
Default: 'en-US'

***

### mask?

> `optional` **mask**: `string`

Defined in: [index.ts:63](https://github.com/MenesesEvandro/num-beauty/blob/9ca3f685ba4c93d005c9079de2408bd2b22182ce/src/index.ts#L63)

Mask to apply (e.g., 'ssn', 'phone', 'credit-card').
Available masks depend on the selected locale.

***

### roundingMode?

> `optional` **roundingMode**: [`RoundingMode`](../type-aliases/RoundingMode.md)

Defined in: [index.ts:62](https://github.com/MenesesEvandro/num-beauty/blob/9ca3f685ba4c93d005c9079de2408bd2b22182ce/src/index.ts#L62)

Rounding mode to use ('UP', 'DOWN', 'CEIL', 'FLOOR', 'HALF_UP', 'HALF_DOWN', 'HALF_EVEN').
Default: 'HALF_EVEN'

***

### stripZeros?

> `optional` **stripZeros**: `boolean`

Defined in: [index.ts:61](https://github.com/MenesesEvandro/num-beauty/blob/9ca3f685ba4c93d005c9079de2408bd2b22182ce/src/index.ts#L61)

If true, removes trailing zeros from decimal part.
Default: false
