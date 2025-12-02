[**num-beauty v1.0.0**](../README.md)

***

[num-beauty](../globals.md) / round

# Function: round()

> **round**(`num`, `decimals`, `mode`): `number`

Defined in: [services/rounding.service.ts:26](https://github.com/MenesesEvandro/num-beauty/blob/9ca3f685ba4c93d005c9079de2408bd2b22182ce/src/services/rounding.service.ts#L26)

Rounds a number using the specified mode

## Parameters

### num

`number`

The number to round

### decimals

`number`

Number of decimal places

### mode

[`RoundingMode`](../type-aliases/RoundingMode.md) = `'HALF_UP'`

Rounding mode

## Returns

`number`

The rounded number

## Throws

If the parameters are invalid

## Example

```ts
round(1.235, 2, 'HALF_UP') // 1.24
round(1.225, 2, 'HALF_EVEN') // 1.22
```
