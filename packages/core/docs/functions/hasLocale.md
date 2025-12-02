[**num-beauty v1.0.0**](../README.md)

***

[num-beauty](../globals.md) / hasLocale

# Function: hasLocale()

> **hasLocale**(`code`): `boolean`

Defined in: [locales/index.ts:249](https://github.com/MenesesEvandro/num-beauty/blob/9ca3f685ba4c93d005c9079de2408bd2b22182ce/src/locales/index.ts#L249)

Check if a locale is registered

## Parameters

### code

`string`

Locale code to check

## Returns

`boolean`

True if the locale is registered

## Example

```typescript
if (!hasLocale('ja-JP')) {
  registerLocale('ja-JP', { ... });
}
```
