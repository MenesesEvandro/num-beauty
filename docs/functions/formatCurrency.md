[**num-beauty v0.1.0**](../README.md)

***

[num-beauty](../globals.md) / formatCurrency

# Function: formatCurrency()

> **formatCurrency**(`value`, `locale`, `options`): `string`

Defined in: services/currency.service.ts:45

Formats a number as a currency value

## Parameters

### value

`number`

Value to be formatted

### locale

`SupportedLocale`

Locale to use

### options

`CurrencyOptions`

Formatting options

## Returns

`string`

## Example

```ts
formatCurrency(1234.56, 'pt-BR', { currency: 'BRL' }) // 'R$ 1.234,56'
formatCurrency(1234.56, 'en-US', { currency: 'USD' }) // '$1,234.56'
formatCurrency(1234.56, 'es-ES', { currency: 'EUR' }) // '1.234,56 €'
```
