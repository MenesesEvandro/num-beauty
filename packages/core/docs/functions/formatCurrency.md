[**num-beauty v1.0.0**](../README.md)

***

[num-beauty](../globals.md) / formatCurrency

# Function: formatCurrency()

> **formatCurrency**(`value`, `locale`, `options`): `string`

Defined in: [services/currency.service.ts:45](https://github.com/MenesesEvandro/num-beauty/blob/9ca3f685ba4c93d005c9079de2408bd2b22182ce/src/services/currency.service.ts#L45)

Formats a number as a currency value

## Parameters

### value

`number`

Value to be formatted

### locale

`string`

Locale to use

### options

[`CurrencyOptions`](../interfaces/CurrencyOptions.md)

Formatting options

## Returns

`string`

## Example

```ts
formatCurrency(1234.56, 'pt-BR', { currency: 'BRL' }) // 'R$ 1.234,56'
formatCurrency(1234.56, 'en-US', { currency: 'USD' }) // '$1,234.56'
formatCurrency(1234.56, 'es-ES', { currency: 'EUR' }) // '1.234,56 €'
```
