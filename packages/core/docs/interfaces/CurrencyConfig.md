[**num-beauty v1.0.0**](../README.md)

***

[num-beauty](../globals.md) / CurrencyConfig

# Interface: CurrencyConfig

Defined in: [locales/index.ts:31](https://github.com/MenesesEvandro/num-beauty/blob/9ca3f685ba4c93d005c9079de2408bd2b22182ce/src/locales/index.ts#L31)

Currency configuration for a specific locale

 CurrencyConfig

## Example

```typescript
// US Dollar configuration
const USD: CurrencyConfig = {
  symbol: '$',
  position: 'before'  // $1,234.56
}

// Euro configuration
const EUR: CurrencyConfig = {
  symbol: '€',
  position: 'after'   // 1.234,56 €
}
```

## Properties

### position

> **position**: `"before"` \| `"after"`

Defined in: [locales/index.ts:33](https://github.com/MenesesEvandro/num-beauty/blob/9ca3f685ba4c93d005c9079de2408bd2b22182ce/src/locales/index.ts#L33)

Position of the symbol relative to the number

***

### symbol

> **symbol**: `string`

Defined in: [locales/index.ts:32](https://github.com/MenesesEvandro/num-beauty/blob/9ca3f685ba4c93d005c9079de2408bd2b22182ce/src/locales/index.ts#L32)

Currency symbol (e.g., '$', '€', '£')
