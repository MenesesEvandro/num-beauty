[**num-beauty v1.0.0**](../README.md)

***

[num-beauty](../globals.md) / beautify

# Function: beautify()

> **beautify**(`number`, `options?`): `string`

Defined in: [index.ts:89](https://github.com/MenesesEvandro/num-beauty/blob/9ca3f685ba4c93d005c9079de2408bd2b22182ce/src/index.ts#L89)

Formats a number according to the specified locale's standards

## Parameters

### number

`number`

The number to format

### options?

[`NumBeautyOptions`](../interfaces/NumBeautyOptions.md) = `{}`

Formatting options

## Returns

`string`

The formatted number as a string

## Throws

If the specified mask doesn't exist for the locale

## Throws

If the specified currency is not supported for the locale

## Example

```typescript
// Basic formatting
beautify(1234.5678) // '1,234.57'

// With custom options
beautify(1234.5678, {
  locale: 'pt-BR',
  decimals: 3,
  stripZeros: true
}) // '1.234,568'
```
