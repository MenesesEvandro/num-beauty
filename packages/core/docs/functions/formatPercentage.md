[**num-beauty v1.0.0**](../README.md)

***

[num-beauty](../globals.md) / formatPercentage

# Function: formatPercentage()

> **formatPercentage**(`value`, `options`): `string`

Defined in: services/percentage.service.ts:54

Formats a number as a percentage

## Parameters

### value

`number`

Value to be formatted

### options

[`PercentageOptions`](../interfaces/PercentageOptions.md) = `{}`

Formatting options

## Returns

`string`

Formatted percentage string

## Example

```ts
formatPercentage(0.5) // "50.00%"
formatPercentage(0.5, { decimals: 0 }) // "50%"
formatPercentage(50, { multiply: false }) // "50.00%"
formatPercentage(0.12345, { decimals: 1 }) // "12.3%"
formatPercentage(0.5, { locale: 'pt-BR' }) // "50,00%"
formatPercentage(0.5, { locale: 'pt-BR', addSpace: true }) // "50,00 %"
```
