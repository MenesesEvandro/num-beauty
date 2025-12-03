[**num-beauty v1.0.0**](../README.md)

***

[num-beauty](../globals.md) / PercentageOptions

# Interface: PercentageOptions

Defined in: services/percentage.service.ts:3

## Properties

### addSpace?

> `optional` **addSpace**: `boolean`

Defined in: services/percentage.service.ts:35

Add space between number and percentage symbol

#### Default

```ts
false for en-US, true for pt-BR and es-ES
```

***

### decimals?

> `optional` **decimals**: `number`

Defined in: services/percentage.service.ts:17

Number of decimal places

#### Default

```ts
2
```

***

### locale?

> `optional` **locale**: `string`

Defined in: services/percentage.service.ts:29

Locale for number formatting

#### Default

```ts
'en-US'
```

***

### multiply?

> `optional` **multiply**: `boolean`

Defined in: services/percentage.service.ts:11

Multiply the value by 100 before formatting

#### Default

```ts
true
```

#### Example

```ts
formatPercentage(0.5, { multiply: true }) // "50%"
formatPercentage(50, { multiply: false }) // "50%"
```

***

### stripZeros?

> `optional` **stripZeros**: `boolean`

Defined in: services/percentage.service.ts:23

Strip trailing zeros from decimal part

#### Default

```ts
false
```
