[**num-beauty v1.0.0**](../README.md)

***

[num-beauty](../globals.md) / applyMask

# Function: applyMask()

> **applyMask**(`value`, `pattern`): `string`

Defined in: [services/mask.service.ts:47](https://github.com/MenesesEvandro/num-beauty/blob/9ca3f685ba4c93d005c9079de2408bd2b22182ce/src/services/mask.service.ts#L47)

Aplica uma máscara a um número ou string

## Parameters

### value

O valor a ser mascarado

`string` | `number`

### pattern

`string`

O padrão da máscara usando # como placeholder para dígitos

## Returns

`string`

A string formatada de acordo com a máscara

## Throws

Se o valor ou padrão forem inválidos

## Example

```ts
applyMask(12345678901, '###.###.###-##') // '123.456.789-01'
applyMask('12345', '#####-###') // '12345'
```
