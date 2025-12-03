[**num-beauty v1.0.0**](../README.md)

***

[num-beauty](../globals.md) / formatBytes

# Function: formatBytes()

> **formatBytes**(`bytes`, `options`): `string`

Defined in: services/bytes.service.ts:72

Formats a number as a data size (bytes)

## Parameters

### bytes

`number`

Size in bytes to be formatted

### options

[`BytesOptions`](../interfaces/BytesOptions.md) = `{}`

Formatting options

## Returns

`string`

Formatted string with appropriate unit

## Example

```ts
formatBytes(1024) // "1 KiB"
formatBytes(1024, { binary: false }) // "1.02 KB"
formatBytes(1536, { decimals: 1 }) // "1.5 KiB"
formatBytes(1048576) // "1 MiB"
formatBytes(1048576, { longFormat: true }) // "1 Mebibyte"
formatBytes(0) // "0 B"
```
