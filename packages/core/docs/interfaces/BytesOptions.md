[**num-beauty v1.0.0**](../README.md)

***

[num-beauty](../globals.md) / BytesOptions

# Interface: BytesOptions

Defined in: services/bytes.service.ts:3

## Properties

### binary?

> `optional` **binary**: `boolean`

Defined in: services/bytes.service.ts:8

Use binary base (1024) instead of decimal base (1000)

#### Default

```ts
true
```

***

### decimals?

> `optional` **decimals**: `number`

Defined in: services/bytes.service.ts:14

Number of decimal places

#### Default

```ts
2
```

***

### locale?

> `optional` **locale**: `string`

Defined in: services/bytes.service.ts:26

Locale for number formatting

#### Default

```ts
'en-US'
```

***

### longFormat?

> `optional` **longFormat**: `boolean`

Defined in: services/bytes.service.ts:32

Use long format (e.g., "Megabytes" instead of "MB")

#### Default

```ts
false
```

***

### stripZeros?

> `optional` **stripZeros**: `boolean`

Defined in: services/bytes.service.ts:20

Strip trailing zeros from decimal part

#### Default

```ts
false
```
