# Formatting

The core of Num-Beauty is the `beautify` function.

## Signature

```typescript
function beautify(number: number | bigint, options?: NumBeautyOptions): string
```

## Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `locale` | `string` | `'en-US'` | The locale to use (e.g., 'pt-BR'). |
| `decimals` | `number` | `2` | Number of decimal places. |
| `currency` | `string` | `undefined` | Currency code (e.g., 'USD'). |
| `abbreviated` | `boolean` | `false` | Abbreviate large numbers (1k, 1M). |
| `stripZeros` | `boolean` | `false` | Remove trailing zeros. |
| `mask` | `string` | `undefined` | Apply a mask (e.g., 'phone'). |

## Examples

### Decimals

```typescript
beautify(123.456, { decimals: 1 }); // "123.5"
```

### Locales

```typescript
beautify(1234.56, { locale: 'pt-BR' }); // "1.234,56"
```
