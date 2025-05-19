[**num-beauty v0.1.0**](../README.md)

***

[num-beauty](../globals.md) / beautify

# Function: beautify()

> **beautify**(`number`, `options?`): `string`

Defined in: index.ts:78

Formats a number according to the specified locale's standards

## Parameters

### number

`number`

The number to format

### options?

`NumBeautyOptions` = `{}`

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
