[**num-beauty v1.0.0**](../README.md)

***

[num-beauty](../globals.md) / toAccessibleString

# Function: toAccessibleString()

> **toAccessibleString**(`input`, `options`): `string`

Defined in: services/accessibility.service.ts:16

Converts a formatted number into a screen-reader friendly spoken string

## Parameters

### input

`string` | `number`

### options

[`AccessibleOptions`](../interfaces/AccessibleOptions.md) = `{}`

## Returns

`string`

## Example

```ts
toAccessibleString('1.2M', { locale: 'pt-BR' }) // 'um ponto dois milhões'
toAccessibleString('123M', { locale: 'pt-BR' }) // 'cento e vinte e três milhões'
toAccessibleString('R$ 12M', { locale: 'pt-BR' }) // 'doze milhões de reais'
toAccessibleString('$1.5k', { locale: 'en-US' }) // 'one point five thousand dollars'
```
